import { INK } from './art/Svg';
import { Earth, Asteroid } from './art/worlds';

export type BgKey = 'space' | 'moon' | 'moonMtn' | 'belt' | 'mars' | 'marsDunes' | 'marsDawn';

const rnd = (n: number, i: number) => {
  const x = Math.sin(n * 127.1 + i * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: rnd(1, i) * 100,
  y: rnd(2, i) * 72,
  s: rnd(3, i) * 2.6 + 1.2,
  d: rnd(4, i) * 4,
  big: rnd(5, i) > 0.88,
}));

const BELT_ROCKS = Array.from({ length: 13 }, (_, i) => ({
  x: rnd(7, i) * 100,
  y: 6 + rnd(8, i) * 62,
  w: 2.5 + rnd(9, i) * 6,
  k: i % 4,
  d: -rnd(10, i) * 14,
}));

type Palette = { sky: string; back: string; main: string; crater: string; light: string };
const PAL: Record<'moon' | 'mars', Palette> = {
  moon: { sky: '', back: '#b9b0d3', main: '#e9e3d6', crater: '#cfc7b5', light: '#f6f1e6' },
  mars: { sky: '', back: '#c96b4a', main: '#e98c5c', crater: '#cf6f4b', light: '#f6a373' },
};

function Ground({ kind, canyon, dunes }: { kind: 'moon' | 'mars'; canyon?: boolean; dunes?: boolean }) {
  const c = PAL[kind];
  return (
    <svg className="absolute bottom-0 left-0 w-full" style={{ height: '48%' }} viewBox="0 0 1600 430" preserveAspectRatio="none" aria-hidden="true">
      <g filter="url(#crayon)" stroke={INK} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
        <path d="M-10 90 Q220 10 450 62 T900 52 T1300 32 T1610 62 V440 H-10Z" fill={c.back} />
        {dunes && (
          <>
            <path d="M-10 120 Q150 40 330 110 Q420 140 520 100 T-10 120Z" fill={c.light} />
            <path d="M880 108 Q1060 30 1240 100 Q1330 132 1420 96 Q1500 70 1610 100 V130 H880Z" fill={c.light} />
          </>
        )}
        {canyon && (
          <>
            <ellipse cx="1250" cy="128" rx="330" ry="36" fill={c.light} />
            <ellipse cx="1250" cy="136" rx="290" ry="30" fill="#8a7cab" />
            <ellipse cx="1250" cy="146" rx="230" ry="22" fill="#5b4c80" />
            <ellipse cx="1250" cy="156" rx="150" ry="13" fill="#3b2f5e" />
          </>
        )}
        <path d="M-10 128 Q300 76 620 118 T1200 106 T1610 122 V440 H-10Z" fill={c.main} />
        {dunes && <path d="M-10 190 Q250 150 520 200 T1050 190 T1610 210" fill="none" stroke={c.crater} strokeWidth={9} />}
        <ellipse cx="260" cy="300" rx="110" ry="24" fill={c.crater} strokeWidth={4} />
        <ellipse cx="900" cy="350" rx="140" ry="28" fill={c.crater} strokeWidth={4} />
        <ellipse cx="1380" cy="290" rx="70" ry="17" fill={c.crater} strokeWidth={4} />
        <ellipse cx="620" cy="250" rx="46" ry="11" fill={c.crater} strokeWidth={4} />
      </g>
    </svg>
  );
}

function Mountains() {
  return (
    <svg className="absolute left-0 w-full" style={{ bottom: '38%', height: '34%' }} viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true">
      <g filter="url(#crayon)" stroke={INK} strokeWidth={5} strokeLinejoin="round">
        <path d="M-10 310 L-10 150 L110 40 L210 120 L340 6 L490 150 L580 96 L720 310Z" fill="#cfc7e3" />
        <path d="M340 6 L420 90 L370 84 L340 120 L310 80 L270 90Z" fill="#fff" strokeWidth={4} />
        <path d="M110 40 L160 90 L120 86 L90 100 L70 70Z" fill="#fff" strokeWidth={4} />
        <path d="M1180 310 L1300 130 L1390 190 L1500 80 L1610 150 V310Z" fill="#c1b8dc" />
        <path d="M1500 80 L1560 130 L1520 124 L1490 142 L1460 116Z" fill="#fff" strokeWidth={4} />
      </g>
    </svg>
  );
}

const SKY: Record<BgKey, string> = {
  space: 'linear-gradient(#120d36, #2d2170)',
  moon: 'linear-gradient(#0f0b2e, #2b2168 70%, #3d2f86)',
  moonMtn: 'linear-gradient(#0f0b2e, #2b2168 70%, #3d2f86)',
  belt: 'linear-gradient(#1a0f3d, #3b1f72 70%, #5a2f86)',
  mars: 'linear-gradient(#e9a070, #f8cf9c 62%, #ffe3b8)',
  marsDunes: 'linear-gradient(#e49a6c, #f6c796 62%, #ffe0b0)',
  marsDawn: 'linear-gradient(#4d3a8c, #b26a9a 40%, #ff9e7a 72%, #ffd89b)',
};

export default function Background({ bg }: { bg: BgKey }) {
  const night = bg === 'space' || bg === 'moon' || bg === 'moonMtn' || bg === 'belt';
  const isMoon = bg === 'moon' || bg === 'moonMtn';
  const isMars = bg === 'mars' || bg === 'marsDunes' || bg === 'marsDawn';
  return (
    <div key={bg} className="a-fadein absolute inset-0 overflow-hidden" style={{ background: SKY[bg] }}>
      <div className="hatch" />
      {(night || bg === 'marsDawn') && (
        <div style={{ opacity: night ? 1 : 0.45 }}>
          {STARS.map((s, i) =>
            s.big ? (
              <svg key={i} className="star-big" viewBox="0 0 100 100" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `calc(var(--u) * ${s.s * 0.55})`, animationDelay: `${s.d}s` }}>
                <path d="M50 4 Q56 44 96 50 Q56 56 50 96 Q44 56 4 50 Q44 44 50 4Z" fill="#fff6b0" />
              </svg>
            ) : (
              <span key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `calc(var(--u) * ${s.s * 0.2})`, height: `calc(var(--u) * ${s.s * 0.2})`, animationDelay: `${s.d}s` }} />
            ),
          )}
        </div>
      )}

      {bg === 'belt' &&
        BELT_ROCKS.map((r, i) => (
          <div key={i} className="a-drift-slow absolute" style={{ left: `${r.x}%`, top: `${r.y}%`, width: `calc(var(--u) * ${r.w})`, animationDelay: `${r.d}s`, opacity: 0.9 }}>
            <Asteroid shape={r.k} />
          </div>
        ))}

      {isMoon && (
        <div className="a-float absolute" style={{ right: '9%', top: '9%', width: 'calc(var(--u) * 8)' }}>
          <Earth face />
        </div>
      )}
      {bg === 'moonMtn' && <Mountains />}
      {isMoon && <Ground kind="moon" canyon={bg === 'moonMtn'} />}

      {isMars && (
        <div
          className="absolute rounded-full"
          style={
            bg === 'marsDawn'
              ? { left: '22%', bottom: '36%', width: 'calc(var(--u) * 14)', height: 'calc(var(--u) * 14)', background: 'radial-gradient(circle, #fff2b8 30%, rgba(255,214,140,.5) 55%, transparent 72%)' }
              : { right: '12%', top: '8%', width: 'calc(var(--u) * 9)', height: 'calc(var(--u) * 9)', background: 'radial-gradient(circle, #fff6c8 38%, rgba(255,240,180,.55) 60%, transparent 72%)' }
          }
        />
      )}
      {isMars && <Ground kind="mars" dunes={bg !== 'mars'} />}
    </div>
  );
}

