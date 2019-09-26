const assert = require('assert');
const app = require('../../src/app');

describe('\'nogocommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('nogocommand');

    assert.ok(service, 'Registered the service');
  });
});
