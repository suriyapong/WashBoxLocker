const assert = require('assert');
const app = require('../../src/app');

describe('\'vdo\' service', () => {
  it('registered the service', () => {
    const service = app.service('vdo');

    assert.ok(service, 'Registered the service');
  });
});
