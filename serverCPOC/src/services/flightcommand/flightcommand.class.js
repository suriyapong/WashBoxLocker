/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    const user = require('../../models/user.model')();
    const bookingpassenger = require('../../models/bookingpassenger.model')();
    const bookingleg = require('../../models/bookingleg.model')();
    const booking = require('../../models/booking.model')();
    const flight = require('../../models/flight.model')();
    const leg = require('../../models/leg.model')();
    const passenger = require('../../models/passenger.model')();


    let bookingId = data.BookingId;

    let res = await booking.query().where('Id',bookingId)
    let databooking = res[0]
    //console.log(databooking)

    let bookpassOutbound = await bookingpassenger.query().where('BookingId', bookingId).where('PassengerTypeId', 1)
    let bookpassInbound = await bookingpassenger.query().where('BookingId', bookingId).where('PassengerTypeId', 2)
    
    let createFlight = {
      FlightNo: databooking.FlightNo,
      DepartureDate: databooking.DepartureDate,
      DepartureAirportId: databooking.DepartureAirportId,
      StatusId: 1,
      ArrivalAirportId: databooking.DepartureAirportId,
      ArrivalDate: databooking.DepartureDate,
      TerminalId: 1,
      InboudPassengerCount: bookpassInbound.length,
      Owner: databooking.Owner,
      FromBookingId: bookingId,

    }

    let flightNew = await flight.query().insert(createFlight);

    let bookleg = await bookingleg.query().where('BookingId', bookingId).eager("[airport]")

    //console.log(flightNew);

    //

    //console.log(bookleg);
    for (let k = 0; k < bookleg.length; k++) {
      let BooklegNewTodo = {
        FlightId: flightNew.Id,
        AirPortId: bookleg[k].DestAirPortId,
        AirportName: bookleg[k].airport.Name,
        AirportColor: bookleg[k].airport.Color
      }
      await leg.query().insert(BooklegNewTodo);
    }

    //console.log(bookingId);

   

    //
    let userIds = bookpassOutbound;
    let userIds2= bookpassInbound;

    if (userIds.length > 0) {
      for (let i = 0; i < userIds.length; i++) {
        let res = await user.query().where('Id', userIds[i].UserId).eager("[company]");
        let resUser = res[0];
        
        let newTodo = {
          FlightId: flightNew.Id,
          UserId: resUser.Id,
          ImageUrl: resUser.ImageUrl,
          DestAirPortId: userIds[i].DestAirPortId,
          DepartAirPortId: 1,
          // DestAirPortName: ,
          // DestAirPortColor:,
          PassengerTypeId:1,
          FirstName: resUser.FirstName,
          LastName: resUser.LastName,
          CompanyId: resUser.CompanyId,
          CompanyName: resUser.company.Name,
          CompanyCode: resUser.company.Code,
          AlcoholStatusId: 1
        };

        //console.log(newTodo);


        await passenger.query().insert(newTodo);
      }

      if (userIds2.length > 0) {
        for (let i = 0; i < userIds2.length; i++) {
         
         let res = await user.query().where('Id', userIds2[i].UserId).eager("[company]");
         let resUser = res[0];
          //console.log(resUser);
  
          let newTodo = {
            FlightId: flightNew.Id,
            UserId: resUser.Id,
            ImageUrl: resUser.ImageUrl,
            DestAirPortId: 1,
            DepartAirPortId: userIds2[i].DestAirPortId,
            // DestAirPortName: ,
            // DestAirPortColor:,
            PassengerTypeId:2,
            FirstName: resUser.FirstName,
            LastName: resUser.LastName,
            CompanyId: resUser.CompanyId,
            CompanyName: resUser.company.Name,
            CompanyCode: resUser.company.Code,
            AlcoholStatusId: 1
          };
  
         // console.log("IN"+newTodo);
  
  
          await passenger.query().insert(newTodo);
        }
    }

    return flightNew;
  }
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
