import { describe, expect, it } from "vitest";
import { allBlockDocs, allPrimitiveDocs } from "../apps/catalog/src/data/docs/all";
import {
  type AgentPage,
  agentPages,
  buildAgentArtifacts,
  checkAgentCoverage,
  injectAgentPage,
  markdownPathFor,
  renderAgentBody,
  renderAgentMarkdown,
  routeFile,
} from "./build-agent-pages";
import { rootPath } from "./build-ai-docs";

const siteUrl = "https://koten.example.test";
const pages = agentPages(siteUrl);
const shell = [
  "<!doctype html>",
  '<html lang="es">',
  "  <head>",
  "    <title>Koten UI · Catálogo</title>",
  "  </head>",
  "  <body>",
  '    <div id="root"></div>',
  "  </body>",
  "</html>",
  "",
].join("\n");

function page(path: string): AgentPage {
  const found = pages.find((item) => item.path === path);

  if (!found) {
    throw new Error(`Missing agent page for ${path}`);
  }

  return found;
}

describe("agent pages", () => {
  it("covers every component and block route", () => {
    for (const doc of allPrimitiveDocs) {
      expect(page(`/components/${doc.slug}`).h1).toBe(doc.name);
    }

    for (const doc of allBlockDocs) {
      expect(page(`/blocks/${doc.category}/${doc.slug}`).h1).toBe(doc.name);
    }
  });

  it("covers the entry routes the catalog links to", () => {
    const paths = pages.map((item) => item.path);

    for (const path of [
      "/",
      "/start",
      "/ai",
      "/components",
      "/blocks",
      "/tokens",
      "/tokens/color",
      "/tokens/typography",
      "/tokens/spacing",
      "/tokens/shape",
      "/tokens/density",
      "/tokens/themes",
      "/tokens/format",
      "/theme",
    ]) {
      expect(paths).toContain(path);
    }
  });

  it("puts the page content inside the shell instead of an empty root", () => {
    const html = injectAgentPage(shell, page("/components/button"), siteUrl);

    expect(html).toContain("<title>Button · Koten UI</title>");
    expect(html).toContain('<meta name="description"');
    expect(html).toContain(`<link rel="canonical" href="${siteUrl}/components/button" />`);
    expect(html).toContain(
      `<link rel="alternate" type="text/markdown" href="/md/components/button.md"`,
    );
    expect(html).toContain('<link rel="llms-txt" href="/llms.txt" />');
    expect(html).toContain("<h1>Button</h1>");
    expect(html).toContain(`npx shadcn@latest add ${siteUrl}/r/button.json`);
    expect(html).toContain("<code>koten-theme</code>");
    expect(html).toContain('href="/md/components/button.md"');
    expect(html).toContain('href="/llms.txt"');
    expect(html).not.toContain('<div id="root"></div>');
  });

  it("fails loudly when the shell changes shape", () => {
    expect(() =>
      injectAgentPage("<html><head></head><body></body></html>", page("/"), siteUrl),
    ).toThrow(/no <title>/);
    expect(() =>
      injectAgentPage(
        "<html><head><title>x</title></head><body></body></html>",
        page("/"),
        siteUrl,
      ),
    ).toThrow(/empty #root/);
  });

  it("escapes content instead of injecting markup", () => {
    const fake: AgentPage = {
      path: "/components/fake",
      title: "Fake",
      kicker: "Component",
      h1: 'Fake <script>alert("x")</script>',
      summary: "A & B",
      markdownPath: "md/components/fake.md",
      sharedMarkdown: true,
      sections: [],
    };
    const body = renderAgentBody(fake);

    expect(body).not.toContain("<script>");
    expect(body).toContain("&lt;script&gt;");
    expect(body).toContain("A &amp; B");
  });

  it("writes one HTML document per route plus the Markdown twins of the entry pages", () => {
    const artifacts = buildAgentArtifacts({ pages, siteUrl, template: shell });
    const paths = artifacts.map((artifact) => artifact.path);

    expect(paths).toContain("index.html");
    expect(paths).toContain("components/button.html");
    expect(paths).toContain("blocks/erp/app-shell.html");
    expect(paths).toContain("md/index.md");
    expect(paths).toContain("md/start.md");
    expect(paths).toContain("md/theme.md");
    expect(paths).toContain("robots.txt");
    expect(paths).toContain("sitemap.xml");

    // The documentation build owns the component pages; do not overwrite them.
    expect(paths).not.toContain("md/components/button.md");
    expect(paths).not.toContain("md/blocks/erp/app-shell.md");
  });

  it("renders an agent page as Markdown with frontmatter and links", () => {
    const markdown = renderAgentMarkdown(page("/start"), siteUrl);

    expect(markdown).toContain('title: "Getting started"');
    expect(markdown).toContain(`docs: "${siteUrl}/start"`);
    expect(markdown).toContain("## Commands");
    expect(markdown).toContain(`npx shadcn@latest add ${siteUrl}/r/koten-theme.json`);
    expect(markdown).toContain(`[Agent index (llms.txt)](${siteUrl}/llms.txt)`);
    expect(markdown).not.toContain("[object Object]");
  });

  it("publishes robots and a sitemap with every route", () => {
    const artifacts = buildAgentArtifacts({ pages, siteUrl, template: shell });
    const robots = artifacts.find((artifact) => artifact.path === "robots.txt")?.content ?? "";
    const sitemap = artifacts.find((artifact) => artifact.path === "sitemap.xml")?.content ?? "";

    expect(robots).toContain("User-agent: *");
    expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
    expect(robots).toContain(`${siteUrl}/llms.txt`);
    expect(sitemap).toContain(`<loc>${siteUrl}/components/button</loc>`);
    expect(sitemap).toContain(`<loc>${siteUrl}/blocks/erp/timeline</loc>`);
  });

  it("maps routes to files and Markdown twins", () => {
    expect(routeFile("/")).toBe("index.html");
    expect(routeFile("/components/button")).toBe("components/button.html");
    expect(markdownPathFor("/")).toBe("md/index.md");
    expect(markdownPathFor("/blocks/erp/timeline")).toBe("md/blocks/erp/timeline.md");
  });

  it("keeps the repository routes covered", () => {
    expect(checkAgentCoverage(rootPath)).toEqual([]);
  });
});
