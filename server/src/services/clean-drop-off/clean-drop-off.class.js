/* eslint-disable no-unused-vars */
exports.CleanDropOff = class CleanDropOff {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let lockerNo = params.query.LockerId;
    console.log("Locker No : " + lockerNo);

    const locker = require('../../models/locker.model')();

    let checkLocker = await locker.query().where('LockerID', lockerNo).where('Active', 1);
    if (checkLocker.length == 1) {
      const numberOfEditedRows = await locker.query().where('LockerID', checkLocker[0].LockerID).patch({ Active: 0, StartTime: null, TelNo: null, Type: null, JobCode: null });
    }

    return [{ "Status": true }];
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}
