const Base = require('./Base'),
User = require('./User'),
MessageEmbed = require('./MessageEmbed');
const resolveEmoji = require('../util/resolveEmoji');

const { Endpoints } = require('../util/Constants')

module.exports = class Message extends Base {
  constructor(client, data) {
    super(client, data.id);
    this.content = data.content;
    this.channelId = data.channel_id;
    this.guildId = data.guild_id
    this.tts = data.tts || false;
    this.embeds = [];
    this.createdTimestamp = data.timestamp;
    this.author = null;
    this.deleted = data.deleted || false;
    if (data.embeds) {
      if (Array.isArray(data.embeds)) {
        this.embeds = data.embeds.map(embed => new MessageEmbed(embed));
      }
    };
    if (data.author) this.author = new User(data.author);
  };

  delete() {
    this.deleted = true;
    this.client.requestHandler.request(Endpoints.CHANNEL_MESSAGE(this.channelId, this.id), {
      method: 'DELETE'
    });
    return this
  };
  async react(emoji) {
   if (Array.isArray(emoji)) {
     return emoji.forEach(e => {
        this.client.requestHandler.request(Endpoints.CREATE_REACTION(this.channelId, this.id, resolveEmoji(emoji)), {
         method: 'PUT'
       })
     })
   } else {
     return await this.client.requestHandler.request(Endpoints.CREATE_REACTION(this.channelId, this.id, resolveEmoji(emoji)), {
       method: 'PUT'
     })
   }
  }
}