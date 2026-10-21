# Koten UI production image (D-043).
#
# One image builds the three Vite apps and serves them from one nginx
# container on three ports:
#   3000  catalog / documentation  -> /
#   3001  storefront HIKARI        -> /demos/store
#   3002  ERP KURA                 -> /demos/erp

# syntax=docker/dockerfile:1

FROM oven/bun:1.4.3 AS build
WORKDIR /app

# Install from the lockfile before copying the source so the dependency layer
# is cached across builds.
COPY package.json bun.lock tsconfig.base.json biome.json ./
COPY packages/ui/package.json packages/ui/
COPY apps/catalog/package.json apps/catalog/
COPY apps/storefront/package.json apps/storefront/
COPY apps/erp/package.json apps/erp/

RUN bun install --frozen-lockfile

COPY . .

# Public origin used by the catalog links and the shadcn registry. Empty keeps
# the production default (https://koten.codehive.com.co).
ARG VITE_SITE_URL=
ENV VITE_SITE_URL=${VITE_SITE_URL}

RUN bun run build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/apps/catalog/dist /usr/share/nginx/html
COPY --from=build /app/apps/storefront/dist /usr/share/nginx/html/demos/store
COPY --from=build /app/apps/erp/dist /usr/share/nginx/html/demos/erp

EXPOSE 3000 3001 3002

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:3000/healthz >/dev/null || exit 1
