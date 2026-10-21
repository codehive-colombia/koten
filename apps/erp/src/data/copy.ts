import type { KotenLocale } from "@koten/ui";
import type { ChannelId, OrderStatus, PaymentId, WarehouseId } from "./types";

export type ErpCopy = {
  meta: { title: string; description: string };
  skip: string;
  brand: { name: string; jp: string; product: string };
  shell: {
    sidebarLabel: string;
    groups: { operations: string; master: string; admin: string };
    nav: {
      dashboard: string;
      orders: string;
      products: string;
      inventory: string;
      customers: string;
      reports: string;
      settings: string;
    };
    topbar: {
      search: string;
      searchPlaceholder: string;
      notifications: string;
      account: string;
      menu: string;
    };
    language: string;
    breadcrumbHome: string;
    breadcrumbLabel: string;
    version: string;
  };
  common: {
    previous: string;
    next: string;
    selectAll: string;
    selectRow: (id: string) => string;
    selected: (count: number) => string;
    empty: string;
    loading: string;
    total: string;
    date: string;
    status: string;
    actions: string;
    view: string;
    close: string;
    clear: string;
    apply: string;
    cancel: string;
    confirm: string;
    all: string;
    search: string;
    export: string;
  };
  status: Record<OrderStatus, string>;
  channel: Record<ChannelId, string>;
  warehouse: Record<WarehouseId, string>;
  payment: Record<PaymentId, string>;
  dashboard: {
    eyebrow: string;
    title: string;
    description: string;
    newOrder: string;
    kpi: { ordersToday: string; openOrders: string; revenue: string; lowStock: string };
    meta: { vsYesterday: string; openHint: string; revenueHint: string; lowStockHint: string };
    chart: { title: string; meta: string; valueLabel: (value: number) => string };
    recent: { title: string; meta: string; viewAll: string; caption: string };
    tasks: { title: string; meta: string };
  };
  orders: {
    eyebrow: string;
    title: string;
    description: string;
    newOrder: string;
    filters: {
      label: string;
      search: string;
      searchPlaceholder: string;
      status: string;
      allStatuses: string;
      warehouse: string;
      allWarehouses: string;
      range: string;
      ranges: { today: string; week: string; month: string; all: string };
      submit: string;
      reset: string;
      results: (count: number) => string;
    };
    table: {
      caption: string;
      id: string;
      customer: string;
      channel: string;
      warehouse: string;
      date: string;
      items: string;
      total: string;
      status: string;
      actions: string;
      viewOrder: (id: string) => string;
    };
    empty: string;
    selection: {
      selectAll: string;
      selectRow: (id: string) => string;
      selected: (count: number) => string;
    };
    bulk: {
      preparing: string;
      shipped: string;
      export: string;
      reset: string;
      success: (count: number, status: string) => string;
      exportSuccess: (count: number) => string;
    };
    detail: {
      title: (id: string) => string;
      description: string;
      close: string;
      customer: string;
      contact: string;
      shipping: string;
      warehouse: string;
      channel: string;
      payment: string;
      dueDate: string;
      lines: string;
      product: string;
      quantity: string;
      unitPrice: string;
      lineTotal: string;
      timeline: string;
      timelineEmpty: string;
      note: string;
      actions: string;
      markPreparing: string;
      markShipped: string;
      print: string;
      tracking: string;
      total: string;
      itemCount: (count: number) => string;
    };
  };
  form: {
    eyebrow: string;
    title: string;
    description: string;
    sections: { customer: string; delivery: string; notes: string };
    fields: {
      customer: string;
      contact: string;
      email: string;
      phone: string;
      channel: string;
      warehouse: string;
      dueDate: string;
      note: string;
      notify: string;
    };
    placeholders: {
      customer: string;
      contact: string;
      email: string;
      phone: string;
      dueDate: string;
      note: string;
    };
    errors: {
      summaryTitle: string;
      summary: (count: number) => string;
      customer: string;
      contact: string;
      email: string;
      dueDate: string;
    };
    summary: { title: string; description: string; submit: string; cancel: string };
    success: { title: string; description: string };
  };
  notFound: { title: string; description: string; back: string };
  placeholder: { title: string; description: string };
  toast: { close: string; region: string };
};

const spanish: ErpCopy = {
  meta: {
    title: "KURA · ERP de distribución",
    description:
      "KURA, backoffice de distribución mayorista: dashboard, pedidos, filtros, tabla densa y detalle de pedido.",
  },
  skip: "Saltar al contenido",
  brand: { name: "KURA", jp: "倉", product: "ERP" },
  shell: {
    sidebarLabel: "Navegación principal",
    groups: { operations: "Operación", master: "Datos", admin: "Administración" },
    nav: {
      dashboard: "Dashboard",
      orders: "Pedidos",
      products: "Productos",
      inventory: "Inventario",
      customers: "Clientes",
      reports: "Informes",
      settings: "Configuración",
    },
    topbar: {
      search: "Buscar",
      searchPlaceholder: "Pedido, cliente o SKU",
      notifications: "Notificaciones",
      account: "Cuenta",
      menu: "Menú",
    },
    language: "Idioma",
    breadcrumbHome: "Inicio",
    breadcrumbLabel: "Migas de pan",
    version: "KURA · v0.1",
  },
  common: {
    previous: "Anterior",
    next: "Siguiente",
    selectAll: "Seleccionar todo",
    selectRow: (id) => `Seleccionar ${id}`,
    selected: (count) => `${count} seleccionados`,
    empty: "Sin resultados",
    loading: "Cargando…",
    total: "Total",
    date: "Fecha",
    status: "Estado",
    actions: "Acciones",
    view: "Ver",
    close: "Cerrar",
    clear: "Limpiar",
    apply: "Aplicar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    all: "Todos",
    search: "Buscar",
    export: "Exportar",
  },
  status: {
    pending: "Pendiente",
    preparing: "Preparando",
    shipped: "Enviado",
    cancelled: "Cancelado",
    returned: "Devuelto",
  },
  channel: { web: "Web", store: "Tienda", phone: "Teléfono" },
  warehouse: { tokyo: "Tokio", osaka: "Osaka", fukuoka: "Fukuoka" },
  payment: { invoice: "Factura", card: "Tarjeta", transfer: "Transferencia" },
  dashboard: {
    eyebrow: "Operación diaria",
    title: "Dashboard",
    description:
      "Pedidos, ingresos y stock en una sola vista. La tabla es el centro; el color solo refuerza el estado.",
    newOrder: "Nuevo pedido",
    kpi: {
      ordersToday: "Pedidos hoy",
      openOrders: "Pendientes",
      revenue: "Ingresos 7 días",
      lowStock: "Stock bajo",
    },
    meta: {
      vsYesterday: "vs. ayer",
      openHint: "Pendientes y en preparación",
      revenueHint: "Últimos 7 días, sin cancelados",
      lowStockHint: "SKUs bajo mínimo",
    },
    chart: {
      title: "Pedidos por día",
      meta: "Últimos 14 días",
      valueLabel: (value) => `${value} pedidos`,
    },
    recent: {
      title: "Pedidos recientes",
      meta: "Últimos 8 movimientos",
      viewAll: "Ver todos",
      caption: "Pedidos recientes de KURA",
    },
    tasks: { title: "Tareas y avisos", meta: "Requieren atención" },
  },
  orders: {
    eyebrow: "Ventas",
    title: "Pedidos",
    description:
      "Busca, filtra y procesa pedidos. Los filtros viven en la URL y la selección se anuncia con aria-live.",
    newOrder: "Nuevo pedido",
    filters: {
      label: "Filtros de pedidos",
      search: "Buscar pedidos",
      searchPlaceholder: "Número, cliente o SKU",
      status: "Estado",
      allStatuses: "Todos los estados",
      warehouse: "Almacén",
      allWarehouses: "Todos los almacenes",
      range: "Periodo",
      ranges: { today: "Hoy", week: "7 días", month: "30 días", all: "Todo" },
      submit: "Aplicar filtros",
      reset: "Limpiar",
      results: (count) => `${count} pedidos`,
    },
    table: {
      caption: "Pedidos de KURA",
      id: "Pedido",
      customer: "Cliente",
      channel: "Canal",
      warehouse: "Almacén",
      date: "Fecha",
      items: "Artículos",
      total: "Total",
      status: "Estado",
      actions: "Acciones",
      viewOrder: (id) => `Abrir el pedido ${id}`,
    },
    empty: "No hay pedidos para los filtros seleccionados.",
    selection: {
      selectAll: "Seleccionar todos los pedidos de la página",
      selectRow: (id) => `Seleccionar ${id}`,
      selected: (count) => `${count} pedidos seleccionados`,
    },
    bulk: {
      preparing: "Marcar preparando",
      shipped: "Marcar enviado",
      export: "Exportar CSV",
      reset: "Limpiar selección",
      success: (count, status) => `${count} pedidos marcados como ${status}.`,
      exportSuccess: (count) => `${count} pedidos exportados.`,
    },
    detail: {
      title: (id) => `Pedido ${id}`,
      description: "Detalle, líneas e historial del pedido.",
      close: "Cerrar detalle",
      customer: "Cliente",
      contact: "Contacto",
      shipping: "Entrega",
      warehouse: "Almacén",
      channel: "Canal",
      payment: "Pago",
      dueDate: "Fecha de entrega",
      lines: "Líneas",
      product: "Producto",
      quantity: "Cant.",
      unitPrice: "Precio",
      lineTotal: "Importe",
      timeline: "Historial",
      timelineEmpty: "Sin eventos registrados.",
      note: "Nota de entrega",
      actions: "Acciones",
      markPreparing: "Marcar preparando",
      markShipped: "Marcar enviado",
      print: "Imprimir",
      tracking: "Seguimiento",
      total: "Total",
      itemCount: (count) => `${count} artículos`,
    },
  },
  form: {
    eyebrow: "Ventas",
    title: "Nuevo pedido",
    description:
      "Registra un pedido manual. Los campos obligatorios se validan y los errores se vinculan al campo.",
    sections: {
      customer: "Cliente",
      delivery: "Entrega",
      notes: "Notas",
    },
    fields: {
      customer: "Cliente",
      contact: "Persona de contacto",
      email: "Correo electrónico",
      phone: "Teléfono",
      channel: "Canal",
      warehouse: "Almacén de salida",
      dueDate: "Fecha de entrega",
      note: "Notas de entrega",
      notify: "Avisar al cliente por correo",
    },
    placeholders: {
      customer: "Selecciona un cliente",
      contact: "Ej. Taro Yamada",
      email: "ej. taro@ejemplo.com",
      phone: "Ej. 03-5550-0101",
      dueDate: "",
      note: "Instrucciones de entrega, horario, referencias…",
    },
    errors: {
      summaryTitle: "Revisa el formulario",
      summary: (count) => `${count} campo(s) necesitan atención.`,
      customer: "Selecciona un cliente.",
      contact: "Escribe el nombre de contacto.",
      email: "Escribe un correo válido.",
      dueDate: "Selecciona una fecha de entrega.",
    },
    summary: {
      title: "Resumen",
      description: "Los pedidos nuevos entran como pendientes y se pueden editar después.",
      submit: "Registrar pedido",
      cancel: "Cancelar",
    },
    success: {
      title: "Pedido registrado",
      description: "El nuevo pedido aparece en la lista como pendiente.",
    },
  },
  notFound: {
    title: "Página no encontrada",
    description: "La ruta solicitada no existe en este backoffice.",
    back: "Volver al dashboard",
  },
  placeholder: {
    title: "Módulo fuera del POC",
    description:
      "Esta sección no forma parte del alcance de la fase 3. El demo se centra en dashboard, pedidos y detalle.",
  },
  toast: { close: "Cerrar notificación", region: "Notificaciones" },
};

const japanese: ErpCopy = {
  meta: {
    title: "KURA · 流通ERP",
    description:
      "KURAは卸売流通のバックオフィスです。ダッシュボード、受注、絞り込み、台帳、受注明細を掲載。",
  },
  skip: "本文へ移動",
  brand: { name: "KURA", jp: "倉", product: "ERP" },
  shell: {
    sidebarLabel: "メインナビゲーション",
    groups: { operations: "業務", master: "マスタ", admin: "管理" },
    nav: {
      dashboard: "ダッシュボード",
      orders: "受注",
      products: "商品",
      inventory: "在庫",
      customers: "取引先",
      reports: "レポート",
      settings: "設定",
    },
    topbar: {
      search: "検索",
      searchPlaceholder: "受注番号・顧客名・SKU",
      notifications: "通知",
      account: "アカウント",
      menu: "メニュー",
    },
    language: "言語",
    breadcrumbHome: "ホーム",
    breadcrumbLabel: "パンくずリスト",
    version: "KURA · v0.1",
  },
  common: {
    previous: "前へ",
    next: "次へ",
    selectAll: "すべて選択",
    selectRow: (id) => `${id}を選択`,
    selected: (count) => `${count}件選択`,
    empty: "該当なし",
    loading: "読み込み中…",
    total: "合計",
    date: "日付",
    status: "状態",
    actions: "操作",
    view: "表示",
    close: "閉じる",
    clear: "クリア",
    apply: "適用",
    cancel: "キャンセル",
    confirm: "確認",
    all: "すべて",
    search: "検索",
    export: "エクスポート",
  },
  status: {
    pending: "保留",
    preparing: "準備中",
    shipped: "出荷済み",
    cancelled: "取消",
    returned: "返品",
  },
  channel: { web: "EC", store: "店舗", phone: "電話" },
  warehouse: { tokyo: "東京", osaka: "大阪", fukuoka: "福岡" },
  payment: { invoice: "請求書", card: "カード", transfer: "振込" },
  dashboard: {
    eyebrow: "日次業務",
    title: "ダッシュボード",
    description: "受注・売上・在庫を一画面で確認します。台帳が中心で、色は状態を補助するだけです。",
    newOrder: "新規受注",
    kpi: {
      ordersToday: "本日の受注",
      openOrders: "未処理",
      revenue: "売上（7日）",
      lowStock: "在庫アラート",
    },
    meta: {
      vsYesterday: "前日比",
      openHint: "保留と準備中",
      revenueHint: "直近7日・取消を除く",
      lowStockHint: "最低在庫以下のSKU",
    },
    chart: {
      title: "受注件数の推移",
      meta: "直近14日",
      valueLabel: (value) => `${value}件`,
    },
    recent: {
      title: "最近の受注",
      meta: "直近8件",
      viewAll: "すべて見る",
      caption: "KURAの最近の受注",
    },
    tasks: { title: "タスクとお知らせ", meta: "対応が必要な項目" },
  },
  orders: {
    eyebrow: "販売",
    title: "受注一覧",
    description:
      "受注を検索・絞り込み・一括処理します。フィルタはURLに保持し、選択はaria-liveで通知します。",
    newOrder: "新規受注",
    filters: {
      label: "受注フィルタ",
      search: "受注を検索",
      searchPlaceholder: "受注番号・顧客名・SKU",
      status: "状態",
      allStatuses: "すべての状態",
      warehouse: "倉庫",
      allWarehouses: "すべての倉庫",
      range: "期間",
      ranges: { today: "今日", week: "7日間", month: "30日間", all: "すべて" },
      submit: "絞り込む",
      reset: "クリア",
      results: (count) => `${count}件の受注`,
    },
    table: {
      caption: "KURAの受注",
      id: "受注番号",
      customer: "顧客",
      channel: "チャネル",
      warehouse: "倉庫",
      date: "日付",
      items: "点数",
      total: "金額",
      status: "状態",
      actions: "操作",
      viewOrder: (id) => `${id}の詳細を開く`,
    },
    empty: "条件に一致する受注はありません。",
    selection: {
      selectAll: "このページの受注をすべて選択",
      selectRow: (id) => `${id}を選択`,
      selected: (count) => `${count}件の受注を選択`,
    },
    bulk: {
      preparing: "準備中にする",
      shipped: "出荷済みにする",
      export: "CSV出力",
      reset: "選択解除",
      success: (count, status) => `${count}件を${status}に変更しました。`,
      exportSuccess: (count) => `${count}件をエクスポートしました。`,
    },
    detail: {
      title: (id) => `受注 ${id}`,
      description: "受注明細・配送・履歴。",
      close: "詳細を閉じる",
      customer: "顧客情報",
      contact: "連絡先",
      shipping: "配送",
      warehouse: "倉庫",
      channel: "チャネル",
      payment: "支払い",
      dueDate: "納期",
      lines: "明細",
      product: "商品",
      quantity: "数量",
      unitPrice: "単価",
      lineTotal: "金額",
      timeline: "履歴",
      timelineEmpty: "履歴はありません。",
      note: "配送メモ",
      actions: "操作",
      markPreparing: "準備中にする",
      markShipped: "出荷済みにする",
      print: "印刷",
      tracking: "追跡番号",
      total: "合計",
      itemCount: (count) => `${count}点`,
    },
  },
  form: {
    eyebrow: "販売",
    title: "新規受注",
    description: "手動で受注を登録します。必須項目を検証し、エラーは各フィールドに紐づきます。",
    sections: { customer: "顧客情報", delivery: "配送情報", notes: "備考" },
    fields: {
      customer: "顧客",
      contact: "担当者",
      email: "メールアドレス",
      phone: "電話番号",
      channel: "チャネル",
      warehouse: "出荷倉庫",
      dueDate: "納期",
      note: "配送メモ",
      notify: "顧客にメールで通知する",
    },
    placeholders: {
      customer: "顧客を選択",
      contact: "例：山田 太郎",
      email: "例：taro@example.com",
      phone: "例：03-5550-0101",
      dueDate: "",
      note: "配送時間、搬入経路、参考情報など",
    },
    errors: {
      summaryTitle: "入力内容を確認してください",
      summary: (count) => `${count}件の項目に修正が必要です。`,
      customer: "顧客を選択してください。",
      contact: "担当者名を入力してください。",
      email: "有効なメールアドレスを入力してください。",
      dueDate: "納期を選択してください。",
    },
    summary: {
      title: "登録内容",
      description: "新規受注は保留として登録され、後から編集できます。",
      submit: "受注を登録",
      cancel: "キャンセル",
    },
    success: {
      title: "受注を登録しました",
      description: "新しい受注が一覧に保留として追加されました。",
    },
  },
  notFound: {
    title: "ページが見つかりません",
    description: "指定されたページはこのバックオフィスに存在しません。",
    back: "ダッシュボードへ戻る",
  },
  placeholder: {
    title: "POC対象外のモジュール",
    description:
      "このセクションはフェーズ3の対象外です。デモはダッシュボード、受注、明細に集中しています。",
  },
  toast: { close: "通知を閉じる", region: "通知" },
};

const english: ErpCopy = {
  meta: {
    title: "KURA · Distribution ERP",
    description:
      "KURA, a wholesale distribution back office: dashboard, orders, filters, dense table and order detail.",
  },
  skip: "Skip to content",
  brand: { name: "KURA", jp: "倉", product: "ERP" },
  shell: {
    sidebarLabel: "Main navigation",
    groups: { operations: "Operations", master: "Master data", admin: "Administration" },
    nav: {
      dashboard: "Dashboard",
      orders: "Orders",
      products: "Products",
      inventory: "Inventory",
      customers: "Customers",
      reports: "Reports",
      settings: "Settings",
    },
    topbar: {
      search: "Search",
      searchPlaceholder: "Order, customer or SKU",
      notifications: "Notifications",
      account: "Account",
      menu: "Menu",
    },
    language: "Language",
    breadcrumbHome: "Home",
    breadcrumbLabel: "Breadcrumb",
    version: "KURA · v0.1",
  },
  common: {
    previous: "Previous",
    next: "Next",
    selectAll: "Select all",
    selectRow: (id) => `Select ${id}`,
    selected: (count) => `${count} selected`,
    empty: "No results",
    loading: "Loading…",
    total: "Total",
    date: "Date",
    status: "Status",
    actions: "Actions",
    view: "View",
    close: "Close",
    clear: "Clear",
    apply: "Apply",
    cancel: "Cancel",
    confirm: "Confirm",
    all: "All",
    search: "Search",
    export: "Export",
  },
  status: {
    pending: "Pending",
    preparing: "Preparing",
    shipped: "Shipped",
    cancelled: "Cancelled",
    returned: "Returned",
  },
  channel: { web: "Web", store: "Store", phone: "Phone" },
  warehouse: { tokyo: "Tokyo", osaka: "Osaka", fukuoka: "Fukuoka" },
  payment: { invoice: "Invoice", card: "Card", transfer: "Transfer" },
  dashboard: {
    eyebrow: "Daily operations",
    title: "Dashboard",
    description:
      "Orders, revenue and stock in one view. The table is the centre; colour only reinforces status.",
    newOrder: "New order",
    kpi: {
      ordersToday: "Orders today",
      openOrders: "Open",
      revenue: "Revenue 7 days",
      lowStock: "Low stock",
    },
    meta: {
      vsYesterday: "vs. yesterday",
      openHint: "Pending and preparing",
      revenueHint: "Last 7 days, excluding cancelled",
      lowStockHint: "SKUs below minimum",
    },
    chart: {
      title: "Orders per day",
      meta: "Last 14 days",
      valueLabel: (value) => `${value} orders`,
    },
    recent: {
      title: "Recent orders",
      meta: "Last 8 movements",
      viewAll: "View all",
      caption: "Recent KURA orders",
    },
    tasks: { title: "Tasks and notices", meta: "Needs attention" },
  },
  orders: {
    eyebrow: "Sales",
    title: "Orders",
    description:
      "Search, filter and process orders. Filters live in the URL and selection is announced with aria-live.",
    newOrder: "New order",
    filters: {
      label: "Order filters",
      search: "Search orders",
      searchPlaceholder: "Number, customer or SKU",
      status: "Status",
      allStatuses: "All statuses",
      warehouse: "Warehouse",
      allWarehouses: "All warehouses",
      range: "Period",
      ranges: { today: "Today", week: "7 days", month: "30 days", all: "All" },
      submit: "Apply filters",
      reset: "Clear",
      results: (count) => `${count} orders`,
    },
    table: {
      caption: "KURA orders",
      id: "Order",
      customer: "Customer",
      channel: "Channel",
      warehouse: "Warehouse",
      date: "Date",
      items: "Items",
      total: "Total",
      status: "Status",
      actions: "Actions",
      viewOrder: (id) => `Open order ${id}`,
    },
    empty: "No orders match the selected filters.",
    selection: {
      selectAll: "Select all orders on this page",
      selectRow: (id) => `Select ${id}`,
      selected: (count) => `${count} orders selected`,
    },
    bulk: {
      preparing: "Mark preparing",
      shipped: "Mark shipped",
      export: "Export CSV",
      reset: "Clear selection",
      success: (count, status) => `${count} orders marked as ${status}.`,
      exportSuccess: (count) => `${count} orders exported.`,
    },
    detail: {
      title: (id) => `Order ${id}`,
      description: "Order detail, lines and history.",
      close: "Close detail",
      customer: "Customer",
      contact: "Contact",
      shipping: "Delivery",
      warehouse: "Warehouse",
      channel: "Channel",
      payment: "Payment",
      dueDate: "Delivery date",
      lines: "Lines",
      product: "Product",
      quantity: "Qty",
      unitPrice: "Price",
      lineTotal: "Amount",
      timeline: "History",
      timelineEmpty: "No events recorded.",
      note: "Delivery note",
      actions: "Actions",
      markPreparing: "Mark preparing",
      markShipped: "Mark shipped",
      print: "Print",
      tracking: "Tracking",
      total: "Total",
      itemCount: (count) => `${count} items`,
    },
  },
  form: {
    eyebrow: "Sales",
    title: "New order",
    description:
      "Register an order manually. Required fields are validated and errors are linked to each field.",
    sections: { customer: "Customer", delivery: "Delivery", notes: "Notes" },
    fields: {
      customer: "Customer",
      contact: "Contact person",
      email: "Email",
      phone: "Phone",
      channel: "Channel",
      warehouse: "Fulfilment warehouse",
      dueDate: "Delivery date",
      note: "Delivery notes",
      notify: "Notify the customer by email",
    },
    placeholders: {
      customer: "Select a customer",
      contact: "e.g. Taro Yamada",
      email: "e.g. taro@example.com",
      phone: "e.g. 03-5550-0101",
      dueDate: "",
      note: "Delivery instructions, time window, references…",
    },
    errors: {
      summaryTitle: "Check the form",
      summary: (count) => `${count} field(s) need attention.`,
      customer: "Select a customer.",
      contact: "Enter a contact name.",
      email: "Enter a valid email.",
      dueDate: "Select a delivery date.",
    },
    summary: {
      title: "Summary",
      description: "New orders enter as pending and can be edited later.",
      submit: "Register order",
      cancel: "Cancel",
    },
    success: {
      title: "Order registered",
      description: "The new order appears in the list as pending.",
    },
  },
  notFound: {
    title: "Page not found",
    description: "The requested route does not exist in this back office.",
    back: "Back to dashboard",
  },
  placeholder: {
    title: "Module outside the POC",
    description:
      "This section is not part of phase 3. The demo focuses on the dashboard, orders and detail.",
  },
  toast: { close: "Close notification", region: "Notifications" },
};

export const erpCopy: Record<KotenLocale, ErpCopy> = {
  es: spanish,
  ja: japanese,
  en: english,
};
