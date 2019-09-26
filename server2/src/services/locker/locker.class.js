const { Service } = require('feathers-objection');

exports.Locker = class Locker extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
