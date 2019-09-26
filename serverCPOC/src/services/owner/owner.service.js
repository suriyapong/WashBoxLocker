// Initializes the `owner` service on path `/owner`
const createService = require('feathers-objection');
const createModel = require('../../models/owner.model');
const hooks = require('./owner.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/owner', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('owner');

  service.hooks(hooks);
};
