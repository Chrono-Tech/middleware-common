/**
 * Chronobank/eth-rest configuration
 * @module config
 * @returns {Object} Configuration
 */
require('dotenv').config();
const path = require('path'),
  bunyan = require('bunyan'),
  util = require('util'),
  _ = require('lodash'),
  log = bunyan.createLogger({name: 'core.rest'});

module.exports = {
  rest: {
    port: parseInt(process.env.REST_PORT) || 8081
  },
  rabbit: {
    url: process.env.RABBIT_URI || 'amqp://localhost:5672',
    serviceName: process.env.RABBIT_SERVICE_NAME || 'common_middleware'
  },
  mongo: {
    accounts: {
      main: {
        uri: process.env.ACCOUNTS_MAINNET_MONGO_URI || 'mongodb://localhost:27017/accounts_mainnet'
      },
      test: {
        uri: process.env.ACCOUNTS_TESTNET_MONGO_URI || 'mongodb://localhost:27017/accounts_testent'
      }
    },
    nodered: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/data'
    }
  },
  nodered: {
    autoSyncMigrations: _.isString(process.env.NODERED_AUTO_SYNC_MIGRATIONS) ? parseInt(process.env.NODERED_AUTO_SYNC_MIGRATIONS) : true,
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
            bitcoin: process.env.HOST_MAIN_BITCOIN || 'https://middleware-bitcoin-mainnet-rest.chronobank.io',
            eth: process.env.HOST_MAIN_ETH || 'https://middleware-ethereum-mainnet-rest.chronobank.io',
            litecoin: process.env.HOST_MAIN_LITECOIN || 'https://middleware-litecoin-mainnet-rest.chronobank.io',
            nem: process.env.HOST_MAIN_NEM || 'https://middleware-nem-mainnet-rest.chronobank.io',
            waves: process.env.HOST_MAIN_WAVES || 'https://middleware-waves-mainnet-rest.chronobank.io'
          },
          dev: {
            bitcoin: process.env.HOST_DEV_BITCOIN || 'https://middleware-bitcoin-testnet-rest.chronobank.io',
            eth: process.env.HOST_DEV_ETH || 'https://middleware-ethereum-testnet-rest.chronobank.io',
            litecoin: process.env.HOST_DEV_LITECOIN || 'https://middleware-litecoin-testnet-rest.chronobank.io',
            nem: process.env.HOST_DEV_NEM || 'https://middleware-nem-testnet-rest.chronobank.io',
            waves: process.env.HOST_DEV_WAVES || 'https://middleware-waves-testnet-rest.chronobank.io'
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
