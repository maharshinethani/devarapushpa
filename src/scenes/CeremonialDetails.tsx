import { weddingConfig } from '@/config/weddingConfig';
import { Reveal } from '@/components/motion/Reveal';
import { OrnamentDivider, LotusIcon } from '@/components/art/HeritageArt';

/** Scene 4 — Sumuhurtham, presented as a modern editorial ceremony detail. */
export function CeremonialDetails() {
  const { wedding } = weddingConfig;

  return (
    <section className="paper-texture relative px-6 py-24 text-royal-forest sm:py-32" aria-label="Sumuhurtham">
      <div className="pointer-events-none absolute inset-3 border border-gold/30 sm:inset-5" />
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <LotusIcon className="mx-auto h-10 w-14" />
          <h2 className="mt-6 font-display text-4xl font-light tracking-[0.18em] text-royal-deep sm:text-5xl">
            SUMUHURTHAM
          </h2>
          <OrnamentDivider className="mx-auto mt-6 w-48" light={false} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 font-display text-3xl text-royal-deep sm:text-4xl">{wedding.day}</p>
          <p className="mt-2 font-display text-2xl text-royal-emerald sm:text-3xl">{wedding.date}</p>
        </Reveal>

        <Reveal delay={0.3} blur>
          <p className="mt-8 font-display text-6xl font-medium text-royal-deep sm:text-7xl">{wedding.time}</p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 border-y border-gold/40 py-6 sm:flex-row sm:justify-center sm:gap-14">
            <div>
              <p className="label-caps text-gold-deep">Nakshatra</p>
              <p className="mt-1 font-display text-lg italic text-royal-emerald">{wedding.nakshatra}</p>
            </div>
            <div className="hidden w-px bg-gold/30 sm:block" />
            <div>
              <p className="label-caps text-gold-deep">Lagnam</p>
              <p className="mt-1 font-display text-lg italic text-royal-emerald">{wedding.lagnam}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
