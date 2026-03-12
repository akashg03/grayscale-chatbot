# Color logic

## Last-two-digit extraction

To handle arbitrarily large integers safely, we operate primarily on the **string**
the user typed instead of relying on JavaScript's `Number`, which loses precision
for values beyond \(2^{53} - 1\).

- `getLastTwoDigits(input)` accepts either a `number` or a **numeric string**.
- For strings, it:
  - trims whitespace,
  - validates with `/^[-+]?\\d+$/`,
  - strips the sign,
  - takes the last two digits,
  - returns them as a non-negative integer in `[0, 99]`.
- For numbers, it preserves the original behavior: `value = number % 100`
  (with a small fix to keep the result non-negative).

Examples:

- `1023 → 23`
- `1450 → 50`
- `1999 → 99`
- `0 → 0`
- `"12387612831928370912893101" → 1` (huge integer, safe via string path)

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

`getGrayscaleForNumber(input)` accepts either a `number` or a numeric **string**
and returns both the hex color and the mod value. The UI passes the raw input
string so that very large numbers still produce the correct color based on their
last two digits.
