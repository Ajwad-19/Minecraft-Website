# Minecraft Website

A modern, Minecraft-themed community server website for **ExampleCraft**: dark UI, grass-green and diamond-blue accents, pixel typography and playful interactions.

Built with **React**, **Tailwind CSS**, **Framer Motion** and **Lucide** icons, bundled with **Vite**.

## Features

- **Hero:** night-time voxel landscape with a floating island, parallax mountains, floating cubes, rising pixel particles and a live "server online" badge.
- **About:** three feature cards (Survival, Economy, Events) with 3D tilt and glow on hover.
- **Server stats:** numbers that count up when scrolled into view.
- **How to Play:** three steps plus a **Copy IP** button with a pixel success animation.
- **Gallery:** procedurally drawn pixel-art scenes (no image files) with hover overlays and a keyboard-friendly lightbox.
- **Community:** Discord link, server rules and vote dialogs, and a simulated live activity feed.
- **FAQ:** accordion with pixel plus and minus icons.
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
| `FAQS`            | FAQ questions and answers                             |

> Before going live, replace the placeholder links in `SOCIAL` and `VOTE_SITES` with your real Discord invite and server pages.

Colours and fonts are set in `tailwind.config.js`. Pixel sprites are in `src/data/sprites.js`, and the gallery scenes are in `src/components/gallery/scenes.js`.

## Project structure

```
src/
├── components/
│   ├── community/   # Live activity feed
│   ├── effects/     # Shared particle canvas
│   ├── gallery/     # Pixel-art scene generator
│   ├── hero/        # Hero, landscape, floating island
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # About, Stats, HowToPlay, Gallery, Community, Faq
│   └── ui/          # PixelButton, IsoCube, PixelArt, Modal, TiltCard, ...
├── data/            # Site content and sprites
├── hooks/           # Media queries, active section, clipboard, sound
├── utils/           # Particle bus, sound synth, app events
├── App.jsx
├── index.css
└── main.jsx
```

## Disclaimer

Not an official Minecraft product. Not approved by or associated with Mojang Studios or Microsoft.
