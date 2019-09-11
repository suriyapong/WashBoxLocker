// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class log extends Model {

  static get tableName() {
    return 'tblog';
  }

  static get idColumn() {
    return 'LogID';
  }

  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('log').then(exists => {
    if (!exists) {
      db.schema.createTable('log', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created log table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating log table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating log table', e)); // eslint-disable-line no-console

  return log;
};
