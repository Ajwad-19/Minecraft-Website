import PlayerRing from '../players/PlayerRing';
import SectionHeading from '../ui/SectionHeading';

export default function Players() {
  return (
    <section id="players" aria-labelledby="players-title" className="section overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 55%, rgba(41,182,246,0.07), transparent 70%)' }}
      />
      <div className="container-mc relative">
        <SectionHeading
          id="players-title"
          title="Meet the regulars"
          subtitle="Hover a player to see their moves. Spin the ring to meet the rest of the crew."
        />
        <PlayerRing />
      </div>
    </section>
  );
}
