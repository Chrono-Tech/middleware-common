const amqp = require("amqp-ts"),
  config = require('../config'),
  _ = require('lodash');

module.exports = function (RED) {
  let exchangeTypes = ["direct", "fanout", "headers", "topic"];

  async function initialize (node) {
    if (!node.server)
      node.server = new AmqpServer({servermode: '1'});

    node.status({fill: "green", shape: "ring", text: "connecting"});

    try {
      await node.server.claimConnection();

      node.queue = node.server.connection.declareQueue(`${config.rabbit.serviceName}.${node.id}`);

      if (node.ioType !== "4") {
        node.exchange = node.server.connection.declareExchange(node.ioName, exchangeTypes[node.ioType]);
        node.queue.bind(node.exchange, node.topic);
      }

      node.status({fill: "green", shape: "dot", text: "connected"});
      node.initialize();
    } catch (err) {
      node.status({fill: "red", shape: "dot", text: "connect error"});
      node.error("AMQP " + node.amqpType + " node connect error: " + err.message);
    }

    node.on("close", async function () {
      try {
        await node.src.close();
        node.server.freeConnection();
        node.status({fill: "red", shape: "ring", text: "disconnected"});
      } catch (err) {
        node.server.freeConnection();
        node.status({fill: "red", shape: "dot", text: "disconnect error"});
        node.error("AMQP " + node.amqpType + " node disconnect error: " + err.message);
      }
    });
  }

//
//-- AMQP IN ------------------------------------------------------------------
//
  function AmqpIn (n) {
    let node = this;
    RED.nodes.createNode(node, n);
    node.source = n.source;
    node.topic = n.topic;
    node.ioType = n.iotype;
    node.noack = n.noack;
    node.ioName = n.ioname;
    node.server = RED.nodes.getNode(n.server);
    // set amqp node type initialization parameters
    node.amqpType = "input";
    node.src = null;
    // node specific initialization code
    node.initialize = async function () {
      function Consume (msg) {
        console.log('!!!');
        node.send({
          topic: node.topic || msg.fields.routingKey,
          payload: msg.getContent(),
          amqpMessage: msg
        });
      }

      try {
        await node.queue.activateConsumer(Consume, {noAck: node.noack === '1'});
        node.status({fill: "green", shape: "dot", text: "connected"});
      } catch (err) {
        node.status({fill: "red", shape: "dot", text: "error"});
        node.error("AMQP input error: " + err.message);
      }

    };
    initialize(node);
  }

//
//-- AMQP OUT -----------------------------------------------------------------
//
  function AmqpOut (n) {
    let node = this;
    RED.nodes.createNode(node, n);
    node.source = n.source;
    node.topic = n.routingkey;
    node.ioType = n.iotype;
    node.ioName = n.ioname;
    node.server = RED.nodes.getNode(n.server);
    // set amqp node type initialization parameters
    node.amqpType = "output";
    node.src = null;
    // node specific initialization code
    node.initialize = function () {
      node.on("input", async function (msg) {
        message = msg.payload ? new amqp.Message(msg.payload, msg.options) :
          new amqp.Message(msg);
        message.sendTo(node.src, node.topic || msg.topic);
      });
    };
    initialize(node);
  }

//
//-- AMQP SERVER --------------------------------------------------------------
//
  function AmqpServer (n) {
    let node = this;
    RED.nodes.createNode(node, n);
    // Store local copies of the node configuration (as defined in the .html)
    node.host = n.host || "localhost";
    node.port = n.port || "5672";
    node.vhost = n.vhost;
    node.keepAlive = n.keepalive;
    node.useTls = n.usetls;
    node.useTopology = n.usetopology;
    node.topology = n.topology;
    node.clientCount = 0;
    node.servermode = n.servermode;
    node.connectionPromise = null;
    node.connection = null;
    node.claimConnection = function () {
      if (node.clientCount === 0) {
        // Create the connection url for the AMQP server
        let urlType = node.useTls ? "amqps://" : "amqp://";
        let credentials = _.has(node, 'credentials.user') ? `${node.credentials.user}:${node.credentials.password}@` : '';
        let urlLocation = node.host + ":" + node.port;
        if (node.vhost) {
          urlLocation += "/" + node.vhost;
        }
        if (node.keepAlive) {
          urlLocation += "?heartbeat=" + node.keepAlive;
        }
        node.connection = new amqp.Connection(node.servermode === '1' ? config.rabbit.url : urlType + credentials + urlLocation);
        node.connectionPromise = node.connection.initialized.then(function () {
          node.log("Connected to AMQP server " + urlType + urlLocation);
        }).catch(function (e) {
          node.error("AMQP-SERVER error: " + e.message);
        });
        // Create topology
        if (node.useTopology) {
          try {
            var topology = JSON.parse(node.topology);
          }
          catch (e) {
            node.error("AMQP-SERVER error creating topology: " + e.message);
          }
          node.connectionPromise = node.connection.declareTopology(topology).catch(function (e) {
            node.error("AMQP-SERVER error creating topology: " + e.message);
          });
        }
      }
      node.clientCount++;
      return node.connectionPromise;
    };
    node.freeConnection = function () {
      node.clientCount--;
      if (node.clientCount === 0) {
        node.connection.close().then(function () {
          node.connection = null;
          node.connectionPromise = null;
          node.log("AMQP server connection " + node.host + " closed");
        }).catch(function (e) {
          node.error("AMQP-SERVER error closing connection: " + e.message);
        });
      }
    };
  }

// Register the node by name. This must be called before overriding any of the
// Node functions.
  RED.nodes.registerType("amqp in", AmqpIn);
  RED.nodes.registerType("amqp out", AmqpOut);
  RED.nodes.registerType("amqp-server", AmqpServer, {
    credentials: {
      user: {type: "text"},
      password: {type: "password"}
    }
  });
};
