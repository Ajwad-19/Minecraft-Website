import { useRef } from 'react';

const COLORS = {
  green: 'rgba(85,255,85,0.16)',
  blue: 'rgba(41,182,246,0.18)',
};

/**
 * Panel with a soft light that follows the cursor. The position is written to CSS variables
 * directly, so moving the mouse never re-renders React.
 */
export default function SpotlightPanel({ as: Tag = 'div', glow = 'green', className = '', children, ...rest }) {
  const ref = useRef(null);
  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag ref={ref} onPointerMove={onPointerMove} className={`group/spot relative ${className}`} {...rest}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), ${COLORS[glow]}, transparent 65%)` }}
      />
      {children}
    </Tag>
  );
}
