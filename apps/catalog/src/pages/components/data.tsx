import {
  Badge,
  BarChart,
  DataTable,
  type DataTableColumn,
  Sparkline,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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

const stateLabel = {
  pending: "Pendiente",
  preparing: "Preparando",
  shipped: "Enviado",
} as const;

const columns: DataTableColumn<Order>[] = [
  {
    id: "id",
    header: "Pedido",
    cell: (row) => <span className="font-mono text-2xs">{row.id}</span>,
    sortValue: (row) => row.id,
    sortable: true,
  },
  {
    id: "customer",
    header: "Cliente",
    cell: (row) => row.customer,
  },
  {
    id: "state",
    header: "Estado",
    cell: (row) => (
      <Badge tone={stateTone[row.state]} dot>
        {stateLabel[row.state]}
      </Badge>
    ),
  },
  {
    id: "total",
    header: "Total",
    cell: (row) => `¥${row.total.toLocaleString("es-ES")}`,
    sortValue: (row) => row.total,
    sortable: true,
    align: "right",
  },
];

const chartData = [
  { label: "Lun", value: 42 },
  { label: "Mar", value: 58 },
  { label: "Mié", value: 36 },
  { label: "Jue", value: 71 },
  { label: "Vie", value: 64 },
  { label: "Sáb", value: 28 },
  { label: "Dom", value: 19 },
];

export function DataPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · データ"
        title="Datos"
        jp="データ"
        description="Tablas, KPIs y charts con números tabulares y un fallback accesible. En Daichō la tabla es el centro; el color de estado siempre lleva texto."
        meta="table · data-table · stat-card · sparkline · bar-chart"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="table" title="Table" jp="表" meta="Semántica y densidad">
          <Table>
            <caption>Resumen de pedidos</caption>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 4).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-2xs">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    ¥{order.total.toLocaleString("es-ES")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section id="data-table" title="DataTable" jp="台帳" meta="Sort, selección y paginación">
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
            selectRowLabel={(id) => `Seleccionar ${id}`}
            selectedLabel={(count) => `${count} pedidos seleccionados`}
            selectable
            pageSize={5}
          />
        </Section>

        <Section id="stats" title="StatCard y Sparkline" jp="指標" meta="KPIs con tendencia">
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Pedidos hoy"
              value="42"
              delta={{ value: "+8 %", tone: "success" }}
              meta="vs. ayer"
              sparkline={
                <Sparkline data={[18, 24, 21, 32, 28, 38, 42]} label="Tendencia de pedidos" />
              }
            />
            <StatCard
              label="Pendientes"
              value="7"
              delta={{ value: "-2", tone: "success" }}
              meta="Requieren preparación"
              sparkline={
                <Sparkline data={[12, 10, 9, 11, 8, 9, 7]} label="Tendencia de pendientes" />
              }
            />
            <StatCard
              label="Ingresos"
              value="¥1.284.000"
              delta={{ value: "+12 %", tone: "success" }}
              meta="Últimos 7 días"
              sparkline={
                <Sparkline data={[8, 9, 8, 11, 10, 12, 13]} label="Tendencia de ingresos" />
              }
            />
            <StatCard
              label="Stock bajo"
              value="4"
              delta={{ value: "+1", tone: "danger" }}
              meta="SKUs bajo mínimo"
              sparkline={<Sparkline data={[2, 2, 3, 2, 3, 3, 4]} label="Tendencia de stock bajo" />}
            />
          </div>
        </Section>

        <Section id="bar-chart" title="BarChart" jp="棒グラフ" meta="Fallback en tabla">
          <BarChart
            label="Pedidos por día"
            data={chartData}
            formatValue={(value) => `${value} pedidos`}
          />
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Cinco piezas">
          <PropsTable
            caption="Props de datos"
            rows={[
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
            ]}
          />
          <Code>{`<DataTable
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

<BarChart label="Pedidos por día" data={chartData} />`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Tabla y charts">
          <List
            label="Notas de accesibilidad de datos"
            items={[
              "La tabla usa caption, thead, th con scope y celdas semánticas.",
              "El header ordenable expone aria-sort y un botón real.",
              "La selección se anuncia con aria-live y checkbox con label.",
              "Sparkline y BarChart incluyen texto alternativo; el chart visual es decorativo.",
              "Los números usan tabular-nums y se alinean a la derecha.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
