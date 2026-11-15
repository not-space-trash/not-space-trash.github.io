import Background from '../components/Background';
import { LunarModule } from '../components/art/vehicles';
import { Star } from '../components/art/props';
import { IconBack, RoundBtn } from '../components/Icons';
import { customArt } from '../lib/customArt';
import type { StoryId } from '../data/stories';

const CARDS: { id: StoryId; variant: 'falcon' | 'eagle'; title: string; sub: string; bg: string }[] = [
  { id: 'falcon', variant: 'falcon', title: 'Apollo 15', sub: 'Falcon', bg: '#fff1c2' },
  { id: 'eagle', variant: 'eagle', title: 'Apollo 11', sub: 'Eagle', bg: '#d9efff' },
];

export default function MoonSelect({ done, onPick, onBack }: { done: StoryId[]; onPick: (id: StoryId) => void; onBack: () => void }) {
  return (
    <div className="a-screen absolute inset-0 overflow-hidden">
      <Background bg="moon" />
      <div className="absolute left-[2vw] top-[2.5vh] z-10">
        <RoundBtn onClick={onBack} label="Back" bg="#ffd84d">
          <IconBack />
        </RoundBtn>
      </div>
      <h1 className="title-crayon a-pop absolute inset-x-0 z-10 text-center" style={{ top: '2.5vh', fontSize: 'calc(var(--u) * 5)' }}>
        Pick a mission!
      </h1>

      <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: '16vh', bottom: '4vh', gap: '5vw' }}>
        {CARDS.map((c, n) => (
          <button key={c.id} onClick={() => onPick(c.id)} className="tile" style={{ width: 'min(34vw, 50vh)' }} aria-label={`${c.title} – ${c.sub}`}>
            <div className="crayon-box a-bob flex flex-col items-center" style={{ ['--bg' as any]: c.bg, padding: 'calc(var(--u) * 1.4)', animationDelay: `${-n * 1.1}s` }}>
              {done.includes(c.id) && (
                <div className="a-pop absolute -right-[4%] -top-[5%] z-10" style={{ width: 'calc(var(--u) * 5)' }}>
                  <Star />
                </div>
              )}
              <div style={{ width: '68%' }}>
                {customArt[c.id] ? <img src={customArt[c.id]} alt="" className="block h-auto w-full" /> : <LunarModule variant={c.variant} />}
              </div>
              <span className="title-crayon mt-1" style={{ fontSize: 'calc(var(--u) * 3.6)' }}>
                {c.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
