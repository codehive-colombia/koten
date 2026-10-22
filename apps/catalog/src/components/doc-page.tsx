// biome-ignore-all lint/a11y/noNoninteractiveTabindex: scroll regions kept keyboard accessible (F4-002).
import { Badge, cn, type KotenLocale, useKoten } from "@koten/ui";
import { type ReactNode, useState } from "react";
import { shellLabels } from "../data/catalog";
import type { BlockDoc, DocRequirement, L10n, PrimitiveDoc } from "../data/docs/types";
import { usePackageManager } from "../lib/package-manager";
import { registryCommand, site } from "../lib/site";
import { Code } from "./docs";
import { Section } from "./specimen";
import { PackageManagerTabs } from "./view-toggles";

type Chrome = {
  preview: string;
  code: string;
  install: string;
  files: string;
  reference: string;
  native: string;
  composition: string;
  requirements: string;
  formUsage: string;
  props: string;
  a11y: string;
  examples: string;
  example: string;
  baseUi: string;
  tanstack: string;
  external: string;
  markdown: string;
};

const chrome: Record<KotenLocale, Chrome> = {
  es: {
    preview: "Vista previa",
    code: "Código",
    install: "Instalación",
    files: "Archivos",
    reference: "Referencia",
    native: "HTML nativo",
    composition: "Composición de primitivas",
    requirements: "Requisitos de uso",
    formUsage: "Uso en un formulario",
    props: "Props",
    a11y: "Accesibilidad",
    examples: "Ejemplos",
    example: "Ejemplo",
    baseUi: "Base UI",
    tanstack: "TanStack Table",
    external: "Se abre en una pestaña nueva",
    markdown: "Markdown para agentes",
  },
  ja: {
    preview: "プレビュー",
    code: "コード",
    install: "インストール",
    files: "ファイル",
    reference: "参照",
    native: "ネイティブHTML",
    composition: "プリミティブの合成",
    requirements: "利用要件",
    formUsage: "フォーム内での使用",
    props: "プロパティ",
    a11y: "アクセシビリティ",
    examples: "例",
    example: "例",
    baseUi: "Base UI",
    tanstack: "TanStack Table",
    external: "新しいタブで開きます",
    markdown: "エージェント向けMarkdown",
  },
  en: {
    preview: "Preview",
    code: "Code",
    install: "Installation",
    files: "Files",
    reference: "Reference",
    native: "Native HTML",
    composition: "Primitive composition",
    requirements: "Usage requirements",
    formUsage: "Use inside a form",
    props: "Props",
    a11y: "Accessibility",
    examples: "Examples",
    example: "Example",
    baseUi: "Base UI",
    tanstack: "TanStack Table",
    external: "Opens in a new tab",
    markdown: "Agent-readable Markdown",
  },
};

const requirementLabels: Record<DocRequirement["kind"], L10n> = {
  provider: { es: "Provider", ja: "Provider", en: "Provider" },
  hook: { es: "Hook", ja: "フック", en: "Hook" },
  controlled: { es: "Estado controlado", ja: "制御状態", en: "Controlled state" },
  portal: { es: "Portal", ja: "ポータル", en: "Portal" },
  client: { es: "Cliente", ja: "クライアント", en: "Client" },
  dependency: { es: "Dependencia", ja: "依存関係", en: "Dependency" },
};

function PageMeta({ doc, kind }: { doc: PrimitiveDoc | BlockDoc; kind: "component" | "block" }) {
  const { locale } = useKoten();
  const t = chrome[locale];
  const markdownHref =
    "category" in doc
      ? `${site.origin}/md/blocks/${doc.category}/${doc.slug}.md`
      : `${site.origin}/md/components/${doc.slug}.md`;

  return (
    <dl className="mt-4 grid gap-2 text-2xs sm:grid-cols-2" lang={locale}>
      <div className="flex flex-wrap items-baseline gap-2">
        <dt className="font-semibold uppercase tracking-[0.12em] text-faint">{t.reference}</dt>
        <dd>
          {doc.baseUi ? (
            <a
              href={doc.baseUi}
              target="_blank"
              rel="noreferrer"
              title={t.external}
              className="font-semibold text-link underline-offset-2 hover:underline"
            >
              {doc.baseUi.includes("tanstack") ? t.tanstack : t.baseUi} ↗
            </a>
          ) : (
            <span className="text-muted">{kind === "block" ? t.composition : t.native}</span>
          )}
        </dd>
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <dt className="font-semibold uppercase tracking-[0.12em] text-faint">ID</dt>
        <dd className="font-mono text-muted">{doc.id}</dd>
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <dt className="font-semibold uppercase tracking-[0.12em] text-faint">MD</dt>
        <dd>
          <a
            href={markdownHref}
            target="_blank"
            rel="noreferrer"
            title={t.external}
            className="font-semibold text-link underline-offset-2 hover:underline"
          >
            {t.markdown} ↗
          </a>
        </dd>
      </div>
    </dl>
  );
}

function PreviewCode({
  title,
  description,
  preview,
  code,
  id,
}: {
  title: string;
  description?: string;
  preview: ReactNode;
  code: string;
  id: string;
}) {
  const { locale } = useKoten();
  const t = chrome[locale];
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const panelId = `example-${id}-${mode}`;

  return (
    <article className="border border-rule">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1">
        <div className="min-w-0">
          <h3 className="text-xs font-semibold">{title}</h3>
          {description ? <p className="mt-0.5 text-2xs text-muted">{description}</p> : null}
        </div>
        <fieldset
          aria-label={`${t.example}: ${title}`}
          className="flex shrink-0 border border-rule bg-surface p-0"
        >
          <legend className="sr-only">{`${t.example}: ${title}`}</legend>
          <button
            type="button"
            aria-pressed={mode === "preview"}
            aria-controls={panelId}
            onClick={() => setMode("preview")}
            className={cn(
              "px-2 py-1 text-2xs font-semibold transition-colors",
              mode === "preview" ? "bg-selection text-primary-strong" : "text-muted hover:bg-tint",
            )}
          >
            {t.preview}
          </button>
          <button
            type="button"
            aria-pressed={mode === "code"}
            aria-controls={panelId}
            onClick={() => setMode("code")}
            className={cn(
              "border-s border-rule px-2 py-1 text-2xs font-semibold transition-colors",
              mode === "code" ? "bg-selection text-primary-strong" : "text-muted hover:bg-tint",
            )}
          >
            {t.code}
          </button>
        </fieldset>
      </header>
      <div id={panelId} className={mode === "preview" ? "p-[var(--koten-panel-p)]" : "p-0"}>
        {mode === "preview" ? preview : <Code>{code}</Code>}
      </div>
    </article>
  );
}

function Requirements({ items }: { items: readonly DocRequirement[] }) {
  const { locale } = useKoten();
  const t = chrome[locale];

  if (items.length === 0) return null;

  return (
    <Section
      id="requisitos"
      title={t.requirements}
      jp="要件"
      meta={items.map((item) => requirementLabels[item.kind][locale]).join(" · ")}
    >
      <ul className="divide-y divide-rule border-y border-rule text-xs">
        {items.map((item) => (
          <li
            key={`${item.kind}-${item.label.es}`}
            className="grid gap-1 py-2 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
          >
            <p className="flex flex-wrap items-center gap-2 font-semibold">
              <Badge tone={item.kind === "provider" ? "warning" : "neutral"} appearance="outline">
                {requirementLabels[item.kind][locale]}
              </Badge>
              <span>{item.label[locale]}</span>
            </p>
            <p className="leading-relaxed text-muted">{item.detail[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Installation({ doc }: { doc: PrimitiveDoc | BlockDoc }) {
  const { locale } = useKoten();
  const t = chrome[locale];
  const { packageManager, setPackageManager } = usePackageManager();
  const command = registryCommand(doc.registrySlug ?? doc.slug, packageManager);

  return (
    <Section
      id="instalacion"
      title={t.install}
      jp="導入"
      meta={`/r/${doc.registrySlug ?? doc.slug}.json`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <PackageManagerTabs
          value={packageManager}
          label={shellLabels[locale].runner}
          onChange={setPackageManager}
        />
      </div>
      <Code>{command}</Code>
      <h3 className="mt-4 text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
        {t.files}
      </h3>
      <ul className="mt-2 grid gap-1 font-mono text-2xs text-muted sm:grid-cols-2">
        {doc.files.map((file) => (
          <li key={file} className="border-s-2 border-rule-strong ps-2">
            {file}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Props({ doc }: { doc: PrimitiveDoc | BlockDoc }) {
  const { locale } = useKoten();
  const t = chrome[locale];
  const headers = {
    prop: { es: "Prop", ja: "プロパティ", en: "Prop" } as L10n,
    type: { es: "Tipo", ja: "型", en: "Type" } as L10n,
    fallback: { es: "Default", ja: "既定値", en: "Default" } as L10n,
    note: { es: "Nota", ja: "説明", en: "Note" } as L10n,
  };

  return (
    <Section id="props" title={t.props} jp="API">
      <div tabIndex={0} className="overflow-x-auto border border-rule">
        <table className="w-full min-w-[36rem] border-collapse text-start">
          <caption className="sr-only">{`${doc.name} · ${t.props}`}</caption>
          <thead>
            <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
              {(["prop", "type", "fallback", "note"] as const).map((key) => (
                <th key={key} scope="col" className="px-[var(--koten-control-px)] font-semibold">
                  {headers[key][locale]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {doc.props.map((row) => (
              <tr key={row.prop} className="h-[var(--koten-row-h)]">
                <th
                  scope="row"
                  className="px-[var(--koten-control-px)] font-mono text-2xs font-normal text-muted"
                >
                  {row.prop}
                </th>
                <td className="px-[var(--koten-control-px)] font-mono text-2xs">{row.type}</td>
                <td className="px-[var(--koten-control-px)] font-mono text-2xs text-faint">
                  {row.default}
                </td>
                <td className="px-[var(--koten-control-px)] text-xs text-muted">
                  {row.note[locale]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function A11y({ doc }: { doc: PrimitiveDoc | BlockDoc }) {
  const { locale } = useKoten();
  const t = chrome[locale];

  return (
    <Section id="a11y" title={t.a11y} jp="配慮">
      <ul
        aria-label={`${doc.name} · ${t.a11y}`}
        className="divide-y divide-rule border-y border-rule text-xs leading-relaxed text-muted"
      >
        {doc.a11y[locale].map((item) => (
          <li key={item} className="py-2">
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function DocHeader({ doc, kind }: { doc: PrimitiveDoc | BlockDoc; kind: "component" | "block" }) {
  const { locale } = useKoten();
  const eyebrow =
    kind === "component"
      ? { es: "Componente", ja: "コンポーネント", en: "Component" }[locale]
      : { es: "Bloque", ja: "ブロック", en: "Block" }[locale];

  return (
    <header className="border-b border-rule-strong pb-[var(--koten-panel-p)]">
      <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
        {eyebrow} · {doc.id}
      </p>
      <h1 className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-3xl font-semibold leading-tight">
        <span aria-hidden="true" className="mb-1 inline-block size-2 shrink-0 bg-primary" />
        {doc.name}
        <span className="text-xs font-normal text-faint">{doc.jp}</span>
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{doc.description[locale]}</p>
      <PageMeta doc={doc} kind={kind} />
    </header>
  );
}

export function PrimitiveDocPage({ doc }: { doc: PrimitiveDoc }) {
  const { locale } = useKoten();
  const t = chrome[locale];

  return (
    <div>
      <DocHeader doc={doc} kind="component" />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Requirements items={doc.requirements ?? []} />
        <Installation doc={doc} />

        <Section id="ejemplos" title={t.examples} jp="例">
          <div className="space-y-[var(--koten-gap)]">
            {doc.examples.map((example) => (
              <PreviewCode
                key={example.id}
                id={example.id}
                title={example.title[locale]}
                description={example.description?.[locale]}
                preview={example.preview}
                code={example.code}
              />
            ))}
          </div>
        </Section>

        {doc.formExample ? (
          <Section id="formulario" title={t.formUsage} jp="フォーム">
            <PreviewCode
              id={`${doc.slug}-form`}
              title={doc.formExample.title[locale]}
              description={doc.formExample.description[locale]}
              preview={doc.formExample.preview}
              code={doc.formExample.code}
            />
          </Section>
        ) : null}

        <Props doc={doc} />
        <A11y doc={doc} />
      </div>
    </div>
  );
}

export function BlockDocPage({ doc }: { doc: BlockDoc }) {
  const { locale } = useKoten();
  const t = chrome[locale];

  return (
    <div>
      <DocHeader doc={doc} kind="block" />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Requirements items={doc.requirements ?? []} />
        <Installation doc={doc} />

        <Section id="ejemplos" title={t.examples} jp="例">
          <div className="space-y-[var(--koten-gap)]">
            {doc.examples.map((example) => (
              <PreviewCode
                key={example.id}
                id={example.id}
                title={example.title[locale]}
                description={example.description?.[locale]}
                preview={example.preview}
                code={example.code}
              />
            ))}
          </div>
        </Section>

        <Props doc={doc} />
        <A11y doc={doc} />
      </div>
    </div>
  );
}
