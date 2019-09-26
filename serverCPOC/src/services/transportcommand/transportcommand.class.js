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

  async create(data, params) {
    const booking = require('../../models/booking.model')();
    const bookingpassenger = require('../../models/bookingpassenger.model')();
    const transport = require('../../models/transport.model')();
    const transportjob = require('../../models/transportjob.model')();


    let bookingId = data.BookingId;

    let res = await booking.query().where('Id',bookingId)
    let databooking = res[0]
    //console.log(databooking)
    
    let createTransport = {
      FromBookingId: bookingId,
      TransportDate: databooking.DepartureDate,
      Owner: databooking.Owner,
    }

    let transportNew = await transport.query().insert(createTransport);

   
    //
    let bookpassOutbound = await bookingpassenger.query().where('BookingId', bookingId).where('PassengerTypeId', 1)
    let bookpassInbound = await bookingpassenger.query().where('BookingId', bookingId).where('PassengerTypeId', 2)

   

    //
    let userIds = bookpassOutbound;
    let userIds2 = bookpassInbound;

    if (userIds.length > 0) {
      for (let i = 0; i < userIds.length; i++) {
       
        let userTransport = await bookingpassenger.query().where('BookingId', bookingId).where('PassengerTypeId', 1).where('UserId', userIds[i].UserId)
        let resUser = userTransport[0];
        //console.log(resUser);

        let newTodo = {
          TransportId: transportNew.Id,
          UserId: resUser.UserId,
          TransportLocaltion1Id : resUser.TransportLocaltion1Id, 
          TransportLocaltion2Id : resUser.TransportLocaltion2Id,
          PickupTime : resUser.PickupTime,
          DropTime : resUser.DropTime,
          TransportDriverId :1,
          PassengerTypeId:1
        };

        //console.log("OUT"+newTodo);


        await transportjob.query().insert(newTodo);
      }
    }

    if (userIds2.length > 0) {
      for (let i = 0; i < userIds2.length; i++) {
       
        let userTransport = await bookingpassenger.query().where('BookingId', bookingId).where('PassengerTypeId', 2).where('UserId', userIds2[i].UserId)
        let resUser = userTransport[0];
        //console.log(resUser);

        let newTodo = {
          TransportId: transportNew.Id,
          UserId: resUser.UserId,
          TransportLocaltion1Id : resUser.TransportLocaltion1Id, 
          TransportLocaltion2Id : resUser.TransportLocaltion2Id,
          PickupTime : resUser.PickupTime,
          DropTime : resUser.DropTime,
          TransportDriverId :1,
          PassengerTypeId:2
        };

        //console.log("IN"+newTodo);


        await transportjob.query().insert(newTodo);
      }
    }

    return transportNew;
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
