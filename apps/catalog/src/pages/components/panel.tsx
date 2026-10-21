import {
  Badge,
  Button,
  type KotenLocale,
  Panel,
  PanelActions,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  useKoten,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · 枠",
    description:
      "La unidad básica de composición: cabecera tintada, cuerpo con padding de densidad y pie con acciones. El panel reemplaza la tarjeta decorativa.",
    composition: { title: "Composición", meta: "Dos paneles reales" },
    orders: {
      title: "Pedidos de hoy",
      body: "Un panel con cabecera tintada, cuerpo con padding de densidad y acciones a la derecha.",
      pending: "Pendientes",
      shipped: "Enviados",
      viewAll: "Ver todos",
    },
    stock: {
      title: "Stock bajo",
      attention: "Atención",
      units: "Unidades",
      restock: "Reabastecer",
    },
    tones: { title: "Tonos", meta: "plain · tinted · accent" },
    tintedDemo: "Tono tinted · sin acciones",
    notice: {
      title: "Aviso del sistema",
      body: "El tono tinted usa el fondo de cabecera para separar del papel sin agregar sombra.",
    },
    props: {
      title: "Props y código",
      meta: "API de composición",
      caption: "Props de Panel",
      notes: {
        tone: "accent agrega barra izquierda primaria de 3 px.",
        flush: "Quita padding para tablas y listas a sangre.",
        titleLevel: "Elegir el nivel correcto según la jerarquía de la página.",
      },
    },
    code: `<Panel tone="accent">
  <PanelHeader>
    <PanelTitle as="h3">Pedidos de hoy</PanelTitle>
    <PanelActions><Badge tone="info" appearance="solid">12</Badge></PanelActions>
  </PanelHeader>
  <PanelBody flush>{tabla}</PanelBody>
  <PanelFooter><Button size="sm">Ver todos</Button></PanelFooter>
</Panel>`,
    a11y: {
      title: "Accesibilidad",
      meta: "Estructura y lectura",
      label: "Notas de accesibilidad de Panel",
      items: [
        "La cabecera usa <header> y el pie <footer>; el título mantiene nivel de heading.",
        "flush solo para contenido tabular; el resto conserva el padding de densidad.",
        "Las acciones van después del título en el DOM para mantener el orden de lectura.",
        "Un panel es una sección con borde; no reemplaza landmarks ni usa tablas como layout.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · 枠",
    description:
      "合成の基本単位です。色付きのヘッダー、密度に応じた余白を持つ本文、アクション付きのフッターで構成します。パネルは装飾的なカードに代わるものです。",
    composition: { title: "構成", meta: "実例2つ" },
    orders: {
      title: "本日の注文",
      body: "色付きのヘッダー、密度に応じた余白の本文、右側にアクションを置いたパネルです。",
      pending: "未処理",
      shipped: "発送済み",
      viewAll: "すべて見る",
    },
    stock: {
      title: "在庫僅少",
      attention: "注意",
      units: "数量",
      restock: "補充する",
    },
    tones: { title: "色調", meta: "plain · tinted · accent" },
    tintedDemo: "tinted トーン · アクションなし",
    notice: {
      title: "システム通知",
      body: "tinted トーンは影を足さず、ヘッダー背景で紙面から分離します。",
    },
    props: {
      title: "プロパティとコード",
      meta: "合成API",
      caption: "Panel のプロパティ",
      notes: {
        tone: "accent は左側に 3 px のプライマリバーを追加します。",
        flush: "表や全幅のリスト用に余白を取り除きます。",
        titleLevel: "ページの階層に合わせて適切なレベルを選びます。",
      },
    },
    code: `<Panel tone="accent">
  <PanelHeader>
    <PanelTitle as="h3">本日の注文</PanelTitle>
    <PanelActions><Badge tone="info" appearance="solid">12</Badge></PanelActions>
  </PanelHeader>
  <PanelBody flush>{tabla}</PanelBody>
  <PanelFooter><Button size="sm">すべて見る</Button></PanelFooter>
</Panel>`,
    a11y: {
      title: "アクセシビリティ",
      meta: "構造と読み上げ",
      label: "Panel のアクセシビリティに関する注記",
      items: [
        "ヘッダーは <header>、フッターは <footer> を使い、タイトルは見出しレベルを保ちます。",
        "flush は表形式の内容だけに使い、それ以外は密度の余白を保ちます。",
        "アクションは読み上げ順を保つため、DOM 上でタイトルの後に置きます。",
        "パネルは枠線付きのセクションです。ランドマークの代わりにはならず、表をレイアウトに使いません。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 枠",
    description:
      "The basic unit of composition: a tinted header, a body with density padding and a footer with actions. The panel replaces the decorative card.",
    composition: { title: "Composition", meta: "Two real panels" },
    orders: {
      title: "Today's orders",
      body: "A panel with a tinted header, density padding in the body and actions on the right.",
      pending: "Pending",
      shipped: "Shipped",
      viewAll: "View all",
    },
    stock: {
      title: "Low stock",
      attention: "Attention",
      units: "Units",
      restock: "Restock",
    },
    tones: { title: "Tones", meta: "plain · tinted · accent" },
    tintedDemo: "Tinted tone · no actions",
    notice: {
      title: "System notice",
      body: "The tinted tone uses the header background to separate from the paper without adding a shadow.",
    },
    props: {
      title: "Props and code",
      meta: "Composition API",
      caption: "Panel props",
      notes: {
        tone: "accent adds a 3 px primary bar on the left.",
        flush: "Removes padding for full-bleed tables and lists.",
        titleLevel: "Choose the right level for the page hierarchy.",
      },
    },
    code: `<Panel tone="accent">
  <PanelHeader>
    <PanelTitle as="h3">Today's orders</PanelTitle>
    <PanelActions><Badge tone="info" appearance="solid">12</Badge></PanelActions>
  </PanelHeader>
  <PanelBody flush>{tabla}</PanelBody>
  <PanelFooter><Button size="sm">View all</Button></PanelFooter>
</Panel>`,
    a11y: {
      title: "Accessibility",
      meta: "Structure and reading",
      label: "Accessibility notes for Panel",
      items: [
        "The header uses <header> and the footer <footer>; the title keeps its heading level.",
        "flush is only for tabular content; everything else keeps the density padding.",
        "Actions come after the title in the DOM to keep the reading order.",
        "A panel is a bordered section; it does not replace landmarks and never uses tables for layout.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const panelProps = [
  { prop: "tone", type: "plain | tinted | accent", default: "plain", noteKey: "tone" },
  { prop: "PanelBody flush", type: "boolean", default: "false", noteKey: "flush" },
  { prop: "PanelTitle as", type: "h2 | h3 | h4", default: "h2", noteKey: "titleLevel" },
] as const;

export function PanelPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title="Panel"
        jp="枠"
        description={t.description}
        meta="header · body · footer · flush"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="composicion" title={t.composition.title} jp="構成" meta={t.composition.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Panel>
              <PanelHeader>
                <PanelTitle as="h3">{t.orders.title}</PanelTitle>
                <PanelActions>
                  <Badge tone="info" appearance="solid">
                    12
                  </Badge>
                </PanelActions>
              </PanelHeader>
              <PanelBody>
                <p className="text-xs text-muted">{t.orders.body}</p>
                <dl className="mt-[var(--koten-gap)] grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-2xs">
                  <dt className="text-faint">{t.orders.pending}</dt>
                  <dd className="text-end font-semibold tabular-nums">4</dd>
                  <dt className="text-faint">{t.orders.shipped}</dt>
                  <dd className="text-end font-semibold tabular-nums">8</dd>
                </dl>
              </PanelBody>
              <PanelFooter>
                <Button size="sm" variant="outline">
                  {t.orders.viewAll}
                </Button>
              </PanelFooter>
            </Panel>

            <Panel tone="accent">
              <PanelHeader>
                <PanelTitle as="h3">{t.stock.title}</PanelTitle>
                <PanelActions>
                  <Badge tone="warning" dot>
                    {t.stock.attention}
                  </Badge>
                </PanelActions>
              </PanelHeader>
              <PanelBody flush>
                <table className="w-full border-collapse text-start text-xs">
                  <thead>
                    <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                      <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                        SKU
                      </th>
                      <th
                        scope="col"
                        className="px-[var(--koten-control-px)] text-end font-semibold"
                      >
                        {t.stock.units}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {[
                      ["HK-001", "3"],
                      ["HK-014", "5"],
                      ["HK-022", "7"],
                    ].map(([sku, units]) => (
                      <tr key={sku} className="h-[var(--koten-row-h)]">
                        <th
                          scope="row"
                          className="px-[var(--koten-control-px)] font-mono text-2xs font-normal"
                        >
                          {sku}
                        </th>
                        <td className="px-[var(--koten-control-px)] text-end tabular-nums text-warning">
                          {units}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PanelBody>
              <PanelFooter>
                <Button size="sm" variant="primary">
                  {t.stock.restock}
                </Button>
              </PanelFooter>
            </Panel>
          </div>
        </Section>

        <Section id="tonos" title={t.tones.title} jp="色調" meta={t.tones.meta}>
          <Demo title={t.tintedDemo} className="bg-tint p-[var(--koten-panel-p)]">
            <Panel tone="tinted">
              <PanelHeader>
                <PanelTitle as="h3">{t.notice.title}</PanelTitle>
              </PanelHeader>
              <PanelBody>
                <p className="text-xs text-muted">{t.notice.body}</p>
              </PanelBody>
            </Panel>
          </Demo>
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable
            caption={t.props.caption}
            rows={panelProps.map(({ noteKey, ...row }) => ({
              ...row,
              note: t.props.notes[noteKey],
            }))}
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
