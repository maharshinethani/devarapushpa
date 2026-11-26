import { AnimatePresence, motion } from 'framer-motion';
import { Music, Pause, VolumeX } from 'lucide-react';
import type { useMusicController } from '@/hooks/useMusicController';

interface Props {
  music: ReturnType<typeof useMusicController>;
}

export function MusicControl({ music }: Props) {
  const { state, muted, play, pause, toggleMute } = music;
  const isActive = state === 'playing' || state === 'paused';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: state === 'idle' ? 0 : 1, scale: state === 'idle' ? 0.8 : 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-5 right-5 z-50"
      style={{ pointerEvents: state === 'idle' ? 'none' : 'auto' }}
    >
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {muted && (
            <motion.button
              key="unmute"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              onClick={toggleMute}
              aria-label="Unmute music"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-royal-forest/90 text-gold-soft backdrop-blur-sm"
            >
              <VolumeX size={15} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            if (state === 'playing') pause();
            else {
              if (muted) toggleMute();
              play();
            }
          }}
          aria-label={state === 'playing' ? 'Pause music' : 'Play music'}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-royal-forest/90 text-gold-soft shadow-lg backdrop-blur-sm transition-colors hover:bg-royal-emerald/90"
        >
          {state === 'playing' && (
            <span
              className="absolute inset-0 rounded-full border border-gold/40"
              style={{ animation: 'music-pulse 2.4s ease-out infinite' }}
              aria-hidden="true"
            />
          )}
          {state === 'playing' ? <Pause size={16} strokeWidth={1.5} /> : <Music size={16} strokeWidth={1.5} />}
        </button>
      </div>
      <style>{`
        @keyframes music-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
