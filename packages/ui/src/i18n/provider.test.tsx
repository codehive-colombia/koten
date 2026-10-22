import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { KotenProvider, useKoten, useKotenFormatters } from "./provider";

const wrapper = ({ children }: { children: ReactNode }) => (
  <KotenProvider locale="ja" timeZone="UTC" currency="JPY">
    {children}
  </KotenProvider>
);

describe("KotenProvider", () => {
  it("falls back to English outside a provider", () => {
    const { result } = renderHook(() => useKoten());

    expect(result.current.locale).toBe("en");
    expect(result.current.labels.close).toBe("Close");
  });

  it("resolves Japanese labels and allows overrides", () => {
    const { result } = renderHook(() => useKoten(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <KotenProvider locale="ja" labels={{ close: "とじる" }}>
          {children}
        </KotenProvider>
      ),
    });

    expect(result.current.locale).toBe("ja");
    expect(result.current.labels.close).toBe("とじる");
    expect(result.current.labels.next).toBe("次へ");
  });

  it("accepts a locale without a built-in dictionary", () => {
    const { result } = renderHook(() => useKoten<string>(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <KotenProvider locale="fr-FR" labels={{ close: "Fermer" }}>
          {children}
        </KotenProvider>
      ),
    });

    expect(result.current.locale).toBe("fr-FR");
    expect(result.current.labels.close).toBe("Fermer");
    expect(result.current.labels.next).toBe("Next");
  });

  it("binds formatters to the provider locale and time zone", () => {
    const { result } = renderHook(() => useKotenFormatters(), { wrapper });

    expect(result.current.formatDate(Date.UTC(2026, 9, 21, 12))).toContain("2026");
    expect(result.current.formatNumber(1234567)).toBe("1,234,567");
    expect(result.current.formatCurrency(128000)).toContain("128,000");
  });
});
