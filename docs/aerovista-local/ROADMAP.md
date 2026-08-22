# AeroVista Local — Development Slate

Updated: 2026-08-21

CDA Fair Day is the first working reference implementation for AeroVista Local: small, mobile-first community utilities that deliver immediate value, require no account, are easy to share, lightly promote AeroVista, and produce measurable customer-journey analytics.

## Shared product standard

Every AeroVista Local utility should ship with:

- Mobile-first, fast-loading UI
- No account required for the core experience
- Clear single-purpose value proposition
- Structured source-of-truth data instead of invented answers
- Explicit source links and last-verified information where appropriate
- AeroVista Local signature that is visible but secondary to the utility
- Dedicated production subdomain on `aerovista.us`
- Separate Umami website ID
- Journey events for landing source, major navigation, primary action, share action, outbound clicks, and AeroVista brand click
- 1200×630 OpenGraph card
- Canonical metadata using the production domain
- Facebook launch post and share-safe clean URL
- Clear legal/safety disclaimer where the subject matter requires it

## Development order

| Order | Utility | Proposed domain | Build window | Why now |
| --- | --- | --- | --- | --- |
| 1 | Lake Day | `lakeday.aerovista.us` | Aug 24–26 | Highest remaining summer value and strong daily-use/share potential |
| 2 | What's Going On Tonight? | `tonight.aerovista.us` | Aug 27–30 | Reuses event/time/location patterns proven by CDA Fair Day |
| 3 | ScamCheck | `scamcheck.aerovista.us` | Aug 31–Sep 3 | Evergreen utility with broad audience and strong word-of-mouth value |
| 4 | Can I Build That Here? | `canibuild.aerovista.us` | Sep 4–11 | Highest long-term business value, but needs careful zoning/source/legal architecture |

## Shared launch gates

An app is launch-ready when:

1. Core answer is useful in under 10 seconds.
2. Mobile layout works cleanly at common phone widths.
3. Data sources are identified and failure states are explicit.
4. No critical answer is fabricated when source data is unavailable.
5. Dedicated Umami site and journey events are live.
6. Production domain resolves and HTTPS is valid.
7. OpenGraph preview passes Meta Sharing Debugger.
8. AeroVista Local branding is visible but not intrusive.
9. Facebook launch copy is ready.
10. One post-launch improvement backlog exists.

## Architecture recommendation

Keep each public utility in its own repository and Vercel project, but standardize a small reusable AeroVista Local starter that contains:

- metadata/OpenGraph pattern
- Umami loader + event queue
- AeroVista Local brand signature
- share/referral helper
- mobile navigation primitives
- source/disclaimer components
- production-domain environment contract

CDA Fair Day is the current reference implementation for those shared pieces.
