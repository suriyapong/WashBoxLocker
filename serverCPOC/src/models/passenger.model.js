// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class passenger extends Model {

  static get tableName() {
    return 'Passenger';
  }

  static get idColumn() {
    return 'Id';
  }

  static get relationMappings() {
    const flightModel = require('./flight.model')();
    const userModel = require('./user.model')();
    const airPortsModel = require('./airports.model')();
    const alcoholstatusModel = require('./alcoholstatus.model')(); 
    const alcoholtestModel = require('./alcoholtest.model')(); 
    const baggage = require('./baggage.model')(); 
    const company = require('./company.model')();
    return {
      flight:{
        relation: Model.HasOneRelation,
        modelClass: flightModel,
        join: {
          from: 'Passenger.FlightId',
          to: 'Flight.Id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: userModel,
        join: {
          from: 'Passenger.UserId',
          to: 'Users.Id'
        }
      },
      destairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'Passenger.DestAirPortId',
          to: 'AirPorts.Id'
        }
      },
      departairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'Passenger.DepartAirPortId',
          to: 'AirPorts.Id'
        }
      },
      alcoholstatus: {
        relation: Model.HasOneRelation,
        modelClass: alcoholstatusModel,
        join: {
          from: 'Passenger.AlcoholStatusId',
          to: 'AlcoholStatus.Id'
        }
      } ,
      alcoholtest: {
        relation: Model.HasManyRelation,
        modelClass: alcoholtestModel,
        join: {
          from: 'Passenger.Id',
          to: 'AlcoholTest.PassengerId'
        }
      },
      baggage: {
        relation: Model.HasManyRelation,
        modelClass: baggage,
        join: {
          from: 'Passenger.Id',
          to: 'Baggage.PassengerId'
        }
      } ,
      
      company: {
        relation: Model.HasOneRelation,
        modelClass: company,
        join: {
          from: 'Passenger.CompanyId',
          to: 'Companys.Id'
        }
      }
    }
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
    
  }
}

module.exports = function (app) {
  return passenger;
};
