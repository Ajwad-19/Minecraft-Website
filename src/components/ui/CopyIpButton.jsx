import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from '@phosphor-icons/react';
import { SERVER } from '../../data/site';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { burstFromElement, PALETTES } from '../../utils/particles';
import { playSound } from '../../utils/sound';
import PixelArt from './PixelArt';

/** "COPY IP" button: copies the server address, flips to "COPIED!" and pops a pixel checkmark. */
export default function CopyIpButton({ size = 'lg', className = '' }) {
  const ref = useRef(null);
  const [copied, copy] = useCopyToClipboard(2000);

  const onClick = async () => {
    const ok = await copy(SERVER.ip);
    if (!ok) return;
    playSound('success');
    burstFromElement(ref.current, { preset: 'sparkle', palette: PALETTES.green });
    burstFromElement(ref.current, { preset: 'burst', palette: PALETTES.green });
  };

  const sizing = size === 'sm' ? 'px-4 py-2.5 text-[10px]' : 'px-6 py-4 text-xs min-h-[52px]';

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={
          'relative inline-flex w-full items-center justify-center gap-2.5 font-pixel uppercase transition-[transform,box-shadow,background-color] duration-100 ' +
          'hover:-translate-y-0.5 active:translate-y-1 ' +
          (copied
            ? 'bg-snow text-void shadow-[inset_0_-5px_0_#AAB2B8,0_5px_0_#55605f,0_0_24px_rgba(85,255,85,0.5)]'
            : 'bg-grass text-void shadow-[inset_0_-5px_0_#2E8B3C,inset_0_3px_0_rgba(255,255,255,0.45),0_5px_0_#14401c] hover:shadow-[inset_0_-5px_0_#2E8B3C,inset_0_3px_0_rgba(255,255,255,0.45),0_5px_0_#14401c,0_0_28px_rgba(85,255,85,0.45)] active:shadow-[inset_0_-2px_0_#2E8B3C,0_1px_0_#14401c]') +
          ` ${sizing}`
        }
      >
        {copied ? <Check className="h-4 w-4" weight="bold" aria-hidden="true" /> : <Copy className="h-4 w-4" weight="bold" aria-hidden="true" />}
        <span>{copied ? 'Copied!' : 'Copy IP'}</span>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            key="check"
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, scale: 0.4 }}
            animate={{ opacity: 1, y: -18, scale: 1 }}
            exit={{ opacity: 0, y: -34 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            className="pointer-events-none absolute -top-6 left-1/2 -ml-4"
          >
            <PixelArt sprite="check" size={32} />
          </motion.span>
        )}
      </AnimatePresence>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Server IP copied to clipboard' : ''}
      </span>
    </div>
  );
}
