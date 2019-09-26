// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class bookingpassenger extends Model {

  static get tableName() {
    return 'BookingPassenger';
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
    const bookingModel = require('./booking.model')();
    const airPortsModel = require('./airports.model')();
    const transportlocaltionModel = require('./transportlocaltion.model')();
    const passengertypeModel = require('./bookingpassengertype.model')();

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: userModel,
        join: {
          from: 'BookingPassenger.UserId',
          to: 'Users.Id'
        }
      },
      booking: {
        relation: Model.HasOneRelation,
        modelClass: bookingModel,
        join: {
          from: 'BookingPassenger.BookingId',
          to: 'Booking.Id'
        }
      },
      destairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'BookingPassenger.DestAirPortId',
          to: 'AirPorts.Id'
        }
      },
      transportLocaltion1: {
        relation: Model.HasOneRelation,
        modelClass: transportlocaltionModel,
        join: {
          from: 'BookingPassenger.TransportLocaltion1Id',
          to: 'TransportLocaltion.Id'
        }
      },
      transportLocaltion2: {
        relation: Model.HasOneRelation,
        modelClass: transportlocaltionModel,
        join: {
          from: 'BookingPassenger.TransportLocaltion2Id',
          to: 'TransportLocaltion.Id'
        }
      },
      passengertype: {
        relation: Model.HasOneRelation,
        modelClass: passengertypeModel,
        join: {
          from: 'BookingPassenger.PassengerTypeId',
          to: 'BookingPassengerType.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
 
  return bookingpassenger;
};
