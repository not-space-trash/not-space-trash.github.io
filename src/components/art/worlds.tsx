import { Svg, Face, Eye } from './Svg';
import { Dawn } from './vehicles';

type Body = { face?: boolean; sleepy?: boolean };

export function Earth({ face }: Body) {
  return (
    <Svg vb="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#52a8ff" />
      <path d="M52 56 Q84 32 108 54 Q98 82 70 86 Q46 80 52 56Z" fill="#7bd36b" />
      <path d="M122 100 Q158 90 168 122 Q152 162 126 146 Q108 126 122 100Z" fill="#7bd36b" />
      <path d="M38 122 Q60 116 66 136 Q56 152 42 142Z" fill="#7bd36b" />
      <path d="M30 80 Q42 68 58 78 M118 40 Q136 30 152 44 M80 164 Q104 176 128 164" stroke="#fff" strokeWidth={7} fill="none" />
      {face && <Face cx={100} y={104} gap={24} r={9} />}
    </Svg>
  );
}

const crater = (cx: number, cy: number, rx: number, ry: number, fill: string) => (
  <g key={`${cx}${cy}`}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} strokeWidth={3.5} />
    <path d={`M${cx - rx * 0.6} ${cy - ry * 0.2} Q${cx} ${cy - ry * 0.9} ${cx + rx * 0.6} ${cy - ry * 0.2}`} stroke="#fff" strokeOpacity=".55" strokeWidth={3} fill="none" />
  </g>
);

export function MoonBody({ face, sleepy }: Body) {
  return (
    <Svg vb="0 0 200 200">
      <circle cx="100" cy="100" r="92" fill="#ece7da" />
      {crater(50, 62, 18, 13, '#d3cdbd')}
      {crater(150, 52, 14, 10, '#d3cdbd')}
      {crater(158, 138, 22, 15, '#d3cdbd')}
      {crater(54, 150, 16, 11, '#d3cdbd')}
      {crater(104, 28, 10, 7, '#d3cdbd')}
      {face && <Face cx={100} y={100} gap={26} r={10} closed={sleepy} />}
    </Svg>
  );
}

export function MarsBody({ face }: Body) {
  return (
    <Svg vb="0 0 200 200">
      <circle cx="100" cy="100" r="92" fill="#ea7b4f" />
      <path d="M20 110 Q50 80 80 100 Q60 130 30 138 Z" fill="#c9573a" stroke="none" />
      <path d="M130 70 Q170 60 182 96 Q150 112 128 96 Z" fill="#c9573a" stroke="none" />
      <path d="M62 24 Q100 8 140 24 Q100 40 62 24Z" fill="#fff" strokeWidth={4} />
      {crater(48, 66, 14, 10, '#d4694a')}
      {crater(156, 148, 20, 14, '#d4694a')}
      {crater(78, 164, 12, 8, '#d4694a')}
      {face && <Face cx={100} y={102} gap={26} r={10} />}
    </Svg>
  );
}

export function Ceres({ face }: Body) {
  return (
    <Svg vb="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#bfb7ad" />
      {crater(56, 66, 17, 12, '#a39b90')}
      {crater(150, 150, 20, 14, '#a39b90')}
      {crater(60, 148, 12, 9, '#a39b90')}
      <circle cx="128" cy="76" r="13" fill="#fff" strokeWidth={4} />
      <circle cx="128" cy="76" r="5" fill="#fff4b8" stroke="none" />
      {face && <Face cx={100} y={106} gap={24} r={9} />}
    </Svg>
  );
}

export function CeresCut() {
  return (
    <Svg vb="0 0 200 200">
      <circle cx="100" cy="100" r="92" fill="#bfb7ad" />
      <circle cx="100" cy="100" r="72" fill="#6cc5ff" />
      <path d="M40 90 Q50 80 62 90 M110 56 Q124 48 136 58 M70 132 Q84 124 96 134 M130 120 Q144 112 156 122" stroke="#fff" strokeWidth={5} fill="none" />
      <circle cx="100" cy="100" r="40" fill="#8a6b52" />
      <circle cx="88" cy="94" r="5" fill="#b5906f" stroke="none" />
      <circle cx="112" cy="110" r="6" fill="#b5906f" stroke="none" />
    </Svg>
  );
}

export function Vesta({ face }: Body) {
  return (
    <Svg vb="0 0 200 200">
      <path d="M26 112 Q14 60 68 38 Q122 12 162 48 Q196 82 174 128 Q152 180 96 174 Q38 168 26 112 Z" fill="#dcab7c" />
      {crater(120, 138, 36, 20, '#c18d5f')}
      {crater(62, 76, 16, 11, '#c18d5f')}
      {crater(150, 70, 12, 9, '#c18d5f')}
      <path d="M40 120 Q60 100 80 112" stroke="#c18d5f" strokeWidth={5} fill="none" />
      {face && <Face cx={96} y={102} gap={22} r={9} />}
    </Svg>
  );
}

const ROCKS = [
  'M20 60 Q8 30 40 14 Q74 4 92 30 Q104 60 78 84 Q44 100 22 84 Q10 74 20 60 Z',
  'M14 50 Q20 20 56 16 Q96 14 100 52 Q98 86 58 92 Q18 90 14 50 Z',
  'M10 66 Q4 34 40 22 Q66 6 90 28 Q108 56 84 82 Q50 98 24 86 Q12 80 10 66 Z',
  'M24 80 Q4 56 22 30 Q50 6 82 24 Q104 44 92 70 Q72 98 24 80 Z',
];
const ROCK_COLORS = ['#b9a89a', '#a9a2b8', '#c9b79c', '#9c93a8'];

export function Asteroid({ shape = 0, face }: { shape?: number; face?: boolean }) {
  return (
    <Svg vb="0 0 110 110" sw={5.5}>
      <path d={ROCKS[shape % 4]} fill={ROCK_COLORS[shape % 4]} />
      <circle cx="40" cy="42" r="8" fill="#8d8398" strokeWidth={3} />
      <circle cx="72" cy="66" r="6" fill="#8d8398" strokeWidth={3} />
      {face && (
        <>
          <Eye cx={44} cy={60} r={5} />
          <Eye cx={66} cy={60} r={5} />
        </>
      )}
    </Svg>
  );
}

/** Dawn circling a world. Dawn follows an elliptical path using two phase-shifted tweens. */
export function Orbit({ body = 'ceres', dim, sleep }: { body?: 'ceres' | 'vesta'; dim?: boolean; sleep?: boolean }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: '1 / 0.62' }}>
      <svg viewBox="0 0 200 124" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <g filter="url(#crayon)">
          <ellipse cx="100" cy="62" rx="90" ry="44" fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth={3.5} strokeDasharray="3 11" strokeLinecap="round" />
        </g>
      </svg>
      <div className="absolute left-1/2 top-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2">{body === 'ceres' ? <Ceres face={sleep} /> : <Vesta />}</div>
      <div className="orb-x">
        <div className="orb-y">
          <div className="absolute left-1/2 top-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2">
            <Dawn dim={dim} sleep={sleep} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Used for the home screen tile: ring of rocks + tiny Ceres + Dawn. */
export function BeltTile() {
  const rocks = Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2;
    const j = Math.sin(i * 12.9898) * 0.5 + 0.5;
    const rx = 90 + (j - 0.5) * 14;
    const ry = 66 + (j - 0.5) * 14;
    return { x: 100 + rx * Math.cos(a), y: 100 + ry * Math.sin(a), s: 15 + j * 17, k: i % 4, r: i * 47 };
  });
  return (
    <Svg vb="0 0 200 200" sw={3.2}>
      <g transform="rotate(-16 100 100)">
        {rocks.map((r, i) => (
          <g key={i} transform={`translate(${r.x} ${r.y}) rotate(${r.r}) scale(${r.s / 110}) translate(-55 -55)`}>
            <path d={ROCKS[r.k]} fill={ROCK_COLORS[r.k]} strokeWidth={9} />
          </g>
        ))}
      </g>
    </Svg>
  );
}
