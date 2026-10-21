import type { KotenLocale } from "@koten/ui";

export type Localized = Record<KotenLocale, string>;

export type CatalogNavItem = {
  path: string;
  label: Localized;
  external?: boolean;
};

export type CatalogNavGroup = {
  id: "foundations" | "components" | "patterns" | "demos";
  label: Localized;
  items: CatalogNavItem[];
};

export const navGroups: readonly CatalogNavGroup[] = [
  {
    id: "foundations",
    label: { es: "Fundamentos", ja: "基礎", en: "Foundations" },
    items: [
      { path: "/", label: { es: "Inicio", ja: "ホーム", en: "Home" } },
      { path: "/tokens", label: { es: "Tokens", ja: "トークン", en: "Tokens" } },
      { path: "/tokens/color", label: { es: "Color", ja: "色", en: "Color" } },
      {
        path: "/tokens/typography",
        label: { es: "Tipografía", ja: "文字", en: "Typography" },
      },
      { path: "/tokens/spacing", label: { es: "Espaciado", ja: "余白", en: "Spacing" } },
      {
        path: "/tokens/shape",
        label: { es: "Forma y movimiento", ja: "形と動き", en: "Shape & motion" },
      },
      { path: "/tokens/density", label: { es: "Densidad", ja: "密度", en: "Density" } },
      { path: "/tokens/themes", label: { es: "Temas", ja: "テーマ", en: "Themes" } },
      {
        path: "/tokens/format",
        label: { es: "Idioma y formato", ja: "言語と書式", en: "Language & format" },
      },
    ],
  },
  {
    id: "components",
    label: { es: "Componentes", ja: "部品", en: "Components" },
    items: [
      { path: "/components", label: { es: "Todos", ja: "一覧", en: "All" } },
      {
        path: "/components/button",
        label: { es: "Button", ja: "Button · ボタン", en: "Button" },
      },
      { path: "/components/panel", label: { es: "Panel", ja: "Panel · 枠", en: "Panel" } },
      { path: "/components/badge", label: { es: "Badge", ja: "Badge · 印", en: "Badge" } },
      {
        path: "/components/forms",
        label: { es: "Formularios", ja: "フォーム", en: "Forms" },
      },
      {
        path: "/components/inputs",
        label: { es: "Inputs avanzados", ja: "入力部品", en: "Advanced inputs" },
      },
      {
        path: "/components/surfaces",
        label: { es: "Superficies", ja: "装飾", en: "Surfaces" },
      },
      {
        path: "/components/feedback",
        label: { es: "Feedback", ja: "通知", en: "Feedback" },
      },
      {
        path: "/components/navigation",
        label: { es: "Navegación", ja: "導線", en: "Navigation" },
      },
      {
        path: "/components/overlays",
        label: { es: "Overlays", ja: "重なり", en: "Overlays" },
      },
      {
        path: "/components/data",
        label: { es: "Datos", ja: "データ", en: "Data" },
      },
      {
        path: "/components/controls",
        label: { es: "Controles", ja: "操作", en: "Controls" },
      },
    ],
  },
  {
    id: "patterns",
    label: { es: "Patrones", ja: "応用", en: "Patterns" },
    items: [
      { path: "/patterns", label: { es: "Todos", ja: "一覧", en: "All" } },
      {
        path: "/patterns/storefront",
        label: { es: "Storefront", ja: "店舗パターン", en: "Storefront" },
      },
      {
        path: "/patterns/erp",
        label: { es: "ERP", ja: "台帳パターン", en: "ERP" },
      },
    ],
  },
  {
    id: "demos",
    label: { es: "Demos", ja: "デモ", en: "Demos" },
    items: [
      {
        path: "http://localhost:5174",
        label: { es: "Storefront", ja: "店舗", en: "Storefront" },
        external: true,
      },
      {
        path: "http://localhost:5175",
        label: { es: "ERP", ja: "台帳", en: "ERP" },
        external: true,
      },
    ],
  },
];

export const internalNavItems = navGroups
  .filter((group) => group.id !== "demos")
  .flatMap((group) => group.items);

export function navLabel(item: CatalogNavItem, locale: KotenLocale): string {
  return item.label[locale];
}

export function pageLabel(path: string, locale: KotenLocale): string | undefined {
  return internalNavItems.find((item) => item.path === path)?.label[locale];
}

export const densityLabels: Record<"compact" | "default" | "comfortable", Localized> = {
  compact: { es: "Compacta", ja: "コンパクト", en: "Compact" },
  default: { es: "Default", ja: "標準", en: "Default" },
  comfortable: { es: "Amplia", ja: "ゆったり", en: "Comfortable" },
};

export type ShellLabels = {
  skipToContent: string;
  navLabel: string;
  menu: string;
  theme: string;
  density: string;
  language: string;
  phase: string;
  viewState: string;
  docsLanguage: string;
  preview: string;
  openDemo: string;
  notFound: string;
  notFoundBody: string;
  backHome: string;
  pagerLabel: string;
  catalog: string;
};

export const shellLabels: Record<KotenLocale, ShellLabels> = {
  es: {
    skipToContent: "Saltar al contenido",
    navLabel: "Navegación del catálogo",
    menu: "Menú",
    theme: "Tema",
    density: "Densidad",
    language: "Idioma",
    phase: "Fase 4 · Cierre del POC",
    viewState: "Estado en URL",
    docsLanguage:
      "Documentación completa en ES/JA/EN · interfaz, cuerpo y ejemplos cambian de idioma",
    preview: "Vista previa",
    openDemo: "Abrir demo",
    notFound: "Página no encontrada",
    notFoundBody: "La ruta no existe o todavía no está documentada.",
    backHome: "Volver al inicio",
    pagerLabel: "Paginación del catálogo",
    catalog: "Catálogo",
  },
  ja: {
    skipToContent: "本文へ移動",
    navLabel: "カタログ案内",
    menu: "メニュー",
    theme: "テーマ",
    density: "密度",
    language: "言語",
    phase: "フェーズ4 · デモ仕上げ",
    viewState: "URLに状態を保存",
    docsLanguage: "ドキュメントはES/JA/ENで完備 · UI・本文・例が言語に追従します",
    preview: "プレビュー",
    openDemo: "デモを開く",
    notFound: "ページが見つかりません",
    notFoundBody: "このルートは存在しないか、まだドキュメント化されていません。",
    backHome: "ホームへ戻る",
    pagerLabel: "カタログのページ送り",
    catalog: "カタログ",
  },
  en: {
    skipToContent: "Skip to content",
    navLabel: "Catalog navigation",
    menu: "Menu",
    theme: "Theme",
    density: "Density",
    language: "Language",
    phase: "Phase 4 · POC wrap-up",
    viewState: "State in URL",
    docsLanguage: "Full documentation in ES/JA/EN · UI, body and examples follow the language",
    preview: "Preview",
    openDemo: "Open demo",
    notFound: "Page not found",
    notFoundBody: "This route does not exist or is not documented yet.",
    backHome: "Back to home",
    pagerLabel: "Catalog pagination",
    catalog: "Catalog",
  },
};
