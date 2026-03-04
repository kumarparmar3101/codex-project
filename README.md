# Cinema Platform Service Skeleton

This repository contains four standalone HTTP services under `services/*` and shared versioned API DTO contracts under `packages/types`.

## Services

- `services/catalog/server.js` (port `4001`)
- `services/booking/server.js` (port `4002`)
- `services/user/server.js` (port `4003`)
- `services/payment/server.js` (port `4004`)

All endpoints are versioned under `/api/v1/*`.

## Shared contracts

Contracts are grouped by bounded context and version in:

- `packages/types/v1/catalog.js`
- `packages/types/v1/booking.js`
- `packages/types/v1/user.js`
- `packages/types/v1/payment.js`

