import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PetalProps {
  count?: number;
  active?: boolean;
}

/** Floating jasmine & marigold petals — DOM based, GPU friendly. */
export function FloatingPetals({ count = 12, active = true }: PetalProps) {
  const reduced = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        duration: 11 + Math.random() * 9,
        drift: -40 + Math.random() * 80,
        marigold: i % 3 === 0,
        sway: 3 + Math.random() * 4,
      })),
    [count],
  );

  if (reduced || !active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-4%] block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.72,
            borderRadius: '60% 60% 60% 60% / 70% 70% 45% 45%',
            background: p.marigold
              ? 'radial-gradient(circle at 35% 30%, #E8A44A, #C97B2E)'
              : 'radial-gradient(circle at 35% 30%, #FFF9ED, #EADFC6)',
            opacity: 0.75,
            boxShadow: '0 0 4px rgba(248,241,227,0.25)',
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error custom property for keyframes
            '--drift': `${p.drift}px`,
            '--sway': `${p.sway}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes petal-fall {
          0% { transform: translate(0, -6vh) rotate(0deg); opacity: 0; }
          8% { opacity: 0.75; }
          50% { transform: translate(var(--drift), 46vh) rotate(160deg); }
          92% { opacity: 0.6; }
          100% { transform: translate(calc(var(--drift) * 0.6), 104vh) rotate(320deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/** Tiny shimmering gold particles for celebratory moments. */
export function GoldParticles({ count = 26 }: { count?: number }) {
  const reduced = useReducedMotion();
  const parts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
      })),
    [count],
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {parts.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: '#E9CE96',
            boxShadow: '0 0 6px rgba(217,188,133,0.9)',
            opacity: 0,
            animation: `gold-twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes gold-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 0.9; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
