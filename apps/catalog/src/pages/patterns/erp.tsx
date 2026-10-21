import {
  Breadcrumb,
  Button,
  DetailDrawer,
  DetailSection,
  Field,
  FilterBar,
  FormSection,
  Input,
  PageHeader as PatternPageHeader,
  Select,
  SideNav,
  StatusBadge,
  Timeline,
  TopBar,
} from "@koten/ui";
import { Code, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const navGroups = [
  {
    id: "operations",
    label: "Operación",
    items: [
      { id: "dashboard", label: "Dashboard", href: "#" },
      { id: "orders", label: "Pedidos", href: "#", active: true, count: 22 },
    ],
  },
  {
    id: "master",
    label: "Datos",
    items: [
      { id: "products", label: "Productos", href: "#" },
      { id: "inventory", label: "Inventario", href: "#", count: 4 },
      { id: "customers", label: "Clientes", href: "#" },
      { id: "reports", label: "Informes", href: "#" },
    ],
  },
];

export function ErpPatternsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patrones · 台帳"
        title="Patrones de ERP"
        jp="台帳"
        description="Las nueve piezas del backoffice KURA: shell, navegación lateral, topbar, cabecera de página, filtros, estados, formularios, timeline y drawer de detalle. La tabla es el centro; el color solo refuerza."
        meta="C-053 … C-061 · demo real en http://localhost:5175"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="shell"
          title="AppShell, SideNav y TopBar"
          jp="枠組み"
          meta="232 px + contenido; skip link"
        >
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-[232px_minmax(0,1fr)]">
            <div className="border border-rule bg-surface">
              <div className="flex h-12 items-center gap-2 border-b border-rule px-3">
                <span className="grid size-7 place-items-center border-2 border-primary font-serif text-sm leading-none text-primary">
                  倉
                </span>
                <span className="font-serif text-base font-semibold">KURA</span>
                <span className="ms-auto text-2xs text-faint">ERP</span>
              </div>
              <SideNav label="Navegación principal" groups={navGroups} />
            </div>
            <div className="min-w-0 border border-rule bg-surface">
              <TopBar
                left={
                  <span className="text-2xs text-muted">
                    KURA / <span className="font-semibold text-ink">Pedidos</span>
                  </span>
                }
                search={
                  <search aria-label="Buscar" className="flex border border-rule-strong bg-surface">
                    <label htmlFor="erp-demo-search" className="sr-only">
                      Buscar
                    </label>
                    <input
                      id="erp-demo-search"
                      type="search"
                      placeholder="Pedido, cliente o SKU"
                      className="h-[var(--koten-control-h)] w-full min-w-0 border-0 bg-transparent px-2 text-xs"
                    />
                  </search>
                }
                actions={<span className="text-2xs text-muted">ES · 日本語 · EN</span>}
              />
              <div className="p-3">
                <PatternPageHeader
                  breadcrumb={
                    <Breadcrumb
                      label="Migas de pan"
                      items={[{ label: "Inicio", href: "#" }, { label: "Pedidos" }]}
                    />
                  }
                  eyebrow="Ventas"
                  title="Pedidos"
                  description="Busca, filtra y procesa pedidos. Los filtros viven en la URL."
                  actions={
                    <Button variant="primary" size="sm">
                      + Nuevo pedido
                    </Button>
                  }
                />
                <p className="mt-2 text-2xs text-muted">
                  El shell de la demo usa 232 px de sidebar, topbar sticky y skip link. En mobile el
                  menú se pliega en el topbar.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="filters" title="FilterBar" jp="絞り込み" meta="Aplicar, limpiar y conteo">
          <FilterBar
            label="Filtros de pedidos"
            submitLabel="Aplicar filtros"
            resetLabel="Limpiar"
            resultLabel="132 pedidos"
          >
            <Field label="Buscar">
              <Input placeholder="Número, cliente o SKU" />
            </Field>
            <Select
              label="Estado"
              defaultValue="all"
              items={[
                { value: "all", label: "Todos los estados" },
                { value: "pending", label: "Pendiente" },
                { value: "preparing", label: "Preparando" },
                { value: "shipped", label: "Enviado" },
              ]}
            />
            <Select
              label="Almacén"
              defaultValue="all"
              items={[
                { value: "all", label: "Todos los almacenes" },
                { value: "tokyo", label: "Tokio" },
                { value: "osaka", label: "Osaka" },
                { value: "fukuoka", label: "Fukuoka" },
              ]}
            />
            <Select
              label="Periodo"
              defaultValue="all"
              items={[
                { value: "today", label: "Hoy" },
                { value: "week", label: "7 días" },
                { value: "month", label: "30 días" },
                { value: "all", label: "Todo" },
              ]}
            />
          </FilterBar>
        </Section>

        <Section id="status" title="StatusBadge" jp="状態" meta="Texto + punto; nunca solo color">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="pending" label="Pendiente" />
            <StatusBadge status="preparing" label="Preparando" />
            <StatusBadge status="shipped" label="Enviado" />
            <StatusBadge status="cancelled" label="Cancelado" />
            <StatusBadge status="returned" label="Devuelto" />
          </div>
        </Section>

        <Section id="timeline" title="Timeline" jp="履歴" meta="Eventos fechados del pedido">
          <div className="max-w-md">
            <Timeline
              label="Historial del pedido"
              emptyLabel="Sin eventos"
              events={[
                {
                  id: "e1",
                  time: "21/10 12:00",
                  dateTime: "2026-10-21T12:00:00.000Z",
                  title: "Pedido recibido",
                  description: "Registrado automáticamente por el sistema",
                  tone: "neutral",
                },
                {
                  id: "e2",
                  time: "21/10 12:25",
                  dateTime: "2026-10-21T12:25:00.000Z",
                  title: "Pago confirmado",
                  tone: "success",
                },
                {
                  id: "e3",
                  time: "22/10 15:00",
                  dateTime: "2026-10-22T15:00:00.000Z",
                  title: "Pedido enviado",
                  description: "Seguimiento KURA-100111",
                  tone: "info",
                },
              ]}
            />
          </div>
        </Section>

        <Section id="form" title="FormSection" jp="入力" meta="Fieldset, legend y grid">
          <FormSection title="Cliente" description="Datos de contacto y facturación" columns={2}>
            <Field label="Persona de contacto" required>
              <Input placeholder="Ej. Taro Yamada" />
            </Field>
            <Field label="Correo electrónico" required error="Escribe un correo válido.">
              <Input type="email" defaultValue="taro@" />
            </Field>
            <Field label="Teléfono">
              <Input type="tel" placeholder="03-5550-0101" />
            </Field>
            <Select
              label="Canal"
              defaultValue="web"
              items={[
                { value: "web", label: "Web" },
                { value: "store", label: "Tienda" },
                { value: "phone", label: "Teléfono" },
              ]}
            />
          </FormSection>
        </Section>

        <Section
          id="drawer"
          title="DetailDrawer"
          jp="詳細"
          meta="Foco gestionado y retorno al trigger"
        >
          <DetailDrawer
            trigger={<Button variant="secondary">Abrir detalle de pedido</Button>}
            title="Pedido KURA-10428"
            description="Detalle, líneas e historial del pedido."
            closeLabel="Cerrar detalle"
            status={<StatusBadge status="preparing" label="Preparando" />}
            summary={
              <div className="text-2xs text-muted">
                <p className="text-xs font-semibold text-ink">Yamada Shōji</p>
                <p>Yamada Tarō · Tokio</p>
              </div>
            }
            footer={
              <>
                <Button variant="secondary" size="sm">
                  Marcar preparando
                </Button>
                <Button variant="primary" size="sm">
                  Marcar enviado
                </Button>
              </>
            }
          >
            <DetailSection title="Cliente">
              <p className="text-2xs text-muted">taro.yamada@yamada.example · 03-5550-0101</p>
            </DetailSection>
            <DetailSection title="Líneas" meta="2 artículos">
              <div className="flex justify-between border border-rule px-2 py-1 text-2xs">
                <span>Objetivo HIKARI 35 mm f/2.8</span>
                <span className="tabular-nums">32.400 JPY</span>
              </div>
            </DetailSection>
            <DetailSection title="Historial">
              <p className="text-2xs text-muted">
                Pedido recibido · Pago confirmado · Preparación iniciada
              </p>
            </DetailSection>
          </DetailDrawer>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Composición copiable">
          <PropsTable
            caption="Props de los patrones de ERP"
            rows={[
              {
                prop: "AppShell",
                type: "{ brand, sidebar, sidebarLabel, topbar, skipLabel }",
                default: "—",
                note: "Sidebar de 232 px, topbar sticky y main con id.",
              },
              {
                prop: "SideNav",
                type: "{ groups, label, onNavigate, footer }",
                default: "—",
                note: "Estado activo con aria-current y barra primaria.",
              },
              {
                prop: "FilterBar",
                type: "{ label, onSubmit, onReset, resultLabel }",
                default: "—",
                note: "role=search y acciones primaria/secundaria.",
              },
              {
                prop: "DetailDrawer",
                type: "{ trigger, title, status, summary, footer }",
                default: "side=right",
                note: "Base UI devuelve el foco al trigger al cerrar.",
              },
              {
                prop: "StatusBadge",
                type: "{ status, label }",
                default: "—",
                note: "Mapa de tonos; el texto es obligatorio.",
              },
            ]}
          />
          <Code>{`<AppShell
  skipLabel="Saltar al contenido"
  sidebarLabel="Navegación principal"
  brand={<Brand />}
  sidebar={<SideNav groups={groups} label="Principal" onNavigate={navigate} />}
  topbar={<TopBar left={<Breadcrumb />} search={<GlobalSearch />} actions={<Actions />} />}
>
  <Routes>…</Routes>
</AppShell>

<DetailDrawer
  trigger={<Button aria-label={\`Abrir el pedido \${order.id}\`}>Ver</Button>}
  title={order.id}
  status={<StatusBadge status={order.status} label={statusLabel} />}
  footer={<OrderActions order={order} />}
>
  <DetailSection title="Cliente">…</DetailSection>
  <DetailSection title="Líneas">…</DetailSection>
  <DetailSection title="Historial"><Timeline events={events} /></DetailSection>
</DetailDrawer>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Teclado, foco y estado">
          <List
            label="Notas de accesibilidad de los patrones de ERP"
            items={[
              "El skip link es el primer foco y apunta al main.",
              "SideNav expone aria-current=page y mantiene el foco visible.",
              "El drawer atrapa el foco, cierra con Escape y lo devuelve al botón de la fila.",
              "La selección de la tabla se anuncia con aria-live; el count también es texto.",
              "StatusBadge usa punto decorativo + texto; nunca color solo.",
              "El formulario vincula errores con aria-invalid y aria-describedby.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
