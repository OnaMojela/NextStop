import { ROUTE, STOPS } from "../data/route";
import type { RoutePoint, Stop } from "../data/types";

/**
 * Data access for the demo.
 *
 * Everything the interface renders comes through here, shaped exactly like the
 * two Supabase tables it is meant to sit on (`stops`, `route_points`). The demo
 * reads from the seeded module below so it runs with no keys and no network;
 * pointing it at Supabase is a swap of these two function bodies:
 *
 *   const { data } = await supabase.from("stops").select("*").order("sequence");
 *   return data;
 */

const latency = () => new Promise((r) => setTimeout(r, 120));

export async function getStops(): Promise<Stop[]> {
  await latency();
  return STOPS;
}

export async function getRoutePoints(): Promise<RoutePoint[]> {
  await latency();
  return ROUTE;
}
