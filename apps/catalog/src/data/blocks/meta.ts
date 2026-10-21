import type { BlockCategoryId, L10n } from "../docs/types";

export type BlockMeta = {
  slug: string;
  id: string;
  category: BlockCategoryId;
  name: string;
  jp: string;
  /** Module basename inside data/blocks that exports the full doc. */
  file: string;
  description: L10n;
};

export const blockMeta: readonly BlockMeta[] = [
  {
    slug: "app-shell",
    id: "C-053",
    category: "erp",
    name: "AppShell",
    jp: "シェル",
    file: "erp",
    description: {
      es: "El marco del back office: sidebar de 232 px, topbar pegajosa y un main de ancho flexible. El skip link va primero y el contenido cambia de ruta sin remontar el marco.",
      ja: "バックオフィスの枠組みです。232 px のサイドバー、固定トップバー、可変幅の main を組みます。スキップリンクを先頭に置き、ルートが変わっても枠を再マウントしません。",
      en: "The back office frame: a 232 px sidebar, a sticky topbar and a flexible main. The skip link comes first and the content changes routes without remounting the frame.",
    },
  },
  {
    slug: "campaign-banner",
    id: "C-048",
    category: "storefront",
    name: "CampaignBanner",
    jp: "キャンペーン",
    file: "storefront",
    description: {
      es: "Aviso de campaña con antetítulo, título, descripción, fecha límite y llamada a la acción. Tres layouts y tres tonos semánticos.",
      ja: "アイブロウ、タイトル、説明、期限、CTA を備えたキャンペーン告知です。3つのレイアウトと3つの意味的トーンがあります。",
      en: "A campaign notice with eyebrow, title, description, deadline and call to action. Three layouts and three semantic tones.",
    },
  },
  {
    slug: "detail-drawer",
    id: "C-058",
    category: "erp",
    name: "DetailDrawer",
    jp: "詳細",
    file: "erp",
    description: {
      es: "Panel lateral para el detalle de una fila: estado, resumen, secciones y acciones fijas. Base UI atrapa el foco, cierra con Escape y lo devuelve al trigger.",
      ja: "行の詳細を表示するサイドパネルです。ステータス、概要、セクション、固定アクションを置きます。Base UI がフォーカスを閉じ込め、Escape で閉じ、トリガーに戻します。",
      en: "A side panel for row details: status, summary, sections and fixed actions. Base UI traps focus, closes on Escape and returns focus to the trigger.",
    },
  },
  {
    slug: "filter-bar",
    id: "C-057",
    category: "erp",
    name: "FilterBar",
    jp: "絞り込み",
    file: "erp",
    description: {
      es: "Formulario de filtros dentro de un landmark search: campos arriba y resultado con acciones (limpiar, aplicar) en la barra inferior. Los filtros deberían reflejarse en la URL.",
      ja: "search ランドマーク内の絞り込みフォームです。上にフィールド、下のバーに件数とアクション（クリア、適用）を置きます。条件は URL に反映させるのが基本です。",
      en: "A filter form inside a search landmark: fields on top and the result with actions (clear, apply) in the bottom bar. Filters should be reflected in the URL.",
    },
  },
  {
    slug: "footer",
    id: "C-050",
    category: "storefront",
    name: "Footer",
    jp: "フッター",
    file: "storefront",
    description: {
      es: "Pie de página en cuatro columnas sobre fondo inverso, con bloque de empresa, enlaces legales y una nota final.",
      ja: "反転背景の上に4カラムを並べ、会社情報、法務リンク、注記をまとめたフッターです。",
      en: "A four-column footer on the inverse surface, with a company block, legal links and a closing note.",
    },
  },
  {
    slug: "form-section",
    id: "C-060",
    category: "erp",
    name: "FormSection",
    jp: "フォーム節",
    file: "erp",
    description: {
      es: "Sección de formulario con fieldset, legend y grilla de una o dos columnas. Agrupa campos relacionados para que la lectura y la validación tengan un límite claro.",
      ja: "fieldset、legend、1〜2 列のグリッドを持つフォームセクションです。関連するフィールドをまとめ、読み取りと検証の範囲を明確にします。",
      en: "A form section with fieldset, legend and a one- or two-column grid. It groups related fields so reading and validation have a clear boundary.",
    },
  },
  {
    slug: "notice-list",
    id: "C-043",
    category: "storefront",
    name: "NoticeList",
    jp: "お知らせ",
    file: "storefront",
    description: {
      es: "Lista compacta de avisos con fecha, enlace opcional, etiqueta y un enlace final para ver todos. Incluye un estado vacío explícito.",
      ja: "日付、任意のリンク、タグ、そして「すべて見る」リンクを備えたコンパクトなお知らせ一覧です。空の状態も明示します。",
      en: "A compact announcement list with dates, optional links, tags and a closing link to view everything. It ships an explicit empty state.",
    },
  },
  {
    slug: "page-header",
    id: "C-056",
    category: "erp",
    name: "PageHeader",
    jp: "ページ見出し",
    file: "erp",
    description: {
      es: "Cabecera de la página: migas, ceja, título serif, descripción, metadatos y acciones. El título es el h1, así que va una vez por vista.",
      ja: "ページのヘッダーです。パンくず、アイブロウ、セリフ体のタイトル、説明、メタ情報、アクションを並べます。タイトルが h1 なので、1 画面に 1 つ置きます。",
      en: "The page header: breadcrumbs, eyebrow, serif title, description, meta and actions. The title is the h1, so use it once per view.",
    },
  },
  {
    slug: "price-block",
    id: "C-046",
    category: "storefront",
    name: "PriceBlock",
    jp: "価格",
    file: "storefront",
    description: {
      es: "Jerarquía de precio: importe actual, impuestos, precio anterior, puntos, stock y nota. Dos tamaños para ficha de producto y listados.",
      ja: "現在価格、税、通常価格、ポイント、在庫、注記をまとめた価格表示です。商品ページ用と一覧用の2サイズがあります。",
      en: "Price hierarchy: current amount, tax, previous price, points, stock and a note. Two sizes for product pages and listings.",
    },
  },
  {
    slug: "product-card",
    id: "C-045",
    category: "storefront",
    name: "ProductCard",
    jp: "商品カード",
    file: "storefront",
    description: {
      es: "Tarjeta de producto con imagen, título enlazado, valoración opcional, precio, puntos y badges. La valoración se formatea con el provider.",
      ja: "画像、リンク付きタイトル、任意の評価、価格、ポイント、バッジを持つ商品カードです。評価は provider の書式に従います。",
      en: "A product tile with image, linked title, optional rating, price, points and badges. The rating is formatted through the provider.",
    },
  },
  {
    slug: "product-gallery",
    id: "C-051",
    category: "storefront",
    name: "ProductGallery",
    jp: "ギャラリー",
    file: "storefront",
    description: {
      es: "Imagen principal con miniaturas en cuatro columnas. Puede llevar su propio índice o recibirlo controlado desde la página.",
      ja: "4列のサムネイルを伴うメイン画像です。内部でインデックスを持つことも、ページから制御することもできます。",
      en: "A main image with four-column thumbnails. It can own its index or receive it controlled from the page.",
    },
  },
  {
    slug: "ranked-list",
    id: "C-044",
    category: "storefront",
    name: "RankedList",
    jp: "ランキング",
    file: "storefront",
    description: {
      es: "Ranking ordenado con número, miniatura opcional, enlace, precio y categoría. Las tres primeras posiciones se destacan sin depender solo del color.",
      ja: "順位、任意のサムネイル、リンク、価格、カテゴリーを持つランキングです。上位3件は色だけに頼らず強調されます。",
      en: "An ordered ranking with position, optional thumbnail, link, price and category. The top three are highlighted without relying on colour alone.",
    },
  },
  {
    slug: "review-summary",
    id: "C-052",
    category: "storefront",
    name: "ReviewSummary",
    jp: "レビュー",
    file: "storefront",
    description: {
      es: "Resumen de reseñas con promedio, distribución por estrellas y lista de opiniones. Incluye estado vacío y etiqueta de compra verificada.",
      ja: "平均、星ごとの分布、レビュー一覧をまとめた要約です。空の状態と購入済みラベルも備えます。",
      en: "A review summary with average, star distribution and the review list. It includes an empty state and a verified-purchase label.",
    },
  },
  {
    slug: "search-bar",
    id: "C-042",
    category: "storefront",
    name: "SearchBar",
    jp: "検索",
    file: "storefront",
    description: {
      es: "Búsqueda de catálogo con selector de categoría, campo de búsqueda y botón de envío real. El valor y la categoría pueden ser controlados o quedar en manos del componente.",
      ja: "カテゴリー選択、検索入力、実際の送信ボタンを備えたカタログ検索です。値とカテゴリーは制御することも、コンポーネントに任せることもできます。",
      en: "Catalogue search with a category select, a search field and a real submit button. Value and category can be controlled or left to the component.",
    },
  },
  {
    slug: "side-nav",
    id: "C-054",
    category: "erp",
    name: "SideNav",
    jp: "サイドバー",
    file: "erp",
    description: {
      es: "Navegación lateral agrupada con estado activo, conteos y un pie opcional. El clic simple se intercepta para navegar sin recargar; los clics con modificador siguen abriendo pestañas.",
      ja: "グループ化したサイドナビゲーションです。アクティブ状態、件数、任意のフッターを持ちます。通常のクリックは再読み込みなしの遷移に使い、修飾キー付きのクリックは新しいタブを開きます。",
      en: "Grouped side navigation with an active state, counts and an optional footer. A plain click is intercepted to navigate without a reload; modified clicks still open new tabs.",
    },
  },
  {
    slug: "spec-table",
    id: "C-047",
    category: "storefront",
    name: "SpecTable",
    jp: "仕様表",
    file: "storefront",
    description: {
      es: "Tablas de especificaciones agrupadas por sección, con encabezados de fila y desplazamiento horizontal accesible por teclado.",
      ja: "セクションごとにまとめた仕様表です。行見出しを持ち、キーボードで操作できる横スクロール領域を備えます。",
      en: "Specification tables grouped by section, with row headers and a keyboard-accessible horizontal scroll region.",
    },
  },
  {
    slug: "status-badge",
    id: "C-059",
    category: "erp",
    name: "StatusBadge",
    jp: "状態",
    file: "erp",
    description: {
      es: "Traduce un estado de pedido a un tono del Badge con un punto decorativo. El texto lo pone quien lo usa: el color nunca es la única señal.",
      ja: "受注ステータスをバッジのトーンと装飾のドットに変換します。テキストは利用側が渡し、色だけに頼りません。",
      en: "Maps an order status to a Badge tone with a decorative dot. The caller supplies the text: colour is never the only signal.",
    },
  },
  {
    slug: "store-header",
    id: "C-049",
    category: "storefront",
    name: "StoreHeader",
    jp: "店舗ヘッダー",
    file: "storefront",
    description: {
      es: "Cabecera en dos niveles: franja de utilidad, marca con Hanko, búsqueda como slot, acciones y navegación con estado activo.",
      ja: "ユーティリティ帯、Hanko 付きブランド、スロットとしての検索、アクション、現在地を示すナビを備えた2段ヘッダーです。",
      en: "A two-tier header: utility strip, brand with Hanko, search as a slot, actions and navigation with an active state.",
    },
  },
  {
    slug: "timeline",
    id: "C-061",
    category: "erp",
    name: "Timeline",
    jp: "履歴",
    file: "erp",
    description: {
      es: "Lista ordenada de eventos con fecha, tono y descripción opcional. Sirve para historiales de pedido, auditoría o actividad reciente, y muestra un texto propio cuando está vacía.",
      ja: "日付、トーン、任意の説明を持つイベントの順序付きリストです。受注履歴、監査、最近の動きに使い、空のときは専用のテキストを表示します。",
      en: "An ordered list of events with date, tone and an optional description. It fits order histories, audits or recent activity, and shows its own text when empty.",
    },
  },
  {
    slug: "top-bar",
    id: "C-055",
    category: "erp",
    name: "TopBar",
    jp: "トップバー",
    file: "erp",
    description: {
      es: "Cabecera pegajosa de la ruta: contexto a la izquierda, búsqueda al centro y acciones al final. En pantallas estrechas la búsqueda baja a su propia fila.",
      ja: "ルートの固定ヘッダーです。左にコンテキスト、中央に検索、右にアクションを置きます。狭い画面では検索が独立した行に下がります。",
      en: "The route's sticky header: context on the left, search in the middle and actions at the end. On narrow screens the search drops to its own row.",
    },
  },
];
