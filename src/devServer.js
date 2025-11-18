import chokidar from 'chokidar';
import { EmailBuilder } from './buildEmails.js';
import { config, getAllClients } from './config.js';
import { createLogger, getProjectRoot } from './utils.js';
import path from 'path';

const logger = createLogger('[DEV-SERVER]');

/**
 * Development server with file watching and auto-rebuild
 */
class DevServer {
  constructor(clientName = null) {
    this.clientName = clientName;
    this.projectRoot = getProjectRoot();
    this.watchers = new Map();
    this.buildQueue = new Set();
    this.isBuilding = false;
    this.debounceTimeout = null;
  }

  /**
   * Start watching files for changes
   */
  startWatching() {
    const clients = this.clientName ? [this.clientName] : getAllClients();
    
    logger.info('Starting development server with file watching...');
    
    clients.forEach(clientName => {
      const clientPath = path.join(
        this.projectRoot,
        config.global.sourceDir,
        'clients',
        clientName
      );
      
      const watcher = chokidar.watch(clientPath, {
        ignored: [
          /(^|[\/\\])\../, // ignore dotfiles
          /node_modules/,
          /\.git/
        ],
        persistent: true,
        ignoreInitial: true
      });

      watcher
        .on('change', (filePath) => this.handleFileChange(clientName, filePath))
        .on('add', (filePath) => this.handleFileChange(clientName, filePath))
        .on('unlink', (filePath) => this.handleFileChange(clientName, filePath))
        .on('error', (error) => logger.error(`Watcher error for ${clientName}: ${error}`));

      this.watchers.set(clientName, watcher);
      logger.info(`Watching: ${clientPath}`);
    });

    // Also watch shared components
    const sharedPath = path.join(this.projectRoot, config.global.sourceDir, 'shared');
    const sharedWatcher = chokidar.watch(sharedPath, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true
    });

    sharedWatcher
      .on('change', () => this.handleSharedChange())
      .on('add', () => this.handleSharedChange())
      .on('unlink', () => this.handleSharedChange())
      .on('error', (error) => logger.error(`Shared watcher error: ${error}`));

    this.watchers.set('shared', sharedWatcher);
    logger.info(`Watching shared components: ${sharedPath}`);

    // Initial build
    this.buildAll();
  }

  /**
   * Handle file changes for specific client
   */
  handleFileChange(clientName, filePath) {
    logger.info(`File changed: ${filePath}`);
    this.queueBuild(clientName);
  }

  /**
   * Handle shared component changes (rebuild all clients)
   */
  handleSharedChange() {
    logger.info('Shared component changed, rebuilding all clients...');
    const clients = this.clientName ? [this.clientName] : getAllClients();
    clients.forEach(client => this.queueBuild(client));
  }

  /**
   * Queue a build for a specific client (with debouncing)
   */
  queueBuild(clientName) {
    this.buildQueue.add(clientName);
    
    // Debounce builds to avoid rebuilding too frequently
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    
    this.debounceTimeout = setTimeout(() => {
      this.processBuildQueue();
    }, 300); // 300ms debounce
  }

  /**
   * Process the build queue
   */
  async processBuildQueue() {
    if (this.isBuilding || this.buildQueue.size === 0) {
      return;
    }

    this.isBuilding = true;
    const clientsToBuild = Array.from(this.buildQueue);
    this.buildQueue.clear();

    logger.info(`Building clients: ${clientsToBuild.join(', ')}`);

    try {
      for (const clientName of clientsToBuild) {
        const builder = new EmailBuilder(clientName);
        await builder.build();
      }
    } catch (error) {
      logger.error(`Build failed: ${error.message}`);
    } finally {
      this.isBuilding = false;
      
      // Process any builds that were queued while building
      if (this.buildQueue.size > 0) {
        setTimeout(() => this.processBuildQueue(), 100);
      }
    }
  }

  /**
   * Build all clients initially
   */
  async buildAll() {
    const clients = this.clientName ? [this.clientName] : getAllClients();
    clients.forEach(client => this.queueBuild(client));
  }

  /**
   * Stop watching files
   */
  stopWatching() {
    logger.info('Stopping file watchers...');
    
    this.watchers.forEach((watcher, name) => {
      watcher.close();
      logger.info(`Stopped watching: ${name}`);
    });
    
    this.watchers.clear();
    
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }

  /**
   * Start the development server
   */
  start() {
    logger.info('🚀 Starting MJML Email Development Server');
    
    this.startWatching();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      this.stopWatching();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      this.stopWatching();
      process.exit(0);
    });

    logger.info('Development server is running. Press Ctrl+C to stop.');
    logger.info('Files are being watched for changes and will trigger automatic rebuilds.');
  }
}

/**
 * CLI interface for the development server
 */
async function main() {
  const args = process.argv.slice(2);
  const clientName = args[0] || null;
  
  if (clientName && !getAllClients().includes(clientName)) {
    console.error(`Error: Client '${clientName}' not found.`);
    console.log(`Available clients: ${getAllClients().join(', ')}`);
    process.exit(1);
  }

  const devServer = new DevServer(clientName);
  devServer.start();
}

// Export for use as module
export { DevServer };

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}