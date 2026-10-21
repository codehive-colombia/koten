import {
  Badge,
  Button,
  Panel,
  PanelActions,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function PanelPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 枠"
        title="Panel"
        jp="枠"
        description="La unidad básica de composición: cabecera tintada, cuerpo con padding de densidad y pie con acciones. El panel reemplaza la tarjeta decorativa."
        meta="header · body · footer · flush"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="composicion" title="Composición" jp="構成" meta="Dos paneles reales">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Panel>
              <PanelHeader>
                <PanelTitle as="h3">Pedidos de hoy</PanelTitle>
                <PanelActions>
                  <Badge tone="info" appearance="solid">
                    12
                  </Badge>
                </PanelActions>
              </PanelHeader>
              <PanelBody>
                <p className="text-xs text-muted">
                  Un panel con cabecera tintada, cuerpo con padding de densidad y acciones a la
                  derecha.
                </p>
                <dl className="mt-[var(--koten-gap)] grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-2xs">
                  <dt className="text-faint">Pendientes</dt>
                  <dd className="text-right font-semibold tabular-nums">4</dd>
                  <dt className="text-faint">Enviados</dt>
                  <dd className="text-right font-semibold tabular-nums">8</dd>
                </dl>
              </PanelBody>
              <PanelFooter>
                <Button size="sm" variant="outline">
                  Ver todos
                </Button>
              </PanelFooter>
            </Panel>

            <Panel tone="accent">
              <PanelHeader>
                <PanelTitle as="h3">Stock bajo</PanelTitle>
                <PanelActions>
                  <Badge tone="warning" dot>
                    Atención
                  </Badge>
                </PanelActions>
              </PanelHeader>
              <PanelBody flush>
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                      <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                        SKU
                      </th>
                      <th
                        scope="col"
                        className="px-[var(--koten-control-px)] text-right font-semibold"
                      >
                        Unidades
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {[
                      ["HK-001", "3"],
                      ["HK-014", "5"],
                      ["HK-022", "7"],
                    ].map(([sku, units]) => (
                      <tr key={sku} className="h-[var(--koten-row-h)]">
                        <th
                          scope="row"
                          className="px-[var(--koten-control-px)] font-mono text-2xs font-normal"
                        >
                          {sku}
                        </th>
                        <td className="px-[var(--koten-control-px)] text-right tabular-nums text-warning">
                          {units}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PanelBody>
              <PanelFooter>
                <Button size="sm" variant="primary">
                  Reabastecer
                </Button>
              </PanelFooter>
            </Panel>
          </div>
        </Section>

        <Section id="tonos" title="Tonos" jp="色調" meta="plain · tinted · accent">
          <Demo title="Tono tinted · sin acciones" className="bg-tint p-[var(--koten-panel-p)]">
            <Panel tone="tinted">
              <PanelHeader>
                <PanelTitle as="h3">Aviso del sistema</PanelTitle>
              </PanelHeader>
              <PanelBody>
                <p className="text-xs text-muted">
                  El tono tinted usa el fondo de cabecera para separar del papel sin agregar sombra.
                </p>
              </PanelBody>
            </Panel>
          </Demo>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="API de composición">
          <PropsTable
            caption="Props de Panel"
            rows={[
              {
                prop: "tone",
                type: "plain | tinted | accent",
                default: "plain",
                note: "accent agrega barra izquierda primaria de 3 px.",
              },
              {
                prop: "PanelBody flush",
                type: "boolean",
                default: "false",
                note: "Quita padding para tablas y listas a sangre.",
              },
              {
                prop: "PanelTitle as",
                type: "h2 | h3 | h4",
                default: "h2",
                note: "Elegir el nivel correcto según la jerarquía de la página.",
              },
            ]}
          />
          <Code>{`<Panel tone="accent">
  <PanelHeader>
    <PanelTitle as="h3">Pedidos de hoy</PanelTitle>
    <PanelActions><Badge tone="info" appearance="solid">12</Badge></PanelActions>
  </PanelHeader>
  <PanelBody flush>{tabla}</PanelBody>
  <PanelFooter><Button size="sm">Ver todos</Button></PanelFooter>
</Panel>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Estructura y lectura">
          <List
            label="Notas de accesibilidad de Panel"
            items={[
              "La cabecera usa <header> y el pie <footer>; el título mantiene nivel de heading.",
              "flush solo para contenido tabular; el resto conserva el padding de densidad.",
              "Las acciones van después del título en el DOM para mantener el orden de lectura.",
              "Un panel es una sección con borde; no reemplaza landmarks ni usa tablas como layout.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
