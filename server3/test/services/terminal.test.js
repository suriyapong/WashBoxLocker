const assert = require('assert');
const app = require('../../src/app');

describe('\'terminal\' service', () => {
  it('registered the service', () => {
    const service = app.service('terminal');

    assert.ok(service, 'Registered the service');
  });
});
