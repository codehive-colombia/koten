import { type KotenLocale, useKoten } from "@koten/ui";
import { Link } from "react-router";
import { Code, List, PageHeader } from "../components/docs";
import { Section } from "../components/specimen";
import { site } from "../lib/site";

const copy = {
  es: {
    eyebrow: "Fundamentos · 自動",
    title: "IA y agentes",
    description:
      "Koten UI expone el sistema en tres niveles para que un agente pueda leerlo, instalar componentes y extender la gramática sin adivinar la API. Todo se genera desde la misma fuente que el catálogo, así que no hay una segunda documentación que se desactualice.",
    meta: "llms.txt · Markdown por página · 2 skills",
    docs: {
      title: "1 · Documentación legible por máquina",
      meta: "llms.txt · llms-full.txt · Markdown",
      body: "El catálogo publica un índice en formato llms.txt, un archivo completo y una página Markdown por componente y bloque. Las páginas incluyen instalación, archivos, requisitos, ejemplos, props y accesibilidad en inglés, el idioma que consumen los agentes.",
      items: [
        `/llms.txt: índice con los 46 componentes, 20 bloques, guías y skills.`,
        `/llms-full.txt: todo el sistema en un solo archivo para cargar de una vez.`,
        `/md/components/<slug>.md y /md/blocks/<categoría>/<slug>.md: una página por pieza.`,
        `/md/guides/design-system.md y /md/guides/recipes.md: las guías internas copiadas tal cual.`,
      ],
      code: `curl ${site.origin}/llms.txt
curl ${site.origin}/md/components/button.md
curl ${site.origin}/md/blocks/erp/app-shell.md`,
    },
    consume: {
      title: "2 · Skill para consumir componentes",
      meta: "koten-ui · inventario · composición",
      body: "La skill koten-ui enseña a elegir la pieza correcta, instalar koten-theme, instalar el item del registry, envolver la app con KotenProvider y respetar la API. Incluye un inventario generado con el registry de cada componente y recetas de formulario, tabla, drawer y tarjeta.",
      items: [
        "Elegir primitiva o bloque antes de escribir markup.",
        "Instalar el tema primero y el componente después.",
        "Componer con render; nunca asChild.",
        "Verificar tokens, teclado, foco, 12 px e i18n.",
      ],
      code: `npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui -a opencode -a claude-code`,
    },
    design: {
      title: "3 · Skill para extender el design system",
      meta: "koten-design-system · tokens · blueprint",
      body: "La skill koten-design-system cubre el trabajo inverso: agregar una primitiva o un bloque, crear un tema o una densidad, documentar la página del catálogo y preparar el registry. También explica cómo aplicar la gramática de Koten a un sistema nuevo sin copiar solo la paleta.",
      items: [
        "Clasificar la pieza: token, primitiva, bloque, tema o densidad.",
        "Definir el contrato antes del markup: variantes, estados, ARIA.",
        "Implementar con CVA, data-slot, roles semánticos y propiedades lógicas.",
        "Probar, documentar en ES/JA/EN y regenerar la capa de agentes.",
      ],
      code: `npx skills add codehive-colombia/koten --skill koten-design-system -a opencode -a claude-code`,
    },
    why: {
      title: "Por qué está construido así",
      meta: "Divulgación progresiva · una fuente",
      body: "Las skills siguen el estándar Agent Skills: el frontmatter name/description se carga al inicio y el cuerpo solo cuando la tarea lo activa. El detalle vive en references/, un nivel abajo, para no gastar contexto. El inventario y las guías se generan desde apps/catalog/src/data/docs; el catálogo y la documentación de agentes no pueden divergir.",
      items: [
        "SKILL.md corto, con instrucciones y enlaces; referencias para el detalle.",
        "Descripciones con el qué y el cuándo, para que el agente active la skill correcta.",
        "Sin rutas absolutas ni secretos; referencias relativas dentro de cada skill.",
        "Generación determinista y una comprobación en bun run check.",
      ],
    },
    sync: {
      title: "Mantenerlo en sincronía",
      meta: "bun run ai:docs · bun run ai:check",
      body: "La capa de agentes se regenera al arrancar el catálogo y antes de construir producción. La comprobación falla si el llms.txt del repositorio, el inventario de la skill o el frontmatter de una skill no cumplen.",
      code: `bun run ai:docs    # regenera llms.txt, Markdown e inventario
bun run ai:check   # falla si algo está desactualizado
bun run check      # incluye ai:check`,
    },
    next: {
      title: "Siguientes pasos",
      meta: "Del índice a la pantalla",
      body: "Empieza por llms.txt si eres un agente, por Empezar si eres una persona y por el blueprint si vas a agregar una pieza.",
      links: "Ver Empezar|Ver componentes|Ver design system",
    },
  },
  ja: {
    eyebrow: "基礎 · 自動",
    title: "AIとエージェント",
    description:
      "Koten UI は、エージェントが API を推測せずにシステムを読み、コンポーネントを導入し、文法を拡張できるよう、3つの階層で情報を公開します。すべてカタログと同じソースから生成されるため、古くなる別のドキュメントはありません。",
    meta: "llms.txt · ページ別Markdown · 2 skills",
    docs: {
      title: "1 · 機械可読なドキュメント",
      meta: "llms.txt · llms-full.txt · Markdown",
      body: "カタログは llms.txt の索引、全ファイル、コンポーネントとブロックごとの Markdown を公開します。各ページには導入、ファイル、要件、例、props、アクセシビリティをエージェント向けの英語で掲載します。",
      items: [
        `/llms.txt: 46 コンポーネント、20 ブロック、ガイド、skills の索引。`,
        `/llms-full.txt: システム全体を1ファイルにまとめたもの。`,
        `/md/components/<slug>.md と /md/blocks/<category>/<slug>.md: 1部品ごとのページ。`,
        `/md/guides/design-system.md と /md/guides/recipes.md: 内部ガイドのコピー。`,
      ],
      code: `curl ${site.origin}/llms.txt
curl ${site.origin}/md/components/button.md
curl ${site.origin}/md/blocks/erp/app-shell.md`,
    },
    consume: {
      title: "2 · コンポーネント利用の skill",
      meta: "koten-ui · 一覧 · 合成",
      body: "koten-ui は、適切な部品の選び方、koten-theme の導入、registry からの導入、KotenProvider の設定、API の維持を案内します。各コンポーネントの registry 名を含む生成済み一覧と、フォーム、テーブル、ドロワー、カードのレシピを同梱します。",
      items: [
        "マークアップの前にプリミティブかブロックかを選ぶ。",
        "テーマを先に、コンポーネントを後に導入する。",
        "合成は render を使い、asChild は使わない。",
        "トークン、キーボード、フォーカス、12 px、i18n を確認する。",
      ],
      code: `npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui -a opencode -a claude-code`,
    },
    design: {
      title: "3 · デザインシステム拡張の skill",
      meta: "koten-design-system · トークン · blueprint",
      body: "koten-design-system は逆方向の作業を扱います。プリミティブやブロックの追加、テーマや密度の作成、カタログページの文書化、registry の準備です。パレットだけをコピーせず、Koten の文法を新しいシステムに適用する方法も説明します。",
      items: [
        "トークン、プリミティブ、ブロック、テーマ、密度に分類する。",
        "マークアップの前に、バリアント、状態、ARIA の契約を決める。",
        "CVA、data-slot、意味的ロール、論理プロパティで実装する。",
        "テストし、ES/JA/EN で文書化し、エージェント層を再生成する。",
      ],
      code: `npx skills add codehive-colombia/koten --skill koten-design-system -a opencode -a claude-code`,
    },
    why: {
      title: "この構成の理由",
      meta: "段階的開示 · 単一ソース",
      body: "skills は Agent Skills 標準に従います。frontmatter の name/description は起動時に読み込まれ、本文はタスクが発火したときだけ読み込まれます。詳細は references/ に置き、コンテキストを節約します。一覧とガイドは apps/catalog/src/data/docs から生成されるため、カタログとエージェント向け文書は乖離しません。",
      items: [
        "SKILL.md は短く、指示とリンクだけ。詳細は references に置く。",
        "何を・いつするかを説明に書き、適切な skill が選ばれるようにする。",
        "絶対パスや秘密情報を置かず、skill 内の相対参照を使う。",
        "決定的に生成し、bun run check で検査する。",
      ],
    },
    sync: {
      title: "同期を保つ",
      meta: "bun run ai:docs · bun run ai:check",
      body: "エージェント層はカタログ起動時と本番ビルド前に再生成されます。リポジトリの llms.txt、skill の一覧、frontmatter が仕様を満たさない場合は検査が失敗します。",
      code: `bun run ai:docs    # llms.txt、Markdown、一覧を再生成
bun run ai:check   # 古ければ失敗
bun run check      # ai:check を含む`,
    },
    next: {
      title: "次のステップ",
      meta: "索引から画面へ",
      body: "エージェントは llms.txt から、人は「はじめかた」から、新しい部品を追加する人は blueprint から始めてください。",
      links: "はじめかた|コンポーネント|デザインシステム",
    },
  },
  en: {
    eyebrow: "Foundations · 自動",
    title: "AI and agents",
    description:
      "Koten UI exposes the system in three levels so an agent can read it, install components and extend the grammar without guessing the API. Everything is generated from the same source as the catalog, so there is no second documentation set to drift.",
    meta: "llms.txt · per-page Markdown · 2 skills",
    docs: {
      title: "1 · Machine-readable documentation",
      meta: "llms.txt · llms-full.txt · Markdown",
      body: "The catalog publishes an llms.txt index, a full-file corpus and one Markdown page per component and block. Each page includes installation, files, requirements, examples, props and accessibility in English, the language agents consume.",
      items: [
        `/llms.txt: index of the 46 components, 20 blocks, guides and skills.`,
        `/llms-full.txt: the whole system in one file for a single load.`,
        `/md/components/<slug>.md and /md/blocks/<category>/<slug>.md: one page per piece.`,
        `/md/guides/design-system.md and /md/guides/recipes.md: the internal guides copied as-is.`,
      ],
      code: `curl ${site.origin}/llms.txt
curl ${site.origin}/md/components/button.md
curl ${site.origin}/md/blocks/erp/app-shell.md`,
    },
    consume: {
      title: "2 · Skill to consume components",
      meta: "koten-ui · inventory · composition",
      body: "The koten-ui skill teaches an agent to pick the right piece, install koten-theme, install the registry item, wrap the app with KotenProvider and keep the API. It ships a generated inventory with each component's registry item and recipes for forms, tables, drawers and cards.",
      items: [
        "Choose a primitive or block before writing markup.",
        "Install the theme first, then the component.",
        "Compose with render; never asChild.",
        "Check tokens, keyboard, focus, 12 px and i18n.",
      ],
      code: `npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui -a opencode -a claude-code`,
    },
    design: {
      title: "3 · Skill to extend the design system",
      meta: "koten-design-system · tokens · blueprint",
      body: "The koten-design-system skill covers the inverse work: add a primitive or block, create a theme or density, document the catalog page and prepare the registry. It also explains how to apply the Koten grammar to a new system instead of copying only the palette.",
      items: [
        "Classify the piece: token, primitive, block, theme or density.",
        "Define the contract before markup: variants, states, ARIA.",
        "Implement with CVA, data-slot, semantic roles and logical properties.",
        "Test, document in ES/JA/EN and regenerate the agent layer.",
      ],
      code: `npx skills add codehive-colombia/koten --skill koten-design-system -a opencode -a claude-code`,
    },
    why: {
      title: "Why it is built this way",
      meta: "Progressive disclosure · one source",
      body: "The skills follow the Agent Skills standard: the name/description frontmatter loads at startup and the body loads only when the task activates it. Detail lives in references/, one level down, to save context. The inventory and guides are generated from apps/catalog/src/data/docs, so the catalog and the agent docs cannot diverge.",
      items: [
        "A short SKILL.md with instructions and links; references for detail.",
        "Descriptions that state what and when, so the right skill activates.",
        "No absolute paths or secrets; relative references inside each skill.",
        "Deterministic generation with a check in bun run check.",
      ],
    },
    sync: {
      title: "Keeping it in sync",
      meta: "bun run ai:docs · bun run ai:check",
      body: "The agent layer is regenerated when the catalog starts and before production builds. The check fails when the repository llms.txt, the skill inventory or a skill frontmatter breaks the contract.",
      code: `bun run ai:docs    # regenerate llms.txt, Markdown and inventory
bun run ai:check   # fail when something is stale
bun run check      # includes ai:check`,
    },
    next: {
      title: "Next steps",
      meta: "From the index to the screen",
      body: "Start with llms.txt if you are an agent, with Getting started if you are a person, and with the blueprint if you are adding a piece.",
      links: "Getting started|Browse components|Design system",
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function AIPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [gettingStarted, components, designSystem] = t.next.links.split("|");

  return (
    <article>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="自動"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="docs" title={t.docs.title} jp="文書" meta={t.docs.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.docs.body}</p>
          <List items={t.docs.items} label={t.docs.title} />
          <Code>{t.docs.code}</Code>
        </Section>

        <Section id="consume" title={t.consume.title} jp="利用" meta={t.consume.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.consume.body}</p>
          <List items={t.consume.items} label={t.consume.title} />
          <Code>{t.consume.code}</Code>
        </Section>

        <Section id="design" title={t.design.title} jp="拡張" meta={t.design.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.design.body}</p>
          <List items={t.design.items} label={t.design.title} />
          <Code>{t.design.code}</Code>
        </Section>

        <Section id="why" title={t.why.title} jp="設計" meta={t.why.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.why.body}</p>
          <List items={t.why.items} label={t.why.title} />
        </Section>

        <Section id="sync" title={t.sync.title} jp="同期" meta={t.sync.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.sync.body}</p>
          <Code>{t.sync.code}</Code>
        </Section>

        <Section id="siguientes" title={t.next.title} jp="応用" meta={t.next.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.next.body}</p>
          <p className="mt-[var(--koten-gap)] flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
            <Link to="/start" className="text-link underline underline-offset-2">
              {gettingStarted}
            </Link>
            <Link to="/components" className="text-link underline underline-offset-2">
              {components}
            </Link>
            <Link to="/tokens" className="text-link underline underline-offset-2">
              {designSystem}
            </Link>
            <a
              href={`${site.origin}/llms.txt`}
              target="_blank"
              rel="noreferrer"
              className="text-link underline underline-offset-2"
            >
              llms.txt ↗
            </a>
            <a
              href={`${site.origin}/md/components/button.md`}
              target="_blank"
              rel="noreferrer"
              className="text-link underline underline-offset-2"
            >
              Markdown ↗
            </a>
          </p>
        </Section>
      </div>
    </article>
  );
}
