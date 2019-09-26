const assert = require('assert');
const app = require('../../src/app');

describe('\'userofcompany\' service', () => {
  it('registered the service', () => {
    const service = app.service('userofcompany');

    assert.ok(service, 'Registered the service');
  });
});
