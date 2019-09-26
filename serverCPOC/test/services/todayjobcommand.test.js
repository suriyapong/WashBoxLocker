const assert = require('assert');
const app = require('../../src/app');

describe('\'todayjobcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('todayjobcommand');

    assert.ok(service, 'Registered the service');
  });
});
