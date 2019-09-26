/* eslint-disable no-unused-vars */

const dateFns = require('date-fns');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
   
    let prMonth = parseInt(params.query.month)-1;
    let prYear = params.query.year;
    let prOwner = params.query.owner

    var day = new Date(prYear, prMonth, 1, 0, 0, 0, 0)
    var start = dateFns.startOfMonth(day);
    var end = dateFns.endOfMonth(day);

    start = dateFns.addHours(start,0)
    end = dateFns.addHours(end,0)
    end = dateFns.setMilliseconds(end,0)

    const transportmodel = require('../../models/transport.model')();
    
    var output = [{
      data:[],
      caledarData:[]
    }];

    let select = []
    if(prOwner == null){
     
      select = await transportmodel.query().eager("[booking,transportjob]").where('TransportDate', '>=', start).where('TransportDate', '<=', end);
   
    }else{
    
      select = await transportmodel.query().eager("[booking,transportjob]").where('TransportDate', '>=', start).where('TransportDate', '<=', end).where('Owner',prOwner);
   
    }
  

    select.forEach(data => {
      let PassengerType = data.transportjob
      var c = {};
      let dataAccept = data.Accept
      let Accept=""
      if(dataAccept == true){
        Accept = "(Accecpted)"
      }else{
        Accept = ""
      }

      let dateforcaledar = dateFns.format(data.TransportDate, "YYYY-MM-DD");
      let time = dateFns.format(data.TransportDate, "HH:mm");
      c['Id'] = data.Id
      c['title'] = time+ ' (' + PassengerType.filter(x => x.PassengerTypeId == 1).length + ',' + PassengerType.filter(x => x.PassengerTypeId == 2).length + ') '+ Accept
      
      c['date'] =   dateforcaledar
      
      output[0].caledarData.push(c)
    });

    output[0].data.push(select);
 
     
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
