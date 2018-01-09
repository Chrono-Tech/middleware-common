/**
 * Expose an express web server
 * @module middleware-eth-rest
 */

const config = require('./config'),
  express = require('express'),
  cors = require('cors'),
  path = require('path'),
  Promise = require('bluebird'),
  mongoose = require('mongoose'),
  bunyan = require('bunyan'),
  log = bunyan.createLogger({name: 'core.rest'}),
  RED = require('node-red'),
  http = require('http'),
  _ = require('lodash'),
  bodyParser = require('body-parser');

let models = require('require-all')({
  dirname: path.join(__dirname, '/models'),
  filter: /(.+Model)\.js$/
});

mongoose.Promise = Promise;
mongoose.connect(config.mongo.nodered.uri, {useMongoClient: true});

mongoose.accounts = {
  main: mongoose.createConnection(config.mongo.accounts.main.uri),
  test: mongoose.createConnection(config.mongo.accounts.test.uri)
};

_.chain(models)
  .toPairs()
  .filter(pair => /(.+)AccountModel/.test(pair[0]))
  .forEach(pair => {
    mongoose.accounts.main.model(pair[1].collection.collectionName, pair[1].schema);
    mongoose.accounts.test.model(pair[1].collection.collectionName, pair[1].schema);
  })
  .value();

[mongoose.connection, mongoose.accounts.main, mongoose.accounts.test]
  .forEach(connection =>
    connection.on('disconnected', function () {
      log.error('mongo disconnected!');
      process.exit(0);
    })
  );

const init = async () => {

  if (config.nodered.autoSyncMigrations)
    await require('./migrate');

  let app = express();
  let httpServer = http.createServer(app);
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  RED.init(httpServer, config.nodered);
  app.use(config.nodered.httpAdminRoot, RED.httpAdmin);
  app.use(config.nodered.httpNodeRoot, RED.httpNode);

  httpServer.listen(config.rest.port);
  RED.start();
};

module.exports = init();
