import { useState, type CSSProperties, type FormEvent } from 'react';

import { useTheme } from '../theme/ThemeProvider';

export interface CheckoutPayload {
  name: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
}

export interface CheckoutFormProps {
  defaultValues?: Partial<CheckoutPayload>;
  onSubmit: (payload: CheckoutPayload) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

const fieldStyle = (border: string, radius: number, paddingY: number, paddingX: number): CSSProperties => ({
  width: '100%',
  border: `1px solid ${border}`,
  borderRadius: radius,
  padding: `${paddingY}px ${paddingX}px`,
});

export function CheckoutForm({ defaultValues, onSubmit, disabled = false, style }: CheckoutFormProps) {
  const theme = useTheme();
  const [payload, setPayload] = useState<CheckoutPayload>({
    name: defaultValues?.name ?? '',
    email: defaultValues?.email ?? '',
    phone: defaultValues?.phone ?? '',
    acceptTerms: Boolean(defaultValues?.acceptTerms),
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!payload.acceptTerms) return;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: theme.spacing.sm, ...style }}>
      <input
        required
        disabled={disabled}
        placeholder="Full name"
        value={payload.name}
        onChange={(event) => setPayload((prev) => ({ ...prev, name: event.target.value }))}
        style={fieldStyle(theme.colors.border, theme.radius.md, theme.spacing.sm, theme.spacing.md)}
      />
      <input
        required
        type="email"
        disabled={disabled}
        placeholder="Email"
        value={payload.email}
        onChange={(event) => setPayload((prev) => ({ ...prev, email: event.target.value }))}
        style={fieldStyle(theme.colors.border, theme.radius.md, theme.spacing.sm, theme.spacing.md)}
      />
      <input
        required
        disabled={disabled}
        placeholder="Phone"
        value={payload.phone}
        onChange={(event) => setPayload((prev) => ({ ...prev, phone: event.target.value }))}
        style={fieldStyle(theme.colors.border, theme.radius.md, theme.spacing.sm, theme.spacing.md)}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, color: theme.colors.textMuted }}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={payload.acceptTerms}
          onChange={(event) => setPayload((prev) => ({ ...prev, acceptTerms: event.target.checked }))}
        />
        I accept terms and conditions.
      </label>

      <button
        type="submit"
        disabled={disabled || !payload.acceptTerms}
        style={{
          border: 0,
          borderRadius: theme.radius.pill,
          padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
          background: theme.colors.primary,
          color: theme.colors.primaryText,
          fontWeight: theme.typography.captionWeight,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        Pay now
      </button>
    </form>
  );
}
