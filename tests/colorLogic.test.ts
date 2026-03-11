import { describe, it, expect } from "vitest";
import {
  getLastTwoDigits,
  mapToGrayscale,
  getGrayscaleForNumber,
} from "@/lib/colorLogic";

describe("getLastTwoDigits", () => {
  it("returns 0 for 0", () => {
    expect(getLastTwoDigits(0)).toBe(0);
  });
  it("extracts last two digits: 1023 → 23", () => {
    expect(getLastTwoDigits(1023)).toBe(23);
  });
  it("extracts last two digits: 1450 → 50", () => {
    expect(getLastTwoDigits(1450)).toBe(50);
  });
  it("extracts last two digits: 1999 → 99", () => {
    expect(getLastTwoDigits(1999)).toBe(99);
  });
  it("returns 1 for 101", () => {
    expect(getLastTwoDigits(101)).toBe(1);
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
  it("combines getLastTwoDigits and mapToGrayscale for 1023", () => {
    const { color, modValue } = getGrayscaleForNumber(1023);
    expect(modValue).toBe(23);
    expect(color).toBe(mapToGrayscale(23));
  });
  it("combines getLastTwoDigits and mapToGrayscale for 1450", () => {
    const { color, modValue } = getGrayscaleForNumber(1450);
    expect(modValue).toBe(50);
    expect(color).toBe(mapToGrayscale(50));
  });
  it("combines getLastTwoDigits and mapToGrayscale for 1999", () => {
    const { color, modValue } = getGrayscaleForNumber(1999);
    expect(modValue).toBe(99);
    expect(color).toBe(mapToGrayscale(99));
  });
});
