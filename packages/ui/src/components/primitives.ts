import { CSSProperties } from "react";
import { ThemeTokens } from "../theme/tokens";

export const makeCardStyle = (theme: ThemeTokens): CSSProperties => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radius.lg,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: theme.shadows.card,
  padding: theme.spacing.lg,
  color: theme.colors.textPrimary,
  fontFamily: theme.typography.fontFamily
});

export const makeButtonStyle = (theme: ThemeTokens): CSSProperties => ({
  border: "none",
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.primary,
  color: "#fff",
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  fontWeight: theme.typography.headingWeight,
  cursor: "pointer"
});
