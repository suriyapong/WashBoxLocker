/* eslint-disable no-unused-vars */

const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    
    let prMonth = parseInt(params.query.month)-1;
    let prYear = params.query.year;
    let prOwner = params.query.owner

    var day = new Date(prYear, prMonth, 1, 0, 0, 0, 0)
    var start = dateFns.startOfMonth(day);
    var end = dateFns.endOfMonth(day);

    start = dateFns.addHours(start,0)
    end = dateFns.addHours(end,0)
    end = dateFns.setMilliseconds(end,0)

    const bookingmodel = require('../../models/booking.model')();

    var output = [{
      data: [],
      caledarData: []
    }];

    let select = []
    if(prOwner == null){
     
      select = await bookingmodel.query().eager("[company,bookingpassenger,bookingstatus,airport,bookingleg.[airport]]").where('DepartureDate', '>=', start).where('DepartureDate', '<=', end);
   
    }else{
    
      select = await bookingmodel.query().eager("[company,bookingpassenger,bookingstatus,airport,bookingleg.[airport]]").where('DepartureDate', '>=', start).where('DepartureDate', '<=', end).where('Owner',prOwner);
   
    }
   
 



    select.forEach(data => {


      let PassengerType = data.bookingpassenger

      var c = {};

      let dateforcaledar = dateFns.format(data.DepartureDate, "YYYY-MM-DD");
      let time = dateFns.format(data.DepartureDate, "HH:mm");

      c['Id'] = data.Id
      c['title'] = time + ' ' + data.FlightNo + ' (' + PassengerType.filter(x => x.PassengerTypeId == 1).length + ',' + PassengerType.filter(x => x.PassengerTypeId == 2).length + ') ' + ' (' + data.bookingstatus.Name + ') '
      c['details'] = data.airport.Name
      c['date'] = dateforcaledar

      output[0].caledarData.push(c)
    });

    output[0].data.push(select);
    return output;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
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
