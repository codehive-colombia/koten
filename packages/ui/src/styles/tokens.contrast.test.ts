import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolvePath(process.cwd(), "packages/ui/src/styles/tokens.css"), "utf8");

const rootBlock = css.slice(0, css.indexOf("/* ---- Themes")) || css;

const themeIds = ["chirashi", "daicho", "kanso", "sumi"] as const;

const themeBlocks = Object.fromEntries(
  themeIds.map((theme) => {
    const match = css.match(new RegExp(`\\[data-theme="${theme}"\\]\\s*\\{([\\s\\S]*?)\\}`));

    if (!match?.[1]) {
      throw new Error(`No se encontró el bloque del tema ${theme}`);
    }

    return [theme, match[1]];
  }),
) as Record<(typeof themeIds)[number], string>;

function declared(block: string, name: string) {
  const match = block.match(new RegExp(`--koten-${name}:\\s*([^;]+);`));

  return match?.[1]?.trim();
}

function resolve(name: string, block: string, seen = new Set<string>()): string {
  if (seen.has(name)) {
    throw new Error(`Ciclo al resolver --koten-${name}`);
  }

  seen.add(name);

  const value = declared(block, name) ?? declared(rootBlock, name);

  if (!value) {
    throw new Error(`No se encontró --koten-${name}`);
  }

  if (/^#[0-9a-f]{6}$/i.test(value)) {
    return value;
  }

  const alias = value.match(/^var\(--koten-([\w-]+)\)$/);

  if (alias?.[1]) {
    return resolve(alias[1], block, seen);
  }

  throw new Error(`--koten-${name} no resuelve a un hex: ${value}`);
}

function channel(value: number) {
  const normalized = value / 255;

  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const [red, green, blue] = (hex.replace("#", "").match(/../g) ?? []).map((part) =>
    channel(Number.parseInt(part, 16)),
  ) as [number, number, number];

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const first = luminance(foreground);
  const second = luminance(background);

  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const textPairs = [
  ["fg", "bg", "texto principal sobre papel"],
  ["fg", "bg-raised", "texto principal sobre superficie"],
  ["fg-muted", "bg", "texto secundario sobre papel"],
  ["fg-muted", "bg-raised", "texto secundario sobre superficie"],
  ["fg-faint", "bg", "metadatos sobre papel"],
  ["fg-faint", "bg-tint", "metadatos sobre tint"],
  ["fg-faint", "bg-raised", "metadatos sobre superficie"],
  ["link", "bg", "enlace sobre papel"],
  ["success", "bg-raised", "éxito sobre superficie"],
  ["warning", "bg-raised", "aviso sobre superficie"],
  ["danger", "bg-raised", "error sobre superficie"],
  ["sale", "bg-raised", "rebaja sobre superficie"],
  ["new", "bg-raised", "novedad sobre superficie"],
  ["inverse-fg", "inverse-bg", "texto sobre superficie inversa"],
] as const;

describe("contraste de tokens", () => {
  for (const theme of themeIds) {
    const block = themeBlocks[theme];

    it(`cumple AA en el tema ${theme}`, () => {
      for (const [foreground, background, label] of textPairs) {
        const ratio = contrast(resolve(foreground, block), resolve(background, block));

        expect(ratio, `${theme}: ${label} (${ratio.toFixed(2)}:1)`).toBeGreaterThanOrEqual(4.5);
      }
    });

    it(`mantiene texto legible sobre el primario en ${theme}`, () => {
      const ratio = contrast(resolve("primary-fg", block), resolve("primary", block));

      expect(
        ratio,
        `${theme}: texto sobre primario (${ratio.toFixed(2)}:1)`,
      ).toBeGreaterThanOrEqual(4.5);
    });
  }

  it("mantiene el texto sólido legible sobre cada fondo de estado", () => {
    const tones = ["info", "success", "warning", "danger", "sale", "new", "neutral"] as const;

    for (const theme of themeIds) {
      const block = themeBlocks[theme];

      for (const tone of tones) {
        const ratio = contrast(resolve("solid-fg", block), resolve(`${tone}-solid`, block));

        expect(
          ratio,
          `${theme}: texto sólido sobre ${tone} (${ratio.toFixed(2)}:1)`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("mantiene el borde de control en al menos 3:1", () => {
    for (const theme of themeIds) {
      const block = themeBlocks[theme];

      for (const background of ["bg", "bg-raised"] as const) {
        const ratio = contrast(resolve("border-strong", block), resolve(background, block));

        expect(
          ratio,
          `${theme}: borde de control sobre ${background} (${ratio.toFixed(2)}:1)`,
        ).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
