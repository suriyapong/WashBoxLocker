const assert = require('assert');
const app = require('../../src/app');

describe('\'tripcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('tripcommand');

    assert.ok(service, 'Registered the service');
  });
});
