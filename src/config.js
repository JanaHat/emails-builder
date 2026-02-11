/**
 * Central configuration for the MJML email builder
 * This file contains all client, campaign, and build configurations
 */

export const config = {
  // Global settings
  global: {
    outputDir: 'output',
    sourceDir: 'src',
    defaultPort: 3000,
    mjmlOptions: {
      validationLevel: 'strict'
    }
  },

  // Client configurations
  clients: {
    clientA: {
      name: 'Client A',
      outputPath: 'clientA',
      campaigns: {
        campaignA: {
          name: 'Campaign A',
          templatesPath: 'campaignA/templates',
          componentsPath: 'campaignA/components',
          outputPath: 'campaignA'
        },
        campaignB: {
          name: 'Campaign B',
          templatesPath: 'campaignB/templates',
          componentsPath: 'campaignB/components',
          outputPath: 'campaignB'
        }
      },
      server: {
        port: 3000,
        uiPath: 'ui'
      }
    },
    clientB: {
      name: 'Client B',
      outputPath: 'clientB',
      campaigns: {
        campaignA: {
          name: 'Campaign A',
          templatesPath: 'campaignA/templates',
          componentsPath: 'campaignA/components',
          outputPath: 'campaignA'
        },
      },
      server: {
        port: 3001,
        uiPath: 'ui'
      }
    }
  },

  // Build configurations
  build: {
    supportedLanguages: ['en-US', 'es-MX', 'es-US'],
    templateFileNames: {
      data: 'data.js',
      template: 'template.js'
    },
    outputFormat: 'html'
  }
};

/**
 * Get client configuration by name
 * @param {string} clientName - Name of the client
 * @returns {object} Client configuration
 */
export function getClientConfig(clientName) {
  const clientConfig = config.clients[clientName];
  if (!clientConfig) {
    throw new Error(`Client '${clientName}' not found in configuration`);
  }
  return clientConfig;
}

/**
 * Get campaign configuration for a specific client
 * @param {string} clientName - Name of the client
 * @param {string} campaignName - Name of the campaign
 * @returns {object} Campaign configuration
 */
export function getCampaignConfig(clientName, campaignName) {
  const clientConfig = getClientConfig(clientName);
  const campaignConfig = clientConfig.campaigns[campaignName];
  if (!campaignConfig) {
    throw new Error(`Campaign '${campaignName}' not found for client '${clientName}'`);
  }
  return campaignConfig;
}

/**
 * Get all available clients
 * @returns {Array} Array of client names
 */
export function getAllClients() {
  return Object.keys(config.clients);
}

/**
 * Get all campaigns for a specific client
 * @param {string} clientName - Name of the client
 * @returns {Array} Array of campaign names
 */
export function getClientCampaigns(clientName) {
  const clientConfig = getClientConfig(clientName);
  return Object.keys(clientConfig.campaigns);
}