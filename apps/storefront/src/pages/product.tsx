import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  CampaignBanner,
  cn,
  Footer,
  IconButton,
  type KotenLocale,
  NoticeList,
  NumberField,
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTitle,
  PriceBlock,
  ProductCard,
  ProductGallery,
  RankedList,
  ReviewSummary,
  SearchBar,
  SectionHeader,
  SpecTable,
  StoreHeader,
  ToggleGroup,
  useKotenFormatters,
  useToast,
} from "@koten/ui";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  campaign,
  notices,
  pick,
  product,
  ranking,
  relatedProducts,
  reviewDistribution,
  reviews,
  storeCopy,
} from "../content";

export type ProductPageProps = {
  locale: KotenLocale;
  onLocaleChange: (locale: KotenLocale) => void;
};

export function ProductPage({ locale, onLocaleChange }: ProductPageProps) {
  const copy = storeCopy[locale];
  const formatters = useKotenFormatters();
  const toast = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "charcoal");
  const [kitId, setKitId] = useState(product.kits[0]?.id ?? "body");

  const selectedKit = product.kits.find((kit) => kit.id === kitId) ?? product.kits[0];
  const price = product.price + (selectedKit?.priceDelta ?? 0);
  const points = Math.round(price * product.pointsRate);

  useEffect(() => {
    document.title = copy.meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", copy.meta.description);
  }, [copy.meta.description, copy.meta.title]);

  const handleAddToCart = () => {
    setCartCount((current) => current + quantity);
    toast.add({
      title: copy.buy.addedTitle,
      description: copy.buy.addedDescription(product.name, quantity),
      type: "success",
    });
  };

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:border focus:border-primary focus:bg-surface focus:px-3 focus:py-2 focus:text-xs focus:font-semibold"
      >
        {copy.skip}
      </a>

      <StoreHeader
        brand={{
          name: "HIKARI",
          jp: "光",
          href: "/",
          label: copy.header.brandLabel,
        }}
        utility={{
          left: copy.utility.left,
          right: (
            <span className="text-inverse-fg/80">
              {copy.utility.right} · <span className="tabular-nums">2026.10.21</span>
            </span>
          ),
        }}
        search={
          <SearchBar
            label={copy.header.searchLabel}
            placeholder={copy.header.searchPlaceholder}
            categoriesLabel={copy.header.searchLabel}
            categories={[
              { value: "all", label: copy.header.allCategories },
              ...copy.categories.map((category) => ({
                value: category.id,
                label: category.label,
              })),
            ]}
            defaultCategory="cameras"
            submitLabel={copy.header.searchButton}
          />
        }
        actions={
          <>
            <a
              href="#cuenta"
              className="hidden text-muted underline-offset-2 hover:text-link hover:underline sm:inline"
            >
              {copy.header.account}
            </a>
            <a
              href="#carrito"
              className="inline-flex h-[var(--koten-control-h)] items-center gap-1.5 border border-rule-strong bg-surface px-2 text-2xs font-semibold text-ink no-underline hover:bg-tint"
            >
              <ShoppingCart className="size-3.5" aria-hidden="true" />
              <span className="tabular-nums">{copy.header.cart(cartCount)}</span>
            </a>
            <ToggleGroup
              label={copy.utility.language}
              value={[locale]}
              onValueChange={(next) => {
                const value = next[0];
                if (value) {
                  onLocaleChange(value as KotenLocale);
                }
              }}
              items={[
                { value: "ja", label: "日本語" },
                { value: "es", label: "ES" },
                { value: "en", label: "EN" },
              ]}
            />
          </>
        }
        navLabel={copy.header.navLabel}
        navItems={copy.categories.map((category) => ({
          id: category.id,
          label: category.label,
          href: "#",
          active: category.id === "cameras",
        }))}
        menuLabel={copy.header.menu}
      />

      <div className="koten-container py-3">
        <Breadcrumb
          label={copy.breadcrumb.label}
          items={[
            { label: copy.breadcrumb.home, href: "#inicio" },
            { label: copy.breadcrumb.cameras, href: "#camaras" },
            { label: product.name },
          ]}
        />

        <div className="mt-3 grid gap-[var(--koten-gap)] lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[180px_minmax(0,1fr)_300px]">
          <aside className="hidden min-w-0 xl:block" aria-label={copy.header.navLabel}>
            <nav className="border border-rule bg-surface">
              <h2 className="border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5 text-2xs font-semibold text-muted">
                {copy.header.navLabel}
              </h2>
              <ul className="p-1">
                {copy.categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href="#contenido"
                      aria-current={category.id === "cameras" ? "page" : undefined}
                      className={cn(
                        "flex min-h-[var(--koten-row-h)] items-center border-s-2 px-2 text-xs no-underline transition-colors",
                        category.id === "cameras"
                          ? "border-primary bg-selection font-semibold text-primary-strong"
                          : "border-transparent text-muted hover:bg-tint hover:text-ink",
                      )}
                    >
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-2 border border-dashed border-rule-strong p-2 text-2xs leading-relaxed text-faint">
              {copy.sections.campaign.deadline}{" "}
              {formatters.formatDate(campaign.deadline, {
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}{" "}
              · {pick(campaign.eyebrow, locale)}
            </p>
          </aside>

          <main id="contenido" className="grid min-w-0 gap-[var(--koten-gap)]">
            <div className="grid min-w-0 gap-[var(--koten-gap)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
              <section aria-label={product.name} className="min-w-0 border border-rule bg-surface">
                <div className="flex items-center justify-between border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5">
                  <h2 className="text-xs font-semibold">{product.name}</h2>
                  <Badge tone="new" appearance="solid">
                    {copy.buy.newBadge}
                  </Badge>
                </div>
                <div className="p-[var(--koten-panel-p)]">
                  <ProductGallery
                    images={product.images.map((image) => ({
                      src: image.src,
                      alt: pick(image.alt, locale),
                      width: image.width,
                      height: image.height,
                    }))}
                    label={product.name}
                    thumbLabel={(index, alt) => `${index + 1}. ${alt}`}
                  />
                  <p className="mt-2 text-2xs leading-relaxed text-muted">
                    {pick(product.shortDescription, locale)}
                  </p>
                </div>
              </section>

              <section className="min-w-0 border border-rule bg-surface">
                <div className="border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5">
                  <h2 className="text-xs font-semibold">{copy.buy.panelTitle}</h2>
                </div>
                <div className="p-[var(--koten-panel-p)]">
                  <p className="text-2xs text-muted">{copy.buy.brandLine}</p>
                  <h1 className="mt-0.5 font-serif text-2xl font-semibold leading-tight">
                    {product.name}
                  </h1>
                  <p className="mt-1 text-xs text-muted">{copy.buy.tagline}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-2xs">
                    <span aria-hidden="true" className="text-primary">
                      {"★".repeat(Math.round(product.rating))}
                    </span>
                    <span className="sr-only">{copy.buy.rating(product.rating)}</span>
                    <span className="tabular-nums text-ink">
                      {formatters.formatNumber(product.rating, {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}
                    </span>
                    <a
                      href="#resenas"
                      className="text-link underline underline-offset-2 hover:decoration-link"
                    >
                      {copy.buy.reviews(product.reviewCount)}
                    </a>
                  </p>

                  <PriceBlock
                    className="mt-3"
                    price={formatters.formatCurrency(price, { maximumFractionDigits: 0 })}
                    taxLabel={copy.buy.taxIncluded}
                    listPrice={
                      product.listPrice > price
                        ? formatters.formatCurrency(product.listPrice, { maximumFractionDigits: 0 })
                        : undefined
                    }
                    listPriceLabel={copy.buy.listPriceLabel}
                    points={copy.buy.points(points)}
                    stock={{ label: copy.buy.stock, tone: "success" }}
                    note={copy.buy.note}
                  />

                  <fieldset className="mt-4">
                    <legend className="text-xs font-semibold">{copy.buy.colorLabel}</legend>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {product.colors.map((color) => {
                        const active = color.id === colorId;

                        return (
                          <label
                            key={color.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-1.5 border px-2 py-1 text-2xs transition-colors",
                              active
                                ? "border-primary bg-selection font-semibold text-ink"
                                : "border-rule-strong bg-surface text-muted hover:bg-tint",
                            )}
                          >
                            <input
                              type="radio"
                              name="color"
                              value={color.id}
                              checked={active}
                              onChange={() => setColorId(color.id)}
                              className="size-3 accent-[var(--koten-primary)]"
                            />
                            <span
                              aria-hidden="true"
                              className="size-3 border border-rule-strong"
                              style={{ background: color.swatch }}
                            />
                            {pick(color.label, locale)}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="mt-3">
                    <legend className="text-xs font-semibold">{copy.buy.kitLabel}</legend>
                    <div className="mt-1 grid gap-1.5">
                      {product.kits.map((kit) => {
                        const active = kit.id === kitId;

                        return (
                          <label
                            key={kit.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 border px-2 py-1.5 text-2xs transition-colors",
                              active
                                ? "border-primary bg-selection font-semibold text-ink"
                                : "border-rule-strong bg-surface text-muted hover:bg-tint",
                            )}
                          >
                            <input
                              type="radio"
                              name="kit"
                              value={kit.id}
                              checked={active}
                              onChange={() => setKitId(kit.id)}
                              className="size-3 accent-[var(--koten-primary)]"
                            />
                            <span className="min-w-0 flex-1">{pick(kit.label, locale)}</span>
                            {kit.priceDelta > 0 ? (
                              <span className="shrink-0 tabular-nums text-primary">
                                +
                                {formatters.formatCurrency(kit.priceDelta, {
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            ) : null}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-3 grid gap-2">
                    <NumberField
                      label={copy.buy.quantityLabel}
                      value={quantity}
                      min={1}
                      max={5}
                      onValueChange={(next) => setQuantity(next ?? 1)}
                      decrementLabel={copy.buy.decrement}
                      incrementLabel={copy.buy.increment}
                      className="w-fit"
                    />
                    <div className="flex min-w-0 gap-1.5">
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="min-w-0 flex-1 whitespace-nowrap"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="size-4" aria-hidden="true" />
                        {copy.buy.addToCart}
                      </Button>
                      <IconButton
                        type="button"
                        variant="outline"
                        size="lg"
                        label={copy.buy.favorite}
                      >
                        <Heart className="size-4" aria-hidden="true" />
                      </IconButton>
                    </div>
                    {quantity >= 5 ? <Alert tone="warning">{copy.buy.limitNote}</Alert> : null}
                  </div>

                  <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-rule pt-2 text-2xs">
                    <dt className="text-muted">{copy.buy.deliveryLabel}</dt>
                    <dd className="text-end font-semibold text-ink">{copy.buy.deliveryValue}</dd>
                    <dt className="text-muted">{copy.buy.shippingLabel}</dt>
                    <dd className="text-end text-success">{copy.buy.shippingValue}</dd>
                    <dt className="text-muted">{copy.buy.warrantyLabel}</dt>
                    <dd className="text-end text-ink">{copy.buy.warrantyValue}</dd>
                  </dl>
                </div>
              </section>
            </div>

            <Panel>
              <PanelHeader>
                <PanelTitle as="h2">{copy.sections.description.title}</PanelTitle>
                <PanelActions>
                  <span className="text-2xs text-faint">{copy.sections.description.meta}</span>
                </PanelActions>
              </PanelHeader>
              <PanelBody>
                <div className="grid gap-[var(--koten-gap)] lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="min-w-0 space-y-2 text-xs leading-relaxed text-muted">
                    {pick(product.longDescription, locale).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <ul className="min-w-0 divide-y divide-rule border-y border-rule">
                    {pick(product.highlights, locale).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex min-h-[var(--koten-row-h)] items-center gap-2 text-2xs text-ink"
                      >
                        <span aria-hidden="true" className="size-1.5 shrink-0 bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelHeader>
                <PanelTitle as="h2">{copy.sections.specs.title}</PanelTitle>
                <PanelActions>
                  <span className="text-2xs text-faint">{copy.sections.specs.meta}</span>
                </PanelActions>
              </PanelHeader>
              <PanelBody>
                <SpecTable
                  caption={copy.sections.specs.caption}
                  groups={product.specs.map((group) => ({
                    id: group.id,
                    title: pick(group.title, locale),
                    rows: group.rows.map((row) => ({
                      id: row.id,
                      label: pick(row.label, locale),
                      value: pick(row.value, locale),
                    })),
                  }))}
                />
              </PanelBody>
            </Panel>

            <section id="resenas" className="min-w-0">
              <SectionHeader
                title={copy.sections.reviews.title}
                meta={copy.sections.reviews.meta}
                actions={
                  <span className="text-2xs text-faint">
                    {copy.buy.reviews(product.reviewCount)}
                  </span>
                }
              />
              <div className="mt-[var(--koten-gap)]">
                <ReviewSummary
                  rating={product.rating}
                  count={product.reviewCount}
                  ratingLabel={copy.reviews.rating}
                  countLabel={copy.reviews.count}
                  distributionLabel={copy.reviews.distribution}
                  distribution={reviewDistribution}
                  verifiedLabel={copy.reviews.verified}
                  emptyLabel={copy.reviews.empty}
                  reviews={reviews.map((review) => ({
                    id: review.id,
                    author: review.author,
                    date: formatters.formatDate(review.date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    }),
                    rating: review.rating,
                    title: pick(review.title, locale),
                    body: pick(review.body, locale),
                    verified: review.verified,
                  }))}
                />
              </div>
            </section>

            <section id="relacionados" aria-label={copy.sections.related.title} className="min-w-0">
              <SectionHeader
                title={copy.sections.related.title}
                meta={copy.sections.related.meta}
                as="h2"
              />
              <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] sm:grid-cols-2 xl:grid-cols-4">
                {relatedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    href="#contenido"
                    title={pick(item.name, locale)}
                    image={{
                      src: item.image,
                      alt: pick(item.name, locale),
                      width: 800,
                      height: 600,
                    }}
                    price={formatters.formatCurrency(item.price, { maximumFractionDigits: 0 })}
                    points={copy.buy.points(item.points)}
                    meta={pick(item.meta, locale)}
                    badges={
                      item.badge ? (
                        <Badge tone={item.badge.tone} appearance="solid">
                          {pick(item.badge.label, locale)}
                        </Badge>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            </section>
          </main>

          <aside
            className="min-w-0 space-y-[var(--koten-gap)]"
            aria-label={copy.sections.notices.title}
          >
            <Panel>
              <PanelHeader>
                <PanelTitle as="h2">{copy.sections.notices.title}</PanelTitle>
                <PanelActions>
                  <span className="text-2xs text-faint">{copy.sections.notices.meta}</span>
                </PanelActions>
              </PanelHeader>
              <PanelBody>
                <NoticeList
                  label={copy.sections.notices.title}
                  emptyLabel={copy.sections.notices.empty}
                  moreLabel={copy.sections.notices.more}
                  moreHref="#avisos"
                  notices={notices.map((notice) => ({
                    id: notice.id,
                    date: formatters.formatDate(notice.date, {
                      month: "numeric",
                      day: "numeric",
                      timeZone: "UTC",
                    }),
                    dateTime: notice.date,
                    title: pick(notice.title, locale),
                    href: "#avisos",
                  }))}
                />
              </PanelBody>
            </Panel>

            <Panel>
              <PanelHeader>
                <PanelTitle as="h2">{copy.sections.ranking.title}</PanelTitle>
                <PanelActions>
                  <span className="text-2xs text-faint">{copy.sections.ranking.meta}</span>
                </PanelActions>
              </PanelHeader>
              <PanelBody>
                <RankedList
                  label={copy.sections.ranking.title}
                  items={ranking.map((item) => ({
                    id: item.id,
                    rank: item.rank,
                    title: pick(item.name, locale),
                    href: "#",
                    price: formatters.formatCurrency(item.price, { maximumFractionDigits: 0 }),
                    meta: pick(item.meta, locale),
                    image: { src: item.image, alt: pick(item.name, locale) },
                  }))}
                />
              </PanelBody>
            </Panel>

            <CampaignBanner
              layout="card"
              tone="sale"
              eyebrow={pick(campaign.eyebrow, locale)}
              title={pick(campaign.title, locale)}
              description={pick(campaign.description, locale)}
              deadline={`${copy.sections.campaign.deadline} ${formatters.formatDate(
                campaign.deadline,
                {
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                },
              )}`}
              cta={{ label: pick(campaign.cta, locale), href: campaign.href }}
            />

            <Panel tone="tinted">
              <PanelBody>
                <p className="text-2xs leading-relaxed text-muted">{copy.footer.note}</p>
              </PanelBody>
            </Panel>
          </aside>
        </div>
      </div>

      <Footer
        navLabel={copy.footer.navLabel}
        columns={copy.footer.columns}
        company={copy.footer.company}
        address={copy.footer.address}
        legal={copy.footer.legal}
        note={copy.footer.note}
      />
    </div>
  );
}
