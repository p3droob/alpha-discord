const BitField = require('./BitField');

class UserFlags extends BitField {}

UserFlags.FLAGS = {
  DISCORD_EMPLOYEE: 1 << 0,
  PARTNERED_SERVER_OWNER: 1 << 1,
  HYPESQUAD_EVENTS: 1 << 2,
  BUGHUNTER_LEVEL_1: 1 << 3,
  HOUSE_BRAVERY: 1 << 6,
  HOUSE_BRILLIANCE: 1 << 7,
  HOUSE_BALANCE: 1 << 8,
  EARLY_SUPPORTER: 1 << 9,
  TEAM_USER: 1 << 10,
  BUGHUNTER_LEVEL_2: 1 << 14,
  VERIFIED_BOT: 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER: 1 << 17,
  DISCORD_CERTIFIED_MODERATOR: 1 << 18,
};

module.exports = UserFlags;