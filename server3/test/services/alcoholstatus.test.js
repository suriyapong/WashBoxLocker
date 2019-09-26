const assert = require('assert');
const app = require('../../src/app');

describe('\'alcoholstatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('alcoholstatus');

    assert.ok(service, 'Registered the service');
  });
});
