# District Booking Monorepo

This repository is organized as a pnpm + Turborepo monorepo.

## Layout

- `apps/district-web`
- `apps/bookmyshow-web`
- `apps/api-gateway`
- `packages/ui`
- `packages/config`
- `packages/types`
- `services/booking-service`
- `services/catalog-service`
- `services/user-service`
- `infra/`

## Workspace tooling

- Package manager: `pnpm` (see `pnpm-workspace.yaml`)
- Task orchestration/caching: `turbo` (see `turbo.json`)
- Shared lint/format/tsconfig baseline: `packages/config`

## Environment variable conventions

- Every app/service includes a local `.env.example` template.
- Keep secrets out of git; copy to `.env` locally.
- Browser-exposed variables should use framework-specific public prefixes (`NEXT_PUBLIC_`, `VITE_`, etc.).
- Internal service URLs are explicit in `apps/api-gateway/.env.example`.
