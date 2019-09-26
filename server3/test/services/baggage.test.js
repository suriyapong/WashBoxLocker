const assert = require('assert');
const app = require('../../src/app');

describe('\'baggage\' service', () => {
  it('registered the service', () => {
    const service = app.service('baggage');

    assert.ok(service, 'Registered the service');
  });
});
