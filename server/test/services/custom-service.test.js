const assert = require('assert');
const app = require('../../src/app');

describe('\'CustomService\' service', () => {
  it('registered the service', () => {
    const service = app.service('custom-service');

    assert.ok(service, 'Registered the service');
  });
});
