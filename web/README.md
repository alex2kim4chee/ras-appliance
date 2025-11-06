## Residential Appliance Services – Frontend

This directory hosts the marketing site that is deployed to Cloudflare Pages.

### Scripts

- `npm run dev` – Start the Vite dev server on port `3000`.
- `npm run build` – Build production assets into `dist/`.
- `npm run preview` – Preview the production build locally.

### Environment Variable

Create `web/.env.local` to override the API endpoint:

```
VITE_SERVICE_REQUEST_ENDPOINT=https://your-worker.workers.dev/service-request
```

When left blank the app will call `/api/service-request`, which the dev server proxies to the local Worker running on port `8787`.
