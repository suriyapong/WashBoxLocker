const assert = require('assert');
const app = require('../../src/app');

describe('\'jobtrip\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobtrip');

    assert.ok(service, 'Registered the service');
  });
});
