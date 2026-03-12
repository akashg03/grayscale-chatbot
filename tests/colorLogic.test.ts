import { describe, it, expect } from "vitest";
import {
  getLastTwoDigits,
  mapToGrayscale,
  getGrayscaleForNumber,
} from "@/lib/colorLogic";

describe("getLastTwoDigits", () => {
  it("returns 0 for number 0", () => {
    expect(getLastTwoDigits(0)).toBe(0);
  });

  it("extracts last two digits from numbers using modulo", () => {
    expect(getLastTwoDigits(1023)).toBe(23);
    expect(getLastTwoDigits(1450)).toBe(50);
    expect(getLastTwoDigits(1999)).toBe(99);
    expect(getLastTwoDigits(101)).toBe(1);
  });

  it("extracts last two digits from numeric strings safely", () => {
    expect(getLastTwoDigits("0")).toBe(0);
    expect(getLastTwoDigits("1023")).toBe(23);
    expect(getLastTwoDigits("1450")).toBe(50);
    expect(getLastTwoDigits("1999")).toBe(99);
  });

  it("handles very large numeric strings without precision loss", () => {
    const largeEndingIn01 = "12387612831928370912893101";
    const largeEndingIn13 = "31289712380192830123013";
    expect(getLastTwoDigits(largeEndingIn01)).toBe(1);
    expect(getLastTwoDigits(largeEndingIn13)).toBe(13);
  });
});

describe("mapToGrayscale", () => {
  it("maps 0 to white (#ffffff)", () => {
    expect(mapToGrayscale(0)).toBe("#ffffff");
  });
  it("maps 50 to mid grey (#7f7f7f)", () => {
    expect(mapToGrayscale(50)).toBe("#7f7f7f");
  });
  it("maps 99 to near black (#030303)", () => {
    expect(mapToGrayscale(99)).toBe("#030303");
  });
});

describe("getGrayscaleForNumber", () => {
  it("combines getLastTwoDigits and mapToGrayscale for numeric input", () => {
    const { color, modValue } = getGrayscaleForNumber(1023);
    expect(modValue).toBe(23);
    expect(color).toBe(mapToGrayscale(23));
  });

  it("combines getLastTwoDigits and mapToGrayscale for string input", () => {
    const { color, modValue } = getGrayscaleForNumber("1450");
    expect(modValue).toBe(50);
    expect(color).toBe(mapToGrayscale(50));
  });

  it("handles very large numeric strings correctly", () => {
    const large = "19999999999999999999999999"; // ends with 99
    const { color, modValue } = getGrayscaleForNumber(large);
    expect(modValue).toBe(99);
    expect(color).toBe(mapToGrayscale(99));
  });
});
