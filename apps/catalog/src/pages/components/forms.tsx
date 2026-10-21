import { Field, FormRow, Input, type KotenLocale, Label, Textarea, useKoten } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · 入力",
    title: "Formularios base",
    description:
      "Field, Label, Input, Textarea y FormRow comparten una sola fuente de verdad para label, descripción, error y estado. La densidad decide la altura; la semántica decide el resto.",
    field: {
      title: "Field e Input",
      meta: "Label, descripción, error y required",
      defaultDemo: "Default",
      requiredDemo: "Required",
      errorDemo: "Error",
      disabledDemo: "Disabled",
      email: "Correo",
      emailDescription: "Lo usamos solo para avisos del pedido.",
      emailPlaceholder: "nombre@ejemplo.com",
      emailInvalid: "El correo no es válido.",
      emailValue: "correo@",
      phone: "Teléfono",
      phoneDescription: "Con código de país.",
      customer: "Cliente",
      customerDescription: "El cliente se asigna desde KURA.",
    },
    textarea: {
      title: "Textarea",
      meta: "Altura mínima, resize vertical",
      messageDemo: "Mensaje",
      notes: "Notas de entrega",
      notesDescription: "Máximo 500 caracteres.",
      notesPlaceholder: "Horario, acceso o instrucciones para el reparto.",
      comment: "Comentario",
      commentDescription: "Cuéntanos qué ocurrió.",
      commentError: "El comentario es obligatorio.",
    },
    formRow: {
      meta: "Label de 140 px en desktop; vertical en mobile",
      demo: "Formulario de cliente",
      customer: "Cliente",
      customerDescription: "Razón social",
      customerPlaceholder: "KURA Distribución",
      code: "Código",
      codeDescription: "Identificador interno",
      notes: "Notas",
      notesPlaceholder: "Instrucciones internas",
    },
    label: {
      meta: "Dentro de Field o con htmlFor",
      demo: "Uso independiente",
      text: "Etiqueta independiente",
      placeholder: "Asociada con htmlFor",
    },
    props: {
      title: "Props y código",
      meta: "API de composición",
      fieldCaption: "Props de Field",
      inputCaption: "Props de Input y Textarea",
      fieldNotes: {
        label: "Obligatorio; se asocia automáticamente al control.",
        description: "Se enlaza con aria-describedby.",
        error: "Fuerza aria-invalid y el mensaje de error.",
        required: "Marca visual y atributo required en el control.",
        orientation: "FormRow usa horizontal con label de 140 px en sm+.",
      },
      inputNotes: {
        size: "Ajusta el tamaño del texto; la altura sale de la densidad.",
        ariaInvalid: "Se hereda del error de Field si no se pasa explícito.",
        required: "Se hereda del Field contenedor.",
        render: "Composición de Base UI; Textarea la usa para renderizar textarea.",
      },
      functionType: "ReactElement | función",
    },
    code: `<Field label="Correo" description="Solo para avisos." required>
  <Input type="email" autoComplete="email" />
</Field>

<Field label="Notas" error="El comentario es obligatorio.">
  <Textarea rows={4} maxLength={500} />
</Field>

<FormRow label="Cliente" description="Razón social" required>
  <Input placeholder="KURA Distribución" />
</FormRow>`,
    a11y: {
      title: "Accesibilidad",
      meta: "Label real y error vinculado",
      label: "Notas de accesibilidad de formularios",
      items: [
        "Cada control tiene label visible; el placeholder no es label.",
        "Field enlaza label, description y error con el control mediante Base UI.",
        "El error usa aria-invalid y aria-describedby; el mensaje se anuncia con aria-live polite.",
        "Deshabilitado se propaga desde Field al control; el foco visible se mantiene en enabled.",
        "FormRow cambia a vertical en mobile para no comprimir el label.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · 入力",
    title: "基本フォーム",
    description:
      "Field、Label、Input、Textarea、FormRow は、ラベル・説明・エラー・状態のための単一の情報源を共有します。高さは密度が決め、それ以外は意味づけが決めます。",
    field: {
      title: "Field と Input",
      meta: "ラベル・説明・エラー・必須",
      defaultDemo: "既定",
      requiredDemo: "必須",
      errorDemo: "エラー",
      disabledDemo: "無効",
      email: "メールアドレス",
      emailDescription: "注文のお知らせにのみ使用します。",
      emailPlaceholder: "name@example.com",
      emailInvalid: "メールアドレスが正しくありません。",
      emailValue: "email@",
      phone: "電話番号",
      phoneDescription: "国コード付き。",
      customer: "顧客",
      customerDescription: "顧客は KURA から割り当てられます。",
    },
    textarea: {
      title: "Textarea",
      meta: "最小高さ・縦方向のリサイズ",
      messageDemo: "メッセージ",
      notes: "配送メモ",
      notesDescription: "最大500文字。",
      notesPlaceholder: "時間帯、搬入経路、配達への指示など。",
      comment: "コメント",
      commentDescription: "状況を教えてください。",
      commentError: "コメントは必須です。",
    },
    formRow: {
      meta: "デスクトップでは 140 px のラベル、モバイルでは縦積み",
      demo: "顧客フォーム",
      customer: "顧客",
      customerDescription: "会社名",
      customerPlaceholder: "KURA 流通",
      code: "コード",
      codeDescription: "内部識別子",
      notes: "メモ",
      notesPlaceholder: "内部向けの指示",
    },
    label: {
      meta: "Field 内、または htmlFor で関連付け",
      demo: "単独での使用",
      text: "独立したラベル",
      placeholder: "htmlFor で関連付け",
    },
    props: {
      title: "プロパティとコード",
      meta: "合成API",
      fieldCaption: "Field のプロパティ",
      inputCaption: "Input と Textarea のプロパティ",
      fieldNotes: {
        label: "必須です。コントロールに自動で関連付けられます。",
        description: "aria-describedby でリンクされます。",
        error: "aria-invalid とエラーメッセージを強制します。",
        required: "視覚的なマークと required 属性をコントロールに付けます。",
        orientation: "FormRow は sm 以上で 140 px のラベルを持つ horizontal を使います。",
      },
      inputNotes: {
        size: "文字サイズを調整します。高さは密度から決まります。",
        ariaInvalid: "明示しない場合は Field の error から継承されます。",
        required: "親の Field から継承されます。",
        render: "Base UI の合成。Textarea はこれを使って textarea を描画します。",
      },
      functionType: "ReactElement | 関数",
    },
    code: `<Field label="メールアドレス" description="お知らせのみ。" required>
  <Input type="email" autoComplete="email" />
</Field>

<Field label="メモ" error="コメントは必須です。">
  <Textarea rows={4} maxLength={500} />
</Field>

<FormRow label="顧客" description="会社名" required>
  <Input placeholder="KURA 流通" />
</FormRow>`,
    a11y: {
      title: "アクセシビリティ",
      meta: "実ラベルと紐づいたエラー",
      label: "フォームのアクセシビリティに関する注記",
      items: [
        "各コントロールには可視のラベルがあります。プレースホルダーはラベルの代わりになりません。",
        "Field は Base UI を介して、ラベル・説明・エラーをコントロールに紐づけます。",
        "エラーは aria-invalid と aria-describedby を使い、メッセージは aria-live polite で通知されます。",
        "無効状態は Field からコントロールへ伝播し、可視フォーカスは有効時に保たれます。",
        "FormRow はモバイルで縦積みに切り替わり、ラベルを圧縮しません。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 入力",
    title: "Base forms",
    description:
      "Field, Label, Input, Textarea and FormRow share a single source of truth for label, description, error and state. Density decides the height; semantics decide the rest.",
    field: {
      title: "Field and Input",
      meta: "Label, description, error and required",
      defaultDemo: "Default",
      requiredDemo: "Required",
      errorDemo: "Error",
      disabledDemo: "Disabled",
      email: "Email",
      emailDescription: "We only use it for order notifications.",
      emailPlaceholder: "name@example.com",
      emailInvalid: "The email address is not valid.",
      emailValue: "email@",
      phone: "Phone",
      phoneDescription: "With country code.",
      customer: "Customer",
      customerDescription: "The customer is assigned from KURA.",
    },
    textarea: {
      title: "Textarea",
      meta: "Minimum height, vertical resize",
      messageDemo: "Message",
      notes: "Delivery notes",
      notesDescription: "Maximum 500 characters.",
      notesPlaceholder: "Time window, access or delivery instructions.",
      comment: "Comment",
      commentDescription: "Tell us what happened.",
      commentError: "The comment is required.",
    },
    formRow: {
      meta: "140 px label on desktop; vertical on mobile",
      demo: "Customer form",
      customer: "Customer",
      customerDescription: "Company name",
      customerPlaceholder: "KURA Distribution",
      code: "Code",
      codeDescription: "Internal identifier",
      notes: "Notes",
      notesPlaceholder: "Internal instructions",
    },
    label: {
      meta: "Inside Field or with htmlFor",
      demo: "Standalone use",
      text: "Standalone label",
      placeholder: "Associated with htmlFor",
    },
    props: {
      title: "Props and code",
      meta: "Composition API",
      fieldCaption: "Field props",
      inputCaption: "Input and Textarea props",
      fieldNotes: {
        label: "Required; it is associated with the control automatically.",
        description: "Linked with aria-describedby.",
        error: "Forces aria-invalid and the error message.",
        required: "Visual mark and required attribute on the control.",
        orientation: "FormRow uses horizontal with a 140 px label at sm and up.",
      },
      inputNotes: {
        size: "Adjusts the text size; height comes from density.",
        ariaInvalid: "Inherited from Field's error when not passed explicitly.",
        required: "Inherited from the containing Field.",
        render: "Base UI composition; Textarea uses it to render a textarea.",
      },
      functionType: "ReactElement | function",
    },
    code: `<Field label="Email" description="Notifications only." required>
  <Input type="email" autoComplete="email" />
</Field>

<Field label="Notes" error="The comment is required.">
  <Textarea rows={4} maxLength={500} />
</Field>

<FormRow label="Customer" description="Company name" required>
  <Input placeholder="KURA Distribution" />
</FormRow>`,
    a11y: {
      title: "Accessibility",
      meta: "Real label and linked error",
      label: "Accessibility notes for forms",
      items: [
        "Every control has a visible label; the placeholder is not a label.",
        "Field links label, description and error to the control through Base UI.",
        "The error uses aria-invalid and aria-describedby; the message is announced with aria-live polite.",
        "Disabled propagates from Field to the control; visible focus is kept while enabled.",
        "FormRow switches to vertical on mobile so the label is not compressed.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const fieldProps = (t: Copy) => [
  { prop: "label", type: "ReactNode", default: "—", note: t.props.fieldNotes.label },
  {
    prop: "description",
    type: "ReactNode",
    default: "—",
    note: t.props.fieldNotes.description,
  },
  { prop: "error", type: "ReactNode", default: "—", note: t.props.fieldNotes.error },
  { prop: "required", type: "boolean", default: "false", note: t.props.fieldNotes.required },
  {
    prop: "orientation",
    type: "vertical | horizontal",
    default: "vertical",
    note: t.props.fieldNotes.orientation,
  },
];

const inputProps = (t: Copy) => [
  { prop: "size", type: "sm | md", default: "md", note: t.props.inputNotes.size },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "—",
    note: t.props.inputNotes.ariaInvalid,
  },
  { prop: "required", type: "boolean", default: "—", note: t.props.inputNotes.required },
  { prop: "render", type: t.props.functionType, default: "—", note: t.props.inputNotes.render },
];

export function FormsPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="入力"
        description={t.description}
        meta="default · focus · error · disabled · horizontal"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="field" title={t.field.title} jp="欄" meta={t.field.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title={t.field.defaultDemo}>
              <Field label={t.field.email} description={t.field.emailDescription}>
                <Input type="email" placeholder={t.field.emailPlaceholder} autoComplete="email" />
              </Field>
            </Demo>

            <Demo title={t.field.requiredDemo}>
              <Field label={t.field.phone} description={t.field.phoneDescription} required>
                <Input type="tel" placeholder="+81 90 1234 5678" autoComplete="tel" />
              </Field>
            </Demo>

            <Demo title={t.field.errorDemo}>
              <Field
                label={t.field.email}
                description={t.field.emailDescription}
                error={t.field.emailInvalid}
              >
                <Input type="email" defaultValue={t.field.emailValue} autoComplete="email" />
              </Field>
            </Demo>

            <Demo title={t.field.disabledDemo}>
              <Field label={t.field.customer} description={t.field.customerDescription} disabled>
                <Input defaultValue="KURA-0142" readOnly />
              </Field>
            </Demo>
          </div>
        </Section>

        <Section id="textarea" title={t.textarea.title} jp="複数行" meta={t.textarea.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title={t.textarea.messageDemo}>
              <Field label={t.textarea.notes} description={t.textarea.notesDescription} required>
                <Textarea rows={4} maxLength={500} placeholder={t.textarea.notesPlaceholder} />
              </Field>
            </Demo>

            <Demo title={t.field.errorDemo}>
              <Field
                label={t.textarea.comment}
                description={t.textarea.commentDescription}
                error={t.textarea.commentError}
              >
                <Textarea rows={3} defaultValue="" />
              </Field>
            </Demo>
          </div>
        </Section>

        <Section id="form-row" title="FormRow" jp="横組み" meta={t.formRow.meta}>
          <Demo title={t.formRow.demo}>
            <div className="grid gap-[var(--koten-gap)]">
              <FormRow
                label={t.formRow.customer}
                description={t.formRow.customerDescription}
                required
              >
                <Input placeholder={t.formRow.customerPlaceholder} autoComplete="organization" />
              </FormRow>
              <FormRow label={t.formRow.code} description={t.formRow.codeDescription}>
                <Input placeholder="KURA-0142" />
              </FormRow>
              <FormRow label={t.formRow.notes}>
                <Textarea rows={2} placeholder={t.formRow.notesPlaceholder} />
              </FormRow>
            </div>
          </Demo>
        </Section>

        <Section id="label" title="Label" jp="ラベル" meta={t.label.meta}>
          <Demo title={t.label.demo}>
            <div className="grid max-w-sm gap-[var(--koten-gap)]">
              <div className="grid gap-[calc(var(--koten-gap)*0.5)]">
                <Label htmlFor="catalog-label-demo">{t.label.text}</Label>
                <Input id="catalog-label-demo" placeholder={t.label.placeholder} />
              </div>
            </div>
          </Demo>
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable caption={t.props.fieldCaption} rows={fieldProps(t)} />
          <PropsTable caption={t.props.inputCaption} rows={inputProps(t)} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11y.title} jp="配慮" meta={t.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
