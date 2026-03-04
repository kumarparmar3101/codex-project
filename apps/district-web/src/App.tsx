import React from "react";
import { CitySelector, ListingCard } from "@packages/ui/src/index";
import type { Listing } from "@packages/types/src/index";

const districtListings: Listing[] = [
  { id: "e1", kind: "event", title: "Stand-up Night", city: "Mumbai", genre: "Comedy", venue: "Jio World", rating: 4.5 },
  { id: "e2", kind: "event", title: "Sufi Evening", city: "Delhi", genre: "Music", venue: "Dome Arena", rating: 4.3 }
];

export default function App() {
  const [city, setCity] = React.useState("Mumbai");
  return (
    <main>
      <h1>District Clone</h1>
      <p>Experience-first discovery for local events.</p>
      <CitySelector city={city} onChange={setCity} />
      <section>
        {districtListings.filter((x) => x.city === city).map((listing) => <ListingCard key={listing.id} listing={listing} />)}
      </section>
    </main>
  );
}
