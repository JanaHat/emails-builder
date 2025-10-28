import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mjml2html from 'mjml';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, './campaignA/templates');
const outputDir = path.join(__dirname, '../../../output');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function buildEmails() {
        if (!fs.existsSync(templatesDir)) return;

        console.log('templatesDir', templatesDir)

        const templates = fs.readdirSync(templatesDir);

        templates.forEach(templateName => {
            const templatePath = path.join(templatesDir, templateName);
            const dataFile = path.join(templatePath, 'data.js');
            const templateFile = path.join(templatePath, 'template.js');

            console.log('data file', dataFile)

            if (!fs.existsSync(dataFile) || !fs.existsSync(templateFile)) return;

            // Import data.js and template.js dynamically
            import(`file://${dataFile}`).then(({ emailData }) => {
                console.log('templatefile', templateFile)
                import(`file://${templateFile}`).then(({ generateEmail }) => {
                    console.log('data file', dataFile)
                    emailData.forEach(({ variation, localizations }) => {
                        Object.entries(localizations).forEach(([language, data]) => {
                            const mjmlContent = generateEmail(data);
                            const { html } = mjml2html(mjmlContent);

                            const emailOutputDir = path.join(outputDir, 'clientA', 'campaignA', variation);
                            if (!fs.existsSync(emailOutputDir)) {
                                fs.mkdirSync(emailOutputDir, { recursive: true });
                            }

                            const outputFilePath = path.join(emailOutputDir, `${language}.html`);
                            fs.writeFileSync(outputFilePath, html, 'utf-8');

                            console.log(`✅ Built: ${outputFilePath}`);
                        });
                    });
                }).catch(err => console.error(`Error loading template.js for ${templateName}:`, err));
            }).catch(err => console.error(`Error loading data.js for ${templateName}:`, err));
        });
}

buildEmails();