import {
  Button,
  Checkbox,
  Combobox,
  formatCurrency,
  NumberField,
  RadioGroup,
  Select,
  Switch,
} from "@koten/ui";
import { useState } from "react";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

const warehouses = [
  { value: "tokyo", label: "Tokyo · 東京" },
  { value: "osaka", label: "Osaka · 大阪" },
  { value: "fukuoka", label: "Fukuoka · 福岡" },
  { value: "sapporo", label: "Sapporo · 札幌" },
];

const customers = ["KURA Distribution", "HIKARI Store", "Matsuri Foods", "Aoyama Retail"];

const shippingOptions = [
  { value: "standard", label: "Standard", description: "3–5 business days." },
  { value: "express", label: "Express", description: "24–48 hours." },
  { value: "pickup", label: "Store pickup", description: "Ready in 2 hours." },
  {
    value: "sameday",
    label: "Same day",
    description: "Tokyo only.",
    disabled: true,
  },
];

function ControlledSelectDemo() {
  const [warehouse, setWarehouse] = useState<string | null>("tokyo");
  const selected = warehouses.find((item) => item.value === warehouse)?.label;

  return (
    <div className="grid gap-[var(--koten-gap)]">
      <Select
        label="Source warehouse"
        items={warehouses}
        value={warehouse ?? undefined}
        onValueChange={setWarehouse}
        description="Stock and lead time come from this warehouse."
      />
      <p className="text-2xs text-muted">
        Selected: <span className="font-semibold text-ink">{selected ?? "none"}</span>
      </p>
    </div>
  );
}

function ControlledComboboxDemo() {
  const [customer, setCustomer] = useState<string | null>("HIKARI Store");

  return (
    <div className="grid gap-[var(--koten-gap)]">
      <Combobox
        label="Customer"
        items={customers}
        value={customer ?? undefined}
        onValueChange={setCustomer}
        emptyLabel="No customers"
        triggerLabel="Open customers"
        placeholder="Search customer…"
      />
      <p className="text-2xs text-muted">
        Selected: <span className="font-semibold text-ink">{customer ?? "none"}</span>
      </p>
    </div>
  );
}

function ControlledCheckboxDemo() {
  const [alerts, setAlerts] = useState(true);
  const [digest, setDigest] = useState(false);
  const active = Number(alerts) + Number(digest);

  return (
    <div className="grid gap-[var(--koten-gap)]">
      <Checkbox
        label="Stock alerts"
        description="Only critical products."
        checked={alerts}
        onCheckedChange={setAlerts}
      />
      <Checkbox
        label="Order digest"
        description="A summary every morning at 09:00."
        checked={digest}
        onCheckedChange={setDigest}
      />
      <p className="text-2xs text-muted">
        Active channels: <span className="font-semibold text-ink">{active}</span>
      </p>
    </div>
  );
}

function ControlledSwitchDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="grid gap-[var(--koten-gap)]">
      <Switch
        label="Storefront visibility"
        description="Hide the product without unpublishing it."
        checked={visible}
        onCheckedChange={setVisible}
      />
      <p className="text-2xs text-muted">
        Storefront: <span className="font-semibold text-ink">{visible ? "visible" : "hidden"}</span>
      </p>
    </div>
  );
}

function ControlledNumberFieldDemo() {
  const [quantity, setQuantity] = useState<number | null>(2);
  const total = (quantity ?? 0) * 1200;

  return (
    <div className="grid gap-[var(--koten-gap)]">
      <NumberField
        label="Units"
        value={quantity ?? undefined}
        onValueChange={setQuantity}
        min={1}
        max={99}
        step={1}
        decrementLabel="Decrease by one"
        incrementLabel="Increase by one"
      />
      <p className="text-2xs text-muted">
        Total: <span className="font-semibold tabular-nums text-ink">{formatCurrency(total)}</span>
      </p>
    </div>
  );
}

export const inputDocs: PrimitiveDoc[] = [
  {
    slug: "select",
    id: "C-009",
    name: "Select",
    jp: "選択",
    description: {
      es: "Lista de opciones con etiqueta, descripción y error integrados. El popup es no modal por defecto y Base UI se encarga del teclado.",
      ja: "ラベル、説明、エラーを内蔵した選択リストです。ポップアップは既定で非モーダルで、キーボード操作は Base UI が担います。",
      en: "An option list with built-in label, description and error. The popup is non-modal by default and Base UI handles the keyboard.",
    },
    baseUi: "https://base-ui.com/react/components/select",
    files: filesFor(uiFile("select.tsx")),
    examples: [
      {
        id: "select-options",
        title: { es: "Opciones y estados", ja: "選択肢と状態", en: "Options and states" },
        description: {
          es: "Cada elemento declara value, label y disabled opcional; description queda bajo el disparador.",
          ja: "各項目は value、label、任意の disabled を宣言し、description はトリガーの下に表示されます。",
          en: "Each item declares value, label and an optional disabled; description sits under the trigger.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)] md:grid-cols-2">
            <Select
              label="Source warehouse"
              items={warehouses}
              defaultValue="tokyo"
              description="Stock and lead time come from this warehouse."
            />
            <Select label="Locked warehouse" items={warehouses} defaultValue="osaka" disabled />
          </div>
        ),
        code: `<Select
  label="Source warehouse"
  items={warehouses}
  defaultValue="tokyo"
  description="Stock and lead time come from this warehouse."
/>
<Select label="Locked warehouse" items={warehouses} defaultValue="osaka" disabled />`,
      },
      {
        id: "select-controlled",
        title: { es: "Selección controlada", ja: "制御された選択", en: "Controlled selection" },
        description: {
          es: "value y onValueChange permiten reflejar la elección fuera del control.",
          ja: "value と onValueChange を使うと、選択内容をコントロールの外へ反映できます。",
          en: "value and onValueChange let the choice be reflected outside the control.",
        },
        preview: <ControlledSelectDemo />,
        code: `const [warehouse, setWarehouse] = useState<string | null>("tokyo");
const selected = warehouses.find((item) => item.value === warehouse)?.label;

<Select
  label="Source warehouse"
  items={warehouses}
  value={warehouse ?? undefined}
  onValueChange={setWarehouse}
  description="Stock and lead time come from this warehouse."
/>
<p className="text-2xs text-muted">
  Selected: <span className="font-semibold text-ink">{selected ?? "none"}</span>
</p>`,
      },
    ],
    formExample: {
      title: { es: "Guardar un pedido", ja: "注文を保存", en: "Save an order" },
      description: {
        es: "Un formulario mínimo: el campo exige un almacén activo, muestra la ayuda y el error en su propio espacio y termina con un botón de envío.",
        ja: "最小構成のフォームです。有効な倉庫を必須にし、説明とエラーをそれぞれの位置に表示し、送信ボタンで終わります。",
        en: "A minimal form: the field requires an active warehouse, shows help and error in their own slots, and ends with a submit button.",
      },
      preview: (
        <form
          className="grid w-full max-w-sm gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <Select
            label="Source warehouse"
            items={warehouses}
            placeholder="Select a warehouse…"
            required
            description="Lead time and shipping cost are calculated from this warehouse."
            error="Choose an active warehouse before saving."
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Save order
            </Button>
          </div>
        </form>
      ),
      code: `<form
  className="grid w-full max-w-sm gap-[var(--koten-gap)]"
  onSubmit={(event) => event.preventDefault()}
>
  <Select
    label="Source warehouse"
    items={warehouses}
    placeholder="Select a warehouse…"
    required
    description="Lead time and shipping cost are calculated from this warehouse."
    error="Choose an active warehouse before saving."
  />
  <div className="flex justify-end">
    <Button type="submit" variant="primary">Save order</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Etiqueta visible y nombre accesible del disparador; es obligatoria.",
          ja: "可視ラベルであり、トリガーのアクセシブル名です。必須です。",
          en: "Visible label and accessible name of the trigger; required.",
        },
      },
      {
        prop: "items",
        type: "readonly SelectItem[]",
        default: "—",
        note: {
          es: "Cada elemento declara value, label y disabled opcional.",
          ja: "各項目は value、label、任意の disabled を宣言します。",
          en: "Each item declares value, label and an optional disabled.",
        },
      },
      {
        prop: "value / defaultValue",
        type: "string",
        default: "—",
        note: {
          es: "Controlado o no controlado; sin valor se muestra el placeholder.",
          ja: "制御・非制御のいずれかです。値がない場合はプレースホルダーを表示します。",
          en: "Controlled or uncontrolled; without a value the placeholder shows.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: string | null) => void",
        default: "—",
        note: {
          es: "Devuelve el value elegido o null al limpiar la selección.",
          ja: "選択した value、または選択解除時に null を返します。",
          en: "Returns the chosen value, or null when the selection is cleared.",
        },
      },
      {
        prop: "placeholder",
        type: "string",
        default: "Seleccionar…",
        note: {
          es: "Texto del disparador cuando no hay selección.",
          ja: "未選択のときにトリガーへ表示するテキストです。",
          en: "Trigger text shown when nothing is selected.",
        },
      },
      {
        prop: "description / error",
        type: "string",
        default: "—",
        note: {
          es: "description se enlaza con aria-describedby; error añade aria-invalid y role=alert.",
          ja: "description は aria-describedby で結び付き、error は aria-invalid と role=alert を加えます。",
          en: "description is wired through aria-describedby; error adds aria-invalid and role=alert.",
        },
      },
      {
        prop: "modal",
        type: "boolean",
        default: "false",
        note: {
          es: "Si es true bloquea el scroll y la interacción fuera del popup; Koten usa false.",
          ja: "true の場合はスクロールとポップアップ外の操作をブロックします。Koten の既定値は false です。",
          en: "When true it locks scroll and interaction outside the popup; Koten defaults to false.",
        },
      },
      {
        prop: "disabled / required",
        type: "boolean",
        default: "false",
        note: {
          es: "disabled bloquea el control; required añade el asterisco y aria-required.",
          ja: "disabled は操作を止め、required はアスタリスクと aria-required を加えます。",
          en: "disabled blocks the control; required adds the asterisk and aria-required.",
        },
      },
    ],
    a11y: {
      es: [
        "El disparador toma el nombre accesible de label; el popup se anuncia como listbox y cada opción como option.",
        "Las flechas mueven el foco, Enter o Espacio eligen y Escape cierra sin enviar el formulario.",
        "description y error se enlazan con aria-describedby; el error se anuncia con role=alert.",
      ],
      ja: [
        "トリガーは label からアクセシブル名を得て、ポップアップは listbox、各項目は option として通知されます。",
        "矢印キーで移動し、Enter または Space で選択、Escape でフォームを送信せずに閉じます。",
        "description と error は aria-describedby で結び付き、エラーは role=alert で通知されます。",
      ],
      en: [
        "The trigger takes its accessible name from label; the popup is announced as a listbox and each option as an option.",
        "Arrow keys move the focus, Enter or Space selects, and Escape closes without submitting the form.",
        "description and error are wired through aria-describedby; the error is announced with role=alert.",
      ],
    },
  },
  {
    slug: "combobox",
    id: "C-010",
    name: "Combobox",
    jp: "検索選択",
    description: {
      es: "Entrada de texto con filtrado incremental y selección de una sola opción. Los elementos son cadenas y las etiquetas de vacío y de disparador son obligatorias.",
      ja: "入力しながら絞り込み、1つの候補を選ぶコンボボックスです。項目は文字列で、空表示とトリガーのラベルは必須です。",
      en: "A text input with incremental filtering and single-option selection. Items are strings, and the empty and trigger labels are required.",
    },
    baseUi: "https://base-ui.com/react/components/combobox",
    files: filesFor(uiFile("combobox.tsx")),
    examples: [
      {
        id: "combobox-search",
        title: { es: "Búsqueda y estados", ja: "検索と状態", en: "Search and states" },
        description: {
          es: "emptyLabel cubre el caso sin coincidencias y triggerLabel nombra el botón que solo lleva icono.",
          ja: "emptyLabel は一致なしの表示を担い、triggerLabel はアイコンだけのボタンに名前を与えます。",
          en: "emptyLabel covers the no-match case and triggerLabel names the icon-only button.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)] md:grid-cols-2">
            <Combobox
              label="Customer"
              items={customers}
              emptyLabel="No customers"
              triggerLabel="Open customers"
              placeholder="Search customer…"
            />
            <Combobox
              label="Locked customer"
              items={customers}
              emptyLabel="No customers"
              triggerLabel="Open customers"
              disabled
            />
          </div>
        ),
        code: `<Combobox
  label="Customer"
  items={customers}
  emptyLabel="No customers"
  triggerLabel="Open customers"
  placeholder="Search customer…"
/>
<Combobox
  label="Locked customer"
  items={customers}
  emptyLabel="No customers"
  triggerLabel="Open customers"
  disabled
/>`,
      },
      {
        id: "combobox-controlled",
        title: { es: "Selección controlada", ja: "制御された選択", en: "Controlled selection" },
        description: {
          es: "onValueChange devuelve la cadena elegida o null, sin objetos intermedios.",
          ja: "onValueChange は選択した文字列、または null を返します。中間オブジェクトはありません。",
          en: "onValueChange returns the chosen string or null, with no intermediate objects.",
        },
        preview: <ControlledComboboxDemo />,
        code: `const [customer, setCustomer] = useState<string | null>("HIKARI Store");

<Combobox
  label="Customer"
  items={customers}
  value={customer ?? undefined}
  onValueChange={setCustomer}
  emptyLabel="No customers"
  triggerLabel="Open customers"
  placeholder="Search customer…"
/>
<p className="text-2xs text-muted">
  Selected: <span className="font-semibold text-ink">{customer ?? "none"}</span>
</p>`,
      },
    ],
    formExample: {
      title: { es: "Asignar un cliente", ja: "顧客を紐付ける", en: "Attach a customer" },
      description: {
        es: "Combobox no tiene props de ayuda ni error; se componen debajo con los mismos tokens y el error usa role=alert.",
        ja: "Combobox には説明やエラーのプロパティがないため、同じトークンで下に組み、エラーには role=alert を付けます。",
        en: "Combobox has no help or error props; both are composed below with the same tokens, and the error uses role=alert.",
      },
      preview: (
        <form
          className="grid w-full max-w-sm gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-[calc(var(--koten-gap)*0.5)]">
            <Combobox
              label="Customer"
              items={customers}
              emptyLabel="No customers"
              triggerLabel="Open customers"
              placeholder="Search customer…"
            />
            <p className="text-2xs leading-relaxed text-faint">
              Billing and delivery addresses follow the customer record.
            </p>
            <p role="alert" className="text-2xs leading-relaxed text-danger">
              Pick an existing customer before saving.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Save order
            </Button>
          </div>
        </form>
      ),
      code: `<form
  className="grid w-full max-w-sm gap-[var(--koten-gap)]"
  onSubmit={(event) => event.preventDefault()}
>
  <div className="grid gap-[calc(var(--koten-gap)*0.5)]">
    <Combobox
      label="Customer"
      items={customers}
      emptyLabel="No customers"
      triggerLabel="Open customers"
      placeholder="Search customer…"
    />
    <p className="text-2xs leading-relaxed text-faint">
      Billing and delivery addresses follow the customer record.
    </p>
    <p role="alert" className="text-2xs leading-relaxed text-danger">
      Pick an existing customer before saving.
    </p>
  </div>
  <div className="flex justify-end">
    <Button type="submit" variant="primary">Save order</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Etiqueta visible enlazada al input por htmlFor/id; es obligatoria.",
          ja: "htmlFor/id で入力欄に結び付く可視ラベルです。必須です。",
          en: "Visible label linked to the input through htmlFor/id; required.",
        },
      },
      {
        prop: "items",
        type: "readonly string[]",
        default: "—",
        note: {
          es: "Cadenas; el input filtra por coincidencia mientras se escribe.",
          ja: "文字列の配列です。入力に合わせて一致する項目で絞り込みます。",
          en: "Strings; the input filters by match while typing.",
        },
      },
      {
        prop: "emptyLabel",
        type: "string",
        default: "—",
        note: {
          es: "Mensaje visible cuando ningún elemento coincide.",
          ja: "一致する項目がないときに表示するメッセージです。",
          en: "Visible message when no item matches.",
        },
      },
      {
        prop: "triggerLabel",
        type: "string",
        default: "—",
        note: {
          es: "aria-label del botón que abre la lista, que solo lleva icono.",
          ja: "アイコンだけのリスト開閉ボタンに付ける aria-label です。",
          en: "aria-label of the icon-only button that opens the list.",
        },
      },
      {
        prop: "placeholder",
        type: "string",
        default: "Buscar…",
        note: {
          es: "Texto del input cuando está vacío.",
          ja: "入力欄が空のときに表示するテキストです。",
          en: "Input text shown when it is empty.",
        },
      },
      {
        prop: "value / defaultValue",
        type: "string",
        default: "—",
        note: {
          es: "Controlado o no controlado.",
          ja: "制御・非制御のいずれかです。",
          en: "Controlled or uncontrolled.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: string | null) => void",
        default: "—",
        note: {
          es: "Devuelve la cadena elegida o null al limpiar la selección.",
          ja: "選択した文字列、または選択解除時に null を返します。",
          en: "Returns the chosen string, or null when the selection is cleared.",
        },
      },
      {
        prop: "disabled / name",
        type: "boolean / string",
        default: "false / —",
        note: {
          es: "name envía el valor con el formulario; disabled bloquea input y disparador.",
          ja: "name はフォームで値を送信し、disabled は入力欄とトリガーを止めます。",
          en: "name submits the value with the form; disabled blocks the input and the trigger.",
        },
      },
    ],
    a11y: {
      es: [
        "El input tiene label asociada por htmlFor/id y el disparador de icono lleva triggerLabel como aria-label.",
        "El filtrado ocurre mientras se escribe; emptyLabel da el mensaje visible cuando no hay coincidencias.",
        "Escape cierra el popup y mantiene el texto escrito para poder corregirlo.",
      ],
      ja: [
        "入力欄は htmlFor/id でラベルと結び付き、アイコンのトリガーは triggerLabel を aria-label として持ちます。",
        "入力に合わせて絞り込み、一致がない場合は emptyLabel が可視メッセージを出します。",
        "Escape でポップアップを閉じ、入力したテキストは修正できるよう残ります。",
      ],
      en: [
        "The input is labelled through htmlFor/id, and the icon trigger carries triggerLabel as its aria-label.",
        "Filtering happens while typing; emptyLabel provides the visible message when nothing matches.",
        "Escape closes the popup and keeps the typed text so it can be corrected.",
      ],
    },
  },
  {
    slug: "checkbox",
    id: "C-011",
    name: "Checkbox",
    jp: "チェック",
    description: {
      es: "Estado binario con soporte de selección parcial. La etiqueta y la descripción se mantienen separadas del nombre accesible.",
      ja: "部分選択をサポートする二値の状態です。ラベルと説明はアクセシブル名から分離されます。",
      en: "A binary state with partial-selection support. The label and description stay separate from the accessible name.",
    },
    baseUi: "https://base-ui.com/react/components/checkbox",
    files: filesFor(uiFile("checkbox.tsx")),
    examples: [
      {
        id: "checkbox-states",
        title: { es: "Estados", ja: "状態", en: "States" },
        description: {
          es: "Marcado, parcial e inactivo; la descripción se dibuja bajo la etiqueta, fuera del nombre accesible.",
          ja: "チェック済み、部分選択、無効の3状態です。説明はラベルの下に描画され、アクセシブル名には入りません。",
          en: "Checked, partial and disabled; the description renders under the label, outside the accessible name.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)]">
            <Checkbox label="Stock alerts" description="Only critical products." defaultChecked />
            <Checkbox
              label="Partial selection"
              description="Some rows in this group are selected."
              indeterminate
            />
            <Checkbox label="Email digest" description="This channel is not available." disabled />
          </div>
        ),
        code: `<Checkbox label="Stock alerts" description="Only critical products." defaultChecked />
<Checkbox
  label="Partial selection"
  description="Some rows in this group are selected."
  indeterminate
/>
<Checkbox label="Email digest" description="This channel is not available." disabled />`,
      },
      {
        id: "checkbox-controlled",
        title: { es: "Estado controlado", ja: "制御された状態", en: "Controlled state" },
        description: {
          es: "checked y onCheckedChange mantienen el estado en el componente que lo usa.",
          ja: "checked と onCheckedChange で、利用側のコンポーネントが状態を保持します。",
          en: "checked and onCheckedChange keep the state in the consuming component.",
        },
        preview: <ControlledCheckboxDemo />,
        code: `const [alerts, setAlerts] = useState(true);
const [digest, setDigest] = useState(false);

<Checkbox
  label="Stock alerts"
  description="Only critical products."
  checked={alerts}
  onCheckedChange={setAlerts}
/>
<Checkbox
  label="Order digest"
  description="A summary every morning at 09:00."
  checked={digest}
  onCheckedChange={setDigest}
/>
<p className="text-2xs text-muted">
  Active channels: <span className="font-semibold text-ink">{Number(alerts) + Number(digest)}</span>
</p>`,
      },
    ],
    formExample: {
      title: {
        es: "Aceptar la política de devoluciones",
        ja: "返品ポリシーに同意",
        en: "Accept the return policy",
      },
      description: {
        es: "La casilla obligatoria comparte formulario con su descripción y un error que indica qué falta antes de continuar.",
        ja: "必須のチェックボックスは、説明と、続行前に何が必要かを示すエラーと同じフォームに置きます。",
        en: "The required checkbox shares the form with its description and an error that says what is missing before continuing.",
      },
      preview: (
        <form
          className="grid w-full max-w-sm gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-1">
            <Checkbox
              label="I accept the return policy"
              description="Returns are accepted within 30 days of delivery."
            />
            <p role="alert" className="text-2xs leading-relaxed text-danger">
              You must accept the policy to continue.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </form>
      ),
      code: `<form
  className="grid w-full max-w-sm gap-[var(--koten-gap)]"
  onSubmit={(event) => event.preventDefault()}
>
  <div className="grid gap-1">
    <Checkbox
      label="I accept the return policy"
      description="Returns are accepted within 30 days of delivery."
    />
    <p role="alert" className="text-2xs leading-relaxed text-danger">
      You must accept the policy to continue.
    </p>
  </div>
  <div className="flex justify-end">
    <Button type="submit" variant="primary">Continue</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido visible y nombre accesible; es obligatorio.",
          ja: "可視の内容であり、アクセシブル名でもあります。必須です。",
          en: "Visible content and accessible name; required.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se dibuja bajo el label, fuera del nombre accesible.",
          ja: "ラベルの下に描画し、アクセシブル名には含めません。",
          en: "Renders under the label, outside the accessible name.",
        },
      },
      {
        prop: "checked / defaultChecked",
        type: "boolean",
        default: "false",
        note: {
          es: "Controlado o no controlado.",
          ja: "制御・非制御のいずれかです。",
          en: "Controlled or uncontrolled.",
        },
      },
      {
        prop: "indeterminate",
        type: "boolean",
        default: "false",
        note: {
          es: "Muestra un guion y se anuncia como mixed; no cambia checked.",
          ja: "ダッシュを表示し、mixed として通知されます。checked は変わりません。",
          en: "Shows a dash and is announced as mixed; it does not change checked.",
        },
      },
      {
        prop: "onCheckedChange",
        type: "(checked: boolean, event: Event) => void",
        default: "—",
        note: {
          es: "Se dispara al marcar o desmarcar.",
          ja: "チェックの切り替え時に発火します。",
          en: "Fires when the box is checked or unchecked.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Bloquea el control y lo excluye del envío.",
          ja: "コントロールを止め、送信からも除外します。",
          en: "Blocks the control and excludes it from submission.",
        },
      },
      {
        prop: "name",
        type: "string",
        default: "—",
        note: {
          es: "Nombre con el que el valor viaja en el formulario.",
          ja: "フォームで値を送信するときの名前です。",
          en: "Name the value travels with in the form.",
        },
      },
    ],
    a11y: {
      es: [
        "El label envuelve el control real de Base UI, así el nombre accesible sale del texto visible.",
        "description se dibuja fuera del label para no alargar el nombre accesible.",
        "indeterminate se anuncia como mixed y no reemplaza a checked.",
        "El foco visible usa un outline de 2 px con offset, nunca outline: none.",
      ],
      ja: [
        "label が Base UI の実コントロールを包むため、アクセシブル名は可視テキストから得られます。",
        "description はラベルの外に描画し、アクセシブル名を長くしません。",
        "indeterminate は mixed として通知され、checked を置き換えません。",
        "可視フォーカスは offset 付きの 2 px アウトラインで、outline: none は使いません。",
      ],
      en: [
        "The label wraps Base UI's real control, so the accessible name comes from the visible text.",
        "description renders outside the label so the accessible name stays short.",
        "indeterminate is announced as mixed and does not replace checked.",
        "Visible focus uses a 2 px outline with an offset, never outline: none.",
      ],
    },
  },
  {
    slug: "radio-group",
    id: "C-012",
    name: "RadioGroup",
    jp: "ラジオ",
    description: {
      es: "Un grupo de radios del que solo se puede elegir una opción. Admite descripciones por opción y orientación vertical u horizontal.",
      ja: "1つだけ選べるラジオグループです。選択肢ごとの説明と、縦・横の向きを指定できます。",
      en: "A radio group where only one option can be chosen. It supports per-option descriptions and vertical or horizontal orientation.",
    },
    baseUi: "https://base-ui.com/react/components/radio-group",
    files: filesFor(uiFile("radio-group.tsx")),
    examples: [
      {
        id: "radio-options",
        title: {
          es: "Opciones y descripciones",
          ja: "選択肢と説明",
          en: "Options and descriptions",
        },
        description: {
          es: "Cada opción declara label, description y disabled; el grupo se nombra con label.",
          ja: "各選択肢は label、description、disabled を宣言し、グループは label で名前を持ちます。",
          en: "Each option declares label, description and disabled; the group is named by label.",
        },
        preview: (
          <RadioGroup label="Shipping method" defaultValue="standard" options={shippingOptions} />
        ),
        code: `<RadioGroup
  label="Shipping method"
  defaultValue="standard"
  options={[
    { value: "standard", label: "Standard", description: "3–5 business days." },
    { value: "express", label: "Express", description: "24–48 hours." },
    { value: "pickup", label: "Store pickup", description: "Ready in 2 hours." },
    { value: "sameday", label: "Same day", description: "Tokyo only.", disabled: true },
  ]}
/>`,
      },
      {
        id: "radio-orientation",
        title: { es: "Orientación horizontal", ja: "横向きの配置", en: "Horizontal orientation" },
        description: {
          es: "orientation horizontal coloca las opciones en una fila que envuelve si falta espacio.",
          ja: "orientation に horizontal を指定すると、横一列に並べ、幅が足りなければ折り返します。",
          en: "Horizontal orientation lays the options in a row that wraps when space runs out.",
        },
        preview: (
          <RadioGroup
            label="Billing period"
            orientation="horizontal"
            defaultValue="monthly"
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "annual", label: "Annual" },
            ]}
          />
        ),
        code: `<RadioGroup
  label="Billing period"
  orientation="horizontal"
  defaultValue="monthly"
  options={[
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annual" },
  ]}
/>`,
      },
    ],
    formExample: {
      title: {
        es: "Elegir método de envío",
        ja: "配送方法を選ぶ",
        en: "Choose a shipping method",
      },
      description: {
        es: "Sin valor inicial, el grupo muestra el error hasta que se elige un método; las descripciones de cada opción quedan visibles.",
        ja: "初期値を置かないため、方法を選ぶまでエラーが表示されます。各選択肢の説明は常に見えます。",
        en: "With no initial value, the group shows the error until a method is chosen; each option keeps its description visible.",
      },
      preview: (
        <form
          className="grid w-full max-w-sm gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-1">
            <RadioGroup label="Shipping method" options={shippingOptions} />
            <p role="alert" className="text-2xs leading-relaxed text-danger">
              Select a shipping method to see the delivery date.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Continue to payment
            </Button>
          </div>
        </form>
      ),
      code: `<form
  className="grid w-full max-w-sm gap-[var(--koten-gap)]"
  onSubmit={(event) => event.preventDefault()}
>
  <div className="grid gap-1">
    <RadioGroup label="Shipping method" options={shippingOptions} />
    <p role="alert" className="text-2xs leading-relaxed text-danger">
      Select a shipping method to see the delivery date.
    </p>
  </div>
  <div className="flex justify-end">
    <Button type="submit" variant="primary">Continue to payment</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre del grupo mediante aria-labelledby; es obligatorio.",
          ja: "aria-labelledby でグループに付ける名前です。必須です。",
          en: "Group name provided through aria-labelledby; required.",
        },
      },
      {
        prop: "options",
        type: "readonly RadioOption[]",
        default: "—",
        note: {
          es: "Cada opción declara value, label, description y disabled opcionales.",
          ja: "各選択肢は value、label、任意の description と disabled を宣言します。",
          en: "Each option declares value, label and optional description and disabled.",
        },
      },
      {
        prop: "value / defaultValue",
        type: "string",
        default: "—",
        note: {
          es: "Controlado o no controlado.",
          ja: "制御・非制御のいずれかです。",
          en: "Controlled or uncontrolled.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: string) => void",
        default: "—",
        note: {
          es: "Devuelve el value de la opción marcada.",
          ja: "選択された選択肢の value を返します。",
          en: "Returns the value of the checked option.",
        },
      },
      {
        prop: "orientation",
        type: "vertical | horizontal",
        default: "vertical",
        note: {
          es: "vertical apila; horizontal envuelve en una fila.",
          ja: "vertical は縦に積み、horizontal は横一列に折り返します。",
          en: "vertical stacks; horizontal wraps in a row.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Deshabilita el grupo y todas sus opciones.",
          ja: "グループとすべての選択肢を無効にします。",
          en: "Disables the group and all of its options.",
        },
      },
      {
        prop: "name",
        type: "string",
        default: "—",
        note: {
          es: "Nombre del grupo en el formulario.",
          ja: "フォームにおけるグループの名前です。",
          en: "Group name in the form.",
        },
      },
    ],
    a11y: {
      es: [
        "El grupo se nombra con aria-labelledby y cada opción es un radio real dentro de su label.",
        "Solo una opción puede estar marcada; las flechas recorren el grupo sin salir de él.",
        "Las descripciones quedan fuera del label para no contaminar el nombre accesible.",
      ],
      ja: [
        "グループは aria-labelledby で名前を持ち、各選択肢は label 内の実際のラジオです。",
        "選択できるのは1つだけです。矢印キーはグループ内を移動します。",
        "説明はラベルの外に置き、アクセシブル名を汚しません。",
      ],
      en: [
        "The group is named through aria-labelledby, and each option is a real radio inside its label.",
        "Only one option can be checked; arrow keys move within the group without leaving it.",
        "Descriptions sit outside the label so the accessible name stays clean.",
      ],
    },
  },
  {
    slug: "switch",
    id: "C-013",
    name: "Switch",
    jp: "スイッチ",
    description: {
      es: "Interruptor de encendido y apagado para ajustes que se aplican al instante. El estado se anuncia como checked.",
      ja: "すぐに反映される設定向けのオン・オフスイッチです。状態は checked として通知されます。",
      en: "An on/off switch for settings that apply instantly. The state is announced as checked.",
    },
    baseUi: "https://base-ui.com/react/components/switch",
    files: filesFor(uiFile("switch.tsx")),
    examples: [
      {
        id: "switch-states",
        title: { es: "Estados", ja: "状態", en: "States" },
        description: {
          es: "Encendido, apagado e inactivo; la etiqueta va a la izquierda y el control a la derecha.",
          ja: "オン、オフ、無効の3状態です。ラベルは左、コントロールは右に置きます。",
          en: "On, off and disabled; the label sits on the left and the control on the right.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)]">
            <Switch
              label="Order notifications"
              description="Alerts for new and cancelled orders."
              defaultChecked
            />
            <Switch label="Weekly summary" description="Every Monday at 09:00." />
            <Switch label="SMS alerts" description="This channel is not available." disabled />
          </div>
        ),
        code: `<Switch
  label="Order notifications"
  description="Alerts for new and cancelled orders."
  defaultChecked
/>
<Switch label="Weekly summary" description="Every Monday at 09:00." />
<Switch label="SMS alerts" description="This channel is not available." disabled />`,
      },
      {
        id: "switch-controlled",
        title: { es: "Estado controlado", ja: "制御された状態", en: "Controlled state" },
        description: {
          es: "checked y onCheckedChange permiten condicionar el resto de la interfaz al interruptor.",
          ja: "checked と onCheckedChange で、スイッチに合わせて他の UI を切り替えられます。",
          en: "checked and onCheckedChange let the rest of the interface react to the switch.",
        },
        preview: <ControlledSwitchDemo />,
        code: `const [visible, setVisible] = useState(true);

<Switch
  label="Storefront visibility"
  description="Hide the product without unpublishing it."
  checked={visible}
  onCheckedChange={setVisible}
/>
<p className="text-2xs text-muted">
  Storefront: <span className="font-semibold text-ink">{visible ? "visible" : "hidden"}</span>
</p>`,
      },
    ],
    formExample: {
      title: { es: "Publicar un producto", ja: "商品を公開", en: "Publish a product" },
      description: {
        es: "El interruptor viene encendido y el error explica qué falta para publicar; el botón confirma la acción.",
        ja: "スイッチはオンで始まり、公開に何が足りないかをエラーで示します。ボタンで操作を確定します。",
        en: "The switch starts on and the error explains what is missing before publishing; the button confirms the action.",
      },
      preview: (
        <form
          className="grid w-full max-w-sm gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-1">
            <Switch
              label="Publish to storefront"
              description="The product goes live as soon as you save."
              defaultChecked
            />
            <p role="alert" className="text-2xs leading-relaxed text-danger">
              Add a cover image before publishing.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Publish product
            </Button>
          </div>
        </form>
      ),
      code: `<form
  className="grid w-full max-w-sm gap-[var(--koten-gap)]"
  onSubmit={(event) => event.preventDefault()}
>
  <div className="grid gap-1">
    <Switch
      label="Publish to storefront"
      description="The product goes live as soon as you save."
      defaultChecked
    />
    <p role="alert" className="text-2xs leading-relaxed text-danger">
      Add a cover image before publishing.
    </p>
  </div>
  <div className="flex justify-end">
    <Button type="submit" variant="primary">Publish product</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido visible y nombre accesible; es obligatorio.",
          ja: "可視の内容であり、アクセシブル名でもあります。必須です。",
          en: "Visible content and accessible name; required.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se muestra bajo el control, sin entrar en el nombre accesible.",
          ja: "コントロールの下に表示し、アクセシブル名には含めません。",
          en: "Renders under the control, outside the accessible name.",
        },
      },
      {
        prop: "checked / defaultChecked",
        type: "boolean",
        default: "false",
        note: {
          es: "Controlado o no controlado.",
          ja: "制御・非制御のいずれかです。",
          en: "Controlled or uncontrolled.",
        },
      },
      {
        prop: "onCheckedChange",
        type: "(checked: boolean, event: Event) => void",
        default: "—",
        note: {
          es: "Se dispara al encender o apagar.",
          ja: "オン・オフの切り替え時に発火します。",
          en: "Fires when the switch turns on or off.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Bloquea el interruptor y lo muestra atenuado.",
          ja: "スイッチを無効にし、淡い表示にします。",
          en: "Blocks the switch and dims it.",
        },
      },
      {
        prop: "name",
        type: "string",
        default: "—",
        note: {
          es: "Nombre con el que el estado viaja en el formulario.",
          ja: "フォームで状態を送信するときの名前です。",
          en: "Name the state travels with in the form.",
        },
      },
    ],
    a11y: {
      es: [
        "El control conserva el rol switch y anuncia checked al cambiar, sin depender del color del thumb.",
        "label envuelve el interruptor y da el nombre accesible; description queda fuera.",
        "El thumb es decorativo: el estado se lee del control, no de su posición.",
      ],
      ja: [
        "コントロールは switch ロールを保ち、切り替え時に checked を通知します。サムの色だけに依存しません。",
        "label がスイッチを包みアクセシブル名を与え、description はその外に置きます。",
        "サムは装飾です。状態は位置ではなくコントロールから読み取ります。",
      ],
      en: [
        "The control keeps the switch role and announces checked on change, without relying on the thumb color.",
        "label wraps the switch and provides the accessible name; description stays outside.",
        "The thumb is decorative: state is read from the control, not from its position.",
      ],
    },
  },
  {
    slug: "number-field",
    id: "C-014",
    name: "NumberField",
    jp: "数値",
    description: {
      es: "Campo numérico con steppers, límites y paso. La entrada acepta teclado numérico y los botones llevan aria-label.",
      ja: "ステッパー、上限・下限、刻み幅を備えた数値入力です。数値キーボードを受け付け、ボタンには aria-label が付きます。",
      en: "A numeric field with steppers, limits and step size. The input accepts a numeric keypad and the buttons carry aria-label.",
    },
    baseUi: "https://base-ui.com/react/components/number-field",
    files: filesFor(uiFile("number-field.tsx")),
    examples: [
      {
        id: "number-quantity",
        title: { es: "Límites y paso", ja: "上限・下限と刻み", en: "Limits and step" },
        description: {
          es: "min y max deshabilitan los steppers en los extremos; step define el incremento.",
          ja: "min と max は両端でステッパーを無効にし、step が増減量を決めます。",
          en: "min and max disable the steppers at the edges; step defines the increment.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)] md:grid-cols-2">
            <NumberField
              label="Units"
              defaultValue={1}
              min={1}
              max={99}
              decrementLabel="Decrease by one"
              incrementLabel="Increase by one"
            />
            <NumberField
              label="Locked quantity"
              defaultValue={12}
              disabled
              decrementLabel="Decrease by one"
              incrementLabel="Increase by one"
            />
          </div>
        ),
        code: `<NumberField
  label="Units"
  defaultValue={1}
  min={1}
  max={99}
  decrementLabel="Decrease by one"
  incrementLabel="Increase by one"
/>
<NumberField
  label="Locked quantity"
  defaultValue={12}
  disabled
  decrementLabel="Decrease by one"
  incrementLabel="Increase by one"
/>`,
      },
      {
        id: "number-controlled",
        title: { es: "Valor controlado", ja: "制御された値", en: "Controlled value" },
        description: {
          es: "onValueChange devuelve un número o null, y el valor puede alimentar un cálculo.",
          ja: "onValueChange は数値または null を返し、その値を計算に使えます。",
          en: "onValueChange returns a number or null, and the value can feed a calculation.",
        },
        preview: <ControlledNumberFieldDemo />,
        code: `const [quantity, setQuantity] = useState<number | null>(2);
const total = (quantity ?? 0) * 1200;

<NumberField
  label="Units"
  value={quantity ?? undefined}
  onValueChange={setQuantity}
  min={1}
  max={99}
  step={1}
  decrementLabel="Decrease by one"
  incrementLabel="Increase by one"
/>
<p className="text-2xs text-muted">
  Total:{" "}
  <span className="font-semibold tabular-nums text-ink">
    {formatCurrency(total)}
  </span>
</p>`,
      },
    ],
    formExample: {
      title: {
        es: "Agregar unidades a un pedido",
        ja: "注文に数量を追加",
        en: "Add units to an order",
      },
      description: {
        es: "El campo empieza vacío, declara límites y paso, y el error indica el rango aceptado antes de agregar unidades.",
        ja: "フィールドは空で始まり、上限・下限と刻み幅を宣言します。エラーは数量を追加する前に許容範囲を示します。",
        en: "The field starts empty, declares limits and step, and the error states the accepted range before adding units.",
      },
      preview: (
        <form
          className="grid w-full max-w-sm gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-1">
            <NumberField
              label="Units per pack"
              min={1}
              max={48}
              step={6}
              decrementLabel="Decrease by six"
              incrementLabel="Increase by six"
            />
            <p className="text-2xs leading-relaxed text-faint">
              Packs ship in multiples of six units.
            </p>
            <p role="alert" className="text-2xs leading-relaxed text-danger">
              Enter a quantity between 1 and 48.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Add to order
            </Button>
          </div>
        </form>
      ),
      code: `<form
  className="grid w-full max-w-sm gap-[var(--koten-gap)]"
  onSubmit={(event) => event.preventDefault()}
>
  <div className="grid gap-1">
    <NumberField
      label="Units per pack"
      min={1}
      max={48}
      step={6}
      decrementLabel="Decrease by six"
      incrementLabel="Increase by six"
    />
    <p className="text-2xs leading-relaxed text-faint">
      Packs ship in multiples of six units.
    </p>
    <p role="alert" className="text-2xs leading-relaxed text-danger">
      Enter a quantity between 1 and 48.
    </p>
  </div>
  <div className="flex justify-end">
    <Button type="submit" variant="primary">Add to order</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Etiqueta visible enlazada al input por htmlFor/id; es obligatoria.",
          ja: "htmlFor/id で入力欄に結び付く可視ラベルです。必須です。",
          en: "Visible label linked to the input through htmlFor/id; required.",
        },
      },
      {
        prop: "value / defaultValue",
        type: "number",
        default: "—",
        note: {
          es: "Controlado o no controlado.",
          ja: "制御・非制御のいずれかです。",
          en: "Controlled or uncontrolled.",
        },
      },
      {
        prop: "min / max",
        type: "number",
        default: "—",
        note: {
          es: "Los steppers se deshabilitan al alcanzar el límite.",
          ja: "上限または下限に達するとステッパーが無効になります。",
          en: "The steppers disable when a limit is reached.",
        },
      },
      {
        prop: "step",
        type: "number",
        default: "1",
        note: {
          es: "Incremento de los steppers y de las teclas de flecha.",
          ja: "ステッパーと矢印キーによる増減量です。",
          en: "Increment used by the steppers and the arrow keys.",
        },
      },
      {
        prop: "onValueChange",
        type: "(value: number | null) => void",
        default: "—",
        note: {
          es: "Devuelve el número o null cuando el campo queda vacío.",
          ja: "数値、または入力欄が空になったときに null を返します。",
          en: "Returns the number, or null when the field is empty.",
        },
      },
      {
        prop: "decrementLabel / incrementLabel",
        type: "string",
        default: "—",
        note: {
          es: "aria-label obligatorio de los botones, que solo llevan icono.",
          ja: "アイコンだけのボタンに付ける必須の aria-label です。",
          en: "Required aria-label for the icon-only buttons.",
        },
      },
      {
        prop: "disabled / name",
        type: "boolean / string",
        default: "false / —",
        note: {
          es: "name envía el valor con el formulario; disabled bloquea todo el grupo.",
          ja: "name はフォームで値を送信し、disabled はグループ全体を止めます。",
          en: "name submits the value with the form; disabled blocks the whole group.",
        },
      },
    ],
    a11y: {
      es: [
        "El input declara inputmode numérico y los steppers llevan decrementLabel e incrementLabel como aria-label.",
        "Al llegar a min o max los botones se deshabilitan, así el límite se percibe también sin leer el valor.",
        "El valor se puede escribir con el teclado; los steppers son un atajo, no la única vía.",
      ],
      ja: [
        "入力欄は数値の inputmode を宣言し、ステッパーは decrementLabel と incrementLabel を aria-label として持ちます。",
        "min または max に達するとボタンが無効になり、値を読まなくても上限・下限が分かります。",
        "値はキーボードでも入力でき、ステッパーは近道であって唯一の手段ではありません。",
      ],
      en: [
        "The input declares a numeric inputmode, and the steppers carry decrementLabel and incrementLabel as aria-label.",
        "At min or max the buttons disable, so the limit is perceivable without reading the value.",
        "The value can be typed with the keyboard; the steppers are a shortcut, not the only way.",
      ],
    },
  },
];
