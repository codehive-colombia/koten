/**
 * Koten UI shadcn registry build.
 *
 * Generates `apps/catalog/public/r/<item>.json` for every primitive and pattern,
 * plus `registry.json` with the index and a `koten-theme` item.
 *
 * Items respect the consumer's `components.json`:
 * - Targets use shadcn placeholders (`@ui`, `@components`, `@lib`) so files land
 *   in the aliases configured by the project.
 * - Imports use the canonical `@/...` specifiers; the shadcn CLI rewrites them
 *   to the project's aliases during installation.
 * - Tokens, themes and density travel in `koten-theme` as `cssVars` + `css`, so
 *   they are written into the project's Tailwind CSS entry instead of creating
 *   a custom `styles/` folder.
 *
 * Usage: `bun scripts/build-registry.ts`
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import postcss, { type AtRule, type Rule } from "postcss";

/** Repo root: walks up from the script until it finds the UI package. */
function findRoot(): string {
  let directory = (import.meta as { dir?: string }).dir ?? process.cwd();

  for (let attempt = 0; attempt < 6; attempt += 1) {
    if (existsSync(join(directory, "packages/ui/src/components/ui"))) {
      return directory;
    }

    directory = resolve(directory, "..");
  }

  return process.cwd();
}

const root = findRoot();

const uiRoot = join(root, "packages/ui/src/components/ui");
const patternsRoot = join(root, "packages/ui/src/components/patterns");
const libRoot = join(root, "packages/ui/src/lib");
const i18nRoot = join(root, "packages/ui/src/i18n");
const stylesRoot = join(root, "packages/ui/src/styles");
const outputRoot = join(root, "apps/catalog/public/r");
const siteUrl = (process.env.KOTEN_SITE_URL?.trim() || "https://koten.codehive.com.co").replace(
  /\/+$/,
  "",
);

const themeName = "koten-theme";

type RegistryFileType = "registry:ui" | "registry:component" | "registry:lib";

type RegistryFile = {
  path: string;
  target: string;
  type: RegistryFileType;
  content: string;
};

type RegistryItemType = "registry:ui" | "registry:block" | "registry:theme";

type RegistryItem = {
  $schema: string;
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  cssVars?: { theme: Record<string, string> };
  css?: Record<string, unknown>;
  docs?: string;
  files?: RegistryFile[];
};

type RegistryIndex = {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<{
    name: string;
    type: RegistryItemType;
    title: string;
    description: string;
    files: Array<{ path: string; target: string; type: RegistryFileType }>;
  }>;
};

const externalDependencies: Record<string, string> = {
  "@base-ui/react": "@base-ui/react",
  "@tanstack/react-table": "@tanstack/react-table",
  "class-variance-authority": "class-variance-authority",
  clsx: "clsx",
  "lucide-react": "lucide-react",
  "tailwind-merge": "tailwind-merge",
};

/**
 * Colors used by the shadcn base layer and by components installed from the
 * official registry. Mapping them to Koten roles keeps a shadcn-initialized
 * project compiling without shipping wildcard resets.
 */
const compatibilityColors: Record<string, string> = {
  "color-background": "var(--koten-bg)",
  "color-foreground": "var(--koten-fg)",
  "color-card": "var(--koten-bg-raised)",
  "color-card-foreground": "var(--koten-fg)",
  "color-popover": "var(--koten-bg-raised)",
  "color-popover-foreground": "var(--koten-fg)",
  "color-secondary": "var(--koten-bg-tint)",
  "color-secondary-foreground": "var(--koten-fg)",
  "color-accent": "var(--koten-bg-tint)",
  "color-accent-foreground": "var(--koten-fg)",
  "color-destructive": "var(--koten-danger)",
  "color-destructive-foreground": "var(--koten-solid-fg)",
  "color-muted-foreground": "var(--koten-fg-muted)",
  "color-border": "var(--koten-border)",
  "color-input": "var(--koten-border)",
  "color-ring": "var(--koten-focus)",
};

/**
 * shadcn's base layer maps `--color-*` to unprefixed variables. Overriding
 * those variables keeps a shadcn-initialized project on Koten values even when
 * a component installs the theme as a dependency (without overwriting vars).
 */
const compatibilityRoot: Record<string, string> = {
  "--background": "var(--koten-bg)",
  "--foreground": "var(--koten-fg)",
  "--card": "var(--koten-bg-raised)",
  "--card-foreground": "var(--koten-fg)",
  "--popover": "var(--koten-bg-raised)",
  "--popover-foreground": "var(--koten-fg)",
  "--primary": "var(--koten-primary)",
  "--primary-foreground": "var(--koten-primary-fg)",
  "--secondary": "var(--koten-bg-tint)",
  "--secondary-foreground": "var(--koten-fg)",
  "--muted": "var(--koten-fg-muted)",
  "--muted-foreground": "var(--koten-fg-muted)",
  "--accent": "var(--koten-bg-tint)",
  "--accent-foreground": "var(--koten-fg)",
  "--destructive": "var(--koten-danger)",
  "--destructive-foreground": "var(--koten-solid-fg)",
  "--border": "var(--koten-border)",
  "--input": "var(--koten-border)",
  "--ring": "var(--koten-focus)",
};

const defaultColorKeys = new Set([
  "color-transparent",
  "color-current",
  "color-black",
  "color-white",
]);

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);

    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function componentFiles(): string[] {
  return [...walk(uiRoot), ...walk(patternsRoot)].filter(
    (file) => file.endsWith(".tsx") && !file.includes(".test."),
  );
}

/** Path inside a consumer project, independent of its alias prefix. */
function toRegistryPath(file: string): string {
  if (file.startsWith(uiRoot)) {
    return `components/ui/${relative(uiRoot, file)}`;
  }
  if (file.startsWith(patternsRoot)) {
    return `components/patterns/${relative(patternsRoot, file)}`;
  }
  if (file.startsWith(libRoot) || file.startsWith(i18nRoot)) {
    return `lib/koten/${basename(file)}`;
  }

  throw new Error(`File outside the package: ${file}`);
}

/** shadcn target placeholder; the CLI resolves it against components.json. */
function toTarget(file: string): string {
  const path = toRegistryPath(file);

  if (path.startsWith("components/ui/")) {
    return `@ui/${path.slice("components/ui/".length)}`;
  }
  if (path.startsWith("components/patterns/")) {
    return `@components/${path.slice("components/".length)}`;
  }

  return `@lib/${path.slice("lib/".length)}`;
}

function toType(file: string): RegistryFileType {
  const path = toRegistryPath(file);

  if (path.startsWith("components/ui/")) return "registry:ui";
  if (path.startsWith("components/patterns/")) return "registry:component";

  return "registry:lib";
}

/** Canonical import used in registry content; shadcn rewrites it to the project aliases. */
function toImportPath(file: string): string {
  return `@/${toRegistryPath(file).replace(/\.(tsx?|jsx?)$/, "")}`;
}

function resolveLocal(from: string, specifier: string): string {
  const base = resolve(dirname(from), specifier);

  for (const candidate of [`${base}.ts`, `${base}.tsx`, join(base, "index.ts")]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // Keep looking.
    }
  }

  throw new Error(`Could not resolve ${specifier} from ${relative(root, from)}`);
}

const importPattern = /from\s+"([^"]+)"/g;

function importsOf(source: string): string[] {
  return [...source.matchAll(importPattern)].map((match) => match[1] as string);
}

function rewriteImports(source: string, file: string): string {
  return source.replace(importPattern, (full, specifier: string) => {
    if (!specifier.startsWith(".")) return full;

    return `from "${toImportPath(resolveLocal(file, specifier))}"`;
  });
}

function closure(entry: string): string[] {
  const seen = new Set<string>();
  const stack = [entry];

  while (stack.length > 0) {
    const file = stack.pop() as string;

    if (seen.has(file)) continue;
    seen.add(file);

    for (const specifier of importsOf(readFileSync(file, "utf8"))) {
      if (specifier.startsWith(".")) {
        stack.push(resolveLocal(file, specifier));
      }
    }
  }

  return [...seen];
}

function normalizeSelector(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** Nested selector/at-rule map understood by shadcn's `css` updater. */
function nodeMap(node: Rule | AtRule): Record<string, unknown> {
  const map: Record<string, unknown> = {};

  node.each((child) => {
    if (child.type === "decl") {
      map[child.prop] = child.value;
    } else if (child.type === "rule") {
      map[normalizeSelector(child.selector)] = nodeMap(child);
    } else if (child.type === "atrule") {
      map[`@${child.name}${child.params ? ` ${normalizeSelector(child.params)}` : ""}`] =
        nodeMap(child);
    }
  });

  return map;
}

function themeVariables(): Record<string, string> {
  const variables: Record<string, string> = {};
  const globals = postcss.parse(readFileSync(join(stylesRoot, "globals.css"), "utf8"));

  globals.walkAtRules("theme", (atRule) => {
    atRule.each((child) => {
      if (child.type !== "decl" || !child.prop.startsWith("--")) return;

      const key = child.prop.slice(2);

      // Wildcard resets would wipe mappings that already exist in a
      // shadcn-initialized project; the concrete Koten roles replace them.
      if (key.endsWith("-*") || defaultColorKeys.has(key)) return;

      variables[key] = child.value;
    });
  });

  for (const [key, value] of Object.entries(compatibilityColors)) {
    if (!(key in variables)) variables[key] = value;
  }

  return variables;
}

function cssBlocks(): Record<string, unknown> {
  const css: Record<string, unknown> = {};
  const tokens = postcss.parse(readFileSync(join(stylesRoot, "tokens.css"), "utf8"));
  const globals = postcss.parse(readFileSync(join(stylesRoot, "globals.css"), "utf8"));

  for (const sheet of [tokens, globals]) {
    sheet.each((node) => {
      if (node.type === "rule") {
        css[normalizeSelector(node.selector)] = nodeMap(node);
      } else if (node.type === "atrule" && !["import", "source", "theme"].includes(node.name)) {
        css[`@${node.name}${node.params ? ` ${normalizeSelector(node.params)}` : ""}`] =
          nodeMap(node);
      }
    });
  }

  const rootRule = css[":root"];

  css[":root"] = {
    ...(rootRule && typeof rootRule === "object" ? rootRule : {}),
    ...compatibilityRoot,
  };

  return css;
}

function titleFor(name: string): string {
  const words = name.split("-");
  const title = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return title;
}

function buildThemeItem(): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: themeName,
    type: "registry:theme",
    title: "Koten Theme",
    description: "Koten tokens, themes, density and Tailwind roles.",
    cssVars: { theme: themeVariables() },
    css: cssBlocks(),
    docs: 'Koten writes its tokens into the CSS file declared as `tailwind.css` in components.json. Keep that file imported once by your app; no styles/ folder is created. For a Koten-only theme, start from a CSS file with only `@import "tailwindcss";`. If the project already uses shadcn tokens, install koten-theme before the components so existing values are replaced.',
  };
}

function buildItem(entry: string, themeUrl: string): RegistryItem {
  const files = closure(entry);
  const name = basename(entry).replace(/\.tsx$/, "");
  const dependencies = new Set<string>();

  for (const file of files) {
    for (const specifier of importsOf(readFileSync(file, "utf8"))) {
      if (specifier.startsWith(".")) continue;

      const packageName = specifier.startsWith("@")
        ? specifier.split("/").slice(0, 2).join("/")
        : specifier.split("/")[0];

      if (externalDependencies[packageName]) {
        dependencies.add(externalDependencies[packageName]);
      }
    }
  }

  const registryFiles: RegistryFile[] = files.map((file) => ({
    path: toRegistryPath(file),
    target: toTarget(file),
    type: toType(file),
    content: rewriteImports(readFileSync(file, "utf8"), file),
  }));

  // The i18n core and `cn` always travel with the component.
  for (const file of [
    join(libRoot, "cn.ts"),
    join(libRoot, "format.ts"),
    join(libRoot, "intl.ts"),
    join(i18nRoot, "labels.ts"),
    join(i18nRoot, "provider.tsx"),
  ]) {
    const target = toTarget(file);

    if (registryFiles.some((item) => item.target === target)) continue;

    registryFiles.push({
      path: toRegistryPath(file),
      target,
      type: "registry:lib",
      content: rewriteImports(readFileSync(file, "utf8"), file),
    });
  }

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: entry.startsWith(patternsRoot) ? "registry:block" : "registry:ui",
    title: titleFor(name),
    description: `Koten UI · ${titleFor(name)}. Editable copy with tokens and dependencies.`,
    dependencies: [...dependencies].sort(),
    registryDependencies: [themeUrl],
    files: registryFiles.sort((first, second) => first.target.localeCompare(second.target)),
  };
}

export function buildItems(options: { siteUrl?: string } = {}): RegistryItem[] {
  const site = (options.siteUrl?.trim() || siteUrl).replace(/\/+$/, "");
  const theme = buildThemeItem();
  const items = [
    theme,
    ...componentFiles().map((entry) => buildItem(entry, `${site}/r/${themeName}.json`)),
  ];
  const names = new Set<string>();

  for (const item of items) {
    if (names.has(item.name)) {
      throw new Error(`Duplicate registry item: ${item.name}`);
    }
    names.add(item.name);
  }

  return items;
}

export function writeRegistry(items: RegistryItem[]): void {
  rmSync(outputRoot, { recursive: true, force: true });
  mkdirSync(outputRoot, { recursive: true });

  for (const item of items) {
    writeFileSync(join(outputRoot, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`);
  }

  const index: RegistryIndex = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "koten",
    homepage: `${siteUrl}/start`,
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      files: (item.files ?? []).map((file) => ({
        path: file.path,
        target: file.target,
        type: file.type,
      })),
    })),
  };

  writeFileSync(join(outputRoot, "registry.json"), `${JSON.stringify(index, null, 2)}\n`);
}

if (import.meta.main) {
  const items = buildItems();

  writeRegistry(items);
  console.log(`registry: ${items.length} items in apps/catalog/public/r`);
}
