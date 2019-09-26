// Initializes the `monthlyhistorycommand` service on path `/monthlyhistorycommand`
const createService = require('./monthlyhistorycommand.class.js');
const hooks = require('./monthlyhistorycommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/monthlyhistorycommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('monthlyhistorycommand');

  service.hooks(hooks);
};
