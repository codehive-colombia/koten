import { type KotenLocale, useKoten } from "@koten/ui";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Code, PageHeader } from "../components/docs";
import { Section } from "../components/specimen";
import { PackageManagerTabs } from "../components/view-toggles";
import { shellLabels } from "../data/catalog";
import { packageRunner, usePackageManager } from "../lib/package-manager";
import { registryCommand } from "../lib/site";

const copy = {
  es: {
    eyebrow: "Fundamentos · 使い方",
    title: "Empezar",
    description:
      "Hay dos caminos: usar Koten UI en tu producto o desarrollar el sistema. Cada uno tiene requisitos y comandos propios.",
    meta: "Dos caminos · usar el sistema o desarrollarlo · ES/JA/EN",
    choose: {
      title: "Elige tu camino",
      meta: "Dos guías · un sistema",
      body: "Cada guía asume un punto de partida distinto y no mezcla comandos que no necesitas.",
      use: {
        kicker: "Usar el sistema",
        title: "Quiero usar Koten UI",
        description:
          "Tengo un proyecto React con Tailwind 4 y quiero instalar el tema, un componente o un bloque.",
        action: "Ir a la guía de uso",
      },
      develop: {
        kicker: "Desarrollar el sistema",
        title: "Quiero desarrollar Koten UI",
        description:
          "Quiero correr el catálogo, tocar las primitivas, pasar las auditorías o contribuir al repositorio.",
        action: "Ir a la guía de desarrollo",
      },
    },
    use: {
      title: "Usar Koten UI en tu proyecto",
      meta: "React 19 · Tailwind 4 · shadcn · sin Bun",
      intro:
        "Koten UI no es un paquete npm: es un conjunto de archivos que se copian a tu proyecto. No necesitas clonar este repositorio ni instalar Bun. El registry de shadcn hace la instalación y respeta los aliases de tu components.json.",
      runnerNote:
        "Los comandos de shadcn se copian con el runner que elijas. La preferencia se guarda en este navegador y se mantiene al cambiar de página.",
      requirements: {
        title: "Antes de empezar",
        items: [
          "React 19 y Tailwind CSS 4 en el proyecto.",
          "Un `components.json` de shadcn. Si no existe, ejecuta `{init}`.",
          "Node 20 o superior para `npx`; el CLI de shadcn lo usa.",
          "Opcional: una skill de agente para que la instalación y el uso sigan las reglas del sistema (`koten-ui`).",
        ],
      },
      theme: {
        title: "1 · Instala el tema una vez",
        body: "`koten-theme` escribe tokens, temas y densidad en el archivo `tailwind.css` declarado en tu `components.json`. No crea una carpeta `styles/`. Si el proyecto ya tenía tokens de shadcn, instálalo primero para reemplazarlos.",
      },
      component: {
        title: "2 · Instala el componente que necesitas",
        body: "Cada página de componente muestra su comando. El item trae el archivo y el núcleo `lib/koten`; el CLI reescribe los imports a los aliases de tu proyecto. Instala solo lo que vas a usar.",
      },
      blockComment: "también puedes instalar un bloque completo",
      provider: {
        title: "3 · Conecta el provider",
        body: "Envuelve la app una vez e importa el CSS de Tailwind que ya usa tu proyecto; el tema se escribe ahí. Los ejemplos usan `@/`; el CLI lo reescribe al prefijo de tu `components.json`.",
        code: `import "./app.css"; // el CSS de Tailwind de tu components.json
import { KotenProvider } from "@/lib/koten/provider";

createRoot(document.getElementById("root")!).render(
  <KotenProvider locale="es">
    <App />
  </KotenProvider>,
);`,
      },
      usage: {
        title: "4 · Usa la pieza",
        body: "Los componentes no contienen textos de interfaz: los labels llegan por props o por el provider. Respeta las props documentadas; el tema decide el color y la densidad decide el tamaño.",
        code: `<Button variant="primary">Guardar</Button>

<Field label="Cliente" required description="Nombre o razón social.">
  <Input name="customer" autoComplete="organization" />
</Field>`,
      },
      appearance: {
        title: "5 · Tema, densidad e idioma",
        body: "No edites los componentes para cambiar el tono. El tema y la densidad viven en el elemento raíz; el idioma va en el provider. Chirashi es comercio, Daichō es backoffice, Kanso es lectura y Sumi es el modo oscuro.",
        code: `<html lang="ja" data-theme="daicho" data-density="compact">`,
      },
      agents: {
        title: "6 · Deja que un agente te ayude",
        body: "La documentación para agentes no es el catálogo humano: es un índice `llms.txt`, una página Markdown por pieza y dos skills. La skill `koten-ui` instala y compone; la skill `koten-design-system` extiende el sistema.",
        code: `npx skills add codehive-colombia/koten --skill koten-ui`,
      },
    },
    develop: {
      title: "Desarrollar Koten UI",
      meta: "Bun 1.4.3 · monorepo · catálogo y demos",
      intro:
        "Este camino es para trabajar dentro del repositorio: el catálogo, las primitivas, los bloques, las demos, las auditorías y el registry. Usa Bun; no instales ni copies piezas a mano.",
      requirements: {
        title: "Antes de empezar",
        items: [
          "Bun 1.4.3 (workspaces, scripts y tests).",
          "Git y un navegador moderno: Chrome, Edge, Firefox o Safari recientes.",
          "Chromium en PATH solo para las auditorías opcionales (`qa:a11y`, `qa:overflow`, `qa:perf`, `qa:visual`).",
          "No hace falta Node, ni una fuente CJK, ni un servicio externo: todo corre local.",
        ],
      },
      setup: {
        title: "1 · Clona e instala",
        body: "El repositorio es un monorepo de Bun con tres apps y un paquete compartido. `bun install` resuelve todo desde el lockfile.",
        code: `git clone https://github.com/codehive-colombia/koten.git
cd koten
bun install`,
      },
      run: {
        title: "2 · Ejecuta las apps",
        body: "Un solo comando levanta el catálogo y las dos demos. El catálogo es la fuente de verdad visual; las demos validan el sistema en contexto.",
        code: `bun run dev
# catálogo    http://localhost:5173
# storefront  http://localhost:5174
# ERP         http://localhost:5175`,
      },
      verify: {
        title: "3 · Verifica antes de enviar",
        body: "`check` es la puerta de entrada: Biome, TypeScript, la guardia de i18n, `ai:check` y los tests. `build` y `budget` comprueban que las tres apps siguen dentro de los presupuestos.",
        code: `bun run check   # Biome + TypeScript + i18n + ai:check + tests
bun run build   # build de las tres apps
bun run budget  # presupuesto de JS/CSS y fuentes`,
      },
      work: {
        title: "4 · Trabaja en el sistema",
        body: "Antes de tocar una primitiva o un bloque, lee el protocolo y la gramática. Un cambio de API también cambia el catálogo, el registry y la capa de agentes.",
        items: [
          "`AGENTS.md`: protocolo de sesión, estados, IDs y definition of done.",
          "`docs/DESIGN-SYSTEM.md`: gramática visual, tokens y reglas de accesibilidad.",
          "`docs/RECIPES.md`: formulario, tabla, drawer y tarjeta listos para copiar.",
          "`skills/koten-design-system`: cómo agregar una pieza sin romper el sistema.",
        ],
      },
      audits: {
        title: "5 · Auditorías opcionales",
        body: "Requieren Chromium en PATH y, en algunos casos, el servidor de desarrollo levantado. No son necesarias para cada cambio, pero sí antes de cerrar una pieza nueva.",
        code: `bun run qa:a11y
bun run qa:overflow
bun run qa:perf
bun run qa:visual`,
      },
      tooling: {
        title: "6 · Registry y documentación de agentes",
        body: "`predev` y `prebuild` ya generan el registry y la capa de agentes. Estos comandos son para regenerarlos a mano o comprobar que están en sincronía.",
        code: `bun run registry
bun run ai:docs
bun run ai:check`,
      },
      map: {
        title: "Mapa rápido del repositorio",
        items: [
          "`apps/catalog`: catálogo, documentación viva y laboratorio.",
          "`apps/storefront`: POC HIKARI, la página de producto.",
          "`apps/erp`: POC KURA, el backoffice tabular.",
          "`packages/ui`: primitivas, bloques, tokens y utilidades.",
          "`skills/`: skills `koten-ui` y `koten-design-system`.",
          "`scripts/`: registry, documentación para agentes y QA.",
          "`docs/`: requisitos, diseño, decisiones y bitácora.",
        ],
      },
    },
    next: {
      title: "Siguientes pasos",
      meta: "Del primer componente a la pantalla",
      body: "Si estás usando el sistema, empieza por una primitiva y sigue con un bloque. Si estás desarrollándolo, abre el catálogo en `/components` y compara la pieza con su página de documentación.",
      links: "Ver componentes|Ver bloques|IA y agentes",
    },
  },
  ja: {
    eyebrow: "基礎 · 使い方",
    title: "はじめかた",
    description:
      "道は2つあります。プロダクトで Koten UI を使うか、システムを開発するかです。それぞれ要件とコマンドが異なります。",
    meta: "2つの道 · 使う / 開発する · ES/JA/EN",
    choose: {
      title: "道を選ぶ",
      meta: "2つのガイド · 1つのシステム",
      body: "各ガイドは出発点が異なり、不要なコマンドを混ぜません。",
      use: {
        kicker: "システムを使う",
        title: "Koten UI を使いたい",
        description:
          "React と Tailwind 4 のプロジェクトがあり、テーマ・コンポーネント・ブロックを導入したい。",
        action: "利用ガイドへ",
      },
      develop: {
        kicker: "システムを開発する",
        title: "Koten UI を開発したい",
        description: "カタログを動かし、プリミティブを触り、監査を通し、リポジトリに貢献したい。",
        action: "開発ガイドへ",
      },
    },
    use: {
      title: "自分のプロジェクトで使う",
      meta: "React 19 · Tailwind 4 · shadcn · Bun 不要",
      intro:
        "Koten UI は npm パッケージではありません。プロジェクトにコピーするファイル群です。このリポジトリを clone する必要も、Bun を入れる必要もありません。shadcn レジストリが導入し、`components.json` のエイリアスを尊重します。",
      runnerNote:
        "shadcn のコマンドは選んだランナーでコピーされます。設定はこのブラウザに保存され、ページを移動しても維持されます。",
      requirements: {
        title: "はじめる前に",
        items: [
          "プロジェクトに React 19 と Tailwind CSS 4 がある。",
          "shadcn の `components.json` がある。なければ `{init}` を実行。",
          "`npx` 用に Node 20 以上（shadcn CLI が使います）。",
          "任意：エージェント用の skill `koten-ui` を入れると、導入と利用が規約に沿います。",
        ],
      },
      theme: {
        title: "1 · テーマを一度だけ導入する",
        body: "`koten-theme` はトークン・テーマ・密度を、`components.json` で指定した `tailwind.css` に書き込みます。`styles/` フォルダーは作りません。既存の shadcn トークンがある場合は、置き換えるために最初に導入します。",
      },
      component: {
        title: "2 · 必要なコンポーネントを導入する",
        body: "各コンポーネントのページにコマンドがあります。項目にはファイルとコアの `lib/koten` が含まれ、CLI がインポートをプロジェクトのエイリアスに書き換えます。使うものだけ導入してください。",
      },
      blockComment: "ブロックをまとめて導入することもできます",
      provider: {
        title: "3 · provider を接続する",
        body: "アプリを一度だけ包み、既存の Tailwind CSS を読み込みます。テーマはそこに書き込まれます。例は `@/` を使い、CLI が `components.json` の接頭辞に書き換えます。",
        code: `import "./app.css"; // components.json の Tailwind CSS
import { KotenProvider } from "@/lib/koten/provider";

createRoot(document.getElementById("root")!).render(
  <KotenProvider locale="ja">
    <App />
  </KotenProvider>,
);`,
      },
      usage: {
        title: "4 · 部品を使う",
        body: "コンポーネントは UI 文言を持ちません。ラベルは props か provider から来ます。公開されている props に従い、色はテーマ、サイズは密度が決めます。",
        code: `<Button variant="primary">保存</Button>

<Field label="顧客" required description="会社名または氏名">
  <Input name="customer" autoComplete="organization" />
</Field>`,
      },
      appearance: {
        title: "5 · テーマ・密度・言語",
        body: "色を変えるためにコンポーネントを編集しないでください。テーマと密度はルート要素、言語は provider に置きます。Chirashi は商業、Daichō はバックオフィス、Kanso は読書、Sumi はダークです。",
        code: `<html lang="ja" data-theme="daicho" data-density="compact">`,
      },
      agents: {
        title: "6 · エージェントに任せる",
        body: "エージェント向け文書は人間向けカタログとは別です。`llms.txt` の索引、部品ごとの Markdown、2つの skills があります。`koten-ui` は導入と合成、`koten-design-system` は拡張を担当します。",
        code: `npx skills add codehive-colombia/koten --skill koten-ui`,
      },
    },
    develop: {
      title: "Koten UI を開発する",
      meta: "Bun 1.4.3 · モノレポ · カタログとデモ",
      intro:
        "この道はリポジトリの中で作業する人向けです。カタログ、プリミティブ、ブロック、デモ、監査、レジストリを扱います。Bun を使い、部品を手でコピーしません。",
      requirements: {
        title: "はじめる前に",
        items: [
          "Bun 1.4.3（ワークスペース・スクリプト・テスト）。",
          "Git とモダンブラウザ（最新の Chrome、Edge、Firefox、Safari）。",
          "任意の監査（`qa:a11y`、`qa:overflow`、`qa:perf`、`qa:visual`）には PATH 上の Chromium。",
          "Node も CJK フォントも外部サービスも不要です。すべてローカルで動きます。",
        ],
      },
      setup: {
        title: "1 · clone してインストール",
        body: "Bun のモノレポで、3つのアプリと共有パッケージがあります。`bun install` が lockfile からすべて解決します。",
        code: `git clone https://github.com/codehive-colombia/koten.git
cd koten
bun install`,
      },
      run: {
        title: "2 · アプリを起動する",
        body: "1つのコマンドでカタログと2つのデモが起動します。カタログが視覚的な正本で、デモが文脈での検証です。",
        code: `bun run dev
# カタログ    http://localhost:5173
# ストア      http://localhost:5174
# ERP         http://localhost:5175`,
      },
      verify: {
        title: "3 · 送る前に検証する",
        body: "`check` が入口です。Biome、TypeScript、i18n ガード、`ai:check`、テストを実行します。`build` と `budget` は3つのアプリが予算内かを確認します。",
        code: `bun run check   # Biome + TypeScript + i18n + ai:check + テスト
bun run build   # 3つのアプリをビルド
bun run budget  # JS/CSS とフォントの予算`,
      },
      work: {
        title: "4 · システムの中で作業する",
        body: "プリミティブやブロックを触る前に、プロトコルと文法を読みます。API を変えたら、カタログ・レジストリ・エージェント層も変わります。",
        items: [
          "`AGENTS.md`：セッション、状態、ID、完了条件。",
          "`docs/DESIGN-SYSTEM.md`：視覚文法、トークン、アクセシビリティ。",
          "`docs/RECIPES.md`：フォーム、テーブル、ドロワー、カードのレシピ。",
          "`skills/koten-design-system`：システムを壊さずに部品を追加する方法。",
        ],
      },
      audits: {
        title: "5 · 任意の監査",
        body: "PATH 上の Chromium と、場合によっては開発サーバーが必要です。毎回ではありませんが、新しい部品を閉じる前には実行します。",
        code: `bun run qa:a11y
bun run qa:overflow
bun run qa:perf
bun run qa:visual`,
      },
      tooling: {
        title: "6 · レジストリとエージェント文書",
        body: "`predev` と `prebuild` がレジストリとエージェント層を生成します。以下は手動で再生成し、同期を確認するコマンドです。",
        code: `bun run registry
bun run ai:docs
bun run ai:check`,
      },
      map: {
        title: "リポジトリの地図",
        items: [
          "`apps/catalog`：カタログ、生きた文書、実験場。",
          "`apps/storefront`：HIKARI の商品ページ。",
          "`apps/erp`：KURA のバックオフィス。",
          "`packages/ui`：プリミティブ、ブロック、トークン、ユーティリティ。",
          "`skills/`：`koten-ui` と `koten-design-system`。",
          "`scripts/`：レジストリ、エージェント文書、QA。",
          "`docs/`：要件、設計、決定、ログ。",
        ],
      },
    },
    next: {
      title: "次のステップ",
      meta: "最初の部品から画面へ",
      body: "使う場合はプリミティブから始め、次にブロックへ。開発する場合は `/components` を開き、部品とドキュメントを見比べてください。",
      links: "部品を見る|ブロックを見る|AIとエージェント",
    },
  },
  en: {
    eyebrow: "Foundations · 使い方",
    title: "Getting started",
    description:
      "There are two paths: use Koten UI in your product or develop the system. Each one has its own requirements and commands.",
    meta: "Two paths · use the system or build it · ES/JA/EN",
    choose: {
      title: "Choose your path",
      meta: "Two guides · one system",
      body: "Each guide assumes a different starting point and does not mix commands you will not need.",
      use: {
        kicker: "Use the system",
        title: "I want to use Koten UI",
        description:
          "I have a React project with Tailwind 4 and want to install the theme, a component or a block.",
        action: "Go to the usage guide",
      },
      develop: {
        kicker: "Build the system",
        title: "I want to develop Koten UI",
        description:
          "I want to run the catalog, work on primitives, pass the audits or contribute to the repository.",
        action: "Go to the development guide",
      },
    },
    use: {
      title: "Use Koten UI in your project",
      meta: "React 19 · Tailwind 4 · shadcn · no Bun",
      intro:
        "Koten UI is not an npm package: it is a set of files copied into your project. You do not need to clone this repository or install Bun. The shadcn registry performs the install and respects your components.json aliases.",
      runnerNote:
        "shadcn commands are copied with your runner. The preference is saved in this browser and survives page changes.",
      requirements: {
        title: "Before you start",
        items: [
          "React 19 and Tailwind CSS 4 in the project.",
          "A shadcn `components.json`. If it does not exist, run `{init}`.",
          "Node 20 or newer for `npx`; the shadcn CLI uses it.",
          "Optional: an agent skill so installation and usage follow the system rules (`koten-ui`).",
        ],
      },
      theme: {
        title: "1 · Install the theme once",
        body: "`koten-theme` writes tokens, themes and density into the `tailwind.css` file declared in your `components.json`. It does not create a `styles/` folder. If the project already had shadcn tokens, install it first so they are replaced.",
      },
      component: {
        title: "2 · Install the component you need",
        body: "Every component page shows its command. The item brings the file and the `lib/koten` core; the CLI rewrites imports to your project aliases. Install only what you will use.",
      },
      blockComment: "you can also install a whole block",
      provider: {
        title: "3 · Wire the provider",
        body: "Wrap the app once and import the Tailwind CSS your project already uses; the theme is written there. The examples use `@/`; the CLI rewrites it to your `components.json` prefix.",
        code: `import "./app.css"; // the Tailwind CSS from components.json
import { KotenProvider } from "@/lib/koten/provider";

createRoot(document.getElementById("root")!).render(
  <KotenProvider locale="en">
    <App />
  </KotenProvider>,
);`,
      },
      usage: {
        title: "4 · Use the piece",
        body: "Components hold no interface strings: labels come from props or the provider. Respect the documented props; the theme decides color and density decides size.",
        code: `<Button variant="primary">Save</Button>

<Field label="Customer" required description="Company or legal name.">
  <Input name="customer" autoComplete="organization" />
</Field>`,
      },
      appearance: {
        title: "5 · Theme, density and language",
        body: "Do not edit components to change the tone. Theme and density live on the root element; language goes in the provider. Chirashi is commerce, Daichō is back office, Kanso is reading and Sumi is dark mode.",
        code: `<html lang="en" data-theme="daicho" data-density="compact">`,
      },
      agents: {
        title: "6 · Let an agent help",
        body: "The agent documentation is not the human catalog: it is an `llms.txt` index, one Markdown page per piece and two skills. The `koten-ui` skill installs and composes; the `koten-design-system` skill extends the system.",
        code: `npx skills add codehive-colombia/koten --skill koten-ui`,
      },
    },
    develop: {
      title: "Develop Koten UI",
      meta: "Bun 1.4.3 · monorepo · catalog and demos",
      intro:
        "This path is for working inside the repository: the catalog, the primitives, the blocks, the demos, the audits and the registry. Use Bun; do not install or copy pieces by hand.",
      requirements: {
        title: "Before you start",
        items: [
          "Bun 1.4.3 (workspaces, scripts and tests).",
          "Git and a modern browser: recent Chrome, Edge, Firefox or Safari.",
          "Chromium on PATH only for the optional audits (`qa:a11y`, `qa:overflow`, `qa:perf`, `qa:visual`).",
          "No Node, no CJK font and no external service: everything runs locally.",
        ],
      },
      setup: {
        title: "1 · Clone and install",
        body: "The repository is a Bun monorepo with three apps and one shared package. `bun install` resolves everything from the lockfile.",
        code: `git clone https://github.com/codehive-colombia/koten.git
cd koten
bun install`,
      },
      run: {
        title: "2 · Run the apps",
        body: "One command starts the catalog and both demos. The catalog is the visual source of truth; the demos validate the system in context.",
        code: `bun run dev
# catalog    http://localhost:5173
# storefront http://localhost:5174
# ERP        http://localhost:5175`,
      },
      verify: {
        title: "3 · Verify before sending",
        body: "`check` is the front door: Biome, TypeScript, the i18n guard, `ai:check` and the tests. `build` and `budget` confirm the three apps stay inside their budgets.",
        code: `bun run check   # Biome + TypeScript + i18n + ai:check + tests
bun run build   # build the three apps
bun run budget  # JS/CSS and font budget`,
      },
      work: {
        title: "4 · Work on the system",
        body: "Before touching a primitive or a block, read the protocol and the grammar. An API change also changes the catalog, the registry and the agent layer.",
        items: [
          "`AGENTS.md`: session protocol, states, IDs and definition of done.",
          "`docs/DESIGN-SYSTEM.md`: visual grammar, tokens and accessibility rules.",
          "`docs/RECIPES.md`: form, table, drawer and card recipes ready to copy.",
          "`skills/koten-design-system`: how to add a piece without breaking the system.",
        ],
      },
      audits: {
        title: "5 · Optional audits",
        body: "They require Chromium on PATH and, in some cases, the dev server running. They are not needed for every change, but they are before closing a new piece.",
        code: `bun run qa:a11y
bun run qa:overflow
bun run qa:perf
bun run qa:visual`,
      },
      tooling: {
        title: "6 · Registry and agent documentation",
        body: "`predev` and `prebuild` already generate the registry and the agent layer. These commands regenerate them by hand or check that they are in sync.",
        code: `bun run registry
bun run ai:docs
bun run ai:check`,
      },
      map: {
        title: "Repository map",
        items: [
          "`apps/catalog`: catalog, living documentation and lab.",
          "`apps/storefront`: HIKARI, the product page.",
          "`apps/erp`: KURA, the tabular back office.",
          "`packages/ui`: primitives, blocks, tokens and utilities.",
          "`skills/`: `koten-ui` and `koten-design-system`.",
          "`scripts/`: registry, agent docs and QA.",
          "`docs/`: requirements, design, decisions and log.",
        ],
      },
    },
    next: {
      title: "Next steps",
      meta: "From the first component to the screen",
      body: "If you are using the system, start with a primitive and then a block. If you are developing it, open `/components` and compare the piece with its documentation page.",
      links: "Browse components|Browse blocks|AI and agents",
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

function PathItem({
  href,
  kicker,
  title,
  description,
  action,
}: {
  href: string;
  kicker: string;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group grid gap-1 py-3 text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1 sm:grid-cols-[10rem_minmax(0,1fr)_11rem] sm:items-baseline sm:gap-4"
      >
        <span className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
          {kicker}
        </span>
        <span className="min-w-0">
          <span className="block font-serif text-lg font-semibold leading-tight">{title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-muted">{description}</span>
        </span>
        <span className="text-xs font-semibold text-link sm:text-end">{action} →</span>
      </a>
    </li>
  );
}

function Inline({ text }: { text: string }) {
  const seen = new Map<string, number>();

  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part) => {
        const occurrence = (seen.get(part) ?? 0) + 1;
        seen.set(part, occurrence);

        return part.startsWith("`") && part.endsWith("`") ? (
          <code key={`${part}:${occurrence}`} className="border border-rule bg-tint px-1 font-mono">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={`${part}:${occurrence}`}>{part}</span>
        );
      })}
    </>
  );
}

function RichList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2"
    >
      {items.map((item) => (
        <li key={item} className="border-s-2 border-primary ps-2">
          <Inline text={item} />
        </li>
      ))}
    </ul>
  );
}

function Step({ children }: { children: ReactNode }) {
  return <h3 className="mt-[calc(var(--koten-gap)*1.5)] text-xs font-semibold">{children}</h3>;
}

function Body({ children }: { children: string }) {
  return (
    <p className="text-xs leading-relaxed text-muted">
      <Inline text={children} />
    </p>
  );
}

export function StartPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const { packageManager, setPackageManager } = usePackageManager();
  const [componentsLabel, blocksLabel, agentsLabel] = t.next.links.split("|");
  const runnerLabel = shellLabels[locale].runner;
  const initCommand = `${packageRunner(packageManager)} shadcn@latest init`;
  const requirements = t.use.requirements.items.map((item) => item.replace("{init}", initCommand));

  return (
    <article>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="手引き"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="caminos" title={t.choose.title} jp="選択" meta={t.choose.meta}>
          <Body>{t.choose.body}</Body>
          <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule">
            <PathItem
              href="#usar"
              kicker={t.choose.use.kicker}
              title={t.choose.use.title}
              description={t.choose.use.description}
              action={t.choose.use.action}
            />
            <PathItem
              href="#desarrollar"
              kicker={t.choose.develop.kicker}
              title={t.choose.develop.title}
              description={t.choose.develop.description}
              action={t.choose.develop.action}
            />
          </ul>
        </Section>

        <Section id="usar" title={t.use.title} jp="利用" meta={t.use.meta}>
          <Body>{t.use.intro}</Body>
          <div className="mt-[var(--koten-gap)] flex flex-wrap items-center gap-3 border border-rule bg-surface p-[var(--koten-panel-p)]">
            <PackageManagerTabs
              value={packageManager}
              label={runnerLabel}
              onChange={setPackageManager}
            />
            <p className="min-w-0 flex-1 text-2xs leading-relaxed text-muted">{t.use.runnerNote}</p>
          </div>

          <Step>{t.use.requirements.title}</Step>
          <RichList items={requirements} label={t.use.requirements.title} />

          <Step>{t.use.theme.title}</Step>
          <Body>{t.use.theme.body}</Body>
          <Code>{registryCommand("koten-theme", packageManager)}</Code>

          <Step>{t.use.component.title}</Step>
          <Body>{t.use.component.body}</Body>
          <Code>{`${registryCommand("button", packageManager)}\n\n# ${t.use.blockComment}\n${registryCommand("product-card", packageManager)}`}</Code>

          <Step>{t.use.provider.title}</Step>
          <Body>{t.use.provider.body}</Body>
          <Code>{t.use.provider.code}</Code>

          <Step>{t.use.usage.title}</Step>
          <Body>{t.use.usage.body}</Body>
          <Code>{t.use.usage.code}</Code>

          <Step>{t.use.appearance.title}</Step>
          <Body>{t.use.appearance.body}</Body>
          <Code>{t.use.appearance.code}</Code>

          <Step>{t.use.agents.title}</Step>
          <Body>{t.use.agents.body}</Body>
          <Code>{t.use.agents.code}</Code>
        </Section>

        <Section id="desarrollar" title={t.develop.title} jp="開発" meta={t.develop.meta}>
          <Body>{t.develop.intro}</Body>

          <Step>{t.develop.requirements.title}</Step>
          <RichList items={t.develop.requirements.items} label={t.develop.requirements.title} />

          <Step>{t.develop.setup.title}</Step>
          <Body>{t.develop.setup.body}</Body>
          <Code>{t.develop.setup.code}</Code>

          <Step>{t.develop.run.title}</Step>
          <Body>{t.develop.run.body}</Body>
          <Code>{t.develop.run.code}</Code>

          <Step>{t.develop.verify.title}</Step>
          <Body>{t.develop.verify.body}</Body>
          <Code>{t.develop.verify.code}</Code>

          <Step>{t.develop.work.title}</Step>
          <Body>{t.develop.work.body}</Body>
          <RichList items={t.develop.work.items} label={t.develop.work.title} />

          <Step>{t.develop.audits.title}</Step>
          <Body>{t.develop.audits.body}</Body>
          <Code>{t.develop.audits.code}</Code>

          <Step>{t.develop.tooling.title}</Step>
          <Body>{t.develop.tooling.body}</Body>
          <Code>{t.develop.tooling.code}</Code>

          <Step>{t.develop.map.title}</Step>
          <RichList items={t.develop.map.items} label={t.develop.map.title} />
        </Section>

        <Section id="siguientes" title={t.next.title} jp="応用" meta={t.next.meta}>
          <Body>{t.next.body}</Body>
          <p className="mt-[var(--koten-gap)] flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
            <Link to="/components" className="text-link underline underline-offset-2">
              {componentsLabel}
            </Link>
            <Link to="/blocks" className="text-link underline underline-offset-2">
              {blocksLabel}
            </Link>
            <Link to="/ai" className="text-link underline underline-offset-2">
              {agentsLabel}
            </Link>
          </p>
        </Section>
      </div>
    </article>
  );
}
