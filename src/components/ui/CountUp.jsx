import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const format = (v, decimals, suffix) =>
  v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

/** Counts from 0 to `to` once it scrolls into view. Writes to the DOM directly to avoid re-renders. */
export default function CountUp({ to, decimals = 0, suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (reduceMotion) {
      el.textContent = format(to, decimals, suffix);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v, decimals, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, decimals, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className}>
        {format(0, decimals, suffix)}
      </span>
      <span className="sr-only">{format(to, decimals, suffix)}</span>
    </>
  );
}
