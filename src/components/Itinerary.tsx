import type { Stop } from "../data/types";
import type { Route } from "../lib/geo";
import { BIOME_COLOR, km, minutes } from "../lib/format";

interface Props {
  stops: Stop[];
  route: Route;
  saved: Set<string>;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function Itinerary({ stops, route, saved, onSelect, onRemove }: Props) {
  const chosen = stops.filter((s) => saved.has(s.id));
  const ground = chosen.reduce((t, s) => t + s.dwell, 0);
  const spots = chosen.reduce((t, s) => t + s.attractions.length, 0);

  return (
    <section className="plan shell" id="journey">
      <div className="plan__head">
        <p className="label">My journey</p>
        <h2 className="display plan__title">What you'd actually get off for.</h2>
      </div>

      {chosen.length === 0 ? (
        <div className="plan__empty">
          <p>
            No stops chosen yet. Open a stop on the map or in the index and add it — your
            journey builds itself in kilometre order.
          </p>
        </div>
      ) : (
        <>
          <dl className="plan__stats">
            <div>
              <dt className="label">Stops</dt>
              <dd className="display">{chosen.length}</dd>
            </div>
            <div>
              <dt className="label">Time on the ground</dt>
              <dd className="display">{minutes(ground)}</dd>
            </div>
            <div>
              <dt className="label">Places to see</dt>
              <dd className="display">{spots}</dd>
            </div>
            <div>
              <dt className="label">First stop</dt>
              <dd className="display">{chosen[0].name}</dd>
            </div>
          </dl>

          <ol className="plan__list">
            {chosen.map((s) => (
              <li
                className="leg"
                key={s.id}
                style={{ "--pin": BIOME_COLOR[s.biome] } as React.CSSProperties}
              >
                <span className="leg__km mono">km {km(route.stopKm[s.id])}</span>
                <button className="leg__name" onClick={() => onSelect(s.id)}>
                  {s.name}
                </button>
                <span className="leg__time mono">
                  {s.arrival} · day {s.day} · {s.dwell ? minutes(s.dwell) : "terminus"}
                </span>
                <button
                  className="leg__drop"
                  onClick={() => onRemove(s.id)}
                  aria-label={`Remove ${s.name} from my journey`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>

          <div className="plan__foot">
            <button className="cta">Book this journey</button>
            <p className="plan__note">
              Booking hands off to the operator's system. NextStop's job is everything
              before that.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
