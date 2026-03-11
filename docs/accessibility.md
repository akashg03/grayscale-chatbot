# Accessibility (WCAG 2.0)

## WCAG considerations implemented

- **Perceivable** — Text and UI are readable; bot bubble text color is chosen for contrast against the grayscale background; errors are communicated by text, not only color.
- **Operable** — Form is keyboard-operable (Tab, Enter); focus order is logical; focus is visible.
- **Understandable** — Labels and headings describe the interface; validation errors are clear.
- **Robust** — Semantic HTML and ARIA where needed so assistive technologies can interpret the page.

## Semantic HTML

- `<main>` for primary content; heading for the page title.
- `<section>` with `aria-label="Chat"` for the chat area.
- `<form>`, `<label>`, `<button>` for the input; `<label>` is associated with the input via `htmlFor` / `id`.
- Message list is a `<ul>` with `<li>` items; the scrollable container has `aria-label="Messages"`.

## aria-live

The messages container has `aria-live="polite"` so when a new bot reply is added, screen readers announce it without interrupting the user. Only new content is added (no full re-render of the region), so announcements stay relevant.

## Contrast handling

- Bot message background is dynamic (grayscale). Text color is chosen by luminance: light background → dark text (`text-gray-900`), dark background → light text (`text-white`), to keep contrast sufficient.
- User bubbles and the rest of the UI use fixed colors that meet contrast guidelines.
- Validation errors use both color and visible text (e.g. “Please enter a valid number”) so they are not conveyed by color alone.
