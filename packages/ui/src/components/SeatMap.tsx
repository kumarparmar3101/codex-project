import { useMemo } from "react";
import { useThemeTokens } from "../theme/ThemeProvider";

export type Seat = {
  id: string;
  label: string;
  row: string;
  status?: "available" | "blocked" | "selected";
};

export type SeatMapProps = {
  seats: Seat[];
  selectedSeatIds?: string[];
  onSelectionChange: (seatIds: string[]) => void;
};

export function SeatMap({
  seats,
  selectedSeatIds = [],
  onSelectionChange
}: SeatMapProps) {
  const theme = useThemeTokens();

  const seatsByRow = useMemo(() => {
    return seats.reduce<Record<string, Seat[]>>((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});
  }, [seats]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "blocked") {
      return;
    }

    const isSelected = selectedSeatIds.includes(seat.id);
    if (isSelected) {
      onSelectionChange(selectedSeatIds.filter((id) => id !== seat.id));
      return;
    }

    onSelectionChange([...selectedSeatIds, seat.id]);
  };

  return (
    <div style={{ display: "grid", gap: theme.spacing.sm }}>
      {Object.entries(seatsByRow).map(([row, rowSeats]) => (
        <div key={row} style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm }}>
          <span style={{ width: "20px", color: theme.colors.textSecondary }}>{row}</span>
          <div style={{ display: "flex", gap: theme.spacing.xs, flexWrap: "wrap" }}>
            {rowSeats.map((seat) => {
              const isSelected = selectedSeatIds.includes(seat.id) || seat.status === "selected";
              const isBlocked = seat.status === "blocked";

              return (
                <button
                  key={seat.id}
                  type="button"
                  onClick={() => toggleSeat(seat)}
                  disabled={isBlocked}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: theme.radius.sm,
                    border: `1px solid ${isSelected ? theme.colors.primary : theme.colors.border}`,
                    background: isBlocked
                      ? theme.colors.surfaceMuted
                      : isSelected
                        ? theme.colors.primary
                        : theme.colors.surface,
                    color: isSelected ? "#fff" : theme.colors.textPrimary,
                    cursor: isBlocked ? "not-allowed" : "pointer"
                  }}
                  aria-label={`Seat ${seat.label}`}
                >
                  {seat.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
