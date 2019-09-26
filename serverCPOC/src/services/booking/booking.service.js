// Initializes the `booking` service on path `/booking`
const createService = require('feathers-objection');
const createModel = require('../../models/booking.model');
const hooks = require('./booking.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[company,bookingpassenger,bookingstatus,airport,bookingleg.airport]'
   
  };

  // Initialize our service with any options it requires
  app.use('/booking', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('booking');

  service.hooks(hooks);
};
