const assert = require('assert');
const app = require('../../src/app');

describe('\'transportjob\' service', () => {
  it('registered the service', () => {
    const service = app.service('transportjob');

    assert.ok(service, 'Registered the service');
  });
});
