const assert = require('assert');
const app = require('../../src/app');

describe('\'bookingselect\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookingselect');

    assert.ok(service, 'Registered the service');
  });
});
