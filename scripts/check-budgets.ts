import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

type Budget = {
  /** JS que se descarga para pintar la primera ruta (entry + modulepreload). */
  initial: number;
  /** JS total del build, incluidos chunks de rutas. */
  total: number;
  css: number;
};

const kb = 1024;

const budgets: Record<string, Budget> = {
  storefront: { initial: 150 * kb, total: 150 * kb, css: 30 * kb },
  erp: { initial: 250 * kb, total: 250 * kb, css: 30 * kb },
  // El catálogo es interno y sirve la documentación completa en ES/JA/EN (D-025).
  // Las páginas van por ruta (D-029): el entry no carga la documentación entera.
  catalog: { initial: 260 * kb, total: 360 * kb, css: 30 * kb },
};

const failures: string[] = [];

function gzipSize(path: string): number {
  return gzipSync(readFileSync(path)).length;
}

function formatKb(bytes: number): string {
  return `${(bytes / kb).toFixed(1)} KB`;
}

/** Assets referenciados por `index.html`: lo que el navegador pide al abrir. */
function initialAssets(html: string): string[] {
  const matches = html.matchAll(/(?:src|href)="\/assets\/([^"]+\.(?:js|css))"/g);

  return [...new Set([...matches].map((match) => match[1] as string))];
}

for (const [app, budget] of Object.entries(budgets)) {
  const dist = join(process.cwd(), "apps", app, "dist");
  const assets = join(dist, "assets");

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

  const initial = initialAssets(readFileSync(join(dist, "index.html"), "utf8"));
  const initialJs = initial
    .filter((file) => file.endsWith(".js"))
    .reduce((total, file) => total + gzipSize(join(assets, file)), 0);
  const totalJs = jsFiles.reduce((total, file) => total + gzipSize(join(assets, file)), 0);
  const cssSize = cssFiles.reduce((total, file) => total + gzipSize(join(assets, file)), 0);

  if (initialJs === 0) {
    failures.push(`${app}: index.html no referencia JS`);
  }

  if (initialJs > budget.initial) {
    failures.push(`${app}: JS inicial ${formatKb(initialJs)} > ${formatKb(budget.initial)}`);
  }

  if (totalJs > budget.total) {
    failures.push(`${app}: JS total ${formatKb(totalJs)} > ${formatKb(budget.total)}`);
  }

  if (cssSize > budget.css) {
    failures.push(`${app}: CSS ${formatKb(cssSize)} > ${formatKb(budget.css)}`);
  }

  if (fontFiles.length > 0) {
    failures.push(`${app}: fuentes locales ${fontFiles.join(", ")} (presupuesto 0 KB CJK)`);
  }

  console.log(
    `${app}: JS inicial ${formatKb(initialJs)} · JS total ${formatKb(totalJs)} · ` +
      `CSS ${formatKb(cssSize)} · fuentes ${fontFiles.length} · ${jsFiles.length} chunks`,
  );
}

if (failures.length > 0) {
  console.error("\nPresupuestos excedidos:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("\nPresupuestos OK");
