import { weddingConfig } from '@/config/weddingConfig';
import { Reveal } from '@/components/motion/Reveal';
import { OrnamentDivider, Diya as DiyaArt } from '@/components/art/HeritageArt';

/** Scene 7 — dinner as a ceremonial moment. */
export function DinnerSection() {
  const { wedding, dinner } = weddingConfig;

  return (
    <section className="relative overflow-hidden bg-royal-deep px-6 py-24 text-cream sm:py-28" aria-label="Dinner">
      <div className="film-grain" />
      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <DiyaRow />
          <h2 className="mt-6 font-display text-4xl font-light tracking-[0.25em] sm:text-5xl">DINNER</h2>
          <OrnamentDivider className="mx-auto mt-6 w-44" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-9 font-display text-2xl tracking-wide text-cream/95 sm:text-3xl">
            {wedding.date.toUpperCase()}
          </p>
          <p className="mt-2 font-display text-xl tracking-[0.15em] text-gold-soft">
            {dinner.time.toUpperCase()}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="label-caps mt-8 text-cream/70">{dinner.venue.toUpperCase()}</p>
          <p className="mt-8 font-script text-3xl text-gold-soft/80">savour the evening with us</p>
        </Reveal>
      </div>
    </section>
  );
}

function DiyaRow() {
  return (
    <svg viewBox="0 0 200 30" className="mx-auto h-8 w-40" aria-hidden="true">
      <DiyaArt x={30} y={20} s={0.8} />
      <DiyaArt x={100} y={16} s={1} />
      <DiyaArt x={170} y={20} s={0.8} />
    </svg>
  );
}
