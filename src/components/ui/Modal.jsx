import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from '@phosphor-icons/react';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Accessible pixel-styled dialog: Esc / backdrop closes, focus is trapped and restored. */
/** variant 'center' is a classic dialog; 'drawer' slides in from the right as a side panel. */
export default function Modal({ open, onClose, title, eyebrow, children, size = 'md', variant = 'center' }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => panelRef.current?.querySelector(FOCUSABLE)?.focus());

    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open]);

  const width = size === 'lg' ? 'max-w-4xl' : 'max-w-lg';
  const drawer = variant === 'drawer';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[80] flex ${drawer ? 'justify-end' : 'items-center justify-center p-4'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-void/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={drawer ? { x: '100%' } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={drawer ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={drawer ? { x: '100%' } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: drawer ? 34 : 28 }}
            className={
              drawer
                ? 'relative h-full w-full max-w-md overflow-y-auto overscroll-contain border-l-4 border-edge bg-panel shadow-[-30px_0_60px_-20px_rgba(0,0,0,0.8)]'
                : `pixel-panel relative max-h-[90vh] w-full overflow-y-auto overscroll-contain ${width}`
            }
          >
            <div className={`flex items-start justify-between gap-4 border-b-4 border-edge px-5 py-4 sm:px-6 ${drawer ? 'sticky top-0 z-10 bg-panel' : ''}`}>
              <div className="flex flex-col gap-2">
                {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                <h2 id={titleId} className="heading-pixel text-2xl text-snow sm:text-3xl">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="grid h-10 w-10 shrink-0 place-items-center border-[3px] border-edge bg-void text-stone transition-colors hover:border-grass hover:text-grass active:translate-y-0.5"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-5 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
