import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import chokidar from 'chokidar';
// import { exec } from 'child_process';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const PORT = 3000;
// const clientDir = path.join(__dirname, '../../clients/clientA');
const outputDir = path.join(__dirname, '../../../output');

server.use(express.static(path.join(__dirname, './ui')));
server.use('/assets', express.static(path.join(__dirname, './campaignA/assets')));
server.use('/assets', express.static(path.join(__dirname, './campaignB/assets')));

server.get('/output/clientA', (req, res) => {
    // const { study } = req.params;
    const studiesPath = path.join(outputDir, 'clientA');
    console.log('studypath', studiesPath)

    if (!fs.existsSync(studiesPath)) {
        return res.status(404).json({ error: 'Studies folder not found' });
    }

    const studies = fs.readdirSync(studiesPath).filter(file => fs.statSync(path.join(studiesPath, file)).isDirectory());
    console.log('studies', studies)

    res.json(studies)
})

// Route to list all email variations inside study folder
server.get('/output/clientA/:study', (req, res) => {
    const { study } = req.params;
    const studyPath = path.join(outputDir, 'clientA', study);

    if (!fs.existsSync(studyPath)) {
        return res.status(404).json({ error: 'Study folder not found' });
    }

    // Get all email variations (folders inside 'study')
    const variations = fs.readdirSync(studyPath).filter(file => fs.statSync(path.join(studyPath, file)).isDirectory());

    res.json(variations);
});

server.get('/output/clientA/:study/:variation', (req, res) => {
    const { study, variation } = req.params;
    const variationPath = path.join(outputDir, 'clientA', study, variation);

    if (!fs.existsSync(variationPath)) {
        return res.status(404).json({ error: 'Variant folder not found' });
    }

    // Get all email files (instead of directories)
    const emails = fs.readdirSync(variationPath).filter(file => file.endsWith('.html'));

    res.json(emails); // Send the list of HTML files (email variations)
});


// ✅ Serve email preview
server.get('/output/clientA/:study/:variation/:language', (req, res) => {
    const { study, variation, language } = req.params;
    const outputPath = path.join(outputDir, 'clientA', study, variation, language);
    console.log('outputpath', outputPath)
    if (!fs.existsSync(outputPath)) return res.status(404).send('Email not found');
    
    res.sendFile(outputPath);
});



// ✅ Watch for changes & rebuild
// const watcher = chokidar.watch(clientsDir, { ignored: /^\./, persistent: true });

// watcher.on('change', (filePath) => {
//     console.log(`${filePath} changed. Rebuilding emails...`);
    
//     exec('node ../src/clients/buildEmails.js', (err, stdout, stderr) => {
//         if (err) {
//             console.error('Build failed:', stderr);
//             return;
//         }
//         console.log('Rebuild complete:', stdout);
//     });
// });

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});








// import { exec } from 'child_process';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Fix __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const buildScriptPath = path.resolve(__dirname, '../src/client/buildEmails.js');

// watcher.on('change', (filePath) => {
//   console.log(`${filePath} has changed. Rebuilding emails...`);
//   console.log(`Triggering build process for: ${buildScriptPath}`);

//   // Check if the file exists before executing
//   import('fs').then(fs => {
//     if (!fs.existsSync(buildScriptPath)) {
//       console.error(`Error: File does not exist at ${buildScriptPath}`);
//       return;
//     }

//     console.log(`File exists! Running build script...`);

//     exec(`node ${buildScriptPath}`, (err, stdout, stderr) => {
//       console.log(`Executing build script for ${filePath}`);
//       if (err) {
//         console.error(`Exec failed:`, err);
//         console.error(`stderr: ${stderr}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//     });
//   });
// });

