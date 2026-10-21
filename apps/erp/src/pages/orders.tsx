import {
  Breadcrumb,
  Button,
  buttonVariants,
  cn,
  DataTable,
  type DataTableColumn,
  DetailDrawer,
  DetailSection,
  Field,
  FilterBar,
  IconButton,
  Input,
  type KotenLocale,
  PageHeader,
  Select,
  StatusBadge,
  Timeline,
  useKotenFormatters,
  useToast,
} from "@koten/ui";
import { Eye, Printer } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  customerById,
  type Order,
  type OrderStatus,
  orderDay,
  orders,
  pick,
  type WarehouseId,
} from "../data";
import type { ErpCopy } from "../data/copy";

const statusIds: readonly OrderStatus[] = [
  "pending",
  "preparing",
  "shipped",
  "cancelled",
  "returned",
];
const warehouseIds: readonly WarehouseId[] = ["tokyo", "osaka", "fukuoka"];
const rangeIds = ["today", "week", "month", "all"] as const;
type RangeId = (typeof rangeIds)[number];

const DAY = 86_400_000;

function isStatus(value: string | null): value is OrderStatus {
  return statusIds.some((status) => status === value);
}

function isWarehouse(value: string | null): value is WarehouseId {
  return warehouseIds.some((warehouse) => warehouse === value);
}

function isRange(value: string | null): value is RangeId {
  return rangeIds.some((range) => range === value);
}

function rangeStart(range: RangeId): string {
  if (range === "all") {
    return "0000-00-00";
  }

  const days = range === "today" ? 0 : range === "week" ? 6 : 29;
  const timestamp = Date.UTC(2026, 9, 21) - days * DAY;

  return new Date(timestamp).toISOString().slice(0, 10);
}

export function OrdersPage({ copy, locale }: { copy: ErpCopy; locale: KotenLocale }) {
  const formatters = useKotenFormatters();
  const toast = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const applied = useMemo(
    () => ({
      q: params.get("q") ?? "",
      status: isStatus(params.get("status")) ? (params.get("status") as OrderStatus) : "all",
      warehouse: isWarehouse(params.get("warehouse"))
        ? (params.get("warehouse") as WarehouseId)
        : "all",
      range: isRange(params.get("range")) ? (params.get("range") as RangeId) : "all",
    }),
    [params],
  );
  const [draft, setDraft] = useState(applied);
  const [overrides, setOverrides] = useState<Record<string, OrderStatus>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [selectionKey, setSelectionKey] = useState(0);

  useEffect(() => {
    setDraft(applied);
  }, [applied]);

  const data = useMemo(
    () =>
      orders.map((order) => {
        const override = overrides[order.id];

        return override ? { ...order, status: override } : order;
      }),
    [overrides],
  );

  const filtered = useMemo(() => {
    const query = applied.q.trim().toLowerCase();
    const start = rangeStart(applied.range);

    return data.filter((order) => {
      if (applied.status !== "all" && order.status !== applied.status) {
        return false;
      }
      if (applied.warehouse !== "all" && order.warehouse !== applied.warehouse) {
        return false;
      }
      if (orderDay(order) < start) {
        return false;
      }
      if (!query) {
        return true;
      }

      const customer = customerById(order.customerId);
      const haystack = [
        order.id,
        ...(customer ? Object.values(customer.company) : []),
        ...order.lines.flatMap((line) => [line.sku, ...Object.values(line.name)]),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [applied, data]);

  const applyParams = (next: URLSearchParams) => {
    setParams(next, { replace: true });
    setSelected([]);
    setSelectionKey((key) => key + 1);
  };

  const applyFilters = () => {
    const next = new URLSearchParams(params);

    if (draft.q.trim()) {
      next.set("q", draft.q.trim());
    } else {
      next.delete("q");
    }
    if (draft.status !== "all") {
      next.set("status", draft.status);
    } else {
      next.delete("status");
    }
    if (draft.warehouse !== "all") {
      next.set("warehouse", draft.warehouse);
    } else {
      next.delete("warehouse");
    }
    if (draft.range !== "all") {
      next.set("range", draft.range);
    } else {
      next.delete("range");
    }

    applyParams(next);
  };

  const resetFilters = () => {
    const next = new URLSearchParams(params);
    next.delete("q");
    next.delete("status");
    next.delete("warehouse");
    next.delete("range");
    setDraft({ q: "", status: "all", warehouse: "all", range: "all" });
    applyParams(next);
  };

  const markOrders = useCallback(
    (ids: readonly string[], status: OrderStatus) => {
      if (ids.length === 0) {
        return;
      }

      setOverrides((current) => {
        const next = { ...current };

        for (const id of ids) {
          next[id] = status;
        }

        return next;
      });
      toast.add({
        title: copy.status[status],
        description: copy.orders.bulk.success(ids.length, copy.status[status]),
        type: "success",
      });
    },
    [copy, toast],
  );

  const clearSelection = () => {
    setSelected([]);
    setSelectionKey((key) => key + 1);
  };

  const markSelected = (status: OrderStatus) => {
    markOrders(selected, status);
    clearSelection();
  };

  const exportSelected = () => {
    if (selected.length === 0) {
      return;
    }

    const rows = data.filter((order) => selected.includes(order.id));
    const header = ["id", "customer", "status", "total", "createdAt"];
    const lines = rows.map((order) => {
      const customer = customerById(order.customerId);

      return [
        order.id,
        customer ? pick(customer.company, locale) : order.customerId,
        copy.status[order.status],
        String(order.total),
        order.createdAt,
      ]
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(",");
    });
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "kura-orders.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast.add({
      title: copy.common.export,
      description: copy.orders.bulk.exportSuccess(rows.length),
      type: "info",
    });
  };

  const columns = useMemo<DataTableColumn<Order>[]>(
    () => [
      {
        id: "id",
        header: copy.orders.table.id,
        cell: (order) => <span className="font-mono text-2xs">{order.id}</span>,
        sortValue: (order) => order.id,
        sortable: true,
      },
      {
        id: "customer",
        header: copy.orders.table.customer,
        cell: (order) => {
          const customer = customerById(order.customerId);

          return customer ? pick(customer.company, locale) : order.customerId;
        },
        sortValue: (order) => customerById(order.customerId)?.company[locale] ?? order.customerId,
        sortable: true,
      },
      {
        id: "date",
        header: copy.orders.table.date,
        cell: (order) =>
          formatters.formatDate(`${orderDay(order)}T00:00:00Z`, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          }),
        sortValue: (order) => order.createdAt,
        sortable: true,
      },
      {
        id: "channel",
        header: copy.orders.table.channel,
        cell: (order) => copy.channel[order.channel],
      },
      {
        id: "warehouse",
        header: copy.orders.table.warehouse,
        cell: (order) => copy.warehouse[order.warehouse],
      },
      {
        id: "items",
        header: copy.orders.table.items,
        cell: (order) => order.itemCount,
        sortValue: (order) => order.itemCount,
        sortable: true,
        align: "right",
      },
      {
        id: "total",
        header: copy.orders.table.total,
        cell: (order) => formatters.formatCurrency(order.total, { maximumFractionDigits: 0 }),
        sortValue: (order) => order.total,
        sortable: true,
        align: "right",
      },
      {
        id: "status",
        header: copy.orders.table.status,
        cell: (order) => <StatusBadge status={order.status} label={copy.status[order.status]} />,
      },
      {
        id: "actions",
        header: copy.orders.table.actions,
        cell: (order) => {
          const customer = customerById(order.customerId);

          return (
            <DetailDrawer
              trigger={
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  aria-label={copy.orders.table.viewOrder(order.id)}
                >
                  <Eye className="size-3.5" aria-hidden="true" />
                  {copy.common.view}
                </Button>
              }
              title={copy.orders.detail.title(order.id)}
              description={copy.orders.detail.description}
              status={<StatusBadge status={order.status} label={copy.status[order.status]} />}
              summary={
                <div className="text-2xs text-muted">
                  <p className="text-xs font-semibold text-ink">
                    {customer ? pick(customer.company, locale) : order.customerId}
                  </p>
                  <p className="mt-0.5">{customer?.contact}</p>
                </div>
              }
              closeLabel={copy.orders.detail.close}
              footer={
                <>
                  <IconButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    label={copy.orders.detail.print}
                    onClick={() => window.print()}
                  >
                    <Printer className="size-3.5" aria-hidden="true" />
                  </IconButton>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => markOrders([order.id], "preparing")}
                  >
                    {copy.orders.detail.markPreparing}
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => markOrders([order.id], "shipped")}
                  >
                    {copy.orders.detail.markShipped}
                  </Button>
                </>
              }
            >
              <DetailSection title={copy.orders.detail.customer}>
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-2xs">
                  <dt className="text-faint">{copy.orders.detail.contact}</dt>
                  <dd className="text-right text-ink">{customer?.contact ?? "—"}</dd>
                  <dt className="text-faint">{copy.orders.detail.customer}</dt>
                  <dd className="text-right text-ink">
                    {customer ? pick(customer.company, locale) : order.customerId}
                  </dd>
                  <dt className="text-faint">{copy.form.fields.email}</dt>
                  <dd className="min-w-0 break-all text-right text-ink">
                    {customer?.email ?? "—"}
                  </dd>
                  <dt className="text-faint">{copy.form.fields.phone}</dt>
                  <dd className="text-right tabular-nums text-ink">{customer?.phone ?? "—"}</dd>
                </dl>
              </DetailSection>

              <DetailSection title={copy.orders.detail.shipping}>
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-2xs">
                  <dt className="text-faint">{copy.orders.detail.warehouse}</dt>
                  <dd className="text-right text-ink">{copy.warehouse[order.warehouse]}</dd>
                  <dt className="text-faint">{copy.orders.detail.channel}</dt>
                  <dd className="text-right text-ink">{copy.channel[order.channel]}</dd>
                  <dt className="text-faint">{copy.orders.detail.payment}</dt>
                  <dd className="text-right text-ink">{copy.payment[order.payment]}</dd>
                  <dt className="text-faint">{copy.orders.detail.dueDate}</dt>
                  <dd className="text-right tabular-nums text-ink">
                    {formatters.formatDate(order.dueDate, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </dd>
                  {order.tracking ? (
                    <>
                      <dt className="text-faint">{copy.orders.detail.tracking}</dt>
                      <dd className="text-right font-mono text-ink">{order.tracking}</dd>
                    </>
                  ) : null}
                </dl>
              </DetailSection>

              <DetailSection
                title={copy.orders.detail.lines}
                meta={copy.orders.detail.itemCount(order.itemCount)}
              >
                <div className="overflow-x-auto border border-rule">
                  <table className="w-full min-w-[22rem] border-collapse text-2xs">
                    <thead>
                      <tr className="border-b border-rule-strong bg-tint text-faint">
                        <th scope="col" className="px-2 py-1 text-left font-semibold">
                          {copy.orders.detail.product}
                        </th>
                        <th scope="col" className="px-2 py-1 text-right font-semibold">
                          {copy.orders.detail.quantity}
                        </th>
                        <th scope="col" className="px-2 py-1 text-right font-semibold">
                          {copy.orders.detail.lineTotal}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {order.lines.map((line) => (
                        <tr key={`${order.id}-${line.productId}`}>
                          <th scope="row" className="px-2 py-1 text-left font-normal">
                            <span className="block font-semibold text-ink">
                              {pick(line.name, locale)}
                            </span>
                            <span className="block font-mono text-faint">{line.sku}</span>
                          </th>
                          <td className="px-2 py-1 text-right tabular-nums">{line.quantity}</td>
                          <td className="px-2 py-1 text-right tabular-nums">
                            {formatters.formatCurrency(line.unitPrice * line.quantity, {
                              maximumFractionDigits: 0,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-rule-strong bg-tint">
                        <th scope="row" className="px-2 py-1 text-left font-semibold">
                          {copy.orders.detail.total}
                        </th>
                        <td className="px-2 py-1 text-right tabular-nums">{order.itemCount}</td>
                        <td className="px-2 py-1 text-right font-semibold tabular-nums">
                          {formatters.formatCurrency(order.total, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </DetailSection>

              {order.note ? (
                <DetailSection title={copy.orders.detail.note}>
                  <p className="border-s-[3px] border-s-warning bg-surface px-2 py-1 text-2xs text-muted">
                    {pick(order.note, locale)}
                  </p>
                </DetailSection>
              ) : null}

              <DetailSection title={copy.orders.detail.timeline}>
                <Timeline
                  label={copy.orders.detail.timeline}
                  emptyLabel={copy.orders.detail.timelineEmpty}
                  events={order.events.map((event) => ({
                    id: event.id,
                    time: formatters.formatDate(event.at, {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    }),
                    dateTime: event.at,
                    title: pick(event.title, locale),
                    description: event.description ? pick(event.description, locale) : undefined,
                    tone: event.tone,
                  }))}
                />
              </DetailSection>
            </DetailDrawer>
          );
        },
      },
    ],
    [copy, formatters, locale, markOrders],
  );

  return (
    <div>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            label={copy.shell.breadcrumbLabel}
            onNavigate={navigate}
            items={[{ label: copy.shell.breadcrumbHome, href: "/" }, { label: copy.orders.title }]}
          />
        }
        eyebrow={copy.orders.eyebrow}
        title={copy.orders.title}
        description={copy.orders.description}
        actions={
          <Link to="/orders/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            + {copy.orders.newOrder}
          </Link>
        }
      />

      <div className="mt-[var(--koten-gap)]">
        <FilterBar
          label={copy.orders.filters.label}
          submitLabel={copy.orders.filters.submit}
          resetLabel={copy.orders.filters.reset}
          resultLabel={copy.orders.filters.results(filtered.length)}
          onSubmit={applyFilters}
          onReset={resetFilters}
        >
          <Field label={copy.orders.filters.search}>
            <Input
              type="search"
              value={draft.q}
              placeholder={copy.orders.filters.searchPlaceholder}
              onChange={(event) => setDraft((current) => ({ ...current, q: event.target.value }))}
            />
          </Field>

          <Select
            label={copy.orders.filters.status}
            value={draft.status}
            onValueChange={(value) =>
              setDraft((current) => ({
                ...current,
                status: isStatus(value) ? value : "all",
              }))
            }
            items={[
              { value: "all", label: copy.orders.filters.allStatuses },
              ...statusIds.map((status) => ({ value: status, label: copy.status[status] })),
            ]}
          />

          <Select
            label={copy.orders.filters.warehouse}
            value={draft.warehouse}
            onValueChange={(value) =>
              setDraft((current) => ({
                ...current,
                warehouse: isWarehouse(value) ? value : "all",
              }))
            }
            items={[
              { value: "all", label: copy.orders.filters.allWarehouses },
              ...warehouseIds.map((warehouse) => ({
                value: warehouse,
                label: copy.warehouse[warehouse],
              })),
            ]}
          />

          <Select
            label={copy.orders.filters.range}
            value={draft.range}
            onValueChange={(value) =>
              setDraft((current) => ({
                ...current,
                range: isRange(value) ? value : "all",
              }))
            }
            items={rangeIds.map((range) => ({
              value: range,
              label: copy.orders.filters.ranges[range],
            }))}
          />
        </FilterBar>
      </div>

      <div className="mt-[var(--koten-gap)]">
        {selected.length > 0 ? (
          <fieldset className="m-0 mb-2 flex min-w-0 flex-wrap items-center justify-between gap-2 border border-rule bg-surface px-[var(--koten-panel-p)] py-1.5">
            <legend className="sr-only">{copy.common.actions}</legend>
            <p className="text-xs font-semibold text-ink">
              {copy.orders.selection.selected(selected.length)}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => markSelected("preparing")}
              >
                {copy.orders.bulk.preparing}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => markSelected("shipped")}
              >
                {copy.orders.bulk.shipped}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={exportSelected}>
                {copy.orders.bulk.export}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={clearSelection}>
                {copy.orders.bulk.reset}
              </Button>
            </div>
          </fieldset>
        ) : null}

        <DataTable
          key={selectionKey}
          data={filtered}
          columns={columns}
          getRowId={(order) => order.id}
          caption={copy.orders.table.caption}
          emptyLabel={copy.orders.empty}
          previousLabel={copy.common.previous}
          nextLabel={copy.common.next}
          paginationLabel={copy.orders.filters.label}
          selectAllLabel={copy.orders.selection.selectAll}
          selectRowLabel={copy.orders.selection.selectRow}
          selectedLabel={copy.orders.selection.selected}
          selectable
          pageSize={12}
          onSelectionChange={setSelected}
        />
      </div>
    </div>
  );
}
