// Initializes the `aircrafts` service on path `/aircrafts`
const createService = require('feathers-objection');
const createModel = require('../../models/aircrafts.model');
const hooks = require('./aircrafts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/aircrafts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('aircrafts');

  service.hooks(hooks);
};
