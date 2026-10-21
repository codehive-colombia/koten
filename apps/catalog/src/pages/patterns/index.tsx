import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@koten/ui";
import { Link } from "react-router";
import { IndexCard, PageHeader } from "../../components/docs";

const inventory = [
  { id: "C-042", name: "SearchBar", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-043", name: "NoticeList", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-044", name: "RankedList", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-045", name: "ProductCard", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-046", name: "PriceBlock", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-047", name: "SpecTable", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-048", name: "CampaignBanner", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-049", name: "StoreHeader", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-050", name: "Footer", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-051", name: "ProductGallery", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-052", name: "ReviewSummary", page: "Storefront", to: "/patterns/storefront" },
  { id: "C-053", name: "AppShell", page: "ERP", to: "/patterns/erp" },
  { id: "C-054", name: "SideNav", page: "ERP", to: "/patterns/erp" },
  { id: "C-055", name: "TopBar", page: "ERP", to: "/patterns/erp" },
  { id: "C-056", name: "PageHeader", page: "ERP", to: "/patterns/erp" },
  { id: "C-057", name: "FilterBar", page: "ERP", to: "/patterns/erp" },
  { id: "C-058", name: "DetailDrawer", page: "ERP", to: "/patterns/erp" },
  { id: "C-059", name: "StatusBadge", page: "ERP", to: "/patterns/erp" },
  { id: "C-060", name: "FormSection", page: "ERP", to: "/patterns/erp" },
  { id: "C-061", name: "Timeline", page: "ERP", to: "/patterns/erp" },
] as const;

export function PatternsIndexPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patrones · 応用"
        title="Patrones"
        jp="応用"
        description="Composiciones de primitivas que resuelven una pantalla completa: la página de producto HIKARI y el backoffice KURA. Cada patrón documenta anatomía, props, código y notas de accesibilidad."
        meta="20 patrones · fases 2 y 3 · demos en 5174 y 5175"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        <IndexCard
          to="/patterns/storefront"
          title="Storefront"
          jp="店舗"
          description="Header, búsqueda, galería, precio, tarjetas, avisos, ranking, campaña, specs, reseñas y footer."
        />
        <IndexCard
          to="/patterns/erp"
          title="ERP"
          jp="台帳"
          description="Shell, sidebar, topbar, cabecera, filtros, estados, formularios, timeline y drawer de detalle."
        />
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)]">
        <h2 className="text-lg font-semibold">Inventario de patrones</h2>
        <p className="mt-1 text-2xs text-faint">
          Cada ID corresponde a una pieza documentada y usada por un demo.
        </p>
        <div className="mt-[var(--koten-gap)]">
          <Table>
            <TableCaption>Inventario de patrones de las fases 2 y 3</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patrón</TableHead>
                <TableHead>Página</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
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
                  <TableCell className="text-2xs text-muted">{item.page}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
