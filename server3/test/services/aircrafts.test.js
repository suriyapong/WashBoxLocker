const assert = require('assert');
const app = require('../../src/app');

describe('\'aircrafts\' service', () => {
  it('registered the service', () => {
    const service = app.service('aircrafts');

    assert.ok(service, 'Registered the service');
  });
});
