export type ThemeId = "chirashi" | "daicho" | "kanso";

export type DensityId = "compact" | "default" | "comfortable";

export type ColorToken = {
  token: string;
  name: string;
  romanized: string;
  hex: string;
  note: string;
};

export const primitiveColors: readonly ColorToken[] = [
  {
    token: "--koten-kinari",
    name: "生成り",
    romanized: "Kinari",
    hex: "#F5F0E4",
    note: "Papel de página",
  },
  {
    token: "--koten-raised",
    name: "白紙",
    romanized: "Raised",
    hex: "#FFFDF7",
    note: "Superficie de panel",
  },
  {
    token: "--koten-tint",
    name: "薄染",
    romanized: "Tint",
    hex: "#EFE9DB",
    note: "Cabeceras y cebra",
  },
  {
    token: "--koten-ink",
    name: "墨",
    romanized: "Sumi / Ink",
    hex: "#1C1A17",
    note: "Texto principal",
  },
  {
    token: "--koten-muted",
    name: "鈍色",
    romanized: "Muted",
    hex: "#5E574B",
    note: "Texto secundario",
  },
  {
    token: "--koten-faint",
    name: "薄墨",
    romanized: "Faint",
    hex: "#6F675A",
    note: "Metadatos y notas",
  },
  {
    token: "--koten-rule",
    name: "罫",
    romanized: "Rule",
    hex: "#D6CDBB",
    note: "Bordes y reglas",
  },
  {
    token: "--koten-rule-strong",
    name: "強罫",
    romanized: "Rule strong",
    hex: "#948A75",
    note: "Controles y reglas fuertes",
  },
  {
    token: "--koten-ai",
    name: "藍",
    romanized: "Ai",
    hex: "#1E3A5F",
    note: "Enlace, navegación, Daichō",
  },
  {
    token: "--koten-ai-hover",
    name: "藍・濃",
    romanized: "Ai hover",
    hex: "#162C49",
    note: "Hover de ai",
  },
  {
    token: "--koten-ai-tint",
    name: "藍・淡",
    romanized: "Ai tint",
    hex: "#E9EEF5",
    note: "Selección e información",
  },
  {
    token: "--koten-shu",
    name: "朱",
    romanized: "Shu",
    hex: "#C23B22",
    note: "Precio, urgencia, Chirashi",
  },
  {
    token: "--koten-shu-hover",
    name: "朱・濃",
    romanized: "Shu hover",
    hex: "#A02F1A",
    note: "Hover de shu",
  },
  {
    token: "--koten-shu-tint",
    name: "朱・淡",
    romanized: "Shu tint",
    hex: "#FBEAE5",
    note: "Error y rebaja",
  },
  {
    token: "--koten-kin",
    name: "金",
    romanized: "Kin",
    hex: "#845C0E",
    note: "Aviso y sellos",
  },
  {
    token: "--koten-matcha",
    name: "抹茶",
    romanized: "Matcha",
    hex: "#4F6B3A",
    note: "Éxito y stock",
  },
  {
    token: "--koten-sumi",
    name: "墨・濃",
    romanized: "Sumi deep",
    hex: "#24211D",
    note: "Footer y contraste fuerte",
  },
];

export const matsuriColors: readonly ColorToken[] = [
  {
    token: "--koten-accent-blue",
    name: "青",
    romanized: "Blue",
    hex: "#0B63B6",
    note: "Campañas",
  },
  {
    token: "--koten-accent-red",
    name: "赤",
    romanized: "Red",
    hex: "#C8102E",
    note: "Ofertas",
  },
  {
    token: "--koten-accent-orange",
    name: "橙",
    romanized: "Orange",
    hex: "#E07A1F",
    note: "Rebajas",
  },
  {
    token: "--koten-accent-yellow",
    name: "黄",
    romanized: "Yellow",
    hex: "#F2C200",
    note: "Solo con texto oscuro",
  },
  {
    token: "--koten-accent-green",
    name: "緑",
    romanized: "Green",
    hex: "#2E7D4F",
    note: "Stock",
  },
  {
    token: "--koten-accent-pink",
    name: "桃",
    romanized: "Pink",
    hex: "#D6336C",
    note: "Eventos",
  },
  {
    token: "--koten-accent-purple",
    name: "紫",
    romanized: "Purple",
    hex: "#6B4C9A",
    note: "Colecciones",
  },
];

export type SemanticRole = {
  token: string;
  utility: string;
  note: string;
};

export const semanticRoles: readonly SemanticRole[] = [
  { token: "--koten-bg", utility: "bg-paper", note: "Fondo de página" },
  { token: "--koten-bg-raised", utility: "bg-surface", note: "Panel o tarjeta" },
  { token: "--koten-bg-tint", utility: "bg-tint", note: "Cabecera o cebra" },
  { token: "--koten-fg", utility: "text-ink", note: "Texto principal" },
  { token: "--koten-fg-muted", utility: "text-muted", note: "Texto secundario" },
  { token: "--koten-fg-faint", utility: "text-faint", note: "Metadatos" },
  { token: "--koten-border", utility: "border-rule", note: "Borde de 1 px" },
  { token: "--koten-border-strong", utility: "border-rule-strong", note: "Borde de control" },
  { token: "--koten-primary", utility: "bg-primary", note: "Acción principal" },
  { token: "--koten-primary-hover", utility: "bg-primary-hover", note: "Hover principal" },
  { token: "--koten-primary-strong", utility: "border-primary-strong", note: "Borde de acción" },
  { token: "--koten-primary-fg", utility: "text-primary-foreground", note: "Texto sobre primario" },
  { token: "--koten-link", utility: "text-link", note: "Enlace" },
  { token: "--koten-danger", utility: "text-danger", note: "Error o cancelación" },
  { token: "--koten-success", utility: "text-success", note: "Éxito o stock" },
  { token: "--koten-warning", utility: "text-warning", note: "Aviso" },
  { token: "--koten-info", utility: "text-info", note: "Información" },
  { token: "--koten-sale", utility: "text-sale", note: "Rebaja (siempre shu)" },
  { token: "--koten-new", utility: "text-new", note: "Novedad (siempre ai)" },
  { token: "--koten-focus", utility: "outline-focus", note: "Anillo de foco" },
  { token: "--koten-selection", utility: "bg-selection", note: "Texto seleccionado" },
];

export const themes: readonly {
  id: ThemeId;
  label: string;
  jp: string;
  description: string;
}[] = [
  {
    id: "chirashi",
    label: "Chirashi",
    jp: "チラシ",
    description: "Storefront. Primario shu, acentos matsuri y densidad comercial.",
  },
  {
    id: "daicho",
    label: "Daichō",
    jp: "台帳",
    description: "ERP. Primario ai, densidad compacta y shu reservado para danger.",
  },
  {
    id: "kanso",
    label: "Kanso",
    jp: "簡素",
    description: "Catálogo. Primario ai, ritmo de lectura y acentos mínimos.",
  },
];

export const typeScale: readonly {
  token: string;
  utility: string;
  px: number;
  use: string;
}[] = [
  { token: "--koten-text-2xs", utility: "text-2xs", px: 11, use: "Notas y contadores no críticos" },
  {
    token: "--koten-text-xs",
    utility: "text-xs",
    px: 12,
    use: "Metadatos, captions, table headers",
  },
  { token: "--koten-text-sm", utility: "text-sm", px: 13, use: "Body, celdas y botones" },
  { token: "--koten-text-base", utility: "text-base", px: 14, use: "Body ERP y lectura" },
  { token: "--koten-text-lg", utility: "text-lg", px: 16, use: "Título de sección" },
  { token: "--koten-text-xl", utility: "text-xl", px: 20, use: "Título de página" },
  { token: "--koten-text-2xl", utility: "text-2xl", px: 24, use: "Título de producto" },
  { token: "--koten-text-3xl", utility: "text-3xl", px: 30, use: "Hero" },
  { token: "--koten-text-4xl", utility: "text-4xl", px: 38, use: "Display editorial" },
];

export const lineHeights: readonly { token: string; value: string; use: string }[] = [
  { token: "--koten-leading-tight", value: "1.2", use: "Titulares" },
  { token: "--koten-leading-normal", value: "1.5", use: "UI y tablas" },
  { token: "--koten-leading-relaxed", value: "1.7", use: "Body latino" },
  { token: "--koten-leading-ja", value: "1.75", use: "Body japonés" },
];

export const spacingScale = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64] as const;

export const radii: readonly { token: string; utility: string; px: number }[] = [
  { token: "--koten-radius-sm", utility: "rounded-sm", px: 2 },
  { token: "--koten-radius-md", utility: "rounded-md", px: 3 },
];

export const motionTokens: readonly { token: string; value: string; use: string }[] = [
  { token: "color / hover", value: "120 ms ease-out", use: "Cambios de color y borde" },
  { token: "overlay", value: "160 ms", use: "Menús, tooltips, popovers" },
  { token: "drawer", value: "200 ms", use: "Paneles laterales" },
  { token: "reduce", value: "0 ms", use: "prefers-reduced-motion" },
];

export const layoutWidths: readonly { token: string; px: number; use: string }[] = [
  { token: "--koten-layout-classic", px: 990, use: "Lectura clásica" },
  { token: "--koten-layout-default", px: 1200, use: "Catálogo y página" },
  { token: "--koten-layout-wide", px: 1440, use: "Storefront amplio" },
  { token: "--koten-page-px", px: 16, use: "Padding de página" },
];

export const densities: readonly {
  id: DensityId;
  label: string;
  context: string;
  values: readonly { token: string; value: string }[];
}[] = [
  {
    id: "compact",
    label: "Compacta",
    context: "ERP · tablas",
    values: [
      { token: "--koten-row-h", value: "28 px" },
      { token: "--koten-control-h", value: "28 px" },
      { token: "--koten-control-px", value: "8 px" },
      { token: "--koten-panel-p", value: "10 px" },
      { token: "--koten-gap", value: "8 px" },
    ],
  },
  {
    id: "default",
    label: "Default",
    context: "Catálogo · uso general",
    values: [
      { token: "--koten-row-h", value: "32 px" },
      { token: "--koten-control-h", value: "32 px" },
      { token: "--koten-control-px", value: "10 px" },
      { token: "--koten-panel-p", value: "12 px" },
      { token: "--koten-gap", value: "12 px" },
    ],
  },
  {
    id: "comfortable",
    label: "Amplia",
    context: "Storefront · lectura",
    values: [
      { token: "--koten-row-h", value: "36 px" },
      { token: "--koten-control-h", value: "38 px" },
      { token: "--koten-control-px", value: "14 px" },
      { token: "--koten-panel-p", value: "16 px" },
      { token: "--koten-gap", value: "16 px" },
    ],
  },
];
