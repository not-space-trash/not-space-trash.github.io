import { useState } from 'react';
import Background from '../components/Background';
import NasaModal from '../components/NasaModal';
import { MoonBody, MarsBody, BeltTile, Ceres } from '../components/art/worlds';
import { LunarModule, Ginny, Dawn } from '../components/art/vehicles';
import { Star, Sparkle } from '../components/art/props';
import { IconCamera, IconGitHub, IconReplay } from '../components/Icons';
import { ALL_IDS, WORLD_STORIES, type StoryId, type World } from '../data/stories';

type Props = { done: StoryId[]; onPick: (w: World) => void; onFinale: () => void; onReset: () => void };

export default function Home({ done, onPick, onFinale, onReset }: Props) {
  const [showNasa, setShowNasa] = useState(false);
  const allDone = ALL_IDS.every((id) => done.includes(id));

  const tiles: { w: World; label: string; delay: string; lift: string; art: React.ReactNode }[] = [
    {
      w: 'moon',
      label: 'Moon',
      delay: '0s',
      lift: '-1vh',
      art: (
        <>
          <MoonBody face />
          {/* a tiny lander sits on the moon's edge… what is it doing there? */}
          <div className="absolute" style={{ left: '82%', top: '17%', width: '36%', transformOrigin: '50% 100%', transform: 'translate(-50%,-100%) rotate(45deg)' }}>
            <LunarModule part="bottom" />
          </div>
        </>
      ),
    },
    {
      w: 'belt',
      label: 'Asteroid Belt',
      delay: '-.9s',
      lift: '3vh',
      art: (
        <>
          <BeltTile />
          <div className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2">
            <Ceres face />
          </div>
          <div className="a-float absolute" style={{ left: '60%', top: '4%', width: '38%' }}>
            <Dawn glow />
          </div>
        </>
      ),
    },
    {
      w: 'mars',
      label: 'Mars',
      delay: '-1.7s',
      lift: '-2vh',
      art: (
        <>
          <MarsBody face />
          <div className="absolute" style={{ left: '18%', top: '17%', width: '30%', transformOrigin: '50% 100%', transform: 'translate(-50%,-100%) rotate(-45deg)' }}>
            <Ginny spin />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="a-screen absolute inset-0 overflow-hidden">
      <Background bg="space" />

      {/* sparkles floating about */}
      {[
        { x: 6, y: 20, w: 3, d: 0 },
        { x: 94, y: 30, w: 2.6, d: 0.7 },
        { x: 48, y: 90, w: 2.2, d: 1.2 },
        { x: 30, y: 15, w: 2, d: 0.4 },
      ].map((s, n) => (
        <div key={n} className="a-float absolute" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `calc(var(--u) * ${s.w})`, animationDelay: `${s.d}s` }}>
          <Sparkle />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center px-[16vw] text-center" style={{ top: '2.2vh', gap: '0.5vh' }}>
        <h1 className="title-crayon a-pop" style={{ fontSize: 'calc(var(--u) * 4.8)', lineHeight: 1.05 }}>
          Don&apos;t Call Us Space Trash!
        </h1>
        <p
          className="a-text font-semibold leading-tight"
          style={{
            color: '#fff6dc',
            textShadow: '0 2px 0 #3a2a55, 0 0 12px rgba(20,16,58,.9)',
            fontSize: 'clamp(0.85rem, calc(var(--u) * 1.75), 1.4rem)',
          }}
        >
          Tap a world to read true NASA stories of real spacecraft still up in space!
        </p>
      </div>

      {/* collected stars */}
      <div className="absolute right-[2vw] top-[2.5vh] z-20 flex gap-1" aria-label={`${done.length} of 4 friends met`}>
        {ALL_IDS.map((id) => (
          <div key={id} style={{ width: 'calc(var(--u) * 3)', opacity: done.includes(id) ? 1 : 0.28, filter: done.includes(id) ? 'none' : 'grayscale(1)' }}>
            <Star />
          </div>
        ))}
      </div>

      {allDone && (
        <div className="absolute left-[2vw] top-[2.5vh] z-20 flex items-center gap-2">
          <button type="button" onClick={onFinale} className="crayon-btn a-glow flex items-center gap-2" style={{ ['--bg' as any]: '#ffd84d', padding: 'calc(var(--u) * .6) calc(var(--u) * 1.6)' }}>
            <span style={{ width: 'calc(var(--u) * 2.6)' }}><Star /></span>
            <span className="font-display" style={{ fontSize: 'calc(var(--u) * 2.4)' }}>Finale</span>
          </button>
          <button type="button" onClick={onReset} aria-label="Start over" className="crayon-btn flex items-center justify-center p-2" style={{ ['--bg' as any]: '#fff6dc', width: 'calc(var(--u) * 3.6)', height: 'calc(var(--u) * 3.6)', minWidth: 40, minHeight: 40 }}>
            <IconReplay />
          </button>
        </div>
      )}

      <div className="home-tiles absolute inset-x-0 bottom-0 flex items-center justify-around" style={{ top: '17vh', padding: '0 2vw 2vh' }}>
        {tiles.map((t) => {
          const ids = WORLD_STORIES[t.w];
          return (
            <button key={t.w} onClick={() => onPick(t.w)} className="tile relative flex flex-col items-center" style={{ width: 'var(--s)', marginTop: t.lift }} aria-label={`Explore ${t.label}`}>
              <div className="a-bob relative w-full" style={{ aspectRatio: '1', animationDelay: t.delay }}>
                {t.art}
              </div>
              <span className="chip mt-[1vh] flex items-center gap-2" style={{ fontSize: 'calc(var(--u) * 3)' }}>
                {t.label}
                <span className="flex gap-0.5">
                  {ids.map((id) => (
                    <span key={id} style={{ width: 'calc(var(--u) * 2.2)', opacity: done.includes(id) ? 1 : 0.25, filter: done.includes(id) ? 'none' : 'grayscale(1)' }}>
                      <Star />
                    </span>
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* NASA photos & credits button */}
      <div className="a-pop absolute bottom-[2.5vh] left-[2vw] z-20" style={{ animationDelay: '.3s' }}>
        <div className="a-float" style={{ animationDelay: '-1.5s' }}>
          <button
            type="button"
            onClick={() => setShowNasa(true)}
            aria-label="Real NASA photos and dataset credits"
            className="crayon-btn flex items-center gap-2"
            style={{
              ['--bg' as any]: '#bfe6ff',
              padding: 'calc(var(--u) * .65) calc(var(--u) * 1.4)',
              minHeight: 46,
            }}
          >
            <span className="gh-boing block shrink-0" style={{ width: 'max(20px, calc(var(--u) * 2.4))', height: 'max(20px, calc(var(--u) * 2.4))' }}>
              <IconCamera />
            </span>
            <span className="font-display whitespace-nowrap" style={{ fontSize: 'max(14px, calc(var(--u) * 2))' }}>
              NASA Photos &amp; Data
            </span>
          </button>
        </div>
      </div>

      {/* GitHub repo link */}
      <div className="a-pop absolute bottom-[2.5vh] right-[2vw] z-20" style={{ animationDelay: '.35s' }}>
        <div className="a-float">
          <a
            href="https://github.com/not-space-trash/not-space-trash.github.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            title="View on GitHub"
            className="crayon-btn flex items-center justify-center"
            style={{
              ['--bg' as any]: '#fff6dc',
              width: 'max(46px, calc(var(--u) * 5.2))',
              height: 'max(46px, calc(var(--u) * 5.2))',
            }}
          >
            <span className="gh-boing block h-[58%] w-[58%]">
              <IconGitHub />
            </span>
          </a>
        </div>
      </div>

      {showNasa && <NasaModal onClose={() => setShowNasa(false)} />}
    </div>
  );
}
