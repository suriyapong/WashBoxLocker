const assert = require('assert');
const app = require('../../src/app');

describe('\'transport\' service', () => {
  it('registered the service', () => {
    const service = app.service('transport');

    assert.ok(service, 'Registered the service');
  });
});
