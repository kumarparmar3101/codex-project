export interface Movie {
  id: string;
  title: string;
  durationMinutes: number;
  rating: string;
  genres: string[];
}

export interface Event {
  id: string;
  name: string;
  category: string;
  runtimeMinutes: number;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
}

export interface Theater {
  id: string;
  venueId: string;
  name: string;
  seatCapacity: number;
}

export interface Showtime {
  id: string;
  catalogItemType: "movie" | "event";
  catalogItemId: string;
  theaterId: string;
  startsAt: string;
  basePriceCents: number;
}

export interface MoviesResponse {
  version: "v1";
  movies: Movie[];
}

export interface EventsResponse {
  version: "v1";
  events: Event[];
}

export interface VenuesResponse {
  version: "v1";
  venues: Venue[];
}

export interface TheatersResponse {
  version: "v1";
  theaters: Theater[];
}

export interface ShowtimesResponse {
  version: "v1";
  showtimes: Showtime[];
}
