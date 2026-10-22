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
      "Koten UI expone el sistema en tres niveles: leerlo, instalar componentes y extender la gramática. La documentación se genera desde el catálogo, sin una segunda fuente que se desactualice.",
    meta: "llms.txt · Markdown por página · 3 skills",
    docs: {
      title: "1 · Documentación legible por máquina",
      meta: "llms.txt · llms-full.txt · Markdown",
      body: "El catálogo publica un índice `llms.txt`, un corpus completo y una página Markdown por componente y bloque, en inglés. Cada página incluye instalación, archivos, requisitos, ejemplos, props y accesibilidad. Cada dirección del catálogo existe también en Markdown —agrega `.md` o pide `Accept: text/markdown`— y su HTML ya trae el resumen, la instalación y los enlaces: un agente que abre la URL no encuentra una página vacía.",
      items: [
        `/llms.txt: índice con los 46 componentes, 20 bloques, guías y skills.`,
        `/llms-full.txt: todo el sistema en un solo archivo para cargar de una vez.`,
        `/md/components/<slug>.md y /md/blocks/<categoría>/<slug>.md: una página por pieza.`,
        `/md/guides/design-system.md y /md/guides/recipes.md: las guías internas copiadas tal cual.`,
        "`/components/button.md` (o `Accept: text/markdown`): la misma página sin JavaScript.",
        "Si le pasas la web a un agente, pega la URL de `llms.txt` y no la portada: la portada sola no le dice dónde está el resto.",
      ],
      code: `curl ${site.origin}/llms.txt
curl ${site.origin}/md/components/button.md
curl ${site.origin}/components/button.md`,
    },
    consume: {
      title: "2 · Skill para consumir componentes",
      meta: "koten-ui · inventario · composición",
      body: "La skill `koten-ui` cubre elección, instalación, composición y verificación. Incluye un inventario generado y recetas de formulario, tabla, drawer y tarjeta.",
      items: [
        "Elegir primitiva o bloque antes de escribir markup.",
        "Instalar el tema primero y el componente después.",
        "Componer con render; nunca asChild.",
        "Verificar tokens, teclado, foco, 12 px e i18n.",
      ],
      language:
        "El japonés no es un requisito de consumo: no agregues texto japonés, kanji, etiquetas `jp`, Tategaki, Hanko ni Pattern a la UI de tu producto salvo que el usuario lo pida. El japonés del catálogo es lenguaje visual de la documentación interna.",
      code: `npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui -a opencode -a claude-code`,
    },
    design: {
      title: "3 · Skills para extender y crear",
      meta: "koten-design-system · koten-design-language",
      body: "El tercer nivel tiene dos caminos. `koten-design-system` trabaja dentro del repositorio: agrega primitivas, bloques, temas o densidades y prepara el registry. `koten-design-language` es portátil: se instala en cualquier proyecto con Koten y enseña a crear una pieza nueva con roles semánticos, marcos de 1 px, radios de 2–3 px, sombras solo en overlays y contraste AA.",
      items: [
        "koten-design-system: clasificar token, primitiva, bloque, tema o densidad y pasar la puerta de calidad del repositorio.",
        "koten-design-language: buscar una pieza existente y componer antes de crear; el nombre faltante no es la pieza faltante.",
        "koten-design-language: tokens, bordes, sombras, tipografía y densidad en los cuatro temas; contraste 4.5:1 / 3:1.",
        "Ambas: verificar teclado, foco, piso de 12 px, ES/EN y axe antes de cerrar.",
      ],
      code: `npx skills add codehive-colombia/koten --skill koten-design-system -a opencode -a claude-code
npx skills add codehive-colombia/koten --skill koten-design-language -a opencode -a claude-code`,
    },
    why: {
      title: "Por qué está construido así",
      meta: "Divulgación progresiva · una fuente",
      body: "Las skills siguen el estándar Agent Skills: el frontmatter `name`/`description` carga al inicio y el cuerpo solo cuando la tarea lo activa. El detalle vive en `references/` para no gastar contexto.",
      items: [
        "SKILL.md corto, con instrucciones y enlaces; referencias para el detalle.",
        "Descripciones con el qué y el cuándo, para que el agente active la skill correcta.",
        "Sin rutas absolutas ni secretos; referencias relativas dentro de cada skill.",
        "Generación determinista y una comprobación en bun run check; una skill que invente un token koten-* falla la validación.",
      ],
    },
    sync: {
      title: "Mantenerlo en sincronía",
      meta: "bun run ai:docs · bun run ai:check",
      body: "La capa se regenera al arrancar el catálogo y antes del build de producción. `ai:check` falla si `llms.txt`, el inventario o el frontmatter no están en sincronía.",
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
      "Koten UI は、システムを読む・コンポーネントを導入する・文法を拡張するという3つの階層を公開します。ドキュメントはカタログから生成され、古くなる別のソースはありません。",
    meta: "llms.txt · ページ別Markdown · 3 skills",
    docs: {
      title: "1 · 機械可読なドキュメント",
      meta: "llms.txt · llms-full.txt · Markdown",
      body: "カタログは `llms.txt` の索引、全ファイル、コンポーネントとブロックごとの Markdown を英語で公開します。各ページには導入、ファイル、要件、例、props、アクセシビリティを掲載します。カタログの各アドレスは Markdown でも存在し（`.md` を付けるか `Accept: text/markdown`）、HTML にも要約、導入コマンド、リンクが入っているため、エージェントが URL を開いて空のページに当たることはありません。",
      items: [
        `/llms.txt: 46 コンポーネント、20 ブロック、ガイド、skills の索引。`,
        `/llms-full.txt: システム全体を1ファイルにまとめたもの。`,
        `/md/components/<slug>.md と /md/blocks/<category>/<slug>.md: 1部品ごとのページ。`,
        `/md/guides/design-system.md と /md/guides/recipes.md: 内部ガイドのコピー。`,
        "`/components/button.md`（または `Accept: text/markdown`）: JavaScript なしの同じページ。",
        "エージェントに web を渡すときは、トップページではなく `llms.txt` の URL を貼ってください。トップページだけでは残りの場所が伝わりません。",
      ],
      code: `curl ${site.origin}/llms.txt
curl ${site.origin}/md/components/button.md
curl ${site.origin}/components/button.md`,
    },
    consume: {
      title: "2 · コンポーネント利用の skill",
      meta: "koten-ui · 一覧 · 合成",
      body: "`koten-ui` は選択、導入、合成、検証を扱います。生成済みの一覧と、フォーム、テーブル、ドロワー、カードのレシピを同梱します。",
      items: [
        "マークアップの前にプリミティブかブロックかを選ぶ。",
        "テーマを先に、コンポーネントを後に導入する。",
        "合成は render を使い、asChild は使わない。",
        "トークン、キーボード、フォーカス、12 px、i18n を確認する。",
      ],
      language:
        "日本語は消費側の要件ではありません。ユーザーが明示的に求めない限り、プロダクトUIに日本語のテキスト、漢字、`jp` ラベル、縦書き、判子、パターンを追加しないでください。カタログの日本語は内部ドキュメントの視覚言語です。",
      code: `npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui -a opencode -a claude-code`,
    },
    design: {
      title: "3 · 拡張と作成の skill",
      meta: "koten-design-system · koten-design-language",
      body: "第3階層には2つの道があります。`koten-design-system` はリポジトリ内でプリミティブやブロック、テーマ、密度を追加し、registry を準備します。`koten-design-language` はポータブルで、Koten を導入済みの任意のプロジェクトにインストールし、意味的ロール、1 px の枠、2〜3 px の角丸、オーバーレイのみの影、AA コントラストで新しい部品を作る方法を教えます。",
      items: [
        "koten-design-system：トークン、プリミティブ、ブロック、テーマ、密度を分類し、リポジトリの品質ゲートを通す。",
        "koten-design-language：既存の部品を探して合成する。名前がないことは部品がないことではない。",
        "koten-design-language：4テーマでトークン、枠、影、タイポグラフィ、密度を確認し、4.5:1 / 3:1 を守る。",
        "両方：キーボード、フォーカス、12 px の下限、ES/EN、axe を確認する。",
      ],
      code: `npx skills add codehive-colombia/koten --skill koten-design-system -a opencode -a claude-code
npx skills add codehive-colombia/koten --skill koten-design-language -a opencode -a claude-code`,
    },
    why: {
      title: "この構成の理由",
      meta: "段階的開示 · 単一ソース",
      body: "skills は Agent Skills 標準に従います。frontmatter の `name`/`description` は起動時に読み込まれ、本文はタスクが発火したときだけ読み込まれます。詳細は `references/` に置き、コンテキストを節約します。",
      items: [
        "SKILL.md は短く、指示とリンクだけ。詳細は references に置く。",
        "何を・いつするかを説明に書き、適切な skill が選ばれるようにする。",
        "絶対パスや秘密情報を置かず、skill 内の相対参照を使う。",
        "決定的に生成し、bun run check で検査する。koten-* トークンを発明した skill は検証に失敗する。",
      ],
    },
    sync: {
      title: "同期を保つ",
      meta: "bun run ai:docs · bun run ai:check",
      body: "エージェント層はカタログ起動時と本番ビルド前に再生成されます。`ai:check` は `llms.txt`、一覧、frontmatter が同期していなければ失敗します。",
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
      "Koten UI exposes the system in three levels: read it, install components and extend the grammar. The documentation is generated from the catalog, so there is no second source to drift.",
    meta: "llms.txt · per-page Markdown · 3 skills",
    docs: {
      title: "1 · Machine-readable documentation",
      meta: "llms.txt · llms-full.txt · Markdown",
      body: "The catalog publishes an `llms.txt` index, a full corpus and one Markdown page per component and block, in English. Each page includes installation, files, requirements, examples, props and accessibility. Every catalog address also exists as Markdown —append `.md` or send `Accept: text/markdown`— and its HTML already carries the summary, the install command and the links, so an agent that opens the URL does not land on an empty page.",
      items: [
        `/llms.txt: index of the 46 components, 20 blocks, guides and skills.`,
        `/llms-full.txt: the whole system in one file for a single load.`,
        `/md/components/<slug>.md and /md/blocks/<category>/<slug>.md: one page per piece.`,
        `/md/guides/design-system.md and /md/guides/recipes.md: the internal guides copied as-is.`,
        "`/components/button.md` (or `Accept: text/markdown`): the same page without JavaScript.",
        "When you hand the site to an agent, paste the `llms.txt` URL, not the homepage: the homepage alone does not say where the rest is.",
      ],
      code: `curl ${site.origin}/llms.txt
curl ${site.origin}/md/components/button.md
curl ${site.origin}/components/button.md`,
    },
    consume: {
      title: "2 · Skill to consume components",
      meta: "koten-ui · inventory · composition",
      body: "The `koten-ui` skill covers selection, installation, composition and verification. It ships a generated inventory and recipes for forms, tables, drawers and cards.",
      items: [
        "Choose a primitive or block before writing markup.",
        "Install the theme first, then the component.",
        "Compose with render; never asChild.",
        "Check tokens, keyboard, focus, 12 px and i18n.",
      ],
      language:
        "Japanese is not a consumption requirement: do not add Japanese text, kanji, `jp` labels, Tategaki, Hanko or Pattern to your product UI unless the user asks for them. The Japanese in the catalog is the visual language of the internal documentation.",
      code: `npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui -a opencode -a claude-code`,
    },
    design: {
      title: "3 · Skills to extend and author",
      meta: "koten-design-system · koten-design-language",
      body: "The third level has two paths. `koten-design-system` works inside the repository: add primitives, blocks, themes or densities and prepare the registry. `koten-design-language` is portable: install it in any project that already uses Koten and it teaches how to author a new piece with semantic roles, 1 px frames, 2–3 px radii, overlay-only shadows and AA contrast.",
      items: [
        "koten-design-system: classify token, primitive, block, theme or density and pass the repository quality gate.",
        "koten-design-language: search for an existing piece and compose before creating; a missing name is not a missing piece.",
        "koten-design-language: tokens, frames, shadows, typography and density in all four themes; 4.5:1 / 3:1 contrast.",
        "Both: verify keyboard, focus, the 12 px floor, ES/EN and axe before closing.",
      ],
      code: `npx skills add codehive-colombia/koten --skill koten-design-system -a opencode -a claude-code
npx skills add codehive-colombia/koten --skill koten-design-language -a opencode -a claude-code`,
    },
    why: {
      title: "Why it is built this way",
      meta: "Progressive disclosure · one source",
      body: "The skills follow the Agent Skills standard: the `name`/`description` frontmatter loads at startup and the body loads only when the task activates it. Detail lives in `references/` to save context.",
      items: [
        "A short SKILL.md with instructions and links; references for detail.",
        "Descriptions that state what and when, so the right skill activates.",
        "No absolute paths or secrets; relative references inside each skill.",
        "Deterministic generation with a check in bun run check; a skill that invents a koten-* token fails validation.",
      ],
    },
    sync: {
      title: "Keeping it in sync",
      meta: "bun run ai:docs · bun run ai:check",
      body: "The layer is regenerated when the catalog starts and before the production build. `ai:check` fails when `llms.txt`, the inventory or the frontmatter is out of sync.",
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
          <p className="mt-[var(--koten-gap)] text-xs leading-relaxed text-muted">
            {t.consume.language}
          </p>
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
