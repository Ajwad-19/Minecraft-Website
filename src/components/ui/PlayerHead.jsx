import { memo } from 'react';
import PixelArt from './PixelArt';

const ROWS = ['hhhhhhhh', 'hhhhhhhh', 'hssssssh', 'swessews', 'ssssssss', 'ssnddnss', 'ssmmmmss', 'ssssssss'];

/** 8×8 Minecraft-style player face generated from a hair colour. */
function PlayerHead({ hair = '#5A3A20', skin = '#C68E5A', eyes = '#3B5BA5', size = 36, className = '' }) {
  const sprite = {
    rows: ROWS,
    palette: { h: hair, s: skin, w: '#FFFFFF', e: eyes, n: '#A06A3E', d: '#8A5A33', m: '#5A2E1A' },
  };
  return <PixelArt sprite={sprite} size={size} className={className} />;
}

export default memo(PlayerHead);
