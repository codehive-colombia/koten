import {
  Accordion,
  Breadcrumb,
  Link as KotenLink,
  type KotenLocale,
  Pagination,
  Tabs,
  useKoten,
} from "@koten/ui";
import { useState } from "react";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    header: {
      eyebrow: "Componentes · 導線",
      title: "Navegación",
      description:
        "Link, Breadcrumb, Pagination, Tabs y Accordion ordenan el recorrido sin esconder contexto. El estado activo y la posición actual siempre son explícitos.",
    },
    link: {
      meta: "Interno, externo y subrayado",
      demoTitle: "Enlaces",
      internal: "Tokens internos",
      external: "Ejemplo externo",
      noIcon: "Sin icono externo",
    },
    breadcrumb: {
      meta: "Posición actual",
      demoTitle: "Pedido KURA",
      label: "Migas de pan",
      home: "Inicio",
      orders: "Pedidos",
    },
    pagination: {
      meta: "Compacta y accesible",
      demoTitle: "12 páginas",
      previous: "Anterior",
      next: "Siguiente",
      nav: "Paginación de pedidos",
      pageLabel: (value: number) => `Página ${value}`,
      current: "Página actual:",
    },
    tabs: {
      meta: "Cambio de vista contextual",
      label: "Vista del pedido",
      summaryLabel: "Resumen",
      summaryContent:
        "Cliente KURA Distribución, 12 líneas y entrega estimada para el 24 de octubre.",
      linesLabel: "Líneas",
      linesContent: "HIKARI K-1 × 3, KURA Cable × 2, Kit de limpieza × 1.",
      historyLabel: "Historial",
      historyContent: "Creado el 21/10, preparado el 22/10, enviado el 23/10.",
    },
    accordion: {
      meta: "Contenido secundario",
      shippingTitle: "Envío y entrega",
      shippingContent:
        "Salida desde Tokio en 24 horas. Entrega estándar en 3–5 días hábiles; express en 24–48 horas.",
      returnsTitle: "Devoluciones",
      returnsContent:
        "Aceptamos devoluciones dentro de 30 días con el embalaje original y la factura.",
      warrantyTitle: "Garantía",
      warrantyContent: "Cobertura de 24 meses para defectos de fabricación.",
    },
    props: {
      title: "Props y código",
      meta: "Cinco piezas",
      caption: "Props de navegación",
      rows: [
        {
          prop: "Link external",
          type: "boolean",
          default: "auto",
          note: "Detecta http(s) y agrega target/rel e icono.",
        },
        {
          prop: "Breadcrumb items",
          type: "{ label, href?, current? }[]",
          default: "—",
          note: "El último item es current si no se indica.",
        },
        {
          prop: "Pagination page / pageCount",
          type: "number",
          default: "—",
          note: "Controlada; el consumidor actualiza page.",
        },
        {
          prop: "Tabs items",
          type: "{ value, label, content }[]",
          default: "—",
          note: "Base UI gestiona tablist y paneles.",
        },
        {
          prop: "Accordion multiple",
          type: "boolean",
          default: "false",
          note: "Permite abrir más de una sección.",
        },
      ],
    },
    code: `<KotenLink href="https://example.com">Ejemplo</KotenLink>

<Breadcrumb label="Migas" items={breadcrumbItems} />

<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousLabel="Anterior"
  nextLabel="Siguiente"
  navLabel="Paginación"
/>

<Tabs label="Vista" items={tabs} />`,
    a11y: {
      title: "Accesibilidad",
      meta: "Contexto y teclado",
      label: "Notas de accesibilidad de navegación",
      items: [
        "Breadcrumb usa nav + ol y marca el último item con aria-current=page.",
        "Pagination anuncia la página actual y deshabilita los extremos.",
        "Tabs expone tablist/tab/tabpanel y navegación por flechas desde Base UI.",
        "Accordion expone aria-expanded y conserva el foco en el trigger.",
        "Link externo agrega target y rel; el icono es decorativo.",
      ],
    },
  },
  ja: {
    header: {
      eyebrow: "コンポーネント · 導線",
      title: "ナビゲーション",
      description:
        "Link、Breadcrumb、Pagination、Tabs、Accordion は文脈を隠さずに導線を整えます。アクティブ状態と現在位置は常に明示します。",
    },
    link: {
      meta: "内部・外部・下線",
      demoTitle: "リンク",
      internal: "内部トークン",
      external: "外部の例",
      noIcon: "外部アイコンなし",
    },
    breadcrumb: {
      meta: "現在位置",
      demoTitle: "注文 KURA",
      label: "パンくず",
      home: "ホーム",
      orders: "注文",
    },
    pagination: {
      meta: "コンパクトでアクセシブル",
      demoTitle: "12ページ",
      previous: "前へ",
      next: "次へ",
      nav: "注文のページ送り",
      pageLabel: (value: number) => `${value}ページ`,
      current: "現在のページ:",
    },
    tabs: {
      meta: "文脈に沿った表示切替",
      label: "注文の表示",
      summaryLabel: "概要",
      summaryContent: "顧客 KURA 流通、12行、納期は10月24日予定。",
      linesLabel: "明細",
      linesContent: "HIKARI K-1 × 3、KURA ケーブル × 2、クリーニングキット × 1。",
      historyLabel: "履歴",
      historyContent: "10/21 作成、10/22 準備完了、10/23 出荷。",
    },
    accordion: {
      meta: "補足コンテンツ",
      shippingTitle: "配送と納品",
      shippingContent: "東京から24時間以内に出荷。標準配送は3〜5営業日、速達は24〜48時間です。",
      returnsTitle: "返品",
      returnsContent: "未開封の梱包と請求書があれば、30日以内の返品を受け付けます。",
      warrantyTitle: "保証",
      warrantyContent: "製造上の不具合に対して24か月の保証を提供します。",
    },
    props: {
      title: "プロパティとコード",
      meta: "5つの部品",
      caption: "ナビゲーションのプロパティ",
      rows: [
        {
          prop: "Link external",
          type: "boolean",
          default: "auto",
          note: "http(s) を検出し、target/rel とアイコンを追加します。",
        },
        {
          prop: "Breadcrumb items",
          type: "{ label, href?, current? }[]",
          default: "—",
          note: "指定がなければ最後の項目が current になります。",
        },
        {
          prop: "Pagination page / pageCount",
          type: "number",
          default: "—",
          note: "制御コンポーネント。利用側が page を更新します。",
        },
        {
          prop: "Tabs items",
          type: "{ value, label, content }[]",
          default: "—",
          note: "tablist とパネルは Base UI が管理します。",
        },
        {
          prop: "Accordion multiple",
          type: "boolean",
          default: "false",
          note: "複数のセクションを同時に開けます。",
        },
      ],
    },
    code: `<KotenLink href="https://example.com">例</KotenLink>

<Breadcrumb label="パンくず" items={breadcrumbItems} />

<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousLabel="前へ"
  nextLabel="次へ"
  navLabel="ページ送り"
/>

<Tabs label="表示" items={tabs} />`,
    a11y: {
      title: "アクセシビリティ",
      meta: "文脈とキーボード",
      label: "ナビゲーションのアクセシビリティ",
      items: [
        "Breadcrumb は nav と ol を使い、最後の項目に aria-current=page を付けます。",
        "Pagination は現在のページを通知し、両端を無効化します。",
        "Tabs は Base UI により tablist/tab/tabpanel と矢印キー操作を提供します。",
        "Accordion は aria-expanded を公開し、フォーカスをトリガーに保ちます。",
        "外部リンクは target と rel を追加し、アイコンは装飾です。",
      ],
    },
  },
  en: {
    header: {
      eyebrow: "Components · 導線",
      title: "Navigation",
      description:
        "Link, Breadcrumb, Pagination, Tabs and Accordion organize the journey without hiding context. The active state and current position are always explicit.",
    },
    link: {
      meta: "Internal, external and underlined",
      demoTitle: "Links",
      internal: "Internal tokens",
      external: "External example",
      noIcon: "No external icon",
    },
    breadcrumb: {
      meta: "Current position",
      demoTitle: "Order KURA",
      label: "Breadcrumb",
      home: "Home",
      orders: "Orders",
    },
    pagination: {
      meta: "Compact and accessible",
      demoTitle: "12 pages",
      previous: "Previous",
      next: "Next",
      nav: "Order pagination",
      pageLabel: (value: number) => `Page ${value}`,
      current: "Current page:",
    },
    tabs: {
      meta: "Contextual view switching",
      label: "Order view",
      summaryLabel: "Summary",
      summaryContent: "Customer KURA Distribution, 12 lines and estimated delivery on October 24.",
      linesLabel: "Lines",
      linesContent: "HIKARI K-1 × 3, KURA Cable × 2, Cleaning kit × 1.",
      historyLabel: "History",
      historyContent: "Created 10/21, prepared 10/22, shipped 10/23.",
    },
    accordion: {
      meta: "Secondary content",
      shippingTitle: "Shipping and delivery",
      shippingContent:
        "Ships from Tokyo within 24 hours. Standard delivery in 3–5 business days; express in 24–48 hours.",
      returnsTitle: "Returns",
      returnsContent:
        "We accept returns within 30 days with the original packaging and the invoice.",
      warrantyTitle: "Warranty",
      warrantyContent: "24-month coverage for manufacturing defects.",
    },
    props: {
      title: "Props and code",
      meta: "Five pieces",
      caption: "Navigation props",
      rows: [
        {
          prop: "Link external",
          type: "boolean",
          default: "auto",
          note: "Detects http(s) and adds target/rel and an icon.",
        },
        {
          prop: "Breadcrumb items",
          type: "{ label, href?, current? }[]",
          default: "—",
          note: "The last item is current when not specified.",
        },
        {
          prop: "Pagination page / pageCount",
          type: "number",
          default: "—",
          note: "Controlled; the consumer updates page.",
        },
        {
          prop: "Tabs items",
          type: "{ value, label, content }[]",
          default: "—",
          note: "Base UI manages the tablist and panels.",
        },
        {
          prop: "Accordion multiple",
          type: "boolean",
          default: "false",
          note: "Allows more than one section to be open.",
        },
      ],
    },
    code: `<KotenLink href="https://example.com">Example</KotenLink>

<Breadcrumb label="Breadcrumb" items={breadcrumbItems} />

<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousLabel="Previous"
  nextLabel="Next"
  navLabel="Pagination"
/>

<Tabs label="View" items={tabs} />`,
    a11y: {
      title: "Accessibility",
      meta: "Context and keyboard",
      label: "Navigation accessibility notes",
      items: [
        "Breadcrumb uses nav + ol and marks the last item with aria-current=page.",
        "Pagination announces the current page and disables the ends.",
        "Tabs exposes tablist/tab/tabpanel and arrow-key navigation from Base UI.",
        "Accordion exposes aria-expanded and keeps focus on the trigger.",
        "An external link adds target and rel; the icon is decorative.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function NavigationPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [page, setPage] = useState(1);

  return (
    <div>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        jp="導線"
        description={t.header.description}
        meta="link · breadcrumb · pagination · tabs · accordion"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="link" title="Link" jp="リンク" meta={t.link.meta}>
          <Demo title={t.link.demoTitle}>
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)] text-xs">
              <KotenLink href="/tokens">{t.link.internal}</KotenLink>
              <KotenLink href="https://example.com">{t.link.external}</KotenLink>
              <KotenLink href="#link" showExternalIcon={false}>
                {t.link.noIcon}
              </KotenLink>
            </div>
          </Demo>
        </Section>

        <Section id="breadcrumb" title="Breadcrumb" jp="パンくず" meta={t.breadcrumb.meta}>
          <Demo title={t.breadcrumb.demoTitle}>
            <Breadcrumb
              label={t.breadcrumb.label}
              items={[
                { label: t.breadcrumb.home, href: "/" },
                { label: t.breadcrumb.orders, href: "/components/navigation" },
                { label: "KURA-0142" },
              ]}
            />
          </Demo>
        </Section>

        <Section id="pagination" title="Pagination" jp="ページ送り" meta={t.pagination.meta}>
          <Demo title={t.pagination.demoTitle}>
            <div className="grid gap-[var(--koten-gap)]">
              <Pagination
                page={page}
                pageCount={12}
                onPageChange={setPage}
                previousLabel={t.pagination.previous}
                nextLabel={t.pagination.next}
                navLabel={t.pagination.nav}
                pageLabel={t.pagination.pageLabel}
              />
              <p className="text-2xs text-faint">
                {t.pagination.current} {page}
              </p>
            </div>
          </Demo>
        </Section>

        <Section id="tabs" title="Tabs" jp="タブ" meta={t.tabs.meta}>
          <Tabs
            label={t.tabs.label}
            defaultValue="summary"
            items={[
              {
                value: "summary",
                label: t.tabs.summaryLabel,
                content: <p>{t.tabs.summaryContent}</p>,
              },
              {
                value: "lines",
                label: t.tabs.linesLabel,
                content: <p>{t.tabs.linesContent}</p>,
              },
              {
                value: "history",
                label: t.tabs.historyLabel,
                content: <p>{t.tabs.historyContent}</p>,
              },
            ]}
          />
        </Section>

        <Section id="accordion" title="Accordion" jp="折りたたみ" meta={t.accordion.meta}>
          <Accordion
            defaultValue="shipping"
            items={[
              {
                value: "shipping",
                title: t.accordion.shippingTitle,
                content: t.accordion.shippingContent,
              },
              {
                value: "returns",
                title: t.accordion.returnsTitle,
                content: t.accordion.returnsContent,
              },
              {
                value: "warranty",
                title: t.accordion.warrantyTitle,
                content: t.accordion.warrantyContent,
              },
            ]}
          />
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable caption={t.props.caption} rows={t.props.rows} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11y.title} jp="配慮" meta={t.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
