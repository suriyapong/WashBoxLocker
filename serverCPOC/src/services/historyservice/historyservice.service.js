// Initializes the `historyservice` service on path `/historyservice`
const createService = require('./historyservice.class.js');
const hooks = require('./historyservice.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/historyservice', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('historyservice');

  service.hooks(hooks);
};
