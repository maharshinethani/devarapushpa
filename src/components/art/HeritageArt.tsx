import type { CSSProperties } from 'react';

/* Original SVG artwork for the cinematic scenes. Everything is hand-drawn
   in code — no external image is required for the experience to run. */

const deep = '#063B2F';
const emerald = '#0B4F3A';
const forest = '#082C25';
const darkest = '#041F1A';
const cream = '#F8F1E3';
const gold = '#C6A15B';
const goldSoft = '#D9BC85';
const goldDim = 'rgba(198,161,91,0.4)';

function Sky({ glow = 0.9 }: { glow?: number }) {
  return (
    <>
      <defs>
        <radialGradient id="sky" cx="50%" cy="38%" r="80%">
          <stop offset="0%" stopColor="#1A5C48" />
          <stop offset="55%" stopColor={emerald} />
          <stop offset="100%" stopColor={darkest} />
        </radialGradient>
        <radialGradient id="moonglow" cx="50%" cy="30%" r="45%">
          <stop offset="0%" stopColor={`rgba(248,241,227,${0.5 * glow})`} />
          <stop offset="100%" stopColor="rgba(248,241,227,0)" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={forest} />
          <stop offset="100%" stopColor={darkest} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sky)" />
      <circle cx="50%" cy="30%" r="42%" fill="url(#moonglow)" />
      <circle cx="50%" cy="30%" r="5.5" fill={cream} opacity="0.9" />
      <circle cx="50%" cy="30%" r="8" fill="none" stroke={goldSoft} strokeWidth="0.5" opacity="0.6" />
      <rect y="78%" width="100%" height="22%" fill="url(#ground)" />
    </>
  );
}

function Stars() {
  const pts: Array<[number, number, number]> = [
    [8, 12, 1], [15, 22, 0.6], [23, 8, 1.2], [31, 18, 0.7], [40, 6, 0.9],
    [58, 10, 0.7], [67, 20, 1.1], [76, 7, 0.8], [84, 16, 1], [91, 24, 0.6],
    [12, 32, 0.5], [88, 34, 0.5], [48, 14, 0.6],
  ];
  return (
    <g>
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r * 0.35} fill={cream} opacity="0.55">
          <animate
            attributeName="opacity"
            values="0.2;0.65;0.2"
            dur={`${3 + (i % 4)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  );
}

export function Diya({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="9" ry="4" fill="#5A3A1E" />
      <ellipse cx="0" cy="-1.5" rx="9" ry="4" fill="#3A2512" />
      <path d="M 0 -6 Q 3.2 -11 0 -15 Q -3.2 -11 0 -6" fill={goldSoft} className="animate-flame">
        <animate attributeName="d" dur="2.2s" repeatCount="indefinite"
          values="M 0 -6 Q 3.2 -11 0 -15 Q -3.2 -11 0 -6;
                  M 0 -6 Q 2.6 -10 0 -16.5 Q -2.8 -10.5 0 -6;
                  M 0 -6 Q 3.2 -11 0 -15 Q -3.2 -11 0 -6" />
      </path>
      <circle cx="0" cy="-9" r="13" fill={gold} opacity="0.14" />
      <circle cx="0" cy="-9" r="24" fill={gold} opacity="0.06" />
    </g>
  );
}

function MarigoldGarland({ y }: { y: number }) {
  const garland = (x0: number, x1: number, cy: number, sag: number, key: string) => {
    const items = [];
    const n = 9;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = x0 + (x1 - x0) * t;
      const yy = cy + Math.sin(t * Math.PI) * sag;
      items.push(
        <g key={`${key}-${i}`}>
          <circle cx={x} cy={yy} r="4.2" fill="#C97B2E" />
          <circle cx={x} cy={yy - 1.2} r="2.4" fill="#E8A44A" />
          {i % 3 === 1 && <circle cx={x} cy={yy} r="1.4" fill={cream} />}
        </g>,
      );
    }
    return <g key={key}>{items}</g>;
  };
  return (
    <g>
      {garland(2, 98, y, 6, 'l1')}
      {garland(2, 98, y + 7, 4.5, 'l2')}
    </g>
  );
}

function BananaLeaves({ x, y, flip = 1 }: { x: number; y: number; flip?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
      <path d="M0 0 C -14 -30 -18 -62 -6 -92 C 8 -66 10 -32 0 0" fill="#0E5A3C" />
      <path d="M0 -4 C -8 -30 -11 -58 -4 -84" stroke="#0A4028" strokeWidth="1.4" fill="none" />
      <path d="M2 0 C 14 -26 20 -54 12 -80" stroke="#0E5A3C" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

function PalmSilhouette({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={darkest} opacity="0.75">
      <path d="M0 0 C -2 -40 -2 -70 1 -95" stroke={darkest} strokeWidth="3.5" fill="none" />
      {[-70, -40, -8, 20, 48].map((a, i) => (
        <path key={i} d={`M1 -95 C ${14 + a / 6} -${104 + Math.abs(a) / 3} ${30 + a / 3} -${98 + Math.abs(a) / 4} ${40 + a / 2} -${92 + Math.abs(a) / 6}`}
          stroke={darkest} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
}

function TempleGopuram({ x, y, s = 1, opacity = 1 }: { x: number; y: number; s?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <path d={`M -46 0 L -34 -${38} L -22 -${38} L -22 -${46} L -10 -${46} L -6 -${58} L 6 -${58} L 10 -${46} L 22 -${46} L 22 -${38} L 34 -${38} L 46 0 Z`}
        fill={forest} stroke={goldDim} strokeWidth="1" />
      {[-28, -14, 0, 14, 28].map((dx, i) => (
        <rect key={i} x={dx - 2.4} y={-16} width="4.8" height="16" fill={darkest} />
      ))}
      {[-32, -18, -4, 10, 24].map((dx, i) => (
        <rect key={i} x={dx} y={-30} width="5.5" height="9" fill={darkest} opacity="0.85" />
      ))}
      <circle cx="0" cy="-63" r="3" fill={goldSoft} />
      <path d="M0 -70 L 0 -60" stroke={goldSoft} strokeWidth="1" />
    </g>
  );
}

function Rangoli({ x, y, r = 40, opacity = 0.8 }: { x: number; y: number; r?: number; opacity?: number }) {
  const petals = 12;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      {Array.from({ length: petals }).map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals) * i})`}>
          <ellipse cx="0" cy={-r * 0.55} rx={r * 0.14} ry={r * 0.4} fill="none" stroke={gold} strokeWidth="0.8" />
          <circle cx="0" cy={-r * 0.88} r="1.6" fill="#C97B2E" opacity="0.8" />
        </g>
      ))}
      <circle r={r * 0.18} fill="none" stroke={gold} strokeWidth="0.8" />
      <circle r={r * 0.05} fill={gold} opacity="0.7" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 0 — Cinematic opening: heritage temple courtyard at dusk      */
/* ------------------------------------------------------------------ */
export function OpeningSceneArt({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className={className} style={style} aria-hidden="true">
      <Sky glow={1} />
      <Stars />
      {/* distant temple silhouettes */}
      <TempleGopuram x={140} y={560} s={1.5} opacity={0.5} />
      <TempleGopuram x={860} y={565} s={1.3} opacity={0.45} />
      <PalmSilhouette x={80} y={600} s={1.1} />
      <PalmSilhouette x={930} y={610} s={0.9} />
      {/* main shrine */}
      <g>
        <rect x="380" y="420" width="240" height="200" fill={forest} stroke={goldDim} strokeWidth="1.5" />
        <path d="M 350 420 L 380 330 L 620 330 L 650 420 Z" fill={emerald} stroke={goldDim} strokeWidth="1.5" />
        <path d="M 420 330 L 435 300 L 565 300 L 580 330 Z" fill={forest} stroke={goldDim} strokeWidth="1" />
        <path d="M 460 300 L 470 268 L 530 268 L 540 300 Z" fill={emerald} stroke={goldDim} strokeWidth="1" />
        <circle cx="500" cy="252" r="8" fill={goldSoft} />
        <path d="M 500 232 L 500 246" stroke={goldSoft} strokeWidth="2" />
        {/* doorway glow */}
        <rect x="470" y="520" width="60" height="100" rx="30" fill="#F5DFA8" opacity="0.95" />
        <rect x="480" y="535" width="40" height="85" rx="20" fill="#FCEFC9" />
        <circle cx="500" cy="575" r="45" fill={gold} opacity="0.18" />
        {/* pillars */}
        {[365, 628].map((px, i) => (
          <g key={i}>
            <rect x={px} y="430" width="10" height="190" fill={darkest} />
            <rect x={px - 3} y="424" width="16" height="8" fill={forest} />
          </g>
        ))}
      </g>
      <MarigoldGarland y={330} />
      <BananaLeaves x={330} y={620} flip={-1} />
      <BananaLeaves x={672} y={620} />
      <Diya x={352} y={648} s={1.3} />
      <Diya x={648} y={648} s={1.3} />
      <Rangoli x={500} y={668} r={34} opacity={0.55} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 1 — Royal wedding doors                                       */
/* ------------------------------------------------------------------ */
export function DoorPanelArt({ side }: { side: 'left' | 'right' }) {
  const flip = side === 'right' ? -1 : 1;
  return (
    <svg viewBox="0 0 120 400" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`wood-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#123A2E" />
          <stop offset="50%" stopColor="#0D3127" />
          <stop offset="100%" stopColor="#082C25" />
        </linearGradient>
        <linearGradient id={`sheen-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(248,241,227,0.1)" />
          <stop offset="30%" stopColor="rgba(248,241,227,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
      </defs>
      <rect width="120" height="400" fill={`url(#wood-${side})`} />
      {/* carved vertical panels */}
      {[70, 160, 250].map((py) => (
        <g key={py} transform={`translate(60 ${py})`}>
          <rect x="-38" y="-30" width="76" height="60" rx="4" fill="none" stroke={goldDim} strokeWidth="1" />
          <rect x="-31" y="-24" width="62" height="48" rx="3" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.8" />
          {py === 160 && (
            <g transform={`scale(${flip} 1)`} opacity="0.9">
              {/* lotus motif */}
              <path d="M0 -18 C 6 -12 7 -4 0 2 C -7 -4 -6 -12 0 -18" fill="none" stroke={gold} strokeWidth="1" />
              <path d="M0 2 C 10 0 16 6 14 14 C 4 14 -2 8 0 2" fill="none" stroke={gold} strokeWidth="0.8" />
              <path d="M0 2 C -10 0 -16 6 -14 14 C -4 14 2 8 0 2" fill="none" stroke={gold} strokeWidth="0.8" />
              <circle cx="0" cy="4" r="1.6" fill={gold} />
            </g>
          )}
          {py === 70 && (
            <g stroke={gold} strokeWidth="0.8" fill="none" opacity="0.85">
              {/* paisley */}
              <path d="M -4 12 C -18 4 -14 -16 2 -14 C 12 -12 12 2 2 2 C -6 2 -8 -6 0 -8" transform={`scale(${flip} 1)`} />
            </g>
          )}
          {py === 250 && (
            <g stroke={gold} strokeWidth="0.8" fill="none" opacity="0.85">
              <circle cx="0" cy="0" r="12" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="0" y1="-12" x2="0" y2="-16" transform={`rotate(${i * 45})`} />
              ))}
            </g>
          )}
        </g>
      ))}
      <rect width="120" height="400" fill={`url(#sheen-${side})`} />
      <rect x="0" y="0" width="6" height="400" fill={darkest} opacity="0.6" />
    </svg>
  );
}

export function DoorFrameArt() {
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <path d="M0 60 L0 14 Q 50 -10 100 14 L100 60 L 88 60 L 88 18 Q 50 0 12 18 L12 60 Z" fill="#0D3127" stroke={goldDim} strokeWidth="0.4" />
      <path d="M12 60 L12 18 Q 50 0 88 18 L88 60" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/* Brass bell hanging in the arch */
export function BrassBell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={className} aria-hidden="true">
      <line x1="12" y1="0" x2="12" y2="6" stroke={gold} strokeWidth="1" />
      <path d="M12 6 L 18 22 Q 19 26 12 26 Q 5 26 6 22 Z" fill={gold} stroke={goldSoft} strokeWidth="0.5" />
      <circle cx="12" cy="29" r="2.2" fill={goldSoft} />
      <ellipse cx="12" cy="34" rx="3" ry="1.2" fill={goldSoft} opacity="0.7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Album artwork — five original editorial "photographs"               */
/* ------------------------------------------------------------------ */
function AlbumVignette({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Sky glow={0.75} />
      <Stars />
      {children}
      <rect width="1000" height="700" fill="url(#vignette)" />
      <defs>
        <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="rgba(4,31,26,0)" />
          <stop offset="100%" stopColor="rgba(4,31,26,0.75)" />
        </radialGradient>
      </defs>
    </>
  );
}

function CoupleSilhouette({ x = 500, y = 470, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={darkest}>
      {/* bride */}
      <g>
        <circle cx="-26" cy="-118" r="17" />
        <path d="M-26 -101 C -8 -92 -2 -60 -4 -18 L -50 -18 C -54 -60 -46 -92 -26 -101" />
        <path d="M-26 -100 C -44 -84 -52 -46 -50 -18 L -62 -18 C -66 -58 -52 -96 -26 -100" opacity="0.85" />
        <path d="M-40 -128 Q -26 -138 -12 -126 L -14 -104 Q -26 -112 -38 -104 Z" fill="#0A0604" />
        <circle cx="-26" cy="-64" r="30" fill="#0A0604" opacity="0.12" />
      </g>
      {/* groom */}
      <g>
        <circle cx="28" cy="-122" r="17" />
        <path d="M28 -105 C 46 -96 54 -60 52 -18 L 6 -18 C 4 -60 12 -96 28 -105" />
        <path d="M12 -18 L 44 -18 L 44 -2 L 12 -2 Z" />
        <path d="M14 -140 Q 28 -148 42 -138 L 40 -110 Q 28 -118 16 -110 Z" fill="#0A0604" />
      </g>
      {/* joined hands */}
      <path d="M-8 -46 Q 1 -52 10 -46" stroke={darkest} strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* shadow pool */}
      <ellipse cx="0" cy="-6" rx="90" ry="10" fill="#0A0604" opacity="0.25" />
    </g>
  );
}

export function AlbumArtOne() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <AlbumVignette>
        <PalmSilhouette x={120} y={620} s={1.4} />
        <PalmSilhouette x={890} y={640} s={1.1} />
        <TempleGopuram x={500} y={430} s={2.6} opacity={0.65} />
        <CoupleSilhouette x={500} y={560} s={1.35} />
        <Rangoli x={500} y={640} r={40} opacity={0.5} />
        <Diya x={330} y={660} s={1.4} />
        <Diya x={670} y={660} s={1.4} />
      </AlbumVignette>
    </svg>
  );
}

export function AlbumArtTwo() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <AlbumVignette>
        <path d="M0 620 Q 250 560 500 610 T 1000 600 L 1000 700 L 0 700 Z" fill={forest} />
        <circle cx="700" cy="180" r="60" fill={cream} opacity="0.85" />
        <circle cx="700" cy="180" r="90" fill="none" stroke={goldDim} strokeWidth="1" />
        <CoupleSilhouette x={380} y={560} s={1.2} />
        <BananaLeaves x={120} y={640} flip={-1} />
        <BananaLeaves x={880} y={640} />
        <g transform="translate(760 420)">
          {[0, 1, 2].map((i) => <Diya key={i} x={i * 22 - 22} y={0} s={0.9} />)}
        </g>
      </AlbumVignette>
    </svg>
  );
}

export function AlbumArtThree() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <AlbumVignette>
        <rect x="300" y="160" width="400" height="420" fill="none" stroke={goldDim} strokeWidth="2" />
        <rect x="320" y="180" width="360" height="380" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
        <Mandala x={500} y={370} r={110} />
        <g transform="translate(500 430) scale(0.9)">
          <g transform="translate(-27 0)" fill={darkest}>
            <circle cx="0" cy="-100" r="15" />
            <path d="M0 -85 C 16 -76 22 -44 20 -8 L -20 -8 C -22 -44 -14 -76 0 -85" />
            <path d="M-14 -108 Q 0 -116 14 -106 L 12 -82 Q 0 -90 -12 -82 Z" fill="#0A0604" />
          </g>
          <g transform="translate(27 0)" fill={darkest}>
            <circle cx="0" cy="-104" r="15" />
            <path d="M0 -89 C 16 -80 22 -48 20 -8 L -20 -8 C -22 -48 -14 -80 0 -89" />
            <path d="M-14 -112 Q 0 -120 14 -110 L 12 -86 Q 0 -94 -12 -86 Z" fill="#0A0604" />
          </g>
        </g>
        <text x="500" y="620" textAnchor="middle" fill={goldSoft} fontSize="26" fontFamily="Georgia, serif" fontStyle="italic" opacity="0.8">
          two souls, one promise
        </text>
      </AlbumVignette>
    </svg>
  );
}

export function AlbumArtFour() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <AlbumVignette>
        <g opacity="0.9">
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 60 + ((i * 173) % 880);
            const y = 90 + ((i * 97) % 520);
            return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 7 : 4.5} fill={i % 2 ? '#C97B2E' : cream} opacity="0.5" />;
          })}
        </g>
        <path d="M 200 620 Q 500 460 800 620" fill="none" stroke={gold} strokeWidth="2" opacity="0.7" />
        <MarigoldGarland y={200} />
        <CoupleSilhouette x={500} y={580} s={1.25} />
        <Diya x={250} y={655} s={1.2} />
        <Diya x={750} y={655} s={1.2} />
      </AlbumVignette>
    </svg>
  );
}

export function AlbumArtFive() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <AlbumVignette>
        <circle cx="500" cy="300" r="150" fill="none" stroke={goldDim} strokeWidth="1.5" />
        <circle cx="500" cy="300" r="120" fill={emerald} opacity="0.6" />
        <Sunrise />
        <g transform="translate(500 520) scale(1.5)">
          <path d="M-8 -46 Q 1 -40 10 -46" stroke={darkest} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0" />
        </g>
        <CoupleSilhouette x={500} y={600} s={1.3} />
        <text x="500" y="655" textAnchor="middle" fill={cream} fontSize="24" fontFamily="Georgia, serif" letterSpacing="8" opacity="0.85">
          FOREVER BEGINS
        </text>
      </AlbumVignette>
    </svg>
  );
}

function Sunrise() {
  return (
    <g opacity="0.9">
      <circle cx="500" cy="300" r="58" fill="#E8B45A" />
      {[70, 90, 110].map((r, i) => (
        <path key={i} d={`M ${500 - r} 320 A ${r} ${r} 0 0 1 ${500 + r} 320`} fill="none" stroke={gold} strokeWidth="1.4" opacity={0.7 - i * 0.2} />
      ))}
      <g clipPath="url(#sr)">
        <rect x="380" y="300" width="240" height="90" fill={emerald} opacity="0.9" />
      </g>
      <defs>
        <clipPath id="sr">
          <rect x="380" y="302" width="240" height="90" />
        </clipPath>
      </defs>
    </g>
  );
}

function Mandala({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={gold} fill="none" opacity="0.7">
      <circle r={r} strokeWidth="1" />
      <circle r={r * 0.78} strokeWidth="0.6" strokeDasharray="2 4" />
      <circle r={r * 0.5} strokeWidth="0.8" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1="0" y1={-r * 0.5} x2="0" y2={-r} transform={`rotate(${i * 22.5})`} strokeWidth="0.5" opacity="0.6" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx="0" cy={-r * 0.64} r={r * 0.06} transform={`rotate(${i * 45})`} fill={goldSoft} stroke="none" />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable ornamental pieces                                          */
/* ------------------------------------------------------------------ */

export function OrnamentDivider({ className = '', light = true }: { className?: string; light?: boolean }) {
  const c = light ? gold : gold;
  return (
    <svg viewBox="0 0 300 24" className={className} aria-hidden="true" fill="none">
      <line x1="0" y1="12" x2="118" y2="12" stroke={c} strokeWidth="0.7" opacity="0.6" />
      <line x1="182" y1="12" x2="300" y2="12" stroke={c} strokeWidth="0.7" opacity="0.6" />
      <g transform="translate(150 12)">
        <path d="M0 -6 C 4 -3 4 3 0 6 C -4 3 -4 -3 0 -6" fill="none" stroke={c} strokeWidth="1" />
        <path d="M-12 0 C -9 -5 -5 -5 -2 0 M-12 0 C -9 5 -5 5 -2 0" fill="none" stroke={c} strokeWidth="0.7" />
        <path d="M12 0 C 9 -5 5 -5 2 0 M12 0 C 9 5 5 5 2 0" fill="none" stroke={c} strokeWidth="0.7" />
        <circle cx="0" cy="0" r="1.4" fill={c} />
      </g>
    </svg>
  );
}

export function LotusIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true" fill="none" stroke={gold} strokeWidth="1.2">
      <path d="M30 6 C 37 14 37 24 30 30 C 23 24 23 14 30 6" />
      <path d="M30 30 C 20 30 12 24 10 14 C 20 16 27 21 30 30" />
      <path d="M30 30 C 40 30 48 24 50 14 C 40 16 33 21 30 30" />
      <path d="M30 30 C 26 34 22 36 16 36 M30 30 C 34 34 38 36 44 36" strokeWidth="0.9" />
    </svg>
  );
}

export function KolamCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <g fill="none" stroke={gold} strokeWidth="0.8" opacity="0.55">
        <path d="M6 94 L 6 30 Q 6 6 30 6 L 94 6" />
        <path d="M14 94 L 14 34 Q 14 14 34 14 L 94 14" strokeWidth="0.5" />
        <circle cx="20" cy="20" r="2" fill={gold} stroke="none" opacity="0.7" />
        <path d="M26 30 C 22 22 30 18 32 26 C 34 32 28 34 26 30" />
        <circle cx="42" cy="18" r="1.5" fill="#C97B2E" stroke="none" opacity="0.8" />
      </g>
    </svg>
  );
}

export function TempleArchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden="true" fill="none" stroke={gold} strokeWidth="1.2">
      <path d="M10 56 L 10 26 Q 40 -4 70 26 L 70 56" />
      <path d="M20 56 L 20 30 Q 40 8 60 30 L 60 56" strokeWidth="0.7" />
      <circle cx="40" cy="12" r="2.4" />
      <path d="M40 4 L 40 9" strokeWidth="0.9" />
    </svg>
  );
}

/* Big soft light bloom used behind the doors while they open */
export function LightBloom({ intensity = 1 }: { intensity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 50% 60%, rgba(252,239,201,0.95) 0%, rgba(232,180,90,0.5) 30%, rgba(198,161,91,0.18) 55%, transparent 75%)',
        opacity: intensity,
      }}
      aria-hidden="true"
    />
  );
}
