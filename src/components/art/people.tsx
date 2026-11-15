import { Svg, Face, INK } from './Svg';

/** Placeholder astronaut. Replace by dropping david.png / james.png / neil.png / buzz.png into src/assets/custom. */
type AstroProps = { accent?: string; name?: string; mood?: 'happy' | 'sad'; wave?: boolean };

export function Astronaut({ accent = '#ff6b6b', name, mood = 'happy', wave = false }: AstroProps) {
  const arm = (d: string) => (
    <g fill="none">
      <path d={d} stroke={INK} strokeWidth={19} />
      <path d={d} stroke="#fff" strokeWidth={10} />
    </g>
  );
  return (
    <div className="relative">
      {name && (
        <span
          className="chip absolute left-1/2 text-center"
          style={{ top: '-16%', fontSize: 'calc(var(--u) * 1.25)', transform: 'translateX(-50%) scaleX(var(--flip, 1))' }}
        >
          {name}
        </span>
      )}
      <Svg vb="0 0 100 150">
        <rect x="12" y="62" width="28" height="52" rx="10" fill="#cdd1ea" />
        <rect x="30" y="104" width="17" height="36" rx="8" fill="#fff" />
        <rect x="53" y="104" width="17" height="36" rx="8" fill="#fff" />
        <ellipse cx="38" cy="141" rx="14" ry="8" fill={accent} />
        <ellipse cx="62" cy="141" rx="14" ry="8" fill={accent} />
        <rect x="26" y="66" width="48" height="46" rx="18" fill="#fff" />
        <rect x="41" y="82" width="18" height="13" rx="4" fill={accent} strokeWidth={3.5} />
        {arm('M30 76 Q11 90 19 106')}
        <circle cx="19" cy="108" r="8" fill={accent} />
        {wave ? arm('M70 76 Q92 68 88 42') : arm('M70 76 Q89 90 81 106')}
        {wave ? <circle cx="88" cy="40" r="8" fill={accent} /> : <circle cx="81" cy="108" r="8" fill={accent} />}
        <circle cx="50" cy="40" r="32" fill="#fff" />
        <ellipse cx="50" cy="42" rx="25" ry="21" fill="#ffe7a3" />
        <path d="M33 33 Q38 25 47 25" stroke="#fff" strokeWidth={4.5} fill="none" />
        <Face cx={50} y={41} gap={10} r={4.6} sad={mood === 'sad'} cheeks={false} />
      </Svg>
    </div>
  );
}

export const David = (p: AstroProps) => <Astronaut accent="#ff6b6b" name="David" {...p} />;
export const James = (p: AstroProps) => <Astronaut accent="#4da3ff" name="James" {...p} />;
export const Neil = (p: AstroProps) => <Astronaut accent="#3fcf8e" name="Neil" {...p} />;
export const Buzz = (p: AstroProps) => <Astronaut accent="#ffa94d" name="Buzz" {...p} />;
