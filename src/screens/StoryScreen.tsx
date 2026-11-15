import { useCallback, useEffect, useState } from 'react';
import Background from '../components/Background';
import { Actor } from '../components/Actor';
import Narrator from '../components/Narrator';
import { IconBack, IconHome, IconNext, IconSpeaker, RoundBtn } from '../components/Icons';
import type { Story } from '../data/stories';

function renderText(text: string) {
  return text.split('**').map((part, n) =>
    n % 2 ? (
      <span key={n} style={{ color: '#e8501c' }}>
        {part}
      </span>
    ) : (
      <span key={n}>{part}</span>
    ),
  );
}

export default function StoryScreen({ story, onExit, onFinish }: { story: Story; onExit: () => void; onFinish: () => void }) {
  const [i, setI] = useState(0);
  const [quake, setQuake] = useState(false);
  const scene = story.scenes[i];
  const last = i === story.scenes.length - 1;

  const next = useCallback(() => (last ? onFinish() : setI((n) => n + 1)), [last, onFinish]);
  const prev = useCallback(() => setI((n) => Math.max(0, n - 1)), []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setQuake(false);
    if (scene.shake == null) return;
    const t1 = setTimeout(() => setQuake(true), scene.shake * 1000);
    const t2 = setTimeout(() => setQuake(false), scene.shake * 1000 + 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [i, scene.shake]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.speechSynthesis?.cancel();
    };
  }, [next, prev, onExit]);

  const speak = () => {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(scene.text.replace(/\*\*/g, ''));
    u.rate = 0.9;
    u.pitch = 1.15;
    s.speak(u);
  };

  const pct = ((i + 1) / story.scenes.length) * 100;

  return (
    <div className="a-screen absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 ${quake ? 'a-quake' : ''}`}>
        <Background bg={scene.bg} />
        <div key={i} className="absolute inset-0">
          {scene.actors.map((s, n) => (
            <Actor key={`${i}-${n}`} s={s} />
          ))}
        </div>
      </div>

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4" style={{ padding: '2vh 2vw' }}>
        <RoundBtn onClick={onExit} label="Back to the map" bg="#ffd84d">
          <IconHome />
        </RoundBtn>
        <div className="h-[1.4vh] min-h-2 w-[28vw] overflow-hidden rounded-full border-2 border-white/30 bg-white/15" aria-hidden="true">
          <div className="h-full rounded-full bg-[#ffd84d] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <RoundBtn onClick={prev} label="Previous" size={4.6} className={i === 0 ? 'pointer-events-none opacity-0' : ''}>
          <IconBack />
        </RoundBtn>
      </div>

      {/* speech card */}
      <div className="absolute bottom-[3vh] left-1/2 z-30 -translate-x-1/2" style={{ width: 'min(95vw, 1100px)' }}>
        <div key={i} className="crayon-box a-text flex items-center" style={{ padding: 'calc(var(--u) * 1.3) calc(var(--u) * 2)', gap: 'calc(var(--u) * 1.8)' }}>
          <Narrator who={story.narrator} />
          <p className="flex-1 font-semibold leading-snug" style={{ fontSize: 'clamp(1.2rem, calc(var(--u) * 2.25), 2.5rem)', textWrap: 'balance' as any }}>
            {renderText(scene.text)}
          </p>
          <div className="flex shrink-0 flex-col items-center" style={{ gap: 'calc(var(--u) * 1)' }}>
            <RoundBtn onClick={speak} label="Read to me" bg="#bfe6ff" size={4.4}>
              <IconSpeaker />
            </RoundBtn>
            <RoundBtn onClick={next} label={last ? 'Finish' : 'Next'} bg="#7bd36b" size={6.2} className="a-nudge">
              <IconNext />
            </RoundBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
