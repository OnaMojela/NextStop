import type { RoutePoint } from "../data/types";

export interface LatLng {
  lat: number;
  lng: number;
}

const R = 6371;
const rad = (d: number) => (d * Math.PI) / 180;

export function distanceKm(a: LatLng, b: LatLng): number {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export interface Route {
  points: RoutePoint[];
  /** Cumulative kilometres at each point, from Pretoria. */
  marks: number[];
  totalKm: number;
  /** Kilometre mark of each scheduled stop, by stop id. */
  stopKm: Record<string, number>;
}

export function buildRoute(points: RoutePoint[]): Route {
  const marks: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    marks.push(marks[i - 1] + distanceKm(points[i - 1], points[i]));
  }
  const stopKm: Record<string, number> = {};
  points.forEach((p, i) => {
    if (p.stop) stopKm[p.stop] = marks[i];
  });
  return { points, marks, totalKm: marks[marks.length - 1], stopKm };
}

/** Position on the line at a given kilometre mark. */
export function pointAtKm(route: Route, km: number): LatLng {
  const { points, marks } = route;
  const target = Math.min(Math.max(km, 0), route.totalKm);
  let i = 1;
  while (i < marks.length - 1 && marks[i] < target) i++;
  const span = marks[i] - marks[i - 1];
  const t = span === 0 ? 0 : (target - marks[i - 1]) / span;
  return {
    lat: points[i - 1].lat + (points[i].lat - points[i - 1].lat) * t,
    lng: points[i - 1].lng + (points[i].lng - points[i - 1].lng) * t,
  };
}

/** Bearing in degrees, used to point the train marker down the line. */
export function bearingAtKm(route: Route, km: number): number {
  const a = pointAtKm(route, Math.max(0, km - 4));
  const b = pointAtKm(route, Math.min(route.totalKm, km + 4));
  const y = Math.sin(rad(b.lng - a.lng)) * Math.cos(rad(b.lat));
  const x =
    Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) -
    Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lng - a.lng));
  return (Math.atan2(y, x) * 180) / Math.PI;
}

/** The polyline from Pretoria up to `km`, for drawing travelled track. */
export function pathToKm(route: Route, km: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < route.points.length; i++) {
    if (route.marks[i] <= km) out.push([route.points[i].lat, route.points[i].lng]);
    else break;
  }
  const head = pointAtKm(route, km);
  out.push([head.lat, head.lng]);
  return out;
}
