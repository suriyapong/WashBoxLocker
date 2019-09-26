// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class transportdriver extends Model {

  static get tableName() {
    return 'TransportDriver';
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
 
  
  return transportdriver;
};
