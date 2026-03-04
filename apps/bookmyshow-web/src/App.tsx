import React from "react";
import { CitySelector, ListingCard } from "@packages/ui/src/index";
import type { Listing } from "@packages/types/src/index";

const movies: Listing[] = [
  { id: "m1", kind: "movie", title: "Galactic Heist", city: "Mumbai", genre: "Sci-Fi", venue: "PVR Phoenix", rating: 4.4 },
  { id: "m2", kind: "movie", title: "Midnight Case", city: "Bengaluru", genre: "Thriller", venue: "INOX Forum", rating: 4.1 }
];

export default function App() {
  const [city, setCity] = React.useState("Mumbai");
  return (
    <main>
      <h1>BookMyShow Clone</h1>
      <p>Movie-first booking flow with theaters and showtimes.</p>
      <CitySelector city={city} onChange={setCity} />
      <section>
        {movies.filter((x) => x.city === city).map((listing) => <ListingCard key={listing.id} listing={listing} />)}
      </section>
    </main>
  );
}
