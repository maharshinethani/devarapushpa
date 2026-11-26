import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/weddingConfig';
import { AlbumArtTwo } from '@/components/art/HeritageArt';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function getRemaining(): { days: number; hours: number; minutes: number; seconds: number; done: boolean } {
  const target = new Date(weddingConfig.wedding.sumuhurthamIso).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: false,
  };
}

/** Scene 8 — cinematic countdown over a slowly zooming backdrop. */
export function Countdown() {
  const [t, setT] = useState(getRemaining);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(() => setT(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: Array<[number, string]> = [
    [t.days, 'Days'],
    [t.hours, 'Hours'],
    [t.minutes, 'Minutes'],
    [t.seconds, 'Seconds'],
  ];

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden" aria-label="Countdown">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: reduced ? 1.08 : [1.05, 1.15, 1.05] }}
        transition={reduced ? { duration: 1 } : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AlbumArtTwo />
      </motion.div>
      <div className="absolute inset-0 bg-royal-darkest/70" />
      <div className="film-grain" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-3xl font-light tracking-[0.2em] text-cream sm:text-5xl"
        >
          COUNTING DOWN TO FOREVER
        </motion.h2>
        <p className="mx-auto mt-4 max-w-md font-body text-sm font-light leading-relaxed text-cream/70">
          Every second brings us closer to celebrating with you.
        </p>

        {t.done ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="mt-14 font-display text-4xl tracking-[0.15em] text-gold-soft sm:text-6xl"
          >
            THE MOMENT HAS ARRIVED
          </motion.p>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-4">
            {units.map(([value, label]) => (
              <div key={label} className="flex flex-col items-center">
                <span
                  className="w-full font-display text-6xl font-light tabular-nums text-cream sm:text-7xl"
                  style={{ textShadow: '0 0 40px rgba(198,161,91,0.25)' }}
                >
                  {String(value).padStart(2, '0')}
                </span>
                <span className="gold-rule mt-4 w-10" />
                <span className="label-caps mt-3 text-gold-soft">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
