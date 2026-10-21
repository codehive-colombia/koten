import {
  AppShell,
  Breadcrumb,
  Button,
  DetailDrawer,
  DetailSection,
  Field,
  FilterBar,
  FormSection,
  Input,
  type KotenLocale,
  type OrderStatus,
  PageHeader,
  Select,
  SideNav,
  type SideNavGroup,
  StatusBadge,
  Timeline,
  type TimelineEvent,
  TopBar,
  useKoten,
} from "@koten/ui";
import { useState } from "react";
import { type BlockDoc, filesFor, type L10n, patternFile } from "../docs/types";

const classNameNote: L10n = {
  es: "Se suma a las clases base del componente.",
  ja: "コンポーネントの基本クラスに追加されます。",
  en: "Adds to the component's base classes.",
};

type DemoCopy = {
  navLabel: string;
  groupOperations: string;
  groupData: string;
  dashboard: string;
  orders: string;
  products: string;
  inventory: string;
  customers: string;
  search: string;
  searchPlaceholder: string;
  skipLabel: string;
  eyebrow: string;
  pageDesc: string;
  newOrder: string;
  shellHint: string;
  activeHint: string;
  footerName: string;
  footerRole: string;
  home: string;
  breadcrumb: string;
  topbarStatus: string;
  ordersMeta: string;
  productsMeta: string;
  statusLabel: string;
  warehouseLabel: string;
  allStatuses: string;
  allWarehouses: string;
  pending: string;
  preparing: string;
  shipped: string;
  cancelled: string;
  returned: string;
  tokyo: string;
  osaka: string;
  filterLabel: string;
  applyFilters: string;
  clearFilters: string;
  resultOrders: string;
  resultFiltered: string;
  simpleFilterLabel: string;
  drawerTrigger: string;
  drawerTitle: string;
  drawerDescription: string;
  drawerClose: string;
  customer: string;
  customerValue: string;
  lines: string;
  linesMeta: string;
  lineItem: string;
  linePrice: string;
  history: string;
  markPreparing: string;
  markShipped: string;
  contactLabel: string;
  contactPlaceholder: string;
  emailLabel: string;
  emailError: string;
  phoneLabel: string;
  channelLabel: string;
  channelWeb: string;
  channelStore: string;
  formGroupTitle: string;
  formGroupDescription: string;
  formSubmit: string;
  formSaved: string;
  formNote: string;
  singleTitle: string;
  timelineLabel: string;
  timelineEmpty: string;
  eventReceived: string;
  eventReceivedDesc: string;
  eventPaid: string;
  eventShipped: string;
  eventShippedDesc: string;
  event1Time: string;
  event2Time: string;
  event3Time: string;
};

const demoCopy: Record<KotenLocale, DemoCopy> = {
  es: {
    navLabel: "Navegación principal",
    groupOperations: "Operación",
    groupData: "Datos",
    dashboard: "Panel",
    orders: "Pedidos",
    products: "Productos",
    inventory: "Inventario",
    customers: "Clientes",
    search: "Buscar",
    searchPlaceholder: "Pedido, cliente o SKU",
    skipLabel: "Saltar al contenido",
    eyebrow: "Ventas",
    pageDesc: "Busca, filtra y procesa pedidos. Los filtros viven en la URL.",
    newOrder: "Nuevo pedido",
    shellHint: "El shell permanece; solo cambia el contenido de main.",
    activeHint: "Ruta activa",
    footerName: "Yamada Tarō",
    footerRole: "Tokio · Administración",
    home: "Inicio",
    breadcrumb: "Migas de pan",
    topbarStatus: "Sincronizado 12:00",
    ordersMeta: "132 pedidos · 21/10/2026",
    productsMeta: "24 productos",
    statusLabel: "Estado",
    warehouseLabel: "Almacén",
    allStatuses: "Todos los estados",
    allWarehouses: "Todos los almacenes",
    pending: "Pendiente",
    preparing: "Preparando",
    shipped: "Enviado",
    cancelled: "Cancelado",
    returned: "Devuelto",
    tokyo: "Tokio",
    osaka: "Osaka",
    filterLabel: "Filtros de pedidos",
    applyFilters: "Aplicar filtros",
    clearFilters: "Limpiar",
    resultOrders: "132 pedidos",
    resultFiltered: "24 pedidos filtrados",
    simpleFilterLabel: "Buscar pedidos",
    drawerTrigger: "Abrir pedido KURA-10428",
    drawerTitle: "Pedido KURA-10428",
    drawerDescription: "Detalle, líneas e historial del pedido.",
    drawerClose: "Cerrar detalle",
    customer: "Cliente",
    customerValue: "Yamada Shōji · taro.yamada@yamada.example",
    lines: "Líneas",
    linesMeta: "1 artículo",
    lineItem: "Objetivo HIKARI 35 mm f/2.8",
    linePrice: "32.400 JPY",
    history: "Historial",
    markPreparing: "Marcar preparando",
    markShipped: "Marcar enviado",
    contactLabel: "Persona de contacto",
    contactPlaceholder: "Ej. Taro Yamada",
    emailLabel: "Correo electrónico",
    emailError: "Escribe un correo válido.",
    phoneLabel: "Teléfono",
    channelLabel: "Canal",
    channelWeb: "Web",
    channelStore: "Tienda",
    formGroupTitle: "Cliente",
    formGroupDescription: "Datos de contacto y facturación",
    formSubmit: "Guardar cliente",
    formSaved: "Cliente guardado. Los cambios ya están en el pedido.",
    formNote: "Los campos con * son obligatorios.",
    singleTitle: "Contacto rápido",
    timelineLabel: "Historial del pedido",
    timelineEmpty: "Sin eventos todavía",
    eventReceived: "Pedido recibido",
    eventReceivedDesc: "Registrado automáticamente por el sistema",
    eventPaid: "Pago confirmado",
    eventShipped: "Pedido enviado",
    eventShippedDesc: "Seguimiento KURA-100111",
    event1Time: "21/10 12:00",
    event2Time: "21/10 12:25",
    event3Time: "22/10 15:00",
  },
  ja: {
    navLabel: "メインナビゲーション",
    groupOperations: "オペレーション",
    groupData: "マスタ",
    dashboard: "ダッシュボード",
    orders: "受注",
    products: "商品",
    inventory: "在庫",
    customers: "顧客",
    search: "検索",
    searchPlaceholder: "受注番号、顧客、SKU",
    skipLabel: "コンテンツへスキップ",
    eyebrow: "販売",
    pageDesc: "受注を検索、絞り込み、処理します。絞り込み条件は URL に保持されます。",
    newOrder: "新規受注",
    shellHint: "シェルはそのまま残り、main の中身だけが変わります。",
    activeHint: "現在のルート",
    footerName: "山田 太郎",
    footerRole: "東京 · 管理者",
    home: "ホーム",
    breadcrumb: "パンくず",
    topbarStatus: "12:00 同期済み",
    ordersMeta: "132 件 · 2026/10/21",
    productsMeta: "24 商品",
    statusLabel: "ステータス",
    warehouseLabel: "倉庫",
    allStatuses: "すべてのステータス",
    allWarehouses: "すべての倉庫",
    pending: "保留中",
    preparing: "準備中",
    shipped: "発送済み",
    cancelled: "キャンセル",
    returned: "返品済み",
    tokyo: "東京",
    osaka: "大阪",
    filterLabel: "受注の絞り込み",
    applyFilters: "絞り込む",
    clearFilters: "クリア",
    resultOrders: "132 件の受注",
    resultFiltered: "24 件の受注",
    simpleFilterLabel: "受注を検索",
    drawerTrigger: "受注 KURA-10428 を開く",
    drawerTitle: "受注 KURA-10428",
    drawerDescription: "受注の詳細、明細、履歴。",
    drawerClose: "詳細を閉じる",
    customer: "顧客",
    customerValue: "山田商事 · taro.yamada@yamada.example",
    lines: "明細",
    linesMeta: "1 点",
    lineItem: "HIKARI 35 mm f/2.8 レンズ",
    linePrice: "32,400 JPY",
    history: "履歴",
    markPreparing: "準備中にする",
    markShipped: "発送済みにする",
    contactLabel: "担当者",
    contactPlaceholder: "例：山田 太郎",
    emailLabel: "メールアドレス",
    emailError: "有効なメールアドレスを入力してください。",
    phoneLabel: "電話番号",
    channelLabel: "チャネル",
    channelWeb: "Web",
    channelStore: "店舗",
    formGroupTitle: "顧客",
    formGroupDescription: "連絡先と請求先の情報",
    formSubmit: "顧客を保存",
    formSaved: "顧客を保存しました。変更は受注に反映されています。",
    formNote: "* の付いた項目は必須です。",
    singleTitle: "クイック連絡先",
    timelineLabel: "受注履歴",
    timelineEmpty: "イベントはまだありません",
    eventReceived: "受注受付",
    eventReceivedDesc: "システムが自動で記録",
    eventPaid: "支払い確認済み",
    eventShipped: "発送済み",
    eventShippedDesc: "追跡番号 KURA-100111",
    event1Time: "10/21 12:00",
    event2Time: "10/21 12:25",
    event3Time: "10/22 15:00",
  },
  en: {
    navLabel: "Main navigation",
    groupOperations: "Operations",
    groupData: "Data",
    dashboard: "Dashboard",
    orders: "Orders",
    products: "Products",
    inventory: "Inventory",
    customers: "Customers",
    search: "Search",
    searchPlaceholder: "Order, customer or SKU",
    skipLabel: "Skip to content",
    eyebrow: "Sales",
    pageDesc: "Search, filter and process orders. Filters live in the URL.",
    newOrder: "New order",
    shellHint: "The shell stays put; only the content inside main changes.",
    activeHint: "Active route",
    footerName: "Yamada Tarō",
    footerRole: "Tokyo · Admin",
    home: "Home",
    breadcrumb: "Breadcrumb",
    topbarStatus: "Synced 12:00",
    ordersMeta: "132 orders · 21 Oct 2026",
    productsMeta: "24 products",
    statusLabel: "Status",
    warehouseLabel: "Warehouse",
    allStatuses: "All statuses",
    allWarehouses: "All warehouses",
    pending: "Pending",
    preparing: "Preparing",
    shipped: "Shipped",
    cancelled: "Cancelled",
    returned: "Returned",
    tokyo: "Tokyo",
    osaka: "Osaka",
    filterLabel: "Order filters",
    applyFilters: "Apply filters",
    clearFilters: "Clear",
    resultOrders: "132 orders",
    resultFiltered: "24 filtered orders",
    simpleFilterLabel: "Search orders",
    drawerTrigger: "Open order KURA-10428",
    drawerTitle: "Order KURA-10428",
    drawerDescription: "Details, lines and history for this order.",
    drawerClose: "Close details",
    customer: "Customer",
    customerValue: "Yamada Shōji · taro.yamada@yamada.example",
    lines: "Lines",
    linesMeta: "1 item",
    lineItem: "HIKARI 35 mm f/2.8 lens",
    linePrice: "32,400 JPY",
    history: "History",
    markPreparing: "Mark as preparing",
    markShipped: "Mark as shipped",
    contactLabel: "Contact person",
    contactPlaceholder: "e.g. Taro Yamada",
    emailLabel: "Email",
    emailError: "Enter a valid email address.",
    phoneLabel: "Phone",
    channelLabel: "Channel",
    channelWeb: "Web",
    channelStore: "Store",
    formGroupTitle: "Customer",
    formGroupDescription: "Contact and billing details",
    formSubmit: "Save customer",
    formSaved: "Customer saved. Changes are already on the order.",
    formNote: "Fields marked * are required.",
    singleTitle: "Quick contact",
    timelineLabel: "Order history",
    timelineEmpty: "No events yet",
    eventReceived: "Order received",
    eventReceivedDesc: "Recorded automatically by the system",
    eventPaid: "Payment confirmed",
    eventShipped: "Order shipped",
    eventShippedDesc: "Tracking KURA-100111",
    event1Time: "Oct 21 12:00",
    event2Time: "Oct 21 12:25",
    event3Time: "Oct 22 15:00",
  },
};

function navGroups(activeHref: string, t: DemoCopy): SideNavGroup[] {
  return [
    {
      id: "operations",
      label: t.groupOperations,
      items: [
        {
          id: "dashboard",
          label: t.dashboard,
          href: "#dashboard",
          active: activeHref === "#dashboard",
        },
        {
          id: "orders",
          label: t.orders,
          href: "#orders",
          active: activeHref === "#orders",
          count: 22,
        },
      ],
    },
    {
      id: "data",
      label: t.groupData,
      items: [
        {
          id: "products",
          label: t.products,
          href: "#products",
          active: activeHref === "#products",
        },
        {
          id: "inventory",
          label: t.inventory,
          href: "#inventory",
          active: activeHref === "#inventory",
          count: 4,
        },
        {
          id: "customers",
          label: t.customers,
          href: "#customers",
          active: activeHref === "#customers",
        },
      ],
    },
  ];
}

function navLabelFor(groups: readonly SideNavGroup[], href: string) {
  for (const group of groups) {
    const item = group.items.find((entry) => entry.href === href);
    if (item) return item.label;
  }
  return "—";
}

function orderEvents(t: DemoCopy): readonly TimelineEvent[] {
  return [
    {
      id: "received",
      time: t.event1Time,
      dateTime: "2026-10-21T12:00:00.000Z",
      title: t.eventReceived,
      description: t.eventReceivedDesc,
      tone: "neutral",
    },
    {
      id: "paid",
      time: t.event2Time,
      dateTime: "2026-10-21T12:25:00.000Z",
      title: t.eventPaid,
      tone: "success",
    },
    {
      id: "shipped",
      time: t.event3Time,
      dateTime: "2026-10-22T15:00:00.000Z",
      title: t.eventShipped,
      description: t.eventShippedDesc,
      tone: "info",
    },
  ];
}

function BrandMark() {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center border-2 border-primary font-serif text-sm leading-none text-primary"
      >
        倉
      </span>
      <span className="font-serif text-base font-semibold">KURA</span>
      <span className="text-2xs text-faint">ERP</span>
    </span>
  );
}

function ErpShellDemo() {
  const { locale } = useKoten();
  const t = demoCopy[locale];
  const [activeHref, setActiveHref] = useState("#orders");
  const groups = navGroups(activeHref, t);

  return (
    <div className="border border-rule">
      <AppShell
        className="min-h-0"
        skipLabel={t.skipLabel}
        sidebarLabel={t.navLabel}
        brand={<BrandMark />}
        sidebar={<SideNav label={t.navLabel} groups={groups} onNavigate={setActiveHref} />}
        topbar={
          <TopBar
            className="static"
            left={
              <Breadcrumb
                label={t.breadcrumb}
                items={[{ label: t.home, href: "#home" }, { label: t.orders }]}
              />
            }
            search={
              <Input
                type="search"
                size="sm"
                aria-label={t.search}
                placeholder={t.searchPlaceholder}
                className="sm:max-w-xs"
              />
            }
            actions={<span className="text-2xs text-muted">{t.topbarStatus}</span>}
          />
        }
      >
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.orders}
          description={t.pageDesc}
          actions={
            <Button variant="primary" size="sm">
              {t.newOrder}
            </Button>
          }
        />
        <p className="mt-2 text-2xs text-muted">
          {t.shellHint} · {t.activeHint}: {navLabelFor(groups, activeHref)}
        </p>
      </AppShell>
    </div>
  );
}

function SideNavDemo({ withFooter = false }: { withFooter?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];
  const [activeHref, setActiveHref] = useState("#orders");
  const groups = navGroups(activeHref, t);
  const footer = (
    <div className="px-2 py-1">
      <p className="text-xs font-semibold text-ink">{t.footerName}</p>
      <p className="text-2xs text-muted">{t.footerRole}</p>
    </div>
  );

  return (
    <div className="grid gap-[var(--koten-gap)] sm:grid-cols-[232px_minmax(0,1fr)]">
      <div className="border border-rule bg-surface">
        <SideNav
          label={t.navLabel}
          groups={groups}
          onNavigate={setActiveHref}
          footer={withFooter ? footer : undefined}
        />
      </div>
      <div className="self-start border border-rule bg-tint p-[var(--koten-panel-p)] text-2xs text-muted">
        <p className="font-semibold text-ink">{t.activeHint}</p>
        <p className="mt-1 text-xs">{navLabelFor(groups, activeHref)}</p>
        <p className="mt-2 font-mono text-faint">aria-current="page"</p>
      </div>
    </div>
  );
}

function TopBarDemo({ withSearch = true }: { withSearch?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];
  const [query, setQuery] = useState("");

  return (
    <div className="border border-rule">
      <TopBar
        className="static"
        left={
          <span className="text-2xs text-muted">
            KURA / <span className="font-semibold text-ink">{t.orders}</span>
          </span>
        }
        search={
          withSearch ? (
            <Input
              type="search"
              size="sm"
              aria-label={t.search}
              placeholder={t.searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="sm:max-w-xs"
            />
          ) : undefined
        }
        actions={
          <>
            <span className="text-2xs text-muted">{t.topbarStatus}</span>
            <Button size="xs" variant="outline">
              {t.newOrder}
            </Button>
          </>
        }
      />
      <p className="p-[var(--koten-panel-p)] text-2xs text-muted">
        {t.search}: {query || "—"}
      </p>
    </div>
  );
}

function PageHeaderDemo({ minimal = false }: { minimal?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];

  return (
    <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
      {minimal ? (
        <PageHeader title={t.products} meta={t.productsMeta} />
      ) : (
        <PageHeader
          breadcrumb={
            <Breadcrumb
              label={t.breadcrumb}
              items={[{ label: t.home, href: "#home" }, { label: t.orders }]}
            />
          }
          eyebrow={t.eyebrow}
          title={t.orders}
          description={t.pageDesc}
          meta={t.ordersMeta}
          actions={
            <Button variant="primary" size="sm">
              {t.newOrder}
            </Button>
          }
        />
      )}
    </div>
  );
}

function FilterBarDemo({ simple = false }: { simple?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];
  const [filtered, setFiltered] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <FilterBar
      label={simple ? t.simpleFilterLabel : t.filterLabel}
      submitLabel={t.applyFilters}
      resetLabel={t.clearFilters}
      resultLabel={filtered ? t.resultFiltered : t.resultOrders}
      onSubmit={() => setFiltered(true)}
      onReset={() => {
        setFiltered(false);
        setQuery("");
      }}
    >
      <Field label={t.search}>
        <Input
          type="search"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Field>
      {simple ? null : (
        <>
          <Select
            label={t.statusLabel}
            defaultValue="all"
            items={[
              { value: "all", label: t.allStatuses },
              { value: "pending", label: t.pending },
              { value: "preparing", label: t.preparing },
              { value: "shipped", label: t.shipped },
            ]}
          />
          <Select
            label={t.warehouseLabel}
            defaultValue="all"
            items={[
              { value: "all", label: t.allWarehouses },
              { value: "tokyo", label: t.tokyo },
              { value: "osaka", label: t.osaka },
            ]}
          />
        </>
      )}
    </FilterBar>
  );
}

function DrawerDemo({ minimal = false }: { minimal?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];

  if (minimal) {
    return (
      <DetailDrawer
        trigger={<Button variant="secondary">{t.drawerTrigger}</Button>}
        title={t.drawerTitle}
        closeLabel={t.drawerClose}
      >
        <p className="text-2xs text-muted">{t.drawerDescription}</p>
      </DetailDrawer>
    );
  }

  return (
    <DetailDrawer
      trigger={<Button variant="secondary">{t.drawerTrigger}</Button>}
      title={t.drawerTitle}
      description={t.drawerDescription}
      closeLabel={t.drawerClose}
      status={<StatusBadge status="preparing" label={t.preparing} />}
      summary={
        <div className="text-2xs text-muted">
          <p className="text-xs font-semibold text-ink">{t.customer}</p>
          <p>{t.customerValue}</p>
        </div>
      }
      footer={
        <>
          <Button size="sm" variant="secondary">
            {t.markPreparing}
          </Button>
          <Button size="sm" variant="primary">
            {t.markShipped}
          </Button>
        </>
      }
    >
      <DetailSection title={t.lines} meta={t.linesMeta}>
        <div className="flex justify-between border border-rule px-2 py-1 text-2xs">
          <span>{t.lineItem}</span>
          <span className="tabular-nums">{t.linePrice}</span>
        </div>
      </DetailSection>
      <DetailSection title={t.history}>
        <Timeline events={orderEvents(t)} label={t.timelineLabel} emptyLabel={t.timelineEmpty} />
      </DetailSection>
    </DetailDrawer>
  );
}

function StatusBadgeDemo({ inRow = false }: { inRow?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];
  const statuses: readonly { status: OrderStatus; label: string }[] = [
    { status: "pending", label: t.pending },
    { status: "preparing", label: t.preparing },
    { status: "shipped", label: t.shipped },
    { status: "cancelled", label: t.cancelled },
    { status: "returned", label: t.returned },
  ];

  if (!inRow) {
    return (
      <div className="flex flex-wrap gap-2">
        {statuses.map((entry) => (
          <StatusBadge key={entry.status} status={entry.status} label={entry.label} />
        ))}
      </div>
    );
  }

  return (
    <div className="border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-2 py-1">
        <span className="font-mono text-2xs text-muted">KURA-10428</span>
        <StatusBadge status="preparing" label={t.preparing} />
      </div>
      <div className="flex items-center justify-between px-2 py-1">
        <span className="font-mono text-2xs text-muted">KURA-10427</span>
        <StatusBadge status="shipped" label={t.shipped} />
      </div>
    </div>
  );
}

function FormSectionDemo({ oneColumn = false }: { oneColumn?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];
  const [saved, setSaved] = useState(false);

  if (oneColumn) {
    return (
      <FormSection
        title={t.singleTitle}
        description={t.formGroupDescription}
        columns={1}
        className="max-w-md"
      >
        <Field label={t.contactLabel} required>
          <Input placeholder={t.contactPlaceholder} />
        </Field>
        <Field label={t.emailLabel} required>
          <Input type="email" placeholder="taro@yamada.example" />
        </Field>
      </FormSection>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
      className="grid gap-[var(--koten-gap)]"
    >
      <FormSection title={t.formGroupTitle} description={t.formGroupDescription} columns={2}>
        <Field label={t.contactLabel} required>
          <Input placeholder={t.contactPlaceholder} />
        </Field>
        <Field label={t.emailLabel} required error={t.emailError}>
          <Input type="email" defaultValue="taro@" />
        </Field>
        <Field label={t.phoneLabel}>
          <Input type="tel" placeholder="03-5550-0101" />
        </Field>
        <Select
          label={t.channelLabel}
          defaultValue="web"
          items={[
            { value: "web", label: t.channelWeb },
            { value: "store", label: t.channelStore },
          ]}
        />
      </FormSection>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-2xs text-muted">{t.formNote}</p>
        <Button type="submit" size="sm" variant="primary">
          {t.formSubmit}
        </Button>
      </div>
      <p aria-live="polite" className="min-h-4 text-2xs text-success">
        {saved ? t.formSaved : ""}
      </p>
    </form>
  );
}

function TimelineDemo({ empty = false }: { empty?: boolean }) {
  const { locale } = useKoten();
  const t = demoCopy[locale];

  return (
    <div className="max-w-md">
      <Timeline
        label={t.timelineLabel}
        emptyLabel={t.timelineEmpty}
        events={empty ? [] : orderEvents(t)}
      />
    </div>
  );
}

export const erpBlockDocs: BlockDoc[] = [
  {
    slug: "app-shell",
    id: "C-053",
    category: "erp",
    name: "AppShell",
    jp: "シェル",
    description: {
      es: "El marco del back office: sidebar de 232 px, topbar pegajosa y un main de ancho flexible. El skip link va primero y el contenido cambia de ruta sin remontar el marco.",
      ja: "バックオフィスの枠組みです。232 px のサイドバー、固定トップバー、可変幅の main を組みます。スキップリンクを先頭に置き、ルートが変わっても枠を再マウントしません。",
      en: "The back office frame: a 232 px sidebar, a sticky topbar and a flexible main. The skip link comes first and the content changes routes without remounting the frame.",
    },
    requirements: [
      {
        kind: "client",
        label: {
          es: "Montaje en cliente",
          ja: "クライアント描画",
          en: "Client rendering",
        },
        detail: {
          es: "El shell mantiene el elemento activo de la navegación con estado. En un framework con SSR, monta el shell dentro de un límite de cliente para no perder la interacción.",
          ja: "シェルはナビゲーションのアクティブ項目を状態で保持します。SSR のフレームワークでは、操作を保つためシェルをクライアント境界の内側に置きます。",
          en: "The shell keeps the active navigation item in state. In an SSR framework, mount the shell inside a client boundary so the interaction survives.",
        },
      },
    ],
    files: filesFor(patternFile("app-shell.tsx")),
    examples: [
      {
        id: "full-shell",
        title: { es: "Shell completo", ja: "シェル全体", en: "Full shell" },
        description: {
          es: "Sidebar, topbar y main en una sola grilla. La navegación cambia el estado activo sin recargar.",
          ja: "サイドバー、トップバー、main を 1 つのグリッドにまとめます。ナビゲーションは再読み込みなしでアクティブ状態を変えます。",
          en: "Sidebar, topbar and main in one grid. Navigation changes the active state without a reload.",
        },
        preview: <ErpShellDemo />,
        code: `<AppShell
  skipLabel="Skip to content"
  brand={<Brand />}
  sidebarLabel="Main navigation"
  sidebar={<SideNav label="Main" groups={groups} onNavigate={navigate} />}
  topbar={
    <TopBar
      left={<Breadcrumb items={crumbs} label="Breadcrumb" />}
      search={<Input type="search" aria-label="Search" placeholder="Order, customer or SKU" />}
      actions={<SyncState />}
    />
  }
>
  <PageHeader
    eyebrow="Sales"
    title="Orders"
    description="Search, filter and process orders. Filters live in the URL."
    actions={<Button size="sm" variant="primary">New order</Button>}
  />
  <OrdersTable />
</AppShell>`,
      },
    ],
    props: [
      {
        prop: "skipLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto del enlace que salta al main; es el primer foco de la página.",
          ja: "main へ移動するリンクの文言で、ページ最初のフォーカス対象です。",
          en: "Label of the link that jumps to main; it is the page's first focus stop.",
        },
      },
      {
        prop: "skipHref",
        type: "string",
        default: '"#contenido"',
        note: {
          es: "Destino del skip link; debe coincidir con el id del main o con un ancla existente.",
          ja: "スキップリンクの移動先。main の id か既存のアンカーに合わせます。",
          en: "Skip link target; it must match the main id or an existing anchor.",
        },
      },
      {
        prop: "brand",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Marca en la cabecera del sidebar; la fila mide 48 px.",
          ja: "サイドバー上部のブランド表示。行の高さは 48 px です。",
          en: "Brand in the sidebar header; the row is 48 px tall.",
        },
      },
      {
        prop: "sidebar",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido del aside; normalmente un SideNav.",
          ja: "aside の中身。通常は SideNav を置きます。",
          en: "Contents of the aside; usually a SideNav.",
        },
      },
      {
        prop: "sidebarLabel",
        type: "string",
        default: "—",
        note: {
          es: "aria-label del landmark complementario que envuelve el sidebar.",
          ja: "サイドバーを包む補助ランドマークの aria-label です。",
          en: "aria-label of the complementary landmark wrapping the sidebar.",
        },
      },
      {
        prop: "topbar",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Cabecera encima del main; normalmente el TopBar de la ruta.",
          ja: "main の上に置くヘッダー。通常はルートの TopBar です。",
          en: "Header above main; usually the route's TopBar.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido del main; ya recibe el padding de página.",
          ja: "main の内容。ページの余白は適用済みです。",
          en: "Main content; page padding is already applied.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "El skip link es el primer elemento enfocable y salta al main con id contenido.",
        "El aside es un landmark complementario con sidebarLabel; la navegación interna lleva su propio nombre.",
        "Bajo 1024 px el sidebar no se muestra: el menú móvil debe vivir en el TopBar, no duplicarse oculto.",
        "El skip link solo se ve al recibir foco; no lo ocultes con outline: none.",
      ],
      ja: [
        "スキップリンクは最初のフォーカス対象で、id=contenido の main へ移動します。",
        "aside は sidebarLabel を持つ補助ランドマークで、内部のナビゲーションは独自の名前を持ちます。",
        "1024 px 未満ではサイドバーは表示されません。モバイル用メニューは TopBar に置き、隠れた二重メニューを作りません。",
        "スキップリンクはフォーカス時だけ見えます。outline: none で消さないでください。",
      ],
      en: [
        "The skip link is the first focusable element and jumps to the main with id contenido.",
        "The aside is a complementary landmark named by sidebarLabel; the inner navigation carries its own name.",
        "Below 1024 px the sidebar is not shown: the mobile menu belongs in the TopBar, not duplicated while hidden.",
        "The skip link is visible only on focus; do not hide it with outline: none.",
      ],
    },
  },
  {
    slug: "side-nav",
    id: "C-054",
    category: "erp",
    name: "SideNav",
    jp: "サイドバー",
    description: {
      es: "Navegación lateral agrupada con estado activo, conteos y un pie opcional. El clic simple se intercepta para navegar sin recargar; los clics con modificador siguen abriendo pestañas.",
      ja: "グループ化したサイドナビゲーションです。アクティブ状態、件数、任意のフッターを持ちます。通常のクリックは再読み込みなしの遷移に使い、修飾キー付きのクリックは新しいタブを開きます。",
      en: "Grouped side navigation with an active state, counts and an optional footer. A plain click is intercepted to navigate without a reload; modified clicks still open new tabs.",
    },
    files: filesFor(patternFile("side-nav.tsx")),
    examples: [
      {
        id: "groups",
        title: {
          es: "Grupos y estado activo",
          ja: "グループと現在地",
          en: "Groups and active state",
        },
        description: {
          es: "Haz clic en un elemento: aria-current=page y la barra primaria se mueven juntos.",
          ja: "項目をクリックすると、aria-current=page とプライマリのバーが一緒に移動します。",
          en: "Click an item: aria-current=page and the primary bar move together.",
        },
        preview: <SideNavDemo />,
        code: `const groups = [
  {
    id: "operations",
    label: "Operations",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard" },
      { id: "orders", label: "Orders", href: "/orders", active: true, count: 22 },
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      { id: "products", label: "Products", href: "/products" },
      { id: "inventory", label: "Inventory", href: "/inventory", count: 4 },
    ],
  },
];

<SideNav
  label="Main navigation"
  groups={groups}
  onNavigate={(href) => router.push(href)}
/>`,
      },
      {
        id: "footer",
        title: { es: "Conteo y pie", ja: "件数とフッター", en: "Counts and footer" },
        description: {
          es: "Los conteos son texto tabular y el pie aloja la sesión sin competir con la navegación.",
          ja: "件数は等幅の数値で、フッターはナビゲーションと競合せずセッション情報を置きます。",
          en: "Counts are tabular text and the footer holds the session without competing with navigation.",
        },
        preview: <SideNavDemo withFooter />,
        code: `<SideNav
  label="Main navigation"
  groups={groups}
  onNavigate={(href) => router.push(href)}
  footer={
    <div className="px-2 py-1">
      <p className="text-xs font-semibold text-ink">Yamada Tarō</p>
      <p className="text-2xs text-muted">Tokyo · Admin</p>
    </div>
  }
/>`,
      },
    ],
    props: [
      {
        prop: "groups",
        type: "readonly SideNavGroup[]",
        default: "—",
        note: {
          es: "Grupos con id, label e items; cada item acepta active, icon y count.",
          ja: "id、label、items を持つグループ。各項目は active、icon、count を受け付けます。",
          en: "Groups with id, label and items; each item accepts active, icon and count.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "aria-label del nav; describe el conjunto de enlaces.",
          ja: "nav の aria-label。リンク群の役割を説明します。",
          en: "aria-label of the nav; describes the set of links.",
        },
      },
      {
        prop: "onNavigate",
        type: "(href: string) => void",
        default: "—",
        note: {
          es: "Recibe el href en clics simples y el componente hace preventDefault; con modificadores no se intercepta.",
          ja: "通常のクリックで href を受け取り、コンポーネントが preventDefault します。修飾キー付きは横取りしません。",
          en: "Receives the href on plain clicks and the component calls preventDefault; modified clicks are not intercepted.",
        },
      },
      {
        prop: "footer",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Pie tras una regla; sesión, ayuda o enlaces secundarios.",
          ja: "区切り線の下のフッター。セッション、ヘルプ、二次リンクに使います。",
          en: "Footer after a rule; session, help or secondary links.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        'El elemento activo usa aria-current="page"; el color se refuerza con barra y fondo.',
        "onNavigate solo intercepta clics simples: Cmd, Ctrl, Shift, Alt y el clic central siguen abriendo pestaña.",
        "El conteo es texto tabular dentro del enlace, así que el nombre accesible incluye la etiqueta y el número.",
        "Cada grupo usa un h2 dentro del nav; no agregues otro h1 en la barra.",
      ],
      ja: [
        'アクティブ項目は aria-current="page" を使い、色だけでなくバーと背景でも示します。',
        "onNavigate は通常のクリックだけを横取りします。Cmd、Ctrl、Shift、Alt、中クリックは新しいタブを開きます。",
        "件数はリンク内の等幅テキストなので、アクセシブル名にラベルと数値が含まれます。",
        "各グループは nav 内の h2 を使います。バー内に別の h1 を追加しないでください。",
      ],
      en: [
        'The active item uses aria-current="page"; the bar and background reinforce the colour.',
        "onNavigate intercepts plain clicks only: Cmd, Ctrl, Shift, Alt and middle click still open a tab.",
        "The count is tabular text inside the link, so the accessible name includes the label and the number.",
        "Each group uses an h2 inside the nav; do not add another h1 in the bar.",
      ],
    },
  },
  {
    slug: "top-bar",
    id: "C-055",
    category: "erp",
    name: "TopBar",
    jp: "トップバー",
    description: {
      es: "Cabecera pegajosa de la ruta: contexto a la izquierda, búsqueda al centro y acciones al final. En pantallas estrechas la búsqueda baja a su propia fila.",
      ja: "ルートの固定ヘッダーです。左にコンテキスト、中央に検索、右にアクションを置きます。狭い画面では検索が独立した行に下がります。",
      en: "The route's sticky header: context on the left, search in the middle and actions at the end. On narrow screens the search drops to its own row.",
    },
    files: filesFor(patternFile("top-bar.tsx")),
    examples: [
      {
        id: "search",
        title: {
          es: "Búsqueda y acciones",
          ja: "検索とアクション",
          en: "Search and actions",
        },
        description: {
          es: "Contexto, búsqueda y acciones en una fila; escribe para ver el valor reflejado.",
          ja: "コンテキスト、検索、アクションを 1 行に。入力した値が下に反映されます。",
          en: "Context, search and actions in one row; type to see the value reflected.",
        },
        preview: <TopBarDemo />,
        code: `<TopBar
  left={<Breadcrumb items={crumbs} label="Breadcrumb" />}
  search={
    <Input
      type="search"
      size="sm"
      aria-label="Search"
      placeholder="Order, customer or SKU"
    />
  }
  actions={
    <>
      <SyncState />
      <Button size="xs" variant="outline">New order</Button>
    </>
  }
/>`,
      },
      {
        id: "actions-only",
        title: { es: "Solo acciones", ja: "アクションのみ", en: "Actions only" },
        description: {
          es: "Sin búsqueda, la barra conserva el contexto a la izquierda y las acciones al final.",
          ja: "検索がなくても、左にコンテキスト、右にアクションを保ちます。",
          en: "Without search, the bar keeps context on the left and actions at the end.",
        },
        preview: <TopBarDemo withSearch={false} />,
        code: `<TopBar
  left={<span className="text-2xs text-muted">KURA / <span className="font-semibold text-ink">Orders</span></span>}
  actions={<UserMenu />}
/>`,
      },
    ],
    props: [
      {
        prop: "left",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contexto o migas; no se encoge por debajo del contenido.",
          ja: "コンテキストやパンくず。内容より小さくはなりません。",
          en: "Context or breadcrumbs; it does not shrink below its content.",
        },
      },
      {
        prop: "search",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Bajo 640 px ocupa una fila propia; aporta tú el nombre accesible del campo.",
          ja: "640 px 未満では独立した行になります。フィールドのアクセシブル名は呼び出し側で付けます。",
          en: "Below 640 px it takes its own row; supply the field's accessible name yourself.",
        },
      },
      {
        prop: "actions",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se alinea al final con ms-auto; usuario, tema o acciones de la ruta.",
          ja: "ms-auto で右端に寄せます。ユーザー、テーマ、ルートのアクションに使います。",
          en: "Aligned to the end with ms-auto; user, theme or route actions.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se suma al header sticky; static lo desactiva en una demo.",
          ja: "固定ヘッダーのクラスに追加されます。デモでは static で固定を外せます。",
          en: "Adds to the sticky header; static turns it off in a demo.",
        },
      },
    ],
    a11y: {
      es: [
        "El campo de búsqueda necesita nombre accesible: usa Field o aria-label, el slot no lo aporta.",
        "El header es sticky con z-30; no superpongas menús con menor z ni tapes el foco.",
        "Bajo 640 px la búsqueda pasa a una fila propia y el orden de foco sigue el DOM: contexto, búsqueda, acciones.",
      ],
      ja: [
        "検索フィールドには Field か aria-label でアクセシブル名を付けます。スロットだけでは付きません。",
        "ヘッダーは z-30 の固定要素です。より低い z のメニューを重ねたり、フォーカスを隠したりしないでください。",
        "640 px 未満では検索が独立した行に移り、フォーカス順は DOM のまま、コンテキスト、検索、アクションとなります。",
      ],
      en: [
        "The search field needs an accessible name: use Field or aria-label, the slot does not provide one.",
        "The header is sticky with z-30; do not stack lower-z menus on it or cover the focus ring.",
        "Below 640 px search moves to its own row and focus order follows the DOM: context, search, actions.",
      ],
    },
  },
  {
    slug: "page-header",
    id: "C-056",
    category: "erp",
    name: "PageHeader",
    jp: "ページ見出し",
    description: {
      es: "Cabecera de la página: migas, ceja, título serif, descripción, metadatos y acciones. El título es el h1, así que va una vez por vista.",
      ja: "ページのヘッダーです。パンくず、アイブロウ、セリフ体のタイトル、説明、メタ情報、アクションを並べます。タイトルが h1 なので、1 画面に 1 つ置きます。",
      en: "The page header: breadcrumbs, eyebrow, serif title, description, meta and actions. The title is the h1, so use it once per view.",
    },
    files: filesFor(patternFile("page-header.tsx")),
    examples: [
      {
        id: "full",
        title: { es: "Cabecera completa", ja: "完全なヘッダー", en: "Full header" },
        description: {
          es: "Migas, ceja, título, descripción, metadatos y una acción primaria.",
          ja: "パンくず、アイブロウ、タイトル、説明、メタ情報、主要アクション。",
          en: "Breadcrumb, eyebrow, title, description, meta and one primary action.",
        },
        preview: <PageHeaderDemo />,
        code: `<PageHeader
  breadcrumb={
    <Breadcrumb
      label="Breadcrumb"
      items={[{ label: "Home", href: "/" }, { label: "Orders" }]}
    />
  }
  eyebrow="Sales"
  title="Orders"
  description="Search, filter and process orders. Filters live in the URL."
  meta="132 orders · 21 Oct 2026"
  actions={<Button size="sm" variant="primary">New order</Button>}
/>`,
      },
      {
        id: "minimal",
        title: { es: "Título mínimo", ja: "最小のタイトル", en: "Minimal title" },
        description: {
          es: "Solo título y metadatos: suficiente para una vista de lista simple.",
          ja: "タイトルとメタ情報だけ。単純な一覧ビューには十分です。",
          en: "Title and meta only: enough for a simple list view.",
        },
        preview: <PageHeaderDemo minimal />,
        code: `<PageHeader title="Products" meta="24 products" />`,
      },
    ],
    props: [
      {
        prop: "breadcrumb",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Migas sobre la ceja; usa Breadcrumb para el nav y aria-current.",
          ja: "アイブロウの上のパンくず。nav と aria-current は Breadcrumb に任せます。",
          en: "Breadcrumbs above the eyebrow; use Breadcrumb for the nav and aria-current.",
        },
      },
      {
        prop: "eyebrow",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Categoría o sección en texto pequeño y versalitas.",
          ja: "小さな大文字のテキストでカテゴリやセクションを示します。",
          en: "Category or section in small caps-like text.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se renderiza como h1; usa un solo PageHeader por página.",
          ja: "h1 として描画されます。1 ページに 1 つの PageHeader にします。",
          en: "Rendered as an h1; use a single PageHeader per page.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Resumen de una o dos líneas con ancho máximo de lectura.",
          ja: "読みやすい最大幅を持つ 1〜2 行の要約です。",
          en: "One or two lines with a readable max width.",
        },
      },
      {
        prop: "meta",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Conteos, fecha o contexto en texto pequeño.",
          ja: "件数、日付、コンテキストを小さなテキストで示します。",
          en: "Counts, date or context in small text.",
        },
      },
      {
        prop: "actions",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Acciones al final de la cabecera; se leen después del título.",
          ja: "ヘッダー右端のアクション。タイトルの後に読み上げられます。",
          en: "Actions at the end of the header; they read after the title.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "El título es un h1: usa un solo PageHeader por página para no duplicar el encabezado principal.",
        "Las migas van en un nav con aria-label; Breadcrumb ya lo hace y marca la última con aria-current.",
        "Las acciones se leen después del título en el DOM; la acción principal tampoco debe depender solo del color.",
      ],
      ja: [
        "タイトルは h1 です。主要見出しを重複させないため、1 ページに 1 つの PageHeader にします。",
        "パンくずは aria-label 付きの nav に置きます。Breadcrumb がそれを行い、最後の項目に aria-current を付けます。",
        "アクションは DOM 上でタイトルの後に読まれます。主要アクションも色だけで示さないでください。",
      ],
      en: [
        "The title is an h1: use one PageHeader per page so the main heading is not duplicated.",
        "Breadcrumbs live in a nav with aria-label; Breadcrumb already does this and marks the last item with aria-current.",
        "Actions read after the title in the DOM; the primary action must not rely on colour alone either.",
      ],
    },
  },
  {
    slug: "filter-bar",
    id: "C-057",
    category: "erp",
    name: "FilterBar",
    jp: "絞り込み",
    description: {
      es: "Formulario de filtros dentro de un landmark search: campos arriba y resultado con acciones (limpiar, aplicar) en la barra inferior. Los filtros deberían reflejarse en la URL.",
      ja: "search ランドマーク内の絞り込みフォームです。上にフィールド、下のバーに件数とアクション（クリア、適用）を置きます。条件は URL に反映させるのが基本です。",
      en: "A filter form inside a search landmark: fields on top and the result with actions (clear, apply) in the bottom bar. Filters should be reflected in the URL.",
    },
    files: filesFor(patternFile("filter-bar.tsx")),
    examples: [
      {
        id: "order-filters",
        title: {
          es: "Filtros de pedidos",
          ja: "受注の絞り込み",
          en: "Order filters",
        },
        description: {
          es: "Buscar, enviar y limpiar; el resultado cambia de 132 a 24.",
          ja: "検索、送信、クリア。結果は 132 件から 24 件に変わります。",
          en: "Search, submit and clear; the result moves from 132 to 24.",
        },
        preview: <FilterBarDemo />,
        code: `<FilterBar
  label="Order filters"
  submitLabel="Apply filters"
  resetLabel="Clear"
  resultLabel="132 orders"
  onSubmit={applyFilters}
  onReset={clearFilters}
>
  <Field label="Search">
    <Input type="search" placeholder="Number, customer or SKU" />
  </Field>
  <Select label="Status" defaultValue="all" items={statusItems} />
  <Select label="Warehouse" defaultValue="all" items={warehouseItems} />
</FilterBar>`,
      },
      {
        id: "single-field",
        title: { es: "Un solo campo", ja: "1 つのフィールド", en: "A single field" },
        description: {
          es: "La barra funciona con un único campo y el mismo par de acciones.",
          ja: "1 つのフィールドでも、同じ 2 つのアクションで機能します。",
          en: "The bar works with one field and the same pair of actions.",
        },
        preview: <FilterBarDemo simple />,
        code: `<FilterBar
  label="Search orders"
  submitLabel="Apply filters"
  resetLabel="Clear"
  resultLabel="132 orders"
  onSubmit={applyFilters}
  onReset={clearFilters}
>
  <Field label="Search">
    <Input type="search" placeholder="Number, customer or SKU" />
  </Field>
</FilterBar>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "aria-label del landmark search que envuelve el formulario.",
          ja: "フォームを包む search ランドマークの aria-label です。",
          en: "aria-label of the search landmark wrapping the form.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Campos de la grilla; de 1 a 4 por fila según el ancho.",
          ja: "グリッド内のフィールド。幅に応じて 1 行に 1〜4 個並びます。",
          en: "Grid fields; one to four per row depending on width.",
        },
      },
      {
        prop: "onSubmit",
        type: "(event: FormEvent<HTMLFormElement>) => void",
        default: "—",
        note: {
          es: "Se llama tras preventDefault; aquí lees los campos o actualizas la URL.",
          ja: "preventDefault の後に呼ばれます。ここで値を読み取り、URL を更新します。",
          en: "Called after preventDefault; read the fields or update the URL here.",
        },
      },
      {
        prop: "onReset",
        type: "() => void",
        default: "—",
        note: {
          es: "Limpiar es type=button: no envía el formulario.",
          ja: "クリアは type=button なので送信しません。",
          en: "Clear is type=button, so it never submits the form.",
        },
      },
      {
        prop: "submitLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto del botón primario de envío.",
          ja: "送信する主要ボタンの文言です。",
          en: "Label of the primary submit button.",
        },
      },
      {
        prop: "resetLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto del botón fantasma que limpia los filtros.",
          ja: "絞り込みを消すゴーストボタンの文言です。",
          en: "Label of the ghost button that clears the filters.",
        },
      },
      {
        prop: "resultLabel",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Conteo o resumen; si cambia en vivo, envuélvelo en aria-live.",
          ja: "件数や要約。ライブで変わる場合は aria-live で包みます。",
          en: "Count or summary; if it changes live, wrap it in aria-live.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "El bloque es un landmark search con aria-label; los campos llevan etiqueta visible con Field o Select.",
        "La acción de limpiar es type=button: nunca envía el formulario; Enter sí envía los filtros.",
        "resultLabel no se anuncia solo: si el resultado cambia en vivo, envuélvelo en aria-live=polite.",
      ],
      ja: [
        "ブロックは aria-label 付きの search ランドマークです。フィールドには Field か Select で可視ラベルを付けます。",
        "クリアは type=button なのでフォームを送信しません。Enter は絞り込みを送信します。",
        "resultLabel は自動では通知されません。結果がライブで変わる場合は aria-live=polite で包みます。",
      ],
      en: [
        "The block is a search landmark with aria-label; fields get a visible label through Field or Select.",
        "Clear is type=button, so it never submits; Enter does submit the filters.",
        "resultLabel is not announced on its own: if the result changes live, wrap it in aria-live=polite.",
      ],
    },
  },
  {
    slug: "detail-drawer",
    id: "C-058",
    category: "erp",
    name: "DetailDrawer",
    jp: "詳細",
    description: {
      es: "Panel lateral para el detalle de una fila: estado, resumen, secciones y acciones fijas. Base UI atrapa el foco, cierra con Escape y lo devuelve al trigger.",
      ja: "行の詳細を表示するサイドパネルです。ステータス、概要、セクション、固定アクションを置きます。Base UI がフォーカスを閉じ込め、Escape で閉じ、トリガーに戻します。",
      en: "A side panel for row details: status, summary, sections and fixed actions. Base UI traps focus, closes on Escape and returns focus to the trigger.",
    },
    requirements: [
      {
        kind: "portal",
        label: { es: "Portal", ja: "ポータル", en: "Portal" },
        detail: {
          es: "El panel y el backdrop se montan en un portal al final del body, fuera del árbol de la página.",
          ja: "パネルと背景は body 末尾のポータルに描画され、ページのツリーの外に置かれます。",
          en: "The panel and backdrop mount in a portal at the end of the body, outside the page tree.",
        },
      },
      {
        kind: "controlled",
        label: {
          es: "Estado de apertura",
          ja: "開閉状態",
          en: "Open state",
        },
        detail: {
          es: "Base UI controla abrir y cerrar desde el trigger; no dupliques ese estado con useState ni fuerces la apertura.",
          ja: "開閉は Base UI がトリガーから管理します。useState で二重管理せず、強制的に開かないでください。",
          en: "Base UI owns open and close from the trigger; do not duplicate that state with useState or force it open.",
        },
      },
    ],
    files: filesFor(patternFile("detail-drawer.tsx")),
    examples: [
      {
        id: "order-detail",
        title: { es: "Detalle de pedido", ja: "受注の詳細", en: "Order detail" },
        description: {
          es: "Abre el panel, recorre las secciones y cierra con Escape o con la X: el foco vuelve al botón.",
          ja: "パネルを開き、各セクションをたどり、Escape か X で閉じます。フォーカスはボタンに戻ります。",
          en: "Open the panel, walk the sections and close with Escape or the X: focus returns to the button.",
        },
        preview: <DrawerDemo />,
        code: `<DetailDrawer
  trigger={<Button variant="secondary">Open order KURA-10428</Button>}
  title="Order KURA-10428"
  description="Details, lines and history for this order."
  closeLabel="Close details"
  status={<StatusBadge status="preparing" label="Preparing" />}
  summary={<CustomerSummary />}
  footer={
    <>
      <Button size="sm" variant="secondary">Mark as preparing</Button>
      <Button size="sm" variant="primary">Mark as shipped</Button>
    </>
  }
>
  <DetailSection title="Lines" meta="1 item">
    <OrderLine />
  </DetailSection>
  <DetailSection title="History">
    <Timeline events={events} label="Order history" emptyLabel="No events yet" />
  </DetailSection>
</DetailDrawer>`,
      },
      {
        id: "minimal-drawer",
        title: { es: "Drawer mínimo", ja: "最小のドロワー", en: "Minimal drawer" },
        description: {
          es: "Sin estado, resumen ni pie: solo título, texto y cierre.",
          ja: "ステータス、概要、フッターなし。タイトル、本文、閉じるだけです。",
          en: "No status, summary or footer; just title, body and close.",
        },
        preview: <DrawerDemo minimal />,
        code: `<DetailDrawer
  trigger={<Button variant="secondary">Open order KURA-10428</Button>}
  title="Order KURA-10428"
  closeLabel="Close details"
>
  <p className="text-2xs text-muted">
    Details, lines and history for this order.
  </p>
</DetailDrawer>`,
      },
    ],
    props: [
      {
        prop: "trigger",
        type: "ReactElement",
        default: "—",
        note: {
          es: "Elemento que abre el panel; se compone con render, no con asChild.",
          ja: "パネルを開く要素。asChild ではなく render で合成します。",
          en: "Element that opens the panel; composed with render, not asChild.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Alimenta el nombre accesible del diálogo.",
          ja: "ダイアログのアクセシブル名になります。",
          en: "Provides the dialog's accessible name.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Texto bajo el título; opcional y anunciado como descripción.",
          ja: "タイトル下の説明。任意で、説明として読み上げられます。",
          en: "Text under the title; optional and announced as the description.",
        },
      },
      {
        prop: "status",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Badge o estado en la cabecera del cuerpo.",
          ja: "本文上部に置くバッジやステータスです。",
          en: "Badge or status in the body header.",
        },
      },
      {
        prop: "summary",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Resumen alineado a la izquierda del estado.",
          ja: "ステータスの左に並べる概要です。",
          en: "Summary aligned to the left of the status.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Secciones del detalle; DetailSection aporta título y regla.",
          ja: "詳細の各セクション。DetailSection が見出しと区切り線を提供します。",
          en: "Detail sections; DetailSection provides the heading and rule.",
        },
      },
      {
        prop: "footer",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Acciones fijas al pie del panel.",
          ja: "パネル下部に固定されるアクションです。",
          en: "Actions pinned to the bottom of the panel.",
        },
      },
      {
        prop: "closeLabel",
        type: "string",
        default: "—",
        note: {
          es: "aria-label del botón de cierre.",
          ja: "閉じるボタンの aria-label です。",
          en: "aria-label of the close button.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "Base UI atrapa el foco dentro del panel, cierra con Escape y lo devuelve al trigger.",
        "title alimenta el nombre accesible del diálogo; el botón de cierre usa closeLabel como aria-label.",
        "El trigger debe ser un elemento real (ReactElement): se compone con render, no con asChild.",
        "El clic en el fondo también cierra y devuelve el foco; evita acciones destructivas sin confirmación.",
      ],
      ja: [
        "Base UI はパネル内にフォーカスを閉じ込め、Escape で閉じ、トリガーにフォーカスを戻します。",
        "title がダイアログのアクセシブル名になり、閉じるボタンは closeLabel を aria-label に使います。",
        "トリガーは実際の要素（ReactElement）である必要があります。asChild ではなく render で合成します。",
        "背景のクリックでも閉じてフォーカスが戻ります。確認なしの破壊的操作は置かないでください。",
      ],
      en: [
        "Base UI traps focus inside the panel, closes on Escape and returns focus to the trigger.",
        "title provides the dialog's accessible name; the close button uses closeLabel as its aria-label.",
        "The trigger must be a real element (ReactElement): compose it with render, not asChild.",
        "Clicking the backdrop also closes and returns focus; avoid destructive actions without confirmation.",
      ],
    },
  },
  {
    slug: "status-badge",
    id: "C-059",
    category: "erp",
    name: "StatusBadge",
    jp: "状態",
    description: {
      es: "Traduce un estado de pedido a un tono del Badge con un punto decorativo. El texto lo pone quien lo usa: el color nunca es la única señal.",
      ja: "受注ステータスをバッジのトーンと装飾のドットに変換します。テキストは利用側が渡し、色だけに頼りません。",
      en: "Maps an order status to a Badge tone with a decorative dot. The caller supplies the text: colour is never the only signal.",
    },
    files: filesFor(patternFile("status-badge.tsx")),
    examples: [
      {
        id: "status-map",
        title: { es: "Mapa de estados", ja: "ステータスの対応", en: "Status map" },
        description: {
          es: "Cinco estados de pedido con su tono semántico y texto obligatorio.",
          ja: "受注の 5 状態を意味的なトーンと必須テキストで示します。",
          en: "Five order statuses with their semantic tone and required text.",
        },
        preview: <StatusBadgeDemo />,
        code: `<StatusBadge status="pending" label="Pending" />
<StatusBadge status="preparing" label="Preparing" />
<StatusBadge status="shipped" label="Shipped" />
<StatusBadge status="cancelled" label="Cancelled" />
<StatusBadge status="returned" label="Returned" />`,
      },
      {
        id: "in-row",
        title: { es: "En una fila", ja: "行の中", en: "Inside a row" },
        description: {
          es: "El badge comparte fila con el número de pedido sin romper la alineación.",
          ja: "注文番号と同じ行に置いても整列が崩れません。",
          en: "The badge shares a row with the order number without breaking alignment.",
        },
        preview: <StatusBadgeDemo inRow />,
        code: `<div className="flex items-center justify-between border border-rule px-2 py-1">
  <span className="font-mono text-2xs text-muted">KURA-10428</span>
  <StatusBadge status="preparing" label="Preparing" />
</div>`,
      },
    ],
    props: [
      {
        prop: "status",
        type: '"pending" | "preparing" | "shipped" | "cancelled" | "returned"',
        default: "—",
        note: {
          es: "Elige el tono en orderStatusTones; el mapa no se deduce del texto.",
          ja: "トーンは orderStatusTones で決まります。テキストから自動判定はしません。",
          en: "Selects the tone from orderStatusTones; the map is not inferred from the text.",
        },
      },
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Texto visible y accesible; obligatorio.",
          ja: "可視かつアクセシブルなテキストで、必須です。",
          en: "Visible and accessible text; required.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "El punto es decorativo (aria-hidden) y el texto es obligatorio: el color nunca comunica solo.",
        "El tono se deriva de status; no pases un tono arbitrario para un estado nuevo sin ampliar el mapa.",
        "En una fila el badge no es interactivo: no lo uses como botón de filtro.",
      ],
      ja: [
        "ドットは装飾（aria-hidden）で、テキストは必須です。色だけで伝えないでください。",
        "トーンは status から決まります。マップを広げずに任意のトーンを渡さないでください。",
        "行の中のバッジは操作要素ではありません。絞り込みボタンとして使わないでください。",
      ],
      en: [
        "The dot is decorative (aria-hidden) and the text is required: colour never communicates alone.",
        "The tone comes from status; do not pass an arbitrary tone for a new state without extending the map.",
        "Inside a row the badge is not interactive: do not use it as a filter button.",
      ],
    },
  },
  {
    slug: "form-section",
    id: "C-060",
    category: "erp",
    name: "FormSection",
    jp: "フォーム節",
    description: {
      es: "Sección de formulario con fieldset, legend y grilla de una o dos columnas. Agrupa campos relacionados para que la lectura y la validación tengan un límite claro.",
      ja: "fieldset、legend、1〜2 列のグリッドを持つフォームセクションです。関連するフィールドをまとめ、読み取りと検証の範囲を明確にします。",
      en: "A form section with fieldset, legend and a one- or two-column grid. It groups related fields so reading and validation have a clear boundary.",
    },
    files: filesFor(patternFile("form-section.tsx")),
    examples: [
      {
        id: "complete-form",
        title: {
          es: "Formulario completo",
          ja: "完全なフォーム",
          en: "Complete form",
        },
        description: {
          es: "Sección de dos columnas con campos obligatorios, un error visible, envío y confirmación anunciada.",
          ja: "必須項目、表示中のエラー、送信、通知される確認を含む 2 列のセクションです。",
          en: "Two-column section with required fields, a visible error, submit and an announced confirmation.",
        },
        preview: <FormSectionDemo />,
        code: `<form
  noValidate
  onSubmit={saveCustomer}
  className="grid gap-[var(--koten-gap)]"
>
  <FormSection
    title="Customer"
    description="Contact and billing details"
    columns={2}
  >
    <Field label="Contact person" required>
      <Input placeholder="e.g. Taro Yamada" />
    </Field>
    <Field label="Email" required error="Enter a valid email address.">
      <Input type="email" defaultValue="taro@" />
    </Field>
    <Field label="Phone">
      <Input type="tel" placeholder="03-5550-0101" />
    </Field>
    <Select label="Channel" defaultValue="web" items={channelItems} />
  </FormSection>
  <div className="flex flex-wrap items-center justify-between gap-2">
    <p className="text-2xs text-muted">Fields marked * are required.</p>
    <Button type="submit" size="sm" variant="primary">
      Save customer
    </Button>
  </div>
</form>`,
      },
      {
        id: "one-column",
        title: { es: "Una columna", ja: "1 列", en: "One column" },
        description: {
          es: "columns={1} apila los campos; útil en paneles estrechos.",
          ja: "columns={1} でフィールドを縦に積みます。狭いパネルに適します。",
          en: "columns={1} stacks the fields; useful in narrow panels.",
        },
        preview: <FormSectionDemo oneColumn />,
        code: `<FormSection
  title="Quick contact"
  description="Contact and billing details"
  columns={1}
  className="max-w-md"
>
  <Field label="Contact person" required>
    <Input placeholder="e.g. Taro Yamada" />
  </Field>
  <Field label="Email" required>
    <Input type="email" placeholder="taro@yamada.example" />
  </Field>
</FormSection>`,
      },
    ],
    props: [
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido del legend; nombra el grupo de campos.",
          ja: "legend の中身で、フィールド群の名前になります。",
          en: "Legend content; it names the group of fields.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Ayuda bajo el legend; no sustituye a las etiquetas de cada campo.",
          ja: "legend 下の補足で、各フィールドのラベルの代わりにはなりません。",
          en: "Help under the legend; it does not replace each field's label.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Campos Field, Input, Select o controles con etiqueta.",
          ja: "Field、Input、Select、またはラベル付きのコントロールを置きます。",
          en: "Field, Input, Select or labelled controls.",
        },
      },
      {
        prop: "columns",
        type: "1 | 2",
        default: "2",
        note: {
          es: "Dos columnas desde 640 px; en móvil siempre se apila.",
          ja: "640 px 以上で 2 列になり、モバイルでは常に縦積みです。",
          en: "Two columns from 640 px; it always stacks on mobile.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "fieldset y legend agrupan los campos; el legend es el nombre del grupo, no un título decorativo.",
        "columns solo cambia la grilla: el orden del DOM sigue siendo el orden de lectura y de tabulación.",
        "Los errores llegan por Field (aria-invalid y aria-describedby); no los escribas como texto suelto.",
        "La sección no envía nada: el form, el botón de envío y la confirmación viven fuera.",
      ],
      ja: [
        "fieldset と legend がフィールドをまとめ、legend はグループ名になります。装飾的な見出しではありません。",
        "columns はグリッドだけを変えます。DOM の順序が読み上げとタブ移動の順序です。",
        "エラーは Field（aria-invalid と aria-describedby）経由で渡します。単なるテキストにしないでください。",
        "このセクションは送信しません。form、送信ボタン、確認は外側に置きます。",
      ],
      en: [
        "fieldset and legend group the fields; the legend is the group name, not a decorative title.",
        "columns only changes the grid: DOM order remains the reading and tab order.",
        "Errors come through Field (aria-invalid and aria-describedby); do not write them as loose text.",
        "The section submits nothing: the form, submit button and confirmation live outside.",
      ],
    },
  },
  {
    slug: "timeline",
    id: "C-061",
    category: "erp",
    name: "Timeline",
    jp: "履歴",
    description: {
      es: "Lista ordenada de eventos con fecha, tono y descripción opcional. Sirve para historiales de pedido, auditoría o actividad reciente, y muestra un texto propio cuando está vacía.",
      ja: "日付、トーン、任意の説明を持つイベントの順序付きリストです。受注履歴、監査、最近の動きに使い、空のときは専用のテキストを表示します。",
      en: "An ordered list of events with date, tone and an optional description. It fits order histories, audits or recent activity, and shows its own text when empty.",
    },
    files: filesFor(patternFile("timeline.tsx")),
    examples: [
      {
        id: "order-events",
        title: { es: "Eventos de pedido", ja: "受注イベント", en: "Order events" },
        description: {
          es: "Tres eventos con fecha, tono y una descripción opcional.",
          ja: "日付、トーン、任意の説明を持つ 3 つのイベントです。",
          en: "Three events with date, tone and an optional description.",
        },
        preview: <TimelineDemo />,
        code: `<Timeline
  label="Order history"
  emptyLabel="No events yet"
  events={[
    {
      id: "received",
      time: "Oct 21 12:00",
      dateTime: "2026-10-21T12:00:00.000Z",
      title: "Order received",
      description: "Recorded automatically by the system",
    },
    {
      id: "paid",
      time: "Oct 21 12:25",
      dateTime: "2026-10-21T12:25:00.000Z",
      title: "Payment confirmed",
      tone: "success",
    },
    {
      id: "shipped",
      time: "Oct 22 15:00",
      dateTime: "2026-10-22T15:00:00.000Z",
      title: "Order shipped",
      description: "Tracking KURA-100111",
      tone: "info",
    },
  ]}
/>`,
      },
      {
        id: "empty",
        title: { es: "Lista vacía", ja: "空のリスト", en: "Empty list" },
        description: {
          es: "Sin eventos, el componente muestra el texto de emptyLabel.",
          ja: "イベントがない場合、emptyLabel のテキストを表示します。",
          en: "With no events, the component shows the emptyLabel text.",
        },
        preview: <TimelineDemo empty />,
        code: `<Timeline
  label="Order history"
  emptyLabel="No events yet"
  events={[]}
/>`,
      },
    ],
    props: [
      {
        prop: "events",
        type: "readonly TimelineEvent[]",
        default: "—",
        note: {
          es: "Cada evento acepta id, time, dateTime, title, description y tone.",
          ja: "各イベントは id、time、dateTime、title、description、tone を受け付けます。",
          en: "Each event accepts id, time, dateTime, title, description and tone.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "aria-label de la lista ordenada.",
          ja: "順序付きリストの aria-label です。",
          en: "aria-label of the ordered list.",
        },
      },
      {
        prop: "emptyLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto cuando events está vacío.",
          ja: "events が空のときのテキストです。",
          en: "Text shown when events is empty.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: classNameNote,
      },
    ],
    a11y: {
      es: [
        "Es una lista ordenada con aria-label; cada evento conserva su orden cronológico en el DOM.",
        "time usa dateTime en ISO para que la fecha sea legible por máquina.",
        "Los puntos de tono son decorativos; el texto del evento debe describir el cambio.",
        "El estado vacío es un párrafo: si aparece tras una acción, anúncialo con aria-live.",
      ],
      ja: [
        "aria-label 付きの順序付きリストで、各イベントは DOM 上でも時系列を保ちます。",
        "time は ISO の dateTime を使い、日付を機械可読にします。",
        "トーンのドットは装飾です。イベントのテキストで変化を説明してください。",
        "空状態は段落です。操作後に表示する場合は aria-live で通知します。",
      ],
      en: [
        "It is an ordered list with aria-label; each event keeps its chronological order in the DOM.",
        "time uses an ISO dateTime so the date is machine-readable.",
        "Tone dots are decorative; the event text must describe the change.",
        "The empty state is a paragraph: if it appears after an action, announce it with aria-live.",
      ],
    },
  },
];
