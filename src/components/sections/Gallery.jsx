import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Maximize2 } from 'lucide-react';
import { GALLERY } from '../../data/site';
import { playSound } from '../../utils/sound';
import GalleryScene from '../gallery/GalleryScene';
import Modal from '../ui/Modal';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

function GalleryTile({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${item.title}, ${item.category}`}
      className="pixel-mask group relative block h-full w-full overflow-hidden bg-panel text-left focus-visible:outline-none"
    >
      <GalleryScene
        scene={item.scene}
        focus={item.focus}
        className="transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110"
      />

      {/* Always-on bottom shade + hover overlay */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/70 to-transparent" />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/55 to-void/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-70"
      />

      <span
        className={
          'absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 transition-all duration-300 ' +
          'translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ' +
          'group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ' +
          '[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100'
        }
      >
        <span className="w-fit bg-grass px-2 py-1 font-pixel text-[8px] uppercase text-void">{item.category}</span>
        <span className="heading-pixel text-xs text-snow sm:text-sm">{item.title}</span>
        <span className="flex items-center gap-1.5 text-xs text-stone">
          <MapPin className="h-3.5 w-3.5 text-sky" aria-hidden="true" />
          {item.location}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="absolute right-4 top-4 grid h-9 w-9 place-items-center border-2 border-sky/60 bg-void/70 text-sky opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <Maximize2 className="h-4 w-4" />
      </span>

      {/* Focus ring drawn inside the clip-path */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 border-4 border-sky opacity-0 group-focus-visible:opacity-100" />
    </button>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const item = open ? GALLERY[index] : null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((dir) => {
    playSound('click');
    setIndex((i) => (i + dir + GALLERY.length) % GALLERY.length);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section">
      <div className="container-mc">
        <SectionHeading
          id="gallery-title"
          eyebrow="World gallery"
          title="Built by our players"
          subtitle="Castles, bases, arenas and events: a peek at what the community has made."
        />

        <ul className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[200px] sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4 lg:gap-5">
          {GALLERY.map((g, i) => (
            <Reveal as="li" key={g.scene} delay={(i % 4) * 0.08} className={g.span ?? ''}>
              <GalleryTile
                item={g}
                onOpen={() => {
                  playSound('pop');
                  setIndex(i);
                }}
              />
            </Reveal>
          ))}
        </ul>
      </div>

      <Modal open={open} onClose={close} title={item?.title ?? ''} eyebrow={item?.category} size="lg">
        {item && (
          <div className="flex flex-col gap-5">
            <div className="pixel-mask relative aspect-[16/10] w-full overflow-hidden bg-panel">
              <GalleryScene scene={item.scene} />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex max-w-xl flex-col gap-2">
                <p className="flex items-center gap-1.5 text-sm text-sky">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {item.location}
                </p>
                <p className="text-stone">{item.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous build"
                  className="grid h-11 w-11 place-items-center border-[3px] border-edge bg-void text-snow transition-colors hover:border-sky hover:text-sky active:translate-y-0.5"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-pixel text-[10px] text-stone" aria-live="polite">
                  {index + 1}/{GALLERY.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next build"
                  className="grid h-11 w-11 place-items-center border-[3px] border-edge bg-void text-snow transition-colors hover:border-sky hover:text-sky active:translate-y-0.5"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
