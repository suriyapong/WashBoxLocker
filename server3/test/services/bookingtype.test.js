const assert = require('assert');
const app = require('../../src/app');

describe('\'bookingtype\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookingtype');

    assert.ok(service, 'Registered the service');
  });
});
