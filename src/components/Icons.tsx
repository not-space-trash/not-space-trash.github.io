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
export const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.97 10.97 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
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
