const { Message } = require('discord.js'),
parseEmoji = require('../util/parseEmoji');
Message.prototype.react = async function (emoji) {
      if (Array.isArray(emoji)) {

        return emoji.forEach(async e => {
          e = this.client.emojis.resolveIdentifier(e);
          await this.client.api
      .channels(this.channel.id)
      .messages(this.id)
      .reactions(e, '@me')
      .put()
      return this.client.actions.MessageReactionAdd.handle({
        user: this.client.user,
        channel: this.channel,
        message: this,
        emoji: parseEmoji(e),
      }).reaction;
        })

      } else {
     emoji = this.client.emojis.resolveIdentifier(emoji);
      await this.client.api
      .channels(this.channel.id)
      .messages(this.id)
      .reactions(emoji, '@me')
      .put()
      return this.client.actions.MessageReactionAdd.handle({
        user: this.client.user,
        channel: this.channel,
        message: this,
        emoji: parseEmoji(emoji),
      }).reaction;
     }
    }