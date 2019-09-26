const assert = require('assert');
const app = require('../../src/app');

describe('\'staffratelist\' service', () => {
  it('registered the service', () => {
    const service = app.service('staffratelist');

    assert.ok(service, 'Registered the service');
  });
});
