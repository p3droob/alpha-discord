const {resolveColor} = require('../util/');

module.exports = class MessageEmbed {
  constructor(data={}) {
    this.title = data.title || null;
    this.type = data.type || null;
    this.description = data.description || null;
    this.url = data.url || null;
    this.color = data.color ? resolveColor(data.color): null;
    this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;

    this.fields = data.fields || [];

    this.footer = data.footer ? { text:data.footer.text, icon_url: data.footer.icon_url, proxy_icon_url: data.footer.proxy_icon_url } : null;

    this.image = data.image ?
    {
      url: data.image.url,
    }
    : null;

    this.author = data.author ? 
    {
      name: data.author.name,
      icon_url: data.author.icon_url,
    }
    : null;
  };
  setTitle(string) {
    this.title = string;
    return this
  };
  setDescription(string) {
    this.description = string;
    return this;
  };
  setUrl(url) {
    this.url = url;
    return this;
  };
  setFooter(text, icon_url) {
    if (!text) throw new Error(`Invalid text to embed footer`);
    this.footer = {
      text,
      icon_url: icon_url|| null,
    };
    return this;
  };
  setImage(url) {
    this.image = {
      url
    }
  };

  pushFields(...fields) {
    this.fields.push(...fields.map (f => {
      if (typeof f.name != 'string') throw new Error('The fiel name must not be empty!');
      if (typeof f.value != 'string') throw new Error('The field value must not be empty')
    }));
    return this;
  }
};