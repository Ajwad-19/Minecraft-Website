import { STATS } from '../../data/site';
import BlockRender from '../ui/BlockRender';
import CountUp from '../ui/CountUp';
import GrassEdge from '../ui/GrassEdge';
import Reveal from '../ui/Reveal';
import { StatusDot } from '../ui/ServerStatus';

/** Full-width strip of oversized numbers, separated by hairlines instead of boxed cards. */
export default function Stats() {
  return (
    <section id="server" aria-labelledby="server-title" className="relative bg-panel">
      <GrassEdge />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 80% at 10% 0%, rgba(85,255,85,0.07), transparent 70%),' +
            'radial-gradient(ellipse 50% 80% at 90% 100%, rgba(41,182,246,0.08), transparent 70%)',
        }}
      />
      <div className="container-mc relative px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="mb-10 flex items-center gap-3">
          <StatusDot />
          <h2 id="server-title" className="heading-pixel text-2xl text-snow md:text-3xl">
            The server, live
          </h2>
        </Reveal>

        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x-2 lg:divide-edge">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08} className="group flex flex-col gap-3 px-2 lg:px-8 lg:first:pl-0">
              <BlockRender
                type={s.cube}
                size={44}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6"
              />
              <p className="font-display text-5xl font-bold leading-none tabular-nums text-grass text-glow-green md:text-6xl xl:text-7xl">
                <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="text-sm text-stone">{s.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
