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
import { Search } from "lucide-react";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

function ToastButton({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  const toast = useToast();

  return (
    <Button variant="primary" onClick={() => toast.add({ title, description, type: "success" })}>
      {label}
    </Button>
  );
}

export const feedbackDocs: PrimitiveDoc[] = [
  {
    slug: "alert",
    id: "C-018",
    name: "Alert",
    jp: "通知",
    description: {
      es: "Comunica el resultado de una acción o un riesgo del sistema. El tono declara la urgencia; el texto explica qué pasó y, si hace falta, cuál es el paso siguiente.",
      ja: "操作の結果やシステムのリスクを伝えます。トーンが緊急度を示し、テキストが何が起きたか、必要なら次の操作を説明します。",
      en: "Communicates the outcome of an action or a system risk. The tone declares urgency; the text explains what happened and, when needed, what to do next.",
    },
    files: filesFor(uiFile("alert.tsx")),
    examples: [
      {
        id: "tones",
        title: { es: "Tonos", ja: "トーン", en: "Tones" },
        description: {
          es: "info y success confirman sin interrumpir; el tono elige el icono y el borde izquierdo.",
          ja: "info と success は中断せずに確認を伝えます。トーンがアイコンと左側のボーダーを選びます。",
          en: "info and success confirm without interrupting; the tone picks the icon and the left border.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)]">
            <Alert tone="info" title="Information">
              The order will leave the Tokyo warehouse.
            </Alert>
            <Alert tone="success" title="Saved">
              Your changes were saved successfully.
            </Alert>
          </div>
        ),
        code: `<div className="grid gap-[var(--koten-gap)]">
  <Alert tone="info" title="Information">
    The order will leave the Tokyo warehouse.
  </Alert>
  <Alert tone="success" title="Saved">
    Your changes were saved successfully.
  </Alert>
</div>`,
      },
      {
        id: "urgency-action",
        title: { es: "Urgencia y acción", ja: "緊急度と操作", en: "Urgency and action" },
        description: {
          es: "warning y danger anuncian de inmediato; action agrega una salida sin competir con el texto.",
          ja: "warning と danger は即座に通知します。action は本文と競合しない出口を追加します。",
          en: "warning and danger announce immediately; action adds a way out without competing with the text.",
        },
        preview: (
          <div className="grid gap-[var(--koten-gap)]">
            <Alert
              tone="warning"
              title="Low stock"
              action={
                <Button size="xs" variant="outline">
                  Review
                </Button>
              }
            >
              3 units of HIKARI K-1 left.
            </Alert>
            <Alert tone="danger" title="Error">
              The payment could not be processed.
            </Alert>
          </div>
        ),
        code: `<Alert
  tone="warning"
  title="Low stock"
  action={<Button size="xs" variant="outline">Review</Button>}
>
  3 units of HIKARI K-1 left.
</Alert>
<Alert tone="danger" title="Error">
  The payment could not be processed.
</Alert>`,
      },
    ],
    props: [
      {
        prop: "tone",
        type: "info | success | warning | danger",
        default: "info",
        note: {
          es: "info y success usan role status; warning y danger usan role alert.",
          ja: "info と success は role status、warning と danger は role alert を使います。",
          en: "info and success use role status; warning and danger use role alert.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Título visible y nombre del aviso; sin él, el cuerpo debe explicarse solo.",
          ja: "可視の見出しで通知の名前になります。ない場合、本文だけで意味が通る必要があります。",
          en: "Visible heading and name of the notice; without it the body must stand on its own.",
        },
      },
      {
        prop: "icon",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Sustituye el icono del tono; debe seguir siendo decorativo (aria-hidden).",
          ja: "トーンのアイコンを置き換えます。装飾のまま（aria-hidden）にします。",
          en: "Replaces the tone icon; it must remain decorative (aria-hidden).",
        },
      },
      {
        prop: "action",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Acción al final del aviso; usa Button size xs con variante outline.",
          ja: "通知の末尾に置く操作です。Button size xs と outline を組み合わせます。",
          en: "Action at the end of the notice; use Button size xs with the outline variant.",
        },
      },
      {
        prop: "div props",
        type: 'ComponentProps<"div">',
        default: "—",
        note: {
          es: "Se reenvían al contenedor; no cambies role sin una razón semántica.",
          ja: "コンテナにそのまま渡されます。意味上の理由なく role を変えないでください。",
          en: "Forwarded to the container; do not override role without a semantic reason.",
        },
      },
    ],
    a11y: {
      es: [
        "info y success usan role status; warning y danger usan role alert. El tono decide el anuncio, no el color.",
        "El título visible nombra el aviso y se lee junto con el cuerpo.",
        "El icono es aria-hidden: el significado vive en el texto y el tono.",
        "La acción conserva su propio nombre accesible y el foco llega a ella después del mensaje.",
      ],
      ja: [
        "info と success は role status、warning と danger は role alert を使います。通知の強さはトーンが決め、色だけに頼りません。",
        "可視の見出しが通知の名前になり、本文と続けて読み上げられます。",
        "アイコンは aria-hidden です。意味はテキストとトーンが担います。",
        "操作は独自のアクセシブル名を保ち、メッセージの後にフォーカスが届きます。",
      ],
      en: [
        "info and success use role status; warning and danger use role alert. The tone decides the announcement, not the color.",
        "The visible title names the notice and is read together with the body.",
        "The icon is aria-hidden: meaning lives in the text and the tone.",
        "The action keeps its own accessible name, and focus reaches it after the message.",
      ],
    },
  },
  {
    slug: "toast",
    id: "C-019",
    name: "Toast",
    jp: "トースト",
    description: {
      es: "Notificación temporal que confirma una acción sin cortar el flujo. Se apila en una región propia, se cierra sola y conserva el texto de la operación.",
      ja: "操作を中断せずに確認を伝える一時的な通知です。専用の領域に積み重なり、自動で閉じ、操作の内容をテキストで残します。",
      en: "A temporary notification that confirms an action without cutting the flow. It stacks in its own region, closes on its own and keeps the text of the operation.",
    },
    baseUi: "https://base-ui.com/react/components/toast",
    requirements: [
      {
        kind: "provider",
        label: {
          es: "ToastProvider en la raíz",
          ja: "ルートの ToastProvider",
          en: "ToastProvider at the root",
        },
        detail: {
          es: "Envuelve la aplicación una sola vez y pasa closeLabel y regionLabel; el viewport y el portal viven dentro del provider.",
          ja: "アプリを一度だけ包み、closeLabel と regionLabel を渡します。ビューポートとポータルは Provider の中にあります。",
          en: "Wrap the application once and pass closeLabel and regionLabel; the viewport and portal live inside the provider.",
        },
      },
      {
        kind: "hook",
        label: {
          es: "useToast en un componente cliente",
          ja: "クライアントコンポーネントの useToast",
          en: "useToast in a client component",
        },
        detail: {
          es: "Llama a toast.add({ title, description, type }) dentro de un manejador; el hook solo funciona bajo ToastProvider.",
          ja: "ハンドラ内で toast.add({ title, description, type }) を呼びます。フックは ToastProvider の下でのみ動作します。",
          en: "Call toast.add({ title, description, type }) inside a handler; the hook only works under ToastProvider.",
        },
      },
    ],
    files: filesFor(uiFile("toast.tsx")),
    examples: [
      {
        id: "provider-hook",
        title: { es: "Provider y hook", ja: "Provider とフック", en: "Provider and hook" },
        description: {
          es: "Un botón local llama a useToast y añade el aviso; el provider dibuja la región y el cierre.",
          ja: "ローカルのボタンが useToast を呼び、通知を追加します。Provider が領域と閉じる操作を描画します。",
          en: "A local button calls useToast and adds the notice; the provider draws the region and the close control.",
        },
        preview: (
          <ToastProvider closeLabel="Close" regionLabel="Notifications">
            <ToastButton
              label="Show toast"
              title="Order updated"
              description="Order KURA-0142 moved to preparing."
            />
          </ToastProvider>
        ),
        code: `<ToastProvider closeLabel="Close" regionLabel="Notifications">
  <SaveButton />
</ToastProvider>

function SaveButton() {
  const toast = useToast();

  return (
    <Button
      variant="primary"
      onClick={() =>
        toast.add({
          title: "Order updated",
          description: "Order KURA-0142 moved to preparing.",
          type: "success",
        })
      }
    >
      Show toast
    </Button>
  );
}`,
      },
    ],
    props: [
      {
        prop: "closeLabel",
        type: "string",
        default: "requerido",
        note: {
          es: "Nombre accesible del botón de cierre; traduce según el idioma de la interfaz.",
          ja: "閉じるボタンのアクセシブル名です。UI の言語に合わせて翻訳します。",
          en: "Accessible name of the close button; translate it to the interface language.",
        },
      },
      {
        prop: "regionLabel",
        type: "string",
        default: "requerido",
        note: {
          es: "aria-label del viewport de notificaciones; describe la región, no el aviso.",
          ja: "通知ビューポートの aria-label です。通知ではなく領域を説明します。",
          en: "aria-label of the notification viewport; it describes the region, not the notice.",
        },
      },
      {
        prop: "timeout",
        type: "number",
        default: "5000",
        note: {
          es: "Milisegundos antes del cierre automático; el valor por defecto lo aporta Base UI.",
          ja: "自動で閉じるまでのミリ秒です。既定値は Base UI が提供します。",
          en: "Milliseconds before auto-close; the default comes from Base UI.",
        },
      },
      {
        prop: "limit",
        type: "number",
        default: "—",
        note: {
          es: "Máximo de toasts visibles; los nuevos sustituyen a los más antiguos.",
          ja: "同時に表示するトーストの上限です。新しいものが古いものを置き換えます。",
          en: "Maximum visible toasts; new ones replace the oldest.",
        },
      },
      {
        prop: "toast.add",
        type: "{ title, description, type }",
        default: "—",
        note: {
          es: "type acepta info, success, warning o danger; el mismo valor elige el icono.",
          ja: "type は info、success、warning、danger を受け付け、同じ値がアイコンを選びます。",
          en: "type accepts info, success, warning or danger; the same value picks the icon.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Árbol de la aplicación que puede abrir toasts; el provider debe permanecer montado.",
          ja: "トーストを開けるアプリのツリーです。Provider はマウントされたままにします。",
          en: "Application tree that can open toasts; the provider must stay mounted.",
        },
      },
    ],
    a11y: {
      es: [
        "El viewport es una región con aria-label igual a regionLabel; cada toast se anuncia al aparecer sin mover el foco.",
        "Cerrar usa un aria-label igual a closeLabel y conserva el foco dentro del toast.",
        "El cierre automático no debe ser la única vía para leer un cambio importante: repítelo con un Alert persistente.",
        "No pongas acciones esenciales solo en el toast; desaparece y no se puede recuperar.",
      ],
      ja: [
        "ビューポートは regionLabel を aria-label に持つ領域です。各トーストはフォーカスを動かさずに通知されます。",
        "閉じる操作は closeLabel を aria-label に使い、フォーカスをトースト内に保ちます。",
        "自動で閉じることが重要な変更を読む唯一の手段にならないよう、Alert でも残します。",
        "必須の操作をトーストだけに置かないでください。消えると取り戻せません。",
      ],
      en: [
        "The viewport is a region with aria-label set to regionLabel; each toast is announced without moving focus.",
        "Close uses aria-label set to closeLabel and keeps focus inside the toast.",
        "Auto-close must not be the only way to read an important change: repeat it with a persistent Alert.",
        "Do not put essential actions only in a toast; it disappears and cannot be recovered.",
      ],
    },
  },
  {
    slug: "progress",
    id: "C-020",
    name: "Progress",
    jp: "進捗",
    description: {
      es: "Mide cuánto falta para terminar una tarea con final conocido. Con un valor numérico es determinado; con null comunica que el trabajo sigue sin porcentaje.",
      ja: "終わりのあるタスクの残りを測ります。数値なら確定、null なら割合を示さず進行中であることを伝えます。",
      en: "Measures how much is left of a task with a known end. A numeric value is determinate; null communicates ongoing work without a percentage.",
    },
    baseUi: "https://base-ui.com/react/components/progress",
    files: filesFor(uiFile("progress.tsx")),
    examples: [
      {
        id: "determinate",
        title: { es: "Progreso determinado", ja: "確定した進捗", en: "Determinate progress" },
        description: {
          es: "El valor y el máximo definen la barra; el tono solo refuerza el resultado.",
          ja: "値と最大値がバーを決め、トーンは結果を補強するだけです。",
          en: "Value and max define the bar; the tone only reinforces the outcome.",
        },
        preview: (
          <div className="grid gap-[calc(var(--koten-gap)*2)]">
            <Progress label="Export" value={65} />
            <Progress label="Import" value={100} tone="success" />
          </div>
        ),
        code: `<Progress label="Export" value={65} />
<Progress label="Import" value={100} tone="success" />`,
      },
      {
        id: "indeterminate",
        title: { es: "Progreso indeterminado", ja: "不確定な進捗", en: "Indeterminate progress" },
        description: {
          es: "value={null} declara que no hay porcentaje: úsalo mientras el servidor no devuelva un total.",
          ja: "value={null} は割合がないことを示します。サーバーが総量を返すまで使います。",
          en: "value={null} declares there is no percentage: use it until the server returns a total.",
        },
        preview: <Progress label="Sync" value={null} tone="primary" />,
        code: `<Progress label="Sync" value={null} tone="primary" />`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "requerido",
        note: {
          es: "Nombre de la tarea; se asocia a la barra mediante Base UI.",
          ja: "タスクの名前です。Base UI によってバーに関連付けられます。",
          en: "Name of the task; Base UI associates it with the bar.",
        },
      },
      {
        prop: "value",
        type: "number | null",
        default: "requerido",
        note: {
          es: "null significa indeterminado; no se anuncia un porcentaje falso.",
          ja: "null は不確定を意味し、偽の割合は通知されません。",
          en: "null means indeterminate; no false percentage is announced.",
        },
      },
      {
        prop: "max",
        type: "number",
        default: "100",
        note: {
          es: "Total del recorrido; cámbialo cuando la tarea se mida en unidades.",
          ja: "全体の量です。タスクを単位で数える場合は変更します。",
          en: "Total of the run; change it when the task is measured in units.",
        },
      },
      {
        prop: "tone",
        type: "primary | success | warning | danger",
        default: "primary",
        note: {
          es: "Color del indicador; el estado también debe estar en el texto.",
          ja: "インジケーターの色です。状態はテキストでも示します。",
          en: "Indicator color; the state must also live in the text.",
        },
      },
      {
        prop: "showValue",
        type: "boolean",
        default: "true",
        note: {
          es: "Muestra el valor numérico junto al label; el valor sigue expuesto al lector de pantalla.",
          ja: "ラベルの横に数値を表示します。値はスクリーンリーダーにも公開されたままです。",
          en: "Shows the numeric value next to the label; the value stays exposed to screen readers.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Ajusta el ancho del bloque; no cambies la altura de la pista.",
          ja: "ブロックの幅を調整します。トラックの高さは変えません。",
          en: "Adjusts the block width; do not change the track height.",
        },
      },
    ],
    a11y: {
      es: [
        "Base UI expone role progressbar con aria-valuenow, aria-valuemin y aria-valuemax; el label queda asociado.",
        "Con value={null} el estado es indeterminado y no se anuncia un porcentaje inventado.",
        "El color no basta: el label y el valor visible identifican la tarea y su avance.",
      ],
      ja: [
        "Base UI は role progressbar と aria-valuenow、aria-valuemin、aria-valuemax を公開し、ラベルが関連付けられます。",
        "value={null} では不確定状態になり、存在しない割合は通知されません。",
        "色だけでは足りません。ラベルと可視の値がタスクと進捗を特定します。",
      ],
      en: [
        "Base UI exposes role progressbar with aria-valuenow, aria-valuemin and aria-valuemax; the label is associated.",
        "With value={null} the state is indeterminate and no invented percentage is announced.",
        "Color is not enough: the label and visible value identify the task and its advance.",
      ],
    },
  },
  {
    slug: "meter",
    id: "C-021",
    name: "Meter",
    jp: "計量",
    description: {
      es: "Muestra un nivel dentro de un rango, no un avance: stock, temperatura o carga de un recurso. El tono describe el estado de ese nivel.",
      ja: "進捗ではなく、範囲内の水準を示します。在庫、温度、リソースの負荷などが対象で、トーンがその水準の状態を表します。",
      en: "Shows a level within a range rather than progress: stock, temperature or resource load. The tone describes the state of that level.",
    },
    baseUi: "https://base-ui.com/react/components/meter",
    files: filesFor(uiFile("meter.tsx")),
    examples: [
      {
        id: "levels",
        title: { es: "Niveles y rangos", ja: "水準と範囲", en: "Levels and ranges" },
        description: {
          es: "max fija el rango real; el tono traduce el número a un estado legible.",
          ja: "max が実際の範囲を定め、トーンが数値を読み取れる状態に変えます。",
          en: "max sets the real range; the tone turns the number into a readable state.",
        },
        preview: (
          <div className="grid gap-[calc(var(--koten-gap)*2)]">
            <Meter label="HIKARI K-1 stock" value={52} max={60} tone="success" />
            <Meter label="KURA-014 stock" value={18} max={60} tone="warning" />
            <Meter label="KURA-022 stock" value={4} max={60} tone="danger" />
          </div>
        ),
        code: `<Meter label="HIKARI K-1 stock" value={52} max={60} tone="success" />
<Meter label="KURA-014 stock" value={18} max={60} tone="warning" />
<Meter label="KURA-022 stock" value={4} max={60} tone="danger" />`,
      },
      {
        id: "without-value",
        title: { es: "Sin el valor visible", ja: "値ラベルなし", en: "Without the value label" },
        description: {
          es: "showValue={false} limpia la línea cuando el número ya aparece en otra celda; el dato sigue disponible para tecnologías de asistencia.",
          ja: "数値が別のセルにある場合は showValue={false} で行を整理できます。値は支援技術に公開されたままです。",
          en: "showValue={false} cleans the row when the number already appears in another cell; the value stays available to assistive technology.",
        },
        preview: <Meter label="Warehouse load" value={72} tone="neutral" showValue={false} />,
        code: `<Meter label="Warehouse load" value={72} tone="neutral" showValue={false} />`,
      },
    ],
    props: [
      {
        prop: "label",
        type: "ReactNode",
        default: "requerido",
        note: {
          es: "Qué se mide; debe nombrar el recurso, no solo el valor.",
          ja: "何を測るかを示します。値だけでなく対象を名指しします。",
          en: "What is measured; it must name the resource, not only the value.",
        },
      },
      {
        prop: "value",
        type: "number",
        default: "requerido",
        note: {
          es: "Nivel actual dentro del rango; Meter no acepta null porque no es una tarea en curso.",
          ja: "範囲内の現在の水準です。進行中のタスクではないため null は受け付けません。",
          en: "Current level within the range; Meter does not accept null because it is not an ongoing task.",
        },
      },
      {
        prop: "max",
        type: "number",
        default: "100",
        note: {
          es: "Techo del rango; un valor real evita que el nivel se lea como porcentaje.",
          ja: "範囲の上限です。実際の値を使うと水準が割合として誤読されません。",
          en: "Top of the range; a real value keeps the level from reading as a percentage.",
        },
      },
      {
        prop: "tone",
        type: "success | warning | danger | neutral",
        default: "success",
        note: {
          es: "Estado del nivel; neutral sirve para datos sin juicio.",
          ja: "水準の状態です。neutral は評価を伴わないデータに使います。",
          en: "State of the level; neutral is for data without a judgement.",
        },
      },
      {
        prop: "showValue",
        type: "boolean",
        default: "true",
        note: {
          es: "Oculta el número visible sin quitar aria-valuenow.",
          ja: "aria-valuenow を残したまま可視の数値を隠します。",
          en: "Hides the visible number without removing aria-valuenow.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Ajusta el ancho del bloque; la pista mantiene su altura de 2.",
          ja: "ブロックの幅を調整します。トラックの高さは 2 のままです。",
          en: "Adjusts the block width; the track keeps its 2 px height.",
        },
      },
    ],
    a11y: {
      es: [
        "Base UI usa role meter con valor, mínimo y máximo; el label describe el recurso medido.",
        "El tono acompaña al número, no lo reemplaza: success, warning y danger son refuerzos.",
        "Un max real evita que el nivel se anuncie como un porcentaje que no existe.",
        "showValue={false} oculta el número visible pero mantiene el valor expuesto a tecnologías de asistencia.",
      ],
      ja: [
        "Base UI は値、最小、最大を持つ role meter を使い、ラベルが測定対象を説明します。",
        "トーンは数値を補い、置き換えません。success、warning、danger は補強です。",
        "実際の max を使うことで、存在しない割合として通知されるのを防ぎます。",
        "showValue={false} は可視の数値を隠しますが、値は支援技術に公開されたままです。",
      ],
      en: [
        "Base UI uses role meter with value, minimum and maximum; the label describes the measured resource.",
        "The tone accompanies the number, it does not replace it: success, warning and danger are reinforcement.",
        "A real max keeps the level from being announced as a percentage that does not exist.",
        "showValue={false} hides the visible number but keeps the value exposed to assistive technology.",
      ],
    },
  },
  {
    slug: "skeleton",
    id: "C-022",
    name: "Skeleton",
    jp: "骨組み",
    description: {
      es: "Ocupa el espacio del contenido mientras carga para evitar saltos de layout. Es decorativo y nunca sustituye al texto que comunica el estado.",
      ja: "読み込み中にコンテンツの場所を確保し、レイアウトのずれを防ぎます。装飾的な要素で、状態を伝えるテキストの代わりにはなりません。",
      en: "Holds the space of content while it loads so the layout does not jump. It is decorative and never replaces the text that communicates status.",
    },
    files: filesFor(uiFile("skeleton.tsx")),
    examples: [
      {
        id: "list-loading",
        title: { es: "Lista cargando", ja: "リストの読み込み", en: "List loading" },
        description: {
          es: "Las piezas copian la forma de la fila final: avatar, dos líneas de texto y filas de altura fija.",
          ja: "最終的な行の形を写します。アバター、2行のテキスト、固定高の行です。",
          en: "The pieces copy the final row shape: avatar, two text lines and fixed-height rows.",
        },
        preview: (
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
        ),
        code: `<div className="grid gap-[var(--koten-gap)]">
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
</div>`,
      },
      {
        id: "card-loading",
        title: { es: "Tarjeta cargando", ja: "カードの読み込み", en: "Card loading" },
        description: {
          es: "El bloque conserva el tamaño del informe final; solo se sustituye el contenido.",
          ja: "ブロックが最終的なレポートの大きさを保ち、内容だけを置き換えます。",
          en: "The block keeps the size of the final report; only the content is replaced.",
        },
        preview: (
          <div className="grid max-w-sm gap-2 border border-rule bg-surface p-[var(--koten-panel-p)]">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-5/6" />
            <Skeleton className="mt-2 h-24 w-full" />
          </div>
        ),
        code: `<div className="grid max-w-sm gap-2 border border-rule bg-surface p-[var(--koten-panel-p)]">
  <Skeleton className="h-3 w-1/2" />
  <Skeleton className="h-2 w-full" />
  <Skeleton className="h-2 w-5/6" />
  <Skeleton className="mt-2 h-24 w-full" />
</div>`,
      },
    ],
    props: [
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Define tamaño y forma con las medidas del contenido real.",
          ja: "実際のコンテンツの寸法でサイズと形を定義します。",
          en: "Defines size and shape using the measurements of the real content.",
        },
      },
      {
        prop: "div props",
        type: 'ComponentProps<"div">',
        default: "—",
        note: {
          es: "Se reenvían al div; aria-hidden se aplica siempre y no se puede quitar.",
          ja: "div にそのまま渡されます。aria-hidden は常に適用され、外せません。",
          en: "Forwarded to the div; aria-hidden is always applied and cannot be removed.",
        },
      },
    ],
    a11y: {
      es: [
        "Skeleton es siempre aria-hidden: no anuncia nada por sí mismo.",
        "El contenedor debe comunicar la carga con texto o aria-busy; el esqueleto no reemplaza ese mensaje.",
        "Respeta el tamaño final del contenido para evitar saltos de layout.",
        "Con prefers-reduced-motion el pulso se detiene; el espacio sigue ocupado.",
      ],
      ja: [
        "Skeleton は常に aria-hidden で、それ自体は何も通知しません。",
        "コンテナ側がテキストまたは aria-busy で読み込みを伝える必要があり、骨組みはその代わりになりません。",
        "レイアウトのずれを防ぐため、最終的なコンテンツの大きさに合わせます。",
        "prefers-reduced-motion では明滅が止まり、場所は確保されたままです。",
      ],
      en: [
        "Skeleton is always aria-hidden: it announces nothing on its own.",
        "The container must communicate loading with text or aria-busy; the skeleton does not replace that message.",
        "Match the final size of the content to avoid layout shifts.",
        "With prefers-reduced-motion the pulse stops; the space stays occupied.",
      ],
    },
  },
  {
    slug: "empty-state",
    id: "C-023",
    name: "EmptyState",
    jp: "空状態",
    description: {
      es: "Explica por qué no hay datos y ofrece una salida. El título nombra la ausencia; la descripción y la acción indican cómo seguir.",
      ja: "データがない理由を説明し、次の一手を用意します。見出しが不在を名指しし、説明と操作が続き方を示します。",
      en: "Explains why there is no data and offers a way out. The title names the absence; the description and action show how to continue.",
    },
    files: filesFor(uiFile("empty-state.tsx")),
    examples: [
      {
        id: "with-action",
        title: { es: "Con acción", ja: "操作付き", en: "With an action" },
        description: {
          es: "La acción saca al usuario del estado vacío; sin ella, el bloque solo informa.",
          ja: "操作が空状態から抜け出す手段になります。ない場合、ブロックは知らせるだけです。",
          en: "The action takes the user out of the empty state; without it, the block only informs.",
        },
        preview: (
          <EmptyState
            title="No orders"
            description="No orders match the selected filters. Try another warehouse or clear the search."
            action={
              <Button size="sm" variant="outline">
                Clear filters
              </Button>
            }
          />
        ),
        code: `<EmptyState
  title="No orders"
  description="No orders match the selected filters. Try another warehouse or clear the search."
  action={<Button size="sm" variant="outline">Clear filters</Button>}
/>`,
      },
      {
        id: "custom-icon",
        title: {
          es: "Icono propio, sin acción",
          ja: "独自アイコン・操作なし",
          en: "Custom icon, no action",
        },
        description: {
          es: "En un panel de solo lectura basta con icono, título y una pista breve.",
          ja: "読み取り専用のパネルでは、アイコン、見出し、短い手がかりで十分です。",
          en: "In a read-only panel, an icon, title and a short hint are enough.",
        },
        preview: (
          <EmptyState
            icon={<Search className="size-5" aria-hidden="true" />}
            title="No results"
            description="Try a different code or clear the search."
          />
        ),
        code: `<EmptyState
  icon={<Search className="size-5" aria-hidden="true" />}
  title="No results"
  description="Try a different code or clear the search."
/>`,
      },
    ],
    props: [
      {
        prop: "title",
        type: "ReactNode",
        default: "requerido",
        note: {
          es: "Se dibuja como h3 y nombra la ausencia; no lo uses para una frase larga.",
          ja: "h3 として描画され、不在を名指しします。長い文章には使いません。",
          en: "Rendered as an h3 and names the absence; do not use it for a long sentence.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Explica el motivo y el siguiente paso en una o dos frases.",
          ja: "理由と次の一歩を1、2文で説明します。",
          en: "Explains the reason and the next step in one or two sentences.",
        },
      },
      {
        prop: "icon",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Sustituye el icono de bandeja; debe ser decorativo (aria-hidden).",
          ja: "受信箱のアイコンを置き換えます。装飾（aria-hidden）にします。",
          en: "Replaces the inbox icon; it must be decorative (aria-hidden).",
        },
      },
      {
        prop: "action",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Botón o enlace para salir del estado; usa una sola acción principal.",
          ja: "状態から抜けるボタンまたはリンクです。主要な操作は1つにします。",
          en: "Button or link to leave the state; use a single primary action.",
        },
      },
      {
        prop: "div props",
        type: 'ComponentProps<"div">',
        default: "—",
        note: {
          es: "Se reenvían al contenedor; className ajusta el ancho del bloque.",
          ja: "コンテナにそのまま渡されます。className でブロックの幅を調整します。",
          en: "Forwarded to the container; className adjusts the block width.",
        },
      },
    ],
    a11y: {
      es: [
        "El título se dibuja como h3 dentro de la jerarquía de la página; no agregues otro encabezado con el mismo texto.",
        "La acción tiene un nombre explícito que describe el resultado, no un “ver más” ambiguo.",
        "El icono es decorativo; el título y la descripción cargan todo el significado.",
      ],
      ja: [
        "見出しはページ構造の中で h3 として描画されます。同じ文言の見出しを重ねません。",
        "操作には「もっと見る」のような曖昧な名前ではなく、結果を説明する明示的な名前を付けます。",
        "アイコンは装飾です。意味は見出しと説明が担います。",
      ],
      en: [
        "The title renders as an h3 inside the page hierarchy; do not add another heading with the same text.",
        "The action has an explicit name that describes the result, not an ambiguous “see more”.",
        "The icon is decorative; the title and description carry all the meaning.",
      ],
    },
  },
];
