import { Svg, INK } from './Svg';
import { Astronaut } from './people';

const pt = (cx: number, cy: number, r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;

export const Sparkle = ({ color = '#ffd84d' }: { color?: string }) => (
  <Svg vb="0 0 100 100" sw={4}>
    <path d="M50 6 Q56 44 94 50 Q56 56 50 94 Q44 56 6 50 Q44 44 50 6Z" fill={color} />
  </Svg>
);

export const Heart = () => (
  <Svg vb="0 0 100 100" sw={5}>
    <path d="M50 88 C10 58 10 20 34 17 C46 16 50 28 50 28 C50 28 54 16 66 17 C90 20 90 58 50 88Z" fill="#ff6b8a" />
    <path d="M26 34 Q30 26 38 28" stroke="#fff" strokeWidth={4} fill="none" />
  </Svg>
);

export const Star = () => (
  <Svg vb="0 0 100 100" sw={5}>
    <polygon points="50,6 62,38 96,38 68,58 79,92 50,72 21,92 32,58 4,38 38,38" fill="#ffd84d" />
  </Svg>
);

export function Boom({ text = 'BOOM!', color = '#ffb12e' }: { text?: string; color?: string }) {
  const pts = Array.from({ length: 16 }, (_, i) => pt(50, 50, i % 2 ? 36 : 49, (i * Math.PI) / 8)).join(' ');
  const size = Math.min(24, 118 / Math.max(text.length, 1));
  return (
    <Svg vb="0 0 100 100" sw={4}>
      <polygon points={pts} fill={color} />
      {text && (
        <text x="50" y={50 + size * 0.34} textAnchor="middle" fontFamily="Chewy, cursive" fontSize={size} fill="#fff" strokeWidth={3} paintOrder="stroke">
          {text}
        </text>
      )}
    </Svg>
  );
}

export const Flash = () => <Boom text="" color="#fff8c6" />;

export const QMark = () => (
  <Svg vb="0 0 100 100" sw={4}>
    <text x="50" y="86" textAnchor="middle" fontFamily="Chewy, cursive" fontSize="100" fill="#ffd84d" strokeWidth={5} paintOrder="stroke">
      ?
    </text>
  </Svg>
);

export const Zzz = () => (
  <Svg vb="0 0 100 100" sw={3}>
    <g fontFamily="Chewy, cursive" fill="#d8ecff" paintOrder="stroke" strokeWidth={4}>
      <text x="6" y="92" fontSize="48">Z</text>
      <text x="42" y="56" fontSize="36">z</text>
      <text x="70" y="28" fontSize="26">z</text>
    </g>
  </Svg>
);

export function Signal({ broken }: { broken?: boolean }) {
  const arc = (r: number) => `M${20 + r * 0.707} ${50 - r * 0.707} A${r} ${r} 0 0 1 ${20 + r * 0.707} ${50 + r * 0.707}`;
  return (
    <Svg vb="0 0 100 100" sw={4}>
      <circle cx="20" cy="50" r="7" fill="#ffd84d" />
      {[22, 40, 58].map((r) => (
        <path key={r} d={arc(r)} fill="none" strokeWidth={7} strokeDasharray={broken ? '2 12' : undefined} stroke={broken ? '#ff7a8a' : '#7fe7ff'} />
      ))}
      {broken && <path d="M70 34 L94 66 M94 34 L70 66" stroke="#ff4d5e" strokeWidth={9} fill="none" />}
    </Svg>
  );
}

export function Germ() {
  const spikes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return { x1: 50 + 24 * Math.cos(a), y1: 50 + 24 * Math.sin(a), x2: 50 + 40 * Math.cos(a), y2: 50 + 40 * Math.sin(a) };
  });
  return (
    <Svg vb="0 0 100 100" sw={4}>
      {spikes.map((s, i) => (
        <g key={i}>
          <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} strokeWidth={5} />
          <circle cx={s.x2} cy={s.y2} r="5" fill="#9be86b" />
        </g>
      ))}
      <circle cx="50" cy="50" r="27" fill="#7ddc6b" />
      <circle cx="41" cy="46" r="4.5" fill={INK} stroke="none" />
      <circle cx="59" cy="46" r="4.5" fill={INK} stroke="none" />
      <path d="M33 38 L46 42 M67 38 L54 42" strokeWidth={3.5} fill="none" />
      <path d="M41 63 Q50 55 59 63" fill="none" strokeWidth={4} />
    </Svg>
  );
}

export const NoSign = () => (
  <Svg vb="0 0 100 100">
    <g fill="none">
      <circle cx="50" cy="50" r="42" stroke={INK} strokeWidth={17} />
      <path d="M20 20 L80 80" stroke={INK} strokeWidth={17} />
      <circle cx="50" cy="50" r="42" stroke="#ff4d5e" strokeWidth={9} />
      <path d="M20 20 L80 80" stroke="#ff4d5e" strokeWidth={9} />
    </g>
  </Svg>
);

export const Drops = () => (
  <Svg vb="0 0 100 100" sw={4}>
    <path d="M32 10 Q58 46 32 70 Q6 46 32 10Z" fill="#6cc5ff" />
    <path d="M72 38 Q92 66 72 86 Q52 66 72 38Z" fill="#8fd6ff" />
    <path d="M24 28 Q26 40 34 44" stroke="#fff" strokeWidth={4} fill="none" />
  </Svg>
);

export const Snow = () => {
  const lines = [0, 60, 120].map((d) => {
    const a = (d * Math.PI) / 180;
    return `M${50 - 40 * Math.cos(a)} ${50 - 40 * Math.sin(a)} L${50 + 40 * Math.cos(a)} ${50 + 40 * Math.sin(a)}`;
  });
  return (
    <Svg vb="0 0 100 100">
      <g fill="none">
        {lines.map((d) => <path key={d} d={d} stroke={INK} strokeWidth={13} />)}
        {lines.map((d) => <path key={d + 'w'} d={d} stroke="#e6f6ff" strokeWidth={6} />)}
      </g>
    </Svg>
  );
};

export const Sun = () => (
  <Svg vb="0 0 100 100" sw={4}>
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <path key={i} d={`M${50 + 32 * Math.cos(a)} ${50 + 32 * Math.sin(a)} L${50 + 46 * Math.cos(a)} ${50 + 46 * Math.sin(a)}`} fill="none" strokeWidth={6} />;
    })}
    <circle cx="50" cy="50" r="25" fill="#ffd84d" />
  </Svg>
);

export const Trash = () => (
  <Svg vb="0 0 100 100">
    <path d="M24 92 Q6 62 28 46 L40 26 L60 26 L72 46 Q94 62 76 92 Z" fill="#7a7396" />
    <path d="M38 30 Q50 16 62 30" fill="none" strokeWidth={6} />
    <path d="M30 60 Q34 52 42 52" stroke="#fff" strokeOpacity=".6" strokeWidth={4} fill="none" />
  </Svg>
);

export const Hourglass = () => (
  <Svg vb="0 0 60 90" sw={4}>
    <path d="M12 12 H48 L33 44 L48 78 H12 L27 44 Z" fill="#cfeeff" />
    <path d="M19 78 H41 L35 64 H25Z" fill="#ffd84d" strokeWidth={3} />
    <rect x="6" y="4" width="48" height="9" rx="4" fill="#c98a4b" />
    <rect x="6" y="77" width="48" height="9" rx="4" fill="#c98a4b" />
  </Svg>
);

export function Gauge({ level = 0.5 }: { level?: number }) {
  const th = Math.PI * (1 - level);
  const seg = (a0: number, a1: number, color: string) => {
    const r = 46;
    const p = (a: number) => `${70 + r * Math.cos(a)} ${90 - r * Math.sin(a)}`;
    return <path d={`M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`} fill="none" stroke={color} strokeWidth={13} strokeLinecap="butt" />;
  };
  return (
    <Svg vb="0 0 140 110" sw={4.5}>
      <path d="M8 94 A62 62 0 0 1 132 94 Z" fill="#fff6e0" />
      {seg(Math.PI, (Math.PI * 2) / 3, '#ff6b6b')}
      {seg((Math.PI * 2) / 3, Math.PI / 3, '#ffd84d')}
      {seg(Math.PI / 3, 0.02, '#7bd36b')}
      <path d={`M70 90 L${70 + 42 * Math.cos(th)} ${90 - 42 * Math.sin(th)}`} strokeWidth={6} fill="none" />
      <circle cx="70" cy="90" r="8" fill="#ff7a8a" />
      <text x="18" y="106" fontFamily="Chewy, cursive" fontSize="17" fill={INK} stroke="none">E</text>
      <text x="112" y="106" fontFamily="Chewy, cursive" fontSize="17" fill={INK} stroke="none">F</text>
    </Svg>
  );
}

export const RockBox = () => (
  <Svg vb="0 0 120 95">
    <circle cx="34" cy="32" r="15" fill="#a59e92" />
    <circle cx="62" cy="24" r="17" fill="#b5ad9f" />
    <circle cx="90" cy="33" r="13" fill="#9c9488" />
    <rect x="8" y="38" width="104" height="50" rx="9" fill="#cfd3e6" />
    <path d="M8 56 H112" fill="none" />
    <rect x="50" y="52" width="20" height="12" rx="4" fill="#ffd84d" strokeWidth={3.5} />
    <path d="M24 28 L28 22 M60 14 L66 8" stroke="#fff" strokeWidth={3} fill="none" />
  </Svg>
);

export const Boot = () => (
  <Svg vb="0 0 100 85">
    <path d="M22 8 H56 V40 L88 52 Q97 56 95 68 Q94 76 86 76 H22 Q14 76 14 68 V16 Q14 8 22 8Z" fill="#ff9b6a" />
    <rect x="14" y="62" width="82" height="14" rx="6" fill="#fff" />
    <path d="M24 22 H46" stroke="#fff" strokeWidth={5} fill="none" />
  </Svg>
);

export const Backpack = () => (
  <Svg vb="0 0 80 100">
    <path d="M24 30 V8 M56 30 V8" fill="none" strokeWidth={9} />
    <rect x="10" y="26" width="60" height="68" rx="16" fill="#cdd1ea" />
    <rect x="22" y="48" width="36" height="28" rx="8" fill="#ffd84d" strokeWidth={4} />
    <path d="M16 36 Q40 30 64 36" stroke="#fff" strokeOpacity=".7" strokeWidth={4} fill="none" />
  </Svg>
);

export const Flag = () => (
  <Svg vb="0 0 120 150" sw={4.5}>
    <path d="M24 12 V146" fill="none" strokeWidth={7} />
    <path d="M24 16 Q58 4 70 18 T116 16 V70 Q94 82 70 70 T24 72 Z" fill="#fff" />
    <path d="M24 28 Q58 18 70 30 T116 28 M24 42 Q58 32 70 44 T116 42 M24 56 Q58 46 70 58 T116 56" stroke="#ff6b6b" strokeWidth={6} fill="none" />
    <path d="M24 16 Q40 10 54 14 V44 Q40 40 24 46 Z" fill="#4da3ff" strokeWidth={3} />
    <circle cx="34" cy="26" r="2.4" fill="#fff" stroke="none" />
    <circle cx="44" cy="30" r="2.4" fill="#fff" stroke="none" />
    <circle cx="36" cy="36" r="2.4" fill="#fff" stroke="none" />
  </Svg>
);

export const Footprints = () => (
  <Svg vb="0 0 300 70" sw={0}>
    <g fill="#a99f8a" stroke="none">
      {Array.from({ length: 6 }, (_, i) => {
        const x = 24 + i * 50;
        const y = i % 2 ? 20 : 48;
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="15" ry="8.5" />
            <ellipse cx={x - 28} cy={y + 1} rx="8" ry="6" />
          </g>
        );
      })}
    </g>
  </Svg>
);

export const Instrument = () => (
  <Svg vb="0 0 120 135">
    <path d="M60 64 V18" fill="none" strokeWidth={5} />
    <circle cx="60" cy="14" r="8" fill="#ff7a8a" />
    <path d="M36 104 L22 128 M84 104 L98 128" fill="none" strokeWidth={6} />
    <rect x="18" y="64" width="84" height="44" rx="10" fill="#dfe3f5" />
    <path d="M30 64 Q60 36 90 64" fill="#cfeeff" />
    <rect x="32" y="78" width="26" height="16" rx="4" fill="#ffd84d" strokeWidth={3.5} />
    <circle cx="78" cy="86" r="8" fill="#7bd36b" strokeWidth={3.5} />
  </Svg>
);

export const Balance = () => (
  <Svg vb="0 0 220 190" sw={4.5}>
    <path d="M110 34 V176 M72 176 H148" fill="none" strokeWidth={7} />
    <circle cx="110" cy="30" r="9" fill="#ffd84d" />
    <path d="M30 60 L190 34" fill="none" strokeWidth={8} />
    <path d="M30 60 L10 112 M30 60 L52 112 M190 34 L166 104 M190 34 L214 104" fill="none" strokeWidth={3.5} />
    <path d="M4 112 H58 Q54 130 31 130 Q8 130 4 112 Z" fill="#cfd3e6" />
    <circle cx="22" cy="100" r="11" fill="#a59e92" />
    <circle cx="40" cy="102" r="9" fill="#b5ad9f" />
    <path d="M158 104 H222 Q218 124 190 124 Q162 124 158 104 Z" fill="#cfd3e6" />
    <rect x="164" y="76" width="26" height="28" rx="8" fill="#cdd1ea" />
    <path d="M194 88 H214 V104 H194 Z" fill="#ff9b6a" />
  </Svg>
);

export const Weather = () => (
  <Svg vb="0 0 140 110" sw={4.5}>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return <path key={i} d={`M${96 + 26 * Math.cos(a)} ${38 + 26 * Math.sin(a)} L${96 + 38 * Math.cos(a)} ${38 + 38 * Math.sin(a)}`} fill="none" strokeWidth={5} />;
    })}
    <circle cx="96" cy="38" r="20" fill="#ffd84d" />
    <path d="M30 94 Q6 94 8 72 Q10 52 34 54 Q40 30 68 32 Q92 32 96 56 Q120 56 120 76 Q120 94 98 94 Z" fill="#fff" />
    <path d="M18 104 H60 M70 104 H100" stroke="#cfeeff" strokeWidth={5} fill="none" />
  </Svg>
);

/** A thought bubble with David and James dreaming of visiting. */
export const Dream = () => (
  <div className="relative">
    <Svg vb="0 0 170 135" sw={4.5}>
      <circle cx="18" cy="122" r="6" fill="#fff" />
      <circle cx="34" cy="106" r="9" fill="#fff" />
      <path d="M44 94 Q10 94 14 64 Q18 38 46 40 Q52 10 86 14 Q114 4 130 30 Q160 28 164 58 Q168 94 134 94 Z" fill="#fff" />
    </Svg>
    <div className="absolute" style={{ left: '28%', bottom: '28%', width: '20%' }}><Astronaut accent="#ff6b6b" wave /></div>
    <div className="absolute" style={{ left: '54%', bottom: '28%', width: '20%' }}><Astronaut accent="#4da3ff" wave /></div>
  </div>
);

export const Finish = () => (
  <Svg vb="0 0 130 150" sw={4.5}>
    <path d="M22 10 V146" fill="none" strokeWidth={7} />
    <rect x="22" y="14" width="96" height="64" rx="3" fill="#fff" />
    {Array.from({ length: 12 }, (_, i) => {
      const c = i % 4;
      const r = Math.floor(i / 4);
      return (c + r) % 2 === 0 ? <rect key={i} x={22 + c * 24} y={14 + r * 21.3} width="24" height="21.3" fill={INK} stroke="none" /> : null;
    })}
    <rect x="22" y="14" width="96" height="64" rx="3" fill="none" />
  </Svg>
);

export function Ripple() {
  return (
    <div className="a-ripple relative w-full" style={{ aspectRatio: '3 / 1' }}>
      <i /><i /><i />
    </div>
  );
}
