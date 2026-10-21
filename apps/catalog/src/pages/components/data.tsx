import {
  Badge,
  BarChart,
  DataTable,
  type DataTableColumn,
  type KotenLocale,
  Sparkline,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useKoten,
} from "@koten/ui";
import { Code, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

type Order = {
  id: string;
  customer: string;
  state: "pending" | "preparing" | "shipped";
  total: number;
};

const orders: Order[] = [
  { id: "KURA-0142", customer: "KURA Distribución", state: "preparing", total: 128000 },
  { id: "KURA-0143", customer: "HIKARI Store", state: "shipped", total: 84000 },
  { id: "KURA-0144", customer: "Matsuri Foods", state: "pending", total: 56000 },
  { id: "KURA-0145", customer: "Aoyama Retail", state: "shipped", total: 32000 },
  { id: "KURA-0146", customer: "KURA Distribución", state: "pending", total: 99000 },
  { id: "KURA-0147", customer: "HIKARI Store", state: "preparing", total: 15000 },
  { id: "KURA-0148", customer: "Matsuri Foods", state: "shipped", total: 47000 },
  { id: "KURA-0149", customer: "Aoyama Retail", state: "preparing", total: 61000 },
  { id: "KURA-0150", customer: "KURA Distribución", state: "shipped", total: 22000 },
  { id: "KURA-0151", customer: "HIKARI Store", state: "pending", total: 38000 },
  { id: "KURA-0152", customer: "Matsuri Foods", state: "preparing", total: 73000 },
  { id: "KURA-0153", customer: "Aoyama Retail", state: "shipped", total: 19000 },
];

const stateTone = {
  pending: "warning",
  preparing: "info",
  shipped: "success",
} as const;

const chartValues = [42, 58, 36, 71, 64, 28, 19];

const statSeries = {
  orders: [18, 24, 21, 32, 28, 38, 42],
  pending: [12, 10, 9, 11, 8, 9, 7],
  revenue: [8, 9, 8, 11, 10, 12, 13],
  stock: [2, 2, 3, 2, 3, 3, 4],
} as const;

const statCards = [
  { key: "orders", tone: "success", series: statSeries.orders },
  { key: "pending", tone: "success", series: statSeries.pending },
  { key: "revenue", tone: "success", series: statSeries.revenue },
  { key: "stock", tone: "danger", series: statSeries.stock },
] as const;

const copy = {
  es: {
    eyebrow: "Componentes · データ",
    title: "Datos",
    description:
      "Tablas, KPIs y charts con números tabulares y un fallback accesible. En Daichō la tabla es el centro; el color de estado siempre lleva texto.",
    meta: "table · data-table · stat-card · sparkline · bar-chart",
    numberLocale: "es-ES",
    sections: {
      table: { title: "Table", meta: "Semántica y densidad" },
      dataTable: { title: "DataTable", meta: "Sort, selección y paginación" },
      stats: { title: "StatCard y Sparkline", meta: "KPIs con tendencia" },
      barChart: { title: "BarChart", meta: "Fallback en tabla" },
      props: { title: "Props y código", meta: "Cinco piezas" },
      a11y: { title: "Accesibilidad", meta: "Tabla y charts" },
    },
    table: {
      caption: "Resumen de pedidos",
      order: "Pedido",
      customer: "Cliente",
      total: "Total",
    },
    dataTable: {
      caption: "Pedidos KURA",
      emptyLabel: "Sin pedidos para los filtros.",
      previousLabel: "Anterior",
      nextLabel: "Siguiente",
      paginationLabel: "Paginación de pedidos",
      selectAllLabel: "Seleccionar todos los pedidos de la página",
      selectRowLabel: (id: string) => `Seleccionar ${id}`,
      selectedLabel: (count: number) => `${count} pedidos seleccionados`,
      orderHeader: "Pedido",
      customerHeader: "Cliente",
      stateHeader: "Estado",
      totalHeader: "Total",
    },
    states: {
      pending: "Pendiente",
      preparing: "Preparando",
      shipped: "Enviado",
    },
    chart: {
      days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      label: "Pedidos por día",
      formatValue: (value: number) => `${value} pedidos`,
    },
    stats: {
      orders: {
        label: "Pedidos hoy",
        value: "42",
        delta: "+8 %",
        meta: "vs. ayer",
        sparkline: "Tendencia de pedidos",
      },
      pending: {
        label: "Pendientes",
        value: "7",
        delta: "-2",
        meta: "Requieren preparación",
        sparkline: "Tendencia de pendientes",
      },
      revenue: {
        label: "Ingresos",
        value: "¥1.284.000",
        delta: "+12 %",
        meta: "Últimos 7 días",
        sparkline: "Tendencia de ingresos",
      },
      stock: {
        label: "Stock bajo",
        value: "4",
        delta: "+1",
        meta: "SKUs bajo mínimo",
        sparkline: "Tendencia de stock bajo",
      },
    },
    props: {
      caption: "Props de datos",
      rows: [
        {
          prop: "DataTable columns",
          type: "{ id, header, cell, sortValue?, sortable?, align? }[]",
          default: "—",
          note: "La celda es render propio; sortValue define el orden.",
        },
        {
          prop: "DataTable selectable",
          type: "boolean",
          default: "false",
          note: "Agrega checkbox por fila y aria-live del conteo.",
        },
        {
          prop: "StatCard delta",
          type: "{ value, tone? }",
          default: "—",
          note: "El color refuerza; el signo y el texto explican.",
        },
        {
          prop: "Sparkline data",
          type: "number[]",
          default: "—",
          note: "SVG con aria-label; no reemplaza el valor textual.",
        },
        {
          prop: "BarChart data",
          type: "{ label, value }[]",
          default: "—",
          note: "Barras decorativas + tabla sr-only de respaldo.",
        },
      ],
    },
    code: `<DataTable
  data={orders}
  columns={columns}
  getRowId={(row) => row.id}
  selectable
  pageSize={5}
  emptyLabel="Sin pedidos"
/>

<StatCard
  label="Pedidos hoy"
  value="42"
  delta={{ value: "+8 %", tone: "success" }}
  sparkline={<Sparkline data={[18, 24, 21, 32]} label="Tendencia" />}
/>

<BarChart label="Pedidos por día" data={chartData} />`,
    a11y: {
      label: "Notas de accesibilidad de datos",
      items: [
        "La tabla usa caption, thead, th con scope y celdas semánticas.",
        "El header ordenable expone aria-sort y un botón real.",
        "La selección se anuncia con aria-live y checkbox con label.",
        "Sparkline y BarChart incluyen texto alternativo; el chart visual es decorativo.",
        "Los números usan tabular-nums y se alinean a la derecha.",
        "DataTable conserva la identidad de data: no la copies en cada render o la paginación se reinicia.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · データ",
    title: "データ",
    description:
      "表、KPI、チャート。表形式の数値とアクセシブルなフォールバックを備える。台帳では表が中心で、状態の色には必ずテキストを添える。",
    meta: "table · data-table · stat-card · sparkline · bar-chart",
    numberLocale: "ja-JP",
    sections: {
      table: { title: "Table", meta: "意味論と密度" },
      dataTable: { title: "DataTable", meta: "並べ替え・選択・ページ送り" },
      stats: { title: "StatCard と Sparkline", meta: "傾向付きKPI" },
      barChart: { title: "BarChart", meta: "表によるフォールバック" },
      props: { title: "Propsとコード", meta: "5つの部品" },
      a11y: { title: "アクセシビリティ", meta: "表とチャート" },
    },
    table: {
      caption: "注文の概要",
      order: "注文",
      customer: "顧客",
      total: "合計",
    },
    dataTable: {
      caption: "KURAの注文",
      emptyLabel: "条件に合う注文はありません。",
      previousLabel: "前へ",
      nextLabel: "次へ",
      paginationLabel: "注文のページ送り",
      selectAllLabel: "このページの注文をすべて選択",
      selectRowLabel: (id: string) => `${id} を選択`,
      selectedLabel: (count: number) => `${count}件の注文を選択中`,
      orderHeader: "注文",
      customerHeader: "顧客",
      stateHeader: "状態",
      totalHeader: "合計",
    },
    states: {
      pending: "保留中",
      preparing: "準備中",
      shipped: "発送済み",
    },
    chart: {
      days: ["月", "火", "水", "木", "金", "土", "日"],
      label: "日別の注文",
      formatValue: (value: number) => `${value}件`,
    },
    stats: {
      orders: {
        label: "本日の注文",
        value: "42",
        delta: "+8%",
        meta: "前日比",
        sparkline: "注文の推移",
      },
      pending: {
        label: "保留中",
        value: "7",
        delta: "-2",
        meta: "準備が必要",
        sparkline: "保留の推移",
      },
      revenue: {
        label: "売上",
        value: "¥1,284,000",
        delta: "+12%",
        meta: "過去7日間",
        sparkline: "売上の推移",
      },
      stock: {
        label: "在庫不足",
        value: "4",
        delta: "+1",
        meta: "最低在庫を下回るSKU",
        sparkline: "在庫不足の推移",
      },
    },
    props: {
      caption: "データのProps",
      rows: [
        {
          prop: "DataTable columns",
          type: "{ id, header, cell, sortValue?, sortable?, align? }[]",
          default: "—",
          note: "セルは独自レンダー。並び順は sortValue で決まる。",
        },
        {
          prop: "DataTable selectable",
          type: "boolean",
          default: "false",
          note: "行ごとのチェックボックスと件数の aria-live を追加する。",
        },
        {
          prop: "StatCard delta",
          type: "{ value, tone? }",
          default: "—",
          note: "色は補強。符号とテキストが意味を説明する。",
        },
        {
          prop: "Sparkline data",
          type: "number[]",
          default: "—",
          note: "aria-label 付きの SVG。テキストの値を置き換えない。",
        },
        {
          prop: "BarChart data",
          type: "{ label, value }[]",
          default: "—",
          note: "装飾的な棒 + 代替の sr-only 表。",
        },
      ],
    },
    code: `<DataTable
  data={orders}
  columns={columns}
  getRowId={(row) => row.id}
  selectable
  pageSize={5}
  emptyLabel="注文なし"
/>

<StatCard
  label="本日の注文"
  value="42"
  delta={{ value: "+8%", tone: "success" }}
  sparkline={<Sparkline data={[18, 24, 21, 32]} label="推移" />}
/>

<BarChart label="日別の注文" data={chartData} />`,
    a11y: {
      label: "データのアクセシビリティ注記",
      items: [
        "表は caption、thead、scope 付き th、意味的なセルを使う。",
        "並べ替え可能なヘッダーは aria-sort と実際のボタンを公開する。",
        "選択は aria-live とラベル付きチェックボックスで通知する。",
        "Sparkline と BarChart は代替テキストを持ち、視覚的なチャートは装飾。",
        "数値は tabular-nums を使い、右揃えにする。",
        "DataTable は data の同一性を保つ。毎レンダーでコピーするとページ送りがリセットされる。",
      ],
    },
  },
  en: {
    eyebrow: "Components · データ",
    title: "Data",
    description:
      "Tables, KPIs and charts with tabular numbers and an accessible fallback. In Daichō the table is the center; state color always carries text.",
    meta: "table · data-table · stat-card · sparkline · bar-chart",
    numberLocale: "en-US",
    sections: {
      table: { title: "Table", meta: "Semantics and density" },
      dataTable: { title: "DataTable", meta: "Sort, selection and pagination" },
      stats: { title: "StatCard and Sparkline", meta: "KPIs with trend" },
      barChart: { title: "BarChart", meta: "Table fallback" },
      props: { title: "Props and code", meta: "Five pieces" },
      a11y: { title: "Accessibility", meta: "Tables and charts" },
    },
    table: {
      caption: "Order summary",
      order: "Order",
      customer: "Customer",
      total: "Total",
    },
    dataTable: {
      caption: "KURA orders",
      emptyLabel: "No orders match the filters.",
      previousLabel: "Previous",
      nextLabel: "Next",
      paginationLabel: "Order pagination",
      selectAllLabel: "Select all orders on this page",
      selectRowLabel: (id: string) => `Select ${id}`,
      selectedLabel: (count: number) => `${count} orders selected`,
      orderHeader: "Order",
      customerHeader: "Customer",
      stateHeader: "State",
      totalHeader: "Total",
    },
    states: {
      pending: "Pending",
      preparing: "Preparing",
      shipped: "Shipped",
    },
    chart: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      label: "Orders per day",
      formatValue: (value: number) => `${value} orders`,
    },
    stats: {
      orders: {
        label: "Orders today",
        value: "42",
        delta: "+8%",
        meta: "vs. yesterday",
        sparkline: "Order trend",
      },
      pending: {
        label: "Pending",
        value: "7",
        delta: "-2",
        meta: "Need preparation",
        sparkline: "Pending trend",
      },
      revenue: {
        label: "Revenue",
        value: "¥1,284,000",
        delta: "+12%",
        meta: "Last 7 days",
        sparkline: "Revenue trend",
      },
      stock: {
        label: "Low stock",
        value: "4",
        delta: "+1",
        meta: "SKUs below minimum",
        sparkline: "Low stock trend",
      },
    },
    props: {
      caption: "Data props",
      rows: [
        {
          prop: "DataTable columns",
          type: "{ id, header, cell, sortValue?, sortable?, align? }[]",
          default: "—",
          note: "The cell is a custom render; sortValue defines the order.",
        },
        {
          prop: "DataTable selectable",
          type: "boolean",
          default: "false",
          note: "Adds a per-row checkbox and aria-live for the count.",
        },
        {
          prop: "StatCard delta",
          type: "{ value, tone? }",
          default: "—",
          note: "Color reinforces; the sign and the text explain.",
        },
        {
          prop: "Sparkline data",
          type: "number[]",
          default: "—",
          note: "SVG with aria-label; it does not replace the textual value.",
        },
        {
          prop: "BarChart data",
          type: "{ label, value }[]",
          default: "—",
          note: "Decorative bars + a fallback sr-only table.",
        },
      ],
    },
    code: `<DataTable
  data={orders}
  columns={columns}
  getRowId={(row) => row.id}
  selectable
  pageSize={5}
  emptyLabel="No orders"
/>

<StatCard
  label="Orders today"
  value="42"
  delta={{ value: "+8%", tone: "success" }}
  sparkline={<Sparkline data={[18, 24, 21, 32]} label="Trend" />}
/>

<BarChart label="Orders per day" data={chartData} />`,
    a11y: {
      label: "Data accessibility notes",
      items: [
        "The table uses caption, thead, th with scope and semantic cells.",
        "The sortable header exposes aria-sort and a real button.",
        "Selection is announced with aria-live and a labelled checkbox.",
        "Sparkline and BarChart include alternative text; the visual chart is decorative.",
        "Numbers use tabular-nums and are right-aligned.",
        "DataTable keeps the identity of data: do not copy it on every render or pagination resets.",
      ],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function DataPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const formatYen = (value: number) => `¥${value.toLocaleString(t.numberLocale)}`;
  const chartData = t.chart.days.map((label, index) => ({
    label,
    value: chartValues[index] ?? 0,
  }));

  const columns: DataTableColumn<Order>[] = [
    {
      id: "id",
      header: t.dataTable.orderHeader,
      cell: (row) => <span className="font-mono text-2xs">{row.id}</span>,
      sortValue: (row) => row.id,
      sortable: true,
    },
    {
      id: "customer",
      header: t.dataTable.customerHeader,
      cell: (row) => row.customer,
    },
    {
      id: "state",
      header: t.dataTable.stateHeader,
      cell: (row) => (
        <Badge tone={stateTone[row.state]} dot>
          {t.states[row.state]}
        </Badge>
      ),
    },
    {
      id: "total",
      header: t.dataTable.totalHeader,
      cell: (row) => formatYen(row.total),
      sortValue: (row) => row.total,
      sortable: true,
      align: "right",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="データ"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="table" title={t.sections.table.title} jp="表" meta={t.sections.table.meta}>
          <Table>
            <caption>{t.table.caption}</caption>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.order}</TableHead>
                <TableHead>{t.table.customer}</TableHead>
                <TableHead className="text-right">{t.table.total}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 4).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-2xs">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatYen(order.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section
          id="data-table"
          title={t.sections.dataTable.title}
          jp="台帳"
          meta={t.sections.dataTable.meta}
        >
          <DataTable
            data={orders}
            columns={columns}
            getRowId={(row) => row.id}
            caption={t.dataTable.caption}
            emptyLabel={t.dataTable.emptyLabel}
            previousLabel={t.dataTable.previousLabel}
            nextLabel={t.dataTable.nextLabel}
            paginationLabel={t.dataTable.paginationLabel}
            selectAllLabel={t.dataTable.selectAllLabel}
            selectRowLabel={t.dataTable.selectRowLabel}
            selectedLabel={t.dataTable.selectedLabel}
            selectable
            pageSize={5}
          />
        </Section>

        <Section id="stats" title={t.sections.stats.title} jp="指標" meta={t.sections.stats.meta}>
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => {
              const labels = t.stats[stat.key];

              return (
                <StatCard
                  key={stat.key}
                  label={labels.label}
                  value={labels.value}
                  delta={{ value: labels.delta, tone: stat.tone }}
                  meta={labels.meta}
                  sparkline={<Sparkline data={stat.series} label={labels.sparkline} />}
                />
              );
            })}
          </div>
        </Section>

        <Section
          id="bar-chart"
          title={t.sections.barChart.title}
          jp="棒グラフ"
          meta={t.sections.barChart.meta}
        >
          <BarChart
            label={t.chart.label}
            data={chartData}
            formatValue={(value) => t.chart.formatValue(value)}
          />
        </Section>

        <Section id="props" title={t.sections.props.title} jp="使い方" meta={t.sections.props.meta}>
          <PropsTable caption={t.props.caption} rows={t.props.rows} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.sections.a11y.title} jp="配慮" meta={t.sections.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
