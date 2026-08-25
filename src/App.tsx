import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getRoutePoints, getStops } from "./lib/api";
import { buildRoute, type Route } from "./lib/geo";
import { advance, nearestStop } from "./lib/playback";
import type { Interest, Stop } from "./data/types";
import { km } from "./lib/format";
import JourneyMap from "./components/JourneyMap";
import KmSpine from "./components/KmSpine";
import StopPanel from "./components/StopPanel";
import StopsIndex from "./components/StopsIndex";
import Itinerary from "./components/Itinerary";

/** Seconds of playback for the whole 1 500 km. */
const RIDE_SECONDS = 50;
/** Real seconds the train stands at each station during playback. */
const DWELL_SECONDS = 1.4;

export default function App() {
  const [stops, setStops] = useState<Stop[] | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [headKm, setHeadKm] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Interest | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([getStops(), getRoutePoints()]).then(([s, r]) => {
      setStops(s);
      setRoute(buildRoute(r));
      setSelectedId(s[0].id);
    });
  }, []);

  const stopOrder = useMemo(
    () => (stops && route ? stops.map((s) => ({ id: s.id, km: route.stopKm[s.id] })) : []),
    [stops, route]
  );

  // Playback: the train runs the line and stands at each station, the way it
  // does on the ground. Selection follows it, so the panel narrates the ride.
  const held = useRef<number | null>(null);
  const head = useRef(0);
  useEffect(() => {
    head.current = headKm;
  }, [headKm]);

  useEffect(() => {
    if (!playing || !route) return;
    let frame = 0;
    let last = performance.now();
    const speed = route.totalKm / RIDE_SECONDS;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (held.current !== null && now < held.current) {
        frame = requestAnimationFrame(tick);
        return;
      }
      held.current = null;

      const step = advance(head.current, speed * dt, stopOrder, route.totalKm);
      head.current = step.km;
      setHeadKm(step.km);
      if (step.arrivedId) {
        setSelectedId(step.arrivedId);
        held.current = now + DWELL_SECONDS * 1000;
      }
      if (step.done) {
        setPlaying(false);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, route, stopOrder]);

  const scrub = useCallback(
    (value: number) => {
      setPlaying(false);
      held.current = null;
      head.current = value;
      setHeadKm(value);
      if (stopOrder.length) setSelectedId(nearestStop(value, stopOrder).id);
    },
    [stopOrder]
  );

  /** Arrow keys move from where the train is now, not from the last render. */
  const nudge = useCallback(
    (delta: number) => {
      if (!route) return;
      scrub(Math.min(route.totalKm, Math.max(0, head.current + delta)));
    },
    [route, scrub]
  );

  const selectStop = useCallback(
    (id: string) => {
      setPlaying(false);
      held.current = null;
      setSelectedId(id);
      if (route) {
        head.current = route.stopKm[id];
        setHeadKm(route.stopKm[id]);
      }
      document
        .getElementById("line")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [route]
  );

  const toggleSave = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (!stops || !route) {
    return (
      <div className="boot">
        <p className="label">NextStop</p>
        <p className="mono">Loading the line…</p>
      </div>
    );
  }

  const selected = stops.find((s) => s.id === selectedId) ?? stops[0];
  const hours = 27;

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner shell">
          <a className="brand" href="#top">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__word">NextStop</span>
          </a>
          <nav className="topnav">
            <a href="#line">The line</a>
            <a href="#stops">Stops</a>
            <a href="#journey">
              My journey
              {saved.size > 0 && <span className="topnav__count">{saved.size}</span>}
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero shell">
          <p className="label hero__eyebrow">
            Pretoria → Cape Town · Shosholoza Meyl · {hours} hours
          </p>
          <h1 className="display hero__title">
            {km(route.totalKm)} km of country
            <br />
            you're sleeping through.
          </h1>
          <div className="hero__grid">
            <p className="hero__lede">
              A ticket tells you when the train leaves. It never tells you that
              Matjiesfontein is a Victorian village one man built out of selling water to
              steam engines, or that you pass it at ten past seven in the morning.
              NextStop runs the line stop by stop and shows you what's out there — so you
              pick a journey, not a departure time.
            </p>
            <dl className="hero__stats mono">
              <div>
                <dt>Distance</dt>
                <dd>{km(route.totalKm)} km</dd>
              </div>
              <div>
                <dt>Stops</dt>
                <dd>{stops.length}</dd>
              </div>
              <div>
                <dt>Places surfaced</dt>
                <dd>{stops.reduce((t, s) => t + s.attractions.length, 0)}</dd>
              </div>
              <div>
                <dt>Provinces</dt>
                <dd>4</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="line" id="line">
          <div className="line__inner shell">
            <div className="line__map">
              <JourneyMap
                route={route}
                stops={stops}
                headKm={headKm}
                selectedId={selectedId}
                onSelect={selectStop}
              />
            </div>
            <div className="line__panel">
              <StopPanel
                stop={selected}
                stopKm={route.stopKm[selected.id]}
                saved={saved.has(selected.id)}
                filter={filter}
                onToggleSave={() => toggleSave(selected.id)}
              />
            </div>
          </div>
          <div className="shell">
            <KmSpine
              route={route}
              stops={stops}
              headKm={headKm}
              playing={playing}
              selectedId={selectedId}
              onScrub={scrub}
              onNudge={nudge}
              onTogglePlay={() => setPlaying((p) => !p)}
              onSelect={selectStop}
            />
          </div>
        </section>

        <StopsIndex
          stops={stops}
          route={route}
          filter={filter}
          query={query}
          selectedId={selectedId}
          saved={saved}
          onFilter={setFilter}
          onQuery={setQuery}
          onSelect={selectStop}
        />

        <Itinerary
          stops={stops}
          route={route}
          saved={saved}
          onSelect={selectStop}
          onRemove={toggleSave}
        />
      </main>

      <footer className="foot">
        <div className="shell foot__inner">
          <div>
            <p className="display foot__word">NextStop</p>
            <p className="foot__by">
              Built by Ternary Brothers for the Geekulcha Train Tourism Hackathon.
            </p>
          </div>
          <dl className="foot__meta mono">
            <div>
              <dt>Stack</dt>
              <dd>React · TypeScript · Leaflet · Supabase-shaped data · Vercel</dd>
            </div>
            <div>
              <dt>Route data</dt>
              <dd>
                Seeded demo set — {stops.length} stops, {route.points.length} plotted
                points
              </dd>
            </div>
          </dl>
        </div>
      </footer>
    </>
  );
}
