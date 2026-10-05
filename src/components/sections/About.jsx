import { FEATURES } from '../../data/site';
import PixelArt from '../ui/PixelArt';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';

const ACCENT = {
  green: { text: 'text-grass', tile: 'bg-grass/10 border-grass/40', dot: 'bg-grass' },
  blue: { text: 'text-sky', tile: 'bg-sky/10 border-sky/40', dot: 'bg-sky' },
};

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-mc">
        <SectionHeading
          id="about-title"
          eyebrow="Why ExampleCraft"
          title="Not just another server."
          subtitle="A hand-crafted survival world with a fair economy, active staff and something happening every week."
        />

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {FEATURES.map((f, i) => {
            const accent = ACCENT[f.glow];
            return (
              <Reveal key={f.title} delay={i * 0.12}>
                <TiltCard glow={f.glow} className="flex h-full flex-col gap-5 p-7">
                  <div className={`grid h-16 w-16 place-items-center border-[3px] ${accent.tile}`}>
                    <PixelArt sprite={f.sprite} size={36} />
                  </div>
                  <h3 className={`heading-pixel text-base ${accent.text}`}>{f.title}</h3>
                  <p className="text-stone">{f.text}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {f.tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-2 border-2 border-edge bg-void/60 px-2.5 py-1 text-xs font-medium text-snow/90"
                      >
                        <span aria-hidden="true" className={`h-1.5 w-1.5 ${accent.dot}`} />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
