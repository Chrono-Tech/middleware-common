'use strict';

module.exports.id = '1.01';

/**
 * @description rest flow
 * @param done
 */

module.exports.up = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.insert({
    'meta' : {},
    'type' : 'flows',
    'path' : 'e415e43d.f10178',
    'body' : [
      {
        'id' : 'b68ffffb.8e49e',
        'type' : 'catch',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'scope' : null,
        'x' : 214.000007629395,
        'y' : 583.000039100647,
        'wires' : [
          [
            '49075d44.432d44'
          ]
        ]
      },
      {
        'id' : '5c2fd91f.e496a8',
        'type' : 'http response',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'statusCode' : '',
        'x' : 671.000007629395,
        'y' : 584.000039100647,
        'wires' : []
      },
      {
        'id' : '49075d44.432d44',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : 'transform',
        'func' : '\nlet factories = global.get("factories"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 455.000007629395,
        'y' : 583.000039100647,
        'wires' : [
          [
            '5c2fd91f.e496a8'
          ]
        ]
      },
      {
        'id' : 'bd829f7a.cb279',
        'type' : 'http in',
        'z' : 'e415e43d.f10178',
        'name' : 'multi post addr',
        'url' : '/:network(dev|main)/addr',
        'method' : 'post',
        'upload' : false,
        'swaggerDoc' : '',
        'x' : 129.444450378418,
        'y' : 422.784769058228,
        'wires' : [
          [
            'dcddc435.808558'
          ]
        ]
      },
      {
        'id' : '5a693064.206b1',
        'type' : 'http response',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'statusCode' : '',
        'x' : 1454.07308197021,
        'y' : 420.465315818787,
        'wires' : []
      },
      {
        'id' : '38ab63fd.a1ab4c',
        'type' : 'split',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'splt' : '\\n',
        'spltType' : 'str',
        'arraySplt' : 1,
        'arraySpltType' : 'len',
        'stream' : false,
        'addname' : '',
        'x' : 464.069496154785,
        'y' : 421.45138835907,
        'wires' : [
          [
            'cccf8f57.1f237'
          ]
        ]
      },
      {
        'id' : 'dcddc435.808558',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'func' : 'const _ = global.get(\'_\');\nconst hosts = global.get(\'factories.hosts\')[msg.req.params.network];\n\nif(!hosts)\n throw new Error();\n\n\nmsg.payload = _.chain(msg.payload)\n.toPairs()\n.map(pairs=> ({\n    host: hosts[pairs[0]],\n    address: pairs[1],\n    type: pairs[0]\n}))\n.filter(item=>item.host)\n.value();\n\nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 326.069482803345,
        'y' : 422.125,
        'wires' : [
          [
            '38ab63fd.a1ab4c'
          ]
        ]
      },
      {
        'id' : '2df60a21.6f9566',
        'type' : 'join',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'mode' : 'auto',
        'build' : 'string',
        'property' : 'payload',
        'propertyType' : 'msg',
        'key' : 'topic',
        'joiner' : '\\n',
        'joinerType' : 'str',
        'accumulate' : false,
        'timeout' : '',
        'count' : '',
        'x' : 1160.08000183105,
        'y' : 420.96531867981,
        'wires' : [
          [
            '24b53a66.e40456'
          ]
        ]
      },
      {
        'id' : '24b53a66.e40456',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'func' : 'const _ = global.get(\'_\');\n\nmsg.payload = _.chain(msg.payload)\n.transform((result, item)=>{\n    _.merge(result, item);\n}, {})\n.value();\n\nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 1303.07307434082,
        'y' : 420.350807189941,
        'wires' : [
          [
            '5a693064.206b1'
          ]
        ]
      },
      {
        'id' : '4f4a8f65.c12ae',
        'type' : 'http in',
        'z' : 'e415e43d.f10178',
        'name' : 'proxy get',
        'url' : '/:network(dev|main)/:type/:data*',
        'method' : 'get',
        'upload' : false,
        'swaggerDoc' : '',
        'x' : 128.072967529297,
        'y' : 138.562514305115,
        'wires' : [
          [
            'beaf210e.a68b5'
          ]
        ]
      },
      {
        'id' : 'beaf210e.a68b5',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'func' : 'const _ = global.get(\'_\');\nconst hosts = global.get(\'factories.hosts\');\n\nlet host = hosts[msg.req.params.network][msg.req.params.type];\n\nif(!host)\n throw new Error();\n\n\nlet url = msg.req.url;\nlet endpoint = url.match(/(?:.*?\\/){3}(.*)/)[1];\n\nmsg.url = `${host}/${endpoint}`;\n\nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 305.191024780273,
        'y' : 137.895843505859,
        'wires' : [
          [
            'e7caa86c.a359b8'
          ]
        ]
      },
      {
        'id' : 'c4ae238f.87c9b',
        'type' : 'http response',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'statusCode' : '',
        'x' : 673.184146881104,
        'y' : 139.135420799255,
        'wires' : []
      },
      {
        'id' : 'e7caa86c.a359b8',
        'type' : 'http request',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'method' : 'GET',
        'ret' : 'obj',
        'url' : '',
        'tls' : '',
        'x' : 492.184162139893,
        'y' : 138.618069171906,
        'wires' : [
          [
            'c4ae238f.87c9b'
          ]
        ]
      },
      {
        'id' : '8386e670.e63828',
        'type' : 'http in',
        'z' : 'e415e43d.f10178',
        'name' : 'proxy post',
        'url' : '/:network(dev|main)/:type/:data*',
        'method' : 'post',
        'upload' : false,
        'swaggerDoc' : '',
        'x' : 110.572906494141,
        'y' : 258.899303436279,
        'wires' : [
          [
            '720a7fec.baa9e'
          ]
        ]
      },
      {
        'id' : '720a7fec.baa9e',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'func' : 'const _ = global.get(\'_\');\nconst hosts = global.get(\'factories.hosts\');\n\nlet host = hosts[msg.req.params.network][msg.req.params.type];\n\nif(!host)\n throw new Error();\n\n\nlet url = msg.req.url;\nlet endpoint = url.match(/(?:.*?\\/){3}(.*)/)[1];\nmsg.url = `${host}/${endpoint}`;\n\nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 300.802085876465,
        'y' : 259.343778610229,
        'wires' : [
          [
            'e3f10547.a435f8'
          ]
        ]
      },
      {
        'id' : 'fda36e1c.5b746',
        'type' : 'http response',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'statusCode' : '',
        'x' : 672.795171737671,
        'y' : 259.583365440369,
        'wires' : []
      },
      {
        'id' : 'e3f10547.a435f8',
        'type' : 'http request',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'method' : 'POST',
        'ret' : 'obj',
        'url' : '',
        'tls' : '',
        'x' : 487.795164108276,
        'y' : 260.177123069763,
        'wires' : [
          [
            'fda36e1c.5b746'
          ]
        ]
      },
      {
        'id' : '38f0355d.98baca',
        'type' : 'http request',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'method' : 'POST',
        'ret' : 'obj',
        'url' : '',
        'tls' : '',
        'x' : 795.017421722412,
        'y' : 421.010457038879,
        'wires' : [
          [
            '73479305.abe43c'
          ]
        ]
      },
      {
        'id' : 'cccf8f57.1f237',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'func' : '\nmsg.url = `${msg.payload.host}/addr`;\nmsg.type = msg.payload.type;\nmsg.payload = {\n    address: msg.payload.address\n}\n\nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 624.072952270508,
        'y' : 422.128486633301,
        'wires' : [
          [
            '38f0355d.98baca'
          ]
        ]
      },
      {
        'id' : '73479305.abe43c',
        'type' : 'function',
        'z' : 'e415e43d.f10178',
        'name' : '',
        'func' : '\n\nmsg.payload = {\n    [msg.type]: msg.payload\n}\n\nreturn msg;',
        'outputs' : 1,
        'noerr' : 0,
        'x' : 984.07299041748,
        'y' : 420.232686042786,
        'wires' : [
          [
            '2df60a21.6f9566'
          ]
        ]
      }
    ]
  }, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.remove({
    'type': 'flows',
    'path': 'e415e43d.f10178'
  }, done);
  done();
};
