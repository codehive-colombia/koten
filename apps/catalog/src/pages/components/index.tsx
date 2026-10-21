import {
  type KotenLocale,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useKoten,
} from "@koten/ui";
import { Link } from "react-router";
import { IndexCard, PageHeader } from "../../components/docs";
import { componentInventory, componentOrder, componentRoutes } from "../../data/inventory";

const copy = {
  es: {
    eyebrow: "Componentes · 部品",
    title: "Componentes",
    description:
      "La primera validación de la gramática: variantes CVA, roles semánticos y composición con render. Estos componentes fijan el tono del resto del sistema.",
    meta: "13 páginas · 45 primitivas documentadas · preview, props, código y a11y",
    cards: {
      button: {
        title: "Button",
        description: "Seis variantes, cuatro tamaños, loading y composición con render.",
      },
      panel: {
        title: "Panel",
        description: "Cabecera, cuerpo y pie; tonos plain, tinted y accent; flush para tablas.",
      },
      badge: {
        title: "Badge",
        description: "Siete tonos, tres apariencias y punto decorativo de estado.",
      },
      forms: {
        title: "Formularios base",
        description: "Field, Label, Input, Textarea y FormRow con errores y estados.",
      },
      inputs: {
        title: "Inputs avanzados",
        description: "Select, Combobox, Checkbox, RadioGroup, Switch y NumberField.",
      },
      surfaces: {
        title: "Superficies y decorativos",
        description: "SectionHeader, Rule, Hanko, Tategaki y Pattern.",
      },
      feedback: {
        title: "Feedback",
        description: "Alert, Toast, Progress, Meter, Skeleton y EmptyState.",
      },
      navigation: {
        title: "Navegación",
        description: "Link, Breadcrumb, Pagination, Tabs y Accordion.",
      },
      overlays: {
        title: "Overlays",
        description: "Dialog, Drawer, Menu, Popover y Tooltip.",
      },
      data: {
        title: "Datos",
        description: "Table, DataTable, StatCard, Sparkline y BarChart.",
      },
      controls: {
        title: "Controles",
        description: "IconButton, ToggleGroup y Toolbar.",
      },
      date: {
        title: "Fecha",
        description: "Calendar y DatePicker con teclado, rango y locale.",
      },
      command: {
        title: "CommandPalette",
        description: "Búsqueda global con combobox, listbox y foco atrapado.",
      },
    },
    pageLabels: {
      button: "Button",
      panel: "Panel",
      badge: "Badge",
      forms: "Formularios",
      inputs: "Inputs avanzados",
      surfaces: "Superficies",
      feedback: "Feedback",
      navigation: "Navegación",
      overlays: "Overlays",
      data: "Datos",
      controls: "Controles",
      date: "Fecha",
      command: "CommandPalette",
    },
    inventory: {
      heading: "Inventario de primitivas",
      description: "Todas las primitivas, con su página de referencia y su ID estable.",
      caption: "Inventario de primitivas",
      id: "ID",
      component: "Componente",
      page: "Página",
    },
    note: {
      body: "Cada página documenta anatomía, variantes, estados, props y notas de accesibilidad. Los demos de storefront y ERP consumen exactamente estos componentes.",
      link: "Ver los 20 patrones →",
    },
  },
  ja: {
    eyebrow: "コンポーネント · 部品",
    title: "コンポーネント",
    description:
      "文法の最初の検証：CVAのバリエーション、意味的役割、render による合成。これらのコンポーネントがシステム全体の調子を決める。",
    meta: "13ページ · 45のプリミティブ · プレビュー、props、コード、a11y",
    cards: {
      button: {
        title: "Button",
        description: "6つのバリエーション、4つのサイズ、ローディング、render による合成。",
      },
      panel: {
        title: "Panel",
        description: "ヘッダー、本文、フッター。plain・tinted・accent のトーン、表向けの flush。",
      },
      badge: {
        title: "Badge",
        description: "7つのトーン、3つの外観、状態を示す装飾ドット。",
      },
      forms: {
        title: "基本フォーム",
        description: "Field、Label、Input、Textarea、FormRow。エラーと状態付き。",
      },
      inputs: {
        title: "応用インプット",
        description: "Select、Combobox、Checkbox、RadioGroup、Switch、NumberField。",
      },
      surfaces: {
        title: "面と装飾",
        description: "SectionHeader、Rule、Hanko、Tategaki、Pattern。",
      },
      feedback: {
        title: "Feedback",
        description: "Alert、Toast、Progress、Meter、Skeleton、EmptyState。",
      },
      navigation: {
        title: "ナビゲーション",
        description: "Link、Breadcrumb、Pagination、Tabs、Accordion。",
      },
      overlays: {
        title: "Overlays",
        description: "Dialog、Drawer、Menu、Popover、Tooltip。",
      },
      data: {
        title: "データ",
        description: "Table、DataTable、StatCard、Sparkline、BarChart。",
      },
      controls: {
        title: "コントロール",
        description: "IconButton、ToggleGroup、Toolbar。",
      },
      date: {
        title: "日付",
        description: "Calendar と DatePicker。キーボード、範囲、ロケール。",
      },
      command: {
        title: "CommandPalette",
        description: "combobox・listbox・フォーカストラップ付きのグローバル検索。",
      },
    },
    pageLabels: {
      button: "Button",
      panel: "Panel",
      badge: "Badge",
      forms: "フォーム",
      inputs: "応用インプット",
      surfaces: "面",
      feedback: "Feedback",
      navigation: "ナビゲーション",
      overlays: "Overlays",
      data: "データ",
      controls: "コントロール",
      date: "日付",
      command: "コマンド",
    },
    inventory: {
      heading: "プリミティブ一覧",
      description: "すべてのプリミティブ。参照ページと安定したID付き。",
      caption: "プリミティブ一覧",
      id: "ID",
      component: "コンポーネント",
      page: "ページ",
    },
    note: {
      body: "各ページは構造、バリエーション、状態、props、アクセシビリティ注記を扱う。店舗とERPのデモはまさにこれらのコンポーネントを使う。",
      link: "20のパターンを見る →",
    },
  },
  en: {
    eyebrow: "Components · 部品",
    title: "Components",
    description:
      "The first validation of the grammar: CVA variants, semantic roles and composition with render. These components set the tone for the rest of the system.",
    meta: "13 pages · 45 documented primitives · preview, props, code and a11y",
    cards: {
      button: {
        title: "Button",
        description: "Six variants, four sizes, loading and composition with render.",
      },
      panel: {
        title: "Panel",
        description: "Header, body and footer; plain, tinted and accent tones; flush for tables.",
      },
      badge: {
        title: "Badge",
        description: "Seven tones, three appearances and a decorative state dot.",
      },
      forms: {
        title: "Base forms",
        description: "Field, Label, Input, Textarea and FormRow with errors and states.",
      },
      inputs: {
        title: "Advanced inputs",
        description: "Select, Combobox, Checkbox, RadioGroup, Switch and NumberField.",
      },
      surfaces: {
        title: "Surfaces & decoration",
        description: "SectionHeader, Rule, Hanko, Tategaki and Pattern.",
      },
      feedback: {
        title: "Feedback",
        description: "Alert, Toast, Progress, Meter, Skeleton and EmptyState.",
      },
      navigation: {
        title: "Navigation",
        description: "Link, Breadcrumb, Pagination, Tabs and Accordion.",
      },
      overlays: {
        title: "Overlays",
        description: "Dialog, Drawer, Menu, Popover and Tooltip.",
      },
      data: {
        title: "Data",
        description: "Table, DataTable, StatCard, Sparkline and BarChart.",
      },
      controls: {
        title: "Controls",
        description: "IconButton, ToggleGroup and Toolbar.",
      },
      date: {
        title: "Date",
        description: "Calendar and DatePicker with keyboard, range and locale.",
      },
      command: {
        title: "CommandPalette",
        description: "Global search with combobox, listbox and trapped focus.",
      },
    },
    pageLabels: {
      button: "Button",
      panel: "Panel",
      badge: "Badge",
      forms: "Forms",
      inputs: "Advanced inputs",
      surfaces: "Surfaces",
      feedback: "Feedback",
      navigation: "Navigation",
      overlays: "Overlays",
      data: "Data",
      controls: "Controls",
      date: "Date",
      command: "Command palette",
    },
    inventory: {
      heading: "Primitive inventory",
      description: "Every primitive, with its reference page and stable ID.",
      caption: "Primitive inventory",
      id: "ID",
      component: "Component",
      page: "Page",
    },
    note: {
      body: "Each page documents anatomy, variants, states, props and accessibility notes. The storefront and ERP demos consume exactly these components.",
      link: "See the 20 patterns →",
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function ComponentsIndexPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="部品"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {componentOrder.map((key) => (
          <IndexCard
            key={key}
            to={componentRoutes[key].to}
            jp={componentRoutes[key].jp}
            title={t.cards[key].title}
            description={t.cards[key].description}
          />
        ))}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <h2 className="text-lg font-semibold">{t.inventory.heading}</h2>
        <p className="mt-1 text-2xs text-faint">{t.inventory.description}</p>
        <div className="mt-[var(--koten-gap)]">
          <Table>
            <TableCaption>{t.inventory.caption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t.inventory.id}</TableHead>
                <TableHead>{t.inventory.component}</TableHead>
                <TableHead>{t.inventory.page}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-2xs text-faint">{item.id}</TableCell>
                  <TableCell>
                    <Link
                      to={item.to}
                      className="font-medium text-link underline-offset-2 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-2xs text-muted">{t.pageLabels[item.page]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border border-rule bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        {t.note.body}{" "}
        <Link to="/patterns" className="font-semibold text-link underline-offset-2 hover:underline">
          {t.note.link}
        </Link>
      </div>
    </div>
  );
}
