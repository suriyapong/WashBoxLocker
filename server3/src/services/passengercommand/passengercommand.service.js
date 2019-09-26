// Initializes the `passengercommand` service on path `/passengercommand`
const createService = require('./passengercommand.class.js');
const hooks = require('./passengercommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/passengercommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('passengercommand');

  service.hooks(hooks);
};
