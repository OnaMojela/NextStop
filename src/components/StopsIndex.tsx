import type { Interest, Stop } from "../data/types";
import type { Route } from "../lib/geo";
import { BIOME_COLOR, INTEREST_LABEL, INTERESTS, km } from "../lib/format";
import { InterestIcon } from "./Icon";

interface Props {
  stops: Stop[];
  route: Route;
  filter: Interest | null;
  query: string;
  selectedId: string | null;
  saved: Set<string>;
  onFilter: (i: Interest | null) => void;
  onQuery: (q: string) => void;
  onSelect: (id: string) => void;
}

/** Searches everything the stop knows about itself, not just its name. */
function haystack(s: Stop) {
  return [
    s.name,
    s.province,
    s.tagline,
    s.story.title,
    s.story.text,
    s.taste.name,
    s.taste.note,
    ...s.attractions.flatMap((a) => [a.name, a.blurb, a.interest]),
  ]
    .join(" ")
    .toLowerCase();
}

export default function StopsIndex({
  stops,
  route,
  filter,
  query,
  selectedId,
  saved,
  onFilter,
  onQuery,
  onSelect,
}: Props) {
  const q = query.trim().toLowerCase();
  const matches = (s: Stop) =>
    (!filter || s.attractions.some((a) => a.interest === filter)) &&
    (!q || haystack(s).includes(q));

  const hits = stops.filter(matches).length;

  return (
    <section className="index shell" id="stops">
      <div className="index__head">
        <div>
          <p className="label">Every stop on the line</p>
          <h2 className="display index__title">
            Ten places the timetable calls a delay.
          </h2>
        </div>
        <div className="index__controls">
          <div className="search">
            <label className="sr-only" htmlFor="stop-search">
              Search the stops
            </label>
            <input
              id="stop-search"
              className="search__field"
              type="search"
              value={query}
              placeholder="Search stops, attractions, stories…"
              onChange={(e) => onQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button className="search__clear" onClick={() => onQuery("")}>
                Clear
              </button>
            )}
          </div>
          <div className="filters" role="group" aria-label="Filter stops by interest">
            <button
              className={`chip${filter === null ? " chip--on" : ""}`}
              onClick={() => onFilter(null)}
              aria-pressed={filter === null}
            >
              All
            </button>
            {INTERESTS.map((i) => (
              <button
                key={i}
                className={`chip${filter === i ? " chip--on" : ""}`}
                onClick={() => onFilter(filter === i ? null : i)}
                aria-pressed={filter === i}
              >
                <InterestIcon interest={i} />
                {INTEREST_LABEL[i]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="index__count mono" aria-live="polite">
        {filter || q
          ? `${hits} of ${stops.length} stops match${
              q ? ` “${query.trim()}”` : ""
            }${filter ? `${q ? " ·" : ""} ${INTEREST_LABEL[filter].toLowerCase()}` : ""}`
          : `${stops.length} stops · Pretoria to Cape Town`}
      </p>

      {hits === 0 && (
        <div className="index__none">
          <p>
            Nothing on the line matches {q ? <b>“{query.trim()}”</b> : "that filter"}. Try
            a town, a dish, or a word like <b>brandy</b>, <b>diamonds</b> or{" "}
            <b>Victorian</b>.
          </p>
          <button
            className="chip"
            onClick={() => {
              onQuery("");
              onFilter(null);
            }}
          >
            Show all ten stops
          </button>
        </div>
      )}

      <ul className="cards" hidden={hits === 0}>
        {stops.map((s) => {
          const on = matches(s);
          return (
            <li key={s.id}>
              <button
                className={`card${on ? "" : " card--muted"}${
                  s.id === selectedId ? " card--active" : ""
                }`}
                style={{ "--pin": BIOME_COLOR[s.biome] } as React.CSSProperties}
                onClick={() => onSelect(s.id)}
                aria-current={s.id === selectedId ? "true" : undefined}
              >
                <span className="card__km mono">km {km(route.stopKm[s.id])}</span>
                <span className="card__name display">{s.name}</span>
                <span className="card__province">{s.province}</span>
                <span className="card__tags">
                  {s.attractions.map((a) => (
                    <span
                      key={a.name}
                      className={`tagdot${
                        filter && a.interest === filter ? " tagdot--hit" : ""
                      }`}
                      title={INTEREST_LABEL[a.interest]}
                    >
                      <InterestIcon interest={a.interest} />
                    </span>
                  ))}
                </span>
                {saved.has(s.id) && <span className="card__saved">On your journey</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
