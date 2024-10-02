const { Message } = require('discord.js'),
Collection = require('../util/Collection')

const unicode = require("emoji-unicode-map");

const emojiUnicode = require("emoji-unicode");

Object.defineProperties(Message.prototype, {
    'emojis': {
        get: function getEmojis() {
            this._emojis = new Collection()
            for (let match of this.content.matchAll(/<(a)?:([\w\d]{2,32})+:(\d{17,19})>/g)) {
                const [ ,animated,name,id ] = match
                const emoji = this.client.emojis.cache.get(id) || { 
                    animated: Boolean(animated), id, name, 
                    url: this.client.rest.cdn.Emoji(id, Boolean(animated) ? 'gif' : 'png')
                }
                this._emojis.set(emoji.id, emoji)
            }
            if (this._emojis.size < 1) {
              const emojis = this.content.split(" ")
            .filter(a => unicode.get(a));
            console.log(emojis)
            if (emojis.length > 0) {
              emojis.forEach(unEmoji => {
                this._emojis.set(unEmoji, {
                  unicode: emojiUnicode(unEmoji)
                })
              })
}

            }
            return this._emojis
        }
    }
})
