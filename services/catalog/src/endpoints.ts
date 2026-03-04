import { API_V1_CONTRACTS, type Event, type EventsResponse, type Movie, type MoviesResponse, type ShowtimesResponse, type Theater, type TheatersResponse, type Venue, type VenuesResponse } from "../../../packages/types/src/v1";

const movies: Movie[] = [{ id: "m1", title: "Arrival", durationMinutes: 116, rating: "PG-13", genres: ["Sci-Fi", "Drama"] }];
const events: Event[] = [{ id: "e1", name: "Live Orchestra Night", category: "music", runtimeMinutes: 140 }];
const venues: Venue[] = [{ id: "v1", name: "Downtown Multiplex", city: "Seattle" }];
const theaters: Theater[] = [{ id: "t1", venueId: "v1", name: "IMAX Hall", seatCapacity: 220 }];
const showtimes: ShowtimesResponse["showtimes"] = [{ id: "s1", catalogItemType: "movie", catalogItemId: "m1", theaterId: "t1", startsAt: new Date().toISOString(), basePriceCents: 1600 }];

export const catalogEndpoints = {
  movies: { method: "GET", path: API_V1_CONTRACTS.catalog.movies, handler: (): MoviesResponse => ({ version: "v1", movies }) },
  events: { method: "GET", path: API_V1_CONTRACTS.catalog.events, handler: (): EventsResponse => ({ version: "v1", events }) },
  venues: { method: "GET", path: API_V1_CONTRACTS.catalog.venues, handler: (): VenuesResponse => ({ version: "v1", venues }) },
  theaters: { method: "GET", path: API_V1_CONTRACTS.catalog.theaters, handler: (): TheatersResponse => ({ version: "v1", theaters }) },
  showtimes: { method: "GET", path: API_V1_CONTRACTS.catalog.showtimes, handler: (): ShowtimesResponse => ({ version: "v1", showtimes }) }
} as const;
