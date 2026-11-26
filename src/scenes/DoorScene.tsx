import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { weddingConfig } from '@/config/weddingConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { useMusicController } from '@/hooks/useMusicController';

interface Props {
  onEntered: () => void;
  music: ReturnType<typeof useMusicController>;
}

/* Smooth Cinematic Timeline (ms) */
const T = {
  doorStart: 1450, // Smooth zoom daggaraki vellaka doors open start avtayi
  reveal: 3650,    // Doors open ayyaka next page reveal
};

const DOOR_IMG = '/doorscreen.jpeg';
// Door open ayyaka lopala kanipinche kotha image (same as-is)
const REVEAL_IMG = '/banner.png';

/* Image lo green doors unna boundaries */
const DOOR_BOUNDS = {
  top: '15%',
  bottom: '16%',
  left: '19%',
  right: '19%',
  widthPct: 62,
  heightPct: 69,
};

export function DoorScene({ onEntered, music }: Props) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<'idle' | 'entering'>('idle');
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const openInvitation = useCallback(() => {
    if (stage !== 'idle') return;
    music.play();

    if (reduced) {
      setStage('entering');
      timers.current.push(window.setTimeout(onEntered, 700));
      return;
    }

    setStage('entering');

    timers.current.push(
      window.setTimeout(() => {
        onEntered();
      }, T.reveal)
    );
  }, [stage, music, onEntered, reduced]);

  const isEntering = stage === 'entering';

  return (
    <section
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-royal-darkest"
      aria-label="The wedding entrance"
    >
      {/* Main Full-Height Frame */}
      <div className="relative h-full w-full max-w-[540px] overflow-hidden bg-royal-darkest shadow-2xl sm:max-w-[620px] md:max-w-[700px]">
        {/* SINGLE CONTINUOUS SMOOTH ZOOM */}
        <motion.div
          className="relative h-full w-full will-change-transform"
          style={{
            transformOrigin: '50% 45%',
            transform: 'translateZ(0)',
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: isEntering ? 1.65 : 1,
          }}
          transition={{
            scale: {
              duration: reduced ? 0.6 : T.reveal / 1000,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* 1. Background Base Image */}
          <img
            src={DOOR_IMG}
            alt="Royal Wedding Entrance"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
          />

          {/* 2. Doors Open Ayina Ventane Kanipinche Kotha Image (Same As-Is) */}
          <div
            className="pointer-events-none absolute overflow-hidden bg-black"
            style={{
              top: DOOR_BOUNDS.top,
              bottom: DOOR_BOUNDS.bottom,
              left: DOOR_BOUNDS.left,
              right: DOOR_BOUNDS.right,
            }}
          >
            <img
              src={REVEAL_IMG}
              alt="Inside Wedding View"
              className="h-full w-full select-none object-cover object-center"
            />
          </div>

          {/* 3. Animated Left & Right Door Panels */}
          <div
            className="pointer-events-none absolute flex"
            style={{
              top: DOOR_BOUNDS.top,
              bottom: DOOR_BOUNDS.bottom,
              left: DOOR_BOUNDS.left,
              right: DOOR_BOUNDS.right,
              perspective: '1200px',
            }}
          >
            {/* LEFT DOOR */}
            <motion.div
              className="relative h-full w-1/2 origin-left overflow-hidden will-change-transform"
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: isEntering ? -88 : 0,
              }}
              transition={{
                rotateY: {
                  duration: 2.1,
                  delay: T.doorStart / 1000,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={DOOR_IMG}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute max-w-none select-none object-cover object-center"
                style={{
                  width: `${(100 / (DOOR_BOUNDS.widthPct / 2)) * 100}%`,
                  height: `${(100 / (DOOR_BOUNDS.heightPct / 1.12)) * 100}%`,
                  left: `-${(19 / (DOOR_BOUNDS.widthPct / 2)) * 100}%`,
                  top: `-${(15 / (DOOR_BOUNDS.heightPct / 1.12)) * 100}%`,
                }}
              />
            </motion.div>

            {/* RIGHT DOOR */}
            <motion.div
              className="relative h-full w-1/2 origin-right overflow-hidden will-change-transform"
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: isEntering ? 88 : 0,
              }}
              transition={{
                rotateY: {
                  duration: 2.1,
                  delay: T.doorStart / 1000,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={DOOR_IMG}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute max-w-none select-none object-cover object-center"
                style={{
                  width: `${(100 / (DOOR_BOUNDS.widthPct / 2)) * 100}%`,
                  height: `${(100 / (DOOR_BOUNDS.heightPct / 1.12)) * 100}%`,
                  left: `-${(50 / (DOOR_BOUNDS.widthPct / 2)) * 100}%`,
                  top: `-${(15 / (DOOR_BOUNDS.heightPct / 1.12)) * 100}%`,
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* 4. Text & Button Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <AnimatePresence>
            {!isEntering && (
              <motion.div
                key="invite"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                  transition: { duration: 0.45, ease: 'easeOut' },
                }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="pointer-events-auto flex flex-col items-center rounded-2xl border border-gold/35 bg-black/45 px-5 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.7)] backdrop-blur-[3px] sm:px-8 sm:py-8"
              >
              
                <p className="label-caps mt-2 text-[10px] tracking-[0.22em] text-cream/85 sm:text-xs">
                  With all our hearts
                </p>

                <h1 className="mt-3 font-script text-4xl leading-tight text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl">
                  {weddingConfig.bride.scriptName}
                </h1>
                <span className="my-0.5 font-display text-xl italic text-gold-soft sm:text-2xl">
                  &amp;
                </span>
                <h1 className="font-script text-4xl leading-tight text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl">
                  {weddingConfig.groom.scriptName}
                </h1>

                <p className="label-caps mt-3 text-[10px] leading-relaxed tracking-[0.2em] text-cream/90 sm:mt-4 sm:text-xs">
                  You are invited
                  <br />
                  to celebrate our wedding
                </p>

                <button
                  onClick={openInvitation}
                  className="group mt-5 rounded-sm border border-gold/80 bg-royal-emerald/85 px-6 py-2.5 shadow-[0_0_20px_rgba(198,161,91,0.3)] transition-all duration-500 hover:scale-[1.03] hover:border-gold hover:bg-royal-emerald active:scale-[0.98] sm:mt-6 sm:px-8 sm:py-3"
                >
                  <span className="label-caps flex items-center gap-2.5 text-xs tracking-[0.22em] text-gold-soft sm:text-sm">
                    <span className="inline-block h-[1px] w-5 bg-gold/80 transition-all duration-500 group-hover:w-8" />
                    Open Invitation
                    <span className="inline-block h-[1px] w-5 bg-gold/80 transition-all duration-500 group-hover:w-8" />
                  </span>
                  <span className="mt-1 block text-[9px] font-light uppercase tracking-[0.25em] text-cream/75">
                    Tap to open the doors
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="film-grain pointer-events-none absolute inset-0 z-30" />
      </div>

      {/* Desktop sides background blur */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30 blur-2xl"
        style={{
          backgroundImage: `url(${DOOR_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </section>
  );
}