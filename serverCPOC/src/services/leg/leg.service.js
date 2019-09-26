// Initializes the `leg` service on path `/leg`
const createService = require('feathers-objection');
const createModel = require('../../models/leg.model');
const hooks = require('./leg.hooks');

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
  app.use('/leg', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('leg');

  service.hooks(hooks);
};
