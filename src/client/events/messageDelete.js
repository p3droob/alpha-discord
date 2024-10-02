const { Message, TextChannel } = require('../../structures/');
const { Endpoints } = require('../../util/Constants');

module.exports = async function messageDelete(payload, _client) {
  const fetch = await _client.requestHandler.request(Endpoints.CHANNEL_MESSAGE(payload.d.id), {
    method: 'GET'
  });

  const message = new Message(_client, fetch);

  message.channel = new TextChannel(_client, await _client.requestHandler.request(Endpoints.CHANNEL(message.channelId, {
      method: 'GET',
    })));

    message.deleted = true;


  _client.emit('messageDelete', message)
}
