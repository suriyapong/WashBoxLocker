// Initializes the `briefcheckintvcommand` service on path `/briefcheckintvcommand`
const createService = require('./briefcheckintvcommand.class.js');
const hooks = require('./briefcheckintvcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/briefcheckintvcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('briefcheckintvcommand');

  service.hooks(hooks);
};
