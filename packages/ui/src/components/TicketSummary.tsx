import type { CSSProperties } from 'react';

import { useTheme } from '../theme/ThemeProvider';

export interface SummaryLineItem {
  label: string;
  amount: number;
}

export interface TicketSummaryProps {
  title: string;
  seats: string[];
  items: SummaryLineItem[];
  currency?: string;
  style?: CSSProperties;
}

export function TicketSummary({ title, seats, items, currency = '₹', style }: TicketSummaryProps) {
  const theme = useTheme();
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section
      style={{
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        background: theme.colors.surface,
        padding: theme.spacing.lg,
        display: 'grid',
        gap: theme.spacing.sm,
        ...style,
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <small style={{ color: theme.colors.textMuted }}>Seats: {seats.length ? seats.join(', ') : 'None selected'}</small>
      {items.map((item) => (
        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', color: theme.colors.textMuted }}>
          <span>{item.label}</span>
          <span>
            {currency}
            {item.amount.toFixed(2)}
          </span>
        </div>
      ))}
      <hr style={{ border: 0, borderTop: `1px solid ${theme.colors.border}`, width: '100%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: theme.typography.headingWeight }}>
        <span>Total</span>
        <span>
          {currency}
          {subtotal.toFixed(2)}
        </span>
      </div>
    </section>
  );
}
