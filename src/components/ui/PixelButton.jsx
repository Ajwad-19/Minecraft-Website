import { useRef } from 'react';
import { burstFromElement, PALETTES } from '../../utils/particles';
import { playSound } from '../../utils/sound';

const VARIANTS = {
  primary:
    'bg-grass text-void shadow-[inset_0_-5px_0_#2E8B3C,inset_0_3px_0_rgba(255,255,255,0.45),0_5px_0_#14401c] ' +
    'hover:shadow-[inset_0_-5px_0_#2E8B3C,inset_0_3px_0_rgba(255,255,255,0.45),0_5px_0_#14401c,0_0_28px_rgba(85,255,85,0.45)] ' +
    'active:shadow-[inset_0_-2px_0_#2E8B3C,0_1px_0_#14401c]',
  outline:
    'bg-void/70 text-sky border-[3px] border-sky shadow-[0_5px_0_#0d3a6e] ' +
    'hover:bg-sky/10 hover:shadow-[0_5px_0_#0d3a6e,0_0_24px_rgba(41,182,246,0.4)] ' +
    'active:shadow-[0_1px_0_#0d3a6e]',
  dark:
    'bg-panel2 text-snow border-[3px] border-edge shadow-[0_5px_0_#05080a] ' +
    'hover:border-grass/70 hover:text-grass ' +
    'active:shadow-[0_1px_0_#05080a]',
};

const SIZES = {
  sm: 'px-4 py-2.5 text-[10px]',
  md: 'px-6 py-3.5 text-xs',
  lg: 'px-7 py-4 text-xs sm:text-sm min-h-[52px]',
};

/**
 * Blocky button with a physical "press down" effect.
 * Renders an <a> when `href` is given. `burst` spawns pixel particles on click.
 */
export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon: Icon,
  burst = false,
  burstPreset = 'burst',
  sound = 'click',
  className = '',
  onClick,
  ...rest
}) {
  const ref = useRef(null);
  const Tag = href ? 'a' : 'button';

  const handleClick = (e) => {
    if (sound) playSound(sound);
    if (burst) {
      burstFromElement(ref.current, {
        preset: burstPreset,
        palette: variant === 'outline' ? PALETTES.blue : PALETTES.green,
      });
    }
    onClick?.(e);
  };

  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : 'button'}
      onClick={handleClick}
      className={
        'group relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-pixel uppercase ' +
        'tracking-wide transition-[transform,box-shadow,background-color,color,border-color] duration-100 ' +
        'hover:-translate-y-0.5 active:translate-y-1 ' +
        `${VARIANTS[variant]} ${SIZES[size]} ${className}`
      }
      {...rest}
    >
      {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" weight="bold" />}
      <span>{children}</span>
    </Tag>
  );
}
