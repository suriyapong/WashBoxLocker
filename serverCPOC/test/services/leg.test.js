const assert = require('assert');
const app = require('../../src/app');

describe('\'leg\' service', () => {
  it('registered the service', () => {
    const service = app.service('leg');

    assert.ok(service, 'Registered the service');
  });
});
