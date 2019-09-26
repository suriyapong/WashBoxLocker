const assert = require('assert');
const app = require('../../src/app');

describe('\'monthlyhistorycommand\' service', () => {
  it('registered the service', () => {
    const service = app.service('monthlyhistorycommand');

    assert.ok(service, 'Registered the service');
  });
});
