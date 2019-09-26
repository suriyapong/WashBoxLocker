// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class record extends Model {

  static get tableName() {
    return 'tbrecord';
  }

  static get idColumn() {
    return 'RecordID';
  }

  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  return record;
};
