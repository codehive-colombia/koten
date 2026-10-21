import { type KotenLocale, useKoten } from "@koten/ui";
import { PageHeader } from "../../components/docs";
import { Section, ShapeSpecimen, SubHeading, ValueTable } from "../../components/specimen";
import { layoutWidths, motionTokens, radii } from "../../data/tokens";
import { pickLocalized } from "../../lib/i18n";

const copy = {
  es: {
    eyebrow: "Fundamentos · 形",
    title: "Forma y movimiento",
    description:
      "Marcos de 1 px, radios mínimos y una sola sombra reservada para overlays. El movimiento se limita a color y presencia; nada rebota.",
    meta: "Radios ≤ 3 px · única sombra · motion 120–200 ms",
    shape: {
      title: "Forma",
      meta: "Radios, bordes y sombra",
      note: "Bordes de 1 px; 3 px double solo para separar secciones mayores. La única sombra es la de overlays: los paneles no flotan.",
    },
    motion: {
      title: "Movimiento y layout",
      meta: "Duración y anchos",
      heading: "Movimiento",
      caption: "Duración de movimiento",
      headers: ["Token", "Valor", "Uso"] as [string, string, string],
    },
    layout: {
      heading: "Layout",
      caption: "Anchos de layout",
      headers: ["Token", "Valor", "Uso"] as [string, string, string],
    },
  },
  ja: {
    eyebrow: "基礎 · 形",
    title: "形と動き",
    description:
      "1pxの枠、最小限の角丸、オーバーレイ専用の唯一の影。動きは色と出現に限定し、何も跳ねない。",
    meta: "角丸 ≤ 3px · 唯一の影 · モーション120〜200ms",
    shape: {
      title: "形",
      meta: "角丸、境界、影",
      note: "境界は1px。3pxの二重線は大きなセクションの区切りにのみ使う。影はオーバーレイ専用で、パネルは浮かない。",
    },
    motion: {
      title: "動きとレイアウト",
      meta: "時間と幅",
      heading: "モーション",
      caption: "モーションの時間",
      headers: ["トークン", "値", "用途"] as [string, string, string],
    },
    layout: {
      heading: "レイアウト",
      caption: "レイアウト幅",
      headers: ["トークン", "値", "用途"] as [string, string, string],
    },
  },
  en: {
    eyebrow: "Foundations · 形",
    title: "Shape & motion",
    description:
      "1 px frames, minimal radii and a single shadow reserved for overlays. Motion is limited to color and presence; nothing bounces.",
    meta: "Radii ≤ 3 px · only shadow · motion 120–200 ms",
    shape: {
      title: "Shape",
      meta: "Radii, borders and shadow",
      note: "1 px borders; 3 px double only to separate major sections. The only shadow belongs to overlays: panels do not float.",
    },
    motion: {
      title: "Motion and layout",
      meta: "Duration and widths",
      heading: "Motion",
      caption: "Motion duration",
      headers: ["Token", "Value", "Use"] as [string, string, string],
    },
    layout: {
      heading: "Layout",
      caption: "Layout widths",
      headers: ["Token", "Value", "Use"] as [string, string, string],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensShapePage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="形"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="forma" title={t.shape.title} jp="形" meta={t.shape.meta}>
          <ShapeSpecimen radii={radii} />
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">{t.shape.note}</p>
        </Section>

        <Section id="movimiento" title={t.motion.title} jp="動き" meta={t.motion.meta}>
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-2">
            <div>
              <SubHeading>{t.motion.heading}</SubHeading>
              <div className="mt-[var(--koten-gap)]">
                <ValueTable
                  caption={t.motion.caption}
                  headers={t.motion.headers}
                  rows={motionTokens.map((item) => ({
                    token: item.token,
                    value: item.value,
                    use: pickLocalized(item.use, locale),
                  }))}
                />
              </div>
            </div>
            <div>
              <SubHeading>{t.layout.heading}</SubHeading>
              <div className="mt-[var(--koten-gap)]">
                <ValueTable
                  caption={t.layout.caption}
                  headers={t.layout.headers}
                  rows={layoutWidths.map((item) => ({
                    token: item.token,
                    value: `${item.px} px`,
                    use: pickLocalized(item.use, locale),
                  }))}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
