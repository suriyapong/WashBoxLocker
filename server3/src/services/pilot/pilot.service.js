// Initializes the `pilot` service on path `/pilot`
const createService = require('feathers-objection');
const createModel = require('../../models/pilot.model');
const hooks = require('./pilot.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
  };

  // Initialize our service with any options it requires
  app.use('/pilot', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pilot');

  service.hooks(hooks);
};
