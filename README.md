# 🚀 Don't Call Us Space Trash!

*A crayon-style interactive storybook about the real NASA spacecraft we left behind.*

Built by **4 Orang 0 Solusi** for the **2026 NASA Space Apps Challenge**: *"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars."*

- **Play the story:** [Don't Call Us Space Trash! Live App](https://not-space-trash.github.io/)
- **Meet the team:** [Team 4 Orang 0 Solusi on NASA Space Apps](https://www.spaceappschallenge.org/2026/find-a-team/4-orang-0-solusi/?tab=members)
- **View the source:** [not-space-trash.github.io GitHub Repository](https://github.com/not-space-trash/not-space-trash.github.io)

---

## 🌙 Project Overview

What happens to a space explorer when its mission ends?

**Don't Call Us Space Trash!** turns historic NASA hardware into friendly illustrated characters who tell their own stories for younger learners. Starting right from a space map with an immediate guide (*"Tap a world to read true NASA stories of real spacecraft still up in space!"*), visitors explore the **Moon**, the **Asteroid Belt**, and **Mars** to meet real spacecraft that completed extraordinary science and still rest across the solar system today.

While the dialogue and crayon illustrations are creative storytelling, every mission arc is rooted in historical NASA records—and users can open the **NASA Photos & Data** viewer directly from the home screen or inside any story to inspect real archival NASA photographs alongside catalog IDs, credits, and original source links.

---

## 🧩 Meet the Explorers

1. **Falcon — Apollo 15, Moon:** Explains how its descent stage became a launchpad on the Moon while its ascent stage was guided back down to create a controlled lunar impact studied by Apollo seismic instruments.
2. **Eagle — Apollo 11, Moon:** The famous lunar lander from the first crewed Moon landing—its descent stage rests at Tranquility Base, while its ascent stage was released in lunar orbit with an unconfirmed final resting spot.
3. **Dawn — Ceres, Asteroid Belt:** Explores Vesta and dwarf planet Ceres with ion propulsion, discovers bright carbonate salt deposits in Occator Crater, and enters a silent protective orbit around Ceres rather than crashing so subsurface chemistry stays uncontaminated.
4. **Ingenuity ("Ginny") — Mars:** NASA's Mars Helicopter, built for 5 test flights, completes 72 flights alongside the Perseverance rover before rotor damage during landing ends its flying days.

Complete all four stories to collect all four stars and unlock the **Finale**.

---

## 🎮 How to Explore

1. Open [Don't Call Us Space Trash! Live App](https://not-space-trash.github.io/).
2. Pick **Moon** (Falcon or Eagle), **Asteroid Belt** (Dawn), or **Mars** (Ginny) from the home map.
3. Read or listen (`Read to me` speech synthesis) scene by scene, and tap the **NASA Photos & Data** button on the home screen (or the camera icon in any story) to compare the storybook with real NASA imagery and dataset records.
4. Finish all four explorers to unlock the **Finale** (`Progress` saves locally in `localStorage`).

---

## 🛰️ NASA Data & Resources Used

The app runs purely statically without runtime API calls; it bundles 6 optimized public archival NASA photographs (`src/assets/nasa/`) in the **NASA Photos & Data** gallery (`src/data/nasaEvidence.ts`) and draws mission facts from official NASA reports and articles:

### Archival NASA Images & Datasets Featured In-App

| Explorer / Mission | Resource Name | Link Text & Full URL | Credit |
| --- | --- | --- | --- |
| Falcon (Apollo 15) | NASA Image and Video Library — Apollo 15 (`AS15-88-11866`) | [Apollo 15 Lunar Module Falcon, Moon Buggy & Hadley Delta (AS15-88-11866)](https://images.nasa.gov/details/as15-88-11866) | NASA / Johnson Space Center |
| Falcon (Apollo 15 / LRO) | Lunar Reconnaissance Orbiter Camera (LROC) — Apollo 15 Site (`M175252641L/R`) | [LROC NAC View of Apollo 15 Lunar Roving Vehicle & Tracks (M175252641L/R)](https://lroc.im-ldi.com/images/1198) | NASA / GSFC / Arizona State University |
| Eagle (Apollo 11) | NASA Earth Observatory — An Eagle Takes Off for Home (`AS11-44-6642`) | [Apollo 11 Eagle Ascent Stage Over the Moon with Earth Rising (AS11-44-6642)](https://earthobservatory.nasa.gov/images/145332/an-eagle-takes-off-for-home) | NASA / Johnson Space Center |
| Dawn (Ceres) | NASA/JPL Photojournal — Dawn RC3 Image 19 (`PIA19562`) | [Dawn Spacecraft View of Dwarf Planet Ceres & Bright Salt Deposits (PIA19562)](https://photojournal.jpl.nasa.gov/catalog/PIA19562) | NASA / JPL-Caltech / UCLA / MPS / DLR / IDA |
| Ginny (Mars 2020) | NASA/JPL — Ingenuity at Airfield D (`PIA25213`) | [Perseverance Mastcam-Z Photo of Ingenuity Helicopter in Jezero Crater (PIA25213)](https://www.jpl.nasa.gov/images/pia25213-ingenuity-at-airfield-d/) | NASA / JPL-Caltech / ASU / MSSS |
| Ginny (Mars Helicopter) | NASA/JPL Photojournal — Shadow of Damaged Rotor Blade (`PIA26243`) | [Ingenuity Helicopter Shadow of Damaged Rotor Blade After Flight 72 (PIA26243)](https://photojournal.jpl.nasa.gov/catalog/PIA26243) | NASA / JPL-Caltech |

### NASA Mission Reports & Science References

| Explorer / Mission | Resource Name | Link Text & Full URL |
| --- | --- | --- |
| Falcon (Apollo 15) | NASA Apollo 15 Lunar Surface Journal — Mission Overview | [Apollo 15 Lunar Surface Journal: Mission Overview](https://www.hq.nasa.gov/alsj/a15/a15ov.html) |
| Falcon (Apollo 15 / LRO) | NASA Solar System Exploration Research Institute — LRO Sees Apollo 15 Rover Tracks | [LRO Sees Apollo 15 Rover Tracks](https://lunarscience.nasa.gov/articles/lro-sees-apollo-15-rover-tracks/) |
| Eagle (Apollo 11) | NASA History — Apollo 11 Mission Summary (`SP-4029`) | [Apollo 11 - The First Lunar Landing (SP-4029)](https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11a_Summary.htm) |
| Eagle (Apollo 11) | NASA History — 50 Years Ago: Apollo 11 – The Journey Home | [50 Years Ago: Apollo 11 – The Journey Home](https://www.nasa.gov/history/50-years-ago-apollo-11-the-journey-home/) |
| Dawn (Ceres) | NASA News Release `18-087` — Dawn Mission Ends | [NASA's Dawn Mission to Asteroid Belt Comes to End](https://www.nasa.gov/news-release/nasas-dawn-mission-to-asteroid-belt-comes-to-end/) |
| Dawn (Ceres) | NASA/JPL News — Legacy of NASA's Dawn Near the End of its Mission | [Legacy of NASA's Dawn, Near the End of its Mission](https://www.jpl.nasa.gov/news/legacy-of-nasas-dawn-near-the-end-of-its-mission/) |
| Dawn (Occator Crater) | NASA/JPL Photojournal — Center of Occator Crater (`PIA20355`) | [Center of Occator Crater (Enhanced Color) (PIA20355)](https://photojournal.jpl.nasa.gov/catalog/PIA20355) |
| Ginny (Ingenuity) | NASA/JPL News — First Aircraft Accident Investigation on Another World | [NASA Performs First Aircraft Accident Investigation on Another World](https://www.jpl.nasa.gov/news/nasa-performs-first-aircraft-accident-investigation-on-another-world/) |
| Ginny (Ingenuity) | NASA Science — Perseverance Spots Ingenuity at Its Final Airfield (`PIA26236`) | [Perseverance Spots Ingenuity at Its Final Airfield](https://science.nasa.gov/resource/perseverance-spots-ingenuity-at-its-final-airfield/) |

---

## 💻 Tech Stack & Development

- **React 19** + **TypeScript**
- **Vite 7** + **Tailwind CSS v4** + `vite-plugin-singlefile`
- Hand-crafted SVG artwork (`src/components/art/`), optional custom-art overrides (`src/assets/custom/`), and bundled NASA photos (`src/assets/nasa/`)
- Hosted from the root of `main` via **GitHub Pages**

Run locally:

```bash
npm install
npm run dev
```

Build the self-contained GitHub Pages `index.html`:

```bash
npm run build
```

`app.html` is the Vite HTML entry template. Building compiles `dist/index.html` and copies the single-file production bundle to the repository-root `index.html`.

---

## 🧠 Team 4 Orang 0 Solusi

- **Charles Kenrick Darma** — website development, interactions, and visualizations
- **Phoebe Abigail Kusuma** — narrative and concept
- **Reynard Clarence Liem** — playtesting
- **Carlos Edmund Bailey Tanujaya** — playtesting

---

## 📜 Attribution & Usage Notes

All archival NASA photographs retain their original NASA/JPL/GSFC/ASU/university science team credits and follow [NASA Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/). This independent educational project is not affiliated with or endorsed by NASA.
