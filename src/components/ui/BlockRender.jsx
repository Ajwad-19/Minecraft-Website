// Single Minecraft-style blocks rendered in Blender with Poly Haven materials (public/renders).
const FILES = {
  grass: 'grass',
  dirt: 'dirt',
  stone: 'stone',
  log: 'log',
  leaves: 'leaves',
  diamond: 'diamond',
  emerald: 'emerald',
  ore: 'ore',
  diamondOre: 'ore',
};

export default function BlockRender({ type = 'grass', size = 64, className = '', style, eager = false }) {
  return (
    <img
      src={`/renders/block-${FILES[type] ?? 'grass'}.webp`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable="false"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`pointer-events-none select-none ${className}`}
      style={style}
    />
  );
}
