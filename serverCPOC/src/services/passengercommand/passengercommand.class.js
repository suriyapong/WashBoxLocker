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
    const user = require('../../models/user.model')();
    const passenger = require('../../models/passenger.model')();

    let userIds = data.UserId; //Array [1,2,3]
    let flightId = data.FlightId; //1
    let typeId = data.TypeId
    console.log(userIds);
    if(userIds.length > 0){
      for (let i = 0; i < userIds.length; i++) {
        let res = await user.query().eager("[company]").where('Id', userIds[i]);
        let resUser = res[0];

        let newTodo = {
          FlightId: flightId,
          UserId: resUser.Id,
          ImageUrl: resUser.ImageUrl,
          DestAirPortId: 1,
          DepartAirPortId: 1,
          // DestAirPortName: ,
          // DestAirPortColor:,
          PassengerTypeId:typeId,
          FirstName: resUser.FirstName,
          LastName: resUser.LastName,
          CompanyId: resUser.CompanyId,
          CompanyName: resUser.company.Name,
          CompanyCode: resUser.company.Code,
          AlcoholStatusId: 1
        };
        
        console.log(newTodo);

        await passenger.query().insert(newTodo);
      }
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

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
