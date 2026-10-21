import { Badge, type KotenLocale, useKoten } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const tones = ["neutral", "info", "success", "warning", "danger", "sale", "new"] as const;

const copy = {
  es: {
    eyebrow: "Componentes · 印",
    description:
      "Un metadato breve con tono y apariencia. El color refuerza el estado, pero el texto siempre comunica la información.",
    meta: "7 tonos × 3 apariencias · punto decorativo",
    appearances: { title: "Apariencias", meta: "soft · solid · outline" },
    tones: { title: "Tonos" },
    props: {
      title: "Props y código",
      meta: "API mínima",
      caption: "Props de Badge",
      notes: {
        tone: "sale siempre shu y new siempre ai, sin importar el tema.",
        appearance: "solid usa texto blanco sobre el tono.",
        dot: "Punto decorativo con aria-hidden; el texto sigue siendo la señal.",
      },
    },
    labels: {
      neutral: "Neutral",
      info: "Info",
      inStock: "En stock",
      lowStock: "Últimas unidades",
      cancelled: "Cancelado",
      sale: "Rebaja",
      new: "Nuevo",
    },
    code: `<Badge tone="success" dot>En stock</Badge>
<Badge tone="sale" appearance="solid">Rebaja</Badge>
<Badge tone="warning" appearance="outline">Últimas unidades</Badge>`,
    a11y: {
      title: "Accesibilidad",
      meta: "Estado y color",
      label: "Notas de accesibilidad de Badge",
      items: [
        "El estado nunca se comunica solo con color: siempre hay texto.",
        "El punto es decorativo y lleva aria-hidden; no duplica información.",
        "El texto usa 11 px solo como metadato; el mínimo de 12 px se reserva para body.",
        "Los tonos de texto cumplen AA sobre papel y superficie; el test de tokens lo verifica.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · 印",
    description:
      "トーンと外観を持つ短いメタデータです。色は状態を補強しますが、情報を伝えるのは常にテキストです。",
    meta: "7トーン × 3外観 · 装飾ドット",
    appearances: { title: "外観", meta: "soft · solid · outline" },
    tones: { title: "色調" },
    props: {
      title: "プロパティとコード",
      meta: "最小限のAPI",
      caption: "Badge のプロパティ",
      notes: {
        tone: "sale は常に朱、new は常に藍で、テーマには依存しません。",
        appearance: "solid はトーンの上に白文字を使用します。",
        dot: "aria-hidden 付きの装飾ドット。情報を示すのはテキストのままです。",
      },
    },
    labels: {
      neutral: "標準",
      info: "情報",
      inStock: "在庫あり",
      lowStock: "残りわずか",
      cancelled: "キャンセル",
      sale: "セール",
      new: "新着",
    },
    code: `<Badge tone="success" dot>在庫あり</Badge>
<Badge tone="sale" appearance="solid">セール</Badge>
<Badge tone="warning" appearance="outline">残りわずか</Badge>`,
    a11y: {
      title: "アクセシビリティ",
      meta: "状態と色",
      label: "Badge のアクセシビリティに関する注記",
      items: [
        "状態を色だけで伝えることはありません。必ずテキストを伴います。",
        "ドットは装飾で aria-hidden を持ち、情報を重複させません。",
        "テキストはメタデータとしてのみ 11 px を使い、12 px の最小値は本文用に確保しています。",
        "テキストのトーンは紙とサーフェスの上で AA を満たします。トークンのテストで検証しています。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 印",
    description:
      "A short metadata label with tone and appearance. Color reinforces state, but text always carries the information.",
    meta: "7 tones × 3 appearances · decorative dot",
    appearances: { title: "Appearances", meta: "soft · solid · outline" },
    tones: { title: "Tones" },
    props: {
      title: "Props and code",
      meta: "Minimal API",
      caption: "Badge props",
      notes: {
        tone: "sale is always shu and new is always ai, regardless of theme.",
        appearance: "solid uses white text on the tone.",
        dot: "Decorative dot with aria-hidden; the text remains the signal.",
      },
    },
    labels: {
      neutral: "Neutral",
      info: "Info",
      inStock: "In stock",
      lowStock: "Low stock",
      cancelled: "Cancelled",
      sale: "Sale",
      new: "New",
    },
    code: `<Badge tone="success" dot>In stock</Badge>
<Badge tone="sale" appearance="solid">Sale</Badge>
<Badge tone="warning" appearance="outline">Low stock</Badge>`,
    a11y: {
      title: "Accessibility",
      meta: "State and color",
      label: "Accessibility notes for Badge",
      items: [
        "State is never conveyed by color alone: there is always text.",
        "The dot is decorative and carries aria-hidden; it does not duplicate information.",
        "Text uses 11 px only as metadata; the 12 px minimum is reserved for body copy.",
        "Text tones meet AA on paper and surface; the token test verifies it.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const badgeProps = [
  {
    prop: "tone",
    type: "neutral | info | success | warning | danger | sale | new",
    default: "neutral",
  },
  { prop: "appearance", type: "soft | solid | outline", default: "soft" },
  { prop: "dot", type: "boolean", default: "false" },
] as const;

export function BadgePage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title="Badge"
        jp="印"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="apariencias" title={t.appearances.title} jp="見た目" meta={t.appearances.meta}>
          <div className="space-y-[var(--koten-gap)]">
            <Demo title="Soft">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge>{t.labels.neutral}</Badge>
                <Badge tone="info">{t.labels.info}</Badge>
                <Badge tone="success" dot>
                  {t.labels.inStock}
                </Badge>
                <Badge tone="warning" dot>
                  {t.labels.lowStock}
                </Badge>
                <Badge tone="danger">{t.labels.cancelled}</Badge>
                <Badge tone="sale">{t.labels.sale}</Badge>
                <Badge tone="new">{t.labels.new}</Badge>
              </div>
            </Demo>
            <Demo title="Solid">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge appearance="solid">{t.labels.neutral}</Badge>
                <Badge tone="info" appearance="solid">
                  {t.labels.info}
                </Badge>
                <Badge tone="success" appearance="solid" dot>
                  {t.labels.inStock}
                </Badge>
                <Badge tone="warning" appearance="solid" dot>
                  {t.labels.lowStock}
                </Badge>
                <Badge tone="danger" appearance="solid">
                  {t.labels.cancelled}
                </Badge>
                <Badge tone="sale" appearance="solid">
                  {t.labels.sale}
                </Badge>
                <Badge tone="new" appearance="solid">
                  {t.labels.new}
                </Badge>
              </div>
            </Demo>
            <Demo title="Outline">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge appearance="outline">{t.labels.neutral}</Badge>
                <Badge tone="info" appearance="outline">
                  {t.labels.info}
                </Badge>
                <Badge tone="success" appearance="outline" dot>
                  {t.labels.inStock}
                </Badge>
                <Badge tone="warning" appearance="outline" dot>
                  {t.labels.lowStock}
                </Badge>
                <Badge tone="danger" appearance="outline">
                  {t.labels.cancelled}
                </Badge>
                <Badge tone="sale" appearance="outline">
                  {t.labels.sale}
                </Badge>
                <Badge tone="new" appearance="outline">
                  {t.labels.new}
                </Badge>
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="tonos" title={t.tones.title} jp="色調" meta={tones.join(" · ")}>
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2 lg:grid-cols-4">
            {tones.map((tone) => (
              <div key={tone} className="border border-rule bg-surface p-[var(--koten-panel-p)]">
                <p className="text-2xs font-semibold text-faint">{tone}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone={tone}>Soft</Badge>
                  <Badge tone={tone} appearance="solid">
                    Solid
                  </Badge>
                  <Badge tone={tone} appearance="outline">
                    Outline
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable
            caption={t.props.caption}
            rows={badgeProps.map((row) => ({ ...row, note: t.props.notes[row.prop] }))}
          />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11y.title} jp="配慮" meta={t.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
