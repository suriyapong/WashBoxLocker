const assert = require('assert');
const app = require('../../src/app');

describe('\'WashBoxService\' service', () => {
  it('registered the service', () => {
    const service = app.service('wash-box-service');

    assert.ok(service, 'Registered the service');
  });
});
