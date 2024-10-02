const Base = require('./Base');
const Collection = require('../util/Collection');
const { Endpoints } = require('../util/Constants')

module.exports = class Guild extends Base {
  constructor(client, data) {
    super(client, data.id);
    this.name = data.name;
    this.icon = data.icon;
    this.members = new Collection();
    this.emojis = new Collection();
  }

   iconURL(options={}) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.${options.format || 'webp'}`
  };
  deleteEmoji(id) {
    return this.client.requestHandler.request(Endpoints.GUILD_EMOJI(this.id, id), {
      method: 'DELETE'
    })
  };

  setName(name) {
    return this.client.requestHandler.guilds(this.id).patch({name});
  }
  createEmoji(data={}) {
    return this.client.requestHandler.request(Endpoints.GUILD_EMOJIS, {
      method: 'POST',
      body: {
        name: data.name,
        image: data.image
      }
    })
  };

  leave() {
    return this.client.requestHandler.users('@me').guilds(this.id).then(a => a.delete())
  };

  banMember(id, {reason, deleteMessageDays}) {
    return this.client.requestHandler.guilds(this.id).ban({id, reason, delete_message_days: deleteMessageDays || 0})
  }
}