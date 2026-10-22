import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { allBlockDocs, allPrimitiveDocs } from "../apps/catalog/src/data/docs/all";
import {
  buildSiteDocs,
  checkTrackedDocs,
  normalizeSiteUrl,
  renderDoc,
  renderInventory,
  renderLlmsTxt,
  rootPath,
  validateSkills,
} from "./build-ai-docs";

const siteUrl = "https://koten.example.test";
const options = { siteUrl, root: rootPath };

describe("agent documentation", () => {
  it("generates one Markdown page per primitive and block plus the index files", () => {
    const docs = buildSiteDocs(options);
    const paths = docs.map((doc) => doc.path);

    expect(paths).toContain("llms.txt");
    expect(paths).toContain("llms-full.txt");
    expect(paths).toContain("md/guides/design-system.md");
    expect(paths).toContain("md/guides/recipes.md");
    expect(paths.filter((path) => path.startsWith("md/components/"))).toHaveLength(
      allPrimitiveDocs.length,
    );
    expect(paths.filter((path) => path.startsWith("md/blocks/"))).toHaveLength(allBlockDocs.length);
    expect(paths).toContain("md/blocks/erp/app-shell.md");
  });

  it("writes an agent-readable page with install, examples, props and a11y", () => {
    const button = allPrimitiveDocs.find((doc) => doc.slug === "button");

    if (!button) throw new Error("Button doc is missing");

    const markdown = renderDoc(button, siteUrl);

    expect(markdown).toContain('title: "Button"');
    expect(markdown).toContain(`install: "npx shadcn@latest add ${siteUrl}/r/button.json"`);
    expect(markdown).toContain("## Install");
    expect(markdown).toContain("## Examples");
    expect(markdown).toContain("## Props");
    expect(markdown).toContain("## Accessibility");
    expect(markdown).toContain("```tsx");
    expect(markdown).not.toContain("undefined");
    expect(markdown).not.toContain("[object Object]");
  });

  it("documents blocks with their category and registry item", () => {
    const appShell = allBlockDocs.find((doc) => doc.slug === "app-shell");

    if (!appShell) throw new Error("AppShell doc is missing");

    const markdown = renderDoc(appShell, siteUrl);

    expect(markdown).toContain("kind: block");
    expect(markdown).toContain("category: erp");
    expect(markdown).toContain(`/r/app-shell.json`);
  });

  it("indexes every component, block and skill in llms.txt", () => {
    const index = renderLlmsTxt(siteUrl);

    expect(index).toContain("# Koten UI");
    expect(index).toContain(`Components (${allPrimitiveDocs.length})`);
    expect(index).toContain(`Blocks (${allBlockDocs.length})`);
    expect(index).toContain(`${siteUrl}/md/components/button.md`);
    expect(index).toContain(`${siteUrl}/md/blocks/storefront/product-card.md`);
    expect(index).toContain("npx skills add codehive-colombia/koten --skill koten-ui");
    expect(index).toContain("koten-design-system");
    expect(index).toContain("koten-design-language");
  });

  it("generates the shared inventory with registry names for FormRow and Calendar", () => {
    const inventory = renderInventory(siteUrl);

    expect(inventory).toContain("| FormRow | C-015 | `field` |");
    expect(inventory).toContain("| Calendar | C-063 | `date-picker` |");
    expect(inventory).toContain(`| Button | C-001 | \`button\` | ${siteUrl}/components/button |`);
  });

  it("keeps the committed index and skill inventory in sync", () => {
    expect(checkTrackedDocs(rootPath, normalizeSiteUrl(undefined))).toEqual([]);
  });

  it("validates the committed skills against the Agent Skills spec", () => {
    expect(validateSkills(rootPath)).toEqual([]);
  });

  it("rejects a skill whose name does not match its directory", () => {
    const root = mkdtempSync(join(tmpdir(), "koten-skills-"));
    const directory = join(root, "skills", "wrong-name");
    mkdirSync(directory, { recursive: true });
    writeFileSync(
      join(directory, "SKILL.md"),
      ["---", "name: another-name", "description: A broken skill.", "---", "", "# Broken", ""].join(
        "\n",
      ),
    );

    expect(validateSkills(root).join("\n")).toContain("name must match the directory");
  });

  it("rejects a skill that references a token the theme does not declare", () => {
    const root = mkdtempSync(join(tmpdir(), "koten-skills-tokens-"));
    const directory = join(root, "skills", "invented-token");
    const styles = join(root, "packages/ui/src/styles");
    mkdirSync(directory, { recursive: true });
    mkdirSync(styles, { recursive: true });
    writeFileSync(join(styles, "tokens.css"), ":root { --koten-ok: #000000; }\n");
    writeFileSync(join(styles, "globals.css"), "@theme { --color-ok: var(--koten-ok); }\n");
    writeFileSync(
      join(directory, "SKILL.md"),
      [
        "---",
        "name: invented-token",
        "description: A skill that uses a role nobody declared.",
        "---",
        "",
        "# Invented",
        "",
        "Use `var(--koten-ok)` for the frame and `var(--koten-invented)` for the fill.",
        "Keep the frame at one pixel and verify the contrast before shipping.",
        "",
      ].join("\n"),
    );

    expect(validateSkills(root).join("\n")).toContain("unknown token --koten-invented");
  });
});
