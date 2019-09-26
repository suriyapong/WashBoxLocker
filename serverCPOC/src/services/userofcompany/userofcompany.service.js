// Initializes the `userofcompany` service on path `/userofcompany`
const createService = require('./userofcompany.class.js');
const hooks = require('./userofcompany.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/userofcompany', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('userofcompany');

  service.hooks(hooks);
};
