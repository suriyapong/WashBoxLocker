const assert = require('assert');
const app = require('../../src/app');

describe('\' transportlocaltion\' service', () => {
  it('registered the service', () => {
    const service = app.service('transportlocaltion');

    assert.ok(service, 'Registered the service');
  });
});
