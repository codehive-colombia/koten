import { KotenProvider } from "@koten/ui";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { CatalogLayout } from "./components/catalog-layout";
import { ScrollManager } from "./components/scroll-manager";
import { useCatalogView } from "./lib/use-catalog-view";
import { OverviewPage } from "./pages/overview";

// Code splitting por ruta (F4-003): la portada viaja en el entry y cada página
// de documentación se descarga al navegar. Las páginas no comparten estado.
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
const ButtonPage = lazy(() =>
  import("./pages/components/button").then((module) => ({ default: module.ButtonPage })),
);
const PanelPage = lazy(() =>
  import("./pages/components/panel").then((module) => ({ default: module.PanelPage })),
);
const BadgePage = lazy(() =>
  import("./pages/components/badge").then((module) => ({ default: module.BadgePage })),
);
const FormsPage = lazy(() =>
  import("./pages/components/forms").then((module) => ({ default: module.FormsPage })),
);
const InputsPage = lazy(() =>
  import("./pages/components/inputs").then((module) => ({ default: module.InputsPage })),
);
const SurfacesPage = lazy(() =>
  import("./pages/components/surfaces").then((module) => ({ default: module.SurfacesPage })),
);
const FeedbackPage = lazy(() =>
  import("./pages/components/feedback").then((module) => ({ default: module.FeedbackPage })),
);
const NavigationPage = lazy(() =>
  import("./pages/components/navigation").then((module) => ({ default: module.NavigationPage })),
);
const OverlaysPage = lazy(() =>
  import("./pages/components/overlays").then((module) => ({ default: module.OverlaysPage })),
);
const DataPage = lazy(() =>
  import("./pages/components/data").then((module) => ({ default: module.DataPage })),
);
const ControlsPage = lazy(() =>
  import("./pages/components/controls").then((module) => ({ default: module.ControlsPage })),
);
const PatternsIndexPage = lazy(() =>
  import("./pages/patterns/index").then((module) => ({ default: module.PatternsIndexPage })),
);
const StorefrontPatternsPage = lazy(() =>
  import("./pages/patterns/storefront").then((module) => ({
    default: module.StorefrontPatternsPage,
  })),
);
const ErpPatternsPage = lazy(() =>
  import("./pages/patterns/erp").then((module) => ({ default: module.ErpPatternsPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/not-found").then((module) => ({ default: module.NotFoundPage })),
);

function RouteFallback() {
  // Reserva la altura de una página de documentación para que el pager no salte
  // cuando llega el chunk (CLS < 0.02, F4-003).
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
            <Route path="/tokens" element={<TokensIndexPage />} />
            <Route path="/tokens/color" element={<TokensColorPage />} />
            <Route path="/tokens/typography" element={<TokensTypographyPage />} />
            <Route path="/tokens/spacing" element={<TokensSpacingPage />} />
            <Route path="/tokens/shape" element={<TokensShapePage />} />
            <Route path="/tokens/density" element={<TokensDensityPage />} />
            <Route path="/tokens/themes" element={<TokensThemesPage />} />
            <Route path="/tokens/format" element={<TokensFormatPage />} />
            <Route path="/components" element={<ComponentsIndexPage />} />
            <Route path="/components/button" element={<ButtonPage />} />
            <Route path="/components/panel" element={<PanelPage />} />
            <Route path="/components/badge" element={<BadgePage />} />
            <Route path="/components/forms" element={<FormsPage />} />
            <Route path="/components/inputs" element={<InputsPage />} />
            <Route path="/components/surfaces" element={<SurfacesPage />} />
            <Route path="/components/feedback" element={<FeedbackPage />} />
            <Route path="/components/navigation" element={<NavigationPage />} />
            <Route path="/components/overlays" element={<OverlaysPage />} />
            <Route path="/components/data" element={<DataPage />} />
            <Route path="/components/controls" element={<ControlsPage />} />
            <Route path="/patterns" element={<PatternsIndexPage />} />
            <Route path="/patterns/storefront" element={<StorefrontPatternsPage />} />
            <Route path="/patterns/erp" element={<ErpPatternsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </CatalogLayout>
    </KotenProvider>
  );
}
