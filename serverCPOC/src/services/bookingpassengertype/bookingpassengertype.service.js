// Initializes the `bookingpassengertype` service on path `/bookingpassengertype`
const createService = require('feathers-objection');
const createModel = require('../../models/bookingpassengertype.model');
const hooks = require('./bookingpassengertype.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[transportlocaltion]'
  };

  // Initialize our service with any options it requires
  app.use('/bookingpassengertype', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bookingpassengertype');

  service.hooks(hooks);
};
