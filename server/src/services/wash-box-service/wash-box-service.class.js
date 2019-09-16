/* eslint-disable no-unused-vars */
exports.WashBoxService = class WashBoxService {
  constructor(options) {
    this.options = options || {};
  }

  async patch(id, data, params) {
    //case 1
    if (id == "CheckAvilable") {
      let result = await this.execCheckAvailable();
      return result;
    }

    //case 2
    if (id == "SetDropOff") {
      let result = await this.execSetDropOff(data);
      return result;
    }

    //case 3 Only Application
    if (id == "ClearDropOff") {
      let result = await this.execClearDropOff(data);
      console.log("Status : " + result[0].Status);
      return result;
    }

    //case 4 Only Application
    if (id == "SetPickUp") {
      console.log("case 4 SetPickUp");
      let result = await this.execSetPickUp(data);
      console.log("Status : " + result[0].Status);
      return result;
    }

    //case 5
    if (id == "CheckCodePickUp") {
      let result = await this.execCheckCodePickUp(data);
      console.log("LockerID : " + result[0].LockerID);
      return result;
    }

    //case 6
    if (id == "ClearPickUp") {
      let result = await this.execClearPickUp(data);
      console.log("Status : " + result[0].Status);

      return result;
    }
  }

  //case 1
  async execCheckAvailable() {
    let status = false;
    const locker = require('../../models/locker.model')();

    const lockerAvailable = await locker.query().where('Active', 0);
    console.log("Length : " + lockerAvailable.length);
    if (lockerAvailable.length > 0) {
      console.log("Locker Available ID : " + JSON.stringify(lockerAvailable[0].LockerID));
      status = true;
    }

    return [{ "Status": status }];
  }

  //case 2
  async execSetDropOff(data) {
    let lockerNo = 0;
    let telephone = data.Telephone;
    const job = require('../../models/job.model')();
    const locker = require('../../models/locker.model')();

    let checkTelephone = await locker.query().where('Active', 1).where('TelNo', telephone);
    console.log("Check Telephone : " + checkTelephone.length)
    if (checkTelephone.length == 0) {
      let lockerAvailable = await locker.query().where('Active', 0);
      console.log("Locker Available : " + lockerAvailable.length)
      if (lockerAvailable.length > 0) {
        console.log("Locker Available No : " + lockerAvailable[0].LockerID);
        let lockerNoSelect = lockerAvailable[0].LockerID;
        let dateNow = new Date();
        let telephones = telephone.split(' ');
        let tel = "";
        telephones.forEach(t => {
          tel += t;
        });
        console.log("Telephone : " + tel);

        //1. ทำการ gen job code ก่อนโดย insert ที่ตาราง tbjob แล้วเอา id มา gen jobcode ต่อ
        let result = await job.query().insert({ JobCode: "jx", TelNo: tel, LockerNo: lockerNoSelect, CreateDate: new Date() })
        console.log("Insert : " + JSON.stringify(result));

        let jobCode = "j" + result.Id;
        await job.query().where('Id', result.Id).patch({ JobCode: jobCode });
        console.log("JobCode : " + jobCode);
        let numberOfEditedRows = await locker.query().where('LockerID', lockerNoSelect).patch({ Active: 1, StartTime: dateNow, TelNo: tel, Type: "dropoff", JobCode: jobCode });
        if (numberOfEditedRows > 0) {
          lockerNo = lockerNoSelect;
          let success = this.execAddLog("ลูกค้าฝากผ้าซัก", tel, lockerNo, jobCode);
          if (success) {
            console.log("Add log complete");
            console.log("Locker No : " + lockerNo);
          }
        }
      }
      return [{ "LockerNo": lockerNo }];
    }
  }

  //case 3 Only Application
  async execClearDropOff(data) {
    let status = false;
    let lockerID = data.LockerID;
    console.log("LockerID : " + lockerID);

    const locker = require('../../models/locker.model')();

    let checkLocker = await locker.query().where('LockerID', lockerID).where('Active', 1);
    if (checkLocker.length > 0) {
      const numberOfEditedRows = await locker.query().where('LockerID', checkLocker[0].LockerID).patch({ Active: 0, StartTime: null, TelNo: null, Type: null, JobCode: null });
      if (numberOfEditedRows > 0) {
        status = true;
        let success = this.execAddLog("พนักงานมาเปิดเอาผ้าไปซัก", checkLocker[0].TelNo, checkLocker[0].LockerID, checkLocker[0].JobCode);
        if (success) {
          console.log("Add log complete");
        }
      }
    }

    return [{ "Status": status }];
  }

  //case 4 Only Application
  async execSetPickUp(data) {
    let status = false;
    let lockerID = data.LockerID;
    let jobCode = data.JobCode;
    let otp = Math.floor(1000 + Math.random() * 9000);
    const locker = require('../../models/locker.model')();
    const job = require('../../models/job.model')();

    //check locker เบอร์นี้ว่างไหม
    let lockerAvailable = await locker.query().where('Active', 0).where('LockerID', lockerID);
    console.log("Locker Available : " + lockerAvailable.length)
    if (lockerAvailable.length > 0) {
      console.log("Locker Available No : " + lockerAvailable[0].LockerID);
      //Check JobCode เช็คใน job ว่ามีเลขนี้ในระบบไหม ถ้ามีก็ทำต่อ (เลขจะถูกสร้างตอนฝากผ้า)
      let jobCodePass = await job.query().where('JobCode', jobCode);
      console.log("Check JobCode : " + JSON.stringify(jobCodePass));
      if (jobCodePass.length > 0) {
        let dateNow = new Date();
        const numberOfEditedRows = await locker.query().where('LockerID', lockerID).patch({ Active: 1, StartTime: dateNow, TelNo: jobCodePass[0].TelNo, Type: "pickup", OTP: otp, JobCode: jobCode });
        status = true;
        let success = this.execAddLog("พนักงานนำผ้าใส่ตู้เพื่อส่งคืนลูกค้า", "", lockerID, jobCode);
        if (success) {
          console.log("Add log complete");
        }
      }
    }

    return [{ "Status": status, "JobCode": jobCode, "OTP": otp }];
  }

  //case 5
  async execCheckCodePickUp(data) {
    let lockerID = 0;
    let otp = data.OTP;
    console.log("OTP : " + otp);
    const locker = require('../../models/locker.model')();
    let checkOTP = await locker.query().where('OTP', otp).where('Active', 1).where('Type', "pickup");
    console.log("checkOTP : " + checkOTP.length);
    if (checkOTP.length > 0) {
      console.log("LockerID : " + JSON.stringify(checkOTP[0].LockerID));
      lockerID = checkOTP[0].LockerID;
    }

    return [{ "LockerID": lockerID }];
  }

  //case 6
  async execClearPickUp(data) {
    let lockerID = data.LockerID;
    let status = false;
    const locker = require('../../models/locker.model')();

    let clearLocker = await locker.query().where('LockerID', lockerID).where('Active', 1).where('Type', "pickup");
    if (clearLocker.length > 0) {
      const numberOfEditedRows = await locker.query().where('LockerID', clearLocker[0].LockerID).patch({ Active: 0, StartTime: null, TelNo: null, Type: null, OTP: null, JobCode: null });
      if (numberOfEditedRows > 0) {
        status = true;
        let success = this.execAddLog("ลูกค้ามารับผ้าที่ซักไปแล้ว", "", lockerID,"");
        if (success) {
          console.log("Add log complete");
        }
      }
    }

    return [{ "Status": status }];
  }

  async execAddLog(message, telNo, lockerNo, jobCode) {
    let status = false;
    const log = require('../../models/log.model')();
    try {
      console.log("Add Log true");
      await log.query().insert({ Message: message, TelNo: telNo, LockerID: lockerNo, JobCode: jobCode, CreateDate: new Date() });
      status = true;
      console.log("Add Log true");
    } catch (error) {
      status = false;
    }
    return status;
  }
}
