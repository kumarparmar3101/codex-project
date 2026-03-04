import { useThemeTokens } from "../theme/ThemeProvider";
import { makeCardStyle } from "./primitives";

export type TicketSummaryLineItem = {
  label: string;
  amount: number;
};

export type TicketSummaryProps = {
  title: string;
  subtitle?: string;
  lineItems: TicketSummaryLineItem[];
  currency?: string;
};

export function TicketSummary({
  title,
  subtitle,
  lineItems,
  currency = "INR"
}: TicketSummaryProps) {
  const theme = useThemeTokens();

  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <aside style={{ ...makeCardStyle(theme), display: "grid", gap: theme.spacing.sm }}>
      <header>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {subtitle ? <p style={{ margin: `${theme.spacing.xs} 0 0`, color: theme.colors.textSecondary }}>{subtitle}</p> : null}
      </header>

      {lineItems.map((item) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{item.label}</span>
          <span>
            {currency} {item.amount.toFixed(2)}
          </span>
        </div>
      ))}

      <hr style={{ borderColor: theme.colors.border, width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: theme.typography.headingWeight }}>
        <span>Total</span>
        <span>
          {currency} {total.toFixed(2)}
        </span>
      </div>
    </aside>
  );
}
