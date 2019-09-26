// Initializes the `alcoholtest` service on path `/alcoholtest`
const createService = require('feathers-objection');
const createModel = require('../../models/alcoholtest.model');
const hooks = require('./alcoholtest.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/alcoholtest', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('alcoholtest');

  service.hooks(hooks);
};
