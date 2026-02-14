#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { config, getClientConfig, getCampaignConfig } from './config.js';
import {
  getProjectRoot,
  ensureDirectoryExists,
  fileExists,
  getDirectories,
  mjmlToHtml,
  safeImport,
  writeFileSync,
  createLogger,
  validateEmailData,
  generateBuildSummary,
  formatHtml
} from './utils.js';

const logger = createLogger('[EMAIL-BUILDER]');

/**
 * Dynamic Email Builder
 * Builds emails for any client and campaign based on configuration
 */
class EmailBuilder {
  constructor(clientName, campaignName = null) {
    this.clientName = clientName;
    this.campaignName = campaignName;
    this.projectRoot = getProjectRoot();
    this.clientConfig = getClientConfig(clientName);
    this.buildResults = [];
  }

  /**
   * Resolve campaign config with a fallback based on folder structure
   * @param {string} campaignName - Campaign name
   * @returns {object} Campaign config
   */
  resolveCampaignConfig(campaignName) {
    try {
      return getCampaignConfig(this.clientName, campaignName);
    } catch (error) {
      return {
        name: campaignName,
        templatesPath: path.join(campaignName, 'templates'),
        outputPath: campaignName
      };
    }
  }

  /**
   * Discover campaigns from config and filesystem
   * @returns {Array<string>} Campaign names
   */
  getAvailableCampaigns() {
    const clientRoot = path.join(
      this.projectRoot,
      config.global.sourceDir,
      'clients',
      this.clientName
    );

    const configCampaigns = Object.keys(this.clientConfig.campaigns || {});
    const folderCampaigns = getDirectories(clientRoot).filter(dirName => {
      const templatesDir = path.join(clientRoot, dirName, 'templates');
      return fileExists(templatesDir);
    });

    return Array.from(new Set([...configCampaigns, ...folderCampaigns]));
  }

  /**
   * Get the templates directory for a specific campaign
   * @param {string} campaignName - Campaign name
   * @returns {string} Templates directory path
   */
  getTemplatesDirectory(campaignName) {
    const campaignConfig = this.resolveCampaignConfig(campaignName);
    return path.join(
      this.projectRoot,
      config.global.sourceDir,
      'clients',
      this.clientName,
      campaignConfig.templatesPath
    );
  }

  /**
   * Get the output directory for a specific campaign
   * @param {string} campaignName - Campaign name
   * @returns {string} Output directory path
   */
  getOutputDirectory(campaignName) {
    const campaignConfig = this.resolveCampaignConfig(campaignName);
    return path.join(
      this.projectRoot,
      config.global.outputDir,
      this.clientConfig.outputPath,
      campaignConfig.outputPath
    );
  }

  /**
   * Build emails for a specific template
   * @param {string} campaignName - Campaign name
   * @param {string} templateName - Template name
   * @returns {Promise<Array>} Build results
   */
  async buildTemplate(campaignName, templateName) {
    const templatesDir = this.getTemplatesDirectory(campaignName);
    const templatePath = path.join(templatesDir, templateName);
    const dataFile = path.join(templatePath, config.build.templateFileNames.data);
    const templateFile = path.join(templatePath, config.build.templateFileNames.template);
    
    logger.info(`Building template: ${campaignName}/${templateName}`);
    
    // Validate template files exist
    if (!fileExists(dataFile)) {
      const error = `Data file not found: ${dataFile}`;
      logger.error(error);
      return [{ success: false, error, template: templateName }];
    }
    
    if (!fileExists(templateFile)) {
      const error = `Template file not found: ${templateFile}`;
      logger.error(error);
      return [{ success: false, error, template: templateName }];
    }

    // Import data and template
    const dataModule = await safeImport(dataFile);
    const templateModule = await safeImport(templateFile);
    
    if (!dataModule || !templateModule) {
      const error = `Failed to import template or data for ${templateName}`;
      logger.error(error);
      return [{ success: false, error, template: templateName }];
    }

    const { emailData } = dataModule;
    const { generateEmail } = templateModule;

    if (typeof generateEmail !== 'function') {
      const error = `Template export 'generateEmail' must be a function for ${templateName}`;
      logger.error(error);
      return [{ success: false, error, template: templateName }];
    }

    // Validate email data
    const validation = validateEmailData(emailData);
    if (!validation.valid) {
      logger.error(`Invalid email data for ${templateName}: ${validation.errors.join(', ')}`);
      return [{ success: false, error: validation.errors.join(', '), template: templateName }];
    }

    const results = [];

    // Build each variation and localization
    for (const { variation, localizations } of emailData) {
      for (const [language, data] of Object.entries(localizations)) {
        if (
          Array.isArray(config.build.supportedLanguages) &&
          config.build.supportedLanguages.length > 0 &&
          !config.build.supportedLanguages.includes(language)
        ) {
          logger.warn(`Skipping unsupported language '${language}' for ${variation} in ${templateName}`);
          results.push({
            success: false,
            error: `Unsupported language: ${language}`,
            template: templateName,
            variation,
            language
          });
          continue;
        }
        try {
          // Generate MJML content
          const mjmlContent = generateEmail(data);
          
          // Convert to HTML
          const { html, errors } = mjmlToHtml(mjmlContent, config.global.mjmlOptions);
          
          if (!html) {
            const errorDetails = errors && errors.length
              ? errors.map(e => e.message || e.formattedMessage || JSON.stringify(e)).join(', ')
              : 'Unknown MJML error';
            const error = `Failed to convert MJML to HTML for ${variation}/${language}: ${errorDetails}`;
            logger.error(error);
            results.push({ 
              success: false, 
              error, 
              template: templateName, 
              variation, 
              language,
              mjmlErrors: errors
            });
            continue;
          }
          
          // Ensure output directory exists
          const outputDir = path.join(this.getOutputDirectory(campaignName), variation);
          ensureDirectoryExists(outputDir);
          
          const formatMode = config.build.htmlFormat || 'none';
          const formattedHtml = formatMode === 'minify'
            ? await formatHtml(html, 'minify', config.build.htmlMinifyOptions)
            : formatMode === 'beautify'
              ? await formatHtml(html, 'beautify', config.build.htmlBeautifyOptions)
              : html;

          // Write HTML file
          const outputFile = path.join(outputDir, `${language}.${config.build.outputFormat}`);
          const writeSuccess = writeFileSync(outputFile, formattedHtml);
          
          if (writeSuccess) {
            logger.success(`Built: ${outputFile}`);
            results.push({ 
              success: true, 
              outputFile, 
              template: templateName, 
              variation, 
              language,
              warnings: errors
            });
          } else {
            results.push({ 
              success: false, 
              error: `Failed to write file: ${outputFile}`,
              template: templateName, 
              variation, 
              language 
            });
          }
          
        } catch (error) {
          logger.error(`Error building ${variation}/${language}: ${error.message}`);
          results.push({ 
            success: false, 
            error: error.message,
            template: templateName, 
            variation, 
            language 
          });
        }
      }
    }

    return results;
  }

  /**
   * Build emails for a specific campaign
   * @param {string} campaignName - Campaign name
   * @returns {Promise<Array>} Build results
   */
  async buildCampaign(campaignName) {
    logger.info(`Building campaign: ${campaignName} for client: ${this.clientName}`);
    
    const templatesDir = this.getTemplatesDirectory(campaignName);
    
    if (!fileExists(templatesDir)) {
      const error = `Templates directory not found: ${templatesDir}`;
      logger.error(error);
      return [{ success: false, error, campaign: campaignName }];
    }

    const templates = getDirectories(templatesDir);
    
    if (templates.length === 0) {
      logger.warn(`No templates found in: ${templatesDir}`);
      return [];
    }

    const allResults = [];
    
    // Build each template
    for (const templateName of templates) {
      const results = await this.buildTemplate(campaignName, templateName);
      allResults.push(...results);
    }

    await this.cleanStaleOutputs(campaignName, templates);
    this.cleanUnsupportedLanguageOutputs(campaignName);

    return allResults;
  }

  /**
   * Remove output files for unsupported languages
   * @param {string} campaignName - Campaign name
   */
  cleanUnsupportedLanguageOutputs(campaignName) {
    const supported = config.build.supportedLanguages;
    if (!Array.isArray(supported) || supported.length === 0) return;

    const campaignOutputDir = this.getOutputDirectory(campaignName);
    if (!fs.existsSync(campaignOutputDir)) return;

    const variations = getDirectories(campaignOutputDir);
    variations.forEach((variation) => {
      const variationDir = path.join(campaignOutputDir, variation);
      const files = fs.readdirSync(variationDir);
      files.forEach((file) => {
        const ext = path.extname(file).replace('.', '');
        if (ext !== config.build.outputFormat) return;

        const language = path.basename(file, `.${config.build.outputFormat}`);
        if (!supported.includes(language)) {
          const filePath = path.join(variationDir, file);
          try {
            fs.unlinkSync(filePath);
            logger.info(`Removed unsupported output: ${filePath}`);
          } catch (error) {
            logger.warn(`Failed to remove ${filePath}: ${error.message}`);
          }
        }
      });
    });
  }

  /**
   * Remove output files for deleted templates/variations
   * @param {string} campaignName - Campaign name
   * @param {Array<string>} templates - Template folder names
   */
  async cleanStaleOutputs(campaignName, templates) {
    const expectedOutputs = await this.collectExpectedOutputs(campaignName, templates);
    const campaignOutputDir = this.getOutputDirectory(campaignName);
    if (!fs.existsSync(campaignOutputDir)) return;

    const filesToCheck = this.getFilesRecursive(campaignOutputDir);
    filesToCheck.forEach((filePath) => {
      if (path.extname(filePath) !== `.${config.build.outputFormat}`) return;
      if (!expectedOutputs.has(filePath)) {
        try {
          fs.unlinkSync(filePath);
          logger.info(`Removed stale output: ${filePath}`);
        } catch (error) {
          logger.warn(`Failed to remove ${filePath}: ${error.message}`);
        }
      }
    });

    this.pruneEmptyDirs(campaignOutputDir);
  }

  /**
   * Build a set of expected output files from data.js
   */
  async collectExpectedOutputs(campaignName, templates) {
    const expected = new Set();
    const templatesDir = this.getTemplatesDirectory(campaignName);
    const supported = config.build.supportedLanguages;
    const outputFormat = config.build.outputFormat;

    for (const templateName of templates) {
      const templatePath = path.join(templatesDir, templateName);
      const dataFile = path.join(templatePath, config.build.templateFileNames.data);

      if (!fileExists(dataFile)) continue;

      const dataModule = await safeImport(dataFile);
      const emailData = dataModule?.emailData;
      if (!Array.isArray(emailData)) continue;

      for (const { variation, localizations } of emailData) {
        if (!variation || !localizations) continue;
        for (const language of Object.keys(localizations)) {
          if (Array.isArray(supported) && supported.length > 0 && !supported.includes(language)) {
            continue;
          }
          const outputFile = path.join(
            this.getOutputDirectory(campaignName),
            variation,
            `${language}.${outputFormat}`
          );
          expected.add(outputFile);
        }
      }
    }

    return expected;
  }

  /**
   * Recursively list files in a directory
   */
  getFilesRecursive(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = [];

    entries.forEach((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        files.push(...this.getFilesRecursive(fullPath));
      } else {
        files.push(fullPath);
      }
    });

    return files;
  }

  /**
   * Remove empty directories under a path
   */
  pruneEmptyDirs(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        this.pruneEmptyDirs(fullPath);
      }
    });

    const remaining = fs.readdirSync(dirPath);
    if (remaining.length === 0) {
      try {
        fs.rmdirSync(dirPath);
      } catch (error) {
        logger.warn(`Failed to remove empty dir ${dirPath}: ${error.message}`);
      }
    }
  }

  /**
   * Build emails for all campaigns or a specific campaign
   * @returns {Promise<object>} Build summary
   */
  async build() {
    logger.info(`Starting build for client: ${this.clientName}`);
    
    const campaigns = this.campaignName 
      ? [this.campaignName] 
      : this.getAvailableCampaigns();

    const allResults = [];

    for (const campaignName of campaigns) {
      try {
        const results = await this.buildCampaign(campaignName);
        allResults.push(...results);
      } catch (error) {
        logger.error(`Failed to build campaign ${campaignName}: ${error.message}`);
        allResults.push({ 
          success: false, 
          error: error.message, 
          campaign: campaignName 
        });
      }
    }

    this.buildResults = allResults;
    const summary = generateBuildSummary(allResults);
    
    logger.info(`Build completed: ${summary.successful}/${summary.total} successful (${summary.successRate}%)`);
    
    if (summary.failed > 0) {
      logger.warn(`${summary.failed} builds failed. Check the logs above for details.`);
    }

    return summary;
  }
}

/**
 * CLI interface for the email builder
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: node buildEmails.js <client> [campaign]

Examples:
  node buildEmails.js clientA              # Build all campaigns for clientA
  node buildEmails.js clientA campaignA    # Build only campaignA for clientA
  node buildEmails.js clientB              # Build all campaigns for clientB

Available clients: ${Object.keys(config.clients).join(', ')}
    `);
    process.exit(1);
  }

  const [clientName, campaignName] = args;
  
  try {
    const builder = new EmailBuilder(clientName, campaignName);
    const summary = await builder.build();
    
    if (summary.failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    logger.error(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Export for use as module
export { EmailBuilder };

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}