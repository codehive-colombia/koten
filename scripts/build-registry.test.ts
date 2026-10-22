import { describe, expect, it } from "vitest";
import { buildItems } from "./build-registry";

const siteUrl = "https://koten.example.test";
const items = buildItems({ siteUrl });
const theme = items.find((item) => item.name === "koten-theme");
const i18n = items.find((item) => item.name === "koten-i18n");
const localePacks = items.filter((item) => /^koten-i18n-(en|es|ja)$/.test(item.name));
const components = items.filter(
  (item) => item.name !== "koten-theme" && !item.name.startsWith("koten-i18n"),
);

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
  it("generates one item per primitive and pattern plus theme and i18n", () => {
    expect(items.length).toBeGreaterThanOrEqual(69);
    expect(new Set(items.map((item) => item.name)).size).toBe(items.length);
    expect(theme?.type).toBe("registry:theme");
    expect(theme?.files).toBeUndefined();
    expect(i18n?.type).toBe("registry:lib");
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

  it("ships the i18n runtime with an English base in its own path", () => {
    const targets = (i18n?.files ?? []).map((file) => file.target);
    const dictionaries = i18n?.files?.find((file) => file.target.endsWith("dictionaries.ts"));

    expect(targets).toContain("@lib/koten/i18n/provider.tsx");
    expect(targets).toContain("@lib/koten/i18n/labels.ts");
    expect(targets).toContain("@lib/koten/i18n/format.ts");
    expect(targets).toContain("@lib/koten/i18n/intl.ts");
    expect(targets).toContain("@lib/koten/i18n/messages/en.json");
    expect(targets).not.toContain("@lib/koten/i18n/messages/es.json");
    expect(dictionaries?.content).toContain('from "./messages/en.json"');
    expect(dictionaries?.content).not.toContain("messages/es.json");
  });

  it("ships each locale as an optional JSON pack", () => {
    expect(localePacks.map((item) => item.name).sort()).toEqual([
      "koten-i18n-en",
      "koten-i18n-es",
      "koten-i18n-ja",
    ]);

    for (const item of localePacks) {
      expect(item.type).toBe("registry:file");
      expect(item.registryDependencies).toEqual([`${siteUrl}/r/koten-i18n.json`]);
      expect(item.files?.[0]?.type).toBe("registry:file");
      expect(item.files?.[0]?.target).toMatch(/^@lib\/koten\/i18n\/messages\/(en|es|ja)\.json$/);
    }
  });

  it("resolves the i18n item imports inside its own path", () => {
    const targets = new Set((i18n?.files ?? []).map((file) => file.target));

    for (const file of i18n?.files ?? []) {
      for (const match of file.content.matchAll(/from "(@\/[^"]+)"/g)) {
        const candidates = targetCandidates(match[1] as string);

        expect(
          candidates.some((candidate) => targets.has(candidate)),
          `${file.target} → ${match[1]}`,
        ).toBe(true);
      }

      for (const match of file.content.matchAll(/from "(\.\/[^"]+\.json)"/g)) {
        const relative = (match[1] as string).replace("./", "");

        expect(
          [...targets].some((target) => target.endsWith(relative)),
          `${file.target} → ${match[1]}`,
        ).toBe(true);
      }
    }
  });

  it("depends on the theme and i18n and uses shadcn target placeholders", () => {
    for (const item of components) {
      expect(item.registryDependencies, `${item.name}: dependencies`).toEqual([
        `${siteUrl}/r/koten-theme.json`,
        `${siteUrl}/r/koten-i18n.json`,
      ]);

      for (const file of item.files ?? []) {
        expect(file.target, `${item.name}: ${file.target}`).toMatch(/^@(ui|components|lib)\//);
        expect(file.target).not.toContain("styles/");
        expect(file.path).not.toContain("styles/");
      }
    }
  });

  it("rewrites internal imports to aliases and resolves them inside the item", () => {
    const sharedTargets = new Set(
      [...(i18n?.files ?? []), ...localePacks.flatMap((item) => item.files ?? [])].map(
        (file) => file.target,
      ),
    );

    for (const item of components) {
      const targets = new Set((item.files ?? []).map((file) => file.target));

      for (const file of item.files ?? []) {
        for (const match of file.content.matchAll(/from "([^"]+)"/g)) {
          const specifier = match[1] as string;

          if (specifier.endsWith(".json")) continue;

          expect(specifier, `${item.name}: ${file.target} relative import`).not.toMatch(/^\./);
        }

        for (const match of file.content.matchAll(/from "(@\/[^"]+)"/g)) {
          const specifier = match[1] as string;
          const candidates = targetCandidates(specifier);

          expect(candidates.length, `${item.name}: ${specifier}`).toBeGreaterThan(0);
          expect(
            candidates.some((candidate) => targets.has(candidate) || sharedTargets.has(candidate)),
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

    expect(content).toContain('from "@/lib/koten/i18n/provider"');
    expect(content).toContain('from "@/lib/koten/cn"');
    expect(content).not.toContain('"../../../i18n/');
  });
});
