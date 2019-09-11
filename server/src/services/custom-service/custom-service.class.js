/* eslint-disable no-unused-vars */
exports.CustomService = class CustomService {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let cmd = params.query.Cmd;
    //case 2
    let telephone = params.query.Tel;

    //case 3 case 4 case 6
    let lockerNo = params.query.LockerNo;
    //case 4
    let jobCode = params.query.JobCode;
    //case 5
    let code = params.query.Code;

    //case 1
    if (cmd == "CheckAvilable") {
      let result = await this.execCheckAvailable();
      console.log("Status : " + result[0].Status);

      return result;
    }

    //case 2
    if (cmd == "SetDropOff") {
      let result = await this.execSetDropOff(telephone);
      console.log("LockerNo : " + result[0].LockerNo);
      return result;
    }

    //case 3 Only Application
    if (cmd == "ClearDropOff") {
      let result = await this.execClearDropOff(lockerNo);
      console.log("LockerNo : " + result[0].LockerNo);

      return result;
    }

    //case 4 Only Application
    if (cmd == "SetPickUp") {
      let result = await this.execSetPickUp(lockerNo, jobCode);
      console.log("LockerNo : " + result[0].LockerNo);

      return result;
    }

    //case 5
    if (cmd == "CheckCodePickUp") {
      let result = await this.execCheckCodePickUp(code);
      console.log("LockerNo : " + result[0].LockerNo);

      return result;
    }

    //case 6
    if (cmd == "ClearPickUp") {
      let result = await this.execClearPickUp(lockerNo);
      console.log("LockerNo : " + result[0].LockerNo);

      return result;
    }
  }

  async get(id, params) {
    //let tel = data.Tel;
    console.log(id);
    console.log(params.query.Tel);

    return [{ "Status": 1 }];
  }
  async patch(id, data, params) {
    console.log(id);
    console.log(data);
    return id;
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
  async execSetDropOff(telephone) {
    let lockerNo = 0;
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
        let jobCode = dateNow.getFullYear() + "_" + dateNow.getMonth() + "_" + 1 + dateNow.getDay() + "_" + tel;
        const numberOfEditedRows = await locker.query().where('LockerID', lockerNoSelect).patch({ Active: 1, StartTime: dateNow, TelNo: tel, Type: "dropoff", JobCode: jobCode });
        if (numberOfEditedRows > 0) {
          lockerNo = lockerNoSelect;
          let success = this.addLog("ลูกค้าฝากผ้าซัก", tel, lockerNo, jobCode);
          if (success) {
            console.log("Add log complete");
          }
        }
      }
    }

    return [{ "LockerNo": lockerNo }];
  }

  //case 3 Only Application
  async execClearDropOff(lockerNo) {
    let status = false;
    console.log("Locker No : " + lockerNo);

    const locker = require('../../models/locker.model')();

    let checkLocker = await locker.query().where('LockerID', lockerNo).where('Active', 1);
    if (checkLocker.length > 0) {
      const numberOfEditedRows = await locker.query().where('LockerID', checkLocker[0].LockerID).patch({ Active: 0, StartTime: null, TelNo: null, Type: null, JobCode: null });
      if (numberOfEditedRows > 0) {
        status = true;
      }
    }

    return [{ "Status": status }];
  }

  //case 4 Only Application
  async execSetPickUp(lockerNo, jobCode) {
    const locker = require('../../models/locker.model')();

    let lockerAvailable = await locker.query().where('Active', 0).where('lockerNo', lockerNo);
    console.log("Locker Available : " + lockerAvailable.length)
    if (lockerAvailable.length > 0) {
      console.log("Locker Available No : " + lockerAvailable[0].LockerID);
      let dateNow = new Date();
      const numberOfEditedRows = await locker.query().where('LockerID', lockerNo).patch({ Active: 1, StartTime: dateNow, TelNo: "", Type: "pickup", JobCode: jobCode });
    }

    return [{ "LockerNo": lockerNo }];
  }

  //case 5
  async execCheckCodePickUp(code) {
    let lockerNo = 0;
    const locker = require('../../models/locker.model')();

    let checkCode = await locker.query().where('OTP', code).where('Active', 1).where('Type', "pickup");
    if (checkCode.length > 0) {
      lockerNo = checkCode[0].LockerID;
    }

    return [{ "LockerNo": lockerNo }];
  }

  //case 6
  async execClearPickUp(lockerNo) {
    let status = false;
    const locker = require('../../models/locker.model')();

    let clearLocker = await locker.query().where('LockerID', lockerNo).where('Active', 1).where('Type', "pickup");
    if (clearLocker.length > 0) {
      const numberOfEditedRows = await locker.query().where('LockerID', clearLocker[0].LockerID).patch({ Active: 0, StartTime: null, TelNo: null, Type: null, JobCode: null });
      if (numberOfEditedRows > 0) {
        status = true;
      }
    }

    return [{ "Status": status }];
  }

  async addLog(message, telNo, lockerNo, jobCode) {
    let status = false;
    const log = require('../../models/log.model')();
    try {
      await log.query().insert({ Message: message, TelNo: telNo, LockerID: lockerNo, JobCode: jobCode, CreateDate: new Date() });
      status = true;
    } catch (error) {
      status = false;
    }
    return status;
  }
}
