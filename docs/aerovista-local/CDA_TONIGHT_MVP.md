# CDA Tonight — MVP Brief

## Product promise

Answer: **What is actually worth doing tonight in Coeur d'Alene?** without making people search Facebook, venue calendars, and event pages individually.

Working name: **CDA Tonight**

Proposed domain: `tonight.aerovista.us`

## Primary experience

1. Open app.
2. See **Tonight's best bets** ranked by start time and usefulness.
3. Filter by: Free / Live Music / Family / Date Night / Food + Drink / Outdoors.
4. See **Starting soon**, **Later tonight**, and **Last-minute option**.
5. Open the official source or directions.
6. Share one event or a compact tonight plan.

## Data strategy

Start curated and source-first rather than attempting a fragile all-web scrape.

Preferred inputs:

- Official venue calendars
- City/community calendars
- Local arts/event organizations
- Ticketing/event pages when they are the authoritative listing
- Directly maintained AeroVista Local event records when needed

Every event record should contain source URL, start time, venue, category, cost state when known, and last verification time.

## Ranking principles

- Starts within user's available window
- Verified today
- Local proximity
- Free/low friction gets a small boost
- Variety so one category does not dominate
- Never fabricate sold-out status, price, or availability

## Key screens

- Tonight
- Filters
- Event detail / source
- My Night (2–3 stop mini-plan)

## Analytics

- `journey_start`
- `filter_select`
- `event_open`
- `directions_click`
- `official_source_click`
- `night_plan_create`
- `share_event`
- `brand_click`

## Launch gate

- Enough verified inventory to be useful on a normal Friday/Saturday
- Clear empty-state when the feed is thin
- No stale event appears as current
- Facebook share preview works
- Umami journey tracking is separate

## Post-MVP

- Weekend mode
- Nearby Spokane option
- Venue follows
- Live 'happening now' layer
- Submit-an-event intake with moderation
