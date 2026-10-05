import { memo, useId, useMemo } from 'react';
import { SCENES } from './scenes';

/** Renders a procedural pixel-art scene as a crisp, scalable SVG that covers its box. */
function GalleryScene({ scene, focus = 'bottom', className = '' }) {
  const id = useId();
  const { sky, rects, glows = [] } = useMemo(() => SCENES[scene](), [scene]);

  return (
    <svg
      viewBox="0 0 96 60"
      preserveAspectRatio={focus === 'center' ? 'xMidYMid slice' : 'xMidYMax slice'}
      className={`h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        {glows.map(([, , , color, opacity], i) => (
          <radialGradient key={i} id={`${id}g${i}`}>
            <stop offset="0" stopColor={color} stopOpacity={opacity} />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      <rect width="96" height="60" fill={`url(#${id}sky)`} />
      <g shapeRendering="crispEdges">
        {rects.map(([x, y, w, h, fill, opacity], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
        ))}
      </g>
      {glows.map(([cx, cy, r], i) => (
        <circle key={`g${i}`} cx={cx} cy={cy} r={r} fill={`url(#${id}g${i})`} />
      ))}
    </svg>
  );
}

export default memo(GalleryScene);
