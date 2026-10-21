import {
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
import { Link, useParams } from "react-router";
import { PageHeader } from "../../components/docs";
import { blockCategories, blockDocs, blocksByCategory, isBlockCategory } from "../../data/docs";
import { NotFoundPage } from "../not-found";

const copy = {
  es: {
    eyebrow: "Bloques · 応用",
    title: "Bloques",
    description:
      "Piezas pre-armadas con primitivas del sistema. Cada bloque vive en su propia página con instalación, preview, código, props y accesibilidad. Se agrupan por categoría para que puedan crecer sin mezclarse con los componentes individuales.",
    meta: "20 bloques · 2 categorías · ES/JA/EN",
    all: "Todos los bloques",
    id: "ID",
    block: "Bloque",
    category: "Categoría",
    view: "Ver",
    count: (value: number) => `${value} bloques`,
    tableCaption: "Bloques del sistema",
    empty: "Esta categoría todavía no tiene bloques.",
  },
  ja: {
    eyebrow: "ブロック · 応用",
    title: "ブロック",
    description:
      "システムのプリミティブを組み合わせた既製の部品です。各ブロックは独立したページを持ち、インストール、プレビュー、コード、props、アクセシビリティを掲載します。カテゴリ別にまとめ、個別コンポーネントと分けて拡張できます。",
    meta: "20 ブロック · 2 カテゴリ · ES/JA/EN",
    all: "すべてのブロック",
    id: "ID",
    block: "ブロック",
    category: "カテゴリ",
    view: "表示",
    count: (value: number) => `${value} 件`,
    tableCaption: "システムのブロック",
    empty: "このカテゴリにはまだブロックがありません。",
  },
  en: {
    eyebrow: "Blocks · 応用",
    title: "Blocks",
    description:
      "Pre-assembled pieces built from the system primitives. Every block has its own page with installation, preview, code, props and accessibility. They are grouped by category so they can grow without mixing with individual components.",
    meta: "20 blocks · 2 categories · ES/JA/EN",
    all: "All blocks",
    id: "ID",
    block: "Block",
    category: "Category",
    view: "View",
    count: (value: number) => `${value} blocks`,
    tableCaption: "System blocks",
    empty: "This category has no blocks yet.",
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function BlocksIndexPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="応用"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {blockCategories.map((category) => {
          const items = blocksByCategory(category.id);

          return (
            <Link
              key={category.id}
              to={`/blocks/${category.id}`}
              className="group flex h-full flex-col border border-rule bg-surface text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1"
            >
              <span className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
                <span className="text-xs font-semibold">{category.title[locale]}</span>
                <span aria-hidden="true" className="text-primary">
                  →
                </span>
              </span>
              <span className="flex-1 p-[var(--koten-panel-p)] text-xs leading-relaxed text-muted">
                {category.description[locale]}
              </span>
              <span className="border-t border-rule px-[var(--koten-panel-p)] py-1 text-2xs text-faint">
                {t.count(items.length)}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <h2 className="text-lg font-semibold">{t.all}</h2>
        <div className="mt-[var(--koten-gap)]">
          <Table>
            <TableCaption>{t.tableCaption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t.id}</TableHead>
                <TableHead>{t.block}</TableHead>
                <TableHead>{t.category}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockDocs.map((doc) => (
                <TableRow key={`${doc.category}-${doc.slug}`}>
                  <TableCell className="font-mono text-2xs text-faint">{doc.id}</TableCell>
                  <TableCell>
                    <Link
                      to={`/blocks/${doc.category}/${doc.slug}`}
                      className="font-medium text-link underline-offset-2 hover:underline"
                    >
                      {doc.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-2xs text-muted">
                    {blockCategories.find((category) => category.id === doc.category)?.title[
                      locale
                    ] ?? doc.category}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export function BlockCategoryPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const { category: categoryParam } = useParams();
  const category = categoryParam && isBlockCategory(categoryParam) ? categoryParam : undefined;
  const meta = category ? blockCategories.find((item) => item.id === category) : undefined;

  if (!category || !meta) {
    return <NotFoundPage />;
  }

  const items = blocksByCategory(category);

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={meta.title[locale]}
        description={meta.description[locale]}
        meta={t.count(items.length)}
      />

      {items.length === 0 ? (
        <p className="mt-[calc(var(--koten-gap)*2)] border border-dashed border-rule-strong p-[var(--koten-panel-p)] text-xs text-muted">
          {t.empty}
        </p>
      ) : (
        <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
          {items.map((doc) => (
            <Link
              key={doc.slug}
              to={`/blocks/${doc.category}/${doc.slug}`}
              className="group flex h-full flex-col border border-rule bg-surface text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1"
            >
              <span className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
                <span className="text-xs font-semibold">
                  {doc.name}
                  <span className="ms-2 font-normal text-faint">{doc.jp}</span>
                </span>
                <span aria-hidden="true" className="text-primary">
                  →
                </span>
              </span>
              <span className="flex-1 p-[var(--koten-panel-p)] text-xs leading-relaxed text-muted">
                {doc.description[locale]}
              </span>
              <span className="border-t border-rule px-[var(--koten-panel-p)] py-1 font-mono text-2xs text-faint">
                {doc.id}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
