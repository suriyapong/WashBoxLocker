const assert = require('assert');
const app = require('../../src/app');

describe('\'delayreportcommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('delayreportcommand');

    assert.ok(service, 'Registered the service');
  });
});
