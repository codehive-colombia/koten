import { Button, Dialog, Drawer, Menu, Popover, Tooltip } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function OverlaysPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 重なり"
        title="Overlays"
        jp="重なり"
        description="Dialog, Drawer, Menu, Popover y Tooltip viven sobre la página sin romper el contexto. Escape cierra, el foco vuelve y los portales quedan aislados."
        meta="dialog · drawer · menu · popover · tooltip"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="dialog" title="Dialog" jp="対話" meta="Foco atrapado y retorno">
          <Demo title="Detalle de pedido">
            <Dialog
              trigger={<Button variant="secondary">Abrir diálogo</Button>}
              title="Detalle del pedido"
              description="KURA-0142 · KURA Distribución"
              closeLabel="Cerrar"
              footer={
                <>
                  <Button variant="ghost">Cancelar</Button>
                  <Button variant="primary">Guardar cambios</Button>
                </>
              }
            >
              <p>
                El pedido saldrá del almacén de Tokio el 22/10. Incluye 12 líneas y entrega estimada
                para el 24/10.
              </p>
              <p className="mt-2 text-2xs text-faint">
                Este diálogo usa título y descripción accesibles; Escape y el botón de cierre
                devuelven el foco al disparador.
              </p>
            </Dialog>
          </Demo>
        </Section>

        <Section id="drawer" title="Drawer" jp="引き出し" meta="Lateral derecho o izquierdo">
          <Demo title="Filtros">
            <Drawer
              trigger={<Button variant="secondary">Abrir drawer</Button>}
              title="Filtros de pedidos"
              description="Aplica y cierra para ver los resultados."
              closeLabel="Cerrar"
              footer={<Button variant="primary">Aplicar filtros</Button>}
            >
              <p>
                El drawer conserva el contexto de la tabla y está pensado para edición lateral. El
                ancho máximo es 480 px.
              </p>
            </Drawer>
          </Demo>
        </Section>

        <Section id="menu" title="Menu" jp="メニュー" meta="Acciones contextuales">
          <Demo title="Acciones de fila">
            <Menu
              trigger={<Button variant="outline">Acciones</Button>}
              items={[
                { label: "Ver detalle", onSelect: () => undefined },
                { label: "Editar", onSelect: () => undefined },
                { label: "Duplicar", onSelect: () => undefined },
                { label: "Eliminar", onSelect: () => undefined, separatorBefore: true },
              ]}
            />
          </Demo>
        </Section>

        <Section id="popover" title="Popover" jp="ポップオーバー" meta="Contenido breve">
          <Demo title="Resumen de stock">
            <Popover
              trigger={<Button variant="outline">Ver resumen</Button>}
              title="Stock por almacén"
              description="Actualizado hace 5 minutos"
              closeLabel="Cerrar"
            >
              <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                <dt>Tokio</dt>
                <dd className="text-right tabular-nums">52</dd>
                <dt>Osaka</dt>
                <dd className="text-right tabular-nums">18</dd>
                <dt>Sapporo</dt>
                <dd className="text-right tabular-nums">4</dd>
              </dl>
            </Popover>
          </Demo>
        </Section>

        <Section id="tooltip" title="Tooltip" jp="ヒント" meta="Delay 200 ms · hover/focus">
          <Demo title="Ayuda contextual">
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
              <Tooltip trigger={<Button variant="ghost">¿Qué es esto?</Button>}>
                Abre el detalle del pedido sin salir de la tabla.
              </Tooltip>
              <Tooltip trigger={<Button variant="outline">Costo estimado</Button>} side="bottom">
                Incluye impuestos y envío estándar.
              </Tooltip>
            </div>
          </Demo>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Cinco overlays">
          <PropsTable
            caption="Props de overlays"
            rows={[
              {
                prop: "trigger",
                type: "ReactElement",
                default: "—",
                note: "El elemento que abre el overlay; Base UI mergea props.",
              },
              {
                prop: "title / description",
                type: "ReactNode",
                default: "—",
                note: "Título obligatorio; descripción opcional y asociada.",
              },
              {
                prop: "closeLabel",
                type: "string",
                default: "—",
                note: "Texto accesible del cierre.",
              },
              {
                prop: "Drawer side",
                type: "left | right",
                default: "right",
                note: "Lado desde el que entra el panel.",
              },
              {
                prop: "Menu items",
                type: "{ label, onSelect?, href?, separatorBefore? }[]",
                default: "—",
                note: "Acciones o enlaces; separador opcional.",
              },
              {
                prop: "Menu modal",
                type: "boolean",
                default: "false",
                note: "Koten lo mantiene no modal para no bloquear la página.",
              },
              {
                prop: "Tooltip delay / side",
                type: "number · top | right | bottom | left",
                default: "200 · top",
                note: "Delay compartido por el provider.",
              },
            ]}
          />
          <Code>{`<Dialog trigger={<Button>Abrir</Button>} title="Detalle" closeLabel="Cerrar">
  Contenido
</Dialog>

<Drawer trigger={<Button>Filtros</Button>} title="Filtros" closeLabel="Cerrar" side="right">
  Contenido
</Drawer>

<Menu trigger={<Button>Acciones</Button>} items={actions} />
<Popover trigger={<Button>Resumen</Button>} title="Stock" closeLabel="Cerrar">…</Popover>
<Tooltip trigger={<Button>Ayuda</Button>}>Texto</Tooltip>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Foco, Escape y portal">
          <List
            label="Notas de accesibilidad de overlays"
            items={[
              "Dialog y Drawer atrapan el foco, cierran con Escape y lo devuelven al trigger.",
              "Title y Description dan nombre y contexto al diálogo.",
              "Menu se recorre con flechas y Enter; los separadores no son focos.",
              "Menu es no modal: abrirlo no bloquea scroll ni clics fuera del popup.",
              "Popover y Tooltip no deben contener acciones críticas que no estén en la página.",
              "Los portales viven fuera del flujo; el overlay usa solo la sombra permitida.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
