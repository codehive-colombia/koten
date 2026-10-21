import { Field, FormRow, Input, Label, Textarea } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function FormsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 入力"
        title="Formularios base"
        jp="入力"
        description="Field, Label, Input, Textarea y FormRow comparten una sola fuente de verdad para label, descripción, error y estado. La densidad decide la altura; la semántica decide el resto."
        meta="default · focus · error · disabled · horizontal"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="field"
          title="Field e Input"
          jp="欄"
          meta="Label, descripción, error y required"
        >
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Default">
              <Field label="Correo" description="Lo usamos solo para avisos del pedido.">
                <Input type="email" placeholder="nombre@ejemplo.com" autoComplete="email" />
              </Field>
            </Demo>

            <Demo title="Required">
              <Field label="Teléfono" description="Con código de país." required>
                <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
              </Field>
            </Demo>

            <Demo title="Error">
              <Field
                label="Correo"
                description="Lo usamos solo para avisos del pedido."
                error="El correo no es válido."
              >
                <Input type="email" defaultValue="correo@" autoComplete="email" />
              </Field>
            </Demo>

            <Demo title="Disabled">
              <Field label="Cliente" description="El cliente se asigna desde KURA." disabled>
                <Input defaultValue="KURA-0142" readOnly />
              </Field>
            </Demo>
          </div>
        </Section>

        <Section id="textarea" title="Textarea" jp="複数行" meta="Altura mínima, resize vertical">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Mensaje">
              <Field label="Notas de entrega" description="Máximo 500 caracteres." required>
                <Textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Horario, acceso o instrucciones para el reparto."
                />
              </Field>
            </Demo>

            <Demo title="Error">
              <Field
                label="Comentario"
                description="Cuéntanos qué ocurrió."
                error="El comentario es obligatorio."
              >
                <Textarea rows={3} defaultValue="" />
              </Field>
            </Demo>
          </div>
        </Section>

        <Section
          id="form-row"
          title="FormRow"
          jp="横組み"
          meta="Label de 140 px en desktop; vertical en mobile"
        >
          <Demo title="Formulario de cliente">
            <div className="grid gap-[var(--koten-gap)]">
              <FormRow label="Cliente" description="Razón social" required>
                <Input placeholder="KURA Distribución" autoComplete="organization" />
              </FormRow>
              <FormRow label="Código" description="Identificador interno">
                <Input placeholder="KURA-0142" />
              </FormRow>
              <FormRow label="Notas">
                <Textarea rows={2} placeholder="Instrucciones internas" />
              </FormRow>
            </div>
          </Demo>
        </Section>

        <Section id="label" title="Label" jp="ラベル" meta="Dentro de Field o con htmlFor">
          <Demo title="Uso independiente">
            <div className="grid max-w-sm gap-[var(--koten-gap)]">
              <div className="grid gap-[calc(var(--koten-gap)*0.5)]">
                <Label htmlFor="catalog-label-demo">Etiqueta independiente</Label>
                <Input id="catalog-label-demo" placeholder="Asociada con htmlFor" />
              </div>
            </div>
          </Demo>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="API de composición">
          <PropsTable
            caption="Props de Field"
            rows={[
              {
                prop: "label",
                type: "ReactNode",
                default: "—",
                note: "Obligatorio; se asocia automáticamente al control.",
              },
              {
                prop: "description",
                type: "ReactNode",
                default: "—",
                note: "Se enlaza con aria-describedby.",
              },
              {
                prop: "error",
                type: "ReactNode",
                default: "—",
                note: "Fuerza aria-invalid y el mensaje de error.",
              },
              {
                prop: "required",
                type: "boolean",
                default: "false",
                note: "Marca visual y atributo required en el control.",
              },
              {
                prop: "orientation",
                type: "vertical | horizontal",
                default: "vertical",
                note: "FormRow usa horizontal con label de 140 px en sm+.",
              },
            ]}
          />
          <PropsTable
            caption="Props de Input y Textarea"
            rows={[
              {
                prop: "size",
                type: "sm | md",
                default: "md",
                note: "Ajusta el tamaño del texto; la altura sale de la densidad.",
              },
              {
                prop: "aria-invalid",
                type: "boolean",
                default: "—",
                note: "Se hereda del error de Field si no se pasa explícito.",
              },
              {
                prop: "required",
                type: "boolean",
                default: "—",
                note: "Se hereda del Field contenedor.",
              },
              {
                prop: "render",
                type: "ReactElement | función",
                default: "—",
                note: "Composición de Base UI; Textarea la usa para renderizar textarea.",
              },
            ]}
          />
          <Code>{`<Field label="Correo" description="Solo para avisos." required>
  <Input type="email" autoComplete="email" />
</Field>

<Field label="Notas" error="El comentario es obligatorio.">
  <Textarea rows={4} maxLength={500} />
</Field>

<FormRow label="Cliente" description="Razón social" required>
  <Input placeholder="KURA Distribución" />
</FormRow>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Label real y error vinculado">
          <List
            label="Notas de accesibilidad de formularios"
            items={[
              "Cada control tiene label visible; el placeholder no es label.",
              "Field enlaza label, description y error con el control mediante Base UI.",
              "El error usa aria-invalid y aria-describedby; el mensaje se anuncia con aria-live polite.",
              "Deshabilitado se propaga desde Field al control; el foco visible se mantiene en enabled.",
              "FormRow cambia a vertical en mobile para no comprimir el label.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
