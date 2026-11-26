import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OpeningSceneArt } from '@/components/art/HeritageArt';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// public folder lo unna image path
const GANESH_IMAGE_SRC = '/ganesh.png';

const AMBIENT_PARTICLES = [
  { id: 1, left: '18%', top: '26%', size: 4, delay: 0, duration: 1.6 },
  { id: 2, left: '78%', top: '22%', size: 3, delay: 0.15, duration: 1.8 },
  { id: 3, left: '24%', top: '74%', size: 3, delay: 0.1, duration: 1.7 },
  { id: 4, left: '74%', top: '72%', size: 4, delay: 0.2, duration: 1.9 },
  { id: 5, left: '50%', top: '16%', size: 3, delay: 0.05, duration: 2.0 },
  { id: 6, left: '14%', top: '50%', size: 2.5, delay: 0.25, duration: 1.5 },
  { id: 7, left: '86%', top: '48%', size: 3.5, delay: 0.1, duration: 1.7 },
  { id: 8, left: '52%', top: '84%', size: 3, delay: 0.15, duration: 1.8 },
];

/**
 * Scene 0 — Quick 1.5s cinematic opening frame.
 * Deep dark green royal ambience, subtle floating golden dust,
 * full borderless non-circular Ganesh image with quick zoom,
 * and immediate handover into the next scene.
 */
export function OpeningImageScene({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  // 1.5 seconds lo next screen ki vellipothundi
  const duration = reduced ? 1.1 : 1.5;
  const leaveLeadMs = reduced ? 300 : 450;

  useEffect(() => {
    const t1 = window.setTimeout(
      () => setLeaving(true),
      Math.max(150, duration * 1000 - leaveLeadMs)
    );

    const t2 = window.setTimeout(onDone, duration * 1000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone, duration, leaveLeadMs]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-[#010a07] px-4 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{
        duration: reduced ? 0.18 : 0.3,
        ease: 'easeOut',
      }}
      aria-label="Opening visual"
    >
      {/* Layer 1: Deep dark emerald-forest radial ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(8, 52, 37, 0.72) 0%, rgba(2, 20, 14, 0.96) 58%, #010705 100%)',
        }}
      />

      {/* Layer 2: Soft breathing sacred aura behind the image */}
      <motion.div
        className="pointer-events-none absolute h-[65vh] w-[65vh] rounded-full blur-3xl"
        animate={
          reduced
            ? {
                opacity: 0.35,
                scale: 1,
              }
            : {
                opacity: [0.25, 0.45, 0.3],
                scale: [0.97, 1.05, 1],
              }
        }
        transition={
          reduced
            ? {
                duration: 0.4,
              }
            : {
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(12, 74, 52, 0.25) 45%, transparent 72%)',
        }}
      />

      {/* Layer 3: Subtle floating golden particles */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {AMBIENT_PARTICLES.map((dot) => (
            <motion.span
              key={dot.id}
              className="absolute rounded-full bg-[#e8cb78]"
              style={{
                left: dot.left,
                top: dot.top,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                boxShadow: '0 0 10px rgba(232, 203, 120, 0.75)',
              }}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: [0, 0.7, 0.2, 0.65, 0],
                y: [5, -8, -2, -11, -16],
              }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Layer 4: Film grain overlay */}
      <div className="film-grain pointer-events-none absolute inset-0 opacity-35" />

      {/* Layer 5: Centered Full Borderless Ganesh Image */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: reduced ? 0.2 : 0.35,
          ease: 'easeOut',
        }}
        className="relative z-10 flex max-h-[85vh] max-w-[92vw] items-center justify-center"
      >
        <motion.div
          className="relative flex items-center justify-center overflow-hidden bg-transparent will-change-transform"
          initial={{
            scale: 1,
            opacity: 0.92,
            filter: 'blur(1.5px)',
          }}
          animate={
            reduced
              ? {
                  scale: 1.02,
                  opacity: 1,
                  filter: 'blur(0px)',
                }
              : {
                  scale: [1, 1.03, 1.06, 1.08],
                  opacity: 1,
                  filter: 'blur(0px)',
                }
          }
          transition={
            reduced
              ? {
                  duration: 1.1,
                  ease: 'easeOut',
                }
              : {
                  duration,
                  ease: 'easeInOut',
                  times: [0, 0.3, 0.65, 1],
                }
          }
        >
          {!imgError ? (
            <img
              src={GANESH_IMAGE_SRC}
              alt="Lord Ganesha"
              onError={() => setImgError(true)}
              className="max-h-[82vh] w-auto max-w-[90vw] object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.85)]"
            />
          ) : (
            <OpeningSceneArt className="h-72 w-72 sm:h-96 sm:w-96" />
          )}
        </motion.div>
      </motion.div>

      {/* Layer 6: Fast golden light bloom before next scene */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={
          leaving
            ? {
                opacity: 1,
                scale: 1.05,
              }
            : {
                opacity: 0,
                scale: 0.96,
              }
        }
        transition={{
          duration: reduced ? 0.25 : 0.45,
          ease: 'easeInOut',
        }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(252, 239, 201, 0.48), rgba(198, 161, 91, 0.16) 45%, transparent 72%)',
        }}
      />
    </motion.div>
  );
}