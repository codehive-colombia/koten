import {
  Badge,
  buttonVariants,
  cn,
  type KotenLocale,
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTitle,
  useKoten,
} from "@koten/ui";
import { Link } from "react-router";
import { IndexCard, PageHeader } from "../components/docs";

const copy = {
  es: {
    eyebrow: "Catálogo · 古典",
    title: "Koten UI",
    description:
      "Sencillez de medios, densidad de información. Un sistema de componentes para el web japonés clásico, validado en un catálogo, un storefront y un ERP.",
    meta: "45 primitivas · 20 patrones · 4 temas · 3 densidades · ES/JA/EN",
    principles: [
      "El marco es la unidad: panel, cabecera, regla, borde.",
      "El color señala; no decora.",
      "Tipografía del sistema y texto real, nunca texto en imágenes.",
      "Densidad con ritmo: 4/8/12/16, no todo es una tarjeta.",
      "Accesible por defecto: 12 px mínimo, AA, foco visible, teclado completo.",
    ],
    cards: {
      foundations: {
        title: "Fundamentos",
        jp: "基礎",
        description:
          "Color, tipografía, espaciado, forma, densidad y temas. El contrato visual del sistema.",
      },
      components: {
        title: "Componentes",
        jp: "部品",
        description: "45 primitivas con previews, props, código y notas de accesibilidad.",
      },
      patterns: {
        title: "Patrones",
        jp: "応用",
        description:
          "Storefront y ERP: las composiciones que ensamblan las primitivas en pantallas reales.",
      },
      format: {
        title: "Idioma y formato",
        jp: "言語",
        description: "ES/JA/EN, Intl, labels y la vista previa que responde al selector de idioma.",
      },
    },
    demos: "Demos",
    demosJp: "デモ",
    principlesTitle: "Principios",
    statusTitle: "De un vistazo",
    statusBadge: "4 temas",
    statusBody:
      "Primitivas, storefront HIKARI y ERP KURA comparten tokens, componentes y reglas. Elige un tema, una densidad y un idioma: el catálogo entero responde, incluidas tablas y ejemplos.",
    components: "Primitivas",
    componentsValue: "45 · 20 patrones",
    themes: "Temas",
    themesValue: "Chirashi · Daichō · Kanso · Sumi",
    densities: "Densidades",
    densitiesValue: "Compacta · Default · Amplia",
    languages: "Idiomas de UI",
    languagesValue: "ES · JA · EN",
    explore: "Explorar fundamentos",
    noteStrong: "Cómo leer este catálogo.",
    noteBody:
      "La documentación está completa en ES/JA/EN: el selector de idioma cambia el cuerpo, la interfaz y los ejemplos. El tema y la densidad afectan toda la página, incluidas las tablas y el espaciado.",
  },
  ja: {
    eyebrow: "カタログ · 古典",
    title: "Koten UI",
    description:
      "手段の簡素さ、情報の密度。古典的な日本のウェブのためのコンポーネントシステム。カタログ、店舗、ERPで検証する。",
    meta: "45プリミティブ · 20パターン · 4テーマ · 3密度 · ES/JA/EN",
    principles: [
      "枠が単位：パネル、見出し、罫線、境界。",
      "色は意味を示し、装飾しない。",
      "システムフォントと実テキスト。画像内テキストは使わない。",
      "リズムのある密度：4/8/12/16、すべてをカードにしない。",
      "既定でアクセシブル：最小12px、AA、可視フォーカス、完全なキーボード操作。",
    ],
    cards: {
      foundations: {
        title: "基礎",
        jp: "基礎",
        description: "色、タイポグラフィ、余白、形、密度、テーマ。システムの視覚的契約。",
      },
      components: {
        title: "部品",
        jp: "部品",
        description: "45のプリミティブ。プレビュー、props、コード、アクセシビリティ注記付き。",
      },
      patterns: {
        title: "応用",
        jp: "応用",
        description: "店舗とERP：プリミティブを実画面に組み上げる構成。",
      },
      format: {
        title: "言語と書式",
        jp: "言語",
        description: "ES/JA/EN、Intl、ラベル、言語セレクタに反応するプレビュー。",
      },
    },
    demos: "デモ",
    demosJp: "デモ",
    principlesTitle: "原則",
    statusTitle: "概要",
    statusBadge: "4テーマ",
    statusBody:
      "プリミティブ、店舗HIKARI、ERP KURAはトークン・コンポーネント・ルールを共有する。テーマ、密度、言語を選ぶと、表や例を含むカタログ全体が反応する。",
    components: "プリミティブ",
    componentsValue: "45 · 20パターン",
    themes: "テーマ",
    themesValue: "Chirashi · Daichō · Kanso · Sumi",
    densities: "密度",
    densitiesValue: "コンパクト · 標準 · ゆったり",
    languages: "UI言語",
    languagesValue: "ES · JA · EN",
    explore: "基礎を見る",
    noteStrong: "このカタログの読み方。",
    noteBody:
      "ドキュメントはES/JA/ENで完備され、言語セレクタで本文・UI・例が切り替わる。テーマと密度は表や余白を含むページ全体に影響する。",
  },
  en: {
    eyebrow: "Catalog · 古典",
    title: "Koten UI",
    description:
      "Simplicity of means, density of information. A component system for the classic Japanese web, validated in a catalog, a storefront and an ERP.",
    meta: "45 primitives · 20 patterns · 4 themes · 3 densities · ES/JA/EN",
    principles: [
      "The frame is the unit: panel, header, rule, border.",
      "Color signals; it does not decorate.",
      "System typography and real text, never text in images.",
      "Density with rhythm: 4/8/12/16, not everything is a card.",
      "Accessible by default: 12 px minimum, AA, visible focus, full keyboard.",
    ],
    cards: {
      foundations: {
        title: "Foundations",
        jp: "基礎",
        description: "Color, typography, spacing, shape, density and themes. The visual contract.",
      },
      components: {
        title: "Components",
        jp: "部品",
        description: "45 primitives with previews, props, code and accessibility notes.",
      },
      patterns: {
        title: "Patterns",
        jp: "応用",
        description:
          "Storefront and ERP: the compositions that assemble primitives into real screens.",
      },
      format: {
        title: "Language & format",
        jp: "言語",
        description: "ES/JA/EN, Intl, labels and the preview that follows the language selector.",
      },
    },
    demos: "Demos",
    demosJp: "デモ",
    principlesTitle: "Principles",
    statusTitle: "At a glance",
    statusBadge: "4 themes",
    statusBody:
      "Primitives, the HIKARI storefront and the KURA ERP share tokens, components and rules. Pick a theme, a density and a language: the whole catalog responds, tables and examples included.",
    components: "Primitives",
    componentsValue: "45 · 20 patterns",
    themes: "Themes",
    themesValue: "Chirashi · Daichō · Kanso · Sumi",
    densities: "Densities",
    densitiesValue: "Compact · Default · Comfortable",
    languages: "UI languages",
    languagesValue: "ES · JA · EN",
    explore: "Explore foundations",
    noteStrong: "How to read this catalog.",
    noteBody:
      "Documentation is complete in ES/JA/EN: the language selector switches the body, the UI and the examples. Theme and density affect the whole page, including tables and spacing.",
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function OverviewPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="古典"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        <IndexCard to="/tokens" {...t.cards.foundations} />
        <IndexCard to="/components" {...t.cards.components} />
        <IndexCard to="/patterns" {...t.cards.patterns} />
        <IndexCard to="/tokens/format" {...t.cards.format} />
        <div className="flex h-full flex-col border border-rule bg-surface">
          <div className="flex min-h-[var(--koten-row-h)] items-center justify-between border-b border-rule bg-tint px-[var(--koten-panel-p)] text-xs font-semibold">
            {t.demos} <span className="font-normal text-faint">{t.demosJp}</span>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-[var(--koten-panel-p)] text-xs">
            <a
              href="http://localhost:5174"
              className="flex min-h-[var(--koten-control-h)] items-center justify-between text-link underline-offset-2 hover:underline"
            >
              Storefront HIKARI <span aria-hidden="true">↗</span>
            </a>
            <a
              href="http://localhost:5175"
              className="flex min-h-[var(--koten-control-h)] items-center justify-between text-link underline-offset-2 hover:underline"
            >
              ERP KURA <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel>
          <PanelHeader>
            <PanelTitle as="h2">{t.principlesTitle}</PanelTitle>
            <PanelActions>
              <Badge tone="new" dot>
                ES · JA · EN
              </Badge>
            </PanelActions>
          </PanelHeader>
          <PanelBody>
            <ul className="divide-y divide-rule border-y border-rule text-xs">
              {t.principles.map((principle, index) => (
                <li key={principle} className="flex min-h-[var(--koten-row-h)] items-center gap-3">
                  <span className="w-5 shrink-0 text-end font-mono text-2xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted">{principle}</span>
                </li>
              ))}
            </ul>
          </PanelBody>
        </Panel>

        <Panel tone="accent">
          <PanelHeader>
            <PanelTitle as="h2">{t.statusTitle}</PanelTitle>
            <PanelActions>
              <Badge tone="success" dot>
                {t.statusBadge}
              </Badge>
            </PanelActions>
          </PanelHeader>
          <PanelBody>
            <p className="text-xs text-muted">{t.statusBody}</p>
            <dl className="mt-[var(--koten-gap)] grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-2xs">
              <dt className="text-faint">{t.components}</dt>
              <dd className="text-end">{t.componentsValue}</dd>
              <dt className="text-faint">{t.themes}</dt>
              <dd className="text-end">{t.themesValue}</dd>
              <dt className="text-faint">{t.densities}</dt>
              <dd className="text-end">{t.densitiesValue}</dd>
              <dt className="text-faint">{t.languages}</dt>
              <dd className="text-end">{t.languagesValue}</dd>
            </dl>
            <Link
              to="/tokens"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "mt-[var(--koten-gap)]",
              )}
            >
              {t.explore}
            </Link>
          </PanelBody>
        </Panel>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border-s-2 border-primary bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        <strong className="text-ink">{t.noteStrong}</strong> {t.noteBody}
      </div>
    </div>
  );
}
