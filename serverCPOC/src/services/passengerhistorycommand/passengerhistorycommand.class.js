/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

 
  async find (params) {

    let prUserId = params.query.userid
    
    const passengermodel = require('../../models/passenger.model')();

    var output = [{
      dataOutbound:[],
      dataInbound:[]
    }];

    let bookpassOutbound = []
    let bookpassInbound = []
    bookpassOutbound = await passengermodel.query().eager("[flight,user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]").where('UserId', prUserId).where('PassengerTypeId', 1)
    bookpassInbound = await passengermodel.query().eager("[flight,user,destairport,departairport,alcoholtest,alcoholstatus,baggage,company]").where('UserId', prUserId).where('PassengerTypeId', 2)


    bookpassOutbound.forEach(data => {
    
      var c ={}
      let alltotalBaggagekg = 0
      for (let i = 0; i < data.baggage.length; i++) {
        alltotalBaggagekg =
          alltotalBaggagekg + data.baggage[i].Weight;
      }

      c['Date'] = data.flight.DepartureDate
      c['FlightNo.'] = data.flight.FlightNo
      c['FullName'] = data.user.FirstName+""+data.user.LastName
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
      var c ={}
      let alltotalBaggagekg = 0
      for (let i = 0; i < data.baggage.length; i++) {
        alltotalBaggagekg =
          alltotalBaggagekg + data.baggage[i].Weight;
      }

      c['Date'] = data.flight.DepartureDate
      c['FlightNo.'] = data.flight.FlightNo
      c['FullName'] = data.user.FirstName+""+data.user.LastName
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
