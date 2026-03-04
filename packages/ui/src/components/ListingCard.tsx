import { ReactNode } from "react";
import { useThemeTokens } from "../theme/ThemeProvider";
import { makeCardStyle } from "./primitives";

type BaseListing = {
  title: string;
  imageUrl?: string;
  rating?: string;
  cta?: ReactNode;
};

export type MovieListingCardProps = BaseListing & {
  variant: "movie";
  language: string;
  duration: string;
  genre: string;
};

export type EventListingCardProps = BaseListing & {
  variant: "event";
  venue: string;
  date: string;
  category: string;
};

export type ListingCardProps = MovieListingCardProps | EventListingCardProps;

export function ListingCard(props: ListingCardProps) {
  const theme = useThemeTokens();

  const subtitle =
    props.variant === "movie"
      ? `${props.language} • ${props.duration} • ${props.genre}`
      : `${props.category} • ${props.date} • ${props.venue}`;

  return (
    <article style={{ ...makeCardStyle(theme), display: "grid", gap: theme.spacing.sm }}>
      {props.imageUrl ? (
        <img
          src={props.imageUrl}
          alt={props.title}
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: theme.radius.md
          }}
        />
      ) : null}

      <div>
        <h3 style={{ margin: 0, fontWeight: theme.typography.headingWeight }}>{props.title}</h3>
        <p style={{ margin: `${theme.spacing.xs} 0`, color: theme.colors.textSecondary }}>{subtitle}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: theme.colors.accent, fontWeight: theme.typography.headingWeight }}>
          {props.rating ? `⭐ ${props.rating}` : props.variant.toUpperCase()}
        </span>
        {props.cta}
      </div>
    </article>
  );
}
