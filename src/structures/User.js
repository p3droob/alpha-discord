const Base = require('./Base');
const { UserFlags } = require('../util/Constants');
const { Nitro } = require('../util/Constants');

module.exports = class User extends Base {
  constructor(data) {
    super(data.id);
    
    this.username = data.username;
    if (data.bot) this.bot = data.bot;
    this.discriminator = data.discriminator;
    this.flags = data.flags || data.public_flags;
    this.avatar = data.avatar;
    this.nitro = data.premium_type !== 0 ? Nitro[data.premium_type] : null;
    this.banner = data.banner || null;
    this.accent_color = data.accent_color || null;
    this.locale = data.locale || null;
    this.system = data.system || null;
  };
  toString() {
    return `${this.username}#${this.discrimator}`
  };

  get mention() {
    return `<@${this.id}>`;
  };

  get tag() {
    return `${this.username}#${this.discriminator}`;
  };

  get defaultAvatar () {
    return Avatars[this.discriminator % 5];
  };

  avatarURL (options={}) {
    if (this.avatar) {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options.format || 'png'}?size=${options.size || '1024'}`
    } else {
      return this.defaultAvatar;
    }
  }
}