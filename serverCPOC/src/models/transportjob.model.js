// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class transportjob extends Model {

  static get tableName() {
    return 'TransportJob';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
   
  }
  static get relationMappings() {

  const userModel = require('./user.model')();
  const TransportLocaltionModel = require('./transportLocaltion.model')();
  const TrasportDriverModel = require('./transportdriver.model')();
    
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: userModel,
        join: {
          from: 'TransportJob.UserId',
          to: 'Users.Id'
        }
      },
      transportLocaltion1: {
        relation: Model.HasOneRelation,
        modelClass: TransportLocaltionModel,
        join: {
          from: 'TransportJob.TransportLocaltion1Id',
          to: 'TransportLocaltion.Id'
        }
      },
      transportLocaltion2: {
        relation: Model.HasOneRelation,
        modelClass: TransportLocaltionModel,
        join: {
          from: 'TransportJob.TransportLocaltion2Id',
          to: 'TransportLocaltion.Id'
        }
      },
      driver: {
        relation: Model.HasOneRelation,
        modelClass: TrasportDriverModel,
        join: {
          from: 'TransportJob.TransportDriverId',
          to: 'TransportDriver.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
 
  return transportjob;
};
