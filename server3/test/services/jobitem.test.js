const assert = require('assert');
const app = require('../../src/app');

describe('\'jobitem\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobitem');

    assert.ok(service, 'Registered the service');
  });
});
