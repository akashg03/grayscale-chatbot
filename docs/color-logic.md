# Color logic

## Last-two-digit extraction

We use the remainder when dividing by 100:

- `value = number % 100`
- Implemented as `getLastTwoDigits(number)`, returning a non-negative value in `[0, 99]` (e.g. negative inputs are normalized with `mod + 100`).

Examples: `1023 → 23`, `1450 → 50`, `1999 → 99`, `0 → 0`.

## Grayscale interpolation

We map that value into a single channel (R = G = B) for a hex grayscale color:

- `channel = 255 - Math.round((value / 100) * 255)`
- Hex: `#RRGGBB` with R = G = B = that channel.

Conceptually:

- **00** (value 0) → channel 255 → **white** (`#ffffff`)
- **50** → channel 127 → **mid grey** (`#7f7f7f`)
- **99** → channel 3 → **near black** (`#030303`); pure black would be at 100.

So the range `[0, 99]` maps linearly into `[255, 3]` (white to near black). The implementation clamps the input to `[0, 99]` before applying the formula.

## Usage in the app

`getGrayscaleForNumber(input)` returns both the hex color and the mod value, so the UI can show the number and apply the background without duplicating logic.
