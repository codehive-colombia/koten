import {
  Badge,
  CampaignBanner,
  Footer,
  NoticeList,
  PriceBlock,
  ProductCard,
  ProductGallery,
  RankedList,
  ReviewSummary,
  SearchBar,
  SpecTable,
  StoreHeader,
} from "@koten/ui";
import sampleCamera from "../../assets/sample-camera.svg";
import { Code, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const categories = [
  { value: "all", label: "Todo" },
  { value: "cameras", label: "Cámaras" },
  { value: "lenses", label: "Objetivos" },
  { value: "audio", label: "Audio" },
];

export function StorefrontPatternsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patrones · 店舗"
        title="Patrones de storefront"
        jp="チラシ"
        description="Las once piezas que sostienen la página HIKARI K-1: cabecera, búsqueda, galería, precio, tarjetas, avisos, ranking, campaña, specs, reseñas y footer. Todas son composiciones de primitivas; ninguna hardcodea strings."
        meta="C-042 … C-052 · demo real en http://localhost:5174"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="header"
          title="StoreHeader y SearchBar"
          jp="ヘッダー"
          meta="Utility + marca + búsqueda + nav"
        >
          <StoreHeader
            brand={{ name: "HIKARI", jp: "光", href: "#", label: "HIKARI, inicio" }}
            utility={{ left: "Envío gratuito · Recogida en tienda", right: "HIKARI ONLINE" }}
            search={
              <SearchBar
                label="Buscar productos"
                placeholder="Nombre, modelo o palabra clave"
                categoriesLabel="Categorías"
                categories={categories}
                submitLabel="Buscar"
              />
            }
            actions={<span className="text-2xs text-muted">Cuenta · Carrito (0)</span>}
            navLabel="Categorías"
            navItems={[
              { id: "cameras", label: "Cámaras", href: "#", active: true },
              { id: "lenses", label: "Objetivos", href: "#" },
              { id: "audio", label: "Audio", href: "#" },
              { id: "computers", label: "Informática", href: "#" },
              { id: "gifts", label: "Regalos", href: "#" },
            ]}
            menuLabel="Menú"
          />
        </Section>

        <Section
          id="gallery"
          title="ProductGallery"
          jp="商品画像"
          meta="Miniaturas con aria-pressed"
        >
          <div className="max-w-md">
            <ProductGallery
              label="Galería de la HIKARI K-1"
              images={[
                { src: sampleCamera, alt: "HIKARI K-1 de frente" },
                { src: sampleCamera, alt: "HIKARI K-1 en detalle" },
                { src: sampleCamera, alt: "HIKARI K-1 con objetivo" },
              ]}
              thumbLabel={(index, alt) => `${index + 1}. ${alt}`}
            />
          </div>
        </Section>

        <Section id="price" title="PriceBlock" jp="価格" meta="Precio, impuestos, puntos y stock">
          <div className="max-w-sm">
            <PriceBlock
              price="¥58,300"
              taxLabel="IVA incluido"
              listPrice="¥63,800"
              listPriceLabel="Precio anterior"
              points="583 puntos"
              stock={{ label: "En stock", tone: "success" }}
              note="※ Las imágenes son orientativas."
            />
          </div>
        </Section>

        <Section
          id="product-card"
          title="ProductCard"
          jp="商品カード"
          meta="Imagen, precio y badges"
        >
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2">
            <ProductCard
              href="#"
              title="HIKARI 35mm f/2.8"
              image={{ src: sampleCamera, alt: "Objetivo HIKARI 35 mm" }}
              price="¥32,400"
              points="324 puntos"
              meta="Objetivo fijo"
            />
            <ProductCard
              href="#"
              title="HIKARI K-1 plata"
              image={{ src: sampleCamera, alt: "HIKARI K-1 plateada" }}
              price="¥58,300"
              points="583 puntos"
              meta="Color limitado"
              badges={<Badge tone="sale">Limitado</Badge>}
              rating={{ value: 4.6, count: 128, label: "reseñas" }}
            />
          </div>
        </Section>

        <Section
          id="discovery"
          title="NoticeList, RankedList y CampaignBanner"
          jp="発見"
          meta="Rail de descubrimiento"
        >
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <NoticeList
              label="Avisos"
              emptyLabel="Sin avisos"
              moreLabel="Ver todos"
              moreHref="#"
              notices={[
                {
                  id: "n1",
                  date: "21/10",
                  dateTime: "2026-10-21",
                  title: "Feria de cámaras de otoño",
                },
                {
                  id: "n2",
                  date: "18/10",
                  dateTime: "2026-10-18",
                  title: "Cierre del centro de reparaciones",
                },
                { id: "n3", date: "15/10", dateTime: "2026-10-15", title: "Campaña de puntos ×5" },
              ]}
            />
            <RankedList
              label="Más vendidos"
              items={[
                {
                  id: "r1",
                  rank: 1,
                  title: "HIKARI K-1",
                  href: "#",
                  price: "¥58,300",
                  meta: "Cámaras",
                  image: { src: sampleCamera, alt: "HIKARI K-1" },
                },
                {
                  id: "r2",
                  rank: 2,
                  title: "Objetivo 35 mm",
                  href: "#",
                  price: "¥32,400",
                  meta: "Objetivos",
                  image: { src: sampleCamera, alt: "Objetivo HIKARI" },
                },
                {
                  id: "r3",
                  rank: 3,
                  title: "Bolsa de cámara",
                  href: "#",
                  price: "¥9,800",
                  meta: "Accesorios",
                  image: { src: sampleCamera, alt: "Bolsa HIKARI" },
                },
              ]}
            />
          </div>
          <div className="mt-[var(--koten-gap)]">
            <CampaignBanner
              eyebrow="Feria de otoño"
              title="K-1 lens kit: 12.000 ¥ de descuento"
              description="Hasta el 31 de octubre. Puntos dobles."
              deadline="Hasta el 31 de octubre"
              cta={{ label: "Ver la campaña", href: "#" }}
            />
          </div>
        </Section>

        <Section id="specs" title="SpecTable" jp="仕様表" meta="Tabla semántica agrupada">
          <SpecTable
            caption="Especificaciones de la HIKARI K-1"
            groups={[
              {
                id: "camera",
                title: "Cámara",
                rows: [
                  { id: "sensor", label: "Sensor", value: "Full-frame de 35 mm, 24,2 MP" },
                  { id: "lens", label: "Objetivo", value: "35 mm f/2.8 fijo" },
                  { id: "iso", label: "ISO", value: "100–51.200" },
                ],
              },
              {
                id: "body",
                title: "Cuerpo",
                rows: [
                  { id: "weight", label: "Peso", value: "380 g con batería" },
                  { id: "battery", label: "Batería", value: "USB-C, unas 420 fotos" },
                ],
              },
            ]}
          />
        </Section>

        <Section
          id="reviews"
          title="ReviewSummary"
          jp="レビュー"
          meta="Promedio, distribución y reseñas"
        >
          <ReviewSummary
            rating={4.6}
            count={128}
            ratingLabel={(value) => `Valoración ${value.toFixed(1)} de 5`}
            countLabel={(count) => `${count} valoraciones`}
            distributionLabel="Distribución"
            distribution={[
              { stars: 5, count: 86 },
              { stars: 4, count: 28 },
              { stars: 3, count: 9 },
              { stars: 2, count: 3 },
              { stars: 1, count: 2 },
            ]}
            verifiedLabel="Compra verificada"
            emptyLabel="Sin reseñas"
            reviews={[
              {
                id: "rev-1",
                author: "Mika T.",
                date: "12 oct 2026",
                rating: 5,
                title: "La llevo todos los días",
                body: "Ligera y con un obturador silencioso. El ángulo de 35 mm va perfecto para calle.",
                verified: true,
              },
              {
                id: "rev-2",
                author: "Daniel R.",
                date: "4 oct 2026",
                rating: 4,
                title: "Sencilla de usar",
                body: "Los diales tienen un clic agradable. En un día de viaje la batería se queda corta.",
                verified: true,
              },
            ]}
          />
        </Section>

        <Section id="footer" title="Footer" jp="フッター" meta="Cuatro columnas sobre sumi">
          <Footer
            navLabel="Enlaces del pie"
            columns={[
              {
                id: "shop",
                title: "Comprar",
                links: [
                  { label: "Envío y gastos", href: "#" },
                  { label: "Devoluciones", href: "#" },
                ],
              },
              {
                id: "services",
                title: "Servicios",
                links: [
                  { label: "Reparación", href: "#" },
                  { label: "Garantía", href: "#" },
                ],
              },
              {
                id: "company",
                title: "Empresa",
                links: [
                  { label: "Sobre HIKARI", href: "#" },
                  { label: "Empleo", href: "#" },
                ],
              },
              {
                id: "support",
                title: "Soporte",
                links: [
                  { label: "Contacto", href: "#" },
                  { label: "Preguntas frecuentes", href: "#" },
                ],
              },
            ]}
            company="HIKARI Optical Co., Ltd."
            address="2-8-1 Ginza, Chūō-ku, Tokio"
            legal={[
              { label: "Condiciones", href: "#" },
              { label: "Privacidad", href: "#" },
              { label: "Accesibilidad", href: "#" },
            ]}
            note="Precios con impuestos. Imágenes orientativas."
          />
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Composición copiable">
          <PropsTable
            caption="Props de los patrones de storefront"
            rows={[
              {
                prop: "StoreHeader",
                type: "{ brand, utility, search, actions, navItems, navLabel }",
                default: "—",
                note: "La marca usa Hanko; la búsqueda es un slot.",
              },
              {
                prop: "SearchBar",
                type: "{ label, categories, submitLabel, onSubmit }",
                default: "—",
                note: "Select nativo + input search + botón real.",
              },
              {
                prop: "PriceBlock",
                type: "{ price, taxLabel, points, stock, listPrice }",
                default: "size=lg",
                note: "El precio va en shu y tabular-nums.",
              },
              {
                prop: "ProductGallery",
                type: "{ images, label, thumbLabel }",
                default: "index 0",
                note: "Miniaturas con aria-pressed y alt en la principal.",
              },
              {
                prop: "ReviewSummary",
                type: "{ rating, count, distribution, reviews, labels }",
                default: "—",
                note: "Las estrellas son decorativas; el texto da el valor.",
              },
            ]}
          />
          <Code>{`<StoreHeader
  brand={{ name: "HIKARI", jp: "光", href: "/", label: "HIKARI, inicio" }}
  utility={{ left: "Envío gratuito", right: "HIKARI ONLINE" }}
  search={<SearchBar label="Buscar" categories={categories} submitLabel="Buscar" />}
  actions={<CartLink count={0} />}
  navLabel="Categorías"
  navItems={categories}
  menuLabel="Menú"
/>

<PriceBlock
  price={formatCurrency(58300)}
  taxLabel="IVA incluido"
  points={formatPoints(583)}
  stock={{ label: "En stock", tone: "success" }}
/>

<ProductGallery
  images={product.images}
  label={product.name}
  thumbLabel={(index, alt) => \`\${index + 1}. \${alt}\`}
/>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Teclado y lectores">
          <List
            label="Notas de accesibilidad de los patrones de storefront"
            items={[
              "La búsqueda usa role=search, labels visibles para lectores y un botón real.",
              "La galería anuncia la imagen activa con aria-pressed; la principal lleva alt descriptivo.",
              "Precio, impuestos, puntos y stock siempre van con texto; el color refuerza.",
              "Las tarjetas y el ranking son enlaces reales con foco visible.",
              "El footer mantiene contraste AA sobre sumi y 12 px mínimo.",
              "JA/ES/EN comparten estructura; el texto largo no tiene alturas fijas.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
