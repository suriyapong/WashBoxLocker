// Initializes the `nogocommand` service on path `/nogocommand`
const createService = require('./nogocommand.class.js');
const hooks = require('./nogocommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/nogocommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('nogocommand');

  service.hooks(hooks);
};
