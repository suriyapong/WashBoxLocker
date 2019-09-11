const assert = require('assert');
const app = require('../../src/app');

describe('\'DropOff\' service', () => {
  it('registered the service', () => {
    const service = app.service('drop-off');

    assert.ok(service, 'Registered the service');
  });
});
