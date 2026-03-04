export type City = 'mumbai' | 'delhi' | 'bengaluru';

export type Experience = {
  id: string;
  city: City;
  title: string;
  category: 'Music' | 'Theatre' | 'Food' | 'Comedy' | 'Workshops';
  venue: string;
  dateTimeIso: string;
  description: string;
  priceInr: number;
  seats: string[];
};

export type Booking = {
  bookingId: string;
  experienceId: string;
  seat: string;
  status: 'Confirmed' | 'Cancelled';
};

const experiences: Experience[] = [
  {
    id: 'exp-jazz-1',
    city: 'mumbai',
    title: 'Harbor Jazz Night',
    category: 'Music',
    venue: 'Dockyard Arena',
    dateTimeIso: '2026-04-12T19:30:00Z',
    description: 'A curated evening of modern Indian jazz ensembles by the sea.',
    priceInr: 999,
    seats: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2'],
  },
  {
    id: 'exp-theatre-1',
    city: 'delhi',
    title: 'City Light Theatre Showcase',
    category: 'Theatre',
    venue: 'Pragati Stage',
    dateTimeIso: '2026-04-20T14:00:00Z',
    description: 'Award-winning stage performers bring contemporary classics alive.',
    priceInr: 1299,
    seats: ['D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2'],
  },
  {
    id: 'exp-food-1',
    city: 'bengaluru',
    title: 'Chef Table: Fireside Tasting',
    category: 'Food',
    venue: 'Maple Courtyard',
    dateTimeIso: '2026-04-25T13:00:00Z',
    description: 'A limited-seat tasting journey with seasonal ingredients.',
    priceInr: 1799,
    seats: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
  },
  {
    id: 'exp-comedy-1',
    city: 'mumbai',
    title: 'Midnight Improv Club',
    category: 'Comedy',
    venue: 'Black Box 9',
    dateTimeIso: '2026-04-14T15:30:00Z',
    description: 'Unscripted sketches and stand-up by rising local comics.',
    priceInr: 799,
    seats: ['J1', 'J2', 'J3', 'J4', 'K1', 'K2', 'K3', 'K4'],
  },
];

const bookings: Booking[] = [
  { bookingId: 'DST-10021', experienceId: 'exp-jazz-1', seat: 'A2', status: 'Confirmed' },
];

export async function getCuratedExperiences(limit = 6) {
  return experiences.slice(0, limit);
}

export async function getCities() {
  return Array.from(new Set(experiences.map((exp) => exp.city)));
}

export async function getCategoriesByCity(city: string) {
  return Array.from(new Set(experiences.filter((exp) => exp.city === city).map((exp) => exp.category)));
}

export async function getExperiencesByCity(city: string) {
  return experiences.filter((exp) => exp.city === city);
}

export async function getExperienceById(id: string) {
  return experiences.find((exp) => exp.id === id) ?? null;
}

export async function getMyBookings() {
  return bookings.map((booking) => ({
    ...booking,
    experience: experiences.find((exp) => exp.id === booking.experienceId) ?? null,
  }));
}
