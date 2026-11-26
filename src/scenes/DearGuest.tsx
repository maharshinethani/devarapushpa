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
      className="relative flex min-h-[88svh] items-center justify-center overflow-hidden sm:min-h-screen"
      aria-label="Thank you note"
    >
      {/* Full-frame background image without heavy mobile zoom */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: reduced ? 1 : 1.03 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 1 : 16, ease: 'easeOut' }}
      >
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[50%_20%] sm:object-center"
        />
      </motion.div>

      {/* Warm dark overlay + bokeh glow */}
      <div className="absolute inset-0 bg-royal-darkest/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.14),transparent_65%)]" />
      <div className="film-grain" />

      <div className="relative z-10 mx-auto w-full max-w-md px-5 py-20 text-center sm:px-6 sm:py-28">
        <Reveal>
          <div className="rounded-[28px] border border-gold-soft/45 bg-royal-darkest/60 p-2 shadow-2xl backdrop-blur-md">
            <div className="rounded-[22px] border border-gold-soft/30 px-6 py-10 sm:px-8 sm:py-12">
              <div className="mb-3 flex justify-center text-sm text-gold-soft">
                ♥
              </div>

              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-cream/85">
                With Grateful Hearts
              </p>

              <h2 className="mt-2 font-display text-4xl font-normal tracking-wide text-cream sm:text-5xl">
                Thank You
              </h2>

              <div className="mx-auto my-6 flex max-w-[140px] items-center justify-center gap-2.5">
                <span className="h-[1px] flex-1 bg-gold-soft/45" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-soft" />
                <span className="h-[1px] flex-1 bg-gold-soft/45" />
              </div>

              <p className="font-body text-sm italic leading-[1.85] text-cream/90 sm:text-[15px]">
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
                <span className="font-script text-2xl text-gold-soft">
                  {weddingConfig.bride.scriptName}
                </span>{' '}
                &amp;{' '}
                <span className="font-script text-2xl text-gold-soft">
                  {weddingConfig.groom.scriptName}
                </span>
              </p>

              <div className="mt-7 inline-block rounded-full border border-cream/30 bg-white/5 px-5 py-2">
                <p className="font-body text-xs italic tracking-wide text-cream/85">
                  Our families look forward to welcoming you
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}