const assert = require('assert');
const app = require('../../src/app');

describe('\'jobstatuscommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobstatuscommand');

    assert.ok(service, 'Registered the service');
  });
});
