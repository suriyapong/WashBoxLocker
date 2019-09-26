const assert = require('assert');
const app = require('../../src/app');

describe('\'usertrip\' service', () => {
  it('registered the service', () => {
    const service = app.service('usertrip');

    assert.ok(service, 'Registered the service');
  });
});
