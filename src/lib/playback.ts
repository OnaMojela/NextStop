export interface StopMark {
  id: string;
  km: number;
}

export interface Step {
  /** New position on the line. */
  km: number;
  /** Set when this step brought the train into a station. */
  arrivedId: string | null;
  /** Set when the train has reached Cape Town. */
  done: boolean;
}

/**
 * One step of the ride. The train never overshoots a station: if a step would
 * carry it past one, it stops on the platform instead, so the caller can hold
 * it there and open that stop's panel.
 */
export function advance(
  from: number,
  delta: number,
  stops: StopMark[],
  totalKm: number
): Step {
  const to = from + delta;
  const arrived = stops.find((s) => s.km > from && s.km <= to);
  if (arrived) return { km: arrived.km, arrivedId: arrived.id, done: false };
  if (to >= totalKm) return { km: totalKm, arrivedId: null, done: true };
  return { km: to, arrivedId: null, done: false };
}

/** The stop the traveller is at, or heading for, at a given position. */
export function nextStop(km: number, stops: StopMark[]): StopMark {
  return stops.find((s) => s.km >= km - 1) ?? stops[stops.length - 1];
}

/** The stop closest to a scrubbed position. */
export function nearestStop(km: number, stops: StopMark[]): StopMark {
  return stops.reduce((best, s) =>
    Math.abs(s.km - km) < Math.abs(best.km - km) ? s : best
  );
}
