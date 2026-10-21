import { Button, buttonVariants } from "@koten/ui";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

export const buttonDoc: PrimitiveDoc = {
  slug: "button",
  id: "C-001",
  name: "Button",
  jp: "ボタン",
  description: {
    es: "La acción principal del sistema. El color lo decide el tema; el botón solo declara una variante semántica y un tamaño.",
    ja: "システムの主要なアクションです。色はテーマが決め、ボタンは意味的なバリエーションとサイズだけを宣言します。",
    en: "The primary action of the system. The theme decides the color; the button only declares a semantic variant and a size.",
  },
  files: filesFor(uiFile("button.tsx")),
  examples: [
    {
      id: "variants",
      title: { es: "Variantes", ja: "バリエーション", en: "Variants" },
      description: {
        es: "Seis roles semánticos: secondary, primary, outline, ghost, danger y link.",
        ja: "6つの意味的役割：secondary、primary、outline、ghost、danger、link。",
        en: "Six semantic roles: secondary, primary, outline, ghost, danger and link.",
      },
      preview: (
        <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
          <Button>Secondary</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
      code: `<Button>Secondary</Button>
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>`,
    },
    {
      id: "sizes",
      title: { es: "Tamaños y estados", ja: "サイズと状態", en: "Sizes and states" },
      description: {
        es: "La altura sale de la densidad; el tamaño ajusta texto y padding.",
        ja: "高さは密度から決まり、サイズは文字と余白を調整します。",
        en: "Height comes from density; size adjusts text and padding.",
      },
      preview: (
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
          <Button variant="primary" loading>
            Saving
          </Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </div>
      ),
      code: `<Button size="xs" variant="primary">xs</Button>
<Button size="sm" variant="primary">sm</Button>
<Button size="md" variant="primary">md</Button>
<Button size="lg" variant="primary">lg</Button>
<Button variant="primary" loading>Saving</Button>
<Button variant="outline" disabled>Disabled</Button>`,
    },
    {
      id: "composition",
      title: {
        es: "Composición con render",
        ja: "render による合成",
        en: "Composition with render",
      },
      description: {
        es: "Para navegar se usa un enlace con buttonVariants o render; nunca un botón que cambia de ruta.",
        ja: "画面遷移には buttonVariants か render を使ったリンクを用い、ルート変更をボタンで行いません。",
        en: "For navigation use a link with buttonVariants or render; never a button that changes routes.",
      },
      preview: (
        <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
          <a href="#composicion" className={buttonVariants({ variant: "secondary" })}>
            Documentation
          </a>
          <Button render={<a href="#composicion" />} nativeButton={false} variant="outline">
            Render composition
          </Button>
        </div>
      ),
      code: `<a className={buttonVariants({ variant: "secondary" })} href="/docs">
  Documentation
</a>
<Button render={<a href="/docs" />} nativeButton={false} variant="outline">
  Render composition
</Button>`,
    },
  ],
  props: [
    {
      prop: "variant",
      type: "primary | secondary | outline | ghost | danger | link",
      default: "secondary",
      note: {
        es: "El color lo decide el tema, no el componente.",
        ja: "色はコンポーネントではなくテーマが決めます。",
        en: "The color is decided by the theme, not the component.",
      },
    },
    {
      prop: "size",
      type: "xs | sm | md | lg",
      default: "md",
      note: {
        es: "La altura sale de --koten-control-h; el tamaño ajusta texto y padding.",
        ja: "高さは --koten-control-h から決まり、サイズは文字と余白を調整します。",
        en: "Height comes from --koten-control-h; size adjusts text and padding.",
      },
    },
    {
      prop: "loading",
      type: "boolean",
      default: "false",
      note: {
        es: "Agrega spinner, aria-busy y disabled.",
        ja: "スピナー、aria-busy、disabled を追加します。",
        en: "Adds a spinner, aria-busy and disabled.",
      },
    },
    {
      prop: "nativeButton",
      type: "boolean",
      default: "true",
      note: {
        es: "Pasa false cuando render dibuja un enlace u otro elemento.",
        ja: "render がリンクなどを描画する場合は false にします。",
        en: "Pass false when render draws a link or another element.",
      },
    },
    {
      prop: "render",
      type: "ReactElement | function",
      default: "—",
      note: {
        es: "Composición de Base UI, sin asChild.",
        ja: "Base UI の合成で、asChild は使いません。",
        en: "Base UI composition, without asChild.",
      },
    },
  ],
  a11y: {
    es: [
      "El nombre accesible sale del contenido visible; si es icono, exige aria-label.",
      "loading deshabilita el botón y anuncia aria-busy; no cambia el layout.",
      "Para navegar se usa un <a> con buttonVariants, no un <button>.",
      "El foco visible usa el token --koten-focus con offset de 1 px.",
    ],
    ja: [
      "アクセシブル名は可視の内容から取ります。アイコンだけの場合は aria-label が必須です。",
      "loading はボタンを無効化し aria-busy を通知します。レイアウトは変わりません。",
      "画面遷移には <button> ではなく、buttonVariants を適用した <a> を使います。",
      "可視フォーカスは 1 px のオフセットを付けた --koten-focus トークンを使います。",
    ],
    en: [
      "The accessible name comes from visible content; for an icon-only button, aria-label is required.",
      "loading disables the button and announces aria-busy; it does not change the layout.",
      "For navigation use an <a> with buttonVariants, not a <button>.",
      "The visible focus uses the --koten-focus token with a 1 px offset.",
    ],
  },
};
