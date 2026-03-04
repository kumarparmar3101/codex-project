# District + BookMyShow Clone Plan

## 1) Shared capabilities (core platform)
- City/location selector.
- Discovery listings for movies and events.
- Search, category filters, and sorting.
- Venue/theater detail pages.
- Showtime or timeslot selection.
- Seat selection with dynamic pricing tiers.
- Checkout and booking confirmation.
- Booking history for signed-in users.

## 2) District-focused UX modules
- Experience-first home feed (comedy, workshops, nightlife, etc.).
- Curated collections by city and mood.
- Local recommendation rails and editorial cards.

## 3) BookMyShow-focused UX modules
- Movie-first home page and detail flow.
- Theater schedule matrix by date.
- Rich seat map with class tiers (silver/gold/recliner).

## 4) MVP priorities
| Priority | Module | Why |
|---|---|---|
| P0 | City selector + listing pages | Enables first visit discovery |
| P0 | Showtimes/timeslots + seat locking API | Core transactional behavior |
| P0 | Checkout with mock payment intent | End-to-end booking slice |
| P1 | Personalized recommendations | Improves engagement |
| P1 | Offer/coupon support | Improves conversion |
| P2 | Notifications and reminders | Retention |

## 5) Delivery phases
1. Monorepo + shared package scaffold.
2. Catalog + booking + user service APIs (mock data first).
3. District web MVP (discover -> book).
4. BookMyShow web MVP (movie -> theater -> seats -> pay).
5. CI, tests, and observability.
