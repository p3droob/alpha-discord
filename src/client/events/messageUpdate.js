const { Message, TextChannel } = require('../../structures/');
const { Endpoints } = require('../../util/Constants')

module.exports = async function messageUpdate (payload, _client) {
  let newMessage = new Message(_client, await _client.requestHandler.request(Endpoints.CHANNEL_MESSAGE(payload.d.channel_id, payload.d.id), {
    method: 'GET'
  }));
  newMessage.channel = new TextChannel(_client, await _client.requestHandler.request(Endpoints.CHANNEL(newMessage.channelId, {
      method: 'GET',
    })));
  let oldMessage = newMessage._correct(payload.d)

  _client.emit('messageUpdate', oldMessage, newMessage)
}