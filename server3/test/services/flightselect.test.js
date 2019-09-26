const assert = require('assert');
const app = require('../../src/app');

describe('\'flightselect\' service', () => {
  it('registered the service', () => {
    const service = app.service('flightselect');

    assert.ok(service, 'Registered the service');
  });
});
