const assert = require('assert');
const app = require('../../src/app');

describe('\'staffrate\' service', () => {
  it('registered the service', () => {
    const service = app.service('staffrate');

    assert.ok(service, 'Registered the service');
  });
});
