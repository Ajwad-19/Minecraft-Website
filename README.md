# Minecraft Website

A modern, Minecraft-themed community server website for **ExampleCraft**: dark UI, grass-green and diamond-blue accents, pixel typography and playful interactions.

Built with **React**, **Tailwind CSS**, **Framer Motion** and **Phosphor** icons, bundled with **Vite**. Fonts are self-hosted: **Pixelify Sans** (headings), **Geist** (body) and **Press Start 2P** (small labels).

## Features

- **Hero:** a rendered night-time voxel valley in three parallax layers, a floating island centrepiece, floating blocks, rising pixel particles and a live "server online" badge.
- **About:** an asymmetric bento grid (Survival, Economy, Events) with rendered art and a light that follows the cursor.
- **Server stats:** a full-width strip of oversized numbers that count up when scrolled into view.
- **Players:** a 3D ring of character cards. Five face the front and the rest circle behind. Hover (or tap) a player to play an animation: sword strike, wave, jump or victory. Rotate with the arrows, the keyboard, by clicking a card, or by dragging and swiping.
- **How to Play:** three steps that light up as you scroll, next to a pinned panel with the server address and a **Copy IP** button.
- **Gallery:** seven rendered builds (castle, homestead, PvP arena, mine, Nether hub, event, city) with hover overlays and a keyboard-friendly lightbox.
- **Community:** Discord link, server rules and vote side panels, and a simulated live activity feed.
- **FAQ:** question list with an answer panel on desktop, and an accordion with pixel plus and minus icons on mobile.
- **Footer:** quick links, social links, server status and IP, and a non-affiliation disclaimer.
- **Extras:** pixel-explosion "Play now" button, press-down button effect, opt-in UI sounds (never autoplay), and a sticky navbar that highlights the current section.

### Responsive and accessible

- Hamburger menu, large touch targets, fewer particles and no parallax on mobile.
- Respects `prefers-reduced-motion`.
- Semantic landmarks, a skip link, focus-trapped dialogs and screen-reader-friendly counters.

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

> **Windows PowerShell:** if you see *"running scripts is disabled on this system"*, use `npm.cmd run dev` instead, or run
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once.

### Other scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run build`   | Production build into `dist/`             |
| `npm run preview` | Serve the production build locally        |

## Customising

Almost all content lives in **`src/data/site.js`**:

| Export            | Controls                                              |
| ----------------- | ----------------------------------------------------- |
| `SERVER`          | Server name, IP, player count, supported versions     |
| `NAV_LINKS`       | Navbar items (each `id` must match a section `id`)    |
| `FEATURES`        | About cards                                           |
| `STATS`           | Statistics and their block icons                      |
| `STEPS`           | How to Play steps                                     |
| `GALLERY`         | Gallery titles, categories, locations, descriptions   |
| `SOCIAL`          | Discord / YouTube / TikTok links                      |
| `RULES`           | Server rules dialog                                   |
| `VOTE_SITES`      | Vote dialog links                                     |
| `COMMUNITY_STATS` | Community numbers                                     |
| `ACTIVITY`        | Entries in the live activity feed                     |
| `players.js`      | Players in the ring (separate file, see below)        |
| `FAQS`            | FAQ questions and answers                             |

> Before going live, replace the placeholder links in `SOCIAL` and `VOTE_SITES` with your real Discord invite and server pages.

Colours and fonts are set in `tailwind.config.js`, and the small pixel icons are in `src/data/sprites.js`.

## Players ring

Players live in **`src/data/players.js`**. Each entry has an `id`, username, role, tagline and stats. The ring grows automatically as you add entries; with ten or more players, five face the front.

Each `id` needs a folder in `public/renders/players/<id>/` containing:

- `poster.webp`: a still frame, 300×450
- `idle.webp`, `strike.webp`, `wave.webp`, `jump.webp`, `victory.webp`: horizontal sprite sheets of 32 frames each (9600×450)

These are rendered in Blender from a 64×64 Minecraft skin (see below). HyTechster uses `public/skins.png`, and the placeholder players use the skins in `blender/skins/`.

## Project structure

```
src/
├── components/
│   ├── community/   # Live activity feed
│   ├── effects/     # Shared particle canvas
│   ├── gallery/     # Gallery image component
│   ├── hero/        # Hero, landscape, floating island
│   ├── layout/      # Navbar, Footer
│   ├── players/     # Player ring, cards, sprite animator
│   ├── sections/    # About, Stats, HowToPlay, Gallery, Community, Faq
│   └── ui/          # PixelButton, BlockRender, Modal, SpotlightPanel, Magnetic, ...
├── data/            # Site content and sprites
├── hooks/           # Media queries, active section, clipboard, sound
├── utils/           # Particle bus, sound synth, app events
├── App.jsx
├── index.css
└── main.jsx
```

## 3D graphics

The island, blocks, hero landscape and gallery images are rendered in **Blender 5** (EEVEE) and saved as WebP files in `public/renders/`. The source scene is `blender/minecraft-renders.blend`; it has its textures built in, so you can open it and re-render anything.

Characters are built from a skin file as a standard Minecraft player (head, body, arms and legs, plus the outer hat, jacket, sleeve and trouser layer), holding a blocky diamond sword. Each animation is rendered as 32 frames and joined into one sprite sheet.

| Files                    | What they are                                         |
| ------------------------ | ----------------------------------------------------- |
| `island.webp`            | Hero centrepiece (transparent)                        |
| `block-*.webp`           | Single blocks used for floating cubes, stats and logo |
| `land-far/mid/near.webp` | Hero background layers (transparent, for parallax)    |
| `gallery-*.webp`         | Gallery scenes, 1600×1000                             |
| `players/<id>/*.webp`    | Character posters and animation sprite sheets         |

Materials and lighting use free **CC0** assets from [Poly Haven](https://polyhaven.com): leafy grass, dirt floor, rock 01, brown bark 02, forest leaves 03, wood floor, stone brick wall 001, sand 03 and pitted mossy rock textures, plus the Qwantani night, Qwantani sunset and Kloofendal clear sky HDRIs.

## Disclaimer

Not an official Minecraft product. Not approved by or associated with Mojang Studios or Microsoft.
