/* eslint-disable no-unused-vars */

const dateFns = require('date-fns');
class Service {
  constructor(options) {
    this.options = options || {};
  }
  async find(params) {
    console.log(params)
    let prMonth = parseInt(params.query.month) - 1;
    let prYear = params.query.year;
    let prOwner = params.query.owner;

    var day = new Date(prYear, prMonth, 1, 0, 0, 0, 0)
    var start = dateFns.startOfMonth(day);
    var end = dateFns.endOfMonth(day);

    start = dateFns.addHours(start, 0)
    end = dateFns.addHours(end, 0)
    end = dateFns.setMilliseconds(end, 0)


    const flightmodel = require('../../models/flight.model')();

    var output = [{
      data: [],
      sum: []
    }];


    let select = await flightmodel.query().eager("[terminal,flightstatus,aircrafts,aircraftsrevise,arrivalairport,departairport,leg,passenger,leg.airport]").where('DepartureDate', '>=', start).where('DepartureDate', '<=', end).where('Owner', prOwner);

    const result = select.map((item) => {

      let dayTH = new Date(item.DepartureDate)
      dayTH = dateFns.addHours(dayTH, 7)
      item.dayTH = dayTH;
      return item

    })
    let countfilght = 0
    let timeCalEngineStart = 0
    let timeCalDeparturea = 0
    let MinuteEngineStart = 0
    let HourEngineStart = 0
    let FulltimeEngineStart = 0
    let NewTime = 0
    for (let i = 0; i < dateFns.getDaysInMonth(start); i++) {
      var c = {};
      var isday = prYear + "-" + (prMonth + 1) + "-" + (i + 1);
      var start1 = dateFns.startOfDay(isday);
      var end1 = dateFns.endOfDay(isday);
      start1 = dateFns.addHours(start1, 7);
      end1 = dateFns.addHours(end1, 7);
      let txtCode = ""
      let txtReason = ""

      let k = result.filter(x => x.dayTH >= start1 && x.dayTH <= end1).length
      let Rawdata = result.filter(x => x.dayTH >= start1 && x.dayTH <= end1)
      Rawdata.forEach(datafind => {
        timeCalEngineStart = datafind.ActualEngineStart;
        timeCalDeparturea = datafind.DepartureDate;
        var result2 = dateFns.differenceInMinutes(
          timeCalEngineStart,
          timeCalDeparturea
        );
        MinuteEngineStart = result2 % 60;
        var result1 = dateFns.differenceInHours(
          timeCalEngineStart,
          timeCalDeparturea
        );
        HourEngineStart = result1;
        FulltimeEngineStart = new Date(2000, 1, 1, HourEngineStart, MinuteEngineStart, 0, 0);
        NewTime = HourEngineStart + ":" + MinuteEngineStart
        let OverDelaytime = new Date(2000, 1, 1, 0, 15, 0, 0);
        var CheckTime = ""

        if (FulltimeEngineStart > OverDelaytime) {

          CheckTime = true
        } else {
          CheckTime = false
        }

        if (k > 1) {

          var cy = {}
          if(datafind.CodeDelay == null){
            txtCode =" "
          }else{
            txtCode = datafind.CodeDelay
          }
          if(datafind.ReasonDelay == null){
            txtReason = "-"
          }else{
            txtReason = datafind.ReasonDelay
          }
          cy['Date'] = isday;
          cy['Filght'] = countfilght + 1
          cy['Aircraft'] = datafind.aircrafts.Name
          cy['STD'] = datafind.DepartureDate
          cy['Actual'] = datafind.ActualEngineStart
          cy['DelayTime'] = FulltimeEngineStart
          cy['Time'] = NewTime
          cy['OverTime'] = CheckTime
          cy['Code'] = txtCode
          cy['Reason'] = txtReason
          cy['DelayCause'] = datafind.DelayCause

          output[0].data.push(cy);

        } else if (k = 1) {

          if(datafind.CodeDelay == null){
            txtCode =" "
          }else{
            txtCode = datafind.CodeDelay
          }
          if(datafind.ReasonDelay == null){
            txtReason = "-"
          }else{
            txtReason = datafind.ReasonDelay
          }

          c['Date'] = isday;
          c['Filght'] = countfilght + 1
          c['Aircraft'] = datafind.aircrafts.Name
          c['STD'] = datafind.DepartureDate
          c['Actual'] = datafind.ActualEngineStart
          c['DelayTime'] = FulltimeEngineStart
          c['Time'] = NewTime
          c['OverTime'] = CheckTime
          c['Code'] = txtCode
          c['Reason'] = txtReason
          c['DelayCause'] = datafind.DelayCause

          output[0].data.push(c);

        }
        countfilght++
      });



      if (k == 0) {

        c['Date'] = isday;
        c['Filght'] = "-"
        c['Aircraft'] = "N/A"
        c['STD'] = ""
        c['Actual'] = ""
        c['DelayTime'] = ""
        c['Time'] = ""
        c['OverTime'] = "-"
        c['Code'] = " "
        c['Reason'] = "No Flight Operate"
        c['DelayCause'] =""

        output[0].data.push(c);
      }

    }




    var ct = {}
    ct['Allfilght'] = countfilght
    output[0].sum.push(ct);

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
