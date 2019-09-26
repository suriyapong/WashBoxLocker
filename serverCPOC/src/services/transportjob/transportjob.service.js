// Initializes the `transportjob` service on path `/transportjob`
const createService = require('feathers-objection');
const createModel = require('../../models/transportjob.model');
const hooks = require('./transportjob.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[transportLocaltion1,transportLocaltion2,user.[company],driver]'
  };

  // Initialize our service with any options it requires
  app.use('/transportjob', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('transportjob');

  service.hooks(hooks);
};
