export type City = "Mumbai" | "Delhi" | "Bengaluru";

export interface Listing {
  id: string;
  kind: "movie" | "event";
  title: string;
  city: City;
  genre: string;
  venue: string;
  rating: number;
}

export interface Showtime {
  id: string;
  listingId: string;
  startsAt: string;
  language?: string;
  format?: string;
}

export interface Seat {
  code: string;
  className: "Silver" | "Gold" | "Recliner";
  price: number;
  isAvailable: boolean;
}
