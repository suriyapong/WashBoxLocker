/* eslint-disable no-unused-vars */
exports.DropOff = class DropOff {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let lockerNo = 0;

    let telephone = params.query.Telephone;
    console.log(telephone);

    const locker = require('../../models/locker.model')();

    let checkTelephone = await locker.query().where('Active', 1).where('TelNo', telephone);
    console.log("Check Telephone : " + checkTelephone.length)
    if (checkTelephone.length == 0) {
      let lockerAvailable = await locker.query().where('Active', 0);
      console.log("Locker Available : " + lockerAvailable.length)
      if (lockerAvailable.length > 0) {
        console.log("Locker Available No : " + lockerAvailable[0].LockerID);
        let dateNow = new Date();
        let telephones = telephone.split(' ');
        let tel = "";
        telephones.forEach(t => {
          tel += t;
        });
        console.log("Telephone : " + tel);
        let jobCode = dateNow.getFullYear() + "_" + dateNow.getMonth() + "_" + 1 + dateNow.getDay() + "_" + tel;
        const numberOfEditedRows = await locker.query().where('LockerID', lockerAvailable[0].LockerID).patch({ Active: 1, StartTime: dateNow, TelNo: tel, Type: "dropoff", JobCode: jobCode });
        if (numberOfEditedRows == 1) {
          lockerNo = lockerAvailable[0].LockerID;
        }
      }
    }
    return [{ "LockerNo": lockerNo }];
  }



  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {

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
