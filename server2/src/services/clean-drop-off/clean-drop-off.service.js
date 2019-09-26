// Initializes the `CleanDropOff` service on path `/clean-drop-off`
const { CleanDropOff } = require('./clean-drop-off.class');
const hooks = require('./clean-drop-off.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/clean-drop-off', new CleanDropOff(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('clean-drop-off');

  service.hooks(hooks);
};
