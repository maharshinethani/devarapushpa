import { motion } from 'framer-motion';
import { AlbumArtFive, OrnamentDivider } from '@/components/art/HeritageArt';
import { weddingConfig } from '@/config/weddingConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Scene 13 — the closing shot of the wedding film. Fades to near-black. */
export function FinalScene() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden" aria-label="Our forever begins here">
      {/* full-screen couple image with slow cinematic zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={reduced ? { scale: 1.12 } : { scale: [1.08, 1.14, 1.08] }}
        transition={reduced ? { duration: 1 } : { duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AlbumArtFive />
      </motion.div>

      {/* dark royal-green overlay, deepening over time */}
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundColor: 'rgba(4,31,26,0.65)' }}
        whileInView={{ backgroundColor: 'rgba(4,31,26,0.88)' }}
        viewport={{ once: true }}
        transition={{ duration: 6, ease: 'easeIn' }}
      />
      <div className="film-grain" />

      {/* content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="font-display text-4xl font-light tracking-[0.15em] text-cream sm:text-6xl"
          style={{ textShadow: '0 2px 30px rgba(4,31,26,0.9)' }}
        >
          OUR FOREVER
          <br />
          BEGINS HERE
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="mt-8 flex flex-col items-center"
        >
          <span className="font-script text-5xl text-cream sm:text-7xl">{weddingConfig.bride.scriptName}</span>
          <span className="my-1 text-gold-soft">♡</span>
          <span className="font-script text-5xl text-cream sm:text-7xl">{weddingConfig.groom.scriptName}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.6, delay: 0.8 }}
          className="mt-10 max-w-sm font-body text-sm font-light leading-relaxed text-cream/70"
        >
          Thank you for being a part of our story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.4, delay: 1 }}
          className="mt-8"
        >
          <OrnamentDivider className="w-48" />
        </motion.div>
      </motion.div>

      {/* slow fade to deep royal green, then near-black */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 8, ease: 'easeIn', delay: 3 }}
        style={{ background: 'linear-gradient(to bottom, rgba(4,31,26,0.85), rgba(2,15,12,0.97))' }}
      />
    </section>
  );
}
