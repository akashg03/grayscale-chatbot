# Testing

## What the unit tests cover

Tests live in `tests/colorLogic.test.ts` and target `lib/colorLogic.ts` only.

- **getLastTwoDigits** —
  - Extracts last two digits from numbers: 0→0, 1023→23, 1450→50, 1999→99, 101→1.
  - Extracts last two digits from numeric **strings** as well, including very large values like `"12387612831928370912893101"` (→1) without relying on `Number`.
- **mapToGrayscale** — Correct mapping for edge values: 0→white (#ffffff), 50→mid grey (#7f7f7f), 99→near black (#030303).
- **getGrayscaleForNumber** — Combination of the two for both numeric and string inputs, including a very large numeric string ending in 99 to ensure the composite behavior works in the real app scenario.

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
