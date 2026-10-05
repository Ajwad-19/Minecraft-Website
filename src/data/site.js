export const SERVER = {
  name: 'ExampleCraft',
  ip: 'play.examplecraft.com',
  playersOnline: 247,
  version: 'Java & Bedrock 1.21',
};

// Each id must match a <section id> on the page.
export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'server', label: 'Server' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'community', label: 'Community' },
  { id: 'faq', label: 'FAQ' },
];

export const FEATURES = [
  {
    sprite: 'sword',
    title: 'Survival',
    text: 'Build your base, explore the world and survive with your friends.',
    tags: ['Land claims', 'Custom terrain', 'Co-op bases'],
    glow: 'green',
  },
  {
    sprite: 'diamond',
    title: 'Economy',
    text: 'Mine, trade and build your way to the top.',
    tags: ['Player shops', 'Auction house', 'Jobs'],
    glow: 'blue',
  },
  {
    sprite: 'trophy',
    title: 'Events',
    text: 'Join weekly challenges, tournaments and community events.',
    tags: ['Build contests', 'PvP tourneys', 'Seasonal drops'],
    glow: 'green',
  },
];

export const STATS = [
  { value: 247, suffix: '+', label: 'Online players', cube: 'grass' },
  { value: 12500, suffix: '+', label: 'Registered players', cube: 'emerald' },
  { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime', cube: 'diamond' },
  { value: 24, suffix: '/7', label: 'Server online', cube: 'diamondOre' },
];

export const STEPS = [
  {
    sprite: 'grass',
    title: 'Get Minecraft',
    text: 'Grab Minecraft Java or Bedrock Edition, version 1.21 or newer.',
  },
  {
    sprite: 'diamond',
    title: 'Add our server',
    text: 'Open Multiplayer, click “Add Server” and paste our server address.',
  },
  {
    sprite: 'pickaxe',
    title: 'Start your adventure',
    text: 'Join, claim your first plot and start building with the community.',
  },
];
