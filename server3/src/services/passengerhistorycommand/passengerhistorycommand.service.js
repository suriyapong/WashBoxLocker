// Initializes the `passengerhistorycommand` service on path `/passengerhistorycommand`
const createService = require('./passengerhistorycommand.class.js');
const hooks = require('./passengerhistorycommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/passengerhistorycommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('passengerhistorycommand');

  service.hooks(hooks);
};
