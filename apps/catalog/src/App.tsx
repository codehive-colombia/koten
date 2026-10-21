import { KotenProvider } from "@koten/ui";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { CatalogLayout } from "./components/catalog-layout";
import { ScrollManager } from "./components/scroll-manager";
import { useCatalogView } from "./lib/use-catalog-view";
import { OverviewPage } from "./pages/overview";

// Route-based code splitting (F4-003): the landing page ships in the entry and each
// documentation page loads on navigation. Pages do not share state.
const StartPage = lazy(() =>
  import("./pages/start").then((module) => ({ default: module.StartPage })),
);
const TokensIndexPage = lazy(() =>
  import("./pages/tokens/index").then((module) => ({ default: module.TokensIndexPage })),
);
const TokensColorPage = lazy(() =>
  import("./pages/tokens/color").then((module) => ({ default: module.TokensColorPage })),
);
const TokensTypographyPage = lazy(() =>
  import("./pages/tokens/typography").then((module) => ({ default: module.TokensTypographyPage })),
);
const TokensSpacingPage = lazy(() =>
  import("./pages/tokens/spacing").then((module) => ({ default: module.TokensSpacingPage })),
);
const TokensShapePage = lazy(() =>
  import("./pages/tokens/shape").then((module) => ({ default: module.TokensShapePage })),
);
const TokensDensityPage = lazy(() =>
  import("./pages/tokens/density").then((module) => ({ default: module.TokensDensityPage })),
);
const TokensThemesPage = lazy(() =>
  import("./pages/tokens/themes").then((module) => ({ default: module.TokensThemesPage })),
);
const TokensFormatPage = lazy(() =>
  import("./pages/tokens/format").then((module) => ({ default: module.TokensFormatPage })),
);
const ComponentsIndexPage = lazy(() =>
  import("./pages/components/index").then((module) => ({
    default: module.ComponentsIndexPage,
  })),
);
const PrimitivePage = lazy(() =>
  import("./pages/components/primitive").then((module) => ({
    default: module.PrimitivePage,
  })),
);
const BlocksIndexPage = lazy(() =>
  import("./pages/blocks/index").then((module) => ({
    default: module.BlocksIndexPage,
  })),
);
const BlockCategoryPage = lazy(() =>
  import("./pages/blocks/index").then((module) => ({
    default: module.BlockCategoryPage,
  })),
);
const BlockPage = lazy(() =>
  import("./pages/blocks/block").then((module) => ({
    default: module.BlockPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("./pages/not-found").then((module) => ({ default: module.NotFoundPage })),
);

function RouteFallback() {
  // Reserve the height of a documentation page so the pager does not jump
  // when the chunk arrives (CLS < 0.02, F4-003).
  return <div aria-busy="true" className="min-h-[1400px]" data-slot="route-fallback" />;
}

export function App() {
  const view = useCatalogView();

  return (
    <KotenProvider locale={view.locale}>
      <ScrollManager />
      <CatalogLayout view={view}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/tokens" element={<TokensIndexPage />} />
            <Route path="/tokens/color" element={<TokensColorPage />} />
            <Route path="/tokens/typography" element={<TokensTypographyPage />} />
            <Route path="/tokens/spacing" element={<TokensSpacingPage />} />
            <Route path="/tokens/shape" element={<TokensShapePage />} />
            <Route path="/tokens/density" element={<TokensDensityPage />} />
            <Route path="/tokens/themes" element={<TokensThemesPage />} />
            <Route path="/tokens/format" element={<TokensFormatPage />} />

            <Route path="/components" element={<ComponentsIndexPage />} />
            {/* Old grouped pages keep their deep links alive. */}
            <Route path="/components/forms" element={<Navigate to="/components/field" replace />} />
            <Route
              path="/components/inputs"
              element={<Navigate to="/components/select" replace />}
            />
            <Route
              path="/components/surfaces"
              element={<Navigate to="/components/section-header" replace />}
            />
            <Route
              path="/components/feedback"
              element={<Navigate to="/components/alert" replace />}
            />
            <Route
              path="/components/navigation"
              element={<Navigate to="/components/link" replace />}
            />
            <Route
              path="/components/overlays"
              element={<Navigate to="/components/dialog" replace />}
            />
            <Route path="/components/data" element={<Navigate to="/components/table" replace />} />
            <Route
              path="/components/controls"
              element={<Navigate to="/components/icon-button" replace />}
            />
            <Route
              path="/components/date"
              element={<Navigate to="/components/date-picker" replace />}
            />
            <Route
              path="/components/command"
              element={<Navigate to="/components/command-palette" replace />}
            />
            <Route path="/components/:slug" element={<PrimitivePage />} />

            <Route path="/blocks" element={<BlocksIndexPage />} />
            <Route path="/blocks/:category" element={<BlockCategoryPage />} />
            <Route path="/blocks/:category/:slug" element={<BlockPage />} />

            {/* Patterns became blocks (individual pages, grouped by category). */}
            <Route path="/patterns" element={<Navigate to="/blocks" replace />} />
            <Route
              path="/patterns/storefront"
              element={<Navigate to="/blocks/storefront" replace />}
            />
            <Route path="/patterns/erp" element={<Navigate to="/blocks/erp" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </CatalogLayout>
    </KotenProvider>
  );
}
