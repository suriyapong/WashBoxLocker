const assert = require('assert');
const app = require('../../src/app');

describe('\'transportcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('transportcommand');

    assert.ok(service, 'Registered the service');
  });
});
