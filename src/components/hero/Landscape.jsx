import { memo } from 'react';
import { motion } from 'framer-motion';

// Three transparent layers rendered in Blender with Poly Haven materials (blender/minecraft-renders.blend).
// Each layer is a separate image so the hero can move them at different parallax speeds.
const LAYERS = [
  { src: '/renders/land-far.webp', filter: 'brightness(0.5) saturate(0.7)' },
  { src: '/renders/land-mid.webp', filter: 'brightness(0.62) saturate(0.9)' },
  { src: '/renders/land-near.webp', filter: 'brightness(0.7)' },
];

function Layer({ src, filter, style }) {
  return (
    <motion.div style={style} className="absolute -inset-x-8 inset-y-0 will-change-transform">
      <img
        src={src}
        alt=""
        width="2560"
        height="1440"
        decoding="async"
        draggable="false"
        className="h-full w-full select-none object-cover object-bottom"
        style={{ filter }}
      />
    </motion.div>
  );
}

function Landscape({ farStyle, midStyle, groundStyle }) {
  const styles = { far: farStyle, mid: midStyle, near: groundStyle };
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Layer {...LAYERS[0]} style={styles.far} />
      {/* Night haze that pushes the mountains back */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, rgba(12,29,42,0.7) 0%, rgba(12,29,42,0.25) 45%, transparent 70%)' }}
      />
      <Layer {...LAYERS[1]} style={styles.mid} />
      <Layer {...LAYERS[2]} style={styles.near} />
      {/* Keep the headline readable: darker on the text side (desktop), evenly darker on mobile */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ background: 'linear-gradient(90deg, rgba(8,11,13,0.8) 0%, rgba(8,11,13,0.45) 38%, transparent 65%)' }}
      />
      <div className="absolute inset-0 bg-void/45 lg:hidden" />
    </div>
  );
}

export default memo(Landscape);
