/**
 * Chronobank/eth-rest configuration
 * @module config
 * @returns {Object} Configuration
 */
require('dotenv').config();
const path = require('path'),
  bunyan = require('bunyan'),
  util = require('util'),
  log = bunyan.createLogger({name: 'core.rest'});

module.exports = {
  rest: {
    domain: process.env.DOMAIN || 'localhost',
    port: parseInt(process.env.REST_PORT) || 8081,
    auth: process.env.USE_AUTH || false
  },
  nodered: {
    mongo: {
      uri: process.env.NODERED_MONGO_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/data'
    },
    autoSyncMigrations: process.env.NODERED_AUTO_SYNC_MIGRATIONS || true,
    httpAdminRoot: '/admin',
    httpNodeRoot: '/',
    debugMaxLength: 1000,
    adminAuth: require('../controllers/nodeRedAuthController'),
    nodesDir: path.join(__dirname, '../'),
    autoInstallModules: true,
    functionGlobalContext: {
      _: require('lodash'),
      factories: {
        sm: require('../factories/sc/smartContractsFactory'),
        messages: {
          address: require('../factories/messages/addressMessageFactory'),
          generic: require('../factories/messages/genericMessageFactory'),
          tx: require('../factories/messages/txMessageFactory')
        },
        hosts: {
          main: {
            bitcoin: 'https://middleware-bitcoin-mainnet-rest.chronobank.io',
            eth: 'https://middleware-ethereum-mainnet-rest.chronobank.io',
            litecoin: 'https://middleware-litecoin-mainnet-rest.chronobank.io',
            nem: 'https://middleware-nem-mainnet-rest.chronobank.io',
            waves: 'https://middleware-waves-mainnet-rest.chronobank.io'
          },
          dev: {
            bitcoin: 'https://middleware-bitcoin-testnet-rest.chronobank.io',
            eth: 'https://middleware-ethereum-testnet-rest.chronobank.io',
            litecoin: 'https://middleware-litecoin-testnet-rest.chronobank.io',
            nem: 'https://middleware-nem-testnet-rest.chronobank.io',
            waves: 'https://middleware-waves-testnet-rest.chronobank.io'
          }
        }
      }
    },
    storageModule: require('../controllers/nodeRedStorageController'),
    logging: {
      console: {
        level: 'info',
        metrics: true,
        handler: () =>
          (msg) => {
            log.info(util.inspect(msg, null, 3));
          }
      }
    }
  }
};
