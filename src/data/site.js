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

// Replace these with your real community links.
export const SOCIAL = {
  discord: 'https://discord.com',
  youtube: 'https://www.youtube.com',
  tiktok: 'https://www.tiktok.com',
};

export const GALLERY = [
  {
    scene: 'castle',
    title: 'Spawn Citadel',
    category: 'Castles',
    location: 'Spawn · X 0, Z 0',
    description: 'Every adventure starts here. Built by 14 players over three months, the citadel holds the warp hall, shops and the staff office.',
    span: 'sm:col-span-2 lg:row-span-2',
  },
  {
    scene: 'base',
    title: 'Emerald Valley',
    category: 'Survival Bases',
    location: 'Overworld · X 1,240, Z -380',
    description: 'A cosy co-op homestead with auto-farms, a trading hall and the best sunrise view on the server.',
  },
  {
    scene: 'arena',
    title: 'The Crimson Pit',
    category: 'PvP Arenas',
    location: 'Arena District',
    description: 'Our flagship PvP arena. 1v1 duels every night and the monthly championship final with a lava pit in the middle.',
  },
  {
    scene: 'mines',
    title: "Miner's Hideout",
    category: 'Survival Bases',
    location: 'Deepslate Layer · Y -54',
    description: 'A hidden mining outpost with minecart rails, a storage vault and more diamonds than anyone will admit to.',
  },
  {
    scene: 'portal',
    title: 'Nether Hub',
    category: 'Builds',
    location: 'Nether Roof Access',
    description: 'The quartz-lit hub that links every major town through the Nether. Fast travel, done in style.',
  },
  {
    scene: 'event',
    focus: 'top',
    title: 'Summer Build Fest',
    category: 'Community Events',
    location: 'Event Plaza · 2026',
    description: 'Over 300 players, a live build battle on stage and a firework show to close the season.',
    span: 'sm:col-span-2',
  },
  {
    scene: 'skyline',
    title: 'Prismarine City',
    category: 'Builds',
    location: 'Ocean Biome · X -2,900, Z 1,100',
    description: 'A player-run city on the water with a beacon-topped tower, 60+ shops and its own city council.',
    span: 'sm:col-span-2',
  },
];

export const RULES = [
  { title: 'Be respectful', text: 'No harassment, hate speech or discrimination of any kind.' },
  { title: 'No griefing or stealing', text: 'Never break, change or take from builds that are not yours.' },
  { title: 'No cheats', text: 'Hacked clients, x-ray packs, dupes and auto-clickers are banned.' },
  { title: 'No spam or advertising', text: 'Keep chat readable. Do not advertise other servers.' },
  { title: 'Report bugs, don’t exploit them', text: 'Found something broken? Tell staff and you may earn a reward.' },
  { title: 'Listen to staff', text: 'Staff decisions are final. You can appeal on Discord.' },
];

// Replace with your server's page on each voting site.
export const VOTE_SITES = [
  { name: 'Minecraft Server List', url: 'https://minecraft-server-list.com' },
  { name: 'Minecraft-MP', url: 'https://minecraft-mp.com' },
  { name: 'Planet Minecraft', url: 'https://www.planetminecraft.com/servers/' },
];

export const COMMUNITY_STATS = [
  { value: '3,200+', label: 'Discord members' },
  { value: '40+', label: 'Events per year' },
  { value: '18', label: 'Friendly staff' },
];

export const ACTIVITY = [
  { name: 'BlockyBob', hair: '#5A3A20', shirt: '#29B6F6', text: 'found 9 diamonds at Y -58', tag: 'diamond' },
  { name: 'CreeperQueen', hair: '#1B1B1B', shirt: '#55FF55', text: 'won the nightly PvP duel', tag: 'sword' },
  { name: 'PixelPete', hair: '#C79100', shirt: '#C62828', text: 'opened a shop in Prismarine City', tag: 'emerald' },
  { name: 'Ender_Ella', hair: '#7B2FF7', shirt: '#1B1030', text: 'joined the server for the first time', tag: 'heart' },
  { name: 'RedstoneRay', hair: '#8B1A1A', shirt: '#6D747A', text: 'finished a 64-wide auto-farm', tag: 'pickaxe' },
  { name: 'MossyMia', hair: '#2E8B3C', shirt: '#F5F5F5', text: 'placed 1st in the weekly build contest', tag: 'trophy' },
];

export const FAQS = [
  {
    q: 'Is the server free to play?',
    a: 'Yes! ExampleCraft is 100% free. Optional cosmetic ranks help cover hosting, but they never give a gameplay advantage.',
  },
  {
    q: 'Which Minecraft version is supported?',
    a: 'Java Edition 1.20 – 1.21 and Bedrock Edition (port 19132). We recommend the latest release for the best experience.',
  },
  {
    q: 'Can I play with friends?',
    a: 'Absolutely. Create a party with /party, share your land claim and build together. Java and Bedrock players share the same world.',
  },
  {
    q: 'Is the server available 24/7?',
    a: 'Yes. We run on dedicated hardware with 99.9% uptime. Planned maintenance is always announced on Discord ahead of time.',
  },
  {
    q: 'How do I report a player?',
    a: 'Use /report <player> <reason> in game, or open a ticket in the #support channel on our Discord. Screenshots help, and staff review every report.',
  },
];
