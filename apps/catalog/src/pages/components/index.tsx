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

const componentRoutes = {
  button: { to: "/components/button", jp: "ボタン" },
  panel: { to: "/components/panel", jp: "枠" },
  badge: { to: "/components/badge", jp: "印" },
  forms: { to: "/components/forms", jp: "入力" },
  inputs: { to: "/components/inputs", jp: "入力部品" },
  surfaces: { to: "/components/surfaces", jp: "装飾" },
  feedback: { to: "/components/feedback", jp: "通知" },
  navigation: { to: "/components/navigation", jp: "導線" },
  overlays: { to: "/components/overlays", jp: "重なり" },
  data: { to: "/components/data", jp: "データ" },
  controls: { to: "/components/controls", jp: "操作" },
} as const;

type ComponentKey = keyof typeof componentRoutes;

const componentOrder: readonly ComponentKey[] = [
  "button",
  "panel",
  "badge",
  "forms",
  "inputs",
  "surfaces",
  "feedback",
  "navigation",
  "overlays",
  "data",
  "controls",
];

const inventory: readonly { id: string; name: string; page: ComponentKey; to: string }[] = [
  { id: "C-001", name: "Button", page: "button", to: "/components/button" },
  { id: "C-002", name: "Panel", page: "panel", to: "/components/panel" },
  { id: "C-003", name: "Badge", page: "badge", to: "/components/badge" },
  { id: "C-004", name: "IconButton", page: "controls", to: "/components/controls" },
  { id: "C-005", name: "Link", page: "navigation", to: "/components/navigation" },
  { id: "C-006", name: "Field", page: "forms", to: "/components/forms" },
  { id: "C-007", name: "Input", page: "forms", to: "/components/forms" },
  { id: "C-008", name: "Textarea", page: "forms", to: "/components/forms" },
  { id: "C-009", name: "Select", page: "inputs", to: "/components/inputs" },
  { id: "C-010", name: "Combobox", page: "inputs", to: "/components/inputs" },
  { id: "C-011", name: "Checkbox", page: "inputs", to: "/components/inputs" },
  { id: "C-012", name: "RadioGroup", page: "inputs", to: "/components/inputs" },
  { id: "C-013", name: "Switch", page: "inputs", to: "/components/inputs" },
  { id: "C-014", name: "NumberField", page: "inputs", to: "/components/inputs" },
  { id: "C-015", name: "FormRow", page: "forms", to: "/components/forms" },
  { id: "C-016", name: "SectionHeader", page: "surfaces", to: "/components/surfaces" },
  { id: "C-017", name: "Rule", page: "surfaces", to: "/components/surfaces" },
  { id: "C-018", name: "Alert", page: "feedback", to: "/components/feedback" },
  { id: "C-019", name: "Toast", page: "feedback", to: "/components/feedback" },
  { id: "C-020", name: "Progress", page: "feedback", to: "/components/feedback" },
  { id: "C-021", name: "Meter", page: "feedback", to: "/components/feedback" },
  { id: "C-022", name: "Skeleton", page: "feedback", to: "/components/feedback" },
  { id: "C-023", name: "EmptyState", page: "feedback", to: "/components/feedback" },
  { id: "C-024", name: "Hanko", page: "surfaces", to: "/components/surfaces" },
  { id: "C-025", name: "Tategaki", page: "surfaces", to: "/components/surfaces" },
  { id: "C-026", name: "Pattern", page: "surfaces", to: "/components/surfaces" },
  { id: "C-027", name: "Breadcrumb", page: "navigation", to: "/components/navigation" },
  { id: "C-028", name: "Pagination", page: "navigation", to: "/components/navigation" },
  { id: "C-029", name: "Tabs", page: "navigation", to: "/components/navigation" },
  { id: "C-030", name: "Accordion", page: "navigation", to: "/components/navigation" },
  { id: "C-031", name: "Dialog", page: "overlays", to: "/components/overlays" },
  { id: "C-032", name: "Drawer", page: "overlays", to: "/components/overlays" },
  { id: "C-033", name: "Menu", page: "overlays", to: "/components/overlays" },
  { id: "C-034", name: "Popover", page: "overlays", to: "/components/overlays" },
  { id: "C-035", name: "Tooltip", page: "overlays", to: "/components/overlays" },
  { id: "C-036", name: "Toolbar", page: "controls", to: "/components/controls" },
  { id: "C-037", name: "Table", page: "data", to: "/components/data" },
  { id: "C-038", name: "DataTable", page: "data", to: "/components/data" },
  { id: "C-039", name: "StatCard", page: "data", to: "/components/data" },
  { id: "C-040", name: "Sparkline / BarChart", page: "data", to: "/components/data" },
  { id: "C-041", name: "ToggleGroup", page: "controls", to: "/components/controls" },
  { id: "C-062", name: "Label", page: "forms", to: "/components/forms" },
];

const copy = {
  es: {
    eyebrow: "Componentes · 部品",
    title: "Componentes",
    description:
      "La primera validación de la gramática: variantes CVA, roles semánticos y composición con render. Estos componentes fijan el tono del resto del sistema.",
    meta: "11 páginas · 42 primitivas documentadas · preview, props, código y a11y",
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
    },
    inventory: {
      heading: "Inventario de primitivas",
      description: "Todas las piezas de la fase 1, con su página de referencia y su ID estable.",
      caption: "Inventario de primitivas de la fase 1",
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
    meta: "11ページ · 42のプリミティブ · プレビュー、props、コード、a11y",
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
    },
    inventory: {
      heading: "プリミティブ一覧",
      description: "フェーズ1のすべての部品。参照ページと安定したID付き。",
      caption: "フェーズ1のプリミティブ一覧",
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
    meta: "11 pages · 42 documented primitives · preview, props, code and a11y",
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
    },
    inventory: {
      heading: "Primitive inventory",
      description: "Every piece from phase 1, with its reference page and stable ID.",
      caption: "Phase 1 primitive inventory",
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
              {inventory.map((item) => (
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
