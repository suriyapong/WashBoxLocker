// Initializes the `briefcheckincommand` service on path `/briefcheckincommand`
const createService = require('./briefcheckincommand.class.js');
const hooks = require('./briefcheckincommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/briefcheckincommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('briefcheckincommand');

  service.hooks(hooks);
};
