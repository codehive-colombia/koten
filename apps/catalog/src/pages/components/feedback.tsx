import {
  Alert,
  Button,
  EmptyState,
  type KotenLocale,
  Meter,
  Progress,
  Skeleton,
  ToastProvider,
  useKoten,
  useToast,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

function ToastDemoButton({
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
    <Button
      variant="primary"
      onClick={() =>
        toast.add({
          title,
          description,
          type: "success",
        })
      }
    >
      {label}
    </Button>
  );
}

const copy = {
  es: {
    header: {
      eyebrow: "Componentes · 通知",
      title: "Feedback",
      description:
        "Alert, Toast, Progress, Meter, Skeleton y EmptyState comunican estado sin depender del color. El texto siempre acompaña.",
    },
    alert: {
      meta: "Cuatro tonos",
      infoTitle: "Información",
      infoBody: "El pedido saldrá del almacén de Tokio.",
      successTitle: "Guardado",
      successBody: "Los cambios se guardaron correctamente.",
      warningTitle: "Stock bajo",
      warningBody: "Quedan 3 unidades de HIKARI K-1.",
      warningAction: "Revisar",
      dangerTitle: "Error",
      dangerBody: "No se pudo procesar el pago.",
    },
    toast: {
      meta: "Notificación temporal",
      closeLabel: "Cerrar",
      regionLabel: "Notificaciones",
      demoTitle: "Notificación de éxito",
      button: "Mostrar toast",
      title: "Pedido actualizado",
      description: "El pedido KURA-0142 pasó a preparando.",
    },
    progress: {
      title: "Progress y Meter",
      meta: "Tarea vs. nivel",
      exportLabel: "Exportación",
      syncLabel: "Sincronización",
      importLabel: "Importación",
      stockHikari: "Stock HIKARI K-1",
      stockKura014: "Stock KURA-014",
      stockKura022: "Stock KURA-022",
    },
    skeleton: {
      meta: "Loading sin layout shift",
      demoTitle: "Lista cargando",
    },
    empty: {
      meta: "Sin resultados con acción",
      title: "Sin pedidos",
      description:
        "No hay pedidos para los filtros seleccionados. Prueba con otro almacén o limpia la búsqueda.",
      action: "Limpiar filtros",
    },
    props: {
      title: "Props y código",
      meta: "Seis piezas",
      caption: "Props de feedback",
      rows: [
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
      ],
    },
    code: `<Alert tone="warning" title="Stock bajo">Quedan 3 unidades.</Alert>
<Progress label="Exportación" value={65} />
<Meter label="Stock" value={18} max={60} tone="warning" />
<Skeleton className="h-3 w-1/3" />
<EmptyState title="Sin pedidos" action={<Button>Limpiar</Button>} />

const toast = useToast();
toast.add({ title: "Guardado", description: "...", type: "success" });`,
    a11y: {
      title: "Accesibilidad",
      meta: "Estado con texto",
      label: "Notas de accesibilidad de feedback",
      items: [
        "Alert usa role status o alert según la urgencia; el texto explica el estado.",
        "Progress y Meter exponen valor y rango; no dependen solo del color.",
        "El toast vive en una región aria-live y su botón de cierre aparece al enfocar.",
        "Skeleton es aria-hidden; el contenedor debe anunciar la carga por separado.",
        "EmptyState usa heading y una acción explícita, no un enlace ambiguo.",
      ],
    },
  },
  ja: {
    header: {
      eyebrow: "コンポーネント · 通知",
      title: "Feedback",
      description:
        "Alert、Toast、Progress、Meter、Skeleton、EmptyState は色に頼らず状態を伝えます。テキストが常に補います。",
    },
    alert: {
      meta: "4つのトーン",
      infoTitle: "お知らせ",
      infoBody: "注文は東京倉庫から出荷されます。",
      successTitle: "保存しました",
      successBody: "変更は正常に保存されました。",
      warningTitle: "在庫僅少",
      warningBody: "HIKARI K-1 の在庫は残り3点です。",
      warningAction: "確認",
      dangerTitle: "エラー",
      dangerBody: "決済を処理できませんでした。",
    },
    toast: {
      meta: "一時的な通知",
      closeLabel: "閉じる",
      regionLabel: "通知",
      demoTitle: "成功の通知",
      button: "トーストを表示",
      title: "注文を更新しました",
      description: "注文 KURA-0142 は準備中になりました。",
    },
    progress: {
      title: "Progress と Meter",
      meta: "タスクと水準",
      exportLabel: "エクスポート",
      syncLabel: "同期",
      importLabel: "インポート",
      stockHikari: "HIKARI K-1 の在庫",
      stockKura014: "KURA-014 の在庫",
      stockKura022: "KURA-022 の在庫",
    },
    skeleton: {
      meta: "レイアウトシフトなしの読み込み",
      demoTitle: "リストを読み込み中",
    },
    empty: {
      meta: "操作付きの空状態",
      title: "注文がありません",
      description:
        "選択したフィルターに一致する注文はありません。別の倉庫を試すか、検索をクリアしてください。",
      action: "フィルターをクリア",
    },
    props: {
      title: "プロパティとコード",
      meta: "6つの部品",
      caption: "フィードバックのプロパティ",
      rows: [
        {
          prop: "Alert tone",
          type: "info | success | warning | danger",
          default: "info",
          note: "info/success は status、warning/danger は alert を使います。",
        },
        {
          prop: "Progress value",
          type: "number | null",
          default: "—",
          note: "null は不確定な進捗を表します。",
        },
        {
          prop: "Meter value",
          type: "number",
          default: "—",
          note: "範囲内の水準。状態は tone で示します。",
        },
        {
          prop: "Skeleton className",
          type: "string",
          default: "—",
          note: "サイズと形を定義します。常に aria-hidden です。",
        },
        {
          prop: "EmptyState action",
          type: "ReactNode",
          default: "—",
          note: "空状態から抜けるための明示的な操作です。",
        },
      ],
    },
    code: `<Alert tone="warning" title="在庫僅少">残り3点です。</Alert>
<Progress label="エクスポート" value={65} />
<Meter label="在庫" value={18} max={60} tone="warning" />
<Skeleton className="h-3 w-1/3" />
<EmptyState title="注文がありません" action={<Button>クリア</Button>} />

const toast = useToast();
toast.add({ title: "保存しました", description: "...", type: "success" });`,
    a11y: {
      title: "アクセシビリティ",
      meta: "テキストで伝える状態",
      label: "フィードバックのアクセシビリティ",
      items: [
        "Alert は緊急度に応じて role status または alert を使い、テキストが状態を説明します。",
        "Progress と Meter は値と範囲を公開し、色だけに依存しません。",
        "トーストは aria-live 領域にあり、閉じるボタンはフォーカス時に現れます。",
        "Skeleton は aria-hidden です。読み込み中かどうかはコンテナ側で別途伝えます。",
        "EmptyState は見出しと明示的な操作を使い、曖昧なリンクは使いません。",
      ],
    },
  },
  en: {
    header: {
      eyebrow: "Components · 通知",
      title: "Feedback",
      description:
        "Alert, Toast, Progress, Meter, Skeleton and EmptyState communicate state without relying on color. Text always accompanies them.",
    },
    alert: {
      meta: "Four tones",
      infoTitle: "Information",
      infoBody: "The order will leave the Tokyo warehouse.",
      successTitle: "Saved",
      successBody: "Your changes were saved successfully.",
      warningTitle: "Low stock",
      warningBody: "3 units of HIKARI K-1 left.",
      warningAction: "Review",
      dangerTitle: "Error",
      dangerBody: "The payment could not be processed.",
    },
    toast: {
      meta: "Temporary notification",
      closeLabel: "Close",
      regionLabel: "Notifications",
      demoTitle: "Success notification",
      button: "Show toast",
      title: "Order updated",
      description: "Order KURA-0142 moved to preparing.",
    },
    progress: {
      title: "Progress and Meter",
      meta: "Task vs. level",
      exportLabel: "Export",
      syncLabel: "Sync",
      importLabel: "Import",
      stockHikari: "HIKARI K-1 stock",
      stockKura014: "KURA-014 stock",
      stockKura022: "KURA-022 stock",
    },
    skeleton: {
      meta: "Loading without layout shift",
      demoTitle: "List loading",
    },
    empty: {
      meta: "No results with an action",
      title: "No orders",
      description:
        "No orders match the selected filters. Try another warehouse or clear the search.",
      action: "Clear filters",
    },
    props: {
      title: "Props and code",
      meta: "Six pieces",
      caption: "Feedback props",
      rows: [
        {
          prop: "Alert tone",
          type: "info | success | warning | danger",
          default: "info",
          note: "info/success use status; warning/danger use alert.",
        },
        {
          prop: "Progress value",
          type: "number | null",
          default: "—",
          note: "null represents indeterminate progress.",
        },
        {
          prop: "Meter value",
          type: "number",
          default: "—",
          note: "A level within a range; use tone for the state.",
        },
        {
          prop: "Skeleton className",
          type: "string",
          default: "—",
          note: "Defines size and shape; always aria-hidden.",
        },
        {
          prop: "EmptyState action",
          type: "ReactNode",
          default: "—",
          note: "A visible action to leave the empty state.",
        },
      ],
    },
    code: `<Alert tone="warning" title="Low stock">3 units left.</Alert>
<Progress label="Export" value={65} />
<Meter label="Stock" value={18} max={60} tone="warning" />
<Skeleton className="h-3 w-1/3" />
<EmptyState title="No orders" action={<Button>Clear</Button>} />

const toast = useToast();
toast.add({ title: "Saved", description: "...", type: "success" });`,
    a11y: {
      title: "Accessibility",
      meta: "State with text",
      label: "Feedback accessibility notes",
      items: [
        "Alert uses role status or alert depending on urgency; the text explains the state.",
        "Progress and Meter expose value and range; they never rely on color alone.",
        "The toast lives in an aria-live region and its close button appears on focus.",
        "Skeleton is aria-hidden; the container must announce loading separately.",
        "EmptyState uses a heading and an explicit action, not an ambiguous link.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function FeedbackPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        jp="通知"
        description={t.header.description}
        meta="status · alert · progress · meter · loading · empty"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="alert" title="Alert" jp="警告" meta={t.alert.meta}>
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Alert tone="info" title={t.alert.infoTitle}>
              {t.alert.infoBody}
            </Alert>
            <Alert tone="success" title={t.alert.successTitle}>
              {t.alert.successBody}
            </Alert>
            <Alert
              tone="warning"
              title={t.alert.warningTitle}
              action={
                <Button size="xs" variant="outline">
                  {t.alert.warningAction}
                </Button>
              }
            >
              {t.alert.warningBody}
            </Alert>
            <Alert tone="danger" title={t.alert.dangerTitle}>
              {t.alert.dangerBody}
            </Alert>
          </div>
        </Section>

        <Section id="toast" title="Toast" jp="トースト" meta={t.toast.meta}>
          <ToastProvider closeLabel={t.toast.closeLabel} regionLabel={t.toast.regionLabel}>
            <Demo title={t.toast.demoTitle}>
              <ToastDemoButton
                label={t.toast.button}
                title={t.toast.title}
                description={t.toast.description}
              />
            </Demo>
          </ToastProvider>
        </Section>

        <Section id="progress" title={t.progress.title} jp="進捗" meta={t.progress.meta}>
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-2">
            <div className="grid gap-[var(--koten-gap)]">
              <Progress label={t.progress.exportLabel} value={65} />
              <Progress label={t.progress.syncLabel} value={null} tone="primary" />
              <Progress label={t.progress.importLabel} value={100} tone="success" />
            </div>
            <div className="grid gap-[var(--koten-gap)]">
              <Meter label={t.progress.stockHikari} value={52} max={60} tone="success" />
              <Meter label={t.progress.stockKura014} value={18} max={60} tone="warning" />
              <Meter label={t.progress.stockKura022} value={4} max={60} tone="danger" />
            </div>
          </div>
        </Section>

        <Section id="skeleton" title="Skeleton" jp="骨組み" meta={t.skeleton.meta}>
          <Demo title={t.skeleton.demoTitle}>
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

        <Section id="empty" title="EmptyState" jp="空" meta={t.empty.meta}>
          <EmptyState
            title={t.empty.title}
            description={t.empty.description}
            action={
              <Button size="sm" variant="outline">
                {t.empty.action}
              </Button>
            }
          />
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable caption={t.props.caption} rows={t.props.rows} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11y.title} jp="配慮" meta={t.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
