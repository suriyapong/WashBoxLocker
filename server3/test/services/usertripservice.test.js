const assert = require('assert');
const app = require('../../src/app');

describe('\'usertripservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('usertripservice');

    assert.ok(service, 'Registered the service');
  });
});
