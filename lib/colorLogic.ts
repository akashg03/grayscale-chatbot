/**
 * Grayscale color logic: map the last two digits of a numeric input to a hex
 * grayscale value. To support arbitrarily large integers safely, this operates
 * on string input when available instead of relying on JavaScript's Number
 * (which loses precision beyond 2^53 - 1).
 */

/**
 * Returns the last two digits of a numeric input, non-negative.
 *
 * - For string input, extracts digits from the end of the string and
 *   interprets the last two as an integer in [0, 99].
 * - For number input, falls back to value % 100 (preserving previous behavior)
 *   for callers that still use numbers.
 */
export function getLastTwoDigits(input: number | string): number {
  if (typeof input === "string") {
    const trimmed = input.trim();
    const match = trimmed.match(/^[-+]?\d+$/);
    if (!match) {
      return 0;
    }
    const digits = match[0].replace(/^[-+]/, "");
    if (digits.length === 0) {
      return 0;
    }
    const lastTwo = digits.slice(-2);
    const parsed = Number.parseInt(lastTwo, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  const mod = input % 100;
  return mod < 0 ? mod + 100 : mod;
}

/**
 * Maps value in [0, 99] to a grayscale hex color.
 * 0 → white, 50 → mid grey, 99 → near black.
 */
export function mapToGrayscale(value: number): string {
  const clamped = Math.max(0, Math.min(99, Math.floor(value)));
  const channel = 255 - Math.round((clamped / 100) * 255);
  const hex = channel.toString(16).padStart(2, "0");
  return `#${hex}${hex}${hex}`;
}

/**
 * Returns grayscale color and mod value for a given numeric input (for UI use).
 * Accepts either a number or a numeric string; string input is preferred to
 * avoid precision loss for very large integers.
 */
export function getGrayscaleForNumber(
  input: number | string,
): { color: string; modValue: number } {
  const modValue = getLastTwoDigits(input);
  const color = mapToGrayscale(modValue);
  return { color, modValue };
}
