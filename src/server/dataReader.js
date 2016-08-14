const convert = require('./converter');
const http = require('http');

//  Reads data from the weather station and passes it to converter module.
const dataReader = (path, callback) => {
  http.get(`${path}/FullDataString`, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (error) => {
      console.info('ERR', error);
      return error;
    });

    resp.on('data', (data) => {
      callback(convert(data))
    });
  });
};

module.exports = dataReader;