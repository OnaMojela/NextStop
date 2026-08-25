export type Biome = "highveld" | "karoo" | "cape";

export type Interest =
  | "heritage"
  | "nature"
  | "art"
  | "food"
  | "stargazing"
  | "adventure";

export interface Attraction {
  name: string;
  interest: Interest;
  /** How far from the station platform, in the traveller's own terms. */
  reach: string;
  blurb: string;
}

export interface Story {
  title: string;
  text: string;
}

export interface Stop {
  id: string;
  name: string;
  province: string;
  biome: Biome;
  /** Local arrival, 24h. `day` is the day of the journey (1 or 2). */
  arrival: string;
  day: 1 | 2;
  /** Minutes the train stands at the platform. */
  dwell: number;
  tagline: string;
  attractions: Attraction[];
  story: Story;
  taste: { name: string; note: string };
}

export interface RoutePoint {
  lat: number;
  lng: number;
  /** Set when this point is a scheduled stop. */
  stop?: string;
}
