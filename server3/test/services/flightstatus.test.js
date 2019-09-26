const assert = require('assert');
const app = require('../../src/app');

describe('\'flightstatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('flightstatus');

    assert.ok(service, 'Registered the service');
  });
});
