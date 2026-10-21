import { Button, buttonVariants, type KotenLocale, useKoten } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · ボタン",
    description:
      "La acción principal del sistema. El color lo decide el tema; el botón solo declara una variante semántica y un tamaño.",
    variants: {
      title: "Variantes",
      meta: "secondary · primary · outline · ghost · danger · link",
    },
    sizes: {
      title: "Tamaños y estados",
      meta: "xs–lg · loading · disabled",
      demo: "Tamaños",
      statesDemo: "Estados y composición",
    },
    demos: { allVariants: "Todas las variantes" },
    labels: {
      saving: "Guardando",
      disabled: "Deshabilitado",
      linkWithVariants: "Enlace con buttonVariants",
      renderComposition: "Composición render",
    },
    props: {
      title: "Props y código",
      meta: "API mínima y copiable",
      caption: "Props de Button",
      notes: {
        variant: "El color lo decide el tema, no el componente.",
        size: "La altura sale de --koten-control-h; el tamaño ajusta texto y padding.",
        loading: "Agrega spinner, aria-busy y disabled.",
        render: "Composición de Base UI, sin asChild.",
      },
    },
    code: `<Button variant="primary" size="md">Comprar</Button>
<Button variant="outline" loading>Guardando</Button>
<a className={buttonVariants({ variant: "secondary" })} href="/docs">
  Documentación
</a>`,
    a11y: {
      title: "Accesibilidad",
      meta: "Nombre, foco y estado",
      label: "Notas de accesibilidad de Button",
      items: [
        "El nombre accesible sale del contenido visible; si es icono, exige aria-label.",
        "loading deshabilita el botón y anuncia aria-busy; no cambia el layout.",
        "Para navegar se usa un <a> con buttonVariants, no un <button>.",
        "El foco visible usa el token --koten-focus con offset de 1 px.",
      ],
    },
  },
  ja: {
    eyebrow: "コンポーネント · ボタン",
    description:
      "システムの主要なアクションです。色はテーマが決め、ボタンは意味的なバリアントとサイズだけを宣言します。",
    variants: {
      title: "バリアント",
      meta: "secondary · primary · outline · ghost · danger · link",
    },
    sizes: {
      title: "サイズと状態",
      meta: "xs–lg · loading · disabled",
      demo: "サイズ",
      statesDemo: "状態と合成",
    },
    demos: { allVariants: "すべてのバリアント" },
    labels: {
      saving: "保存中",
      disabled: "無効",
      linkWithVariants: "buttonVariants のリンク",
      renderComposition: "render による合成",
    },
    props: {
      title: "プロパティとコード",
      meta: "最小限でコピー可能なAPI",
      caption: "Button のプロパティ",
      notes: {
        variant: "色はコンポーネントではなくテーマが決めます。",
        size: "高さは --koten-control-h から決まり、サイズは文字と余白を調整します。",
        loading: "スピナー、aria-busy、disabled を追加します。",
        render: "Base UI の合成で、asChild は使いません。",
      },
    },
    code: `<Button variant="primary" size="md">購入する</Button>
<Button variant="outline" loading>保存中</Button>
<a className={buttonVariants({ variant: "secondary" })} href="/docs">
  ドキュメント
</a>`,
    a11y: {
      title: "アクセシビリティ",
      meta: "名前・フォーカス・状態",
      label: "Button のアクセシビリティに関する注記",
      items: [
        "アクセシブル名は可視の内容から取ります。アイコンだけの場合は aria-label が必須です。",
        "loading はボタンを無効化し aria-busy を通知します。レイアウトは変わりません。",
        "画面遷移には <button> ではなく、buttonVariants を適用した <a> を使います。",
        "可視フォーカスは 1 px のオフセットを付けた --koten-focus トークンを使います。",
      ],
    },
  },
  en: {
    eyebrow: "Components · ボタン",
    description:
      "The primary action of the system. The theme decides the color; the button only declares a semantic variant and a size.",
    variants: {
      title: "Variants",
      meta: "secondary · primary · outline · ghost · danger · link",
    },
    sizes: {
      title: "Sizes and states",
      meta: "xs–lg · loading · disabled",
      demo: "Sizes",
      statesDemo: "States and composition",
    },
    demos: { allVariants: "All variants" },
    labels: {
      saving: "Saving",
      disabled: "Disabled",
      linkWithVariants: "Link with buttonVariants",
      renderComposition: "render composition",
    },
    props: {
      title: "Props and code",
      meta: "Minimal, copyable API",
      caption: "Button props",
      notes: {
        variant: "The color is decided by the theme, not the component.",
        size: "Height comes from --koten-control-h; size adjusts text and padding.",
        loading: "Adds a spinner, aria-busy and disabled.",
        render: "Base UI composition, without asChild.",
      },
    },
    code: `<Button variant="primary" size="md">Buy</Button>
<Button variant="outline" loading>Saving</Button>
<a className={buttonVariants({ variant: "secondary" })} href="/docs">
  Documentation
</a>`,
    a11y: {
      title: "Accessibility",
      meta: "Name, focus and state",
      label: "Accessibility notes for Button",
      items: [
        "The accessible name comes from visible content; for an icon-only button, aria-label is required.",
        "loading disables the button and announces aria-busy; it does not change the layout.",
        "For navigation use an <a> with buttonVariants, not a <button>.",
        "The visible focus uses the --koten-focus token with a 1 px offset.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

const buttonProps = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost | danger | link",
    default: "secondary",
  },
  { prop: "size", type: "xs | sm | md | lg", default: "md" },
  { prop: "loading", type: "boolean", default: "false" },
  { prop: "render", type: "ReactElement | función", default: "—" },
] as const;

export function ButtonPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title="Button"
        jp="ボタン"
        description={t.description}
        meta="CVA + Base UI · render · loading"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="variantes" title={t.variants.title} jp="種類" meta={t.variants.meta}>
          <Demo title={t.demos.allVariants}>
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
              <Button>Secondary</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
          </Demo>
        </Section>

        <Section id="tamanos" title={t.sizes.title} jp="大きさ" meta={t.sizes.meta}>
          <div className="space-y-[var(--koten-gap)]">
            <Demo title={t.sizes.demo}>
              <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
                <Button size="xs" variant="primary">
                  xs
                </Button>
                <Button size="sm" variant="primary">
                  sm
                </Button>
                <Button size="md" variant="primary">
                  md
                </Button>
                <Button size="lg" variant="primary">
                  lg
                </Button>
              </div>
            </Demo>
            <Demo title={t.sizes.statesDemo}>
              <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
                <Button variant="primary" loading>
                  {t.labels.saving}
                </Button>
                <Button variant="outline" disabled>
                  {t.labels.disabled}
                </Button>
                <a href="#variantes" className={buttonVariants({ variant: "secondary" })}>
                  {t.labels.linkWithVariants}
                </a>
                <Button render={<a href="#variantes" />} nativeButton={false} variant="outline">
                  {t.labels.renderComposition}
                </Button>
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="props" title={t.props.title} jp="使い方" meta={t.props.meta}>
          <PropsTable
            caption={t.props.caption}
            rows={buttonProps.map((row) => ({ ...row, note: t.props.notes[row.prop] }))}
          />
          <Code>{t.code}</Code>
        </Section>

        <Section id="a11y" title={t.a11y.title} jp="配慮" meta={t.a11y.meta}>
          <List label={t.a11y.label} items={t.a11y.items} />
        </Section>
      </div>
    </div>
  );
}
