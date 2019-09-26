// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class leg extends Model {

  static get tableName() {
    return 'Leg';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
   
    const airport = require('./airports.model')();
    
    return {
      airport: {
        relation: Model.HasOneRelation,
        modelClass: airport,
        join: {
          from: 'Leg.AirportId',
          to: 'AirPorts.Id'
        }
      }
    }
}
}

module.exports = function (app) {
  
  return leg;
};
