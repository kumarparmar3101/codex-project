import type { CSSProperties } from 'react';

import { useTheme } from '../theme/ThemeProvider';

export interface CityOption {
  value: string;
  label: string;
}

export interface CitySelectorProps {
  cities: CityOption[];
  value?: string;
  onChange: (city: string) => void;
  label?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export function CitySelector({
  cities,
  value,
  onChange,
  label = 'City',
  disabled = false,
  style,
}: CitySelectorProps) {
  const theme = useTheme();

  return (
    <label style={{ display: 'grid', gap: theme.spacing.sm, ...style }}>
      <span style={{ color: theme.colors.textMuted, fontWeight: theme.typography.captionWeight }}>{label}</span>
      <select
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.surface,
          color: theme.colors.text,
        }}
      >
        <option value="">Select city</option>
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
    </label>
  );
}
