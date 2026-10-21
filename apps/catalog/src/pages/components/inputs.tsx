import {
  Checkbox,
  Combobox,
  type KotenLocale,
  NumberField,
  RadioGroup,
  Select,
  Switch,
  useKoten,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · 入力部品",
    title: "Inputs avanzados",
    description:
      "Select, Combobox, Checkbox, RadioGroup, Switch y NumberField sobre Base UI. El teclado y los estados vienen del primitivo; el estilo, de los roles del sistema.",
    warehouses: [
      { value: "tokyo", label: "Tokio · 東京" },
      { value: "osaka", label: "Osaka · 大阪" },
      { value: "fukuoka", label: "Fukuoka · 福岡" },
      { value: "sapporo", label: "Sapporo · 札幌" },
    ],
    customers: ["KURA Distribución", "HIKARI Store", "Matsuri Foods", "Aoyama Retail"],
    disabledDemo: "Disabled",
    select: {
      meta: "Lista controlada por teclado",
      demo: "Almacén",
      label: "Almacén de salida",
      disabledLabel: "Almacén bloqueado",
    },
    combobox: {
      meta: "Filtro y selección",
      demo: "Cliente",
      label: "Cliente",
      disabledLabel: "Cliente bloqueado",
      emptyLabel: "Sin clientes",
      triggerLabel: "Abrir clientes",
      placeholder: "Buscar cliente…",
    },
    checkboxSwitch: {
      title: "Checkbox y Switch",
      meta: "Estados binarios",
      stockAlerts: "Recibir avisos de stock",
      stockAlertsDescription: "Solo productos críticos.",
      archived: "Incluir pedidos archivados",
      partial: "Selección parcial",
      notifications: "Notificaciones",
      notificationsDescription: "Avisos de pedidos y stock.",
      weekly: "Resumen semanal",
      weeklyDescription: "Cada lunes a las 09:00.",
    },
    radio: {
      meta: "Una opción por grupo",
      shipping: "Método de envío",
      standard: "Estándar",
      standardDescription: "3–5 días hábiles.",
      express: "Express",
      expressDescription: "24–48 horas.",
      pickup: "Retiro en tienda",
      pickupDescription: "Listo en 2 horas.",
      billing: "Facturación",
      monthly: "Mensual",
      annual: "Anual",
    },
    number: {
      meta: "Steppers y teclado",
      demo: "Cantidad",
      label: "Unidades",
      disabledLabel: "Cantidad bloqueada",
      decrement: "Restar una unidad",
      increment: "Sumar una unidad",
    },
    props: {
      title: "Props y código",
      meta: "API de los seis controles",
      selectCaption: "Props de Select y Combobox",
      advancedCaption: "Props de Checkbox, Switch, RadioGroup y NumberField",
      selectNotes: {
        label: "Label visible y nombre accesible.",
        items: "Select usa objetos; Combobox usa strings.",
        i18n: "Textos de i18n obligatorios en Combobox.",
        value: "Controlado o no controlado.",
        onValueChange: "Se dispara al elegir una opción.",
        modal:
          "Si es true, bloquea scroll e interacción fuera del popup. Koten usa false por defecto.",
      },
      advancedNotes: {
        label: "Label visible; description separada del nombre accesible.",
        checked: "Checkbox y Switch; RadioGroup usa value/defaultValue.",
        indeterminate: "Solo Checkbox; muestra un guion en lugar del check.",
        orientation: "Solo RadioGroup.",
        limits: "NumberField; los steppers respetan los límites.",
      },
    },
    code: `<Select label="Almacén" items={warehouses} defaultValue="tokyo" />

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
/>`,
    a11y: {
      title: "Accesibilidad",
      meta: "Teclado y semántica",
      label: "Notas de accesibilidad de inputs avanzados",
      items: [
        "Select y Combobox usan roles listbox/option y navegación por flechas.",
        "Select es no modal por defecto: abrir el popup no bloquea el scroll ni el resto de la página.",
        "Checkbox y Switch conservan el estado checked y un nombre accesible desde el label.",
        "RadioGroup vive en un grupo etiquetado; cada opción es un radio real.",
        "NumberField expone inputmode numérico y botones con aria-label.",
        "Las descripciones se muestran fuera del label para no contaminar el nombre accesible.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · 入力部品",
    title: "高度な入力",
    description:
      "Base UI 上の Select、Combobox、Checkbox、RadioGroup、Switch、NumberField。キーボード操作と状態はプリミティブが提供し、見た目はシステムの役割が決めます。",
    warehouses: [
      { value: "tokyo", label: "東京" },
      { value: "osaka", label: "大阪" },
      { value: "fukuoka", label: "福岡" },
      { value: "sapporo", label: "札幌" },
    ],
    customers: ["KURA 流通", "HIKARI Store", "Matsuri Foods", "Aoyama Retail"],
    disabledDemo: "無効",
    select: {
      meta: "キーボードで操作するリスト",
      demo: "倉庫",
      label: "出荷元倉庫",
      disabledLabel: "ロックされた倉庫",
    },
    combobox: {
      meta: "絞り込みと選択",
      demo: "顧客",
      label: "顧客",
      disabledLabel: "ロックされた顧客",
      emptyLabel: "顧客なし",
      triggerLabel: "顧客を開く",
      placeholder: "顧客を検索…",
    },
    checkboxSwitch: {
      title: "Checkbox と Switch",
      meta: "二値の状態",
      stockAlerts: "在庫のお知らせを受け取る",
      stockAlertsDescription: "重要な商品のみ。",
      archived: "アーカイブ済みの注文を含める",
      partial: "部分選択",
      notifications: "通知",
      notificationsDescription: "注文と在庫のお知らせ。",
      weekly: "週次サマリー",
      weeklyDescription: "毎週月曜 09:00。",
    },
    radio: {
      meta: "グループごとに1つ",
      shipping: "配送方法",
      standard: "標準",
      standardDescription: "3〜5営業日。",
      express: "Express",
      expressDescription: "24〜48時間。",
      pickup: "店頭受け取り",
      pickupDescription: "2時間で準備完了。",
      billing: "請求",
      monthly: "月次",
      annual: "年次",
    },
    number: {
      meta: "ステッパーとキーボード",
      demo: "数量",
      label: "個数",
      disabledLabel: "ロックされた数量",
      decrement: "1つ減らす",
      increment: "1つ増やす",
    },
    props: {
      title: "プロパティとコード",
      meta: "6つのコントロールのAPI",
      selectCaption: "Select と Combobox のプロパティ",
      advancedCaption: "Checkbox、Switch、RadioGroup、NumberField のプロパティ",
      selectNotes: {
        label: "可視ラベルであり、アクセシブル名でもあります。",
        items: "Select はオブジェクト、Combobox は文字列を使います。",
        i18n: "Combobox では必須の i18n テキストです。",
        value: "制御・非制御のいずれかです。",
        onValueChange: "選択時に発火します。",
        modal:
          "true の場合はポップアップ外のスクロールと操作をブロックします。Koten の既定値は false です。",
      },
      advancedNotes: {
        label: "可視ラベル。説明はアクセシブル名から分離します。",
        checked: "Checkbox と Switch 用。RadioGroup は value/defaultValue を使います。",
        indeterminate: "Checkbox のみ。チェックの代わりにダッシュを表示します。",
        orientation: "RadioGroup のみ。",
        limits: "NumberField 用。ステッパーは上限と下限に従います。",
      },
    },
    code: `<Select label="倉庫" items={warehouses} defaultValue="tokyo" />

<Combobox
  label="顧客"
  items={customers}
  emptyLabel="顧客なし"
  triggerLabel="顧客を開く"
/>

<Checkbox label="お知らせを受け取る" description="重要な在庫のみ。" />
<Switch label="通知" defaultChecked />
<RadioGroup label="配送" options={shippingOptions} />
<NumberField
  label="個数"
  defaultValue={1}
  decrementLabel="1つ減らす"
  incrementLabel="1つ増やす"
/>`,
    a11y: {
      title: "アクセシビリティ",
      meta: "キーボードとセマンティクス",
      label: "高度な入力のアクセシビリティに関する注記",
      items: [
        "Select と Combobox は listbox/option ロールと矢印キーによる移動を使います。",
        "Select は既定で非モーダルです。ポップアップを開いてもスクロールや他のページ操作をブロックしません。",
        "Checkbox と Switch は checked 状態を保ち、ラベルからアクセシブル名を得ます。",
        "RadioGroup はラベル付きのグループに属し、各選択肢は実際のラジオです。",
        "NumberField は数値の inputmode と aria-label 付きのボタンを公開します。",
        "説明はアクセシブル名を汚さないよう、ラベルの外に表示します。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 入力部品",
    title: "Advanced inputs",
    description:
      "Select, Combobox, Checkbox, RadioGroup, Switch and NumberField on Base UI. Keyboard behavior and states come from the primitive; styling comes from the system roles.",
    warehouses: [
      { value: "tokyo", label: "Tokyo · 東京" },
      { value: "osaka", label: "Osaka · 大阪" },
      { value: "fukuoka", label: "Fukuoka · 福岡" },
      { value: "sapporo", label: "Sapporo · 札幌" },
    ],
    customers: ["KURA Distribution", "HIKARI Store", "Matsuri Foods", "Aoyama Retail"],
    disabledDemo: "Disabled",
    select: {
      meta: "Keyboard-driven list",
      demo: "Warehouse",
      label: "Source warehouse",
      disabledLabel: "Locked warehouse",
    },
    combobox: {
      meta: "Filter and selection",
      demo: "Customer",
      label: "Customer",
      disabledLabel: "Locked customer",
      emptyLabel: "No customers",
      triggerLabel: "Open customers",
      placeholder: "Search customer…",
    },
    checkboxSwitch: {
      title: "Checkbox and Switch",
      meta: "Binary states",
      stockAlerts: "Receive stock alerts",
      stockAlertsDescription: "Critical products only.",
      archived: "Include archived orders",
      partial: "Partial selection",
      notifications: "Notifications",
      notificationsDescription: "Order and stock alerts.",
      weekly: "Weekly summary",
      weeklyDescription: "Every Monday at 09:00.",
    },
    radio: {
      meta: "One option per group",
      shipping: "Shipping method",
      standard: "Standard",
      standardDescription: "3–5 business days.",
      express: "Express",
      expressDescription: "24–48 hours.",
      pickup: "Store pickup",
      pickupDescription: "Ready in 2 hours.",
      billing: "Billing",
      monthly: "Monthly",
      annual: "Annual",
    },
    number: {
      meta: "Steppers and keyboard",
      demo: "Quantity",
      label: "Units",
      disabledLabel: "Locked quantity",
      decrement: "Decrease by one",
      increment: "Increase by one",
    },
    props: {
      title: "Props and code",
      meta: "API for the six controls",
      selectCaption: "Select and Combobox props",
      advancedCaption: "Checkbox, Switch, RadioGroup and NumberField props",
      selectNotes: {
        label: "Visible label and accessible name.",
        items: "Select uses objects; Combobox uses strings.",
        i18n: "Required i18n texts in Combobox.",
        value: "Controlled or uncontrolled.",
        onValueChange: "Fires when an option is chosen.",
        modal:
          "When true, it blocks scroll and interaction outside the popup. Koten defaults to false.",
      },
      advancedNotes: {
        label: "Visible label; description kept separate from the accessible name.",
        checked: "Checkbox and Switch; RadioGroup uses value/defaultValue.",
        indeterminate: "Checkbox only; shows a dash instead of the check.",
        orientation: "RadioGroup only.",
        limits: "NumberField; the steppers respect the limits.",
      },
    },
    code: `<Select label="Warehouse" items={warehouses} defaultValue="tokyo" />

<Combobox
  label="Customer"
  items={customers}
  emptyLabel="No customers"
  triggerLabel="Open customers"
/>

<Checkbox label="Receive alerts" description="Critical stock only." />
<Switch label="Notifications" defaultChecked />
<RadioGroup label="Shipping" options={shippingOptions} />
<NumberField
  label="Units"
  defaultValue={1}
  decrementLabel="Decrease"
  incrementLabel="Increase"
/>`,
    a11y: {
      title: "Accessibility",
      meta: "Keyboard and semantics",
      label: "Accessibility notes for advanced inputs",
      items: [
        "Select and Combobox use listbox/option roles and arrow-key navigation.",
        "Select is non-modal by default: opening the popup blocks neither scroll nor the rest of the page.",
        "Checkbox and Switch keep the checked state and an accessible name from the label.",
        "RadioGroup lives in a labelled group; each option is a real radio.",
        "NumberField exposes a numeric inputmode and buttons with aria-label.",
        "Descriptions render outside the label so the accessible name stays clean.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const selectProps = (t: Copy) => [
  { prop: "label", type: "string", default: "—", note: t.props.selectNotes.label },
  {
    prop: "items",
    type: "readonly { value, label }[] | readonly string[]",
    default: "—",
    note: t.props.selectNotes.items,
  },
  {
    prop: "emptyLabel / triggerLabel",
    type: "string",
    default: "—",
    note: t.props.selectNotes.i18n,
  },
  { prop: "value / defaultValue", type: "string", default: "—", note: t.props.selectNotes.value },
  {
    prop: "onValueChange",
    type: "(value: string | null) => void",
    default: "—",
    note: t.props.selectNotes.onValueChange,
  },
  { prop: "modal", type: "boolean", default: "false", note: t.props.selectNotes.modal },
];

const advancedProps = (t: Copy) => [
  {
    prop: "label / description",
    type: "ReactNode",
    default: "—",
    note: t.props.advancedNotes.label,
  },
  {
    prop: "checked / defaultChecked",
    type: "boolean",
    default: "false",
    note: t.props.advancedNotes.checked,
  },
  {
    prop: "indeterminate",
    type: "boolean",
    default: "false",
    note: t.props.advancedNotes.indeterminate,
  },
  {
    prop: "orientation",
    type: "vertical | horizontal",
    default: "vertical",
    note: t.props.advancedNotes.orientation,
  },
  {
    prop: "min / max / step",
    type: "number",
    default: "—",
    note: t.props.advancedNotes.limits,
  },
];

export function InputsPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="入力部品"
        description={t.description}
        meta="Select · Combobox · Checkbox · RadioGroup · Switch · NumberField"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="select" title="Select" jp="選択" meta={t.select.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title={t.select.demo}>
              <Select label={t.select.label} items={t.warehouses} defaultValue="tokyo" />
            </Demo>
            <Demo title={t.disabledDemo}>
              <Select
                label={t.select.disabledLabel}
                items={t.warehouses}
                defaultValue="osaka"
                disabled
              />
            </Demo>
          </div>
        </Section>

        <Section id="combobox" title="Combobox" jp="検索" meta={t.combobox.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title={t.combobox.demo}>
              <Combobox
                label={t.combobox.label}
                items={t.customers}
                emptyLabel={t.combobox.emptyLabel}
                triggerLabel={t.combobox.triggerLabel}
                placeholder={t.combobox.placeholder}
              />
            </Demo>
            <Demo title={t.disabledDemo}>
              <Combobox
                label={t.combobox.disabledLabel}
                items={t.customers}
                emptyLabel={t.combobox.emptyLabel}
                triggerLabel={t.combobox.triggerLabel}
                disabled
              />
            </Demo>
          </div>
        </Section>

        <Section
          id="checkbox-switch"
          title={t.checkboxSwitch.title}
          jp="切替"
          meta={t.checkboxSwitch.meta}
        >
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Checkbox">
              <div className="grid gap-[var(--koten-gap)]">
                <Checkbox
                  label={t.checkboxSwitch.stockAlerts}
                  description={t.checkboxSwitch.stockAlertsDescription}
                />
                <Checkbox label={t.checkboxSwitch.archived} defaultChecked />
                <Checkbox label={t.checkboxSwitch.partial} indeterminate />
              </div>
            </Demo>
            <Demo title="Switch">
              <div className="grid gap-[var(--koten-gap)]">
                <Switch
                  label={t.checkboxSwitch.notifications}
                  description={t.checkboxSwitch.notificationsDescription}
                  defaultChecked
                />
                <Switch
                  label={t.checkboxSwitch.weekly}
                  description={t.checkboxSwitch.weeklyDescription}
                />
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="radio" title="RadioGroup" jp="単一選択" meta={t.radio.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <RadioGroup
              label={t.radio.shipping}
              defaultValue="standard"
              options={[
                {
                  value: "standard",
                  label: t.radio.standard,
                  description: t.radio.standardDescription,
                },
                {
                  value: "express",
                  label: t.radio.express,
                  description: t.radio.expressDescription,
                },
                {
                  value: "pickup",
                  label: t.radio.pickup,
                  description: t.radio.pickupDescription,
                },
              ]}
            />
            <RadioGroup
              label={t.radio.billing}
              orientation="horizontal"
              defaultValue="monthly"
              options={[
                { value: "monthly", label: t.radio.monthly },
                { value: "annual", label: t.radio.annual },
              ]}
            />
          </div>
        </Section>

        <Section id="number" title="NumberField" jp="数量" meta={t.number.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title={t.number.demo}>
              <NumberField
                label={t.number.label}
                defaultValue={1}
                min={1}
                max={99}
                decrementLabel={t.number.decrement}
                incrementLabel={t.number.increment}
              />
            </Demo>
            <Demo title={t.disabledDemo}>
              <NumberField
                label={t.number.disabledLabel}
                defaultValue={12}
                disabled
                decrementLabel={t.number.decrement}
                incrementLabel={t.number.increment}
              />
            </Demo>
          </div>
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable caption={t.props.selectCaption} rows={selectProps(t)} />
          <PropsTable caption={t.props.advancedCaption} rows={advancedProps(t)} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11y.title} jp="配慮" meta={t.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
