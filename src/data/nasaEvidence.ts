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
  mission: string;
  title: string;
  catalogId: string;
  date: string;
  image: string;
  caption: string;
  credit: string;
  sourceUrl: string;
};

export const NASA_EVIDENCE: NasaPhoto[] = [
  {
    id: 'apollo15-surface',
    story: 'falcon',
    mission: 'Apollo 15 · Falcon',
    title: 'Lunar Module Falcon, Moon Buggy & Hadley Delta',
    catalogId: 'NASA Photo AS15-88-11866',
    date: 'August 1, 1971',
    image: apollo15Falcon,
    caption:
      'Astronaut James Irwin salutes beside the Lunar Module Falcon and Lunar Roving Vehicle beneath Hadley Delta mountain (photographed by Commander David Scott). Falcon’s descent stage and the rover remain on the Moon.',
    credit: 'Credit: NASA / Johnson Space Center',
    sourceUrl: 'https://images.nasa.gov/details/as15-88-11866',
  },
  {
    id: 'apollo15-lro',
    story: 'falcon',
    mission: 'Apollo 15 · LRO Orbital View',
    title: 'Lunar Reconnaissance Orbiter Spots Rover & Tracks',
    catalogId: 'LROC NAC M175252641L/R',
    date: 'LRO Mission Archive',
    image: apollo15Lro,
    caption:
      'Modern lunar orbiter imagery clearly shows the parked Apollo 15 Lunar Roving Vehicle near Falcon’s descent stage along with astronaut and rover tracks preserved in the lunar soil.',
    credit: 'Credit: NASA / GSFC / Arizona State University',
    sourceUrl: 'https://lroc.im-ldi.com/images/1198',
  },
  {
    id: 'apollo11-ascent',
    story: 'eagle',
    mission: 'Apollo 11 · Eagle',
    title: 'Eagle Ascent Stage Over the Moon with Earth Rising',
    catalogId: 'NASA Photo AS11-44-6642',
    date: 'July 21, 1969',
    image: apollo11Eagle,
    caption:
      'Captured by Michael Collins from Command Module Columbia as Eagle returned Neil Armstrong and Buzz Aldrin from Tranquility Base. After sample transfer, Eagle’s ascent stage was released in lunar orbit.',
    credit: 'Credit: NASA / Johnson Space Center',
    sourceUrl: 'https://earthobservatory.nasa.gov/images/145332/an-eagle-takes-off-for-home',
  },
  {
    id: 'dawn-ceres',
    story: 'dawn',
    mission: 'Dawn · Ceres',
    title: 'Dwarf Planet Ceres & Bright Salt Deposits',
    catalogId: 'NASA / JPL PIA19562',
    date: 'May 5–6, 2015',
    image: dawnCeres,
    caption:
      'Imaged by NASA’s Dawn spacecraft from 8,400 miles (13,600 km) above Ceres. Bright spots in Occator Crater revealed carbonate salts from subsurface brine—so Dawn was parked safely in orbit rather than crashed.',
    credit: 'Credit: NASA / JPL-Caltech / UCLA / MPS / DLR / IDA',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19562',
  },
  {
    id: 'ingenuity-airfield',
    story: 'ginny',
    mission: 'Mars 2020 · Ingenuity',
    title: 'Ingenuity Helicopter in Jezero Crater',
    catalogId: 'NASA / JPL PIA25213 (Mastcam-Z)',
    date: 'June 15, 2021 (Sol 114)',
    image: marsIngenuity,
    caption:
      'Photographed by the Perseverance rover’s Mastcam-Z camera at Airfield D. Built as a 5-flight technology demonstrator, Ingenuity flew 72 times across nearly three years on Mars.',
    credit: 'Credit: NASA / JPL-Caltech / ASU / MSSS',
    sourceUrl: 'https://www.jpl.nasa.gov/images/pia25213-ingenuity-at-airfield-d/',
  },
  {
    id: 'ingenuity-blade',
    story: 'ginny',
    mission: 'Mars Helicopter · Flight 72',
    title: 'Shadow of Ingenuity’s Damaged Rotor Blade',
    catalogId: 'NASA / JPL PIA26243',
    date: 'January 2024',
    image: ingenuityBlade,
    caption:
      'After a rough landing on sand ripples during its 72nd and final flight on Jan. 18, 2024, Ingenuity’s camera captured the shadow of its snapped rotor blade tip.',
    credit: 'Credit: NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26243',
  },
];
