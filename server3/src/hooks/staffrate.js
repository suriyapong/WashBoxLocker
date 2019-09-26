// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

module.exports = function (options = {}) {
  return async context => {

    const job = context.result;
    const jobTrip = require('../../src/models/jobtrip.model')();
    const trip = require('../../src/models/trips.model')();
    const StaffRate = require('../../src/models/staffrate.model')();

    var output = [{
      Trips: [],
    }];
    var outputuser = [];
    var outputusertrip = [];
    var userteamid = [];
    var userteamFull = [];
    var userLeader = [];


    if (job.JobStatusId == 4) {
      let rawData = await jobTrip.query().where('JobId', job.Id);

      for (let i = 0; i < rawData.length; i++) {
        let tripIdNow = rawData[i].TripId;
        let tripData = await trip.query().eager("[ users, usertrips ]").where('Id', tripIdNow);

        output[0].Trips.push(tripData[0]);
      };

      for (let u = 0; u < output[0].Trips.length; u++) {
        outputuser.push(output[0].Trips[u].users);
        outputusertrip.push(output[0].Trips[u].usertrips);

        for (var key in outputusertrip[0]) {
          let objLeader = outputusertrip[key];
          for (var key in objLeader) {
            let leader = objLeader[key].Leader;
            userLeader.push(leader)

          }
        }

        for (var key in outputuser[0]) {
          let obj = outputuser[key];
          let z = 0;
          for (var key in obj) {
            let objid = obj[key].Id;
            userteamid.push(objid)
            let objfname = obj[key].FirstName;
            let objlname = obj[key].LastName;
            userteamFull.push(objfname + " " + objlname)
            let y = 1;

           
            var Enablerate = job.EnableRate;
            var Customername = job.Customer;
            if (Enablerate == null || Enablerate == false) {
              var res = this.null;
              await StaffRate.query().insert({ JobId: job.Id, JobType: job.JobTypeId, JobDate: job.JobDate, QuestionNo: res, RateValue: res, UserId: userteamid[z], FullName: userteamFull[z], Leader: userLeader[z],EnableRate:Enablerate,CustomerName:Customername });
            } else {
              var str = job.Rate;
              var res = str.split(',');
              for (let rate = 0; rate < 4; rate++) {
                //rateuser.push(res[rate]);
  
                await StaffRate.query().insert({ JobId: job.Id, JobType: job.JobTypeId, JobDate: job.JobDate, QuestionNo: y, RateValue: res[rate], UserId: userteamid[z], FullName: userteamFull[z], Leader: userLeader[z],EnableRate:Enablerate,CustomerName:Customername });
  
                y++;
              }
            }


            
            z++;
          }
        }

      }


    };

    console.log(userteamid);
    console.log(userteamFull);

    return context;
  };



};
