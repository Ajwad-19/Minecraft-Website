import { memo } from 'react';
import { motion } from 'framer-motion';

// Pixel-stepped silhouettes generated once at module load.
const W = 320;
const H = 100;
const STEP = 4;
const COLS = W / STEP;

const wave = (i, seed, parts) =>
  parts.reduce((sum, [freq, amp], n) => sum + Math.sin(i * freq + seed * (n + 1) * 1.7) * amp, 0);
const snap = (v) => Math.round(v / 2) * 2;

function heights(base, seed, parts) {
  return Array.from({ length: COLS + 1 }, (_, i) => snap(base + wave(i, seed, parts)));
}

function steppedPath(hs) {
  let d = `M0 ${H}`;
  hs.forEach((h, i) => {
    d += ` L${i * STEP} ${H - h} L${(i + 1) * STEP} ${H - h}`;
  });
  return `${d} L${W} ${H} Z`;
}

const FAR = heights(46, 2, [[0.11, 14], [0.27, 6], [0.63, 2]]);
const MID = heights(26, 5, [[0.17, 8], [0.41, 3]]);
const GROUND = heights(11, 9, [[0.09, 3], [0.33, 1.5]]);

const TREES = [6, 19, 31, 47, 58, 71].map((col, n) => ({
  x: col * STEP,
  y: H - MID[col],
  h: 8 + (n % 3) * 3,
}));

const DIRT = ['#3B2716', '#4A311C', '#33220F'];

function Landscape({ farStyle, midStyle, groundStyle }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]">
      <motion.svg
        style={farStyle}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="far-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#123247" />
            <stop offset="1" stopColor="#0A1820" />
          </linearGradient>
        </defs>
        <path d={steppedPath(FAR)} fill="url(#far-fade)" />
      </motion.svg>

      <motion.svg
        style={midStyle}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        className="absolute inset-0 h-full w-full"
      >
        <path d={steppedPath(MID)} fill="#0B1A14" />
        {TREES.map((t, n) => (
          <g key={n} fill="#0F2A19">
            <rect x={t.x + 1} y={t.y - t.h} width="2" height={t.h} fill="#1A140C" />
            <rect x={t.x - 3} y={t.y - t.h - 6} width="10" height="8" />
            <rect x={t.x - 1} y={t.y - t.h - 9} width="6" height="3" />
          </g>
        ))}
      </motion.svg>

      <motion.svg
        style={groundStyle}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        className="absolute inset-0 h-full w-full"
      >
        {GROUND.slice(0, COLS).map((h, i) => (
          <g key={i}>
            <rect x={i * STEP} y={H - h} width={STEP + 0.05} height={h} fill={DIRT[i % 3]} />
            <rect x={i * STEP} y={H - h} width={STEP + 0.05} height="2" fill={i % 2 ? '#2E8B3C' : '#36A145'} />
            <rect x={i * STEP + (i % 3)} y={H - h + 2} width="1" height={1 + (i % 2)} fill="#2E8B3C" />
            <rect x={i * STEP + 1} y={H - h + 4 + (i % 4)} width="1" height="1" fill="#22170C" />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}

export default memo(Landscape);
