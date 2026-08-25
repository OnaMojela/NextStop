import { useCallback, useRef } from "react";
import type { Stop } from "../data/types";
import type { Route } from "../lib/geo";
import { BIOME_COLOR, km } from "../lib/format";
import { nextStop } from "../lib/playback";

interface Props {
  route: Route;
  stops: Stop[];
  headKm: number;
  playing: boolean;
  selectedId: string | null;
  onScrub: (km: number) => void;
  onNudge: (deltaKm: number) => void;
  onTogglePlay: () => void;
  onSelect: (id: string) => void;
}

/**
 * The kilometre spine. Every station sits at its true proportional distance
 * from Pretoria, so the gaps on the ruler are the gaps on the ground — the
 * six hours of empty Karoo between Kimberley and De Aar look like six hours.
 * Dragging it drives the train on the map.
 */
export default function KmSpine({
  route,
  stops,
  headKm,
  playing,
  selectedId,
  onScrub,
  onNudge,
  onTogglePlay,
  onSelect,
}: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const kmAt = useCallback(
    (clientX: number) => {
      const box = rail.current?.getBoundingClientRect();
      if (!box) return 0;
      const t = Math.min(Math.max((clientX - box.left) / box.width, 0), 1);
      return t * route.totalKm;
    },
    [route.totalKm]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    onScrub(kmAt(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) onScrub(kmAt(e.clientX));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const jump = e.shiftKey ? 100 : 20;
    if (e.key === "ArrowRight") onNudge(jump);
    else if (e.key === "ArrowLeft") onNudge(-jump);
    else if (e.key === "Home") onScrub(0);
    else if (e.key === "End") onScrub(route.totalKm);
    else if (e.key === " " || e.key === "Enter") onTogglePlay();
    else return;
    e.preventDefault();
  };

  const pct = (k: number) => `${(k / route.totalKm) * 100}%`;
  const ticks = Array.from(
    { length: Math.floor(route.totalKm / 100) + 1 },
    (_, i) => i * 100
  );

  const ahead = nextStop(
    headKm,
    stops.map((s) => ({ id: s.id, km: route.stopKm[s.id] }))
  );
  const aheadName = stops.find((s) => s.id === ahead.id)!.name;
  const toGo = Math.max(0, ahead.km - headKm);

  return (
    <section className="spine" aria-label="Journey scrubber">
      <div className="spine__head">
        <button
          className="spine__play"
          onClick={onTogglePlay}
          aria-pressed={playing}
          aria-label={playing ? "Pause the journey" : "Play the journey"}
        >
          <span className={playing ? "glyph glyph--pause" : "glyph glyph--play"} />
          <span className="spine__playlabel">{playing ? "Pause" : "Ride the line"}</span>
        </button>

        <p className="spine__readout mono">
          <span className="spine__now">km {km(headKm)}</span>
          <span className="spine__sep">/</span>
          <span className="spine__total">{km(route.totalKm)}</span>
          <span className="spine__next">
            {toGo < 2
              ? `standing at ${aheadName}`
              : `${km(toGo)} km to ${aheadName}`}
          </span>
        </p>
      </div>

      <div
        className="spine__rail"
        ref={rail}
        role="slider"
        tabIndex={0}
        aria-label="Distance along the line, in kilometres from Pretoria"
        aria-valuemin={0}
        aria-valuemax={Math.round(route.totalKm)}
        aria-valuenow={Math.round(headKm)}
        aria-valuetext={`${km(headKm)} kilometres from Pretoria`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className="spine__bed" />
        <div className="spine__done" style={{ width: pct(headKm) }} />

        {ticks.map((t) => (
          <span
            key={t}
            className={`spine__tick${t % 500 === 0 ? " spine__tick--major" : ""}`}
            style={{ left: pct(t) }}
          />
        ))}

        {stops.map((s, i) => {
          const k = route.stopKm[s.id];
          return (
            <button
              key={s.id}
              className={`post${s.id === selectedId ? " post--active" : ""}${
                k <= headKm ? " post--passed" : ""
              }${i % 2 ? " post--low" : ""}${i === 0 ? " post--first" : ""}${
                i === stops.length - 1 ? " post--last" : ""
              }`}
              style={{ left: pct(k), "--pin": BIOME_COLOR[s.biome] } as React.CSSProperties}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(s.id);
              }}
            >
              <span className="post__mast" />
              <span className="post__plate">
                <span className="post__name">{s.name}</span>
                <span className="post__km mono">{km(k)}</span>
              </span>
            </button>
          );
        })}

        <div className="spine__head-mark" style={{ left: pct(headKm) }} aria-hidden="true">
          <span className="spine__head-flag mono">{km(headKm)}</span>
        </div>
      </div>
    </section>
  );
}
