import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { weddingConfig } from '@/config/weddingConfig';
import { Reveal } from '@/components/motion/Reveal';

/** Cinematic keepsake album with soft champagne blush & warm sand background. */
export function WeddingAlbum() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const photos = weddingConfig.gallery ?? [];

  const goTo = useCallback(
    (i: number) => {
      if (!photos.length) return;
      const idx = (i + photos.length) % photos.length;
      setActive(idx);
      const track = trackRef.current;
      if (track) {
        const child = track.children[idx] as HTMLElement | undefined;
        child?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    },
    [photos.length]
  );

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !photos.length) return;
    const cardWidth = el.scrollWidth / photos.length;
    if (cardWidth > 0) {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(photos.length - 1, Math.max(0, idx)));
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#F7EDE4] via-[#F2E4D9] to-[#EAD7CA] py-16 text-[#1E2622] sm:py-24"
      aria-label="Our Memories"
    >
      {/* Subtle Warm Blush & Gold Glow Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#E8C6B0]/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-70px] h-72 w-72 rounded-full bg-[#E5C98E]/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Block */}
        <Reveal className="px-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#8A5A44]">
            Srikanth &amp; Pushpa · 2026
          </p>

          <h2 className="mt-2 font-serif text-4xl font-normal tracking-wide text-[#1A2420] sm:text-6xl">
            Our Memories
          </h2>

          <p className="mx-auto mt-2.5 max-w-md font-serif text-base italic leading-relaxed text-[#5C534E] sm:text-lg">
            A collection of cherished moments, captured with love
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-[#B5835A]">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B5835A]/70" />
            <Heart size={13} className="fill-[#C28D63]/80 text-[#9C6A44]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B5835A]/70" />
          </div>
        </Reveal>

        {/* Keepsake Photo Cards Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 pt-2 [scrollbar-width:none] sm:justify-center sm:overflow-x-auto sm:gap-7 sm:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((item, i) => {
            const isActive = i === active;
            const label = item.caption ?? `Cherished Moment ${i + 1}`;
            const tiltClass =
              i % 3 === 0
                ? '-rotate-1 hover:rotate-0'
                : i % 3 === 1
                ? 'rotate-1 hover:rotate-0'
                : '-rotate-[0.5deg] hover:rotate-0';

            return (
              <motion.figure
                key={`${item.src}-${i}`}
                onClick={() => {
                  setActive(i);
                  setLightbox(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightbox(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open photograph ${i + 1}: ${label}`}
                animate={{
                  scale: isActive ? 1 : 0.96,
                  opacity: isActive ? 1 : 0.88,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={`group relative w-[78vw] max-w-[310px] shrink-0 snap-center cursor-pointer rounded-sm border border-[#E4D1C3] bg-white p-3 pb-4 text-[#1E2421] shadow-[0_14px_34px_rgba(46,28,20,0.1)] transition-all duration-500 sm:w-[290px] ${tiltClass}`}
              >
                {/* Top Monogram & Year Header */}
                <div className="mb-2 flex items-center justify-between border-b border-[#EFE4DC] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6D625C]">
                  <span>Srikanth &amp; Pushpa</span>
                  <span className="rounded-full border border-[#D4B46A]/70 bg-[#FBF4E2] px-2 py-0.5 font-serif text-[10px] font-bold tracking-widest text-[#8A6824]">
                    S &amp; P
                  </span>
                  <span>2026</span>
                </div>

                {/* Main Photograph */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5ECE5]">
                  <img
                    src={item.src}
                    alt={label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                </div>

                {/* Bottom Caption & Number */}
                <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
                  <figcaption className="truncate font-serif text-sm italic text-[#2B332F]">
                    {label}
                  </figcaption>
                  <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8A684B]">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.figure>
            );
          })}
        </div>

        {/* Navigation Controls + Dots */}
        <div className="mt-2 flex items-center justify-center gap-5 px-6">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous photograph"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14533E]/30 bg-white/85 text-[#14533E] shadow-xs transition hover:border-[#14533E] hover:bg-[#14533E] hover:text-white"
          >
            <ChevronLeft size={17} strokeWidth={1.7} />
          </button>

          <div className="flex items-center gap-2">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to photograph ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === active
                    ? 'w-6 bg-[#14533E]'
                    : 'w-2 bg-[#14533E]/25 hover:bg-[#14533E]/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next photograph"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14533E]/30 bg-white/85 text-[#14533E] shadow-xs transition hover:border-[#14533E] hover:bg-[#14533E] hover:text-white"
          >
            <ChevronRight size={17} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      <Lightbox
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNav={(nextIdx) => {
          setLightbox(nextIdx);
          setActive(nextIdx);
        }}
      />
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number | null;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const photos = weddingConfig.gallery ?? [];
  const n = photos.length;
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (index === null || !n) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % n);
      if (e.key === 'ArrowLeft') onNav((index - 1 + n) % n);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onClose, onNav, n]);

  if (!n) return null;

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) {
              onNav(dx < 0 ? (index + 1) % n : (index - 1 + n) % n);
            }
            touchX.current = null;
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph ${index + 1} of ${n}`}
        >
          <motion.div
            key={index}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-sm bg-white p-3.5 pb-4 text-[#1E2421] shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B665B]">
              <span>Memory {String(index + 1).padStart(2, '0')}</span>
              <span className="font-serif text-xs font-bold text-[#8A6824]">
                S &amp; P
              </span>
              <span>
                {index + 1} / {n}
              </span>
            </div>

            <div className="aspect-[4/5] w-full overflow-hidden bg-[#F5ECE5]">
              <img
                src={photos[index].src}
                alt={photos[index].caption ?? `Moment ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>

            {photos[index].caption && (
              <p className="mt-3 text-center font-serif text-sm italic text-[#2B332F]">
                {photos[index].caption}
              </p>
            )}
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#E6C687]/45 bg-black/50 text-[#F7E8C8] transition hover:bg-[#E6C687] hover:text-black"
          >
            <X size={18} strokeWidth={1.6} />
          </button>

       

          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
