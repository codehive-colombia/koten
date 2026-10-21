/**
 * Koten UI shadcn registry build (`F5-001`).
 *
 * Generates `apps/catalog/public/r/<item>.json` for every primitive and pattern, plus
 * `registry.json` with the index. Every item is self-contained: it includes the files
 * it depends on (cn, format, i18n), the token sheet and the npm
 * dependencies, so `npx shadcn add <url>` works without a remote registry.
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

type RegistryFile = {
  path: string;
  target: string;
  type: "registry:ui" | "registry:lib" | "registry:file";
  content: string;
};

type RegistryItem = {
  $schema: string;
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  dependencies: string[];
  files: RegistryFile[];
};

type RegistryIndex = {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<{
    name: string;
    type: "registry:ui";
    title: string;
    description: string;
    files: Array<{ path: string; target: string; type: string }>;
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

function toTarget(file: string): string {
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

function toType(target: string): RegistryFile["type"] {
  if (target.startsWith("components/")) return "registry:ui";
  if (target.startsWith("lib/")) return "registry:lib";

  return "registry:file";
}

function resolveLocal(from: string, specifier: string): string {
  const base = resolve(dirname(from), specifier);

  for (const candidate of [`${base}.ts`, `${base}.tsx`, join(base, "index.ts")]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // Sigue buscando.
    }
  }

  throw new Error(`Could not resolve ${specifier} from ${relative(root, from)}`);
}

const importPattern = /from\s+"([^"]+)"/g;

function importsOf(source: string): string[] {
  return [...source.matchAll(importPattern)].map((match) => match[1] as string);
}

function rewriteImports(source: string, file: string): string {
  const currentTarget = toTarget(file);

  return source.replace(importPattern, (full, specifier: string) => {
    if (!specifier.startsWith(".")) return full;

    const target = toTarget(resolveLocal(file, specifier));
    const withoutExtension = target.replace(/\.(tsx?|jsx?)$/, "");
    const specifierPath = relative(dirname(currentTarget), withoutExtension).split("\\").join("/");

    return `from "${specifierPath.startsWith("..") ? specifierPath : `./${specifierPath}`}"`;
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

function tokensCss(): string {
  const tokens = readFileSync(join(stylesRoot, "tokens.css"), "utf8");
  const globals = readFileSync(join(stylesRoot, "globals.css"), "utf8")
    .split("\n")
    .filter(
      (line) =>
        !line.startsWith('@import "tailwindcss"') &&
        !line.startsWith('@import "./tokens.css"') &&
        !line.startsWith("@source "),
    )
    .join("\n");

  return `/* Koten UI · tokens, themes and Tailwind roles (D-039). */\n${tokens}\n${globals}`;
}

function titleFor(name: string): string {
  const words = name.split("-");
  const title = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return title;
}

function buildItem(entry: string): RegistryItem {
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

  const registryFiles: RegistryFile[] = files.map((file) => {
    const target = toTarget(file);

    return {
      path: target,
      target,
      type: toType(target),
      content: rewriteImports(readFileSync(file, "utf8"), file),
    };
  });

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
      path: target,
      target,
      type: "registry:lib",
      content: rewriteImports(readFileSync(file, "utf8"), file),
    });
  }

  registryFiles.push({
    path: "styles/koten.css",
    target: "styles/koten.css",
    type: "registry:file",
    content: tokensCss(),
  });

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: titleFor(name),
    description: `Koten UI · ${titleFor(name)}. Editable copy with tokens and dependencies.`,
    dependencies: [...dependencies].sort(),
    files: registryFiles.sort((first, second) => first.target.localeCompare(second.target)),
  };
}

export function buildItems(): RegistryItem[] {
  const items = componentFiles().map(buildItem);
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
    homepage: "http://localhost:5173/start",
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      files: item.files.map((file) => ({
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
