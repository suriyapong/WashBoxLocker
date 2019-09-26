// Initializes the `delayreportcommand` service on path `/delayreportcommand`
const createService = require('./delayreportcommand.class.js');
const hooks = require('./delayreportcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/delayreportcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('delayreportcommand');

  service.hooks(hooks);
};
