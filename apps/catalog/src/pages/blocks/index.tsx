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
      "Piezas compuestas con las primitivas del sistema. Cada bloque tiene su página con instalación, ejemplos, props y accesibilidad, agrupados por categoría.",
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
      "システムのプリミティブを組み合わせた部品です。各ブロックは導入、例、props、アクセシビリティを掲載する独立したページを持ち、カテゴリ別にまとまっています。",
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
      "Pieces composed from the system primitives. Every block has its own page with installation, examples, props and accessibility, grouped by category.",
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

      <ul className="mt-[calc(var(--koten-gap)*2)] divide-y divide-rule border-y border-rule">
        {blockCategories.map((category) => {
          const items = blocksByCategory(category.id);

          return (
            <li key={category.id}>
              <Link
                to={`/blocks/${category.id}`}
                className="group grid gap-1 py-3 text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1 sm:grid-cols-[10rem_minmax(0,1fr)_7rem] sm:items-baseline sm:gap-4"
              >
                <span className="text-sm font-semibold">{category.title[locale]}</span>
                <span className="text-xs leading-relaxed text-muted">
                  {category.description[locale]}
                </span>
                <span className="text-2xs text-faint sm:text-end">
                  {t.count(items.length)} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

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
        <ul className="mt-[calc(var(--koten-gap)*2)] divide-y divide-rule border-y border-rule">
          {items.map((doc) => (
            <li key={doc.slug}>
              <Link
                to={`/blocks/${doc.category}/${doc.slug}`}
                className="group grid gap-1 py-3 text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1 sm:grid-cols-[minmax(0,1fr)_6rem] sm:items-baseline sm:gap-4"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-2 text-sm font-semibold">
                    {doc.name}
                    <span className="text-xs font-normal text-faint">{doc.jp}</span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {doc.description[locale]}
                  </span>
                </span>
                <span className="font-mono text-2xs text-faint sm:text-end">
                  {doc.id} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
