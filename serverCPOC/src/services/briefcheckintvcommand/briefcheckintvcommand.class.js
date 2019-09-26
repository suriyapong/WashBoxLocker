/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let terminalId = params.query.TerminalId; //1

    let output = [{
      FlightStatus: "",
      Flight: [],
      Passengers: [],
      PassengersFinal: [],
    }];

    const passenger = require('../../models/passenger.model')();
    const flight = require('../../models/flight.model')();

    const res = await flight.query().where('TerminalId', terminalId).where('StatusId', 4).eager('[leg, departairport,arrivalairport]');

    if (res.length > 0) {
      let flightFinal = this.sortedArrayForFlight(res)[0];
      output[0].FlightStatus = true;
      output[0].Flight.push(flightFinal);

      const res2 = await passenger.query().where('FlightId', flightFinal.Id).whereIn('SeatNo', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L']).eager("[destairport]"); //////
      let passengersFinal = this.sortedArrayForPassenger(res2);
      output[0].PassengersFinal = passengersFinal;

      let seatNo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L'];

      for (let i = 0; i < 12; i++) {
        if (
          passengersFinal.filter(x => x.SeatNo == "A" && x.BriefCheckIn == true).length > 0 &&
          i == 0
        ) {
          output[0].Passengers.push({ SeatNo: "A", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "B" && x.BriefCheckIn == true).length > 0 &&
          i == 1
        ) {
          output[0].Passengers.push({ SeatNo: "B", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "C" && x.BriefCheckIn == true).length > 0 &&
          i == 2
        ) {
          output[0].Passengers.push({ SeatNo: "C", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "D" && x.BriefCheckIn == true).length > 0 &&
          i == 3
        ) {
          output[0].Passengers.push({ SeatNo: "D", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "E" && x.BriefCheckIn == true).length > 0 &&
          i == 4
        ) {
          output[0].Passengers.push({ SeatNo: "E", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "F" && x.BriefCheckIn == true).length > 0 &&
          i == 5
        ) {
          output[0].Passengers.push({ SeatNo: "F", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "G" && x.BriefCheckIn == true).length > 0 &&
          i == 6
        ) {
          output[0].Passengers.push({ SeatNo: "G", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "H" && x.BriefCheckIn == true).length > 0 &&
          i == 7
        ) {
          output[0].Passengers.push({ SeatNo: "H", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "I" && x.BriefCheckIn == true).length > 0 &&
          i == 8
        ) {
          output[0].Passengers.push({ SeatNo: "I", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "J" && x.BriefCheckIn == true).length > 0 &&
          i == 9
        ) {
          output[0].Passengers.push({ SeatNo: "J", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "K" && x.BriefCheckIn == true).length > 0 &&
          i == 10
        ) {
          output[0].Passengers.push({ SeatNo: "K", Status: true });
        } else if (
          passengersFinal.filter(x => x.SeatNo == "L" && x.BriefCheckIn == true).length > 0 &&
          i == 11
        ) {
          output[0].Passengers.push({ SeatNo: "L", Status: true });
        } else {
          output[0].Passengers.push({ SeatNo: seatNo[i], Status: false });
        }
      }
    } else {
      output[0].fligthStatus = false;
    }

    //console.log(output[0]);
    return output;
  }

  async get(id, params) {
    return id;
  }

  //Passenger น้อยไปมากโดยเอา flight ล่าสุดมา
  sortedArrayForPassenger(passengers) {
    function compare(a, b) {
      if (a.SeatNo < b.SeatNo) return -1;
      if (a.SeatNo > b.SeatNo) return 1;
      return 0;
    }
    return passengers.sort(compare);
  }

  //Flight มากไปน้อย
  sortedArrayForFlight(flightData) {
    function compare(b, a) {
      if (a.DepartureDate < b.DepartureDate) return -1;
      if (a.DepartureDate > b.DepartureDate) return 1;
      return 0;
    }
    return flightData.sort(compare);
  }

  async create(data, params) {
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
