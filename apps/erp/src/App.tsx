import {
  AppShell,
  Hanko,
  IconButton,
  type KotenLocale,
  KotenProvider,
  SideNav,
  ToastProvider,
  ToggleGroup,
  TopBar,
} from "@koten/ui";
import { Bell, Search } from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router";
import { erpCopy, lowStockProducts, openOrders } from "./data";
import type { ErpCopy } from "./data/copy";
import { useErpLocale } from "./lib/use-erp-locale";
import { DashboardPage } from "./pages/dashboard";
import { ModulePage } from "./pages/module";
import { NotFoundPage } from "./pages/not-found";
import { OrderFormPage } from "./pages/order-form";
import { OrdersPage } from "./pages/orders";

function sectionLabel(copy: ErpCopy, pathname: string): string {
  if (pathname === "/") {
    return copy.shell.nav.dashboard;
  }
  if (pathname.startsWith("/orders")) {
    return copy.shell.nav.orders;
  }
  if (pathname.startsWith("/products")) {
    return copy.shell.nav.products;
  }
  if (pathname.startsWith("/inventory")) {
    return copy.shell.nav.inventory;
  }
  if (pathname.startsWith("/customers")) {
    return copy.shell.nav.customers;
  }
  if (pathname.startsWith("/reports")) {
    return copy.shell.nav.reports;
  }
  if (pathname.startsWith("/settings")) {
    return copy.shell.nav.settings;
  }

  return copy.shell.nav.dashboard;
}

function ErpShell({
  copy,
  locale,
  onLocaleChange,
  children,
}: {
  copy: ErpCopy;
  locale: KotenLocale;
  onLocaleChange: (locale: KotenLocale) => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [query, setQuery] = useState("");
  const currentSection = sectionLabel(copy, pathname);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.get("lang") !== locale) {
      url.searchParams.set("lang", locale);
      window.history.replaceState(null, "", `${pathname}${url.search}${url.hash}`);
    }
  }, [locale, pathname]);

  const groups = [
    {
      id: "operations",
      label: copy.shell.groups.operations,
      items: [
        {
          id: "dashboard",
          label: copy.shell.nav.dashboard,
          href: "/",
          active: pathname === "/",
        },
        {
          id: "orders",
          label: copy.shell.nav.orders,
          href: "/orders",
          active: pathname.startsWith("/orders"),
          count: openOrders.length,
        },
      ],
    },
    {
      id: "master",
      label: copy.shell.groups.master,
      items: [
        {
          id: "products",
          label: copy.shell.nav.products,
          href: "/products",
          active: pathname === "/products",
        },
        {
          id: "inventory",
          label: copy.shell.nav.inventory,
          href: "/inventory",
          active: pathname === "/inventory",
          count: lowStockProducts.length,
        },
        {
          id: "customers",
          label: copy.shell.nav.customers,
          href: "/customers",
          active: pathname === "/customers",
        },
        {
          id: "reports",
          label: copy.shell.nav.reports,
          href: "/reports",
          active: pathname === "/reports",
        },
      ],
    },
    {
      id: "admin",
      label: copy.shell.groups.admin,
      items: [
        {
          id: "settings",
          label: copy.shell.nav.settings,
          href: "/settings",
          active: pathname === "/settings",
        },
      ],
    },
  ];

  const handleNavigate = (href: string) => {
    menuRef.current?.removeAttribute("open");
    navigate(href);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();

    if (value) {
      navigate(`/orders?q=${encodeURIComponent(value)}`);
      setQuery("");
    }
  };

  return (
    <AppShell
      skipLabel={copy.skip}
      sidebarLabel={copy.shell.sidebarLabel}
      brand={
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 text-ink no-underline"
          aria-label={`${copy.brand.jp} ${copy.brand.name} ${copy.brand.product}`}
        >
          <Hanko size="sm">{copy.brand.jp}</Hanko>{" "}
          <span className="font-serif text-base font-semibold">{copy.brand.name}</span>{" "}
          <span className="ms-auto text-2xs text-faint">{copy.brand.product}</span>
        </Link>
      }
      sidebar={
        <SideNav
          label={copy.shell.sidebarLabel}
          groups={groups}
          onNavigate={handleNavigate}
          footer={<p className="px-2 text-2xs text-faint">{copy.shell.version}</p>}
        />
      }
      topbar={
        <TopBar
          left={
            <div className="relative flex min-w-0 items-center gap-2">
              <details ref={menuRef} className="lg:hidden">
                <summary className="cursor-pointer border border-rule-strong bg-surface px-2 py-1 text-2xs font-semibold marker:text-primary">
                  {copy.shell.topbar.menu}
                </summary>
                <div className="absolute start-0 top-full z-40 mt-1 w-64 border border-rule bg-surface">
                  <SideNav
                    label={copy.shell.sidebarLabel}
                    groups={groups}
                    onNavigate={handleNavigate}
                  />
                </div>
              </details>
              <span className="min-w-0 truncate text-2xs text-muted">
                {copy.brand.name} / <span className="font-semibold text-ink">{currentSection}</span>
              </span>
            </div>
          }
          search={
            <search aria-label={copy.shell.topbar.search} className="min-w-0">
              <form
                onSubmit={handleSearch}
                className="flex min-w-0 items-center border border-rule-strong bg-surface"
              >
                <label htmlFor="erp-global-search" className="sr-only">
                  {copy.shell.topbar.search}
                </label>
                <input
                  id="erp-global-search"
                  type="search"
                  value={query}
                  placeholder={copy.shell.topbar.searchPlaceholder}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-[var(--koten-control-h)] w-full min-w-0 border-0 bg-transparent px-2 text-xs text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-1"
                />
                <button
                  type="submit"
                  aria-label={copy.shell.topbar.search}
                  className="grid h-[var(--koten-control-h)] w-8 shrink-0 place-items-center border-s border-rule text-muted hover:bg-tint hover:text-ink"
                >
                  <Search className="size-3.5" aria-hidden="true" />
                </button>
              </form>
            </search>
          }
          actions={
            <>
              <ToggleGroup
                label={copy.shell.language}
                value={[locale]}
                onValueChange={(next) => {
                  const value = next[0];

                  if (value) {
                    onLocaleChange(value as KotenLocale);
                  }
                }}
                items={[
                  { value: "es", label: "ES" },
                  { value: "ja", label: "日本語" },
                  { value: "en", label: "EN" },
                ]}
              />
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                label={copy.shell.topbar.notifications}
              >
                <span className="relative">
                  <Bell className="size-4" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute -end-1 -top-1 size-1.5 rounded-full bg-danger"
                  />
                </span>
              </IconButton>
              <span className="hidden items-center gap-1.5 sm:flex">
                <span className="grid size-6 place-items-center rounded-full border border-rule-strong bg-tint text-2xs">
                  {copy.brand.jp}
                </span>
                <span className="text-2xs text-muted">{copy.shell.topbar.account}</span>
              </span>
            </>
          }
        />
      }
    >
      {children}
    </AppShell>
  );
}

export function ErpApp() {
  const { locale, setLocale } = useErpLocale();
  const copy = erpCopy[locale];
  const modules = [
    { path: "/products", title: copy.shell.nav.products },
    { path: "/inventory", title: copy.shell.nav.inventory },
    { path: "/customers", title: copy.shell.nav.customers },
    { path: "/reports", title: copy.shell.nav.reports },
    { path: "/settings", title: copy.shell.nav.settings },
  ];

  useEffect(() => {
    document.title = copy.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.meta.description);
  }, [copy.meta.description, copy.meta.title]);

  return (
    <KotenProvider locale={locale}>
      <ToastProvider closeLabel={copy.toast.close} regionLabel={copy.toast.region}>
        <ErpShell copy={copy} locale={locale} onLocaleChange={setLocale}>
          <Routes>
            <Route path="/" element={<DashboardPage copy={copy} locale={locale} />} />
            <Route path="/orders" element={<OrdersPage copy={copy} locale={locale} />} />
            <Route path="/orders/new" element={<OrderFormPage copy={copy} locale={locale} />} />
            {modules.map((module) => (
              <Route
                key={module.path}
                path={module.path}
                element={<ModulePage copy={copy} title={module.title} />}
              />
            ))}
            <Route path="*" element={<NotFoundPage copy={copy} />} />
          </Routes>
        </ErpShell>
      </ToastProvider>
    </KotenProvider>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ErpApp />
    </BrowserRouter>
  );
}
