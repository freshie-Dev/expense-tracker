# Expense Tracker (monorepo)

Personal budget app: **Angular** SPA in [`frontend/`](frontend/) and **Express + MongoDB** API in [`backend/`](backend/).

| Part | Location | Role |
|------|----------|------|
| Frontend | [`frontend/`](frontend/) (`src/`, `angular.json`) | UI, calls REST API |
| Backend | [`backend/`](backend/) | REST API under `/api`, MongoDB Atlas |

GitHub Pages hosts **only** the static output of `ng build` from `frontend/`. The API runs on a **separate** Node host (Render, Railway, Fly.io, Azure, VPS, etc.).

## Local development

Install dependencies once per folder:

```bash
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

### Frontend

From the **repository root** (scripts delegate to `frontend/`):

```bash
npm start
```

Or from `frontend/`: `ng serve` or `npm start`.

App: `http://localhost:4200/` (see [`frontend/angular.json`](frontend/angular.json) `baseHref` for GitHub Pages in production builds).

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env: MONGO_URI, CORS_ORIGIN=http://localhost:4200, etc.
npm run dev
```

API: `http://localhost:5000` (see [`backend/README.md`](backend/README.md)).

### How they connect

- Development: [`frontend/src/environments/environment.ts`](frontend/src/environments/environment.ts) sets `apiBaseUrl` to `http://localhost:5000/api`.
- Production: [`frontend/src/environments/environment.prod.ts`](frontend/src/environments/environment.prod.ts) — set `apiBaseUrl` to your **deployed** API (HTTPS) before `ng build --configuration production`. The value is **baked into the bundle** at build time.

## Production deployment

### 1. Deploy the backend

1. Deploy [`backend/`](backend/) to your Node host.
2. Set env vars: `MONGO_URI` (Atlas), `CORS_ORIGIN` (see below), `NODE_ENV=production`, etc.
3. Note the public API base URL, e.g. `https://your-api.example.com/api`.

### 2. CORS

Set `CORS_ORIGIN` on the API to the **origin** your users use in the browser (scheme + host + port; no path):

- GitHub Pages: typically `https://<username>.github.io` (project subpaths still use this origin).
- Custom domain: `https://yourdomain.com`.

If the browser blocks requests, check the Network tab for CORS errors and align `CORS_ORIGIN` with the `Origin` header.

### 3. Configure production frontend API URL

Edit [`frontend/src/environments/environment.prod.ts`](frontend/src/environments/environment.prod.ts) and set `apiBaseUrl` to your deployed API base (must match how the Express app mounts routes, usually `.../api`).

### 4. Deploy frontend to GitHub Pages

From the **repository root**:

```bash
npm run deploy
```

This runs a production build in `frontend/` with `--base-href /expense-tracker/`, copies `index.html` to `404.html` for SPA routing, and publishes `frontend/dist/expense-tracker/browser` with `angular-cli-ghpages`.

If your repo or Pages URL is not `…/expense-tracker/`, adjust `--base-href` in [`frontend/package.json`](frontend/package.json) and [`frontend/angular.json`](frontend/angular.json) to match.

**CI:** Pushes to `main` or `master` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) (build + deploy to Pages). In **Settings → Pages**, set the source to **GitHub Actions**. Ensure `environment.prod.ts` has a real `apiBaseUrl` before relying on the live site.

## MongoDB Atlas

Use an Atlas connection string in `MONGO_URI`. If the API runs on a host with changing egress IPs, IP allowlists can be awkward; many small apps use Atlas user/password auth with network rules you are comfortable with.

## Scripts (from repo root)

| Command | Description |
|---------|-------------|
| `npm start` | Angular dev server (`frontend/`) |
| `npm run build` | Production build (`frontend/`) |
| `npm test` | Unit tests (`frontend/`) |
| `npm run deploy` | Build + publish to `gh-pages` (`frontend/`) |

## More detail

- Backend API and env: [`backend/README.md`](backend/README.md)
