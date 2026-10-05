import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsTouch } from '../../hooks/useMediaQuery';

const GLOWS = {
  green: 'hover:shadow-[0_0_0_4px_#55FF55,0_18px_40px_-12px_rgba(85,255,85,0.45)]',
  blue: 'hover:shadow-[0_0_0_4px_#29B6F6,0_18px_40px_-12px_rgba(41,182,246,0.45)]',
};

/** Pixel-bordered card with a subtle 3D tilt that follows the pointer (disabled on touch). */
export default function TiltCard({ children, glow = 'green', className = '', max = 8 }) {
  const isTouch = useIsTouch();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      style={isTouch ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={isTouch ? undefined : onMove}
      onPointerLeave={isTouch ? undefined : onLeave}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`pixel-panel transition-shadow duration-300 ${GLOWS[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
