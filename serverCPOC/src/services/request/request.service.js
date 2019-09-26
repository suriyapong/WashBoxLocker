// Initializes the `request` service on path `/request`
const createService = require('feathers-objection');
const createModel = require('../../models/request.model');
const hooks = require('./request.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[company,destairport,departairport,requeststatus,requestuser]'
  };

  // Initialize our service with any options it requires
  app.use('/request', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('request');

  service.hooks(hooks);
};
