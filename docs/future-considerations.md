# Future considerations

These are possible directions for evolution, not current features.

- **Chat persistence** — Store messages in `localStorage` or a backend so history survives refresh or is synced across devices.
- **Stronger input validation** — Limit range, support decimals or integers only, and surface clearer error messages or hints.
- **Automated accessibility testing** — Integrate axe or Lighthouse CI into the pipeline to guard against regressions.
- **Reusable UI components** — If the interface grows (e.g. multiple screens or chat variants), extract shared primitives (inputs, cards, lists) into a small component library.
- **Analytics** — Use a tool like PostHog to understand usage (e.g. which numbers are entered, drop-off) without changing core behavior.
- **Backend** — Add an API or database if you need multi-user support, persistence, or server-side logic; the current app is intentionally front-end only and stateless.
