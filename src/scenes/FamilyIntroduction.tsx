import { weddingConfig } from '@/config/weddingConfig';
import { Reveal } from '@/components/motion/Reveal';
import { OrnamentDivider, TempleArchIcon } from '@/components/art/HeritageArt';

function FamilyBlock({
  title,
  parents,
  side,
}: {
  title: string;
  parents: readonly string[];
  side: 'left' | 'right';
}) {
  const [father, mother] = parents;
  return (
    <Reveal delay={side === 'left' ? 0.1 : 0.25} className="flex-1">
      <div className="relative px-6 py-10 sm:px-10">
        <div className="absolute inset-0 border border-gold/30" />
        <div className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-gold/50 bg-cream" />
        <TempleArchIcon className="mx-auto h-10 w-14 opacity-70" />
        <p className="label-caps mt-4 text-gold-deep">{title}</p>
        <p className="mt-5 font-display text-2xl leading-snug text-royal-deep sm:text-3xl">{father}</p>
        <p className="mt-1 font-display text-2xl leading-snug text-royal-deep sm:text-3xl">{mother}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-royal-emerald/60">
          {side === 'right' ? `of ${weddingConfig.groom.familyVillage}` : 'request the honour of your presence'}
        </p>
      </div>
    </Reveal>
  );
}

/** Scenes 13/24 — both family sections share one elegant composition. */
export function FamilyIntroduction({ variant = 'intro' }: { variant?: 'intro' | 'blessings' }) {
  const heading =
    variant === 'intro' ? 'With the blessings of our families' : 'With the blessings\nof our families';

  return (
    <section
      className="relative bg-royal-deep px-6 py-24 text-cream sm:py-32"
      aria-label="Our families"
    >
      <div className="film-grain" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <h2 className="whitespace-pre-line text-center font-display text-3xl font-light tracking-wide sm:text-4xl">
            {heading.toUpperCase()}
          </h2>
          <OrnamentDivider className="mx-auto mt-6 w-52" />
        </Reveal>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:gap-12">
          <FamilyBlock title="Bride's Family" parents={weddingConfig.bride.parents} side="left" />
          <FamilyBlock title="Groom's Family" parents={weddingConfig.groom.parents} side="right" />
        </div>
      </div>
    </section>
  );
}
