/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {

    
    let prMonth = parseInt(params.query.month)-1;
    let prYear = params.query.year;
  

    var day = new Date(prYear, prMonth, 1, 0, 0, 0, 0)
    var start = dateFns.startOfMonth(day);
    var end = dateFns.endOfMonth(day);

    start = dateFns.addHours(start,0)
    end = dateFns.addHours(end,0)
    end = dateFns.setMilliseconds(end,0)
    
    const flightmodel = require('../../models/flight.model')();

    var output = [{
      dataOutbound:[],
      dataInbound:[]
    }];

    let rawDataPassenger = []
   
    rawDataPassenger = await flightmodel.query().eager("[passenger.[user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]]").where('DepartureDate', '>=', start).where('DepartureDate', '<=', end)
    

    rawDataPassenger.forEach(data => {

    let Passenger = data.passenger.filter(x => x.PassengerTypeId == 1)
    
    Passenger.forEach(datapass => {

    console.log(Passenger)
      var c ={}
      let alltotalBaggagekg = 0
      for (let i = 0; i < datapass.baggage.length; i++) {
        alltotalBaggagekg =
          alltotalBaggagekg + datapass.baggage[i].Weight;
      }

      c['Date'] = data.DepartureDate
      c['FlightNo.'] = data.FlightNo
      c['FullName'] = datapass.user.FirstName+""+datapass.user.LastName
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
  
      console.log(Passenger)
        var c ={}
        let alltotalBaggagekg = 0
        for (let i = 0; i < datapass.baggage.length; i++) {
          alltotalBaggagekg =
            alltotalBaggagekg + datapass.baggage[i].Weight;
        }
  
        c['Date'] = data.DepartureDate
        c['FlightNo.'] = data.FlightNo
        c['FullName'] = datapass.user.FirstName+""+datapass.user.LastName
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
     
        output[0].dataInbound.push(c)
        });
      });
   
    
    return output;
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

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
