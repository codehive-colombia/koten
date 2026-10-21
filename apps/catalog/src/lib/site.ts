/**
 * Public URLs used by the catalog (D-043).
 *
 * Production serves the catalog at `/`, the storefront at `/demos/store` and
 * the ERP at `/demos/erp` under one domain. Vite exposes `DEV` at build time,
 * so local development keeps its three ports while the deployed bundle points
 * at the production host. Every URL can be overridden with a `VITE_*`
 * environment variable at build time.
 */

const productionOrigin = "https://koten.codehive.com.co";

function readUrl(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim().replace(/\/+$/, "");

  return trimmed ? trimmed : fallback;
}

const origin = readUrl(
  import.meta.env.VITE_SITE_URL,
  import.meta.env.DEV ? "http://localhost:5173" : productionOrigin,
);

export const site = {
  origin,
  storefront: readUrl(
    import.meta.env.VITE_STOREFRONT_URL,
    import.meta.env.DEV ? "http://localhost:5174" : `${origin}/demos/store`,
  ),
  erp: readUrl(
    import.meta.env.VITE_ERP_URL,
    import.meta.env.DEV ? "http://localhost:5175" : `${origin}/demos/erp`,
  ),
  registry: readUrl(import.meta.env.VITE_REGISTRY_URL, `${origin}/r`),
} as const;

/** shadcn command for one registry item. */
export function registryCommand(item: string): string {
  return `npx shadcn@latest add ${site.registry}/${item}.json`;
}
