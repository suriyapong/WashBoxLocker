// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class booking extends Model {

  static get tableName() {
    return 'Booking';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
   
  }

  $beforeUpdate() {
  
  }
  static get relationMappings() {
    
    
    const bookingstatus = require('./bookingstatus.model')();
    const airport = require('./airports.model')();
    const bookingpassengerModel = require('./bookingpassenger.model')();
    const bookinglegModel = require('./bookingleg.model')();
    const companyModel = require('./company.model')();

    
    return {
      
      bookingstatus: {
        relation: Model.HasOneRelation,
        modelClass: bookingstatus,
        join: {
          from: 'Booking.BookingStatusId',
          to: 'BookingStatus.Id'
        }
      },
     
      airport: {
        relation: Model.HasOneRelation,
        modelClass: airport,
        join: {
          from: 'Booking.DepartureAirportId',
          to: 'AirPorts.Id'
        }
      },
      bookingpassenger: {
        relation: Model.HasManyRelation,
        modelClass: bookingpassengerModel,
        join: {
          from: 'Booking.Id',
          to: 'BookingPassenger.BookingId'
        }
      },
      bookingleg: {
        relation: Model.HasManyRelation,
        modelClass: bookinglegModel,
        join: {
          from: 'Booking.Id',
          to: 'BookingLeg.BookingId'
        }
      },
      company: {
        relation: Model.HasOneRelation,
        modelClass: companyModel,
        join: {
          from: 'Booking.CompanyId',
          to: 'Companys.Id'
        }
      },
    
    }
  }
}

module.exports = function (app) {
 
  return booking;
};
