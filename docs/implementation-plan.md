---
name: chatbot-grayscale-ui
overview: Implement an accessible grayscale-mapped chatbot-style UI in Next.js (App Router) with TailwindCSS, TypeScript, unit tests for core color logic, and Vercel-ready configuration. Documentation is split between a concise README and a docs/ directory.
todos:
  - id: setup-project
    content: Initialize Next.js (App Router) project with TypeScript and TailwindCSS, create base folder structure (app, components, lib, types, tests, docs).
    status: pending
  - id: implement-color-logic
    content: Implement grayscale mapping and last-two-digits functions in lib/colorLogic.ts using simplified formula; add getGrayscaleForNumber helper.
    status: pending
  - id: write-color-logic-tests
    content: Configure Vitest/Jest and add unit tests in tests/colorLogic.test.ts for grayscale mapping and digit extraction only (no React component tests).
    status: pending
  - id: build-ui-components
    content: Implement Message, ChatInput, and ChatContainer components with clean props and state management.
    status: pending
  - id: apply-accessibility-and-responsive-styling
    content: Add semantic HTML, labels, aria-live, focus states, and responsive Tailwind styling with smooth color transitions.
    status: pending
  - id: finalize-docs-and-vercel
    content: Write concise README.md and full docs/ set (architecture, color-logic, accessibility, testing, future-considerations); document Vercel deployment.
    status: pending
isProject: false
---

## Model selection

For a task of this scale, **running on Auto is recommended**. The work is well-scoped, and a single capable model can handle setup, logic, components, accessibility, tests, and docs without handoffs. If you prefer to assign models per phase:

- **Setup** (Next.js, Tailwind, folders): Auto or default — straightforward scaffolding.
- **Color logic + unit tests**: Auto or default — small, deterministic code and tests; any capable model suffices.
- **UI components + layout**: Auto or default — standard React/Next patterns; clarity matters more than model choice.
- **Accessibility + responsive styling**: Auto or default — WCAG and Tailwind are well-documented; consistency with the rest of the app is key.
- **Documentation** (README + docs/): Auto or default — structured writing; same model keeps tone and cross-references consistent.

**Summary**: Use **Auto** unless you have a reason to use a faster model for boilerplate (e.g. setup only) and a stronger one for accessibility or docs; for this size, the gain is usually minimal.

---

## High-level approach

- **Goal**: Build a small, accessible, responsive chatbot-style UI in Next.js (App Router) that maps the last two digits of a user-entered number to a grayscale background color for the bot reply, with clean structure and unit tests for core logic only.
- **Tech stack**: Next.js (App Router), TypeScript, TailwindCSS, Vitest or Jest for unit tests, configured for easy Vercel deployment.
- **Structure**: Keep architecture simple: `app/`, `components/`, `lib/`, `types/`, `tests/`, `docs/`.

---

## Project setup

- **Initialize Next.js App Router project**
  - Use `create-next-app` with TypeScript enabled, targeting the `app/` directory structure.
  - Confirm the `app/` router is active (no `pages/` usage) and TypeScript is correctly configured.
- **Add TailwindCSS**
  - Install TailwindCSS, PostCSS, and Autoprefixer.
  - Configure `tailwind.config.ts` and `postcss.config.js` as per Tailwind/Next.js defaults.
  - Add base Tailwind imports to the global stylesheet (e.g., `app/globals.css`).
- **Organize folders**
  - Create: `app/`, `components/`, `lib/`, `types/`, `tests/`, `docs/`.
  - Ensure `tsconfig.json` uses sensible path aliases if needed (e.g., `@/components`, `@/lib`).

---

## Core color logic (`lib/colorLogic.ts`)

- **Functions to implement**
  - **getLastTwoDigits(value: number): number**
    - Returns `value % 100`, ensuring non-negative result (handle negatives if desired).
  - **mapToGrayscale(value: number): string**
    - Input: integer in [0, 99] (clamp if needed).
    - **Simplified formula**: `channel = 255 - Math.round((value / 100) * 255)`.
    - Conceptually: 00 → white, 50 → grey, 100 → black (values 0–99 map into that range).
    - Return hex `#RRGGBB` with R = G = B = channel.
  - **getGrayscaleForNumber(input: number): { color: string; modValue: number }**
    - `modValue = getLastTwoDigits(input)`, then `color = mapToGrayscale(modValue)`.
    - Used by UI to avoid duplicating logic.
- **Edge behavior**
  - Keep logic deterministic; values outside 0–99 are handled via `value % 100` only.

---

## Types (`types/`)

- **Chat message types**
  - `ChatRole = 'user' | 'bot'`.
  - `ChatMessage`: `id`, `role`, `text`, optional `color?: string` for bot messages.
- **Optional**: small `ColorInfo` type (e.g. `{ modValue: number; color: string }`) if it improves clarity.

---

## UI components

### ChatContainer (stateful parent)

- **Location**: components/ChatContainer.tsx
- **Responsibilities**
  - Hold chat state as `ChatMessage[]`.
  - Render message list with `Message`; include `ChatInput` and wire its `onSubmit`.
  - On valid submit: append user message, compute `getGrayscaleForNumber`, append bot message (e.g. "Received number 2542") with that color.
  - Optionally scroll to bottom on new messages (ref + useEffect), without harming accessibility.
- **Accessibility**
  - Wrap messages list (or bot-only region) in `aria-live="polite"` so new bot replies are announced.
  - Use semantic list: e.g. `<ul>` with each message as `<li>`.

### ChatInput (input and validation)

- **Location**: components/ChatInput.tsx
- **Responsibilities**
  - `<form>` with `<label htmlFor="number-input">`, `<input id="number-input">` (number or text with numeric validation), and submit `<button>`.
  - Validation: ensure input parses as number; on failure show inline error and use `aria-invalid`, `aria-describedby`.
  - Props: `onSubmit: (value: number, raw: string) => void`.
  - Keyboard: Enter submits; visible focus styles (`focus-visible:ring` etc.) on input and button.

### Message (presentational)

- **Location**: components/Message.tsx
- **Responsibilities**
  - Render one chat bubble by `role`: user right-aligned with fixed accent background; bot left-aligned with `style={{ backgroundColor: color }}`.
  - Use `transition-colors` and `duration-300` (or similar) on bot bubble for smooth color change.
  - Set text color by brightness: channel < ~128 → light text; else → dark text, for contrast.
  - Semantic markup consistent with parent (e.g. content for `<li>`).

---

## Page layout (`app/page.tsx`)

- **Location**: app/page.tsx
- **Responsibilities**
  - Compose main layout with centered chat; semantic `<main>` and heading.
  - Tailwind: center vertically/horizontally, `max-w-md`/`max-w-lg`, responsive padding and typography.
  - Card-style container, minimal look; messages area scrollable, input docked at bottom (flex layout).

---

## Accessibility (WCAG 2.0)

- **Semantic HTML**: `<main>`, `<section>`, `<ul>`, `<li>`, `<form>`, `<label>`, `<button>`; clear headings and labels.
- **Forms**: One `<label>` for the number input; `aria-invalid` and `aria-describedby` when errors exist.
- **Keyboard**: All controls focusable in order; Enter submits; Tailwind focus styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`).
- **Live region**: `aria-live="polite"` on message list or bot container so new responses are announced.
- **Contrast**: Dynamic text color on bot bubble by grayscale brightness; sufficient contrast elsewhere; errors communicated by text (not color alone).

---

## Styling and responsiveness

- **Tailwind**: Neutral background, rounded bubbles, subtle shadow, `transition-colors` on bubbles.
- **Responsive**: `max-w-md`/`max-w-lg`, `w-full`, flex column with scrollable messages and fixed input; test mobile and desktop.

---

## Testing (unit tests only)

- **Test framework**: Vitest or Jest with TypeScript; config targets `lib` (no React test env required).
- **File**: tests/colorLogic.test.ts
  - **getLastTwoDigits**: 0→0, 1023→23, 1450→50, 1999→99.
  - **mapToGrayscale**: 0→#ffffff; 50→mid grey (channel = 255 - Math.round((50/100)*255)); 99→near black.
  - **getGrayscaleForNumber**: representative inputs to ensure modValue and color match.
- **Do not** add React component tests; keep setup minimal and focus on core logic.

---

## Documentation structure

### README.md (concise)

- **Project overview**: What the app does (chatbot UI, grayscale by last two digits).
- **Quick architecture summary**: One-paragraph description of `app/`, `components/`, `lib/`, `types/`, `tests/`, `docs/`.
- **Run locally**: `npm install`, `npm run dev`.
- **Deploy to Vercel**: Connect repo or use CLI (`npm run build`, `vercel` / `vercel --prod`).
- **Tools used**: Next.js, TailwindCSS, TypeScript, Vitest/Jest, Vercel, AI coding assistant.

### docs/ directory

- **docs/architecture.md** — Component structure (ChatContainer, ChatInput, Message), folder layout, design decisions.
- **docs/color-logic.md** — Last-two-digit extraction (`value = number % 100`), grayscale formula `channel = 255 - Math.round((value/100)*255)`, example mappings (00→white, 50→grey, 100→black).
- **docs/accessibility.md** — WCAG considerations, semantic HTML, `aria-live`, contrast handling.
- **docs/testing.md** — What the unit tests cover, how to run them (`npm test` / `npx vitest`).
- **docs/future-considerations.md** — Ideas only (not implemented): chat persistence, stronger validation, automated a11y testing, reusable components, analytics e.g. PostHog, optional backend for persistence/multi-user.

---

## Vercel readiness

- **Scripts**: `dev`, `build`, `start`, `test` in `package.json`; no custom server.
- **Checks**: Run `npm run build` and `npm test` before deployment.
- **Deploy**: Document in README (Vercel dashboard or CLI: `vercel`, `vercel --prod`).

---

## Implementation order

1. Set up Next.js + Tailwind + TypeScript and folder structure (including `docs/`).
2. Implement `lib/colorLogic.ts` with simplified interpolation formula.
3. Configure Vitest/Jest and write `tests/colorLogic.test.ts`; verify tests pass.
4. Add types in `types/` and implement `Message`, `ChatInput`, `ChatContainer`.
5. Implement `app/page.tsx` with responsive layout and compose components.
6. Apply accessibility (labels, aria-live, focus states, contrast) and refine responsive styling.
7. Write concise README and all docs in `docs/`; confirm deployment steps.
