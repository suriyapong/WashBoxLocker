// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

var fs = require('fs');

module.exports = function (filename = 'context.json') {
  return async context => {

    var path = './debugContext/';
    outputFilename = path + filename;

    await fs.promises.mkdir(path, { recursive: true });

    var content = JSON.stringify(context, null, 4);
    fs.writeFile(outputFilename,content, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Context saved to " + outputFilename);
        }
    }); 

    return context;
  };
};
