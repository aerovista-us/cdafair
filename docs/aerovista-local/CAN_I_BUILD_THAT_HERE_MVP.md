# Can I Build That Here? — MVP Brief

## Product promise

Answer: **What does this property appear to allow, what rules matter, and where do I verify it?**

Initial geography: Coeur d'Alene / Kootenai County pilot.

Proposed domain: `canibuild.aerovista.us`

## Primary experience

1. Enter an address or parcel.
2. Identify jurisdiction and parcel/zoning context.
3. Choose a project: ADU / second home / garage / shop / addition / duplex / fence / other.
4. Show the major rules that appear relevant: use, setbacks, height, lot coverage, parking, overlays, and permit/source links where reliable data exists.
5. Distinguish clearly between **verified rule**, **likely applicability**, and **needs staff/permit confirmation**.
6. Give the user the next best official verification step.

## Data priorities

- Parcel/jurisdiction lookup
- Official zoning map and zoning code
- Dimensional standards / setbacks / height / lot coverage
- ADU and accessory structure rules
- Parking requirements
- Flood, shoreline, wildfire, or other overlays when authoritative datasets are available
- Official permit/planning contact links

## Critical trust rules

- Start narrow geographically instead of pretending to be national
- Cite the official source for every material rule
- Never present the result as a permit approval or legal determination
- Show a last-verified date/version where feasible
- If parcel or zoning data conflicts, stop and tell the user what needs confirmation

## Key screens

- Property
- What I want to build
- Rules that matter
- Source / verify
- Optional project brief export later

## Analytics

Avoid putting entered street addresses into Umami event payloads.

- `journey_start`
- `project_type_select`
- `jurisdiction_resolved`
- `rule_section_view`
- `official_source_click`
- `verification_step_click`
- `brand_click`

## Launch gate

- Pilot jurisdiction boundaries are explicit
- Source mapping is auditable
- No uncited zoning conclusion
- Address/parcel information is not leaked into analytics
- Strong disclaimer and verification workflow
- At least the common residential project types are covered

## Business opportunity

This is the strongest natural bridge from a free AeroVista Local utility into paid professional work. Keep the utility useful on its own, then offer a restrained next step such as **Need a deeper site study or concept plan? AeroVista can help.**

## Post-MVP

- Parcel map visualization
- Constraint overlays
- Site-fit sketching
- Permit checklist export
- Contractor/designer handoff packet
- Additional municipalities and counties
