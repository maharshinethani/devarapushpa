import { useEffect, useState } from 'react';
import { KolamCorner, OrnamentDivider, LotusIcon } from '@/components/art/HeritageArt';
import { Reveal } from '@/components/motion/Reveal';
import { GoldParticles } from '@/components/atmosphere/FloatingPetals';
import { weddingConfig } from '@/config/weddingConfig';

const BANNER_IMG = '/banner.png'; // Tip: Convert to /banner.webp (<250KB) for instant load
const EXPIRY_DATE = new Date('2026-12-12T23:59:59+05:30');

export function InvitationReveal() {
  const { bride, groom, wedding } = weddingConfig;
  const isExpired = new Date() > EXPIRY_DATE;
  const [showParticles, setShowParticles] = useState(false);

  // First paint ayina ventane particles start avvadaniki (no initial lag)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShowParticles(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className="relative flex min-h-[115svh] w-full items-center justify-center overflow-hidden bg-[#f6efe2] px-4 py-14 text-[#112a1e] [contain:layout_paint] sm:min-h-[120svh] sm:px-6 sm:py-20"
      aria-label="Wedding invitation"
    >
      {/* Hardware-accelerated background image */}
      <img
        src={BANNER_IMG}
        alt="Wedding Invitation Background"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full origin-center scale-[1.03] transform-gpu select-none object-cover object-center sm:scale-105"
      />

      {/* Lightweight radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(251, 246, 236, 0.55) 0%, rgba(251, 246, 236, 0.15) 45%, transparent 75%)',
        }}
      />

      {/* Deferred particles so initial load stays 60fps */}
      {showParticles && <GoldParticles count={6} />}

      <KolamCorner className="pointer-events-none absolute left-2.5 top-2.5 h-11 w-11 sm:left-4 sm:top-4 sm:h-14 sm:w-14" />
      <KolamCorner className="pointer-events-none absolute right-2.5 top-2.5 h-11 w-11 sm:right-4 sm:top-4 sm:h-14 sm:w-14" flip />
      <KolamCorner className="pointer-events-none absolute bottom-2.5 left-2.5 h-11 w-11 sm:bottom-4 sm:left-4 sm:h-14 sm:w-14" />
      <KolamCorner className="pointer-events-none absolute bottom-2.5 right-2.5 h-11 w-11 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14" flip />

      <div className="pointer-events-none absolute inset-2.5 border border-gold/55 sm:inset-4" />
      <div className="pointer-events-none absolute inset-3.5 border border-gold/25 sm:inset-5" />

      {isExpired ? (
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-4 py-6 text-center">
          <LotusIcon className="mb-3 h-7 w-10 opacity-90" />
          <p className="label-caps text-xs font-semibold tracking-[0.25em] text-[#7a5419]">
            Thank You For Your Blessings
          </p>
          <h2 className="mt-3 font-script text-5xl text-[#0f291e] sm:text-6xl">
            {bride.scriptName} &amp; {groom.scriptName}
          </h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#183d2c]">
            Wedding Celebrations Concluded · 12 Dec 2026
          </p>
        </div>
      ) : (
        <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-3 py-3 text-center [text-shadow:0_1px_2px_rgba(255,252,245,0.95)] sm:px-5 sm:py-4">
          <Reveal>
            <p className="label-caps text-[10.5px] font-semibold tracking-[0.26em] text-[#7a5419] sm:text-xs">
              Shubhamasthu
            </p>
          </Reveal>

          <Reveal delay={0.04}>
            <p className="label-caps mt-2.5 text-[10px] font-semibold leading-snug tracking-[0.2em] text-[#133324] sm:mt-3 sm:text-[11px]">
              Together with our families
              <br />
              we joyfully invite you
              <br />
              to celebrate the wedding of
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-3.5 font-script text-5xl leading-none text-[#0b2419] sm:mt-4 sm:text-6xl md:text-7xl">
              {groom.scriptName}
            </h2>
            <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#163a2a] sm:text-[11px]">
              {groom.fullName}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="my-2.5 flex items-center justify-center gap-3 sm:my-3">
              <span className="gold-rule w-10 sm:w-12" />
              <span className="font-display text-sm font-semibold italic text-[#7a5419] sm:text-base">
                weds
              </span>
              <span className="gold-rule w-10 sm:w-12" />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h2 className="font-script text-5xl leading-none text-[#0b2419] sm:text-6xl md:text-7xl">
              {bride.scriptName}
            </h2>
            <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#163a2a] sm:text-[11px]">
              {bride.fullName}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <OrnamentDivider className="mt-4 w-36 sm:mt-5 sm:w-44" light={false} />
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-3.5 font-display text-xl font-semibold tracking-wide text-[#0b2419] sm:mt-4 sm:text-2xl">
              {wedding.date || '12 DEC 2026'}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-4 flex flex-col items-center gap-0.5 sm:mt-5">
              <LotusIcon className="mb-1 h-5 w-8 opacity-90 sm:h-6 sm:w-9" />
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}