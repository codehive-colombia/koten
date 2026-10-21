import { KotenProvider } from "@koten/ui";
import { Route, Routes } from "react-router";
import { CatalogLayout } from "./components/catalog-layout";
import { ScrollManager } from "./components/scroll-manager";
import { useCatalogView } from "./lib/use-catalog-view";
import { BadgePage } from "./pages/components/badge";
import { ButtonPage } from "./pages/components/button";
import { FormsPage } from "./pages/components/forms";
import { ComponentsIndexPage } from "./pages/components/index";
import { InputsPage } from "./pages/components/inputs";
import { PanelPage } from "./pages/components/panel";
import { SurfacesPage } from "./pages/components/surfaces";
import { NotFoundPage } from "./pages/not-found";
import { OverviewPage } from "./pages/overview";
import { TokensColorPage } from "./pages/tokens/color";
import { TokensDensityPage } from "./pages/tokens/density";
import { TokensFormatPage } from "./pages/tokens/format";
import { TokensIndexPage } from "./pages/tokens/index";
import { TokensShapePage } from "./pages/tokens/shape";
import { TokensSpacingPage } from "./pages/tokens/spacing";
import { TokensThemesPage } from "./pages/tokens/themes";
import { TokensTypographyPage } from "./pages/tokens/typography";

export function App() {
  const view = useCatalogView();

  return (
    <KotenProvider locale={view.locale}>
      <ScrollManager />
      <CatalogLayout view={view}>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CatalogLayout>
    </KotenProvider>
  );
}
