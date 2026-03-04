# Product Scope & Delivery Plan

## Purpose
This document defines a shared product baseline for a ticketing/discovery platform, then separates district-specific modules and BookMyShow-specific modules so teams can ship a thin MVP vertical slice before expanding.

## 1) Shared Capabilities (Common Platform)
These capabilities should be reusable across all product variants:

1. **City/location selector**
   - Detect or manually select city/district.
   - Persist preference for subsequent sessions.

2. **Event/movie listings**
   - Unified listing pages with cards for movies, events, and experiences.
   - Basic metadata: title, category, venue, date/time, and pricing preview.

3. **Search + filters**
   - Global keyword search.
   - Filters by category, language, genre, date, price band, and format.

4. **Venue pages**
   - Venue profile with address/map, amenities, supported formats, and upcoming listings.

5. **Seat/time-slot selection**
   - Show available dates/times.
   - Select seat category and (where applicable) exact seats.

6. **Checkout flow**
   - Order summary, contact details, payment method, confirmation state.
   - Coupon/promo placeholder support.

7. **Booking history**
   - User account section for upcoming/past bookings.
   - Booking details, status, and booking reference retrieval.

## 2) District-Specific Modules
These modules tailor discovery for district-level needs:

1. **Experiences-focused discovery**
   - Dedicated browse section for activities (workshops, attractions, nightlife, local events).
   - Tagging and ranking tuned for discovery over transactional speed.

2. **Curated collections and local recommendations**
   - Editorial collections (e.g., “Weekend in District X”).
   - Recommendation rails blending popularity, proximity, and curation signals.

## 3) BookMyShow-Specific Modules
These modules prioritize the movie ticketing pattern associated with BookMyShow:

1. **Movie-first browse flow**
   - Primary navigation starts with movies and now-showing/coming-soon flows.
   - Fast path from movie detail to showtime selection.

2. **Theater showtimes matrix**
   - Theater-centric matrix grouping showtimes by cinema and format.
   - Quick compare across theaters, timings, language, and experience type.

3. **Seat-layout booking UX**
   - Interactive seat map with availability states and category pricing.
   - Real-time seat lock/hold behavior and selection constraints.

## 4) Prioritization: MVP vs Post-MVP
Use a thin vertical slice: **discover -> select show -> choose seats -> checkout -> see booking**.

| Capability / Module | MVP Priority | Post-MVP Priority | Notes |
|---|---|---|---|
| City/location selector | P0 | Enhancements | MVP: manual select + persistence only. |
| Event/movie listings | P0 | Enhancements | MVP: simple card list; no advanced personalization. |
| Search + filters | P0 (minimal) | P1 advanced | MVP: keyword + 2-3 essential filters. |
| Venue pages | P1 | P0 enrichment | MVP: basic venue info; richer amenities later. |
| Seat/time-slot selection | P0 | Enhancements | MVP includes showtime + seat category/exact seats where required. |
| Checkout flow | P0 | Enhancements | MVP: single payment path + confirmation. |
| Booking history | P1 | P0 full | MVP: basic upcoming/past list and detail view. |
| Experiences-focused discovery | P1 | P0 scale | Launch after core booking funnel is stable. |
| Curated collections & local recommendations | P2 | P1 | Start with static/manual curation, then automate. |
| Movie-first browse flow | P0 (BMS variant) | Enhancements | Required for BookMyShow-style UX. |
| Theater showtimes matrix | P0 (BMS variant) | Enhancements | Critical for rapid movie booking decisions. |
| Seat-layout booking UX | P0 (BMS variant) | Enhancements | MVP should support baseline seat-map interactions. |

## Suggested Delivery Sequence (Thin Vertical Slice)
1. City select -> movie/event listing -> detail page.
2. Showtime selection + seat selection baseline.
3. Checkout + confirmation.
4. Booking history read path.
5. Layer district modules and curation.
6. Add advanced filtering, recommendations, and UX polish.
