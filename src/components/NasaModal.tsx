import { useEffect, useState } from 'react';
import { NASA_EVIDENCE } from '../data/nasaEvidence';
import type { StoryId } from '../data/stories';
import { Dawn, Ginny, LunarModule, Satellite } from './art/vehicles';
import { IconBack, IconClose, IconExternal, IconNext, IconSpeaker, RoundBtn } from './Icons';

function renderHighlight(text: string) {
  return text.split('**').map((part, n) =>
    n % 2 ? (
      <span key={n} className="font-bold" style={{ color: '#e8501c' }}>
        {part}
      </span>
    ) : (
      <span key={n}>{part}</span>
    ),
  );
}

function FriendIcon({ id }: { id: string }) {
  if (id === 'apollo15-lro') return <Satellite />;
  if (id === 'apollo15-surface') return <LunarModule variant="falcon" part="bottom" vb="-4 115 208 105" />;
  if (id === 'apollo11-ascent') return <LunarModule variant="eagle" part="top" vb="32 6 136 136" />;
  if (id === 'dawn-ceres') return <Dawn glow vb="0 16 320 156" />;
  if (id === 'ingenuity-blade') return <Ginny broken vb="0 0 172 200" />;
  return <Ginny />;
}

const EXPLORERS: { story: StoryId; label: string; bg: string }[] = [
  { story: 'falcon', label: 'Falcon', bg: '#fff1c2' },
  { story: 'eagle', label: 'Eagle', bg: '#d9efff' },
  { story: 'dawn', label: 'Dawn', bg: '#e8ddff' },
  { story: 'ginny', label: 'Ginny', bg: '#ffd8c2' },
];

type Props = {
  initialStory?: StoryId;
  initialPhotoId?: string;
  onClose: () => void;
};

export default function NasaModal({ initialStory, initialPhotoId, onClose }: Props) {
  const startIdx = (() => {
    if (initialPhotoId) {
      const byId = NASA_EVIDENCE.findIndex((p) => p.id === initialPhotoId);
      if (byId >= 0) return byId;
    }
    if (initialStory) {
      const byStory = NASA_EVIDENCE.findIndex((p) => p.story === initialStory);
      if (byStory >= 0) return byStory;
    }
    return 0;
  })();

  const [idx, setIdx] = useState(startIdx);
  const item = NASA_EVIDENCE[idx];

  const prev = () => setIdx((n) => (n - 1 + NASA_EVIDENCE.length) % NASA_EVIDENCE.length);
  const next = () => setIdx((n) => (n + 1) % NASA_EVIDENCE.length);
  const jumpToStory = (story: StoryId) => {
    const first = NASA_EVIDENCE.findIndex((p) => p.story === story);
    if (first >= 0) setIdx(first);
  };

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, [idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        setIdx((n) => (n - 1 + NASA_EVIDENCE.length) % NASA_EVIDENCE.length);
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        setIdx((n) => (n + 1) % NASA_EVIDENCE.length);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.speechSynthesis?.cancel();
    };
  }, [onClose]);

  const speak = () => {
    const s = window.speechSynthesis;
    if (!s || typeof SpeechSynthesisUtterance === 'undefined') return;
    s.cancel();
    const text = `${item.title}. ${item.kidFact.replace(/\*\*/g, '')}`;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1.15;
    s.speak(u);
  };

  return (
    <div
      className="a-fadein fixed inset-0 z-50 flex items-center justify-center bg-[#14103a]/80 p-3 backdrop-blur-xs sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nasa-modal-title"
      onClick={onClose}
    >
      <div
        className="crayon-box a-pop flex max-h-[92vh] w-[min(95vw,940px)] flex-col"
        style={{ ['--bg' as any]: '#fff6dc', padding: 'clamp(12px, 2vw, 24px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header + Explorer Pills */}
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 id="nasa-modal-title" className="title-crayon leading-none" style={{ fontSize: 'clamp(1.5rem, calc(var(--u) * 2.8), 2.2rem)' }}>
              Real NASA Photos!
            </h2>
            <div className="flex flex-wrap items-center gap-2.5">
              {EXPLORERS.map((ex) => {
                const active = item.story === ex.story;
                return (
                  <button
                    key={ex.story}
                    type="button"
                    onClick={() => jumpToStory(ex.story)}
                    className="crayon-btn font-display whitespace-nowrap"
                    style={{
                      ['--bg' as any]: active ? '#ffd84d' : ex.bg,
                      padding: 'max(6px, calc(var(--u) * .45)) max(18px, calc(var(--u) * 1.4))',
                      fontSize: 'clamp(0.95rem, calc(var(--u) * 1.55), 1.25rem)',
                      lineHeight: 1.15,
                      letterSpacing: '0.02em',
                      transform: active ? 'scale(1.06)' : undefined,
                    }}
                  >
                    {ex.label}
                  </button>
                );
              })}
            </div>
          </div>
          <RoundBtn onClick={onClose} label="Close NASA photos" bg="#ffd84d" size={4.2}>
            <IconClose />
          </RoundBtn>
        </div>

        {/* Scrapbook spread */}
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 items-center gap-4 overflow-y-auto overscroll-contain py-1 md:grid-cols-[1.15fr_1fr]">
          {/* Left: Real NASA Photo frame */}
          <div className="crayon-box flex flex-col p-3" style={{ ['--bg' as any]: '#1f1750' }}>
            <div className="relative flex aspect-[4/3] max-h-[39vh] w-full items-center justify-center overflow-hidden rounded-2xl border-[3px] border-[#3a2a55] bg-[#0e0a26]">
              <img src={item.image} alt={`${item.title} — ${item.credit}`} className="h-full w-full object-contain" />
              <span className="chip absolute left-2.5 top-2.5 text-sm">{item.badge}</span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-semibold text-[#fff6dc] select-text">
              <span>
                {item.credit} · {item.catalogId}
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border-2 border-[#3a2a55] bg-[#ffd84d] px-3 py-0.5 font-bold text-[#3a2a55] transition-transform hover:scale-105"
              >
                <span>NASA Page</span>
                <span className="inline-block h-3.5 w-3.5">
                  <IconExternal />
                </span>
              </a>
            </div>
          </div>

          {/* Right: Story Link + Kid-Friendly Explanation */}
          <div key={item.id} className="crayon-box a-text flex flex-col justify-between gap-3 p-4 select-text sm:p-5" style={{ ['--bg' as any]: item.cardBg }}>
            {/* Connection to the story */}
            <div className="flex items-center gap-3 rounded-2xl border-[2.5px] border-[#3a2a55] bg-[#fffdf5] p-3">
              <div className="w-14 shrink-0 sm:w-16">
                <FriendIcon id={item.id} />
              </div>
              <div className="min-w-0">
                <span className="font-display inline-block rounded-full bg-[#ffd84d] px-2.5 py-0.5 text-xs text-[#3a2a55] border border-[#3a2a55]">
                  In the story:
                </span>
                <p className="mt-1 text-sm font-semibold leading-snug text-[#3a2a55] sm:text-base">{renderHighlight(item.storyQuote)}</p>
              </div>
            </div>

            {/* Easy kid explanation */}
            <div className="flex items-start justify-between gap-3 px-1">
              <div>
                <h3 className="font-display text-xl leading-tight text-[#3a2a55] sm:text-2xl">{item.title}</h3>
                <p className="mt-1.5 text-base font-semibold leading-relaxed text-[#3a2a55] sm:text-lg">{renderHighlight(item.kidFact)}</p>
              </div>
              <RoundBtn onClick={speak} label="Read to me" bg="#bfe6ff" size={4.2}>
                <IconSpeaker />
              </RoundBtn>
            </div>
          </div>
        </div>

        {/* Bottom Prev / Dots / Next bar */}
        <div className="mt-3 flex shrink-0 items-center justify-between gap-3">
          <RoundBtn onClick={prev} label="Previous photo" bg="#ffffff" size={4.2}>
            <IconBack />
          </RoundBtn>

          <div className="flex items-center gap-2" aria-label={`Photo ${idx + 1} of ${NASA_EVIDENCE.length}`}>
            {NASA_EVIDENCE.map((p, n) => {
              const active = n === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIdx(n)}
                  aria-label={`Show ${p.title}`}
                  className="h-3.5 rounded-full border-2 border-[#3a2a55] transition-all"
                  style={{
                    width: active ? 28 : 14,
                    background: active ? '#ffd84d' : '#ffffff',
                  }}
                />
              );
            })}
          </div>

          <RoundBtn onClick={next} label="Next photo" bg="#7bd36b" size={4.8}>
            <IconNext />
          </RoundBtn>
        </div>
      </div>
    </div>
  );
}
