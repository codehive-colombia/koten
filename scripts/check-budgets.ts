import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

type Budget = {
  /** JS downloaded to paint the first route (entry + modulepreload). */
  initial: number;
  /** Total build JS, including route chunks. */
  total: number;
  css: number;
};

const kb = 1024;

const budgets: Record<string, Budget> = {
  storefront: { initial: 150 * kb, total: 150 * kb, css: 30 * kb },
  erp: { initial: 250 * kb, total: 250 * kb, css: 30 * kb },
  // The catalog is internal and serves 46 component pages + 20 block pages in ES/JA/EN (D-025, D-042).
  // Pages are split by route (D-029): the entry does not load the whole documentation.
  catalog: { initial: 290 * kb, total: 470 * kb, css: 30 * kb },
};

const failures: string[] = [];

function gzipSize(path: string): number {
  return gzipSync(readFileSync(path)).length;
}

function formatKb(bytes: number): string {
  return `${(bytes / kb).toFixed(1)} KB`;
}

/** Assets referenced by `index.html`: what the browser requests on open. */
function initialAssets(html: string): string[] {
  const matches = html.matchAll(/(?:src|href)="[^"]*?\/assets\/([^"]+\.(?:js|css))"/g);

  return [...new Set([...matches].map((match) => match[1] as string))];
}

for (const [app, budget] of Object.entries(budgets)) {
  const dist = join(process.cwd(), "apps", app, "dist");
  const assets = join(dist, "assets");

  if (!existsSync(assets)) {
    failures.push(`${app}: missing dist/assets; run bun run build`);
    continue;
  }

  const files = readdirSync(assets);
  const jsFiles = files.filter((file) => file.endsWith(".js"));
  const cssFiles = files.filter((file) => file.endsWith(".css"));
  const fontFiles = files.filter((file) => /\.(woff2?|ttf|otf)$/i.test(file));

  if (jsFiles.length === 0) {
    failures.push(`${app}: no compiled JavaScript found`);
  }

  const initial = initialAssets(readFileSync(join(dist, "index.html"), "utf8"));
  const initialJs = initial
    .filter((file) => file.endsWith(".js"))
    .reduce((total, file) => total + gzipSize(join(assets, file)), 0);
  const totalJs = jsFiles.reduce((total, file) => total + gzipSize(join(assets, file)), 0);
  const cssSize = cssFiles.reduce((total, file) => total + gzipSize(join(assets, file)), 0);

  if (initialJs === 0) {
    failures.push(`${app}: index.html references no JS`);
  }

  if (initialJs > budget.initial) {
    failures.push(`${app}: initial JS ${formatKb(initialJs)} > ${formatKb(budget.initial)}`);
  }

  if (totalJs > budget.total) {
    failures.push(`${app}: JS total ${formatKb(totalJs)} > ${formatKb(budget.total)}`);
  }

  if (cssSize > budget.css) {
    failures.push(`${app}: CSS ${formatKb(cssSize)} > ${formatKb(budget.css)}`);
  }

  if (fontFiles.length > 0) {
    failures.push(`${app}: local fonts ${fontFiles.join(", ")} (budget 0 KB CJK)`);
  }

  console.log(
    `${app}: initial JS ${formatKb(initialJs)} · total JS ${formatKb(totalJs)} · ` +
      `CSS ${formatKb(cssSize)} · fonts ${fontFiles.length} · ${jsFiles.length} chunks`,
  );
}

if (failures.length > 0) {
  console.error("\nBudgets exceeded:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("\nBudgets OK");
