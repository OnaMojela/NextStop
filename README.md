# NextStop

**A smarter way to experience the Pretoria–Cape Town rail journey, not just book the ticket.**

Geekulcha Train Tourism Hackathon · Team Ternary Brothers

Booking systems tell you *when*. NextStop shows you the *journey*: an animated map of
the Pretoria–Cape Town line where every station sits at its true distance, and every stop
carries the attractions, history and food waiting on the platform.

> **Judging this?** Start with **[NOTES.md](NOTES.md)**.

---

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>. No keys, no login, no setup — the demo runs entirely
from seeded data.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run check` | Runs the whole 1 440 km ride and asserts the train stops at all ten stations, in order, without skipping or overshooting |
| `npm run lint` | oxlint |

## Deploy

Vercel, zero config — `vercel.json` is committed. Import the repo, or:

```bash
npx vercel --prod
```

---

## What's in the demo

**The kilometre spine.** The scrubber under the map is the signature control. Every
station sits at its true proportional distance from Pretoria, so the six hours of empty
Karoo between Kimberley and De Aar *look* like six hours. Drag it, or press play and the
train runs the line on its own — standing at each platform for a beat while that stop's
panel opens, so the demo narrates itself with nobody touching it.

**A route that reports where you are.** The line is drawn as 72 graded segments running
highveld green → Karoo ochre → Cape blue. The colour tells you which part of the country
you're crossing before you read a single label.

**Ten stops with real content.** Each carries three attractions with distance from the
platform, a story, and something to eat — 30 places surfaced in total. Matjiesfontein was
built by a Scottish railwayman who made his fortune selling water to steam engines;
Kimberley had electric street lighting before London. That's the material a booking flow
throws away.

**Search that reads everything.** Searching `brandy` finds Worcester, `diamond` finds
Kimberley — the index searches names, provinces, attractions, stories and food, not just
station names. Six interest filters (heritage, nature, art, food, stargazing, adventure)
narrow both the index and the open stop panel.

**My journey.** Add stops and they assemble in kilometre order with total time on the
ground and a count of places to see, then hand off to the operator's booking system.

## How the pitch maps to the build

| Pitch deck | In the demo |
| --- | --- |
| Animated geomapping | Leaflet map, graded route, animated train, scrubbable kilometre spine |
| Local culture & stories | 10 stops × 3 attractions + a story + a local dish |
| Search-and-explore flow | Full-text search across all stop content, plus interest filters |
| Compare stops | Stop index with interest tags per stop |
| Understand the stop | Arrival time, day, dwell time, distance from the platform for each attraction |
| Book & Go | *My journey* itinerary with time on the ground, then hand-off to booking |
| Built for everyone | Web-first, no install, no login; responsive to 375 px; keyboard-operable |

## Stack

React 19 · TypeScript · Vite · Leaflet · Vercel

`src/lib/api.ts` is the only place the interface gets data. It returns the two shapes the
Supabase tables use — `stops` and `route_points` — from a seeded module, so the demo runs
with no network. Pointing it at the live database is a swap of two function bodies:

```ts
const { data } = await supabase.from("stops").select("*").order("sequence");
return data;
```

## Layout

```
src/
  data/route.ts        The line: 47 plotted points, 10 stops, all the written content
  data/types.ts        Stop, Attraction, Story, RoutePoint
  lib/geo.ts           Cumulative distance along the line, position and bearing at a km
  lib/playback.ts      Pure ride logic — covered by npm run check
  lib/api.ts           Data access (Supabase-shaped)
  lib/format.ts        Kilometre formatting, biome colours, the route gradient
  components/          JourneyMap · KmSpine · StopPanel · StopsIndex · Itinerary
  styles/base.css      Tokens: SAR bottle green, brass, the three biome colours
  styles/app.css       Interface
```

## Data

Route geometry and stop content are a **seeded demo set** — plotted from the towns the
Pretoria–Cape Town line actually runs through, with distances computed along that
polyline (1 440 km; the published rail distance is about 1 530 km, which follows the
track's real curvature rather than a 47-point trace). Times are representative of the
Shosholoza Meyl schedule. Production would read the operator's live schedule through the
same `api.ts` boundary.

Basemap tiles © OpenStreetMap contributors, © CARTO.
