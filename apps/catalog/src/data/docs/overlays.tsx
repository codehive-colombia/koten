import type { KotenLocale } from "@koten/ui";
import {
  Button,
  type CommandItem,
  CommandPalette,
  Dialog,
  Drawer,
  Menu,
  Popover,
  Tooltip,
  useKoten,
} from "@koten/ui";
import { FileText, LayoutDashboard, Package, Plus } from "lucide-react";
import { useState } from "react";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

const demoCopy: Record<
  KotenLocale,
  {
    dialog: {
      open: string;
      title: string;
      description: string;
      close: string;
      cancel: string;
      save: string;
      body: string;
    };
    note: { open: string; title: string; description: string; body: string };
    drawer: {
      open: string;
      title: string;
      description: string;
      close: string;
      apply: string;
      body: string;
    };
    menu: { trigger: string; view: string; edit: string; duplicate: string; delete: string };
    popover: {
      trigger: string;
      title: string;
      description: string;
      close: string;
      tokyo: string;
      osaka: string;
      sapporo: string;
    };
    tooltip: { whatTrigger: string; whatBody: string; costTrigger: string; costBody: string };
    command: {
      open: string;
      hint: string;
      label: string;
      placeholder: string;
      empty: string;
      navigate: string;
      actions: string;
      dashboard: string;
      dashboardDescription: string;
      orders: string;
      ordersDescription: string;
      newOrder: string;
      newOrderDescription: string;
      products: string;
      productsDescription: string;
      last: (value: string) => string;
    };
  }
> = {
  es: {
    dialog: {
      open: "Abrir diálogo",
      title: "Detalle del pedido",
      description: "KURA-0142 · KURA Distribución",
      close: "Cerrar",
      cancel: "Cancelar",
      save: "Guardar cambios",
      body: "El pedido sale del almacén de Tokio el 22/10. Tiene 12 líneas y entrega estimada para el 24/10.",
    },
    note: {
      open: "Ver nota",
      title: "Nota de stock",
      description: "Escrita por el equipo de Osaka",
      body: "Las unidades reservadas se retienen 48 horas antes de volver al stock disponible.",
    },
    drawer: {
      open: "Abrir drawer",
      title: "Filtros de pedidos",
      description: "Aplica y cierra para ver los resultados.",
      close: "Cerrar",
      apply: "Aplicar filtros",
      body: "El drawer conserva el contexto de la tabla y está pensado para edición lateral. El ancho máximo es 480 px.",
    },
    menu: {
      trigger: "Acciones",
      view: "Ver detalle",
      edit: "Editar",
      duplicate: "Duplicar",
      delete: "Eliminar",
    },
    popover: {
      trigger: "Ver resumen",
      title: "Stock por almacén",
      description: "Actualizado hace 5 minutos",
      close: "Cerrar",
      tokyo: "Tokio",
      osaka: "Osaka",
      sapporo: "Sapporo",
    },
    tooltip: {
      whatTrigger: "¿Qué es esto?",
      whatBody: "Abre el detalle del pedido sin salir de la tabla.",
      costTrigger: "Costo estimado",
      costBody: "Incluye impuestos y envío estándar.",
    },
    command: {
      open: "Abrir paleta",
      hint: "↑↓ mover · ↵ ejecutar · esc cerrar",
      label: "Comandos de KURA",
      placeholder: "Buscar pedidos, productos o acciones…",
      empty: "Sin resultados.",
      navigate: "Navegar",
      actions: "Acciones",
      dashboard: "Ir al panel",
      dashboardDescription: "KPIs y pedidos recientes",
      orders: "Ver pedidos",
      ordersDescription: "132 pedidos",
      newOrder: "Nuevo pedido",
      newOrderDescription: "Formulario manual",
      products: "Productos",
      productsDescription: "Catálogo KURA",
      last: (value) => `Último comando: ${value}`,
    },
  },
  ja: {
    dialog: {
      open: "ダイアログを開く",
      title: "注文の詳細",
      description: "KURA-0142 · KURA 流通",
      close: "閉じる",
      cancel: "キャンセル",
      save: "変更を保存",
      body: "注文は10月22日に東京倉庫を出荷します。12行で、配達予定は10月24日です。",
    },
    note: {
      open: "メモを見る",
      title: "在庫メモ",
      description: "大阪倉庫チームによる記入",
      body: "予約済みの数量は48時間保持され、その後は利用可能在庫に戻ります。",
    },
    drawer: {
      open: "ドロワーを開く",
      title: "注文フィルタ",
      description: "適用して閉じると結果が表示されます。",
      close: "閉じる",
      apply: "フィルタを適用",
      body: "ドロワーは表の文脈を保ち、横からの編集に向いています。最大幅は480 pxです。",
    },
    menu: {
      trigger: "操作",
      view: "詳細を見る",
      edit: "編集",
      duplicate: "複製",
      delete: "削除",
    },
    popover: {
      trigger: "概要を見る",
      title: "倉庫別の在庫",
      description: "5分前に更新",
      close: "閉じる",
      tokyo: "東京",
      osaka: "大阪",
      sapporo: "札幌",
    },
    tooltip: {
      whatTrigger: "これは何ですか？",
      whatBody: "表を離れずに注文の詳細を開きます。",
      costTrigger: "概算コスト",
      costBody: "税と標準送料を含みます。",
    },
    command: {
      open: "パレットを開く",
      hint: "↑↓ 移動 · ↵ 実行 · esc 閉じる",
      label: "KURA のコマンド",
      placeholder: "注文・商品・操作を検索…",
      empty: "結果がありません。",
      navigate: "移動",
      actions: "操作",
      dashboard: "ダッシュボードへ",
      dashboardDescription: "KPI と最近の注文",
      orders: "注文を見る",
      ordersDescription: "132 件の注文",
      newOrder: "新しい注文",
      newOrderDescription: "手入力フォーム",
      products: "商品",
      productsDescription: "KURA カタログ",
      last: (value) => `最後のコマンド: ${value}`,
    },
  },
  en: {
    dialog: {
      open: "Open dialog",
      title: "Order details",
      description: "KURA-0142 · KURA Distribution",
      close: "Close",
      cancel: "Cancel",
      save: "Save changes",
      body: "The order leaves the Tokyo warehouse on 22 Oct. It has 12 lines and an estimated delivery on 24 Oct.",
    },
    note: {
      open: "View note",
      title: "Stock note",
      description: "Written by the Osaka warehouse team",
      body: "Reserved units are held for 48 hours before they return to the available pool.",
    },
    drawer: {
      open: "Open drawer",
      title: "Order filters",
      description: "Apply and close to see the results.",
      close: "Close",
      apply: "Apply filters",
      body: "The drawer keeps the table context and is meant for side editing. The maximum width is 480 px.",
    },
    menu: {
      trigger: "Actions",
      view: "View details",
      edit: "Edit",
      duplicate: "Duplicate",
      delete: "Delete",
    },
    popover: {
      trigger: "View summary",
      title: "Stock by warehouse",
      description: "Updated 5 minutes ago",
      close: "Close",
      tokyo: "Tokyo",
      osaka: "Osaka",
      sapporo: "Sapporo",
    },
    tooltip: {
      whatTrigger: "What is this?",
      whatBody: "Opens the order details without leaving the table.",
      costTrigger: "Estimated cost",
      costBody: "Includes taxes and standard shipping.",
    },
    command: {
      open: "Open palette",
      hint: "↑↓ move · ↵ run · esc close",
      label: "KURA commands",
      placeholder: "Search orders, products or actions…",
      empty: "No results.",
      navigate: "Navigate",
      actions: "Actions",
      dashboard: "Go to dashboard",
      dashboardDescription: "KPIs and recent orders",
      orders: "View orders",
      ordersDescription: "132 orders",
      newOrder: "New order",
      newOrderDescription: "Manual form",
      products: "Products",
      productsDescription: "KURA catalog",
      last: (value) => `Last command: ${value}`,
    },
  },
};

function useDemoCopy() {
  const { locale } = useKoten();
  return demoCopy[locale];
}

function DialogDemo() {
  const t = useDemoCopy();

  return (
    <Dialog
      trigger={<Button variant="primary">{t.dialog.open}</Button>}
      title={t.dialog.title}
      description={t.dialog.description}
      closeLabel={t.dialog.close}
      footer={
        <>
          <Button variant="ghost">{t.dialog.cancel}</Button>
          <Button variant="primary">{t.dialog.save}</Button>
        </>
      }
    >
      <p>{t.dialog.body}</p>
    </Dialog>
  );
}

function DialogReadOnlyDemo() {
  const t = useDemoCopy();

  return (
    <Dialog
      trigger={<Button variant="outline">{t.note.open}</Button>}
      title={t.note.title}
      description={t.note.description}
      closeLabel={t.dialog.close}
    >
      <p>{t.note.body}</p>
    </Dialog>
  );
}

function DrawerDemo() {
  const t = useDemoCopy();

  return (
    <Drawer
      trigger={<Button variant="secondary">{t.drawer.open}</Button>}
      title={t.drawer.title}
      description={t.drawer.description}
      closeLabel={t.drawer.close}
      side="right"
      footer={<Button variant="primary">{t.drawer.apply}</Button>}
    >
      <p>{t.drawer.body}</p>
    </Drawer>
  );
}

function MenuDemo() {
  const t = useDemoCopy();

  return (
    <Menu
      trigger={<Button variant="outline">{t.menu.trigger}</Button>}
      items={[
        { label: t.menu.view, onSelect: () => undefined },
        { label: t.menu.edit, onSelect: () => undefined },
        { label: t.menu.duplicate, onSelect: () => undefined },
        { label: t.menu.delete, onSelect: () => undefined, separatorBefore: true },
      ]}
    />
  );
}

function PopoverDemo() {
  const t = useDemoCopy();

  return (
    <Popover
      trigger={<Button variant="outline">{t.popover.trigger}</Button>}
      title={t.popover.title}
      description={t.popover.description}
      closeLabel={t.popover.close}
    >
      <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
        <dt>{t.popover.tokyo}</dt>
        <dd className="text-end tabular-nums">52</dd>
        <dt>{t.popover.osaka}</dt>
        <dd className="text-end tabular-nums">18</dd>
        <dt>{t.popover.sapporo}</dt>
        <dd className="text-end tabular-nums">4</dd>
      </dl>
    </Popover>
  );
}

function TooltipDemo() {
  const t = useDemoCopy();

  return (
    <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
      <Tooltip trigger={<Button variant="ghost">{t.tooltip.whatTrigger}</Button>}>
        {t.tooltip.whatBody}
      </Tooltip>
      <Tooltip trigger={<Button variant="outline">{t.tooltip.costTrigger}</Button>} side="bottom">
        {t.tooltip.costBody}
      </Tooltip>
    </div>
  );
}

function CommandPaletteDemo() {
  const t = useDemoCopy();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const items: CommandItem[] = [
    {
      id: "dashboard",
      label: t.command.dashboard,
      description: t.command.dashboardDescription,
      group: t.command.navigate,
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      id: "orders",
      label: t.command.orders,
      description: t.command.ordersDescription,
      group: t.command.navigate,
      icon: <FileText className="size-4" />,
    },
    {
      id: "new",
      label: t.command.newOrder,
      description: t.command.newOrderDescription,
      group: t.command.actions,
      icon: <Plus className="size-4" />,
    },
    {
      id: "products",
      label: t.command.products,
      description: t.command.productsDescription,
      group: t.command.navigate,
      icon: <Package className="size-4" />,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="primary" onClick={() => setOpen(true)}>
          {t.command.open}
        </Button>
        <p aria-live="polite" className="text-2xs text-muted">
          {selected ? t.command.last(selected) : t.command.hint}
        </p>
      </div>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        label={t.command.label}
        placeholder={t.command.placeholder}
        emptyLabel={t.command.empty}
        hint={t.command.hint}
        items={items}
        onSelect={(item) => setSelected(item.label)}
      />
    </div>
  );
}

export const overlayDocs: PrimitiveDoc[] = [
  {
    slug: "dialog",
    id: "C-031",
    name: "Dialog",
    jp: "ダイアログ",
    description: {
      es: "Diálogo modal para confirmar o editar sin salir de la página. Atrapa el foco, cierra con Escape y lo devuelve al disparador.",
      ja: "ページを離れずに確認や編集を行うモーダルダイアログです。フォーカスを閉じ込め、Escape で閉じ、トリガーにフォーカスを戻します。",
      en: "A modal dialog for confirming or editing without leaving the page. It traps focus, closes with Escape and returns focus to the trigger.",
    },
    baseUi: "https://base-ui.com/react/components/dialog",
    requirements: [
      {
        kind: "portal",
        label: { es: "Popup en un portal", ja: "ポータル内のポップアップ", en: "Portaled popup" },
        detail: {
          es: "El popup se monta en BaseDialog.Portal, fuera del flujo del documento. No lo anides en contenedores con overflow ni en capas con z-index propio.",
          ja: "ポップアップは BaseDialog.Portal 内で文書フローの外に描画されます。overflow を持つコンテナや独自の z-index 階層の中に置かないでください。",
          en: "The popup mounts inside BaseDialog.Portal, outside the document flow. Do not nest it in containers with overflow or in layers with their own z-index.",
        },
      },
    ],
    files: filesFor(uiFile("dialog.tsx")),
    examples: [
      {
        id: "dialog-footer",
        title: {
          es: "Confirmación con footer",
          ja: "フッター付きの確認",
          en: "Confirmation with footer",
        },
        description: {
          es: "Título, descripción y un pie con acciones; el cierre se agrega al final del pie.",
          ja: "タイトル、説明、操作付きのフッター。閉じるボタンはフッターの末尾に追加されます。",
          en: "Title, description and a footer with actions; the close control is appended at the end of the footer.",
        },
        preview: <DialogDemo />,
        code: `<Dialog
  trigger={<Button variant="primary">Open dialog</Button>}
  title="Order details"
  description="KURA-0142 · KURA Distribution"
  closeLabel="Close"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save changes</Button>
    </>
  }
>
  <p>The order leaves the Tokyo warehouse on 22 Oct.</p>
</Dialog>`,
      },
      {
        id: "dialog-read-only",
        title: { es: "Sin acciones", ja: "操作なし", en: "Without actions" },
        description: {
          es: "Sin footer el diálogo solo informa; el botón de la cabecera sigue cerrando.",
          ja: "フッターがなければダイアログは情報表示のみで、ヘッダーのボタンで閉じられます。",
          en: "Without a footer the dialog only informs; the header button still closes it.",
        },
        preview: <DialogReadOnlyDemo />,
        code: `<Dialog
  trigger={<Button variant="outline">View note</Button>}
  title="Stock note"
  description="Written by the Osaka warehouse team"
  closeLabel="Close"
>
  <p>Reserved units are held for 48 hours.</p>
</Dialog>`,
      },
    ],
    props: [
      {
        prop: "trigger",
        type: "ReactElement",
        default: "—",
        note: {
          es: "Elemento que abre el diálogo; Base UI combina sus props con el disparador.",
          ja: "ダイアログを開く要素。Base UI がトリガーと props をマージします。",
          en: "The element that opens the dialog; Base UI merges its props with the trigger.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Obligatorio: BaseDialog.Title aporta el nombre accesible.",
          ja: "必須。BaseDialog.Title がアクセシブル名を与えます。",
          en: "Required: BaseDialog.Title provides the accessible name.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Opcional; se asocia al diálogo como descripción.",
          ja: "任意。ダイアログの説明として関連付けられます。",
          en: "Optional; it is associated with the dialog as its description.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Cuerpo del diálogo, dentro del área con scroll.",
          ja: "ダイアログの本文。スクロールする領域に入ります。",
          en: "The dialog body, inside the scrollable area.",
        },
      },
      {
        prop: "footer",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Acciones al pie; el botón de cierre con closeLabel se agrega al final.",
          ja: "フッターの操作。closeLabel を持つ閉じるボタンが末尾に追加されます。",
          en: "Footer actions; the close button using closeLabel is appended at the end.",
        },
      },
      {
        prop: "closeLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto accesible del cierre en la cabecera y en el pie.",
          ja: "ヘッダーとフッターの閉じるボタンのアクセシブルなテキスト。",
          en: "Accessible text for the close control in the header and footer.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se combina con el ancho máximo y el borde por defecto.",
          ja: "既定の最大幅とボーダーに結合されます。",
          en: "Merged with the default max width and border.",
        },
      },
    ],
    a11y: {
      es: [
        "El nombre sale de title y el contexto de description; en la práctica ambos son obligatorios.",
        "El foco queda atrapado en el popup; Escape, el botón de cierre y el backdrop lo cierran.",
        "Al cerrar, el foco vuelve al elemento que abrió el diálogo.",
        "Mientras está abierto, el resto de la página queda fuera del recorrido de teclado.",
      ],
      ja: [
        "名前は title、文脈は description から取ります。実運用ではどちらも必要です。",
        "フォーカスはポップアップ内に閉じ込められ、Escape、閉じるボタン、背景で閉じます。",
        "閉じるとフォーカスはダイアログを開いた要素に戻ります。",
        "開いている間、ページの他の部分はキーボード移動の対象外になります。",
      ],
      en: [
        "The name comes from title and the context from description; in practice both are required.",
        "Focus stays trapped in the popup; Escape, the close button and the backdrop close it.",
        "On close, focus returns to the element that opened the dialog.",
        "While open, the rest of the page is removed from the keyboard order.",
      ],
    },
  },
  {
    slug: "drawer",
    id: "C-032",
    name: "Drawer",
    jp: "ドロワー",
    description: {
      es: "Panel lateral para editar o filtrar sin perder la tabla de fondo. Conserva el contexto, entra desde un lado y devuelve el foco al cerrar.",
      ja: "背後のテーブルを失わずに編集や絞り込みを行うサイドパネルです。文脈を保ち、横から入り、閉じるとフォーカスを戻します。",
      en: "A side panel for editing or filtering without losing the table behind it. It keeps context, enters from one side and returns focus on close.",
    },
    baseUi: "https://base-ui.com/react/components/dialog",
    requirements: [
      {
        kind: "portal",
        label: { es: "Popup en un portal", ja: "ポータル内のポップアップ", en: "Portaled popup" },
        detail: {
          es: "El panel se monta en BaseDrawer.Portal con su backdrop. No lo anides en contenedores con overflow porque se recortaría.",
          ja: "パネルは背景とともに BaseDrawer.Portal 内に描画されます。overflow を持つコンテナに入れると切り取られます。",
          en: "The panel mounts inside BaseDrawer.Portal with its backdrop. Do not nest it in overflowing containers or it will be clipped.",
        },
      },
    ],
    files: filesFor(uiFile("drawer.tsx")),
    examples: [
      {
        id: "drawer-filters",
        title: { es: "Filtros laterales", ja: "サイドのフィルター", en: "Side filters" },
        description: {
          es: "Entra por la derecha, con descripción y una acción al pie; el ancho máximo es 480 px.",
          ja: "右から入り、説明とフッターの操作を持ちます。最大幅は 480 px です。",
          en: "Enters from the right with a description and a footer action; the maximum width is 480 px.",
        },
        preview: <DrawerDemo />,
        code: `<Drawer
  trigger={<Button variant="secondary">Open drawer</Button>}
  title="Order filters"
  description="Apply and close to see the results."
  closeLabel="Close"
  side="right"
  footer={<Button variant="primary">Apply filters</Button>}
>
  <p>The drawer keeps the table context and is meant for side editing.</p>
</Drawer>`,
      },
    ],
    props: [
      {
        prop: "trigger",
        type: "ReactElement",
        default: "—",
        note: {
          es: "Elemento que abre el panel; recibe las props del disparador.",
          ja: "パネルを開く要素。トリガーの props を受け取ります。",
          en: "The element that opens the panel; it receives the trigger props.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Obligatorio: da el nombre accesible al drawer.",
          ja: "必須。ドロワーのアクセシブル名になります。",
          en: "Required: it gives the drawer its accessible name.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Opcional; explica qué se hace en el panel.",
          ja: "任意。パネルで何をするかを説明します。",
          en: "Optional; explains what the panel does.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido desplazable del panel.",
          ja: "パネルのスクロールする内容。",
          en: "The scrollable content of the panel.",
        },
      },
      {
        prop: "footer",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Acciones fijas al pie; no incluye cierre automático.",
          ja: "下部に固定される操作。自動の閉じるボタンはありません。",
          en: "Actions pinned to the bottom; no automatic close control is added.",
        },
      },
      {
        prop: "closeLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto accesible del botón de cierre de la cabecera.",
          ja: "ヘッダーの閉じるボタンのアクセシブルなテキスト。",
          en: "Accessible text for the header close button.",
        },
      },
      {
        prop: "side",
        type: "left | right",
        default: "right",
        note: {
          es: "Lado desde el que entra el panel; también define la dirección del gesto.",
          ja: "パネルが入る側。スワイプの方向も決まります。",
          en: "The side the panel enters from; it also sets the swipe direction.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se combina con el ancho máximo y el borde del lado activo.",
          ja: "最大幅と有効な側のボーダーに結合されます。",
          en: "Merged with the max width and the border of the active side.",
        },
      },
    ],
    a11y: {
      es: [
        "Title y description nombran el panel y explican su propósito.",
        "El foco entra al panel, queda atrapado y vuelve al disparador al cerrar con Escape.",
        "El cierre de la cabecera es un icono, por eso closeLabel es obligatorio.",
        "El gesto de arrastre sigue la dirección de side y no sustituye al botón de cierre.",
      ],
      ja: [
        "Title と description がパネルの名前と目的を示します。",
        "フォーカスはパネル内に入って閉じ込められ、Escape で閉じるとトリガーに戻ります。",
        "ヘッダーの閉じるボタンはアイコンなので closeLabel が必須です。",
        "スワイプは side の方向に従いますが、閉じるボタンの代わりにはなりません。",
      ],
      en: [
        "Title and description name the panel and explain its purpose.",
        "Focus enters the panel, stays trapped, and returns to the trigger when Escape closes it.",
        "The header close control is an icon, so closeLabel is required.",
        "The swipe gesture follows side and does not replace the close button.",
      ],
    },
  },
  {
    slug: "menu",
    id: "C-033",
    name: "Menu",
    jp: "メニュー",
    description: {
      es: "Menú de acciones contextuales sobre una fila o un registro. Es no modal, se recorre con flechas y admite acciones, enlaces y separadores.",
      ja: "行やレコードに対する文脈的な操作メニューです。非モーダルで矢印キーで移動でき、操作、リンク、区切りを扱えます。",
      en: "A contextual action menu for a row or record. It is non-modal, navigated with arrows, and supports actions, links and separators.",
    },
    baseUi: "https://base-ui.com/react/components/menu",
    requirements: [
      {
        kind: "portal",
        label: { es: "Popup en un portal", ja: "ポータル内のポップアップ", en: "Portaled popup" },
        detail: {
          es: "El popup se monta en BaseMenu.Portal y se posiciona con Positioner; así no lo recorta la tabla que lo contiene.",
          ja: "ポップアップは BaseMenu.Portal 内に描画され、Positioner で配置されます。そのため親テーブルに切り取られません。",
          en: "The popup mounts in BaseMenu.Portal and is placed by Positioner, so the table around it does not clip it.",
        },
      },
    ],
    files: filesFor(uiFile("menu.tsx")),
    examples: [
      {
        id: "menu-actions",
        title: { es: "Acciones de fila", ja: "行の操作", en: "Row actions" },
        description: {
          es: "Cuatro acciones con un separador antes de la destructiva; el disparador conserva su propio estilo.",
          ja: "4つの操作と、破壊的な操作の前の区切り。トリガーは自身のスタイルを保ちます。",
          en: "Four actions with a separator before the destructive one; the trigger keeps its own styling.",
        },
        preview: <MenuDemo />,
        code: `<Menu
  trigger={<Button variant="outline">Actions</Button>}
  items={[
    { label: "View details", onSelect: () => openOrder() },
    { label: "Edit", onSelect: () => editOrder() },
    { label: "Duplicate", onSelect: () => duplicateOrder() },
    { label: "Delete", onSelect: () => removeOrder(), separatorBefore: true },
  ]}
/>`,
      },
    ],
    props: [
      {
        prop: "trigger",
        type: "ReactElement",
        default: "—",
        note: {
          es: "Elemento que abre el menú; recibe aria-haspopup y el estado expandido.",
          ja: "メニューを開く要素。aria-haspopup と展開状態を受け取ります。",
          en: "The element that opens the menu; it receives aria-haspopup and the expanded state.",
        },
      },
      {
        prop: "items",
        type: "readonly MenuItem[]",
        default: "—",
        note: {
          es: "Cada ítem acepta label, onSelect, href, disabled y separatorBefore.",
          ja: "各項目は label、onSelect、href、disabled、separatorBefore を受け取ります。",
          en: "Each item accepts label, onSelect, href, disabled and separatorBefore.",
        },
      },
      {
        prop: "modal",
        type: "boolean",
        default: "false",
        note: {
          es: "Koten lo mantiene no modal para no bloquear scroll ni clics fuera del popup.",
          ja: "Koten はスクロールや外側のクリックを遮らないよう非モーダルを保ちます。",
          en: "Koten keeps it non-modal so it blocks neither scroll nor clicks outside the popup.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se aplica al popup, no al disparador.",
          ja: "トリガーではなくポップアップに適用されます。",
          en: "Applied to the popup, not to the trigger.",
        },
      },
    ],
    a11y: {
      es: [
        "El disparador anuncia aria-haspopup y aria-expanded; el popup usa el rol de menú.",
        "Flechas mueven el foco, Enter ejecuta, Escape cierra y devuelve el foco al disparador.",
        "Los separadores no reciben foco y los ítems disabled se anuncian como deshabilitados.",
        "Al ser no modal, abrirlo no encierra el foco ni bloquea el resto de la página.",
      ],
      ja: [
        "トリガーは aria-haspopup と aria-expanded を通知し、ポップアップはメニューの役割を持ちます。",
        "矢印でフォーカスを移動し、Enter で実行、Escape で閉じてトリガーに戻ります。",
        "区切りはフォーカスを受け取らず、disabled の項目は無効として通知されます。",
        "非モーダルなので、開いてもフォーカスを閉じ込めずページ全体をブロックしません。",
      ],
      en: [
        "The trigger announces aria-haspopup and aria-expanded; the popup uses the menu role.",
        "Arrows move focus, Enter runs the item, Escape closes and returns focus to the trigger.",
        "Separators are not focus stops and disabled items are announced as disabled.",
        "Being non-modal, opening it neither traps focus nor blocks the rest of the page.",
      ],
    },
  },
  {
    slug: "popover",
    id: "C-034",
    name: "Popover",
    jp: "ポップオーバー",
    description: {
      es: "Contenido breve anclado a un disparador: un resumen, una definición o un par de datos. Tiene título, descripción opcional y cierre propio.",
      ja: "トリガーに紐づく短い内容です。概要、定義、少数のデータに向き、タイトル、任意の説明、閉じるボタンを持ちます。",
      en: "Brief content anchored to a trigger: a summary, a definition or a few data points. It has a title, an optional description and its own close control.",
    },
    baseUi: "https://base-ui.com/react/components/popover",
    requirements: [
      {
        kind: "portal",
        label: { es: "Popup en un portal", ja: "ポータル内のポップアップ", en: "Portaled popup" },
        detail: {
          es: "El popup se monta en BasePopover.Portal y se posiciona junto al disparador; no lo anides en celdas o paneles con overflow.",
          ja: "ポップアップは BasePopover.Portal 内に描画され、トリガーの隣に配置されます。overflow を持つセルやパネルの中に置かないでください。",
          en: "The popup mounts in BasePopover.Portal and is placed next to the trigger; do not nest it in cells or panels with overflow.",
        },
      },
    ],
    files: filesFor(uiFile("popover.tsx")),
    examples: [
      {
        id: "popover-summary",
        title: { es: "Resumen de stock", ja: "在庫の概要", en: "Stock summary" },
        description: {
          es: "Una lista de definiciones corta; el popover no necesita acciones para ser útil.",
          ja: "短い定義リスト。操作がなくてもポップオーバーとして機能します。",
          en: "A short definition list; the popover does not need actions to be useful.",
        },
        preview: <PopoverDemo />,
        code: `<Popover
  trigger={<Button variant="outline">View summary</Button>}
  title="Stock by warehouse"
  description="Updated 5 minutes ago"
  closeLabel="Close"
>
  <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
    <dt>Tokyo</dt>
    <dd className="text-end tabular-nums">52</dd>
    <dt>Osaka</dt>
    <dd className="text-end tabular-nums">18</dd>
    <dt>Sapporo</dt>
    <dd className="text-end tabular-nums">4</dd>
  </dl>
</Popover>`,
      },
    ],
    props: [
      {
        prop: "trigger",
        type: "ReactElement",
        default: "—",
        note: {
          es: "Elemento que abre el popover y ancla su posición.",
          ja: "ポップオーバーを開き、位置の基準になる要素。",
          en: "The element that opens the popover and anchors its position.",
        },
      },
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Obligatorio: BasePopover.Title nombra el popup.",
          ja: "必須。BasePopover.Title がポップアップに名前を与えます。",
          en: "Required: BasePopover.Title names the popup.",
        },
      },
      {
        prop: "description",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Opcional; agrega contexto bajo el título.",
          ja: "任意。タイトルの下に文脈を加えます。",
          en: "Optional; adds context under the title.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido breve; si necesita scroll, probablemente sea un Dialog.",
          ja: "短い内容。スクロールが必要なら Dialog が適しています。",
          en: "Brief content; if it needs scrolling, it probably belongs in a Dialog.",
        },
      },
      {
        prop: "closeLabel",
        type: "string",
        default: "—",
        note: {
          es: "Texto accesible del cierre, que es solo un icono.",
          ja: "アイコンのみの閉じるボタンのアクセシブルなテキスト。",
          en: "Accessible text for the icon-only close control.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se combina con el ancho de 18 rem y la sombra del overlay.",
          ja: "18 rem の幅とオーバーレイの影に結合されます。",
          en: "Merged with the 18 rem width and the overlay shadow.",
        },
      },
    ],
    a11y: {
      es: [
        "Title da el nombre accesible y description agrega contexto cuando aporta información.",
        "El foco entra al popup al abrir y vuelve al disparador con Escape o con el botón de cierre.",
        "No debe contener la única vía para una acción importante: esa acción pertenece a la página.",
      ],
      ja: [
        "Title がアクセシブル名を与え、description は情報を補う場合に文脈を加えます。",
        "開くとフォーカスはポップアップに入り、Escape または閉じるボタンでトリガーに戻ります。",
        "重要な操作の唯一の入口をここに置かず、ページ側に用意します。",
      ],
      en: [
        "Title provides the accessible name and description adds context when it carries information.",
        "Focus enters the popup on open and returns to the trigger with Escape or the close button.",
        "It must not hold the only path to an important action: that action belongs on the page.",
      ],
    },
  },
  {
    slug: "tooltip",
    id: "C-035",
    name: "Tooltip",
    jp: "ヒント",
    description: {
      es: "Etiqueta breve que aparece al pasar el puntero o al enfocar con teclado. Explica un control; nunca guarda información imprescindible.",
      ja: "ポインターを合わせるかキーボードでフォーカスすると現れる短いラベルです。コントロールを説明するもので、必須情報は置きません。",
      en: "A short label that appears on hover or keyboard focus. It explains a control; it never holds essential information.",
    },
    baseUi: "https://base-ui.com/react/components/tooltip",
    requirements: [
      {
        kind: "portal",
        label: { es: "Popup en un portal", ja: "ポータル内のポップアップ", en: "Portaled popup" },
        detail: {
          es: "El popup se monta en BaseTooltip.Portal para escapar del scroll de tablas y paneles; su Positioner lo coloca junto al disparador.",
          ja: "ポップアップは BaseTooltip.Portal 内に描画され、テーブルやパネルのスクロールから逃れます。Positioner がトリガーの隣に配置します。",
          en: "The popup mounts in BaseTooltip.Portal to escape table and panel scrolling; its Positioner places it next to the trigger.",
        },
      },
    ],
    files: filesFor(uiFile("tooltip.tsx")),
    examples: [
      {
        id: "tooltip-help",
        title: { es: "Ayuda contextual", ja: "文脈に沿ったヘルプ", en: "Contextual help" },
        description: {
          es: "Dos disparadores con delay de 200 ms; el segundo abre hacia abajo.",
          ja: "遅延 200 ms の2つのトリガー。2つ目は下方向に開きます。",
          en: "Two triggers with a 200 ms delay; the second opens downwards.",
        },
        preview: <TooltipDemo />,
        code: `<Tooltip trigger={<Button variant="ghost">What is this?</Button>}>
  Opens the order details without leaving the table.
</Tooltip>

<Tooltip trigger={<Button variant="outline">Estimated cost</Button>} side="bottom">
  Includes taxes and standard shipping.
</Tooltip>`,
      },
    ],
    props: [
      {
        prop: "trigger",
        type: "ReactElement",
        default: "—",
        note: {
          es: "Elemento que recibe hover y foco; conserva su propio nombre accesible.",
          ja: "ホバーとフォーカスを受ける要素。自身のアクセシブル名を保ちます。",
          en: "The element that receives hover and focus; it keeps its own accessible name.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Texto del tooltip; mantenlo en una línea o dos.",
          ja: "ツールチップのテキスト。1〜2行に収めます。",
          en: "The tooltip text; keep it to one or two lines.",
        },
      },
      {
        prop: "delay",
        type: "number",
        default: "200",
        note: {
          es: "Milisegundos antes de mostrar; se aplica en el Provider interno.",
          ja: "表示までのミリ秒。内部の Provider に適用されます。",
          en: "Milliseconds before showing; applied on the internal Provider.",
        },
      },
      {
        prop: "side",
        type: "top | right | bottom | left",
        default: "top",
        note: {
          es: "Lado preferido; el Positioner lo invierte si no cabe.",
          ja: "優先する側。収まらない場合は Positioner が反転します。",
          en: "Preferred side; the Positioner flips it when it does not fit.",
        },
      },
    ],
    a11y: {
      es: [
        "Aparece en hover y en foco de teclado, no solo con el puntero.",
        "Describe el disparador y no lo reemplaza: el nombre accesible sigue en el trigger.",
        "Escape lo oculta sin mover el foco y nunca contiene controles interactivos.",
      ],
      ja: [
        "ポインターだけでなく、ホバーとキーボードフォーカスの両方で表示されます。",
        "トリガーを説明するもので、代わりにはなりません。アクセシブル名はトリガー側に残します。",
        "Escape でフォーカスを動かさずに隠れ、内部に操作可能な要素を持ちません。",
      ],
      en: [
        "It appears on hover and on keyboard focus, not only with the pointer.",
        "It describes the trigger and never replaces it: the accessible name stays on the trigger.",
        "Escape hides it without moving focus, and it never contains interactive controls.",
      ],
    },
  },
  {
    slug: "command-palette",
    id: "C-065",
    name: "CommandPalette",
    jp: "コマンド",
    description: {
      es: "Búsqueda global con teclado: escribe para filtrar, flechas para moverte, Enter para ejecutar y Escape para cerrar. El foco vuelve siempre al disparador.",
      ja: "キーボードで使うグローバル検索です。入力で絞り込み、矢印で移動、Enter で実行、Escape で閉じます。フォーカスは必ずトリガーに戻ります。",
      en: "Keyboard-first global search: type to filter, arrows to move, Enter to run and Escape to close. Focus always returns to the trigger.",
    },
    baseUi: "https://base-ui.com/react/components/dialog",
    requirements: [
      {
        kind: "portal",
        label: { es: "Popup en un portal", ja: "ポータル内のポップアップ", en: "Portaled popup" },
        detail: {
          es: "La paleta se monta en BaseDialog.Portal. No la anides en contenedores con overflow o transform, porque el backdrop debe cubrir la ventana.",
          ja: "パレットは BaseDialog.Portal 内に描画されます。背景が画面全体を覆うため、overflow や transform を持つコンテナに入れないでください。",
          en: "The palette mounts in BaseDialog.Portal. Do not nest it in containers with overflow or transform, because the backdrop must cover the window.",
        },
      },
      {
        kind: "controlled",
        label: {
          es: "Estado controlado (open / onOpenChange)",
          ja: "制御状態 (open / onOpenChange)",
          en: "Controlled state (open / onOpenChange)",
        },
        detail: {
          es: "La paleta no se abre sola: recibe open y onOpenChange, y tú actualizas el estado. Al cerrar con Escape o al elegir, el foco vuelve al disparador.",
          ja: "パレットは単独では開きません。open と onOpenChange を受け取り、状態を更新します。Escape または選択で閉じると、フォーカスはトリガーに戻ります。",
          en: "The palette does not open by itself: it takes open and onOpenChange, and you own the state. When it closes with Escape or on select, focus returns to the trigger.",
        },
      },
    ],
    files: filesFor(uiFile("command-palette.tsx")),
    examples: [
      {
        id: "command-palette-open",
        title: { es: "Abrir desde un botón", ja: "ボタンから開く", en: "Opening from a button" },
        description: {
          es: "Cuatro comandos agrupados; el resultado elegido se anuncia junto al disparador.",
          ja: "グループ化された4つのコマンド。選択結果はトリガーの横で通知されます。",
          en: "Four grouped commands; the chosen result is announced next to the trigger.",
        },
        preview: <CommandPaletteDemo />,
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open palette</Button>

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  label="KURA commands"
  placeholder="Search orders, products or actions…"
  emptyLabel="No results."
  hint="↑↓ move · ↵ run · esc close"
  items={[
    { id: "orders", label: "View orders", description: "132 orders", group: "Navigate" },
    { id: "new", label: "New order", description: "Manual form", group: "Actions" },
  ]}
  onSelect={(item) => runCommand(item.id)}
/>`,
      },
    ],
    props: [
      {
        prop: "open",
        type: "boolean",
        default: "—",
        note: {
          es: "Controla la visibilidad; la paleta no tiene estado interno de apertura.",
          ja: "表示を制御します。パレットは開閉状態を内部に持ちません。",
          en: "Controls visibility; the palette holds no internal open state.",
        },
      },
      {
        prop: "onOpenChange",
        type: "(open: boolean) => void",
        default: "—",
        note: {
          es: "Se llama al cerrar con Escape, con el backdrop o al elegir un ítem.",
          ja: "Escape、背景、項目の選択で閉じるときに呼ばれます。",
          en: "Called on close via Escape, the backdrop or an item selection.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: "Nombre accesible del diálogo, del campo y de la lista.",
          ja: "ダイアログ、入力、リストのアクセシブル名。",
          en: "Accessible name for the dialog, the field and the list.",
        },
      },
      {
        prop: "placeholder",
        type: "string",
        default: "—",
        note: {
          es: "Texto de ayuda dentro del campo de búsqueda.",
          ja: "検索フィールド内のヒントテキスト。",
          en: "Hint text inside the search field.",
        },
      },
      {
        prop: "emptyLabel",
        type: "string",
        default: "—",
        note: {
          es: "Mensaje visible cuando ningún ítem coincide.",
          ja: "一致する項目がないときに表示するメッセージ。",
          en: "Visible message when no item matches.",
        },
      },
      {
        prop: "items",
        type: "readonly CommandItem[]",
        default: "—",
        note: {
          es: "id, label, description, group, keywords, icon y shortcut.",
          ja: "id、label、description、group、keywords、icon、shortcut。",
          en: "id, label, description, group, keywords, icon and shortcut.",
        },
      },
      {
        prop: "onSelect",
        type: "(item: CommandItem) => void",
        default: "—",
        note: {
          es: "Se llama después de cerrar; el foco ya volvió al disparador.",
          ja: "閉じた後に呼ばれ、フォーカスはすでにトリガーへ戻っています。",
          en: "Called after closing; focus has already returned to the trigger.",
        },
      },
      {
        prop: "hint",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Pista de teclado al pie; el componente no trae textos internos.",
          ja: "下部のキーボードヒント。コンポーネント内部に文言はありません。",
          en: "Keyboard hint at the bottom; the component ships no internal strings.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se combina con el ancho máximo y el borde del popup.",
          ja: "ポップアップの最大幅とボーダーに結合されます。",
          en: "Merged with the popup max width and border.",
        },
      },
    ],
    a11y: {
      es: [
        "El campo es un combobox con aria-controls, aria-autocomplete y aria-activedescendant; la lista es un listbox.",
        "El diálogo atrapa el foco y lo devuelve al disparador al cerrar, también con Escape.",
        "Flechas, Home/End y PageUp/PageDown mueven; Enter ejecuta el comando activo.",
        "El estado vacío y el resultado elegido se comunican como texto, no solo con color.",
      ],
      ja: [
        "入力は aria-controls、aria-autocomplete、aria-activedescendant を持つ combobox で、リストは listbox です。",
        "ダイアログはフォーカスを閉じ込め、Escape で閉じた場合もトリガーに戻します。",
        "矢印、Home/End、PageUp/PageDown で移動し、Enter でアクティブなコマンドを実行します。",
        "空の状態と選択結果は色だけでなくテキストでも伝えます。",
      ],
      en: [
        "The field is a combobox with aria-controls, aria-autocomplete and aria-activedescendant; the list is a listbox.",
        "The dialog traps focus and returns it to the trigger on close, including with Escape.",
        "Arrows, Home/End and PageUp/PageDown move; Enter runs the active command.",
        "The empty state and the chosen result are conveyed as text, not only with colour.",
      ],
    },
  },
];
