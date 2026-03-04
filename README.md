# District + BookMyShow Clone (Monorepo Scaffold)

This repository now contains the initial scaffold for building two product experiences on top of shared services:

- `apps/district-web`: District-inspired, experience-first frontend.
- `apps/bookmyshow-web`: BookMyShow-inspired, movie-first frontend.
- `apps/api-gateway`: Aggregates catalog, booking, and user services.
- `services/*`: domain services (`catalog-service`, `booking-service`, `user-service`).
- `packages/ui`: reusable UI primitives.
- `packages/types`: shared contracts.

## Quick checks

```bash
npm --workspace @services/catalog-service test
npm --workspace @services/booking-service test
npm --workspace @services/user-service test
npm --workspace @apps/api-gateway test
```

## Next implementation milestones
1. Replace `echo` based frontend `dev` scripts with Vite/Next bootstraps.
2. Add real seat locking state + timeout cleanup.
3. Add auth + payment abstraction and booking state machine.
4. Add integration tests covering full booking lifecycle.
