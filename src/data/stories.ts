import type { ActorSpec } from '../components/Actor';
import type { BgKey } from '../components/Background';

export type StoryId = 'falcon' | 'eagle' | 'dawn' | 'ginny';
export type World = 'moon' | 'belt' | 'mars';
export type Narrator = 'falcon' | 'dawn' | 'ginny' | 'all';

export type Scene = {
  bg: BgKey;
  text: string; // **word** = highlighted
  actors: ActorSpec[];
  shake?: number; // seconds until the ground shakes
};

export type Story = {
  id: StoryId | 'ending';
  world?: World;
  title: string;
  label: string;
  narrator: Narrator;
  scenes: Scene[];
};

type Extra = Partial<Omit<ActorSpec, 'k' | 'x' | 'y' | 'w'>>;
const a = (k: string, x: number, y: number, w: number, o: Extra = {}): ActorSpec => ({ k, x, y, w, ...o });

const GROUND = 29;
const MOON_BELOW = a('moon', 50, -88, 85); // big moon curving at the bottom of the screen
const spark = (x: number, y: number, w = 5, d = 0.8): ActorSpec => a('sparkle', x, y, w, { a: 'pop', d, i: 'wiggle' });

/* ============================ FALCON · Apollo 15 ============================ */
const falcon: Story = {
  id: 'falcon',
  world: 'moon',
  title: 'Falcon',
  label: 'Apollo 15',
  narrator: 'falcon',
  scenes: [
    { bg: 'moon', text: "Hi! I'm **Falcon**, a spacecraft!", actors: [a('falcon', 50, GROUND, 28, { a: 'pop', i: 'bob' }), spark(28, 62), spark(74, 56, 4, 1)] },
    {
      bg: 'space',
      text: 'My job: carry my friends **David** and **James** down to the Moon.',
      actors: [
        a('mothership', 22, 62, 30, { i: 'float' }),
        a('falcon', 70, 44, 22, { a: 'in-right', i: 'float' }),
        a('david', 43, 34, 8, { a: 'pop', d: 0.6, i: 'float' }),
        a('james', 52, 34, 8, { a: 'pop', d: 0.9, i: 'float' }),
      ],
    },
    {
      bg: 'space',
      text: "The mothership can't land. But **I** can!",
      actors: [MOON_BELOW, a('mothership', 22, 66, 26, { i: 'float' }), a('falcon', 62, 57, 20, { a: 'in-top' })],
    },
    { bg: 'moonMtn', text: 'I landed between giant **mountains** and a very deep **canyon**.', actors: [a('falcon', 48, GROUND, 26, { a: 'in-top' })] },
    {
      bg: 'moon',
      text: 'I carried a **Moon Buggy** too! My friends could drive and explore. Vroom!',
      actors: [a('falcon', 20, GROUND, 22), a('buggy', 66, 27, 30, { a: 'drive-in', p: { crew: true, drive: true } })],
    },
    {
      bg: 'moon',
      text: "I can't move once I land. When my friends got tired, they rested inside me.",
      actors: [
        a('falcon', 62, GROUND, 28),
        a('james', 14, GROUND, 11, { a: 'in-left', d: 0.3 }),
        a('david', 27, GROUND, 11, { a: 'in-left' }),
        a('zzz', 75, 66, 7, { a: 'pop', d: 1.6, i: 'sleep-z' }),
      ],
    },
    {
      bg: 'moon',
      text: 'After a few days, the Moon adventure was over. They parked the buggy near me.',
      actors: [
        a('falcon', 24, GROUND, 24),
        a('buggy', 84, 27, 22, { a: 'drive-in' }),
        a('david', 50, GROUND, 10, { p: { wave: true }, i: 'bob' }),
        a('james', 61, GROUND, 10, { p: { wave: true }, i: 'bob', flip: true }),
      ],
    },
    {
      bg: 'moon',
      text: "I didn't know it yet, but this was my **last** time seeing them on the Moon.",
      actors: [
        a('falcon', 28, GROUND, 26),
        a('buggy', 84, 27, 22),
        a('david', 52, GROUND, 10, { p: { wave: true }, i: 'bob' }),
        a('james', 63, GROUND, 10, { p: { wave: true }, i: 'bob', flip: true }),
        a('heart', 28, 62, 6, { a: 'pop', d: 0.8, i: 'float' }),
      ],
    },
    {
      bg: 'moon',
      text: 'They had collected lots of boxes full of **Moon rocks** and dirt!',
      actors: [
        a('david', 14, GROUND, 11),
        a('james', 86, GROUND, 11, { flip: true }),
        a('rocks', 32, GROUND, 14, { a: 'pop' }),
        a('rocks', 48, GROUND, 14, { a: 'pop', d: 0.3 }),
        a('rocks', 64, GROUND, 14, { a: 'pop', d: 0.6 }),
        spark(40, 52, 5, 1.1),
        spark(58, 50, 4, 1.3),
      ],
    },
    {
      bg: 'moon',
      text: 'Rocks feel light on the Moon, but all our gear was **too heavy** to fly home!',
      actors: [
        a('david', 13, GROUND, 11, { p: { mood: 'sad' } }),
        a('james', 87, GROUND, 11, { p: { mood: 'sad' }, flip: true }),
        a('balance', 50, 33, 34, { a: 'pop', i: 'wiggle' }),
        a('qmark', 50, 68, 9, { a: 'pop', d: 1, i: 'bob' }),
      ],
    },
    {
      bg: 'moon',
      text: '“Bring the Moon rocks home!” I said. Out flew their boots and backpacks!',
      actors: [
        a('falcon', 34, GROUND, 28),
        a('rocks', 88, GROUND, 12),
        a('boot', 44, 36, 6, { a: 'toss', d: 0.8 }),
        a('backpack', 49, 38, 5, { a: 'toss', d: 1.5 }),
        a('boot', 54, 36, 6, { a: 'toss', d: 2.2, flip: true }),
        a('backpack', 59, 38, 5, { a: 'toss', d: 2.9 }),
      ],
    },
    {
      bg: 'moon',
      text: 'They looked sad, so I cheered them up: “Use my **top half** to fly home!”',
      actors: [
        a('falcon', 60, GROUND, 28, { i: 'bob' }),
        a('james', 22, GROUND, 11, { p: { mood: 'sad' } }),
        a('david', 34, GROUND, 11, { p: { mood: 'sad' } }),
        a('heart', 60, 72, 6, { a: 'pop', d: 0.5, i: 'float' }),
      ],
    },
    {
      bg: 'moon',
      text: '**POP!** The bolts popped open and I split in two!',
      actors: [
        a('falcon', 46, GROUND, 28, { p: { part: 'bottom' } }),
        a('falcon', 46, GROUND, 28, { p: { part: 'top' }, a: 'split-up', d: 0.5 }),
        a('boom', 76, 60, 17, { a: 'pop', d: 0.4, p: { text: 'POP!' }, i: 'wiggle' }),
      ],
    },
    {
      bg: 'space',
      text: 'My top half flew them and the Moon rocks safely to the mothership.',
      actors: [MOON_BELOW, a('mothership', 72, 68, 28, { i: 'float' }), a('falcon', 26, 62, 20, { p: { part: 'top' }, a: 'in-left', i: 'float' }), spark(48, 66, 5, 1.2)],
    },
    {
      bg: 'moon',
      text: 'Then NASA crashed my empty top half into the Moon on purpose. **BOOM!**',
      shake: 1.6,
      actors: [
        a('falcon', 80, GROUND, 22, { p: { part: 'bottom' } }),
        a('falcon', 34, 28, 24, { p: { part: 'top' }, a: 'crash', rot: 16 }),
        a('boom', 34, 46, 18, { a: 'pop', d: 1.6, p: { text: 'BOOM!' }, i: 'wiggle' }),
      ],
    },
    {
      bg: 'moon',
      text: 'The shaking ground tested the new **science tools** my friends had set up!',
      shake: 0.3,
      actors: [a('ripple', 40, 24, 60), a('instrument', 74, GROUND, 13, { i: 'jitter' }), spark(60, 60, 5, 0.5)],
    },
    {
      bg: 'moon',
      text: 'Now my **bottom half** still sits on the Moon, right by the parked buggy.',
      actors: [
        a('falcon', 34, GROUND, 28, { p: { part: 'bottom' }, a: 'pop', i: 'bob' }),
        a('flag', 55, GROUND, 9),
        a('buggy', 78, 27, 26, { a: 'drive-in' }),
        spark(34, 56, 5, 1),
      ],
    },
    {
      bg: 'moon',
      text: 'Satellites still take pictures of me to test their cameras. **Say cheese!**',
      actors: [
        a('falcon', 36, GROUND, 28, { p: { part: 'bottom' } }),
        a('satellite', 74, 62, 18, { a: 'in-right', i: 'float', flip: true }),
        a('flash', 62, 50, 7, { i: 'flash' }),
      ],
    },
  ],
};

/* ============================ EAGLE · Apollo 11 ============================ */
const eagle: Story = {
  id: 'eagle',
  world: 'moon',
  title: 'Eagle',
  label: 'Apollo 11',
  narrator: 'falcon',
  scenes: [
    {
      bg: 'space',
      text: 'Long before my trip, I had a friend just like me. His name was **Eagle**!',
      actors: [a('eagle', 50, 36, 26, { a: 'pop', i: 'float' }), spark(28, 64), spark(74, 60, 4, 1.1)],
    },
    {
      bg: 'space',
      text: 'Eagle carried **Neil** and **Buzz** to the Moon. They were the very first humans there!',
      actors: [
        MOON_BELOW,
        a('eagle', 68, 56, 20, { a: 'in-top' }),
        a('neil', 20, 46, 9, { i: 'float' }),
        a('buzz', 33, 46, 9, { i: 'float', flip: true }),
        a('star', 86, 70, 8, { a: 'pop', d: 1.8, i: 'glow' }),
      ],
    },
    {
      bg: 'moon',
      text: 'Eagle landed with almost **no fuel**. That was very risky!',
      actors: [a('eagle', 40, GROUND, 28, { a: 'in-top' }), a('gauge', 76, 52, 17, { a: 'pop', d: 2.4, p: { level: 0.06 }, i: 'jitter' })],
    },
    {
      bg: 'moon',
      text: "It was the first time ever, so they were extra careful and couldn't stay out long.",
      actors: [
        a('footprints', 56, 26, 40, { a: 'fadein' }),
        a('eagle', 24, GROUND, 24),
        a('neil', 50, GROUND, 11, { i: 'bob' }),
        a('buzz', 63, GROUND, 11, { i: 'bob', flip: true, d: 0.2 }),
        a('hourglass', 86, 46, 7, { a: 'pop', d: 0.8, i: 'wiggle' }),
      ],
    },
    {
      bg: 'moon',
      text: 'Time to go! **POP!** Special bolts split Eagle in two.',
      actors: [
        a('eagle', 46, GROUND, 28, { p: { part: 'bottom' } }),
        a('eagle', 46, GROUND, 28, { p: { part: 'top' }, a: 'split-up', d: 0.5 }),
        a('boom', 76, 60, 17, { a: 'pop', d: 0.4, p: { text: 'POP!' }, i: 'wiggle' }),
      ],
    },
    {
      bg: 'moon',
      text: "His top cabin zoomed up with Neil and Buzz. His **bottom half** stayed on the Moon.",
      actors: [a('eagle', 50, GROUND, 28, { p: { part: 'bottom' } }), a('eagle', 50, GROUND, 28, { p: { part: 'top' }, a: 'out-up', d: 0.4 })],
    },
    {
      bg: 'space',
      text: 'At the mothership, they took the Moon rocks. Then they stuffed their **trash** inside Eagle.',
      actors: [
        a('mothership', 24, 62, 28, { i: 'float' }),
        a('rocks', 36, 36, 10, { a: 'pop', i: 'bob' }),
        a('eagle', 74, 46, 20, { p: { part: 'top' }, a: 'in-right', i: 'float' }),
        a('trash', 57, 44, 8, { a: 'pop', d: 1, i: 'bob' }),
      ],
    },
    {
      bg: 'space',
      text: "Unlike my top half, Eagle's top half was **not** crashed. It was just let go to float.",
      actors: [
        a('eagle', 62, 44, 22, { p: { part: 'top' }, i: 'drift' }),
        a('boom', 26, 50, 15, { a: 'pop', p: { text: 'BOOM!' } }),
        a('nosign', 26, 49, 17, { a: 'pop', d: 0.6, z: 5 }),
      ],
    },
    {
      bg: 'moon',
      text: "Eagle's bottom half is still on the Moon, just like mine.",
      actors: [
        a('footprints', 36, 26, 36, { a: 'fadein' }),
        a('eagle', 46, GROUND, 28, { p: { part: 'bottom' }, a: 'pop', i: 'bob' }),
        a('flag', 66, GROUND, 9),
        a('falcon', 86, GROUND, 17, { p: { part: 'bottom' }, a: 'in-right', d: 0.8 }),
      ],
    },
    {
      bg: 'space',
      text: 'But nobody knows where his top half went. It might still be floating around the Moon!',
      actors: [
        MOON_BELOW,
        a('qmark', 32, 62, 16, { a: 'pop', i: 'wiggle' }),
        a('eagle', 78, 72, 7, { p: { part: 'top', sleepy: true }, i: 'drift' }),
        a('sparkle', 86, 74, 4, { i: 'wiggle' }),
      ],
    },
  ],
};

/* ============================ DAWN · Asteroid Belt ============================ */
const dawn: Story = {
  id: 'dawn',
  world: 'belt',
  title: 'Dawn',
  label: 'Dawn',
  narrator: 'dawn',
  scenes: [
    { bg: 'belt', text: "Beep boop! I'm **Dawn**. I'm a robot spacecraft. No astronauts inside!", actors: [a('dawn', 50, 40, 38, { a: 'pop', i: 'float', p: { glow: true } })] },
    {
      bg: 'space',
      text: 'Scientists on Earth steered me from far, far away.',
      actors: [
        a('earth', 18, 38, 18, { a: 'pop', i: 'float', p: { face: true } }),
        a('signal', 37, 46, 12, { a: 'fadein', d: 0.8, i: 'wiggle' }),
        a('dawn', 72, 44, 30, { a: 'in-right', i: 'float', p: { glow: true } }),
      ],
    },
    {
      bg: 'belt',
      text: 'My job: explore the **Asteroid Belt**, a place full of space rocks!',
      actors: [
        a('dawn', 28, 48, 26, { a: 'in-left', i: 'float', p: { glow: true } }),
        a('asteroid', 68, 42, 14, { a: 'pop', d: 0.4, i: 'drift' }),
        a('asteroid', 85, 62, 9, { a: 'pop', d: 0.7, i: 'drift', p: { shape: 2 } }),
        a('asteroid', 56, 66, 7, { a: 'pop', d: 1, i: 'drift', p: { shape: 1, face: true } }),
      ],
    },
    {
      bg: 'belt',
      text: 'I did something **no one** had ever done: I circled **two** different worlds!',
      actors: [
        a('vesta', 26, 38, 22, { a: 'pop', i: 'bob' }),
        a('ceres', 74, 38, 22, { a: 'pop', d: 0.3, i: 'bob' }),
        a('dawn', 50, 64, 18, { i: 'float', p: { glow: true } }),
        spark(50, 44, 5, 1),
      ],
    },
    {
      bg: 'belt',
      text: 'First, I took pictures of a giant, bumpy rock named **Vesta**.',
      actors: [a('orbit', 50, 34, 60, { a: 'pop', p: { body: 'vesta' } }), a('flash', 76, 60, 6, { i: 'flash' })],
    },
    {
      bg: 'belt',
      text: 'Then I flew to an icy dwarf planet named **Ceres**.',
      actors: [a('orbit', 50, 34, 60, { a: 'pop', p: { body: 'ceres' } })],
    },
    {
      bg: 'space',
      text: 'I found a big secret: Ceres has **salty, muddy water** hiding deep underground!',
      actors: [
        a('ceresCut', 50, 34, 30, { a: 'pop' }),
        a('drops', 80, 50, 10, { a: 'pop', d: 0.8, i: 'bob' }),
        a('dawn', 17, 60, 18, { a: 'in-left', i: 'float', p: { glow: true } }),
        spark(24, 38, 4, 1.2),
      ],
    },
    {
      bg: 'space',
      text: 'After many years, my fuel tank ran **empty**.',
      actors: [a('dawn', 36, 42, 30, { i: 'float', p: { dim: true } }), a('gauge', 74, 50, 20, { a: 'pop', d: 0.5, p: { level: 0 }, i: 'jitter' })],
    },
    {
      bg: 'space',
      text: "Without fuel, I couldn't turn my antenna to Earth. I couldn't talk to my friends anymore.",
      actors: [
        a('earth', 20, 40, 18, { p: { face: true }, i: 'float' }),
        a('signal', 44, 46, 12, { p: { broken: true }, flip: true, i: 'wiggle' }),
        a('dawn', 70, 44, 28, { p: { dim: true, droop: true }, i: 'float' }),
      ],
    },
    {
      bg: 'belt',
      text: 'Old spacecraft often crash when their job is done.',
      shake: 1.6,
      actors: [
        a('ceres', 68, 30, 30),
        a('dawn', 58, 56, 14, { a: 'crash', rot: -25, p: { dim: true } }),
        a('boom', 60, 60, 14, { a: 'pop', d: 1.6, p: { text: 'BOOM!' } }),
      ],
    },
    {
      bg: 'belt',
      text: 'But Ceres has water! Tiny Earth **germs** on me could spoil it.',
      actors: [
        a('ceres', 74, 30, 28),
        a('dawn', 28, 44, 24, { i: 'float', p: { dim: true } }),
        a('germ', 17, 36, 7, { a: 'pop', d: 0.5, i: 'wiggle' }),
        a('germ', 40, 38, 6, { a: 'pop', d: 0.9, i: 'wiggle' }),
        a('germ', 30, 64, 5, { a: 'pop', d: 1.2, i: 'wiggle' }),
        a('drops', 74, 64, 8, { a: 'pop', d: 1.4, i: 'bob' }),
      ],
    },
    {
      bg: 'belt',
      text: 'So there was a special rule: **no crashing!**',
      actors: [a('boom', 50, 36, 24, { p: { text: 'CRASH!' } }), a('nosign', 50, 35, 27, { a: 'pop', z: 5 })],
    },
    {
      bg: 'belt',
      text: '“Park me safely in space above Ceres,” I said. And my friends did!',
      actors: [a('ceres', 72, 30, 28), a('dawn', 28, 44, 24, { i: 'float', p: { dim: true } }), a('heart', 50, 60, 6, { a: 'pop', d: 0.8, i: 'float' })],
    },
    {
      bg: 'belt',
      text: 'They steered me into a safe path high above Ceres.',
      actors: [a('orbit', 50, 34, 60, { a: 'pop', p: { body: 'ceres', dim: true } })],
    },
    {
      bg: 'belt',
      text: "Nothing on me is broken. I'm just asleep, circling Ceres **forever**.",
      actors: [a('orbit', 50, 34, 60, { p: { body: 'ceres', dim: true, sleep: true } }), a('zzz', 72, 66, 8, { a: 'pop', d: 0.6, i: 'sleep-z' }), spark(22, 62, 4, 1)],
    },
  ],
};

/* ============================ GINNY · Mars ============================ */
const ginny: Story = {
  id: 'ginny',
  world: 'mars',
  title: 'Ginny',
  label: 'Ingenuity',
  narrator: 'ginny',
  scenes: [
    { bg: 'mars', text: "Hi! I'm **Ingenuity**. My friends call me **Ginny**!", actors: [a('ginny', 50, GROUND, 24, { a: 'pop', i: 'bob' }), spark(30, 62), spark(72, 56, 4, 1)] },
    {
      bg: 'mars',
      text: "I'm a tiny **helicopter** on Mars. I'm a robot, so no astronauts inside!",
      actors: [
        a('ginny', 36, GROUND, 22, { i: 'bob' }),
        a('david', 72, 30, 11, { o: 0.5, a: 'fadein' }),
        a('nosign', 72, 31, 15, { a: 'pop', d: 0.6, z: 5 }),
      ],
    },
    { bg: 'mars', text: 'I rode here tucked under my big best friend, the **Perseverance** rover!', actors: [a('rover', 50, 28, 42, { a: 'drive-in', p: { carry: true, drive: true } })] },
    {
      bg: 'mars',
      text: "My job: test if a helicopter can fly in Mars' super thin air.",
      actors: [a('rover', 78, 28, 30, { flip: true }), a('ginny', 36, GROUND, 20, { a: 'rise', p: { spin: true } }), spark(60, 56, 4, 1.4)],
    },
    {
      bg: 'mars',
      text: "Everyone thought I'd only fly a few times. They thought the **cold** would break me!",
      actors: [
        a('ginny', 40, GROUND, 22, { i: 'bob' }),
        a('snow', 64, 62, 10, { a: 'pop', i: 'float' }),
        a('snow', 82, 50, 7, { a: 'pop', d: 0.4, i: 'float' }),
        a('snow', 22, 64, 6, { a: 'pop', d: 0.7, i: 'float' }),
      ],
    },
    {
      bg: 'mars',
      text: 'But I was **stronger**! I flew dozens of times!',
      actors: [
        a('ginny', 50, 46, 20, { i: 'float', p: { spin: true } }),
        a('star', 24, 50, 8, { a: 'pop', i: 'glow' }),
        a('star', 77, 58, 8, { a: 'pop', d: 0.3, i: 'glow' }),
        a('star', 36, 72, 6, { a: 'pop', d: 0.6, i: 'glow' }),
        a('star', 64, 74, 6, { a: 'pop', d: 0.9, i: 'glow' }),
      ],
    },
    {
      bg: 'marsDunes',
      text: 'I flew ahead and took pictures, so my rover friend knew the safest way to drive.',
      actors: [
        a('rover', 22, 28, 30),
        a('ginny', 66, 50, 18, { a: 'in-left', i: 'float', p: { spin: true } }),
        a('flash', 74, 40, 7, { i: 'flash' }),
      ],
    },
    {
      bg: 'marsDunes',
      text: 'One day, I landed in bumpy sand hills… **CRACK!** A blade snapped off!',
      shake: 2.4,
      actors: [a('ginny', 46, GROUND, 24, { a: 'in-top', p: { broken: true } }), a('boom', 74, 52, 18, { a: 'pop', d: 2.4, p: { text: 'CRACK!' }, i: 'wiggle' })],
    },
    {
      bg: 'marsDunes',
      text: 'I could never fly again. There were no astronauts on Mars to fix me.',
      actors: [
        a('ginny', 34, GROUND, 24, { p: { broken: true } }),
        a('david', 72, 30, 11, { o: 0.5 }),
        a('nosign', 72, 31, 15, { a: 'pop', d: 0.6, z: 5 }),
      ],
    },
    {
      bg: 'marsDunes',
      text: '“Keep driving and finish our mission!” I told my rover friend.',
      actors: [a('ginny', 28, GROUND, 24, { p: { broken: true } }), a('rover', 70, 28, 34, { flip: true }), spark(46, 58, 5, 0.8)],
    },
    {
      bg: 'marsDunes',
      text: 'He took one last picture. “I flew **way more** than anyone dreamed!”',
      actors: [
        a('ginny', 28, GROUND, 24, { p: { broken: true } }),
        a('rover', 70, 28, 34, { flip: true }),
        a('flash', 51, 42, 9, { i: 'flash' }),
        a('heart', 28, 62, 6, { a: 'pop', d: 0.6, i: 'float' }),
      ],
    },
    {
      bg: 'marsDunes',
      text: 'So my rover friend drove away and left me in the quiet sand hills.',
      actors: [a('ginny', 28, GROUND, 24, { p: { broken: true } }), a('rover', 62, 28, 34, { a: 'drive-out', p: { drive: true } })],
    },
    {
      bg: 'marsDawn',
      text: 'My solar panel and computer brain still work! Every morning, I check the **Mars weather**.',
      actors: [a('ginny', 36, GROUND, 26, { p: { broken: true } }), a('weather', 72, 54, 17, { a: 'pop', i: 'float' }), spark(56, 66, 4, 1)],
    },
    {
      bg: 'marsDawn',
      text: 'And I wait, hoping **astronauts** will come to Mars to visit me!',
      actors: [a('ginny', 32, GROUND, 26, { p: { broken: true }, i: 'bob' }), a('dream', 68, 42, 30, { a: 'pop', i: 'float' }), a('heart', 48, 58, 5, { a: 'pop', d: 1, i: 'float' })],
    },
  ],
};

/* ============================ FINALE ============================ */
const ending: Story = {
  id: 'ending',
  title: 'Our Friends',
  label: 'Finale',
  narrator: 'all',
  scenes: [
    {
      bg: 'space',
      text: '**Eagle**, **Falcon**, **Dawn** and **Ginny** did their very best to help us explore space.',
      actors: [
        a('eagle', 16, 38, 18, { a: 'pop', i: 'float' }),
        a('falcon', 37, 38, 18, { a: 'pop', d: 0.2, i: 'float' }),
        a('dawn', 63, 46, 20, { a: 'pop', d: 0.4, i: 'float', p: { glow: true } }),
        a('ginny', 87, 38, 13, { a: 'pop', d: 0.6, i: 'float' }),
      ],
    },
    {
      bg: 'space',
      text: 'Just like us, they have limits. And they pushed all the way to the **finish line**!',
      actors: [
        a('eagle', 12, 36, 13, { a: 'in-left', i: 'float' }),
        a('falcon', 28, 36, 13, { a: 'in-left', d: 0.2, i: 'float' }),
        a('dawn', 50, 44, 16, { a: 'in-left', d: 0.4, i: 'float', p: { glow: true } }),
        a('ginny', 69, 36, 10, { a: 'in-left', d: 0.6, i: 'float' }),
        a('finish', 88, 34, 13, { a: 'pop', d: 1, i: 'wiggle' }),
        spark(76, 68, 5, 1.4),
      ],
    },
    {
      bg: 'moon',
      text: 'They may be broken, out of fuel, and left behind… but they are **not trash**!',
      actors: [
        a('eagle', 13, GROUND, 17, { p: { part: 'bottom' } }),
        a('falcon', 31, GROUND, 17, { p: { part: 'bottom' } }),
        a('trash', 50, 48, 10, { a: 'pop', i: 'bob' }),
        a('nosign', 50, 47, 14, { a: 'pop', d: 0.6, z: 5 }),
        a('dawn', 69, 46, 17, { i: 'float', p: { dim: true } }),
        a('ginny', 89, GROUND, 14, { p: { broken: true } }),
      ],
    },
    {
      bg: 'moon',
      text: 'They are the **footprints** we left in space, resting after a job well done!',
      actors: [
        a('footprints', 50, 31, 46, { a: 'fadein' }),
        a('eagle', 20, GROUND, 17, { p: { part: 'bottom', sleepy: true }, i: 'bob' }),
        a('falcon', 38, GROUND, 17, { p: { part: 'bottom', sleepy: true }, i: 'bob', d: 0.4 }),
        a('dawn', 62, 44, 17, { i: 'float', p: { dim: true, sleep: true } }),
        a('ginny', 82, GROUND, 14, { p: { broken: true } }),
        a('heart', 50, 62, 9, { a: 'pop', d: 0.5, i: 'glow' }),
        a('zzz', 28, 52, 6, { a: 'pop', d: 1, i: 'sleep-z' }),
        spark(70, 68, 5, 1),
        spark(34, 70, 4, 1.3),
      ],
    },
  ],
};

export const STORIES: Record<StoryId, Story> = { falcon, eagle, dawn, ginny };
export const ENDING = ending;
export const ALL_IDS: StoryId[] = ['falcon', 'eagle', 'dawn', 'ginny'];
export const WORLD_STORIES: Record<World, StoryId[]> = { moon: ['falcon', 'eagle'], belt: ['dawn'], mars: ['ginny'] };
