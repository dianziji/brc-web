# Homepage Visual Regression Baseline Convention

This project currently does not ship a browser screenshot runner dependency by default.
Use the naming and folder convention below when enabling visual regression.

## Capture matrix

- Locales: `zh`, `en`
- Viewports:
  - `mobile` (390x844)
  - `tablet` (768x1024)
  - `desktop` (1440x900)
- Sections:
  - `hero`
  - `mission-vision`
  - `stats`
  - `align-with-god`
  - `prayer`
  - `ministries`
  - `events`
  - `trainings`
  - `donation-contact`

## Baseline path format

`tests/visual/baseline/<locale>/<viewport>/<section>.png`

Examples:

- `tests/visual/baseline/zh/mobile/hero.png`
- `tests/visual/baseline/en/desktop/ministries.png`

## Suggested diff output path

`tests/visual/diff/<locale>/<viewport>/<section>.png`

## Suggested threshold

- Pixel ratio threshold: `0.015` (1.5%)
- Auto-fail on layout shift over threshold in key sections.
