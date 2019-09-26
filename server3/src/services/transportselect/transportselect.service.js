// Initializes the `transportselect` service on path `/transportselect`
const createService = require('./transportselect.class.js');
const hooks = require('./transportselect.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/transportselect', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('transportselect');

  service.hooks(hooks);
};
