import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Stop } from "../data/types";
import { pathToKm, pointAtKm, type Route } from "../lib/geo";
import { BIOME_COLOR, lineColor } from "../lib/format";

interface Props {
  route: Route;
  stops: Stop[];
  headKm: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const SEGMENTS = 72;

export default function JourneyMap({
  route,
  stops,
  headKm,
  selectedId,
  onSelect,
}: Props) {
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const travelled = useRef<L.Polyline | null>(null);
  const glow = useRef<L.Polyline | null>(null);
  const train = useRef<L.Marker | null>(null);
  const markers = useRef<Record<string, L.Marker>>({});
  // Held in a ref so rebuilding the map isn't tied to the handler's identity.
  const select = useRef(onSelect);
  useEffect(() => {
    select.current = onSelect;
  }, [onSelect]);

  // Build the map once.
  useEffect(() => {
    if (!holder.current || map.current) return;

    const m = L.map(holder.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    map.current = m;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 18, subdomains: "abcd" }
    ).addTo(m);

    L.control.zoom({ position: "bottomright" }).addTo(m);
    L.control
      .attribution({ position: "bottomleft", prefix: false })
      .addAttribution("© OpenStreetMap · © CARTO")
      .addTo(m);

    // The line, drawn as graded segments so its colour reports the biome.
    const step = route.totalKm / SEGMENTS;
    const SUB = 8;
    for (let i = 0; i < SEGMENTS; i++) {
      const pts: [number, number][] = [];
      for (let j = 0; j <= SUB; j++) {
        const p = pointAtKm(route, (i + j / SUB) * step);
        pts.push([p.lat, p.lng]);
      }
      L.polyline(pts, {
        color: lineColor((i + 0.5) / SEGMENTS),
        weight: 2,
        opacity: 0.55,
        interactive: false,
      }).addTo(m);
    }

    glow.current = L.polyline([], {
      color: "#d6a756",
      weight: 12,
      opacity: 0.13,
      className: "track-glow",
      interactive: false,
    }).addTo(m);

    travelled.current = L.polyline([], {
      color: "#f2ede2",
      weight: 2.5,
      opacity: 0.95,
      interactive: false,
    }).addTo(m);

    stops.forEach((s) => {
      const p = pointAtKm(route, route.stopKm[s.id]);
      const mk = L.marker([p.lat, p.lng], {
        icon: stationIcon(s, false),
        keyboard: true,
        title: s.name,
        zIndexOffset: 200,
      })
        .addTo(m)
        .on("click", () => select.current(s.id));
      markers.current[s.id] = mk;
    });

    train.current = L.marker([0, 0], {
      icon: L.divIcon({
        className: "train-icon",
        html: '<span class="train-icon__dot"></span><span class="train-icon__ring"></span>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
      interactive: false,
      zIndexOffset: 600,
    }).addTo(m);

    m.fitBounds(
      L.latLngBounds(route.points.map((p) => [p.lat, p.lng] as [number, number])),
      { padding: [46, 46] }
    );

    return () => {
      m.remove();
      map.current = null;
    };
  }, [route, stops]);

  // Follow the playhead.
  useEffect(() => {
    if (!map.current) return;
    const p = pointAtKm(route, headKm);
    train.current?.setLatLng([p.lat, p.lng]);
    const path = pathToKm(route, headKm);
    travelled.current?.setLatLngs(path);
    glow.current?.setLatLngs(path);
  }, [headKm, route]);

  // Reflect selection on the station markers.
  useEffect(() => {
    stops.forEach((s) => {
      markers.current[s.id]?.setIcon(stationIcon(s, s.id === selectedId));
    });
  }, [selectedId, stops]);

  return <div className="map" ref={holder} role="application" aria-label="Route map" />;
}

function stationIcon(stop: Stop, active: boolean) {
  const color = BIOME_COLOR[stop.biome];
  return L.divIcon({
    className: `station${active ? " station--active" : ""}`,
    html: `<span class="station__pin" style="--pin:${color}"></span><span class="station__name">${stop.name}</span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}
