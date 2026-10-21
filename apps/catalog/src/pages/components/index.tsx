import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@koten/ui";
import { Link } from "react-router";
import { IndexCard, PageHeader } from "../../components/docs";

const components = [
  {
    to: "/components/button",
    title: "Button",
    jp: "ボタン",
    description: "Seis variantes, cuatro tamaños, loading y composición con render.",
  },
  {
    to: "/components/panel",
    title: "Panel",
    jp: "枠",
    description: "Cabecera, cuerpo y pie; tonos plain, tinted y accent; flush para tablas.",
  },
  {
    to: "/components/badge",
    title: "Badge",
    jp: "印",
    description: "Siete tonos, tres apariencias y punto decorativo de estado.",
  },
  {
    to: "/components/forms",
    title: "Formularios base",
    jp: "入力",
    description: "Field, Label, Input, Textarea y FormRow con errores y estados.",
  },
  {
    to: "/components/inputs",
    title: "Inputs avanzados",
    jp: "入力部品",
    description: "Select, Combobox, Checkbox, RadioGroup, Switch y NumberField.",
  },
  {
    to: "/components/surfaces",
    title: "Superficies y decorativos",
    jp: "装飾",
    description: "SectionHeader, Rule, Hanko, Tategaki y Pattern.",
  },
  {
    to: "/components/feedback",
    title: "Feedback",
    jp: "通知",
    description: "Alert, Toast, Progress, Meter, Skeleton y EmptyState.",
  },
  {
    to: "/components/navigation",
    title: "Navegación",
    jp: "導線",
    description: "Link, Breadcrumb, Pagination, Tabs y Accordion.",
  },
  {
    to: "/components/overlays",
    title: "Overlays",
    jp: "重なり",
    description: "Dialog, Drawer, Menu, Popover y Tooltip.",
  },
  {
    to: "/components/data",
    title: "Datos",
    jp: "データ",
    description: "Table, DataTable, StatCard, Sparkline y BarChart.",
  },
  {
    to: "/components/controls",
    title: "Controles",
    jp: "操作",
    description: "IconButton, ToggleGroup y Toolbar.",
  },
] as const;

const inventory = [
  { id: "C-001", name: "Button", page: "Button", to: "/components/button" },
  { id: "C-002", name: "Panel", page: "Panel", to: "/components/panel" },
  { id: "C-003", name: "Badge", page: "Badge", to: "/components/badge" },
  { id: "C-004", name: "IconButton", page: "Controles", to: "/components/controls" },
  { id: "C-005", name: "Link", page: "Navegación", to: "/components/navigation" },
  { id: "C-006", name: "Field", page: "Formularios", to: "/components/forms" },
  { id: "C-007", name: "Input", page: "Formularios", to: "/components/forms" },
  { id: "C-008", name: "Textarea", page: "Formularios", to: "/components/forms" },
  { id: "C-009", name: "Select", page: "Inputs avanzados", to: "/components/inputs" },
  { id: "C-010", name: "Combobox", page: "Inputs avanzados", to: "/components/inputs" },
  { id: "C-011", name: "Checkbox", page: "Inputs avanzados", to: "/components/inputs" },
  { id: "C-012", name: "RadioGroup", page: "Inputs avanzados", to: "/components/inputs" },
  { id: "C-013", name: "Switch", page: "Inputs avanzados", to: "/components/inputs" },
  { id: "C-014", name: "NumberField", page: "Inputs avanzados", to: "/components/inputs" },
  { id: "C-015", name: "FormRow", page: "Formularios", to: "/components/forms" },
  { id: "C-016", name: "SectionHeader", page: "Superficies", to: "/components/surfaces" },
  { id: "C-017", name: "Rule", page: "Superficies", to: "/components/surfaces" },
  { id: "C-018", name: "Alert", page: "Feedback", to: "/components/feedback" },
  { id: "C-019", name: "Toast", page: "Feedback", to: "/components/feedback" },
  { id: "C-020", name: "Progress", page: "Feedback", to: "/components/feedback" },
  { id: "C-021", name: "Meter", page: "Feedback", to: "/components/feedback" },
  { id: "C-022", name: "Skeleton", page: "Feedback", to: "/components/feedback" },
  { id: "C-023", name: "EmptyState", page: "Feedback", to: "/components/feedback" },
  { id: "C-024", name: "Hanko", page: "Superficies", to: "/components/surfaces" },
  { id: "C-025", name: "Tategaki", page: "Superficies", to: "/components/surfaces" },
  { id: "C-026", name: "Pattern", page: "Superficies", to: "/components/surfaces" },
  { id: "C-027", name: "Breadcrumb", page: "Navegación", to: "/components/navigation" },
  { id: "C-028", name: "Pagination", page: "Navegación", to: "/components/navigation" },
  { id: "C-029", name: "Tabs", page: "Navegación", to: "/components/navigation" },
  { id: "C-030", name: "Accordion", page: "Navegación", to: "/components/navigation" },
  { id: "C-031", name: "Dialog", page: "Overlays", to: "/components/overlays" },
  { id: "C-032", name: "Drawer", page: "Overlays", to: "/components/overlays" },
  { id: "C-033", name: "Menu", page: "Overlays", to: "/components/overlays" },
  { id: "C-034", name: "Popover", page: "Overlays", to: "/components/overlays" },
  { id: "C-035", name: "Tooltip", page: "Overlays", to: "/components/overlays" },
  { id: "C-036", name: "Toolbar", page: "Controles", to: "/components/controls" },
  { id: "C-037", name: "Table", page: "Datos", to: "/components/data" },
  { id: "C-038", name: "DataTable", page: "Datos", to: "/components/data" },
  { id: "C-039", name: "StatCard", page: "Datos", to: "/components/data" },
  { id: "C-040", name: "Sparkline / BarChart", page: "Datos", to: "/components/data" },
  { id: "C-041", name: "ToggleGroup", page: "Controles", to: "/components/controls" },
  { id: "C-062", name: "Label", page: "Formularios", to: "/components/forms" },
] as const;

export function ComponentsIndexPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 部品"
        title="Componentes"
        jp="部品"
        description="La primera validación de la gramática: variantes CVA, roles semánticos y composición con render. Estos componentes fijan el tono del resto del sistema."
        meta="11 páginas · 42 primitivas documentadas · preview, props, código y a11y"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {components.map((component) => (
          <IndexCard key={component.to} {...component} />
        ))}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <h2 className="text-lg font-semibold">Inventario de primitivas</h2>
        <p className="mt-1 text-2xs text-faint">
          Todas las piezas de la fase 1, con su página de referencia y su ID estable.
        </p>
        <div className="mt-[var(--koten-gap)]">
          <Table>
            <TableCaption>Inventario de primitivas de la fase 1</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Componente</TableHead>
                <TableHead>Página</TableHead>
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
                  <TableCell className="text-2xs text-muted">{item.page}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border border-rule bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        Cada página documenta anatomía, variantes, estados, props y notas de accesibilidad. Los
        demos de storefront y ERP consumen exactamente estos componentes.{" "}
        <Link to="/patterns" className="font-semibold text-link underline-offset-2 hover:underline">
          Ver los 20 patrones →
        </Link>
      </div>
    </div>
  );
}
