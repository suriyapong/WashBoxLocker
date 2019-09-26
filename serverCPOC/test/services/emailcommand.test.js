const assert = require('assert');
const app = require('../../src/app');

describe('\'emailcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('emailcommand');

    assert.ok(service, 'Registered the service');
  });
});
