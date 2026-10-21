import {
  IconButton,
  type KotenLocale,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  useKoten,
} from "@koten/ui";
import { Download, Filter, Grid2X2, List, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { Code, Demo, List as DocList, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · 操作",
    title: "Controles",
    description:
      "IconButton, ToggleGroup y Toolbar empaquetan acciones frecuentes sin perder teclado. Los iconos siempre llevan nombre accesible.",
    meta: "icon-button · toggle-group · toolbar",
    sections: {
      iconButton: { title: "IconButton", meta: "Acción compacta" },
      toggleGroup: { title: "ToggleGroup", meta: "Roving focus" },
      toolbar: { title: "Toolbar", meta: "Acciones agrupadas" },
      props: { title: "Props y código", meta: "Tres piezas" },
      a11y: { title: "Accesibilidad", meta: "Nombre, estado y foco" },
    },
    iconButton: {
      demo: "Tamaños y variantes",
      download: "Descargar",
      settings: "Configuración",
      delete: "Eliminar",
    },
    toggleGroup: {
      viewDemo: "Vista",
      viewLabel: "Vista de pedidos",
      grid: "Cuadrícula",
      list: "Lista",
      densityDemo: "Densidad",
      densityLabel: "Densidad de la tabla",
      compact: "Compacta",
      default: "Default",
      comfortable: "Amplia",
    },
    toolbar: {
      label: "Acciones de pedidos",
      viewGroup: "Vista",
      grid: "Cuadrícula",
      list: "Lista",
      dataGroup: "Datos",
      filter: "Filtrar",
      download: "Descargar",
      deleteSelection: "Eliminar selección",
    },
    props: {
      caption: "Props de controles",
      rows: [
        {
          prop: "IconButton label",
          type: "string",
          default: "—",
          note: "Obligatorio; es el nombre accesible del icono.",
        },
        {
          prop: "IconButton size",
          type: "sm | md | lg",
          default: "md",
          note: "Cuadrado; la altura sale de la densidad.",
        },
        {
          prop: "ToggleGroup value",
          type: "readonly string[]",
          default: "—",
          note: "Controlado; pressed se refleja con aria-pressed.",
        },
        {
          prop: "ToggleGroup multiple",
          type: "boolean",
          default: "false",
          note: "Permite más de un valor presionado.",
        },
        {
          prop: "Toolbar orientation",
          type: "horizontal | vertical",
          default: "horizontal",
          note: "Roving tabindex y flechas de Base UI.",
        },
      ],
    },
    code: `<IconButton label="Descargar" variant="outline">
  <Download aria-hidden="true" />
</IconButton>

<ToggleGroup
  label="Vista"
  value={view}
  onValueChange={setView}
  items={viewItems}
/>

<Toolbar label="Acciones de pedidos">
  <ToolbarGroup label="Vista">
    <ToolbarButton label="Cuadrícula"><Grid2X2 /></ToolbarButton>
    <ToolbarButton label="Lista"><List /></ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
</Toolbar>`,
    a11y: {
      label: "Notas de accesibilidad de controles",
      items: [
        "IconButton exige aria-label; el icono es decorativo.",
        "ToggleGroup expone aria-pressed y navegación con flechas.",
        "Toolbar usa roving tabindex; solo un control está en el orden de tabulación.",
        "Los separadores de toolbar no son focos.",
        "El estado pressed no depende solo del color: cambia fondo y texto.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · 操作",
    title: "コントロール",
    description:
      "IconButton、ToggleGroup、Toolbar は頻繁な操作をまとめ、キーボード操作を損なわない。アイコンには必ずアクセシブルな名前を付ける。",
    meta: "icon-button · toggle-group · toolbar",
    sections: {
      iconButton: { title: "IconButton", meta: "コンパクトな操作" },
      toggleGroup: { title: "ToggleGroup", meta: "ロービングフォーカス" },
      toolbar: { title: "Toolbar", meta: "グループ化した操作" },
      props: { title: "Propsとコード", meta: "3つの部品" },
      a11y: { title: "アクセシビリティ", meta: "名前・状態・フォーカス" },
    },
    iconButton: {
      demo: "サイズとバリエーション",
      download: "ダウンロード",
      settings: "設定",
      delete: "削除",
    },
    toggleGroup: {
      viewDemo: "表示",
      viewLabel: "注文の表示",
      grid: "グリッド",
      list: "リスト",
      densityDemo: "密度",
      densityLabel: "表の密度",
      compact: "コンパクト",
      default: "既定",
      comfortable: "ゆったり",
    },
    toolbar: {
      label: "注文の操作",
      viewGroup: "表示",
      grid: "グリッド",
      list: "リスト",
      dataGroup: "データ",
      filter: "絞り込み",
      download: "ダウンロード",
      deleteSelection: "選択を削除",
    },
    props: {
      caption: "コントロールのProps",
      rows: [
        {
          prop: "IconButton label",
          type: "string",
          default: "—",
          note: "必須。アイコンのアクセシブルな名前になる。",
        },
        {
          prop: "IconButton size",
          type: "sm | md | lg",
          default: "md",
          note: "正方形。高さは密度から決まる。",
        },
        {
          prop: "ToggleGroup value",
          type: "readonly string[]",
          default: "—",
          note: "制御値。押下状態は aria-pressed で示す。",
        },
        {
          prop: "ToggleGroup multiple",
          type: "boolean",
          default: "false",
          note: "複数の値を同時に押下できる。",
        },
        {
          prop: "Toolbar orientation",
          type: "horizontal | vertical",
          default: "horizontal",
          note: "Base UI のロービング tabindex と矢印キー。",
        },
      ],
    },
    code: `<IconButton label="ダウンロード" variant="outline">
  <Download aria-hidden="true" />
</IconButton>

<ToggleGroup
  label="表示"
  value={view}
  onValueChange={setView}
  items={viewItems}
/>

<Toolbar label="注文の操作">
  <ToolbarGroup label="表示">
    <ToolbarButton label="グリッド"><Grid2X2 /></ToolbarButton>
    <ToolbarButton label="リスト"><List /></ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
</Toolbar>`,
    a11y: {
      label: "コントロールのアクセシビリティ注記",
      items: [
        "IconButton は aria-label を必須とし、アイコンは装飾とする。",
        "ToggleGroup は aria-pressed と矢印キーでの移動を公開する。",
        "Toolbar はロービング tabindex を使い、タブ順に入るのは1つだけ。",
        "ツールバーの区切り線はフォーカス対象ではない。",
        "押下状態は色だけに頼らず、背景とテキストも変える。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 操作",
    title: "Controls",
    description:
      "IconButton, ToggleGroup and Toolbar bundle frequent actions without losing the keyboard. Icons always carry an accessible name.",
    meta: "icon-button · toggle-group · toolbar",
    sections: {
      iconButton: { title: "IconButton", meta: "Compact action" },
      toggleGroup: { title: "ToggleGroup", meta: "Roving focus" },
      toolbar: { title: "Toolbar", meta: "Grouped actions" },
      props: { title: "Props and code", meta: "Three pieces" },
      a11y: { title: "Accessibility", meta: "Name, state and focus" },
    },
    iconButton: {
      demo: "Sizes and variants",
      download: "Download",
      settings: "Settings",
      delete: "Delete",
    },
    toggleGroup: {
      viewDemo: "View",
      viewLabel: "Order view",
      grid: "Grid",
      list: "List",
      densityDemo: "Density",
      densityLabel: "Table density",
      compact: "Compact",
      default: "Default",
      comfortable: "Comfortable",
    },
    toolbar: {
      label: "Order actions",
      viewGroup: "View",
      grid: "Grid",
      list: "List",
      dataGroup: "Data",
      filter: "Filter",
      download: "Download",
      deleteSelection: "Delete selection",
    },
    props: {
      caption: "Control props",
      rows: [
        {
          prop: "IconButton label",
          type: "string",
          default: "—",
          note: "Required; it is the accessible name of the icon.",
        },
        {
          prop: "IconButton size",
          type: "sm | md | lg",
          default: "md",
          note: "Square; the height comes from density.",
        },
        {
          prop: "ToggleGroup value",
          type: "readonly string[]",
          default: "—",
          note: "Controlled; pressed is reflected with aria-pressed.",
        },
        {
          prop: "ToggleGroup multiple",
          type: "boolean",
          default: "false",
          note: "Allows more than one pressed value.",
        },
        {
          prop: "Toolbar orientation",
          type: "horizontal | vertical",
          default: "horizontal",
          note: "Roving tabindex and arrow keys from Base UI.",
        },
      ],
    },
    code: `<IconButton label="Download" variant="outline">
  <Download aria-hidden="true" />
</IconButton>

<ToggleGroup
  label="View"
  value={view}
  onValueChange={setView}
  items={viewItems}
/>

<Toolbar label="Order actions">
  <ToolbarGroup label="View">
    <ToolbarButton label="Grid"><Grid2X2 /></ToolbarButton>
    <ToolbarButton label="List"><List /></ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
</Toolbar>`,
    a11y: {
      label: "Control accessibility notes",
      items: [
        "IconButton requires aria-label; the icon is decorative.",
        "ToggleGroup exposes aria-pressed and arrow-key navigation.",
        "Toolbar uses roving tabindex; only one control is in the tab order.",
        "Toolbar separators are not focus targets.",
        "The pressed state never relies on color alone: background and text change.",
      ],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function ControlsPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [view, setView] = useState(["grid"]);
  const [density, setDensity] = useState(["compact"]);

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="操作"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="icon-button"
          title={t.sections.iconButton.title}
          jp="アイコン"
          meta={t.sections.iconButton.meta}
        >
          <Demo title={t.iconButton.demo}>
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
              <IconButton label={t.iconButton.download} variant="outline" size="sm">
                <Download className="size-3.5" aria-hidden="true" />
              </IconButton>
              <IconButton label={t.iconButton.download} variant="outline">
                <Download className="size-4" aria-hidden="true" />
              </IconButton>
              <IconButton label={t.iconButton.settings} variant="primary" size="lg">
                <Settings className="size-4" aria-hidden="true" />
              </IconButton>
              <IconButton label={t.iconButton.delete} variant="danger">
                <Trash2 className="size-4" aria-hidden="true" />
              </IconButton>
              <IconButton label={t.iconButton.delete} variant="ghost" disabled>
                <Trash2 className="size-4" aria-hidden="true" />
              </IconButton>
            </div>
          </Demo>
        </Section>

        <Section
          id="toggle-group"
          title={t.sections.toggleGroup.title}
          jp="切替グループ"
          meta={t.sections.toggleGroup.meta}
        >
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title={t.toggleGroup.viewDemo}>
              <ToggleGroup
                label={t.toggleGroup.viewLabel}
                value={view}
                onValueChange={setView}
                items={[
                  {
                    value: "grid",
                    label: t.toggleGroup.grid,
                    icon: <Grid2X2 className="size-3.5" />,
                  },
                  {
                    value: "list",
                    label: t.toggleGroup.list,
                    icon: <List className="size-3.5" />,
                  },
                ]}
              />
            </Demo>
            <Demo title={t.toggleGroup.densityDemo}>
              <ToggleGroup
                label={t.toggleGroup.densityLabel}
                value={density}
                onValueChange={setDensity}
                items={[
                  { value: "compact", label: t.toggleGroup.compact },
                  { value: "default", label: t.toggleGroup.default },
                  { value: "comfortable", label: t.toggleGroup.comfortable },
                ]}
              />
            </Demo>
          </div>
        </Section>

        <Section
          id="toolbar"
          title={t.sections.toolbar.title}
          jp="ツールバー"
          meta={t.sections.toolbar.meta}
        >
          <Toolbar label={t.toolbar.label}>
            <ToolbarGroup label={t.toolbar.viewGroup}>
              <ToolbarButton label={t.toolbar.grid}>
                <Grid2X2 className="size-4" aria-hidden="true" />
              </ToolbarButton>
              <ToolbarButton label={t.toolbar.list}>
                <List className="size-4" aria-hidden="true" />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup label={t.toolbar.dataGroup}>
              <ToolbarButton label={t.toolbar.filter}>
                <Filter className="size-4" aria-hidden="true" />
              </ToolbarButton>
              <ToolbarButton label={t.toolbar.download}>
                <Download className="size-4" aria-hidden="true" />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarButton label={t.toolbar.deleteSelection} className="text-danger">
              <Trash2 className="size-4" aria-hidden="true" />
            </ToolbarButton>
          </Toolbar>
        </Section>

        <Section id="props" title={t.sections.props.title} jp="使い方" meta={t.sections.props.meta}>
          <PropsTable caption={t.props.caption} rows={t.props.rows} />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.sections.a11y.title} jp="配慮" meta={t.sections.a11y.meta}>
          <DocList label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
