import apollo15Falcon from '../assets/nasa/apollo15-falcon.jpg';
import apollo15Lro from '../assets/nasa/apollo15-lro.jpg';
import apollo11Eagle from '../assets/nasa/apollo11-eagle.jpg';
import dawnCeres from '../assets/nasa/dawn-ceres.jpg';
import marsIngenuity from '../assets/nasa/mars-ingenuity.jpg';
import ingenuityBlade from '../assets/nasa/ingenuity-blade.jpg';
import type { StoryId } from './stories';

export type NasaPhoto = {
  id: string;
  story: StoryId;
  explorer: string;
  badge: string;
  cardBg: string;
  title: string;
  storyQuote: string;
  kidFact: string;
  catalogId: string;
  image: string;
  credit: string;
  sourceUrl: string;
};

export const NASA_EVIDENCE: NasaPhoto[] = [
  {
    id: 'apollo15-surface',
    story: 'falcon',
    explorer: 'Falcon',
    badge: 'Apollo 15 · 1971',
    cardBg: '#fff1c2',
    title: 'Falcon & the Moon Buggy',
    storyQuote: '“Now my **bottom half** still sits on the Moon, right by the parked buggy.”',
    kidFact:
      'Astronauts **David** and **James** took this **real photo** on the Moon! That gold lander is **Falcon**, and the car on the right is the real **Moon Buggy**.',
    catalogId: 'AS15-88-11866',
    image: apollo15Falcon,
    credit: 'Credit: NASA / Johnson Space Center',
    sourceUrl: 'https://images.nasa.gov/details/as15-88-11866',
  },
  {
    id: 'apollo15-lro',
    story: 'falcon',
    explorer: 'Falcon',
    badge: 'Moon Satellite',
    cardBg: '#fff1c2',
    title: 'Tracks Seen From Space!',
    storyQuote: '“Satellites still take pictures of me to test their cameras. **Say cheese!**”',
    kidFact:
      'Years later, a **NASA Moon satellite** zoomed in from high above! You can still spot the real **Moon Buggy** and the **tire tracks** in the dust.',
    catalogId: 'LROC M175252641L/R',
    image: apollo15Lro,
    credit: 'Credit: NASA / GSFC / Arizona State University',
    sourceUrl: 'https://lroc.im-ldi.com/images/1198',
  },
  {
    id: 'apollo11-ascent',
    story: 'eagle',
    explorer: 'Eagle',
    badge: 'Apollo 11 · 1969',
    cardBg: '#d9efff',
    title: 'Eagle Flying Back Up',
    storyQuote: '“His **top cabin** zoomed up with Neil and Buzz!”',
    kidFact:
      'Astronaut Michael Collins took this **real photo** from the mothership! You can see **Eagle** flying back up—with **Earth** rising behind!',
    catalogId: 'AS11-44-6642',
    image: apollo11Eagle,
    credit: 'Credit: NASA / Johnson Space Center',
    sourceUrl: 'https://earthobservatory.nasa.gov/images/145332/an-eagle-takes-off-for-home',
  },
  {
    id: 'dawn-ceres',
    story: 'dawn',
    explorer: 'Dawn',
    badge: 'Dawn · 2015',
    cardBg: '#e8ddff',
    title: 'Bright Salty Spots!',
    storyQuote: '“I found a big secret: Ceres has **salty, muddy water** hiding deep underground!”',
    kidFact:
      '**Dawn** took this **real picture** of **Ceres**. See those shiny **white spots**? That is real **salt** left behind by water from underground!',
    catalogId: 'PIA19562',
    image: dawnCeres,
    credit: 'Credit: NASA / JPL-Caltech / UCLA / MPS / DLR / IDA',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19562',
  },
  {
    id: 'ingenuity-airfield',
    story: 'ginny',
    explorer: 'Ginny',
    badge: 'Mars · 2021',
    cardBg: '#ffd8c2',
    title: 'Tiny Ginny on Mars',
    storyQuote: '“I flew **way more** than anyone dreamed!”',
    kidFact:
      'Her best friend **Perseverance** snapped this **real photo** on Mars! People thought Ginny might only fly 5 times—she flew **72 times**!',
    catalogId: 'PIA25213',
    image: marsIngenuity,
    credit: 'Credit: NASA / JPL-Caltech / ASU / MSSS',
    sourceUrl: 'https://www.jpl.nasa.gov/images/pia25213-ingenuity-at-airfield-d/',
  },
  {
    id: 'ingenuity-blade',
    story: 'ginny',
    explorer: 'Ginny',
    badge: 'Mars · 2024',
    cardBg: '#ffd8c2',
    title: 'The Snapped Blade Shadow',
    storyQuote: '“One day, I landed in bumpy sand hills… **CRACK!** A blade snapped off!”',
    kidFact:
      'Ginny took this **real picture** of her own **shadow** on Mars! Look closely at the **tip** of the shadow—you can see where the blade broke.',
    catalogId: 'PIA26243',
    image: ingenuityBlade,
    credit: 'Credit: NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26243',
  },
];
