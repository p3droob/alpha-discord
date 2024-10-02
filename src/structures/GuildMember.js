const Base = require('./Base');
const User = require('./User');
const Guild = require('./Guild')
const { Endpoints } = require('../util/Constants');

module.exports = class GuildMember extends Base {
  constructor (client, data) {
    super(client, data.id)

    this.guild = new Guild(client, data.guild)
    this.roles = data.roles
    this.user = new User(client, data.user)
    this.permissions = data.permissions
    this.deaf = data.deaf
    this.joinedAt = this.joinedTimestamp = new Date(data.joined_at).getTime();
    this.premium_since = new Data(data.premium_since).getTime();
    this.nickname = data.nick
  };

  ban({reason, deleteMessageDays}) {
    return this.client.requestHandler.guilds(this.guild.id).ban({id: this.user.id, reason, delete_message_days: deleteMessageDays || 0})
  };
}