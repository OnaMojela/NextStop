import type { Interest, Stop } from "../data/types";
import {
  BIOME_COLOR,
  BIOME_LABEL,
  INTEREST_LABEL,
  km,
  minutes,
} from "../lib/format";
import { InterestIcon } from "./Icon";

interface Props {
  stop: Stop;
  stopKm: number;
  saved: boolean;
  filter: Interest | null;
  onToggleSave: () => void;
}

export default function StopPanel({
  stop,
  stopKm,
  saved,
  filter,
  onToggleSave,
}: Props) {
  const shown = filter
    ? stop.attractions.filter((a) => a.interest === filter)
    : stop.attractions;

  return (
    <article
      className="panel"
      key={stop.id}
      style={{ "--pin": BIOME_COLOR[stop.biome] } as React.CSSProperties}
    >
      <header className="panel__head">
        <p className="label panel__eyebrow">
          <span className="panel__biome">{BIOME_LABEL[stop.biome]}</span>
          {stop.province}
        </p>
        <h2 className="display panel__name">{stop.name}</h2>
        <p className="panel__tagline">{stop.tagline}</p>

        <dl className="facts mono">
          <div className="facts__item">
            <dt>Distance</dt>
            <dd>{km(stopKm)} km</dd>
          </div>
          <div className="facts__item">
            <dt>Arrives</dt>
            <dd>
              {stop.arrival}
              <span className="facts__day">day {stop.day}</span>
            </dd>
          </div>
          <div className="facts__item">
            <dt>You have</dt>
            <dd>{stop.dwell ? minutes(stop.dwell) : "—"}</dd>
          </div>
        </dl>
      </header>

      <section className="panel__block">
        <h3 className="label">
          What's here
          {filter && (
            <span className="panel__filternote">· {INTEREST_LABEL[filter]} only</span>
          )}
        </h3>
        {shown.length ? (
          <ul className="things">
            {shown.map((a) => (
              <li className="thing" key={a.name}>
                <span className="thing__icon">
                  <InterestIcon interest={a.interest} />
                </span>
                <div className="thing__body">
                  <h4 className="thing__name">{a.name}</h4>
                  <p className="thing__reach mono">{a.reach}</p>
                  <p className="thing__blurb">{a.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">
            Nothing tagged {filter && INTEREST_LABEL[filter].toLowerCase()} at this stop.
            Clear the filter to see all three.
          </p>
        )}
      </section>

      <section className="panel__block story">
        <h3 className="label">Story</h3>
        <h4 className="story__title">{stop.story.title}</h4>
        <p className="story__text">{stop.story.text}</p>
      </section>

      <section className="panel__block taste">
        <h3 className="label">Eat this</h3>
        <p className="taste__name">{stop.taste.name}</p>
        <p className="taste__note">{stop.taste.note}</p>
      </section>

      <button
        className={`save${saved ? " save--on" : ""}`}
        onClick={onToggleSave}
        aria-pressed={saved}
      >
        {saved ? "On your journey" : "Add to my journey"}
        <span className="save__mark" aria-hidden="true" />
      </button>
    </article>
  );
}
