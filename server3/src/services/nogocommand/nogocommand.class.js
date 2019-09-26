/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
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
    const passenger = require('../../models/passenger.model')();
    const baggagePass = require('../../models/baggage.model')();

    let PassId = data.PassId; 
    let dataNoGo = data.NoGo; 
    let dataNoGoReason = data.NoGoReason

    let pass = await passenger.query().where('Id', PassId).patch({ NoGo: dataNoGo, NoGoReason:dataNoGoReason, Weight: 0, SeatNo : null });
    
    let baggage = await baggagePass.query().where('PassengerId',PassId).delete()
    
    

    
    console.log(baggage)
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
