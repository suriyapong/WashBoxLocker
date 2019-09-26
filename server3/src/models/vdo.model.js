// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class vdo extends Model {

  static get tableName() {
    return 'Vdo';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    this.CreatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  return vdo;
};
