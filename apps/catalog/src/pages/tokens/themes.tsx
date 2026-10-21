import { type KotenLocale, useKoten } from "@koten/ui";
import { PageHeader } from "../../components/docs";
import { Section, SubHeading, ThemeCard } from "../../components/specimen";
import { themes } from "../../data/tokens";

const copy = {
  es: {
    eyebrow: "Fundamentos · テーマ",
    title: "Temas",
    description:
      "Chirashi, Daichō, Kanso y Sumi comparten estructura y componentes. Cambian los valores semánticos: el primario, el foco, la selección y, en Sumi, el papel. El tema se declara una vez en el root.",
    meta: "data-theme · misma estructura, distintos valores",
    comparison: {
      title: "Comparación",
      meta: "Una pieza, tres registros",
      note: "Las tarjetas mantienen su tema para poder compararlas. El resto del catálogo cambia con el selector del encabezado.",
    },
    rules: {
      title: "Reglas",
      meta: "Lo que cambia y lo que no",
      heading: "Contrato del tema",
      items: [
        "El tema cambia --koten-primary, --koten-focus, --koten-selection y, en Sumi, papel y tinta.",
        "Los componentes usan roles (bg-primary), nunca nombres de color.",
        "Chirashi lleva shu al primario; Daichō y Kanso, ai; Sumi usa un ai claro.",
        "Los fondos sólidos de estado usan *-solid y solid-fg para mantener AA.",
        "El tema no se pasa por prop: se hereda de [data-theme].",
      ],
    },
  },
  ja: {
    eyebrow: "基礎 · テーマ",
    title: "テーマ",
    description:
      "Chirashi、Daichō、Kanso、Sumiは構造とコンポーネントを共有する。変わるのは意味的な値：主要色、フォーカス、選択、そしてSumiでは紙とインク。テーマはルートで一度だけ宣言する。",
    meta: "data-theme · 同じ構造、異なる値",
    comparison: {
      title: "比較",
      meta: "1つの部品、3つの様式",
      note: "カードは比較できるよう独自のテーマを保つ。カタログの残りはヘッダーのセレクタで変わる。",
    },
    rules: {
      title: "規則",
      meta: "変わるものと変わらないもの",
      heading: "テーマの契約",
      items: [
        "テーマは --koten-primary、--koten-focus、--koten-selection を変え、Sumiでは紙とインクも反転する。",
        "コンポーネントは役割（bg-primary）を使い、色名は使わない。",
        "Chirashiは朱、DaichōとKansoは藍、Sumiは明るい藍を主要色にする。",
        "状態のソリッド背景は *-solid、文字は solid-fg を使いAAを保つ。",
        "テーマはpropではなく [data-theme] から継承する。",
      ],
    },
  },
  en: {
    eyebrow: "Foundations · テーマ",
    title: "Themes",
    description:
      "Chirashi, Daichō, Kanso and Sumi share structure and components. What changes are semantic values: primary, focus, selection and, in Sumi, the paper. The theme is declared once on the root.",
    meta: "data-theme · same structure, different values",
    comparison: {
      title: "Comparison",
      meta: "One piece, three registers",
      note: "The cards keep their theme so they can be compared. The rest of the catalog changes with the header selector.",
    },
    rules: {
      title: "Rules",
      meta: "What changes and what does not",
      heading: "Theme contract",
      items: [
        "The theme changes --koten-primary, --koten-focus and --koten-selection.",
        "Paper, ink and rules stay stable.",
        "Components use roles (bg-primary), never color names.",
        "Chirashi maps shu to primary; Daichō and Kanso use ai.",
        "The theme is not passed as a prop: it is inherited from [data-theme].",
      ],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensThemesPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="三つの面"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="comparacion" title={t.comparison.title} jp="比較" meta={t.comparison.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">{t.comparison.note}</p>
        </Section>

        <Section id="reglas" title={t.rules.title} jp="規則" meta={t.rules.meta}>
          <SubHeading>{t.rules.heading}</SubHeading>
          <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule text-xs">
            {t.rules.items.map((rule) => (
              <li key={rule} className="flex min-h-[var(--koten-row-h)] items-center text-muted">
                {rule}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
