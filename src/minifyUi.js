import fs from 'fs';
import path from 'path';
import { minify } from 'terser';
import { createLogger, getProjectRoot } from './utils.js';

const logger = createLogger('[UI-MINIFY]');

export async function minifyUi() {
  const projectRoot = getProjectRoot();
  const inputPath = path.join(projectRoot, 'src', 'shared', 'ui', 'app.js');
  const outputPath = path.join(projectRoot, 'src', 'shared', 'ui', 'app.min.js');

  if (!fs.existsSync(inputPath)) {
    logger.warn(`Source not found: ${inputPath}`);
    return false;
  }

  try {
    const code = fs.readFileSync(inputPath, 'utf-8');
    const result = await minify(code, {
      compress: true,
      mangle: true,
      format: { comments: false }
    });

    if (!result.code) {
      logger.error('Minify produced empty output');
      return false;
    }

    fs.writeFileSync(outputPath, result.code, 'utf-8');
    logger.success(`Minified UI: ${outputPath}`);
    return true;
  } catch (error) {
    logger.error(`Minify failed: ${error.message}`);
    return false;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  minifyUi();
}
