import { customArt } from '../lib/customArt';
import { LunarModule, Dawn, Ginny } from './art/vehicles';
import { Star } from './art/props';
import type { Narrator as N } from '../data/stories';

const NAMES: Record<N, string> = { falcon: 'Falcon', dawn: 'Dawn', ginny: 'Ginny', all: 'Friends' };

/** Round face badge of whoever is talking. Provide `<name>-avatar.png` in src/assets/custom to replace. */
export default function Narrator({ who, size = 8.5, showName = true }: { who: N; size?: number; showName?: boolean }) {
  const custom = customArt[`${who}-avatar`];
  return (
    <div className="flex shrink-0 flex-col items-center" style={{ width: `calc(var(--u) * ${size})` }}>
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-full"
        style={{
          aspectRatio: '1',
          background: 'radial-gradient(circle at 35% 30%, #ffffff, #cfe4ff)',
          border: 'max(3px, calc(var(--u) * .35)) solid var(--ink)',
        }}
      >
        <div className="a-bob" style={{ width: who === 'dawn' ? '120%' : '84%' }}>
          {custom ? (
            <img src={custom} alt="" className="block h-auto w-full" draggable={false} />
          ) : who === 'falcon' ? (
            <LunarModule part="top" vb="46 26 108 112" />
          ) : who === 'dawn' ? (
            <Dawn glow vb="100 8 120 122" />
          ) : who === 'ginny' ? (
            <Ginny vb="28 0 104 136" />
          ) : (
            <Star />
          )}
        </div>
      </div>
      {showName && (
        <span className="chip -mt-[12%] text-center" style={{ fontSize: `calc(var(--u) * ${size * 0.17})`, padding: '0 calc(var(--u) * .8)' }}>
          {NAMES[who]}
        </span>
      )}
    </div>
  );
}
