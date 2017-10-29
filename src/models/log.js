const config = require('./config.js');

const log = {
  log(message) {
    if (config.verbose === true) console.log(message);
  },
};

module.exports = log;
