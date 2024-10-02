const { UserFlags } = require('../util/Constants');

module.exports = class ClientUser {
  constructor(data) {
    this.verified = data.verified;
    this.id = data.id;
    this.flags = data.flags;
    this.bot = data.bot;
    this.mfa_enabled = data.mfa_enabled;
    this.username = data.username;
    this.avatar = data.avatar;
    if (data.discriminator) this.discriminator = data.discriminator;
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