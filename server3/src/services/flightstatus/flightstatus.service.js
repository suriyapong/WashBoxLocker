// Initializes the `flightstatus` service on path `/flightstatus`
const createService = require('feathers-objection');
const createModel = require('../../models/flightstatus.model');
const hooks = require('./flightstatus.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/flightstatus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('flightstatus');

  service.hooks(hooks);
};
