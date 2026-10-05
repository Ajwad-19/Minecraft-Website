import { memo, useMemo } from 'react';

// Isometric pixel-textured cube drawn as an SVG (three faces of N×N pixels).
const N = 6;

const TEXTURES = {
  grass: {
    top: ['#55C93F', '#4CB83A', '#62D94C', '#46A934'],
    side: (x, y, r) => {
      const greenDepth = 1 + (r(x, 99) > 0.5 ? 1 : 0);
      if (y < greenDepth) return pick(['#55C93F', '#4CB83A', '#46A934'], r(x, y));
      return pick(['#7A5230', '#6B4728', '#8A5E38', '#5A3A20'], r(x, y + 7));
    },
  },
  dirt: { top: ['#7A5230', '#6B4728', '#8A5E38', '#5A3A20'] },
  stone: { top: ['#8B9399', '#7A8187', '#9AA2A8', '#6D747A'] },
  diamond: { top: ['#4DE8E8', '#29B6F6', '#7FF5F5', '#1FA3C9', '#B8FFFF'] },
  emerald: { top: ['#55FF55', '#3FD44A', '#2E8B3C', '#8CFF8C'] },
  log: {
    top: (x, y) => {
      const ring = Math.max(Math.abs(x - 2.5), Math.abs(y - 2.5));
      return ring > 2 ? '#5A3A20' : ring > 1 ? '#B08D57' : '#9C7A4B';
    },
    side: (x, y, r) => pick(['#5A3A20', '#6B4728', '#4A2F18'], r(x, Math.floor(y / 3))),
  },
  leaves: { top: ['#2E8B3C', '#1F6B2A', '#3FA82E', '#185A22', '#2E8B3C'] },
  diamondOre: {
    top: (x, y, r) =>
      r(x, y + 31) > 0.78 ? pick(['#4DE8E8', '#7FF5F5'], r(x, y)) : pick(['#8B9399', '#7A8187', '#6D747A'], r(x, y)),
  },
};

const pick = (arr, t) => arr[Math.floor(t * arr.length) % arr.length];

function makeRandom(seed) {
  return (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
    return s - Math.floor(s);
  };
}

function faceColors(type, face, seed) {
  const tex = TEXTURES[type] ?? TEXTURES.grass;
  const r = makeRandom(seed + face.length * 13);
  const source = face === 'top' ? tex.top : tex.side ?? tex.top;
  const out = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      out.push(typeof source === 'function' ? source(x, y, r) : pick(source, r(x, y)));
    }
  }
  return out;
}

const FACES = {
  // matrix(a b c d e f) mapping the N×N grid onto each isometric face
  top: `matrix(${43.3 / N} ${-25 / N} ${43.3 / N} ${25 / N} 6.7 25)`,
  left: `matrix(${43.3 / N} ${25 / N} 0 ${50 / N} 6.7 25)`,
  right: `matrix(${43.3 / N} ${-25 / N} 0 ${50 / N} 50 50)`,
};

const SHADE = { top: 0, left: 0.2, right: 0.38 };

function IsoCube({ type = 'grass', size = 64, seed = 1, className = '', style }) {
  const faces = useMemo(
    () => ({
      top: faceColors(type, 'top', seed),
      left: faceColors(type, 'left', seed + 1),
      right: faceColors(type, 'right', seed + 2),
    }),
    [type, seed],
  );

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {Object.entries(FACES).map(([face, transform]) => (
        <g key={face} transform={transform}>
          {faces[face].map((color, i) => (
            <rect key={i} x={i % N} y={Math.floor(i / N)} width="1.04" height="1.04" fill={color} />
          ))}
          {SHADE[face] > 0 && <rect width={N} height={N} fill="#000" opacity={SHADE[face]} />}
        </g>
      ))}
      <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
}

export default memo(IsoCube);
