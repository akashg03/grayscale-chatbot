# Architecture

## Component structure

- **ChatContainer** (`components/ChatContainer.tsx`) — Stateful parent. Holds chat messages, renders the message list with `Message`, and `ChatInput`. On submit, appends user message, computes grayscale via `getGrayscaleForNumber`, appends bot message with that background color. Manages scroll-to-bottom and wraps the messages list in `aria-live="polite"`.

- **ChatInput** (`components/ChatInput.tsx`) — Controlled form with a single number input and submit button. Validates numeric input; on failure shows inline error and sets `aria-invalid` / `aria-describedby`. Exposes `onSubmit(value, number)` to the parent. Includes visible focus styles for keyboard users.

- **Message** (`components/Message.tsx`) — Presentational. Renders one chat bubble by role: user (right, fixed accent); bot (left, dynamic grayscale background). Chooses text color by luminance for contrast. Used inside a semantic `<ul>` from the parent.

## Folder layout

- `app/` — Next.js App Router: `layout.tsx`, `page.tsx`, `globals.css`.
- `components/` — React components: ChatContainer, ChatInput, Message.
- `lib/` — Pure logic: `colorLogic.ts` (grayscale mapping).
- `types/` — TypeScript types: `chat.ts` (ChatRole, ChatMessage).
- `tests/` — Unit tests: `colorLogic.test.ts` (Vitest).
- `docs/` — Documentation (this file and others).

## Design decisions

- Chat state lives only in `ChatContainer`; no global store.
- Color logic is isolated in `lib/colorLogic.ts` and tested separately.
- Components stay small and single-purpose; accessibility (labels, live region, focus, contrast) is built in from the start.
