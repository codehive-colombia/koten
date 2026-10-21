import {
  Badge,
  BarChart,
  Calendar,
  DataTable,
  type DataTableColumn,
  DatePicker,
  type DateRange,
  Sparkline,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useKoten,
  useKotenFormatters,
} from "@koten/ui";
import { useMemo, useState } from "react";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

type OrderState = "pending" | "preparing" | "shipped";

type Order = {
  id: string;
  customer: string;
  state: OrderState;
  total: number;
};

const orders: readonly Order[] = [
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
];

const tableOrders = orders.slice(0, 4);

const virtualOrders = Array.from({ length: 10_000 }, (_, index) => ({
  id: `KURA-${String(index + 1).padStart(5, "0")}`,
  total: 4800 + (index % 97) * 310,
}));

const stateTone = {
  pending: "warning",
  preparing: "info",
  shipped: "success",
} as const;

const sparkSeries = {
  orders: [18, 24, 21, 32, 28, 38, 42],
  pending: [12, 10, 9, 11, 8, 9, 7],
  revenue: [8, 9, 8, 11, 10, 12, 13],
  stock: [2, 2, 3, 2, 3, 3, 4],
} as const;

const weeklyValues = [42, 58, 36, 71, 64, 28, 19] as const;

const DEFAULT_DATE = new Date(2026, 9, 21);
const DEFAULT_MONTH = new Date(2026, 9, 1);
const MIN_DATE = new Date(2026, 9, 1);
const MAX_DATE = new Date(2026, 11, 31);

function toIsoDate(value: Date): string {
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${value.getFullYear()}-${month}-${day}`;
}

function parseIsoDate(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

const demoCopy = {
  es: {
    table: {
      caption: "Resumen de pedidos",
      order: "Pedido",
      customer: "Cliente",
      total: "Total",
      totalLabel: "Total del día",
    },
    dataTable: {
      caption: "Pedidos KURA",
      order: "Pedido",
      customer: "Cliente",
      state: "Estado",
      total: "Total",
      empty: "Sin pedidos para los filtros.",
      previous: "Anterior",
      next: "Siguiente",
      pagination: "Paginación de pedidos",
      selectAll: "Seleccionar todos los pedidos de la página",
      selectRow: (id: string) => `Seleccionar ${id}`,
      selected: (count: number) => `${count} pedidos seleccionados`,
      states: {
        pending: "Pendiente",
        preparing: "Preparando",
        shipped: "Enviado",
      },
    },
    statCard: {
      orders: {
        label: "Pedidos hoy",
        value: "128",
        delta: "+12 %",
        meta: "vs. ayer",
        sparkline: "Tendencia de pedidos",
      },
      pending: {
        label: "Pendientes",
        value: "9",
        delta: "-3",
        meta: "Requieren preparación",
        sparkline: "Tendencia de pendientes",
      },
      revenue: {
        label: "Ingresos",
        delta: "+8 %",
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
    sparkline: {
      orders: { label: "Pedidos", aria: "Tendencia de pedidos de los últimos 7 días" },
      pending: { label: "Pendientes", aria: "Tendencia de pedidos pendientes" },
      revenue: { label: "Ingresos", aria: "Tendencia de ingresos" },
    },
    barChart: {
      label: "Pedidos por día",
      unit: "pedidos",
      days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    },
    calendar: {
      selectedLabel: "Fecha seleccionada",
      none: "Ninguna fecha seleccionada",
      hint: "Flechas para moverte, Home/End para la semana, PageUp/PageDown para el mes.",
    },
    datePicker: {
      isoLabel: "Valor ISO",
      single: {
        label: "Fecha de entrega",
        description: "Abre con Enter, Space o clic; Escape cierra y devuelve el foco.",
        placeholder: "Selecciona una fecha",
      },
      range: {
        label: "Periodo de campaña",
        description: "Primer clic: inicio. Segundo clic: fin.",
        placeholder: "Selecciona un periodo",
      },
      rangeHint: "El valor controlado se invierte si eliges el fin antes que el inicio.",
    },
  },
  ja: {
    table: {
      caption: "注文の概要",
      order: "注文",
      customer: "顧客",
      total: "合計",
      totalLabel: "本日の合計",
    },
    dataTable: {
      caption: "KURAの注文",
      order: "注文",
      customer: "顧客",
      state: "状態",
      total: "合計",
      empty: "条件に合う注文はありません。",
      previous: "前へ",
      next: "次へ",
      pagination: "注文のページ送り",
      selectAll: "このページの注文をすべて選択",
      selectRow: (id: string) => `${id} を選択`,
      selected: (count: number) => `${count}件の注文を選択中`,
      states: {
        pending: "保留中",
        preparing: "準備中",
        shipped: "発送済み",
      },
    },
    statCard: {
      orders: {
        label: "本日の注文",
        value: "128",
        delta: "+12%",
        meta: "前日比",
        sparkline: "注文の推移",
      },
      pending: {
        label: "保留中",
        value: "9",
        delta: "-3",
        meta: "準備が必要",
        sparkline: "保留の推移",
      },
      revenue: {
        label: "売上",
        delta: "+8%",
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
    sparkline: {
      orders: { label: "注文", aria: "過去7日間の注文の推移" },
      pending: { label: "保留", aria: "保留中の注文の推移" },
      revenue: { label: "売上", aria: "売上の推移" },
    },
    barChart: {
      label: "日別の注文",
      unit: "件",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    calendar: {
      selectedLabel: "選択した日付",
      none: "日付が選択されていません",
      hint: "矢印で移動、Home/End で週、PageUp/PageDown で月を移動します。",
    },
    datePicker: {
      isoLabel: "ISO 値",
      single: {
        label: "お届け日",
        description: "Enter、Space、クリックで開き、Escape で閉じてフォーカスを戻します。",
        placeholder: "日付を選択",
      },
      range: {
        label: "キャンペーン期間",
        description: "1回目で開始、2回目で終了。",
        placeholder: "期間を選択",
      },
      rangeHint: "終了を先に選んでも、開始と終了は自動で入れ替わります。",
    },
  },
  en: {
    table: {
      caption: "Order summary",
      order: "Order",
      customer: "Customer",
      total: "Total",
      totalLabel: "Day total",
    },
    dataTable: {
      caption: "KURA orders",
      order: "Order",
      customer: "Customer",
      state: "State",
      total: "Total",
      empty: "No orders match the filters.",
      previous: "Previous",
      next: "Next",
      pagination: "Order pagination",
      selectAll: "Select all orders on this page",
      selectRow: (id: string) => `Select ${id}`,
      selected: (count: number) => `${count} orders selected`,
      states: {
        pending: "Pending",
        preparing: "Preparing",
        shipped: "Shipped",
      },
    },
    statCard: {
      orders: {
        label: "Orders today",
        value: "128",
        delta: "+12%",
        meta: "vs. yesterday",
        sparkline: "Order trend",
      },
      pending: {
        label: "Pending",
        value: "9",
        delta: "-3",
        meta: "Need preparation",
        sparkline: "Pending trend",
      },
      revenue: {
        label: "Revenue",
        delta: "+8%",
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
    sparkline: {
      orders: { label: "Orders", aria: "Order trend over the last 7 days" },
      pending: { label: "Pending", aria: "Pending order trend" },
      revenue: { label: "Revenue", aria: "Revenue trend" },
    },
    barChart: {
      label: "Orders per day",
      unit: "orders",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    calendar: {
      selectedLabel: "Selected date",
      none: "No date selected",
      hint: "Arrows move by day or week, Home/End by week, PageUp/PageDown by month.",
    },
    datePicker: {
      isoLabel: "ISO value",
      single: {
        label: "Delivery date",
        description: "Opens with Enter, Space or click; Escape closes and returns focus.",
        placeholder: "Pick a date",
      },
      range: {
        label: "Campaign period",
        description: "First click sets the start; second click sets the end.",
        placeholder: "Pick a period",
      },
      rangeHint: "The controlled value swaps the ends if you pick the end first.",
    },
  },
};

type DemoCopy = (typeof demoCopy)["es"];
const demoCopyByLocale: Record<"es" | "ja" | "en", DemoCopy> = demoCopy;

function useDemoCopy() {
  const { locale } = useKoten();

  return demoCopyByLocale[locale];
}

function TableDemo() {
  const t = useDemoCopy();
  const { formatCurrency } = useKotenFormatters();

  return (
    <Table>
      <caption>{t.table.caption}</caption>
      <TableHeader>
        <TableRow>
          <TableHead>{t.table.order}</TableHead>
          <TableHead>{t.table.customer}</TableHead>
          <TableHead className="text-end">{t.table.total}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-2xs">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell className="text-end tabular-nums">
              {formatCurrency(order.total, { maximumFractionDigits: 0 })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableTotalsDemo() {
  const t = useDemoCopy();
  const { formatCurrency } = useKotenFormatters();
  const total = tableOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <Table>
      <caption>{t.table.caption}</caption>
      <TableHeader>
        <TableRow>
          <TableHead>{t.table.order}</TableHead>
          <TableHead>{t.table.customer}</TableHead>
          <TableHead className="text-end">{t.table.total}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-2xs">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell className="text-end tabular-nums">
              {formatCurrency(order.total, { maximumFractionDigits: 0 })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <tfoot>
        <tr className="border-t border-rule-strong">
          <th
            scope="row"
            colSpan={2}
            className="px-[var(--koten-control-px)] py-1 text-start text-2xs font-semibold text-muted"
          >
            {t.table.totalLabel}
          </th>
          <td className="px-[var(--koten-control-px)] py-1 text-end text-xs font-semibold tabular-nums">
            {formatCurrency(total, { maximumFractionDigits: 0 })}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}

function DataTableDemo() {
  const t = useDemoCopy();
  const { formatCurrency } = useKotenFormatters();

  const columns = useMemo<DataTableColumn<Order>[]>(
    () => [
      {
        id: "id",
        header: t.dataTable.order,
        cell: (row) => <span className="font-mono text-2xs">{row.id}</span>,
        sortValue: (row) => row.id,
        sortable: true,
      },
      {
        id: "customer",
        header: t.dataTable.customer,
        cell: (row) => row.customer,
      },
      {
        id: "state",
        header: t.dataTable.state,
        cell: (row) => (
          <Badge tone={stateTone[row.state]} dot>
            {t.dataTable.states[row.state]}
          </Badge>
        ),
      },
      {
        id: "total",
        header: t.dataTable.total,
        cell: (row) => formatCurrency(row.total, { maximumFractionDigits: 0 }),
        sortValue: (row) => row.total,
        sortable: true,
        align: "right",
      },
    ],
    [t, formatCurrency],
  );

  return (
    <DataTable
      data={orders}
      columns={columns}
      getRowId={(row) => row.id}
      caption={t.dataTable.caption}
      emptyLabel={t.dataTable.empty}
      previousLabel={t.dataTable.previous}
      nextLabel={t.dataTable.next}
      paginationLabel={t.dataTable.pagination}
      selectAllLabel={t.dataTable.selectAll}
      selectRowLabel={t.dataTable.selectRow}
      selectedLabel={t.dataTable.selected}
      selectable
      pageSize={5}
    />
  );
}

function VirtualizedDataTableDemo() {
  const t = useDemoCopy();
  const { formatCurrency } = useKotenFormatters();

  const columns = useMemo<DataTableColumn<(typeof virtualOrders)[number]>[]>(
    () => [
      {
        id: "id",
        header: t.dataTable.order,
        cell: (row) => <span className="font-mono text-2xs">{row.id}</span>,
      },
      {
        id: "total",
        header: t.dataTable.total,
        cell: (row) => formatCurrency(row.total, { maximumFractionDigits: 0 }),
        align: "right",
      },
    ],
    [t, formatCurrency],
  );

  return (
    <DataTable
      data={virtualOrders}
      columns={columns}
      getRowId={(row) => row.id}
      caption={t.dataTable.caption}
      emptyLabel={t.dataTable.empty}
      previousLabel={t.dataTable.previous}
      nextLabel={t.dataTable.next}
      paginationLabel={t.dataTable.pagination}
      selectAllLabel={t.dataTable.selectAll}
      selectRowLabel={t.dataTable.selectRow}
      selectedLabel={t.dataTable.selected}
      virtualized
      height={320}
      rowHeight={32}
    />
  );
}

function StatCardDemo() {
  const t = useDemoCopy();
  const { formatCurrency } = useKotenFormatters();

  return (
    <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label={t.statCard.orders.label}
        value={t.statCard.orders.value}
        delta={{ value: t.statCard.orders.delta, tone: "success" }}
        meta={t.statCard.orders.meta}
        sparkline={<Sparkline data={sparkSeries.orders} label={t.statCard.orders.sparkline} />}
      />
      <StatCard
        label={t.statCard.pending.label}
        value={t.statCard.pending.value}
        delta={{ value: t.statCard.pending.delta, tone: "success" }}
        meta={t.statCard.pending.meta}
        sparkline={<Sparkline data={sparkSeries.pending} label={t.statCard.pending.sparkline} />}
      />
      <StatCard
        label={t.statCard.revenue.label}
        value={formatCurrency(1284000, { maximumFractionDigits: 0 })}
        delta={{ value: t.statCard.revenue.delta, tone: "success" }}
        meta={t.statCard.revenue.meta}
        sparkline={<Sparkline data={sparkSeries.revenue} label={t.statCard.revenue.sparkline} />}
      />
      <StatCard
        label={t.statCard.stock.label}
        value={t.statCard.stock.value}
        delta={{ value: t.statCard.stock.delta, tone: "danger" }}
        meta={t.statCard.stock.meta}
        sparkline={<Sparkline data={sparkSeries.stock} label={t.statCard.stock.sparkline} />}
      />
    </div>
  );
}

function SparklineDemo() {
  const t = useDemoCopy();
  const { formatNumber } = useKotenFormatters();
  const items = [
    { key: "orders", series: sparkSeries.orders, value: 42 },
    { key: "pending", series: sparkSeries.pending, value: 7 },
    { key: "revenue", series: sparkSeries.revenue, value: 13 },
  ] as const;

  return (
    <div className="grid gap-[var(--koten-gap)] sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.key} className="border border-rule bg-surface p-[var(--koten-panel-p)]">
          <p className="text-2xs font-semibold text-faint">{t.sparkline[item.key].label}</p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <Sparkline data={item.series} label={t.sparkline[item.key].aria} />
            <span className="text-xs font-semibold tabular-nums text-ink">
              {formatNumber(item.value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BarChartDemo() {
  const t = useDemoCopy();
  const { formatNumber } = useKotenFormatters();
  const data = t.barChart.days.map((label, index) => ({
    label,
    value: weeklyValues[index] ?? 0,
  }));

  return (
    <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
      <BarChart
        label={t.barChart.label}
        data={data}
        height={140}
        formatValue={(value) => `${formatNumber(value)} ${t.barChart.unit}`}
      />
    </div>
  );
}

function CalendarDemo() {
  const t = useDemoCopy();
  const { formatDate } = useKotenFormatters();
  const [selected, setSelected] = useState<Date | null>(DEFAULT_DATE);

  return (
    <div className="flex flex-wrap items-start gap-[var(--koten-gap)]">
      <Calendar
        selected={selected}
        onSelect={setSelected}
        defaultMonth={DEFAULT_MONTH}
        min={MIN_DATE}
        max={MAX_DATE}
      />
      <div className="min-w-0 flex-1 border border-rule bg-surface p-[var(--koten-panel-p)]">
        <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
          {t.calendar.selectedLabel}
        </p>
        <p className="mt-1 text-sm text-ink">
          {selected ? formatDate(selected, { dateStyle: "full" }) : t.calendar.none}
        </p>
        <p className="mt-1 text-2xs leading-relaxed text-muted">{t.calendar.hint}</p>
      </div>
    </div>
  );
}

function DatePickerSingleDemo() {
  const t = useDemoCopy();
  const [iso, setIso] = useState("2026-10-21");
  const value = iso ? parseIsoDate(iso) : null;

  return (
    <div className="max-w-sm">
      <DatePicker
        label={t.datePicker.single.label}
        description={t.datePicker.single.description}
        placeholder={t.datePicker.single.placeholder}
        value={value}
        onValueChange={(next) => setIso(next ? toIsoDate(next) : "")}
        min={MIN_DATE}
        max={MAX_DATE}
        defaultMonth={DEFAULT_MONTH}
      />
      <p className="mt-2 text-2xs text-muted">
        {t.datePicker.isoLabel}: <span className="font-mono text-ink">{iso || "—"}</span>
      </p>
    </div>
  );
}

function DatePickerRangeDemo() {
  const t = useDemoCopy();
  const [range, setRange] = useState<DateRange>({
    start: DEFAULT_DATE,
    end: new Date(2026, 9, 27),
  });

  return (
    <div className="max-w-sm">
      <DatePicker
        mode="range"
        label={t.datePicker.range.label}
        description={t.datePicker.range.description}
        placeholder={t.datePicker.range.placeholder}
        value={range}
        onValueChange={setRange}
        min={MIN_DATE}
        max={MAX_DATE}
        defaultMonth={DEFAULT_MONTH}
      />
      <p className="mt-2 text-2xs leading-relaxed text-muted">{t.datePicker.rangeHint}</p>
    </div>
  );
}

export const dataDocs: PrimitiveDoc[] = [
  {
    slug: "table",
    id: "C-037",
    name: "Table",
    jp: "表",
    description: {
      es: "La tabla nativa del sistema. Aporta la semántica —caption, thead, th con scope y celdas— y deja la densidad, el borde y el scroll horizontal a los tokens. No ordena ni pagina: para eso está DataTable.",
      ja: "システムのネイティブな表です。caption、thead、scope 付き th、セルという意味論を提供し、密度・罫線・横スクロールはトークンに任せます。並べ替えやページ送りは行わず、それは DataTable の役割です。",
      en: "The system's native table. It supplies the semantics —caption, thead, th with scope and cells— and leaves density, borders and horizontal scroll to the tokens. It does not sort or paginate: that is DataTable's job.",
    },
    files: filesFor(uiFile("table.tsx")),
    examples: [
      {
        id: "semantics",
        title: { es: "Semántica y densidad", ja: "意味論と密度", en: "Semantics and density" },
        description: {
          es: "caption, thead, th con scope y filas a la altura de --koten-row-h.",
          ja: "caption、thead、scope 付き th、--koten-row-h の行高を使います。",
          en: "caption, thead, th with scope and rows at --koten-row-h.",
        },
        preview: <TableDemo />,
        code: `<Table>
  <caption>Resumen de pedidos</caption>
  <TableHeader>
    <TableRow>
      <TableHead>Pedido</TableHead>
      <TableHead>Cliente</TableHead>
      <TableHead className="text-end">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="font-mono text-2xs">{order.id}</TableCell>
        <TableCell>{order.customer}</TableCell>
        <TableCell className="text-end tabular-nums">
          {formatCurrency(order.total)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
      {
        id: "totals",
        title: { es: "Totales y alineación", ja: "合計と整列", en: "Totals and alignment" },
        description: {
          es: "Los números van a la derecha con tabular-nums; tfoot cierra la tabla.",
          ja: "数値は tabular-nums で右揃えにし、tfoot で表を締めます。",
          en: "Numbers are right-aligned with tabular-nums; tfoot closes the table.",
        },
        preview: <TableTotalsDemo />,
        code: `<Table>
  <caption>Resumen de pedidos</caption>
  <TableHeader>
    <TableRow>
      <TableHead>Pedido</TableHead>
      <TableHead>Cliente</TableHead>
      <TableHead className="text-end">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="font-mono text-2xs">{order.id}</TableCell>
        <TableCell>{order.customer}</TableCell>
        <TableCell className="text-end tabular-nums">
          {formatCurrency(order.total)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <tfoot>
    <tr className="border-t border-rule-strong">
      <th
        scope="row"
        colSpan={2}
        className="px-[var(--koten-control-px)] py-1 text-start text-2xs font-semibold"
      >
        Total del día
      </th>
      <td className="px-[var(--koten-control-px)] py-1 text-end text-xs font-semibold tabular-nums">
        {formatCurrency(total)}
      </td>
    </tr>
  </tfoot>
</Table>`,
      },
    ],
    props: [
      {
        prop: "containerClassName",
        type: "string",
        default: "—",
        note: {
          es: "Clases del contenedor con scroll horizontal; conserva el borde y overflow-x-auto.",
          ja: "横スクロールするコンテナのクラス。罫線と overflow-x-auto は保たれます。",
          en: "Classes for the horizontal scroll container; border and overflow-x-auto are kept.",
        },
      },
      {
        prop: "containerProps",
        type: 'ComponentProps<"div">',
        default: "—",
        note: {
          es: "Props del contenedor: scroll vertical, onScroll y etiquetas. El contenedor ya recibe tabIndex 0.",
          ja: "コンテナの props（縦スクロール、onScroll、ラベル）。コンテナには既に tabIndex 0 があります。",
          en: "Container props: vertical scroll, onScroll and labels. The container already gets tabIndex 0.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Clases de la tabla; min-w-[32rem] garantiza el scroll horizontal en pantallas angostas.",
          ja: "表のクラス。min-w-[32rem] が狭い画面での横スクロールを保証します。",
          en: "Table classes; min-w-[32rem] guarantees horizontal scroll on narrow screens.",
        },
      },
      {
        prop: "TableHead scope",
        type: '"col" | "row" | "colgroup" | "rowgroup"',
        default: '"col"',
        note: {
          es: 'TableHead fija scope="col"; para encabezados de fila usa th con scope="row".',
          ja: 'TableHead は scope="col" を固定します。行見出しには scope="row" の th を使います。',
          en: 'TableHead sets scope="col"; for row headers use th with scope="row".',
        },
      },
    ],
    a11y: {
      es: [
        "El contenedor con scroll recibe tabIndex=0 para poder recorrerse con el teclado.",
        'TableHead fija scope="col"; la primera celda de una fila puede ser th con scope="row".',
        "La caption describe la tabla; TableCaption la oculta visualmente sin sacarla del árbol accesible.",
      ],
      ja: [
        "横スクロールするコンテナは tabIndex=0 を持ち、キーボードで移動できます。",
        'TableHead は scope="col" を固定します。行の先頭セルは scope="row" の th にできます。',
        "caption は表を説明します。TableCaption は視覚的に隠してもアクセシビリティツリーには残します。",
      ],
      en: [
        "The scroll container gets tabIndex=0 so it can be traversed with the keyboard.",
        'TableHead sets scope="col"; the first cell of a row can be a th with scope="row".',
        "The caption describes the table; TableCaption hides it visually without removing it from the accessibility tree.",
      ],
    },
  },
  {
    slug: "data-table",
    id: "C-038",
    name: "DataTable",
    jp: "データ表",
    baseUi: "https://tanstack.com/table/latest",
    description: {
      es: "Tabla de datos sobre TanStack Table con orden, selección y paginación en estado de cliente. Conserva la identidad de data, acepta columnas con render propio y puede virtualizar miles de filas sin cambiar la semántica de la tabla.",
      ja: "TanStack Table を使ったデータ表で、並べ替え・選択・ページ送りをクライアント状態で扱います。data の同一性を保ち、独自レンダーの列を受け入れ、表の意味論を変えずに数千行を仮想化できます。",
      en: "A data table on TanStack Table with sorting, selection and pagination in client state. It keeps the identity of data, accepts custom-rendered columns and can virtualize thousands of rows without changing the table semantics.",
    },
    requirements: [
      {
        kind: "dependency",
        label: {
          es: "@tanstack/react-table",
          ja: "@tanstack/react-table",
          en: "@tanstack/react-table",
        },
        detail: {
          es: "El componente importa useReactTable, getCoreRowModel, getSortedRowModel y getPaginationRowModel. El item del registry declara la dependencia npm; instálala antes de copiar el archivo.",
          ja: "useReactTable、getCoreRowModel、getSortedRowModel、getPaginationRowModel を読み込みます。レジストリ項目が npm 依存を宣言するため、ファイルをコピーする前にインストールしてください。",
          en: "The component imports useReactTable, getCoreRowModel, getSortedRowModel and getPaginationRowModel. The registry item declares the npm dependency; install it before copying the file.",
        },
      },
      {
        kind: "client",
        label: {
          es: "Estado de cliente: orden, selección y paginación",
          ja: "クライアント状態：並べ替え・選択・ページ送り",
          en: "Client state: sort, selection and pagination",
        },
        detail: {
          es: "sorting, rowSelection y la página viven en estado local. Mantén la identidad de data entre renders: una copia nueva reinicia la paginación.",
          ja: "並べ替え・選択・ページはローカル状態にあります。data の同一性を保ってください。毎回コピーするとページ送りがリセットされます。",
          en: "sorting, rowSelection and the page live in local state. Keep the identity of data across renders: a fresh copy resets pagination.",
        },
      },
    ],
    files: filesFor(uiFile("data-table.tsx")),
    examples: [
      {
        id: "client-state",
        title: {
          es: "Orden, selección y paginación",
          ja: "並べ替え・選択・ページ送り",
          en: "Sort, selection and pagination",
        },
        description: {
          es: "Diez pedidos, cinco por página; el estado vive en el cliente y la selección se anuncia.",
          ja: "10件の注文を5件ずつ表示します。状態はクライアントにあり、選択は通知されます。",
          en: "Ten orders, five per page; state lives on the client and selection is announced.",
        },
        preview: <DataTableDemo />,
        code: `const columns: DataTableColumn<Order>[] = [
  {
    id: "id",
    header: "Pedido",
    cell: (row) => <span className="font-mono text-2xs">{row.id}</span>,
    sortValue: (row) => row.id,
    sortable: true,
  },
  { id: "customer", header: "Cliente", cell: (row) => row.customer },
  {
    id: "state",
    header: "Estado",
    cell: (row) => (
      <Badge tone={stateTone[row.state]} dot>
        {stateLabels[row.state]}
      </Badge>
    ),
  },
  {
    id: "total",
    header: "Total",
    cell: (row) => formatCurrency(row.total),
    sortValue: (row) => row.total,
    sortable: true,
    align: "right",
  },
];

<DataTable
  data={orders}
  columns={columns}
  getRowId={(row) => row.id}
  caption="Pedidos KURA"
  emptyLabel="Sin pedidos para los filtros."
  previousLabel="Anterior"
  nextLabel="Siguiente"
  paginationLabel="Paginación de pedidos"
  selectAllLabel="Seleccionar todos los pedidos de la página"
  selectRowLabel={(id) => \`Seleccionar \${id}\`}
  selectedLabel={(count) => \`\${count} pedidos seleccionados\`}
  selectable
  pageSize={5}
/>`,
      },
      {
        id: "virtualized",
        title: {
          es: "10 000 filas virtualizadas",
          ja: "10,000 行の仮想化",
          en: "10,000 virtualized rows",
        },
        description: {
          es: "Solo se monta la ventana visible más overscan; el encabezado queda sticky y la tabla conserva aria-rowcount/aria-rowindex.",
          ja: "表示中のウィンドウと overscan だけを描画します。ヘッダーは固定され、aria-rowcount/aria-rowindex は維持されます。",
          en: "Only the visible window plus overscan is mounted; the header stays sticky and the table keeps aria-rowcount/aria-rowindex.",
        },
        preview: <VirtualizedDataTableDemo />,
        code: `const rows = Array.from({ length: 10_000 }, (_, index) => ({
  id: \`KURA-\${String(index + 1).padStart(5, "0")}\`,
  total: 4800 + (index % 97) * 310,
}));

<DataTable
  data={rows}
  columns={[
    { id: "id", header: "Pedido", cell: (row) => row.id },
    { id: "total", header: "Total", cell: (row) => formatCurrency(row.total), align: "right" },
  ]}
  getRowId={(row) => row.id}
  caption="Pedidos KURA"
  emptyLabel="Sin pedidos para los filtros."
  previousLabel="Anterior"
  nextLabel="Siguiente"
  paginationLabel="Paginación de pedidos"
  selectAllLabel="Seleccionar todos los pedidos de la página"
  selectRowLabel={(id) => \`Seleccionar \${id}\`}
  selectedLabel={(count) => \`\${count} pedidos seleccionados\`}
  virtualized
  height={320}
  rowHeight={32}
/>`,
      },
    ],
    props: [
      {
        prop: "data",
        type: "readonly T[]",
        default: "—",
        note: {
          es: "Conserva la identidad del array entre renders o la paginación se reinicia.",
          ja: "配列の同一性をレンダー間で保ってください。そうしないとページ送りがリセットされます。",
          en: "Keep the array identity across renders or pagination resets.",
        },
      },
      {
        prop: "columns",
        type: "readonly DataTableColumn<T>[]",
        default: "—",
        note: {
          es: "Cada columna define header, cell y, si aplica, sortValue, sortable y align.",
          ja: "各列は header、cell、必要に応じて sortValue・sortable・align を定義します。",
          en: "Each column defines header, cell and, when needed, sortValue, sortable and align.",
        },
      },
      {
        prop: "getRowId",
        type: "(row: T) => string",
        default: "—",
        note: {
          es: "ID estable de la fila; también identifica la selección y el aria-live.",
          ja: "行の安定した ID。選択と aria-live の識別にも使います。",
          en: "Stable row ID; it also identifies selection and the aria-live announcement.",
        },
      },
      {
        prop: "selectable",
        type: "boolean",
        default: "false",
        note: {
          es: "Agrega checkbox por fila, selección de página y aria-live del conteo.",
          ja: "行ごとのチェックボックス、ページ選択、件数の aria-live を追加します。",
          en: "Adds a per-row checkbox, page selection and an aria-live count.",
        },
      },
      {
        prop: "onSelectionChange",
        type: "(ids: string[]) => void",
        default: "—",
        note: {
          es: "Recibe los IDs seleccionados; el estado de selección sigue siendo del cliente.",
          ja: "選択された ID を受け取ります。選択状態はクライアント側にあります。",
          en: "Receives the selected IDs; selection state still belongs to the client.",
        },
      },
      {
        prop: "pageSize",
        type: "number",
        default: "8",
        note: {
          es: "Filas por página; con virtualized se ignora la paginación.",
          ja: "1ページの行数。virtualized ではページ送りは使われません。",
          en: "Rows per page; with virtualized, pagination is ignored.",
        },
      },
      {
        prop: "virtualized",
        type: "boolean",
        default: "false",
        note: {
          es: "Renderiza solo la ventana visible y desactiva la paginación.",
          ja: "表示範囲の行だけを描画し、ページ送りを無効にします。",
          en: "Renders only the visible window and disables pagination.",
        },
      },
      {
        prop: "height",
        type: "number",
        default: "480",
        note: {
          es: "Alto del contenedor virtualizado en px.",
          ja: "仮想化コンテナの高さ（px）。",
          en: "Height of the virtualized container in px.",
        },
      },
      {
        prop: "rowHeight",
        type: "number",
        default: "36",
        note: {
          es: "Alto fijo de fila; debe coincidir con la densidad activa.",
          ja: "行の固定高。有効な密度と一致させてください。",
          en: "Fixed row height; it must match the active density.",
        },
      },
      {
        prop: "loading",
        type: "boolean",
        default: "false",
        note: {
          es: "Muestra tres filas skeleton en lugar de los datos.",
          ja: "データの代わりに3行のスケルトンを表示します。",
          en: "Shows three skeleton rows instead of the data.",
        },
      },
      {
        prop: "emptyLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto de la fila vacía; obligatorio para que el estado vacío sea explícito.",
          ja: "空状態の行に表示するテキスト。明示的な空状態のために必須です。",
          en: "Text for the empty row; required so the empty state is explicit.",
        },
      },
    ],
    a11y: {
      es: [
        "Los headers ordenables son botones reales y exponen aria-sort con ascending, descending o none.",
        "La selección usa checkbox con aria-label por fila y anuncia el conteo en una región aria-live.",
        "La tabla virtualizada conserva aria-rowcount y aria-rowindex, y su contenedor recibe foco.",
        "Los números se alinean a la derecha y usan tabular-nums.",
      ],
      ja: [
        "並べ替え可能な見出しは実際のボタンで、aria-sort に ascending・descending・none を公開します。",
        "選択は行ごとの aria-label 付きチェックボックスを使い、件数を aria-live 領域で通知します。",
        "仮想化した表は aria-rowcount と aria-rowindex を保ち、コンテナにフォーカスできます。",
        "数値は右揃えにし、tabular-nums を使います。",
      ],
      en: [
        "Sortable headers are real buttons and expose aria-sort as ascending, descending or none.",
        "Selection uses a per-row checkbox with aria-label and announces the count in an aria-live region.",
        "The virtualized table keeps aria-rowcount and aria-rowindex, and its container is focusable.",
        "Numbers are right-aligned and use tabular-nums.",
      ],
    },
  },
  {
    slug: "stat-card",
    id: "C-039",
    name: "StatCard",
    jp: "指標",
    description: {
      es: "Tarjeta de KPI: etiqueta, valor tabular, delta semántico, contexto y una sparkline opcional. El color refuerza la lectura, pero el signo y el texto son los que explican la variación.",
      ja: "KPI カードです。ラベル、等幅数字の値、意味を持つ差分、補足、任意のスパークラインをまとめます。色は読み取りを補強しますが、変化を説明するのは符号とテキストです。",
      en: "A KPI card: label, tabular value, semantic delta, context and an optional sparkline. Color reinforces the reading, but the sign and the text explain the change.",
    },
    files: filesFor(uiFile("stat-card.tsx")),
    examples: [
      {
        id: "kpis",
        title: { es: "Cuatro KPIs", ja: "4つのKPI", en: "Four KPIs" },
        description: {
          es: "Etiqueta, valor, delta, meta y sparkline; el color refuerza y el texto explica.",
          ja: "ラベル、値、差分、補足、スパークライン。色は補強し、テキストが説明します。",
          en: "Label, value, delta, meta and sparkline; color reinforces and text explains.",
        },
        preview: <StatCardDemo />,
        code: `<div className="grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4">
  <StatCard
    label="Pedidos hoy"
    value="128"
    delta={{ value: "+12 %", tone: "success" }}
    meta="vs. ayer"
    sparkline={<Sparkline data={[18, 24, 21, 32, 28, 38, 42]} label="Tendencia de pedidos" />}
  />
  <StatCard
    label="Pendientes"
    value="9"
    delta={{ value: "-3", tone: "success" }}
    meta="Requieren preparación"
    sparkline={<Sparkline data={[12, 10, 9, 11, 8, 9, 7]} label="Tendencia de pendientes" />}
  />
  <StatCard
    label="Ingresos"
    value={formatCurrency(1284000, { maximumFractionDigits: 0 })}
    delta={{ value: "+8 %", tone: "success" }}
    meta="Últimos 7 días"
    sparkline={<Sparkline data={[8, 9, 8, 11, 10, 12, 13]} label="Tendencia de ingresos" />}
  />
  <StatCard
    label="Stock bajo"
    value="4"
    delta={{ value: "+1", tone: "danger" }}
    meta="SKUs bajo mínimo"
    sparkline={<Sparkline data={[2, 2, 3, 2, 3, 3, 4]} label="Tendencia de stock bajo" />}
  />
</div>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Etiqueta corta del KPI; se muestra pequeña y en color faint.",
          ja: "KPI の短いラベル。小さく faint 色で表示されます。",
          en: "Short KPI label; rendered small in the faint color.",
        },
      },
      {
        prop: "value",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Valor principal; usa tabular-nums y leading-none para alinear cifras.",
          ja: "主要な値。tabular-nums と leading-none で数字を揃えます。",
          en: "Main value; uses tabular-nums and leading-none to align figures.",
        },
      },
      {
        prop: "delta",
        type: '{ value: ReactNode; tone?: "success" | "danger" | "neutral" }',
        default: "—",
        note: {
          es: "El tono solo refuerza; el signo y el texto deben explicar la variación.",
          ja: "トーンは補強のみ。符号とテキストが変化を説明します。",
          en: "The tone only reinforces; the sign and text must explain the change.",
        },
      },
      {
        prop: "meta",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contexto debajo del valor, por ejemplo el periodo comparado.",
          ja: "値の下に置く補足。比較期間など。",
          en: "Context below the value, such as the comparison period.",
        },
      },
      {
        prop: "sparkline",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se renderiza en color primario; normalmente un <Sparkline />.",
          ja: "プライマリ色で描画されます。通常は <Sparkline /> を渡します。",
          en: "Rendered in the primary color; usually a <Sparkline />.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Clases del contenedor; borde, fondo y padding salen de tokens.",
          ja: "コンテナのクラス。罫線・背景・余白はトークンから取ります。",
          en: "Container classes; border, background and padding come from tokens.",
        },
      },
    ],
    a11y: {
      es: [
        "El valor y la etiqueta son texto real; el delta no depende solo del color, también lleva signo y texto.",
        "La sparkline necesita aria-label; el valor principal sigue disponible como texto.",
        "La tarjeta no es interactiva; si envuelve un enlace, el foco debe ir al enlace y no al contenedor.",
      ],
      ja: [
        "値とラベルは実際のテキストです。差分は色だけに頼らず、符号とテキストも持ちます。",
        "スパークラインには aria-label が必要です。主要な値はテキストとして残ります。",
        "カード自体は操作できません。リンクを包む場合、フォーカスはコンテナではなくリンクに移します。",
      ],
      en: [
        "The value and label are real text; the delta does not rely on color alone and also carries a sign and text.",
        "The sparkline needs an aria-label; the main value remains available as text.",
        "The card is not interactive; if it wraps a link, focus goes to the link, not the container.",
      ],
    },
  },
  {
    slug: "sparkline",
    id: "C-040",
    name: "Sparkline",
    jp: "推移",
    description: {
      es: "Mini gráfico SVG para una serie corta. Normaliza los valores al rango visible y expone un nombre accesible; no reemplaza el valor textual del KPI.",
      ja: "短い系列のための小さな SVG グラフです。値を表示範囲に正規化し、アクセシブル名を公開します。KPI のテキスト値を置き換えるものではありません。",
      en: "A small SVG chart for a short series. It normalizes values to the visible range and exposes an accessible name; it does not replace the KPI's textual value.",
    },
    files: filesFor(uiFile("sparkline.tsx")),
    examples: [
      {
        id: "series",
        title: { es: "Series cortas", ja: "短い系列", en: "Short series" },
        description: {
          es: "SVG con aria-label; el valor numérico sigue visible al lado.",
          ja: "aria-label 付きの SVG。数値は横に表示したままです。",
          en: "SVG with aria-label; the numeric value stays visible beside it.",
        },
        preview: <SparklineDemo />,
        code: `<div className="grid gap-[var(--koten-gap)] sm:grid-cols-3">
  <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
    <p className="text-2xs font-semibold text-faint">Pedidos</p>
    <div className="mt-1 flex items-end justify-between gap-2">
      <Sparkline
        data={[18, 24, 21, 32, 28, 38, 42]}
        label="Tendencia de pedidos de los últimos 7 días"
      />
      <span className="text-xs font-semibold tabular-nums text-ink">42</span>
    </div>
  </div>
  <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
    <p className="text-2xs font-semibold text-faint">Pendientes</p>
    <div className="mt-1 flex items-end justify-between gap-2">
      <Sparkline data={[12, 10, 9, 11, 8, 9, 7]} label="Tendencia de pedidos pendientes" />
      <span className="text-xs font-semibold tabular-nums text-ink">7</span>
    </div>
  </div>
  <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
    <p className="text-2xs font-semibold text-faint">Ingresos</p>
    <div className="mt-1 flex items-end justify-between gap-2">
      <Sparkline data={[8, 9, 8, 11, 10, 12, 13]} label="Tendencia de ingresos" />
      <span className="text-xs font-semibold tabular-nums text-ink">13</span>
    </div>
  </div>
</div>`,
      },
    ],
    props: [
      {
        prop: "data",
        type: "readonly number[]",
        default: "—",
        note: {
          es: "Serie corta; con un solo punto se dibuja una línea centrada.",
          ja: "短い系列。点が1つだけの場合は中央に線を描きます。",
          en: "Short series; a single point draws a centered line.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible y <title>; describe la tendencia, no solo el número.",
          ja: "アクセシブル名と <title>。数値だけでなく傾向を説明します。",
          en: "Accessible name and <title>; describe the trend, not just the number.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Tamaño y color; por defecto h-8 w-24 y text-primary.",
          ja: "サイズと色。既定は h-8 w-24 と text-primary です。",
          en: "Size and color; defaults to h-8 w-24 and text-primary.",
        },
      },
    ],
    a11y: {
      es: [
        'El SVG usa role="img" y aria-label, e incluye un <title> con la misma descripción.',
        "Es decorativo cuando el valor ya está en texto; el label debe describir la tendencia.",
        "No sustituye una tabla ni un valor textual: la tendencia no se anuncia como dato exacto.",
      ],
      ja: [
        'SVG は role="img" と aria-label を持ち、同じ説明の <title> を含みます。',
        "値がテキストで示されている場合は装飾です。label は傾向を説明します。",
        "表やテキスト値の代わりにはなりません。傾向は正確なデータとして通知されません。",
      ],
      en: [
        'The SVG uses role="img" and aria-label, and includes a <title> with the same description.',
        "It is decorative when the value is already text; the label should describe the trend.",
        "It does not replace a table or a textual value: the trend is not announced as exact data.",
      ],
    },
  },
  {
    slug: "bar-chart",
    id: "C-066",
    name: "BarChart",
    jp: "棒グラフ",
    description: {
      es: "Gráfico de barras decorativo con etiquetas y una tabla sr-only que repite los datos. La altura de cada barra es proporcional al máximo; el color y el grosor salen de tokens.",
      ja: "装飾的な棒グラフで、ラベルとデータを繰り返す sr-only の表を備えます。各棒の高さは最大値に比例し、色と太さはトークンから取ります。",
      en: "A decorative bar chart with labels and an sr-only table that repeats the data. Each bar's height is proportional to the maximum; color and weight come from tokens.",
    },
    requirements: [
      {
        kind: "provider",
        label: { es: "KotenProvider", ja: "KotenProvider", en: "KotenProvider" },
        detail: {
          es: "useKoten elige los encabezados de la tabla sr-only (Etiqueta/Valor) y el locale con el que se anuncian los datos.",
          ja: "useKoten が sr-only 表の見出し（項目/値）と、データを通知するロケールを選びます。",
          en: "useKoten picks the sr-only table headers (Label/Value) and the locale used to announce the data.",
        },
      },
    ],
    files: filesFor(uiFile("bar-chart.tsx")),
    examples: [
      {
        id: "daily",
        title: { es: "Serie diaria", ja: "日別の系列", en: "Daily series" },
        description: {
          es: "Barras decorativas y una tabla sr-only con la misma información.",
          ja: "装飾的な棒と、同じ情報を持つ sr-only の表。",
          en: "Decorative bars and an sr-only table with the same information.",
        },
        preview: <BarChartDemo />,
        code: `const data = [
  { label: "Lun", value: 42 },
  { label: "Mar", value: 58 },
  { label: "Mié", value: 36 },
  { label: "Jue", value: 71 },
  { label: "Vie", value: 64 },
  { label: "Sáb", value: 28 },
  { label: "Dom", value: 19 },
];

<BarChart
  label="Pedidos por día"
  data={data}
  height={140}
  formatValue={(value) => \`\${formatNumber(value)} pedidos\`}
/>`,
      },
    ],
    props: [
      {
        prop: "data",
        type: "readonly BarChartDatum[]",
        default: "—",
        note: {
          es: "Cada punto es { label, value }; el label también encabeza la fila de la tabla accesible.",
          ja: "各点は { label, value }。label はアクセシブルな表の行見出しにもなります。",
          en: "Each point is { label, value }; the label also heads the accessible table row.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Título visible y caption de la tabla sr-only.",
          ja: "可視のタイトルと sr-only 表の caption。",
          en: "Visible title and caption of the sr-only table.",
        },
      },
      {
        prop: "height",
        type: "number",
        default: "160",
        note: {
          es: "Alto del área de barras en px; las etiquetas quedan fuera.",
          ja: "棒領域の高さ（px）。ラベルはその外に置かれます。",
          en: "Height of the bar area in px; labels sit outside it.",
        },
      },
      {
        prop: "formatValue",
        type: "(value: number) => string",
        default: "String(value)",
        note: {
          es: "Formatea el valor de la tabla accesible y el title de cada barra.",
          ja: "アクセシブルな表の値と各棒の title を書式化します。",
          en: "Formats the accessible table value and the title of each bar.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Clases de la figura; el ancho se adapta al contenedor.",
          ja: "figure のクラス。幅はコンテナに合わせます。",
          en: "Classes for the figure; width adapts to the container.",
        },
      },
    ],
    a11y: {
      es: [
        "Las barras y las etiquetas visuales son aria-hidden; la información vive en una tabla sr-only con caption.",
        "La tabla de respaldo traduce los encabezados según el locale del KotenProvider.",
        "formatValue debe incluir la unidad; sin ella la tabla accesible pierde contexto.",
      ],
      ja: [
        "棒と可視ラベルは aria-hidden です。情報は caption 付きの sr-only 表にあります。",
        "代替表の見出しは KotenProvider のロケールに従って翻訳されます。",
        "formatValue には単位を含めてください。ないとアクセシブルな表の文脈が失われます。",
      ],
      en: [
        "Bars and visual labels are aria-hidden; the information lives in an sr-only table with a caption.",
        "The fallback table translates its headers according to the KotenProvider locale.",
        "formatValue should include the unit; without it the accessible table loses context.",
      ],
    },
  },
  {
    slug: "calendar",
    registrySlug: "date-picker",
    id: "C-063",
    name: "Calendar",
    jp: "暦",
    description: {
      es: "Rejilla mensual de fechas sin dependencias. Usa una tabla con encabezados de día, roving tabindex y navegación completa por teclado; el locale del KotenProvider decide el inicio de semana y los nombres con Intl.",
      ja: "依存関係のない月表示の日付グリッドです。曜日見出しを持つ表、ロービング tabindex、完全なキーボード操作を備え、KotenProvider のロケールが週の開始と Intl の名称を決めます。",
      en: "A dependency-free monthly date grid. It uses a table with weekday headers, roving tabindex and full keyboard navigation; the KotenProvider locale decides the week start and the Intl names.",
    },
    requirements: [
      {
        kind: "provider",
        label: { es: "KotenProvider", ja: "KotenProvider", en: "KotenProvider" },
        detail: {
          es: "useKoten aporta labels.previous/next y el locale; useKotenFormatters genera el mes, los días y el nombre accesible de cada fecha con Intl.",
          ja: "useKoten が labels.previous/next とロケールを提供し、useKotenFormatters が Intl で月名・曜日・各日付のアクセシブル名を生成します。",
          en: "useKoten supplies labels.previous/next and the locale; useKotenFormatters builds the month, weekdays and each date's accessible name with Intl.",
        },
      },
    ],
    files: filesFor(uiFile("date-picker.tsx")),
    examples: [
      {
        id: "single",
        title: { es: "Selección simple", ja: "単一選択", en: "Single selection" },
        description: {
          es: "Mes fijo de octubre de 2026, mínimo y máximo; la fecha se anuncia con Intl.",
          ja: "2026年10月を初期表示し、最小・最大を設定。日付は Intl で通知されます。",
          en: "October 2026 as the initial month, with min and max; the date is announced with Intl.",
        },
        preview: <CalendarDemo />,
        code: `const [selected, setSelected] = useState<Date | null>(new Date(2026, 9, 21));

<Calendar
  selected={selected}
  onSelect={setSelected}
  defaultMonth={new Date(2026, 9, 1)}
  min={new Date(2026, 9, 1)}
  max={new Date(2026, 11, 31)}
/>`,
      },
    ],
    props: [
      {
        prop: "selected",
        type: "Date | null",
        default: "—",
        note: {
          es: "Fecha seleccionada en modo simple; se marca con aria-pressed.",
          ja: "単一モードで選択された日付。aria-pressed で示されます。",
          en: "Selected date in single mode; marked with aria-pressed.",
        },
      },
      {
        prop: "onSelect",
        type: "(date: Date) => void",
        default: "—",
        note: {
          es: "Se llama al hacer clic o pulsar Enter/Space sobre el día enfocado.",
          ja: "クリック、またはフォーカス中の日に Enter/Space を押すと呼ばれます。",
          en: "Called on click or when Enter/Space is pressed on the focused day.",
        },
      },
      {
        prop: "rangeStart / rangeEnd",
        type: "Date | null",
        default: "—",
        note: {
          es: "Extremos del rango; los días intermedios usan bg-selection.",
          ja: "範囲の両端。中間の日は bg-selection を使います。",
          en: "Range endpoints; days in between use bg-selection.",
        },
      },
      {
        prop: "month",
        type: "Date",
        default: "—",
        note: {
          es: "Controla el mes visible; sin él, el componente mantiene su propio estado.",
          ja: "表示月を制御します。指定しない場合は内部状態を使います。",
          en: "Controls the visible month; without it, the component keeps its own state.",
        },
      },
      {
        prop: "defaultMonth",
        type: "Date",
        default: "valor u hoy",
        note: {
          es: "Mes inicial cuando no hay valor ni month; por defecto, el seleccionado o hoy.",
          ja: "値も month もない場合の初期月。既定では選択日または今日です。",
          en: "Initial month when there is no value or month; defaults to the selected date or today.",
        },
      },
      {
        prop: "onMonthChange",
        type: "(month: Date) => void",
        default: "—",
        note: {
          es: "Notifica el cambio de mes al navegar con flechas o PageUp/PageDown.",
          ja: "矢印や PageUp/PageDown で月が変わったときに通知します。",
          en: "Notifies month changes when navigating with arrows or PageUp/PageDown.",
        },
      },
      {
        prop: "min / max",
        type: "Date",
        default: "—",
        note: {
          es: "Deshabilitan los días fuera del rango y limitan el foco.",
          ja: "範囲外の日を無効にし、フォーカスの移動を制限します。",
          en: "Disable days outside the range and limit focus movement.",
        },
      },
      {
        prop: "autoFocus",
        type: "boolean",
        default: "false",
        note: {
          es: "Enfoca el día seleccionado o hoy al montar; útil dentro de un panel.",
          ja: "マウント時に選択日または今日へフォーカスします。パネル内で便利です。",
          en: "Focuses the selected day or today on mount; useful inside a panel.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Clases del contenedor; el ancho base es 17.5rem.",
          ja: "コンテナのクラス。基本幅は 17.5rem です。",
          en: "Container classes; the base width is 17.5rem.",
        },
      },
    ],
    a11y: {
      es: [
        "La rejilla es una tabla con encabezados de día y un nombre accesible completo en cada fecha.",
        "Roving tabindex: solo el día enfocado tiene tabindex=0, así que la rejilla es un único paso de tabulación.",
        'Flechas, Home/End, PageUp/PageDown, Enter y Space están soportados; aria-pressed marca la selección y aria-current="date" el día de hoy.',
        "El locale del KotenProvider decide el inicio de semana y los nombres de mes y día.",
      ],
      ja: [
        "グリッドは曜日見出しを持つ表で、各日付に完全なアクセシブル名があります。",
        "ロービング tabindex により、tabindex=0 はフォーカス中の日だけです。グリッド全体でタブ移動は1回です。",
        '矢印、Home/End、PageUp/PageDown、Enter、Space に対応します。選択は aria-pressed、今日は aria-current="date" で示します。',
        "KotenProvider のロケールが週の開始と月・曜日の名称を決めます。",
      ],
      en: [
        "The grid is a table with weekday headers and a full accessible name on every date.",
        "Roving tabindex: only the focused day has tabindex=0, so the grid is a single tab stop.",
        'Arrows, Home/End, PageUp/PageDown, Enter and Space are supported; aria-pressed marks selection and aria-current="date" marks today.',
        "The KotenProvider locale decides the week start and the month and weekday names.",
      ],
    },
  },
  {
    slug: "date-picker",
    id: "C-064",
    name: "DatePicker",
    jp: "日付選択",
    description: {
      es: "Campo de fecha con panel anclado, sin portal. Cubre fecha simple y rango, formatea con Intl y devuelve Date por onValueChange; en la aplicación el estado se guarda como ISO 8601 y se convierte al renderizar.",
      ja: "ポータルを使わずフィールドに固定された日付パネルです。単一日付と範囲を扱い、Intl で書式化し、onValueChange で Date を返します。アプリ側では ISO 8601 で保持し、描画時に変換します。",
      en: "A date field with an anchored panel, not portalled. It covers single dates and ranges, formats with Intl and returns Date through onValueChange; the application stores ISO 8601 and converts it at render time.",
    },
    requirements: [
      {
        kind: "provider",
        label: { es: "KotenProvider", ja: "KotenProvider", en: "KotenProvider" },
        detail: {
          es: "useKoten aporta los labels del panel y el locale; useKotenFormatters formatea el valor visible y los días del calendario.",
          ja: "useKoten がパネルのラベルとロケールを提供し、useKotenFormatters が表示値とカレンダーの日付を書式化します。",
          en: "useKoten supplies the panel labels and the locale; useKotenFormatters formats the visible value and the calendar days.",
        },
      },
      {
        kind: "controlled",
        label: {
          es: "Valor controlado (ISO 8601)",
          ja: "制御値（ISO 8601）",
          en: "Controlled value (ISO 8601)",
        },
        detail: {
          es: "Guarda la fecha como ISO en tu estado, conviértela a Date para value y vuelve a ISO en onValueChange. value y onValueChange son la única fuente de verdad.",
          ja: "日付を ISO で状態に保持し、value には Date に変換して渡し、onValueChange で ISO に戻します。value と onValueChange が唯一の真実の源です。",
          en: "Store the date as ISO in your state, convert it to Date for value and back to ISO in onValueChange. value and onValueChange are the single source of truth.",
        },
      },
    ],
    files: filesFor(uiFile("date-picker.tsx")),
    examples: [
      {
        id: "controlled",
        title: {
          es: "Valor controlado (ISO)",
          ja: "制御値（ISO）",
          en: "Controlled value (ISO)",
        },
        description: {
          es: "El estado de la aplicación guarda ISO 8601 y el campo lo convierte a Date.",
          ja: "アプリの状態は ISO 8601 を保持し、フィールドが Date に変換します。",
          en: "The application state stores ISO 8601 and the field converts it to Date.",
        },
        preview: <DatePickerSingleDemo />,
        code: `const toIso = (date: Date) =>
  \`\${date.getFullYear()}-\${String(date.getMonth() + 1).padStart(2, "0")}-\${String(date.getDate()).padStart(2, "0")}\`;

const [iso, setIso] = useState("2026-10-21");
const value = iso ? new Date(\`\${iso}T00:00:00\`) : null;

<DatePicker
  label="Fecha de entrega"
  description="Abre con Enter, Space o clic; Escape cierra y devuelve el foco."
  placeholder="Selecciona una fecha"
  value={value}
  onValueChange={(next) => setIso(next ? toIso(next) : "")}
  min={new Date(2026, 9, 1)}
  max={new Date(2026, 11, 31)}
  defaultMonth={new Date(2026, 9, 1)}
/>`,
      },
      {
        id: "range",
        title: { es: "Rango", ja: "範囲", en: "Range" },
        description: {
          es: "Inicio y fin en un solo campo; el panel se ancla al botón.",
          ja: "1つのフィールドで開始と終了を扱います。パネルはボタンに固定されます。",
          en: "Start and end in a single field; the panel is anchored to the button.",
        },
        preview: <DatePickerRangeDemo />,
        code: `const [range, setRange] = useState<DateRange>({
  start: new Date(2026, 9, 21),
  end: new Date(2026, 9, 27),
});

<DatePicker
  mode="range"
  label="Periodo de campaña"
  description="Primer clic: inicio. Segundo clic: fin."
  placeholder="Selecciona un periodo"
  value={range}
  onValueChange={setRange}
  min={new Date(2026, 9, 1)}
  max={new Date(2026, 11, 31)}
  defaultMonth={new Date(2026, 9, 1)}
/>`,
      },
    ],
    props: [
      {
        prop: "mode",
        type: '"single" | "range"',
        default: '"single"',
        note: {
          es: "En range, value es DateRange y el panel espera dos clics.",
          ja: "range では value は DateRange で、パネルは2回のクリックを待ちます。",
          en: "In range mode, value is a DateRange and the panel expects two clicks.",
        },
      },
      {
        prop: "value",
        type: "Date | DateRange | null",
        default: "—",
        note: {
          es: "Valor controlado; en single es Date y en range es { start, end }.",
          ja: "制御値。single では Date、range では { start, end } です。",
          en: "Controlled value; Date in single mode and { start, end } in range mode.",
        },
      },
      {
        prop: "defaultValue",
        type: "Date | DateRange | null",
        default: "null",
        note: {
          es: "Valor inicial no controlado.",
          ja: "非制御の初期値。",
          en: "Initial uncontrolled value.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: Date | DateRange | null) => void",
        default: "—",
        note: {
          es: "Recibe Date o DateRange según mode; en la app conviene guardar ISO.",
          ja: "mode に応じて Date または DateRange を受け取ります。アプリでは ISO で保存すると便利です。",
          en: "Receives Date or DateRange depending on mode; the app usually stores ISO.",
        },
      },
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Etiqueta visible; también nombra el panel si no se pasa dialogLabel.",
          ja: "可視ラベル。dialogLabel がなければパネルの名前にもなります。",
          en: "Visible label; it also names the panel when dialogLabel is not set.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Ayuda conectada con aria-describedby.",
          ja: "aria-describedby で接続される説明。",
          en: "Help text connected through aria-describedby.",
        },
      },
      {
        prop: "error",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Marca aria-invalid y se anuncia en una región aria-live.",
          ja: "aria-invalid を付け、aria-live 領域で通知します。",
          en: "Sets aria-invalid and is announced in an aria-live region.",
        },
      },
      {
        prop: "required",
        type: "boolean",
        default: "false",
        note: {
          es: "Agrega el asterisco visual y el estado obligatorio del campo.",
          ja: "視覚的なアスタリスクと必須状態を追加します。",
          en: "Adds the visual asterisk and the field's required state.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Deshabilita el botón y evita abrir el panel.",
          ja: "ボタンを無効にし、パネルを開けなくします。",
          en: "Disables the button and prevents the panel from opening.",
        },
      },
      {
        prop: "placeholder",
        type: "string",
        default: "—",
        note: {
          es: "Texto cuando no hay valor; se muestra en color faint.",
          ja: "値がないときのテキスト。faint 色で表示されます。",
          en: "Text when there is no value; shown in the faint color.",
        },
      },
      {
        prop: "min / max",
        type: "Date",
        default: "—",
        note: {
          es: "Los días fuera del rango quedan deshabilitados.",
          ja: "範囲外の日は無効になります。",
          en: "Days outside the range are disabled.",
        },
      },
      {
        prop: "defaultMonth",
        type: "Date",
        default: "valor u hoy",
        note: {
          es: "Mes con el que abre el panel; por defecto, el valor o hoy.",
          ja: "パネルを開く月。既定では値または今日です。",
          en: "Month the panel opens on; defaults to the value or today.",
        },
      },
      {
        prop: "dialogLabel",
        type: "string",
        default: "label",
        note: {
          es: "Nombre accesible del panel; por defecto usa label si es string.",
          ja: "パネルのアクセシブル名。既定では label が文字列ならそれを使います。",
          en: "Accessible name of the panel; defaults to label when it is a string.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Clases del contenedor del campo.",
          ja: "フィールドコンテナのクラス。",
          en: "Classes for the field container.",
        },
      },
    ],
    a11y: {
      es: [
        'El campo es un botón con aria-haspopup="dialog", aria-expanded y aria-controls hacia el panel.',
        "El panel se ancla al campo (sin portal); Escape lo cierra y devuelve el foco al botón.",
        "label, description y error se conectan con aria-labelledby y aria-describedby; el error usa aria-live.",
        "El valor visible se formatea con Intl; el estado controlado conserva el ISO en la aplicación.",
      ],
      ja: [
        'フィールドは aria-haspopup="dialog"、aria-expanded、aria-controls を持つボタンです。',
        "パネルはフィールドに固定され（ポータルなし）、Escape で閉じてボタンにフォーカスを戻します。",
        "label・description・error は aria-labelledby と aria-describedby で接続され、error は aria-live を使います。",
        "表示値は Intl で書式化され、制御状態はアプリ側で ISO を保ちます。",
      ],
      en: [
        'The field is a button with aria-haspopup="dialog", aria-expanded and aria-controls pointing to the panel.',
        "The panel is anchored to the field (no portal); Escape closes it and returns focus to the button.",
        "label, description and error are connected through aria-labelledby and aria-describedby; the error uses aria-live.",
        "The visible value is formatted with Intl; the controlled state keeps ISO in the application.",
      ],
    },
  },
];
