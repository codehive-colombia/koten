import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate, formatNumber } from "./format";

const date = Date.UTC(2026, 9, 21, 12);

describe("formatNumber", () => {
  it("uses Spanish grouping by default", () => {
    expect(formatNumber(1234567)).toBe("1.234.567");
  });

  it("uses Japanese grouping", () => {
    expect(formatNumber(1234567, { locale: "ja" })).toBe("1,234,567");
  });

  it("accepts a full BCP 47 locale", () => {
    expect(formatNumber(1234.5, { locale: "fr-FR" })).toContain("234,5");
  });
});

describe("formatCurrency", () => {
  it("formats JPY without decimals", () => {
    const value = formatCurrency(128000, { locale: "ja" });

    expect(value).toContain("128,000");
    expect(value).not.toContain(".");
  });

  it("forces grouping in short amounts", () => {
    expect(formatCurrency(6400, { locale: "es" })).toContain("6.400");
    expect(formatCurrency(6400, { locale: "ja" })).toContain("6,400");
  });

  it("formats EUR with two decimals", () => {
    const value = formatCurrency(12345.5, { locale: "es", currency: "EUR" });

    expect(value).toContain("12.345,50");
    expect(value).toContain("€");
  });
});

describe("formatDate", () => {
  it("uses the medium Spanish format", () => {
    const value = formatDate(date, { locale: "es", timeZone: "UTC" });

    expect(value).toContain("21");
    expect(value).toContain("oct");
    expect(value).toContain("2026");
  });

  it("uses the Japanese numeric format", () => {
    expect(formatDate(date, { locale: "ja", timeZone: "UTC" })).toContain("2026/10/21");
  });

  it("uses the English medium format", () => {
    expect(formatDate(date, { locale: "en", timeZone: "UTC" })).toContain("Oct 21, 2026");
  });

  it("respects explicit date parts", () => {
    expect(
      formatDate(date, {
        locale: "es",
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    ).toBe("21/10/2026");
  });

  it("rejects invalid dates", () => {
    expect(() => formatDate("no-es-una-fecha")).toThrow(TypeError);
  });
});
