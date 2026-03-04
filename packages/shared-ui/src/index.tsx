import type { PropsWithChildren } from 'react';

export function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="ui-section">
      <h2 className="ui-section__title">{title}</h2>
      {children}
    </section>
  );
}

export function ExperienceCard({
  title,
  meta,
  description,
  ctaHref,
  ctaLabel = 'View details',
}: {
  title: string;
  meta: string;
  description?: string;
  ctaHref: string;
  ctaLabel?: string;
}) {
  return (
    <article className="ui-card">
      <h3>{title}</h3>
      <p className="ui-muted">{meta}</p>
      {description ? <p>{description}</p> : null}
      <a href={ctaHref} className="ui-link">
        {ctaLabel}
      </a>
    </article>
  );
}

export function Pill({ children }: PropsWithChildren) {
  return <span className="ui-pill">{children}</span>;
}

export function SeatPicker({
  seats,
  selectedSeat,
  baseHref,
}: {
  seats: string[];
  selectedSeat?: string;
  baseHref: string;
}) {
  return (
    <div className="ui-seats-grid">
      {seats.map((seat) => {
        const isSelected = selectedSeat === seat;

        return (
          <a
            key={seat}
            href={`${baseHref}?seat=${seat}`}
            className={`ui-seat ${isSelected ? 'ui-seat--selected' : ''}`.trim()}
          >
            {seat}
          </a>
        );
      })}
    </div>
  );
}

export function PrimaryButton({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} className="ui-button ui-button--primary">
      {children}
    </a>
  );
}
