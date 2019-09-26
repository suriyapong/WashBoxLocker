const assert = require('assert');
const app = require('../../src/app');

describe('\'requestuser\' service', () => {
  it('registered the service', () => {
    const service = app.service('requestuser');

    assert.ok(service, 'Registered the service');
  });
});
