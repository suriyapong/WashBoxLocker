// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class owner extends Model {

  
  static get tableName() {
    return 'Owners';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }

  
}

module.exports = function (app) {
 
  return owner;
};
