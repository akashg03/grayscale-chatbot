/**
 * Grayscale color logic: map last two digits of a number to a hex grayscale value.
 * Formula: channel = 255 - Math.round((value / 100) * 255), value = number % 100.
 */

/**
 * Returns the last two digits of a number (value % 100), non-negative.
 */
export function getLastTwoDigits(value: number): number {
  const mod = value % 100;
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
 * Returns grayscale color and mod value for a given number (for UI use).
 */
export function getGrayscaleForNumber(input: number): { color: string; modValue: number } {
  const modValue = getLastTwoDigits(input);
  const color = mapToGrayscale(modValue);
  return { color, modValue };
}
