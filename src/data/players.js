// Characters for the Players ring. Each id has a folder in public/renders/players/<id>/ containing
// poster.webp (still frame) and one horizontal sprite sheet per action (16 frames of 300×450).
// Sheets are rendered in Blender from the skin files (blender/minecraft-renders.blend).
// To add a player: render their sheets in Blender, then add an entry here. The ring grows automatically.

export const SPRITE = { frames: 16, fps: 14, width: 300, height: 450 };

// Order in which hover/tap cycles through animations. 'idle' loops when nothing is playing.
export const ACTIONS = ['strike', 'wave', 'jump', 'victory'];

export const PLAYERS = [
  {
    id: 'hytechster',
    username: 'HyTechster',
    role: 'Owner',
    tagline: 'Builds the redstone nobody else understands.',
    stats: { level: 87, kills: 1243, builds: 312 },
    accent: 'grass',
  },
  {
    id: 'pixel_panda',
    username: 'Pixel_Panda',
    role: 'Builder',
    tagline: 'Monochrome castles only.',
    stats: { level: 54, kills: 218, builds: 140 },
    accent: 'sky',
  },
  {
    id: 'lunacrafts',
    username: 'LunaCrafts',
    role: 'Moderator',
    tagline: 'Keeps chat friendly and the spawn tidy.',
    stats: { level: 63, kills: 402, builds: 96 },
    accent: 'grass',
  },
  {
    id: 'brick_bandit',
    username: 'Brick_Bandit',
    role: 'PvP Champion',
    tagline: 'Undefeated in the Crimson Pit since June.',
    stats: { level: 71, kills: 2087, builds: 23 },
    accent: 'sky',
  },
  {
    id: 'enderellie',
    username: 'EnderEllie',
    role: 'Explorer',
    tagline: 'Mapped 40,000 blocks of the End.',
    stats: { level: 49, kills: 377, builds: 31 },
    accent: 'grass',
  },
  {
    id: 'moss_knight',
    username: 'Moss_Knight',
    role: 'Guard',
    tagline: 'Patrols the citadel walls every night.',
    stats: { level: 58, kills: 941, builds: 44 },
    accent: 'sky',
  },
  {
    id: 'redstone_rae',
    username: 'Redstone_Rae',
    role: 'Engineer',
    tagline: 'Her sorting system has 1,728 chests.',
    stats: { level: 66, kills: 159, builds: 203 },
    accent: 'grass',
  },
  {
    id: 'frostbyte',
    username: 'Frostbyte',
    role: 'Builder',
    tagline: 'Ice palaces and packed-ice highways.',
    stats: { level: 42, kills: 88, builds: 117 },
    accent: 'sky',
  },
  {
    id: 'sandstorm_sam',
    username: 'Sandstorm_Sam',
    role: 'Trader',
    tagline: 'Runs the busiest shop in Prismarine City.',
    stats: { level: 39, kills: 64, builds: 58 },
    accent: 'grass',
  },
  {
    id: 'copper_kit',
    username: 'Copper_Kit',
    role: 'Farmer',
    tagline: 'Feeds half the server with one wheat farm.',
    stats: { level: 35, kills: 41, builds: 76 },
    accent: 'sky',
  },
];
