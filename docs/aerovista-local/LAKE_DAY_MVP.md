# Lake Day — MVP Brief

## Product promise

Answer one question quickly: **Is today a good lake day, and what should I know before I go?**

Initial geography: Coeur d'Alene / North Idaho.

Proposed domain: `lakeday.aerovista.us`

## Primary experience

1. Open app.
2. See a simple current recommendation: **GO / USE CAUTION / SKIP**.
3. See the reasons underneath: temperature, wind, precipitation/storm risk, smoke/air quality, daylight, and any verified lake/boating alerts.
4. Pick an activity: Boat / Swim / Paddle / Beach / Fishing.
5. Recommendation adjusts using explicit activity rules.
6. Tap beaches, launches, weather source, or share the result.

## MVP data

- Current + short-range weather
- Wind speed/gusts
- Precipitation/thunderstorm risk
- Air quality / smoke when available
- Sunrise/sunset
- Verified boating/lake notices when available
- Optional later: water temperature, lake level, launch status

## Rules

The recommendation must be deterministic and explainable. Never let an LLM invent weather or safety conditions.

Example factors:

- Lightning/thunderstorm risk: severe negative
- High gusts: negative for paddle/small craft
- Poor AQI: negative for prolonged outdoor activity
- Cold/poor weather: moderate negative
- Comfortable temperature + low wind + low storm risk: positive

## Key screens

- Today
- Activity
- Places (beaches / launches)
- Conditions / sources

## Analytics

- `journey_start`
- `activity_select`
- `recommendation_view`
- `place_click`
- `source_click`
- `share_result`
- `brand_click`

## Launch gate

- Recommendation updates from live data
- Failure state clearly says when a source is unavailable
- Safety wording does not imply guaranteed safe conditions
- Share card works on Facebook
- Umami separated from other AeroVista Local apps

## Post-MVP

- Lake webcams
- Boat ramp crowd reports
- Water temperature/history
- Saved favorite lake/launch
- Lake Day notification when conditions become excellent
