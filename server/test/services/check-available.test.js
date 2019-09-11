const assert = require('assert');
const app = require('../../src/app');

describe('\'CheckAvailable\' service', () => {
  it('registered the service', () => {
    const service = app.service('check-available');

    assert.ok(service, 'Registered the service');
  });
});
