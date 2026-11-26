import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AlbumArtOne, AlbumArtTwo, AlbumArtThree, AlbumArtFour, AlbumArtFive } from '@/components/art/HeritageArt';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STORY = [
  { text: 'ONCE UPON A TIME...', art: <AlbumArtOne /> },
  { text: 'WE MET.', art: <AlbumArtTwo /> },
  { text: 'WE FOUND SOMETHING SPECIAL.', art: <AlbumArtThree /> },
  { text: 'TWO JOURNEYS\nBECAME ONE.', art: <AlbumArtFour /> },
  { text: 'AND NOW...', art: <AlbumArtFive /> },
  { text: 'FOREVER BEGINS.', art: <AlbumArtOne /> },
];

/** Scene 5 — full-screen cinematic story beats with parallax + crossfades. */
export function StorySection() {
  return (
    <section aria-label="Our story">
      {STORY.map((beat, i) => (
        <StoryBeat key={i} text={beat.text} art={beat.art} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

function StoryBeat({ text, art, flip }: { text: string; art: React.ReactNode; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['8%', '-8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.08, 1.16, 1.08]);

  return (
    <div ref={ref} className="relative flex min-h-[88svh] items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {art}
      </motion.div>
      <div
        className={`absolute inset-0 ${flip ? 'bg-royal-darkest/60' : 'bg-royal-darkest/45'}`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(4,31,26,0.25) 20%, rgba(4,31,26,0.8) 90%)',
        }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-30%' }}
        transition={{ duration: 1.6, ease: [0.22, 0.6, 0.36, 1] }}
        className="relative z-10 whitespace-pre-line px-6 text-center font-display text-4xl font-light tracking-[0.15em] text-cream sm:text-6xl"
        style={{ textShadow: '0 2px 30px rgba(4,31,26,0.9)' }}
      >
        {text}
      </motion.h2>
      <div className="film-grain" />
    </div>
  );
}
