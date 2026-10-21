import { Button, Field, FormRow, Input, Label, Textarea } from "@koten/ui";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

export const formDocs: PrimitiveDoc[] = [
  {
    slug: "field",
    id: "C-006",
    name: "Field",
    jp: "欄",
    description: {
      es: "Unidad de formulario que reúne etiqueta, control, descripción y error. Field no dibuja el control: lo envuelve para que herede estado, ayuda y validación accesible.",
      ja: "ラベル、コントロール、説明、エラーを一つの単位にまとめるフォーム部品です。Field はコントロールを描画せず、状態・補足・検証を継承させるために包みます。",
      en: "A form unit that groups label, control, description and error. Field does not draw the control: it wraps it so state, help text and accessible validation are inherited.",
    },
    baseUi: "https://base-ui.com/react/components/field",
    files: filesFor(uiFile("field.tsx")),
    examples: [
      {
        id: "states",
        title: { es: "Estados", ja: "状態", en: "States" },
        description: {
          es: "Default, required, error y disabled comparten la misma estructura; solo cambia lo que el campo anuncia.",
          ja: "既定・必須・エラー・無効は同じ構造を共有し、フィールドが通知する内容だけが変わります。",
          en: "Default, required, error and disabled share the same structure; only what the field announces changes.",
        },
        preview: (
          <div className="grid max-w-2xl gap-[var(--koten-gap)] lg:grid-cols-2">
            <Field label="Correo" description="Solo para avisos del pedido.">
              <Input type="email" placeholder="nombre@ejemplo.com" autoComplete="email" />
            </Field>
            <Field label="Teléfono" description="Con código de país." required>
              <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
            </Field>
            <Field
              label="Correo"
              description="Solo para avisos del pedido."
              error="El correo no es válido."
            >
              <Input type="email" defaultValue="correo@" autoComplete="email" />
            </Field>
            <Field label="Cliente" description="Asignado desde KURA." disabled>
              <Input defaultValue="KURA-0142" readOnly />
            </Field>
          </div>
        ),
        code: `<Field label="Correo" description="Solo para avisos del pedido.">
  <Input type="email" placeholder="nombre@ejemplo.com" autoComplete="email" />
</Field>

<Field label="Teléfono" description="Con código de país." required>
  <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
</Field>

<Field
  label="Correo"
  description="Solo para avisos del pedido."
  error="El correo no es válido."
>
  <Input type="email" defaultValue="correo@" autoComplete="email" />
</Field>

<Field label="Cliente" description="Asignado desde KURA." disabled>
  <Input defaultValue="KURA-0142" readOnly />
</Field>`,
      },
      {
        id: "orientation",
        title: { es: "Orientación horizontal", ja: "横向きの配置", en: "Horizontal orientation" },
        description: {
          es: 'orientation="horizontal" lleva la etiqueta a una columna de 140 px desde sm. FormRow es el atajo para este mismo patrón.',
          ja: 'orientation="horizontal" は sm 以上でラベルを 140 px の列に置きます。FormRow は同じパターンの近道です。',
          en: 'orientation="horizontal" moves the label into a 140 px column at sm and up. FormRow is the shortcut for this same pattern.',
        },
        preview: (
          <Field
            className="max-w-xl"
            label="Teléfono"
            description="Incluye el código de país."
            orientation="horizontal"
          >
            <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
          </Field>
        ),
        code: `<Field
  className="max-w-xl"
  label="Teléfono"
  description="Incluye el código de país."
  orientation="horizontal"
>
  <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
</Field>`,
      },
    ],
    formExample: {
      title: { es: "Alta de cliente", ja: "顧客の登録", en: "Create a customer" },
      description: {
        es: "Etiqueta, ayuda, obligatorio y envío en un formulario mínimo y completo.",
        ja: "ラベル、補足、必須、送信を最小限のフォームにまとめました。",
        en: "Label, help text, required state and submission in a minimal, complete form.",
      },
      preview: (
        <form
          className="grid max-w-md gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field
            label="Correo de contacto"
            description="Solo lo usamos para avisos del pedido."
            required
          >
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
            />
          </Field>
          <Field label="Teléfono" description="Con código de país.">
            <Input type="tel" name="phone" autoComplete="tel" placeholder="+81 90 1234 5678" />
          </Field>
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
            <Button type="submit" variant="primary">
              Guardar cliente
            </Button>
            <Button type="reset" variant="ghost">
              Limpiar
            </Button>
          </div>
        </form>
      ),
      code: `<form className="grid max-w-md gap-[var(--koten-gap)]">
  <Field
    label="Correo de contacto"
    description="Solo lo usamos para avisos del pedido."
    required
  >
    <Input
      type="email"
      name="email"
      autoComplete="email"
      placeholder="nombre@ejemplo.com"
    />
  </Field>

  <Field label="Teléfono" description="Con código de país.">
    <Input type="tel" name="phone" autoComplete="tel" placeholder="+81 90 1234 5678" />
  </Field>

  <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
    <Button type="submit" variant="primary">Guardar cliente</Button>
    <Button type="reset" variant="ghost">Limpiar</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Obligatorio. Field lo asocia al control y añade el asterisco cuando required está activo.",
          ja: "必須です。Field がコントロールに関連付け、required が有効ならアスタリスクを付けます。",
          en: "Required. Field associates it with the control and adds the asterisk when required is set.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se enlaza al control con aria-describedby, junto con el error cuando existe.",
          ja: "エラーがある場合はエラーとともに、aria-describedby でコントロールに紐づきます。",
          en: "Linked to the control with aria-describedby, together with the error when one exists.",
        },
      },
      {
        prop: "error",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Activa aria-invalid, pinta el borde en danger y anuncia el mensaje con aria-live polite.",
          ja: "aria-invalid を有効にし、危険色の枠線を付け、aria-live polite でメッセージを通知します。",
          en: "Activates aria-invalid, paints the border in danger and announces the message with aria-live polite.",
        },
      },
      {
        prop: "required",
        type: "boolean",
        default: "false",
        note: {
          es: "Marca visual y atributo required en el control; no cambia la validación por sí solo.",
          ja: "視覚的なマークと required 属性をコントロールに付けます。単独では検証を行いません。",
          en: "Adds the visual mark and the required attribute to the control; it does not validate on its own.",
        },
      },
      {
        prop: "orientation",
        type: "vertical | horizontal",
        default: "vertical",
        note: {
          es: "horizontal usa una etiqueta de 140 px desde sm y vuelve a vertical en mobile.",
          ja: "horizontal は sm 以上で 140 px のラベルを使い、モバイルでは縦積みに戻ります。",
          en: "horizontal uses a 140 px label at sm and up, and returns to vertical on mobile.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Deshabilita el control y atenúa etiqueta y ayuda; el estado se hereda.",
          ja: "コントロールを無効化し、ラベルと補足を淡くします。状態は継承されます。",
          en: "Disables the control and fades label and help text; the state is inherited.",
        },
      },
    ],
    a11y: {
      es: [
        "Field asocia la etiqueta con el control; no agregues un segundo <label> ni uses el placeholder como nombre.",
        "description y error se enlazan con aria-describedby; el error además activa aria-invalid.",
        "required añade el atributo al control y un asterisco aria-hidden; el texto de la etiqueta debe entenderse sin el asterisco.",
        "disabled se propaga al control; si el dato debe poder leerse y copiarse, usa readOnly en lugar de disabled.",
      ],
      ja: [
        "Field がラベルとコントロールを関連付けます。二つ目の <label> を足したり、プレースホルダーを名前の代わりにしたりしないでください。",
        "description と error は aria-describedby で紐づき、error はさらに aria-invalid を有効にします。",
        "required はコントロールに属性を付け、aria-hidden のアスタリスクを追加します。アスタリスクがなくても伝わるラベルにしてください。",
        "disabled はコントロールに伝播します。値を読んだりコピーしたりする必要がある場合は disabled ではなく readOnly を使います。",
      ],
      en: [
        "Field associates the label with the control; do not add a second <label> or use the placeholder as the name.",
        "description and error are linked with aria-describedby; the error also activates aria-invalid.",
        "required adds the attribute to the control and an aria-hidden asterisk; the label text must still read clearly without it.",
        "disabled propagates to the control; when the value must remain readable and copyable, use readOnly instead.",
      ],
    },
  },
  {
    slug: "label",
    id: "C-062",
    name: "Label",
    jp: "ラベル",
    description: {
      es: "Etiqueta visible de un control. Dentro de Field se conecta sola; fuera de Field usa htmlFor y conserva el mismo aspecto y el mismo foco.",
      ja: "コントロールの可視ラベルです。Field の中では自動で関連付き、外では htmlFor を使って同じ見た目とフォーカスを保ちます。",
      en: "The visible label of a control. Inside Field it connects itself; outside Field it uses htmlFor and keeps the same look and focus.",
    },
    baseUi: "https://base-ui.com/react/components/field",
    files: filesFor(uiFile("label.tsx")),
    examples: [
      {
        id: "inside-field",
        title: { es: "Dentro de Field", ja: "Field の中", en: "Inside Field" },
        description: {
          es: "Field renderiza Label y gestiona htmlFor, required y el estado deshabilitado.",
          ja: "Field が Label を描画し、htmlFor、required、無効状態を管理します。",
          en: "Field renders Label and manages htmlFor, required and the disabled state.",
        },
        preview: (
          <div className="max-w-md">
            <Field label="Código de cliente" description="Se genera al guardar." required>
              <Input placeholder="KURA-0142" />
            </Field>
          </div>
        ),
        code: `<Field label="Código de cliente" description="Se genera al guardar." required>
  <Input placeholder="KURA-0142" />
</Field>`,
      },
      {
        id: "standalone",
        title: { es: "Uso independiente", ja: "単独での使用", en: "Standalone use" },
        description: {
          es: "Fuera de Field, htmlFor debe apuntar al id del control. La etiqueta sigue siendo un <label> nativo.",
          ja: "Field の外では htmlFor をコントロールの id に合わせます。ラベルはネイティブの <label> のままです。",
          en: "Outside Field, htmlFor must point to the control id. The label remains a native <label>.",
        },
        preview: (
          <div className="grid max-w-sm gap-[calc(var(--koten-gap)*0.5)]">
            <Label htmlFor="form-label-standalone" required>
              Nombre del cliente
            </Label>
            <Input id="form-label-standalone" placeholder="KURA Distribución" />
          </div>
        ),
        code: `<Label htmlFor="customer-name" required>
  Nombre del cliente
</Label>
<Input id="customer-name" placeholder="KURA Distribución" />`,
      },
    ],
    formExample: {
      title: { es: "Etiqueta independiente", ja: "単独のラベル", en: "Standalone label" },
      description: {
        es: "Label con htmlFor, ayuda vinculada y envío, sin depender de Field.",
        ja: "Field に依存せず、htmlFor と紐づいた補足、送信を備えた例です。",
        en: "A Label with htmlFor, linked help text and submission, without relying on Field.",
      },
      preview: (
        <form
          className="grid max-w-md gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-[calc(var(--koten-gap)*0.5)]">
            <Label htmlFor="form-label-name" required>
              Nombre del cliente
            </Label>
            <Input
              id="form-label-name"
              name="customer"
              autoComplete="organization"
              aria-describedby="form-label-name-hint"
              required
            />
            <p id="form-label-name-hint" className="text-2xs leading-relaxed text-faint">
              Tal como aparece en la factura.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
            <Button type="submit" variant="primary">
              Guardar cliente
            </Button>
          </div>
        </form>
      ),
      code: `<form className="grid max-w-md gap-[var(--koten-gap)]">
  <div className="grid gap-[calc(var(--koten-gap)*0.5)]">
    <Label htmlFor="customer-name" required>Nombre del cliente</Label>
    <Input
      id="customer-name"
      name="customer"
      autoComplete="organization"
      aria-describedby="customer-name-hint"
      required
    />
    <p id="customer-name-hint" className="text-2xs leading-relaxed text-faint">
      Tal como aparece en la factura.
    </p>
  </div>

  <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
    <Button type="submit" variant="primary">Guardar cliente</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Texto visible de la etiqueta; debe nombrar el dato, no describir el formato.",
          ja: "ラベルの可視テキストです。書式ではなく、項目名を示します。",
          en: "Visible label text; it should name the field, not describe its format.",
        },
      },
      {
        prop: "htmlFor",
        type: "string",
        default: "—",
        note: {
          es: "Id del control cuando se usa fuera de Field; dentro lo gestiona Base UI.",
          ja: "Field の外で使う場合のコントロール id です。中では Base UI が管理します。",
          en: "Control id when used outside Field; inside, Base UI manages it.",
        },
      },
      {
        prop: "required",
        type: "boolean",
        default: "false",
        note: {
          es: "Añade un asterisco aria-hidden; no sustituye el atributo required del control.",
          ja: "aria-hidden のアスタリスクを追加します。コントロールの required 属性の代わりにはなりません。",
          en: "Adds an aria-hidden asterisk; it does not replace the control's required attribute.",
        },
      },
      {
        prop: "render",
        type: "ReactElement | function",
        default: "—",
        note: {
          es: "Composición de Base UI para cambiar el elemento raíz sin perder la asociación.",
          ja: "関連付けを保ったままルート要素を変える Base UI の合成です。",
          en: "Base UI composition to change the root element without losing the association.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Ajustes locales; el tamaño y el peso base salen de los tokens.",
          ja: "局所的な調整用です。基本のサイズと太さはトークンから決まります。",
          en: "Local adjustments; base size and weight come from the tokens.",
        },
      },
    ],
    a11y: {
      es: [
        "Cada control necesita una etiqueta visible; el placeholder solo acompaña y desaparece al escribir.",
        "Fuera de Field, htmlFor debe coincidir exactamente con el id del control.",
        "El asterisco de required es aria-hidden: comunica la obligación también con el atributo required o con texto.",
        "No anides enlaces ni botones dentro de la etiqueta; el clic debe activar únicamente el control.",
      ],
      ja: [
        "各コントロールには可視ラベルが必要です。プレースホルダーは補助にすぎず、入力すると消えます。",
        "Field の外では htmlFor をコントロールの id と完全に一致させます。",
        "required のアスタリスクは aria-hidden です。required 属性やテキストでも必須であることを伝えてください。",
        "ラベルの中にリンクやボタンを入れ子にしないでください。クリックはコントロールだけを操作するべきです。",
      ],
      en: [
        "Every control needs a visible label; the placeholder only assists and disappears once the user types.",
        "Outside Field, htmlFor must match the control id exactly.",
        "The required asterisk is aria-hidden: convey the requirement with the required attribute or with text as well.",
        "Do not nest links or buttons inside the label; a click should activate only the control.",
      ],
    },
  },
  {
    slug: "input",
    id: "C-007",
    name: "Input",
    jp: "入力",
    description: {
      es: "Campo de texto de una línea sobre el control nativo. Base UI aporta el vínculo con Field y el estado inválido sin alterar el comportamiento del navegador.",
      ja: "ネイティブのコントロールを使う1行のテキスト入力です。Base UI が Field との紐づきと無効状態を加え、ブラウザの挙動は変えません。",
      en: "A single-line text field built on the native control. Base UI adds the link to Field and the invalid state without changing browser behavior.",
    },
    files: filesFor(uiFile("input.tsx")),
    examples: [
      {
        id: "types",
        title: { es: "Tipos y tamaños", ja: "型とサイズ", en: "Types and sizes" },
        description: {
          es: "type y autoComplete activan el teclado y el autocompletado correctos; size solo ajusta el texto, no la altura.",
          ja: "type と autoComplete が適切なキーボードと自動補完を有効にします。size は文字だけを調整し、高さは変えません。",
          en: "type and autoComplete enable the right keyboard and autofill; size only adjusts the text, not the height.",
        },
        preview: (
          <div className="grid max-w-xl gap-[var(--koten-gap)] sm:grid-cols-2">
            <Field label="Nombre" description="Como figura en el pedido.">
              <Input placeholder="Aiko Tanaka" autoComplete="name" />
            </Field>
            <Field label="Correo" description="Solo para avisos." required>
              <Input type="email" placeholder="nombre@ejemplo.com" autoComplete="email" />
            </Field>
            <Field label="Teléfono" description="Con código de país.">
              <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
            </Field>
            <Field label="Código postal" description="Formato japonés.">
              <Input
                size="sm"
                inputMode="numeric"
                placeholder="150-0001"
                autoComplete="postal-code"
              />
            </Field>
          </div>
        ),
        code: `<Field label="Nombre" description="Como figura en el pedido.">
  <Input placeholder="Aiko Tanaka" autoComplete="name" />
</Field>

<Field label="Correo" description="Solo para avisos." required>
  <Input type="email" placeholder="nombre@ejemplo.com" autoComplete="email" />
</Field>

<Field label="Teléfono" description="Con código de país.">
  <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
</Field>

<Field label="Código postal" description="Formato japonés.">
  <Input size="sm" inputMode="numeric" placeholder="150-0001" autoComplete="postal-code" />
</Field>`,
      },
      {
        id: "states",
        title: { es: "Estados", ja: "状態", en: "States" },
        description: {
          es: "El error llega desde Field y activa aria-invalid; readOnly conserva el valor enfocable y disabled lo retira del orden de tabulación.",
          ja: "エラーは Field から届き aria-invalid を有効にします。readOnly は値をフォーカス可能なまま保ち、disabled はタブ順から外します。",
          en: "The error arrives from Field and activates aria-invalid; readOnly keeps the value focusable and disabled removes it from the tab order.",
        },
        preview: (
          <div className="grid max-w-xl gap-[var(--koten-gap)] sm:grid-cols-2">
            <Field label="Correo" error="El correo no es válido.">
              <Input type="email" defaultValue="correo@" autoComplete="email" />
            </Field>
            <Field label="Código de cliente" description="Solo lectura.">
              <Input defaultValue="KURA-0142" readOnly />
            </Field>
            <Field label="Cliente" description="Asignado desde KURA." disabled>
              <Input defaultValue="KURA Distribución" />
            </Field>
            <Field label="Búsqueda" description="Filtra la tabla.">
              <Input placeholder="Pedido, cliente o fecha" />
            </Field>
          </div>
        ),
        code: `<Field label="Correo" error="El correo no es válido.">
  <Input type="email" defaultValue="correo@" autoComplete="email" />
</Field>

<Field label="Código de cliente" description="Solo lectura.">
  <Input defaultValue="KURA-0142" readOnly />
</Field>

<Field label="Cliente" description="Asignado desde KURA." disabled>
  <Input defaultValue="KURA Distribución" />
</Field>`,
      },
    ],
    formExample: {
      title: { es: "Suscripción a avisos", ja: "お知らせの購読", en: "Notification signup" },
      description: {
        es: "Un Input dentro de Field con tipo, autocompletado y envío real.",
        ja: "型、自動補完、送信を備えた、Field 内の Input の例です。",
        en: "An Input inside Field with type, autofill and real submission.",
      },
      preview: (
        <form
          className="grid max-w-md gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field
            label="Correo de contacto"
            description="Recibirás el estado del pedido y nada más."
            required
          >
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
            />
          </Field>
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
            <Button type="submit" variant="primary">
              Suscribirme
            </Button>
          </div>
        </form>
      ),
      code: `<form className="grid max-w-md gap-[var(--koten-gap)]">
  <Field
    label="Correo de contacto"
    description="Recibirás el estado del pedido y nada más."
    required
  >
    <Input
      type="email"
      name="email"
      autoComplete="email"
      placeholder="nombre@ejemplo.com"
    />
  </Field>

  <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
    <Button type="submit" variant="primary">Suscribirme</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "type",
        type: "string",
        default: "text",
        note: {
          es: "Usa el tipo nativo correcto (email, tel, number) para el teclado y la validación del navegador.",
          ja: "適切なネイティブ型（email、tel、number）を使い、キーボードとブラウザ検証を活かします。",
          en: "Use the right native type (email, tel, number) for the keyboard and browser validation.",
        },
      },
      {
        prop: "size",
        type: "sm | md",
        default: "md",
        note: {
          es: "Ajusta el tamaño del texto; la altura siempre sale de --koten-control-h.",
          ja: "文字サイズを調整します。高さは常に --koten-control-h から決まります。",
          en: "Adjusts the text size; height always comes from --koten-control-h.",
        },
      },
      {
        prop: "aria-invalid",
        type: "boolean",
        default: "—",
        note: {
          es: "Se hereda del error de Field; pásalo solo si el estado inválido viene de otra fuente.",
          ja: "Field の error から継承されます。別の理由で無効な場合だけ明示します。",
          en: "Inherited from Field's error; pass it only when the invalid state comes from another source.",
        },
      },
      {
        prop: "required",
        type: "boolean",
        default: "—",
        note: {
          es: "Se hereda del Field contenedor y añade la validación nativa del navegador.",
          ja: "親の Field から継承され、ブラウザのネイティブ検証が加わります。",
          en: "Inherited from the containing Field and adds native browser validation.",
        },
      },
      {
        prop: "readOnly",
        type: "boolean",
        default: "false",
        note: {
          es: "Mantiene el valor visible y copiable, y el control sigue recibiendo foco.",
          ja: "値を表示・コピー可能なまま保ち、コントロールはフォーカスを受け取れます。",
          en: "Keeps the value visible and copyable, and the control can still receive focus.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Retira el control del orden de tabulación y lo pinta con el fondo tint.",
          ja: "コントロールをタブ順から外し、tint の背景で描画します。",
          en: "Removes the control from the tab order and paints it with the tint background.",
        },
      },
      {
        prop: "autoComplete",
        type: "string",
        default: "—",
        note: {
          es: "Indica al navegador qué dato rellenar; mejora la velocidad y evita errores de captura.",
          ja: "どのデータを補完するかをブラウザに伝え、入力の速さと正確さを高めます。",
          en: "Tells the browser which value to fill; improves speed and reduces typing errors.",
        },
      },
      {
        prop: "placeholder",
        type: "string",
        default: "—",
        note: {
          es: "Solo un ejemplo de formato; nunca sustituye a la etiqueta ni a la descripción.",
          ja: "書式の例にすぎません。ラベルや説明の代わりにはなりません。",
          en: "Only a format example; it never replaces the label or the description.",
        },
      },
    ],
    a11y: {
      es: [
        "Todo Input va dentro de un Field o acompañado de un Label con htmlFor; el placeholder no es un nombre accesible.",
        "type y autoComplete correctos reducen errores y activan el teclado adecuado en mobile.",
        "aria-invalid se hereda del error de Field; no lo dupliques ni lo contradigas.",
        "disabled sale del orden de tabulación; si el valor debe poder copiarse, prefiere readOnly.",
      ],
      ja: [
        "すべての Input は Field の中か、htmlFor を持つ Label と組み合わせます。プレースホルダーはアクセシブル名になりません。",
        "適切な type と autoComplete は入力ミスを減らし、モバイルで正しいキーボードを開きます。",
        "aria-invalid は Field の error から継承されます。重複させたり矛盾させたりしないでください。",
        "disabled はタブ順から外れます。値をコピーできる必要がある場合は readOnly を選びます。",
      ],
      en: [
        "Every Input sits inside a Field or next to a Label with htmlFor; the placeholder is not an accessible name.",
        "Correct type and autoComplete reduce errors and open the right keyboard on mobile.",
        "aria-invalid is inherited from Field's error; do not duplicate it or contradict it.",
        "disabled leaves the tab order; when the value must be copyable, prefer readOnly.",
      ],
    },
  },
  {
    slug: "textarea",
    id: "C-008",
    name: "Textarea",
    jp: "複数行",
    description: {
      es: "Campo de varias líneas para texto libre. Crece en vertical, conserva la altura mínima de la densidad y comparte los estados de Input.",
      ja: "自由記述のための複数行フィールドです。縦方向に伸び、密度に応じた最小高さを保ち、Input と同じ状態を共有します。",
      en: "A multi-line field for free text. It grows vertically, keeps the density minimum height and shares Input's states.",
    },
    files: filesFor(uiFile("textarea.tsx")),
    examples: [
      {
        id: "rows",
        title: { es: "Filas y tamaños", ja: "行数とサイズ", en: "Rows and sizes" },
        description: {
          es: "rows anticipa la cantidad de texto; el mínimo de dos alturas de control evita un campo demasiado bajo.",
          ja: "rows は文章量の目安です。コントロール高さの2倍という最小値が、低すぎる欄を防ぎます。",
          en: "rows hints at the amount of text; the two-control-height minimum prevents an overly short field.",
        },
        preview: (
          <div className="grid max-w-2xl gap-[var(--koten-gap)] lg:grid-cols-2">
            <Field label="Notas de entrega" description="Horario, acceso o instrucciones.">
              <Textarea rows={4} placeholder="Entregar después de las 14:00." />
            </Field>
            <Field label="Comentario interno" description="Visible solo para el equipo.">
              <Textarea size="sm" rows={2} placeholder="Revisar con almacén." />
            </Field>
          </div>
        ),
        code: `<Field label="Notas de entrega" description="Horario, acceso o instrucciones.">
  <Textarea rows={4} placeholder="Entregar después de las 14:00." />
</Field>

<Field label="Comentario interno" description="Visible solo para el equipo.">
  <Textarea size="sm" rows={2} placeholder="Revisar con almacén." />
</Field>`,
      },
      {
        id: "limit",
        title: { es: "Límite y error", ja: "上限とエラー", en: "Limit and error" },
        description: {
          es: "maxLength corta la entrada, pero el límite debe explicarse en la descripción visible y el error llega desde Field.",
          ja: "maxLength は入力を制限しますが、上限は可視の説明で伝え、エラーは Field から届けます。",
          en: "maxLength caps the input, but the limit belongs in the visible description and the error comes from Field.",
        },
        preview: (
          <div className="max-w-md">
            <Field
              label="Notas de entrega"
              description="Máximo 500 caracteres."
              error="Las notas de entrega son obligatorias."
            >
              <Textarea rows={3} maxLength={500} />
            </Field>
          </div>
        ),
        code: `<Field
  label="Notas de entrega"
  description="Máximo 500 caracteres."
  error="Las notas de entrega son obligatorias."
>
  <Textarea rows={3} maxLength={500} />
</Field>`,
      },
    ],
    formExample: {
      title: { es: "Notas de entrega", ja: "配送メモ", en: "Delivery notes" },
      description: {
        es: "Un Textarea obligatorio con límite visible, ayuda y envío.",
        ja: "上限を明示した必須の Textarea と、補足、送信をまとめた例です。",
        en: "A required Textarea with a visible limit, help text and submission.",
      },
      preview: (
        <form
          className="grid max-w-md gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field
            label="Notas de entrega"
            description="Máximo 500 caracteres. Indica horario, acceso o persona de contacto."
            required
          >
            <Textarea
              name="delivery-notes"
              rows={4}
              maxLength={500}
              placeholder="Entregar después de las 14:00 en la puerta lateral."
            />
          </Field>
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
            <Button type="submit" variant="primary">
              Guardar notas
            </Button>
          </div>
        </form>
      ),
      code: `<form className="grid max-w-md gap-[var(--koten-gap)]">
  <Field
    label="Notas de entrega"
    description="Máximo 500 caracteres. Indica horario, acceso o persona de contacto."
    required
  >
    <Textarea
      name="delivery-notes"
      rows={4}
      maxLength={500}
      placeholder="Entregar después de las 14:00 en la puerta lateral."
    />
  </Field>

  <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
    <Button type="submit" variant="primary">Guardar notas</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "rows",
        type: "number",
        default: "3",
        note: {
          es: "Altura inicial en líneas; el mínimo visual sigue siendo dos alturas de control.",
          ja: "初期の行数です。視覚的な最小値はコントロール高さの2倍のままです。",
          en: "Initial height in rows; the visual minimum remains two control heights.",
        },
      },
      {
        prop: "maxLength",
        type: "number",
        default: "—",
        note: {
          es: "Limita la entrada, pero el límite debe repetirse en la descripción visible.",
          ja: "入力を制限しますが、同じ上限を可視の説明にも書いてください。",
          en: "Caps the input, but the same limit must be repeated in the visible description.",
        },
      },
      {
        prop: "size",
        type: "sm | md",
        default: "md",
        note: {
          es: "Ajusta el texto y el padding; la altura mínima depende de la densidad.",
          ja: "文字と余白を調整します。最小高さは密度から決まります。",
          en: "Adjusts text and padding; the minimum height depends on density.",
        },
      },
      {
        prop: "aria-invalid",
        type: "boolean",
        default: "—",
        note: {
          es: "Se hereda del error de Field; no hace falta declararlo en el uso normal.",
          ja: "Field の error から継承されます。通常の使い方では明示不要です。",
          en: "Inherited from Field's error; it does not need to be declared in normal use.",
        },
      },
      {
        prop: "required",
        type: "boolean",
        default: "—",
        note: {
          es: "Se hereda del Field contenedor y activa la validación nativa.",
          ja: "親の Field から継承され、ネイティブ検証を有効にします。",
          en: "Inherited from the containing Field and enables native validation.",
        },
      },
      {
        prop: "readOnly",
        type: "boolean",
        default: "false",
        note: {
          es: "Permite leer y copiar el texto sin modificarlo.",
          ja: "変更せずにテキストを読んだりコピーしたりできます。",
          en: "Lets the text be read and copied without modification.",
        },
      },
      {
        prop: "disabled",
        type: "boolean",
        default: "false",
        note: {
          es: "Deshabilita el campo y lo retira del orden de tabulación.",
          ja: "フィールドを無効化し、タブ順から外します。",
          en: "Disables the field and removes it from the tab order.",
        },
      },
    ],
    a11y: {
      es: [
        "Textarea necesita una etiqueta visible y, si hay límite, la cifra debe estar en la descripción, no solo en maxLength.",
        "Solo se redimensiona en vertical para no romper el ancho de la página ni provocar scroll horizontal.",
        "Enter inserta un salto de línea; el envío debe hacerse con un botón explícito.",
        "El error se anuncia mediante Field con aria-invalid y aria-live polite, igual que en Input.",
      ],
      ja: [
        "Textarea には可視ラベルが必要です。上限がある場合は、maxLength だけでなく説明にも文字数を示します。",
        "縦方向にのみリサイズし、ページ幅を壊したり横スクロールを起こしたりしません。",
        "Enter は改行を挿入します。送信は明示的なボタンで行います。",
        "エラーは Input と同じく、Field を介して aria-invalid と aria-live polite で通知されます。",
      ],
      en: [
        "Textarea needs a visible label, and any limit belongs in the description, not only in maxLength.",
        "It resizes vertically only, so it never breaks the page width or causes horizontal scrolling.",
        "Enter inserts a line break; submission must happen through an explicit button.",
        "The error is announced through Field with aria-invalid and aria-live polite, exactly as in Input.",
      ],
    },
  },
  {
    slug: "form-row",
    registrySlug: "field",
    id: "C-015",
    name: "FormRow",
    jp: "横組み",
    description: {
      es: "Field en disposición horizontal: etiqueta a la izquierda y control a la derecha desde sm. En mobile vuelve a vertical para no comprimir el texto.",
      ja: "横向きに配置した Field です。sm 以上ではラベルを左、コントロールを右に置き、モバイルでは文字を圧縮しないよう縦積みに戻ります。",
      en: "Field in a horizontal layout: label on the left and control on the right from sm up. On mobile it returns to vertical so the text is not squeezed.",
    },
    baseUi: "https://base-ui.com/react/components/field",
    files: filesFor(uiFile("field.tsx")),
    examples: [
      {
        id: "horizontal",
        title: { es: "Formulario horizontal", ja: "横向きフォーム", en: "Horizontal form" },
        description: {
          es: "Tres filas con etiquetas cortas; la ayuda y el error ocupan la columna del control para mantener la lectura.",
          ja: "短いラベルを並べた3行です。補足とエラーはコントロールの列に置き、読みやすさを保ちます。",
          en: "Three rows with short labels; help text and errors sit in the control column to keep the reading flow.",
        },
        preview: (
          <div className="grid max-w-2xl gap-[var(--koten-gap)]">
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
        ),
        code: `<FormRow label="Cliente" description="Razón social" required>
  <Input placeholder="KURA Distribución" autoComplete="organization" />
</FormRow>

<FormRow label="Código" description="Identificador interno">
  <Input placeholder="KURA-0142" />
</FormRow>

<FormRow label="Notas">
  <Textarea rows={2} placeholder="Instrucciones internas" />
</FormRow>`,
      },
      {
        id: "error",
        title: { es: "Error en una fila", ja: "行内のエラー", en: "Error in a row" },
        description: {
          es: "El error se alinea bajo el control, no bajo la etiqueta, y conserva el anuncio accesible de Field.",
          ja: "エラーはラベルの下ではなくコントロールの下に揃え、Field のアクセシブルな通知を保ちます。",
          en: "The error aligns under the control, not under the label, and keeps Field's accessible announcement.",
        },
        preview: (
          <div className="max-w-2xl">
            <FormRow
              label="Correo"
              description="Solo para avisos del pedido."
              error="El correo no es válido."
            >
              <Input type="email" defaultValue="correo@" autoComplete="email" />
            </FormRow>
          </div>
        ),
        code: `<FormRow
  label="Correo"
  description="Solo para avisos del pedido."
  error="El correo no es válido."
>
  <Input type="email" defaultValue="correo@" autoComplete="email" />
</FormRow>`,
      },
    ],
    formExample: {
      title: { es: "Ficha de cliente", ja: "顧客情報", en: "Customer record" },
      description: {
        es: "Tres filas horizontales, una obligatoria, con ayuda y envío.",
        ja: "必須項目と補足を備えた3つの横向き行と、送信をまとめた例です。",
        en: "Three horizontal rows, one required, with help text and submission.",
      },
      preview: (
        <form
          className="grid max-w-2xl gap-[var(--koten-gap)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <FormRow label="Cliente" description="Razón social" required>
            <Input name="customer" autoComplete="organization" placeholder="KURA Distribución" />
          </FormRow>
          <FormRow label="Código" description="Identificador interno">
            <Input name="code" placeholder="KURA-0142" />
          </FormRow>
          <FormRow label="Correo" description="Solo para avisos del pedido.">
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
            />
          </FormRow>
          <div className="flex flex-wrap items-center gap-[var(--koten-gap)] sm:ps-[calc(140px+var(--koten-gap))]">
            <Button type="submit" variant="primary">
              Guardar ficha
            </Button>
          </div>
        </form>
      ),
      code: `<form className="grid max-w-2xl gap-[var(--koten-gap)]">
  <FormRow label="Cliente" description="Razón social" required>
    <Input name="customer" autoComplete="organization" placeholder="KURA Distribución" />
  </FormRow>

  <FormRow label="Código" description="Identificador interno">
    <Input name="code" placeholder="KURA-0142" />
  </FormRow>

  <FormRow label="Correo" description="Solo para avisos del pedido.">
    <Input
      type="email"
      name="email"
      autoComplete="email"
      placeholder="nombre@ejemplo.com"
    />
  </FormRow>

  <div className="flex flex-wrap items-center gap-[var(--koten-gap)] sm:ps-[calc(140px+var(--koten-gap))]">
    <Button type="submit" variant="primary">Guardar ficha</Button>
  </div>
</form>`,
    },
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Obligatorio. Mantenlo corto: la columna de 140 px deja poco espacio para textos largos.",
          ja: "必須です。140 px の列では長いテキストの余地が少ないため、短く保ちます。",
          en: "Required. Keep it short: the 140 px column leaves little room for long text.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se alinea bajo el control y se enlaza con aria-describedby.",
          ja: "コントロールの下に揃え、aria-describedby で紐づけます。",
          en: "Aligned under the control and linked with aria-describedby.",
        },
      },
      {
        prop: "error",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Sustituye el tono del borde y anuncia el mensaje; ocupa la columna del control.",
          ja: "枠線の色を変えてメッセージを通知し、コントロールの列を占めます。",
          en: "Changes the border tone and announces the message; it occupies the control column.",
        },
      },
      {
        prop: "required",
        type: "boolean",
        default: "false",
        note: {
          es: "Añade el asterisco y el atributo required, igual que en Field.",
          ja: "Field と同じく、アスタリスクと required 属性を追加します。",
          en: "Adds the asterisk and the required attribute, exactly as in Field.",
        },
      },
      {
        prop: "labelClassName",
        type: "string",
        default: "—",
        note: {
          es: "Ajustes de la columna de etiqueta; no cambies el ancho fijo sin una razón de contenido.",
          ja: "ラベル列の調整用です。内容上の理由がない限り固定幅は変えません。",
          en: "Label column adjustments; do not change the fixed width without a content reason.",
        },
      },
      {
        prop: "controlClassName",
        type: "string",
        default: "—",
        note: {
          es: "Ajustes de la columna del control; útil para limitar el ancho de un campo concreto.",
          ja: "コントロール列の調整用です。特定の項目の幅を制限するときに使います。",
          en: "Control column adjustments; useful for limiting the width of a specific field.",
        },
      },
    ],
    a11y: {
      es: [
        "FormRow es Field con orientation horizontal: conserva el orden de lectura etiqueta y después control.",
        "Desde sm la etiqueta ocupa 140 px; en mobile se apila para no cortar palabras.",
        "Mantén las etiquetas cortas: la descripción y el error van en la columna del control, no debajo de la etiqueta.",
        "El error se anuncia igual que en Field, con aria-invalid y aria-live polite.",
      ],
      ja: [
        "FormRow は orientation を horizontal にした Field です。ラベル、次にコントロールという読み上げ順を保ちます。",
        "sm 以上ではラベルが 140 px を占め、モバイルでは単語を切らないよう縦積みになります。",
        "ラベルは短く保ちます。説明とエラーはラベルの下ではなく、コントロールの列に置きます。",
        "エラーは Field と同じく、aria-invalid と aria-live polite で通知されます。",
      ],
      en: [
        "FormRow is Field with orientation horizontal: it keeps the reading order of label first, then control.",
        "At sm and up the label takes 140 px; on mobile it stacks so words are not cut.",
        "Keep labels short: description and error live in the control column, not under the label.",
        "The error is announced exactly as in Field, with aria-invalid and aria-live polite.",
      ],
    },
  },
];
