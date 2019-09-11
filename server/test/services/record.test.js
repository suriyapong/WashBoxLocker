const assert = require('assert');
const app = require('../../src/app');

describe('\'record\' service', () => {
  it('registered the service', () => {
    const service = app.service('record');

    assert.ok(service, 'Registered the service');
  });
});
