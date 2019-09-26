// Initializes the `terminal` service on path `/terminal`
const createService = require('feathers-objection');
const createModel = require('../../models/terminal.model');
const hooks = require('./terminal.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/terminal', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('terminal');

  service.hooks(hooks);
};
