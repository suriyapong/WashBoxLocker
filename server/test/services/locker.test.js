const assert = require('assert');
const app = require('../../src/app');

describe('\'locker\' service', () => {
  it('registered the service', () => {
    const service = app.service('locker');

    assert.ok(service, 'Registered the service');
  });
});
