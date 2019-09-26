// Initializes the `transport` service on path `/transport`
const createService = require('feathers-objection');
const createModel = require('../../models/transport.model');
const hooks = require('./transport.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[booking,transportjob]'
  };

  // Initialize our service with any options it requires
  app.use('/transport', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('transport');

  service.hooks(hooks);
};
