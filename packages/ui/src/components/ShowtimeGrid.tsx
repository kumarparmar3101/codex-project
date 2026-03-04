import type { CSSProperties } from 'react';

import { useTheme } from '../theme/ThemeProvider';

export interface Showtime {
  id: string;
  time: string;
  format?: string;
  availability?: 'available' | 'filling-fast' | 'sold-out';
}

export interface ShowtimeGridProps {
  showtimes: Showtime[];
  selectedShowtimeId?: string;
  onSelect: (showtimeId: string) => void;
  style?: CSSProperties;
}

export function ShowtimeGrid({ showtimes, selectedShowtimeId, onSelect, style }: ShowtimeGridProps) {
  const theme = useTheme();

  const availabilityColorMap: Record<NonNullable<Showtime['availability']>, string> = {
    available: theme.colors.success,
    'filling-fast': theme.colors.accent,
    'sold-out': theme.colors.danger,
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: theme.spacing.sm,
        ...style,
      }}
    >
      {showtimes.map((showtime) => {
        const selected = showtime.id === selectedShowtimeId;
        const disabled = showtime.availability === 'sold-out';

        return (
          <button
            key={showtime.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(showtime.id)}
            style={{
              border: `1px solid ${selected ? theme.colors.primary : theme.colors.border}`,
              borderRadius: theme.radius.md,
              background: selected ? theme.colors.surfaceAlt : theme.colors.surface,
              padding: theme.spacing.sm,
              textAlign: 'left',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            <strong style={{ display: 'block' }}>{showtime.time}</strong>
            {showtime.format ? <small style={{ display: 'block', color: theme.colors.textMuted }}>{showtime.format}</small> : null}
            {showtime.availability ? (
              <small style={{ color: availabilityColorMap[showtime.availability] }}>{showtime.availability}</small>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
