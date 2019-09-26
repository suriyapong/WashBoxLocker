const assert = require('assert');
const app = require('../../src/app');

describe('\'passengercommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('passengercommand');

    assert.ok(service, 'Registered the service');
  });
});
