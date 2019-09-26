/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    // return {
    //   id, text: `A new message with ID: ${id}!`
    // };

    let rfidTag = id;
    console.log(rfidTag);

    const passenger = require('../../models/passenger.model')();

    const passengerRaw = await passenger.query().where('RFID', rfidTag).where('BriefCheckIn', null).eager("[flight]");
    const passengerData = passengerRaw.filter(x => x.flight.StatusId == 4);
  
    if (passengerData.length == 1) {
      const numberOfEditedRows = await passenger.query().where('Id', passengerData[0].Id).patch({ BriefCheckIn: true, BriefCheckInTime: new Date() });
      return passengerData[0].Id;
    } else {
      return "null";
    }
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

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
