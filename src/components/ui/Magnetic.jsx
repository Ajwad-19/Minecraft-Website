import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useIsTouch } from '../../hooks/useMediaQuery';

/** Pulls its child slightly toward the cursor (desktop only). Uses motion values, not state. */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const isTouch = useIsTouch();
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const off = isTouch || reduceMotion;

  const onPointerMove = (e) => {
    if (off) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={off ? undefined : { x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
