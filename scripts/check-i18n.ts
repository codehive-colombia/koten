/**
 * Guardia de i18n del POC (`F4-001`).
 *
 * Revisa el código de `packages/ui` y de las tres apps para que la traducción no se
 * rompa en silencio:
 *
 * 1. `jsx-text`: texto visible escrito directamente en el JSX de las demos.
 * 2. `literal-attribute`: `aria-label`, `placeholder`, `title`, `alt` o `label` como
 *    string literal en las demos.
 * 3. `intl-format`: `toLocaleString`, `toLocaleDateString`, `toLocaleTimeString` o
 *    `toFixed` en lugar de `formatNumber`, `formatCurrency` y `formatDate`.
 * 4. `physical-direction`: utilidades físicas (`text-left`, `border-l-2`, `pl-2`,
 *    `left-4`…) en lugar de lógicas (`text-start`, `border-s-2`, `ps-2`, `start-4`).
 *
 * Para una excepción justificada, agregar `// i18n-allow: <regla> <motivo>` en la
 * misma línea o en la anterior.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

export type I18nRule = "jsx-text" | "literal-attribute" | "intl-format" | "physical-direction";

export type I18nFinding = {
  file: string;
  line: number;
  rule: I18nRule;
  excerpt: string;
  hint: string;
};

const demoRoots = ["apps/storefront/src", "apps/erp/src"];
const codeRoots = ["packages/ui/src", "apps/storefront/src", "apps/erp/src", "apps/catalog/src"];

const hints: Record<I18nRule, string> = {
  "jsx-text": "El texto visible sale de los diccionarios de copy (JA/ES/EN), no del JSX.",
  "literal-attribute": "Los labels accesibles salen de copy; usa `aria-label={…}`.",
  "intl-format": "Formatea con `formatNumber`, `formatCurrency` o `formatDate` de @koten/ui.",
  "physical-direction": "Usa la utilidad lógica (start/end, ps/pe, ms/me, border-s/e).",
};

const physicalDirection =
  /(?<![\w-])(?:text-left|text-right|border-[lr]-(?:\d+|px|\[[^\]]+\])|rounded-[lr](?:-(?:none|sm|md|lg|xl|2xl|3xl|full|\[[^\]]+\]))?|[pm][lr]-(?:\d+(?:\.5)?|px|auto|\[[^\]]+\])|(?:left|right)-(?:\d+(?:\.5)?|px|auto|full|\[[^\]]+\]))/g;

const physicalCss =
  /(?:margin|padding)-(?:left|right)\s*:|text-align\s*:\s*(?:left|right)\b|border-(?:left|right)\s*:|^\s*(?:left|right)\s*:/gm;

const formatting = /\.toLocale(?:String|DateString|TimeString)\s*\(|\.toFixed\s*\(/g;

const literalAttribute = /(?:aria-label|aria-description|placeholder|title|alt|label)="([^"]*)"/g;

const jsxText = />([^\n<>{}]*\p{L}[^\n<>{}]*)</gu;

function isDemoFile(file: string): boolean {
  return demoRoots.some((root) => file.startsWith(root));
}

function isTextFile(file: string): boolean {
  return /\.(?:ts|tsx)$/.test(file);
}

function isCssFile(file: string): boolean {
  return file.endsWith(".css");
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

function isAllowed(source: string, index: number, rule: I18nRule): boolean {
  const lineStart = source.lastIndexOf("\n", index - 1) + 1;
  const previousStart = lineStart === 0 ? 0 : source.lastIndexOf("\n", lineStart - 2) + 1;
  const currentLine = source.slice(lineStart, source.indexOf("\n", index));
  const previousLine = source.slice(previousStart, lineStart);

  return [currentLine, previousLine].some(
    (line) => line.includes("i18n-allow") && line.includes(rule),
  );
}

/** Quita entidades, espacios, signos y números: solo queda texto si hay letras. */
function hasLetters(text: string): boolean {
  const cleaned = text.replace(/&[a-zA-Z#0-9]+;/g, "").replace(/[\s\p{P}\p{S}\p{N}]/gu, "");

  return /\p{L}/u.test(cleaned);
}

function collect(
  file: string,
  source: string,
  rule: I18nRule,
  pattern: RegExp,
  keep: (match: RegExpExecArray) => boolean = () => true,
): I18nFinding[] {
  const findings: I18nFinding[] = [];
  pattern.lastIndex = 0;

  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (!keep(match) || isAllowed(source, index, rule)) {
      continue;
    }

    findings.push({
      file,
      line: lineOf(source, index),
      rule,
      excerpt: match[0].trim().slice(0, 100),
      hint: hints[rule],
    });
  }

  return findings;
}

/** Audita un archivo ya leído; `file` es relativo a la raíz del repo. */
export function auditSource(file: string, source: string): I18nFinding[] {
  const findings: I18nFinding[] = [];

  if (!isTextFile(file) && !isCssFile(file)) {
    return findings;
  }

  if (isDemoFile(file) && file.endsWith(".tsx")) {
    findings.push(
      ...collect(file, source, "jsx-text", jsxText, (match) => hasLetters(match[1] ?? "")),
      ...collect(file, source, "literal-attribute", literalAttribute, (match) => {
        const value = match[1] ?? "";

        // `alt=""` es legítimo en imágenes decorativas.
        return /\p{L}/u.test(value);
      }),
    );
  }

  if (isTextFile(file)) {
    findings.push(...collect(file, source, "intl-format", formatting));
    findings.push(...collect(file, source, "physical-direction", physicalDirection));
  }

  if (isCssFile(file)) {
    findings.push(...collect(file, source, "physical-direction", physicalCss));
  }

  return findings;
}

function walk(directory: string): string[] {
  const entries = readdirSync(directory);

  return entries.flatMap((entry) => {
    const path = join(directory, entry);

    if (statSync(path).isDirectory()) {
      return entry === "node_modules" || entry === "dist" || entry === "__snapshots__"
        ? []
        : walk(path);
    }

    return /\.(?:ts|tsx|css)$/.test(entry) && !entry.includes(".test.") ? [path] : [];
  });
}

export function checkRepository(root = process.cwd()): {
  files: number;
  findings: I18nFinding[];
} {
  const files = codeRoots
    .map((directory) => join(root, directory))
    .filter((directory) => statSync(directory).isDirectory())
    .flatMap((directory) => walk(directory));

  const findings = files.flatMap((path) =>
    auditSource(relative(root, path).split(sep).join("/"), readFileSync(path, "utf8")),
  );

  return { files: files.length, findings };
}

if (import.meta.main) {
  const { files, findings } = checkRepository();

  if (findings.length > 0) {
    for (const finding of findings) {
      console.error(`${finding.file}:${finding.line} · ${finding.rule} · ${finding.excerpt}`);
      console.error(`  ${finding.hint}`);
    }

    console.error(`\ni18n: ${findings.length} hallazgo(s) en ${files} archivos revisados.`);
    process.exit(1);
  }

  console.log(`i18n: ${files} archivos revisados, sin hallazgos.`);
}
