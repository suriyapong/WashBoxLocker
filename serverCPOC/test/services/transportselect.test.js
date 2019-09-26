const assert = require('assert');
const app = require('../../src/app');

describe('\'transportselect\' service', () => {
  it('registered the service', () => {
    const service = app.service('transportselect');

    assert.ok(service, 'Registered the service');
  });
});
