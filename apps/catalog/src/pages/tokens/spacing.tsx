import { type KotenLocale, useKoten } from "@koten/ui";
import { PageHeader } from "../../components/docs";
import { Section, SpacingScale, SubHeading } from "../../components/specimen";
import { spacingScale } from "../../data/tokens";

const copy = {
  es: {
    eyebrow: "Fundamentos · 余白",
    title: "Espaciado",
    description:
      "La densidad se construye con una escala corta y consistente. El espacio separa jerarquías; no rellena huecos.",
    meta: "Escala 2–64 px · padding, gap y separación de secciones",
    section: {
      title: "Escala",
      meta: "2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64",
      usage: "Uso",
    },
    rows: [
      ["Padding de página", "16 px · 12 compacto · 24 amplio"],
      ["Padding de panel", "10 / 12 / 16 según densidad"],
      ["Gap de grid", "8 / 12 / 16"],
      ["Separación de secciones", "24 / 32"],
    ],
  },
  ja: {
    eyebrow: "基礎 · 余白",
    title: "余白",
    description:
      "密度は短く一貫したスケールで作る。余白は階層を分けるものであり、空隙を埋めるものではない。",
    meta: "2〜64pxスケール · padding、gap、セクション間隔",
    section: {
      title: "スケール",
      meta: "2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64",
      usage: "用途",
    },
    rows: [
      ["ページ余白", "16px · コンパクト12 · ゆったり24"],
      ["パネル余白", "密度に応じて10 / 12 / 16"],
      ["グリッドのgap", "8 / 12 / 16"],
      ["セクション間隔", "24 / 32"],
    ],
  },
  en: {
    eyebrow: "Foundations · 余白",
    title: "Spacing",
    description:
      "Density is built with a short, consistent scale. Space separates hierarchy; it does not fill gaps.",
    meta: "2–64 px scale · padding, gap and section separation",
    section: {
      title: "Scale",
      meta: "2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64",
      usage: "Use",
    },
    rows: [
      ["Page padding", "16 px · compact 12 · comfortable 24"],
      ["Panel padding", "10 / 12 / 16 depending on density"],
      ["Grid gap", "8 / 12 / 16"],
      ["Section separation", "24 / 32"],
    ],
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensSpacingPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="余白"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="escala" title={t.section.title} jp="寸法" meta={t.section.meta}>
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <SpacingScale values={spacingScale} />
            <div>
              <SubHeading>{t.section.usage}</SubHeading>
              <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule text-xs">
                {t.rows.map(([label, value]) => (
                  <li
                    key={label}
                    className="flex min-h-[var(--koten-row-h)] flex-wrap items-center justify-between gap-x-3"
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-muted">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
