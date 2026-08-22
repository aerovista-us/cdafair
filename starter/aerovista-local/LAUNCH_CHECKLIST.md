# AeroVista Local Launch Checklist

Use this before public promotion of every AeroVista Local utility.

## Product

- Core answer/value is understandable in under 10 seconds.
- Core flow works without an account.
- Mobile layout is clean at common phone widths.
- Loading, empty, unavailable, and stale-data states are explicit.
- No critical answer is invented when source data is unavailable.

## Sources & safety

- Every important external data source is identified.
- Time-sensitive data has a last-verified or updated signal where useful.
- High-stakes or advisory claims include the appropriate disclaimer.
- External source links open correctly.
- Submitted/private user content is not sent to analytics.

## AeroVista Local

- Persistent AeroVista Local badge is visible but secondary to the utility.
- `brand_click` is tracked.
- Footer or secondary attribution is present where appropriate.
- Tool slug is unique and used for AeroVista referral attribution.

## Analytics

- Utility has its own Umami website ID.
- Production host is present in `NEXT_PUBLIC_UMAMI_DOMAINS`.
- `journey_start` works.
- Primary navigation events work.
- Primary utility action is tracked.
- Share action is tracked.
- Important outbound source/directions/ticket/etc. clicks are tracked.
- Analytics are disabled on localhost and with `?no_analytics=1`.

## Domain & metadata

- Dedicated `*.aerovista.us` hostname resolves publicly.
- Vercel reports valid configuration.
- HTTPS certificate is valid.
- `NEXT_PUBLIC_SITE_URL` uses the production AeroVista hostname.
- Canonical URL points to the production hostname.
- 1200×630 OpenGraph image renders directly.
- `og:title`, `og:description`, `og:image`, `og:url`, and Twitter card metadata are explicit.
- Meta Sharing Debugger shows the intended preview after a fresh scrape.

## Sharing & launch

- Clean public URL works without UTM parameters.
- Shared/referral links can add attribution internally without requiring ugly public launch URLs.
- Facebook launch copy is ready.
- Social preview image is readable at feed size.
- One post-launch backlog exists for observed user behavior and feedback.

## Final gate

Do not promote until the production URL, primary action, analytics, and social preview have each been tested on a real phone over a non-development network.
