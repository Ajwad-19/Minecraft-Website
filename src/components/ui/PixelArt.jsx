import { memo } from 'react';
import { SPRITES } from '../../data/sprites';

/**
 * Renders a pixel sprite (array of strings + palette) as a crisp SVG.
 * '.' is transparent; every other character maps to a palette color.
 */
function PixelArt({ sprite, size = 48, className = '', title }) {
  const { rows, palette } = typeof sprite === 'string' ? SPRITES[sprite] : sprite;
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const rects = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = palette[row[x]];
      if (color) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={color} />);
    }
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      shapeRendering="crispEdges"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      {rects}
    </svg>
  );
}

export default memo(PixelArt);
