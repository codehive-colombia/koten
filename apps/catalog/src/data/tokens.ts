import type { Localized } from "../lib/i18n";

export type ThemeId = "chirashi" | "daicho" | "kanso";

export type DensityId = "compact" | "default" | "comfortable";

export type ColorToken = {
  token: string;
  name: string;
  romanized: string;
  hex: string;
  note: Localized;
};

export const primitiveColors: readonly ColorToken[] = [
  {
    token: "--koten-kinari",
    name: "生成り",
    romanized: "Kinari",
    hex: "#F5F0E4",
    note: { es: "Papel de página", ja: "ページの紙", en: "Page paper" },
  },
  {
    token: "--koten-raised",
    name: "白紙",
    romanized: "Raised",
    hex: "#FFFDF7",
    note: { es: "Superficie de panel", ja: "パネル面", en: "Panel surface" },
  },
  {
    token: "--koten-tint",
    name: "薄染",
    romanized: "Tint",
    hex: "#EFE9DB",
    note: { es: "Cabeceras y cebra", ja: "見出しと縞", en: "Headers and zebra" },
  },
  {
    token: "--koten-ink",
    name: "墨",
    romanized: "Sumi / Ink",
    hex: "#1C1A17",
    note: { es: "Texto principal", ja: "本文テキスト", en: "Primary text" },
  },
  {
    token: "--koten-muted",
    name: "鈍色",
    romanized: "Muted",
    hex: "#5E574B",
    note: { es: "Texto secundario", ja: "補助テキスト", en: "Secondary text" },
  },
  {
    token: "--koten-faint",
    name: "薄墨",
    romanized: "Faint",
    hex: "#6F675A",
    note: { es: "Metadatos y notas", ja: "メタ情報と注記", en: "Metadata and notes" },
  },
  {
    token: "--koten-rule",
    name: "罫",
    romanized: "Rule",
    hex: "#D6CDBB",
    note: { es: "Bordes y reglas", ja: "罫線と境界", en: "Borders and rules" },
  },
  {
    token: "--koten-rule-strong",
    name: "強罫",
    romanized: "Rule strong",
    hex: "#948A75",
    note: {
      es: "Controles y reglas fuertes",
      ja: "操作部と強罫",
      en: "Controls and strong rules",
    },
  },
  {
    token: "--koten-ai",
    name: "藍",
    romanized: "Ai",
    hex: "#1E3A5F",
    note: {
      es: "Enlace, navegación, Daichō",
      ja: "リンク・導線・台帳",
      en: "Links, navigation, Daichō",
    },
  },
  {
    token: "--koten-ai-hover",
    name: "藍・濃",
    romanized: "Ai hover",
    hex: "#162C49",
    note: { es: "Hover de ai", ja: "藍のホバー", en: "Ai hover" },
  },
  {
    token: "--koten-ai-tint",
    name: "藍・淡",
    romanized: "Ai tint",
    hex: "#E9EEF5",
    note: { es: "Selección e información", ja: "選択と情報", en: "Selection and information" },
  },
  {
    token: "--koten-shu",
    name: "朱",
    romanized: "Shu",
    hex: "#C23B22",
    note: {
      es: "Precio, urgencia, Chirashi",
      ja: "価格・緊急・チラシ",
      en: "Price, urgency, Chirashi",
    },
  },
  {
    token: "--koten-shu-hover",
    name: "朱・濃",
    romanized: "Shu hover",
    hex: "#A02F1A",
    note: { es: "Hover de shu", ja: "朱のホバー", en: "Shu hover" },
  },
  {
    token: "--koten-shu-tint",
    name: "朱・淡",
    romanized: "Shu tint",
    hex: "#FBEAE5",
    note: { es: "Error y rebaja", ja: "エラーと値下げ", en: "Error and markdown" },
  },
  {
    token: "--koten-kin",
    name: "金",
    romanized: "Kin",
    hex: "#845C0E",
    note: { es: "Aviso y sellos", ja: "注意と印章", en: "Warnings and seals" },
  },
  {
    token: "--koten-matcha",
    name: "抹茶",
    romanized: "Matcha",
    hex: "#4F6B3A",
    note: { es: "Éxito y stock", ja: "成功と在庫", en: "Success and stock" },
  },
  {
    token: "--koten-sumi",
    name: "墨・濃",
    romanized: "Sumi deep",
    hex: "#24211D",
    note: {
      es: "Footer y contraste fuerte",
      ja: "フッターと強コントラスト",
      en: "Footer and strong contrast",
    },
  },
];

export const matsuriColors: readonly ColorToken[] = [
  {
    token: "--koten-accent-blue",
    name: "青",
    romanized: "Blue",
    hex: "#0B63B6",
    note: { es: "Campañas", ja: "キャンペーン", en: "Campaigns" },
  },
  {
    token: "--koten-accent-red",
    name: "赤",
    romanized: "Red",
    hex: "#C8102E",
    note: { es: "Ofertas", ja: "特売", en: "Offers" },
  },
  {
    token: "--koten-accent-orange",
    name: "橙",
    romanized: "Orange",
    hex: "#E07A1F",
    note: { es: "Rebajas", ja: "セール", en: "Sales" },
  },
  {
    token: "--koten-accent-yellow",
    name: "黄",
    romanized: "Yellow",
    hex: "#F2C200",
    note: { es: "Solo con texto oscuro", ja: "濃色テキスト専用", en: "Dark text only" },
  },
  {
    token: "--koten-accent-green",
    name: "緑",
    romanized: "Green",
    hex: "#2E7D4F",
    note: { es: "Stock", ja: "在庫", en: "Stock" },
  },
  {
    token: "--koten-accent-pink",
    name: "桃",
    romanized: "Pink",
    hex: "#D6336C",
    note: { es: "Eventos", ja: "イベント", en: "Events" },
  },
  {
    token: "--koten-accent-purple",
    name: "紫",
    romanized: "Purple",
    hex: "#6B4C9A",
    note: { es: "Colecciones", ja: "コレクション", en: "Collections" },
  },
];

export type SemanticRole = {
  token: string;
  utility: string;
  note: Localized;
};

export const semanticRoles: readonly SemanticRole[] = [
  {
    token: "--koten-bg",
    utility: "bg-paper",
    note: { es: "Fondo de página", ja: "ページ背景", en: "Page background" },
  },
  {
    token: "--koten-bg-raised",
    utility: "bg-surface",
    note: { es: "Panel o tarjeta", ja: "パネル・カード", en: "Panel or card" },
  },
  {
    token: "--koten-bg-tint",
    utility: "bg-tint",
    note: { es: "Cabecera o cebra", ja: "見出し・縞", en: "Header or zebra" },
  },
  {
    token: "--koten-fg",
    utility: "text-ink",
    note: { es: "Texto principal", ja: "本文テキスト", en: "Primary text" },
  },
  {
    token: "--koten-fg-muted",
    utility: "text-muted",
    note: { es: "Texto secundario", ja: "補助テキスト", en: "Secondary text" },
  },
  {
    token: "--koten-fg-faint",
    utility: "text-faint",
    note: { es: "Metadatos", ja: "メタ情報", en: "Metadata" },
  },
  {
    token: "--koten-border",
    utility: "border-rule",
    note: { es: "Borde de 1 px", ja: "1px境界", en: "1 px border" },
  },
  {
    token: "--koten-border-strong",
    utility: "border-rule-strong",
    note: { es: "Borde de control", ja: "操作部の境界", en: "Control border" },
  },
  {
    token: "--koten-primary",
    utility: "bg-primary",
    note: { es: "Acción principal", ja: "主要アクション", en: "Primary action" },
  },
  {
    token: "--koten-primary-hover",
    utility: "bg-primary-hover",
    note: { es: "Hover principal", ja: "主要ホバー", en: "Primary hover" },
  },
  {
    token: "--koten-primary-strong",
    utility: "border-primary-strong",
    note: { es: "Borde de acción", ja: "アクション境界", en: "Action border" },
  },
  {
    token: "--koten-primary-fg",
    utility: "text-primary-foreground",
    note: { es: "Texto sobre primario", ja: "主要色上の文字", en: "Text on primary" },
  },
  {
    token: "--koten-link",
    utility: "text-link",
    note: { es: "Enlace", ja: "リンク", en: "Link" },
  },
  {
    token: "--koten-danger",
    utility: "text-danger",
    note: { es: "Error o cancelación", ja: "エラー・取消", en: "Error or cancellation" },
  },
  {
    token: "--koten-success",
    utility: "text-success",
    note: { es: "Éxito o stock", ja: "成功・在庫", en: "Success or stock" },
  },
  {
    token: "--koten-warning",
    utility: "text-warning",
    note: { es: "Aviso", ja: "注意", en: "Warning" },
  },
  {
    token: "--koten-info",
    utility: "text-info",
    note: { es: "Información", ja: "情報", en: "Information" },
  },
  {
    token: "--koten-sale",
    utility: "text-sale",
    note: { es: "Rebaja (siempre shu)", ja: "値下げ（常に朱）", en: "Markdown (always shu)" },
  },
  {
    token: "--koten-new",
    utility: "text-new",
    note: { es: "Novedad (siempre ai)", ja: "新着（常に藍）", en: "New (always ai)" },
  },
  {
    token: "--koten-focus",
    utility: "outline-focus",
    note: { es: "Anillo de foco", ja: "フォーカスリング", en: "Focus ring" },
  },
  {
    token: "--koten-selection",
    utility: "bg-selection",
    note: { es: "Texto seleccionado", ja: "選択テキスト", en: "Selected text" },
  },
];

export const themes: readonly {
  id: ThemeId;
  label: string;
  jp: string;
  description: Localized;
}[] = [
  {
    id: "chirashi",
    label: "Chirashi",
    jp: "チラシ",
    description: {
      es: "Storefront. Primario shu, acentos matsuri y densidad comercial.",
      ja: "店舗。主要色は朱、祭の差し色、商業的な密度。",
      en: "Storefront. Shu primary, matsuri accents and commercial density.",
    },
  },
  {
    id: "daicho",
    label: "Daichō",
    jp: "台帳",
    description: {
      es: "ERP. Primario ai, densidad compacta y shu reservado para danger.",
      ja: "台帳。主要色は藍、コンパクト密度、朱は危険表示のみ。",
      en: "ERP. Ai primary, compact density and shu reserved for danger.",
    },
  },
  {
    id: "kanso",
    label: "Kanso",
    jp: "簡素",
    description: {
      es: "Catálogo. Primario ai, ritmo de lectura y acentos mínimos.",
      ja: "カタログ。主要色は藍、読みやすいリズム、最小限の差し色。",
      en: "Catalog. Ai primary, reading rhythm and minimal accents.",
    },
  },
];

export const typeScale: readonly {
  token: string;
  utility: string;
  px: number;
  use: Localized;
}[] = [
  {
    token: "--koten-text-2xs",
    utility: "text-2xs",
    px: 11,
    use: {
      es: "Notas y contadores no críticos",
      ja: "注記と非重要カウンタ",
      en: "Non-critical notes and counters",
    },
  },
  {
    token: "--koten-text-xs",
    utility: "text-xs",
    px: 12,
    use: {
      es: "Metadatos, captions, table headers",
      ja: "メタ情報・キャプション・表見出し",
      en: "Metadata, captions, table headers",
    },
  },
  {
    token: "--koten-text-sm",
    utility: "text-sm",
    px: 13,
    use: { es: "Body, celdas y botones", ja: "本文・セル・ボタン", en: "Body, cells and buttons" },
  },
  {
    token: "--koten-text-base",
    utility: "text-base",
    px: 14,
    use: { es: "Body ERP y lectura", ja: "ERP本文と読書", en: "ERP body and reading" },
  },
  {
    token: "--koten-text-lg",
    utility: "text-lg",
    px: 16,
    use: { es: "Título de sección", ja: "セクション見出し", en: "Section title" },
  },
  {
    token: "--koten-text-xl",
    utility: "text-xl",
    px: 20,
    use: { es: "Título de página", ja: "ページ見出し", en: "Page title" },
  },
  {
    token: "--koten-text-2xl",
    utility: "text-2xl",
    px: 24,
    use: { es: "Título de producto", ja: "商品見出し", en: "Product title" },
  },
  {
    token: "--koten-text-3xl",
    utility: "text-3xl",
    px: 30,
    use: { es: "Hero", ja: "ヒーロー", en: "Hero" },
  },
  {
    token: "--koten-text-4xl",
    utility: "text-4xl",
    px: 38,
    use: { es: "Display editorial", ja: "エディトリアル表示", en: "Editorial display" },
  },
];

export const lineHeights: readonly { token: string; value: string; use: Localized }[] = [
  {
    token: "--koten-leading-tight",
    value: "1.2",
    use: { es: "Titulares", ja: "見出し", en: "Headlines" },
  },
  {
    token: "--koten-leading-normal",
    value: "1.5",
    use: { es: "UI y tablas", ja: "UIと表", en: "UI and tables" },
  },
  {
    token: "--koten-leading-relaxed",
    value: "1.7",
    use: { es: "Body latino", ja: "欧文本文", en: "Latin body" },
  },
  {
    token: "--koten-leading-ja",
    value: "1.75",
    use: { es: "Body japonés", ja: "日本語本文", en: "Japanese body" },
  },
];

export const spacingScale = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64] as const;

export const radii: readonly { token: string; utility: string; px: number }[] = [
  { token: "--koten-radius-sm", utility: "rounded-sm", px: 2 },
  { token: "--koten-radius-md", utility: "rounded-md", px: 3 },
];

export const motionTokens: readonly { token: string; value: string; use: Localized }[] = [
  {
    token: "color / hover",
    value: "120 ms ease-out",
    use: { es: "Cambios de color y borde", ja: "色と境界の変化", en: "Color and border changes" },
  },
  {
    token: "overlay",
    value: "160 ms",
    use: {
      es: "Menús, tooltips, popovers",
      ja: "メニュー・ツールチップ・ポップオーバー",
      en: "Menus, tooltips, popovers",
    },
  },
  {
    token: "drawer",
    value: "200 ms",
    use: { es: "Paneles laterales", ja: "サイドパネル", en: "Side panels" },
  },
  {
    token: "reduce",
    value: "0 ms",
    use: {
      es: "prefers-reduced-motion",
      ja: "prefers-reduced-motion",
      en: "prefers-reduced-motion",
    },
  },
];

export const layoutWidths: readonly { token: string; px: number; use: Localized }[] = [
  {
    token: "--koten-layout-classic",
    px: 990,
    use: { es: "Lectura clásica", ja: "クラシックな読書幅", en: "Classic reading" },
  },
  {
    token: "--koten-layout-default",
    px: 1200,
    use: { es: "Catálogo y página", ja: "カタログとページ", en: "Catalog and page" },
  },
  {
    token: "--koten-layout-wide",
    px: 1440,
    use: { es: "Storefront amplio", ja: "ワイドな店舗", en: "Wide storefront" },
  },
  {
    token: "--koten-page-px",
    px: 16,
    use: { es: "Padding de página", ja: "ページ余白", en: "Page padding" },
  },
];

export const densities: readonly {
  id: DensityId;
  label: Localized;
  context: Localized;
  values: readonly { token: string; value: string }[];
}[] = [
  {
    id: "compact",
    label: { es: "Compacta", ja: "コンパクト", en: "Compact" },
    context: { es: "ERP · tablas", ja: "ERP・表", en: "ERP · tables" },
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
    label: { es: "Default", ja: "標準", en: "Default" },
    context: { es: "Catálogo · uso general", ja: "カタログ・一般", en: "Catalog · general use" },
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
    label: { es: "Amplia", ja: "ゆったり", en: "Comfortable" },
    context: { es: "Storefront · lectura", ja: "店舗・読書", en: "Storefront · reading" },
    values: [
      { token: "--koten-row-h", value: "36 px" },
      { token: "--koten-control-h", value: "38 px" },
      { token: "--koten-control-px", value: "14 px" },
      { token: "--koten-panel-p", value: "16 px" },
      { token: "--koten-gap", value: "16 px" },
    ],
  },
];
