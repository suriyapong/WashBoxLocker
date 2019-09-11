/* eslint-disable no-unused-vars */
exports.CheckAvailable = class CheckAvailable {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let status = false;
    const locker = require('../../models/locker.model')();

    const lockerAvailable = await locker.query().where('Active', 0);

    console.log("Locker Available : " + JSON.stringify(lockerAvailable[0]));
    if(lockerAvailable.length > 0){
      status = true;
    }

    return [{"Status":status}];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}
