import { type KotenLocale, useKoten } from "@koten/ui";
import { IndexCard, PageHeader } from "../../components/docs";

const copy = {
  es: {
    eyebrow: "Fundamentos · 基礎",
    title: "Tokens",
    description:
      "La gramática del sistema vive en variables CSS. Los componentes usan roles semánticos, nunca nombres de color; el tema y la densidad cambian valores, no estructura.",
    meta: "7 páginas · contrato visual de los tres registros",
    sections: [
      {
        to: "/tokens/color",
        title: "Color",
        jp: "色",
        description: "Papel, tinta, ai, shu y acentos matsuri; roles semánticos por tema.",
      },
      {
        to: "/tokens/typography",
        title: "Tipografía",
        jp: "文字",
        description: "Familias del sistema, escala, interlineado y reglas CJK.",
      },
      {
        to: "/tokens/spacing",
        title: "Espaciado",
        jp: "余白",
        description: "Escala de 2 a 64 px y su relación con la densidad.",
      },
      {
        to: "/tokens/shape",
        title: "Forma y movimiento",
        jp: "形",
        description: "Radios, bordes, la única sombra permitida, motion y layout.",
      },
      {
        to: "/tokens/density",
        title: "Densidad",
        jp: "密度",
        description: "Compacta, default y amplia; la misma pieza con tres ritmos.",
      },
      {
        to: "/tokens/themes",
        title: "Temas",
        jp: "テーマ",
        description: "Chirashi, Daichō y Kanso sobre la misma estructura.",
      },
      {
        to: "/tokens/format",
        title: "Idioma y formato",
        jp: "言語と書式",
        description: "Fechas, moneda, números y labels con Intl en ES/JA/EN.",
      },
    ],
    note: "El selector de tema y densidad del encabezado afecta este catálogo completo. Las muestras fijas de comparación (tarjetas de tema y demos de densidad) mantienen su valor para poder contrastarlas.",
  },
  ja: {
    eyebrow: "基礎 · 基礎",
    title: "トークン",
    description:
      "システムの文法はCSS変数にある。コンポーネントは色名ではなく意味的役割を使う。テーマと密度は値を変え、構造は変えない。",
    meta: "7ページ · 3つの様式の視覚的契約",
    sections: [
      {
        to: "/tokens/color",
        title: "色",
        jp: "色",
        description: "紙、墨、藍、朱、祭の差し色。テーマごとの意味的役割。",
      },
      {
        to: "/tokens/typography",
        title: "タイポグラフィ",
        jp: "文字",
        description: "システムフォント、スケール、行間、CJKの規則。",
      },
      {
        to: "/tokens/spacing",
        title: "余白",
        jp: "余白",
        description: "2〜64pxのスケールと密度との関係。",
      },
      {
        to: "/tokens/shape",
        title: "形と動き",
        jp: "形",
        description: "角丸、境界、唯一の影、モーション、レイアウト。",
      },
      {
        to: "/tokens/density",
        title: "密度",
        jp: "密度",
        description: "コンパクト、標準、ゆったり。同じ部品を3つのリズムで。",
      },
      {
        to: "/tokens/themes",
        title: "テーマ",
        jp: "テーマ",
        description: "同じ構造に載るChirashi、Daichō、Kanso。",
      },
      {
        to: "/tokens/format",
        title: "言語と書式",
        jp: "言語と書式",
        description: "ES/JA/ENでのIntlによる日付、通貨、数値、ラベル。",
      },
    ],
    note: "ヘッダーのテーマと密度のセレクタはカタログ全体に影響する。比較用の固定サンプル（テーマカードと密度デモ）は対比できるよう値を保つ。",
  },
  en: {
    eyebrow: "Foundations · 基礎",
    title: "Tokens",
    description:
      "The grammar of the system lives in CSS variables. Components use semantic roles, never color names; theme and density change values, not structure.",
    meta: "7 pages · visual contract of the three registers",
    sections: [
      {
        to: "/tokens/color",
        title: "Color",
        jp: "色",
        description: "Paper, ink, ai, shu and matsuri accents; semantic roles per theme.",
      },
      {
        to: "/tokens/typography",
        title: "Typography",
        jp: "文字",
        description: "System families, scale, leading and CJK rules.",
      },
      {
        to: "/tokens/spacing",
        title: "Spacing",
        jp: "余白",
        description: "A 2–64 px scale and its relationship with density.",
      },
      {
        to: "/tokens/shape",
        title: "Shape & motion",
        jp: "形",
        description: "Radii, borders, the only allowed shadow, motion and layout.",
      },
      {
        to: "/tokens/density",
        title: "Density",
        jp: "密度",
        description: "Compact, default and comfortable; the same piece in three rhythms.",
      },
      {
        to: "/tokens/themes",
        title: "Themes",
        jp: "テーマ",
        description: "Chirashi, Daichō and Kanso on the same structure.",
      },
      {
        to: "/tokens/format",
        title: "Language & format",
        jp: "言語と書式",
        description: "Dates, currency, numbers and labels with Intl in ES/JA/EN.",
      },
    ],
    note: "The theme and density selector in the header affects this whole catalog. Fixed comparison samples (theme cards and density demos) keep their value so they can be contrasted.",
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensIndexPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="基礎"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {t.sections.map((section) => (
          <IndexCard key={section.to} {...section} />
        ))}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border-l-2 border-primary bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        {t.note}
      </div>
    </div>
  );
}
