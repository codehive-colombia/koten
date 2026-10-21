import {
  Button,
  Dialog,
  Drawer,
  type KotenLocale,
  Menu,
  Popover,
  Tooltip,
  useKoten,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    header: {
      eyebrow: "Componentes · 重なり",
      title: "Overlays",
      description:
        "Dialog, Drawer, Menu, Popover y Tooltip viven sobre la página sin romper el contexto. Escape cierra, el foco vuelve y los portales quedan aislados.",
    },
    dialog: {
      meta: "Foco atrapado y retorno",
      demoTitle: "Detalle de pedido",
      trigger: "Abrir diálogo",
      title: "Detalle del pedido",
      description: "KURA-0142 · KURA Distribución",
      closeLabel: "Cerrar",
      cancel: "Cancelar",
      save: "Guardar cambios",
      body: "El pedido saldrá del almacén de Tokio el 22/10. Incluye 12 líneas y entrega estimada para el 24/10.",
      note: "Este diálogo usa título y descripción accesibles; Escape y el botón de cierre devuelven el foco al disparador.",
    },
    drawer: {
      meta: "Lateral derecho o izquierdo",
      demoTitle: "Filtros",
      trigger: "Abrir drawer",
      title: "Filtros de pedidos",
      description: "Aplica y cierra para ver los resultados.",
      closeLabel: "Cerrar",
      apply: "Aplicar filtros",
      body: "El drawer conserva el contexto de la tabla y está pensado para edición lateral. El ancho máximo es 480 px.",
    },
    menu: {
      meta: "Acciones contextuales",
      demoTitle: "Acciones de fila",
      trigger: "Acciones",
      detail: "Ver detalle",
      edit: "Editar",
      duplicate: "Duplicar",
      remove: "Eliminar",
    },
    popover: {
      meta: "Contenido breve",
      demoTitle: "Resumen de stock",
      trigger: "Ver resumen",
      title: "Stock por almacén",
      description: "Actualizado hace 5 minutos",
      closeLabel: "Cerrar",
      tokyo: "Tokio",
      osaka: "Osaka",
      sapporo: "Sapporo",
    },
    tooltip: {
      meta: "Delay 200 ms · hover/focus",
      demoTitle: "Ayuda contextual",
      whatTrigger: "¿Qué es esto?",
      whatBody: "Abre el detalle del pedido sin salir de la tabla.",
      costTrigger: "Costo estimado",
      costBody: "Incluye impuestos y envío estándar.",
    },
    props: {
      title: "Props y código",
      meta: "Cinco overlays",
      caption: "Props de overlays",
      rows: [
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
      ],
    },
    code: `<Dialog trigger={<Button>Abrir</Button>} title="Detalle" closeLabel="Cerrar">
  Contenido
</Dialog>

<Drawer trigger={<Button>Filtros</Button>} title="Filtros" closeLabel="Cerrar" side="right">
  Contenido
</Drawer>

<Menu trigger={<Button>Acciones</Button>} items={actions} />
<Popover trigger={<Button>Resumen</Button>} title="Stock" closeLabel="Cerrar">…</Popover>
<Tooltip trigger={<Button>Ayuda</Button>}>Texto</Tooltip>`,
    a11y: {
      title: "Accesibilidad",
      meta: "Foco, Escape y portal",
      label: "Notas de accesibilidad de overlays",
      items: [
        "Dialog y Drawer atrapan el foco, cierran con Escape y lo devuelven al trigger.",
        "Title y Description dan nombre y contexto al diálogo.",
        "Menu se recorre con flechas y Enter; los separadores no son focos.",
        "Menu es no modal: abrirlo no bloquea scroll ni clics fuera del popup.",
        "Popover y Tooltip no deben contener acciones críticas que no estén en la página.",
        "Los portales viven fuera del flujo; el overlay usa solo la sombra permitida.",
      ],
    },
  },
  ja: {
    header: {
      eyebrow: "コンポーネント · 重なり",
      title: "オーバーレイ",
      description:
        "Dialog、Drawer、Menu、Popover、Tooltip は文脈を壊さずにページの上に重なります。Escape で閉じ、フォーカスは戻り、ポータルは分離されます。",
    },
    dialog: {
      meta: "フォーカスの閉じ込めと復帰",
      demoTitle: "注文の詳細",
      trigger: "ダイアログを開く",
      title: "注文の詳細",
      description: "KURA-0142 · KURA 流通",
      closeLabel: "閉じる",
      cancel: "キャンセル",
      save: "変更を保存",
      body: "注文は10/22に東京倉庫から出荷されます。12行を含み、納期は10/24予定です。",
      note: "このダイアログはアクセシブルなタイトルと説明を使います。Escape と閉じるボタンでフォーカスがトリガーに戻ります。",
    },
    drawer: {
      meta: "右または左のサイド",
      demoTitle: "フィルター",
      trigger: "ドロワーを開く",
      title: "注文のフィルター",
      description: "適用して閉じると結果を確認できます。",
      closeLabel: "閉じる",
      apply: "フィルターを適用",
      body: "ドロワーはテーブルの文脈を保ち、横からの編集向けに設計されています。最大幅は480 pxです。",
    },
    menu: {
      meta: "文脈に応じた操作",
      demoTitle: "行の操作",
      trigger: "操作",
      detail: "詳細を見る",
      edit: "編集",
      duplicate: "複製",
      remove: "削除",
    },
    popover: {
      meta: "短いコンテンツ",
      demoTitle: "在庫の概要",
      trigger: "概要を見る",
      title: "倉庫別の在庫",
      description: "5分前に更新",
      closeLabel: "閉じる",
      tokyo: "東京",
      osaka: "大阪",
      sapporo: "札幌",
    },
    tooltip: {
      meta: "遅延 200 ms · hover/focus",
      demoTitle: "文脈に沿ったヘルプ",
      whatTrigger: "これは何ですか？",
      whatBody: "テーブルから離れずに注文の詳細を開きます。",
      costTrigger: "概算コスト",
      costBody: "税と標準配送料を含みます。",
    },
    props: {
      title: "プロパティとコード",
      meta: "5つのオーバーレイ",
      caption: "オーバーレイのプロパティ",
      rows: [
        {
          prop: "trigger",
          type: "ReactElement",
          default: "—",
          note: "オーバーレイを開く要素。Base UI が props をマージします。",
        },
        {
          prop: "title / description",
          type: "ReactNode",
          default: "—",
          note: "タイトルは必須。説明は任意で、関連付けられます。",
        },
        {
          prop: "closeLabel",
          type: "string",
          default: "—",
          note: "閉じるボタンのアクセシブルなテキスト。",
        },
        {
          prop: "Drawer side",
          type: "left | right",
          default: "right",
          note: "パネルが入ってくる側。",
        },
        {
          prop: "Menu items",
          type: "{ label, onSelect?, href?, separatorBefore? }[]",
          default: "—",
          note: "操作またはリンク。区切りは任意です。",
        },
        {
          prop: "Menu modal",
          type: "boolean",
          default: "false",
          note: "Koten はページをブロックしないよう非モーダルを保ちます。",
        },
        {
          prop: "Tooltip delay / side",
          type: "number · top | right | bottom | left",
          default: "200 · top",
          note: "プロバイダーで共有される遅延。",
        },
      ],
    },
    code: `<Dialog trigger={<Button>開く</Button>} title="詳細" closeLabel="閉じる">
  内容
</Dialog>

<Drawer trigger={<Button>フィルター</Button>} title="フィルター" closeLabel="閉じる" side="right">
  内容
</Drawer>

<Menu trigger={<Button>操作</Button>} items={actions} />
<Popover trigger={<Button>概要</Button>} title="在庫" closeLabel="閉じる">…</Popover>
<Tooltip trigger={<Button>ヘルプ</Button>}>テキスト</Tooltip>`,
    a11y: {
      title: "アクセシビリティ",
      meta: "フォーカス・Escape・ポータル",
      label: "オーバーレイのアクセシビリティ",
      items: [
        "Dialog と Drawer はフォーカスを閉じ込め、Escape で閉じ、トリガーに戻します。",
        "Title と Description がダイアログの名前と文脈を与えます。",
        "Menu は矢印キーと Enter で移動します。区切りはフォーカス対象ではありません。",
        "Menu は非モーダルです。開いてもスクロールやポップアップ外のクリックを遮りません。",
        "Popover と Tooltip には、ページ上にない重要な操作を入れるべきではありません。",
        "ポータルはフローの外にあります。オーバーレイは許可された影だけを使います。",
      ],
    },
  },
  en: {
    header: {
      eyebrow: "Components · 重なり",
      title: "Overlays",
      description:
        "Dialog, Drawer, Menu, Popover and Tooltip live above the page without breaking context. Escape closes, focus returns and portals stay isolated.",
    },
    dialog: {
      meta: "Trapped focus and return",
      demoTitle: "Order details",
      trigger: "Open dialog",
      title: "Order details",
      description: "KURA-0142 · KURA Distribution",
      closeLabel: "Close",
      cancel: "Cancel",
      save: "Save changes",
      body: "The order will leave the Tokyo warehouse on 10/22. It includes 12 lines with estimated delivery on 10/24.",
      note: "This dialog uses an accessible title and description; Escape and the close button return focus to the trigger.",
    },
    drawer: {
      meta: "Right or left side",
      demoTitle: "Filters",
      trigger: "Open drawer",
      title: "Order filters",
      description: "Apply and close to see the results.",
      closeLabel: "Close",
      apply: "Apply filters",
      body: "The drawer keeps the table context and is meant for side editing. The maximum width is 480 px.",
    },
    menu: {
      meta: "Contextual actions",
      demoTitle: "Row actions",
      trigger: "Actions",
      detail: "View details",
      edit: "Edit",
      duplicate: "Duplicate",
      remove: "Delete",
    },
    popover: {
      meta: "Brief content",
      demoTitle: "Stock summary",
      trigger: "View summary",
      title: "Stock by warehouse",
      description: "Updated 5 minutes ago",
      closeLabel: "Close",
      tokyo: "Tokyo",
      osaka: "Osaka",
      sapporo: "Sapporo",
    },
    tooltip: {
      meta: "200 ms delay · hover/focus",
      demoTitle: "Contextual help",
      whatTrigger: "What is this?",
      whatBody: "Opens the order details without leaving the table.",
      costTrigger: "Estimated cost",
      costBody: "Includes taxes and standard shipping.",
    },
    props: {
      title: "Props and code",
      meta: "Five overlays",
      caption: "Overlay props",
      rows: [
        {
          prop: "trigger",
          type: "ReactElement",
          default: "—",
          note: "The element that opens the overlay; Base UI merges props.",
        },
        {
          prop: "title / description",
          type: "ReactNode",
          default: "—",
          note: "Title is required; description is optional and associated.",
        },
        {
          prop: "closeLabel",
          type: "string",
          default: "—",
          note: "Accessible text for the close control.",
        },
        {
          prop: "Drawer side",
          type: "left | right",
          default: "right",
          note: "The side the panel enters from.",
        },
        {
          prop: "Menu items",
          type: "{ label, onSelect?, href?, separatorBefore? }[]",
          default: "—",
          note: "Actions or links; the separator is optional.",
        },
        {
          prop: "Menu modal",
          type: "boolean",
          default: "false",
          note: "Koten keeps it non-modal so it does not block the page.",
        },
        {
          prop: "Tooltip delay / side",
          type: "number · top | right | bottom | left",
          default: "200 · top",
          note: "Delay shared by the provider.",
        },
      ],
    },
    code: `<Dialog trigger={<Button>Open</Button>} title="Details" closeLabel="Close">
  Content
</Dialog>

<Drawer trigger={<Button>Filters</Button>} title="Filters" closeLabel="Close" side="right">
  Content
</Drawer>

<Menu trigger={<Button>Actions</Button>} items={actions} />
<Popover trigger={<Button>Summary</Button>} title="Stock" closeLabel="Close">…</Popover>
<Tooltip trigger={<Button>Help</Button>}>Text</Tooltip>`,
    a11y: {
      title: "Accessibility",
      meta: "Focus, Escape and portal",
      label: "Overlay accessibility notes",
      items: [
        "Dialog and Drawer trap focus, close with Escape and return it to the trigger.",
        "Title and Description give the dialog its name and context.",
        "Menu is navigated with arrows and Enter; separators are not focus stops.",
        "Menu is non-modal: opening it does not block scroll or clicks outside the popup.",
        "Popover and Tooltip should not hold critical actions that are missing from the page.",
        "Portals live outside the flow; the overlay uses only the allowed shadow.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function OverlaysPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        jp="重なり"
        description={t.header.description}
        meta="dialog · drawer · menu · popover · tooltip"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="dialog" title="Dialog" jp="対話" meta={t.dialog.meta}>
          <Demo title={t.dialog.demoTitle}>
            <Dialog
              trigger={<Button variant="secondary">{t.dialog.trigger}</Button>}
              title={t.dialog.title}
              description={t.dialog.description}
              closeLabel={t.dialog.closeLabel}
              footer={
                <>
                  <Button variant="ghost">{t.dialog.cancel}</Button>
                  <Button variant="primary">{t.dialog.save}</Button>
                </>
              }
            >
              <p>{t.dialog.body}</p>
              <p className="mt-2 text-2xs text-faint">{t.dialog.note}</p>
            </Dialog>
          </Demo>
        </Section>

        <Section id="drawer" title="Drawer" jp="引き出し" meta={t.drawer.meta}>
          <Demo title={t.drawer.demoTitle}>
            <Drawer
              trigger={<Button variant="secondary">{t.drawer.trigger}</Button>}
              title={t.drawer.title}
              description={t.drawer.description}
              closeLabel={t.drawer.closeLabel}
              footer={<Button variant="primary">{t.drawer.apply}</Button>}
            >
              <p>{t.drawer.body}</p>
            </Drawer>
          </Demo>
        </Section>

        <Section id="menu" title="Menu" jp="メニュー" meta={t.menu.meta}>
          <Demo title={t.menu.demoTitle}>
            <Menu
              trigger={<Button variant="outline">{t.menu.trigger}</Button>}
              items={[
                { label: t.menu.detail, onSelect: () => undefined },
                { label: t.menu.edit, onSelect: () => undefined },
                { label: t.menu.duplicate, onSelect: () => undefined },
                { label: t.menu.remove, onSelect: () => undefined, separatorBefore: true },
              ]}
            />
          </Demo>
        </Section>

        <Section id="popover" title="Popover" jp="ポップオーバー" meta={t.popover.meta}>
          <Demo title={t.popover.demoTitle}>
            <Popover
              trigger={<Button variant="outline">{t.popover.trigger}</Button>}
              title={t.popover.title}
              description={t.popover.description}
              closeLabel={t.popover.closeLabel}
            >
              <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                <dt>{t.popover.tokyo}</dt>
                <dd className="text-right tabular-nums">52</dd>
                <dt>{t.popover.osaka}</dt>
                <dd className="text-right tabular-nums">18</dd>
                <dt>{t.popover.sapporo}</dt>
                <dd className="text-right tabular-nums">4</dd>
              </dl>
            </Popover>
          </Demo>
        </Section>

        <Section id="tooltip" title="Tooltip" jp="ヒント" meta={t.tooltip.meta}>
          <Demo title={t.tooltip.demoTitle}>
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
              <Tooltip trigger={<Button variant="ghost">{t.tooltip.whatTrigger}</Button>}>
                {t.tooltip.whatBody}
              </Tooltip>
              <Tooltip
                trigger={<Button variant="outline">{t.tooltip.costTrigger}</Button>}
                side="bottom"
              >
                {t.tooltip.costBody}
              </Tooltip>
            </div>
          </Demo>
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
