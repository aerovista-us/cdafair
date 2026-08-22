# AeroVista Local Starter

Reusable launch foundation extracted from CDA Fair Day.

This starter is intentionally small. It carries the pieces every AeroVista Local utility should inherit without forcing a Fair-specific UI, data model, or navigation pattern onto the next product.

## Included

- `components/AeroVistaLocalBadge.tsx.template` — persistent, restrained AeroVista Local attribution with tracked brand click
- `components/UmamiAnalytics.tsx.template` — self-hosted Umami loader with localhost/file/no-analytics guards, host allowlist, and queued-event flush
- `components/SourceNotice.tsx.template` — reusable source-of-truth / disclaimer block
- `lib/analytics.ts.template` — safe analytics event queue
- `lib/share.ts.template` — clean public sharing plus optional referral attribution
- `app/layout.tsx.template` — canonical metadata and explicit OpenGraph/Twitter image contract
- `app/opengraph-image.tsx.template` — editable 1200×630 social card scaffold
- `.env.example.template` — production domain and Umami environment contract
- `LAUNCH_CHECKLIST.md` — pre-publication gate

## How to use for a new utility

1. Create a fresh Next.js app/repository.
2. Copy the template files into their matching paths and remove the `.template` suffix.
3. Replace the obvious app constants: app name, description, production domain, source label, and tool slug.
4. Create a **new Umami website ID** for the utility; never reuse another AeroVista Local app's ID.
5. Add app-specific journey events around the primary user flow.
6. Build the utility-specific UI and data layer on top of this foundation.
7. Run `LAUNCH_CHECKLIST.md` before public promotion.

## Analytics event baseline

Every utility should emit at least:

- `journey_start`
- `tab_view` or equivalent primary navigation event
- one app-specific primary-action event
- `share`
- `outbound_click`
- `brand_click`

Do not send message bodies, URLs submitted for private analysis, names, email addresses, phone numbers, precise addresses, or other sensitive user content in Umami event payloads.

## Production-domain contract

The canonical public hostname belongs in:

```env
NEXT_PUBLIC_SITE_URL=https://example.aerovista.us
NEXT_PUBLIC_UMAMI_DOMAINS=example.aerovista.us,.vercel.app
```

The code keeps the Vercel host usable for previews, while canonical/social metadata should point to the AeroVista hostname.

## Product rule

**Value first, AeroVista second.** The utility should earn attention by being useful. Branding should remain visible and memorable without making the experience feel like an advertisement.
