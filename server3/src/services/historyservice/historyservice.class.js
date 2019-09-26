/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');
const { NotFound, GeneralError, BadRequest } = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async patch(id, data, params) {

    const cmd = id

    if (cmd == "ByPassenger") { return this.ByPassenger(data);}
    if (cmd == "ByMonthly") { return this.ByMonthly(data);}
    if (cmd == "ByBoarding") { return this.ByBoarding(data);}

    return new NotFound('Command Not Found');

  }


  //case 1
  async ByPassenger(data) {
    const passengermodel = require('../../models/passenger.model')();

    var output = [{
      dataOutbound: [],
      dataInbound: []
    }];

    let bookpassOutbound = []
    let bookpassInbound = []
    bookpassOutbound = await passengermodel.query().eager("[flight,user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]").where('UserId', data.UserId).where('PassengerTypeId', 1)
    bookpassInbound = await passengermodel.query().eager("[flight,user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]").where('UserId', data.UserId).where('PassengerTypeId', 2)


    bookpassOutbound.forEach(data => {

      var c = {}
      let alltotalBaggagekg = 0
      for (let i = 0; i < data.baggage.length; i++) {
        alltotalBaggagekg =
          alltotalBaggagekg + data.baggage[i].Weight;
      }

      c['Date'] = data.flight.DepartureDate
      c['FlightNo'] = data.flight.FlightNo
      c['FullName'] = data.user.FirstName + " " + data.user.LastName
      c['BodyWeight'] = data.Weight
      c['CompanyName'] = data.CompanyName
      c['JobPosition'] = data.user.JobPosition
      c['Department'] = data.user.Department
      c['DepartAirport'] = data.departairport.Name
      c['DestAirport'] = data.destairport.Name
      c['CheckinDate'] = data.CheckInDate
      c['AlcoholCount'] = data.alcoholtest.length
      //c['Alcoholtest'] = data.alcoholtest[data.alcoholtest.length-1].Pass
      c['SeatNo'] = data.SeatNo
      c['BaggageCount'] = data.baggage.length
      c['BaggageWeight'] = alltotalBaggagekg
      c['NoGo'] = data.NoGo
      c['NoGoReason'] = data.NoGoReason

      output[0].dataOutbound.push(c)
    });

    bookpassInbound.forEach(data => {
      var c = {}
      let alltotalBaggagekg = 0
      for (let i = 0; i < data.baggage.length; i++) {
        alltotalBaggagekg =
          alltotalBaggagekg + data.baggage[i].Weight;
      }

      c['Date'] = data.flight.DepartureDate
      c['FlightNo'] = data.flight.FlightNo
      c['FullName'] = data.user.FirstName + " " + data.user.LastName
      c['BodyWeight'] = data.Weight
      c['CompanyName'] = data.CompanyName
      c['JobPosition'] = data.user.JobPosition
      c['Department'] = data.user.Department
      c['DepartAirport'] = data.departairport.Name
      c['DestAirport'] = data.destairport.Name
      c['CheckinDate'] = data.CheckInDate
      c['AlcoholCount'] = data.alcoholtest.length
      // c['Alcoholtest'] = data.alcoholtest[data.alcoholtest.length-1].Pass
      c['SeatNo'] = data.SeatNo
      c['BaggageCount'] = data.baggage.length
      c['BaggageWeight'] = alltotalBaggagekg
      c['NoGo'] = data.NoGo
      c['NoGoReason'] = data.NoGoReason

      output[0].dataInbound.push(c)
    });

    return output;
  }
  //case 2
  async ByMonthly(data) {

    var day = new Date(data.year, parseInt(data.month) - 1, 1, 0, 0, 0, 0)
    var start = dateFns.startOfMonth(day);
    var end = dateFns.endOfMonth(day);

    start = dateFns.addHours(start, 0)
    end = dateFns.addHours(end, 0)
    end = dateFns.setMilliseconds(end, 0)

    const flightmodel = require('../../models/flight.model')();

    var output = [{
      dataOutbound: [],
      dataInbound: []
    }];

    let rawDataPassenger = []

    rawDataPassenger = await flightmodel.query().eager("[passenger.[user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]]").where('DepartureDate', '>=', start).where('DepartureDate', '<=', end)


    rawDataPassenger.forEach(data => {

      let Passenger = data.passenger.filter(x => x.PassengerTypeId == 1)

      Passenger.forEach(datapass => {

        // console.log(Passenger)
        var c = {}
        let alltotalBaggagekg = 0
        for (let i = 0; i < datapass.baggage.length; i++) {
          alltotalBaggagekg =
            alltotalBaggagekg + datapass.baggage[i].Weight;
        }

        c['Date'] = data.DepartureDate
        c['FlightNo'] = data.FlightNo
        c['FullName'] = datapass.user.FirstName + " " + datapass.user.LastName
        c['BodyWeight'] = datapass.Weight
        c['CompanyName'] = datapass.CompanyName
        c['JobPosition'] = datapass.user.JobPosition
        c['Department'] = datapass.user.Department
        c['DepartAirport'] = datapass.departairport.Name
        c['DestAirport'] = datapass.destairport.Name
        c['CheckinDate'] = datapass.CheckInDate
        c['AlcoholCount'] = datapass.alcoholtest.length
        //c['Alcoholtest'] = data.alcoholtest[data.alcoholtest.length-1].Pass
        c['SeatNo'] = data.SeatNo
        c['BaggageCount'] = datapass.baggage.length
        c['BaggageWeight'] = alltotalBaggagekg
        c['NoGo'] = datapass.NoGo
        c['NoGoReason'] = datapass.NoGoReason

        output[0].dataOutbound.push(c)
      });
    });

    rawDataPassenger.forEach(data => {

      let Passenger = data.passenger.filter(x => x.PassengerTypeId == 2)

      Passenger.forEach(datapass => {

        //console.log(Passenger)
        var c = {}
        let alltotalBaggagekg = 0
        for (let i = 0; i < datapass.baggage.length; i++) {
          alltotalBaggagekg =
            alltotalBaggagekg + datapass.baggage[i].Weight;
        }

        c['Date'] = data.DepartureDate
        c['FlightNo'] = data.FlightNo
        c['FullName'] = datapass.user.FirstName + " " + datapass.user.LastName
        c['BodyWeight'] = datapass.Weight
        c['CompanyName'] = datapass.CompanyName
        c['JobPosition'] = datapass.user.JobPosition
        c['Department'] = datapass.user.Department
        c['DepartAirport'] = datapass.departairport.Name
        c['DestAirport'] = datapass.destairport.Name
        c['CheckinDate'] = datapass.CheckInDate
        c['AlcoholCount'] = datapass.alcoholtest.length
        //c['Alcoholtest'] = data.alcoholtest[data.alcoholtest.length-1].Pass
        c['SeatNo'] = data.SeatNo
        c['BaggageCount'] = datapass.baggage.length
        c['BaggageWeight'] = alltotalBaggagekg
        c['NoGo'] = datapass.NoGo
        c['NoGoReason'] = datapass.NoGoReason
        console.log(c)
        output[0].dataInbound.push(c)
      });
    });


    return output;

  }
  //case 3
  async ByBoarding(data) {
      const passengermodel = require('../../models/passenger.model')();
      const flightmodel = require('../../models/flight.model')();
      
    var UserId = data.UserId
      var output = [{
        dataOutbound: [],
        dataInbound: []
      }];

      let rawDataPassenger = []

    rawDataPassenger = await flightmodel.query().eager("[passenger.[user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]]").whereIn('StatusId', ['1', '3',])

   
    rawDataPassenger.forEach(data => {

      let Passenger = data.passenger.filter(x => x.PassengerTypeId == 1).filter(x => x.UserId == UserId)

      Passenger.forEach(datapass => {

        // console.log(Passenger)
        var c = {}
        let alltotalBaggagekg = 0
        for (let i = 0; i < datapass.baggage.length; i++) {
          alltotalBaggagekg =
            alltotalBaggagekg + datapass.baggage[i].Weight;
        }

        c['Date'] = data.DepartureDate
        c['FlightNo'] = data.FlightNo
        c['FullName'] = datapass.user.FirstName + " " + datapass.user.LastName
        c['BodyWeight'] = datapass.Weight
        c['CompanyName'] = datapass.CompanyName
        c['JobPosition'] = datapass.user.JobPosition
        c['Department'] = datapass.user.Department
        c['DepartAirport'] = datapass.departairport.Name
        c['DestAirport'] = datapass.destairport.Name
        c['CheckinDate'] = datapass.CheckInDate
        c['AlcoholCount'] = datapass.alcoholtest.length
        //c['Alcoholtest'] = data.alcoholtest[data.alcoholtest.length-1].Pass
        c['SeatNo'] = data.SeatNo
        c['BaggageCount'] = datapass.baggage.length
        c['BaggageWeight'] = alltotalBaggagekg
        c['NoGo'] = datapass.NoGo
        c['NoGoReason'] = datapass.NoGoReason

        output[0].dataOutbound.push(c)
      });
    });

    rawDataPassenger.forEach(data => {

      let Passenger = data.passenger.filter(x => x.PassengerTypeId == 2).filter(x => x.UserId == UserId)

      Passenger.forEach(datapass => {

        //console.log(Passenger)
        var c = {}
        let alltotalBaggagekg = 0
        for (let i = 0; i < datapass.baggage.length; i++) {
          alltotalBaggagekg =
            alltotalBaggagekg + datapass.baggage[i].Weight;
        }

        c['Date'] = data.DepartureDate
        c['FlightNo'] = data.FlightNo
        c['FullName'] = datapass.user.FirstName + " " + datapass.user.LastName
        c['BodyWeight'] = datapass.Weight
        c['CompanyName'] = datapass.CompanyName
        c['JobPosition'] = datapass.user.JobPosition
        c['Department'] = datapass.user.Department
        c['DepartAirport'] = datapass.departairport.Name
        c['DestAirport'] = datapass.destairport.Name
        c['CheckinDate'] = datapass.CheckInDate
        c['AlcoholCount'] = datapass.alcoholtest.length
        //c['Alcoholtest'] = data.alcoholtest[data.alcoholtest.length-1].Pass
        c['SeatNo'] = data.SeatNo
        c['BaggageCount'] = datapass.baggage.length
        c['BaggageWeight'] = alltotalBaggagekg
        c['NoGo'] = datapass.NoGo
        c['NoGoReason'] = datapass.NoGoReason
        console.log(c)
        output[0].dataInbound.push(c)
      });
    });


      return output;
    }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
