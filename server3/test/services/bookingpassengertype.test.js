const assert = require('assert');
const app = require('../../src/app');

describe('\'bookingpassengertype\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookingpassengertype');

    assert.ok(service, 'Registered the service');
  });
});
