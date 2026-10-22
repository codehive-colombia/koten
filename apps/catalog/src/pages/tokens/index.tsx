import { type KotenLocale, useKoten } from "@koten/ui";
import { Link } from "react-router";
import { PageHeader } from "../../components/docs";
import {
  type FoundationKind,
  FoundationPreview,
  FoundationsSpecimen,
} from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Fundamentos · 基礎",
    title: "Fundamentos",
    description:
      "El contrato visual de Koten UI en una sola página: color, tipografía, espacio, forma, densidad, temas y formato. Todo vive en variables CSS y responde al tema y a la densidad del encabezado.",
    meta: "7 páginas · 4 temas · 3 densidades · ES/JA/EN",
    sections: [
      {
        to: "/tokens/color",
        title: "Color",
        jp: "色",
        kind: "color" as FoundationKind,
        description: "Papel, tinta y acentos; roles semánticos que cambian con el tema.",
      },
      {
        to: "/tokens/typography",
        title: "Tipografía",
        jp: "文字",
        kind: "type" as FoundationKind,
        description: "Tres familias del sistema, una escala corta y reglas para japonés.",
      },
      {
        to: "/tokens/spacing",
        title: "Espaciado",
        jp: "余白",
        kind: "spacing" as FoundationKind,
        description: "Una escala de 2 a 64 px que se ajusta con la densidad.",
      },
      {
        to: "/tokens/shape",
        title: "Forma y movimiento",
        jp: "形",
        kind: "shape" as FoundationKind,
        description: "Marcos de 1 px, radios mínimos, una sola sombra y motion discreto.",
      },
      {
        to: "/tokens/density",
        title: "Densidad",
        jp: "密度",
        kind: "density" as FoundationKind,
        description: "Compacta, default y amplia: la misma pieza con tres ritmos.",
      },
      {
        to: "/tokens/themes",
        title: "Temas",
        jp: "テーマ",
        kind: "themes" as FoundationKind,
        description: "Chirashi, Daichō, Kanso y Sumi cambian valores, no estructura.",
      },
      {
        to: "/tokens/format",
        title: "Idioma y formato",
        jp: "言語と書式",
        kind: "format" as FoundationKind,
        description: "Fechas, moneda, números y labels; cualquier locale y diccionarios editables.",
      },
    ],
    start: {
      title: "Empieza por aquí.",
      body: "Cambia el tema y la densidad en el encabezado y recorre los fundamentos. Cuando tengas el tono, copia una primitiva y compón una pantalla real.",
      links: "Empezar|Ver componentes",
    },
  },
  ja: {
    eyebrow: "基礎 · 概要",
    title: "基礎",
    description:
      "Koten UIの視覚的契約を1ページに：色、タイポグラフィ、余白、形、密度、テーマ、書式。すべてCSS変数にあり、ヘッダーのテーマと密度に反応する。",
    meta: "7ページ · 4テーマ · 3密度 · ES/JA/EN",
    sections: [
      {
        to: "/tokens/color",
        title: "色",
        jp: "色",
        kind: "color" as FoundationKind,
        description: "紙、墨、差し色。テーマで変わる意味的役割。",
      },
      {
        to: "/tokens/typography",
        title: "タイポグラフィ",
        jp: "文字",
        kind: "type" as FoundationKind,
        description: "3つのシステム書体、短いスケール、日本語の規則。",
      },
      {
        to: "/tokens/spacing",
        title: "余白",
        jp: "余白",
        kind: "spacing" as FoundationKind,
        description: "密度に合わせて伸び縮みする2〜64pxのスケール。",
      },
      {
        to: "/tokens/shape",
        title: "形と動き",
        jp: "形",
        kind: "shape" as FoundationKind,
        description: "1pxの枠、最小限の角丸、唯一の影、控えめな動き。",
      },
      {
        to: "/tokens/density",
        title: "密度",
        jp: "密度",
        kind: "density" as FoundationKind,
        description: "コンパクト・標準・ゆったり。同じ部品を3つのリズムで。",
      },
      {
        to: "/tokens/themes",
        title: "テーマ",
        jp: "テーマ",
        kind: "themes" as FoundationKind,
        description: "Chirashi、Daichō、Kanso、Sumiは構造ではなく値を変える。",
      },
      {
        to: "/tokens/format",
        title: "言語と書式",
        jp: "言語と書式",
        kind: "format" as FoundationKind,
        description: "Intlによる日付、通貨、数値、ラベル。任意のロケールと編集可能な辞書。",
      },
    ],
    start: {
      title: "ここから始める。",
      body: "ヘッダーでテーマと密度を変えながら基礎を見て回る。トーンが決まったら、プリミティブをコピーして実画面を組み立てる。",
      links: "はじめる|部品を見る",
    },
  },
  en: {
    eyebrow: "Foundations · 基礎",
    title: "Foundations",
    description:
      "The visual contract of Koten UI on a single page: color, typography, space, shape, density, themes and format. Everything lives in CSS variables and follows the header theme and density.",
    meta: "7 pages · 4 themes · 3 densities · ES/JA/EN",
    sections: [
      {
        to: "/tokens/color",
        title: "Color",
        jp: "色",
        kind: "color" as FoundationKind,
        description: "Paper, ink and accents; semantic roles that change with the theme.",
      },
      {
        to: "/tokens/typography",
        title: "Typography",
        jp: "文字",
        kind: "type" as FoundationKind,
        description: "Three system families, a short scale and rules for Japanese.",
      },
      {
        to: "/tokens/spacing",
        title: "Spacing",
        jp: "余白",
        kind: "spacing" as FoundationKind,
        description: "A 2–64 px scale that stretches with the density.",
      },
      {
        to: "/tokens/shape",
        title: "Shape & motion",
        jp: "形",
        kind: "shape" as FoundationKind,
        description: "1 px frames, minimal radii, a single shadow and quiet motion.",
      },
      {
        to: "/tokens/density",
        title: "Density",
        jp: "密度",
        kind: "density" as FoundationKind,
        description: "Compact, default and comfortable: the same piece in three rhythms.",
      },
      {
        to: "/tokens/themes",
        title: "Themes",
        jp: "テーマ",
        kind: "themes" as FoundationKind,
        description: "Chirashi, Daichō, Kanso and Sumi change values, not structure.",
      },
      {
        to: "/tokens/format",
        title: "Language & format",
        jp: "言語と書式",
        kind: "format" as FoundationKind,
        description: "Dates, currency, numbers and labels; any locale and editable dictionaries.",
      },
    ],
    start: {
      title: "Start here.",
      body: "Change the theme and density in the header and walk the foundations. Once the tone is set, copy a primitive and compose a real screen.",
      links: "Getting started|Browse components",
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensIndexPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [startLabel, componentsLabel] = t.start.links.split("|");

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="基礎"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <FoundationsSpecimen />
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {t.sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="group flex h-full flex-col border border-rule bg-surface text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1"
          >
            <span className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
              <span className="text-xs font-semibold">
                {section.title}
                <span className="ms-2 font-normal text-faint">{section.jp}</span>
              </span>
              <span aria-hidden="true" className="text-primary">
                →
              </span>
            </span>
            <span className="flex flex-1 flex-col p-[var(--koten-panel-p)]">
              <span className="flex min-h-14 items-center">
                <FoundationPreview kind={section.kind} />
              </span>
              <span className="mt-2 block text-xs leading-relaxed text-muted">
                {section.description}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border-s-2 border-primary bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        <strong className="text-ink">{t.start.title}</strong> {t.start.body}{" "}
        <Link to="/start" className="text-link underline underline-offset-2">
          {startLabel}
        </Link>
        {" · "}
        <Link to="/components" className="text-link underline underline-offset-2">
          {componentsLabel}
        </Link>
      </div>
    </div>
  );
}
