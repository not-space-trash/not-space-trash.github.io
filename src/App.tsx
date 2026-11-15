import { useCallback, useState } from 'react';
import { CrayonDefs } from './components/art/Svg';
import Home from './screens/Home';
import MoonSelect from './screens/MoonSelect';
import StoryScreen from './screens/StoryScreen';
import Complete from './screens/Complete';
import { ALL_IDS, ENDING, STORIES, WORLD_STORIES, type StoryId, type World } from './data/stories';

type View =
  | { name: 'home' }
  | { name: 'moon' }
  | { name: 'story'; id: StoryId }
  | { name: 'complete'; id: StoryId }
  | { name: 'ending' };

const KEY = 'leftBehind.done.v1';
const load = (): StoryId[] => {
  try {
    return (JSON.parse(localStorage.getItem(KEY) || '[]') as StoryId[]).filter((id) => ALL_IDS.includes(id));
  } catch {
    return [];
  }
};

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' });
  const [done, setDone] = useState<StoryId[]>(load);

  const save = (d: StoryId[]) => {
    setDone(d);
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch {
      /* ignore */
    }
  };

  const pickWorld = (w: World) => {
    const ids = WORLD_STORIES[w];
    setView(ids.length > 1 ? { name: 'moon' } : { name: 'story', id: ids[0] });
  };

  const finish = (id: StoryId) => {
    const d = done.includes(id) ? done : [...done, id];
    save(d);
    setView({ name: 'complete', id });
  };

  const afterComplete = (id: StoryId) => {
    if (ALL_IDS.every((x) => done.includes(x))) return setView({ name: 'ending' });
    const sibling = STORIES[id].world === 'moon' && WORLD_STORIES.moon.some((x) => !done.includes(x));
    setView(sibling ? { name: 'moon' } : { name: 'home' });
  };

  const goHome = useCallback(() => setView({ name: 'home' }), []);
  const reset = () => save([]);

  const viewKey = view.name === 'story' || view.name === 'complete' ? `${view.name}-${view.id}` : view.name;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#14103a]">
      <CrayonDefs />
      <div key={viewKey} className="absolute inset-0">
        {view.name === 'home' && <Home done={done} onPick={pickWorld} onFinale={() => setView({ name: 'ending' })} onReset={reset} />}
        {view.name === 'moon' && <MoonSelect done={done} onPick={(id) => setView({ name: 'story', id })} onBack={goHome} />}
        {view.name === 'story' && (
          <StoryScreen
            story={STORIES[view.id]}
            onExit={() => (STORIES[view.id].world === 'moon' ? setView({ name: 'moon' }) : goHome())}
            onFinish={() => finish(view.id)}
          />
        )}
        {view.name === 'complete' && <Complete story={STORIES[view.id]} done={done} onNext={() => afterComplete(view.id)} />}
        {view.name === 'ending' && <StoryScreen story={ENDING} onExit={goHome} onFinish={goHome} />}
      </div>

      <div className="paper-grain" />
      <div className="rotate-hint fixed inset-0 z-[1000] flex-col items-center justify-center gap-4 bg-[#14103a] p-8 text-center">
        <div className="text-7xl">📱↻</div>
        <p className="title-crayon text-3xl">Turn your screen sideways!</p>
      </div>
    </div>
  );
}
