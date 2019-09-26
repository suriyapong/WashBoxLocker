// Initializes the `bookingselect` service on path `/bookingselect`
const createService = require('./bookingselect.class.js');
const hooks = require('./bookingselect.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bookingselect', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('bookingselect');

  service.hooks(hooks);
};
