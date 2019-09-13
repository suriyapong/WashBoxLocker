const locker = require('./locker/locker.service.js');
const record = require('./record/record.service.js');
const checkAvailable = require('./check-available/check-available.service.js');
const dropOff = require('./drop-off/drop-off.service.js');
const cleanDropOff = require('./clean-drop-off/clean-drop-off.service.js');
const customService = require('./custom-service/custom-service.service.js');
const log = require('./log/log.service.js');
const user = require('./user/user.service.js');
const role = require('./role/role.service.js');
const washBoxService = require('./wash-box-service/wash-box-service.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(locker);
  app.configure(record);
  app.configure(checkAvailable);
  app.configure(dropOff);
  app.configure(cleanDropOff);
  app.configure(customService);
  app.configure(log);
  app.configure(user);
  app.configure(role);
  app.configure(washBoxService);
};
