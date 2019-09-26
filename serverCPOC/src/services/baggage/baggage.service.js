// Initializes the `baggage` service on path `/baggage`
const createService = require('feathers-objection');
const createModel = require('../../models/baggage.model');
const hooks = require('./baggage.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/baggage', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('baggage');

  service.hooks(hooks);
};
