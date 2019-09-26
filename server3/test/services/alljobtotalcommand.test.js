const assert = require('assert');
const app = require('../../src/app');

describe('\'alljobtotalcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('alljobtotalcommand');

    assert.ok(service, 'Registered the service');
  });
});
