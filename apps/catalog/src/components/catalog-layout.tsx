import { cn, type KotenLocale, useKoten, useKotenFormatters } from "@koten/ui";
import { type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";
import {
  type CatalogNavItem,
  densityLabels,
  internalNavItems,
  navGroups,
  pageLabel,
  shellLabels,
} from "../data/catalog";
import { themes } from "../data/tokens";
import { syncViewToUrl, type useCatalogView } from "../lib/use-catalog-view";
import { DensityToggle, LocaleToggle, ThemeToggle } from "./view-toggles";

type CatalogViewState = ReturnType<typeof useCatalogView>;

function CatalogNav({
  locale,
  onNavigate,
}: {
  locale: KotenLocale;
  onNavigate?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  const labels = shellLabels[locale];

  return (
    <nav aria-label={labels.navLabel} className="space-y-[calc(var(--koten-gap)*1.5)]">
      {navGroups.map((group) => (
        <div key={group.id}>
          <h2 className="px-[var(--koten-panel-p)] text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
            {group.label[locale]}
          </h2>
          <ul className="mt-1 space-y-px">
            {group.items.map((item) => (
              <li key={item.path}>
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[var(--koten-control-h)] items-center justify-between gap-2 border-s-2 border-transparent px-[var(--koten-panel-p)] text-xs text-muted no-underline transition-colors hover:bg-tint hover:text-ink"
                  >
                    <span>{item.label[locale]}</span>
                    <span aria-hidden="true" className="text-faint">
                      ↗
                    </span>
                  </a>
                ) : (
                  <NavItemLink item={item} locale={locale} onNavigate={onNavigate} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function NavItemLink({
  item,
  locale,
  onNavigate,
}: {
  item: CatalogNavItem;
  locale: KotenLocale;
  onNavigate?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <NavLink
      to={item.path}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex min-h-[var(--koten-control-h)] items-center border-s-2 px-[var(--koten-panel-p)] text-xs no-underline transition-colors",
          isActive
            ? "border-primary bg-selection font-semibold text-primary"
            : "border-transparent text-muted hover:bg-tint hover:text-ink",
        )
      }
    >
      {item.label[locale]}
    </NavLink>
  );
}

function LocalePreview({ locale }: { locale: KotenLocale }) {
  const { labels } = useKoten();
  const formatters = useKotenFormatters();

  return (
    <div className="mt-[calc(var(--koten-gap)*2)] border border-rule bg-surface p-[var(--koten-panel-p)]">
      <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
        {shellLabels[locale].preview}
      </p>
      <p className="mt-1 font-serif text-lg leading-tight">{labels.close}</p>
      <p className="mt-1 text-xs font-semibold tabular-nums text-primary">
        {formatters.formatCurrency(128000)}
      </p>
      <p className="text-2xs text-muted">
        {formatters.formatDate(Date.UTC(2026, 9, 21, 12), { timeZone: "UTC" })}
      </p>
    </div>
  );
}

function Pager({ locale, pathname }: { locale: KotenLocale; pathname: string }) {
  const { labels } = useKoten();
  const index = internalNavItems.findIndex((item) => item.path === pathname);

  if (index === -1) {
    return null;
  }

  const previous = internalNavItems[index - 1];
  const next = internalNavItems[index + 1];

  return (
    <nav
      aria-label={shellLabels[locale].pagerLabel}
      lang={locale}
      className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] border-t border-rule pt-[var(--koten-panel-p)] sm:grid-cols-2"
    >
      {previous ? (
        <NavLink
          to={previous.path}
          className="flex flex-col gap-0.5 border border-rule bg-surface p-[var(--koten-panel-p)] no-underline transition-colors hover:bg-tint"
        >
          <span className="text-2xs text-faint">← {labels.previous}</span>
          <span className="text-xs font-semibold text-ink">{previous.label[locale]}</span>
        </NavLink>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <NavLink
          to={next.path}
          className="flex flex-col gap-0.5 border border-rule bg-surface p-[var(--koten-panel-p)] text-right no-underline transition-colors hover:bg-tint"
        >
          <span className="text-2xs text-faint">{labels.next} →</span>
          <span className="text-xs font-semibold text-ink">{next.label[locale]}</span>
        </NavLink>
      ) : null}
    </nav>
  );
}

export function CatalogLayout({ view, children }: { view: CatalogViewState; children: ReactNode }) {
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const labels = shellLabels[view.locale];
  const themeLabel = themes.find((theme) => theme.id === view.theme)?.label ?? view.theme;
  const densityLabel = densityLabels[view.density][view.locale];
  const densityOptions = {
    compact: densityLabels.compact[view.locale],
    default: densityLabels.default[view.locale],
    comfortable: densityLabels.comfortable[view.locale],
  };

  useEffect(() => {
    if (pathname) {
      syncViewToUrl({
        theme: view.theme,
        density: view.density,
        locale: view.locale,
      });
    }
  }, [pathname, view.theme, view.density, view.locale]);

  useEffect(() => {
    if (pathname) {
      menuRef.current?.removeAttribute("open");
    }
  }, [pathname]);

  useEffect(() => {
    const label = pageLabel(pathname, view.locale);
    document.title = label ? `${label} · Koten UI` : "Koten UI";
  }, [pathname, view.locale]);

  const closeMobileMenu = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#contenido"
        lang={view.locale}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-primary focus:bg-surface focus:px-3 focus:py-2 focus:text-xs focus:font-semibold"
      >
        {labels.skipToContent}
      </a>

      <header className="border-b border-rule bg-surface">
        <div className="koten-container flex flex-wrap items-center justify-between gap-[var(--koten-gap)] py-[var(--koten-panel-p)]">
          <NavLink to="/" className="flex items-center gap-3 text-ink no-underline">
            <span className="grid size-9 place-items-center border-2 border-primary font-serif text-lg leading-none text-primary">
              典
            </span>
            <span>
              <span className="block text-xs font-semibold">Koten UI</span>
              <span className="block text-2xs text-faint">{labels.catalog} · 古典</span>
            </span>
          </NavLink>
          <div
            lang={view.locale}
            className="flex flex-wrap items-center gap-x-[var(--koten-gap)] gap-y-2"
          >
            <LocaleToggle value={view.locale} label={labels.language} onChange={view.setLocale} />
            <ThemeToggle value={view.theme} label={labels.theme} onChange={view.setTheme} />
            <DensityToggle
              value={view.density}
              label={labels.density}
              optionLabels={densityOptions}
              onChange={view.setDensity}
            />
          </div>
        </div>
        <div className="border-t border-rule bg-tint">
          <div
            lang={view.locale}
            className="koten-container flex flex-wrap items-center gap-x-4 gap-y-1 py-1 text-2xs text-muted"
          >
            <span className="font-semibold">{labels.phase}</span>
            <span aria-hidden="true" className="text-rule-strong">
              /
            </span>
            <span>
              {themeLabel} · {labels.density} {densityLabel}
            </span>
            <span aria-hidden="true" className="text-rule-strong">
              /
            </span>
            <span>
              {labels.viewState} · {labels.docsLanguage}
            </span>
          </div>
        </div>
      </header>

      <div className="koten-container grid gap-[calc(var(--koten-gap)*2)] py-[calc(var(--koten-gap)*2)] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside lang={view.locale} className="hidden min-w-0 lg:block">
          <div className="sticky top-[var(--koten-gap)] max-h-[calc(100dvh-2*var(--koten-gap))] overflow-y-auto pe-1 [scrollbar-color:var(--koten-rule-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-rule-strong [&::-webkit-scrollbar-track]:bg-transparent">
            <CatalogNav locale={view.locale} />
            <LocalePreview locale={view.locale} />
          </div>
        </aside>

        <main id="contenido" className="min-w-0 max-w-[900px]">
          <details
            ref={menuRef}
            lang={view.locale}
            className="mb-[var(--koten-gap)] border border-rule bg-surface lg:hidden"
          >
            <summary className="cursor-pointer px-[var(--koten-panel-p)] py-2 text-xs font-semibold marker:text-primary">
              {labels.menu}
              <span className="ms-2 font-normal text-faint">
                · {pageLabel(pathname, view.locale) ?? pathname}
              </span>
            </summary>
            <div className="border-t border-rule p-[var(--koten-panel-p)]">
              <CatalogNav locale={view.locale} onNavigate={closeMobileMenu} />
            </div>
          </details>

          {children}
          <Pager locale={view.locale} pathname={pathname} />
        </main>
      </div>

      <footer className="border-t border-rule bg-surface">
        <div
          lang={view.locale}
          className="koten-container flex flex-wrap items-baseline justify-between gap-2 py-[var(--koten-panel-p)] text-2xs text-faint"
        >
          <p>Koten UI · 古典 · 2026</p>
          <p>{labels.docsLanguage}</p>
        </div>
      </footer>
    </div>
  );
}
