import { KotenProvider, ToastProvider } from "@koten/ui";
import { storeCopy } from "./content";
import { useStorefrontLocale } from "./lib/use-storefront-locale";
import { ProductPage } from "./pages/product";

export function App() {
  const { locale, setLocale } = useStorefrontLocale();
  const copy = storeCopy[locale];

  return (
    <KotenProvider locale={locale}>
      <ToastProvider closeLabel={copy.toast.close} regionLabel={copy.toast.region}>
        <ProductPage locale={locale} onLocaleChange={setLocale} />
      </ToastProvider>
    </KotenProvider>
  );
}
