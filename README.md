# Residential Appliance Services

Cloudflare-ready monorepo that serves the marketing site (Vite + React) from Cloudflare Pages and relays form submissions through a dedicated Cloudflare Worker that forwards messages to a Telegram dispatcher chat.

## Project Structure

- `web/` – Vite + React single-page app that renders the marketing site and service form.
- `worker/` – TypeScript Cloudflare Worker that accepts service requests and posts them to Telegram.

## Prerequisites

- Node.js 20+
- npm 10+
- Cloudflare account with access to Pages and Workers

## Local Development

1. Install dependencies for both projects:
   ```bash
   cd web && npm install
   cd ../worker && npm install
   ```
2. (Optional) configure `web/.env.local` if you already have a deployed Worker endpoint. Local development defaults to `http://127.0.0.1:8787/service-request`.
3. Start the Worker in one terminal:
   ```bash
   cd worker
   cp .dev.vars.example .dev.vars   # then fill in Telegram credentials
   npm run dev
   ```
4. Start the Vite dev server in another terminal:
   ```bash
   cd web
   npm run dev
   ```

When both servers are running the frontend will POST to `/api/service-request`, which the Vite dev proxy forwards to the Worker (listening on port `8787`).

## Environment Variables

### Frontend (`web/.env.local`)
- `VITE_SERVICE_REQUEST_ENDPOINT` – Absolute HTTPS URL to the deployed Worker endpoint (e.g. `https://ras-worker.example.workers.dev/service-request`). Leave empty for local proxying.

### Worker (`worker/.dev.vars`, `wrangler secret put ...`)
- `TELEGRAM_BOT_TOKEN` *(secret)* – Bot token obtained from @BotFather.
- `TELEGRAM_CHAT_ID` *(secret)* – Chat or channel ID that should receive notifications.
- `ALLOWED_ORIGINS` – Comma-separated list of origins allowed to call the Worker (e.g. `http://localhost:3000,https://ras.pages.dev`). Local dev value is pre-filled in `wrangler.toml`.

## Cloudflare Deployment

### Worker (Telegram relay)
1. `cd worker && npm install`.
2. Authenticate once if needed: `npx wrangler login`.
3. Provide secrets:
   ```bash
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   ```
4. (Optional) customize `ALLOWED_ORIGINS` inside `wrangler.toml` or via `wrangler deploy --var`.
5. Deploy: `npm run deploy`.
6. Note the public URL (e.g. `https://ras-telegram-worker.<account>.workers.dev/service-request`) – this becomes the frontend endpoint.

### Cloudflare Pages (frontend)
1. Create a new Pages project from the GitHub repository.
2. Set **Project > Build Settings**:
   - Root directory: `web`
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add an environment variable under **Pages > Settings > Environment Variables**:
   - `VITE_SERVICE_REQUEST_ENDPOINT=https://<worker-subdomain>.workers.dev/service-request`
4. Trigger a deploy. Subsequent pushes to the main branch will rebuild automatically.

## Verification

- Frontend: `cd web && npm run build`
- Worker types: `cd worker && npm run types`

Both commands should pass before pushing to GitHub.
