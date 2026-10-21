import {
  BarChart,
  buttonVariants,
  cn,
  type KotenLocale,
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTitle,
  Sparkline,
  StatCard,
  StatusBadge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useKotenFormatters,
} from "@koten/ui";
import { Link } from "react-router";
import {
  customerById,
  dailySeries,
  kpis,
  lowStockSeries,
  orderDay,
  pick,
  recentOrders,
  revenue7d,
  revenueSeries,
  tasks,
  todaySeries,
} from "../data";
import type { ErpCopy } from "../data/copy";

const taskTones = {
  warning: "bg-warning",
  info: "bg-info",
  danger: "bg-danger",
} as const;

export function DashboardPage({ copy, locale }: { copy: ErpCopy; locale: KotenLocale }) {
  const formatters = useKotenFormatters();
  const orderDelta = kpis.ordersToday - kpis.ordersYesterday;
  const revenueDelta =
    kpis.previousRevenue7d > 0
      ? Math.round(((revenue7d - kpis.previousRevenue7d) / kpis.previousRevenue7d) * 100)
      : 0;
  const chartData = dailySeries.map((point) => ({
    label: formatters.formatDate(`${point.date}T00:00:00Z`, {
      day: "numeric",
      timeZone: "UTC",
    }),
    value: point.count,
  }));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rule-strong pb-[var(--koten-panel-p)]">
        <div className="min-w-0">
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
            {copy.dashboard.eyebrow}
          </p>
          <h1 className="mt-0.5 font-serif text-2xl font-semibold leading-tight">
            {copy.dashboard.title}
          </h1>
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted">
            {copy.dashboard.description}
          </p>
        </div>
        <Link to="/orders/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
          + {copy.dashboard.newOrder}
        </Link>
      </div>

      <section
        aria-label={copy.dashboard.title}
        className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label={copy.dashboard.kpi.ordersToday}
          value={formatters.formatNumber(kpis.ordersToday)}
          delta={{
            value: `${orderDelta >= 0 ? "+" : ""}${orderDelta}`,
            tone: orderDelta >= 0 ? "success" : "danger",
          }}
          meta={copy.dashboard.meta.vsYesterday}
          sparkline={<Sparkline data={todaySeries} label={copy.dashboard.kpi.ordersToday} />}
        />
        <StatCard
          label={copy.dashboard.kpi.openOrders}
          value={formatters.formatNumber(kpis.openOrders)}
          meta={copy.dashboard.meta.openHint}
          sparkline={<Sparkline data={todaySeries} label={copy.dashboard.kpi.openOrders} />}
        />
        <StatCard
          label={copy.dashboard.kpi.revenue}
          value={formatters.formatCurrency(revenue7d, { maximumFractionDigits: 0 })}
          delta={{
            value: `${revenueDelta >= 0 ? "+" : ""}${revenueDelta} %`,
            tone: revenueDelta >= 0 ? "success" : "danger",
          }}
          meta={copy.dashboard.meta.revenueHint}
          sparkline={<Sparkline data={revenueSeries} label={copy.dashboard.kpi.revenue} />}
        />
        <StatCard
          label={copy.dashboard.kpi.lowStock}
          value={formatters.formatNumber(kpis.lowStock)}
          meta={copy.dashboard.meta.lowStockHint}
          sparkline={<Sparkline data={lowStockSeries} label={copy.dashboard.kpi.lowStock} />}
        />
      </section>

      <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] xl:grid-cols-[minmax(0,1fr)_320px]">
        <Panel>
          <PanelHeader>
            <PanelTitle as="h2">{copy.dashboard.chart.title}</PanelTitle>
            <PanelActions>
              <span className="text-2xs text-faint">{copy.dashboard.chart.meta}</span>
            </PanelActions>
          </PanelHeader>
          <PanelBody>
            <BarChart
              label={copy.dashboard.chart.title}
              data={chartData}
              height={150}
              formatValue={copy.dashboard.chart.valueLabel}
            />
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader>
            <PanelTitle as="h2">{copy.dashboard.tasks.title}</PanelTitle>
            <PanelActions>
              <span className="text-2xs text-faint">{copy.dashboard.tasks.meta}</span>
            </PanelActions>
          </PanelHeader>
          <PanelBody>
            <ul className="divide-y divide-rule border-y border-rule">
              {tasks.map((task) => (
                <li key={task.id} className="min-h-[var(--koten-row-h)] py-1.5">
                  <Link
                    to={task.href}
                    className="flex items-start gap-2 text-xs no-underline hover:text-link"
                  >
                    <span
                      aria-hidden="true"
                      className={cn("mt-1 size-1.5 shrink-0 rounded-full", taskTones[task.tone])}
                    />
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">
                        {pick(task.title, locale)}
                      </span>
                      <span className="block text-2xs text-muted">{pick(task.detail, locale)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </PanelBody>
        </Panel>
      </div>

      <Panel className="mt-[var(--koten-gap)]">
        <PanelHeader>
          <PanelTitle as="h2">{copy.dashboard.recent.title}</PanelTitle>
          <PanelActions>
            <span className="text-2xs text-faint">{copy.dashboard.recent.meta}</span>
            <Link
              to="/orders"
              className="text-2xs font-semibold text-link underline-offset-2 hover:underline"
            >
              {copy.dashboard.recent.viewAll} →
            </Link>
          </PanelActions>
        </PanelHeader>
        <PanelBody flush>
          <Table>
            <TableCaption>{copy.dashboard.recent.caption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.orders.table.id}</TableHead>
                <TableHead>{copy.orders.table.customer}</TableHead>
                <TableHead>{copy.orders.table.date}</TableHead>
                <TableHead>{copy.orders.table.channel}</TableHead>
                <TableHead>{copy.orders.table.warehouse}</TableHead>
                <TableHead className="text-end">{copy.orders.table.items}</TableHead>
                <TableHead className="text-end">{copy.orders.table.total}</TableHead>
                <TableHead>{copy.orders.table.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => {
                const customer = customerById(order.customerId);

                return (
                  <TableRow key={order.id}>
                    <TableCell className="whitespace-nowrap font-mono text-2xs">
                      <Link
                        to={`/orders?q=${encodeURIComponent(order.id)}`}
                        className="text-link underline-offset-2 hover:underline"
                      >
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-40 truncate">
                      {customer ? pick(customer.company, locale) : order.customerId}
                    </TableCell>
                    <TableCell className="text-2xs tabular-nums text-muted">
                      {formatters.formatDate(`${orderDay(order)}T00:00:00Z`, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        timeZone: "UTC",
                      })}
                    </TableCell>
                    <TableCell className="text-2xs">{copy.channel[order.channel]}</TableCell>
                    <TableCell className="text-2xs">{copy.warehouse[order.warehouse]}</TableCell>
                    <TableCell className="text-end tabular-nums">{order.itemCount}</TableCell>
                    <TableCell className="text-end tabular-nums">
                      {formatters.formatCurrency(order.total, { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} label={copy.status[order.status]} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </PanelBody>
      </Panel>
    </div>
  );
}
