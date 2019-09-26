// Initializes the `bookingtype` service on path `/bookingtype`
const createService = require('feathers-objection');
const createModel = require('../../models/bookingtype.model');
const hooks = require('./bookingtype.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bookingtype', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bookingtype');

  service.hooks(hooks);
};
