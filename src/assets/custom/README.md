# Custom artwork slots

Drop PNG / JPG / WEBP / SVG files in this folder. The file name (without extension) is the slot it fills.
A transparent PNG works best. Anything you don't provide keeps its crayon placeholder.

## Characters
- `david`, `james`, `neil`, `buzz`  – astronauts
- `falcon` (whole lander), `falcon-top`, `falcon-bottom`
- `eagle`, `eagle-top`, `eagle-bottom`
- `mothership`, `buggy`, `satellite`
- `dawn`, `dawn-asleep`
- `rover` (Perseverance)
- `ginny`, `ginny-broken`

## Worlds
- `moon`, `mars`, `earth`, `ceres`, `ceres-cut`, `vesta`, `asteroid`

## Props
- `rocks`, `boot`, `backpack`, `flag`, `footprints`, `trash`, `instrument`, `balance`, `gauge`, `hourglass`

## Real NASA Dataset Photos (`src/assets/nasa/`)
Optimized archival NASA photos used in the **NASA Photos & Data** modal (`src/components/NasaModal.tsx`) live separately in `src/assets/nasa/` and are cataloged with credits and source URLs in `src/data/nasaEvidence.ts` (and listed in the root `README.md`).
