import { FormEvent, useState } from "react";
import { useThemeTokens } from "../theme/ThemeProvider";
import { makeButtonStyle } from "./primitives";

export type SearchBarProps = {
  value?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
};

export function SearchBar({
  value = "",
  placeholder = "Search movies, events, or venues",
  onSearch
}: SearchBarProps) {
  const [query, setQuery] = useState(value);
  const theme = useThemeTokens();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: theme.spacing.sm }}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          borderRadius: theme.radius.pill,
          border: `1px solid ${theme.colors.border}`,
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          background: theme.colors.surface,
          color: theme.colors.textPrimary,
          fontFamily: theme.typography.fontFamily
        }}
      />
      <button type="submit" style={makeButtonStyle(theme)}>
        Search
      </button>
    </form>
  );
}
