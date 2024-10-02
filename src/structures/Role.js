const Base = require('./Base');
const Guild = require('./Guild');

module.exports = class Role extends Base {
  constructor(client, data) {
    super(client, data.id);
    
    this.name = data.name;
    this.permissions = data.permissions;
    this.color = data.color;
    this.guild = new Guild(client, data.guild);
    this.position = data.position;
    this.hoist = data.hoist;
    this.iconRole = data.icon;
    this.mentionable = data.mentionable;
  }
}