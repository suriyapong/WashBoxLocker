// Initializes the `Locker` service on path `/locker`
const { Locker } = require('./locker.class');
const createModel = require('../../models/locker.model');
const hooks = require('./locker.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id:"LockerID"
  };

  // Initialize our service with any options it requires
  app.use('/locker', new Locker(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('locker');

  service.hooks(hooks);
};
