import type { Biome, Interest } from "../data/types";

/** Thin-space thousands, the way kilometre posts are printed. */
export function km(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function minutes(n: number): string {
  if (n < 60) return `${n} min`;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export const BIOME_COLOR: Record<Biome, string> = {
  highveld: "#9BC26B",
  karoo: "#D6A756",
  cape: "#6FB3C4",
};

export const BIOME_LABEL: Record<Biome, string> = {
  highveld: "Highveld",
  karoo: "Karoo",
  cape: "Cape",
};

export const INTEREST_LABEL: Record<Interest, string> = {
  heritage: "Heritage",
  nature: "Nature",
  art: "Art",
  food: "Food",
  stargazing: "Stargazing",
  adventure: "Adventure",
};

export const INTERESTS = Object.keys(INTEREST_LABEL) as Interest[];

/** Mix two hex colours; used to grade the line across the country's biomes. */
export function mix(a: string, b: string, t: number): string {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  const c = (x: number, y: number) =>
    Math.round(x + (y - x) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
}

/** Colour of the line at a fraction of the journey: highveld → karoo → cape. */
export function lineColor(t: number): string {
  return t < 0.5
    ? mix(BIOME_COLOR.highveld, BIOME_COLOR.karoo, t / 0.5)
    : mix(BIOME_COLOR.karoo, BIOME_COLOR.cape, (t - 0.5) / 0.5);
}
