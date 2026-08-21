# CDA Fair Day

A fast, unofficial community companion for the 2026 North Idaho State Fair.

## MVP

- App-style tabbed navigation
- Live opening-day status and next-up event
- Gate/carnival/parking quick info
- Today's event timeline
- Admission prices and daily promotions
- Official Fair links and directions
- Build My Fair Day planner
- Native share / clipboard fallback
- Saturday preview
- Mobile-first responsive UI
- Generated Facebook/OpenGraph share card
- Umami customer-journey analytics
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
NEXT_PUBLIC_SITE_URL=https://cdafair.vercel.app
NEXT_PUBLIC_UMAMI_URL=https://stats.aerocoreos.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<cdafair-website-id>
NEXT_PUBLIC_UMAMI_DOMAINS=cdafair.vercel.app,fair.aerovista.us
```

`NEXT_PUBLIC_UMAMI_DOMAINS` accepts exact hosts or suffix guards such as `.vercel.app` and `.aerovista.us`.

Tracking is automatically disabled on localhost, `file://`, and when the page is opened with `?no_analytics=1`. Create CDA Fair Day as its own website in Umami rather than reusing another project's website ID so analytics remain separated.

### Journey events

- `journey_start` — entry tab, UTM source/campaign/content, referrer host
- `tab_view` — navigation path between Today, My Day, Deals and Fair Info
- `planner_generate` — audience, duration, interest and result count
- `planner_share` — native-share or clipboard completion
- `planner_share_cancel` — canceled native share
- `outbound_click` — official schedule, admission, hours, parking, directions or official Fair site

Planner shares add `utm_source=share&utm_medium=referral&utm_campaign=cdafair_plan` automatically so referred visits can be separated from direct traffic.

For the launch Facebook post, use:

```text
?utm_source=facebook&utm_medium=social&utm_campaign=cdafair_launch&utm_content=opening_day#today
```

## Data sources

Summarized from the public North Idaho State Fair website.

This project is not affiliated with or endorsed by the North Idaho State Fair.
