import { memo } from 'react';
import IsoCube from '../ui/IsoCube';

// Voxel island described in isometric grid coords: i (→ down-right), j (→ down-left), k (up).
const BLOCKS = [];
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    BLOCKS.push({ i, j, k: 0, type: 'grass' });
    if (i === 3 || j === 3) BLOCKS.push({ i, j, k: -1, type: 'dirt' });
  }
}
BLOCKS.push(
  { i: 3, j: 3, k: -2, type: 'diamondOre' },
  { i: 2, j: 3, k: -2, type: 'dirt' },
  { i: 3, j: 2, k: -2, type: 'stone' },
  { i: 1, j: 3, k: -2, type: 'stone' },
  { i: 3, j: 1, k: -2, type: 'dirt' },
  { i: 3, j: 3, k: -3, type: 'stone' },
  { i: 2, j: 3, k: -3, type: 'diamondOre' },
  { i: 3, j: 3, k: -4, type: 'dirt' },
  // tree in the back corner
  { i: 0, j: 0, k: 1, type: 'log' },
  { i: 0, j: 0, k: 2, type: 'log' },
  { i: 0, j: 0, k: 3, type: 'leaves' },
  { i: 1, j: 0, k: 3, type: 'leaves' },
  { i: 0, j: 1, k: 3, type: 'leaves' },
  { i: -1, j: 0, k: 3, type: 'leaves' },
  { i: 0, j: -1, k: 3, type: 'leaves' },
  { i: 0, j: 0, k: 4, type: 'leaves' },
  // a single exposed diamond ore block on the surface
  { i: 2, j: 1, k: 1, type: 'diamondOre' },
);

// Painter's order: further blocks first.
BLOCKS.sort((a, b) => a.i + a.j + a.k - (b.i + b.j + b.k) || a.k - b.k);

function FloatingIsland({ size = 92 }) {
  const pos = BLOCKS.map((b) => ({
    ...b,
    x: (b.i - b.j) * 0.433 * size,
    y: (b.i + b.j) * 0.25 * size - b.k * 0.5 * size,
  }));
  const minX = Math.min(...pos.map((p) => p.x));
  const minY = Math.min(...pos.map((p) => p.y));
  const width = Math.max(...pos.map((p) => p.x)) - minX + size;
  const height = Math.max(...pos.map((p) => p.y)) - minY + size;

  return (
    <div className="relative" style={{ width, height }} aria-hidden="true">
      {pos.map((b, n) => (
        <IsoCube
          key={`${b.i}-${b.j}-${b.k}`}
          type={b.type}
          seed={n + 3}
          size={size}
          className="absolute"
          style={{ left: b.x - minX, top: b.y - minY }}
        />
      ))}
    </div>
  );
}

export default memo(FloatingIsland);
