const { authenticate } = require('@feathersjs/authentication').hooks;

const debugContext = require('../../hooks/debug-context');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
let conf = configuration();
let app = feathers().configure(conf);

const baseUploadUrl = app.get('uploadResources');

function createUrl() {
  return async context => {
    context.result.Url = baseUploadUrl + context.result.id;
    delete context.result.uri;
    return context;
  };
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createUrl()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
