const assert = require('assert');
const app = require('../../src/app');

describe('\'ratequestion\' service', () => {
  it('registered the service', () => {
    const service = app.service('ratequestion');

    assert.ok(service, 'Registered the service');
  });
});
