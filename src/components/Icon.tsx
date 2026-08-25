import type { Interest } from "../data/types";

const PATHS: Record<Interest, string> = {
  heritage: "M2 14h12M3 14V7l5-4 5 4v7M6.5 14v-4h3v4",
  nature: "M8 14V9M8 9 4 8.5 5 5l3 1 3-1 1 3.5L8 9M8 6V2.5",
  art: "M8 2a6 6 0 1 0 0 12c.9 0 1-.6 1-1s-.4-1-.4-1.5c0-.6.5-1 1.1-1H12a2 2 0 0 0 2-2 6 6 0 0 0-6-6M5 8.5h.01M6.5 5.5h.01M9.5 5h.01",
  food: "M4 2v5a1.5 1.5 0 0 0 3 0V2M5.5 8v6M11.5 2C10.5 3 10 4.5 10 6c0 1 .5 2 1.5 2V2ZM11.5 8v6",
  stargazing: "m8 2 1.5 4H14l-3.5 2.6 1.3 4.4L8 10.4 4.2 13l1.3-4.4L2 6h4.5L8 2Z",
  adventure: "M2 13 8 3l6 10M5.5 8.2 8 6.6l2.5 1.6",
};

export function InterestIcon({ interest }: { interest: Interest }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="iico">
      <path
        d={PATHS[interest]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
