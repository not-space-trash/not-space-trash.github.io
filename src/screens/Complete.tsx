import Background from '../components/Background';
import Narrator from '../components/Narrator';
import { Star, Sparkle } from '../components/art/props';
import { IconNext } from '../components/Icons';
import { ALL_IDS, type Story, type StoryId } from '../data/stories';

export default function Complete({ story, done, onNext }: { story: Story; done: StoryId[]; onNext: () => void }) {
  const allDone = ALL_IDS.every((id) => done.includes(id));
  return (
    <div className="a-screen absolute inset-0 overflow-hidden">
      <Background bg="space" />
      {[
        [14, 24, 4], [84, 22, 5], [24, 70, 3], [76, 68, 4], [50, 12, 3], [92, 52, 3], [8, 50, 3],
      ].map(([x, y, w], n) => (
        <div key={n} className="a-float absolute" style={{ left: `${x}%`, top: `${y}%`, width: `calc(var(--u) * ${w})`, animationDelay: `${n * 0.4}s` }}>
          <Sparkle />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: '2.5vh' }}>
        <div className="relative a-pop" style={{ width: 'calc(var(--u) * 20)' }}>
          <div className="a-glow">
            <Star />
          </div>
          <div className="absolute left-1/2 top-[52%] flex -translate-x-1/2 -translate-y-1/2 justify-center" style={{ width: '58%' }}>
            <Narrator who={story.narrator} size={11} showName={false} />
          </div>
        </div>
        <h1 className="title-crayon text-center" style={{ fontSize: 'calc(var(--u) * 5.6)' }}>
          Mission complete!
        </h1>
        <div className="flex gap-2" aria-label={`${done.length} of 4 friends met`}>
          {ALL_IDS.map((id, n) => (
            <div key={id} className={done.includes(id) ? 'a-pop' : ''} style={{ width: 'calc(var(--u) * 4.2)', opacity: done.includes(id) ? 1 : 0.25, filter: done.includes(id) ? 'none' : 'grayscale(1)', animationDelay: `${0.4 + n * 0.15}s` }}>
              <Star />
            </div>
          ))}
        </div>
        <button onClick={onNext} className="crayon-btn a-glow flex items-center gap-3" style={{ ['--bg' as any]: '#7bd36b', padding: 'calc(var(--u) * .9) calc(var(--u) * 2.6)' }}>
          <span className="font-display" style={{ fontSize: 'calc(var(--u) * 3.2)' }}>
            {allDone ? 'Finale' : 'More worlds'}
          </span>
          <span style={{ width: 'calc(var(--u) * 3.2)' }}>
            <IconNext />
          </span>
        </button>
      </div>
    </div>
  );
}
