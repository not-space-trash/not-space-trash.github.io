import { useState, type CSSProperties, type ReactNode } from 'react';
import { resolveCustom } from '../lib/customArt';
import { LunarModule, Mothership, Buggy, Dawn, Rover, Ginny, Satellite } from './art/vehicles';
import { David, James, Neil, Buzz } from './art/people';
import { Earth, MoonBody, MarsBody, Ceres, CeresCut, Vesta, Asteroid, Orbit } from './art/worlds';
import {
  Sparkle, Heart, Star, Boom, Flash, QMark, Zzz, Signal, Germ, NoSign, Drops, Snow, Sun, Trash, Hourglass,
  Gauge, RockBox, Boot, Backpack, Flag, Footprints, Instrument, Balance, Weather, Dream, Finish, Ripple,
} from './art/props';

export type ActorSpec = {
  k: string;          // which drawing
  x: number;          // % from left (centre of the actor)
  y: number;          // % from bottom (feet of the actor)
  w: number;          // width in "u" units (1u ≈ 1% of screen width)
  flip?: boolean;
  a?: string;         // entry animation   (a-<name>)
  i?: string;         // idle animation    (a-<name>)
  d?: number;         // entry delay in seconds
  rot?: number;
  o?: number;         // opacity
  z?: number;
  p?: Record<string, any>; // props passed to the drawing
};

type P = Record<string, any>;

const REG: Record<string, (p: P) => ReactNode> = {
  falcon: (p) => <LunarModule variant="falcon" part={p.part} sleepy={p.sleepy} />,
  eagle: (p) => <LunarModule variant="eagle" part={p.part} sleepy={p.sleepy} />,
  mothership: () => <Mothership />,
  buggy: (p) => <Buggy crew={p.crew} drive={p.drive} />,
  dawn: (p) => <Dawn dim={p.dim} droop={p.droop} sleep={p.sleep} glow={p.glow} />,
  rover: (p) => <Rover carry={p.carry} drive={p.drive} />,
  ginny: (p) => <Ginny broken={p.broken} spin={p.spin} />,
  satellite: () => <Satellite />,
  david: (p) => <David {...p} />,
  james: (p) => <James {...p} />,
  neil: (p) => <Neil {...p} />,
  buzz: (p) => <Buzz {...p} />,
  earth: (p) => <Earth {...p} />,
  moon: (p) => <MoonBody {...p} />,
  mars: (p) => <MarsBody {...p} />,
  ceres: (p) => <Ceres {...p} />,
  ceresCut: () => <CeresCut />,
  vesta: (p) => <Vesta {...p} />,
  asteroid: (p) => <Asteroid shape={p.shape} face={p.face} />,
  orbit: (p) => <Orbit body={p.body} dim={p.dim} sleep={p.sleep} />,
  sparkle: (p) => <Sparkle color={p.color} />,
  heart: () => <Heart />,
  star: () => <Star />,
  boom: (p) => <Boom text={p.text} color={p.color} />,
  flash: () => <Flash />,
  qmark: () => <QMark />,
  zzz: () => <Zzz />,
  signal: (p) => <Signal broken={p.broken} />,
  germ: () => <Germ />,
  nosign: () => <NoSign />,
  drops: () => <Drops />,
  snow: () => <Snow />,
  sun: () => <Sun />,
  trash: () => <Trash />,
  hourglass: () => <Hourglass />,
  gauge: (p) => <Gauge level={p.level} />,
  rocks: () => <RockBox />,
  boot: () => <Boot />,
  backpack: () => <Backpack />,
  flag: () => <Flag />,
  footprints: () => <Footprints />,
  instrument: () => <Instrument />,
  balance: () => <Balance />,
  weather: () => <Weather />,
  dream: () => <Dream />,
  finish: () => <Finish />,
  ripple: () => <Ripple />,
};

const GROUNDED = new Set(['falcon', 'eagle', 'buggy', 'david', 'james', 'neil', 'buzz', 'rover', 'ginny', 'rocks', 'flag', 'instrument', 'boot', 'backpack', 'trash']);

export function Actor({ s }: { s: ActorSpec }) {
  const [boing, setBoing] = useState(0);
  const draw = REG[s.k];
  if (!draw) return null;
  const custom = resolveCustom(s.k, s.p);
  const shadow = GROUNDED.has(s.k) && s.y >= 18 && s.y <= 38 && !(s.a === 'toss');

  const outer: CSSProperties = {
    left: `${s.x}%`,
    bottom: `${s.y}%`,
    width: `calc(var(--u) * ${s.w})`,
    transform: `translateX(-50%) rotate(${s.rot ?? 0}deg)`,
    opacity: s.o,
    zIndex: s.z,
    ['--flip' as any]: s.flip ? -1 : 1,
  };

  return (
    <div className="absolute" style={outer}>
      {shadow && (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: '-3%', width: '85%', height: 'calc(var(--u) * 1.1)', background: 'rgba(40,25,70,.28)', filter: 'blur(3px)' }}
        />
      )}
      <div className={s.a ? `a-${s.a}` : ''} style={{ animationDelay: s.d ? `${s.d}s` : undefined }}>
        <div className={s.i ? `a-${s.i}` : ''}>
          <div
            key={boing}
            className={`cursor-pointer ${boing ? 'a-boing' : ''}`}
            onPointerDown={() => setBoing((b) => b + 1)}
            style={{ transform: s.flip ? 'scaleX(-1)' : undefined }}
          >
            {custom ? <img src={custom} alt="" draggable={false} className="block h-auto w-full" /> : draw(s.p ?? {})}
          </div>
        </div>
      </div>
    </div>
  );
}
