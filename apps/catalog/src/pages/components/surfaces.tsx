import {
  Button,
  Hanko,
  type KotenLocale,
  Pattern,
  Rule,
  SectionHeader,
  Tategaki,
  useKoten,
} from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    header: {
      eyebrow: "Componentes · 装飾",
      title: "Superficies y decorativos",
      description:
        "La jerarquía se construye con reglas, cabeceras y marcos. Hanko, tategaki y pattern son acentos editoriales; no son decoración obligatoria.",
    },
    sectionHeader: {
      meta: "Título, meta y acciones",
      withActions: "Con acciones",
      ordersTitle: "Pedidos recientes",
      ordersMeta: "Últimos 7 días",
      filter: "Filtrar",
      doubleRule: "Regla doble",
      specTitle: "Especificaciones",
      specMeta: "Producto HIKARI K-1",
    },
    rule: {
      meta: "Hairline, strong, double y dashed",
      label: "Información del producto",
    },
    hanko: {
      meta: "1–4 caracteres · decorativo",
      label: "Sello Koten",
      note: ["El último sello expone un ", "; los demás son decorativos."],
    },
    tategaki: {
      meta: "Oculto en mobile · decorativo",
      body: "El texto vertical funciona como etiqueta editorial. No reemplaza el contenido horizontal y se oculta en mobile para no robar ancho.",
    },
    pattern: {
      meta: "Seigaiha y asanoha · currentColor 8%",
    },
    props: {
      title: "Props y código",
      meta: "Cinco piezas",
      caption: "Props de superficies y decorativos",
      rows: [
        {
          prop: "SectionHeader rule",
          type: "hairline | strong | double | none",
          default: "strong",
          note: "La regla separa secciones; double es para cambios mayores.",
        },
        {
          prop: "Rule variant",
          type: "hairline | strong | double | dashed",
          default: "hairline",
          note: "Con label, la regla se parte en dos y centra el texto.",
        },
        {
          prop: "Hanko size",
          type: "sm | md | lg",
          default: "md",
          note: "Máximo cuatro caracteres; rotación de −2°.",
        },
        {
          prop: "Tategaki decorative",
          type: "boolean",
          default: "true",
          note: "Por defecto se oculta a lectores de pantalla y en mobile.",
        },
        {
          prop: "Pattern variant",
          type: "seigaiha | asanoha",
          default: "seigaiha",
          note: "Siempre aria-hidden; nunca detrás de texto denso.",
        },
      ],
    },
    code: `<SectionHeader title="Pedidos recientes" meta="Últimos 7 días" actions={<Button>Filtrar</Button>} />

<Rule variant="double" />
<Rule label="Información del producto" />

<Hanko size="md">古典</Hanko>
<Tategaki>古典のデザイン</Tategaki>
<Pattern variant="asanoha" className="absolute inset-0" />`,
    a11y: {
      title: "Accesibilidad",
      meta: "Decorar sin estorbar",
      label: "Notas de accesibilidad de superficies",
      items: [
        "Rule sin label es un <hr>; el navegador lo expone como separador.",
        "Hanko es decorativo por defecto; si comunica marca, recibe aria-label y role img.",
        "Tategaki se oculta en mobile y a lectores de pantalla salvo que sea contenido real.",
        "Pattern siempre es aria-hidden y vive detrás de texto no crítico.",
        "SectionHeader mantiene el nivel de heading correcto con la prop as.",
      ],
    },
  },
  ja: {
    header: {
      eyebrow: "コンポーネント · 装飾",
      title: "サーフェスと装飾",
      description:
        "階層は罫線・見出し・枠で組み立てます。Hanko、縦書き、pattern は編集的なアクセントであり、必須の装飾ではありません。",
    },
    sectionHeader: {
      meta: "見出し・メタ・操作",
      withActions: "操作あり",
      ordersTitle: "最近の注文",
      ordersMeta: "過去7日間",
      filter: "絞り込む",
      doubleRule: "二重罫",
      specTitle: "仕様",
      specMeta: "製品 HIKARI K-1",
    },
    rule: {
      meta: "Hairline・strong・double・dashed",
      label: "商品情報",
    },
    hanko: {
      meta: "1〜4文字 · 装飾",
      label: "Koten の印",
      note: ["最後の印だけが ", " を持ち、ほかは装飾です。"],
    },
    tategaki: {
      meta: "モバイルでは非表示 · 装飾",
      body: "縦書きは編集的なラベルとして機能します。横組みの本文を置き換えるものではなく、幅を奪わないようモバイルでは非表示にします。",
    },
    pattern: {
      meta: "Seigaiha・asanoha · currentColor 8%",
    },
    props: {
      title: "プロパティとコード",
      meta: "5つの部品",
      caption: "サーフェスと装飾のプロパティ",
      rows: [
        {
          prop: "SectionHeader rule",
          type: "hairline | strong | double | none",
          default: "strong",
          note: "罫線はセクションを区切ります。double は大きな区切り向けです。",
        },
        {
          prop: "Rule variant",
          type: "hairline | strong | double | dashed",
          default: "hairline",
          note: "label を渡すと罫線が2分割され、テキストが中央に来ます。",
        },
        {
          prop: "Hanko size",
          type: "sm | md | lg",
          default: "md",
          note: "最大4文字。回転は −2° です。",
        },
        {
          prop: "Tategaki decorative",
          type: "boolean",
          default: "true",
          note: "既定ではスクリーンリーダーとモバイルで非表示になります。",
        },
        {
          prop: "Pattern variant",
          type: "seigaiha | asanoha",
          default: "seigaiha",
          note: "常に aria-hidden。密度の高いテキストの背後には置きません。",
        },
      ],
    },
    code: `<SectionHeader title="最近の注文" meta="過去7日間" actions={<Button>絞り込む</Button>} />

<Rule variant="double" />
<Rule label="商品情報" />

<Hanko size="md">古典</Hanko>
<Tategaki>古典のデザイン</Tategaki>
<Pattern variant="asanoha" className="absolute inset-0" />`,
    a11y: {
      title: "アクセシビリティ",
      meta: "邪魔をせず装飾する",
      label: "サーフェスと装飾のアクセシビリティ",
      items: [
        "label のない Rule は <hr> で、ブラウザは区切りとして公開します。",
        "Hanko は既定で装飾です。ブランドを伝える場合は aria-label と role img を付けます。",
        "Tategaki は実際のコンテンツでない限り、モバイルとスクリーンリーダーでは非表示です。",
        "Pattern は常に aria-hidden で、重要でないテキストの背後にのみ置きます。",
        "SectionHeader は as プロパティで正しい見出しレベルを保ちます。",
      ],
    },
  },
  en: {
    header: {
      eyebrow: "Components · 装飾",
      title: "Surfaces and decorations",
      description:
        "Hierarchy is built with rules, headers and frames. Hanko, tategaki and pattern are editorial accents; they are not mandatory decoration.",
    },
    sectionHeader: {
      meta: "Title, meta and actions",
      withActions: "With actions",
      ordersTitle: "Recent orders",
      ordersMeta: "Last 7 days",
      filter: "Filter",
      doubleRule: "Double rule",
      specTitle: "Specifications",
      specMeta: "Product HIKARI K-1",
    },
    rule: {
      meta: "Hairline, strong, double and dashed",
      label: "Product information",
    },
    hanko: {
      meta: "1–4 characters · decorative",
      label: "Koten seal",
      note: ["Only the last seal exposes an ", "; the rest are decorative."],
    },
    tategaki: {
      meta: "Hidden on mobile · decorative",
      body: "Vertical text works as an editorial label. It does not replace horizontal content and is hidden on mobile so it does not steal width.",
    },
    pattern: {
      meta: "Seigaiha and asanoha · currentColor 8%",
    },
    props: {
      title: "Props and code",
      meta: "Five pieces",
      caption: "Props for surfaces and decorations",
      rows: [
        {
          prop: "SectionHeader rule",
          type: "hairline | strong | double | none",
          default: "strong",
          note: "The rule separates sections; double is for major breaks.",
        },
        {
          prop: "Rule variant",
          type: "hairline | strong | double | dashed",
          default: "hairline",
          note: "With a label, the rule splits in two and centers the text.",
        },
        {
          prop: "Hanko size",
          type: "sm | md | lg",
          default: "md",
          note: "Four characters maximum; −2° rotation.",
        },
        {
          prop: "Tategaki decorative",
          type: "boolean",
          default: "true",
          note: "Hidden from screen readers and on mobile by default.",
        },
        {
          prop: "Pattern variant",
          type: "seigaiha | asanoha",
          default: "seigaiha",
          note: "Always aria-hidden; never behind dense text.",
        },
      ],
    },
    code: `<SectionHeader title="Recent orders" meta="Last 7 days" actions={<Button>Filter</Button>} />

<Rule variant="double" />
<Rule label="Product information" />

<Hanko size="md">古典</Hanko>
<Tategaki>古典のデザイン</Tategaki>
<Pattern variant="asanoha" className="absolute inset-0" />`,
    a11y: {
      title: "Accessibility",
      meta: "Decorate without getting in the way",
      label: "Surface accessibility notes",
      items: [
        "A Rule without a label is an <hr>; the browser exposes it as a separator.",
        "Hanko is decorative by default; if it conveys brand, it gets aria-label and role img.",
        "Tategaki is hidden on mobile and from screen readers unless it is real content.",
        "Pattern is always aria-hidden and lives behind non-critical text.",
        "SectionHeader keeps the correct heading level through the as prop.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function SurfacesPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        jp="装飾"
        description={t.header.description}
        meta="SectionHeader · Rule · Hanko · Tategaki · Pattern"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="section-header" title="SectionHeader" jp="見出し" meta={t.sectionHeader.meta}>
          <div className="space-y-[var(--koten-gap)]">
            <Demo title={t.sectionHeader.withActions}>
              <SectionHeader
                title={t.sectionHeader.ordersTitle}
                jp="最近の注文"
                meta={t.sectionHeader.ordersMeta}
                actions={
                  <Button size="sm" variant="outline">
                    {t.sectionHeader.filter}
                  </Button>
                }
              />
            </Demo>
            <Demo title={t.sectionHeader.doubleRule}>
              <SectionHeader
                as="h3"
                title={t.sectionHeader.specTitle}
                jp="仕様"
                meta={t.sectionHeader.specMeta}
                rule="double"
              />
            </Demo>
          </div>
        </Section>

        <Section id="rule" title="Rule" jp="罫" meta={t.rule.meta}>
          <div className="grid gap-[calc(var(--koten-gap)*2)]">
            <Rule />
            <Rule variant="strong" />
            <Rule variant="double" />
            <Rule variant="dashed" />
            <Rule label={t.rule.label} />
          </div>
        </Section>

        <Section id="hanko" title="Hanko" jp="判子" meta={t.hanko.meta}>
          <div className="flex flex-wrap items-center gap-[calc(var(--koten-gap)*2)]">
            <Hanko size="sm">典</Hanko>
            <Hanko size="md">古典</Hanko>
            <Hanko size="lg">古典紋</Hanko>
            <Hanko label={t.hanko.label} size="md">
              典
            </Hanko>
          </div>
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">
            {t.hanko.note[0]}
            <code>aria-label</code>
            {t.hanko.note[1]}
          </p>
        </Section>

        <Section id="tategaki" title="Tategaki" jp="縦書き" meta={t.tategaki.meta}>
          <div className="flex min-h-56 items-start justify-between border border-rule bg-surface p-[var(--koten-panel-p)]">
            <p className="max-w-sm text-xs text-muted">{t.tategaki.body}</p>
            <Tategaki className="text-base">古典のデザイン</Tategaki>
          </div>
        </Section>

        <Section id="pattern" title="Pattern" jp="文様" meta={t.pattern.meta}>
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2">
            <div className="relative h-32 overflow-hidden border border-rule bg-surface">
              <Pattern variant="seigaiha" className="absolute inset-0" />
              <span className="absolute bottom-2 start-2 text-2xs font-semibold text-muted">
                Seigaiha · 青海波
              </span>
            </div>
            <div className="relative h-32 overflow-hidden border border-rule bg-surface">
              <Pattern variant="asanoha" className="absolute inset-0" />
              <span className="absolute bottom-2 start-2 text-2xs font-semibold text-muted">
                Asanoha · 麻の葉
              </span>
            </div>
          </div>
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
