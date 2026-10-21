import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

type Budget = {
  js: number;
  css: number;
};

const budgets: Record<string, Budget> = {
  storefront: { js: 150 * 1024, css: 30 * 1024 },
  erp: { js: 250 * 1024, css: 30 * 1024 },
  // El catálogo es interno y carga todas las páginas de documentación en la v1.
  catalog: { js: 300 * 1024, css: 30 * 1024 },
};

const failures: string[] = [];

function gzipSize(path: string): number {
  return gzipSync(readFileSync(path)).length;
}

function formatKb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

for (const [app, budget] of Object.entries(budgets)) {
  const assets = join(process.cwd(), "apps", app, "dist", "assets");

  if (!existsSync(assets)) {
    failures.push(`${app}: falta dist/assets; ejecuta bun run build`);
    continue;
  }

  const files = readdirSync(assets);
  const jsFiles = files.filter((file) => file.endsWith(".js"));
  const cssFiles = files.filter((file) => file.endsWith(".css"));
  const fontFiles = files.filter((file) => /\.(woff2?|ttf|otf)$/i.test(file));

  if (jsFiles.length === 0) {
    failures.push(`${app}: no se encontró JavaScript compilado`);
  }

  const jsSize = jsFiles.reduce((total, file) => total + gzipSize(join(assets, file)), 0);
  const cssSize = cssFiles.reduce((total, file) => total + gzipSize(join(assets, file)), 0);

  if (jsSize > budget.js) {
    failures.push(`${app}: JS ${formatKb(jsSize)} > ${formatKb(budget.js)}`);
  }

  if (cssSize > budget.css) {
    failures.push(`${app}: CSS ${formatKb(cssSize)} > ${formatKb(budget.css)}`);
  }

  if (fontFiles.length > 0) {
    failures.push(`${app}: fuentes locales ${fontFiles.join(", ")} (presupuesto 0 KB CJK)`);
  }

  console.log(
    `${app}: JS ${formatKb(jsSize)} · CSS ${formatKb(cssSize)} · fuentes ${fontFiles.length}`,
  );
}

if (failures.length > 0) {
  console.error("\nPresupuestos incumplidos:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("\nPresupuestos OK");
