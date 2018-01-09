module.exports.id = '7.e415e43d.f10178';

/**
 * @description flow e415e43d.f10178 update
 * @param done
 */


module.exports.up = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.update({'path': 'e415e43d.f10178', 'type': 'flows'}, {
    $set: {
      'path': 'e415e43d.f10178',
      'body': [{
        'id': 'b68ffffb.8e49e',
        'type': 'catch',
        'z': 'e415e43d.f10178',
        'name': '',
        'scope': ['beaf210e.a68b5', 'dcddc435.808558', '24b53a66.e40456', 'e0a395ba.179248', 'df152033.84567', '812c0b62.945398', '720a7fec.baa9e', '748a028.96689fc', 'f70d5160.d161e', '5c2fd91f.e496a8', 'fda36e1c.5b746', 'c4ae238f.87c9b', '5a693064.206b1', '2898629e.6c523e', 'e3f10547.a435f8', 'a90dc056.9b646', 'e7caa86c.a359b8', '2df60a21.6f9566', 'ef0cfed8.06147', '77952e28.6952e', 'a26acd02.40f55', 'c89b9cac.b94f8', 'd5964110.27516', 'bd829f7a.cb279', '8386e670.e63828', '4f4a8f65.c12ae', '38ab63fd.a1ab4c', 'b51c72b9.9a035', '49075d44.432d44'],
        'x': 147.00004196166992,
        'y': 1024.0000677108765,
        'wires': [['49075d44.432d44']]
      }, {
        'id': '5c2fd91f.e496a8',
        'type': 'http response',
        'z': 'e415e43d.f10178',
        'name': '',
        'statusCode': '',
        'x': 604.0000419616699,
        'y': 1025.0000677108765,
        'wires': []
      }, {
        'id': '49075d44.432d44',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': 'transform',
        'func': '\nlet factories = global.get("factories"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 388.0000419616699,
        'y': 1024.0000677108765,
        'wires': [['5c2fd91f.e496a8']]
      }, {
        'id': 'bd829f7a.cb279',
        'type': 'http in',
        'z': 'e415e43d.f10178',
        'name': 'multi post addr',
        'url': '/:network(dev|main)/addr',
        'method': 'post',
        'upload': false,
        'swaggerDoc': '',
        'x': 129.444450378418,
        'y': 422.784769058228,
        'wires': [['dcddc435.808558']]
      }, {
        'id': '5a693064.206b1',
        'type': 'http response',
        'z': 'e415e43d.f10178',
        'name': '',
        'statusCode': '',
        'x': 1308.073299407959,
        'y': 421.46534633636475,
        'wires': []
      }, {
        'id': '38ab63fd.a1ab4c',
        'type': 'split',
        'z': 'e415e43d.f10178',
        'name': '',
        'splt': '\\n',
        'spltType': 'str',
        'arraySplt': 1,
        'arraySpltType': 'len',
        'stream': false,
        'addname': '',
        'x': 464.069496154785,
        'y': 421.45138835907,
        'wires': [['4f0fa562.7f958c']]
      }, {
        'id': 'dcddc435.808558',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\n\nlet ethAddress = msg.payload.eth;\n\nmsg.payload = _.chain(msg.payload)\n.toPairs()\n.map(pairs=> ({\n    model: `${pairs[0]}Account`,\n    request: {\n        address: pairs[1],\n        ethAddress: ethAddress\n    },\n    blockchain: pairs[0],\n    requestDb: msg.req.params.network === \'main\' ? 2 : 1\n}))\n.value();\n\nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 326.069482803345,
        'y': 422.125,
        'wires': [['38ab63fd.a1ab4c']]
      }, {
        'id': '2df60a21.6f9566',
        'type': 'join',
        'z': 'e415e43d.f10178',
        'name': '',
        'mode': 'auto',
        'build': 'string',
        'property': 'payload',
        'propertyType': 'msg',
        'key': 'topic',
        'joiner': '\\n',
        'joinerType': 'str',
        'accumulate': false,
        'timeout': '',
        'count': '',
        'x': 966.0800857543945,
        'y': 421.96538734436035,
        'wires': [['24b53a66.e40456']]
      }, {
        'id': '24b53a66.e40456',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nconst genericMessages = global.get(\'factories.messages.generic\');\n\n\nmsg.payload = _.find(msg.payload, e=>e.code) ||\ngenericMessages.success;\n    \nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 1131.0733909606934,
        'y': 421.350830078125,
        'wires': [['5a693064.206b1']]
      }, {
        'id': '4f4a8f65.c12ae',
        'type': 'http in',
        'z': 'e415e43d.f10178',
        'name': 'proxy get',
        'url': '/:network(dev|main)/:type/:data*',
        'method': 'get',
        'upload': false,
        'swaggerDoc': '',
        'x': 128.072967529297,
        'y': 138.562514305115,
        'wires': [['beaf210e.a68b5']]
      }, {
        'id': 'beaf210e.a68b5',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nconst hosts = global.get(\'factories.hosts\');\n\nlet host = hosts[msg.req.params.network][msg.req.params.type];\n\nif(!host)\n throw new Error();\n\n\nlet url = msg.req.url;\nlet endpoint = url.match(/(?:.*?\\/){3}(.*)/)[1];\n\nmsg.url = `${host}/${endpoint}`;\n\nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 305.191024780273,
        'y': 137.895843505859,
        'wires': [['e7caa86c.a359b8']]
      }, {
        'id': 'c4ae238f.87c9b',
        'type': 'http response',
        'z': 'e415e43d.f10178',
        'name': '',
        'statusCode': '',
        'x': 673.184146881104,
        'y': 139.135420799255,
        'wires': []
      }, {
        'id': 'e7caa86c.a359b8',
        'type': 'http request',
        'z': 'e415e43d.f10178',
        'name': '',
        'method': 'GET',
        'ret': 'obj',
        'url': '',
        'tls': '',
        'x': 492.184162139893,
        'y': 138.618069171906,
        'wires': [['c4ae238f.87c9b']]
      }, {
        'id': '8386e670.e63828',
        'type': 'http in',
        'z': 'e415e43d.f10178',
        'name': 'post',
        'url': '/:network(dev|main)/:type/:data*',
        'method': 'post',
        'upload': true,
        'swaggerDoc': '',
        'x': 100.572906494141,
        'y': 258.899303436279,
        'wires': [['720a7fec.baa9e']]
      }, {
        'id': '720a7fec.baa9e',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nconst hosts = global.get(\'factories.hosts\');\n\nlet host = hosts[msg.req.params.network][msg.req.params.type];\n\nif(!host)\n throw new Error();\n\n\nlet url = msg.req.url;\nlet endpoint = url.match(/(?:.*?\\/){3}(.*)/)[1];\nmsg.url = `${host}/${endpoint}`;\n\nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 300.802085876465,
        'y': 259.343778610229,
        'wires': [['e3f10547.a435f8']]
      }, {
        'id': 'fda36e1c.5b746',
        'type': 'http response',
        'z': 'e415e43d.f10178',
        'name': '',
        'statusCode': '',
        'x': 672.795171737671,
        'y': 259.583365440369,
        'wires': []
      }, {
        'id': 'e3f10547.a435f8',
        'type': 'http request',
        'z': 'e415e43d.f10178',
        'name': '',
        'method': 'POST',
        'ret': 'obj',
        'url': '',
        'tls': '',
        'x': 487.795164108276,
        'y': 260.177123069763,
        'wires': [['fda36e1c.5b746']]
      }, {
        'id': '4f0fa562.7f958c',
        'type': 'mongo',
        'z': 'e415e43d.f10178',
        'model': '',
        'request': '{}',
        'name': 'mongo create addr',
        'mode': '1',
        'requestType': '1',
        'x': 655.0730209350586,
        'y': 423.4826602935791,
        'wires': [['2df60a21.6f9566']]
      }, {
        'id': '54784fcc.26055',
        'type': 'catch',
        'z': 'e415e43d.f10178',
        'name': '',
        'scope': ['4f0fa562.7f958c'],
        'x': 454.0833168029785,
        'y': 487.9236125946045,
        'wires': [['df152033.84567']]
      }, {
        'id': 'df152033.84567',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nlet genericMessages = global.get("factories.messages.generic");\nlet addressMessages = global.get("factories.messages.address"); \n\nlet error = msg.error.message;\n\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nmsg.payload = error && error.code === 11000 ? \n_.merge({}, addressMessages.existAddress, {blockchain: msg.payload.blockchain}) :\ngenericMessages.fail;\n    \nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 662.0764350891113,
        'y': 485.24307346343994,
        'wires': [['2df60a21.6f9566']]
      }, {
        'id': '2e9e3151.f50c1e',
        'type': 'http in',
        'z': 'e415e43d.f10178',
        'name': 'multi delete addr',
        'url': '/:network(dev|main)/addr',
        'method': 'delete',
        'upload': false,
        'swaggerDoc': '',
        'x': 133,
        'y': 569.0104331970215,
        'wires': [['46978b8d.e504d4']]
      }, {
        'id': '966ddd58.c1764',
        'type': 'http response',
        'z': 'e415e43d.f10178',
        'name': '',
        'statusCode': '',
        'x': 1251.6289978027344,
        'y': 567.6910095214844,
        'wires': []
      }, {
        'id': '9a34f9e3.76db98',
        'type': 'split',
        'z': 'e415e43d.f10178',
        'name': '',
        'splt': '\\n',
        'spltType': 'str',
        'arraySplt': 1,
        'arraySpltType': 'len',
        'stream': false,
        'addname': '',
        'x': 467.62504577636696,
        'y': 567.6770524978635,
        'wires': [['de72173b.727168']]
      }, {
        'id': '46978b8d.e504d4',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\n\nmsg.payload = _.chain(msg.payload)\n.toPairs()\n.map(pairs=> ({\n    model: `${pairs[0]}Account`,\n    request: {\n        address: pairs[1]\n    },\n    blockchain: pairs[0],\n    requestDb: msg.req.params.network === \'main\' ? 2 : 1\n}))\n.value();\n\nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 329.625032424927,
        'y': 568.3506641387935,
        'wires': [['9a34f9e3.76db98']]
      }, {
        'id': '23338f2b.fe6f9',
        'type': 'join',
        'z': 'e415e43d.f10178',
        'name': '',
        'mode': 'auto',
        'build': 'string',
        'property': 'payload',
        'propertyType': 'msg',
        'key': 'topic',
        'joiner': '\\n',
        'joinerType': 'str',
        'accumulate': false,
        'timeout': '',
        'count': '',
        'x': 901.6356353759766,
        'y': 569.1910228729248,
        'wires': [['e1d82ffc.0bff3']]
      }, {
        'id': 'e1d82ffc.0bff3',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nconst genericMessages = global.get(\'factories.messages.generic\');\n\n\nmsg.payload = genericMessages.success;\n    \nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 1076.6289329528809,
        'y': 569.5764665603638,
        'wires': [['966ddd58.c1764']]
      }, {
        'id': 'de72173b.727168',
        'type': 'mongo',
        'z': 'e415e43d.f10178',
        'model': '',
        'request': '{}',
        'name': 'mongo remove addr',
        'mode': '1',
        'requestType': '3',
        'x': 668.6285705566406,
        'y': 569.7083244323726,
        'wires': [['23338f2b.fe6f9']]
      }, {
        'id': '71647853.f7ad28',
        'type': 'split',
        'z': 'e415e43d.f10178',
        'name': '',
        'splt': '\\n',
        'spltType': 'str',
        'arraySplt': 1,
        'arraySpltType': 'len',
        'stream': false,
        'addname': '',
        'x': 526.9652252197266,
        'y': 746.5729646682739,
        'wires': [['cf756fa6.d314c']]
      }, {
        'id': '2a6d9ee9.2b9842',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\n\n\nlet db = _.get(msg.amqpMessage.fields.routingKey.match(/(prod|dev)/), \'0\');\n\n\nif(!db)\n  throw Error();\n\nmsg.payload = JSON.parse(msg.payload);\nlet ethAddress = msg.payload.eth;\n\n\nlet modifiers = {\n  eth: addr=>addr.toLowerCase()  \n};\n\nmsg.payload = _.chain(msg.payload)\n.toPairs()\n.map(pairs=> ({\n    model: `${pairs[0]}Account`,\n    request: {\n        address: modifiers[pairs[0]] ? modifiers[pairs[0]](pairs[1]) : pairs[1],\n        ethAddress: ethAddress ? modifiers.eth(ethAddress): undefined\n    },\n    blockchain: pairs[0],\n    requestDb: db === \'prod\' ? \'2\' : \'1\'\n}))\n.value();\n\nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 350.9652404785156,
        'y': 748.2464847564697,
        'wires': [['71647853.f7ad28']]
      }, {
        'id': '20684b59.574ce4',
        'type': 'join',
        'z': 'e415e43d.f10178',
        'name': '',
        'mode': 'auto',
        'build': 'string',
        'property': 'payload',
        'propertyType': 'msg',
        'key': 'topic',
        'joiner': '\\n',
        'joinerType': 'str',
        'accumulate': false,
        'timeout': '',
        'count': '',
        'x': 909.9758758544922,
        'y': 745.0869770050049,
        'wires': [['3d0c22fc.8b715e']]
      }, {
        'id': '3d0c22fc.8b715e',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nconst genericMessages = global.get(\'factories.messages.generic\');\n\n\nmsg.payload = _.find(msg.payload, e=>e.code) ||\ngenericMessages.success;\n    \nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 1052.969123840332,
        'y': 744.4724750518799,
        'wires': [[]]
      }, {
        'id': 'cf756fa6.d314c',
        'type': 'mongo',
        'z': 'e415e43d.f10178',
        'model': '',
        'request': '{}',
        'name': 'mongo create addr',
        'mode': '1',
        'requestType': '1',
        'x': 719.9687728881836,
        'y': 745.6043109893799,
        'wires': [['20684b59.574ce4']]
      }, {
        'id': 'ee0e36c1.9cedd8',
        'type': 'amqp in',
        'z': 'e415e43d.f10178',
        'name': 'post addresses',
        'topic': '*.accounts.create',
        'iotype': '3',
        'ioname': 'events',
        'noack': '1',
        'durablequeue': '1',
        'durableexchange': '0',
        'server': '',
        'servermode': '1',
        'x': 142.03123474121094,
        'y': 749.2118158340454,
        'wires': [['2a6d9ee9.2b9842']]
      }, {
        'id': 'f3662818.372118',
        'type': 'split',
        'z': 'e415e43d.f10178',
        'name': '',
        'splt': '\\n',
        'spltType': 'str',
        'arraySplt': 1,
        'arraySpltType': 'len',
        'stream': false,
        'addname': '',
        'x': 517.017333984375,
        'y': 847.8992919921875,
        'wires': [['db040653.16adf8']]
      }, {
        'id': '838f03ba.bb861',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\n\n\nlet db = _.get(msg.amqpMessage.fields.routingKey.match(/(prod|dev)/), \'0\');\n\n\nif(!db)\n  throw Error();\n\nmsg.payload = JSON.parse(msg.payload);\nlet ethAddress = msg.payload.eth;\n\n\nlet modifiers = {\n  eth: addr=>addr.toLowerCase()  \n};\n\nmsg.payload = _.chain(msg.payload)\n.toPairs()\n.map(pairs=> ({\n    model: `${pairs[0]}Account`,\n    request: {\n        address: modifiers[pairs[0]] ? modifiers[pairs[0]](pairs[1]) : pairs[1],\n        ethAddress: ethAddress ? modifiers.eth(ethAddress): undefined\n    },\n    blockchain: pairs[0],\n    requestDb: db === \'prod\' ? \'2\' : \'1\'\n}))\n.value();\n\nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 341.01734924316406,
        'y': 849.5728120803833,
        'wires': [['f3662818.372118']]
      }, {
        'id': '952383f1.e97b2',
        'type': 'join',
        'z': 'e415e43d.f10178',
        'name': '',
        'mode': 'auto',
        'build': 'string',
        'property': 'payload',
        'propertyType': 'msg',
        'key': 'topic',
        'joiner': '\\n',
        'joinerType': 'str',
        'accumulate': false,
        'timeout': '',
        'count': '',
        'x': 900.0279846191406,
        'y': 846.4133043289185,
        'wires': [['2082878a.bcc018']]
      }, {
        'id': '2082878a.bcc018',
        'type': 'function',
        'z': 'e415e43d.f10178',
        'name': '',
        'func': 'const _ = global.get(\'_\');\nconst genericMessages = global.get(\'factories.messages.generic\');\n\n\nmsg.payload = _.find(msg.payload, e=>e.code) ||\ngenericMessages.success;\n    \nreturn msg;',
        'outputs': 1,
        'noerr': 0,
        'x': 1043.0212326049805,
        'y': 845.7988023757935,
        'wires': [[]]
      }, {
        'id': 'db040653.16adf8',
        'type': 'mongo',
        'z': 'e415e43d.f10178',
        'model': '',
        'request': '{}',
        'name': 'mongo remove addr',
        'mode': '1',
        'requestType': '3',
        'x': 720.020881652832,
        'y': 846.9306383132935,
        'wires': [['952383f1.e97b2']]
      }, {
        'id': '2b6ac09b.baddd',
        'type': 'amqp in',
        'z': 'e415e43d.f10178',
        'name': 'delete addresses',
        'topic': '*.accounts.delete',
        'iotype': '3',
        'ioname': 'events',
        'noack': '1',
        'durablequeue': '1',
        'durableexchange': '0',
        'server': '',
        'servermode': '1',
        'x': 132.08334350585938,
        'y': 850.538143157959,
        'wires': [['838f03ba.bb861']]
      }]
    }
  }, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.remove({'path': 'e415e43d.f10178', 'type': 'flows'}, done);
};
