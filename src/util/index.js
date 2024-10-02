const { readdirSync } = require('fs');

const utils = readdirSync(__dirname);
utils.splice(utils.indexOf('index.js'), 1);

for (let util of utils) {
  util = util.replace('.js', '');
  module.exports[util] = require(`./${util}`);
}