// Initializes the `WashBoxService` service on path `/wash-box-service`
const { WashBoxService } = require('./wash-box-service.class');
const hooks = require('./wash-box-service.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wash-box-service', new WashBoxService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('wash-box-service');

  service.hooks(hooks);
};
