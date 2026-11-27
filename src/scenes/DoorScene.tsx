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

function GoldWaveDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`h-[16px] w-[220px] max-w-full ${className}`}
      viewBox="0 0 240 18"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="8"
        y1="11"
        x2="88"
        y2="11"
        stroke="#c6a15b"
        strokeWidth="1"
        strokeOpacity="0.85"
      />
      <path
        d="M88 11C96 3 106 3 114 11C122 18 132 18 140 11"
        stroke="#c6a15b"
        strokeWidth="1.1"
      />
      <circle cx="144" cy="11" r="2.2" fill="#c6a15b" />
      <line
        x1="148"
        y1="11"
        x2="232"
        y2="11"
        stroke="#c6a15b"
        strokeWidth="1"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

function GaneshaLineArt({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`h-[56px] w-[52px] ${className}`}
      viewBox="0 0 64 68"
      fill="none"
      stroke="#c6a15b"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Ears */}
      <path d="M20 20c-6-5-12-1-10 6 1 4 5 5 9 4" />
      <path d="M44 20c6-5 12-1 10 6-1 4-5 5-9 4" />
      {/* Crown / Tilak */}
      <path d="M32 7l-3 5h6l-3-5z" />
      <path d="M32 14v5" />
      {/* Head */}
      <circle cx="32" cy="24" r="9" />
      {/* Eyes */}
      <circle cx="28.5" cy="23" r="1" fill="#c6a15b" stroke="none" />
      <circle cx="35.5" cy="23" r="1" fill="#c6a15b" stroke="none" />
      {/* Trunk */}
      <path d="M32 27c0 6 2 10 6 10 2.5 0 4-1.5 4-3.5" />
      {/* Torso & Arms */}
      <path d="M21 56v-9c0-5 4.5-8 11-8s11 3 11 8v9" />
      <path d="M21 44l-5 8" />
      <path d="M43 44l5 8" />
    </svg>
  );
}

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
        <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center px-5 text-center">
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
                className="pointer-events-auto flex w-full max-w-[360px] flex-col items-center rounded-xl border border-gold/45 bg-black/55 px-5 py-5 shadow-[0_14px_45px_rgba(0,0,0,0.78)] backdrop-blur-[4px] sm:max-w-[390px] sm:px-7 sm:py-6"
              >
                {/* Top Ornamental Divider */}
               

                {/* Shloka Stack */}
                <div className="shloka mt-2 font-display text-base leading-[1.55] tracking-[0.04em] text-cream sm:text-lg">
  శ్రీ గణేశాయ నమః
</div>

                {/* Script Family Title */}
                <div className="script mt-3 font-script text-4xl leading-none text-gold-soft drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] sm:text-[42px]">
                  Devara&apos;s
                </div>
                 <div className="fam font-display text-xs tracking-[0.03em] text-cream/95 sm:text-[13px]">
                  Sri Devara Chinnarao, Smt.Srinamma
                </div>

                {/* Spaced Uppercase Subheading */}
                <div className="wi label-caps mt-2 text-[10px] font-normal tracking-[0.34em] text-cream/85 sm:text-[11px]">
                  WEDDING INVITATION
                </div>

                {/* Couple Names */}
               

                {/* Small Emblem Separator */}
             

                {/* Family Hosts Line */}
               

             

                {/* Action Button */}
                <button
                  onClick={openInvitation}
                  className="group mt-3.5 rounded-sm border border-gold/80 bg-royal-emerald/85 px-6 py-2 shadow-[0_0_20px_rgba(198,161,91,0.28)] transition-all duration-500 hover:scale-[1.03] hover:border-gold hover:bg-royal-emerald active:scale-[0.98]"
                >
                  <span className="label-caps flex items-center gap-2 text-[11px] tracking-[0.26em] text-gold-soft sm:text-xs">
                    <span className="inline-block h-[1px] w-4 bg-gold/80 transition-all duration-500 group-hover:w-7" />
                    TAP TO OPEN
                    <span className="inline-block h-[1px] w-4 bg-gold/80 transition-all duration-500 group-hover:w-7" />
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
