import { FormEvent, useState } from "react";
import { useThemeTokens } from "../theme/ThemeProvider";
import { makeButtonStyle, makeCardStyle } from "./primitives";

export type CheckoutFormValues = {
  fullName: string;
  email: string;
  phone: string;
  agreeToTerms: boolean;
};

export type CheckoutFormProps = {
  defaultValues?: Partial<CheckoutFormValues>;
  onSubmit: (values: CheckoutFormValues) => void;
};

export function CheckoutForm({ defaultValues, onSubmit }: CheckoutFormProps) {
  const theme = useThemeTokens();
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: defaultValues?.fullName ?? "",
    email: defaultValues?.email ?? "",
    phone: defaultValues?.phone ?? "",
    agreeToTerms: defaultValues?.agreeToTerms ?? false
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  const inputStyle = {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    fontFamily: theme.typography.fontFamily
  };

  return (
    <form onSubmit={submit} style={{ ...makeCardStyle(theme), display: "grid", gap: theme.spacing.md }}>
      <h3 style={{ margin: 0 }}>Checkout details</h3>

      <input
        required
        placeholder="Full name"
        value={values.fullName}
        onChange={(event) => setValues({ ...values, fullName: event.target.value })}
        style={inputStyle}
      />

      <input
        type="email"
        required
        placeholder="Email"
        value={values.email}
        onChange={(event) => setValues({ ...values, email: event.target.value })}
        style={inputStyle}
      />

      <input
        required
        placeholder="Phone"
        value={values.phone}
        onChange={(event) => setValues({ ...values, phone: event.target.value })}
        style={inputStyle}
      />

      <label style={{ display: "flex", gap: theme.spacing.sm, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={values.agreeToTerms}
          onChange={(event) => setValues({ ...values, agreeToTerms: event.target.checked })}
          required
        />
        <span>I agree to the booking terms.</span>
      </label>

      <button type="submit" style={makeButtonStyle(theme)}>
        Pay now
      </button>
    </form>
  );
}
