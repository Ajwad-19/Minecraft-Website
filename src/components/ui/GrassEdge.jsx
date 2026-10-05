import { useId } from 'react';

/** Thin strip of pixel grass with drips, used as a section divider. */
export default function GrassEdge({ className = '', flip = false }) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      className={`block h-3 w-full ${flip ? 'rotate-180' : ''} ${className}`}
      shapeRendering="crispEdges"
    >
      <defs>
        <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="6" fill="#2E8B3C" />
          <rect width="24" height="2" fill="#3FA82E" />
          <rect x="3" y="6" width="3" height="3" fill="#2E8B3C" />
          <rect x="9" y="6" width="3" height="6" fill="#2E8B3C" />
          <rect x="15" y="6" width="3" height="3" fill="#2E8B3C" />
          <rect x="18" y="6" width="3" height="5" fill="#246E30" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
}
