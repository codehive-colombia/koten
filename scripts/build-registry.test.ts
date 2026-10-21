import { describe, expect, it } from "vitest";
import { buildItems } from "./build-registry";

const siteUrl = "https://koten.example.test";
const items = buildItems({ siteUrl });
const theme = items.find((item) => item.name === "koten-theme");
const components = items.filter((item) => item.name !== "koten-theme");

function targetCandidates(specifier: string): string[] {
  const path = specifier.replace(/^@\//, "");

  if (path.startsWith("components/ui/")) {
    const file = path.slice("components/ui/".length);
    return [`@ui/${file}.ts`, `@ui/${file}.tsx`];
  }
  if (path.startsWith("components/patterns/")) {
    const file = path.slice("components/patterns/".length);
    return [`@components/patterns/${file}.ts`, `@components/patterns/${file}.tsx`];
  }
  if (path.startsWith("lib/")) {
    const file = path.slice("lib/".length);
    return [`@lib/${file}.ts`, `@lib/${file}.tsx`];
  }

  return [];
}

describe("registry shadcn", () => {
  it("generates one item per primitive and pattern plus the theme", () => {
    expect(items.length).toBeGreaterThanOrEqual(65);
    expect(new Set(items.map((item) => item.name)).size).toBe(items.length);
    expect(theme?.type).toBe("registry:theme");
    expect(theme?.files).toBeUndefined();
  });

  it("ships tokens, themes and density through the theme item", () => {
    const variables = theme?.cssVars?.theme ?? {};
    const css = theme?.css ?? {};

    expect(variables["color-paper"]).toBe("var(--koten-bg)");
    expect(variables["color-rule"]).toBe("var(--koten-border)");
    expect(variables["color-background"]).toBe("var(--koten-bg)");
    expect(Object.keys(variables).some((key) => key.endsWith("-*"))).toBe(false);
    expect(css).toHaveProperty(":root");
    expect(css).toHaveProperty("@layer base");
    expect(css).toHaveProperty("@utility koten-container");
    expect(css).toHaveProperty('[data-theme="sumi"]');
    expect(css).not.toHaveProperty("@theme inline");
  });

  it("depends on the theme and uses shadcn target placeholders", () => {
    for (const item of components) {
      expect(item.registryDependencies, `${item.name}: theme`).toEqual([
        `${siteUrl}/r/koten-theme.json`,
      ]);

      for (const file of item.files ?? []) {
        expect(file.target, `${item.name}: ${file.target}`).toMatch(/^@(ui|components|lib)\//);
        expect(file.target).not.toContain("styles/");
        expect(file.path).not.toContain("styles/");
      }
    }
  });

  it("rewrites internal imports to aliases and resolves them inside the item", () => {
    for (const item of components) {
      const targets = new Set((item.files ?? []).map((file) => file.target));

      for (const file of item.files ?? []) {
        for (const match of file.content.matchAll(/from "([^"]+)"/g)) {
          const specifier = match[1] as string;

          expect(specifier, `${item.name}: ${file.target} relative import`).not.toMatch(/^\./);
        }

        for (const match of file.content.matchAll(/from "(@\/[^"]+)"/g)) {
          const specifier = match[1] as string;
          const candidates = targetCandidates(specifier);

          expect(candidates.length, `${item.name}: ${specifier}`).toBeGreaterThan(0);
          expect(
            candidates.some((candidate) => targets.has(candidate)),
            `${item.name}: ${file.target} → ${specifier}`,
          ).toBe(true);
        }
      }
    }
  });

  it("classifies primitives and patterns like shadcn", () => {
    expect(items.find((item) => item.name === "button")?.type).toBe("registry:ui");
    expect(items.find((item) => item.name === "detail-drawer")?.type).toBe("registry:block");
  });

  it("declares the npm dependencies and leaves React out", () => {
    const button = items.find((item) => item.name === "button");

    expect(button?.dependencies).toContain("@base-ui/react");
    expect(button?.dependencies).toContain("class-variance-authority");
    expect(button?.dependencies).not.toContain("react");
  });

  it("rewrites the i18n and lib imports to the installed aliases", () => {
    const picker = items.find((item) => item.name === "date-picker");
    const content =
      picker?.files?.find((file) => file.target.endsWith("date-picker.tsx"))?.content ?? "";

    expect(content).toContain('from "@/lib/koten/provider"');
    expect(content).toContain('from "@/lib/koten/cn"');
    expect(content).not.toContain('"../../i18n/');
  });
});
