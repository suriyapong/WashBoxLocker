const assert = require('assert');
const app = require('../../src/app');

describe('\'alcoholtest\' service', () => {
  it('registered the service', () => {
    const service = app.service('alcoholtest');

    assert.ok(service, 'Registered the service');
  });
});
