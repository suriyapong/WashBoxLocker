// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const delay = require('delay');
// eslint-disable-next-line no-unused-vars
module.exports = function (miliseconds = 1000) {
  return async context => {
    await  delay(miliseconds);
    return context;
  };
};
