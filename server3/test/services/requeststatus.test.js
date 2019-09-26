const assert = require('assert');
const app = require('../../src/app');

describe('\'requeststatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('requeststatus');

    assert.ok(service, 'Registered the service');
  });
});
