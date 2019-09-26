// Initializes the `flightcommand` service on path `/flightcommand`
const createService = require('./flightcommand.class.js');
const hooks = require('./flightcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/flightcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('flightcommand');

  service.hooks(hooks);
};
