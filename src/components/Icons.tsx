import type { ReactNode } from 'react';

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const I = ({ children }: { children: ReactNode }) => (
  <svg {...base} className="h-full w-full" aria-hidden="true">
    {children}
  </svg>
);

export const IconHome = () => (
  <I><path d="M3 11 12 3l9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></I>
);
export const IconNext = () => (
  <I><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></I>
);
export const IconBack = () => (
  <I><path d="M20 12H5" /><path d="m11 5-7 7 7 7" /></I>
);
export const IconSpeaker = () => (
  <I><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" /><path d="M17 9a4 4 0 0 1 0 6" /><path d="M19.5 6.5a8 8 0 0 1 0 11" /></I>
);
export const IconReplay = () => (
  <I><path d="M4 12a8 8 0 1 0 3-6.2" /><path d="M4 4v5h5" /></I>
);

export function RoundBtn({
  children, onClick, label, bg = '#fff6dc', size = 5.4, className = '', disabled = false, tabIndex, ariaHidden,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  bg?: string;
  size?: number;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  ariaHidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      className={`crayon-btn flex shrink-0 items-center justify-center ${className}`}
      style={{ ['--bg' as any]: bg, width: `max(46px, calc(var(--u) * ${size}))`, height: `max(46px, calc(var(--u) * ${size}))` }}
    >
      <span className="block h-[56%] w-[56%]">{children}</span>
    </button>
  );
}
