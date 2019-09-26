const assert = require('assert');
const app = require('../../src/app');

describe('\'usertripcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('usertripcommand');

    assert.ok(service, 'Registered the service');
  });
});
