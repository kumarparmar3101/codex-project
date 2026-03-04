import { useThemeTokens } from "../theme/ThemeProvider";

export type Showtime = {
  id: string;
  label: string;
  availability?: "available" | "filling-fast" | "sold-out";
};

export type ShowtimeGridProps = {
  showtimes: Showtime[];
  selectedShowtimeId?: string;
  onSelect: (showtimeId: string) => void;
};

const statusColorMap = {
  available: "success",
  "filling-fast": "accent",
  "sold-out": "danger"
} as const;

export function ShowtimeGrid({
  showtimes,
  selectedShowtimeId,
  onSelect
}: ShowtimeGridProps) {
  const theme = useThemeTokens();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: theme.spacing.sm }}>
      {showtimes.map((showtime) => {
        const status = showtime.availability ?? "available";
        const semanticColor = theme.colors[statusColorMap[status]];
        const isSelected = selectedShowtimeId === showtime.id;

        return (
          <button
            key={showtime.id}
            type="button"
            disabled={status === "sold-out"}
            onClick={() => onSelect(showtime.id)}
            style={{
              borderRadius: theme.radius.md,
              border: `1px solid ${isSelected ? theme.colors.primary : theme.colors.border}`,
              padding: theme.spacing.sm,
              background: isSelected ? theme.colors.surfaceMuted : theme.colors.surface,
              color: theme.colors.textPrimary,
              opacity: status === "sold-out" ? 0.6 : 1,
              cursor: status === "sold-out" ? "not-allowed" : "pointer"
            }}
          >
            <strong>{showtime.label}</strong>
            <div style={{ color: semanticColor, fontSize: theme.typography.captionSize }}>{status}</div>
          </button>
        );
      })}
    </div>
  );
}
