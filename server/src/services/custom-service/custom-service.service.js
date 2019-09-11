// Initializes the `CustomService` service on path `/custom-service`
const { CustomService } = require('./custom-service.class');
const hooks = require('./custom-service.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/custom-service', new CustomService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('custom-service');

  service.hooks(hooks);
};
