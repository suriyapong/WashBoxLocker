// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class request extends Model {

  static get tableName() {
    return 'Request';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {

  }

  $beforeUpdate() {
    
  }

  static get relationMappings() {

    const companyModel = require('./company.model')();
    const airPortsModel = require('./airports.model')();
    const requestStatusModel = require('./requeststatus.model')();
    const requestUserModel = require('./requestuser.model')();

    return {
      company: {
        relation: Model.HasOneRelation,
        modelClass: companyModel,
        join: {
          from: 'Request.CompanyId',
          to: 'Companys.Id'
        }
      },

      destairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'Request.DestAirPortId',
          to: 'AirPorts.Id'
        }
      },
      departairport: {
        relation: Model.HasOneRelation,
        modelClass: airPortsModel,
        join: {
          from: 'Request.DepartAirPortId',
          to: 'AirPorts.Id'
        }
      },

      requeststatus: {
        relation: Model.HasOneRelation,
        modelClass: requestStatusModel,
        join: {
          from: 'Request.RequestStatusId',
          to: 'RequestStatus.Id'
        }
      },
      requestuser: {
        relation: Model.HasManyRelation,
        modelClass: requestUserModel,
        join: {
          from: 'Request.Id',
          to: 'RequestUser.RequestId'
        }
      }    
    }
  }
}

module.exports = function (app) {
  return request;
};
