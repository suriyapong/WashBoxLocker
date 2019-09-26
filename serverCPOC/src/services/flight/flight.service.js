// Initializes the `flight` service on path `/flight`
const createService = require('feathers-objection');
const createModel = require('../../models/flight.model');
const hooks = require('./flight.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[terminal,flightstatus,aircrafts,aircraftsrevise,arrivalairport,departairport,leg.airport,bookingpassenger.[user.[company],destairport],passenger.[baggage,user,alcoholstatus,alcoholtest,destairport,departairport],cargo.airport]'
   
  };

  // Initialize our service with any options it requires
  app.use('/flight', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('flight');

  service.hooks(hooks);
};
