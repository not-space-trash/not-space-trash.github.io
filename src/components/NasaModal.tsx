import { useEffect, useState } from 'react';
import { NASA_EVIDENCE } from '../data/nasaEvidence';
import type { StoryId } from '../data/stories';
import { IconClose, IconExternal, RoundBtn } from './Icons';

type Filter = 'all' | StoryId;

const TABS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All (6)' },
  { id: 'falcon', label: 'Falcon' },
  { id: 'eagle', label: 'Eagle' },
  { id: 'dawn', label: 'Dawn' },
  { id: 'ginny', label: 'Ginny' },
];

export default function NasaModal({ initialFilter = 'all', onClose }: { initialFilter?: Filter; onClose: () => void }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  const items = filter === 'all' ? NASA_EVIDENCE : NASA_EVIDENCE.filter((p) => p.story === filter);

  return (
    <div
      className="a-fadein fixed inset-0 z-50 flex items-center justify-center bg-[#14103a]/80 p-3 backdrop-blur-xs sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nasa-modal-title"
      onClick={onClose}
    >
      <div
        className="crayon-box a-pop flex max-h-[88vh] w-[min(95vw,980px)] flex-col"
        style={{ ['--bg' as any]: '#fff6dc', padding: 'clamp(14px, 2.2vw, 26px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div>
            <h2 id="nasa-modal-title" className="font-display text-2xl leading-tight text-[#3a2a55] sm:text-3xl">
              Real NASA Photos &amp; Datasets
            </h2>
            <p className="mt-0.5 text-sm font-medium text-[#5c487c] sm:text-base">
              Every character and scene in this storybook is based on real NASA missions and public archival photography.
            </p>
          </div>
          <RoundBtn onClick={onClose} label="Close NASA photos" bg="#ffd84d" size={4.4}>
            <IconClose />
          </RoundBtn>
        </div>

        {/* Mission filter tabs */}
        <div className="mt-3 flex shrink-0 flex-wrap gap-2">
          {TABS.map((t) => {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className="crayon-btn font-display px-4 py-1.5 text-sm sm:text-base"
                style={{
                  ['--bg' as any]: active ? '#ffd84d' : '#ffffff',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Photo cards */}
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto overscroll-contain pr-1 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border-[3px] border-[#3a2a55] bg-white shadow-[0_3px_0_rgba(58,42,85,0.22)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b-[3px] border-[#3a2a55] bg-[#100c2b]">
                <img src={item.image} alt={`${item.title} — ${item.credit}`} className="h-full w-full object-contain" />
                <span className="chip absolute left-2.5 top-2.5 text-xs font-bold">{item.mission}</span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-3.5 select-text">
                <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs font-semibold text-[#6b558c]">
                  <span>{item.catalogId}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display text-lg leading-snug text-[#3a2a55]">{item.title}</h3>
                <p className="flex-1 text-sm leading-snug text-[#463663]">{item.caption}</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#e8dfc2] pt-2 text-xs font-semibold text-[#5a4678]">
                  <span>{item.credit}</span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border-2 border-[#3a2a55] bg-[#bfe6ff] px-2.5 py-0.5 text-[#3a2a55] transition-transform hover:scale-105"
                  >
                    <span>NASA Source</span>
                    <span className="inline-block h-3.5 w-3.5">
                      <IconExternal />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer credits note */}
        <p className="mt-3 shrink-0 text-center text-xs font-medium text-[#5c487c]">
          Public-domain archival imagery courtesy of NASA, Johnson Space Center, Goddard Space Flight Center, JPL-Caltech, Arizona State University, UCLA, MPS, DLR, IDA &amp; MSSS.
        </p>
      </div>
    </div>
  );
}
