// Initializes the `cargo` service on path `/cargo`
const createService = require('feathers-objection');
const createModel = require('../../models/cargo.model');
const hooks = require('./cargo.hooks');

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
  app.use('/cargo', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cargo');

  service.hooks(hooks);
};
