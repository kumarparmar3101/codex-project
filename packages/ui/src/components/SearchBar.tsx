import type { CSSProperties, FormEvent } from 'react';

import { useTheme } from '../theme/ThemeProvider';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for movies, events, or venues',
  disabled = false,
  style,
}: SearchBarProps) {
  const theme = useTheme();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: theme.spacing.sm, ...style }}>
      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
          borderRadius: theme.radius.pill,
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.surface,
          color: theme.colors.text,
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
          borderRadius: theme.radius.pill,
          border: 0,
          background: theme.colors.primary,
          color: theme.colors.primaryText,
          fontWeight: theme.typography.captionWeight,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
}
