const locker = require('./locker/locker.service.js');
const record = require('./record/record.service.js');
const checkAvailable = require('./check-available/check-available.service.js');
const dropOff = require('./drop-off/drop-off.service.js');
const cleanDropOff = require('./clean-drop-off/clean-drop-off.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(locker);
  app.configure(record);
  app.configure(checkAvailable);
  app.configure(dropOff);
  app.configure(cleanDropOff);
};
