const assert = require('assert');
const app = require('../../src/app');

describe('\'CleanDropOff\' service', () => {
  it('registered the service', () => {
    const service = app.service('clean-drop-off');

    assert.ok(service, 'Registered the service');
  });
});
