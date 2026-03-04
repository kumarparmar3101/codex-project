import { ChangeEvent } from "react";
import { useThemeTokens } from "../theme/ThemeProvider";

export type CitySelectorProps = {
  cities: string[];
  selectedCity?: string;
  label?: string;
  onCityChange: (city: string) => void;
};

export function CitySelector({
  cities,
  selectedCity,
  label = "City",
  onCityChange
}: CitySelectorProps) {
  const theme = useThemeTokens();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCityChange(event.target.value);
  };

  return (
    <label style={{ display: "grid", gap: theme.spacing.xs, color: theme.colors.textSecondary }}>
      <span style={{ fontSize: theme.typography.captionSize }}>{label}</span>
      <select
        value={selectedCity}
        onChange={handleChange}
        style={{
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.md,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          background: theme.colors.surface,
          color: theme.colors.textPrimary,
          fontFamily: theme.typography.fontFamily
        }}
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </label>
  );
}
