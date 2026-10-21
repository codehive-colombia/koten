import { type KotenLocale, useKoten } from "@koten/ui";
import { Link } from "react-router";
import { Code, List, PageHeader } from "../components/docs";
import { Section } from "../components/specimen";
import { registryCommand } from "../lib/site";

const copy = {
  es: {
    eyebrow: "Fundamentos · 使い方",
    title: "Empezar",
    description:
      "Koten UI no es un paquete npm: es un conjunto de archivos que se copian al proyecto. Esta página resume el camino mínimo para levantar las demos, copiar una primitiva y usarla en una pantalla real.",
    meta: "Bun 1.4.3 · React 19 · Tailwind 4 · Base UI 1.9",
    requirements: {
      title: "Lo que necesitas",
      meta: "Requisitos del entorno",
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
    registry: {
      title: "Registry shadcn",
      meta: "Instalar por URL",
      body: "Cada item es autocontenido: trae el componente, `lib/koten` (cn, formato e i18n) y `styles/koten.css` con tokens y roles de Tailwind. `predev` y `prebuild` regeneran el registry; no se publica en npm.",
      code: `bun run registry   # genera apps/catalog/public/r/*
bun run dev        # sirve http://localhost:5173/r/button.json

# en tu proyecto
${registryCommand("button")}`,
    },
    copyComponent: {
      title: "Copiar una primitiva",
      meta: "De la página a tu código",
      items: [
        "Abre la página del componente que necesitas y lee su preview, props y código.",
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
    quality: {
      title: "Calidad incorporada",
      meta: "Accesibilidad y datos reales",
      items: [
        "Navegable con teclado, con foco visible y sin violaciones de axe.",
        "12 px de piso tipográfico y contraste AA en los cuatro temas.",
        "Los componentes no contienen strings: los labels llegan por prop o del `KotenProvider`.",
        "Fechas, moneda y números con `Intl`, nunca concatenados.",
        "Cada componente tiene tests de estados, teclado y ARIA.",
      ],
      code: "bun run check   # lint, tipos, i18n y tests",
    },
    next: {
      title: "Siguientes pasos",
      meta: "De la pieza a la pantalla",
      body: "Cada componente tiene su página con instalación, preview, código, props y notas de accesibilidad. Los bloques muestran cómo se combinan en la página HIKARI y en el backoffice KURA.",
      links: "Ver componentes|Ver bloques",
    },
  },
  ja: {
    eyebrow: "基礎 · 使い方",
    title: "はじめかた",
    description:
      "Koten UI は npm パッケージではありません。プロジェクトにコピーして使うファイル群です。このページでは、デモの起動、プリミティブのコピー、実画面での利用までの最短手順をまとめます。",
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
    registry: {
      title: "shadcn レジストリ",
      meta: "URL でインストール",
      body: "各アイテムは自己完結です。コンポーネント、`lib/koten`（cn・書式・i18n）、トークンと Tailwind ロールを含む `styles/koten.css` を同梱します。`predev`/`prebuild` が再生成し、npm には公開しません。",
      code: `bun run registry   # apps/catalog/public/r/* を生成
bun run dev        # http://localhost:5173/r/button.json を配信

# 自分のプロジェクトで
${registryCommand("button")}`,
    },
    copyComponent: {
      title: "プリミティブをコピーする",
      meta: "ページから自分のコードへ",
      items: [
        "必要なコンポーネントのページを開き、プレビュー・props・コードを読む。",
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
    quality: {
      title: "組み込みの品質",
      meta: "アクセシビリティと実データ",
      items: [
        "キーボードで操作でき、フォーカスが可視で、axe の違反がない。",
        "最小 12px、4 テーマすべてで AA コントラスト。",
        "コンポーネントに文字列を持たず、ラベルは props か `KotenProvider` から来る。",
        "日付・通貨・数値は `Intl`。文字列連結は使わない。",
        "各コンポーネントに状態・キーボード・ARIA のテストがある。",
      ],
      code: "bun run check   # lint・型・i18n・テスト",
    },
    next: {
      title: "次の一歩",
      meta: "部品から画面へ",
      body: "各コンポーネントにはインストール・プレビュー・コード・props・アクセシビリティ注記のページがあります。ブロックでは、HIKARI の商品ページと KURA のバックオフィスでの組み合わせ方を示します。",
      links: "部品を見る|ブロックを見る",
    },
  },
  en: {
    eyebrow: "Foundations · 使い方",
    title: "Getting started",
    description:
      "Koten UI is not an npm package: it is a set of files you copy into your project. This page covers the shortest path to run the demos, copy a primitive and use it in a real screen.",
    meta: "Bun 1.4.3 · React 19 · Tailwind 4 · Base UI 1.9",
    requirements: {
      title: "What you need",
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
    registry: {
      title: "shadcn registry",
      meta: "Install by URL",
      body: "Every item is self-contained: it ships the component, `lib/koten` (cn, formatting and i18n) and `styles/koten.css` with tokens and Tailwind roles. `predev` and `prebuild` regenerate the registry; it is not published to npm.",
      code: `bun run registry   # writes apps/catalog/public/r/*
bun run dev        # serves http://localhost:5173/r/button.json

# in your project
${registryCommand("button")}`,
    },
    copyComponent: {
      title: "Copying a primitive",
      meta: "From the page to your code",
      items: [
        "Open the page of the component you need and read its preview, props and code.",
        "Copy the file and keep the named export and the `data-slot`.",
        "Keep variants with CVA and semantic roles (`primary`, `danger`, `sale`…).",
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
    quality: {
      title: "Quality built in",
      meta: "Accessibility and real data",
      items: [
        "Keyboard operable, with visible focus and no axe violations.",
        "A 12 px typographic floor and AA contrast in all four themes.",
        "Components hold no strings: labels come from props or `KotenProvider`.",
        "Dates, currency and numbers use `Intl`, never concatenated strings.",
        "Every component has tests for states, keyboard and ARIA.",
      ],
      code: "bun run check   # lint, types, i18n and tests",
    },
    next: {
      title: "Next steps",
      meta: "From the piece to the screen",
      body: "Every component has a page with installation, preview, code, props and accessibility notes. The blocks show how they combine in the HIKARI product page and the KURA back office.",
      links: "Browse components|Browse blocks",
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function StartPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [componentsLabel, patternsLabel] = t.next.links.split("|");

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

        <Section id="registry" title={t.registry.title} jp="登録" meta={t.registry.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.registry.body}</p>
          <Code>{t.registry.code}</Code>
        </Section>

        <Section id="copiar" title={t.copyComponent.title} jp="複写" meta={t.copyComponent.meta}>
          <List items={t.copyComponent.items} label={t.copyComponent.title} />
          <Code>{t.copyComponent.code}</Code>
        </Section>

        <Section id="reglas" title={t.rules.title} jp="規約" meta={t.rules.meta}>
          <List items={t.rules.items} label={t.rules.title} />
        </Section>

        <Section id="calidad" title={t.quality.title} jp="品質" meta={t.quality.meta}>
          <List items={t.quality.items} label={t.quality.title} />
          <Code>{t.quality.code}</Code>
        </Section>

        <Section id="siguientes" title={t.next.title} jp="応用" meta={t.next.meta}>
          <p className="text-xs leading-relaxed text-muted">{t.next.body}</p>
          <p className="mt-[var(--koten-gap)] flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
            <Link to="/components" className="text-link underline underline-offset-2">
              {componentsLabel}
            </Link>
            <Link to="/blocks" className="text-link underline underline-offset-2">
              {patternsLabel}
            </Link>
          </p>
        </Section>
      </div>
    </article>
  );
}
