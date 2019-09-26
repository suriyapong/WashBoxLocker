const user = require('./user/user.service.js');
const locker = require('./locker/locker.service.js');
const checkAvailable = require('./check-available/check-available.service.js');
const cleanDropOff = require('./clean-drop-off/clean-drop-off.service.js');
const dropOff = require('./drop-off/drop-off.service.js');
const job = require('./job/job.service.js');
const log = require('./log/log.service.js');
const record = require('./record/record.service.js');
const role = require('./role/role.service.js');
const washBoxService = require('./wash-box-service/wash-box-service.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(locker);
  app.configure(checkAvailable);
  app.configure(cleanDropOff);
  app.configure(dropOff);
  app.configure(job);
  app.configure(log);
  app.configure(record);
  app.configure(role);
  app.configure(washBoxService);
};
