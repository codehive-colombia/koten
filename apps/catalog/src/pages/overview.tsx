import {
  Badge,
  buttonVariants,
  cn,
  Hanko,
  type KotenLocale,
  Meter,
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTitle,
  Pattern,
  PriceBlock,
  SectionHeader,
  StatusBadge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tategaki,
  useKoten,
  useKotenFormatters,
} from "@koten/ui";
import { Link } from "react-router";
import sampleCamera from "../assets/sample-camera.svg";
import { Code } from "../components/docs";
import { DemoCard, EntryCard, RegisterCard, SwatchRow, SystemPlate } from "../components/landing";
import { PackageManagerTabs } from "../components/view-toggles";
import { shellLabels } from "../data/catalog";
import { componentInventory, patternInventory } from "../data/inventory";
import { usePackageManager } from "../lib/package-manager";
import { registryCommand, site } from "../lib/site";

type PieceKind = "foundations" | "components" | "patterns" | "format";

const copy = {
  es: {
    eyebrow: "Catálogo del sistema · 古典",
    edition: "Edición 2026 · ES/JA/EN",
    title: "Koten UI",
    jp: "古典",
    statement: "Sencillez de medios, densidad de información.",
    lead: "Un sistema de componentes React para comercio, backoffice y documentación. La fuente se copia, los tokens se heredan y la interfaz se compone con la misma gramática.",
    cta: { browse: "Explorar componentes", start: "Empezar" },
    quickLabel: "Índice rápido",
    quick: [
      { index: "01", label: "Fundamentos", to: "/tokens" },
      { index: "02", label: "Componentes", to: "/components" },
      { index: "03", label: "Bloques", to: "/blocks" },
      { index: "04", label: "Empezar", to: "/start" },
    ],
    stats: [
      { value: "46", label: "componentes" },
      { value: "20", label: "bloques" },
      { value: "4", label: "temas" },
      { value: "3", label: "densidades" },
    ],
    live: {
      label: "Piezas reales",
      badge: "En vivo",
      caption:
        "El panel, la tabla, el precio y el estado son los mismos componentes que documenta el catálogo.",
      orderTitle: "Pedido · KURA-1042",
      status: "Preparando",
      customer: "Cliente",
      customerName: "Mina Sato",
      item: "Artículo",
      amount: "Importe",
      itemOne: "HIKARI K-1",
      itemOneMeta: "Cuerpo plata · 24,2 MP",
      itemTwo: "Objetivo 35 mm f/2.8",
      itemTwoMeta: "Fijo · montura K",
      shipping: "Envío",
      shippingValue: "Tokio · 23 oct",
      total: "Total",
      patternLink: "Ver el bloque de ERP",
      productLabel: "Producto",
      tax: "IVA incluido",
      points: "+583 puntos",
      stock: "En stock",
      productNote: "Envío en 24 h.",
      statLabel: "Ingresos 7 días",
      statDelta: "+8 %",
      statMeta: "vs. semana anterior",
    },
    registers: {
      title: "Tres registros, una gramática",
      jp: "三面",
      meta: "Misma estructura; cambian los valores semánticos",
      note: "Chirashi para vender, Daichō para operar, Kanso para leer. Cada muestra conserva su tema para compararlas; el resto de la página sigue el selector del encabezado.",
      action: "Ver el tema",
      chirashi: {
        title: "Chirashi",
        jp: "チラシ",
        description: "Comercio y campañas: color saturado en superficies acotadas.",
        product: "HIKARI K-1",
        meta: "Kit 35 mm · plata",
        sale: "−12 %",
        tax: "IVA incluido",
        points: "+583 puntos",
        stock: "En stock",
        note: "Envío gratis hasta el 31 de octubre.",
      },
      daicho: {
        title: "Daichō",
        jp: "台帳",
        description: "Backoffice y tablas: densidad, números y estado.",
        caption: "Pedidos recientes",
        columns: ["Pedido", "Estado", "Total"],
        rows: [
          { code: "KURA-1042", state: "preparing" as const, status: "Preparando", amount: 160400 },
          { code: "KURA-1041", state: "shipped" as const, status: "Enviado", amount: 58300 },
          { code: "KURA-1040", state: "pending" as const, status: "Pendiente", amount: 32400 },
        ],
      },
      kanso: {
        title: "Kanso",
        jp: "簡素",
        description: "Lectura y documentación: reglas, serif y aire.",
        quote: "El marco es la unidad.",
        body: "Panel, cabecera, regla y borde construyen la jerarquía sin adornos.",
        badge: "Documentación",
        note: "46 componentes · 20 bloques",
      },
    },
    pieces: {
      title: "El sistema en piezas",
      jp: "部品",
      meta: "Cuatro puertas de entrada, un mismo contrato",
      cards: [
        {
          to: "/tokens",
          index: "01",
          title: "Fundamentos",
          jp: "基礎",
          description: "Color, tipografía, espacio, forma, densidad y temas en variables CSS.",
          action: "Abrir fundamentos",
          kind: "foundations" as const,
        },
        {
          to: "/components",
          index: "02",
          title: "Componentes",
          jp: "部品",
          description: "46 componentes con preview, props, código y notas de accesibilidad.",
          action: "Abrir componentes",
          kind: "components" as const,
        },
        {
          to: "/blocks",
          index: "03",
          title: "Bloques",
          jp: "応用",
          description: "20 composiciones para storefront, ERP y documentación.",
          action: "Abrir bloques",
          kind: "patterns" as const,
        },
        {
          to: "/tokens/format",
          index: "04",
          title: "Lenguaje y formato",
          jp: "言語",
          description: "ES/JA/EN con Intl: fechas, moneda, números y labels.",
          action: "Abrir formato",
          kind: "format" as const,
        },
      ],
      indexTitle: "Índice de piezas",
      indexMeta: "Todo lo que hay dentro, sin buscar en el menú",
      primitives: "Componentes",
      patterns: "Bloques",
      open: "Abrir el inventario",
      formatSample: { currency: "Moneda", date: "Fecha" },
    },
    principles: {
      title: "Principios",
      jp: "原則",
      meta: "Lo que no se negocia",
      badge: "ES · JA · EN",
      panelTitle: "Cinco reglas",
      items: [
        "El marco es la unidad: panel, cabecera, regla, borde.",
        "El color señala; no decora.",
        "Tipografía del sistema y texto real, nunca texto en imágenes.",
        "Densidad con ritmo: 4/8/12/16, no todo es una tarjeta.",
        "Accesible por defecto: 12 px mínimo, AA, foco visible, teclado completo.",
      ],
      qualityTitle: "Calidad incorporada",
      qualityBody:
        "La accesibilidad y el rendimiento no son una capa final: forman parte del contrato de cada componente.",
      quality: [
        { value: "AA", label: "WCAG 2.2" },
        { value: "12 px", label: "piso tipográfico" },
        { value: "0 KB", label: "fuentes CJK" },
        { value: "100 %", label: "navegable con teclado" },
      ],
      qualityCta: "Ver cómo empezar",
    },
    demos: {
      title: "En contexto",
      jp: "実例",
      meta: "Dos pantallas reales, los mismos tokens",
      live: "Demo local",
      open: "Abrir demo",
      pattern: "Ver patrón",
      reviewsLabel: "reseñas",
      storefront: {
        eyebrow: "Storefront · 光",
        title: "HIKARI K-1",
        description:
          "Una página de producto densa: galería, precio, stock, avisos, ranking, specs y reseñas.",
        tags: ["Chirashi", "Storefront"],
        imageAlt: "Cámara HIKARI K-1 de frente",
        stockLabel: "Stock",
        note: "Precio, impuestos y puntos arriba; la confianza también es información.",
      },
      erp: {
        eyebrow: "ERP · 蔵",
        title: "KURA",
        description:
          "Un backoffice de pedidos: dashboard, tabla, filtros, drawer y formularios con validación.",
        tags: ["Daichō", "ERP"],
        ordersLabel: "Pedidos recientes",
        ordersMeta: "3 de 132",
      },
    },
    closing: {
      eyebrow: "Empezar · 導入",
      title: "Del catálogo a tu proyecto.",
      jp: "導入",
      lead: "La fuente se copia con el registry, hereda los tokens y se adapta. Sin dependencias ocultas ni fuentes de megabytes.",
      panelTitle: "Instalación por URL",
      panelMeta: "shadcn · registry",
      note: "El catálogo genera 65 items autocontenidos: componentes, bloques, núcleo y estilos.",
      start: "Empezar",
      components: "Ver componentes",
      foundations: "Leer fundamentos",
    },
  },
  ja: {
    eyebrow: "システムカタログ · 古典",
    edition: "2026年版 · ES/JA/EN",
    title: "Koten UI",
    jp: "古典",
    statement: "手段の簡素さ、情報の密度。",
    lead: "商取引、バックオフィス、ドキュメントのためのReactコンポーネントシステム。ソースはコピーし、トークンは継承し、枠と戦わずに画面を組み立てる。",
    cta: { browse: "部品を見る", start: "はじめる" },
    quickLabel: "クイック索引",
    quick: [
      { index: "01", label: "基礎", to: "/tokens" },
      { index: "02", label: "部品", to: "/components" },
      { index: "03", label: "応用", to: "/blocks" },
      { index: "04", label: "はじめかた", to: "/start" },
    ],
    stats: [
      { value: "46", label: "コンポーネント" },
      { value: "20", label: "ブロック" },
      { value: "4", label: "テーマ" },
      { value: "3", label: "密度" },
    ],
    live: {
      label: "実物の部品",
      badge: "ライブ",
      caption: "パネル、表、価格、ステータスは、カタログで解説しているコンポーネントそのもの。",
      orderTitle: "注文 · KURA-1042",
      status: "準備中",
      customer: "顧客",
      customerName: "佐藤 美奈",
      item: "品目",
      amount: "金額",
      itemOne: "HIKARI K-1",
      itemOneMeta: "シルバー · 24.2MP",
      itemTwo: "35mm f/2.8 レンズ",
      itemTwoMeta: "単焦点 · Kマウント",
      shipping: "配送",
      shippingValue: "東京 · 10月23日",
      total: "合計",
      patternLink: "ERPブロックを見る",
      productLabel: "商品",
      tax: "税込",
      points: "+583ポイント",
      stock: "在庫あり",
      productNote: "24時間以内に発送。",
      statLabel: "7日間の売上",
      statDelta: "+8 %",
      statMeta: "前週比",
    },
    registers: {
      title: "三つの様式、一つの文法",
      jp: "三面",
      meta: "構造は同じで、意味的な値だけが変わる",
      note: "Chirashiは売るため、Daichōは運用するため、Kansoは読むため。各サンプルは比較できるよう独自のテーマを保ち、ページの残りはヘッダーの選択に従う。",
      action: "テーマを見る",
      chirashi: {
        title: "Chirashi",
        jp: "チラシ",
        description: "商取引とキャンペーン：限られた面に鮮やかな色。",
        product: "HIKARI K-1",
        meta: "35mmキット · シルバー",
        sale: "−12 %",
        tax: "税込",
        points: "+583ポイント",
        stock: "在庫あり",
        note: "10月31日まで送料無料。",
      },
      daicho: {
        title: "Daichō",
        jp: "台帳",
        description: "バックオフィスと表：密度、数値、状態。",
        caption: "最近の注文",
        columns: ["注文", "状態", "合計"],
        rows: [
          { code: "KURA-1042", state: "preparing" as const, status: "準備中", amount: 160400 },
          { code: "KURA-1041", state: "shipped" as const, status: "発送済み", amount: 58300 },
          { code: "KURA-1040", state: "pending" as const, status: "保留", amount: 32400 },
        ],
      },
      kanso: {
        title: "Kanso",
        jp: "簡素",
        description: "読書とドキュメント：罫線、セリフ、余白。",
        quote: "枠が単位。",
        body: "パネル、見出し、罫線、境界が装飾なしで階層をつくる。",
        badge: "ドキュメント",
        note: "46コンポーネント · 20ブロック",
      },
    },
    pieces: {
      title: "部品としてのシステム",
      jp: "部品",
      meta: "四つの入口、ひとつの契約",
      cards: [
        {
          to: "/tokens",
          index: "01",
          title: "基礎",
          jp: "基礎",
          description: "色、タイポグラフィ、余白、形、密度、テーマをCSS変数で。",
          action: "基礎を開く",
          kind: "foundations" as const,
        },
        {
          to: "/components",
          index: "02",
          title: "部品",
          jp: "部品",
          description: "46のコンポーネント。プレビュー、props、コード、アクセシビリティ注記。",
          action: "部品を開く",
          kind: "components" as const,
        },
        {
          to: "/blocks",
          index: "03",
          title: "ブロック",
          jp: "応用",
          description: "ストアフロント、ERP、ドキュメントのための20の構成。",
          action: "ブロックを開く",
          kind: "patterns" as const,
        },
        {
          to: "/tokens/format",
          index: "04",
          title: "言語と書式",
          jp: "言語",
          description: "ES/JA/ENとIntl：日付、通貨、数値、ラベル。",
          action: "書式を開く",
          kind: "format" as const,
        },
      ],
      indexTitle: "部品索引",
      indexMeta: "メニューを探さずに全体を見る",
      primitives: "コンポーネント",
      patterns: "ブロック",
      open: "一覧を開く",
      formatSample: { currency: "通貨", date: "日付" },
    },
    principles: {
      title: "原則",
      jp: "原則",
      meta: "譲れないこと",
      badge: "ES · JA · EN",
      panelTitle: "五つの規則",
      items: [
        "枠が単位：パネル、見出し、罫線、境界。",
        "色は意味を示し、装飾しない。",
        "システムフォントと実テキスト。画像内テキストは使わない。",
        "リズムのある密度：4/8/12/16、すべてをカードにしない。",
        "既定でアクセシブル：最小12px、AA、可視フォーカス、完全なキーボード操作。",
      ],
      qualityTitle: "組み込みの品質",
      qualityBody:
        "アクセシビリティと性能は最後に足す層ではない。すべてのコンポーネントの契約に含まれる。",
      quality: [
        { value: "AA", label: "WCAG 2.2" },
        { value: "12 px", label: "文字サイズの下限" },
        { value: "0 KB", label: "CJKフォント" },
        { value: "100 %", label: "キーボード操作" },
      ],
      qualityCta: "はじめかたを見る",
    },
    demos: {
      title: "実例で見る",
      jp: "実例",
      meta: "二つの画面、同じトークン",
      live: "ローカルデモ",
      open: "デモを開く",
      pattern: "ブロックを見る",
      reviewsLabel: "件のレビュー",
      storefront: {
        eyebrow: "ストアフロント · 光",
        title: "HIKARI K-1",
        description:
          "ギャラリー、価格、在庫、お知らせ、ランキング、仕様、レビューを備えた密度の高い商品ページ。",
        tags: ["Chirashi", "ストアフロント"],
        imageAlt: "HIKARI K-1 の正面",
        stockLabel: "在庫",
        note: "価格、税、ポイントを上部に。信頼も情報の一部。",
      },
      erp: {
        eyebrow: "ERP · 蔵",
        title: "KURA",
        description:
          "ダッシュボード、表、絞り込み、ドロワー、検証付きフォームを備えた受注バックオフィス。",
        tags: ["Daichō", "ERP"],
        ordersLabel: "最近の注文",
        ordersMeta: "132件中3件",
      },
    },
    closing: {
      eyebrow: "はじめる · 導入",
      title: "カタログからプロジェクトへ。",
      jp: "導入",
      lead: "ソースはレジストリでコピーし、トークンを継承して適応する。隠れた依存も、メガバイトのフォントもない。",
      panelTitle: "URLからインストール",
      panelMeta: "shadcn · registry",
      note: "カタログは65の自己完結アイテムを生成する：コンポーネント、ブロック、コア、スタイル。",
      start: "はじめる",
      components: "部品を見る",
      foundations: "基礎を読む",
    },
  },
  en: {
    eyebrow: "System catalog · 古典",
    edition: "2026 edition · ES/JA/EN",
    title: "Koten UI",
    jp: "古典",
    statement: "Simplicity of means, density of information.",
    lead: "A React component system for commerce, back office and documentation. Copy the source, inherit the tokens and compose the interface without fighting the frame.",
    cta: { browse: "Browse components", start: "Get started" },
    quickLabel: "Quick index",
    quick: [
      { index: "01", label: "Foundations", to: "/tokens" },
      { index: "02", label: "Components", to: "/components" },
      { index: "03", label: "Blocks", to: "/blocks" },
      { index: "04", label: "Get started", to: "/start" },
    ],
    stats: [
      { value: "46", label: "components" },
      { value: "20", label: "blocks" },
      { value: "4", label: "themes" },
      { value: "3", label: "densities" },
    ],
    live: {
      label: "Real pieces",
      badge: "Live",
      caption:
        "The panel, the table, the price and the status are the same components the catalog documents.",
      orderTitle: "Order · KURA-1042",
      status: "Preparing",
      customer: "Customer",
      customerName: "Mina Sato",
      item: "Item",
      amount: "Amount",
      itemOne: "HIKARI K-1",
      itemOneMeta: "Silver body · 24.2 MP",
      itemTwo: "35 mm f/2.8 lens",
      itemTwoMeta: "Prime · K mount",
      shipping: "Shipping",
      shippingValue: "Tokyo · Oct 23",
      total: "Total",
      patternLink: "See the ERP block",
      productLabel: "Product",
      tax: "Tax included",
      points: "+583 points",
      stock: "In stock",
      productNote: "Ships within 24 h.",
      statLabel: "Revenue, 7 days",
      statDelta: "+8 %",
      statMeta: "vs. previous week",
    },
    registers: {
      title: "Three registers, one grammar",
      jp: "三面",
      meta: "Same structure; the semantic values change",
      note: "Chirashi to sell, Daichō to operate, Kanso to read. Each card keeps its own theme for comparison; the rest of the page follows the header selector.",
      action: "See the theme",
      chirashi: {
        title: "Chirashi",
        jp: "チラシ",
        description: "Commerce and campaigns: saturated color on bounded surfaces.",
        product: "HIKARI K-1",
        meta: "35 mm kit · silver",
        sale: "−12 %",
        tax: "Tax included",
        points: "+583 points",
        stock: "In stock",
        note: "Free shipping until October 31.",
      },
      daicho: {
        title: "Daichō",
        jp: "台帳",
        description: "Back office and tables: density, numbers and status.",
        caption: "Recent orders",
        columns: ["Order", "Status", "Total"],
        rows: [
          { code: "KURA-1042", state: "preparing" as const, status: "Preparing", amount: 160400 },
          { code: "KURA-1041", state: "shipped" as const, status: "Shipped", amount: 58300 },
          { code: "KURA-1040", state: "pending" as const, status: "Pending", amount: 32400 },
        ],
      },
      kanso: {
        title: "Kanso",
        jp: "簡素",
        description: "Reading and documentation: rules, serif and air.",
        quote: "The frame is the unit.",
        body: "Panel, header, rule and border build the hierarchy without ornament.",
        badge: "Documentation",
        note: "46 components · 20 blocks",
      },
    },
    pieces: {
      title: "The system in pieces",
      jp: "部品",
      meta: "Four entry points, one contract",
      cards: [
        {
          to: "/tokens",
          index: "01",
          title: "Foundations",
          jp: "基礎",
          description: "Color, typography, space, shape, density and themes as CSS variables.",
          action: "Open foundations",
          kind: "foundations" as const,
        },
        {
          to: "/components",
          index: "02",
          title: "Components",
          jp: "部品",
          description: "46 components with preview, props, code and accessibility notes.",
          action: "Open components",
          kind: "components" as const,
        },
        {
          to: "/blocks",
          index: "03",
          title: "Blocks",
          jp: "応用",
          description: "20 compositions for storefront, ERP and documentation.",
          action: "Open blocks",
          kind: "patterns" as const,
        },
        {
          to: "/tokens/format",
          index: "04",
          title: "Language & format",
          jp: "言語",
          description: "ES/JA/EN with Intl: dates, currency, numbers and labels.",
          action: "Open format",
          kind: "format" as const,
        },
      ],
      indexTitle: "Piece index",
      indexMeta: "Everything inside, without digging through the menu",
      primitives: "Components",
      patterns: "Blocks",
      open: "Open the inventory",
      formatSample: { currency: "Currency", date: "Date" },
    },
    principles: {
      title: "Principles",
      jp: "原則",
      meta: "What is not negotiable",
      badge: "ES · JA · EN",
      panelTitle: "Five rules",
      items: [
        "The frame is the unit: panel, header, rule, border.",
        "Color signals; it does not decorate.",
        "System typography and real text, never text in images.",
        "Density with rhythm: 4/8/12/16, not everything is a card.",
        "Accessible by default: 12 px minimum, AA, visible focus, full keyboard.",
      ],
      qualityTitle: "Built-in quality",
      qualityBody:
        "Accessibility and performance are not a final layer: they are part of every component's contract.",
      quality: [
        { value: "AA", label: "WCAG 2.2" },
        { value: "12 px", label: "type floor" },
        { value: "0 KB", label: "CJK fonts" },
        { value: "100 %", label: "keyboard navigable" },
      ],
      qualityCta: "See how to start",
    },
    demos: {
      title: "In context",
      jp: "実例",
      meta: "Two real screens, the same tokens",
      live: "Local demo",
      open: "Open demo",
      pattern: "See pattern",
      reviewsLabel: "reviews",
      storefront: {
        eyebrow: "Storefront · 光",
        title: "HIKARI K-1",
        description:
          "A dense product page: gallery, price, stock, notices, ranking, specs and reviews.",
        tags: ["Chirashi", "Storefront"],
        imageAlt: "HIKARI K-1 camera, front view",
        stockLabel: "Stock",
        note: "Price, tax and points above the fold; trust is information too.",
      },
      erp: {
        eyebrow: "ERP · 蔵",
        title: "KURA",
        description: "An order back office: dashboard, table, filters, drawer and validated forms.",
        tags: ["Daichō", "ERP"],
        ordersLabel: "Recent orders",
        ordersMeta: "3 of 132",
      },
    },
    closing: {
      eyebrow: "Get started · 導入",
      title: "From the catalog to your project.",
      jp: "導入",
      lead: "Copy the source with the registry, inherit the tokens and adapt it. No hidden dependencies, no megabyte fonts.",
      panelTitle: "Install by URL",
      panelMeta: "shadcn · registry",
      note: "The catalog generates 65 self-contained items: components, blocks, core and styles.",
      start: "Get started",
      components: "Browse components",
      foundations: "Read foundations",
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const primitiveNames = componentInventory.map((item) => item.name);
const patternNames = patternInventory.map((item) => item.name);

function PieceSample({ kind, t }: { kind: PieceKind; t: Copy }) {
  const formatters = useKotenFormatters();

  if (kind === "foundations") {
    return <SwatchRow labels={["primary", "sale", "success", "warning"]} />;
  }

  if (kind === "components") {
    return (
      <div className="flex flex-wrap gap-1">
        <Badge tone="neutral">soft</Badge>
        <Badge tone="info" appearance="solid">
          solid
        </Badge>
        <Badge tone="success" appearance="outline">
          outline
        </Badge>
      </div>
    );
  }

  if (kind === "patterns") {
    return (
      <div className="flex flex-wrap items-center gap-1">
        {t.registers.daicho.rows.slice(0, 2).map((row) => (
          <StatusBadge key={row.code} status={row.state} label={row.status} />
        ))}
        <Badge tone="sale">{t.registers.chirashi.sale}</Badge>
      </div>
    );
  }

  return (
    <dl className="grid w-full grid-cols-[auto_1fr] gap-x-3 text-2xs">
      <dt className="text-faint">{t.pieces.formatSample.currency}</dt>
      <dd className="text-end tabular-nums">{formatters.formatCurrency(128000)}</dd>
      <dt className="text-faint">{t.pieces.formatSample.date}</dt>
      <dd className="text-end tabular-nums">
        {formatters.formatDate(Date.UTC(2026, 9, 21, 12), { timeZone: "UTC" })}
      </dd>
    </dl>
  );
}

export function OverviewPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const formatters = useKotenFormatters();
  const { packageManager, setPackageManager } = usePackageManager();
  const installCommand = registryCommand("button", packageManager);

  return (
    <div className="pb-[calc(var(--koten-gap)*2)]">
      <section
        aria-labelledby="landing-title"
        className="relative isolate overflow-hidden border-b-[3px] border-double border-rule-strong"
      >
        <Pattern variant="seigaiha" className="absolute inset-y-0 end-0 hidden w-[46%] lg:block" />
        <div className="relative grid items-center lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div className="py-[calc(var(--koten-gap)*2)] lg:py-[calc(var(--koten-gap)*3)] lg:pe-[calc(var(--koten-gap)*2)]">
            <div className="flex items-start gap-4">
              <Hanko size="lg" label="Koten UI">
                典
              </Hanko>
              <div className="min-w-0">
                <p className="text-2xs font-semibold text-faint">{t.eyebrow}</p>
                <div className="mt-1 flex items-start gap-3">
                  <h1 id="landing-title" className="font-serif text-4xl font-semibold leading-none">
                    {t.title}
                  </h1>
                  <Tategaki className="mt-0.5">{t.jp}</Tategaki>
                </div>
                <p className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-ink">
                  {t.statement}
                </p>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t.lead}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link to="/components" className={buttonVariants({ variant: "primary" })}>
                {t.cta.browse} <span aria-hidden="true">→</span>
              </Link>
              <Link to="/start" className={buttonVariants({ variant: "secondary" })}>
                {t.cta.start}
              </Link>
              <span className="ms-1 text-2xs text-faint">{t.edition}</span>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-px border-y border-rule bg-rule sm:grid-cols-4">
              {t.stats.map((stat) => (
                <div key={stat.label} className="bg-paper px-3 py-2">
                  <dt className="text-2xs text-faint">{stat.label}</dt>
                  <dd className="font-serif text-xl font-semibold tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-rule bg-tint p-[var(--koten-panel-p)] lg:border-s lg:border-t-0 lg:p-[calc(var(--koten-gap)*1.5)]">
            <SystemPlate copy={t.live} />
          </div>
        </div>
      </section>

      <nav aria-label={t.quickLabel} className="border-b border-rule">
        <ul className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-4">
          {t.quick.map((item) => (
            <li key={item.to} className="bg-paper">
              <Link
                to={item.to}
                className="group flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 px-3 py-2 text-xs no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1"
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-2xs text-faint">{item.index}</span>
                  <span className="font-semibold text-ink">{item.label}</span>
                </span>
                <span aria-hidden="true" className="text-primary">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mt-[calc(var(--koten-gap)*3)]">
        <SectionHeader
          title={t.registers.title}
          jp={t.registers.jp}
          meta={t.registers.meta}
          actions={<Badge tone="info">data-theme</Badge>}
        />
        <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] lg:grid-cols-3">
          <RegisterCard
            theme="chirashi"
            label={t.registers.chirashi.title}
            jp={t.registers.chirashi.jp}
            description={t.registers.chirashi.description}
            action={t.registers.action}
            to="/tokens/themes"
          >
            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-lg font-semibold leading-tight">
                {t.registers.chirashi.product}
              </h4>
              <p className="text-2xs text-muted">{t.registers.chirashi.meta}</p>
              <PriceBlock
                className="mt-1"
                size="md"
                price={formatters.formatCurrency(128000)}
                saleLabel={t.registers.chirashi.sale}
                taxLabel={t.registers.chirashi.tax}
                points={t.registers.chirashi.points}
                stock={{ label: t.registers.chirashi.stock, tone: "success" }}
                note={t.registers.chirashi.note}
              />
            </div>
          </RegisterCard>

          <RegisterCard
            theme="daicho"
            label={t.registers.daicho.title}
            jp={t.registers.daicho.jp}
            description={t.registers.daicho.description}
            action={t.registers.action}
            to="/tokens/themes"
          >
            <Table className="min-w-0" containerClassName="border-0">
              <TableCaption>{t.registers.daicho.caption}</TableCaption>
              <TableHeader>
                <TableRow>
                  {t.registers.daicho.columns.map((column, index) => (
                    <TableHead key={column} className={index === 2 ? "text-end" : undefined}>
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {t.registers.daicho.rows.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell className="font-mono text-2xs text-faint">{row.code}</TableCell>
                    <TableCell>
                      <StatusBadge status={row.state} label={row.status} />
                    </TableCell>
                    <TableCell className="text-end tabular-nums">
                      {formatters.formatCurrency(row.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </RegisterCard>

          <RegisterCard
            theme="kanso"
            label={t.registers.kanso.title}
            jp={t.registers.kanso.jp}
            description={t.registers.kanso.description}
            action={t.registers.action}
            to="/tokens/themes"
          >
            <div className="flex flex-col gap-2">
              <blockquote className="border-s-2 border-primary ps-3">
                <p className="font-serif text-lg font-semibold leading-tight">
                  {t.registers.kanso.quote}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{t.registers.kanso.body}</p>
              </blockquote>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-2">
                <Badge tone="info">{t.registers.kanso.badge}</Badge>
                <span className="text-2xs text-faint">{t.registers.kanso.note}</span>
              </div>
            </div>
          </RegisterCard>
        </div>
        <p className="mt-2 text-2xs leading-relaxed text-faint">{t.registers.note}</p>
      </section>

      <section className="mt-[calc(var(--koten-gap)*3)]">
        <SectionHeader
          title={t.pieces.title}
          jp={t.pieces.jp}
          meta={t.pieces.meta}
          actions={
            <Badge tone="neutral">
              {formatters.formatNumber(46)} · {formatters.formatNumber(20)}
            </Badge>
          }
        />
        <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4">
          {t.pieces.cards.map((card) => (
            <EntryCard
              key={card.to}
              to={card.to}
              index={card.index}
              title={card.title}
              jp={card.jp}
              description={card.description}
              action={card.action}
            >
              <PieceSample kind={card.kind} t={t} />
            </EntryCard>
          ))}
        </div>

        <div className="mt-[var(--koten-gap)] border border-rule bg-surface">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5">
            <h3 className="text-xs font-semibold">{t.pieces.indexTitle}</h3>
            <p className="text-2xs text-faint">{t.pieces.indexMeta}</p>
          </div>
          <div className="grid gap-[var(--koten-gap)] p-[var(--koten-panel-p)] sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div>
              <p className="text-2xs font-semibold text-faint">
                {t.pieces.primitives} · {primitiveNames.length}
              </p>
              <ul className="mt-1 columns-2 gap-4 text-2xs leading-relaxed text-muted sm:columns-3">
                {primitiveNames.map((name) => (
                  <li key={name} className="break-inside-avoid">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-rule pt-2 sm:border-s sm:border-t-0 sm:ps-3 sm:pt-0">
              <p className="text-2xs font-semibold text-faint">
                {t.pieces.patterns} · {patternNames.length}
              </p>
              <ul className="mt-1 columns-2 gap-4 text-2xs leading-relaxed text-muted">
                {patternNames.map((name) => (
                  <li key={name} className="break-inside-avoid">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-rule px-[var(--koten-panel-p)] py-1.5">
            <Link
              to="/components"
              className="text-2xs font-semibold text-link underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1"
            >
              {t.pieces.open} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-[calc(var(--koten-gap)*3)]">
        <SectionHeader
          title={t.principles.title}
          jp={t.principles.jp}
          meta={t.principles.meta}
          actions={
            <Badge tone="new" dot>
              {t.principles.badge}
            </Badge>
          }
        />
        <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Panel>
            <PanelHeader>
              <PanelTitle as="h3">{t.principles.panelTitle}</PanelTitle>
              <PanelActions>
                <span className="font-mono text-2xs text-faint">01–05</span>
              </PanelActions>
            </PanelHeader>
            <PanelBody>
              <ol className="divide-y divide-rule border-y border-rule text-xs">
                {t.principles.items.map((item, index) => (
                  <li key={item} className="flex min-h-[var(--koten-row-h)] items-center gap-3">
                    <span className="w-5 shrink-0 text-end font-mono text-2xs text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ol>
            </PanelBody>
          </Panel>

          <Panel tone="accent">
            <PanelHeader>
              <PanelTitle as="h3">{t.principles.qualityTitle}</PanelTitle>
              <PanelActions>
                <Badge tone="success" dot>
                  AA
                </Badge>
              </PanelActions>
            </PanelHeader>
            <PanelBody>
              <p className="text-xs leading-relaxed text-muted">{t.principles.qualityBody}</p>
              <dl className="mt-[var(--koten-gap)] grid grid-cols-2 gap-px border border-rule bg-rule">
                {t.principles.quality.map((item) => (
                  <div key={item.label} className="bg-surface p-2">
                    <dt className="text-2xs text-faint">{item.label}</dt>
                    <dd className="font-serif text-lg font-semibold tabular-nums">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/start"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "mt-[var(--koten-gap)]",
                )}
              >
                {t.principles.qualityCta}
              </Link>
            </PanelBody>
          </Panel>
        </div>
      </section>

      <section className="mt-[calc(var(--koten-gap)*3)]">
        <SectionHeader
          title={t.demos.title}
          jp={t.demos.jp}
          meta={t.demos.meta}
          actions={
            <Badge tone="success" dot>
              {t.demos.live}
            </Badge>
          }
        />
        <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] lg:grid-cols-2">
          <DemoCard
            eyebrow={t.demos.storefront.eyebrow}
            title={t.demos.storefront.title}
            jp="光"
            description={t.demos.storefront.description}
            tags={t.demos.storefront.tags}
            demoHref={site.storefront}
            patternTo="/blocks/storefront"
            openLabel={t.demos.open}
            patternLabel={t.demos.pattern}
          >
            <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
              <div className="flex gap-3">
                <img
                  src={sampleCamera}
                  alt={t.demos.storefront.imageAlt}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="size-20 shrink-0 border border-rule bg-tint object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">{t.live.itemOne}</p>
                  <p className="text-2xs text-faint">{t.live.itemOneMeta}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-primary">
                    {formatters.formatCurrency(128000)}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-1">
                    <Badge tone="sale" appearance="solid">
                      {t.registers.chirashi.sale}
                    </Badge>
                    <Badge tone="success" dot>
                      {t.live.stock}
                    </Badge>
                  </p>
                </div>
              </div>
              <div className="mt-2 border-t border-rule pt-2">
                <Meter label={t.demos.storefront.stockLabel} value={72} tone="success" />
              </div>
            </div>
            <p className="mt-2 text-2xs leading-relaxed text-muted">{t.demos.storefront.note}</p>
          </DemoCard>

          <DemoCard
            eyebrow={t.demos.erp.eyebrow}
            title={t.demos.erp.title}
            jp="蔵"
            description={t.demos.erp.description}
            tags={t.demos.erp.tags}
            demoHref={site.erp}
            patternTo="/blocks/erp"
            openLabel={t.demos.open}
            patternLabel={t.demos.pattern}
          >
            <Panel>
              <PanelHeader>
                <PanelTitle as="h4">{t.demos.erp.ordersLabel}</PanelTitle>
                <PanelActions>
                  <span className="text-2xs text-faint">{t.demos.erp.ordersMeta}</span>
                </PanelActions>
              </PanelHeader>
              <PanelBody flush>
                <Table className="min-w-0" containerClassName="border-0">
                  <TableCaption>{t.demos.erp.ordersLabel}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      {t.registers.daicho.columns.map((column, index) => (
                        <TableHead key={column} className={index === 2 ? "text-end" : undefined}>
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {t.registers.daicho.rows.map((row) => (
                      <TableRow key={row.code}>
                        <TableCell className="font-mono text-2xs text-faint">{row.code}</TableCell>
                        <TableCell>
                          <StatusBadge status={row.state} label={row.status} />
                        </TableCell>
                        <TableCell className="text-end tabular-nums">
                          {formatters.formatCurrency(row.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PanelBody>
            </Panel>
          </DemoCard>
        </div>
      </section>

      <section className="mt-[calc(var(--koten-gap)*3)] bg-inverse text-inverse-fg">
        <div className="grid gap-[calc(var(--koten-gap)*2)] p-[calc(var(--koten-gap)*2)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <p className="text-2xs font-semibold opacity-80">{t.closing.eyebrow}</p>
            <h2 className="mt-1 flex items-baseline gap-2 font-serif text-3xl font-semibold leading-tight">
              {t.closing.title}
              <span className="text-lg font-normal opacity-80">{t.closing.jp}</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed">{t.closing.lead}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/start" className={buttonVariants({ variant: "primary" })}>
                {t.closing.start} <span aria-hidden="true">→</span>
              </Link>
              <Link to="/components" className={buttonVariants({ variant: "secondary" })}>
                {t.closing.components}
              </Link>
              <Link
                to="/tokens"
                className="inline-flex min-h-[var(--koten-control-h)] items-center px-1 text-xs font-semibold text-inverse-fg underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-1"
              >
                {t.closing.foundations}
              </Link>
            </div>
          </div>
          <Panel>
            <PanelHeader>
              <PanelTitle as="h3">{t.closing.panelTitle}</PanelTitle>
              <PanelActions>
                <Badge tone="info">{t.closing.panelMeta}</Badge>
              </PanelActions>
            </PanelHeader>
            <PanelBody>
              <PackageManagerTabs
                value={packageManager}
                label={shellLabels[locale].runner}
                onChange={setPackageManager}
              />
              <Code>{installCommand}</Code>
              <p className="mt-2 text-2xs leading-relaxed text-muted">{t.closing.note}</p>
            </PanelBody>
          </Panel>
        </div>
      </section>
    </div>
  );
}
