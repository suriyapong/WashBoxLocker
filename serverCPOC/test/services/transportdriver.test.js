const assert = require('assert');
const app = require('../../src/app');

describe('\'transportdriver\' service', () => {
  it('registered the service', () => {
    const service = app.service('transportdriver');

    assert.ok(service, 'Registered the service');
  });
});
