# Koten UI · 古典

Sistema de componentes React con la gramática del web japonés clásico: densidad informativa, marcos de 1 px, papel cálido, tipografía del sistema y jerarquía por reglas. **Chirashi** cubre comercio, **Daichō** backoffice, **Kanso** lectura y **Sumi** el modo oscuro.

> **Estado:** fases 0–5 cerradas, tag `v0.1.0-poc` y despliegue en <https://koten.codehive.com.co>. 46 componentes y 20 bloques documentados, demos HIKARI y KURA en ES/JA/EN, auditorías de accesibilidad y performance, registry shadcn, i18n personalizable y tres skills para agentes.
> **Fuente de verdad:** [ROADMAP.md](./ROADMAP.md).

## Documentación

| Documento | Para qué |
| --- | --- |
| [ROADMAP.md](./ROADMAP.md) | Fases, tareas, estado, dependencias y trazabilidad. |
| [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) | Alcance, referencias y criterios de éxito. |
| [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Gramática visual, tokens, componentes, i18n y accesibilidad. |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Decisiones con IDs estables. |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | Bitácora append-only y handoff. |
| [docs/RECIPES.md](./docs/RECIPES.md) | Recetas copiables de formulario, tabla, drawer, tarjeta e i18n. |
| [llms.txt](./llms.txt) | Índice de documentación para agentes. |
| [skills/](./skills) | Skills `koten-ui`, `koten-design-system` y `koten-design-language`. |
| [docs/qa/](./docs/qa/) | Capturas de QA visual por fecha. |
| [AGENTS.md](./AGENTS.md) | Protocolo para retomar el proyecto. |

## Principios

- Sencillez de medios, densidad de información.
- El marco es la unidad: panel, cabecera, regla, borde.
- El color señala; no decora.
- Tipografía del sistema y texto real, nunca texto en imágenes.
- Desktop primero, accesible por defecto, rápido por diseño.

## Stack

Bun workspaces · React 19 · TypeScript 7 strict · Vite 8 · Tailwind CSS v4 · Base UI · CVA · TanStack Table (solo ERP) · Lucide · React Router 7.18 · Vitest + Testing Library + axe-core · Chromium/CDP para auditorías · Biome.

Sin CSS-in-JS runtime, sin fuentes CJK completas, sin librería de charts, sin carousel ni date-picker pesado.

Versiones resueltas: Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5.

## Comandos

```bash
bun install
bun run dev        # 5173 catálogo · 5174 storefront · 5175 ERP
bun run check      # Biome + TypeScript + i18n + ai:check + tests
bun run ci         # check + build + presupuestos
bun run build      # build de las tres apps
bun run budget     # JS/CSS gzip y fuentes
bun run qa:a11y    # axe, 12 px mínimo y foco visible (requiere dev + Chromium)
bun run qa:overflow # overflow y RTL en 1440/1280/1024/390 (requiere dev + Chromium)
bun run qa:perf    # LCP/CLS sobre el build (requiere Chromium)
bun run qa:visual  # capturas en docs/qa/<fecha>
bun run registry   # registry shadcn en apps/catalog/public/r
bun run ai:docs    # llms.txt, Markdown por pieza e inventario de skills
bun run ai:check   # falla si la capa de agentes está desactualizada
```

## Producción

Sitio: **<https://koten.codehive.com.co>**

| Ruta | App | Puerto interno |
| --- | --- | --- |
| `/` | catálogo y documentación | 3000 |
| `/demos/store` | storefront HIKARI | 3001 |
| `/demos/erp` | ERP KURA | 3002 |

Una imagen multi-stage construye las tres apps con Bun y las sirve con nginx sin privilegios. Traefik conserva el prefijo de cada demo, así que sus assets no chocan con los del catálogo. Los puertos no se publican en el host.

```bash
# servidor o PaaS
KOTEN_IMAGE=ghcr.io/<owner>/<repo>:latest docker compose up -d

# local: publica 3000/3001/3002
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build -d
```

Variables en `.env` (ver `.env.example`): `KOTEN_IMAGE`, `KOTEN_SITE_URL`, `KOTEN_HOST`, el entrypoint/certresolver de Traefik y los puertos del override local. `KOTEN_SITE_URL` alimenta los enlaces públicos y el registry.

El workflow publica la imagen en GHCR en `main` y tags `v*`, y solo la construye en pull requests. El registry y la documentación para agentes se regeneran dentro de la imagen, por lo que `/r/*.json`, `/llms.txt` y `/md/**` viajan en el contenedor.

## Registry shadcn

```bash
npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json
npx shadcn@latest add https://koten.codehive.com.co/r/button.json
```

En local, `bun run dev` sirve el registry en `http://localhost:5173/r/`. Los items usan los aliases de `components.json` (`@ui`, `@components`, `@lib`) y reescriben los imports al prefijo del proyecto. `koten-theme` escribe tokens, temas y densidad en el `tailwind.css` declarado; no crea una carpeta `styles/`. `koten-i18n` instala el runtime y el inglés; `koten-i18n-es` y `koten-i18n-ja` agregan solo su diccionario.

## IA y agentes

Tres niveles, generados desde la misma fuente que el catálogo:

| Nivel | Artefacto | Uso |
| --- | --- | --- |
| Lectura | `/llms.txt`, `/llms-full.txt`, `/md/components/<slug>.md`, `/md/blocks/<categoría>/<slug>.md` | Índice, corpus y una página por pieza. |
| Consumo | `skills/koten-ui` | Elegir, instalar, componer, tematizar y verificar. |
| Extensión | `skills/koten-design-system` | Agregar primitivas, bloques, temas y densidades dentro del repositorio. |
| Autoría | `skills/koten-design-language` | Crear una pieza nueva en un proyecto que ya usa Koten. |

```bash
npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui
npx skills add codehive-colombia/koten --skill koten-design-system
npx skills add codehive-colombia/koten --skill koten-design-language
```

La página `/ai` explica los tres niveles. `predev` y `prebuild` regeneran la capa de agentes junto con el registry; `bun run ai:check` corre dentro de `bun run check`. Las skills siguen el estándar [Agent Skills](https://agentskills.io/specification).

## Usar Koten UI en tu proyecto

Necesitas React 19, Tailwind CSS 4 y un `components.json` de shadcn. No clonas el repositorio ni instalas Bun. La guía completa está en **Empezar** (`/start#usar`).

```bash
# 1. tema, una sola vez
npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json

# 2. componente o bloque
npx shadcn@latest add https://koten.codehive.com.co/r/button.json
npx shadcn@latest add https://koten.codehive.com.co/r/product-card.json
```

Con Bun, cambia `npx` por `bunx`. El catálogo recuerda la elección en `localStorage`.

Después:

1. Importa el CSS de Tailwind que declara tu `components.json`; el tema se escribe ahí.
2. Envuelve la app con `KotenProvider` (`@/lib/koten/i18n/provider` o tu alias); `locale` acepta cualquier BCP 47.
3. Elige tema y densidad en el elemento raíz (`data-theme`, `data-density`).
4. Consulta **Componentes** (`/components`) y **Bloques** (`/blocks`) para instalación, props, código y accesibilidad.

## Desarrollar Koten UI

Este camino es para trabajar dentro del repositorio: catálogo, primitivas, bloques, demos, auditorías y registry.

```bash
git clone https://github.com/codehive-colombia/koten.git
cd koten
bun install
bun run dev
bun run check
bun run build
bun run budget
```

Antes de tocar una pieza, lee [AGENTS.md](./AGENTS.md), [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) y [docs/RECIPES.md](./docs/RECIPES.md). Las auditorías `bun run qa:*` son opcionales y requieren Chromium. La guía completa está en **Empezar** (`/start#desarrollar`).

## Estructura

```txt
apps/
  catalog/      # documentación viva y laboratorio
  storefront/   # POC HIKARI
  erp/          # POC KURA
packages/
  ui/
    src/components/ui/       # primitivas copiables
    src/components/patterns/ # composiciones
    src/styles/tokens.css
    src/styles/globals.css
    src/lib/
infra/nginx/    # runtime de producción
skills/         # koten-ui, koten-design-system y koten-design-language
scripts/        # registry, documentación para agentes y QA
docs/           # requisitos, diseño, decisiones y bitácora
Dockerfile
docker-compose.yml
```

## Cómo retomar

1. Lee [docs/PROGRESS.md](./docs/PROGRESS.md) para ver el estado real.
2. Lee [ROADMAP.md](./ROADMAP.md) y continúa la tarea `in_progress` o elige la primera `todo` con dependencias `done`.
3. Sigue [AGENTS.md](./AGENTS.md) para actualizar estado, evidencia y bitácora.

## Licencia

Por definir. Ver `Q-005` en el roadmap.
