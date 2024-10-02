const parseEmoji = require('./parseEmoji')

module.exports = function resolveEmoji(emoji) {
if (typeof emoji === 'string') {
      const res = parseEmoji(emoji);
      if (res? res.name.length: undefined) {
        emoji = `${res.animated ? 'a:' : ''}${res.name}${res.id ? `:${res.id}` : ''}`;
      }
      if (!emoji.includes('%')) return encodeURIComponent(emoji);
      return emoji;
    }
}