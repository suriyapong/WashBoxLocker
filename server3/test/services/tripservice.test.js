const assert = require('assert');
const app = require('../../src/app');

describe('\'tripservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('tripservice');

    assert.ok(service, 'Registered the service');
  });
});
