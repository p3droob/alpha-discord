module.exports = function parseEmoji(text) {
    if (text.includes('%')) text = decodeURIComponent(text);
    if (!text.includes(':')) return {
      animated: false, 
      name: text, 
      id: null
    };
    const match = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
    return match && { 
      animated: Boolean(match[1]), 
      name: match[2], 
      id: match[3] || null 
    };
  }