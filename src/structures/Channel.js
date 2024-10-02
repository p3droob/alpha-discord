const Base = require('./Base');
const { ChannelTypes } = require('../util');
module.exports = class Channel extends Base {
  constructor(client, data) {
    super(client, data.id);
    this.type = data.type ? ChannelTypes[data.type.toLowerCase()] : null;
  }
}