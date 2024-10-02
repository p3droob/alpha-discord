const { Message, TextChannel, Guild } = require('../../structures/');
const { Endpoints } = require('../../util/Constants')

module.exports = async function messageCreate (payload, _client) {
  const message = new Message(_client, payload.d);
  message.channel = new TextChannel(_client, await _client.requestHandler.request(Endpoints.CHANNEL(message.channelId, {
      method: 'GET',
    })));
  message.guild = _client.guilds.get(payload.d.guild_id)
  _client.emit('messageCreate', message)
}
