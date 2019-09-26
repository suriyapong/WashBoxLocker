// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
var differenceInDays = require('date-fns/difference_in_days');
var format = require('date-fns/format')

class user extends Model {

  static get tableName() {
    return 'Users';
  }

  static get idColumn() {
    return 'Id';
  }
  //Add New สำหรับคำนวณ ตัวอย่าง function ชื่อ total ผลลัพธ์ได้ column total
  static get virtualAttributes() {
    return ['FullName', 'MedicalCheckupDayLeft', 'SafetyTrainingDayLeft','ShortName','CodeName'];
  }

  FullName() {
    return this.FirstName + ' ' + this.LastName;
  }
  CodeName() {


    return this.FirstName + ' ' + this.LastName;
  }
  ShortName() {
    return this.FirstName + ' ' + this.LastName;
  }
  SafetyTrainingDayLeft() {
    if(this.SafetyTraining == null){
      return null
    }else{
      var today = new Date()
      var newDay =  format(today, "YYYY-MM-DD");
      var SafetyTraining =  format(this.SafetyTraining, "YYYY-MM-DD");
      var result = differenceInDays(SafetyTraining,newDay)
    return result
    }
  }

  
  MedicalCheckupDayLeft() {
    if(this.MedicalCheckUp == null){
      return null
    }else{
      
      var today = new Date()
      var newDay =  format(today, "YYYY-MM-DD");
      var MedicalCheckUp =  format(this.MedicalCheckUp, "YYYY-MM-DD");
      var result = differenceInDays(MedicalCheckUp,newDay)
    return result
    }

   
  }


  $beforeInsert() {

  }

  $beforeUpdate() {

  }

  static get relationMappings() {
    const role = require('./role.model')();
    const company = require('./company.model')();
    return {
      role: {
        relation: Model.HasOneRelation,
        modelClass: role,
        join: {
          from: 'Users.RoleId',
          to: 'Roles.Id'
        }
      },
      company: {
        relation: Model.HasOneRelation,
        modelClass: company,
        join: {
          from: 'Users.CompanyId',
          to: 'Companys.Id'
        }
      }
    }
  }
}

module.exports = function (app) {

  return user;
};
