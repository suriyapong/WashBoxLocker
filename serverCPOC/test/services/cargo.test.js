const assert = require('assert');
const app = require('../../src/app');

describe('\'cargo\' service', () => {
  it('registered the service', () => {
    const service = app.service('cargo');

    assert.ok(service, 'Registered the service');
  });
});
