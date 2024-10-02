// module.exports = require('./src/index.js');
const Constants = require('./src/util/Constants'),
{ Endpoints } = Constants;
const User = require('./src/structures/User');
const MessageEmbed = require('./src/structures/MessageEmbed')
const Client = require('./src/client/Client')
const client = new Client({
  token: 'OTExMjUwMzA1NDM2NDk1ODcy.YZep-w.QZZTOcbbImmBbrRyR4wqP-thbho',
  prefix: '!',
  intents: 32767
});

client.on('ready', async () => {
  console.log(' online', client);
});
client.on('messageCreate', async message => {
  if (message.content.startsWith('a.e')) {
    return console.log(await eval(`(async () => {\n ` + `return ` + message.content.slice(3)+ `\n})()`).catch(e => console.log('error', e.stack)));

  }
});

undefined
/*(async () => {
  let ch = await client.requestHandler.request('/guilds/852217739896815626/channels', {
    method: 'GET'
  });
  let Collection = require('./src/util/Collection');
  let co = new Collection();
  ch.forEach(c => {
    co.set(c.id, c)
  })
  console.log(co);
})();*/