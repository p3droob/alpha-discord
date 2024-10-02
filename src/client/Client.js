const { EventEmitter } = require('events');
const AlphaError = require('../errors/create.js');
const Partials = ["USER", "CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"];
const WebSocketHandler = require('../gateway/WebSocket')
const GatewayIntents = require('../gateway/Intents')
const RequestHandler = require('../rest/RequestHandler')
const { Endpoints, WSCodes } = require('../util/Constants')
const Structures = require('../structures');
const Collection = require('../util/Collection');


module.exports = class Client extends EventEmitter {
  constructor(options) {
    super();
   if (!options) throw new AlphaError('The value token must not be empty', { method: 'new Client', status: 405 })
   if (typeof options.token !== 'string') throw new AlphaError('Invalid Token', { method: 'new Client', status: 405 });
   if (!options.intents) throw new AlphaError('Invalid intents')
    this.token = options.token;
    this.prefix = options.prefix || null;
    //['React', 'Emojis', 'Collector'].forEach(path => require(`../services/${path}`));

    
    this.ws = new WebSocketHandler(this, options.token, GatewayIntents.resolve(options.intents)
    );
    this.ready = null;
    this.user = null;

    this.users = new Collection();
    this.guilds = new Collection();
    this.emojis = new Collection();
    this.channels = new Collection();
    this.connect();
    this.token = options.token;
    this.requestHandler = new RequestHandler(this);
  }

  connect () {
    try {
    this.ws.connect();
    } catch(e) {
      throw new Error(e? (e.code ? (WSCodes[e.code] || e) : e) : e)
    }
  }
  
  fetchUser (userId) {
    return this.requestHandler
      .request(Endpoints.USER(userId))
      .then((user) => new Structures.User(user))
  };

  get events() {
    const fs = require('fs');

    const events = fs.readdirSync(__dirname+'/events');

    let data = {};

    for (let event of events) {
      event = event.replace('.js', '');
      data[event] = require(`./events/${event}`);
    }
    return data
  };
}
