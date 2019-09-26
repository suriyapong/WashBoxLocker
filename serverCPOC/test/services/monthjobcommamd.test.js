const assert = require('assert');
const app = require('../../src/app');

describe('\'monthjobcommamd\' service', () => {
  it('registered the service', () => {
    const service = app.service('monthjobcommamd');

    assert.ok(service, 'Registered the service');
  });
});
