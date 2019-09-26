const assert = require('assert');
const app = require('../../src/app');

describe('\'briefcheckincommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('briefcheckincommand');

    assert.ok(service, 'Registered the service');
  });
});
