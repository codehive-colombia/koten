/**
 * Guardrailed theme designer (M-013).
 *
 * The designer never accepts free colors. It works with the four Koten
 * registers, four pigments from the locked palette, five paper steps, four
 * radii and the three densities. Every other value is derived. Before the CSS
 * is exported, the generated pairs are checked against WCAG AA.
 */

export type DesignerBase = "kanso" | "chirashi" | "daicho" | "sumi";
export type DesignerPigment = "ai" | "shu" | "kin" | "matcha";
export type DesignerDensity = "compact" | "default" | "comfortable";
export type RadiusStep = 0 | 1 | 2 | 3;

export type DesignerConfig = {
  base: DesignerBase;
  pigment: DesignerPigment;
  /** Paper step, 0 (brightest) to 4 (warmest/deepest). */
  paper: number;
  radius: RadiusStep;
  density: DesignerDensity;
};

export type ContrastCheckId =
  | "body"
  | "muted"
  | "faint"
  | "primary"
  | "primaryFg"
  | "focus"
  | "borderStrong"
  | "dangerSolid"
  | "successSolid"
  | "warningSolid"
  | "infoSolid";

export type ContrastCheck = {
  id: ContrastCheckId;
  ratio: number;
  min: number;
  pass: boolean;
};

export type DesignerTheme = {
  config: DesignerConfig;
  dark: boolean;
  /** CSS custom properties ready for an inline style or the exported file. */
  vars: Record<string, string>;
  checks: ContrastCheck[];
  failures: number;
};

export const designerBases: readonly DesignerBase[] = ["kanso", "chirashi", "daicho", "sumi"];
export const designerPigments: readonly DesignerPigment[] = ["ai", "shu", "kin", "matcha"];
export const designerDensities: readonly DesignerDensity[] = ["compact", "default", "comfortable"];
export const lastPaperStep = 4;

const basePresets: Record<
  DesignerBase,
  { pigment: DesignerPigment; paper: number; radius: RadiusStep; density: DesignerDensity }
> = {
  kanso: { pigment: "ai", paper: 2, radius: 2, density: "default" },
  chirashi: { pigment: "shu", paper: 2, radius: 2, density: "default" },
  daicho: { pigment: "ai", paper: 2, radius: 2, density: "compact" },
  sumi: { pigment: "ai", paper: 2, radius: 2, density: "default" },
};

/** Curated paper range: warm washi in light, sumi papers in dark. */
const paperSteps: Record<"light" | "dark", readonly string[]> = {
  light: ["#FBF8EF", "#F8F4E9", "#F5F0E4", "#F1EAD9", "#EDE4D0"],
  dark: ["#211E1A", "#1C1A16", "#171512", "#141311", "#11100E"],
};

type PigmentColor = {
  value: string;
  hover: string;
  strong: string;
  fg: string;
};

const lightPigments: Record<DesignerPigment, PigmentColor> = {
  ai: { value: "#1E3A5F", hover: "#192F4E", strong: "#152843", fg: "#FFFFFF" },
  shu: { value: "#C23B22", hover: "#9F301C", strong: "#882917", fg: "#FFFFFF" },
  kin: { value: "#845C0E", hover: "#6C4B0B", strong: "#5C400A", fg: "#FFFFFF" },
  matcha: { value: "#4F6B3A", hover: "#415830", strong: "#374B29", fg: "#FFFFFF" },
};

const darkPigments: Record<DesignerPigment, PigmentColor> = {
  ai: { value: "#9CC2EF", hover: "#AECDF2", strong: "#C2DAF7", fg: "#14181D" },
  shu: { value: "#FF9D8A", hover: "#FFB2A2", strong: "#FFC9BD", fg: "#14181D" },
  kin: { value: "#E6C37C", hover: "#EDD09A", strong: "#F3DDB8", fg: "#14181D" },
  matcha: { value: "#A9CF93", hover: "#BBDAA9", strong: "#CFE6C2", fg: "#14181D" },
};

const lightStatus = {
  danger: "#C23B22",
  dangerStrong: "#8F2815",
  success: "#4F6B3A",
  warning: "#845C0E",
  info: "#1E3A5F",
};

const chirashiStatus = {
  danger: "#A82C18",
  dangerStrong: "#7F1F10",
  success: "#4F6B3A",
  warning: "#845C0E",
  info: "#1E3A5F",
};

const darkStatus = {
  danger: "#FF9D8A",
  dangerStrong: "#FFC4B8",
  success: "#A9CF93",
  warning: "#E6C37C",
  info: "#9CC2EF",
};

const darkSolids = {
  neutral: "#4A443A",
  danger: "#A6331F",
  dangerHover: "#8F2815",
  success: "#3F6B32",
  warning: "#6D5210",
  info: "#2B5A8F",
};

export const densityTokens: Record<
  DesignerDensity,
  { rowH: string; controlH: string; controlPx: string; panelP: string; gap: string }
> = {
  compact: { rowH: "28px", controlH: "28px", controlPx: "8px", panelP: "10px", gap: "8px" },
  default: { rowH: "32px", controlH: "32px", controlPx: "10px", panelP: "12px", gap: "12px" },
  comfortable: {
    rowH: "36px",
    controlH: "38px",
    controlPx: "14px",
    panelP: "16px",
    gap: "16px",
  },
};

export function isDarkBase(base: DesignerBase): boolean {
  return base === "sumi";
}

export function defaultDesignerConfig(base: DesignerBase = "kanso"): DesignerConfig {
  return { base, ...basePresets[base] };
}

export function paperStepsFor(base: DesignerBase): readonly string[] {
  return isDarkBase(base) ? paperSteps.dark : paperSteps.light;
}

export function pigmentHexFor(base: DesignerBase, pigment: DesignerPigment): string {
  return (isDarkBase(base) ? darkPigments : lightPigments)[pigment].value;
}

export function radiusLabel(radius: RadiusStep): { sm: number; md: number } {
  return { sm: radius, md: Math.min(3, radius + 1) };
}

type Rgb = { r: number; g: number; b: number };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): Rgb {
  const value = hex.replace("#", "");

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function componentToHex(value: number): string {
  return clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
}

function rgbToHex({ r, g, b }: Rgb): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

/** Linear sRGB mix; t = 0 returns `a`, t = 1 returns `b`. */
export function mixHex(a: string, b: string, t: number): string {
  const from = hexToRgb(a);
  const to = hexToRgb(b);
  const ratio = clamp(t, 0, 1);

  return rgbToHex({
    r: from.r + (to.r - from.r) * ratio,
    g: from.g + (to.g - from.g) * ratio,
    b: from.b + (to.b - from.b) * ratio,
  });
}

function channelLuminance(value: number): number {
  const channel = value / 255;

  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);

  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

export function contrastRatio(a: string, b: string): number {
  const first = relativeLuminance(a);
  const second = relativeLuminance(b);
  const light = Math.max(first, second);
  const dark = Math.min(first, second);

  return (light + 0.05) / (dark + 0.05);
}

/** Locale-free ratio for technical copy (the i18n guard forbids toFixed). */
export function formatRatio(ratio: number): string {
  return `${Math.round(ratio * 100) / 100}:1`;
}

function ratioCheck(
  id: ContrastCheckId,
  foreground: string,
  background: string,
  min: number,
): ContrastCheck {
  const ratio = contrastRatio(foreground, background);

  return { id, ratio, min, pass: ratio >= min };
}

function clampPaper(paper: number): number {
  if (!Number.isFinite(paper)) return 2;

  return clamp(Math.round(paper), 0, lastPaperStep);
}

/**
 * Resolves a configuration into semantic tokens. Nothing here is free-form:
 * neutrals are mixed from the paper and the ink, so a custom theme cannot
 * drift outside the Koten grammar.
 */
export function resolveDesignerTheme(config: DesignerConfig): DesignerTheme {
  const dark = isDarkBase(config.base);
  const paper = paperStepsFor(config.base)[clampPaper(config.paper)] ?? paperSteps.light[2] ?? "";
  const fg = dark ? "#F4EEE1" : "#1C1A17";
  const raised = dark ? mixHex(paper, fg, 0.04) : "#FFFDF7";
  const tint = mixHex(paper, fg, dark ? 0.085 : 0.04);
  const border = mixHex(paper, fg, 0.17);
  const borderStrong = mixHex(paper, fg, 0.5);
  const muted = mixHex(fg, paper, dark ? 0.24 : 0.26);
  const faint = mixHex(fg, paper, dark ? 0.36 : 0.34);
  const pigment = (dark ? darkPigments : lightPigments)[config.pigment];
  const status = config.base === "chirashi" ? chirashiStatus : dark ? darkStatus : lightStatus;
  const solids = dark
    ? darkSolids
    : {
        neutral: fg,
        danger: status.danger,
        dangerHover: status.dangerStrong,
        success: status.success,
        warning: status.warning,
        info: status.info,
      };
  const radius = radiusLabel(config.radius);
  const density = densityTokens[config.density];
  const selection = dark
    ? mixHex(paper, pigment.value, 0.22)
    : mixHex("#FFFFFF", pigment.value, 0.1);

  const vars: Record<string, string> = {
    "--koten-bg": paper,
    "--koten-bg-raised": raised,
    "--koten-bg-tint": tint,
    "--koten-fg": fg,
    "--koten-fg-muted": muted,
    "--koten-fg-faint": faint,
    "--koten-border": border,
    "--koten-border-strong": borderStrong,
    "--koten-primary": pigment.value,
    "--koten-primary-hover": pigment.hover,
    "--koten-primary-strong": pigment.strong,
    "--koten-primary-fg": pigment.fg,
    "--koten-link": pigment.value,
    "--koten-focus": pigment.value,
    "--koten-selection": selection,
    "--koten-danger": status.danger,
    "--koten-danger-strong": status.dangerStrong,
    "--koten-success": status.success,
    "--koten-warning": status.warning,
    "--koten-info": status.info,
    "--koten-sale": status.danger,
    "--koten-new": status.info,
    "--koten-solid-fg": "#FFFFFF",
    "--koten-neutral-solid": solids.neutral,
    "--koten-danger-solid": solids.danger,
    "--koten-danger-solid-hover": solids.dangerHover,
    "--koten-success-solid": solids.success,
    "--koten-warning-solid": solids.warning,
    "--koten-info-solid": solids.info,
    "--koten-sale-solid": solids.danger,
    "--koten-new-solid": solids.info,
    "--koten-inverse-bg": dark ? "#2C2822" : "#24211D",
    "--koten-inverse-fg": dark ? "#F4EEE1" : "#F5F0E4",
    "--koten-overlay": dark ? "rgb(0 0 0 / 66%)" : "rgb(28 26 23 / 42%)",
    "--koten-shadow-overlay": dark
      ? "0 8px 24px rgb(0 0 0 / 55%)"
      : "0 8px 24px rgb(28 26 23 / 18%)",
    "--koten-highlight": dark ? "rgb(255 255 255 / 12%)" : "rgb(255 255 255 / 22%)",
    "--koten-radius-sm": `${radius.sm}px`,
    "--koten-radius-md": `${radius.md}px`,
    "--koten-row-h": density.rowH,
    "--koten-control-h": density.controlH,
    "--koten-control-px": density.controlPx,
    "--koten-panel-p": density.panelP,
    "--koten-gap": density.gap,
  };

  const checks: ContrastCheck[] = [
    ratioCheck("body", fg, paper, 7),
    ratioCheck("muted", muted, paper, 4.5),
    ratioCheck("faint", faint, paper, 4.5),
    ratioCheck("primary", pigment.value, paper, 4.5),
    ratioCheck("primaryFg", pigment.fg, pigment.value, 4.5),
    ratioCheck("focus", pigment.value, paper, 3),
    ratioCheck("borderStrong", borderStrong, paper, 3),
    ratioCheck("dangerSolid", "#FFFFFF", solids.danger, 4.5),
    ratioCheck("successSolid", "#FFFFFF", solids.success, 4.5),
    ratioCheck("warningSolid", "#FFFFFF", solids.warning, 4.5),
    ratioCheck("infoSolid", "#FFFFFF", solids.info, 4.5),
  ];

  return {
    config,
    dark,
    vars,
    checks,
    failures: checks.filter((check) => !check.pass).length,
  };
}

const cssGroups: readonly { title: string; keys: readonly string[] }[] = [
  {
    title: "Paper and ink",
    keys: [
      "--koten-bg",
      "--koten-bg-raised",
      "--koten-bg-tint",
      "--koten-fg",
      "--koten-fg-muted",
      "--koten-fg-faint",
      "--koten-border",
      "--koten-border-strong",
    ],
  },
  {
    title: "Primary",
    keys: [
      "--koten-primary",
      "--koten-primary-hover",
      "--koten-primary-strong",
      "--koten-primary-fg",
      "--koten-link",
      "--koten-focus",
      "--koten-selection",
    ],
  },
  {
    title: "Status",
    keys: [
      "--koten-danger",
      "--koten-danger-strong",
      "--koten-success",
      "--koten-warning",
      "--koten-info",
      "--koten-sale",
      "--koten-new",
    ],
  },
  {
    title: "Solid status backgrounds",
    keys: [
      "--koten-solid-fg",
      "--koten-neutral-solid",
      "--koten-danger-solid",
      "--koten-danger-solid-hover",
      "--koten-success-solid",
      "--koten-warning-solid",
      "--koten-info-solid",
      "--koten-sale-solid",
      "--koten-new-solid",
    ],
  },
  {
    title: "Overlays",
    keys: [
      "--koten-inverse-bg",
      "--koten-inverse-fg",
      "--koten-overlay",
      "--koten-shadow-overlay",
      "--koten-highlight",
    ],
  },
  {
    title: "Shape and density",
    keys: [
      "--koten-radius-sm",
      "--koten-radius-md",
      "--koten-row-h",
      "--koten-control-h",
      "--koten-control-px",
      "--koten-panel-p",
      "--koten-gap",
    ],
  },
];

export function describeDesignerConfig(config: DesignerConfig): string {
  const base = config.base.charAt(0).toUpperCase() + config.base.slice(1);
  const pigment = config.pigment.charAt(0).toUpperCase() + config.pigment.slice(1);

  return `${base} · ${pigment} · paper ${clampPaper(config.paper) + 1} · radius ${config.radius}px · ${config.density} density`;
}

export function toDesignerCss(theme: DesignerTheme): string {
  const lines = [
    "/* Koten UI · custom theme */",
    `/* ${describeDesignerConfig(theme.config)} */`,
    "/* Paste this block at the end of the CSS file declared as `tailwind.css` */",
    "/* in components.json, after koten-theme. */",
    ":root {",
    `  color-scheme: ${theme.dark ? "dark" : "light"};`,
  ];

  for (const group of cssGroups) {
    lines.push("", `  /* ${group.title} */`);

    for (const key of group.keys) {
      const value = theme.vars[key];

      if (value) {
        lines.push(`  ${key}: ${value};`);
      }
    }
  }

  lines.push("}");

  return `${lines.join("\n")}\n`;
}

export function encodeDesignerConfig(config: DesignerConfig): string {
  return [
    config.base,
    config.pigment,
    clampPaper(config.paper),
    config.radius,
    config.density,
  ].join(".");
}

function isBase(value: string): value is DesignerBase {
  return designerBases.some((base) => base === value);
}

function isPigment(value: string): value is DesignerPigment {
  return designerPigments.some((pigment) => pigment === value);
}

function isDensity(value: string): value is DesignerDensity {
  return designerDensities.some((density) => density === value);
}

function isRadius(value: number): value is RadiusStep {
  return value === 0 || value === 1 || value === 2 || value === 3;
}

export function decodeDesignerConfig(
  value: string | null | undefined,
  fallback: DesignerConfig = defaultDesignerConfig(),
): DesignerConfig {
  if (!value) return fallback;

  const [base, pigment, paper, radius, density] = value.split(".");
  const nextPaper = Number(paper);
  const nextRadius = Number(radius);

  return {
    base: base && isBase(base) ? base : fallback.base,
    pigment: pigment && isPigment(pigment) ? pigment : fallback.pigment,
    paper: Number.isInteger(nextPaper) ? clampPaper(nextPaper) : fallback.paper,
    radius: Number.isInteger(nextRadius) && isRadius(nextRadius) ? nextRadius : fallback.radius,
    density: density && isDensity(density) ? density : fallback.density,
  };
}

/**
 * Finds the nearest paper step that passes every AA check without changing the
 * chosen register or pigment. Used by the "safe paper" guardrail.
 */
export function findSafeDesignerConfig(config: DesignerConfig): DesignerConfig {
  if (resolveDesignerTheme(config).failures === 0) return config;

  const steps = Array.from({ length: lastPaperStep + 1 }, (_, index) => index).sort(
    (a, b) => Math.abs(a - config.paper) - Math.abs(b - config.paper) || a - b,
  );

  for (const paper of steps) {
    const candidate = { ...config, paper };

    if (resolveDesignerTheme(candidate).failures === 0) {
      return candidate;
    }
  }

  return config;
}
