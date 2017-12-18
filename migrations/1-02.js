'use strict';

module.exports.id = '1.02';

/**
 * @description tabs flow settings
 * @param done
 */

module.exports.up = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.insert({
    'meta' : {},
    'type' : 'flows',
    'path' : 'tabs',
    'body' : [
      {
        'id' : 'e415e43d.f10178',
        'type' : 'tab',
        'label' : 'rest',
        'disabled' : false,
        'info' : ''
      }
    ]
  }, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.remove({
    'type': 'flows',
    'path': 'tabs'
  }, done);
  done();
};
