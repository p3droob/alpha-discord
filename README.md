# Alpha-discord

#### A wrapper to help users to use functions of discord.js@13 in discord.js@12

# 

# Installation

```js
npm i alpha-discord
```
 # **Create new Client**

```js
const Alpha = require('alpha-discord');
const client = new Alpha.Client({ 
  token: 'your discord bot client token', 
  prefix: 'the default prefix', /* you client options (intents, partials)*/
  })//The Alpha Client already have partials ["USER", "CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"], you need to put the intents and the client will login automatic

```

 ## React with array of emojis

```js
message.react('emoji')// true
message.react(['emoji', 'different emoji'])// true
message.react(['emoji', 'same emoji'])//false
```

## Collect emojis from a message

```js
message.emojis// Returns a collection Map of custom or unicode emojis
```