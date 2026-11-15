import { Svg, Face, INK } from './Svg';
// Face is used by LunarModule and Dawn
import { Astronaut } from './people';

/* ---------- Falcon (Apollo 15) & Eagle (Apollo 11) lunar landers ---------- */
type LMProps = {
  variant?: 'falcon' | 'eagle';
  part?: 'full' | 'top' | 'bottom';
  sleepy?: boolean;
  vb?: string;
};

export function LunarModule({ variant = 'falcon', part = 'full', sleepy = false, vb = '0 0 200 220' }: LMProps) {
  const falcon = variant === 'falcon';
  const foil = falcon ? '#f7c948' : '#7fc8f8';
  const foil2 = falcon ? '#e39b1f' : '#4f9bd9';
  const cabin = falcon ? '#f1f3fb' : '#fff3d6';
  const showTop = part !== 'bottom';
  const showBottom = part !== 'top';
  const legs = 'M62 150 L24 204 M138 150 L176 204';
  return (
    <Svg vb={vb}>
      {showBottom && (
        <g>
          <path d={legs} fill="none" stroke={INK} strokeWidth={13} />
          <path d={legs} fill="none" stroke="#d6d9ec" strokeWidth={6} />
          <ellipse cx="20" cy="206" rx="21" ry="7" fill="#d6d9ec" />
          <ellipse cx="180" cy="206" rx="21" ry="7" fill="#d6d9ec" />
          <path d="M88 172 L83 192 H117 L112 172 Z" fill="#5a4a72" />
          <path d="M42 128 H158 L150 172 H50 Z" fill={foil} />
          <path d="M58 138 L66 164 M138 138 L134 164 M80 136 L82 166 M120 136 L118 166" stroke={foil2} strokeWidth={3.5} fill="none" />
          {part === 'bottom' && <Face cx={100} y={146} gap={19} r={7} closed={sleepy} beak={!falcon} cheeks />}
        </g>
      )}
      {showTop && (
        <g>
          <rect x="47" y="84" width="16" height="26" rx="5" fill="#5a4a72" />
          <rect x="137" y="84" width="16" height="26" rx="5" fill="#5a4a72" />
          <path d="M100 46 V24" fill="none" />
          <circle cx="100" cy="20" r="8" fill="#ff7a8a" />
          <path d="M62 64 Q62 44 84 44 H116 Q138 44 138 64 V120 Q138 134 124 134 H76 Q62 134 62 120 Z" fill={cabin} />
          <path d="M70 118 Q70 126 78 126" stroke="#d6d9ec" strokeWidth={4} fill="none" />
          <Face cx={100} y={80} gap={18} r={10} closed={sleepy} beak={!falcon} />
        </g>
      )}
    </Svg>
  );
}

/* ---------- Mothership ---------- */
export function Mothership() {
  return (
    <Svg vb="0 0 260 130">
      <path d="M140 38 V12" fill="none" />
      <ellipse cx="140" cy="10" rx="20" ry="7" fill="#fff" />
      <path d="M190 48 L234 28 V100 L190 80 Z" fill="#8d86ad" />
      <rect x="70" y="34" width="124" height="60" rx="8" fill="#fff6e0" />
      <rect x="104" y="34" width="16" height="60" fill="#ffb37a" />
      <rect x="150" y="34" width="10" height="60" fill="#ffb37a" />
      <path d="M8 64 Q8 56 22 50 L70 34 V94 L22 78 Q8 72 8 64 Z" fill="#f1f3fb" />
      <circle cx="42" cy="64" r="9" fill="#8ed3ff" />
    </Svg>
  );
}

/* ---------- Moon Buggy ---------- */
export function Buggy({ crew = false, drive = false }: { crew?: boolean; drive?: boolean }) {
  return (
    <div className="relative">
      {crew && (
        <>
          <div className="absolute" style={{ left: '27%', bottom: '41.1%', width: '17%' }}>
            <Astronaut accent="#ff6b6b" mood="happy" />
          </div>
          <div className="absolute" style={{ left: '48%', bottom: '41.1%', width: '17%' }}>
            <Astronaut accent="#4da3ff" mood="happy" />
          </div>
        </>
      )}
      <Svg vb="0 0 260 158" className={drive ? 'driving' : ''}>
        <path d="M205 84 V28" fill="none" />
        <path d="M184 22 Q205 54 226 22 Z" fill="#fff" />
        <path d="M168 84 V58 H150" fill="none" />
        <rect x="26" y="56" width="26" height="20" rx="5" fill="#dfe3f5" />
        <circle cx="39" cy="66" r="6" fill="#8ed3ff" />
        <path d="M30 84 H232 L220 102 H44 Z" fill="#dfe3f5" />
        {[66, 196].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="112" r="30" fill="#cfd3e6" />
            <circle cx={cx} cy="112" r="20" fill="#8d86ad" strokeWidth={3} />
            <g className="wheel" style={{ transformBox: 'view-box', transformOrigin: `${cx}px 112px` }}>
              <path
                d={`M${cx} 94 V130 M${cx - 18} 112 H${cx + 18} M${cx - 13} 99 L${cx + 13} 125 M${cx + 13} 99 L${cx - 13} 125`}
                strokeWidth={3}
                fill="none"
              />
              <circle cx={cx} cy="112" r="6" fill="#fff" />
            </g>
          </g>
        ))}
        <rect x="82" y="52" width="16" height="34" rx="6" fill="#ffe9b0" />
        <rect x="82" y="72" width="38" height="12" rx="5" fill="#ffe9b0" />
        <rect x="130" y="52" width="16" height="34" rx="6" fill="#ffe9b0" />
        <rect x="130" y="72" width="38" height="12" rx="5" fill="#ffe9b0" />
      </Svg>
    </div>
  );
}

/* ---------- Dawn (robot explorer) ---------- */
type DawnProps = { dim?: boolean; droop?: boolean; sleep?: boolean; glow?: boolean; vb?: string };
export function Dawn({ dim, droop, sleep, glow, vb = '0 0 320 175' }: DawnProps) {
  const panel = dim ? '#8ea6c4' : '#5da9e9';
  const grid = (x: number) => (
    <g stroke="#fff" strokeOpacity=".7" strokeWidth={2.5} fill="none">
      <path d={`M${x + 25} 50 V120 M${x + 50} 50 V120 M${x + 75} 50 V120 M${x} 73 H${x + 100} M${x} 96 H${x + 100}`} />
    </g>
  );
  return (
    <Svg vb={vb}>
      <path d="M110 85 H130 M190 85 H210" fill="none" strokeWidth={7} />
      <rect x="10" y="50" width="100" height="70" rx="5" fill={panel} />
      {grid(10)}
      <rect x="210" y="50" width="100" height="70" rx="5" fill={panel} />
      {grid(210)}
      {glow && <ellipse cx="160" cy="148" rx="11" ry="18" fill="#7fe7ff" opacity=".85" stroke="none" />}
      <rect x="146" y="118" width="28" height="14" rx="4" fill="#5a4a72" />
      <g transform={droop ? 'rotate(-38 160 60)' : undefined}>
        <path d="M160 62 V44" fill="none" />
        <path d="M130 62 Q160 12 190 62 Z" fill="#fff" />
        <circle cx="160" cy="40" r="5" fill="#ff7a8a" />
      </g>
      <rect x="125" y="60" width="70" height="60" rx="15" fill={dim ? '#e3c775' : '#f7c948'} />
      <Face cx={160} y={82} gap={17} r={7} closed={sleep} sad={droop && !sleep} />
    </Svg>
  );
}

/* ---------- Perseverance rover ---------- */
export function Rover({ carry = false, drive = false }: { carry?: boolean; drive?: boolean }) {
  return (
    <Svg vb="-4 -4 298 188" className={drive ? 'driving' : ''}>
      <path d="M34 92 L8 112 L20 134" fill="none" stroke={INK} strokeWidth={13} />
      <path d="M34 92 L8 112 L20 134" fill="none" stroke="#8d86ad" strokeWidth={6} />
      <path d="M215 72 V38" fill="none" strokeWidth={8} />
      <rect x="190" y="6" width="58" height="34" rx="12" fill="#fff" />
      <circle cx="207" cy="23" r="9" fill="#fff" />
      <circle cx="231" cy="23" r="9" fill="#fff" />
      <circle cx="209" cy="24" r="4.5" fill={INK} stroke="none" />
      <circle cx="233" cy="24" r="4.5" fill={INK} stroke="none" />
      <rect x="30" y="68" width="226" height="52" rx="14" fill="#fff6e0" />
      <rect x="46" y="54" width="110" height="20" rx="7" fill="#dfe3f5" />
      <rect x="236" y="62" width="30" height="16" rx="5" fill="#8d86ad" />
      {carry && (
        <g>
          <rect x="96" y="116" width="76" height="16" rx="8" fill="#ffb6c8" />
          <circle cx="116" cy="124" r="2.5" fill={INK} stroke="none" />
          <circle cx="152" cy="124" r="2.5" fill={INK} stroke="none" />
        </g>
      )}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const cx = 46 + i * 40;
        return (
          <g key={i}>
            <circle cx={cx} cy="146" r="18" fill="#6b6580" />
            <g className="wheel" style={{ transformBox: 'view-box', transformOrigin: `${cx}px 146px` }}>
              <path d={`M${cx} 132 V160 M${cx - 14} 146 H${cx + 14}`} strokeWidth={3} fill="none" />
              <circle cx={cx} cy="146" r="7" fill="#e8e4f5" strokeWidth={3} />
            </g>
          </g>
        );
      })}
    </Svg>
  );
}

/* ---------- Ingenuity helicopter "Ginny" ---------- */
export function Ginny({ broken = false, spin = false, vb = '0 0 160 190' }: { broken?: boolean; spin?: boolean; vb?: string }) {
  return (
    <Svg vb={vb} className={spin ? 'spin-on' : ''}>
      <g transform={broken ? 'rotate(7 80 175)' : undefined}>
        <path d="M54 122 L32 176 M106 122 L128 176" fill="none" stroke={INK} strokeWidth={12} />
        <path d="M54 122 L32 176 M106 122 L128 176" fill="none" stroke="#d6d9ec" strokeWidth={5} />
        <ellipse cx="30" cy="178" rx="12" ry="5" fill="#d6d9ec" />
        <ellipse cx="130" cy="178" rx="12" ry="5" fill="#d6d9ec" />
        <path d="M80 26 V64" fill="none" strokeWidth={7} />
        {broken ? (
          <g>
            <path d="M10 44 H62 L66 40 L60 52 H10" fill="#fff6e0" />
            <path d="M80 44 H150 Q156 44 156 38 Q156 32 150 32 H80 Z" fill="#fff6e0" />
          </g>
        ) : (
          <g className="rotor">
            <ellipse cx="80" cy="40" rx="74" ry="8" fill="#fff6e0" />
            <ellipse cx="80" cy="54" rx="64" ry="6.5" fill="#ffe9b0" />
          </g>
        )}
        <rect x="40" y="6" width="80" height="16" rx="4" fill={broken ? '#6b9bd2' : '#3f8fd8'} />
        <path d="M60 6 V22 M80 6 V22 M100 6 V22" stroke="#fff" strokeOpacity=".7" strokeWidth={2.5} fill="none" />
        <rect x="48" y="64" width="64" height="62" rx="16" fill="#ffe08a" />
        <Face cx={80} y={92} gap={14} r={7} sad={broken} />
      </g>
      {broken && (
        <g transform="rotate(-12 135 184)">
          <ellipse cx="128" cy="186" rx="34" ry="6" fill="#fff6e0" />
        </g>
      )}
    </Svg>
  );
}

/* ---------- Satellite ---------- */
export function Satellite() {
  return (
    <Svg vb="0 0 200 130">
      <path d="M100 38 V18" fill="none" />
      <path d="M84 18 Q100 -4 116 18 Z" fill="#fff" />
      <path d="M60 65 H70 M130 65 H140" fill="none" strokeWidth={7} />
      <rect x="4" y="46" width="58" height="36" rx="4" fill="#5da9e9" />
      <rect x="138" y="46" width="58" height="36" rx="4" fill="#5da9e9" />
      <path d="M23 46 V82 M42 46 V82 M4 64 H62 M157 46 V82 M176 46 V82 M138 64 H196" stroke="#fff" strokeOpacity=".7" strokeWidth={2.5} fill="none" />
      <rect x="68" y="38" width="64" height="54" rx="12" fill="#dfe3f5" />
      <circle cx="100" cy="66" r="16" fill="#8ed3ff" />
      <circle cx="100" cy="66" r="7" fill={INK} stroke="none" />
      <circle cx="95" cy="61" r="2.5" fill="#fff" stroke="none" />
    </Svg>
  );
}
