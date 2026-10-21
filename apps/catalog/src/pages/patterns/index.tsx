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
import { Link } from "react-router";
import { IndexCard, PageHeader } from "../../components/docs";
import { patternInventory } from "../../data/inventory";

const copy = {
  es: {
    eyebrow: "Patrones · 応用",
    title: "Patrones",
    description:
      "Composiciones de primitivas que resuelven una pantalla completa: la página de producto HIKARI y el backoffice KURA. Cada patrón documenta anatomía, props, código y notas de accesibilidad.",
    meta: "20 patrones · demos en 5174 y 5175",
    storefrontTitle: "Storefront",
    storefrontDescription:
      "Header, búsqueda, galería, precio, tarjetas, avisos, ranking, campaña, specs, reseñas y footer.",
    erpTitle: "ERP",
    erpDescription:
      "Shell, sidebar, topbar, cabecera, filtros, estados, formularios, timeline y drawer de detalle.",
    inventoryTitle: "Inventario de patrones",
    inventoryNote: "Cada ID corresponde a una pieza documentada y usada por un demo.",
    tableCaption: "Inventario de patrones",
    columnId: "ID",
    columnPattern: "Patrón",
    columnPage: "Página",
    pageStorefront: "Storefront",
    pageErp: "ERP",
  },
  ja: {
    eyebrow: "パターン · 応用",
    title: "パターン",
    description:
      "プリミティブを組み合わせて画面全体を成立させる構成です。HIKARIの商品ページとKURAのバックオフィスを例に、各パターンの構造、props、コード、アクセシビリティの注意点をまとめます。",
    meta: "20 パターン · デモは 5174 と 5175",
    storefrontTitle: "ストアフロント",
    storefrontDescription:
      "ヘッダー、検索、ギャラリー、価格、カード、お知らせ、ランキング、キャンペーン、仕様、レビュー、フッター。",
    erpTitle: "ERP",
    erpDescription:
      "シェル、サイドバー、トップバー、ページヘッダー、絞り込み、ステータス、フォーム、タイムライン、詳細ドロワー。",
    inventoryTitle: "パターン一覧",
    inventoryNote: "各 ID は、ドキュメント化されデモで使われている部品に対応します。",
    tableCaption: "パターン一覧",
    columnId: "ID",
    columnPattern: "パターン",
    columnPage: "ページ",
    pageStorefront: "ストアフロント",
    pageErp: "ERP",
  },
  en: {
    eyebrow: "Patterns · 応用",
    title: "Patterns",
    description:
      "Primitive compositions that carry a whole screen: the HIKARI product page and the KURA back office. Each pattern documents anatomy, props, code and accessibility notes.",
    meta: "20 patterns · demos on 5174 and 5175",
    storefrontTitle: "Storefront",
    storefrontDescription:
      "Header, search, gallery, price, cards, notices, ranking, campaign, specs, reviews and footer.",
    erpTitle: "ERP",
    erpDescription:
      "Shell, sidebar, topbar, page header, filters, statuses, forms, timeline and detail drawer.",
    inventoryTitle: "Pattern inventory",
    inventoryNote: "Each ID maps to a documented piece used by a demo.",
    tableCaption: "Pattern inventory",
    columnId: "ID",
    columnPattern: "Pattern",
    columnPage: "Page",
    pageStorefront: "Storefront",
    pageErp: "ERP",
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function PatternsIndexPage() {
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
        <IndexCard
          to="/patterns/storefront"
          title={t.storefrontTitle}
          jp="店舗"
          description={t.storefrontDescription}
        />
        <IndexCard to="/patterns/erp" title={t.erpTitle} jp="台帳" description={t.erpDescription} />
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <h2 className="text-lg font-semibold">{t.inventoryTitle}</h2>
        <p className="mt-1 text-2xs text-faint">{t.inventoryNote}</p>
        <div className="mt-[var(--koten-gap)]">
          <Table>
            <TableCaption>{t.tableCaption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t.columnId}</TableHead>
                <TableHead>{t.columnPattern}</TableHead>
                <TableHead>{t.columnPage}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patternInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-2xs text-faint">{item.id}</TableCell>
                  <TableCell>
                    <Link
                      to={item.to}
                      className="font-medium text-link underline-offset-2 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-2xs text-muted">
                    {item.page === "storefront" ? t.pageStorefront : t.pageErp}
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
