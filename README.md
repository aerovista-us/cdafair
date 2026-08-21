# CDA Fair Day

A fast, unofficial community companion for the 2026 North Idaho State Fair.

## MVP

- Opening-day deal callout
- Gate/carnival/parking quick info
- Today's event timeline
- Ticket-price summary
- Official Fair links
- Basic Build My Fair Day planner
- Native share / clipboard fallback
- Saturday preview
- Mobile-first responsive UI
- Generated Facebook/OpenGraph share card
- Umami analytics integration
- Clear unofficial-guide disclaimer

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Umami analytics

CDA Fair Day uses the same self-hosted Umami pattern as FireWatch.

```bash
NEXT_PUBLIC_UMAMI_URL=https://stats.aerocoreos.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<cdafair-website-id>
NEXT_PUBLIC_UMAMI_DOMAINS=cdafair.vercel.app,fair.aerovista.us
```

Tracking is automatically disabled on localhost, `file://`, and when the page is opened with `?no_analytics=1`. The domain allowlist is optional but recommended for production.

Create CDA Fair Day as its own website in Umami rather than reusing another project's website ID so analytics remain separated.

## Data sources

Summarized from the public North Idaho State Fair website.

This project is not affiliated with or endorsed by the North Idaho State Fair.
