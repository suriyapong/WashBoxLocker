const assert = require('assert');
const app = require('../../src/app');

describe('\'jobtype\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobtype');

    assert.ok(service, 'Registered the service');
  });
});
