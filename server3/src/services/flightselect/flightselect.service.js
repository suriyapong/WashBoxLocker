// Initializes the `flightselect` service on path `/flightselect`
const createService = require('./flightselect.class.js');
const hooks = require('./flightselect.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/flightselect', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('flightselect');

  service.hooks(hooks);
};
