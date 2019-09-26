ReportBy = function (options = {}) {
  return async context => {

    let user = context.params.user;
    context.data.ReportBy = user.FirstName + " " + user.LastName
    //
    return context;
  };

};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ReportBy()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
