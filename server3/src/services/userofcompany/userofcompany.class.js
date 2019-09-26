/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {

    const userModel = require('../../models/user.model')();
    const companyModel = require('../../models/company.model')();
    const roleModel = require('../../models/role.model')();
    let Users = await userModel.query()
    let Companys = await companyModel.query()
    let Roles = await roleModel.query()

    var output = [{
      data:[]
    }];
   
    Companys.forEach(company => {
      var c = {};
          Roles.forEach(role => {
            
            
          c['Company'] = company.Name;
          c['Total'] = Users.filter(x => x.CompanyId == company.Id).length
          c[role.RoleName] = Users.filter(x => x.RoleId == role.Id).filter(x => x.CompanyId == company.Id).length
      });
     
      output[0].data.push(c);
    });
    return output;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
