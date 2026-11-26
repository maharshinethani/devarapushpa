import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HEART_PATH_D =
  'M 100 174 C 24 122 10 56 48 28 C 72 11 92 24 100 44 C 108 24 128 11 152 28 C 190 56 176 122 100 174 Z';

// Target Date: December 12, 2026 at 8:26 PM
const TARGET_DATE = new Date('2026-12-12T20:26:00').getTime();
const REVEAL_THRESHOLD = 0.55; // 55% scratch cheste reveal avuthundi

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

export function SpecialDateScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const lastPt = useRef<{ x: number; y: number } | null>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 300, h: 285 });
  const sparkleId = useRef(0);

  // Countdown timer runs continuously, and appears only after scratch reveal
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const buildHeartPath = useCallback((w: number, h: number) => {
    const scale = Math.min(w / 200, h / 190);
    const offsetX = (w - 200 * scale) / 2;
    const offsetY = (h - 190 * scale) / 2;

    const matrix = new DOMMatrix().translate(offsetX, offsetY).scale(scale, scale);
    const p = new Path2D();
    p.addPath(new Path2D(HEART_PATH_D), matrix);
    return p;
  }, []);

  // Draw realistic metallic foil texture inside heart
  const drawRealFoilHeart = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      const heartPath = buildHeartPath(w, h);

      ctx.save();
      ctx.clip(heartPath);

      // Rich royal emerald + brushed metallic gold sheen
      const baseGrad = ctx.createLinearGradient(0, 0, w, h);
      baseGrad.addColorStop(0, '#136F52');
      baseGrad.addColorStop(0.32, '#0A4736');
      baseGrad.addColorStop(0.55, '#1D7C5D');
      baseGrad.addColorStop(0.8, '#073528');
      baseGrad.addColorStop(1, '#041E17');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);

      // Diagonal metallic foil highlight band
      const sheenGrad = ctx.createLinearGradient(-w * 0.2, 0, w * 1.1, h);
      sheenGrad.addColorStop(0, 'rgba(255, 244, 214, 0)');
      sheenGrad.addColorStop(0.45, 'rgba(245, 215, 148, 0.14)');
      sheenGrad.addColorStop(0.5, 'rgba(255, 250, 235, 0.28)');
      sheenGrad.addColorStop(0.55, 'rgba(245, 215, 148, 0.14)');
      sheenGrad.addColorStop(1, 'rgba(255, 244, 214, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, w, h);

      // Fine foil grain texture (makes it feel like real scratch foil)
      for (let i = 0; i < 650; i++) {
        const gx = Math.random() * w;
        const gy = Math.random() * h;
        const alpha = Math.random() * 0.16;
        ctx.fillStyle =
          i % 2 === 0
            ? `rgba(255, 238, 196, ${alpha})`
            : `rgba(2, 15, 11, ${alpha * 1.3})`;
        ctx.fillRect(gx, gy, 1.4, 1.4);
      }

      // Gold micro-flakes
      for (let i = 0; i < 65; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        ctx.fillStyle = `rgba(240, 206, 134, ${0.2 + Math.random() * 0.45})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.7 + Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Foil label text
      ctx.fillStyle = 'rgba(253, 236, 198, 0.9)';
      ctx.font = '600 12px serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 + 4);

      ctx.restore();
    },
    [buildHeartPath]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (!revealed) {
        drawRealFoilHeart(canvas, rect.width, rect.height);
      }
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(container);
    window.addEventListener('resize', syncSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncSize);
    };
  }, [drawRealFoilHeart, revealed]);

  // Clear remaining foil once threshold is reached
  useEffect(() => {
    if (!revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }, [revealed]);

  const getLocalPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const spawnSparkle = (x: number, y: number) => {
    const id = ++sparkleId.current;
    setSparkles((prev) => [...prev.slice(-10), { id, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((item) => item.id !== id));
    }, 450);
  };

  const applyScratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    const heartPath = buildHeartPath(w, h);

    if (!ctx.isPointInPath(heartPath, x, y) && !lastPt.current) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clip(heartPath);
    ctx.globalCompositeOperation = 'destination-out';

    // Main scratch stroke
    ctx.lineWidth = 34;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    if (lastPt.current) {
      ctx.moveTo(lastPt.current.x, lastPt.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Subtle gritty edge scratches for realistic coin/finger scratch feel
      for (let i = 0; i < 3; i++) {
        const jitterX = (Math.random() - 0.5) * 14;
        const jitterY = (Math.random() - 0.5) * 14;
        ctx.lineWidth = 4 + Math.random() * 6;
        ctx.beginPath();
        ctx.moveTo(lastPt.current.x + jitterX, lastPt.current.y + jitterY);
        ctx.lineTo(x + jitterX, y + jitterY);
        ctx.stroke();
      }
    } else {
      ctx.arc(x, y, 17, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPt.current = { x, y };
    if (Math.random() < 0.45) {
      spawnSparkle(x, y);
    }

    // Check cleared area ratio
    if (Math.random() < 0.25) {
      const boxX = Math.max(0, Math.floor(w * 0.12 * dpr));
      const boxY = Math.max(0, Math.floor(h * 0.12 * dpr));
      const boxW = Math.max(1, Math.floor(w * 0.76 * dpr));
      const boxH = Math.max(1, Math.floor(h * 0.76 * dpr));

      const data = ctx.getImageData(boxX, boxY, boxW, boxH).data;
      let transparentCount = 0;
      let totalCount = 0;

      for (let i = 3; i < data.length; i += 16) {
        totalCount++;
        if (data[i] === 0) transparentCount++;
      }

      if (totalCount > 0) {
        const ratio = Math.min(1, transparentCount / (totalCount * 0.58));
        setProgress((prev) => Math.max(prev, ratio));
        if (ratio >= REVEAL_THRESHOLD) {
          setProgress(1);
          setRevealed(true);
        }
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (revealed) return;
    const { x, y } = getLocalPos(e);
    const { w, h } = sizeRef.current;
    const ctx = canvasRef.current?.getContext('2d');
    const heartPath = buildHeartPath(w, h);

    if (ctx && !ctx.isPointInPath(heartPath, x, y)) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsScratching(true);
    lastPt.current = null;
    applyScratch(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching || revealed) return;
    const { x, y } = getLocalPos(e);
    applyScratch(x, y);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPt.current = null;
  };

  const floatingHearts = [
    { top: '10%', left: '12%', size: 15, delay: 0 },
    { top: '18%', right: '11%', size: 20, delay: 0.5 },
    { bottom: '20%', left: '13%', size: 17, delay: 1.1 },
    { bottom: '14%', right: '14%', size: 19, delay: 0.3 },
  ];

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#061712] px-5 py-14 text-[#FDF8EE]"
      aria-label="Remember the Date"
    >
      {/* Monochrome Romantic Background (Replace URL with your couple photo) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 grayscale contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80')`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03120E]/90 via-[#052119]/80 to-[#03120E]/95" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#E6C687]/90"
        >
          A Date Written In Our Hearts Forever
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-3 font-serif text-4xl italic font-normal leading-tight tracking-wide text-[#FFFDF9] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-5xl"
        >
          Remember the <br /> Date
        </motion.h1>

        {/* Gold-Bordered Scratch Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-7 flex w-full max-w-[345px] flex-col items-center justify-center rounded-2xl border border-[#E6C687]/75 bg-[#091310]/80 p-5 shadow-[0_0_35px_rgba(230,198,135,0.2)] backdrop-blur-md"
        >
          {floatingHearts.map((heart, idx) => (
            <span
              key={idx}
              className="pointer-events-none absolute text-white drop-shadow-[0_0_10px_rgba(255,245,214,0.95)]"
              style={{
                top: heart.top,
                left: heart.left,
                right: heart.right,
                bottom: heart.bottom,
                fontSize: `${heart.size}px`,
                animation: `floatGlow 3.2s ease-in-out ${heart.delay}s infinite`,
              }}
            >
              ♥
            </span>
          ))}

          {/* Heart Scratch Container */}
          <div
            ref={containerRef}
            className="relative aspect-[200/190] w-full max-w-[275px] select-none"
          >
            {/* Date sits underneath foil and becomes visible naturally as you scratch */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-2">
              <div className="flex flex-col items-center text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E6C687]">
                  Saturday
                </span>
                <span
                  className="mt-1 font-serif text-5xl font-bold leading-none text-white"
                  style={{ textShadow: '0 0 24px rgba(230, 198, 135, 0.7)' }}
                >
                  12
                </span>
                <span className="mt-1 font-serif text-lg font-semibold uppercase tracking-[0.22em] text-[#FDF8EE]">
                  December
                </span>
                <span className="text-sm font-medium tracking-[0.25em] text-[#E6C687]">
                  2026
                </span>
                <span className="mt-1.5 rounded-full border border-[#E6C687]/45 bg-[#E6C687]/15 px-3 py-0.5 text-xs tracking-[0.2em] text-[#FFF4DC]">
                  8:26 PM
                </span>
              </div>
            </div>

            {/* Crisp Gold Heart Border */}
            <svg
              viewBox="0 0 200 190"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full drop-shadow-[0_0_12px_rgba(230,198,135,0.45)]"
              aria-hidden="true"
            >
              <path
                d={HEART_PATH_D}
                fill="none"
                stroke="rgba(235, 203, 139, 0.92)"
                strokeWidth="1.8"
              />
            </svg>

            {/* Real Foil Scratch Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 touch-none"
              style={{
                cursor: revealed ? 'default' : isScratching ? 'grabbing' : 'grab',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="img"
              aria-label="Scratch the heart to reveal Saturday, December 12, 2026 at 8:26 PM"
            />

            {/* Golden Sparkles on Scratch */}
            {sparkles.map((sp) => (
              <span
                key={sp.id}
                className="pointer-events-none absolute z-30 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE8AE] shadow-[0_0_10px_#F6D07C]"
                style={{
                  left: `${sp.x}px`,
                  top: `${sp.y}px`,
                  animation: 'sparklePop 0.45s ease-out forwards',
                }}
              />
            ))}
          </div>

          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#E6C687]/85">
            {revealed
              ? 'Date Unlocked ✨'
              : progress > 0.04
              ? `Scratching... ${Math.min(99, Math.round(progress * 100))}%`
              : 'Rub your finger or cursor on the heart'}
          </p>
        </motion.div>

        {/* Timer appears ONLY after scratch is completed */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="countdown-section"
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="mt-9 flex w-full flex-col items-center"
            >
              <h2 className="font-serif text-3xl italic font-normal leading-snug text-[#FFFDF9] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:text-4xl">
                The Countdown <br /> Begins
              </h2>

              <div className="mt-5 grid w-full max-w-[345px] grid-cols-4 gap-2.5">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-xl border border-[#E6C687]/50 bg-[#081A14]/85 py-3 shadow-[0_0_22px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                  >
                    <span className="font-serif text-2xl font-semibold tracking-wider text-[#FFFDF9] sm:text-3xl">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#E6C687]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes floatGlow {
          0%, 100% {
            transform: translateY(0px) scale(0.95);
            opacity: 0.65;
          }
          50% {
            transform: translateY(-6px) scale(1.12);
            opacity: 1;
          }
        }

        @keyframes sparklePop {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -140%) scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}