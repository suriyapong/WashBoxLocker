// Initializes the `emailcommand` service on path `/emailcommand`
const createService = require('./emailcommand.class.js');
const hooks = require('./emailcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/emailcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('emailcommand');

  service.hooks(hooks);
};
