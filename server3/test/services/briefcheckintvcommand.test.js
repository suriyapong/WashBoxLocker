const assert = require('assert');
const app = require('../../src/app');

describe('\'briefcheckintvcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('briefcheckintvcommand');

    assert.ok(service, 'Registered the service');
  });
});
