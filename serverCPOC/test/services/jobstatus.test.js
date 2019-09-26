const assert = require('assert');
const app = require('../../src/app');

describe('\'jobstatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobstatus');

    assert.ok(service, 'Registered the service');
  });
});
