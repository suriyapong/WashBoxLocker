// Initializes the `bookingleg` service on path `/bookingleg`
const createService = require('feathers-objection');
const createModel = require('../../models/bookingleg.model');
const hooks = require('./bookingleg.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[airport]'
  };

  // Initialize our service with any options it requires
  app.use('/bookingleg', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bookingleg');

  service.hooks(hooks);
};
