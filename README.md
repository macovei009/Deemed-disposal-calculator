# Deemed Disposal Calculator (MVP)

This is a minimal Next.js 14 (App Router) MVP that:
- Accepts a broker CSV in the browser (Papaparse)
- Finds purchases hitting their 8-year deemed disposal date for a selected tax year
- Fetches historical prices (server-side via yahoo-finance2)
- Calculates gains and applies 38% exit tax

Quick start:

```bash
npm install
npm run dev
```

Notes:
- `yahoo-finance2` calls are server-side in `/app/api/calculate/route.js`.
- No authentication; no persistent storage.
