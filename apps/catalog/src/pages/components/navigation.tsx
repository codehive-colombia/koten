import { Accordion, Breadcrumb, Link as KotenLink, Pagination, Tabs } from "@koten/ui";
import { useState } from "react";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function NavigationPage() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 導線"
        title="Navegación"
        jp="導線"
        description="Link, Breadcrumb, Pagination, Tabs y Accordion ordenan el recorrido sin esconder contexto. El estado activo y la posición actual siempre son explícitos."
        meta="link · breadcrumb · pagination · tabs · accordion"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="link" title="Link" jp="リンク" meta="Interno, externo y subrayado">
          <Demo title="Enlaces">
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)] text-xs">
              <KotenLink href="/tokens">Tokens internos</KotenLink>
              <KotenLink href="https://example.com">Ejemplo externo</KotenLink>
              <KotenLink href="#link" showExternalIcon={false}>
                Sin icono externo
              </KotenLink>
            </div>
          </Demo>
        </Section>

        <Section id="breadcrumb" title="Breadcrumb" jp="パンくず" meta="Posición actual">
          <Demo title="Pedido KURA">
            <Breadcrumb
              label="Migas de pan"
              items={[
                { label: "Inicio", href: "/" },
                { label: "Pedidos", href: "/components/navigation" },
                { label: "KURA-0142" },
              ]}
            />
          </Demo>
        </Section>

        <Section id="pagination" title="Pagination" jp="ページ送り" meta="Compacta y accesible">
          <Demo title="12 páginas">
            <div className="grid gap-[var(--koten-gap)]">
              <Pagination
                page={page}
                pageCount={12}
                onPageChange={setPage}
                previousLabel="Anterior"
                nextLabel="Siguiente"
                navLabel="Paginación de pedidos"
                pageLabel={(value) => `Página ${value}`}
              />
              <p className="text-2xs text-faint">Página actual: {page}</p>
            </div>
          </Demo>
        </Section>

        <Section id="tabs" title="Tabs" jp="タブ" meta="Cambio de vista contextual">
          <Tabs
            label="Vista del pedido"
            defaultValue="summary"
            items={[
              {
                value: "summary",
                label: "Resumen",
                content: (
                  <p>
                    Cliente KURA Distribución, 12 líneas y entrega estimada para el 24 de octubre.
                  </p>
                ),
              },
              {
                value: "lines",
                label: "Líneas",
                content: <p>HIKARI K-1 × 3, KURA Cable × 2, Kit de limpieza × 1.</p>,
              },
              {
                value: "history",
                label: "Historial",
                content: <p>Creado el 21/10, preparado el 22/10, enviado el 23/10.</p>,
              },
            ]}
          />
        </Section>

        <Section id="accordion" title="Accordion" jp="折りたたみ" meta="Contenido secundario">
          <Accordion
            defaultValue="shipping"
            items={[
              {
                value: "shipping",
                title: "Envío y entrega",
                content:
                  "Salida desde Tokio en 24 horas. Entrega estándar en 3–5 días hábiles; express en 24–48 horas.",
              },
              {
                value: "returns",
                title: "Devoluciones",
                content:
                  "Aceptamos devoluciones dentro de 30 días con el embalaje original y la factura.",
              },
              {
                value: "warranty",
                title: "Garantía",
                content: "Cobertura de 24 meses para defectos de fabricación.",
              },
            ]}
          />
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Cinco piezas">
          <PropsTable
            caption="Props de navegación"
            rows={[
              {
                prop: "Link external",
                type: "boolean",
                default: "auto",
                note: "Detecta http(s) y agrega target/rel e icono.",
              },
              {
                prop: "Breadcrumb items",
                type: "{ label, href?, current? }[]",
                default: "—",
                note: "El último item es current si no se indica.",
              },
              {
                prop: "Pagination page / pageCount",
                type: "number",
                default: "—",
                note: "Controlada; el consumidor actualiza page.",
              },
              {
                prop: "Tabs items",
                type: "{ value, label, content }[]",
                default: "—",
                note: "Base UI gestiona tablist y paneles.",
              },
              {
                prop: "Accordion multiple",
                type: "boolean",
                default: "false",
                note: "Permite abrir más de una sección.",
              },
            ]}
          />
          <Code>{`<KotenLink href="https://example.com">Ejemplo</KotenLink>

<Breadcrumb label="Migas" items={breadcrumbItems} />

<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousLabel="Anterior"
  nextLabel="Siguiente"
  navLabel="Paginación"
/>

<Tabs label="Vista" items={tabs} />`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Contexto y teclado">
          <List
            label="Notas de accesibilidad de navegación"
            items={[
              "Breadcrumb usa nav + ol y marca el último item con aria-current=page.",
              "Pagination anuncia la página actual y deshabilita los extremos.",
              "Tabs expone tablist/tab/tabpanel y navegación por flechas desde Base UI.",
              "Accordion expone aria-expanded y conserva el foco en el trigger.",
              "Link externo agrega target y rel; el icono es decorativo.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
