// Initializes the `transportcommand` service on path `/transportcommand`
const createService = require('./transportcommand.class.js');
const hooks = require('./transportcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/transportcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('transportcommand');

  service.hooks(hooks);
};
