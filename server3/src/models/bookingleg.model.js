// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class bookingleg extends Model {

  static get tableName() {
    return 'BookingLeg';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
   
  }

  $beforeUpdate() {
  
  }
  static get relationMappings() {
    const airportModel = require('./airports.model')();
    const bookingModel = require('./booking.model')();

    return {
      airport: {
        relation: Model.HasOneRelation,
        modelClass: airportModel,
        join: {
          from: 'BookingLeg.DestAirPortId',
          to: 'AirPorts.Id'
        }
      },
      booking: {
        relation: Model.HasOneRelation,
        modelClass: bookingModel,
        join: {
          from: 'BookingLeg.BookingId',
          to: 'Booking.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
 
  return bookingleg;
};
