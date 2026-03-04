import React from "react";
import type { Listing, Seat } from "@packages/types/src/index";

export function CitySelector({ city, onChange }: { city: string; onChange: (city: string) => void }) {
  return (
    <select value={city} onChange={(e) => onChange(e.target.value)}>
      <option>Mumbai</option>
      <option>Delhi</option>
      <option>Bengaluru</option>
    </select>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <h3>{listing.title}</h3>
      <p>{listing.genre} · {listing.venue}</p>
      <small>{listing.kind.toUpperCase()} · ⭐ {listing.rating}</small>
    </article>
  );
}

export function SeatMap({ seats }: { seats: Seat[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 6 }}>
      {seats.map((seat) => (
        <button key={seat.code} disabled={!seat.isAvailable}>
          {seat.code}
        </button>
      ))}
    </div>
  );
}
