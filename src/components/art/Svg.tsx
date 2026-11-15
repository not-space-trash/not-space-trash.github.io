import type { ReactNode } from 'react';

export const INK = '#3a2a55';

/** Global filters that make every drawing look like wax crayon on paper. Render once. */
export function CrayonDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="crayon" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="9" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.6" result="grainAlpha" />
          <feComposite in="wobbly" in2="grainAlpha" operator="in" />
        </filter>
        <filter id="crayonSoft" x="-5%" y="-15%" width="110%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="2" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.5" result="grainAlpha" />
          <feComposite in="wobbly" in2="grainAlpha" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

type SvgProps = { vb: string; children: ReactNode; sw?: number; className?: string };

/** Crayon-styled svg wrapper. Thick rounded ink outlines + crayon filter. */
export function Svg({ vb, children, sw = 5, className = '' }: SvgProps) {
  return (
    <svg viewBox={vb} className={`block h-auto w-full overflow-visible ${className}`} aria-hidden="true">
      <g filter="url(#crayon)" stroke={INK} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function Eye({ cx, cy, r = 8, closed = false }: { cx: number; cy: number; r?: number; closed?: boolean }) {
  if (closed) {
    return <path d={`M${cx - r} ${cy} Q${cx} ${cy + r * 0.9} ${cx + r} ${cy}`} fill="none" strokeWidth={4} />;
  }
  return (
    <g stroke="none">
      <circle cx={cx} cy={cy} r={r} fill={INK} />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.32} r={r * 0.36} fill="#fff" />
    </g>
  );
}

type FaceProps = { cx: number; y: number; gap?: number; r?: number; closed?: boolean; sad?: boolean; cheeks?: boolean; beak?: boolean };

/** A cute little face: two eyes, rosy cheeks and a smile. */
export function Face({ cx, y, gap = 14, r = 7, closed, sad, cheeks = true, beak }: FaceProps) {
  const sy = y + r + 6;
  const sw = gap * 0.55;
  return (
    <g>
      <Eye cx={cx - gap} cy={y} r={r} closed={closed} />
      <Eye cx={cx + gap} cy={y} r={r} closed={closed} />
      {cheeks && (
        <g stroke="none" fill="#ff8fab" opacity=".7">
          <circle cx={cx - gap - r - 3} cy={y + r + 3} r={r * 0.7} />
          <circle cx={cx + gap + r + 3} cy={y + r + 3} r={r * 0.7} />
        </g>
      )}
      {beak ? (
        <path d={`M${cx - 7} ${y + 2} L${cx + 7} ${y + 2} L${cx} ${y + 14} Z`} fill="#ffb02e" strokeWidth={3.5} />
      ) : (
        <path
          d={sad ? `M${cx - sw} ${sy + 4} Q${cx} ${sy - 5} ${cx + sw} ${sy + 4}` : `M${cx - sw} ${sy} Q${cx} ${sy + sw * 0.95} ${cx + sw} ${sy}`}
          fill="none"
          strokeWidth={4}
        />
      )}
    </g>
  );
}
