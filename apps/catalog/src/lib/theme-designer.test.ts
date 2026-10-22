import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  decodeDesignerConfig,
  defaultDesignerConfig,
  designerBases,
  designerPigments,
  encodeDesignerConfig,
  findSafeDesignerConfig,
  formatRatio,
  mixHex,
  pigmentHexFor,
  resolveDesignerTheme,
  toDesignerCss,
} from "./theme-designer";

describe("theme designer", () => {
  it("starts every register from its curated preset", () => {
    expect(defaultDesignerConfig("kanso")).toMatchObject({
      pigment: "ai",
      paper: 2,
      density: "default",
    });
    expect(defaultDesignerConfig("chirashi").pigment).toBe("shu");
    expect(defaultDesignerConfig("daicho").density).toBe("compact");
    expect(defaultDesignerConfig("sumi").base).toBe("sumi");
  });

  it("resolves the default Kanso theme to the current Koten values", () => {
    const theme = resolveDesignerTheme(defaultDesignerConfig());

    expect(theme.dark).toBe(false);
    expect(theme.failures).toBe(0);
    expect(theme.vars["--koten-bg"]).toBe("#F5F0E4");
    expect(theme.vars["--koten-primary"]).toBe("#1E3A5F");
    expect(theme.vars["--koten-radius-sm"]).toBe("2px");
    expect(theme.vars["--koten-radius-md"]).toBe("3px");
    expect(theme.vars["--koten-control-h"]).toBe("32px");
  });

  it("resolves Sumi to a dark, self-sufficient palette", () => {
    const theme = resolveDesignerTheme(defaultDesignerConfig("sumi"));

    expect(theme.dark).toBe(true);
    expect(theme.failures).toBe(0);
    expect(theme.vars["--koten-bg"]).toBe("#171512");
    expect(theme.vars["--koten-primary"]).toBe("#9CC2EF");
    expect(theme.vars["--koten-danger-solid"]).toBe("#A6331F");
    expect(toDesignerCss(theme)).toContain("color-scheme: dark;");
  });

  it("keeps every preset combination AA-safe except the curated Shu guardrail", () => {
    for (const base of designerBases) {
      for (const pigment of designerPigments) {
        for (let paper = 0; paper <= 4; paper += 1) {
          const theme = resolveDesignerTheme({ ...defaultDesignerConfig(base), pigment, paper });
          const expectedFailure = pigment === "shu" && !theme.dark && paper >= 3;

          if (expectedFailure) {
            expect(theme.failures, `${base}/${pigment}/${paper}`).toBeGreaterThan(0);
            expect(theme.checks.find((check) => check.id === "primary")?.pass).toBe(false);
          } else {
            expect(theme.failures, `${base}/${pigment}/${paper}`).toBe(0);
          }
        }
      }
    }
  });

  it("moves an unsafe Shu theme to the nearest safe paper step", () => {
    const unsafe = { ...defaultDesignerConfig(), pigment: "shu" as const, paper: 4 };
    const safe = findSafeDesignerConfig(unsafe);

    expect(resolveDesignerTheme(unsafe).failures).toBeGreaterThan(0);
    expect(resolveDesignerTheme(safe).failures).toBe(0);
    expect(safe.paper).toBeLessThan(3);
    expect(safe.pigment).toBe("shu");
  });

  it("calculates WCAG contrast and mixes colors", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
    expect(formatRatio(21)).toBe("21:1");
    expect(formatRatio(4.444)).toBe("4.44:1");
    expect(mixHex("#000000", "#FFFFFF", 0.5)).toBe("#808080");
  });

  it("exposes pigment hexes for the current register", () => {
    expect(pigmentHexFor("kanso", "shu")).toBe("#C23B22");
    expect(pigmentHexFor("sumi", "shu")).toBe("#FF9D8A");
  });

  it("round-trips the shareable configuration and clamps bad values", () => {
    const config = {
      base: "daicho" as const,
      pigment: "matcha" as const,
      paper: 3,
      radius: 1 as const,
      density: "comfortable" as const,
    };

    expect(decodeDesignerConfig(encodeDesignerConfig(config))).toEqual(config);
    expect(decodeDesignerConfig("nope.nope.9.7.huge")).toEqual({
      ...defaultDesignerConfig(),
      paper: 4,
    });
    expect(decodeDesignerConfig(null)).toEqual(defaultDesignerConfig());
  });

  it("exports a complete, ordered CSS overlay", () => {
    const css = toDesignerCss(resolveDesignerTheme(defaultDesignerConfig("sumi")));

    expect(css).toContain(":root {");
    expect(css).toContain("/* Paper and ink */");
    expect(css).toContain("  --koten-bg: #171512;");
    expect(css).toContain("  --koten-primary: #9CC2EF;");
    expect(css).toContain("  --koten-radius-sm: 2px;");
    expect(css).toContain("color-scheme: dark;");
    expect(css).not.toContain("undefined");
    expect(css.trimEnd().endsWith("}")).toBe(true);
  });
});
