import {
  Alert,
  Button,
  EmptyState,
  Meter,
  Progress,
  Skeleton,
  ToastProvider,
  useToast,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

function ToastDemoButton() {
  const toast = useToast();

  return (
    <Button
      variant="primary"
      onClick={() =>
        toast.add({
          title: "Pedido actualizado",
          description: "El pedido KURA-0142 pasó a preparando.",
          type: "success",
        })
      }
    >
      Mostrar toast
    </Button>
  );
}

export function FeedbackPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 通知"
        title="Feedback"
        jp="通知"
        description="Alert, Toast, Progress, Meter, Skeleton y EmptyState comunican estado sin depender del color. El texto siempre acompaña."
        meta="status · alert · progress · meter · loading · empty"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="alert" title="Alert" jp="警告" meta="Cuatro tonos">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Alert tone="info" title="Información">
              El pedido saldrá del almacén de Tokio.
            </Alert>
            <Alert tone="success" title="Guardado">
              Los cambios se guardaron correctamente.
            </Alert>
            <Alert
              tone="warning"
              title="Stock bajo"
              action={
                <Button size="xs" variant="outline">
                  Revisar
                </Button>
              }
            >
              Quedan 3 unidades de HIKARI K-1.
            </Alert>
            <Alert tone="danger" title="Error">
              No se pudo procesar el pago.
            </Alert>
          </div>
        </Section>

        <Section id="toast" title="Toast" jp="トースト" meta="Notificación temporal">
          <ToastProvider closeLabel="Cerrar" regionLabel="Notificaciones">
            <Demo title="Notificación de éxito">
              <ToastDemoButton />
            </Demo>
          </ToastProvider>
        </Section>

        <Section id="progress" title="Progress y Meter" jp="進捗" meta="Tarea vs. nivel">
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-2">
            <div className="grid gap-[var(--koten-gap)]">
              <Progress label="Exportación" value={65} />
              <Progress label="Sincronización" value={null} tone="primary" />
              <Progress label="Importación" value={100} tone="success" />
            </div>
            <div className="grid gap-[var(--koten-gap)]">
              <Meter label="Stock HIKARI K-1" value={52} max={60} tone="success" />
              <Meter label="Stock KURA-014" value={18} max={60} tone="warning" />
              <Meter label="Stock KURA-022" value={4} max={60} tone="danger" />
            </div>
          </div>
        </Section>

        <Section id="skeleton" title="Skeleton" jp="骨組み" meta="Loading sin layout shift">
          <Demo title="Lista cargando">
            <div className="grid gap-[var(--koten-gap)]">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 shrink-0" />
                <div className="grid flex-1 gap-1">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-2 w-2/3" />
                </div>
              </div>
              <Skeleton className="h-[var(--koten-row-h)] w-full" />
              <Skeleton className="h-[var(--koten-row-h)] w-full" />
              <Skeleton className="h-[var(--koten-row-h)] w-full" />
            </div>
          </Demo>
        </Section>

        <Section id="empty" title="EmptyState" jp="空" meta="Sin resultados con acción">
          <EmptyState
            title="Sin pedidos"
            description="No hay pedidos para los filtros seleccionados. Prueba con otro almacén o limpia la búsqueda."
            action={
              <Button size="sm" variant="outline">
                Limpiar filtros
              </Button>
            }
          />
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Seis piezas">
          <PropsTable
            caption="Props de feedback"
            rows={[
              {
                prop: "Alert tone",
                type: "info | success | warning | danger",
                default: "info",
                note: "info/success usan status; warning/danger usan alert.",
              },
              {
                prop: "Progress value",
                type: "number | null",
                default: "—",
                note: "null representa progreso indeterminado.",
              },
              {
                prop: "Meter value",
                type: "number",
                default: "—",
                note: "Nivel dentro de un rango; usa tone para el estado.",
              },
              {
                prop: "Skeleton className",
                type: "string",
                default: "—",
                note: "Define tamaño y forma; siempre aria-hidden.",
              },
              {
                prop: "EmptyState action",
                type: "ReactNode",
                default: "—",
                note: "Acción visible para salir del estado vacío.",
              },
            ]}
          />
          <Code>{`<Alert tone="warning" title="Stock bajo">Quedan 3 unidades.</Alert>
<Progress label="Exportación" value={65} />
<Meter label="Stock" value={18} max={60} tone="warning" />
<Skeleton className="h-3 w-1/3" />
<EmptyState title="Sin pedidos" action={<Button>Limpiar</Button>} />

const toast = useToast();
toast.add({ title: "Guardado", description: "...", type: "success" });`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Estado con texto">
          <List
            label="Notas de accesibilidad de feedback"
            items={[
              "Alert usa role status o alert según la urgencia; el texto explica el estado.",
              "Progress y Meter exponen valor y rango; no dependen solo del color.",
              "El toast vive en una región aria-live y su botón de cierre aparece al enfocar.",
              "Skeleton es aria-hidden; el contenedor debe anunciar la carga por separado.",
              "EmptyState usa heading y una acción explícita, no un enlace ambiguo.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
