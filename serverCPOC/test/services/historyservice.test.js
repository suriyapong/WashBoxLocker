const assert = require('assert');
const app = require('../../src/app');

describe('\'historyservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('historyservice');

    assert.ok(service, 'Registered the service');
  });
});
