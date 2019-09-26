const assert = require('assert');
const app = require('../../src/app');

describe('\'Log\' service', () => {
  it('registered the service', () => {
    const service = app.service('log');

    assert.ok(service, 'Registered the service');
  });
});
