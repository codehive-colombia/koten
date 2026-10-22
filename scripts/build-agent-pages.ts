/**
 * Agent entry pages (D-058).
 *
 * The catalog is a React SPA: every URL returns the same empty shell, so an
 * agent that is given the address reads nothing and falls back to a headless
 * browser or gives up. This build step writes one static HTML document per
 * catalog route with the page's title, summary, install command and links
 * already in the markup, plus a Markdown twin for every route.
 *
 * React replaces the fallback on mount, so people still see the app: the
 * content lives inside `#root` and the fallback is plain markup, not a second
 * renderer. Nothing is cloaked — the same bytes go to browsers and to agents.
 *
 * Usage:
 *   `bun scripts/build-agent-pages.ts`          write into `apps/catalog/dist`
 *   `bun scripts/build-agent-pages.ts --check`  fail when a route has no page
 *
 * Runs after `vite build`; the catalog `build` script wires it.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { allBlockDocs, allPrimitiveDocs } from "../apps/catalog/src/data/docs/all";
import { findRoot, normalizeSiteUrl } from "./build-ai-docs";

export type AgentLink = {
  label: string;
  href: string;
};

export type AgentSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  links?: readonly AgentLink[];
  code?: string;
};

export type AgentPage = {
  /** Catalog route, e.g. `/components/button`. */
  path: string;
  /** Document title. */
  title: string;
  /** Small line above the heading, e.g. `Component · C-003`. */
  kicker: string;
  h1: string;
  summary: string;
  /** Markdown twin, relative to the site root. */
  markdownPath: string;
  /** True when `build-ai-docs` already writes that Markdown file. */
  sharedMarkdown: boolean;
  sections: readonly AgentSection[];
};

export type AgentArtifact = {
  /** Path relative to the catalog `dist` directory. */
  path: string;
  content: string;
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inline code in prose becomes `<code>`; everything else stays text. */
const inline = (value: string): string =>
  escapeHtml(value).replace(/`([^`]+)`/g, "<code>$1</code>");

/** Plain text for attributes that cannot hold markup. */
const plain = (value: string): string => value.replace(/`/g, "");

const yaml = (value: string): string => JSON.stringify(value);

/** Markdown twin of a catalog route: `/blocks/erp/timeline` -> `md/blocks/erp/timeline.md`. */
export function markdownPathFor(path: string): string {
  return path === "/" ? "md/index.md" : `md${path}.md`;
}

const installCommand = (siteUrl: string, item: string): string =>
  `npx shadcn@latest add ${siteUrl}/r/${item}.json`;

const readLinks = (page: Pick<AgentPage, "markdownPath">): AgentLink[] => [
  { label: "Markdown page", href: `/${page.markdownPath}` },
  { label: "Agent index (llms.txt)", href: "/llms.txt" },
  { label: "Full documentation (llms-full.txt)", href: "/llms-full.txt" },
];

const siteSummary =
  "Koten UI is a copy-in React component system for dense, editorial interfaces inspired by classical Japanese web design. It ships 46 primitives, 20 blocks, four themes, three densities and i18n labels for any BCP 47 locale through a shadcn registry. It is not an npm package: components are copied into the project with the shadcn CLI, so the source stays editable.";

export const siteDescription = siteSummary;

/** Routes that are not generated from `apps/catalog/src/data/docs`. */
function entryPages(siteUrl: string): AgentPage[] {
  const components: AgentLink[] = allPrimitiveDocs.map((doc) => ({
    label: doc.name,
    href: `/md/components/${doc.slug}.md`,
  }));
  const blocks: AgentLink[] = allBlockDocs.map((doc) => ({
    label: `${doc.name} · ${doc.category}`,
    href: `/md/blocks/${doc.category}/${doc.slug}.md`,
  }));
  const startCode = [
    `# 1 · tokens, themes and density`,
    installCommand(siteUrl, "koten-theme"),
    ``,
    `# 2 · i18n runtime and English base`,
    installCommand(siteUrl, "koten-i18n"),
    ``,
    `# 3 · a component`,
    installCommand(siteUrl, "button"),
  ].join("\n");

  const page = (
    path: string,
    title: string,
    kicker: string,
    h1: string,
    summary: string,
    sections: AgentSection[],
  ): AgentPage => ({
    path,
    title,
    kicker,
    h1,
    summary,
    markdownPath: markdownPathFor(path),
    sharedMarkdown: false,
    sections,
  });

  return [
    page("/", "Koten UI · copy-in React component system", "Koten UI", "Koten UI", siteSummary, [
      {
        heading: "Start",
        code: installCommand(siteUrl, "koten-theme"),
        links: [
          { label: "Getting started", href: "/start" },
          { label: "AI and agents", href: "/ai" },
          { label: "Design system", href: "/md/guides/design-system.md" },
          { label: "Recipes", href: "/md/guides/recipes.md" },
          { label: "Agent index (llms.txt)", href: "/llms.txt" },
          { label: "Full documentation (llms-full.txt)", href: "/llms-full.txt" },
        ],
      },
      { heading: `Components (${allPrimitiveDocs.length})`, links: components },
      { heading: `Blocks (${allBlockDocs.length})`, links: blocks },
    ]),
    page(
      "/start",
      "Getting started · Koten UI",
      "Guide",
      "Getting started",
      "Install `koten-theme` and `koten-i18n`, copy the primitives you need with the shadcn CLI and wrap the app in `KotenProvider`. Works with any project that already uses shadcn.",
      [
        {
          heading: "Commands",
          paragraphs: ["Commands accept `npx` (Node) or `bunx` (Bun)."],
          code: startCode,
        },
        {
          heading: "Rules",
          bullets: [
            "Install `koten-theme` before any component: it writes tokens, themes and density into your `tailwind.css`.",
            "Components depend on the `koten-i18n` runtime; add `koten-i18n-es` or `koten-i18n-ja` only for those dictionaries.",
            "Wrap the app in `KotenProvider` with the product's BCP 47 locale; English is the base.",
            "Compose with `render`; never use `asChild`.",
            "Do not add Japanese text or decoration unless the user asks for it (R-031).",
          ],
        },
        { heading: "Read next", links: readLinks({ markdownPath: markdownPathFor("/start") }) },
      ],
    ),
    page(
      "/ai",
      "AI and agents · Koten UI",
      "Guide",
      "AI and agents",
      "Koten UI exposes the system to agents at three levels: a machine-readable index with one Markdown page per piece, an Agent Skill to consume the components, and skills to extend or author new pieces.",
      [
        {
          heading: "Access levels",
          bullets: [
            "Read: `/llms.txt` (index), `/llms-full.txt` (whole corpus) and `/md/**` (one page per piece).",
            "Consume: the `koten-ui` skill picks, installs and composes components.",
            "Extend: `koten-design-system` adds pieces inside the repository; `koten-design-language` authors a piece in any project that uses Koten.",
            "Install with `npx skills add codehive-colombia/koten --skill koten-ui`.",
          ],
        },
        {
          heading: "Give this address to an agent",
          paragraphs: [
            "Paste the llms.txt URL, not the catalog homepage: an agent that only receives the root address still has to discover the index.",
            "Every catalog page also has a Markdown twin: append `.md` to any URL or send `Accept: text/markdown`.",
          ],
          code: `curl ${siteUrl}/llms.txt\ncurl ${siteUrl}/md/components/button.md`,
        },
        { heading: "Read next", links: readLinks({ markdownPath: markdownPathFor("/ai") }) },
      ],
    ),
    page(
      "/components",
      "Components · Koten UI",
      "Index",
      "Components",
      `${allPrimitiveDocs.length} primitives, each with install command, props, examples and accessibility notes.`,
      [{ heading: `All components (${allPrimitiveDocs.length})`, links: components }],
    ),
    page(
      "/blocks",
      "Blocks · Koten UI",
      "Index",
      "Blocks",
      `${allBlockDocs.length} composed blocks for storefront and back office, each with install command, anatomy and accessibility notes.`,
      [{ heading: `All blocks (${allBlockDocs.length})`, links: blocks }],
    ),
    page(
      "/tokens",
      "Foundations · Koten UI",
      "Foundations",
      "Foundations",
      "Colour roles, typography, spacing, shape, density, themes and language formatting: the tokens behind every component.",
      [
        {
          heading: "Sections",
          links: [
            { label: "Colour", href: "/tokens/color" },
            { label: "Typography", href: "/tokens/typography" },
            { label: "Spacing", href: "/tokens/spacing" },
            { label: "Shape and motion", href: "/tokens/shape" },
            { label: "Density", href: "/tokens/density" },
            { label: "Themes", href: "/tokens/themes" },
            { label: "Language and format", href: "/tokens/format" },
            { label: "Design system (Markdown)", href: "/md/guides/design-system.md" },
          ],
        },
      ],
    ),
    page(
      "/tokens/color",
      "Colour · Koten UI",
      "Foundations",
      "Colour",
      "Colour is semantic: roles name the job (surface, ink, muted, accent, states) and each theme resolves the palette. Every text and background pair meets AA.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/color") }),
        },
      ],
    ),
    page(
      "/tokens/typography",
      "Typography · Koten UI",
      "Foundations",
      "Typography",
      "System font stacks, a 12 px floor for body text and a compact scale; the serif register is reserved for headings and editorial accents.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/typography") }),
        },
      ],
    ),
    page(
      "/tokens/spacing",
      "Spacing · Koten UI",
      "Foundations",
      "Spacing",
      "One gap token drives component padding and layout rhythm; density scales it instead of introducing new values.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/spacing") }),
        },
      ],
    ),
    page(
      "/tokens/shape",
      "Shape and motion · Koten UI",
      "Foundations",
      "Shape and motion",
      "1 px frames, 2–3 px radii and shadows reserved for overlays; motion is short and state-driven.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/shape") }),
        },
      ],
    ),
    page(
      "/tokens/density",
      "Density · Koten UI",
      "Foundations",
      "Density",
      "Three densities (compact, default, comfortable) change padding, not type size; the choice travels in `data-density`.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/density") }),
        },
      ],
    ),
    page(
      "/tokens/themes",
      "Themes · Koten UI",
      "Foundations",
      "Themes",
      "Four themes — Chirashi (commerce), Daichō (back office), Kanso (reading) and Sumi (dark) — selected with `data-theme`.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/themes") }),
        },
      ],
    ),
    page(
      "/tokens/format",
      "Language and format · Koten UI",
      "Foundations",
      "Language and format",
      "Any BCP 47 locale through `KotenProvider`, JSON dictionaries per language and `Intl` formatters for numbers, dates and currency.",
      [
        {
          heading: "Read next",
          links: readLinks({ markdownPath: markdownPathFor("/tokens/format") }),
        },
      ],
    ),
    page(
      "/theme",
      "Theme designer · Koten UI",
      "Foundations",
      "Theme designer",
      "Design a theme with five curated parameters — register, pigment, paper, radius and density — validate 11 AA pairs and copy the token overlay. Export is blocked while a pair fails.",
      [{ heading: "Read next", links: readLinks({ markdownPath: markdownPathFor("/theme") }) }],
    ),
  ];
}

function componentPages(siteUrl: string): AgentPage[] {
  return allPrimitiveDocs.map((doc) => {
    const markdownPath = `md/components/${doc.slug}.md`;
    const requirements = doc.requirements ?? [];
    const sections: AgentSection[] = [
      {
        heading: "Install",
        paragraphs: ["Install `koten-theme` first when the project has no Koten tokens yet."],
        code: installCommand(siteUrl, doc.registrySlug ?? doc.slug),
      },
    ];

    if (requirements.length > 0) {
      sections.push({
        heading: "Requirements",
        bullets: requirements.map((item) => `${item.label.en}: ${item.detail.en}`),
      });
    }

    sections.push(
      { heading: "Accessibility", bullets: doc.a11y.en },
      { heading: "Read the whole page", links: readLinks({ markdownPath }) },
    );

    return {
      path: `/components/${doc.slug}`,
      title: `${doc.name} · Koten UI`,
      kicker: `Component · ${doc.id}`,
      h1: doc.name,
      summary: doc.description.en,
      markdownPath,
      sharedMarkdown: true,
      sections,
    };
  });
}

function blockPages(siteUrl: string): AgentPage[] {
  return allBlockDocs.map((doc) => {
    const markdownPath = `md/blocks/${doc.category}/${doc.slug}.md`;
    const sections: AgentSection[] = [
      {
        heading: "Install",
        paragraphs: ["Blocks compose Koten primitives; install `koten-theme` first."],
        code: installCommand(siteUrl, doc.registrySlug ?? doc.slug),
      },
    ];

    if (doc.requirements && doc.requirements.length > 0) {
      sections.push({
        heading: "Requirements",
        bullets: doc.requirements.map((item) => `${item.label.en}: ${item.detail.en}`),
      });
    }

    sections.push(
      {
        heading: "Anatomy",
        paragraphs: [
          "This block composes Koten primitives. Read the source files before changing it.",
        ],
        bullets: doc.files.map((file) => file),
      },
      { heading: "Accessibility", bullets: doc.a11y.en },
      { heading: "Read the whole page", links: readLinks({ markdownPath }) },
    );

    return {
      path: `/blocks/${doc.category}/${doc.slug}`,
      title: `${doc.name} · Koten UI`,
      kicker: `Block · ${doc.id} · ${doc.category}`,
      h1: doc.name,
      summary: doc.description.en,
      markdownPath,
      sharedMarkdown: true,
      sections,
    };
  });
}

/** Every catalog route that gets a static agent page. */
export function agentPages(siteUrl: string): AgentPage[] {
  return [...entryPages(siteUrl), ...componentPages(siteUrl), ...blockPages(siteUrl)];
}

const agentStyles = `[data-agent-fallback]{max-width:46rem;margin:0 auto;padding:clamp(2rem,6vw,4rem) 1.25rem;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;font-size:15px;line-height:1.65;color:#1c1917;background:#faf7f2;-webkit-font-smoothing:antialiased}[data-agent-fallback] .kicker{margin:0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#78716c}[data-agent-fallback] h1{margin:.25rem 0 .75rem;font-family:ui-serif,Georgia,"Times New Roman",serif;font-size:2rem;line-height:1.15;font-weight:600}[data-agent-fallback] h2{margin:2rem 0 .5rem;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#57534e;border-top:1px solid #ddd6c9;padding-top:.75rem}[data-agent-fallback] p{margin:.5rem 0;max-width:40rem}[data-agent-fallback] ul{margin:.5rem 0;padding-left:1.1rem}[data-agent-fallback] li{margin:.2rem 0}[data-agent-fallback] a{color:#1c1917;text-underline-offset:.2em}[data-agent-fallback] code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.85em}[data-agent-fallback] pre{margin:.5rem 0;overflow-x:auto;border:1px solid #ddd6c9;background:#f1ece3;padding:.75rem 1rem}[data-agent-fallback] pre code{font-size:12px;line-height:1.6}[data-agent-fallback] .summary{font-size:16px;max-width:38rem}[data-agent-fallback] .footer{margin-top:2rem;border-top:1px solid #ddd6c9;padding-top:.75rem;font-size:12px;color:#57534e}`;

/** Markup injected inside `#root`; React replaces it on mount. */
export function renderAgentBody(page: AgentPage): string {
  const lines = [
    `<main data-agent-fallback lang="en">`,
    `<p class="kicker">${escapeHtml(page.kicker)}</p>`,
    `<h1>${escapeHtml(page.h1)}</h1>`,
    `<p class="summary">${inline(page.summary)}</p>`,
  ];

  for (const section of page.sections) {
    lines.push(`<h2>${escapeHtml(section.heading)}</h2>`);

    for (const paragraph of section.paragraphs ?? []) {
      lines.push(`<p>${inline(paragraph)}</p>`);
    }
    if (section.code) {
      lines.push(`<pre><code>${escapeHtml(section.code)}</code></pre>`);
    }
    if (section.bullets && section.bullets.length > 0) {
      lines.push(`<ul>${section.bullets.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
    }
    if (section.links && section.links.length > 0) {
      lines.push(
        `<ul>${section.links
          .map(
            (link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`,
          )
          .join("")}</ul>`,
      );
    }
  }

  lines.push(
    `<p class="footer">Koten UI · <a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a> · <a href="/${page.markdownPath}">Markdown</a></p>`,
    `</main>`,
  );

  return lines.join("");
}

/** Markdown twin for routes the documentation build does not cover. */
export function renderAgentMarkdown(page: AgentPage, siteUrl: string): string {
  const lines = [
    "---",
    `title: ${yaml(page.h1)}`,
    `description: ${yaml(page.summary)}`,
    `docs: ${yaml(`${siteUrl}${page.path}`)}`,
    "language: en",
    "---",
    "",
    `# ${page.h1}`,
    "",
    `> ${page.summary}`,
    "",
  ];

  for (const section of page.sections) {
    lines.push(`## ${section.heading}`, "");

    for (const paragraph of section.paragraphs ?? []) {
      lines.push(paragraph, "");
    }
    if (section.code) {
      lines.push("```bash", section.code, "```", "");
    }
    for (const item of section.bullets ?? []) {
      lines.push(`- ${item}`);
    }
    if (section.bullets && section.bullets.length > 0) {
      lines.push("");
    }
    for (const link of section.links ?? []) {
      lines.push(`- [${link.label}](${siteUrl}${link.href})`);
    }
    if (section.links && section.links.length > 0) {
      lines.push("");
    }
  }

  return lines.join("\n");
}

/** Reads the Vite shell and puts the page inside it. */
export function injectAgentPage(template: string, page: AgentPage, siteUrl: string): string {
  const head = [
    `<meta name="description" content="${escapeHtml(plain(page.summary))}" />`,
    `<link rel="canonical" href="${escapeHtml(`${siteUrl}${page.path}`)}" />`,
    `<link rel="llms-txt" href="/llms.txt" />`,
    `<link rel="alternate" type="text/markdown" href="/${page.markdownPath}" title="Markdown" />`,
    `<style>${agentStyles}</style>`,
  ].join("\n    ");

  if (!/<title>[\s\S]*?<\/title>/.test(template)) {
    throw new Error("Agent pages: the catalog shell has no <title>");
  }
  if (!template.includes("</head>")) {
    throw new Error("Agent pages: the catalog shell has no </head>");
  }
  if (!/<div id="root">\s*<\/div>/.test(template)) {
    throw new Error("Agent pages: the catalog shell has no empty #root placeholder");
  }

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace("</head>", `  ${head}\n  </head>`)
    .replace(/<div id="root">\s*<\/div>/, `<div id="root">${renderAgentBody(page)}</div>`);
}

/** File that nginx serves for a route: `/components/button` -> `components/button.html`. */
export function routeFile(path: string): string {
  return path === "/" ? "index.html" : `${path.replace(/^\//, "")}.html`;
}

function robotsTxt(siteUrl: string): string {
  return [
    "# Koten UI",
    "User-agent: *",
    "Allow: /",
    "",
    "# This site ships a Markdown twin for every page.",
    `#   Index:      ${siteUrl}/llms.txt`,
    `#   Full docs:  ${siteUrl}/llms-full.txt`,
    "#   Any page:   append .md to the URL, or send Accept: text/markdown",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

function sitemapXml(pages: readonly AgentPage[], siteUrl: string): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map((page) => `  <url><loc>${siteUrl}${page.path}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
}

export function buildAgentArtifacts({
  pages,
  siteUrl,
  template,
}: {
  pages: readonly AgentPage[];
  siteUrl: string;
  template: string;
}): AgentArtifact[] {
  const artifacts: AgentArtifact[] = pages.map((page) => ({
    path: routeFile(page.path),
    content: injectAgentPage(template, page, siteUrl),
  }));

  for (const page of pages) {
    if (!page.sharedMarkdown) {
      artifacts.push({ path: page.markdownPath, content: renderAgentMarkdown(page, siteUrl) });
    }
  }

  artifacts.push({ path: "robots.txt", content: robotsTxt(siteUrl) });
  artifacts.push({ path: "sitemap.xml", content: sitemapXml(pages, siteUrl) });

  return artifacts;
}

/**
 * Writes the agent layer into the built catalog. The shell must come from
 * `vite build` because it carries the hashed asset URLs.
 */
export function writeAgentPages(root: string, siteUrl: string): string[] {
  const dist = join(root, "apps/catalog/dist");
  const template = join(dist, "index.html");

  if (!existsSync(template)) {
    throw new Error(`Agent pages: ${template} does not exist. Run \`vite build\` first.`);
  }

  const shell = readFileSync(template, "utf8");
  const pages = agentPages(siteUrl);
  const artifacts = buildAgentArtifacts({ pages, siteUrl, template: shell });

  for (const artifact of artifacts) {
    const path = join(dist, artifact.path);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, artifact.content, "utf8");
  }

  return artifacts.map((artifact) => `apps/catalog/dist/${artifact.path}`);
}

/**
 * Route coverage: a new catalog route without an agent page would silently go
 * back to the empty shell, so the check fails instead.
 */
export function checkAgentCoverage(root: string): string[] {
  const pages = agentPages(normalizeSiteUrl(undefined));
  const paths = new Set(pages.map((page) => page.path));
  const markdowns = new Map<string, string>();
  const failures: string[] = [];

  for (const page of pages) {
    const other = markdowns.get(page.markdownPath);

    if (other) {
      failures.push(`${page.path}: Markdown twin ${page.markdownPath} is also used by ${other}`);
    }
    markdowns.set(page.markdownPath, page.path);
  }

  const appPath = join(root, "apps/catalog/src/App.tsx");

  if (!existsSync(appPath)) {
    return [...failures, "apps/catalog/src/App.tsx is missing"];
  }

  const source = readFileSync(appPath, "utf8");

  for (const block of source.split("<Route").slice(1)) {
    const body = block.split("/>")[0] ?? "";
    const path = /path="([^"]+)"/.exec(body)?.[1];

    if (!path || path.includes(":") || path.includes("*")) continue;
    if (body.includes("Navigate")) continue;
    if (!paths.has(path)) {
      failures.push(`${path}: route has no agent page (see scripts/build-agent-pages.ts)`);
    }
  }

  return failures;
}

function main(): void {
  const root = findRoot();
  const siteUrl = normalizeSiteUrl(process.env.KOTEN_SITE_URL);

  if (process.argv.includes("--check")) {
    const failures = checkAgentCoverage(root);

    if (failures.length > 0) {
      console.error("Agent pages check failed:\n");
      for (const failure of failures) console.error(`- ${failure}`);
      process.exit(1);
    }

    console.log(`Agent pages: every catalog route has a page (${agentPages(siteUrl).length}).`);
    return;
  }

  const files = writeAgentPages(root, siteUrl);

  console.log(`Agent pages: ${files.length} files written for ${siteUrl}.`);
}

const isMain = process.argv[1]
  ? resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isMain) {
  main();
}
