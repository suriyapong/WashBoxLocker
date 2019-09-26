const assert = require('assert');
const app = require('../../src/app');

describe('\'bookingpassenger\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookingpassenger');

    assert.ok(service, 'Registered the service');
  });
});
