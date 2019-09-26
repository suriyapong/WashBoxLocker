// Initializes the `transportdriver` service on path `/transportdriver`
const createService = require('feathers-objection');
const createModel = require('../../models/transportdriver.model');
const hooks = require('./transportdriver.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/transportdriver', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('transportdriver');

  service.hooks(hooks);
};
