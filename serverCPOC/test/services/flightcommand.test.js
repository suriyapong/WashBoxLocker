const assert = require('assert');
const app = require('../../src/app');

describe('\'flightcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('flightcommand');

    assert.ok(service, 'Registered the service');
  });
});
