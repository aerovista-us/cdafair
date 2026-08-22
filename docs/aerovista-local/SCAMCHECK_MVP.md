# ScamCheck — MVP Brief

## Product promise

Help someone answer: **What looks suspicious here, and what should I do next?**

Proposed domain: `scamcheck.aerovista.us`

## Primary experience

1. Paste a suspicious message, URL, email address, phone number, or short description.
2. ScamCheck identifies concrete red flags.
3. It returns a confidence-style assessment such as **Low concern / Suspicious / High risk** — never a guarantee that something is safe.
4. It explains *why* in plain language.
5. It gives safe verification steps using official channels.

## MVP checks

- Urgency / threat language
- Payment method red flags
- Credential/password requests
- Impersonation patterns
- Suspicious URL structure
- Lookalike/misspelled domains
- Shortened links
- Mismatched sender/domain cues
- Known high-risk phrases/patterns
- Optional reputation lookup where a reliable API is available

## Privacy rules

- Do not require an account
- Do not ask users to paste passwords, recovery codes, SSNs, full card numbers, or other secrets
- Avoid retaining submitted content by default
- Strip or minimize analytics payloads so submitted message content is never sent to Umami

## Output structure

- Risk signal
- Red flags found
- What *doesn't* prove it is safe
- Safest next action
- Official verification advice

## Analytics

Track behavior only, not submitted content:

- `journey_start`
- `check_type_select`
- `analysis_run`
- `risk_level_view`
- `safe_action_click`
- `share_result`
- `brand_click`

## Launch gate

- No claim that an item is definitively safe
- No sensitive submitted content enters analytics
- Clear limitations and privacy statement
- Common scam patterns tested
- URL parsing is robust
- Facebook share card works

## Post-MVP

- Screenshot/image scam review
- QR-code link inspection
- Domain reputation integrations
- Community scam-pattern feed
- Browser share-to-ScamCheck flow
