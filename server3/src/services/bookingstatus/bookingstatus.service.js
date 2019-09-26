// Initializes the `bookingstatus` service on path `/bookingstatus`
const createService = require('feathers-objection');
const createModel = require('../../models/bookingstatus.model');
const hooks = require('./bookingstatus.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/bookingstatus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bookingstatus');

  service.hooks(hooks);
};
