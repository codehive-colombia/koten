import {
  Badge,
  Button,
  Hanko,
  type KotenLocale,
  Panel,
  PanelActions,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  Pattern,
  Rule,
  SectionHeader,
  Tategaki,
  useKoten,
} from "@koten/ui";
import { filesFor, type PrimitiveDoc, uiFile } from "./types";

type DemoCopy = {
  panel: {
    title: string;
    pending: string;
    shipped: string;
    action: string;
    toneBody: string;
  };
  badge: {
    neutral: string;
    info: string;
    inStock: string;
    lowStock: string;
    cancelled: string;
    sale: string;
    new: string;
  };
  sectionHeader: {
    title: string;
    meta: string;
    action: string;
    specTitle: string;
    specMeta: string;
  };
  rule: {
    label: string;
  };
  hanko: {
    label: string;
  };
  tategaki: {
    body: string;
    text: string;
  };
};

const demoCopy: Record<KotenLocale, DemoCopy> = {
  es: {
    panel: {
      title: "Pedidos de hoy",
      pending: "Pendientes",
      shipped: "Enviados",
      action: "Ver todos",
      toneBody: "El mismo cuerpo cambia de peso visual según el tono, sin sombra ni radio extra.",
    },
    badge: {
      neutral: "Neutral",
      info: "Info",
      inStock: "En stock",
      lowStock: "Últimas unidades",
      cancelled: "Cancelado",
      sale: "Rebaja",
      new: "Nuevo",
    },
    sectionHeader: {
      title: "Pedidos recientes",
      meta: "Últimos 7 días",
      action: "Filtrar",
      specTitle: "Especificaciones",
      specMeta: "Producto HIKARI K-1",
    },
    rule: {
      label: "Información del producto",
    },
    hanko: {
      label: "Sello Koten",
    },
    tategaki: {
      body: "El texto vertical funciona como etiqueta editorial: no reemplaza el contenido horizontal y se oculta en mobile para no robar ancho.",
      text: "古典のデザイン",
    },
  },
  ja: {
    panel: {
      title: "本日の注文",
      pending: "未処理",
      shipped: "発送済み",
      action: "すべて見る",
      toneBody: "同じ本文でも、トーンによって視覚的な重みが変わり、影や大きな角丸は使いません。",
    },
    badge: {
      neutral: "標準",
      info: "情報",
      inStock: "在庫あり",
      lowStock: "残りわずか",
      cancelled: "キャンセル",
      sale: "セール",
      new: "新着",
    },
    sectionHeader: {
      title: "最近の注文",
      meta: "過去7日間",
      action: "絞り込む",
      specTitle: "仕様",
      specMeta: "製品 HIKARI K-1",
    },
    rule: {
      label: "商品情報",
    },
    hanko: {
      label: "Koten の印",
    },
    tategaki: {
      body: "縦書きは編集的なラベルとして機能します。横組みの本文を置き換えるものではなく、幅を奪わないようモバイルでは非表示にします。",
      text: "古典のデザイン",
    },
  },
  en: {
    panel: {
      title: "Today's orders",
      pending: "Pending",
      shipped: "Shipped",
      action: "View all",
      toneBody:
        "The same body shifts visual weight with the tone, without a shadow or extra radius.",
    },
    badge: {
      neutral: "Neutral",
      info: "Info",
      inStock: "In stock",
      lowStock: "Low stock",
      cancelled: "Cancelled",
      sale: "Sale",
      new: "New",
    },
    sectionHeader: {
      title: "Recent orders",
      meta: "Last 7 days",
      action: "Filter",
      specTitle: "Specifications",
      specMeta: "Product HIKARI K-1",
    },
    rule: {
      label: "Product information",
    },
    hanko: {
      label: "Koten seal",
    },
    tategaki: {
      body: "Vertical text works as an editorial label: it does not replace horizontal content and is hidden on mobile so it does not steal width.",
      text: "古典のデザイン",
    },
  },
};

const useDemoCopy = (): DemoCopy => demoCopy[useKoten().locale];

function PanelDemo() {
  const t = useDemoCopy();

  return (
    <Panel tone="accent">
      <PanelHeader>
        <PanelTitle as="h3">{t.panel.title}</PanelTitle>
        <PanelActions>
          <Badge tone="info" appearance="solid">
            12
          </Badge>
        </PanelActions>
      </PanelHeader>
      <PanelBody>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-2xs">
          <dt className="text-faint">{t.panel.pending}</dt>
          <dd className="text-end font-semibold tabular-nums">4</dd>
          <dt className="text-faint">{t.panel.shipped}</dt>
          <dd className="text-end font-semibold tabular-nums">8</dd>
        </dl>
      </PanelBody>
      <PanelFooter>
        <Button size="sm" variant="outline">
          {t.panel.action}
        </Button>
      </PanelFooter>
    </Panel>
  );
}

function PanelTonesDemo() {
  const t = useDemoCopy();
  const tones = ["plain", "tinted", "accent"] as const;

  return (
    <div className="grid gap-[var(--koten-gap)] lg:grid-cols-3">
      {tones.map((tone) => (
        <Panel key={tone} tone={tone}>
          <PanelHeader>
            <PanelTitle as="h3">{tone}</PanelTitle>
          </PanelHeader>
          <PanelBody>
            <p className="text-xs text-muted">{t.panel.toneBody}</p>
          </PanelBody>
        </Panel>
      ))}
    </div>
  );
}

function BadgeTonesDemo() {
  const t = useDemoCopy();

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge>{t.badge.neutral}</Badge>
      <Badge tone="info">{t.badge.info}</Badge>
      <Badge tone="success" dot>
        {t.badge.inStock}
      </Badge>
      <Badge tone="warning" dot>
        {t.badge.lowStock}
      </Badge>
      <Badge tone="danger">{t.badge.cancelled}</Badge>
      <Badge tone="sale">{t.badge.sale}</Badge>
      <Badge tone="new">{t.badge.new}</Badge>
    </div>
  );
}

function BadgeAppearancesDemo() {
  const t = useDemoCopy();
  const appearances = ["soft", "solid", "outline"] as const;

  return (
    <div className="grid gap-[var(--koten-gap)] sm:grid-cols-3">
      {appearances.map((appearance) => (
        <div key={appearance} className="border border-rule bg-surface p-[var(--koten-panel-p)]">
          <p className="text-2xs font-semibold text-faint">{appearance}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge tone="success" appearance={appearance} dot>
              {t.badge.inStock}
            </Badge>
            <Badge tone="warning" appearance={appearance} dot>
              {t.badge.lowStock}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeaderDemo() {
  const t = useDemoCopy();

  return (
    <SectionHeader
      title={t.sectionHeader.title}
      jp="注文"
      meta={t.sectionHeader.meta}
      actions={
        <Button size="sm" variant="outline">
          {t.sectionHeader.action}
        </Button>
      }
    />
  );
}

function SectionHeaderDoubleDemo() {
  const t = useDemoCopy();

  return (
    <SectionHeader
      as="h3"
      title={t.sectionHeader.specTitle}
      jp="仕様"
      meta={t.sectionHeader.specMeta}
      rule="double"
    />
  );
}

function RuleVariantsDemo() {
  return (
    <div className="space-y-4">
      <Rule />
      <Rule variant="strong" />
      <Rule variant="double" />
      <Rule variant="dashed" />
    </div>
  );
}

function RuleLabelDemo() {
  const t = useDemoCopy();

  return <Rule label={t.rule.label} />;
}

function HankoDemo() {
  const t = useDemoCopy();

  return (
    <div className="flex flex-wrap items-center gap-[calc(var(--koten-gap)*2)]">
      <Hanko size="sm">典</Hanko>
      <Hanko size="md">古典</Hanko>
      <Hanko size="lg">古典紋</Hanko>
      <Hanko label={t.hanko.label} size="md">
        典
      </Hanko>
    </div>
  );
}

function TategakiDemo() {
  const t = useDemoCopy();

  return (
    <div className="flex min-h-56 items-start justify-between gap-[var(--koten-gap)] border border-rule bg-surface p-[var(--koten-panel-p)]">
      <p className="max-w-sm text-xs text-muted">{t.tategaki.body}</p>
      <Tategaki className="text-base">{t.tategaki.text}</Tategaki>
    </div>
  );
}

function PatternDemo() {
  return (
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
  );
}

export const surfaceDocs: PrimitiveDoc[] = [
  {
    slug: "panel",
    id: "C-002",
    name: "Panel",
    jp: "枠",
    description: {
      es: "La unidad básica de composición de Koten: una sección con borde, cabecera tintada, cuerpo con padding de densidad y pie para acciones. Reemplaza la tarjeta decorativa y no necesita sombra ni radios grandes.",
      ja: "Koten の合成の基本単位です。枠線を持つセクションで、色付きのヘッダー、密度に応じた余白の本文、操作のためのフッターで構成します。装飾的なカードに代わるもので、影や大きな角丸は不要です。",
      en: "The basic unit of composition in Koten: a bordered section with a tinted header, a body using density padding and a footer for actions. It replaces the decorative card and needs neither shadow nor large radii.",
    },
    files: filesFor(uiFile("panel.tsx")),
    examples: [
      {
        id: "composition",
        title: { es: "Composición", ja: "構成", en: "Composition" },
        description: {
          es: "Cabecera, cuerpo y pie en orden de lectura; las acciones quedan a la derecha de la cabecera.",
          ja: "ヘッダー、本文、フッターを読み上げ順に並べ、操作はヘッダーの右側に置きます。",
          en: "Header, body and footer in reading order; actions sit on the right side of the header.",
        },
        preview: <PanelDemo />,
        code: `<Panel tone="accent">
  <PanelHeader>
    <PanelTitle as="h3">Today's orders</PanelTitle>
    <PanelActions>
      <Badge tone="info" appearance="solid">12</Badge>
    </PanelActions>
  </PanelHeader>
  <PanelBody>
    <dl>…</dl>
  </PanelBody>
  <PanelFooter>
    <Button size="sm" variant="outline">View all</Button>
  </PanelFooter>
</Panel>`,
      },
      {
        id: "tones",
        title: { es: "Tonos", ja: "色調", en: "Tones" },
        description: {
          es: "plain usa la superficie, tinted el fondo de tinta y accent agrega una barra primaria de 3 px a la izquierda.",
          ja: "plain はサーフェス、tinted は淡い下地を使い、accent は左側に 3 px のプライマリバーを追加します。",
          en: "plain uses the surface, tinted the tint background, and accent adds a 3 px primary bar on the left.",
        },
        preview: <PanelTonesDemo />,
        code: `<Panel tone="plain">…</Panel>
<Panel tone="tinted">…</Panel>
<Panel tone="accent">…</Panel>`,
      },
    ],
    props: [
      {
        prop: "tone",
        type: "plain | tinted | accent",
        default: "plain",
        note: {
          es: "accent dibuja una barra primaria de 3 px en el borde inicial; los otros tonos solo cambian el fondo.",
          ja: "accent は開始側の辺に 3 px のプライマリバーを描きます。ほかのトーンは背景だけを変えます。",
          en: "accent draws a 3 px primary bar on the inline start edge; the other tones only change the background.",
        },
      },
      {
        prop: "PanelBody flush",
        type: "boolean",
        default: "false",
        note: {
          es: "Quita el padding para tablas y listas a sangre; el resto conserva --koten-panel-p.",
          ja: "表や全幅のリスト用に余白を取り除きます。それ以外は --koten-panel-p を保ちます。",
          en: "Removes padding for full-bleed tables and lists; everything else keeps --koten-panel-p.",
        },
      },
      {
        prop: "PanelTitle as",
        type: "h2 | h3 | h4",
        default: "h2",
        note: {
          es: "Elige el nivel de heading según la jerarquía de la página, no por tamaño.",
          ja: "見出しレベルはサイズではなく、ページの階層に合わせて選びます。",
          en: "Choose the heading level from the page hierarchy, not from the size.",
        },
      },
    ],
    a11y: {
      es: [
        "Panel es un <section> con borde; no sustituye landmarks ni usa tablas para maquetar.",
        "La cabecera usa <header> y el pie <footer>; el título conserva su nivel con as.",
        "Las acciones van después del título en el DOM para mantener el orden de lectura.",
        "flush se reserva para contenido tabular o listas a sangre, donde el padding estorba.",
      ],
      ja: [
        "Panel は枠線付きの <section> です。ランドマークの代わりにはならず、表をレイアウトに使いません。",
        "ヘッダーは <header>、フッターは <footer> を使い、タイトルは as で見出しレベルを保ちます。",
        "操作は読み上げ順を保つため、DOM 上でタイトルの後に置きます。",
        "flush は余白が邪魔になる表形式の内容や全幅リストだけに使います。",
      ],
      en: [
        "Panel is a bordered <section>; it does not replace landmarks and never uses tables for layout.",
        "The header uses <header> and the footer <footer>; the title keeps its level through as.",
        "Actions come after the title in the DOM to keep the reading order.",
        "flush is reserved for tabular content or full-bleed lists where padding gets in the way.",
      ],
    },
  },
  {
    slug: "badge",
    id: "C-003",
    name: "Badge",
    jp: "印",
    description: {
      es: "Metadato breve para estados, conteos y etiquetas. El tono aporta color y la apariencia controla el peso; el texto siempre carga el significado.",
      ja: "状態・件数・ラベルに使う短いメタデータです。トーンが色を、外観が強弱を担い、意味は常にテキストが伝えます。",
      en: "A short metadata label for states, counts and tags. Tone supplies color and appearance controls weight; the text always carries the meaning.",
    },
    files: filesFor(uiFile("badge.tsx")),
    examples: [
      {
        id: "tones",
        title: { es: "Tonos", ja: "色調", en: "Tones" },
        description: {
          es: "Siete tonos con apariencia soft por defecto; sale y new son fijos en todos los temas.",
          ja: "既定の soft 外観で7つのトーンを並べます。sale と new はテーマに関係なく固定です。",
          en: "Seven tones in the default soft appearance; sale and new are fixed across themes.",
        },
        preview: <BadgeTonesDemo />,
        code: `<Badge>Neutral</Badge>
<Badge tone="info">Info</Badge>
<Badge tone="success" dot>In stock</Badge>
<Badge tone="warning" dot>Low stock</Badge>
<Badge tone="danger">Cancelled</Badge>
<Badge tone="sale">Sale</Badge>
<Badge tone="new">New</Badge>`,
      },
      {
        id: "appearances",
        title: { es: "Apariencias", ja: "外観", en: "Appearances" },
        description: {
          es: "soft usa borde y texto del tono, solid invierte el fondo y outline deja el fondo transparente.",
          ja: "soft はトーンの枠線と文字、solid は背景を反転し、outline は背景を透明にします。",
          en: "soft uses the tone border and text, solid inverts the background and outline leaves it transparent.",
        },
        preview: <BadgeAppearancesDemo />,
        code: `<Badge tone="success" appearance="soft" dot>In stock</Badge>
<Badge tone="success" appearance="solid" dot>In stock</Badge>
<Badge tone="success" appearance="outline" dot>In stock</Badge>`,
      },
    ],
    props: [
      {
        prop: "tone",
        type: "neutral | info | success | warning | danger | sale | new",
        default: "neutral",
        note: {
          es: "sale siempre usa shu y new siempre ai, sin importar el tema; el resto sigue los roles del tema.",
          ja: "sale は常に朱、new は常に藍でテーマに依存しません。ほかはテーマの役割色に従います。",
          en: "sale always uses shu and new always ai, regardless of theme; the rest follow the theme roles.",
        },
      },
      {
        prop: "appearance",
        type: "soft | solid | outline",
        default: "soft",
        note: {
          es: "solid usa el tono como fondo y text-solid-fg encima; outline no pinta fondo.",
          ja: "solid はトーンを背景にし、上に text-solid-fg を置きます。outline は背景を塗りません。",
          en: "solid uses the tone as background with text-solid-fg on top; outline paints no background.",
        },
      },
      {
        prop: "dot",
        type: "boolean",
        default: "false",
        note: {
          es: "Agrega un punto decorativo con aria-hidden; no reemplaza al texto.",
          ja: "aria-hidden 付きの装飾ドットを追加します。テキストの代わりにはなりません。",
          en: "Adds a decorative dot with aria-hidden; it never replaces the text.",
        },
      },
    ],
    a11y: {
      es: [
        "El estado nunca se comunica solo con color: siempre hay texto visible.",
        "El punto es decorativo y lleva aria-hidden, así que no duplica la información.",
        "Badge usa text-2xs como metadato; no lo uses para párrafos ni contenido principal.",
        "Los tonos de texto cumplen AA sobre papel y superficie según el test de tokens.",
      ],
      ja: [
        "状態を色だけで伝えることはありません。必ず可視のテキストを伴います。",
        "ドットは装飾で aria-hidden を持つため、情報を重複させません。",
        "Badge はメタデータとして text-2xs を使います。段落や主要な内容には使いません。",
        "テキストのトーンは紙とサーフェスの上で AA を満たします。トークンのテストで検証しています。",
      ],
      en: [
        "State is never conveyed by color alone: there is always visible text.",
        "The dot is decorative and carries aria-hidden, so it does not duplicate information.",
        "Badge uses text-2xs as metadata; do not use it for paragraphs or primary content.",
        "Text tones meet AA on paper and surface according to the token test.",
      ],
    },
  },
  {
    slug: "section-header",
    id: "C-016",
    name: "SectionHeader",
    jp: "見出し",
    description: {
      es: "Cabecera de sección con barra primaria, título, etiqueta japonesa opcional, meta y acciones, cerrada por una regla. Ordena la página sin agregar contenedores.",
      ja: "プライマリバー、見出し、任意の日本語ラベル、メタ、操作を備え、罫線で閉じるセクション見出しです。余計なコンテナを増やさずにページを整理します。",
      en: "A section header with a primary bar, title, optional Japanese label, meta and actions, closed by a rule. It organizes the page without adding containers.",
    },
    files: filesFor(uiFile("section-header.tsx")),
    examples: [
      {
        id: "with-actions",
        title: { es: "Con acciones", ja: "操作あり", en: "With actions" },
        description: {
          es: "El título y el meta comparten bloque; las acciones se alinean al final y bajan en mobile.",
          ja: "見出しとメタは同じブロックに置き、操作は末尾に揃え、モバイルでは下に回り込みます。",
          en: "Title and meta share a block; actions align to the end and wrap below on mobile.",
        },
        preview: <SectionHeaderDemo />,
        code: `<SectionHeader
  title="Recent orders"
  jp="注文"
  meta="Last 7 days"
  actions={<Button size="sm" variant="outline">Filter</Button>}
/>`,
      },
      {
        id: "double-rule",
        title: { es: "Regla doble", ja: "二重罫", en: "Double rule" },
        description: {
          es: 'rule="double" marca un cambio de sección mayor; usa as para no romper la jerarquía.',
          ja: 'rule="double" は大きなセクションの区切りを示します。階層を崩さないよう as を使います。',
          en: 'rule="double" marks a major section break; use as so the hierarchy stays intact.',
        },
        preview: <SectionHeaderDoubleDemo />,
        code: `<SectionHeader
  as="h3"
  title="Specifications"
  jp="仕様"
  meta="Product HIKARI K-1"
  rule="double"
/>`,
      },
    ],
    props: [
      {
        prop: "title",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Contenido del heading; también es el nombre accesible de la sección.",
          ja: "見出しの内容で、セクションのアクセシブル名にもなります。",
          en: "Heading content; it is also the accessible name of the section.",
        },
      },
      {
        prop: "jp",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Etiqueta japonesa secundaria; se muestra atenuada junto al título.",
          ja: "見出しの横に淡く表示する、補助的な日本語ラベルです。",
          en: "Secondary Japanese label shown muted next to the title.",
        },
      },
      {
        prop: "meta",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Línea de contexto bajo el título: periodo, conteo o estado.",
          ja: "見出しの下に置く文脈行です。期間、件数、状態などを示します。",
          en: "Context line under the title: period, count or state.",
        },
      },
      {
        prop: "actions",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Se alinea al final de la cabecera; acepta uno o varios controles.",
          ja: "ヘッダーの末尾に揃えます。1つまたは複数のコントロールを受け取ります。",
          en: "Aligned to the end of the header; takes one or more controls.",
        },
      },
      {
        prop: "rule",
        type: "hairline | strong | double | none",
        default: "strong",
        note: {
          es: "Regla que cierra la cabecera; double es para cambios mayores y none para cabeceras dentro de un panel.",
          ja: "ヘッダーを閉じる罫線です。double は大きな区切り、none はパネル内の見出し向けです。",
          en: "Rule closing the header; double is for major breaks and none for headers inside a panel.",
        },
      },
      {
        prop: "as",
        type: "h2 | h3 | h4",
        default: "h2",
        note: {
          es: "Nivel del heading; elige según la jerarquía real del documento.",
          ja: "見出しレベルです。文書の実際の階層に合わせて選びます。",
          en: "Heading level; choose it from the real document hierarchy.",
        },
      },
    ],
    a11y: {
      es: [
        "El título es un heading real: usa as para no saltar niveles.",
        "La barra primaria es aria-hidden porque es decoración, no información.",
        "jp es una etiqueta secundaria; no repitas en ella el texto del título.",
        "Las acciones se leen después del título y del meta, en el orden del DOM.",
      ],
      ja: [
        "見出しは実際の heading です。レベルを飛ばさないよう as を使います。",
        "プライマリバーは情報ではなく装飾のため aria-hidden です。",
        "jp は補助ラベルです。見出しと同じテキストを繰り返しません。",
        "操作は DOM の順に従い、見出しとメタの後に読み上げられます。",
      ],
      en: [
        "The title is a real heading: use as so levels are never skipped.",
        "The primary bar is aria-hidden because it is decoration, not information.",
        "jp is a secondary label; never repeat the title text in it.",
        "Actions are read after the title and meta, following the DOM order.",
      ],
    },
  },
  {
    slug: "rule",
    id: "C-017",
    name: "Rule",
    jp: "罫線",
    description: {
      es: "Separador horizontal con cuatro pesos y una variante con etiqueta centrada. Sirve para cortar secciones y agrupar contenido, no para dibujar cajas.",
      ja: "4つの太さと、中央にラベルを置く変種を持つ水平の区切りです。セクションを分け、内容をまとめるためのもので、枠を描くためのものではありません。",
      en: "A horizontal separator with four weights and a labelled variant that centers the text. It divides sections and groups content; it does not draw boxes.",
    },
    files: filesFor(uiFile("rule.tsx")),
    examples: [
      {
        id: "weights",
        title: { es: "Pesos", ja: "太さ", en: "Weights" },
        description: {
          es: "hairline para separar filas, strong para bloques, double para cambios mayores y dashed para contenido provisional.",
          ja: "hairline は行の区切り、strong はブロック、double は大きな区切り、dashed は暫定的な内容に使います。",
          en: "hairline separates rows, strong divides blocks, double marks major breaks and dashed flags provisional content.",
        },
        preview: <RuleVariantsDemo />,
        code: `<Rule />
<Rule variant="strong" />
<Rule variant="double" />
<Rule variant="dashed" />`,
      },
      {
        id: "label",
        title: { es: "Con etiqueta", ja: "ラベル付き", en: "With a label" },
        description: {
          es: "Con label, la línea se parte en dos y el texto queda centrado entre ambas mitades.",
          ja: "label を渡すと罫線が2分割され、テキストが両側の中央に置かれます。",
          en: "With label, the line splits in two and the text sits centered between both halves.",
        },
        preview: <RuleLabelDemo />,
        code: `<Rule label="Product information" />`,
      },
    ],
    props: [
      {
        prop: "variant",
        type: "hairline | strong | double | dashed",
        default: "hairline",
        note: {
          es: "Cambia el peso y el estilo del borde superior; no cambia el grosor del texto.",
          ja: "上辺の太さと線種を変えます。テキストの太さは変わりません。",
          en: "Changes the weight and style of the top border; it does not change the text weight.",
        },
      },
      {
        prop: "label",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Con label se renderiza un div con dos líneas; sin label, un <hr> semántico.",
          ja: "label がある場合は2本の線を持つ div、ない場合は意味を持つ <hr> を描画します。",
          en: "With label it renders a div with two lines; without label, a semantic <hr>.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Para ajustar márgenes externos; el color y el borde salen de los tokens.",
          ja: "外側の余白調整用です。色と罫線はトークンから決まります。",
          en: "For outer spacing; color and border come from the tokens.",
        },
      },
    ],
    a11y: {
      es: [
        "Sin label se renderiza un <hr>, que el navegador expone como separador.",
        "Con label, las dos líneas son aria-hidden y el texto se lee una sola vez.",
        "Rule es un separador semántico: no lo uses para dibujar cajas ni tablas.",
      ],
      ja: [
        "label がない場合は <hr> を描画し、ブラウザは区切りとして公開します。",
        "label がある場合、2本の線は aria-hidden で、テキストは一度だけ読み上げられます。",
        "Rule は意味的な区切りです。枠や表を描くためには使いません。",
      ],
      en: [
        "Without a label it renders an <hr>, which the browser exposes as a separator.",
        "With a label, both lines are aria-hidden and the text is read only once.",
        "Rule is a semantic separator: never use it to draw boxes or tables.",
      ],
    },
  },
  {
    slug: "hanko",
    id: "C-024",
    name: "Hanko",
    jp: "判子",
    description: {
      es: "Sello cuadrado de inspiración japonesa para marcas y acentos editoriales. Acepta de uno a cuatro caracteres, gira −2° y usa el color primario del tema.",
      ja: "ブランドや編集のアクセントに使う、和風の方形の印です。1〜4文字を受け付け、−2° 傾け、テーマのプライマリ色を使います。",
      en: "A square seal inspired by Japanese stamps for brands and editorial accents. It takes one to four characters, tilts −2° and uses the theme's primary color.",
    },
    files: filesFor(uiFile("hanko.tsx")),
    examples: [
      {
        id: "sizes",
        title: { es: "Tamaños", ja: "サイズ", en: "Sizes" },
        description: {
          es: 'Tres tamaños y un sello con label; el último expone role="img" y el resto queda decorativo.',
          ja: '3つのサイズと label 付きの印を並べます。最後だけが role="img" を持ち、ほかは装飾です。',
          en: 'Three sizes and one labelled seal; only the last exposes role="img", the rest stay decorative.',
        },
        preview: <HankoDemo />,
        code: `<Hanko size="sm">典</Hanko>
<Hanko size="md">古典</Hanko>
<Hanko size="lg">古典紋</Hanko>
<Hanko label="Koten seal" size="md">典</Hanko>`,
      },
    ],
    props: [
      {
        prop: "size",
        type: "sm | md | lg",
        default: "md",
        note: {
          es: "Controla el cuadrado y el tamaño del carácter; la rotación de −2° se mantiene.",
          ja: "正方形の大きさと文字サイズを決めます。−2° の回転は保たれます。",
          en: "Controls the square and the character size; the −2° rotation stays.",
        },
      },
      {
        prop: "label",
        type: "string",
        default: "—",
        note: {
          es: 'Al pasarlo, el sello recibe role="img" y aria-label; sin label es decorativo.',
          ja: '渡すと role="img" と aria-label を持ちます。ない場合は装飾です。',
          en: 'When set, the seal gets role="img" and aria-label; without it, it is decorative.',
        },
      },
      {
        prop: "maxChars",
        type: "number",
        default: "4",
        note: {
          es: "Recorta el texto; el máximo efectivo es cuatro caracteres aunque se pida más.",
          ja: "テキストを切り詰めます。4より大きく指定しても実際の上限は4文字です。",
          en: "Trims the text; the effective maximum is four characters even if a larger value is passed.",
        },
      },
    ],
    a11y: {
      es: [
        "Sin label es decorativo y lleva aria-hidden, así que no ensucia el árbol accesible.",
        'Con label recibe role="img" y aria-label: el carácter visible no se anuncia dos veces.',
        "Máximo cuatro caracteres; el sello no es un botón, no recibe foco y no debe usarse para texto crítico.",
      ],
      ja: [
        "label がない場合は装飾として aria-hidden を持ち、アクセシビリティツリーを汚しません。",
        'label がある場合は role="img" と aria-label を持ち、可視の文字を二重に読み上げません。',
        "最大4文字です。印はボタンではなく、フォーカスを受けず、重要なテキストには使いません。",
      ],
      en: [
        "Without a label it is decorative and carries aria-hidden, so it does not clutter the accessibility tree.",
        'With a label it gets role="img" and aria-label: the visible character is not announced twice.',
        "Four characters maximum; the seal is not a button, takes no focus and must not carry critical text.",
      ],
    },
  },
  {
    slug: "tategaki",
    id: "C-025",
    name: "Tategaki",
    jp: "縦書き",
    description: {
      es: "Texto vertical (vertical-rl) para etiquetas editoriales. Se oculta en mobile y a lectores de pantalla por defecto, porque es un acento y no contenido esencial.",
      ja: "編集的なラベル用の縦書き（vertical-rl）です。必須の内容ではなくアクセントであるため、既定ではモバイルとスクリーンリーダーで非表示になります。",
      en: "Vertical text (vertical-rl) for editorial labels. It is hidden on mobile and from screen readers by default, because it is an accent rather than essential content.",
    },
    files: filesFor(uiFile("tategaki.tsx")),
    examples: [
      {
        id: "vertical-label",
        title: { es: "Etiqueta vertical", ja: "縦書きラベル", en: "Vertical label" },
        description: {
          es: "Acompaña un bloque horizontal y desaparece en mobile; el cuerpo sigue siendo la fuente de información.",
          ja: "横組みのブロックに添え、モバイルでは消えます。情報源はあくまで本文です。",
          en: "It accompanies a horizontal block and disappears on mobile; the body remains the source of information.",
        },
        preview: <TategakiDemo />,
        code: `<div className="flex items-start justify-between gap-[var(--koten-gap)]">
  <p className="max-w-sm text-xs text-muted">…</p>
  <Tategaki className="text-base">古典のデザイン</Tategaki>
</div>`,
      },
    ],
    props: [
      {
        prop: "decorative",
        type: "boolean",
        default: "true",
        note: {
          es: "true lo oculta a lectores de pantalla; pasa false solo si el texto vertical es contenido real.",
          ja: "true はスクリーンリーダーから隠します。縦書きが実際の内容の場合だけ false にします。",
          en: "true hides it from screen readers; pass false only when the vertical text is real content.",
        },
      },
      {
        prop: "children",
        type: "ReactNode",
        default: "—",
        note: {
          es: "Texto corto en japonés; si es una frase larga, usa body horizontal.",
          ja: "短い日本語のテキストです。長い文には横組みの本文を使います。",
          en: "Short Japanese text; for a long sentence, use horizontal body copy.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Permite subir el tamaño o cambiar el color; por defecto usa text-xs y text-faint.",
          ja: "サイズや色を変えるために使います。既定では text-xs と text-faint です。",
          en: "Lets you raise the size or change the color; by default it uses text-xs and text-faint.",
        },
      },
    ],
    a11y: {
      es: [
        "decorative oculta el bloque a lectores de pantalla: no es el único lugar donde debe estar la información.",
        "Se oculta en mobile para no robar ancho; si es contenido real, ofrece también la versión horizontal.",
        "No reemplaza al título ni al cuerpo: es una etiqueta breve y opcional.",
      ],
      ja: [
        "decorative はスクリーンリーダーから隠します。情報はここだけに置きません。",
        "幅を奪わないようモバイルでは非表示になります。実際の内容なら横組み版も用意します。",
        "見出しや本文の代わりにはなりません。短く任意のラベルです。",
      ],
      en: [
        "decorative hides the block from screen readers: it must not be the only place information lives.",
        "It is hidden on mobile so it does not steal width; if it is real content, also offer the horizontal version.",
        "It replaces neither the title nor the body: it is a short, optional label.",
      ],
    },
  },
  {
    slug: "pattern",
    id: "C-026",
    name: "Pattern",
    jp: "文様",
    description: {
      es: "Fondo decorativo con dos patrones tradicionales, seigaiha y asanoha, dibujados en SVG con currentColor al 8 %. Siempre es aria-hidden y vive detrás de contenido no crítico.",
      ja: "青海波と麻の葉という2つの伝統文様を SVG で描く装飾的な背景です。currentColor を 8 % で使い、常に aria-hidden として重要でない内容の背後に置きます。",
      en: "A decorative background with two traditional patterns, seigaiha and asanoha, drawn in SVG with currentColor at 8%. It is always aria-hidden and lives behind non-critical content.",
    },
    files: filesFor(uiFile("pattern.tsx")),
    examples: [
      {
        id: "variants",
        title: { es: "Dos patrones", ja: "2つの文様", en: "Two patterns" },
        description: {
          es: "Seigaiha dibuja olas concéntricas y asanoha una retícula de hojas de cáñamo; ambos heredan el color del texto.",
          ja: "seigaiha は同心円の波、asanoha は麻の葉の格子を描き、どちらも文字色を継承します。",
          en: "Seigaiha draws concentric waves and asanoha a hemp-leaf lattice; both inherit the text color.",
        },
        preview: <PatternDemo />,
        code: `<div className="relative h-32 overflow-hidden border border-rule bg-surface">
  <Pattern variant="seigaiha" className="absolute inset-0" />
</div>
<div className="relative h-32 overflow-hidden border border-rule bg-surface">
  <Pattern variant="asanoha" className="absolute inset-0" />
</div>`,
      },
    ],
    props: [
      {
        prop: "variant",
        type: "seigaiha | asanoha",
        default: "seigaiha",
        note: {
          es: "Cambia el dibujo del SVG; el tamaño del mosaico es fijo para que el patrón no se deforme.",
          ja: "SVG の図柄を変えます。模様が崩れないようタイルのサイズは固定です。",
          en: "Switches the SVG drawing; the tile size is fixed so the pattern never distorts.",
        },
      },
      {
        prop: "className",
        type: "string",
        default: "—",
        note: {
          es: "Se usa con absolute inset-0 dentro de un contenedor relative con overflow-hidden.",
          ja: "overflow-hidden を持つ relative コンテナの中で absolute inset-0 として使います。",
          en: "Used with absolute inset-0 inside a relative container with overflow-hidden.",
        },
      },
    ],
    a11y: {
      es: [
        "Pattern siempre es aria-hidden: el SVG no aporta información y no debe anunciarse.",
        "Vive detrás de contenido no crítico y nunca detrás de texto denso.",
        "El color sale de currentColor con 8 % de opacidad; no lo subas para compensar contraste.",
      ],
      ja: [
        "Pattern は常に aria-hidden です。SVG は情報を提供せず、読み上げられるべきではありません。",
        "重要でない内容の背後に置き、密度の高いテキストの背後には置きません。",
        "色は currentColor を 8 % の不透明度で使います。コントラストの補正のために濃くしません。",
      ],
      en: [
        "Pattern is always aria-hidden: the SVG carries no information and must not be announced.",
        "It lives behind non-critical content and never behind dense text.",
        "Its color comes from currentColor at 8% opacity; do not raise it to compensate for contrast.",
      ],
    },
  },
];
