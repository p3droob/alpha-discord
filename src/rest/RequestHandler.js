const Https = require('./Https');
const Constants = require('../util/Constants'),
{ Endpoints } = Constants;
const User = require('../structures/User'),
ClientUser = require('../structures/ClientUser')

const removeDupArr = (arr) => [...new Set(arr)];

module.exports = function RequestHandler (client, host='discord.com') {
  const token = client.token;

  function makePath (endpoint) {
    return '/api/v9' + endpoint;
  };

  this.users = function users(user) {
    async function patch(data={}) {
      const _options = {
        host,
        path: makePath(Endpoints.ME_USER),
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bot ${token.replace(/Bot\s?/, '')}`,
          'User-Agent': Constants.UserAgent,
          'Content-Type': 'application/json'
        }
      };


      return await Https.createRequest(_options)
    };
    async function get(data={}) {
      const _options = {
        host,
        path: makePath(Endpoints.USER(user)),
        method: 'GET',
        body: data.body || null,
        headers: {
          Authorization: `Bot ${token.replace(/Bot\s?/, '')}`,
          'User-Agent': Constants.UserAgent,
          'Content-Type': 'application/json'
        }
      };
      return await Https.createRequest(_options);
    };
    if (user == '@me') {
      async function guilds(id) {
        const _options = {
          host,
          path: makePath(Endpoints.ME_GUILDS),
          method: 'GET',
          body: null,
          headers: {
            Authorization: `Bot ${token.replace(/Bot\s?/, '')}`,
            'User-Agent': Constants.UserAgent,
            'Content-Type': 'application/json'
          }
        };
          let _guilds = await Https.createRequest(_options);
          let _delete;
          if (_guilds.find(g => g.id == id)) _delete = async function leave() {
            const _options = {
              host,
              path: makePath(Endpoints.ME_GUILD(id)),
              method: 'DELETE',
              headers: {
                Authorization: `Bot ${token.replace(/Bot\s?/, '')}`,
                'User-Agent': Constants.UserAgent
              }
            };
            return await Https.createRequest(_options)
          }
          if (id) {
            let guild = _guilds.find(g => g.id == id);
            guild.delete = _delete;
            return guild;
          }
          return _guilds
      }
      async function emojis(id) {
        const _guilds = await Https.createRequest({
          host,
          path: makePath(Endpoint.ME_GUILDS),
          method: 'GET',
          headers: {
            Authorization: `Bot ${token.replace(/Bot\s?/, '')}`,
            'User-Agent': Constants.UserAgent
          }
        });
        const _emojis = [];
        _guilds.forEach(_g => {
          _emojis.push()
        })
      }
      return {
        get,
        patch,
        guilds,
        emojis
      }
    }
    return {
      get,
      patch
    }
  };

  this.guilds = function guilds(guild) {
    if (!guild) return this.users('@me').guilds();
    return {
      get() {
        const _options = {
          host,
          path: makePath(Endpoints.GUILD(guild)),
          method: 'GET',
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
            'Content-Type': 'application/json'
          }
        };
        
        return Https.createRequest(_options)
      },
      async patch(data={}) {
        
        const _options = {
          host,
          path: makePath(Endpoints.GUILD(guild)),
          method: 'PATCH',
          body: data,
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
            'Content-Type': 'application/json'
          }
        };

        return await Https.createRequest(_options)
      },
      async delete() {
        
        const _options = {
          host,
          path: makePath(Endpoints.GUILD(guild)),
          method: 'DELETE',
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
          }
        };

        return await Https.createRequest(_options);
      },
      async ban(data={}) {
        const _options = {
          host,
          path: makePath(Endpoints.BAN_MEMBER(guild, data.id)),
          method: 'PUT',
          body: {
            delete_message_days: data.delete_message_days,
            reason: data.reason
          },
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
          }
        };
        return await Https.createRequest(_options);
      },
      async emojis(id) {
        const _options = {
          host,
          path: makePath(Endpoints.GUILD_EMOJIS(guild)),
          method: 'GET',
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
          }
        };
        if (!id) return await Https.createRequest(_options);
        return await Https.createRequest({
          host,
          path: makePath(Endpoints.GUILD_EMOJI(guild, id)),
          method: 'GET',
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
          }
        });
      },
      channels: async function channels(channelId) {
        const _options = {
          host,
          path: makePath(Endpoints.GUILD_CHANNELS(guild)),
          method: 'GET',
          headers: {
            Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
            'User-Agent': Constants.UserAgent,
            'Content-Type': 'application/json'
          }
        };
        const channels =  await Https.createRequest(_options);

        channels.add = async function add(data={}) {
          if (!data.name) throw new Error('Invalid Channel Name')
          const __options = {
            host,
            path: makePath(Endpoints.GUILD_CHANNELS(guild)),
            method: 'POST',
            body: data,
            headers: {
              Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
              'User-Agent': Constants.UserAgent,
              'Content-Type': 'application/json'
            }
          };

          return await Https.createRequest(__options);
        };

        channels.get = async function get(id) {
          if (!id) throw new Error('Invalid Id');
          
          const __options = {
            host,
            path: makePath(Endpoints.CHANNEL(id)),
            method: 'GET',
            headers: {
              Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
              'User-Agent': Constants.UserAgent,
              'Content-Type': 'application/json'
            }
          }
          return await Https.createRequest(__options);
        }

        return channels;
      
      }
    }
  };
  this.emojis = async function emojis(emoji) {
    if (!emoji) return this.users('@me').emojis();
  }
  this.request = function (path, options = {
    host,
    method: 'GET'
  }) {
    const _options = {
      host: options.host || host,
      path: options.path || makePath(path),
      method: options.method || 'GET',
      body: options.body || null,
      headers: {
        Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
        'User-Agent': Constants.UserAgent,
        'Content-Type': 'application/json'
      }
    }

    return Https.createRequest(_options)
  };
  
  return this;
}