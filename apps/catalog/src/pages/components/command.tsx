import { Button, type CommandItem, CommandPalette, type KotenLocale, useKoten } from "@koten/ui";
import { FileText, LayoutDashboard, Package, Plus } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · 命令",
    title: "CommandPalette",
    description:
      "Búsqueda global con teclado: escribe para filtrar, flechas para moverte, Enter para ejecutar y Escape para cerrar. El foco queda atrapado en el diálogo y vuelve al disparador al salir.",
    meta: "command-palette · combobox + listbox · focus trap",
    sections: {
      demo: { title: "Demo", meta: "Cuatro comandos" },
      props: { title: "Props y código", meta: "Una pieza" },
      a11y: { title: "Accesibilidad", meta: "Combobox, foco y anuncios" },
    },
    open: "Abrir paleta",
    label: "Comandos de KURA",
    placeholder: "Buscar pedidos, productos o acciones…",
    empty: "Sin resultados.",
    hint: "↑↓ navegar · ↵ abrir · esc cerrar",
    selected: (label: string) => `Último comando: ${label}`,
    items: [
      {
        id: "dashboard",
        label: "Ir al dashboard",
        description: "KPIs y pedidos recientes",
        group: "Navegar",
      },
      { id: "orders", label: "Ver pedidos", description: "132 pedidos", group: "Navegar" },
      { id: "new", label: "Nuevo pedido", description: "Formulario manual", group: "Acciones" },
      { id: "products", label: "Productos", description: "Catálogo de KURA", group: "Navegar" },
    ],
    props: {
      caption: "Props de CommandPalette",
      rows: [
        {
          prop: "open / onOpenChange",
          type: "boolean / (open) => void",
          default: "—",
          note: "Controla el diálogo; se cierra al elegir o con Escape.",
        },
        {
          prop: "items",
          type: "readonly CommandItem[]",
          default: "—",
          note: "id, label, description, group, keywords, icon y shortcut.",
        },
        {
          prop: "onSelect",
          type: "(item) => void",
          default: "—",
          note: "Se llama después de cerrar; el foco vuelve al disparador.",
        },
        {
          prop: "label / placeholder / emptyLabel",
          type: "string",
          default: "—",
          note: "Nombres accesibles y textos visibles; no hay strings internos.",
        },
        {
          prop: "hint",
          type: "ReactNode",
          default: "—",
          note: "Pista de teclado al pie, localizada por el consumidor.",
        },
      ],
    },
    code: `<Button onClick={() => setOpen(true)}>Abrir paleta</Button>

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  label="Comandos"
  placeholder="Buscar…"
  emptyLabel="Sin resultados."
  hint="↑↓ navegar · ↵ abrir · esc cerrar"
  items={[
    { id: "orders", label: "Ver pedidos", group: "Navegar" },
    { id: "new", label: "Nuevo pedido", group: "Acciones" },
  ]}
  onSelect={(item) => navigate(item.id)}
/>`,
    a11y: {
      label: "Notas de accesibilidad de CommandPalette",
      items: [
        "El campo es un combobox con aria-controls y aria-activedescendant; la lista es un listbox.",
        "El diálogo atrapa el foco y lo devuelve al disparador al cerrar.",
        "Escape cierra; Enter ejecuta el comando activo; flechas y PageUp/PageDown mueven.",
        "La búsqueda ignora acentos y mayúsculas; también busca en descripción y keywords.",
        "El estado vacío es texto visible, no solo un cambio de color.",
      ],
    },
  },
  ja: {
    eyebrow: "部品 · 命令",
    title: "CommandPalette",
    description:
      "キーボードで使うグローバル検索。入力で絞り込み、矢印で移動、Enter で実行、Escape で閉じます。フォーカスはダイアログ内に留まり、閉じるとトリガーに戻ります。",
    meta: "command-palette · combobox + listbox · focus trap",
    sections: {
      demo: { title: "デモ", meta: "4つのコマンド" },
      props: { title: "Props とコード", meta: "1つの部品" },
      a11y: { title: "アクセシビリティ", meta: "Combobox・フォーカス・通知" },
    },
    open: "パレットを開く",
    label: "KURA のコマンド",
    placeholder: "注文・商品・操作を検索…",
    empty: "結果がありません。",
    hint: "↑↓ 移動 · ↵ 実行 · esc 閉じる",
    selected: (label: string) => `最後のコマンド: ${label}`,
    items: [
      {
        id: "dashboard",
        label: "ダッシュボードへ",
        description: "KPI と最近の注文",
        group: "移動",
      },
      { id: "orders", label: "注文を見る", description: "132件", group: "移動" },
      { id: "new", label: "新しい注文", description: "手動フォーム", group: "操作" },
      { id: "products", label: "商品", description: "KURA カタログ", group: "移動" },
    ],
    props: {
      caption: "CommandPalette の props",
      rows: [
        {
          prop: "open / onOpenChange",
          type: "boolean / (open) => void",
          default: "—",
          note: "ダイアログを制御。選択または Escape で閉じます。",
        },
        {
          prop: "items",
          type: "readonly CommandItem[]",
          default: "—",
          note: "id、label、description、group、keywords、icon、shortcut。",
        },
        {
          prop: "onSelect",
          type: "(item) => void",
          default: "—",
          note: "閉じた後に呼ばれ、フォーカスはトリガーへ戻ります。",
        },
        {
          prop: "label / placeholder / emptyLabel",
          type: "string",
          default: "—",
          note: "アクセシブル名と表示テキスト。内部に文字列はありません。",
        },
        {
          prop: "hint",
          type: "ReactNode",
          default: "—",
          note: "下部のキーボードヒント。消費側でローカライズ。",
        },
      ],
    },
    code: `<Button onClick={() => setOpen(true)}>パレットを開く</Button>

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  label="コマンド"
  placeholder="検索…"
  emptyLabel="結果がありません。"
  hint="↑↓ 移動 · ↵ 実行 · esc 閉じる"
  items={[
    { id: "orders", label: "注文を見る", group: "移動" },
    { id: "new", label: "新しい注文", group: "操作" },
  ]}
  onSelect={(item) => navigate(item.id)}
/>`,
    a11y: {
      label: "CommandPalette のアクセシビリティ",
      items: [
        "入力は combobox で aria-controls と aria-activedescendant、リストは listbox。",
        "ダイアログはフォーカスを閉じ込め、閉じるとトリガーに戻します。",
        "Escape で閉じ、Enter で実行、矢印と PageUp/PageDown で移動。",
        "検索はアクセントと大文字小文字を無視し、説明と keywords も対象です。",
        "空の状態は色だけでなくテキストで示します。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 命令",
    title: "CommandPalette",
    description:
      "Keyboard-first global search: type to filter, arrows to move, Enter to run and Escape to close. Focus stays trapped in the dialog and returns to the trigger when it closes.",
    meta: "command-palette · combobox + listbox · focus trap",
    sections: {
      demo: { title: "Demo", meta: "Four commands" },
      props: { title: "Props and code", meta: "One piece" },
      a11y: { title: "Accessibility", meta: "Combobox, focus and announcements" },
    },
    open: "Open palette",
    label: "KURA commands",
    placeholder: "Search orders, products or actions…",
    empty: "No results.",
    hint: "↑↓ move · ↵ run · esc close",
    selected: (label: string) => `Last command: ${label}`,
    items: [
      {
        id: "dashboard",
        label: "Go to dashboard",
        description: "KPIs and recent orders",
        group: "Navigate",
      },
      { id: "orders", label: "View orders", description: "132 orders", group: "Navigate" },
      { id: "new", label: "New order", description: "Manual form", group: "Actions" },
      { id: "products", label: "Products", description: "KURA catalog", group: "Navigate" },
    ],
    props: {
      caption: "CommandPalette props",
      rows: [
        {
          prop: "open / onOpenChange",
          type: "boolean / (open) => void",
          default: "—",
          note: "Controls the dialog; closes on select or Escape.",
        },
        {
          prop: "items",
          type: "readonly CommandItem[]",
          default: "—",
          note: "id, label, description, group, keywords, icon and shortcut.",
        },
        {
          prop: "onSelect",
          type: "(item) => void",
          default: "—",
          note: "Called after closing; focus returns to the trigger.",
        },
        {
          prop: "label / placeholder / emptyLabel",
          type: "string",
          default: "—",
          note: "Accessible names and visible text; no internal strings.",
        },
        {
          prop: "hint",
          type: "ReactNode",
          default: "—",
          note: "Keyboard hint at the bottom, localized by the consumer.",
        },
      ],
    },
    code: `<Button onClick={() => setOpen(true)}>Open palette</Button>

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  label="Commands"
  placeholder="Search…"
  emptyLabel="No results."
  hint="↑↓ move · ↵ run · esc close"
  items={[
    { id: "orders", label: "View orders", group: "Navigate" },
    { id: "new", label: "New order", group: "Actions" },
  ]}
  onSelect={(item) => navigate(item.id)}
/>`,
    a11y: {
      label: "CommandPalette accessibility notes",
      items: [
        "The field is a combobox with aria-controls and aria-activedescendant; the list is a listbox.",
        "The dialog traps focus and returns it to the trigger on close.",
        "Escape closes, Enter runs the active command, arrows and PageUp/PageDown move.",
        "Search ignores accents and case, and covers description and keywords.",
        "The empty state is visible text, not just a colour change.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const icons: Record<string, ReactNode> = {
  dashboard: <LayoutDashboard className="size-4" />,
  orders: <FileText className="size-4" />,
  new: <Plus className="size-4" />,
  products: <Package className="size-4" />,
};

function PaletteDemo({ t }: { t: Copy }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const items: CommandItem[] = t.items.map((item) => ({ ...item, icon: icons[item.id] }));

  return (
    <Demo title={t.sections.demo.title}>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="primary" onClick={() => setOpen(true)}>
          {t.open}
        </Button>
        <p aria-live="polite" className="text-2xs text-muted">
          {selected ? t.selected(selected) : t.hint}
        </p>
      </div>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        label={t.label}
        placeholder={t.placeholder}
        emptyLabel={t.empty}
        hint={t.hint}
        items={items}
        onSelect={(item) => setSelected(item.label)}
      />
    </Demo>
  );
}

export function CommandPalettePage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <article>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="命令"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="demo" title={t.sections.demo.title} jp="実演" meta={t.sections.demo.meta}>
          <PaletteDemo t={t} />
        </Section>

        <Section id="props" title={t.sections.props.title} jp="型" meta={t.sections.props.meta}>
          <Code>{t.code}</Code>
          <PropsTable caption={t.props.caption} rows={t.props.rows} />
        </Section>

        <Section id="a11y" title={t.sections.a11y.title} jp="支援" meta={t.sections.a11y.meta}>
          <List items={t.a11y.items} label={t.a11y.label} />
        </Section>
      </div>
    </article>
  );
}
