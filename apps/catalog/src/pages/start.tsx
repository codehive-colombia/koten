import { type KotenLocale, useKoten } from "@koten/ui";
import { Link } from "react-router";
import { Code, List, PageHeader } from "../components/docs";
import { Section } from "../components/specimen";

const copy = {
  es: {
    eyebrow: "Fundamentos · 使い方",
    title: "Empezar",
    description:
      "Koten UI no es un paquete npm: es un conjunto de archivos que se copian al proyecto. Esta página resume el camino mínimo para levantar las demos, copiar una primitiva y verificar el resultado.",
    meta: "Bun 1.4.3 · React 19 · Tailwind 4 · Base UI 1.9",
    requirements: {
      title: "Requisitos",
      meta: "Lo que necesita la máquina",
      items: [
        "Bun 1.4.3 (workspaces, scripts y tests).",
        "Un navegador moderno: Chrome, Edge, Firefox o Safari recientes.",
        "Chromium en PATH solo para las auditorías opcionales (`qa:a11y`, `qa:overflow`, `qa:perf`, `qa:visual`).",
        "No hace falta Node, ni una fuente CJK, ni un servicio externo: todo corre local.",
      ],
    },
    repo: {
      title: "Dentro de este repositorio",
      meta: "Tres apps y un paquete compartido",
      code: `bun install
bun run dev     # catálogo 5173 · storefront 5174 · ERP 5175
bun run check   # Biome + TypeScript + guardia i18n + tests`,
    },
    project: {
      title: "En un proyecto propio",
      meta: "Copiar, no instalar desde npm",
      intro:
        "Instala las dependencias de las primitivas y copia los estilos. Koten UI no se publica como paquete en la v1; se copia la fuente para poder adaptarla.",
      code: `bun add @base-ui/react class-variance-authority clsx tailwind-merge lucide-react @tanstack/react-table
bun add -d tailwindcss @tailwindcss/vite

# estilos y primitivas
cp packages/ui/src/styles/tokens.css  src/styles/
cp packages/ui/src/styles/globals.css src/styles/
cp -r packages/ui/src/components/ui src/components/
cp -r packages/ui/src/lib src/lib/`,
      wiring:
        "Ajusta las rutas de `@source` en `globals.css` a tu proyecto, importa el CSS una sola vez y envuelve la app con el provider.",
      code2: `/* src/main.tsx */
import "./styles/globals.css";
import { KotenProvider } from "./components/ui";

createRoot(root).render(
  <KotenProvider locale="es">
    <App />
  </KotenProvider>,
);`,
    },
    copyComponent: {
      title: "Copiar una primitiva",
      meta: "La receta de AGENTS.md §9",
      items: [
        "Verifica el componente en el inventario (C-001…C-062) y su página del catálogo.",
        "Copia el archivo y conserva el named export y el `data-slot`.",
        "Mantén las variantes con CVA y los roles semánticos (`primary`, `danger`, `sale`…).",
        "Si necesita composición, usa `render` + `useRender` + `mergeProps`; nunca `asChild`.",
        "Agrega tests de estados, teclado y ARIA, y documenta el componente en el catálogo.",
      ],
      code: `<Button variant="primary" size="sm" onClick={save}>
  Guardar
</Button>`,
    },
    rules: {
      title: "Reglas que no se negocian",
      meta: "Lo que mantiene la gramática",
      items: [
        "Colores, tamaños y radios salen de tokens; nada hardcodeado.",
        "Densidad y tema se leen de `data-theme` y `data-density`.",
        "Texto real y tipografía del sistema; nunca texto en imágenes ni fuentes CJK completas.",
        "12 px es el piso tipográfico; foco visible y contraste AA.",
        "Propiedades lógicas (`start`/`end`, `ps`/`pe`, `border-s`) para que el layout se espeje.",
        "Formatos con `formatDate`, `formatCurrency` y `formatNumber`; labels por prop o `KotenProvider`.",
      ],
    },
    verify: {
      title: "Verificar antes de entregar",
      meta: "Barato ahora, caro después",
      code: `bun run check       # lint, tipos, i18n y tests
bun run build       # tres apps
bun run budget      # JS inicial/total, CSS y fuentes
bun run qa:a11y     # axe, 12 px y foco (requiere dev)
bun run qa:overflow # desbordamiento y RTL (requiere dev)
bun run qa:perf     # LCP/CLS sobre el build
bun run qa:visual   # capturas 1440/1280/1024`,
    },
    recipes: {
      title: "Recetas y siguientes pasos",
      meta: "Del archivo copiado a la pantalla",
      body: "Las recetas copiables (formulario, tabla densa, drawer, tarjeta de producto) viven en `docs/RECIPES.md`. Cada primitiva tiene su página con preview, props, código y notas de accesibilidad; los patrones muestran cómo se combinan.",
      links: "Ver componentes|Ver patrones",
    },
  },
  ja: {
    eyebrow: "基礎 · 使い方",
    title: "はじめかた",
    description:
      "Koten UI は npm パッケージではありません。プロジェクトにコピーして使うファイル群です。このページでは、デモの起動、プリミティブのコピー、検証までの最短手順をまとめます。",
    meta: "Bun 1.4.3 · React 19 · Tailwind 4 · Base UI 1.9",
    requirements: {
      title: "必要なもの",
      meta: "環境の前提",
      items: [
        "Bun 1.4.3（ワークスペース・スクリプト・テスト）。",
        "モダンブラウザ（最新の Chrome、Edge、Firefox、Safari）。",
        "任意の監査（`qa:a11y`、`qa:overflow`、`qa:perf`、`qa:visual`）には PATH 上の Chromium。",
        "Node も CJK フォントも外部サービスも不要です。すべてローカルで動きます。",
      ],
    },
    repo: {
      title: "このリポジトリで",
      meta: "3 つのアプリと共有パッケージ",
      code: `bun install
bun run dev     # カタログ 5173 · ストア 5174 · ERP 5175
bun run check   # Biome + TypeScript + i18n ガード + テスト`,
    },
    project: {
      title: "自分のプロジェクトで",
      meta: "npm ではなくコピー",
      intro:
        "プリミティブの依存関係を入れ、スタイルをコピーします。v1 ではパッケージ公開をしません。適応できるようソースをコピーします。",
      code: `bun add @base-ui/react class-variance-authority clsx tailwind-merge lucide-react @tanstack/react-table
bun add -d tailwindcss @tailwindcss/vite

# スタイルとプリミティブ
cp packages/ui/src/styles/tokens.css  src/styles/
cp packages/ui/src/styles/globals.css src/styles/
cp -r packages/ui/src/components/ui src/components/
cp -r packages/ui/src/lib src/lib/`,
      wiring:
        "`globals.css` の `@source` を自分のプロジェクトに合わせ、CSS を一度だけ読み込み、アプリを provider で包みます。",
      code2: `/* src/main.tsx */
import "./styles/globals.css";
import { KotenProvider } from "./components/ui";

createRoot(root).render(
  <KotenProvider locale="ja">
    <App />
  </KotenProvider>,
);`,
    },
    copyComponent: {
      title: "プリミティブをコピーする",
      meta: "AGENTS.md §9 の手順",
      items: [
        "インベントリ（C-001…C-062）とカタログのページで対象を確認する。",
        "ファイルをコピーし、named export と `data-slot` を保つ。",
        "バリアントは CVA、色は意味的役割（`primary`、`danger`、`sale` など）を使う。",
        "合成が必要なら `render` + `useRender` + `mergeProps`。`asChild` は使いません。",
        "状態・キーボード・ARIA のテストを追加し、カタログにページを作る。",
      ],
      code: `<Button variant="primary" size="sm" onClick={save}>
  保存
</Button>`,
    },
    rules: {
      title: "変えないルール",
      meta: "文法を保つために",
      items: [
        "色・サイズ・角丸はトークンから。ハードコード禁止。",
        "テーマと密度は `data-theme` と `data-density` から読む。",
        "実テキストとシステムフォント。画像内テキストと完全な CJK フォントは禁止。",
        "最小文字サイズは 12px。フォーカス可視・AA コントラスト。",
        "論理プロパティ（`start`/`end`、`ps`/`pe`、`border-s`）で RTL に備える。",
        "書式は `formatDate`・`formatCurrency`・`formatNumber`。ラベルは props か `KotenProvider`。",
      ],
    },
    verify: {
      title: "納品前の検証",
      meta: "今は安く、後で高くつく",
      code: `bun run check       # lint・型・i18n・テスト
bun run build       # 3 アプリ
bun run budget      # 初期/合計 JS・CSS・フォント
bun run qa:a11y     # axe・12px・フォーカス（dev 必須）
bun run qa:overflow # はみ出しと RTL（dev 必須）
bun run qa:perf     # ビルドの LCP/CLS
bun run qa:visual   # 1440/1280/1024 のキャプチャ`,
    },
    recipes: {
      title: "レシピと次の一歩",
      meta: "コピーから画面へ",
      body: "コピー可能なレシピ（フォーム、密なテーブル、ドロワー、商品カード）は `docs/RECIPES.md` にあります。各プリミティブにはプレビュー・props・コード・アクセシビリティ注記のページがあり、パターンでは組み合わせ方を示します。",
      links: "部品を見る|パターンを見る",
    },
  },
  en: {
    eyebrow: "Foundations · 使い方",
    title: "Getting started",
    description:
      "Koten UI is not an npm package: it is a set of files you copy into your project. This page covers the shortest path to run the demos, copy a primitive and verify the result.",
    meta: "Bun 1.4.3 · React 19 · Tailwind 4 · Base UI 1.9",
    requirements: {
      title: "Requirements",
      meta: "What the machine needs",
      items: [
        "Bun 1.4.3 (workspaces, scripts and tests).",
        "A modern browser: recent Chrome, Edge, Firefox or Safari.",
        "Chromium on PATH only for the optional audits (`qa:a11y`, `qa:overflow`, `qa:perf`, `qa:visual`).",
        "No Node, no CJK font and no external service: everything runs locally.",
      ],
    },
    repo: {
      title: "Inside this repository",
      meta: "Three apps and one shared package",
      code: `bun install
bun run dev     # catalog 5173 · storefront 5174 · ERP 5175
bun run check   # Biome + TypeScript + i18n guard + tests`,
    },
    project: {
      title: "In your own project",
      meta: "Copy, do not install from npm",
      intro:
        "Install the primitive dependencies and copy the styles. Koten UI is not published as a package in v1; you copy the source so you can adapt it.",
      code: `bun add @base-ui/react class-variance-authority clsx tailwind-merge lucide-react @tanstack/react-table
bun add -d tailwindcss @tailwindcss/vite

# styles and primitives
cp packages/ui/src/styles/tokens.css  src/styles/
cp packages/ui/src/styles/globals.css src/styles/
cp -r packages/ui/src/components/ui src/components/
cp -r packages/ui/src/lib src/lib/`,
      wiring:
        "Point the `@source` paths in `globals.css` at your project, import the CSS once and wrap the app with the provider.",
      code2: `/* src/main.tsx */
import "./styles/globals.css";
import { KotenProvider } from "./components/ui";

createRoot(root).render(
  <KotenProvider locale="en">
    <App />
  </KotenProvider>,
);`,
    },
    copyComponent: {
      title: "Copying a primitive",
      meta: "The AGENTS.md §9 recipe",
      items: [
        "Check the component in the inventory (C-001…C-062) and its catalog page.",
        "Copy the file and keep the named export and the `data-slot`.",
        "Keep variants in CVA and use semantic roles (`primary`, `danger`, `sale`…).",
        "For composition use `render` + `useRender` + `mergeProps`; never `asChild`.",
        "Add tests for states, keyboard and ARIA, and document the component in the catalog.",
      ],
      code: `<Button variant="primary" size="sm" onClick={save}>
  Save
</Button>`,
    },
    rules: {
      title: "Non-negotiable rules",
      meta: "What keeps the grammar together",
      items: [
        "Colours, sizes and radii come from tokens; nothing hardcoded.",
        "Read theme and density from `data-theme` and `data-density`.",
        "Real text and system fonts; never text in images or full CJK fonts.",
        "12 px is the typographic floor; visible focus and AA contrast.",
        "Logical properties (`start`/`end`, `ps`/`pe`, `border-s`) so the layout mirrors.",
        "Format with `formatDate`, `formatCurrency` and `formatNumber`; labels by prop or `KotenProvider`.",
      ],
    },
    verify: {
      title: "Verify before shipping",
      meta: "Cheap now, expensive later",
      code: `bun run check       # lint, types, i18n and tests
bun run build       # three apps
bun run budget      # initial/total JS, CSS and fonts
bun run qa:a11y     # axe, 12 px and focus (needs dev)
bun run qa:overflow # overflow and RTL (needs dev)
bun run qa:perf     # LCP/CLS on the build
bun run qa:visual   # 1440/1280/1024 captures`,
    },
    recipes: {
      title: "Recipes and next steps",
      meta: "From copied file to screen",
      body: "Copy-paste recipes (form, dense table, drawer, product card) live in `docs/RECIPES.md`. Every primitive has a page with preview, props, code and accessibility notes; the patterns show how they combine.",
      links: "Browse components|Browse patterns",
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function StartPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [componentsLabel, patternsLabel] = t.recipes.links.split("|");

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
        <Section id="requisitos" title={t.requirements.title} jp="要件" meta={t.requirements.meta}>
          <List items={t.requirements.items} label={t.requirements.title} />
        </Section>

        <Section id="repo" title={t.repo.title} jp="本棚" meta={t.repo.meta}>
          <Code>{t.repo.code}</Code>
        </Section>

        <Section id="proyecto" title={t.project.title} jp="導入" meta={t.project.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.project.intro}</p>
          <Code>{t.project.code}</Code>
          <p className="mt-[var(--koten-gap)] text-xs leading-relaxed text-muted">
            {t.project.wiring}
          </p>
          <Code>{t.project.code2}</Code>
        </Section>

        <Section id="copiar" title={t.copyComponent.title} jp="複写" meta={t.copyComponent.meta}>
          <List items={t.copyComponent.items} label={t.copyComponent.title} />
          <Code>{t.copyComponent.code}</Code>
        </Section>

        <Section id="reglas" title={t.rules.title} jp="規約" meta={t.rules.meta}>
          <List items={t.rules.items} label={t.rules.title} />
        </Section>

        <Section id="verificar" title={t.verify.title} jp="検証" meta={t.verify.meta}>
          <Code>{t.verify.code}</Code>
        </Section>

        <Section id="recetas" title={t.recipes.title} jp="応用" meta={t.recipes.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.recipes.body}</p>
          <p className="mt-[var(--koten-gap)] flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
            <Link to="/components" className="text-link underline underline-offset-2">
              {componentsLabel}
            </Link>
            <Link to="/patterns" className="text-link underline underline-offset-2">
              {patternsLabel}
            </Link>
          </p>
        </Section>
      </div>
    </article>
  );
}
