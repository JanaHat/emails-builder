import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config, getAllClients } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const PORT = process.env.PORT || config.global.defaultPort || 3000;
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, config.global.outputDir);

const uiPath = path.join(__dirname, 'shared', 'ui');
server.use(
  express.static(uiPath, {
    etag: false,
    maxAge: 0,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'no-store');
    }
  })
);

const uiAssetsPath = path.join(__dirname, 'shared', 'ui', 'assets');
if (fs.existsSync(uiAssetsPath)) {
  server.use('/assets', express.static(uiAssetsPath, { etag: true, maxAge: '7d' }));
}

const vendorHtml2CanvasPath = path.join(projectRoot, 'node_modules', 'html2canvas', 'dist');
if (fs.existsSync(vendorHtml2CanvasPath)) {
  server.use('/vendor/html2canvas', express.static(vendorHtml2CanvasPath, { etag: true, maxAge: '30d' }));
}

const vendorJsPdfPath = path.join(projectRoot, 'node_modules', 'jspdf', 'dist');
if (fs.existsSync(vendorJsPdfPath)) {
  server.use('/vendor/jspdf', express.static(vendorJsPdfPath, { etag: true, maxAge: '30d' }));
}

const scopedClient = process.env.CLIENT;
const allowedClients = new Set(scopedClient ? [scopedClient] : getAllClients());

function isValidClient(client) {
  return allowedClients.has(client);
}

function isSafePath(resolvedPath, basePath) {
  return resolvedPath.startsWith(basePath + path.sep);
}

function registerCampaignAssets() {
  Object.entries(config.clients).forEach(([clientKey, clientConfig]) => {
    Object.keys(clientConfig.campaigns).forEach((campaignKey) => {
      const assetsPath = path.join(
        __dirname,
        'clients',
        clientKey,
        campaignKey,
        'assets'
      );

      if (fs.existsSync(assetsPath)) {
        server.use('/assets', express.static(assetsPath));
      }
    });
  });
}

registerCampaignAssets();

server.get('/clients', (req, res) => {
  const clients = Array.from(allowedClients)
    .filter((client) => {
      const clientPath = path.join(outputDir, client);
      return fs.existsSync(clientPath);
    })
    .map((client) => ({
      key: client,
      name: config.clients?.[client]?.name || client
    }));
  res.json(clients);
});

server.get('/output/:client', (req, res) => {
  const { client } = req.params;
  if (!isValidClient(client)) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const campaignsPath = path.join(outputDir, client);

  if (!fs.existsSync(campaignsPath)) {
    return res.status(404).json({ error: 'Campaigns folder not found' });
  }

  const campaigns = fs
    .readdirSync(campaignsPath)
    .filter((file) => fs.statSync(path.join(campaignsPath, file)).isDirectory())
    .map((campaign) => ({
      key: campaign,
      name: config.clients?.[client]?.campaigns?.[campaign]?.name || campaign
    }));
  res.json(campaigns);
});

server.get('/output/:client/:campaign', (req, res) => {
  const { client, campaign } = req.params;
  if (!isValidClient(client)) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const campaignPath = path.join(outputDir, client, campaign);

  if (!fs.existsSync(campaignPath)) {
    return res.status(404).json({ error: 'Campaign folder not found' });
  }

  const languages = fs
    .readdirSync(campaignPath)
    .filter((file) => fs.statSync(path.join(campaignPath, file)).isDirectory());
  res.json(languages);
});

server.get('/output/:client/:campaign/:language', (req, res) => {
  const { client, campaign, language } = req.params;
  if (!isValidClient(client)) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const languagePath = path.join(outputDir, client, campaign, language);

  if (!fs.existsSync(languagePath)) {
    return res.status(404).json({ error: 'Variant folder not found' });
  }

  const emails = fs.readdirSync(languagePath).filter((file) => file.endsWith('.html'));
  res.json(emails);
});

server.get('/output/:client/:campaign/:language/:email', (req, res) => {
  const { client, campaign, language, email } = req.params;
  if (!isValidClient(client)) {
    return res.status(404).send('Client not found');
  }

  const basePath = path.resolve(outputDir, client);
  const outputPath = path.resolve(outputDir, client, campaign, language, email);
  if (!isSafePath(outputPath, basePath)) {
    return res.status(400).send('Invalid path');
  }

  if (!fs.existsSync(outputPath)) return res.status(404).send('Email not found');

  res.set('Cache-Control', 'public, max-age=30');

  res.sendFile(outputPath);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default server;
