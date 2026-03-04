import type { CSSProperties } from 'react';

import { useTheme } from '../theme/ThemeProvider';

export type SeatStatus = 'available' | 'selected' | 'booked' | 'blocked';

export interface Seat {
  id: string;
  label: string;
  row: string;
  status: SeatStatus;
  price: number;
}

export interface SeatMapProps {
  seats: Seat[];
  columns?: number;
  onToggleSeat: (seatId: string) => void;
  style?: CSSProperties;
}

export function SeatMap({ seats, columns = 10, onToggleSeat, style }: SeatMapProps) {
  const theme = useTheme();

  return (
    <div style={{ display: 'grid', gap: theme.spacing.md, ...style }}>
      <div
        aria-label="screen"
        style={{
          background: theme.colors.surfaceAlt,
          borderRadius: theme.radius.pill,
          textAlign: 'center',
          padding: theme.spacing.sm,
          fontWeight: theme.typography.captionWeight,
          color: theme.colors.textMuted,
        }}
      >
        SCREEN THIS WAY
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: theme.spacing.xs }}>
        {seats.map((seat) => {
          const isInteractive = seat.status === 'available' || seat.status === 'selected';
          const isSelected = seat.status === 'selected';
          const background =
            seat.status === 'booked' || seat.status === 'blocked'
              ? theme.colors.border
              : isSelected
                ? theme.colors.primary
                : theme.colors.surface;

          return (
            <button
              key={seat.id}
              type="button"
              disabled={!isInteractive}
              onClick={() => onToggleSeat(seat.id)}
              style={{
                borderRadius: theme.radius.sm,
                border: `1px solid ${isSelected ? theme.colors.primary : theme.colors.border}`,
                background,
                color: isSelected ? theme.colors.primaryText : theme.colors.text,
                cursor: isInteractive ? 'pointer' : 'not-allowed',
                padding: `${theme.spacing.xs}px 0`,
                fontSize: 12,
              }}
              title={`${seat.row}-${seat.label} · ₹${seat.price}`}
            >
              {seat.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: theme.spacing.md, color: theme.colors.textMuted, fontSize: 12 }}>
        <LegendSwatch color={theme.colors.surface} label="Available" />
        <LegendSwatch color={theme.colors.primary} label="Selected" />
        <LegendSwatch color={theme.colors.border} label="Unavailable" />
      </div>
    </div>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 12, height: 12, borderRadius: 3, background: color, border: '1px solid rgba(0,0,0,0.15)' }} />
      {label}
    </span>
  );
}
