// Initializes the ` transportlocaltion` service on path `/transportlocaltion`
const createService = require('feathers-objection');
const createModel = require('../../models/transportlocaltion.model');
const hooks = require('./transportlocaltion.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"Id"
  };

  // Initialize our service with any options it requires
  app.use('/transportlocaltion', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('transportlocaltion');

  service.hooks(hooks);
};
