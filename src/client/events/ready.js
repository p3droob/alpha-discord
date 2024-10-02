const { ClientUser, Guild, GuildEmoji, GuildMember } = require('../../structures/');
const { Endpoints } = require('../../util/Constants');
const Collection = require('../../util/Collection');

module.exports = async function onReady (payload, _client) {
  _client.ready = Date.now()
  _client.user = new ClientUser(payload.d.user);
  _client.uptime = Date.now();
  let _guilds = new Collection();
  let guilds = await Promise.all(payload.d.guilds.map(async g => {
    let guild = await _client.requestHandler.request(Endpoints.GUILD(g.id), {
      method: 'GET'
    });
    return guild;
  }));
  guilds.forEach(async g => {
    const guild = new Guild(_client, g);
    const emojis = await _client.requestHandler.guilds(g.id).emojis().then(es => es.map(e => {
      e = new GuildEmoji(_client, e, guild);
      guild.emojis.set(e.id, e)
      return e;
    }));

    _guilds.set(g.id, guild);
  })
  _client.guilds = _guilds;
  _client.emit('ready');
}