// Initializes the `bookingpassenger` service on path `/bookingpassenger`
const createService = require('feathers-objection');
const createModel = require('../../models/bookingpassenger.model');
const hooks = require('./bookingpassenger.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[user.[company],destairport,transportLocaltion1,transportLocaltion2,passengertype]'
  };

  // Initialize our service with any options it requires
  app.use('/bookingpassenger', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bookingpassenger');

  service.hooks(hooks);
};
