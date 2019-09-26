const assert = require('assert');
const app = require('../../src/app');

describe('\'bookingleg\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookingleg');

    assert.ok(service, 'Registered the service');
  });
});
