import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import mjml2html from 'mjml';
import { minify as minifyHtml } from 'html-minifier-terser';
import beautify from 'js-beautify';

/**
 * Utility functions for the MJML email builder
 */

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get project root directory
 * @returns {string} Absolute path to project root
 */
export function getProjectRoot() {
  return path.resolve(__dirname, '../');
}

/**
 * Ensure directory exists, create if it doesn't
 * @param {string} dirPath - Path to directory
 */
export function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Check if file exists
 * @param {string} filePath - Path to file
 * @returns {boolean} True if file exists
 */
export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Get all directories in a path
 * @param {string} dirPath - Path to directory
 * @returns {Array} Array of directory names
 */
export function getDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs.readdirSync(dirPath)
    .filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
}

/**
 * Convert MJML to HTML with error handling
 * @param {string} mjmlContent - MJML content
 * @param {object} options - MJML options
 * @returns {object} Result with html and errors
 */
export function mjmlToHtml(mjmlContent, options = {}) {
  try {
    const baseOptions = {
      validationLevel: 'strict',
      minify: false,
      ...options
    };

    const result = mjml2html(mjmlContent, baseOptions);
    if (!result.html) {
      const softResult = mjml2html(mjmlContent, {
        ...baseOptions,
        validationLevel: 'soft'
      });

      return {
        html: softResult.html,
        errors: softResult.errors || result.errors || []
      };
    }
    
    if (result.errors && result.errors.length > 0) {
      console.warn('MJML warnings:', result.errors);
    }
    
    return {
      html: result.html,
      errors: result.errors || []
    };
  } catch (error) {
    return {
      html: null,
      errors: [{ message: error.message, type: 'error' }]
    };
  }
}


/**
 * Safely import a module with error handling
 * @param {string} modulePath - Path to module
 * @returns {Promise} Module content or null if error
 */
export async function safeImport(modulePath) {
  try {
    const moduleUrl = pathToFileURL(modulePath);
    moduleUrl.searchParams.set('t', Date.now().toString());
    return await import(moduleUrl.href);
  } catch (error) {
    console.error(`Failed to import ${modulePath}:`, error.message);
    return null;
  }
}

/**
 * Write file with error handling
 * @param {string} filePath - Path to file
 * @param {string} content - File content
 * @param {string} encoding - File encoding (default: utf-8)
 */
export function writeFileSync(filePath, content, encoding = 'utf-8') {
  try {
    fs.writeFileSync(filePath, content, encoding);
    return true;
  } catch (error) {
    console.error(`Failed to write file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Create a logger with timestamp
 * @param {string} prefix - Log prefix
 * @returns {object} Logger functions
 */
export function createLogger(prefix = '') {
  const timestamp = () => new Date().toISOString();
  
  return {
    info: (message) => console.log(`[${timestamp()}] ${prefix} INFO: ${message}`),
    warn: (message) => console.warn(`[${timestamp()}] ${prefix} WARN: ${message}`),
    error: (message) => console.error(`[${timestamp()}] ${prefix} ERROR: ${message}`),
    success: (message) => console.log(`[${timestamp()}] ${prefix} ✅: ${message}`)
  };
}

/**
 * Validate email data structure
 * @param {object} emailData - Email data to validate
 * @returns {object} Validation result
 */
export function validateEmailData(emailData) {
  const errors = [];
  
  if (!Array.isArray(emailData)) {
    errors.push('Email data must be an array');
    return { valid: false, errors };
  }
  
  emailData.forEach((item, index) => {
    if (!item.variation) {
      errors.push(`Item ${index}: Missing 'variation' field`);
    }
    
    if (!item.localizations || typeof item.localizations !== 'object') {
      errors.push(`Item ${index}: Missing or invalid 'localizations' field`);
    } else {
      Object.keys(item.localizations).forEach(lang => {
        if (typeof item.localizations[lang] !== 'object') {
          errors.push(`Item ${index}: Invalid localization data for language '${lang}'`);
        }
      });
    }
  });
  
  return { valid: errors.length === 0, errors };
}

/**
 * Generate build summary
 * @param {Array} results - Build results
 * @returns {object} Build summary
 */
export function generateBuildSummary(results) {
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const total = results.length;
  
  return {
    total,
    successful,
    failed,
    successRate: total > 0 ? (successful / total * 100).toFixed(1) : 0,
    results
  };
}

/**
 * Format HTML output
 * @param {string} html - HTML string
 * @param {string} format - 'minify' | 'beautify' | 'none'
 * @param {object} options - Formatting options
 * @returns {string} Formatted HTML
 */
export async function formatHtml(html, format = 'none', options = {}) {
  if (!html || format === 'none') {
    return html;
  }

  try {
    if (format === 'minify') {
      return await minifyHtml(html, options);
    }

    if (format === 'beautify') {
      return beautify.html(html, options);
    }
  } catch (error) {
    console.warn(`Failed to ${format} HTML:`, error.message);
  }

  return html;
}