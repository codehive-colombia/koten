import {
  Input,
  type KotenLocale,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useKoten,
} from "@koten/ui";
import { useState } from "react";
import { Link } from "react-router";
import { PageHeader } from "../../components/docs";
import { primitiveDocs } from "../../data/docs";

const copy = {
  es: {
    eyebrow: "Componentes · 部品",
    title: "Componentes",
    description:
      "Cada primitiva tiene su página con instalación, ejemplos, props y accesibilidad. Las piezas de formulario incluyen una muestra dentro de un formulario.",
    meta: "46 componentes individuales · ES/JA/EN",
    search: "Buscar componente",
    placeholder: "Nombre o ID (Button, C-001…)",
    count: (value: number) => `${value} componentes`,
    empty: "No hay componentes que coincidan con la búsqueda.",
    id: "ID",
    component: "Componente",
    jp: "日本語",
    reference: "Referencia",
    baseUi: "Base UI",
    tanstack: "TanStack Table",
    native: "HTML nativo",
    blocksTitle: "¿Buscas piezas pre-armadas?",
    blocksBody:
      "Los bloques de storefront y ERP también viven en páginas individuales, dentro de su propia sección.",
    blocksLink: "Ir a Bloques →",
    tableCaption: "Componentes del sistema",
  },
  ja: {
    eyebrow: "コンポーネント · 部品",
    title: "コンポーネント",
    description:
      "各プリミティブは、導入、例、props、アクセシビリティを掲載する独立したページを持ちます。フォーム部品にはフォーム内での使用例があります。",
    meta: "46 個の独立ページ · ES/JA/EN",
    search: "コンポーネントを検索",
    placeholder: "名前または ID（Button、C-001…）",
    count: (value: number) => `${value} 件`,
    empty: "検索に一致するコンポーネントはありません。",
    id: "ID",
    component: "コンポーネント",
    jp: "日本語",
    reference: "参照",
    baseUi: "Base UI",
    tanstack: "TanStack Table",
    native: "ネイティブHTML",
    blocksTitle: "組み合わせ済みの部品をお探しですか？",
    blocksBody: "ストアフロントと ERP のブロックも、専用セクション内の独立したページにあります。",
    blocksLink: "ブロックへ →",
    tableCaption: "システムのコンポーネント",
  },
  en: {
    eyebrow: "Components · 部品",
    title: "Components",
    description:
      "Every primitive has its own page with installation, examples, props and accessibility. Form pieces include a sample of their use inside a form.",
    meta: "46 individual components · ES/JA/EN",
    search: "Search components",
    placeholder: "Name or ID (Button, C-001…)",
    count: (value: number) => `${value} components`,
    empty: "No components match the search.",
    id: "ID",
    component: "Component",
    jp: "日本語",
    reference: "Reference",
    baseUi: "Base UI",
    tanstack: "TanStack Table",
    native: "Native HTML",
    blocksTitle: "Looking for pre-assembled pieces?",
    blocksBody:
      "Storefront and ERP blocks also live on individual pages, inside their own section.",
    blocksLink: "Go to Blocks →",
    tableCaption: "System components",
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function ComponentsIndexPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = primitiveDocs.filter(
    (doc) =>
      needle.length === 0 ||
      doc.name.toLowerCase().includes(needle) ||
      doc.id.toLowerCase().includes(needle) ||
      doc.slug.includes(needle),
  );

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="部品"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <div className="flex flex-wrap items-end justify-between gap-[var(--koten-gap)]">
          <div className="grid w-full max-w-sm gap-1">
            <span
              id="component-search-label"
              className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint"
            >
              {t.search}
            </span>
            <Input
              aria-labelledby="component-search-label"
              type="search"
              value={query}
              placeholder={t.placeholder}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
          </div>
          <p aria-live="polite" className="text-2xs text-muted">
            {t.count(visible.length)}
          </p>
        </div>

        <div className="mt-[var(--koten-gap)]">
          <Table>
            <TableCaption>{t.tableCaption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t.id}</TableHead>
                <TableHead>{t.component}</TableHead>
                <TableHead>{t.jp}</TableHead>
                <TableHead>{t.reference}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((doc) => (
                <TableRow key={doc.slug}>
                  <TableCell className="font-mono text-2xs text-faint">{doc.id}</TableCell>
                  <TableCell>
                    <Link
                      to={`/components/${doc.slug}`}
                      className="font-medium text-link underline-offset-2 hover:underline"
                    >
                      {doc.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-2xs text-muted">{doc.jp}</TableCell>
                  <TableCell className="text-2xs text-muted">
                    {doc.baseUi
                      ? doc.baseUi.includes("tanstack")
                        ? t.tanstack
                        : t.baseUi
                      : t.native}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {visible.length === 0 ? (
            <p className="border border-t-0 border-rule p-[var(--koten-panel-p)] text-xs text-muted">
              {t.empty}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border-t border-rule pt-3 text-xs text-muted">
        <p>
          <span className="font-semibold text-ink">{t.blocksTitle}</span> {t.blocksBody}{" "}
          <Link to="/blocks" className="font-semibold text-link underline-offset-2 hover:underline">
            {t.blocksLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
