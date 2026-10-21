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

export function ComponentsIndexPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 部品"
        title="Componentes"
        jp="部品"
        description="La primera validación de la gramática: variantes CVA, roles semánticos y composición con render. Estos componentes fijan el tono del resto del sistema."
        meta="11 páginas · preview, props, código y a11y"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {components.map((component) => (
          <IndexCard key={component.to} {...component} />
        ))}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border border-rule bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        Cada página documenta anatomía, variantes, estados, props y notas de accesibilidad. Los
        demos de storefront y ERP consumirán exactamente estos componentes.
      </div>
    </div>
  );
}
