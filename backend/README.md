# Budget Tracker Backend (Express + TypeScript + MongoDB)

Production-grade backend API for the Angular personal budget tracking app.

## Highlights

- Strict TypeScript (`noImplicitAny`, strict mode)
- Clean Architecture style:
  - Controller -> Service -> Repository
- MongoDB + Mongoose with indexes and timestamps
- Zod validation for all write endpoints
- Centralized error handling with consistent envelope
- Security middleware: Helmet, CORS, rate limit, NoSQL sanitization, HPP
- Structured logging via Pino
- Swagger docs at `/docs`
- Seed script, Dockerfile, docker-compose

## API Base

`/api`

## Response Envelope

All responses use:

```json
{
  "success": true,
  "message": "string",
  "data": {},
  "errors": [],
  "meta": {}
}
```

## Environment

Copy `.env.example` -> `.env` and adjust values:

- `PORT=5000`
- `NODE_ENV=development`
- `MONGO_URI=mongodb://localhost:27017/budget_tracker`
- `CORS_ORIGIN=http://localhost:4200`
- `OVESPENDING_MODE=warn`
- `RATE_LIMIT_WINDOW_MS=900000`
- `RATE_LIMIT_MAX=100`

### Production (deployed API + GitHub Pages frontend)

When the Angular app is served from **GitHub Pages** (or any other origin), browsers send that origin in the `Origin` header. The API must allow it or the browser will block responses.

- Set **`CORS_ORIGIN`** to the exact origin users open in the address bar, e.g. `https://yourusername.github.io` (no path). For a custom domain, use `https://yourdomain.com`.
- Multiple origins: use a comma-separated list if [`src/main.ts`](src/main.ts) `CORS_ORIGIN` split logic supports it (same as local `.env` pattern).
- Use **`MONGO_URI`** from MongoDB Atlas (SRV connection string) in production; keep credentials in the host’s env, not in git.

Deploy this folder to any Node-capable host (Render, Railway, Fly.io, Docker, etc.). After deployment, set `apiBaseUrl` in `frontend/src/environments/environment.prod.ts` to your public API base (e.g. `https://your-service.onrender.com/api`) and rebuild the frontend.

Rate limiting is **disabled** when `NODE_ENV=development` (see `src/main.ts`); use `NODE_ENV=production` on the deployed API for normal limits.

## Install & Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Seed Data

```bash
npm run seed
```

## Docker

```bash
docker compose up --build
```

## Main Endpoints

- `GET /api/health`
- `POST /api/plans`
- `POST /api/plans/import` (JSON snapshot: create new active plan or replace existing)
- `GET /api/plans`
- `GET /api/plans/active`
- `GET /api/plans/:id/export` (downloadable JSON snapshot: plan + categories + expenses)
- `GET /api/plans/:id`
- `PATCH /api/plans/:id/activate`
- `DELETE /api/plans/:id`
- `POST /api/categories`
- `GET /api/categories/plan/:planId`
- `GET /api/categories/:id`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`
- `POST /api/expenses`
- `GET /api/expenses/plan/:planId`
- `GET /api/expenses/:id`
- `PATCH /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `GET /api/dashboard/plan/:planId`
- `GET /api/dashboard/active`
- `GET /api/dashboard/plan/:planId/export/csv`
- `GET /api/dashboard/monthly-comparison?months=6`
- `GET /api/settings`
- `PATCH /api/settings`

## Notes

- Category and plan deletion uses **soft cascade delete** for linked data.
- Overspending behavior:
  - `block`: rejects expense that exceeds category allocation
  - `warn`: allows expense and returns warning metadata

