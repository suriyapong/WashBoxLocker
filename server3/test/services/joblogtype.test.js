const assert = require('assert');
const app = require('../../src/app');

describe('\'joblogtype\' service', () => {
  it('registered the service', () => {
    const service = app.service('joblogtype');

    assert.ok(service, 'Registered the service');
  });
});
