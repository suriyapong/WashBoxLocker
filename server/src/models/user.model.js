// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class user extends Model {

  static get tableName() {
    return 'Users';
  }

  static get idColumn() {
    return 'Id';
  }
  //Add New สำหรับคำนวณ ตัวอย่าง function ชื่อ total ผลลัพธ์ได้ column total
  static get virtualAttributes() {
    return ['FullName'];
  }

  FullName() {
    return this.FirstName + ' ' + this.LastName;
  }

  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    const role = require('./role.model')();
    return {
      role: {
        relation: Model.HasOneRelation,
        modelClass: role,
        join: {
          from: 'Users.RoleId',
          to: 'Roles.Id'
        }
      }
    }
  }
}

module.exports = function (app) {
  
  return user;
};
