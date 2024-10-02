const Base = require('./Base');
const AlphaError = require('../errors/create');
const MessageEmbed = require('./MessageEmbed'),
Message = require('./Message'),
{ Endpoints } = require('../util/Constants'),
Collection = require('../util/Collection');

module.exports = class TextChannel extends Base {
  constructor(client, data) {
    super(client, data.id);
    this.guildId = data.guild_id;
  }
  async send(options) {
    if (!options) throw new AlphaError('Cannot sent empty messages!');

    let opt = {};

    if (typeof options == 'string') opt.content = options;

    let embeds = options.embeds || [];

    if (!options.embeds) {
      if (options instanceof MessageEmbed) {
        if (Array.isArray(options)) embeds.push(...options)
        else embeds.push(options)
      }
    }

    opt.embeds = embeds;

    return await this.client.requestHandler.request(Endpoints.CHANNEL_MESSAGES(this.id), {
      method: 'POST',
      body: opt
    }).then(msg => {
      msg = new Message(this.client, msg);
      msg.guildId = this.guildId;
      return msg
      })
  };
  async messages() {
    const messages = await this.client.requestHandler.request(Endpoints.CHANNEL_MESSAGES(this.id), {
      method: 'GET'
    })
    return messages.map(m => {
      m.timestamp = new Date(m.timestamp).getTime()
      return m;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }
}