const Base = require('./Base');
const User = require('./User');

class GuildEmoji extends Base {
  constructor(client, data, guild) {
    super(data.id);

    this.animated = data.animated

    this.name = data.name;
    this.guild = guild;
    this.managed = data.managed;
    this.available = data.available;
    this.user = new User(data.user);
  };
  get mention() {
    return this.id ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name;
  };
}

module.exports = GuildEmoji;
