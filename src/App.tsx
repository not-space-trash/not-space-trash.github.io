import { useCallback, useEffect, useRef, useState } from 'react';
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
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return Array.from(new Set(raw)).filter((id): id is StoryId => ALL_IDS.includes(id));
  } catch {
    return [];
  }
};

const isValidView = (v: unknown): v is View => {
  if (!v || typeof v !== 'object') return false;
  const view = v as Partial<View>;
  if (view.name === 'home' || view.name === 'moon' || view.name === 'ending') return true;
  if (view.name === 'story' || view.name === 'complete') {
    return typeof (view as { id?: unknown }).id === 'string' && ALL_IDS.includes((view as { id: StoryId }).id);
  }
  return false;
};

const sameView = (a: View, b: View) =>
  a.name === b.name && (!('id' in a) || !('id' in b) || a.id === b.id);

export default function App() {
  const [view, setView] = useState<View>(() => {
    const s = window.history.state?.view;
    return isValidView(s) ? s : { name: 'home' };
  });
  const viewRef = useRef(view);
  viewRef.current = view;
  const [done, setDone] = useState<StoryId[]>(load);

  useEffect(() => {
    if (!isValidView(window.history.state?.view)) {
      window.history.replaceState({ view: { name: 'home' } }, '');
    }
    const onPop = (e: PopStateEvent) => {
      const next = e.state?.view;
      const resolved: View = isValidView(next) ? next : { name: 'home' };
      viewRef.current = resolved;
      setView(resolved);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((next: View) => {
    if (sameView(viewRef.current, next)) return;
    viewRef.current = next;
    window.history.pushState({ view: next }, '');
    setView(next);
  }, []);

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
    navigate(ids.length > 1 ? { name: 'moon' } : { name: 'story', id: ids[0] });
  };

  const finish = (id: StoryId) => {
    const d = done.includes(id) ? done : [...done, id];
    save(d);
    navigate({ name: 'complete', id });
  };

  const afterComplete = (id: StoryId) => {
    if (ALL_IDS.every((x) => done.includes(x))) return navigate({ name: 'ending' });
    const sibling = STORIES[id].world === 'moon' && WORLD_STORIES.moon.some((x) => !done.includes(x));
    navigate(sibling ? { name: 'moon' } : { name: 'home' });
  };

  const goHome = useCallback(() => navigate({ name: 'home' }), [navigate]);
  const reset = () => save([]);

  const viewKey = view.name === 'story' || view.name === 'complete' ? `${view.name}-${view.id}` : view.name;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#14103a]">
      <CrayonDefs />
      <div key={viewKey} className="absolute inset-0">
        {view.name === 'home' && <Home done={done} onPick={pickWorld} onFinale={() => navigate({ name: 'ending' })} onReset={reset} />}
        {view.name === 'moon' && <MoonSelect done={done} onPick={(id) => navigate({ name: 'story', id })} onBack={goHome} />}
        {view.name === 'story' && (
          <StoryScreen
            story={STORIES[view.id]}
            onExit={() => (STORIES[view.id].world === 'moon' ? navigate({ name: 'moon' }) : goHome())}
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
