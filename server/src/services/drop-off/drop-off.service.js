// Initializes the `DropOff` service on path `/drop-off`
const { DropOff } = require('./drop-off.class');
const hooks = require('./drop-off.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/drop-off', new DropOff(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('drop-off');

  service.hooks(hooks);
};
