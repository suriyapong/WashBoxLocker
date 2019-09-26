// Initializes the `role` service on path `/role`
const createService = require('feathers-objection');
const createModel = require('../../models/role.model');
const hooks = require('./role.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/role', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('role');

  service.hooks(hooks);
};
