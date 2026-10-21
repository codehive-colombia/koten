import { Checkbox, Combobox, NumberField, RadioGroup, Select, Switch } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const warehouses = [
  { value: "tokyo", label: "Tokio · 東京" },
  { value: "osaka", label: "Osaka · 大阪" },
  { value: "fukuoka", label: "Fukuoka · 福岡" },
  { value: "sapporo", label: "Sapporo · 札幌" },
];

const customers = ["KURA Distribución", "HIKARI Store", "Matsuri Foods", "Aoyama Retail"];

export function InputsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 入力部品"
        title="Inputs avanzados"
        jp="入力部品"
        description="Select, Combobox, Checkbox, RadioGroup, Switch y NumberField sobre Base UI. El teclado y los estados vienen del primitivo; el estilo, de los roles del sistema."
        meta="Select · Combobox · Checkbox · RadioGroup · Switch · NumberField"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="select" title="Select" jp="選択" meta="Lista controlada por teclado">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Almacén">
              <Select label="Almacén de salida" items={warehouses} defaultValue="tokyo" />
            </Demo>
            <Demo title="Disabled">
              <Select label="Almacén bloqueado" items={warehouses} defaultValue="osaka" disabled />
            </Demo>
          </div>
        </Section>

        <Section id="combobox" title="Combobox" jp="検索" meta="Filtro y selección">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Cliente">
              <Combobox
                label="Cliente"
                items={customers}
                emptyLabel="Sin clientes"
                triggerLabel="Abrir clientes"
                placeholder="Buscar cliente…"
              />
            </Demo>
            <Demo title="Disabled">
              <Combobox
                label="Cliente bloqueado"
                items={customers}
                emptyLabel="Sin clientes"
                triggerLabel="Abrir clientes"
                disabled
              />
            </Demo>
          </div>
        </Section>

        <Section id="checkbox-switch" title="Checkbox y Switch" jp="切替" meta="Estados binarios">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Checkbox">
              <div className="grid gap-[var(--koten-gap)]">
                <Checkbox label="Recibir avisos de stock" description="Solo productos críticos." />
                <Checkbox label="Incluir pedidos archivados" defaultChecked />
                <Checkbox label="Selección parcial" indeterminate />
              </div>
            </Demo>
            <Demo title="Switch">
              <div className="grid gap-[var(--koten-gap)]">
                <Switch
                  label="Notificaciones"
                  description="Avisos de pedidos y stock."
                  defaultChecked
                />
                <Switch label="Resumen semanal" description="Cada lunes a las 09:00." />
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="radio" title="RadioGroup" jp="単一選択" meta="Una opción por grupo">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <RadioGroup
              label="Método de envío"
              defaultValue="standard"
              options={[
                { value: "standard", label: "Estándar", description: "3–5 días hábiles." },
                { value: "express", label: "Express", description: "24–48 horas." },
                { value: "pickup", label: "Retiro en tienda", description: "Listo en 2 horas." },
              ]}
            />
            <RadioGroup
              label="Facturación"
              orientation="horizontal"
              defaultValue="monthly"
              options={[
                { value: "monthly", label: "Mensual" },
                { value: "annual", label: "Anual" },
              ]}
            />
          </div>
        </Section>

        <Section id="number" title="NumberField" jp="数量" meta="Steppers y teclado">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Cantidad">
              <NumberField
                label="Unidades"
                defaultValue={1}
                min={1}
                max={99}
                decrementLabel="Restar una unidad"
                incrementLabel="Sumar una unidad"
              />
            </Demo>
            <Demo title="Disabled">
              <NumberField
                label="Cantidad bloqueada"
                defaultValue={12}
                disabled
                decrementLabel="Restar una unidad"
                incrementLabel="Sumar una unidad"
              />
            </Demo>
          </div>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="API de los seis controles">
          <PropsTable
            caption="Props de Select y Combobox"
            rows={[
              {
                prop: "label",
                type: "string",
                default: "—",
                note: "Label visible y nombre accesible.",
              },
              {
                prop: "items",
                type: "readonly { value, label }[] | readonly string[]",
                default: "—",
                note: "Select usa objetos; Combobox usa strings.",
              },
              {
                prop: "emptyLabel / triggerLabel",
                type: "string",
                default: "—",
                note: "Textos de i18n obligatorios en Combobox.",
              },
              {
                prop: "value / defaultValue",
                type: "string",
                default: "—",
                note: "Controlado o no controlado.",
              },
              {
                prop: "onValueChange",
                type: "(value: string | null) => void",
                default: "—",
                note: "Se dispara al elegir una opción.",
              },
              {
                prop: "modal",
                type: "boolean",
                default: "false",
                note: "Si es true, bloquea scroll e interacción fuera del popup. Koten usa false por defecto.",
              },
            ]}
          />
          <PropsTable
            caption="Props de Checkbox, Switch, RadioGroup y NumberField"
            rows={[
              {
                prop: "label / description",
                type: "ReactNode",
                default: "—",
                note: "Label visible; description separada del nombre accesible.",
              },
              {
                prop: "checked / defaultChecked",
                type: "boolean",
                default: "false",
                note: "Checkbox y Switch; RadioGroup usa value/defaultValue.",
              },
              {
                prop: "indeterminate",
                type: "boolean",
                default: "false",
                note: "Solo Checkbox; muestra un guion en lugar del check.",
              },
              {
                prop: "orientation",
                type: "vertical | horizontal",
                default: "vertical",
                note: "Solo RadioGroup.",
              },
              {
                prop: "min / max / step",
                type: "number",
                default: "—",
                note: "NumberField; los steppers respetan los límites.",
              },
            ]}
          />
          <Code>{`<Select label="Almacén" items={warehouses} defaultValue="tokyo" />

<Combobox
  label="Cliente"
  items={customers}
  emptyLabel="Sin clientes"
  triggerLabel="Abrir clientes"
/>

<Checkbox label="Recibir avisos" description="Solo stock crítico." />
<Switch label="Notificaciones" defaultChecked />
<RadioGroup label="Envío" options={shippingOptions} />
<NumberField
  label="Unidades"
  defaultValue={1}
  decrementLabel="Restar"
  incrementLabel="Sumar"
/>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Teclado y semántica">
          <List
            label="Notas de accesibilidad de inputs avanzados"
            items={[
              "Select y Combobox usan roles listbox/option y navegación por flechas.",
              "Select es no modal por defecto: abrir el popup no bloquea el scroll ni el resto de la página.",
              "Checkbox y Switch conservan el estado checked y un nombre accesible desde el label.",
              "RadioGroup vive en un grupo etiquetado; cada opción es un radio real.",
              "NumberField expone inputmode numérico y botones con aria-label.",
              "Las descripciones se muestran fuera del label para no contaminar el nombre accesible.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
