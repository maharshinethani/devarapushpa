import { useEffect, useRef, useState } from 'react';

type MusicState = 'idle' | 'playing' | 'paused' | 'blocked';

export function useMusicController(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicState>('idle');
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setState('playing');
        const target = 0.45;
        const step = 0.015;
        const timer = window.setInterval(() => {
          if (audio.volume < target - step) {
            audio.volume = Math.min(target, audio.volume + step);
          } else {
            audio.volume = target;
            window.clearInterval(timer);
          }
        }, 100);
      })
      .catch(() => {
        // Browser blocked playback — the experience continues without music
        setState('blocked');
      });
  };

  const pause = () => {
    audioRef.current?.pause();
    setState('paused');
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return { state, muted, play, pause, toggleMute };
}
