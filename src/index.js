module.exports = {
  Client: require('./client/Client.js'),
  Util: require('./util/'),
};

Object.keys(require('./structures')).forEach(key => {
  if (key.includes('managers')) return;
  if (key.includes('index')) return;
  module.exports[key] = require(`./structures/${key}`)
});
