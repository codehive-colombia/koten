import {
  Badge,
  CampaignBanner,
  Footer,
  formatNumber,
  type KotenLocale,
  NoticeList,
  PriceBlock,
  ProductCard,
  ProductGallery,
  RankedList,
  ReviewSummary,
  SearchBar,
  SpecTable,
  StoreHeader,
  useKoten,
} from "@koten/ui";
import sampleCamera from "../../assets/sample-camera.svg";
import { Code, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Patrones · 店舗",
    title: "Patrones de storefront",
    description:
      "Las once piezas que sostienen la página HIKARI K-1: cabecera, búsqueda, galería, precio, tarjetas, avisos, ranking, campaña, specs, reseñas y footer. Todas son composiciones de primitivas; ninguna hardcodea strings.",
    meta: "C-042 … C-052 · demo real en http://localhost:5174",
    categories: [
      { value: "all", label: "Todo" },
      { value: "cameras", label: "Cámaras" },
      { value: "lenses", label: "Objetivos" },
      { value: "audio", label: "Audio" },
    ],
    headerSectionTitle: "StoreHeader y SearchBar",
    headerSectionMeta: "Utility + marca + búsqueda + nav",
    brandLabel: "HIKARI, inicio",
    utilityLeft: "Envío gratuito · Recogida en tienda",
    utilityRight: "HIKARI ONLINE",
    searchLabel: "Buscar productos",
    searchPlaceholder: "Nombre, modelo o palabra clave",
    categoriesLabel: "Categorías",
    searchSubmit: "Buscar",
    account: "Cuenta · Carrito (0)",
    navItems: [
      { id: "cameras", label: "Cámaras", href: "#", active: true },
      { id: "lenses", label: "Objetivos", href: "#", active: false },
      { id: "audio", label: "Audio", href: "#", active: false },
      { id: "computers", label: "Informática", href: "#", active: false },
      { id: "gifts", label: "Regalos", href: "#", active: false },
    ],
    menuLabel: "Menú",
    gallerySectionTitle: "ProductGallery",
    gallerySectionMeta: "Miniaturas con aria-pressed",
    galleryLabel: "Galería de la HIKARI K-1",
    galleryAlts: ["HIKARI K-1 de frente", "HIKARI K-1 en detalle", "HIKARI K-1 con objetivo"],
    priceSectionTitle: "PriceBlock",
    priceSectionMeta: "Precio, impuestos, puntos y stock",
    taxLabel: "IVA incluido",
    listPriceLabel: "Precio anterior",
    points: "583 puntos",
    stockLabel: "En stock",
    priceNote: "※ Las imágenes son orientativas.",
    cardSectionTitle: "ProductCard",
    cardSectionMeta: "Imagen, precio y badges",
    lensTitle: "HIKARI 35mm f/2.8",
    lensAlt: "Objetivo HIKARI 35 mm",
    lensPoints: "324 puntos",
    lensMeta: "Objetivo fijo",
    silverTitle: "HIKARI K-1 plata",
    silverAlt: "HIKARI K-1 plateada",
    silverPoints: "583 puntos",
    silverMeta: "Color limitado",
    limitedBadge: "Limitado",
    cardRatingLabel: "reseñas",
    discoverySectionTitle: "NoticeList, RankedList y CampaignBanner",
    discoverySectionMeta: "Rail de descubrimiento",
    noticesLabel: "Avisos",
    noticesEmpty: "Sin avisos",
    noticesMore: "Ver todos",
    notices: [
      {
        id: "n1",
        date: "21/10",
        dateTime: "2026-10-21",
        title: "Feria de cámaras de otoño",
      },
      {
        id: "n2",
        date: "18/10",
        dateTime: "2026-10-18",
        title: "Cierre del centro de reparaciones",
      },
      { id: "n3", date: "15/10", dateTime: "2026-10-15", title: "Campaña de puntos ×5" },
    ],
    rankedLabel: "Más vendidos",
    rankedItems: [
      {
        id: "r1",
        rank: 1,
        title: "HIKARI K-1",
        href: "#",
        price: "¥58,300",
        meta: "Cámaras",
        alt: "HIKARI K-1",
      },
      {
        id: "r2",
        rank: 2,
        title: "Objetivo 35 mm",
        href: "#",
        price: "¥32,400",
        meta: "Objetivos",
        alt: "Objetivo HIKARI",
      },
      {
        id: "r3",
        rank: 3,
        title: "Bolsa de cámara",
        href: "#",
        price: "¥9,800",
        meta: "Accesorios",
        alt: "Bolsa HIKARI",
      },
    ],
    campaignEyebrow: "Feria de otoño",
    campaignTitle: "K-1 lens kit: 12.000 ¥ de descuento",
    campaignDescription: "Hasta el 31 de octubre. Puntos dobles.",
    campaignDeadline: "Hasta el 31 de octubre",
    campaignCta: "Ver la campaña",
    specsSectionTitle: "SpecTable",
    specsSectionMeta: "Tabla semántica agrupada",
    specsCaption: "Especificaciones de la HIKARI K-1",
    specGroups: [
      {
        id: "camera",
        title: "Cámara",
        rows: [
          { id: "sensor", label: "Sensor", value: "Full-frame de 35 mm, 24,2 MP" },
          { id: "lens", label: "Objetivo", value: "35 mm f/2.8 fijo" },
          { id: "iso", label: "ISO", value: "100–51.200" },
        ],
      },
      {
        id: "body",
        title: "Cuerpo",
        rows: [
          { id: "weight", label: "Peso", value: "380 g con batería" },
          { id: "battery", label: "Batería", value: "USB-C, unas 420 fotos" },
        ],
      },
    ],
    reviewsSectionTitle: "ReviewSummary",
    reviewsSectionMeta: "Promedio, distribución y reseñas",
    distributionLabel: "Distribución",
    ratingLabel: (value: number) =>
      `Valoración ${formatNumber(value, { locale: "es", minimumFractionDigits: 1, maximumFractionDigits: 1 })} de 5`,
    countLabel: (count: number) => `${count} valoraciones`,
    verifiedLabel: "Compra verificada",
    reviewsEmpty: "Sin reseñas",
    reviews: [
      {
        id: "rev-1",
        author: "Mika T.",
        date: "12 oct 2026",
        rating: 5,
        title: "La llevo todos los días",
        body: "Ligera y con un obturador silencioso. El ángulo de 35 mm va perfecto para calle.",
        verified: true,
      },
      {
        id: "rev-2",
        author: "Daniel R.",
        date: "4 oct 2026",
        rating: 4,
        title: "Sencilla de usar",
        body: "Los diales tienen un clic agradable. En un día de viaje la batería se queda corta.",
        verified: true,
      },
    ],
    footerSectionTitle: "Footer",
    footerSectionMeta: "Cuatro columnas sobre sumi",
    footerNavLabel: "Enlaces del pie",
    footerColumns: [
      {
        id: "shop",
        title: "Comprar",
        links: [
          { label: "Envío y gastos", href: "#" },
          { label: "Devoluciones", href: "#" },
        ],
      },
      {
        id: "services",
        title: "Servicios",
        links: [
          { label: "Reparación", href: "#" },
          { label: "Garantía", href: "#" },
        ],
      },
      {
        id: "company",
        title: "Empresa",
        links: [
          { label: "Sobre HIKARI", href: "#" },
          { label: "Empleo", href: "#" },
        ],
      },
      {
        id: "support",
        title: "Soporte",
        links: [
          { label: "Contacto", href: "#" },
          { label: "Preguntas frecuentes", href: "#" },
        ],
      },
    ],
    footerCompany: "HIKARI Optical Co., Ltd.",
    footerAddress: "2-8-1 Ginza, Chūō-ku, Tokio",
    footerLegal: [
      { label: "Condiciones", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Accesibilidad", href: "#" },
    ],
    footerNote: "Precios con impuestos. Imágenes orientativas.",
    propsSectionTitle: "Props y código",
    propsSectionMeta: "Composición copiable",
    propsCaption: "Props de los patrones de storefront",
    propsRows: [
      {
        prop: "StoreHeader",
        type: "{ brand, utility, search, actions, navItems, navLabel }",
        default: "—",
        note: "La marca usa Hanko; la búsqueda es un slot.",
      },
      {
        prop: "SearchBar",
        type: "{ label, categories, submitLabel, onSubmit }",
        default: "—",
        note: "Select nativo + input search + botón real.",
      },
      {
        prop: "PriceBlock",
        type: "{ price, taxLabel, points, stock, listPrice }",
        default: "size=lg",
        note: "El precio va en shu y tabular-nums.",
      },
      {
        prop: "ProductGallery",
        type: "{ images, label, thumbLabel }",
        default: "index 0",
        note: "Miniaturas con aria-pressed y alt en la principal.",
      },
      {
        prop: "ReviewSummary",
        type: "{ rating, count, distribution, reviews, labels }",
        default: "—",
        note: "Las estrellas son decorativas; el texto da el valor.",
      },
    ],
    code: `<StoreHeader
  brand={{ name: "HIKARI", jp: "光", href: "/", label: "HIKARI, inicio" }}
  utility={{ left: "Envío gratuito", right: "HIKARI ONLINE" }}
  search={<SearchBar label="Buscar" categories={categories} submitLabel="Buscar" />}
  actions={<CartLink count={0} />}
  navLabel="Categorías"
  navItems={categories}
  menuLabel="Menú"
/>

<PriceBlock
  price={formatCurrency(58300)}
  taxLabel="IVA incluido"
  points={formatPoints(583)}
  stock={{ label: "En stock", tone: "success" }}
/>

<ProductGallery
  images={product.images}
  label={product.name}
  thumbLabel={(index, alt) => \`\${index + 1}. \${alt}\`}
/>`,
    a11ySectionTitle: "Accesibilidad",
    a11ySectionMeta: "Teclado y lectores",
    a11yLabel: "Notas de accesibilidad de los patrones de storefront",
    a11yItems: [
      "La búsqueda usa role=search, labels visibles para lectores y un botón real.",
      "La galería anuncia la imagen activa con aria-pressed; la principal lleva alt descriptivo.",
      "Precio, impuestos, puntos y stock siempre van con texto; el color refuerza.",
      "Las tarjetas y el ranking son enlaces reales con foco visible.",
      "El footer mantiene contraste AA sobre sumi y 12 px mínimo.",
      "JA/ES/EN comparten estructura; el texto largo no tiene alturas fijas.",
    ],
  },
  ja: {
    eyebrow: "パターン · 店舗",
    title: "ストアフロントのパターン",
    description:
      "HIKARI K-1 の商品ページを支える 11 の部品。ヘッダー、検索、ギャラリー、価格、カード、お知らせ、ランキング、キャンペーン、仕様、レビュー、フッター。すべてプリミティブの組み合わせで、文字列をハードコードしていません。",
    meta: "C-042 … C-052 · 実デモ http://localhost:5174",
    categories: [
      { value: "all", label: "すべて" },
      { value: "cameras", label: "カメラ" },
      { value: "lenses", label: "レンズ" },
      { value: "audio", label: "オーディオ" },
    ],
    headerSectionTitle: "StoreHeader と SearchBar",
    headerSectionMeta: "ユーティリティ + ブランド + 検索 + ナビ",
    brandLabel: "HIKARI、ホーム",
    utilityLeft: "送料無料 · 店頭受け取り",
    utilityRight: "HIKARI ONLINE",
    searchLabel: "商品を検索",
    searchPlaceholder: "商品名、型番、キーワード",
    categoriesLabel: "カテゴリー",
    searchSubmit: "検索",
    account: "アカウント · カート (0)",
    navItems: [
      { id: "cameras", label: "カメラ", href: "#", active: true },
      { id: "lenses", label: "レンズ", href: "#", active: false },
      { id: "audio", label: "オーディオ", href: "#", active: false },
      { id: "computers", label: "コンピューター", href: "#", active: false },
      { id: "gifts", label: "ギフト", href: "#", active: false },
    ],
    menuLabel: "メニュー",
    gallerySectionTitle: "ProductGallery",
    gallerySectionMeta: "aria-pressed 付きサムネイル",
    galleryLabel: "HIKARI K-1 のギャラリー",
    galleryAlts: ["HIKARI K-1 正面", "HIKARI K-1 のディテール", "HIKARI K-1 とレンズ"],
    priceSectionTitle: "PriceBlock",
    priceSectionMeta: "価格、税、ポイント、在庫",
    taxLabel: "税込",
    listPriceLabel: "通常価格",
    points: "583 ポイント",
    stockLabel: "在庫あり",
    priceNote: "※ 画像はイメージです。",
    cardSectionTitle: "ProductCard",
    cardSectionMeta: "画像、価格、バッジ",
    lensTitle: "HIKARI 35mm f/2.8",
    lensAlt: "HIKARI 35 mm レンズ",
    lensPoints: "324 ポイント",
    lensMeta: "単焦点レンズ",
    silverTitle: "HIKARI K-1 シルバー",
    silverAlt: "HIKARI K-1 シルバー",
    silverPoints: "583 ポイント",
    silverMeta: "限定色",
    limitedBadge: "限定",
    cardRatingLabel: "レビュー",
    discoverySectionTitle: "NoticeList、RankedList、CampaignBanner",
    discoverySectionMeta: "発見のためのレール",
    noticesLabel: "お知らせ",
    noticesEmpty: "お知らせはありません",
    noticesMore: "すべて見る",
    notices: [
      {
        id: "n1",
        date: "10/21",
        dateTime: "2026-10-21",
        title: "秋のカメラフェア",
      },
      {
        id: "n2",
        date: "10/18",
        dateTime: "2026-10-18",
        title: "修理センター休業のお知らせ",
      },
      { id: "n3", date: "10/15", dateTime: "2026-10-15", title: "ポイント5倍キャンペーン" },
    ],
    rankedLabel: "売れ筋",
    rankedItems: [
      {
        id: "r1",
        rank: 1,
        title: "HIKARI K-1",
        href: "#",
        price: "¥58,300",
        meta: "カメラ",
        alt: "HIKARI K-1",
      },
      {
        id: "r2",
        rank: 2,
        title: "35 mm レンズ",
        href: "#",
        price: "¥32,400",
        meta: "レンズ",
        alt: "HIKARI レンズ",
      },
      {
        id: "r3",
        rank: 3,
        title: "カメラバッグ",
        href: "#",
        price: "¥9,800",
        meta: "アクセサリー",
        alt: "HIKARI バッグ",
      },
    ],
    campaignEyebrow: "秋のフェア",
    campaignTitle: "K-1 レンズキット：12,000 円引き",
    campaignDescription: "10月31日まで。ポイント2倍。",
    campaignDeadline: "10月31日まで",
    campaignCta: "キャンペーンを見る",
    specsSectionTitle: "SpecTable",
    specsSectionMeta: "グループ化したセマンティック表",
    specsCaption: "HIKARI K-1 の仕様",
    specGroups: [
      {
        id: "camera",
        title: "カメラ",
        rows: [
          { id: "sensor", label: "センサー", value: "35 mm フルサイズ、24.2 MP" },
          { id: "lens", label: "レンズ", value: "35 mm f/2.8 単焦点" },
          { id: "iso", label: "ISO", value: "100–51,200" },
        ],
      },
      {
        id: "body",
        title: "ボディ",
        rows: [
          { id: "weight", label: "重量", value: "バッテリー込み 380 g" },
          { id: "battery", label: "バッテリー", value: "USB-C、約 420 枚" },
        ],
      },
    ],
    reviewsSectionTitle: "ReviewSummary",
    reviewsSectionMeta: "平均、分布、レビュー",
    distributionLabel: "分布",
    ratingLabel: (value: number) =>
      `5 段階中 ${formatNumber(value, { locale: "ja", minimumFractionDigits: 1, maximumFractionDigits: 1 })}`,
    countLabel: (count: number) => `${count} 件のレビュー`,
    verifiedLabel: "購入済み",
    reviewsEmpty: "レビューはありません",
    reviews: [
      {
        id: "rev-1",
        author: "Mika T.",
        date: "2026年10月12日",
        rating: 5,
        title: "毎日持ち歩いています",
        body: "軽くてシャッター音も静か。35 mm の画角は街撮りにぴったりです。",
        verified: true,
      },
      {
        id: "rev-2",
        author: "Daniel R.",
        date: "2026年10月4日",
        rating: 4,
        title: "使いやすい",
        body: "ダイヤルのクリック感が心地よい。旅行では一日でバッテリーが足りなくなります。",
        verified: true,
      },
    ],
    footerSectionTitle: "Footer",
    footerSectionMeta: "墨の上に4カラム",
    footerNavLabel: "フッターリンク",
    footerColumns: [
      {
        id: "shop",
        title: "購入",
        links: [
          { label: "配送と送料", href: "#" },
          { label: "返品", href: "#" },
        ],
      },
      {
        id: "services",
        title: "サービス",
        links: [
          { label: "修理", href: "#" },
          { label: "保証", href: "#" },
        ],
      },
      {
        id: "company",
        title: "会社",
        links: [
          { label: "HIKARI について", href: "#" },
          { label: "採用", href: "#" },
        ],
      },
      {
        id: "support",
        title: "サポート",
        links: [
          { label: "お問い合わせ", href: "#" },
          { label: "よくある質問", href: "#" },
        ],
      },
    ],
    footerCompany: "HIKARI Optical Co., Ltd.",
    footerAddress: "東京都中央区銀座 2-8-1",
    footerLegal: [
      { label: "利用規約", href: "#" },
      { label: "プライバシー", href: "#" },
      { label: "アクセシビリティ", href: "#" },
    ],
    footerNote: "価格は税込。画像はイメージです。",
    propsSectionTitle: "Props とコード",
    propsSectionMeta: "コピーできる構成",
    propsCaption: "ストアフロントパターンの props",
    propsRows: [
      {
        prop: "StoreHeader",
        type: "{ brand, utility, search, actions, navItems, navLabel }",
        default: "—",
        note: "ブランドは Hanko、検索はスロット。",
      },
      {
        prop: "SearchBar",
        type: "{ label, categories, submitLabel, onSubmit }",
        default: "—",
        note: "ネイティブの select + search input + 実ボタン。",
      },
      {
        prop: "PriceBlock",
        type: "{ price, taxLabel, points, stock, listPrice }",
        default: "size=lg",
        note: "価格は shu と tabular-nums。",
      },
      {
        prop: "ProductGallery",
        type: "{ images, label, thumbLabel }",
        default: "index 0",
        note: "サムネイルに aria-pressed、メイン画像に alt。",
      },
      {
        prop: "ReviewSummary",
        type: "{ rating, count, distribution, reviews, labels }",
        default: "—",
        note: "星は装飾。値はテキストで伝える。",
      },
    ],
    code: `<StoreHeader
  brand={{ name: "HIKARI", jp: "光", href: "/", label: "HIKARI、ホーム" }}
  utility={{ left: "送料無料", right: "HIKARI ONLINE" }}
  search={<SearchBar label="検索" categories={categories} submitLabel="検索" />}
  actions={<CartLink count={0} />}
  navLabel="カテゴリー"
  navItems={categories}
  menuLabel="メニュー"
/>

<PriceBlock
  price={formatCurrency(58300)}
  taxLabel="税込"
  points={formatPoints(583)}
  stock={{ label: "在庫あり", tone: "success" }}
/>

<ProductGallery
  images={product.images}
  label={product.name}
  thumbLabel={(index, alt) => \`\${index + 1}. \${alt}\`}
/>`,
    a11ySectionTitle: "アクセシビリティ",
    a11ySectionMeta: "キーボードとスクリーンリーダー",
    a11yLabel: "ストアフロントパターンのアクセシビリティメモ",
    a11yItems: [
      "検索は role=search を持ち、スクリーンリーダー向けの可視ラベルと実ボタンを備えます。",
      "ギャラリーは aria-pressed で現在の画像を伝え、メイン画像には説明的な alt があります。",
      "価格、税、ポイント、在庫は必ずテキストで示し、色は補助に留めます。",
      "カードとランキングは実リンクで、フォーカスが視認できます。",
      "フッターは墨の上で AA コントラストを保ち、最小 12 px です。",
      "JA/ES/EN は同じ構造を共有し、長いテキストに固定高さはありません。",
    ],
  },
  en: {
    eyebrow: "Patterns · 店舗",
    title: "Storefront patterns",
    description:
      "The eleven pieces behind the HIKARI K-1 page: header, search, gallery, price, cards, notices, ranking, campaign, specs, reviews and footer. All are primitive compositions; none hardcodes strings.",
    meta: "C-042 … C-052 · live demo at http://localhost:5174",
    categories: [
      { value: "all", label: "All" },
      { value: "cameras", label: "Cameras" },
      { value: "lenses", label: "Lenses" },
      { value: "audio", label: "Audio" },
    ],
    headerSectionTitle: "StoreHeader and SearchBar",
    headerSectionMeta: "Utility + brand + search + nav",
    brandLabel: "HIKARI, home",
    utilityLeft: "Free shipping · Store pickup",
    utilityRight: "HIKARI ONLINE",
    searchLabel: "Search products",
    searchPlaceholder: "Name, model or keyword",
    categoriesLabel: "Categories",
    searchSubmit: "Search",
    account: "Account · Cart (0)",
    navItems: [
      { id: "cameras", label: "Cameras", href: "#", active: true },
      { id: "lenses", label: "Lenses", href: "#", active: false },
      { id: "audio", label: "Audio", href: "#", active: false },
      { id: "computers", label: "Computers", href: "#", active: false },
      { id: "gifts", label: "Gifts", href: "#", active: false },
    ],
    menuLabel: "Menu",
    gallerySectionTitle: "ProductGallery",
    gallerySectionMeta: "Thumbnails with aria-pressed",
    galleryLabel: "HIKARI K-1 gallery",
    galleryAlts: ["HIKARI K-1 front", "HIKARI K-1 detail", "HIKARI K-1 with lens"],
    priceSectionTitle: "PriceBlock",
    priceSectionMeta: "Price, tax, points and stock",
    taxLabel: "Tax included",
    listPriceLabel: "List price",
    points: "583 points",
    stockLabel: "In stock",
    priceNote: "※ Images are for reference only.",
    cardSectionTitle: "ProductCard",
    cardSectionMeta: "Image, price and badges",
    lensTitle: "HIKARI 35mm f/2.8",
    lensAlt: "HIKARI 35 mm lens",
    lensPoints: "324 points",
    lensMeta: "Prime lens",
    silverTitle: "HIKARI K-1 silver",
    silverAlt: "HIKARI K-1 in silver",
    silverPoints: "583 points",
    silverMeta: "Limited color",
    limitedBadge: "Limited",
    cardRatingLabel: "reviews",
    discoverySectionTitle: "NoticeList, RankedList and CampaignBanner",
    discoverySectionMeta: "Discovery rail",
    noticesLabel: "Notices",
    noticesEmpty: "No notices",
    noticesMore: "View all",
    notices: [
      {
        id: "n1",
        date: "Oct 21",
        dateTime: "2026-10-21",
        title: "Autumn camera fair",
      },
      {
        id: "n2",
        date: "Oct 18",
        dateTime: "2026-10-18",
        title: "Repair center closure",
      },
      { id: "n3", date: "Oct 15", dateTime: "2026-10-15", title: "5× points campaign" },
    ],
    rankedLabel: "Best sellers",
    rankedItems: [
      {
        id: "r1",
        rank: 1,
        title: "HIKARI K-1",
        href: "#",
        price: "¥58,300",
        meta: "Cameras",
        alt: "HIKARI K-1",
      },
      {
        id: "r2",
        rank: 2,
        title: "35 mm lens",
        href: "#",
        price: "¥32,400",
        meta: "Lenses",
        alt: "HIKARI lens",
      },
      {
        id: "r3",
        rank: 3,
        title: "Camera bag",
        href: "#",
        price: "¥9,800",
        meta: "Accessories",
        alt: "HIKARI bag",
      },
    ],
    campaignEyebrow: "Autumn fair",
    campaignTitle: "K-1 lens kit: ¥12,000 off",
    campaignDescription: "Until October 31. Double points.",
    campaignDeadline: "Until October 31",
    campaignCta: "View the campaign",
    specsSectionTitle: "SpecTable",
    specsSectionMeta: "Grouped semantic table",
    specsCaption: "HIKARI K-1 specifications",
    specGroups: [
      {
        id: "camera",
        title: "Camera",
        rows: [
          { id: "sensor", label: "Sensor", value: "35 mm full-frame, 24.2 MP" },
          { id: "lens", label: "Lens", value: "35 mm f/2.8 prime" },
          { id: "iso", label: "ISO", value: "100–51,200" },
        ],
      },
      {
        id: "body",
        title: "Body",
        rows: [
          { id: "weight", label: "Weight", value: "380 g with battery" },
          { id: "battery", label: "Battery", value: "USB-C, about 420 shots" },
        ],
      },
    ],
    reviewsSectionTitle: "ReviewSummary",
    reviewsSectionMeta: "Average, distribution and reviews",
    distributionLabel: "Distribution",
    ratingLabel: (value: number) =>
      `${formatNumber(value, { locale: "en", minimumFractionDigits: 1, maximumFractionDigits: 1 })} out of 5`,
    countLabel: (count: number) => `${count} reviews`,
    verifiedLabel: "Verified purchase",
    reviewsEmpty: "No reviews",
    reviews: [
      {
        id: "rev-1",
        author: "Mika T.",
        date: "Oct 12, 2026",
        rating: 5,
        title: "I carry it every day",
        body: "Light, with a quiet shutter. The 35 mm angle is perfect for street shooting.",
        verified: true,
      },
      {
        id: "rev-2",
        author: "Daniel R.",
        date: "Oct 4, 2026",
        rating: 4,
        title: "Simple to use",
        body: "The dials have a pleasant click. On a travel day the battery runs short.",
        verified: true,
      },
    ],
    footerSectionTitle: "Footer",
    footerSectionMeta: "Four columns on sumi",
    footerNavLabel: "Footer links",
    footerColumns: [
      {
        id: "shop",
        title: "Shop",
        links: [
          { label: "Shipping & costs", href: "#" },
          { label: "Returns", href: "#" },
        ],
      },
      {
        id: "services",
        title: "Services",
        links: [
          { label: "Repair", href: "#" },
          { label: "Warranty", href: "#" },
        ],
      },
      {
        id: "company",
        title: "Company",
        links: [
          { label: "About HIKARI", href: "#" },
          { label: "Careers", href: "#" },
        ],
      },
      {
        id: "support",
        title: "Support",
        links: [
          { label: "Contact", href: "#" },
          { label: "FAQ", href: "#" },
        ],
      },
    ],
    footerCompany: "HIKARI Optical Co., Ltd.",
    footerAddress: "2-8-1 Ginza, Chūō-ku, Tokyo",
    footerLegal: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
    footerNote: "Prices include tax. Images are for reference.",
    propsSectionTitle: "Props and code",
    propsSectionMeta: "Copyable composition",
    propsCaption: "Storefront pattern props",
    propsRows: [
      {
        prop: "StoreHeader",
        type: "{ brand, utility, search, actions, navItems, navLabel }",
        default: "—",
        note: "The brand uses Hanko; search is a slot.",
      },
      {
        prop: "SearchBar",
        type: "{ label, categories, submitLabel, onSubmit }",
        default: "—",
        note: "Native select + search input + a real button.",
      },
      {
        prop: "PriceBlock",
        type: "{ price, taxLabel, points, stock, listPrice }",
        default: "size=lg",
        note: "The price uses shu and tabular-nums.",
      },
      {
        prop: "ProductGallery",
        type: "{ images, label, thumbLabel }",
        default: "index 0",
        note: "Thumbnails use aria-pressed; the main image carries alt.",
      },
      {
        prop: "ReviewSummary",
        type: "{ rating, count, distribution, reviews, labels }",
        default: "—",
        note: "Stars are decorative; text carries the value.",
      },
    ],
    code: `<StoreHeader
  brand={{ name: "HIKARI", jp: "光", href: "/", label: "HIKARI, home" }}
  utility={{ left: "Free shipping", right: "HIKARI ONLINE" }}
  search={<SearchBar label="Search" categories={categories} submitLabel="Search" />}
  actions={<CartLink count={0} />}
  navLabel="Categories"
  navItems={categories}
  menuLabel="Menu"
/>

<PriceBlock
  price={formatCurrency(58300)}
  taxLabel="Tax included"
  points={formatPoints(583)}
  stock={{ label: "In stock", tone: "success" }}
/>

<ProductGallery
  images={product.images}
  label={product.name}
  thumbLabel={(index, alt) => \`\${index + 1}. \${alt}\`}
/>`,
    a11ySectionTitle: "Accessibility",
    a11ySectionMeta: "Keyboard and screen readers",
    a11yLabel: "Accessibility notes for the storefront patterns",
    a11yItems: [
      "Search uses role=search, visible labels for screen readers and a real button.",
      "The gallery announces the active image with aria-pressed; the main image has descriptive alt text.",
      "Price, tax, points and stock always appear as text; colour only reinforces.",
      "Cards and the ranking are real links with a visible focus ring.",
      "The footer keeps AA contrast on sumi and a 12 px minimum.",
      "JA/ES/EN share the same structure; long text has no fixed heights.",
    ],
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function StorefrontPatternsPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="チラシ"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="header" title={t.headerSectionTitle} jp="ヘッダー" meta={t.headerSectionMeta}>
          <StoreHeader
            brand={{ name: "HIKARI", jp: "光", href: "#", label: t.brandLabel }}
            utility={{ left: t.utilityLeft, right: t.utilityRight }}
            search={
              <SearchBar
                label={t.searchLabel}
                placeholder={t.searchPlaceholder}
                categoriesLabel={t.categoriesLabel}
                categories={t.categories}
                submitLabel={t.searchSubmit}
              />
            }
            actions={<span className="text-2xs text-muted">{t.account}</span>}
            navLabel={t.categoriesLabel}
            navItems={t.navItems}
            menuLabel={t.menuLabel}
          />
        </Section>

        <Section
          id="gallery"
          title={t.gallerySectionTitle}
          jp="商品画像"
          meta={t.gallerySectionMeta}
        >
          <div className="max-w-md">
            <ProductGallery
              label={t.galleryLabel}
              images={t.galleryAlts.map((alt, index) => ({
                id: `gallery-${index}`,
                src: sampleCamera,
                alt,
              }))}
              thumbLabel={(index, alt) => `${index + 1}. ${alt}`}
            />
          </div>
        </Section>

        <Section id="price" title={t.priceSectionTitle} jp="価格" meta={t.priceSectionMeta}>
          <div className="max-w-sm">
            <PriceBlock
              price="¥58,300"
              taxLabel={t.taxLabel}
              listPrice="¥63,800"
              listPriceLabel={t.listPriceLabel}
              points={t.points}
              stock={{ label: t.stockLabel, tone: "success" }}
              note={t.priceNote}
            />
          </div>
        </Section>

        <Section
          id="product-card"
          title={t.cardSectionTitle}
          jp="商品カード"
          meta={t.cardSectionMeta}
        >
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2">
            <ProductCard
              href="#"
              title={t.lensTitle}
              image={{ src: sampleCamera, alt: t.lensAlt }}
              price="¥32,400"
              points={t.lensPoints}
              meta={t.lensMeta}
            />
            <ProductCard
              href="#"
              title={t.silverTitle}
              image={{ src: sampleCamera, alt: t.silverAlt }}
              price="¥58,300"
              points={t.silverPoints}
              meta={t.silverMeta}
              badges={<Badge tone="sale">{t.limitedBadge}</Badge>}
              rating={{ value: 4.6, count: 128, label: t.cardRatingLabel }}
            />
          </div>
        </Section>

        <Section
          id="discovery"
          title={t.discoverySectionTitle}
          jp="発見"
          meta={t.discoverySectionMeta}
        >
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <NoticeList
              label={t.noticesLabel}
              emptyLabel={t.noticesEmpty}
              moreLabel={t.noticesMore}
              moreHref="#"
              notices={t.notices}
            />
            <RankedList
              label={t.rankedLabel}
              items={t.rankedItems.map((item) => ({
                id: item.id,
                rank: item.rank,
                title: item.title,
                href: item.href,
                price: item.price,
                meta: item.meta,
                image: { src: sampleCamera, alt: item.alt },
              }))}
            />
          </div>
          <div className="mt-[var(--koten-gap)]">
            <CampaignBanner
              eyebrow={t.campaignEyebrow}
              title={t.campaignTitle}
              description={t.campaignDescription}
              deadline={t.campaignDeadline}
              cta={{ label: t.campaignCta, href: "#" }}
            />
          </div>
        </Section>

        <Section id="specs" title={t.specsSectionTitle} jp="仕様表" meta={t.specsSectionMeta}>
          <SpecTable caption={t.specsCaption} groups={t.specGroups} />
        </Section>

        <Section
          id="reviews"
          title={t.reviewsSectionTitle}
          jp="レビュー"
          meta={t.reviewsSectionMeta}
        >
          <ReviewSummary
            rating={4.6}
            count={128}
            ratingLabel={t.ratingLabel}
            countLabel={t.countLabel}
            distributionLabel={t.distributionLabel}
            distribution={[
              { stars: 5, count: 86 },
              { stars: 4, count: 28 },
              { stars: 3, count: 9 },
              { stars: 2, count: 3 },
              { stars: 1, count: 2 },
            ]}
            verifiedLabel={t.verifiedLabel}
            emptyLabel={t.reviewsEmpty}
            reviews={t.reviews}
          />
        </Section>

        <Section id="footer" title={t.footerSectionTitle} jp="フッター" meta={t.footerSectionMeta}>
          <Footer
            navLabel={t.footerNavLabel}
            columns={t.footerColumns}
            company={t.footerCompany}
            address={t.footerAddress}
            legal={t.footerLegal}
            note={t.footerNote}
          />
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
