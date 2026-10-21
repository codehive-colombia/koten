import {
  Breadcrumb,
  Button,
  DetailDrawer,
  DetailSection,
  Field,
  FilterBar,
  FormSection,
  Input,
  type KotenLocale,
  PageHeader as PatternPageHeader,
  Select,
  SideNav,
  StatusBadge,
  Timeline,
  TopBar,
  useKoten,
} from "@koten/ui";
import { Code, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Patrones · 台帳",
    title: "Patrones de ERP",
    description:
      "Las nueve piezas del backoffice KURA: shell, navegación lateral, topbar, cabecera de página, filtros, estados, formularios, timeline y drawer de detalle. La tabla es el centro; el color solo refuerza.",
    meta: "9 piezas · demo real en http://localhost:5175",
    shellSectionTitle: "AppShell, SideNav y TopBar",
    shellSectionMeta: "232 px + contenido; skip link",
    navLabel: "Navegación principal",
    navGroups: [
      {
        id: "operations",
        label: "Operación",
        items: [
          { id: "dashboard", label: "Dashboard", href: "#", active: false },
          { id: "orders", label: "Pedidos", href: "#", active: true, count: 22 },
        ],
      },
      {
        id: "master",
        label: "Datos",
        items: [
          { id: "products", label: "Productos", href: "#", active: false },
          { id: "inventory", label: "Inventario", href: "#", active: false, count: 4 },
          { id: "customers", label: "Clientes", href: "#", active: false },
          { id: "reports", label: "Informes", href: "#", active: false },
        ],
      },
    ],
    topbarSection: "Pedidos",
    searchAria: "Buscar",
    searchPlaceholder: "Pedido, cliente o SKU",
    breadcrumbLabel: "Migas de pan",
    home: "Inicio",
    pageEyebrow: "Ventas",
    pageTitle: "Pedidos",
    pageDescription: "Busca, filtra y procesa pedidos. Los filtros viven en la URL.",
    newOrder: "+ Nuevo pedido",
    shellNote:
      "El shell de la demo usa 232 px de sidebar, topbar sticky y skip link. En mobile el menú se pliega en el topbar.",
    filtersSectionTitle: "FilterBar",
    filtersSectionMeta: "Aplicar, limpiar y conteo",
    filtersLabel: "Filtros de pedidos",
    filtersSubmit: "Aplicar filtros",
    filtersReset: "Limpiar",
    filtersResult: "132 pedidos",
    filterSearchLabel: "Buscar",
    filterSearchPlaceholder: "Número, cliente o SKU",
    statusFilterLabel: "Estado",
    statusAll: "Todos los estados",
    pending: "Pendiente",
    preparing: "Preparando",
    shipped: "Enviado",
    warehouseLabel: "Almacén",
    warehouseAll: "Todos los almacenes",
    tokyo: "Tokio",
    osaka: "Osaka",
    fukuoka: "Fukuoka",
    periodLabel: "Periodo",
    today: "Hoy",
    week: "7 días",
    month: "30 días",
    all: "Todo",
    statusSectionTitle: "StatusBadge",
    statusSectionMeta: "Texto + punto; nunca solo color",
    cancelled: "Cancelado",
    returned: "Devuelto",
    timelineSectionTitle: "Timeline",
    timelineSectionMeta: "Eventos fechados del pedido",
    timelineLabel: "Historial del pedido",
    timelineEmpty: "Sin eventos",
    events: [
      {
        id: "e1",
        time: "21/10 12:00",
        dateTime: "2026-10-21T12:00:00.000Z",
        title: "Pedido recibido",
        description: "Registrado automáticamente por el sistema",
        tone: "neutral" as const,
      },
      {
        id: "e2",
        time: "21/10 12:25",
        dateTime: "2026-10-21T12:25:00.000Z",
        title: "Pago confirmado",
        description: undefined,
        tone: "success" as const,
      },
      {
        id: "e3",
        time: "22/10 15:00",
        dateTime: "2026-10-22T15:00:00.000Z",
        title: "Pedido enviado",
        description: "Seguimiento KURA-100111",
        tone: "info" as const,
      },
    ],
    formSectionTitle: "FormSection",
    formSectionMeta: "Fieldset, legend y grid",
    formGroupTitle: "Cliente",
    formGroupDescription: "Datos de contacto y facturación",
    contactLabel: "Persona de contacto",
    contactPlaceholder: "Ej. Taro Yamada",
    emailLabel: "Correo electrónico",
    emailError: "Escribe un correo válido.",
    phoneLabel: "Teléfono",
    channelLabel: "Canal",
    channelWeb: "Web",
    channelStore: "Tienda",
    channelPhone: "Teléfono",
    drawerSectionTitle: "DetailDrawer",
    drawerSectionMeta: "Foco gestionado y retorno al trigger",
    drawerTrigger: "Abrir detalle de pedido",
    drawerTitle: "Pedido KURA-10428",
    drawerDescription: "Detalle, líneas e historial del pedido.",
    drawerClose: "Cerrar detalle",
    customerCompany: "Yamada Shōji",
    customerLine: "Yamada Tarō · Tokio",
    markPreparing: "Marcar preparando",
    markShipped: "Marcar enviado",
    detailCustomer: "Cliente",
    detailLines: "Líneas",
    detailLinesMeta: "2 artículos",
    lineItem: "Objetivo HIKARI 35 mm f/2.8",
    linePrice: "32.400 JPY",
    detailHistory: "Historial",
    historyLine: "Pedido recibido · Pago confirmado · Preparación iniciada",
    propsSectionTitle: "Props y código",
    propsSectionMeta: "Composición copiable",
    propsCaption: "Props de los patrones de ERP",
    propsRows: [
      {
        prop: "AppShell",
        type: "{ brand, sidebar, sidebarLabel, topbar, skipLabel }",
        default: "—",
        note: "Sidebar de 232 px, topbar sticky y main con id.",
      },
      {
        prop: "SideNav",
        type: "{ groups, label, onNavigate, footer }",
        default: "—",
        note: "Estado activo con aria-current y barra primaria.",
      },
      {
        prop: "FilterBar",
        type: "{ label, onSubmit, onReset, resultLabel }",
        default: "—",
        note: "role=search y acciones primaria/secundaria.",
      },
      {
        prop: "DetailDrawer",
        type: "{ trigger, title, status, summary, footer }",
        default: "side=right",
        note: "Base UI devuelve el foco al trigger al cerrar.",
      },
      {
        prop: "StatusBadge",
        type: "{ status, label }",
        default: "—",
        note: "Mapa de tonos; el texto es obligatorio.",
      },
    ],
    code: `<AppShell
  skipLabel="Saltar al contenido"
  sidebarLabel="Navegación principal"
  brand={<Brand />}
  sidebar={<SideNav groups={groups} label="Principal" onNavigate={navigate} />}
  topbar={<TopBar left={<Breadcrumb />} search={<GlobalSearch />} actions={<Actions />} />}
>
  <Routes>…</Routes>
</AppShell>

<DetailDrawer
  trigger={<Button aria-label={\`Abrir el pedido \${order.id}\`}>Ver</Button>}
  title={order.id}
  status={<StatusBadge status={order.status} label={statusLabel} />}
  footer={<OrderActions order={order} />}
>
  <DetailSection title="Cliente">…</DetailSection>
  <DetailSection title="Líneas">…</DetailSection>
  <DetailSection title="Historial"><Timeline events={events} /></DetailSection>
</DetailDrawer>`,
    a11ySectionTitle: "Accesibilidad",
    a11ySectionMeta: "Teclado, foco y estado",
    a11yLabel: "Notas de accesibilidad de los patrones de ERP",
    a11yItems: [
      "El skip link es el primer foco y apunta al main.",
      "SideNav expone aria-current=page y mantiene el foco visible.",
      "El drawer atrapa el foco, cierra con Escape y lo devuelve al botón de la fila.",
      "La selección de la tabla se anuncia con aria-live; el count también es texto.",
      "StatusBadge usa punto decorativo + texto; nunca color solo.",
      "El formulario vincula errores con aria-invalid y aria-describedby.",
    ],
  },
  ja: {
    eyebrow: "パターン · 台帳",
    title: "ERP のパターン",
    description:
      "KURA バックオフィスを構成する 9 の部品。シェル、サイドナビゲーション、トップバー、ページヘッダー、絞り込み、ステータス、フォーム、タイムライン、詳細ドロワー。主役は表で、色は補助に留めます。",
    meta: "9 部品 · 実デモ http://localhost:5175",
    shellSectionTitle: "AppShell、SideNav、TopBar",
    shellSectionMeta: "232 px + コンテンツ、スキップリンク",
    navLabel: "メインナビゲーション",
    navGroups: [
      {
        id: "operations",
        label: "オペレーション",
        items: [
          { id: "dashboard", label: "ダッシュボード", href: "#", active: false },
          { id: "orders", label: "受注", href: "#", active: true, count: 22 },
        ],
      },
      {
        id: "master",
        label: "マスタ",
        items: [
          { id: "products", label: "商品", href: "#", active: false },
          { id: "inventory", label: "在庫", href: "#", active: false, count: 4 },
          { id: "customers", label: "顧客", href: "#", active: false },
          { id: "reports", label: "レポート", href: "#", active: false },
        ],
      },
    ],
    topbarSection: "受注",
    searchAria: "検索",
    searchPlaceholder: "受注番号、顧客、SKU",
    breadcrumbLabel: "パンくず",
    home: "ホーム",
    pageEyebrow: "販売",
    pageTitle: "受注",
    pageDescription: "受注を検索、絞り込み、処理します。絞り込み条件は URL に保持されます。",
    newOrder: "+ 新規受注",
    shellNote:
      "デモのシェルは 232 px のサイドバー、固定トップバー、スキップリンクを使います。モバイルではメニューがトップバーに折りたたまれます。",
    filtersSectionTitle: "FilterBar",
    filtersSectionMeta: "適用、クリア、件数",
    filtersLabel: "受注の絞り込み",
    filtersSubmit: "絞り込む",
    filtersReset: "クリア",
    filtersResult: "132 件の受注",
    filterSearchLabel: "検索",
    filterSearchPlaceholder: "受注番号、顧客、SKU",
    statusFilterLabel: "ステータス",
    statusAll: "すべてのステータス",
    pending: "保留中",
    preparing: "準備中",
    shipped: "発送済み",
    warehouseLabel: "倉庫",
    warehouseAll: "すべての倉庫",
    tokyo: "東京",
    osaka: "大阪",
    fukuoka: "福岡",
    periodLabel: "期間",
    today: "今日",
    week: "7 日間",
    month: "30 日間",
    all: "すべて",
    statusSectionTitle: "StatusBadge",
    statusSectionMeta: "テキスト + ドット。色だけに頼らない",
    cancelled: "キャンセル",
    returned: "返品済み",
    timelineSectionTitle: "Timeline",
    timelineSectionMeta: "日付付きの受注イベント",
    timelineLabel: "受注履歴",
    timelineEmpty: "イベントはありません",
    events: [
      {
        id: "e1",
        time: "10/21 12:00",
        dateTime: "2026-10-21T12:00:00.000Z",
        title: "受注受付",
        description: "システムが自動で記録",
        tone: "neutral" as const,
      },
      {
        id: "e2",
        time: "10/21 12:25",
        dateTime: "2026-10-21T12:25:00.000Z",
        title: "支払い確認済み",
        description: undefined,
        tone: "success" as const,
      },
      {
        id: "e3",
        time: "10/22 15:00",
        dateTime: "2026-10-22T15:00:00.000Z",
        title: "発送済み",
        description: "追跡番号 KURA-100111",
        tone: "info" as const,
      },
    ],
    formSectionTitle: "FormSection",
    formSectionMeta: "fieldset、legend、グリッド",
    formGroupTitle: "顧客",
    formGroupDescription: "連絡先と請求先の情報",
    contactLabel: "担当者",
    contactPlaceholder: "例：山田 太郎",
    emailLabel: "メールアドレス",
    emailError: "有効なメールアドレスを入力してください。",
    phoneLabel: "電話番号",
    channelLabel: "チャネル",
    channelWeb: "Web",
    channelStore: "店舗",
    channelPhone: "電話",
    drawerSectionTitle: "DetailDrawer",
    drawerSectionMeta: "フォーカス管理とトリガーへの復帰",
    drawerTrigger: "受注の詳細を開く",
    drawerTitle: "受注 KURA-10428",
    drawerDescription: "受注の詳細、明細、履歴。",
    drawerClose: "詳細を閉じる",
    customerCompany: "山田商事",
    customerLine: "山田 太郎 · 東京",
    markPreparing: "準備中にする",
    markShipped: "発送済みにする",
    detailCustomer: "顧客",
    detailLines: "明細",
    detailLinesMeta: "2 点",
    lineItem: "HIKARI 35 mm f/2.8 レンズ",
    linePrice: "32,400 JPY",
    detailHistory: "履歴",
    historyLine: "受注受付 · 支払い確認済み · 準備開始",
    propsSectionTitle: "Props とコード",
    propsSectionMeta: "コピーできる構成",
    propsCaption: "ERP パターンの props",
    propsRows: [
      {
        prop: "AppShell",
        type: "{ brand, sidebar, sidebarLabel, topbar, skipLabel }",
        default: "—",
        note: "232 px のサイドバー、固定トップバー、id 付きの main。",
      },
      {
        prop: "SideNav",
        type: "{ groups, label, onNavigate, footer }",
        default: "—",
        note: "aria-current とプライマリのバーでアクティブ状態を示す。",
      },
      {
        prop: "FilterBar",
        type: "{ label, onSubmit, onReset, resultLabel }",
        default: "—",
        note: "role=search と主・副のアクション。",
      },
      {
        prop: "DetailDrawer",
        type: "{ trigger, title, status, summary, footer }",
        default: "side=right",
        note: "閉じると Base UI がフォーカスをトリガーに戻す。",
      },
      {
        prop: "StatusBadge",
        type: "{ status, label }",
        default: "—",
        note: "トーンのマップ。テキストは必須。",
      },
    ],
    code: `<AppShell
  skipLabel="コンテンツへスキップ"
  sidebarLabel="メインナビゲーション"
  brand={<Brand />}
  sidebar={<SideNav groups={groups} label="メイン" onNavigate={navigate} />}
  topbar={<TopBar left={<Breadcrumb />} search={<GlobalSearch />} actions={<Actions />} />}
>
  <Routes>…</Routes>
</AppShell>

<DetailDrawer
  trigger={<Button aria-label={\`注文 \${order.id} を開く\`}>表示</Button>}
  title={order.id}
  status={<StatusBadge status={order.status} label={statusLabel} />}
  footer={<OrderActions order={order} />}
>
  <DetailSection title="顧客">…</DetailSection>
  <DetailSection title="明細">…</DetailSection>
  <DetailSection title="履歴"><Timeline events={events} /></DetailSection>
</DetailDrawer>`,
    a11ySectionTitle: "アクセシビリティ",
    a11ySectionMeta: "キーボード、フォーカス、状態",
    a11yLabel: "ERP パターンのアクセシビリティメモ",
    a11yItems: [
      "スキップリンクは最初のフォーカスで、main を指します。",
      "SideNav は aria-current=page を公開し、フォーカスを視認できます。",
      "ドロワーはフォーカスを閉じ込め、Escape で閉じ、行のボタンに戻します。",
      "表の選択は aria-live で通知され、件数もテキストです。",
      "StatusBadge は装飾のドット + テキスト。色だけに頼りません。",
      "フォームは aria-invalid と aria-describedby でエラーを結び付けます。",
    ],
  },
  en: {
    eyebrow: "Patterns · 台帳",
    title: "ERP patterns",
    description:
      "The nine pieces of the KURA back office: shell, side navigation, topbar, page header, filters, statuses, forms, timeline and detail drawer. The table is the centre; colour only reinforces.",
    meta: "9 pieces · live demo at http://localhost:5175",
    shellSectionTitle: "AppShell, SideNav and TopBar",
    shellSectionMeta: "232 px + content; skip link",
    navLabel: "Main navigation",
    navGroups: [
      {
        id: "operations",
        label: "Operations",
        items: [
          { id: "dashboard", label: "Dashboard", href: "#", active: false },
          { id: "orders", label: "Orders", href: "#", active: true, count: 22 },
        ],
      },
      {
        id: "master",
        label: "Data",
        items: [
          { id: "products", label: "Products", href: "#", active: false },
          { id: "inventory", label: "Inventory", href: "#", active: false, count: 4 },
          { id: "customers", label: "Customers", href: "#", active: false },
          { id: "reports", label: "Reports", href: "#", active: false },
        ],
      },
    ],
    topbarSection: "Orders",
    searchAria: "Search",
    searchPlaceholder: "Order, customer or SKU",
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    pageEyebrow: "Sales",
    pageTitle: "Orders",
    pageDescription: "Search, filter and process orders. Filters live in the URL.",
    newOrder: "+ New order",
    shellNote:
      "The demo shell uses a 232 px sidebar, a sticky topbar and a skip link. On mobile the menu folds into the topbar.",
    filtersSectionTitle: "FilterBar",
    filtersSectionMeta: "Apply, clear and count",
    filtersLabel: "Order filters",
    filtersSubmit: "Apply filters",
    filtersReset: "Clear",
    filtersResult: "132 orders",
    filterSearchLabel: "Search",
    filterSearchPlaceholder: "Number, customer or SKU",
    statusFilterLabel: "Status",
    statusAll: "All statuses",
    pending: "Pending",
    preparing: "Preparing",
    shipped: "Shipped",
    warehouseLabel: "Warehouse",
    warehouseAll: "All warehouses",
    tokyo: "Tokyo",
    osaka: "Osaka",
    fukuoka: "Fukuoka",
    periodLabel: "Period",
    today: "Today",
    week: "7 days",
    month: "30 days",
    all: "All",
    statusSectionTitle: "StatusBadge",
    statusSectionMeta: "Text + dot; never colour alone",
    cancelled: "Cancelled",
    returned: "Returned",
    timelineSectionTitle: "Timeline",
    timelineSectionMeta: "Dated order events",
    timelineLabel: "Order history",
    timelineEmpty: "No events",
    events: [
      {
        id: "e1",
        time: "Oct 21 12:00",
        dateTime: "2026-10-21T12:00:00.000Z",
        title: "Order received",
        description: "Recorded automatically by the system",
        tone: "neutral" as const,
      },
      {
        id: "e2",
        time: "Oct 21 12:25",
        dateTime: "2026-10-21T12:25:00.000Z",
        title: "Payment confirmed",
        description: undefined,
        tone: "success" as const,
      },
      {
        id: "e3",
        time: "Oct 22 15:00",
        dateTime: "2026-10-22T15:00:00.000Z",
        title: "Order shipped",
        description: "Tracking KURA-100111",
        tone: "info" as const,
      },
    ],
    formSectionTitle: "FormSection",
    formSectionMeta: "Fieldset, legend and grid",
    formGroupTitle: "Customer",
    formGroupDescription: "Contact and billing details",
    contactLabel: "Contact person",
    contactPlaceholder: "e.g. Taro Yamada",
    emailLabel: "Email",
    emailError: "Enter a valid email address.",
    phoneLabel: "Phone",
    channelLabel: "Channel",
    channelWeb: "Web",
    channelStore: "Store",
    channelPhone: "Phone",
    drawerSectionTitle: "DetailDrawer",
    drawerSectionMeta: "Managed focus and return to the trigger",
    drawerTrigger: "Open order details",
    drawerTitle: "Order KURA-10428",
    drawerDescription: "Order details, lines and history.",
    drawerClose: "Close details",
    customerCompany: "Yamada Shōji",
    customerLine: "Yamada Tarō · Tokyo",
    markPreparing: "Mark as preparing",
    markShipped: "Mark as shipped",
    detailCustomer: "Customer",
    detailLines: "Lines",
    detailLinesMeta: "2 items",
    lineItem: "HIKARI 35 mm f/2.8 lens",
    linePrice: "32,400 JPY",
    detailHistory: "History",
    historyLine: "Order received · Payment confirmed · Preparation started",
    propsSectionTitle: "Props and code",
    propsSectionMeta: "Copyable composition",
    propsCaption: "ERP pattern props",
    propsRows: [
      {
        prop: "AppShell",
        type: "{ brand, sidebar, sidebarLabel, topbar, skipLabel }",
        default: "—",
        note: "232 px sidebar, sticky topbar and a main with an id.",
      },
      {
        prop: "SideNav",
        type: "{ groups, label, onNavigate, footer }",
        default: "—",
        note: "Active state with aria-current and a primary bar.",
      },
      {
        prop: "FilterBar",
        type: "{ label, onSubmit, onReset, resultLabel }",
        default: "—",
        note: "role=search with primary and secondary actions.",
      },
      {
        prop: "DetailDrawer",
        type: "{ trigger, title, status, summary, footer }",
        default: "side=right",
        note: "Base UI returns focus to the trigger on close.",
      },
      {
        prop: "StatusBadge",
        type: "{ status, label }",
        default: "—",
        note: "Tone map; the text is required.",
      },
    ],
    code: `<AppShell
  skipLabel="Skip to content"
  sidebarLabel="Main navigation"
  brand={<Brand />}
  sidebar={<SideNav groups={groups} label="Main" onNavigate={navigate} />}
  topbar={<TopBar left={<Breadcrumb />} search={<GlobalSearch />} actions={<Actions />} />}
>
  <Routes>…</Routes>
</AppShell>

<DetailDrawer
  trigger={<Button aria-label={\`Open order \${order.id}\`}>View</Button>}
  title={order.id}
  status={<StatusBadge status={order.status} label={statusLabel} />}
  footer={<OrderActions order={order} />}
>
  <DetailSection title="Customer">…</DetailSection>
  <DetailSection title="Lines">…</DetailSection>
  <DetailSection title="History"><Timeline events={events} /></DetailSection>
</DetailDrawer>`,
    a11ySectionTitle: "Accessibility",
    a11ySectionMeta: "Keyboard, focus and state",
    a11yLabel: "Accessibility notes for the ERP patterns",
    a11yItems: [
      "The skip link is the first focus stop and targets main.",
      "SideNav exposes aria-current=page and keeps focus visible.",
      "The drawer traps focus, closes on Escape and returns focus to the row button.",
      "Table selection is announced with aria-live; the count is text too.",
      "StatusBadge uses a decorative dot + text; never colour alone.",
      "The form links errors with aria-invalid and aria-describedby.",
    ],
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function ErpPatternsPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="台帳"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="shell" title={t.shellSectionTitle} jp="枠組み" meta={t.shellSectionMeta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-[232px_minmax(0,1fr)]">
            <div className="border border-rule bg-surface">
              <div className="flex h-12 items-center gap-2 border-b border-rule px-3">
                <span className="grid size-7 place-items-center border-2 border-primary font-serif text-sm leading-none text-primary">
                  倉
                </span>
                <span className="font-serif text-base font-semibold">KURA</span>
                <span className="ms-auto text-2xs text-faint">ERP</span>
              </div>
              <SideNav label={t.navLabel} groups={t.navGroups} />
            </div>
            <div className="min-w-0 border border-rule bg-surface">
              <TopBar
                left={
                  <span className="text-2xs text-muted">
                    KURA / <span className="font-semibold text-ink">{t.topbarSection}</span>
                  </span>
                }
                search={
                  <search
                    aria-label={t.searchAria}
                    className="flex border border-rule-strong bg-surface"
                  >
                    <label htmlFor="erp-demo-search" className="sr-only">
                      {t.searchAria}
                    </label>
                    <input
                      id="erp-demo-search"
                      type="search"
                      placeholder={t.searchPlaceholder}
                      className="h-[var(--koten-control-h)] w-full min-w-0 border-0 bg-transparent px-2 text-xs"
                    />
                  </search>
                }
                actions={<span className="text-2xs text-muted">ES · 日本語 · EN</span>}
              />
              <div className="p-3">
                <PatternPageHeader
                  breadcrumb={
                    <Breadcrumb
                      label={t.breadcrumbLabel}
                      items={[{ label: t.home, href: "#" }, { label: t.topbarSection }]}
                    />
                  }
                  eyebrow={t.pageEyebrow}
                  title={t.pageTitle}
                  description={t.pageDescription}
                  actions={
                    <Button variant="primary" size="sm">
                      {t.newOrder}
                    </Button>
                  }
                />
                <p className="mt-2 text-2xs text-muted">{t.shellNote}</p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="filters"
          title={t.filtersSectionTitle}
          jp="絞り込み"
          meta={t.filtersSectionMeta}
        >
          <FilterBar
            label={t.filtersLabel}
            submitLabel={t.filtersSubmit}
            resetLabel={t.filtersReset}
            resultLabel={t.filtersResult}
          >
            <Field label={t.filterSearchLabel}>
              <Input placeholder={t.filterSearchPlaceholder} />
            </Field>
            <Select
              label={t.statusFilterLabel}
              defaultValue="all"
              items={[
                { value: "all", label: t.statusAll },
                { value: "pending", label: t.pending },
                { value: "preparing", label: t.preparing },
                { value: "shipped", label: t.shipped },
              ]}
            />
            <Select
              label={t.warehouseLabel}
              defaultValue="all"
              items={[
                { value: "all", label: t.warehouseAll },
                { value: "tokyo", label: t.tokyo },
                { value: "osaka", label: t.osaka },
                { value: "fukuoka", label: t.fukuoka },
              ]}
            />
            <Select
              label={t.periodLabel}
              defaultValue="all"
              items={[
                { value: "today", label: t.today },
                { value: "week", label: t.week },
                { value: "month", label: t.month },
                { value: "all", label: t.all },
              ]}
            />
          </FilterBar>
        </Section>

        <Section id="status" title={t.statusSectionTitle} jp="状態" meta={t.statusSectionMeta}>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="pending" label={t.pending} />
            <StatusBadge status="preparing" label={t.preparing} />
            <StatusBadge status="shipped" label={t.shipped} />
            <StatusBadge status="cancelled" label={t.cancelled} />
            <StatusBadge status="returned" label={t.returned} />
          </div>
        </Section>

        <Section
          id="timeline"
          title={t.timelineSectionTitle}
          jp="履歴"
          meta={t.timelineSectionMeta}
        >
          <div className="max-w-md">
            <Timeline label={t.timelineLabel} emptyLabel={t.timelineEmpty} events={t.events} />
          </div>
        </Section>

        <Section id="form" title={t.formSectionTitle} jp="入力" meta={t.formSectionMeta}>
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
                { value: "phone", label: t.channelPhone },
              ]}
            />
          </FormSection>
        </Section>

        <Section id="drawer" title={t.drawerSectionTitle} jp="詳細" meta={t.drawerSectionMeta}>
          <DetailDrawer
            trigger={<Button variant="secondary">{t.drawerTrigger}</Button>}
            title={t.drawerTitle}
            description={t.drawerDescription}
            closeLabel={t.drawerClose}
            status={<StatusBadge status="preparing" label={t.preparing} />}
            summary={
              <div className="text-2xs text-muted">
                <p className="text-xs font-semibold text-ink">{t.customerCompany}</p>
                <p>{t.customerLine}</p>
              </div>
            }
            footer={
              <>
                <Button variant="secondary" size="sm">
                  {t.markPreparing}
                </Button>
                <Button variant="primary" size="sm">
                  {t.markShipped}
                </Button>
              </>
            }
          >
            <DetailSection title={t.detailCustomer}>
              <p className="text-2xs text-muted">taro.yamada@yamada.example · 03-5550-0101</p>
            </DetailSection>
            <DetailSection title={t.detailLines} meta={t.detailLinesMeta}>
              <div className="flex justify-between border border-rule px-2 py-1 text-2xs">
                <span>{t.lineItem}</span>
                <span className="tabular-nums">{t.linePrice}</span>
              </div>
            </DetailSection>
            <DetailSection title={t.detailHistory}>
              <p className="text-2xs text-muted">{t.historyLine}</p>
            </DetailSection>
          </DetailDrawer>
        </Section>

        <Section id="props" title={t.propsSectionTitle} jp="使い方" meta={t.propsSectionMeta}>
          <PropsTable caption={t.propsCaption} rows={t.propsRows} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11ySectionTitle} jp="配慮" meta={t.a11ySectionMeta}>
          <List label={t.a11yLabel} items={t.a11yItems} />
        </Section>
      </div>
    </div>
  );
}
