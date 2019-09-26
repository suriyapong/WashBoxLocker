// Initializes the `requestuser` service on path `/requestuser`
const createService = require('feathers-objection');
const createModel = require('../../models/requestuser.model');
const hooks = require('./requestuser.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[user, request]'
  };

  // Initialize our service with any options it requires
  app.use('/requestuser', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('requestuser');

  service.hooks(hooks);
};
