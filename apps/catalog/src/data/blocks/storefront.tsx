import {
  Badge,
  CampaignBanner,
  Footer,
  formatNumber,
  NoticeList,
  PriceBlock,
  ProductCard,
  ProductGallery,
  RankedList,
  ReviewSummary,
  SearchBar,
  SpecTable,
  StoreHeader,
} from "@koten/ui";
import { useState } from "react";
import { type BlockDoc, filesFor, patternFile } from "../docs/types";

/**
 * Local inline SVG placeholders. They keep the docs free of app assets and
 * remote URLs; every <img> still receives meaningful alt text from the demo.
 * No text is drawn inside the artwork.
 */
const placeholderArt = {
  camera:
    '<rect x="30" y="42" width="100" height="60" rx="6" fill="#efe9db" stroke="#948a75" stroke-width="2"/>' +
    '<path d="M46 42l7-11h24l7 11" fill="none" stroke="#948a75" stroke-width="2" stroke-linejoin="round"/>' +
    '<circle cx="80" cy="72" r="19" fill="none" stroke="#948a75" stroke-width="2"/>' +
    '<circle cx="80" cy="72" r="8" fill="#c23b22" opacity="0.35"/>' +
    '<circle cx="113" cy="53" r="4" fill="#948a75" opacity="0.6"/>',
  lens:
    '<circle cx="80" cy="62" r="34" fill="#efe9db" stroke="#948a75" stroke-width="2"/>' +
    '<circle cx="80" cy="62" r="21" fill="none" stroke="#948a75" stroke-width="2"/>' +
    '<circle cx="80" cy="62" r="9" fill="#c23b22" opacity="0.3"/>' +
    '<rect x="58" y="94" width="44" height="8" rx="2" fill="#948a75" opacity="0.5"/>',
  bag:
    '<rect x="40" y="48" width="80" height="50" rx="4" fill="#efe9db" stroke="#948a75" stroke-width="2"/>' +
    '<path d="M64 48v-8a16 16 0 0 1 32 0v8" fill="none" stroke="#948a75" stroke-width="2"/>' +
    '<path d="M40 68h80" stroke="#948a75" stroke-width="2" opacity="0.6"/>' +
    '<rect x="70" y="62" width="20" height="12" rx="2" fill="#c23b22" opacity="0.35"/>',
} as const;

const placeholder = (variant: keyof typeof placeholderArt) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><rect width="160" height="120" fill="#efe9db"/>${placeholderArt[variant]}</svg>`,
  )}`;

const searchCategories = [
  { value: "cameras", label: "Cameras" },
  { value: "lenses", label: "Lenses" },
  { value: "audio", label: "Audio" },
  { value: "accessories", label: "Accessories" },
];

const noticeItems = [
  {
    id: "notice-1",
    date: "10/21",
    dateTime: "2026-10-21",
    title: "Autumn camera fair",
    href: "#notices",
  },
  {
    id: "notice-2",
    date: "10/18",
    dateTime: "2026-10-18",
    title: "Repair centre closure",
  },
  {
    id: "notice-3",
    date: "10/15",
    dateTime: "2026-10-15",
    title: "5× points campaign",
    tag: (
      <Badge tone="new" appearance="outline">
        New
      </Badge>
    ),
  },
];

const rankedItems = [
  {
    id: "ranked-1",
    rank: 1,
    title: "HIKARI K-1",
    href: "#ranked",
    price: "¥58,300",
    meta: "Cameras",
    image: { src: placeholder("camera"), alt: "HIKARI K-1 camera" },
  },
  {
    id: "ranked-2",
    rank: 2,
    title: "HIKARI 35mm f/2.8",
    href: "#ranked",
    price: "¥32,400",
    meta: "Lenses",
    image: { src: placeholder("lens"), alt: "HIKARI 35 mm lens" },
  },
  {
    id: "ranked-3",
    rank: 3,
    title: "HIKARI camera bag",
    href: "#ranked",
    price: "¥9,800",
    meta: "Accessories",
    image: { src: placeholder("bag"), alt: "HIKARI camera bag" },
  },
];

const galleryImages = [
  { id: "front", src: placeholder("camera"), alt: "HIKARI K-1 front view" },
  { id: "lens", src: placeholder("lens"), alt: "HIKARI 35 mm lens detail" },
  { id: "kit", src: placeholder("bag"), alt: "HIKARI K-1 with camera bag" },
];

const specGroups = [
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
];

const reviewItems = [
  {
    id: "review-1",
    author: "Mika T.",
    date: "Oct 12, 2026",
    rating: 5,
    title: "I carry it every day",
    body: "Light, with a quiet shutter. The 35 mm angle is perfect for street shooting.",
    verified: true,
  },
  {
    id: "review-2",
    author: "Daniel R.",
    date: "Oct 4, 2026",
    rating: 4,
    title: "Simple to use",
    body: "The dials have a pleasant click. On a travel day the battery runs short.",
    verified: true,
  },
];

const reviewDistribution = [
  { stars: 5, count: 86 },
  { stars: 4, count: 28 },
  { stars: 3, count: 9 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
];

const ratingLabel = (value: number) =>
  `${formatNumber(value, { locale: "en", minimumFractionDigits: 1, maximumFractionDigits: 1 })} out of 5`;

const countLabel = (count: number) => `${count} reviews`;

const footerColumns = [
  {
    id: "shop",
    title: "Shop",
    links: [
      { label: "Shipping & costs", href: "#shop" },
      { label: "Returns", href: "#shop" },
    ],
  },
  {
    id: "services",
    title: "Services",
    links: [
      { label: "Repair", href: "#services" },
      { label: "Warranty", href: "#services" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About HIKARI", href: "#company" },
      { label: "Careers", href: "#company" },
    ],
  },
  {
    id: "support",
    title: "Support",
    links: [
      { label: "Contact", href: "#support" },
      { label: "FAQ", href: "#support" },
    ],
  },
];

function SearchDemo() {
  const [result, setResult] = useState("");

  return (
    <div className="max-w-xl">
      <SearchBar
        label="Search products"
        placeholder="Name, model or keyword"
        categoriesLabel="Categories"
        categories={searchCategories}
        submitLabel="Search"
        onSubmit={(value, category) => {
          const scope =
            searchCategories.find((option) => option.value === category)?.label ?? category;
          setResult(value ? `“${value}” in ${scope}` : `All products in ${scope}`);
        }}
      />
      <p className="mt-2 min-h-4 text-2xs text-muted" aria-live="polite">
        {result || "Pick a category, type a query and press Search."}
      </p>
    </div>
  );
}

function ControlledGalleryDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="max-w-md">
      <ProductGallery
        images={galleryImages}
        label="HIKARI K-1 gallery"
        activeIndex={index}
        onIndexChange={setIndex}
        thumbLabel={(position, alt) => `${position + 1}. ${alt}`}
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-2xs text-muted" aria-live="polite">
          Image {index + 1} of {galleryImages.length}
        </p>
        <button
          type="button"
          onClick={() => setIndex((current) => (current + 1) % galleryImages.length)}
          className="border border-rule-strong bg-surface px-2 py-1 text-2xs font-semibold text-ink transition-colors hover:bg-tint"
        >
          Next image
        </button>
      </div>
    </div>
  );
}

export const storefrontBlockDocs: BlockDoc[] = [
  {
    slug: "search-bar",
    id: "C-042",
    category: "storefront",
    name: "SearchBar",
    jp: "検索",
    description: {
      es: "Búsqueda de catálogo con selector de categoría, campo de búsqueda y botón de envío real. El valor y la categoría pueden ser controlados o quedar en manos del componente.",
      ja: "カテゴリー選択、検索入力、実際の送信ボタンを備えたカタログ検索です。値とカテゴリーは制御することも、コンポーネントに任せることもできます。",
      en: "Catalogue search with a category select, a search field and a real submit button. Value and category can be controlled or left to the component.",
    },
    files: filesFor(patternFile("search-bar.tsx")),
    examples: [
      {
        id: "submit",
        title: {
          es: "Categoría, consulta y envío",
          ja: "カテゴリー・検索語・送信",
          en: "Category, query and submit",
        },
        description: {
          es: "El formulario entrega el valor y la categoría actuales a onSubmit; aquí el resultado se anuncia en una región viva.",
          ja: "フォームは現在の値とカテゴリーを onSubmit に渡します。この例では結果をライブリージョンで通知します。",
          en: "The form hands the current value and category to onSubmit; here the result is announced in a live region.",
        },
        preview: <SearchDemo />,
        code: `const [result, setResult] = useState("");

<SearchBar
  label="Search products"
  placeholder="Name, model or keyword"
  categoriesLabel="Categories"
  categories={[
    { value: "cameras", label: "Cameras" },
    { value: "lenses", label: "Lenses" },
    { value: "audio", label: "Audio" },
  ]}
  submitLabel="Search"
  onSubmit={(value, category) => setResult(value + " · " + category)}
/>
<p aria-live="polite">{result}</p>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre del landmark de búsqueda y etiqueta accesible del campo.",
          ja: "検索ランドマークの名前と、入力欄のアクセシブル名になります。",
          en: "Names the search landmark and labels the input for assistive tech.",
        },
      },
      {
        prop: "placeholder",
        type: "string",
        default: "—",
        note: {
          es: "Ejemplo de consulta; nunca sustituye a label.",
          ja: "入力例です。label の代わりにはなりません。",
          en: "An example query; it never replaces label.",
        },
      },
      {
        prop: "categories",
        type: "readonly SearchCategoryOption[]",
        default: "—",
        note: {
          es: "Opciones del selector nativo; la primera es la categoría inicial.",
          ja: "ネイティブセレクトの選択肢です。先頭が初期カテゴリーになります。",
          en: "Options for the native select; the first one is the initial category.",
        },
      },
      {
        prop: "categoriesLabel",
        type: "string",
        default: "—",
        note: {
          es: "Etiqueta del selector, visible solo para lectores de pantalla.",
          ja: "セレクトのラベルで、スクリーンリーダーにのみ見えます。",
          en: "Select label, exposed to screen readers only.",
        },
      },
      {
        prop: "submitLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto del botón; en pantallas estrechas el icono lo reemplaza visualmente, no para lectores.",
          ja: "送信ボタンの文字です。狭い画面ではアイコンに変わりますが、読み上げ名は残ります。",
          en: "Submit button text; on narrow screens the icon replaces it visually, not for screen readers.",
        },
      },
      {
        prop: "value",
        type: "string",
        default: "uncontrolled",
        note: {
          es: "Pasa value junto a onValueChange para controlar la consulta desde fuera.",
          ja: "外部から検索語を制御する場合は value と onValueChange を渡します。",
          en: "Pass value with onValueChange to control the query from outside.",
        },
      },
      {
        prop: "onSubmit",
        type: "(value: string, category: string) => void",
        default: "—",
        note: {
          es: "Se dispara con el envío del formulario, no en cada pulsación.",
          ja: "入力のたびではなく、フォーム送信時に呼ばれます。",
          en: "Fires on form submission, not on every keystroke.",
        },
      },
    ],
    a11y: {
      es: [
        "El bloque usa el elemento <search> con aria-label, de modo que se anuncia como región de búsqueda.",
        "El selector y el campo tienen etiquetas asociadas; el placeholder no es la única pista.",
        "El botón de envío conserva su nombre accesible aunque el texto se oculte en móvil.",
        "El foco visible usa el contorno del sistema con offset de 1 px en selector, campo y botón.",
      ],
      ja: [
        "ブロックは aria-label 付きの <search> 要素なので、検索リージョンとして通知されます。",
        "セレクトと入力欄には関連付いたラベルがあり、プレースホルダーだけに頼りません。",
        "モバイルで文字を隠しても、送信ボタンのアクセシブル名は失われません。",
        "セレクト、入力欄、ボタンの可視フォーカスは 1 px オフセットのシステム輪郭を使います。",
      ],
      en: [
        "The block uses the <search> element with aria-label, so it is announced as a search region.",
        "The select and the input have associated labels; the placeholder is never the only hint.",
        "The submit button keeps its accessible name even when its text is visually hidden on mobile.",
        "Visible focus uses the system outline with a 1 px offset on select, input and button.",
      ],
    },
  },
  {
    slug: "notice-list",
    id: "C-043",
    category: "storefront",
    name: "NoticeList",
    jp: "お知らせ",
    description: {
      es: "Lista compacta de avisos con fecha, enlace opcional, etiqueta y un enlace final para ver todos. Incluye un estado vacío explícito.",
      ja: "日付、任意のリンク、タグ、そして「すべて見る」リンクを備えたコンパクトなお知らせ一覧です。空の状態も明示します。",
      en: "A compact announcement list with dates, optional links, tags and a closing link to view everything. It ships an explicit empty state.",
    },
    files: filesFor(patternFile("notice-list.tsx")),
    examples: [
      {
        id: "notices",
        title: {
          es: "Avisos con fecha y etiqueta",
          ja: "日付とタグ付きのお知らせ",
          en: "Dated notices with a tag",
        },
        description: {
          es: "Cada fila alinea la fecha en columna propia; el título puede ser enlace y la etiqueta refuerza el estado.",
          ja: "各行は日付を専用の列に揃えます。タイトルはリンクにでき、タグで状態を補います。",
          en: "Each row aligns the date in its own column; the title can link out and the tag reinforces the state.",
        },
        preview: (
          <div className="max-w-md">
            <NoticeList
              label="Notices"
              emptyLabel="No notices"
              moreLabel="View all notices"
              moreHref="#notices"
              notices={noticeItems}
            />
          </div>
        ),
        code: `<NoticeList
  label="Notices"
  emptyLabel="No notices"
  moreLabel="View all notices"
  moreHref="/notices"
  notices={[
    { id: "n1", date: "10/21", dateTime: "2026-10-21", title: "Autumn camera fair", href: "/news/1" },
    { id: "n2", date: "10/18", dateTime: "2026-10-18", title: "Repair centre closure" },
    {
      id: "n3",
      date: "10/15",
      dateTime: "2026-10-15",
      title: "5× points campaign",
      tag: <Badge tone="new" appearance="outline">New</Badge>,
    },
  ]}
/>`,
      },
      {
        id: "empty",
        title: { es: "Sin avisos", ja: "お知らせがない場合", en: "No notices" },
        description: {
          es: "Con la lista vacía se muestra emptyLabel en lugar del <ul>, sin dejar un contenedor mudo.",
          ja: "一覧が空のときは <ul> の代わりに emptyLabel を表示し、何もない領域を残しません。",
          en: "With an empty list, emptyLabel replaces the <ul> instead of leaving a silent container.",
        },
        preview: (
          <div className="max-w-md">
            <NoticeList label="Notices" emptyLabel="No notices at the moment" notices={[]} />
          </div>
        ),
        code: `<NoticeList
  label="Notices"
  emptyLabel="No notices at the moment"
  notices={[]}
/>`,
      },
    ],
    props: [
      {
        prop: "notices",
        type: "readonly NoticeItem[]",
        default: "—",
        note: {
          es: "Cada aviso lleva id, date, dateTime ISO, title y, si aplica, href y tag.",
          ja: "各項目は id、date、ISO の dateTime、title を持ち、必要なら href と tag を加えます。",
          en: "Each entry carries id, date, an ISO dateTime, title and, when needed, href and tag.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible de la lista de avisos.",
          ja: "お知らせ一覧のアクセシブル名です。",
          en: "Accessible name of the notice list.",
        },
      },
      {
        prop: "emptyLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto que reemplaza a la lista cuando no hay avisos.",
          ja: "お知らせがないときに一覧の代わりに表示する文言です。",
          en: "Text shown in place of the list when there are no notices.",
        },
      },
      {
        prop: "moreLabel",
        type: "string",
        default: "—",
        note: {
          es: "Requiere moreHref; sin ambos no se dibuja el enlace final.",
          ja: "moreHref とセットで使います。どちらか欠けると末尾リンクは描画されません。",
          en: "Requires moreHref; without both, the closing link is not drawn.",
        },
      },
      {
        prop: "moreHref",
        type: "string",
        default: "—",
        note: {
          es: "Destino del enlace «ver todos».",
          ja: "「すべて見る」リンクの遷移先です。",
          en: "Destination of the view-all link.",
        },
      },
    ],
    a11y: {
      es: [
        "La lista es un <ul> con aria-label; la fecha usa <time dateTime> para conservar el valor ISO.",
        "Los títulos enlazados son enlaces reales y se distinguen del texto plano también sin color.",
        "El estado vacío se comunica con texto, no solo por la ausencia de filas.",
      ],
      ja: [
        "一覧は aria-label 付きの <ul> で、日付は <time dateTime> により ISO 値を保持します。",
        "リンク付きのタイトルは実際のリンクで、色に頼らずに本文と区別できます。",
        "空の状態は行がないことだけでなく、テキストで伝えます。",
      ],
      en: [
        "The list is a <ul> with aria-label; dates use <time dateTime> so the ISO value survives.",
        "Linked titles are real links and stay distinguishable from plain text without relying on colour.",
        "The empty state is communicated in text, not just by the absence of rows.",
      ],
    },
  },
  {
    slug: "ranked-list",
    id: "C-044",
    category: "storefront",
    name: "RankedList",
    jp: "ランキング",
    description: {
      es: "Ranking ordenado con número, miniatura opcional, enlace, precio y categoría. Las tres primeras posiciones se destacan sin depender solo del color.",
      ja: "順位、任意のサムネイル、リンク、価格、カテゴリーを持つランキングです。上位3件は色だけに頼らず強調されます。",
      en: "An ordered ranking with position, optional thumbnail, link, price and category. The top three are highlighted without relying on colour alone.",
    },
    files: filesFor(patternFile("ranked-list.tsx")),
    examples: [
      {
        id: "best-sellers",
        title: { es: "Más vendidos", ja: "売れ筋", en: "Best sellers" },
        description: {
          es: "El orden lo da el <ol>; el número visible es decorativo y el enlace lo repite para lectores.",
          ja: "順序は <ol> が担います。可視の番号は装飾で、リンク内で読み上げ用に繰り返します。",
          en: "The <ol> carries the order; the visible number is decorative and the link repeats it for screen readers.",
        },
        preview: (
          <div className="max-w-md">
            <RankedList label="Best sellers" items={rankedItems} />
          </div>
        ),
        code: `<RankedList
  label="Best sellers"
  items={[
    {
      id: "r1",
      rank: 1,
      title: "HIKARI K-1",
      href: "/products/k-1",
      price: "¥58,300",
      meta: "Cameras",
      image: { src: "/images/k-1.jpg", alt: "HIKARI K-1 camera" },
    },
    {
      id: "r2",
      rank: 2,
      title: "HIKARI 35mm f/2.8",
      href: "/products/35mm",
      price: "¥32,400",
      meta: "Lenses",
    },
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "items",
        type: "readonly RankedListItem[]",
        default: "—",
        note: {
          es: "Cada item define rank, title, href, price y, opcionalmente, meta e image.",
          ja: "各項目は rank、title、href、price を持ち、任意で meta と image を加えます。",
          en: "Each item defines rank, title, href, price and, optionally, meta and image.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible de la lista ordenada.",
          ja: "順序付きリストのアクセシブル名です。",
          en: "Accessible name of the ordered list.",
        },
      },
    ],
    a11y: {
      es: [
        "El orden real vive en <ol>; el número pintado lleva aria-hidden y se repite en el enlace con sr-only.",
        "Las miniaturas son opcionales y siempre llevan alt descriptivo; si no aportan, se omiten.",
        "Precio y categoría son texto, no una imagen ni un color de fondo.",
      ],
      ja: [
        "実際の順序は <ol> が持ち、描画された番号は aria-hidden で、リンク内に sr-only で繰り返します。",
        "サムネイルは任意で、必ず説明的な alt を持ちます。意味がなければ省略します。",
        "価格とカテゴリーは画像や背景色ではなくテキストです。",
      ],
      en: [
        "The real order lives in the <ol>; the painted number is aria-hidden and repeated inside the link with sr-only text.",
        "Thumbnails are optional and always carry descriptive alt text; when they add nothing, leave them out.",
        "Price and category are text, not an image or a background colour.",
      ],
    },
  },
  {
    slug: "product-card",
    id: "C-045",
    category: "storefront",
    name: "ProductCard",
    jp: "商品カード",
    description: {
      es: "Tarjeta de producto con imagen, título enlazado, valoración opcional, precio, puntos y badges. La valoración se formatea con el provider.",
      ja: "画像、リンク付きタイトル、任意の評価、価格、ポイント、バッジを持つ商品カードです。評価は provider の書式に従います。",
      en: "A product tile with image, linked title, optional rating, price, points and badges. The rating is formatted through the provider.",
    },
    requirements: [
      {
        kind: "provider",
        label: {
          es: "KotenProvider para la valoración",
          ja: "評価の書式に KotenProvider",
          en: "KotenProvider for the rating",
        },
        detail: {
          es: "El valor y el número de reseñas se formatean con useKotenFormatters. Envuelve la página en KotenProvider para que los separadores y el idioma coincidan con el resto de la tienda.",
          ja: "評価値とレビュー件数は useKotenFormatters で整形されます。ページを KotenProvider で包み、区切り文字と言語をストア全体に揃えてください。",
          en: "The rating value and review count are formatted with useKotenFormatters. Wrap the page in KotenProvider so separators and language match the rest of the store.",
        },
      },
    ],
    files: filesFor(patternFile("product-card.tsx")),
    examples: [
      {
        id: "cards",
        title: {
          es: "Tarjeta simple y tarjeta con valoración",
          ja: "基本カードと評価付きカード",
          en: "Plain card and rated card",
        },
        description: {
          es: "Los badges se colocan sobre la imagen; la valoración combina estrellas decorativas con el número real.",
          ja: "バッジは画像の上に重なり、評価は装飾の星と実際の数値を組み合わせます。",
          en: "Badges sit over the image; the rating pairs decorative stars with the real number.",
        },
        preview: (
          <div className="grid max-w-xl gap-[var(--koten-gap)] sm:grid-cols-2">
            <ProductCard
              href="#product-card"
              title="HIKARI 35mm f/2.8"
              image={{ src: placeholder("lens"), alt: "HIKARI 35 mm lens" }}
              price="¥32,400"
              points="324 points"
              meta="Prime lens"
            />
            <ProductCard
              href="#product-card"
              title="HIKARI K-1 silver"
              image={{ src: placeholder("camera"), alt: "HIKARI K-1 camera in silver" }}
              price="¥58,300"
              points="583 points"
              meta="Limited colour"
              badges={
                <Badge tone="sale" appearance="solid">
                  Limited
                </Badge>
              }
              rating={{ value: 4.6, count: 128, label: "reviews" }}
            />
          </div>
        ),
        code: `<ProductCard
  href="/products/35mm"
  title="HIKARI 35mm f/2.8"
  image={{ src: "/images/35mm.jpg", alt: "HIKARI 35 mm lens" }}
  price="¥32,400"
  points="324 points"
  meta="Prime lens"
/>

<ProductCard
  href="/products/k-1-silver"
  title="HIKARI K-1 silver"
  image={{ src: "/images/k-1.jpg", alt: "HIKARI K-1 camera in silver" }}
  price="¥58,300"
  points="583 points"
  meta="Limited colour"
  badges={<Badge tone="sale" appearance="solid">Limited</Badge>}
  rating={{ value: 4.6, count: 128, label: "reviews" }}
/>`,
      },
    ],
    props: [
      {
        prop: "href",
        type: "string",
        default: "—",
        note: {
          es: "Destino del título; toda la tarjeta no es un enlace para no anidar elementos interactivos.",
          ja: "タイトルの遷移先です。操作要素の入れ子を避けるため、カード全体はリンクにしません。",
          en: "Destination of the title; the whole card is not a link, to avoid nested interactive elements.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Nombre visible y enlace real de la tarjeta.",
          ja: "カードの可視タイトルであり、実際のリンクです。",
          en: "Visible name and the card's real link.",
        },
      },
      {
        prop: "image",
        type: "{ src: string; alt: string; width?: number; height?: number }",
        default: "400 × 300",
        note: {
          es: "La imagen mantiene 4:3; alt describe el producto, no el archivo.",
          ja: "画像は 4:3 を保ちます。alt はファイル名ではなく商品を説明します。",
          en: "The image keeps a 4:3 ratio; alt describes the product, not the file.",
        },
      },
      {
        prop: "price",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Precio principal; usa cifras tabulares y el color primario del tema.",
          ja: "主要価格です。等幅数字とテーマのプライマリ色を使います。",
          en: "Main price; uses tabular figures and the theme primary colour.",
        },
      },
      {
        prop: "points",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Puntos de fidelidad opcionales, siempre con la unidad escrita.",
          ja: "任意のポイント表示です。単位を必ず文字で添えます。",
          en: "Optional loyalty points, always with the unit written out.",
        },
      },
      {
        prop: "badges",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se superpone a la imagen en la esquina inicial.",
          ja: "画像の開始側の角に重ねて表示します。",
          en: "Overlaid on the image at the start corner.",
        },
      },
      {
        prop: "rating",
        type: "{ value: number; count: number; label: string }",
        default: "—",
        note: {
          es: "Estrellas decorativas más valor y número formateados por el provider.",
          ja: "装飾の星に加え、provider が整形した評価値と件数を表示します。",
          en: "Decorative stars plus value and count formatted by the provider.",
        },
      },
    ],
    a11y: {
      es: [
        "La tarjeta es un <article> y el título es el único enlace, con foco visible.",
        "La valoración muestra el número y la unidad en texto; las estrellas llevan aria-hidden.",
        "Los badges añaden palabras, no solo color, y no tapan el texto alternativo de la imagen.",
        "El alt de la imagen describe el producto; si la imagen es decorativa, la tarjeta debe seguir siendo comprensible sin ella.",
      ],
      ja: [
        "カードは <article> で、タイトルだけがリンクであり、フォーカスが視認できます。",
        "評価は数値と単位をテキストで示し、星は aria-hidden です。",
        "バッジは色だけでなく言葉を加え、画像の代替テキストを覆いません。",
        "画像の alt は商品を説明します。装飾的な場合は、画像なしでもカードが理解できる必要があります。",
      ],
      en: [
        "The card is an <article> and the title is the only link, with a visible focus ring.",
        "The rating shows the number and unit as text; stars are aria-hidden.",
        "Badges add words, not just colour, and never cover the image's alternative text.",
        "The image alt describes the product; if the image is decorative, the card must still make sense without it.",
      ],
    },
  },
  {
    slug: "price-block",
    id: "C-046",
    category: "storefront",
    name: "PriceBlock",
    jp: "価格",
    description: {
      es: "Jerarquía de precio: importe actual, impuestos, precio anterior, puntos, stock y nota. Dos tamaños para ficha de producto y listados.",
      ja: "現在価格、税、通常価格、ポイント、在庫、注記をまとめた価格表示です。商品ページ用と一覧用の2サイズがあります。",
      en: "Price hierarchy: current amount, tax, previous price, points, stock and a note. Two sizes for product pages and listings.",
    },
    files: filesFor(patternFile("price-block.tsx")),
    examples: [
      {
        id: "sale",
        title: { es: "Precio de campaña", ja: "キャンペーン価格", en: "Campaign price" },
        description: {
          es: "El precio anterior se mantiene visible y tachado; el stock y la nota añaden contexto sin competir con el importe.",
          ja: "通常価格は取り消し線付きで残します。在庫と注記は金額を邪魔せず文脈を補います。",
          en: "The previous price stays visible with a strike-through; stock and note add context without competing with the amount.",
        },
        preview: (
          <div className="max-w-sm">
            <PriceBlock
              price="¥52,470"
              taxLabel="Tax included"
              listPrice="¥58,300"
              listPriceLabel="List price"
              saleLabel="Autumn fair"
              points="524 points"
              stock={{ label: "In stock", tone: "success" }}
              note="Prices include tax. While stock lasts."
            />
          </div>
        ),
        code: `<PriceBlock
  price="¥52,470"
  taxLabel="Tax included"
  listPrice="¥58,300"
  listPriceLabel="List price"
  saleLabel="Autumn fair"
  points="524 points"
  stock={{ label: "In stock", tone: "success" }}
  note="Prices include tax. While stock lasts."
/>`,
      },
      {
        id: "compact",
        title: { es: "Tamaño compacto", ja: "コンパクトサイズ", en: "Compact size" },
        description: {
          es: 'size="md" reduce el importe para tarjetas y listados; el resto de la jerarquía se mantiene.',
          ja: 'size="md" はカードや一覧向けに金額を小さくします。その他の階層は変わりません。',
          en: 'size="md" shrinks the amount for cards and listings; the rest of the hierarchy stays the same.',
        },
        preview: (
          <div className="max-w-sm">
            <PriceBlock
              price="¥9,800"
              size="md"
              taxLabel="Tax included"
              points="98 points"
              stock={{ label: "Low stock", tone: "warning" }}
            />
          </div>
        ),
        code: `<PriceBlock
  price="¥9,800"
  size="md"
  taxLabel="Tax included"
  points="98 points"
  stock={{ label: "Low stock", tone: "warning" }}
/>`,
      },
    ],
    props: [
      {
        prop: "price",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Importe actual; llega ya formateado (formatCurrency) para no mezclar moneda y locale.",
          ja: "現在の金額です。通貨とロケールを混在させないよう、formatCurrency で整形して渡します。",
          en: "Current amount; pass it already formatted (formatCurrency) so currency and locale stay in sync.",
        },
      },
      {
        prop: "taxLabel",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Aclaración de impuestos junto al importe; no se deduce del contexto.",
          ja: "金額の隣に税の扱いを明示します。文脈から推測させません。",
          en: "Tax clarification next to the amount; it is never left to context.",
        },
      },
      {
        prop: "listPrice",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Precio anterior tachado; acompáñalo de listPriceLabel para darle significado.",
          ja: "取り消し線付きの通常価格です。listPriceLabel と組み合わせて意味を持たせます。",
          en: "Previous price with a strike-through; pair it with listPriceLabel to give it meaning.",
        },
      },
      {
        prop: "saleLabel",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Badge de campaña sobre el precio, en tono sale.",
          ja: "価格の上に表示するキャンペーンバッジです。sale トーンを使います。",
          en: "Campaign badge above the price, in the sale tone.",
        },
      },
      {
        prop: "points",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Puntos ganados, con la unidad incluida en el texto.",
          ja: "獲得ポイントです。単位を文字に含めて渡します。",
          en: "Earned points, with the unit included in the text.",
        },
      },
      {
        prop: "stock",
        type: '{ label: ReactNode; tone: "success" | "warning" | "danger" }',
        default: "—",
        note: {
          es: "El tono colorea el badge; la palabra del label es la que informa.",
          ja: "トーンはバッジの色を決め、情報は label の言葉が担います。",
          en: "The tone colours the badge; the label word carries the information.",
        },
      },
      {
        prop: "size",
        type: "md | lg",
        default: "lg",
        note: {
          es: "lg para ficha de producto, md para tarjetas y tablas.",
          ja: "商品ページは lg、カードや表では md を使います。",
          en: "lg for product pages, md for cards and tables.",
        },
      },
      {
        prop: "note",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Nota legal o logística bajo el bloque, en texto pequeño y legible.",
          ja: "ブロック下部の法務・配送注記です。小さくても読める文字で表示します。",
          en: "Legal or shipping note under the block, in small but readable text.",
        },
      },
    ],
    a11y: {
      es: [
        "Todos los importes son texto con cifras tabulares, nunca una imagen.",
        "El precio anterior se marca con line-through y con la etiqueta «precio anterior», no solo visualmente.",
        "El stock comunica con palabra y punto de color; el color no es el único portador.",
        "La nota mantiene el tamaño mínimo de 12 px y contraste suficiente sobre el fondo.",
      ],
      ja: [
        "金額はすべて等幅数字のテキストで、画像ではありません。",
        "通常価格は取り消し線と「通常価格」というラベルの両方で示し、見た目だけに頼りません。",
        "在庫は言葉と色の点で伝え、色だけを情報源にしません。",
        "注記は最小 12 px を保ち、背景に対して十分なコントラストを持ちます。",
      ],
      en: [
        "Every amount is text with tabular figures, never an image.",
        "The previous price is marked with line-through and a list-price label, not by styling alone.",
        "Stock communicates through a word and a coloured dot; colour is never the only carrier.",
        "The note keeps the 12 px minimum and enough contrast against the background.",
      ],
    },
  },
  {
    slug: "spec-table",
    id: "C-047",
    category: "storefront",
    name: "SpecTable",
    jp: "仕様表",
    description: {
      es: "Tablas de especificaciones agrupadas por sección, con encabezados de fila y desplazamiento horizontal accesible por teclado.",
      ja: "セクションごとにまとめた仕様表です。行見出しを持ち、キーボードで操作できる横スクロール領域を備えます。",
      en: "Specification tables grouped by section, with row headers and a keyboard-accessible horizontal scroll region.",
    },
    files: filesFor(patternFile("spec-table.tsx")),
    examples: [
      {
        id: "groups",
        title: {
          es: "Grupos de especificaciones",
          ja: "仕様のグループ",
          en: "Specification groups",
        },
        description: {
          es: "Cada grupo abre con su título y una tabla propia; el caption visible se reserva al contexto y la tabla recibe uno oculto.",
          ja: "各グループは見出しと専用の表を持ちます。可視のキャプションは文脈に任せ、表には非表示のキャプションを渡します。",
          en: "Each group opens with its title and its own table; the visible caption sets context while the table gets a hidden one.",
        },
        preview: (
          <div className="max-w-xl">
            <SpecTable caption="HIKARI K-1 specifications" groups={specGroups} />
          </div>
        ),
        code: `<SpecTable
  caption="HIKARI K-1 specifications"
  groups={[
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
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "groups",
        type: "readonly SpecGroup[]",
        default: "—",
        note: {
          es: "Cada grupo tiene id, title y rows con label y value.",
          ja: "各グループは id、title、そして label と value を持つ rows で構成します。",
          en: "Each group has id, title and rows with label and value.",
        },
      },
      {
        prop: "caption",
        type: "string",
        default: "—",
        note: {
          es: "Se combina con el título del grupo en un caption oculto para la tabla.",
          ja: "グループ見出しと結合され、表の非表示キャプションになります。",
          en: "Combined with the group title into a hidden caption for the table.",
        },
      },
    ],
    a11y: {
      es: [
        "Cada tabla tiene <caption> oculto que une el caption general y el título del grupo.",
        'Las etiquetas usan <th scope="row">; los valores quedan en celdas asociadas.',
        "El contenedor con scroll recibe tabIndex para poder desplazarse con teclado y muestra foco visible.",
        "No hay alturas fijas: el texto largo en JA/ES/EN puede crecer sin recortarse.",
      ],
      ja: [
        "各表には、全体のキャプションとグループ名を結ぶ非表示の <caption> があります。",
        '項目名は <th scope="row"> を使い、値は関連付いたセルに入ります。',
        "スクロール領域は tabIndex を持ち、キーボードで移動でき、フォーカスが視認できます。",
        "固定高さはなく、JA/ES/EN の長い文言も切れずに伸びます。",
      ],
      en: [
        "Each table has a hidden <caption> joining the overall caption and the group title.",
        'Labels use <th scope="row">; values live in the associated cells.',
        "The scroll container receives tabIndex so it can be scrolled by keyboard, and it shows a visible focus ring.",
        "Nothing has a fixed height, so long JA/ES/EN text grows without being clipped.",
      ],
    },
  },
  {
    slug: "campaign-banner",
    id: "C-048",
    category: "storefront",
    name: "CampaignBanner",
    jp: "キャンペーン",
    description: {
      es: "Aviso de campaña con antetítulo, título, descripción, fecha límite y llamada a la acción. Tres layouts y tres tonos semánticos.",
      ja: "アイブロウ、タイトル、説明、期限、CTA を備えたキャンペーン告知です。3つのレイアウトと3つの意味的トーンがあります。",
      en: "A campaign notice with eyebrow, title, description, deadline and call to action. Three layouts and three semantic tones.",
    },
    files: filesFor(patternFile("campaign-banner.tsx")),
    examples: [
      {
        id: "card",
        title: { es: "Tarjeta de campaña", ja: "カード型キャンペーン", en: "Campaign card" },
        description: {
          es: "El layout card encaja en una columna; el borde lateral y el antetítulo usan el tono sale.",
          ja: "card レイアウトは1カラムに収まります。側面のボーダーとアイブロウが sale トーンを使います。",
          en: "The card layout fits a column; the side border and eyebrow use the sale tone.",
        },
        preview: (
          <div className="max-w-md">
            <CampaignBanner
              eyebrow="Autumn fair"
              title="K-1 lens kit: ¥12,000 off"
              description="Until October 31. Double points on every lens."
              deadline="Until October 31"
              cta={{ label: "View the campaign", href: "#campaign" }}
            />
          </div>
        ),
        code: `<CampaignBanner
  eyebrow="Autumn fair"
  title="K-1 lens kit: ¥12,000 off"
  description="Until October 31. Double points on every lens."
  deadline="Until October 31"
  cta={{ label: "View the campaign", href: "/campaigns/autumn" }}
/>`,
      },
      {
        id: "hero",
        title: { es: "Hero informativo", ja: "情報系ヒーロー", en: "Informational hero" },
        description: {
          es: 'layout="hero" y tone="info" para anuncios de servicio; el CTA sigue siendo un enlace real.',
          ja: 'サービス告知には layout="hero" と tone="info" を使います。CTA は引き続き実際のリンクです。',
          en: 'layout="hero" with tone="info" for service announcements; the CTA is still a real link.',
        },
        preview: (
          <CampaignBanner
            layout="hero"
            tone="info"
            eyebrow="Store services"
            title="Free sensor cleaning in October"
            description="Book a slot at any HIKARI counter. One cleaning per camera."
            deadline="Book until October 30"
            cta={{ label: "Book a slot", href: "#booking" }}
          />
        ),
        code: `<CampaignBanner
  layout="hero"
  tone="info"
  eyebrow="Store services"
  title="Free sensor cleaning in October"
  description="Book a slot at any HIKARI counter. One cleaning per camera."
  deadline="Book until October 30"
  cta={{ label: "Book a slot", href: "/services/cleaning" }}
/>`,
      },
    ],
    props: [
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Título en serif; es el encabezado de la sección.",
          ja: "セリフ体の見出しで、セクションのヘッダーになります。",
          en: "Serif heading; it is the section heading.",
        },
      },
      {
        prop: "eyebrow",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Antetítulo corto que clasifica la campaña.",
          ja: "キャンペーンを分類する短いアイブロウです。",
          en: "Short eyebrow that classifies the campaign.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Condiciones breves; los detalles largos van en la página de la campaña.",
          ja: "簡潔な条件を書きます。詳細はキャンペーンページに委ねます。",
          en: "Brief terms; long details belong on the campaign page.",
        },
      },
      {
        prop: "deadline",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Fecha límite en texto tabular, independiente del idioma del documento.",
          ja: "期限は等幅数字のテキストで、文書の言語に依存しません。",
          en: "Deadline in tabular text, independent of the document language.",
        },
      },
      {
        prop: "cta",
        type: "{ label: string; href: string }",
        default: "—",
        note: {
          es: "Etiqueta y destino de un enlace real, no un botón sin acción.",
          ja: "実際のリンクのラベルと遷移先です。動作のないボタンにはしません。",
          en: "Label and destination of a real link, not an actionless button.",
        },
      },
      {
        prop: "tone",
        type: "sale | info | neutral",
        default: "sale",
        note: {
          es: "Cambia el borde y el antetítulo; el texto mantiene el contraste.",
          ja: "ボーダーとアイブロウの色を変えます。本文のコントラストは保たれます。",
          en: "Changes the border and eyebrow; body text keeps its contrast.",
        },
      },
      {
        prop: "layout",
        type: "strip | card | hero",
        default: "card",
        note: {
          es: "Ajusta padding y escala del título según el espacio disponible.",
          ja: "利用できる幅に応じて余白と見出しの大きさを調整します。",
          en: "Adjusts padding and heading scale to the available space.",
        },
      },
    ],
    a11y: {
      es: [
        "El banner es una <section> con encabezado propio, de modo que aparece en el índice de la página.",
        "La fecha límite y las condiciones van en texto; el color del borde solo refuerza.",
        "El CTA es un enlace con nombre visible y foco del sistema.",
      ],
      ja: [
        "バナーは固有の見出しを持つ <section> なので、ページのアウトラインに現れます。",
        "期限と条件はテキストで示し、ボーダー色は補助に留めます。",
        "CTA は可視名を持つリンクで、システムのフォーカスを表示します。",
      ],
      en: [
        "The banner is a <section> with its own heading, so it appears in the page outline.",
        "The deadline and terms are text; the border colour only reinforces them.",
        "The CTA is a link with a visible name and the system focus ring.",
      ],
    },
  },
  {
    slug: "store-header",
    id: "C-049",
    category: "storefront",
    name: "StoreHeader",
    jp: "店舗ヘッダー",
    description: {
      es: "Cabecera en dos niveles: franja de utilidad, marca con Hanko, búsqueda como slot, acciones y navegación con estado activo.",
      ja: "ユーティリティ帯、Hanko 付きブランド、スロットとしての検索、アクション、現在地を示すナビを備えた2段ヘッダーです。",
      en: "A two-tier header: utility strip, brand with Hanko, search as a slot, actions and navigation with an active state.",
    },
    files: filesFor(patternFile("store-header.tsx")),
    examples: [
      {
        id: "header",
        title: { es: "Cabecera completa", ja: "フルヘッダー", en: "Full header" },
        description: {
          es: "La búsqueda y las acciones se pasan como nodos; la marca combina el sello Hanko con el nombre en serif.",
          ja: "検索とアクションはノードとして渡します。ブランドは Hanko の印章とセリフ体の名前を組み合わせます。",
          en: "Search and actions arrive as nodes; the brand pairs the Hanko seal with a serif name.",
        },
        preview: (
          <div className="overflow-x-auto">
            <div className="min-w-[36rem]">
              <StoreHeader
                brand={{ name: "HIKARI", jp: "光", href: "#header", label: "HIKARI, home" }}
                utility={{ left: "Free shipping · Store pickup", right: "HIKARI ONLINE" }}
                search={
                  <SearchBar
                    label="Search products"
                    placeholder="Name, model or keyword"
                    categoriesLabel="Categories"
                    categories={searchCategories}
                    submitLabel="Search"
                  />
                }
                actions={
                  <>
                    <a
                      href="#account"
                      className="text-2xs text-muted underline-offset-2 hover:text-link hover:underline"
                    >
                      Account
                    </a>
                    <a
                      href="#cart"
                      className="inline-flex items-center gap-1 text-2xs text-muted underline-offset-2 hover:text-link hover:underline"
                    >
                      <svg
                        role="img"
                        aria-label="Cart"
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 4h2l2.4 10.2h10.9L21 7H6" />
                        <circle cx="9.5" cy="19" r="1.4" />
                        <circle cx="17.5" cy="19" r="1.4" />
                      </svg>
                      0 items
                    </a>
                  </>
                }
                navLabel="Categories"
                navItems={[
                  { id: "cameras", label: "Cameras", href: "#cameras", active: true },
                  { id: "lenses", label: "Lenses", href: "#lenses" },
                  { id: "audio", label: "Audio", href: "#audio" },
                  { id: "accessories", label: "Accessories", href: "#accessories" },
                ]}
                menuLabel="Menu"
              />
            </div>
          </div>
        ),
        code: `<StoreHeader
  brand={{ name: "HIKARI", jp: "光", href: "/", label: "HIKARI, home" }}
  utility={{ left: "Free shipping · Store pickup", right: "HIKARI ONLINE" }}
  search={
    <SearchBar
      label="Search products"
      placeholder="Name, model or keyword"
      categoriesLabel="Categories"
      categories={categories}
      submitLabel="Search"
    />
  }
  actions={<CartLink count={0} />}
  navLabel="Categories"
  navItems={categories}
  menuLabel="Menu"
/>`,
      },
    ],
    props: [
      {
        prop: "brand",
        type: "{ name: string; jp?: string; href: string; label: string }",
        default: "—",
        note: {
          es: "jp alimenta el Hanko y el nombre accesible del enlace de inicio.",
          ja: "jp は Hanko とホームリンクのアクセシブル名に使われます。",
          en: "jp feeds the Hanko and the accessible name of the home link.",
        },
      },
      {
        prop: "utility",
        type: "{ left: ReactNode; right?: ReactNode }",
        default: "—",
        note: {
          es: "Franja superior inversa para envío, recogida o avisos breves.",
          ja: "送料、店頭受け取り、短い告知のための反転ユーティリティ帯です。",
          en: "Inverted top strip for shipping, pickup or short notices.",
        },
      },
      {
        prop: "search",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Slot de búsqueda; en móvil baja a su propia línea.",
          ja: "検索のスロットです。モバイルでは独立した行に移動します。",
          en: "Search slot; on mobile it drops to its own row.",
        },
      },
      {
        prop: "actions",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Cuenta, carrito u otros enlaces; cada uno conserva su nombre accesible.",
          ja: "アカウント、カートなどのリンクです。それぞれがアクセシブル名を保ちます。",
          en: "Account, cart or other links; each one keeps its accessible name.",
        },
      },
      {
        prop: "navItems",
        type: "readonly StoreNavItem[]",
        default: "—",
        note: {
          es: "Cada item define id, label, href y, opcionalmente, active.",
          ja: "各項目は id、label、href を持ち、任意で active を指定します。",
          en: "Each item defines id, label, href and, optionally, active.",
        },
      },
      {
        prop: "navLabel",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del <nav> de categorías.",
          ja: "カテゴリーナビのアクセシブル名です。",
          en: "Accessible name of the category <nav>.",
        },
      },
      {
        prop: "menuLabel",
        type: "string",
        default: "—",
        note: {
          es: "Pista de menú que aparece solo en pantallas estrechas.",
          ja: "狭い画面でのみ表示されるメニューのヒントです。",
          en: "Menu hint shown on narrow screens only.",
        },
      },
    ],
    a11y: {
      es: [
        "El enlace de marca recibe un aria-label que une el sello japonés y la etiqueta descriptiva.",
        "La navegación es un <nav> con nombre y marca la página actual con aria-current.",
        "Los enlaces de categoría se desplazan en horizontal sin perder el foco visible.",
        "La búsqueda conserva su propio landmark y el slot de acciones no debe romper los nombres accesibles.",
      ],
      ja: [
        "ブランドリンクの aria-label は、日本語の印章と説明的なラベルを結合します。",
        "ナビは名前付きの <nav> で、現在のページを aria-current で示します。",
        "カテゴリーリンクは横スクロールしても可視フォーカスを失いません。",
        "検索は独自のランドマークを保ち、アクションスロットはアクセシブル名を壊しません。",
      ],
      en: [
        "The brand link gets an aria-label joining the Japanese seal and the descriptive label.",
        "Navigation is a named <nav> and marks the current page with aria-current.",
        "Category links scroll horizontally without losing the visible focus ring.",
        "Search keeps its own landmark and the actions slot must not break accessible names.",
      ],
    },
  },
  {
    slug: "footer",
    id: "C-050",
    category: "storefront",
    name: "Footer",
    jp: "フッター",
    description: {
      es: "Pie de página en cuatro columnas sobre fondo inverso, con bloque de empresa, enlaces legales y una nota final.",
      ja: "反転背景の上に4カラムを並べ、会社情報、法務リンク、注記をまとめたフッターです。",
      en: "A four-column footer on the inverse surface, with a company block, legal links and a closing note.",
    },
    files: filesFor(patternFile("footer.tsx")),
    examples: [
      {
        id: "columns",
        title: { es: "Cuatro columnas", ja: "4カラム", en: "Four columns" },
        description: {
          es: "Las columnas se apilan en móvil y se reparten en dos y cuatro a medida que crece el ancho.",
          ja: "カラムはモバイルで縦に積まれ、幅に応じて2列、4列へと広がります。",
          en: "Columns stack on mobile and spread to two and four as the width grows.",
        },
        preview: (
          <Footer
            navLabel="Footer links"
            columns={footerColumns}
            company="HIKARI Optical Co., Ltd."
            address="2-8-1 Ginza, Chūō-ku, Tokyo"
            legal={[
              { label: "Terms", href: "#terms" },
              { label: "Privacy", href: "#privacy" },
              { label: "Accessibility", href: "#accessibility" },
            ]}
            note="Prices include tax. Images are for reference."
          />
        ),
        code: `<Footer
  navLabel="Footer links"
  columns={[
    {
      id: "shop",
      title: "Shop",
      links: [
        { label: "Shipping & costs", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
    {
      id: "support",
      title: "Support",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ]}
  company="HIKARI Optical Co., Ltd."
  address="2-8-1 Ginza, Chūō-ku, Tokyo"
  legal={[
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Accessibility", href: "/accessibility" },
  ]}
  note="Prices include tax. Images are for reference."
/>`,
      },
    ],
    props: [
      {
        prop: "columns",
        type: "readonly FooterColumn[]",
        default: "—",
        note: {
          es: "Cada columna define id, title y una lista de enlaces con label y href.",
          ja: "各カラムは id、title、そして label と href を持つリンク一覧で構成します。",
          en: "Each column defines id, title and a list of links with label and href.",
        },
      },
      {
        prop: "company",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Razón social en el bloque inferior, en texto claro sobre el fondo inverso.",
          ja: "下部ブロックの会社名です。反転背景の上で明るい文字を使います。",
          en: "Company name in the lower block, in light text on the inverse surface.",
        },
      },
      {
        prop: "address",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Dirección opcional; si se omite, el bloque queda más compacto.",
          ja: "任意の住所です。省略すると下部ブロックがよりコンパクトになります。",
          en: "Optional address; when omitted, the lower block stays compact.",
        },
      },
      {
        prop: "legal",
        type: "readonly FooterLink[]",
        default: "—",
        note: {
          es: "Enlaces legales en línea, separados del bloque de empresa.",
          ja: "法務リンクを1行に並べ、会社情報ブロックと分けます。",
          en: "Legal links in a row, separated from the company block.",
        },
      },
      {
        prop: "note",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Nota de precios o imágenes, siempre en texto y con contraste suficiente.",
          ja: "価格や画像に関する注記です。必ずテキストで、十分なコントラストを保ちます。",
          en: "Price or image note, always in text with enough contrast.",
        },
      },
      {
        prop: "navLabel",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del <nav> que contiene las columnas.",
          ja: "カラムを含む <nav> のアクセシブル名です。",
          en: "Accessible name of the <nav> holding the columns.",
        },
      },
    ],
    a11y: {
      es: [
        "Las columnas viven en un <nav> con aria-label y cada una usa un encabezado de nivel 2.",
        "Los enlaces mantienen subrayado al pasar el cursor y el foco visible del sistema.",
        "El texto sobre el fondo inverso conserva contraste AA y no baja de 12 px.",
        "La nota final es texto real, no una imagen con condiciones legales.",
      ],
      ja: [
        "カラムは aria-label 付きの <nav> に入り、それぞれが見出しレベル2を持ちます。",
        "リンクはホバー時の下線と、システムの可視フォーカスを保ちます。",
        "反転背景上の文字は AA コントラストを保ち、12 px を下回りません。",
        "末尾の注記は実際のテキストで、条件を画像に閉じ込めません。",
      ],
      en: [
        "Columns live in a <nav> with aria-label and each one uses a level-2 heading.",
        "Links keep an underline on hover and the system's visible focus ring.",
        "Text on the inverse surface keeps AA contrast and never drops below 12 px.",
        "The closing note is real text, not an image holding legal conditions.",
      ],
    },
  },
  {
    slug: "product-gallery",
    id: "C-051",
    category: "storefront",
    name: "ProductGallery",
    jp: "ギャラリー",
    description: {
      es: "Imagen principal con miniaturas en cuatro columnas. Puede llevar su propio índice o recibirlo controlado desde la página.",
      ja: "4列のサムネイルを伴うメイン画像です。内部でインデックスを持つことも、ページから制御することもできます。",
      en: "A main image with four-column thumbnails. It can own its index or receive it controlled from the page.",
    },
    requirements: [
      {
        kind: "controlled",
        label: {
          es: "Selección controlada con activeIndex",
          ja: "activeIndex による制御選択",
          en: "Controlled selection with activeIndex",
        },
        detail: {
          es: "Pasa activeIndex junto a onIndexChange cuando la página decide la imagen activa, por ejemplo para sincronizar la URL o un panel de zoom. Sin activeIndex, la galería usa defaultIndex y gestiona su propio estado.",
          ja: "URL やズームパネルと同期するなど、ページが表示画像を決める場合は activeIndex と onIndexChange を渡します。activeIndex がない場合は defaultIndex を使い、内部で状態を管理します。",
          en: "Pass activeIndex with onIndexChange when the page decides the active image, for example to sync the URL or a zoom panel. Without activeIndex, the gallery uses defaultIndex and manages its own state.",
        },
      },
    ],
    files: filesFor(patternFile("product-gallery.tsx")),
    examples: [
      {
        id: "default-index",
        title: { es: "Índice inicial", ja: "初期インデックス", en: "Initial index" },
        description: {
          es: "Sin control externo, defaultIndex elige la imagen de apertura y las miniaturas actualizan el estado interno.",
          ja: "外部制御がない場合、defaultIndex が最初の画像を選び、サムネイルが内部状態を更新します。",
          en: "Without external control, defaultIndex picks the opening image and thumbnails update the internal state.",
        },
        preview: (
          <div className="max-w-md">
            <ProductGallery
              images={galleryImages}
              label="HIKARI K-1 gallery"
              defaultIndex={1}
              thumbLabel={(position, alt) => `${position + 1}. ${alt}`}
            />
          </div>
        ),
        code: `<ProductGallery
  images={images}
  label="HIKARI K-1 gallery"
  defaultIndex={1}
  thumbLabel={(position, alt) => position + 1 + ". " + alt}
/>`,
      },
      {
        id: "controlled",
        title: { es: "Selección controlada", ja: "制御された選択", en: "Controlled selection" },
        description: {
          es: "La página guarda el índice y lo comparte con la galería; un botón externo también puede avanzar la imagen.",
          ja: "ページがインデックスを保持してギャラリーと共有します。外部ボタンからも画像を進められます。",
          en: "The page stores the index and shares it with the gallery; an external button can advance the image too.",
        },
        preview: <ControlledGalleryDemo />,
        code: `const [index, setIndex] = useState(0);

<ProductGallery
  images={images}
  label="HIKARI K-1 gallery"
  activeIndex={index}
  onIndexChange={setIndex}
  thumbLabel={(position, alt) => position + 1 + ". " + alt}
/>

<button type="button" onClick={() => setIndex((current) => (current + 1) % images.length)}>
  Next image
</button>`,
      },
    ],
    props: [
      {
        prop: "images",
        type: "readonly ProductGalleryImage[]",
        default: "—",
        note: {
          es: "Cada imagen lleva src y alt; id, width y height son opcionales.",
          ja: "各画像は src と alt を持ち、id、width、height は任意です。",
          en: "Each image carries src and alt; id, width and height are optional.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Leyenda del fieldset de miniaturas, visible solo para lectores.",
          ja: "サムネイルの fieldset の凡例で、スクリーンリーダーにのみ見えます。",
          en: "Legend for the thumbnail fieldset, exposed to screen readers only.",
        },
      },
      {
        prop: "thumbLabel",
        type: "(index: number, alt: string) => string",
        default: "—",
        note: {
          es: "Construye el nombre accesible de cada miniatura.",
          ja: "各サムネイルのアクセシブル名を組み立てます。",
          en: "Builds the accessible name of each thumbnail.",
        },
      },
      {
        prop: "activeIndex",
        type: "number",
        default: "undefined",
        note: {
          es: "Activa el modo controlado; se recorta al rango de imágenes.",
          ja: "制御モードを有効にし、画像数の範囲に収められます。",
          en: "Enables controlled mode; it is clamped to the image range.",
        },
      },
      {
        prop: "defaultIndex",
        type: "number",
        default: "0",
        note: {
          es: "Índice inicial en modo no controlado.",
          ja: "非制御モードでの初期インデックスです。",
          en: "Initial index in uncontrolled mode.",
        },
      },
      {
        prop: "onIndexChange",
        type: "(index: number) => void",
        default: "—",
        note: {
          es: "Se llama al pulsar una miniatura, incluso en modo controlado.",
          ja: "制御モードでも、サムネイルを押すと呼ばれます。",
          en: "Called when a thumbnail is pressed, even in controlled mode.",
        },
      },
    ],
    a11y: {
      es: [
        "Las miniaturas son botones con aria-pressed, agrupados en un fieldset con leyenda oculta.",
        "La imagen principal lleva alt descriptivo; las miniaturas usan alt vacío porque el botón ya tiene nombre.",
        "Cada botón muestra foco visible y se activa con Enter o Espacio.",
        "Al cambiar de imagen no se mueve el foco; el estado se anuncia por el nombre y aria-pressed.",
      ],
      ja: [
        "サムネイルは aria-pressed を持つボタンで、非表示の凡例付き fieldset にまとめます。",
        "メイン画像には説明的な alt を付け、サムネイルはボタンが名前を持つため alt を空にします。",
        "各ボタンは可視フォーカスを示し、Enter または Space で動作します。",
        "画像を変えてもフォーカスは移動せず、状態は名前と aria-pressed で伝わります。",
      ],
      en: [
        "Thumbnails are buttons with aria-pressed, grouped in a fieldset with a hidden legend.",
        "The main image has descriptive alt text; thumbnails use empty alt because the button already has a name.",
        "Each button shows a visible focus ring and activates with Enter or Space.",
        "Changing the image does not move focus; state is conveyed by the name and aria-pressed.",
      ],
    },
  },
  {
    slug: "review-summary",
    id: "C-052",
    category: "storefront",
    name: "ReviewSummary",
    jp: "レビュー",
    description: {
      es: "Resumen de reseñas con promedio, distribución por estrellas y lista de opiniones. Incluye estado vacío y etiqueta de compra verificada.",
      ja: "平均、星ごとの分布、レビュー一覧をまとめた要約です。空の状態と購入済みラベルも備えます。",
      en: "A review summary with average, star distribution and the review list. It includes an empty state and a verified-purchase label.",
    },
    requirements: [
      {
        kind: "provider",
        label: {
          es: "KotenProvider para promedio y recuentos",
          ja: "平均と件数の書式に KotenProvider",
          en: "KotenProvider for the average and counts",
        },
        detail: {
          es: "El promedio se formatea con useKotenFormatters y las etiquetas de estrellas llegan por ratingLabel. Monta el bloque bajo KotenProvider para que los decimales y separadores sigan el idioma activo.",
          ja: "平均値は useKotenFormatters で整形し、星のラベルは ratingLabel から渡します。KotenProvider の下に置き、小数点と区切り文字を現在の言語に合わせてください。",
          en: "The average is formatted with useKotenFormatters and star labels come from ratingLabel. Mount the block under KotenProvider so decimals and separators follow the active language.",
        },
      },
    ],
    files: filesFor(patternFile("review-summary.tsx")),
    examples: [
      {
        id: "summary",
        title: { es: "Resumen completo", ja: "完全な要約", en: "Full summary" },
        description: {
          es: "La distribución usa barras con el recuento escrito al lado; cada reseña repite la valoración en texto.",
          ja: "分布はバーと並記した件数で示し、各レビューは評価をテキストでも繰り返します。",
          en: "The distribution uses bars with the count written alongside; each review repeats its rating in text.",
        },
        preview: (
          <ReviewSummary
            rating={4.6}
            count={128}
            ratingLabel={ratingLabel}
            countLabel={countLabel}
            distributionLabel="Distribution"
            distribution={reviewDistribution}
            verifiedLabel="Verified purchase"
            emptyLabel="No reviews yet"
            reviews={reviewItems}
          />
        ),
        code: `<ReviewSummary
  rating={4.6}
  count={128}
  ratingLabel={(value) => formatNumber(value, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " out of 5"}
  countLabel={(count) => count + " reviews"}
  distributionLabel="Distribution"
  distribution={[
    { stars: 5, count: 86 },
    { stars: 4, count: 28 },
    { stars: 3, count: 9 },
    { stars: 2, count: 3 },
    { stars: 1, count: 2 },
  ]}
  verifiedLabel="Verified purchase"
  emptyLabel="No reviews yet"
  reviews={reviews}
/>`,
      },
      {
        id: "empty",
        title: { es: "Sin reseñas", ja: "レビューがない場合", en: "No reviews" },
        description: {
          es: "Con reviews vacío se muestra emptyLabel; el panel de promedio sigue visible con cero estrellas.",
          ja: "reviews が空のときは emptyLabel を表示し、平均パネルは0星のまま残ります。",
          en: "With an empty reviews array, emptyLabel appears; the average panel stays visible with zero stars.",
        },
        preview: (
          <ReviewSummary
            rating={0}
            count={0}
            ratingLabel={ratingLabel}
            countLabel={countLabel}
            distributionLabel="Distribution"
            distribution={[
              { stars: 5, count: 0 },
              { stars: 4, count: 0 },
              { stars: 3, count: 0 },
              { stars: 2, count: 0 },
              { stars: 1, count: 0 },
            ]}
            verifiedLabel="Verified purchase"
            emptyLabel="No reviews yet. Be the first to write one."
            reviews={[]}
          />
        ),
        code: `<ReviewSummary
  rating={0}
  count={0}
  ratingLabel={(value) =>
    formatNumber(value, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " out of 5"
  }
  countLabel={(count) => count + " reviews"}
  distributionLabel="Distribution"
  distribution={[
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ]}
  verifiedLabel="Verified purchase"
  emptyLabel="No reviews yet. Be the first to write one."
  reviews={[]}
/>`,
      },
    ],
    props: [
      {
        prop: "rating",
        type: "number",
        default: "—",
        note: {
          es: "Promedio de 0 a 5; se muestra con un decimal y se redondea para las estrellas.",
          ja: "0〜5 の平均値です。小数1桁で表示し、星は四捨五入します。",
          en: "Average from 0 to 5; shown with one decimal and rounded for the stars.",
        },
      },
      {
        prop: "count",
        type: "number",
        default: "—",
        note: {
          es: "Total de reseñas, formateado por el provider.",
          ja: "レビュー総数で、provider により整形されます。",
          en: "Total review count, formatted by the provider.",
        },
      },
      {
        prop: "ratingLabel",
        type: "(rating: number) => string",
        default: "—",
        note: {
          es: "Frase que sustituye a las estrellas para lectores de pantalla.",
          ja: "スクリーンリーダー向けに星の代わりとなる文言です。",
          en: "Sentence that replaces the stars for screen readers.",
        },
      },
      {
        prop: "countLabel",
        type: "(count: number) => string",
        default: "—",
        note: {
          es: "Etiqueta del total de reseñas, con la unidad incluida.",
          ja: "レビュー総数のラベルで、単位を含めます。",
          en: "Label for the review total, including the unit.",
        },
      },
      {
        prop: "distribution",
        type: "readonly ReviewDistribution[]",
        default: "—",
        note: {
          es: "Pares de estrellas y recuento; las barras se calculan sobre el total.",
          ja: "星と件数の組です。バーは合計に対する比率で描画します。",
          en: "Star and count pairs; bars are calculated against the total.",
        },
      },
      {
        prop: "reviews",
        type: "readonly ReviewItem[]",
        default: "—",
        note: {
          es: "Cada reseña lleva id, author, date, rating, title, body y verified opcional.",
          ja: "各レビューは id、author、date、rating、title、body を持ち、任意で verified を加えます。",
          en: "Each review carries id, author, date, rating, title, body and an optional verified flag.",
        },
      },
      {
        prop: "verifiedLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto del badge de compra verificada; sin él, el badge no se dibuja.",
          ja: "購入済みバッジの文言です。渡さない場合は描画されません。",
          en: "Text for the verified-purchase badge; without it, the badge is not drawn.",
        },
      },
      {
        prop: "emptyLabel",
        type: "string",
        default: "—",
        note: {
          es: "Mensaje que ocupa el lugar de la lista cuando no hay reseñas.",
          ja: "レビューがないときに一覧の代わりに表示する文言です。",
          en: "Message shown in place of the list when there are no reviews.",
        },
      },
    ],
    a11y: {
      es: [
        "Las estrellas son decorativas para lectores; la frase de ratingLabel da el valor exacto.",
        "La distribución escribe el número de reseñas junto a cada barra, así que la longitud no es la única pista.",
        "La compra verificada se anuncia como badge con texto y no solo con un icono.",
        "El estado vacío es texto visible y no deja la región sin contenido.",
      ],
      ja: [
        "星はスクリーンリーダーにとって装飾で、ratingLabel の文言が正確な値を伝えます。",
        "分布は各バーの横に件数を書くため、長さだけが手がかりではありません。",
        "購入済みはアイコンだけでなく、テキスト付きバッジとして通知されます。",
        "空の状態は可視テキストで、領域を無内容のままにしません。",
      ],
      en: [
        "Stars are decorative for screen readers; the ratingLabel sentence carries the exact value.",
        "The distribution writes the review count next to each bar, so length is never the only cue.",
        "Verified purchase is announced as a badge with text, not an icon alone.",
        "The empty state is visible text and never leaves the region without content.",
      ],
    },
  },
];
