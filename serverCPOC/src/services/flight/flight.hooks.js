



function CalWeight() {
  return async context => {

    try {

      for (let f = 0; f < context.result.data.length; f++) {
        var Data = context.result.data[f]
        var passtdata = Data.passenger.length
        var cargodata = Data.cargo.length
        let totalbodyweight = 0;
        let totalbaggageweight = 0;
        let totalallWeight = 0;
        let totalcargoWeight = 0;


        
        for (var c = 0; c < cargodata; c++) {
          if (Data.cargo ==null) {
            totalcargoWeight = 0  
          } else {

            totalcargoWeight = totalcargoWeight + Data.cargo[c].Weight;
          }
        }
          for (var i = 0; i < passtdata; i++) {
            
            totalbodyweight = totalbodyweight + Data.passenger[i].Weight;
            var baggagedata = Data.passenger[i].baggage.length;
            for (var k = 0; k < baggagedata; k++) {
              totalbaggageweight = totalbaggageweight + Data.passenger[i].baggage[k].Weight
            }
          }
          
        
        totalallWeight = totalbodyweight + totalbaggageweight + totalcargoWeight

        console.log("Body " + totalbodyweight)
        console.log("Baggage " + totalbaggageweight)
        console.log("Cargo " + totalcargoWeight)
        console.log("All " + totalallWeight)

        context.result.data[f].CalBodyWeight = totalbodyweight;
        context.result.data[f].CalBaggageWeight = totalbaggageweight
        context.result.data[f].CargoWeight = totalcargoWeight
        context.result.data[f].CalAllWeight = totalallWeight
      }

      return context;

    } catch (error) {

      return context;
    }


  };
}
function CalLeg() {
  return async context => {

    try {
      for (let f = 0; f < context.result.data.length; f++) {
        var Data = context.result.data[f]
        
        var legdata = Data.leg
        var passdata = Data.passenger
        //console.log(legdata)
        var output = [];
        legdata.forEach(data => {
          var c={}
          let airportdata = data.airport
          c['AirPortName'] = data.AirportName
          c['DataAirport'] = airportdata.ImageUrl
          c['Outbound'] = passdata.filter(x => x.DestAirPortId == data.AirportId).filter(x=>x.PassengerTypeId == 1).filter(x=>x.NoGo !=true).length
          c['Inbound']  = passdata.filter(x => x.DepartAirPortId == data.AirportId).filter(x=>x.PassengerTypeId == 2).filter(x=>x.NoGo !=true).length
          c['Activity'] = airportdata.Activity
         // console.log(data)
         // console.log(c)
          output.push(c)
          context.result.data[f].CalLegAll = output
        });

        
      }
    
      return context;

    } catch (error) {

      return context;
    }


  };

}

function RemoveCalWeightAndCalLeg() {
  return async context => {

    try {
      delete context.data.CalBodyWeight;
      delete context.data.CalBaggageWeight;
      delete context.data.CargoWeight;
      delete context.data.CalAllWeight;
      delete context.data.CalLegAll;
      return context;

    } catch (error) {

      return context;
    }


  };
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [RemoveCalWeightAndCalLeg()],
    patch: [RemoveCalWeightAndCalLeg()],
    remove: []
  },

  after: {
    all: [],
    find: [CalWeight(),CalLeg()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
