import { STATS } from '../../data/site';
import CountUp from '../ui/CountUp';
import GrassEdge from '../ui/GrassEdge';
import IsoCube from '../ui/IsoCube';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Stats() {
  return (
    <section id="server" aria-labelledby="server-title" className="relative bg-panel">
      <GrassEdge />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(85,255,85,0.08), transparent 70%),' +
            'radial-gradient(ellipse 50% 50% at 85% 100%, rgba(41,182,246,0.10), transparent 70%)',
        }}
      />

      <div className="section">
        <div className="container-mc">
          <SectionHeading
            id="server-title"
            eyebrow="Live from the overworld"
            title="The server in numbers"
            subtitle="Fast hardware, low ping and a community that keeps growing."
          />

          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.1}>
                <div className="pixel-panel group flex h-full flex-col items-center gap-4 bg-void/70 px-3 py-7 text-center transition-shadow duration-300 hover:shadow-[0_0_0_4px_#29B6F6,0_0_30px_-6px_rgba(41,182,246,0.5)] sm:px-5 sm:py-9">
                  <IsoCube
                    type={s.cube}
                    seed={i + 11}
                    size={56}
                    className="transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-6"
                  />
                  <p className="heading-pixel text-xl text-grass text-glow-green sm:text-2xl lg:text-[28px]">
                    <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone sm:text-sm">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
