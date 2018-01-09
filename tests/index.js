require('dotenv/config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = require('../config'),
  mongoose = require('mongoose'),
  expect = require('chai').expect,
  _ = require('lodash'),
  WebSocket = require('ws'),
  Stomp = require('webstomp-client'),
  bitcoinAccountModel = require('../models/bitcoinAccountModel'),
  ethAccountModel = require('../models/ethAccountModel'),
  Promise = require('bluebird'),
  request = require('request'),
  moment = require('moment'),
  ctx = {};

describe('core/rest', function () {

  before(() => {
    mongoose.Promise = Promise;
    return mongoose.connect(config.mongo.accounts.test.uri, {useMongoClient: true});
  });

  after(() => {
    return mongoose.disconnect();
  });

  it('add account', async () => {
    ctx.address = {
      eth: `0x${_.chain(new Array(40)).map(() => _.random(0, 9)).join('').value()}`,
      bitcoin: `n3${_.chain(new Array(32)).map(() => _.random(1, 15).toString(16)).join('').value()}`
    };

    await new Promise((res, rej) => {
      request({
        url: `http://localhost:${config.rest.port}/dev/addr/`,
        method: 'POST',
        json: ctx.address
      }, (err, resp) => {
        err || resp.statusCode !== 200 ? rej(err) : res()
      })
    });

  });

  it('validate account', async () => {
    let bitcoinAccount = await bitcoinAccountModel.findOne({address: ctx.address.bitcoin});
    let ethAccount = await ethAccountModel.findOne({address: ctx.address.eth});
    expect(bitcoinAccount).to.include({'address': ctx.address.bitcoin});
    expect(ethAccount).to.include({'address': ctx.address.eth});
  });

  it('add another account via stomp', async () => {
    ctx.address = {
      eth: `0x${_.chain(new Array(40)).map(() => _.random(0, 9)).join('').value()}`,
      bitcoin: `n3${_.chain(new Array(32)).map(() => _.random(1, 15).toString(16)).join('').value()}`
    };


    let ws = new WebSocket('ws://localhost:15674/ws');
    let client = Stomp.over(ws, {heartbeat: false, debug: false});

    await new Promise((res, rej)=>
      client.connect('guest', 'guest', res, rej)
    );

    client.send('/exchange/events/dev.accounts.create', new Buffer(JSON.stringify(ctx.address)));

  });

  it('validate new account', async () => {
    await Promise.delay(2000);
    let bitcoinAccount = await bitcoinAccountModel.findOne({address: ctx.address.bitcoin});
    let ethAccount = await ethAccountModel.findOne({address: ctx.address.eth});
    expect(bitcoinAccount).to.include({'address': ctx.address.bitcoin});
    expect(ethAccount).to.include({'address': ctx.address.eth});
  });

});
