// Initializes the `alcoholstatus` service on path `/alcoholstatus`
const createService = require('feathers-objection');
const createModel = require('../../models/alcoholstatus.model');
const hooks = require('./alcoholstatus.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/alcoholstatus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('alcoholstatus');

  service.hooks(hooks);
};
