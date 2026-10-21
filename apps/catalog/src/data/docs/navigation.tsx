import {
  Accordion,
  Breadcrumb,
  IconButton,
  Link,
  Pagination,
  Tabs,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@koten/ui";
import { Download, Filter, Grid2X2, List, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

function PaginationDemo() {
  const [page, setPage] = useState(5);

  return (
    <div className="grid gap-[var(--koten-gap)]">
      <Pagination
        page={page}
        pageCount={12}
        onPageChange={setPage}
        previousLabel="Previous"
        nextLabel="Next"
        navLabel="Order pages"
        pageLabel={(value) => `Page ${value}`}
      />
      <p className="text-2xs text-faint">Page {page} of 12</p>
    </div>
  );
}

function CompactPaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      pageCount={4}
      onPageChange={setPage}
      previousLabel="Previous"
      nextLabel="Next"
      navLabel="Invoice pages"
      pageLabel={(value) => `Page ${value}`}
    />
  );
}

function ControlledTabsDemo() {
  const [value, setValue] = useState("summary");

  return (
    <Tabs
      label="Order view"
      value={value}
      onValueChange={setValue}
      items={[
        {
          value: "summary",
          label: "Summary",
          content: <p>Customer KURA Distribution, 12 lines and delivery on October 24.</p>,
        },
        {
          value: "lines",
          label: "Lines",
          content: <p>HIKARI K-1 × 3, KURA Cable × 2, Cleaning kit × 1.</p>,
        },
        {
          value: "history",
          label: "History",
          content: <p>Created 10/21, prepared 10/22, shipped 10/23.</p>,
        },
      ]}
    />
  );
}

function AccordionDemo() {
  return (
    <Accordion
      defaultValue="shipping"
      items={[
        {
          value: "shipping",
          title: "Shipping and delivery",
          content:
            "Ships from Tokyo within 24 hours. Standard delivery in 3–5 business days; express in 24–48 hours.",
        },
        {
          value: "returns",
          title: "Returns",
          content: "We accept returns within 30 days with the original packaging and the invoice.",
        },
        {
          value: "warranty",
          title: "Warranty",
          content: "24-month coverage for manufacturing defects.",
        },
      ]}
    />
  );
}

function MultipleAccordionDemo() {
  return (
    <Accordion
      multiple
      defaultValue={["shipping", "returns"]}
      items={[
        {
          value: "shipping",
          title: "Shipping and delivery",
          content:
            "Ships from Tokyo within 24 hours. Standard delivery in 3–5 business days; express in 24–48 hours.",
        },
        {
          value: "returns",
          title: "Returns",
          content: "We accept returns within 30 days with the original packaging and the invoice.",
        },
        {
          value: "warranty",
          title: "Warranty",
          content: "24-month coverage for manufacturing defects.",
        },
      ]}
    />
  );
}

function ViewToggleDemo() {
  const [value, setValue] = useState<string[]>(["grid"]);

  return (
    <ToggleGroup
      label="Order view"
      value={value}
      onValueChange={setValue}
      items={[
        {
          value: "grid",
          label: "Grid",
          icon: <Grid2X2 className="size-3.5" aria-hidden="true" />,
        },
        {
          value: "list",
          label: "List",
          icon: <List className="size-3.5" aria-hidden="true" />,
        },
      ]}
    />
  );
}

function DensityToggleDemo() {
  const [value, setValue] = useState<string[]>(["compact", "default"]);

  return (
    <ToggleGroup
      label="Table density"
      multiple
      value={value}
      onValueChange={setValue}
      items={[
        { value: "compact", label: "Compact" },
        { value: "default", label: "Default" },
        { value: "comfortable", label: "Comfortable" },
      ]}
    />
  );
}

function ToolbarDemo() {
  return (
    <Toolbar label="Order actions">
      <ToolbarGroup label="View">
        <ToolbarButton label="Grid">
          <Grid2X2 className="size-4" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="List">
          <List className="size-4" aria-hidden="true" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup label="Data">
        <ToolbarButton label="Filter">
          <Filter className="size-4" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Download">
          <Download className="size-4" aria-hidden="true" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton label="Delete selection" className="text-danger">
        <Trash2 className="size-4" aria-hidden="true" />
      </ToolbarButton>
    </Toolbar>
  );
}

function VerticalToolbarDemo() {
  return (
    <Toolbar label="Order actions" orientation="vertical">
      <ToolbarButton label="Filter">
        <Filter className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Download">
        <Download className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Settings">
        <Settings className="size-4" aria-hidden="true" />
      </ToolbarButton>
    </Toolbar>
  );
}

export const navigationDocs: PrimitiveDoc[] = [
  {
    slug: "link",
    id: "C-005",
    name: "Link",
    jp: "リンク",
    description: {
      es: "El enlace es la unidad básica de navegación. Declara un href y decide si el destino es externo para abrir una pestaña nueva, añadir rel y mostrar un icono decorativo.",
      ja: "リンクはナビゲーションの基本単位です。href を宣言し、外部の行き先かどうかを判断して新しいタブで開き、rel と装飾アイコンを付けます。",
      en: "The link is the basic unit of navigation. It declares an href and decides whether the destination is external so it can open a new tab, add rel and show a decorative icon.",
    },
    files: filesFor(uiFile("link.tsx")),
    examples: [
      {
        id: "detection",
        title: {
          es: "Detección y variantes",
          ja: "自動判定とバリエーション",
          en: "Detection and variants",
        },
        description: {
          es: "Un href http(s) se abre en pestaña nueva con rel y icono; showExternalIcon oculta el icono sin cambiar el destino.",
          ja: "http(s) の href は rel とアイコン付きで新しいタブに開きます。showExternalIcon は移動先を変えずにアイコンだけを隠します。",
          en: "An http(s) href opens in a new tab with rel and an icon; showExternalIcon hides the icon without changing the destination.",
        },
        preview: (
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)] text-xs">
            <Link href="/tokens">Internal tokens</Link>
            <Link href="https://example.com">External example</Link>
            <Link href="https://example.com" showExternalIcon={false}>
              Without icon
            </Link>
          </div>
        ),
        code: `<Link href="/tokens">Internal tokens</Link>
<Link href="https://example.com">External example</Link>
<Link href="https://example.com" showExternalIcon={false}>
  Without icon
</Link>`,
      },
      {
        id: "in-prose",
        title: {
          es: "Dentro de un párrafo",
          ja: "文章中で",
          en: "Inside a paragraph",
        },
        description: {
          es: "El subrayado mantiene el enlace reconocible sin competir con el texto que lo rodea.",
          ja: "下線により、周囲の文章と競合せずにリンクだと分かります。",
          en: "The underline keeps the link recognizable without competing with the surrounding text.",
        },
        preview: (
          <p className="max-w-prose text-xs leading-relaxed text-muted">
            Read the <Link href="/docs/decisions">design decisions</Link> or open the{" "}
            <Link href="https://base-ui.com">Base UI reference</Link>.
          </p>
        ),
        code: `<p className="max-w-prose text-xs leading-relaxed text-muted">
  Read the <Link href="/docs/decisions">design decisions</Link> or open the{" "}
  <Link href="https://base-ui.com">Base UI reference</Link>.
</p>`,
      },
    ],
    props: [
      {
        prop: "href",
        type: "string",
        default: "—",
        note: {
          es: "Obligatorio. Si coincide con http(s) o //, el enlace se trata como externo.",
          ja: "必須。http(s) または // で始まる場合は外部リンクとして扱います。",
          en: "Required. When it matches http(s) or //, the link is treated as external.",
        },
      },
      {
        prop: "external",
        type: "boolean",
        default: "auto",
        note: {
          es: "Fuerza el modo externo; sin valor se detecta desde href.",
          ja: "外部扱いを強制します。未指定なら href から判定します。",
          en: "Forces external mode; when omitted it is detected from href.",
        },
      },
      {
        prop: "showExternalIcon",
        type: "boolean",
        default: "true",
        note: {
          es: "Muestra el icono solo en enlaces externos.",
          ja: "外部リンクのときだけアイコンを表示します。",
          en: "Shows the icon only on external links.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se combina con los estilos base sin reemplazarlos.",
          ja: "基本スタイルを置き換えずに追加します。",
          en: "Merges with the base styles instead of replacing them.",
        },
      },
    ],
    a11y: {
      es: [
        "El enlace se reconoce por subrayado y color; nunca solo por color.",
        "El texto describe el destino; evita etiquetas como «clic aquí».",
        'Los enlaces externos abren en pestaña nueva con rel="noreferrer" y añaden un icono aria-hidden.',
        "El foco visible usa un outline de 2 px con offset de 1 px sobre el token de foco.",
      ],
      ja: [
        "リンクは下線と色の両方で示し、色だけに頼りません。",
        "テキストは移動先を説明し、「こちら」のような表現を避けます。",
        '外部リンクは rel="noreferrer" を付けて新しいタブで開き、アイコンは aria-hidden にします。',
        "可視フォーカスはフォーカストークンに対する 2 px の outline と 1 px のオフセットで示します。",
      ],
      en: [
        "The link is recognized by underline and color; never by color alone.",
        "The text describes the destination; avoid labels such as “click here”.",
        'External links open in a new tab with rel="noreferrer" and add an aria-hidden icon.',
        "Visible focus uses a 2 px outline with a 1 px offset on the focus token.",
      ],
    },
  },
  {
    slug: "breadcrumb",
    id: "C-027",
    name: "Breadcrumb",
    jp: "パンくず",
    description: {
      es: "Muestra la ruta jerárquica hasta la página actual. El último elemento se marca como actual y los anteriores siguen siendo navegables.",
      ja: "現在のページに至る階層を表示します。最後の項目を現在位置として示し、それ以前の項目は引き続き移動できます。",
      en: "Shows the hierarchical path to the current page. The last item is marked as current while the earlier ones stay navigable.",
    },
    files: filesFor(uiFile("breadcrumb.tsx")),
    examples: [
      {
        id: "default",
        title: {
          es: "Ruta por defecto",
          ja: "既定のパス",
          en: "Default path",
        },
        description: {
          es: "El último elemento no necesita href: se dibuja como texto y recibe aria-current=page.",
          ja: "最後の項目に href は不要です。テキストとして描画され、aria-current=page を受け取ります。",
          en: "The last item needs no href: it renders as text and receives aria-current=page.",
        },
        preview: (
          <Breadcrumb
            label="Breadcrumb"
            items={[
              { label: "Home", href: "/" },
              { label: "Orders", href: "/orders" },
              { label: "KURA-0142" },
            ]}
          />
        ),
        code: `<Breadcrumb
  label="Breadcrumb"
  items={[
    { label: "Home", href: "/" },
    { label: "Orders", href: "/orders" },
    { label: "KURA-0142" },
  ]}
/>`,
      },
      {
        id: "separator",
        title: {
          es: "Separador personalizado",
          ja: "区切りの変更",
          en: "Custom separator",
        },
        description: {
          es: "separator acepta cualquier ReactNode; se mantiene decorativo y fuera del orden de foco.",
          ja: "separator は任意の ReactNode を受け取ります。装飾として扱われ、フォーカス順には入りません。",
          en: "separator accepts any ReactNode; it stays decorative and outside the focus order.",
        },
        preview: (
          <Breadcrumb
            label="Breadcrumb"
            separator="›"
            items={[
              { label: "Catalog", href: "/catalog" },
              { label: "HIKARI", href: "/catalog/hikari" },
              { label: "K-1 case" },
            ]}
          />
        ),
        code: `<Breadcrumb
  label="Breadcrumb"
  separator="›"
  items={[
    { label: "Catalog", href: "/catalog" },
    { label: "HIKARI", href: "/catalog/hikari" },
    { label: "K-1 case" },
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "items",
        type: "{ label, href?, current? }[]",
        default: "—",
        note: {
          es: "El último elemento es current si ningún item lo declara.",
          ja: "どの項目も指定しない場合、最後の項目が current になります。",
          en: "The last item is current when no item declares it.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del nav; se aplica como aria-label.",
          ja: "nav のアクセシブルな名前で、aria-label として適用されます。",
          en: "Accessible name of the nav; applied as aria-label.",
        },
      },
      {
        prop: "separator",
        type: "ReactNode",
        default: '"/"',
        note: {
          es: "Decorativo; se oculta a lectores de pantalla.",
          ja: "装飾用で、スクリーンリーダーには隠されます。",
          en: "Decorative; hidden from screen readers.",
        },
      },
      {
        prop: "onNavigate",
        type: "(href: string) => void",
        default: "—",
        note: {
          es: "Recibe clics simples en items con href; útil para el router.",
          ja: "href を持つ項目への通常クリックを受け取ります。ルーター連携に使います。",
          en: "Receives plain clicks on items with href; useful for a router.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al nav contenedor.",
          ja: "外側の nav に適用されます。",
          en: "Applied to the wrapping nav.",
        },
      },
    ],
    a11y: {
      es: [
        "El nav lleva aria-label desde label, de modo que se distingue de otras navegaciones.",
        'La lista usa ol y li; el último elemento recibe aria-current="page".',
        "Los separadores son decorativos: aria-hidden y fuera del orden de foco.",
        "onNavigate solo intercepta clics simples; con modificadores se respeta el comportamiento del navegador.",
      ],
      ja: [
        "nav は label を aria-label として持ち、他のナビゲーションと区別されます。",
        'リストは ol と li を使い、最後の項目に aria-current="page" が付きます。',
        "区切りは装飾で、aria-hidden かつフォーカス順の外にあります。",
        "onNavigate は通常クリックだけを横取りし、修飾キー付きではブラウザの動作を尊重します。",
      ],
      en: [
        "The nav takes its aria-label from label, so it is distinct from other navigation landmarks.",
        'The list uses ol and li; the last item receives aria-current="page".',
        "Separators are decorative: aria-hidden and outside the focus order.",
        "onNavigate only intercepts plain clicks; modified clicks keep the browser behavior.",
      ],
    },
  },
  {
    slug: "pagination",
    id: "C-028",
    name: "Pagination",
    jp: "ページ送り",
    description: {
      es: "Navegación controlada entre páginas numeradas. Compacta el rango con elipsis, anuncia la página actual y deshabilita los extremos.",
      ja: "番号付きページ間の制御されたページ送りです。範囲を省略記号で圧縮し、現在のページを通知して両端を無効化します。",
      en: "Controlled navigation between numbered pages. It compresses the range with an ellipsis, announces the current page and disables the ends.",
    },
    files: filesFor(uiFile("pagination.tsx")),
    examples: [
      {
        id: "range",
        title: {
          es: "Rango amplio",
          ja: "広い範囲",
          en: "Wide range",
        },
        description: {
          es: "Con 12 páginas se muestran los extremos, la actual y sus vecinas; el resto se resume con elipsis.",
          ja: "12ページでは両端、現在のページ、その前後を表示し、残りは省略記号にまとめます。",
          en: "With 12 pages the ends, the current page and its neighbours are shown; the rest collapses into an ellipsis.",
        },
        preview: <PaginationDemo />,
        code: `<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousLabel="Previous"
  nextLabel="Next"
  navLabel="Order pages"
  pageLabel={(value) => \`Page \${value}\`}
/>`,
      },
      {
        id: "compact",
        title: {
          es: "Rango corto",
          ja: "短い範囲",
          en: "Short range",
        },
        description: {
          es: "Con cuatro páginas no hay elipsis y el botón anterior empieza deshabilitado.",
          ja: "4ページでは省略記号はなく、前へボタンは最初から無効です。",
          en: "With four pages there is no ellipsis and the previous button starts disabled.",
        },
        preview: <CompactPaginationDemo />,
        code: `<Pagination
  page={page}
  pageCount={4}
  onPageChange={setPage}
  previousLabel="Previous"
  nextLabel="Next"
  navLabel="Invoice pages"
  pageLabel={(value) => \`Page \${value}\`}
/>`,
      },
    ],
    props: [
      {
        prop: "page",
        type: "number",
        default: "—",
        note: {
          es: "Página actual, base 1. Es un componente controlado.",
          ja: "1始まりの現在ページです。制御コンポーネントです。",
          en: "Current page, 1-based. The component is controlled.",
        },
      },
      {
        prop: "pageCount",
        type: "number",
        default: "—",
        note: {
          es: "Total de páginas; debe ser al menos 1.",
          ja: "総ページ数で、1以上である必要があります。",
          en: "Total number of pages; it must be at least 1.",
        },
      },
      {
        prop: "onPageChange",
        type: "(page: number) => void",
        default: "—",
        note: {
          es: "El consumidor actualiza page; no hay estado interno.",
          ja: "利用側が page を更新します。内部状態はありません。",
          en: "The consumer updates page; there is no internal state.",
        },
      },
      {
        prop: "previousLabel",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del botón anterior.",
          ja: "前へボタンのアクセシブルな名前です。",
          en: "Accessible name of the previous button.",
        },
      },
      {
        prop: "nextLabel",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del botón siguiente.",
          ja: "次へボタンのアクセシブルな名前です。",
          en: "Accessible name of the next button.",
        },
      },
      {
        prop: "navLabel",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del nav que envuelve la paginación.",
          ja: "ページ送りを包む nav のアクセシブルな名前です。",
          en: "Accessible name of the nav that wraps the pagination.",
        },
      },
      {
        prop: "pageLabel",
        type: "(page: number) => string",
        default: "String(page)",
        note: {
          es: "Nombre accesible de cada número de página.",
          ja: "各ページ番号のアクセシブルな名前です。",
          en: "Accessible name of each page number.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al nav; los botones conservan su tamaño de densidad.",
          ja: "nav に適用されます。ボタンのサイズは密度のままです。",
          en: "Applied to the nav; the buttons keep their density size.",
        },
      },
    ],
    a11y: {
      es: [
        "navLabel nombra la navegación y pageLabel nombra cada botón de página.",
        'La página actual usa aria-current="page", además de fondo y peso propios.',
        "Anterior y siguiente se deshabilitan en los extremos y sus iconos son decorativos.",
        "Las elipsis son aria-hidden; los botones mantienen el foco y el orden de tabulación.",
      ],
      ja: [
        "navLabel がナビゲーションを、pageLabel が各ページボタンを名付けます。",
        '現在のページは aria-current="page" に加え、背景と太さでも示します。',
        "前へと次へは両端で無効になり、アイコンは装飾です。",
        "省略記号は aria-hidden で、ボタンはフォーカスとタブ順を保ちます。",
      ],
      en: [
        "navLabel names the navigation and pageLabel names each page button.",
        'The current page uses aria-current="page", plus its own background and weight.',
        "Previous and next are disabled at the ends and their icons are decorative.",
        "Ellipses are aria-hidden; the buttons keep focus and tab order.",
      ],
    },
  },
  {
    slug: "tabs",
    id: "C-029",
    name: "Tabs",
    jp: "タブ",
    description: {
      es: "Cambia entre vistas del mismo contexto sin recargar la página. Base UI gestiona el tablist, los paneles y el foco con teclado.",
      ja: "同じ文脈の表示をページ遷移なしで切り替えます。tablist、パネル、キーボードフォーカスは Base UI が管理します。",
      en: "Switches between views of the same context without reloading. Base UI manages the tablist, the panels and keyboard focus.",
    },
    baseUi: "https://base-ui.com/react/components/tabs",
    files: filesFor(uiFile("tabs.tsx")),
    examples: [
      {
        id: "controlled",
        title: {
          es: "Vista controlada",
          ja: "制御された表示",
          en: "Controlled view",
        },
        description: {
          es: "El consumidor guarda el value; el panel visible se anuncia al cambiar de pestaña.",
          ja: "利用側が value を保持し、タブを切り替えると表示中のパネルが通知されます。",
          en: "The consumer holds the value; the visible panel is announced when the tab changes.",
        },
        preview: <ControlledTabsDemo />,
        code: `<Tabs
  label="Order view"
  value={value}
  onValueChange={setValue}
  items={[
    { value: "summary", label: "Summary", content: <p>Order summary</p> },
    { value: "lines", label: "Lines", content: <p>Order lines</p> },
    { value: "history", label: "History", content: <p>Order history</p> },
  ]}
/>`,
      },
      {
        id: "disabled",
        title: {
          es: "Pestaña deshabilitada",
          ja: "無効なタブ",
          en: "Disabled tab",
        },
        description: {
          es: "Base UI omite del teclado la pestaña disabled y mantiene navegable el resto.",
          ja: "Base UI は disabled のタブをキーボード操作から外し、他のタブは移動可能なままにします。",
          en: "Base UI skips the disabled tab from the keyboard and keeps the rest navigable.",
        },
        preview: (
          <Tabs
            label="Order view"
            defaultValue="summary"
            items={[
              {
                value: "summary",
                label: "Summary",
                content: <p>Customer KURA Distribution, 12 lines and delivery on October 24.</p>,
              },
              {
                value: "lines",
                label: "Lines",
                content: <p>HIKARI K-1 × 3, KURA Cable × 2, Cleaning kit × 1.</p>,
              },
              {
                value: "history",
                label: "History",
                content: <p>History is unavailable for this order.</p>,
                disabled: true,
              },
            ]}
          />
        ),
        code: `<Tabs
  label="Order view"
  defaultValue="summary"
  items={[
    { value: "summary", label: "Summary", content: <p>Order summary</p> },
    { value: "lines", label: "Lines", content: <p>Order lines</p> },
    {
      value: "history",
      label: "History",
      content: <p>History is unavailable for this order.</p>,
      disabled: true,
    },
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica como aria-label del tablist.",
          ja: "tablist の aria-label として適用されます。",
          en: "Applied as the aria-label of the tablist.",
        },
      },
      {
        prop: "items",
        type: "TabItem[]",
        default: "—",
        note: {
          es: "Cada item define value, label, content y disabled opcional.",
          ja: "各項目は value、label、content と任意の disabled を定義します。",
          en: "Each item defines value, label, content and an optional disabled.",
        },
      },
      {
        prop: "defaultValue",
        type: "string",
        default: "—",
        note: {
          es: "Valor inicial cuando el componente no se controla.",
          ja: "制御しない場合の初期値です。",
          en: "Initial value when the component is uncontrolled.",
        },
      },
      {
        prop: "value",
        type: "string",
        default: "—",
        note: {
          es: "Valor controlado; requiere onValueChange.",
          ja: "制御値です。onValueChange が必要です。",
          en: "Controlled value; requires onValueChange.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: string) => void",
        default: "—",
        note: {
          es: "Recibe el value de la pestaña activa.",
          ja: "アクティブなタブの value を受け取ります。",
          en: "Receives the value of the active tab.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al contenedor de Base UI.",
          ja: "Base UI のルートに適用されます。",
          en: "Applied to the Base UI root.",
        },
      },
    ],
    a11y: {
      es: [
        "label se convierte en el aria-label del tablist.",
        "Base UI expone tablist, tab y tabpanel, con roving tabindex y flechas, Inicio y Fin.",
        "El tab activo se marca con borde, peso y color; no depende solo del color.",
        "Una pestaña disabled se omite del teclado y no recibe foco.",
      ],
      ja: [
        "label は tablist の aria-label になります。",
        "Base UI が tablist、tab、tabpanel を公開し、ロービング tabindex と矢印キー、Home、End を提供します。",
        "アクティブなタブは境界線、太さ、色で示し、色だけに依存しません。",
        "disabled のタブはキーボードから除外され、フォーカスを受け取りません。",
      ],
      en: [
        "label becomes the aria-label of the tablist.",
        "Base UI exposes tablist, tab and tabpanel, with roving tabindex and the arrow, Home and End keys.",
        "The active tab is marked with a border, weight and color; it does not rely on color alone.",
        "A disabled tab is skipped from the keyboard and receives no focus.",
      ],
    },
  },
  {
    slug: "accordion",
    id: "C-030",
    name: "Accordion",
    jp: "アコーディオン",
    description: {
      es: "Agrupa contenido secundario en secciones que se abren y cierran. Puede mantener una sola sección abierta o varias a la vez.",
      ja: "補足コンテンツを開閉できるセクションにまとめます。同時に開くセクションを1つにも複数にもできます。",
      en: "Groups secondary content into sections that open and close. It can keep a single section open or several at once.",
    },
    baseUi: "https://base-ui.com/react/components/accordion",
    files: filesFor(uiFile("accordion.tsx")),
    examples: [
      {
        id: "single",
        title: {
          es: "Una sección a la vez",
          ja: "1つずつ開く",
          en: "One section at a time",
        },
        description: {
          es: "defaultValue abre envío; al abrir otra sección se cierra la anterior.",
          ja: "defaultValue で配送セクションを開きます。別のセクションを開くと前のものは閉じます。",
          en: "defaultValue opens shipping; opening another section closes the previous one.",
        },
        preview: <AccordionDemo />,
        code: `<Accordion
  defaultValue="shipping"
  items={[
    { value: "shipping", title: "Shipping and delivery", content: "Ships from Tokyo within 24 hours." },
    { value: "returns", title: "Returns", content: "Returns within 30 days." },
    { value: "warranty", title: "Warranty", content: "24-month coverage." },
  ]}
/>`,
      },
      {
        id: "multiple",
        title: {
          es: "Varias secciones",
          ja: "複数のセクション",
          en: "Several sections",
        },
        description: {
          es: "multiple permite mantener envío y devoluciones abiertos al mismo tiempo.",
          ja: "multiple を使うと、配送と返品を同時に開いたままにできます。",
          en: "multiple keeps shipping and returns open at the same time.",
        },
        preview: <MultipleAccordionDemo />,
        code: `<Accordion
  multiple
  defaultValue={["shipping", "returns"]}
  items={[
    { value: "shipping", title: "Shipping and delivery", content: "Ships from Tokyo within 24 hours." },
    { value: "returns", title: "Returns", content: "Returns within 30 days." },
    { value: "warranty", title: "Warranty", content: "24-month coverage." },
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "items",
        type: "AccordionItem[]",
        default: "—",
        note: {
          es: "Cada item define value, title, content y disabled opcional.",
          ja: "各項目は value、title、content と任意の disabled を定義します。",
          en: "Each item defines value, title, content and an optional disabled.",
        },
      },
      {
        prop: "defaultValue",
        type: "string | string[]",
        default: "—",
        note: {
          es: "Sección o secciones abiertas al iniciar.",
          ja: "初期状態で開くセクションです。",
          en: "Section or sections open on mount.",
        },
      },
      {
        prop: "value",
        type: "string | string[]",
        default: "—",
        note: {
          es: "Valor controlado; usa un array cuando multiple está activo.",
          ja: "制御値です。multiple のときは配列を使います。",
          en: "Controlled value; use an array when multiple is enabled.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: string | string[]) => void",
        default: "—",
        note: {
          es: "Devuelve string o string[] según multiple.",
          ja: "multiple に応じて string または string[] を返します。",
          en: "Returns string or string[] depending on multiple.",
        },
      },
      {
        prop: "multiple",
        type: "boolean",
        default: "false",
        note: {
          es: "Permite abrir varias secciones a la vez.",
          ja: "複数のセクションを同時に開けます。",
          en: "Allows several sections to be open at once.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al contenedor; los bordes separan las secciones.",
          ja: "コンテナに適用されます。区切り線がセクションを分けます。",
          en: "Applied to the container; borders separate the sections.",
        },
      },
    ],
    a11y: {
      es: [
        "Cada trigger es un button dentro de un header y expone aria-expanded y aria-controls.",
        "El foco permanece en el trigger después de abrir o cerrar.",
        "El chevron gira y el título cambia de color, así el estado no depende de un solo canal.",
        "El panel cerrado queda oculto para lectores de pantalla; el estado lo comunica el trigger.",
      ],
      ja: [
        "各トリガーは header 内の button で、aria-expanded と aria-controls を公開します。",
        "開閉後もフォーカスはトリガーに残ります。",
        "シェブロンが回転しタイトルの色も変わるため、状態が1つの手がかりだけに依存しません。",
        "閉じたパネルはスクリーンリーダーから隠され、状態はトリガーが伝えます。",
      ],
      en: [
        "Each trigger is a button inside a header and exposes aria-expanded and aria-controls.",
        "Focus stays on the trigger after opening or closing.",
        "The chevron rotates and the title changes color, so the state does not rely on a single cue.",
        "The closed panel is hidden from screen readers; the trigger communicates the state.",
      ],
    },
  },
  {
    slug: "icon-button",
    id: "C-004",
    name: "IconButton",
    jp: "アイコン",
    description: {
      es: "Botón cuadrado para una acción representada por un icono. Exige un nombre accesible porque el icono, por sí solo, no explica la acción.",
      ja: "アイコンで表す操作のための正方形ボタンです。アイコンだけでは操作を説明できないため、アクセシブルな名前が必須です。",
      en: "Square button for an action represented by an icon. It requires an accessible name because the icon alone does not explain the action.",
    },
    files: filesFor(uiFile("icon-button.tsx")),
    examples: [
      {
        id: "sizes",
        title: {
          es: "Tamaños y variantes",
          ja: "サイズとバリエーション",
          en: "Sizes and variants",
        },
        description: {
          es: "La altura sale de la densidad; sm, md y lg cambian el lado del cuadrado.",
          ja: "高さは密度から決まり、sm、md、lg が正方形の一辺を変えます。",
          en: "Height comes from density; sm, md and lg change the side of the square.",
        },
        preview: (
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
            <IconButton label="Download" variant="outline" size="sm">
              <Download className="size-3.5" aria-hidden="true" />
            </IconButton>
            <IconButton label="Download" variant="outline">
              <Download className="size-4" aria-hidden="true" />
            </IconButton>
            <IconButton label="Settings" variant="primary" size="lg">
              <Settings className="size-4" aria-hidden="true" />
            </IconButton>
            <IconButton label="Delete" variant="danger">
              <Trash2 className="size-4" aria-hidden="true" />
            </IconButton>
            <IconButton label="Delete" variant="ghost" disabled>
              <Trash2 className="size-4" aria-hidden="true" />
            </IconButton>
          </div>
        ),
        code: `<IconButton label="Download" variant="outline" size="sm">
  <Download className="size-3.5" aria-hidden="true" />
</IconButton>
<IconButton label="Download" variant="outline">
  <Download className="size-4" aria-hidden="true" />
</IconButton>
<IconButton label="Settings" variant="primary" size="lg">
  <Settings className="size-4" aria-hidden="true" />
</IconButton>
<IconButton label="Delete" variant="danger">
  <Trash2 className="size-4" aria-hidden="true" />
</IconButton>
<IconButton label="Delete" variant="ghost" disabled>
  <Trash2 className="size-4" aria-hidden="true" />
</IconButton>`,
      },
      {
        id: "render",
        title: {
          es: "Composición con render",
          ja: "render による合成",
          en: "Composition with render",
        },
        description: {
          es: "render dibuja un enlace con el mismo estilo; nativeButton=false evita un button anidado.",
          ja: "render は同じ見た目のリンクを描画します。nativeButton=false で button の入れ子を避けます。",
          en: "render draws a link with the same style; nativeButton=false avoids a nested button.",
        },
        preview: (
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
            <IconButton
              label="Open settings"
              variant="ghost"
              render={<a href="#icon-button" />}
              nativeButton={false}
            >
              <Settings className="size-4" aria-hidden="true" />
            </IconButton>
            <IconButton label="Filter orders" variant="outline">
              <Filter className="size-4" aria-hidden="true" />
            </IconButton>
          </div>
        ),
        code: `<IconButton
  label="Open settings"
  variant="ghost"
  render={<a href="/settings" />}
  nativeButton={false}
>
  <Settings className="size-4" aria-hidden="true" />
</IconButton>
<IconButton label="Filter orders" variant="outline">
  <Filter className="size-4" aria-hidden="true" />
</IconButton>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Obligatorio; es el nombre accesible y sustituye al texto visible.",
          ja: "必須です。アクセシブルな名前となり、可視テキストの代わりになります。",
          en: "Required; it is the accessible name and replaces visible text.",
        },
      },
      {
        prop: "size",
        type: "sm | md | lg",
        default: "md",
        note: {
          es: "Cuadrado; el lado y la altura salen de la densidad.",
          ja: "正方形で、一辺と高さは密度から決まります。",
          en: "Square; the side and height come from density.",
        },
      },
      {
        prop: "variant",
        type: "primary | secondary | outline | ghost | danger | link",
        default: "secondary",
        note: {
          es: "Los mismos roles semánticos que Button.",
          ja: "Button と同じ意味的役割です。",
          en: "The same semantic roles as Button.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Bloquea la acción y la saca del foco.",
          ja: "操作を止め、フォーカス対象から外します。",
          en: "Blocks the action and removes it from focus.",
        },
      },
      {
        prop: "loading",
        type: "boolean",
        default: "false",
        note: {
          es: "Muestra el spinner, anuncia aria-busy y deshabilita el botón.",
          ja: "スピナーを表示し、aria-busy を通知してボタンを無効化します。",
          en: "Shows the spinner, announces aria-busy and disables the button.",
        },
      },
      {
        prop: "render",
        type: "ReactElement | function",
        default: "—",
        note: {
          es: "Composición de Base UI; usa nativeButton={false} para enlaces.",
          ja: "Base UI の合成です。リンクには nativeButton={false} を使います。",
          en: "Base UI composition; use nativeButton={false} for links.",
        },
      },
    ],
    a11y: {
      es: [
        "label es obligatorio y se convierte en aria-label; el icono va aria-hidden.",
        "El foco y el estado disabled siguen las reglas de Button, con outline visible.",
        "loading añade aria-busy y deshabilita el botón mientras dura la acción.",
        "Para un estado de alternancia usa ToggleGroup, no un IconButton con estilo cambiado.",
      ],
      ja: [
        "label は必須で aria-label になり、アイコンは aria-hidden になります。",
        "フォーカスと disabled は Button と同じ規則に従い、outline を表示します。",
        "loading は aria-busy を追加し、処理中はボタンを無効化します。",
        "押下状態が必要な場合は、見た目だけ変えた IconButton ではなく ToggleGroup を使います。",
      ],
      en: [
        "label is required and becomes aria-label; the icon is aria-hidden.",
        "Focus and the disabled state follow the Button rules, with a visible outline.",
        "loading adds aria-busy and disables the button while the action runs.",
        "For a toggle state use ToggleGroup, not an IconButton with a restyled state.",
      ],
    },
  },
  {
    slug: "toggle-group",
    id: "C-041",
    name: "ToggleGroup",
    jp: "切替",
    description: {
      es: "Conjunto de opciones que permanecen presionadas, como la vista o la densidad. Funciona con selección única o múltiple y conserva el foco dentro del grupo.",
      ja: "表示や密度など、押下状態を保つ選択肢の集合です。単一選択と複数選択に対応し、フォーカスはグループ内に保ちます。",
      en: "A set of options that stay pressed, such as view or density. It supports single or multiple selection and keeps focus inside the group.",
    },
    baseUi: "https://base-ui.com/react/components/toggle-group",
    files: filesFor(uiFile("toggle-group.tsx")),
    examples: [
      {
        id: "single",
        title: {
          es: "Selección única",
          ja: "単一選択",
          en: "Single selection",
        },
        description: {
          es: "Vista de cuadrícula o lista; solo una opción queda presionada.",
          ja: "グリッド表示かリスト表示で、押下状態になるのは1つだけです。",
          en: "Grid or list view; only one option stays pressed.",
        },
        preview: <ViewToggleDemo />,
        code: `<ToggleGroup
  label="Order view"
  value={value}
  onValueChange={setValue}
  items={[
    { value: "grid", label: "Grid", icon: <Grid2X2 className="size-3.5" /> },
    { value: "list", label: "List", icon: <List className="size-3.5" /> },
  ]}
/>`,
      },
      {
        id: "multiple",
        title: {
          es: "Selección múltiple",
          ja: "複数選択",
          en: "Multiple selection",
        },
        description: {
          es: "Con multiple, varias opciones de densidad pueden permanecer presionadas.",
          ja: "multiple では、複数の密度オプションを同時に押下状態にできます。",
          en: "With multiple, several density options can stay pressed.",
        },
        preview: <DensityToggleDemo />,
        code: `<ToggleGroup
  label="Table density"
  multiple
  value={value}
  onValueChange={setValue}
  items={[
    { value: "compact", label: "Compact" },
    { value: "default", label: "Default" },
    { value: "comfortable", label: "Comfortable" },
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del grupo.",
          ja: "グループのアクセシブルな名前です。",
          en: "Accessible name of the group.",
        },
      },
      {
        prop: "items",
        type: "ToggleGroupItem[]",
        default: "—",
        note: {
          es: "Cada item define value, label, icon y disabled opcional.",
          ja: "各項目は value、label、icon と任意の disabled を定義します。",
          en: "Each item defines value, label, icon and an optional disabled.",
        },
      },
      {
        prop: "value",
        type: "readonly string[]",
        default: "—",
        note: {
          es: "Valores presionados en modo controlado.",
          ja: "制御モードで押下されている値です。",
          en: "Pressed values in controlled mode.",
        },
      },
      {
        prop: "defaultValue",
        type: "readonly string[]",
        default: "—",
        note: {
          es: "Valores iniciales en modo no controlado.",
          ja: "非制御モードの初期値です。",
          en: "Initial values in uncontrolled mode.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: string[]) => void",
        default: "—",
        note: {
          es: "Devuelve el array completo de valores presionados.",
          ja: "押下状態の値の配列全体を返します。",
          en: "Returns the full array of pressed values.",
        },
      },
      {
        prop: "multiple",
        type: "boolean",
        default: "false",
        note: {
          es: "Permite más de una opción presionada.",
          ja: "複数のオプションを同時に押下できます。",
          en: "Allows more than one option to stay pressed.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Deshabilita todas las opciones del grupo.",
          ja: "グループ内のすべてのオプションを無効にします。",
          en: "Disables every option in the group.",
        },
      },
      {
        prop: "orientation",
        type: "horizontal | vertical",
        default: "horizontal",
        note: {
          es: "Alinea el grupo y define el eje de las flechas.",
          ja: "グループを整列し、矢印キーの軸を決めます。",
          en: "Aligns the group and defines the arrow-key axis.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al contenedor del grupo.",
          ja: "グループのコンテナに適用されます。",
          en: "Applied to the group container.",
        },
      },
    ],
    a11y: {
      es: [
        "label nombra el grupo completo mediante aria-label.",
        "Cada opción expone aria-pressed; Base UI mueve el foco con las flechas.",
        "Las opciones con icono conservan su nombre en texto sr-only.",
        "El estado presionado cambia fondo, peso y color del texto, no solo el color.",
      ],
      ja: [
        "label は aria-label でグループ全体を名付けます。",
        "各オプションは aria-pressed を公開し、Base UI が矢印キーでフォーカスを移動します。",
        "アイコン付きのオプションも、sr-only のテキストで名前を保ちます。",
        "押下状態は背景、太さ、文字色を変え、色だけに依存しません。",
      ],
      en: [
        "label names the whole group through aria-label.",
        "Each option exposes aria-pressed; Base UI moves focus with the arrow keys.",
        "Options with an icon keep their name in sr-only text.",
        "The pressed state changes background, weight and text color, not color alone.",
      ],
    },
  },
  {
    slug: "toolbar",
    id: "C-036",
    name: "Toolbar",
    jp: "ツールバー",
    description: {
      es: "Agrupa acciones relacionadas en una fila o columna. Base UI aplica roving tabindex para que el teclado recorra la barra con las flechas.",
      ja: "関連する操作を行または列にまとめます。Base UI のロービング tabindex により、矢印キーでバー内を移動できます。",
      en: "Groups related actions in a row or column. Base UI applies roving tabindex so the keyboard moves through the bar with the arrow keys.",
    },
    baseUi: "https://base-ui.com/react/components/toolbar",
    files: filesFor(uiFile("toolbar.tsx")),
    examples: [
      {
        id: "horizontal",
        title: {
          es: "Barra horizontal",
          ja: "横方向のバー",
          en: "Horizontal bar",
        },
        description: {
          es: "Grupos separados por reglas; cada botón lleva nombre accesible y el icono es decorativo.",
          ja: "区切り線でグループを分けます。各ボタンにはアクセシブルな名前があり、アイコンは装飾です。",
          en: "Groups separated by rules; each button has an accessible name and the icon is decorative.",
        },
        preview: <ToolbarDemo />,
        code: `<Toolbar label="Order actions">
  <ToolbarGroup label="View">
    <ToolbarButton label="Grid"><Grid2X2 /></ToolbarButton>
    <ToolbarButton label="List"><List /></ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarGroup label="Data">
    <ToolbarButton label="Filter"><Filter /></ToolbarButton>
    <ToolbarButton label="Download"><Download /></ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarButton label="Delete selection" className="text-danger">
    <Trash2 />
  </ToolbarButton>
</Toolbar>`,
      },
      {
        id: "vertical",
        title: {
          es: "Orientación vertical",
          ja: "縦方向",
          en: "Vertical orientation",
        },
        description: {
          es: "orientation vertical apila los controles y cambia el eje de las flechas.",
          ja: "orientation を vertical にするとコントロールが縦に並び、矢印キーの軸が変わります。",
          en: "A vertical orientation stacks the controls and changes the arrow-key axis.",
        },
        preview: <VerticalToolbarDemo />,
        code: `<Toolbar label="Order actions" orientation="vertical">
  <ToolbarButton label="Filter"><Filter /></ToolbarButton>
  <ToolbarButton label="Download"><Download /></ToolbarButton>
  <ToolbarButton label="Settings"><Settings /></ToolbarButton>
</Toolbar>`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible de la barra.",
          ja: "バーのアクセシブルな名前です。",
          en: "Accessible name of the bar.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Grupos, botones y separadores que forman la barra.",
          ja: "バーを構成するグループ、ボタン、区切りです。",
          en: "Groups, buttons and separators that make up the bar.",
        },
      },
      {
        prop: "orientation",
        type: "horizontal | vertical",
        default: "horizontal",
        note: {
          es: "Alinea los controles y define el eje de las flechas.",
          ja: "コントロールを整列し、矢印キーの軸を決めます。",
          en: "Aligns the controls and defines the arrow-key axis.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al contenedor de Base UI.",
          ja: "Base UI のルートに適用されます。",
          en: "Applied to the Base UI root.",
        },
      },
      {
        prop: "ToolbarGroup.label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del grupo interno.",
          ja: "内側のグループのアクセシブルな名前です。",
          en: "Accessible name of the inner group.",
        },
      },
      {
        prop: "ToolbarButton.label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del botón; el icono queda decorativo.",
          ja: "ボタンのアクセシブルな名前で、アイコンは装飾になります。",
          en: "Accessible name of the button; the icon becomes decorative.",
        },
      },
      {
        prop: "ToolbarButton.disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Excluye el botón de la interacción y del recorrido con flechas.",
          ja: "ボタンを操作対象と矢印キーの移動先から外します。",
          en: "Excludes the button from interaction and arrow-key traversal.",
        },
      },
    ],
    a11y: {
      es: [
        "label da nombre a la toolbar y ToolbarGroup.label a cada grupo.",
        "Base UI aplica roving tabindex: solo un control entra en el orden de tabulación.",
        "Las flechas recorren los controles en el eje de orientation.",
        "Los separadores no son enfocables y los iconos de los botones son decorativos.",
      ],
      ja: [
        "label がツールバーを、ToolbarGroup.label が各グループを名付けます。",
        "Base UI のロービング tabindex により、タブ順に入るコントロールは1つだけです。",
        "矢印キーは orientation の軸に沿ってコントロールを移動します。",
        "区切りはフォーカス対象ではなく、ボタンのアイコンは装飾です。",
      ],
      en: [
        "label names the toolbar and ToolbarGroup.label names each group.",
        "Base UI applies roving tabindex: only one control enters the tab order.",
        "The arrow keys move through the controls along the orientation axis.",
        "Separators are not focusable and the button icons are decorative.",
      ],
    },
  },
];
