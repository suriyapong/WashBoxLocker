// Initializes the `CheckAvailable` service on path `/check-available`
const { CheckAvailable } = require('./check-available.class');
const hooks = require('./check-available.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/check-available', new CheckAvailable(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('check-available');

  service.hooks(hooks);
};
