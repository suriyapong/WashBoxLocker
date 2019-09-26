// Initializes the `passenger` service on path `/passenger`
const createService = require('feathers-objection');
const createModel = require('../../models/passenger.model');
const hooks = require('./passenger.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[flight,user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]'
  };

  // Initialize our service with any options it requires
  app.use('/passenger', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('passenger');

  service.hooks(hooks);
};
