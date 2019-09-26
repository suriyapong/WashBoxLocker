const assert = require('assert');
const app = require('../../src/app');

describe('\'vehicletype\' service', () => {
  it('registered the service', () => {
    const service = app.service('vehicletype');

    assert.ok(service, 'Registered the service');
  });
});
