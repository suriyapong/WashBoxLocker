// Initializes the `requeststatus` service on path `/requeststatus`
const createService = require('feathers-objection');
const createModel = require('../../models/requeststatus.model');
const hooks = require('./requeststatus.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id",
  };

  // Initialize our service with any options it requires
  app.use('/requeststatus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('requeststatus');

  service.hooks(hooks);
};
