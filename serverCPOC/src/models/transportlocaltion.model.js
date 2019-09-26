// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class transportlocaltion extends Model {

  static get tableName() {
    return 'TransportLocaltion';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {

  }

  $beforeUpdate() {

  }
}

module.exports = function (app) {
  
  return transportlocaltion;
};
