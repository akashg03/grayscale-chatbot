# Testing

## What the unit tests cover

Tests live in `tests/colorLogic.test.ts` and target `lib/colorLogic.ts` only.

- **getLastTwoDigits** — Correct extraction of last two digits: 0→0, 1023→23, 1450→50, 1999→99, 101→1.
- **mapToGrayscale** — Correct mapping for edge values: 0→white (#ffffff), 50→mid grey (#7f7f7f), 99→near black (#030303).
- **getGrayscaleForNumber** — Combination of the two: for sample inputs, `modValue` matches last two digits and `color` matches `mapToGrayscale(modValue)`.

No React or DOM tests are included; the focus is on the core grayscale logic.

## How to run tests

```bash
npm test
```

Or with Vitest directly:

```bash
npx vitest run
```

Run once (CI-style). For watch mode during development, use `npx vitest` without `run`.
