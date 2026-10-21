// biome-ignore-all lint/a11y/noNoninteractiveTabindex: scroll regions kept keyboard accessible (F4-002).
import { type KotenLocale, useKoten } from "@koten/ui";
import { PageHeader } from "../../components/docs";
import { DensityGrid, Section, SubHeading } from "../../components/specimen";
import { densities } from "../../data/tokens";
import { pickLocalized } from "../../lib/i18n";

const copy = {
  es: {
    eyebrow: "Fundamentos · 密度",
    title: "Densidad",
    description:
      "Una misma pieza en tres ritmos. La densidad se declara con data-density en el root y se lee desde variables CSS; no se pasa como prop a cada componente.",
    meta: "compact · default · comfortable",
    values: {
      title: "Valores",
      meta: "Variables por densidad",
      caption: "Valores de densidad por token",
    },
    demo: {
      title: "Demostración",
      meta: "La misma pieza en las tres densidades",
      heading: "Tabla y controles",
      note: "Cada muestra lleva su propio data-density para comparar. El resto del catálogo responde al selector del encabezado.",
    },
  },
  ja: {
    eyebrow: "基礎 · 密度",
    title: "密度",
    description:
      "同じ部品を3つのリズムで。密度はルートの data-density で宣言し、CSS変数から読む。各コンポーネントにpropとして渡さない。",
    meta: "compact · default · comfortable",
    values: {
      title: "値",
      meta: "密度ごとの変数",
      caption: "トークンごとの密度値",
    },
    demo: {
      title: "比較",
      meta: "3つの密度での同じ部品",
      heading: "表とコントロール",
      note: "各サンプルは比較用に独自の data-density を持つ。カタログの残りはヘッダーのセレクタに従う。",
    },
  },
  en: {
    eyebrow: "Foundations · 密度",
    title: "Density",
    description:
      "The same piece in three rhythms. Density is declared with data-density on the root and read from CSS variables; it is not passed as a prop to each component.",
    meta: "compact · default · comfortable",
    values: {
      title: "Values",
      meta: "Variables per density",
      caption: "Density values per token",
    },
    demo: {
      title: "Demo",
      meta: "The same piece in all three densities",
      heading: "Table and controls",
      note: "Each sample carries its own data-density for comparison. The rest of the catalog follows the header selector.",
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensDensityPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="密度"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="valores" title={t.values.title} jp="値" meta={t.values.meta}>
          <div tabIndex={0} className="overflow-x-auto border border-rule">
            <table className="w-full min-w-[36rem] border-collapse text-start">
              <caption className="sr-only">{t.values.caption}</caption>
              <thead>
                <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    Token
                  </th>
                  {densities.map((density) => (
                    <th
                      key={density.id}
                      scope="col"
                      className="px-[var(--koten-control-px)] font-semibold"
                    >
                      {pickLocalized(density.label, locale)}
                      <span className="block font-normal text-faint">{density.id}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {densities[0]?.values.map((value, index) => (
                  <tr key={value.token} className="h-[var(--koten-row-h)]">
                    <th
                      scope="row"
                      className="px-[var(--koten-control-px)] font-mono text-2xs font-normal text-muted"
                    >
                      {value.token}
                    </th>
                    {densities.map((density) => (
                      <td
                        key={density.id}
                        className="px-[var(--koten-control-px)] font-mono text-xs tabular-nums"
                      >
                        {density.values[index]?.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="demostracion" title={t.demo.title} jp="比較" meta={t.demo.meta}>
          <SubHeading>{t.demo.heading}</SubHeading>
          <div className="mt-[var(--koten-gap)]">
            <DensityGrid densities={densities} />
          </div>
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">{t.demo.note}</p>
        </Section>
      </div>
    </div>
  );
}
