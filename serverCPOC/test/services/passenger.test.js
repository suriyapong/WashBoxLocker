const assert = require('assert');
const app = require('../../src/app');

describe('\'passenger\' service', () => {
  it('registered the service', () => {
    const service = app.service('passenger');

    assert.ok(service, 'Registered the service');
  });
});
