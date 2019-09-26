const assert = require('assert');
const app = require('../../src/app');

describe('\'bookingstatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookingstatus');

    assert.ok(service, 'Registered the service');
  });
});
