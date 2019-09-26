// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class flight extends Model {

  static get tableName() {
    return 'Flight';
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
    const terminal = require('./terminal.model')();
    const aircrafts = require('./aircrafts.model')();
    const flightstatus = require('./flightstatus.model')();
    const airPortsModel = require('./airports.model')();
    const leg = require('./leg.model')();
    const passenger = require('./passenger.model')();
    const cargo = require('./cargo.model')();
    const bookingModel = require('./bookingpassenger.model')();
    
    return {
      terminal: {
        relation: Model.HasOneRelation,
        modelClass: terminal,
        join: {
          from: 'Flight.TerminalId',
          to: 'Terminal.Id'
        }
      },
      aircrafts: {
        relation: Model.HasOneRelation,
        modelClass: aircrafts,
        join: {
          from: 'Flight.AirCraftId',
          to: 'AirCrafts.Id'
        }
      },
      aircraftsrevise: {
        relation: Model.HasOneRelation,
        modelClass: aircrafts,
        join: {
          from: 'Flight.AirCraftIdRevise',
          to: 'AirCrafts.Id'
        }
      },
      flightstatus: {
        relation: Model.HasOneRelation,
        modelClass: flightstatus,
        join: {
          from: 'Flight.StatusId',
          to: 'FlightStatus.Id'
        }
      },
      departairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'Flight.DepartureAirportId',
          to: 'AirPorts.Id'
        }
      },
      
      arrivalairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'Flight.ArrivalAirportId',
          to: 'AirPorts.Id'
        }
      },
      leg: {
        relation: Model.HasManyRelation,
        modelClass: leg,
        join: {
          from: 'Flight.Id',
          to: 'Leg.FlightId'
        }
      },
      passenger:{
        relation: Model.HasManyRelation,
        modelClass: passenger,
        join: {
          from: 'Flight.Id',
          to: 'Passenger.FlightId'
        }
      },
      cargo:{
        relation: Model.HasManyRelation,
        modelClass: cargo,
        join: {
          from: 'Flight.Id',
          to: 'Cargo.FlightId'
        }
      },
      bookingpassenger:{
        relation: Model.HasManyRelation,
        modelClass: bookingModel,
        join: {
          from: 'Flight.FromBookingId',
          to: 'BookingPassenger.BookingId'
        }
      }
    }
  }
}

module.exports = function (app) {
 
  return flight;
};
