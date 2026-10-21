import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildItems } from "./build-registry";

const items = buildItems();

describe("registry shadcn", () => {
  it("genera un item por primitiva y patrón, sin nombres duplicados", () => {
    expect(items.length).toBeGreaterThanOrEqual(60);
    expect(new Set(items.map((item) => item.name)).size).toBe(items.length);
  });

  it("cada item es autocontenido y sus imports resuelven dentro del item", () => {
    for (const item of items) {
      const targets = new Set(item.files.map((file) => file.target));

      expect(targets.has("styles/koten.css"), `${item.name}: tokens`).toBe(true);
      expect(targets.has("lib/koten/cn.ts"), `${item.name}: cn`).toBe(true);
      expect(targets.has("lib/koten/provider.tsx"), `${item.name}: provider`).toBe(true);

      for (const file of item.files) {
        for (const match of file.content.matchAll(/from "([^"]+)"/g)) {
          const specifier = match[1] as string;

          if (!specifier.startsWith(".")) continue;

          const base = join(dirname(file.target), specifier).split("\\").join("/");
          const resolved = [`${base}.ts`, `${base}.tsx`, `${base}/index.ts`].some((candidate) =>
            targets.has(candidate),
          );

          expect(resolved, `${item.name}: ${file.target} → ${specifier}`).toBe(true);
        }
      }
    }
  });

  it("declara las dependencias npm y deja React fuera", () => {
    const button = items.find((item) => item.name === "button");

    expect(button?.dependencies).toContain("@base-ui/react");
    expect(button?.dependencies).toContain("class-variance-authority");
    expect(button?.dependencies).not.toContain("react");
  });

  it("reescribe los imports de i18n y lib al layout instalado", () => {
    const picker = items.find((item) => item.name === "date-picker");
    const content =
      picker?.files.find((file) => file.target.endsWith("date-picker.tsx"))?.content ?? "";

    expect(content).toContain('from "../../lib/koten/provider"');
    expect(content).toContain('from "../../lib/koten/cn"');
    expect(content).not.toContain('"../../i18n/');
  });
});
