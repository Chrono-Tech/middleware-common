/**
 * Mongoose model. Used to store hashes, which need to be pinned.
 * @module models/accountModel
 * @returns {Object} Mongoose model
 */

const mongoose = require('mongoose'),
  config = require('../config'),
  messages = require('../factories/messages/addressMessageFactory');

require('mongoose-long')(mongoose);

/**
 * Account model definition
 * @param  {Object} obj Describes account's model
 * @return {Object} Model's object
 */
const Account = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
    validate: [a => /^(0x)?[0-9a-fA-F]{40}$/.test(a), messages.wrongAddress]
  },
  balance: {type: mongoose.Schema.Types.Long, default: 0},
  created: {type: Date, required: true, default: Date.now},
  erc20token: {type: mongoose.Schema.Types.Mixed, default: {}},
  password: {type: String}
});

module.exports = mongoose.model(`${config.mongo.accounts.collectionPrefix.eth}Account`, Account);
