# Future considerations

These are possible directions for evolution, not current features.

- **Chat persistence** — Store messages in `localStorage` or a backend so history survives refresh or is synced across devices.
- **Stronger input validation** — Limit maximum input length to avoid extremely long numeric strings impacting performance, and surface clearer error messages or hints when users paste unexpected formats.
- **Automated accessibility testing** — Integrate axe or Lighthouse CI into the pipeline to guard against regressions.
- **Reusable UI components** — If the interface grows (e.g. multiple screens or chat variants), extract shared primitives (inputs, cards, lists) into a small component library.
- **Analytics** — Use a tool like PostHog to understand usage (e.g. which numbers are entered, drop-off) without changing core behavior.
- **Backend** — Add an API or database if you need multi-user support, persistence, or server-side logic; the current app is intentionally front-end only and stateless.
 - **Live-region and keyboard ergonomics** — Throttle or batch `aria-live` announcements if the chat becomes high volume, and fine-tune layout / font sizes for very small viewports and on-screen keyboards.
