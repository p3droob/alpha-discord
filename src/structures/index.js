const fs = require('fs');

const structures = fs.readdirSync(__dirname);
structures.splice(structures.indexOf('index.js'), 1);
structures.splice(structures.indexOf('managers'), 1);

for (let structure of structures) {
  structure = structure.replace('.js', '');
  module.exports[structure] = require(`./${structure}`);
}