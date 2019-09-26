// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class requestuser extends Model {

  static get tableName() {
    return 'RequestUser';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
    
  }

  static get relationMappings() {
    const userModel = require('./user.model')();
    const requestModel = require('./request.model')();

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: userModel,
        join: {
          from: 'RequestUser.UserId',
          to: 'Users.Id'
        }
      },
      request: {
        relation: Model.HasOneRelation,
        modelClass: requestModel,
        join: {
          from: 'RequestUser.RequestId',
          to: 'Request.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
  return requestuser;
};
