import type { KotenLocale } from "@koten/ui";
import { site } from "../lib/site";
import { blockDocs, primitiveDocs } from "./docs";

export type Localized = Record<KotenLocale, string>;

export type CatalogNavItem = {
  path: string;
  label: Localized;
  external?: boolean;
};

export type CatalogNavGroup = {
  id: "foundations" | "components" | "blocks" | "demos";
  label: Localized;
  items: CatalogNavItem[];
};

const sameLabel = (label: string): Localized => ({ es: label, ja: label, en: label });

export const navGroups: readonly CatalogNavGroup[] = [
  {
    id: "foundations",
    label: { es: "Fundamentos", ja: "基礎", en: "Foundations" },
    items: [
      { path: "/", label: { es: "Inicio", ja: "ホーム", en: "Home" } },
      {
        path: "/start",
        label: { es: "Empezar", ja: "はじめかた", en: "Getting started" },
      },
      {
        path: "/ai",
        label: { es: "IA y agentes", ja: "AIとエージェント", en: "AI & agents" },
      },
      {
        path: "/tokens",
        label: { es: "Fundamentos", ja: "基礎", en: "Foundations" },
      },
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
        path: "/theme",
        label: { es: "Diseñar un tema", ja: "テーマを設計", en: "Theme designer" },
      },
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
      ...primitiveDocs.map((doc) => ({
        path: `/components/${doc.slug}`,
        label: sameLabel(doc.name),
      })),
    ],
  },
  {
    id: "blocks",
    label: { es: "Bloques", ja: "応用", en: "Blocks" },
    items: [
      { path: "/blocks", label: { es: "Todos", ja: "一覧", en: "All" } },
      {
        path: "/blocks/storefront",
        label: { es: "Storefront", ja: "ストアフロント", en: "Storefront" },
      },
      {
        path: "/blocks/erp",
        label: { es: "ERP", ja: "ERP", en: "ERP" },
      },
    ],
  },
  {
    id: "demos",
    label: { es: "Demos", ja: "デモ", en: "Demos" },
    items: [
      {
        path: site.storefront,
        label: { es: "Storefront", ja: "店舗", en: "Storefront" },
        external: true,
      },
      {
        path: site.erp,
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
  if (path === "/components") {
    return { es: "Componentes", ja: "コンポーネント", en: "Components" }[locale];
  }

  if (path === "/blocks") {
    return { es: "Bloques", ja: "ブロック", en: "Blocks" }[locale];
  }

  const item = internalNavItems.find((entry) => entry.path === path);

  if (item) {
    return item.label[locale];
  }

  const primitive = primitiveDocs.find((doc) => path === `/components/${doc.slug}`);

  if (primitive) {
    return primitive.name;
  }

  const block = blockDocs.find((doc) => path === `/blocks/${doc.category}/${doc.slug}`);

  return block?.name;
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
  settings: string;
  settingsDescription: string;
  settingsHint: string;
  tagline: string;
  docsLanguage: string;
  preview: string;
  openDemo: string;
  notFound: string;
  notFoundBody: string;
  backHome: string;
  pagerLabel: string;
  catalog: string;
  runner: string;
};

export const shellLabels: Record<KotenLocale, ShellLabels> = {
  es: {
    skipToContent: "Saltar al contenido",
    navLabel: "Navegación del catálogo",
    menu: "Menú",
    theme: "Tema",
    density: "Densidad",
    language: "Idioma",
    settings: "Configuración",
    settingsDescription: "Tema, densidad e idioma del catálogo.",
    settingsHint: "Se guarda en la URL y se comparte con el enlace.",
    tagline: "46 componentes · 20 bloques · 4 temas · 3 densidades",
    docsLanguage:
      "Documentación completa en ES/JA/EN · interfaz, cuerpo y ejemplos cambian de idioma",
    preview: "Vista previa",
    openDemo: "Abrir demo",
    notFound: "Página no encontrada",
    notFoundBody: "La ruta no existe o todavía no está documentada.",
    backHome: "Volver al inicio",
    pagerLabel: "Paginación del catálogo",
    catalog: "Catálogo",
    runner: "Ejecutar con",
  },
  ja: {
    skipToContent: "本文へ移動",
    navLabel: "カタログ案内",
    menu: "メニュー",
    theme: "テーマ",
    density: "密度",
    language: "言語",
    settings: "設定",
    settingsDescription: "カタログのテーマ、密度、言語。",
    settingsHint: "URL に保存され、リンクで共有されます。",
    tagline: "46 コンポーネント · 20 ブロック · 4 テーマ · 3 密度",
    docsLanguage: "ドキュメントはES/JA/ENで完備 · UI・本文・例が言語に追従します",
    preview: "プレビュー",
    openDemo: "デモを開く",
    notFound: "ページが見つかりません",
    notFoundBody: "このルートは存在しないか、まだドキュメント化されていません。",
    backHome: "ホームへ戻る",
    pagerLabel: "カタログのページ送り",
    catalog: "カタログ",
    runner: "実行",
  },
  en: {
    skipToContent: "Skip to content",
    navLabel: "Catalog navigation",
    menu: "Menu",
    theme: "Theme",
    density: "Density",
    language: "Language",
    settings: "Settings",
    settingsDescription: "Theme, density and language for the catalog.",
    settingsHint: "Saved in the URL and shared with the link.",
    tagline: "46 components · 20 blocks · 4 themes · 3 densities",
    docsLanguage: "Full documentation in ES/JA/EN · UI, body and examples follow the language",
    preview: "Preview",
    openDemo: "Open demo",
    notFound: "Page not found",
    notFoundBody: "This route does not exist or is not documented yet.",
    backHome: "Back to home",
    pagerLabel: "Catalog pagination",
    catalog: "Catalog",
    runner: "Run with",
  },
};
