// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class cargo extends Model {

  static get tableName() {
    return 'Cargo';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
  
  }

  $beforeUpdate() {
   
  }

  static get relationMappings() {
   
    const airport = require('./airports.model')();
    
    return {
      airport: {
        relation: Model.HasOneRelation,
        modelClass: airport,
        join: {
          from: 'Cargo.DestAirPortId',
          to: 'AirPorts.Id'
        }
      }
    }
}

}

module.exports = function (app) {
  
  return cargo;
};
