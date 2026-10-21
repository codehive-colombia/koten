import { type KotenLocale, useKoten } from "@koten/ui";
import { PageHeader } from "../../components/docs";
import {
  Section,
  SubHeading,
  TypeFamilies,
  TypeScale,
  ValueTable,
} from "../../components/specimen";
import { lineHeights, typeScale } from "../../data/tokens";
import { pickLocalized } from "../../lib/i18n";

const copy = {
  es: {
    eyebrow: "Fundamentos · 文字",
    title: "Tipografía",
    description:
      "La fuente del sistema es una decisión de rendimiento y cobertura CJK: no se cargan archivos de varios megabytes. La jerarquía se construye con tamaño, peso, color y posición.",
    meta: "Stack del sistema · 0 bytes de fuentes CJK",
    families: { title: "Familias", meta: "Sans, serif y mono" },
    scale: { title: "Escala", meta: "11 px solo para metadatos no críticos" },
    leading: {
      title: "Interlineado y reglas CJK",
      meta: "Latin y japonés",
      heading: "Interlineado",
      caption: "Tokens de interlineado",
      headers: ["Token", "Valor", "Uso"] as [string, string, string],
      cjk: "Reglas CJK",
      rules: [
        "line-break: strict en bloques de texto.",
        "font-feature-settings: palt solo en titulares.",
        "Sin text-transform como jerarquía: el japonés no tiene mayúsculas.",
        "Números tabulares en precios, cantidades y fechas.",
        'lang="ja" para interlineado y familia correctos.',
      ],
    },
  },
  ja: {
    eyebrow: "基礎 · 文字",
    title: "タイポグラフィ",
    description:
      "システムフォントは性能とCJKカバレッジのための判断である。数MBのフォントファイルは読み込まない。階層はサイズ、太さ、色、位置で作る。",
    meta: "システムスタック · CJKフォント0バイト",
    families: { title: "書体", meta: "Sans、serif、mono" },
    scale: { title: "スケール", meta: "11pxは非重要なメタ情報のみ" },
    leading: {
      title: "行間とCJKの規則",
      meta: "欧文と日本語",
      heading: "行間",
      caption: "行間トークン",
      headers: ["トークン", "値", "用途"] as [string, string, string],
      cjk: "CJKの規則",
      rules: [
        "テキストブロックでは line-break: strict。",
        "font-feature-settings: palt は見出しのみ。",
        "階層に text-transform は使わない。日本語に大文字はない。",
        "価格、数量、日付には等幅数字を使う。",
        '正しい行間と書体のために lang="ja" を付ける。',
      ],
    },
  },
  en: {
    eyebrow: "Foundations · 文字",
    title: "Typography",
    description:
      "The system font is a performance and CJK-coverage decision: no multi-megabyte font files are loaded. Hierarchy is built with size, weight, color and position.",
    meta: "System stack · 0 bytes of CJK fonts",
    families: { title: "Families", meta: "Sans, serif and mono" },
    scale: { title: "Scale", meta: "11 px only for non-critical metadata" },
    leading: {
      title: "Leading and CJK rules",
      meta: "Latin and Japanese",
      heading: "Leading",
      caption: "Leading tokens",
      headers: ["Token", "Value", "Use"] as [string, string, string],
      cjk: "CJK rules",
      rules: [
        "line-break: strict in text blocks.",
        "font-feature-settings: palt only in headlines.",
        "No text-transform as hierarchy: Japanese has no capitals.",
        "Tabular numerals in prices, quantities and dates.",
        'lang="ja" for correct leading and family.',
      ],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensTypographyPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="文字"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="familias" title={t.families.title} jp="書体" meta={t.families.meta}>
          <TypeFamilies />
        </Section>

        <Section id="escala" title={t.scale.title} jp="大きさ" meta={t.scale.meta}>
          <TypeScale items={typeScale} />
        </Section>

        <Section id="interlineado" title={t.leading.title} jp="行" meta={t.leading.meta}>
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <SubHeading>{t.leading.heading}</SubHeading>
              <div className="mt-[var(--koten-gap)]">
                <ValueTable
                  caption={t.leading.caption}
                  headers={t.leading.headers}
                  rows={lineHeights.map((item) => ({
                    token: item.token,
                    value: item.value,
                    use: pickLocalized(item.use, locale),
                  }))}
                />
              </div>
            </div>
            <div>
              <SubHeading>{t.leading.cjk}</SubHeading>
              <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule text-xs">
                {t.leading.rules.map((rule) => (
                  <li
                    key={rule}
                    className="flex min-h-[var(--koten-row-h)] items-center text-muted"
                  >
                    {rule}
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
