import type { CSSProperties, ReactNode } from 'react';

import { useTheme } from '../theme/ThemeProvider';

type ListingKind = 'movie' | 'event';

interface BaseListingProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  rating?: string;
  ctaLabel?: string;
  onSelect?: (id: string) => void;
  badge?: string;
  style?: CSSProperties;
}

export interface MovieListingProps extends BaseListingProps {
  kind: 'movie';
  language?: string;
  format?: string;
  duration?: string;
}

export interface EventListingProps extends BaseListingProps {
  kind: 'event';
  venue?: string;
  eventDate?: string;
  category?: string;
}

export type ListingCardProps = MovieListingProps | EventListingProps;

function renderMeta(kind: ListingKind, props: ListingCardProps): ReactNode {
  if (kind === 'movie') {
    return [props.language, props.format, props.duration].filter(Boolean).join(' • ');
  }

  return [props.category, props.venue, props.eventDate].filter(Boolean).join(' • ');
}

export function ListingCard(props: ListingCardProps) {
  const theme = useTheme();
  const meta = renderMeta(props.kind, props);

  return (
    <article
      style={{
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        background: theme.colors.surface,
        boxShadow: theme.shadow.sm,
        display: 'grid',
        gridTemplateColumns: '96px 1fr',
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        ...props.style,
      }}
    >
      <div
        style={{
          borderRadius: theme.radius.md,
          background: theme.colors.surfaceAlt,
          minHeight: 124,
          overflow: 'hidden',
        }}
      >
        {props.imageUrl ? (
          <img src={props.imageUrl} alt={props.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </div>

      <div style={{ display: 'grid', gap: theme.spacing.xs }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontWeight: theme.typography.headingWeight }}>{props.title}</h3>
          {props.badge ? (
            <span
              style={{
                background: theme.colors.surfaceAlt,
                borderRadius: theme.radius.pill,
                padding: `2px ${theme.spacing.sm}px`,
                color: theme.colors.secondary,
                fontWeight: theme.typography.captionWeight,
              }}
            >
              {props.badge}
            </span>
          ) : null}
        </div>
        {props.subtitle ? <p style={{ margin: 0, color: theme.colors.textMuted }}>{props.subtitle}</p> : null}
        {meta ? <small style={{ color: theme.colors.textMuted }}>{meta}</small> : null}
        {props.rating ? <small style={{ color: theme.colors.success }}>⭐ {props.rating}</small> : null}
        <button
          type="button"
          onClick={() => props.onSelect?.(props.id)}
          style={{
            justifySelf: 'start',
            marginTop: theme.spacing.sm,
            border: 0,
            borderRadius: theme.radius.pill,
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            background: theme.colors.primary,
            color: theme.colors.primaryText,
            cursor: 'pointer',
          }}
        >
          {props.ctaLabel ?? (props.kind === 'movie' ? 'Book tickets' : 'View details')}
        </button>
      </div>
    </article>
  );
}
