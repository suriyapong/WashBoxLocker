// Initializes the `airports` service on path `/airports`
const createService = require('feathers-objection');
const createModel = require('../../models/airports.model');
const hooks = require('./airports.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/airports', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('airports');

  service.hooks(hooks);
};
