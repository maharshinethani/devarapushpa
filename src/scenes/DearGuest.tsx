import { motion } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { weddingConfig } from '@/config/weddingConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Ikkada mee background image path or URL pettandi
const BG_IMAGE = '/thank.jpeg';

/** Scene 12 — a letter to the guest over a cinematic couple frame. */
export function DearGuest() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      aria-label="Thank you note"
    >
      {/* Full-frame background image with subtle slow zoom */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: reduced ? 1 : 1.04 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 1 : 18, ease: 'easeOut' }}
      >
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[50%_20%] sm:object-center"
        />
      </motion.div>

      {/* Rich cinematic overlays & bokeh glow */}
      <div className="absolute inset-0 bg-royal-darkest/65" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-royal-darkest/40 via-transparent to-royal-darkest/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.16),transparent_65%)]" />
      <div className="film-grain" />

      {/* Top spacer for balanced vertical centering */}
      <div className="hidden sm:block sm:h-8" />

      {/* ================= MAIN THANK YOU CARD ================= */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-md px-5 pt-16 pb-10 text-center sm:px-6 sm:py-16">
        <Reveal>
          <div className="rounded-[30px] border border-gold-soft/45 bg-royal-darkest/60 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-12px_rgba(212,175,55,0.22)] backdrop-blur-md">
            <div className="rounded-[23px] border border-gold-soft/30 px-6 py-10 sm:px-9 sm:py-12">
              <div className="mb-3 flex justify-center text-sm text-gold-soft drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                ♥
              </div>

              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/85">
                With Grateful Hearts
              </p>

              <h2 className="mt-2 font-display text-4xl font-normal tracking-wide text-cream sm:text-5xl">
                Thank You
              </h2>

              <div className="mx-auto my-6 flex max-w-[150px] items-center justify-center gap-2.5">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-soft/60" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-soft" />
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-soft/60" />
              </div>

              <p className="font-body text-sm italic leading-[1.9] text-cream/90 sm:text-[15px]">
                Your presence and blessings will make
                <br />
                our celebration complete. We would be
                <br />
                honoured to share this beautiful
                <br />
                beginning with you.
              </p>

              <p className="mt-8 font-display text-base font-medium tracking-wide text-cream sm:text-lg">
                With love,{' '}
              <span className="font-script text-2xl text-gold-soft sm:text-3xl">
                  {weddingConfig.groom.scriptName}
                </span>{' '}
                &amp;{' '}
                 <span className="font-script text-2xl text-gold-soft sm:text-3xl">
                  {weddingConfig.bride.scriptName}
                </span>
              </p>

              <div className="mt-7 inline-block rounded-full border border-gold-soft/30 bg-white/[0.04] px-5 py-2">
                <p className="font-body text-xs italic tracking-wide text-cream/85">
                  Our families look forward to welcoming you
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ================= LUXURY WEBSITE CREDIT FOOTER ================= */}
      <footer className="relative z-20 w-full border-t border-gold-soft/20 bg-royal-darkest/75 px-4 py-5 backdrop-blur-md sm:py-6">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          {/* Decorative top hairline accent */}
          <div className="mb-2.5 flex items-center gap-2">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold-soft/50" />
            <span className="text-[8px] text-gold-soft/80">✦</span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold-soft/50" />
          </div>

          <p className="font-body text-[9px] font-medium uppercase tracking-[0.3em] text-cream/60 sm:text-[10px]">
            Digital Invitation Crafted By
          </p>

          <a
            href="https://rcmverse.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 font-display text-sm font-semibold tracking-[0.18em] text-gold-soft transition-all duration-300 hover:tracking-[0.21em] hover:text-cream sm:text-base"
          >
            RCM DIGITAL SOLUTIONS
          </a>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-cream/75 sm:gap-3 sm:text-xs">
            <a
              href="https://rcmverse.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-soft/25 bg-white/[0.03] px-3 py-1 transition-all hover:border-gold-soft/60 hover:bg-gold-soft/10 hover:text-gold-soft"
            >
              <span className="text-[10px] text-gold-soft">🌐</span>
              <span>rcmverse.netlify.app</span>
            </a>

            <a
              href="tel:+918500708626"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-soft/25 bg-white/[0.03] px-3 py-1 transition-all hover:border-gold-soft/60 hover:bg-gold-soft/10 hover:text-gold-soft"
            >
              <span className="text-[10px] text-gold-soft">📞</span>
              <span>+91 85007 08626</span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
