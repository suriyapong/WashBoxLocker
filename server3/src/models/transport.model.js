// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class transport extends Model {

  static get tableName() {
    return 'Transport';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {

  }

  $beforeUpdate() {

  }
  static get relationMappings() {

    const bookingModel = require('./booking.model')();
    const TrasportJobModel = require('./transportjob.model')();
      
      return {
        booking: {
          relation: Model.HasOneRelation,
          modelClass: bookingModel,
          join: {
            from: 'Transport.FromBookingId',
            to: 'Booking.Id'
          }
        },
        transportjob: {
          relation: Model.HasManyRelation,
          modelClass: TrasportJobModel,
          join: {
            from: 'Transport.Id',
            to: 'TransportJob.TransportId'
          }
        },
        
        
      }
    }
}

module.exports = function (app) {
  

  return transport;
};
