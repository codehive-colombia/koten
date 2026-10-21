# Koten UI · 古典

Sistema de componentes React inspirado en el web japonés clásico: densidad informativa, marcos de 1px, papel cálido, tipografía del sistema y jerarquía por reglas. La misma gramática visual se adapta a dos registros: **Chirashi** para comercio y **Daichō** para backoffice.

> **Estado:** fases 0–5 cerradas (**`v0.1.0-poc`** + fase 5), con despliegue de producción en <https://koten.codehive.com.co> (`M-005`, `D-043`). 46 componentes y 20 bloques documentados en páginas individuales; storefront HIKARI y ERP KURA en JA/ES/EN, auditados con axe, con presupuestos de bundle, tema oscuro Sumi, DatePicker, CommandPalette, virtualización, registry shadcn y una capa de documentación y skills para agentes (`M-007`, `D-045`).
> **Siguiente:** sin tareas abiertas; el roadmap deja la fase 5 como cierre opcional ya completada.
> **Fuente de verdad:** [ROADMAP.md](./ROADMAP.md).

## Documentación

| Documento | Para qué |
| --- | --- |
| [ROADMAP.md](./ROADMAP.md) | Fases, tareas con ID, estado, dependencias, criterios de aceptación y trazabilidad. |
| [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) | Encargo, referencias, alcance, requisitos y criterios de éxito. |
| [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Gramática visual, tokens, componentes, i18n, accesibilidad y performance. |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Registro de decisiones (ADR ligero), con IDs estables. |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | Bitácora append-only de sesiones y handoff. |
| [docs/RECIPES.md](./docs/RECIPES.md) | Recetas copiables: formulario, tabla, drawer, tarjeta, i18n y checklist. |
| [llms.txt](./llms.txt) | Índice de documentación para agentes: componentes, bloques, guías y skills. |
| [skills/](./skills) | Skills `koten-ui` y `koten-design-system` para consumir y extender el sistema. |
| [docs/qa/](./docs/qa/) | Capturas de QA visual por fecha, con la matriz de viewports. |
| [AGENTS.md](./AGENTS.md) | Protocolo para retomar el proyecto en otra sesión o con otro agente. |

## Principios en una línea

- **Sencillez de medios, densidad de información.**
- El marco es la unidad: panel, cabecera, regla, borde.
- El color señala; no decora.
- Tipografía del sistema y texto real, nunca texto en imágenes.
- Lo clásico no es retro: es continuidad.
- Desktop primero, accesible por defecto, rápido por diseño.

## Stack objetivo

Bun workspaces · React 19 · TypeScript 7 strict · Vite 8 · Tailwind CSS v4 · Base UI · CVA · TanStack Table (solo ERP) · Lucide · React Router 7.18 · Vitest + Testing Library + axe-core · Chromium/CDP para las auditorías · Biome.

Sin CSS-in-JS runtime, sin fuentes CJK completas, sin librería de charts, sin carousel ni date-picker pesado.

Versiones resueltas en el scaffold: Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5.

## Comandos

```bash
bun install
bun run dev      # 5173 catálogo · 5174 storefront · 5175 ERP
bun run check    # Biome + TypeScript + guardia i18n + Vitest
bun run ci       # check + build + presupuestos, equivalente local del workflow
bun run build    # build de las tres apps
bun run budget   # JS inicial/total y CSS gzip; 0 fuentes locales
bun run check:i18n  # strings hardcodeadas y utilidades físicas
bun run qa:overflow # desbordamiento/recorte/RTL en 1440, 1280, 1024 y 390 (requiere dev + Chromium)
bun run qa:a11y     # axe, 12 px mínimo y foco visible en navegador (requiere dev + Chromium)
bun run qa:perf     # LCP/CLS sobre el build (requiere Chromium; hace su propio preview)
bun run qa:visual   # capturas 1440/1280/1024 en docs/qa/<fecha>
bun run registry    # genera el registry shadcn en apps/catalog/public/r
bun run ai:docs     # genera llms.txt, Markdown por pieza e inventario de la skill
bun run ai:check    # falla si la capa de agentes o una skill está desactualizada
```

## Producción

Sitio: **<https://koten.codehive.com.co>**

| Ruta | App | Puerto del contenedor |
| --- | --- | --- |
| `/` | catálogo y documentación | 3000 |
| `/demos/store` | storefront HIKARI | 3001 |
| `/demos/erp` | ERP KURA | 3002 |

Una sola imagen multi-stage: Bun instala y construye las tres apps; nginx sin privilegios las sirve en tres puertos **internos** del contenedor. Traefik conserva el prefijo de cada demo, así que los assets viven bajo `/demos/store/` y `/demos/erp/` y no chocan con los del catálogo.

Los puertos no se publican en el host: Traefik alcanza el contenedor por la red de Docker y evita chocar con otros servicios del servidor.

```bash
# servidor (o el PaaS): sin puertos publicados
KOTEN_IMAGE=ghcr.io/<owner>/<repo>:latest docker compose up -d

# local: publica 3000/3001/3002 solo para probar
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build -d
```

Variables principales en `.env` (ver `.env.example`): `KOTEN_IMAGE`, `KOTEN_SITE_URL`, `KOTEN_HOST`, el entrypoint/certresolver de Traefik y —solo para el override local— los tres puertos de host. `docker-compose.yml` incluye las reglas de Traefik para el dominio y las tres rutas; los enlaces públicos del catálogo y el registry se generan con `KOTEN_SITE_URL` (por defecto `https://koten.codehive.com.co`).

El workflow de GitHub Actions publica la imagen en GHCR en `main` y en tags `v*`, y solo la construye en pull requests. El registry de shadcn y la documentación para agentes se regeneran dentro de la imagen (`prebuild`), por lo que `/r/*.json`, `/llms.txt` y `/md/**` viajan en el mismo contenedor.

## Registry shadcn

En producción el registry vive en el mismo dominio que el catálogo:

```bash
# en un proyecto con Tailwind 4 y components.json
npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json
npx shadcn@latest add https://koten.codehive.com.co/r/button.json
```

En local se sirve desde el catálogo de desarrollo:

```bash
bun run dev        # sirve http://localhost:5173/r/button.json (predev regenera registry y agent docs)
npx shadcn@latest add http://localhost:5173/r/koten-theme.json
npx shadcn@latest add http://localhost:5173/r/button.json
```

Cada item usa los **aliases de `components.json`**: los targets son `@ui`, `@components` y `@lib`, y los imports canónicos `@/...` se reescriben al prefijo del proyecto. El item `koten-theme` viaja como dependencia y escribe tokens, temas y densidad en el archivo `tailwind.css` declarado en `components.json`; no se crea ninguna carpeta `styles/`. Para un tema 100 % Koten, parte de un CSS con solo `@import "tailwindcss";`; si el proyecto ya tenía tokens de shadcn, instala `koten-theme` primero para reemplazar los valores existentes. El catálogo documenta el flujo en `/start`.

## IA y agentes

El sistema se puede leer, instalar y extender con un agente. Hay tres niveles, todos generados desde la misma fuente que el catálogo:

| Nivel | Artefacto | Uso |
| --- | --- | --- |
| Lectura | `/llms.txt`, `/llms-full.txt`, `/md/components/<slug>.md`, `/md/blocks/<categoría>/<slug>.md` | Índice, corpus y una página por pieza. El catálogo muestra el enlace **Markdown para agentes** en cada página. |
| Consumo | `skills/koten-ui` | Elegir, instalar, componer, tematizar y verificar una pantalla. |
| Extensión | `skills/koten-design-system` | Agregar primitivas o bloques, tokens, temas, densidades y aplicar la gramática a un sistema nuevo. |

```bash
npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui
npx skills add codehive-colombia/koten --skill koten-design-system
```

En producción, el sitio publica <https://koten.codehive.com.co/llms.txt> y <https://koten.codehive.com.co/llms-full.txt>. La página `/ai` explica los tres niveles y los comandos. `predev` y `prebuild` regeneran la capa de agentes junto con el registry; `bun run ai:check` corre dentro de `bun run check`. Las skills siguen el estándar [Agent Skills](https://agentskills.io/specification) y se instalan con [`npx skills`](https://github.com/vercel-labs/skills).

## Usar Koten UI en tu proyecto

No necesitas clonar este repositorio ni instalar Bun. Necesitas React 19, Tailwind CSS 4 y un `components.json` de shadcn. La guía completa está en **Empezar** (`/start#usar`).

```bash
# 1. el tema, una sola vez
npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json

# 2. el componente o bloque que necesites
npx shadcn@latest add https://koten.codehive.com.co/r/button.json
npx shadcn@latest add https://koten.codehive.com.co/r/product-card.json
```

Si usas Bun, cambia `npx` por `bunx`. El catálogo muestra un selector **npx / bunx** y recuerda la elección en `localStorage`; los comandos de cada componente y bloque se copian con ese runner.

Después:

1. Importa el CSS de Tailwind que declara tu `components.json`; el tema se escribe ahí, sin carpeta `styles/`.
2. Envuelve la app con `KotenProvider` (`@/lib/koten/provider` o tu alias).
3. Elige tema y densidad en el elemento raíz (`data-theme`, `data-density`).
4. Recorre **Componentes** (`/components`) y **Bloques** (`/blocks`) para instalación, props, código y accesibilidad.
5. Para agentes: `/ai`, `llms.txt` y las skills.

## Desarrollar Koten UI

Este camino es para trabajar dentro del repositorio: catálogo, primitivas, bloques, demos, auditorías y registry.

```bash
git clone https://github.com/codehive-colombia/koten.git
cd koten
bun install
bun run dev      # catálogo 5173 · storefront 5174 · ERP 5175
bun run check    # Biome + TypeScript + i18n + ai:check + tests
bun run build    # build de las tres apps
bun run budget   # presupuestos de JS/CSS
```

Antes de tocar una pieza, lee [AGENTS.md](./AGENTS.md), [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) y [docs/RECIPES.md](./docs/RECIPES.md). Las auditorías (`bun run qa:*`) son opcionales y requieren Chromium. La guía completa está en **Empezar** (`/start#desarrollar`).

## Estructura

La fase 0 dejó tokens, el catálogo wiki multipágina y el selector ES/JA/EN. La fase 1 sumó las primitivas base; la fase 5 completó 46 componentes con Label, DatePicker, CommandPalette y BarChart. Las fases 2 y 3 añadieron 20 bloques en `components/patterns`, la página HIKARI K-1 y el backoffice KURA con datos deterministas. La fase 4 sumó la guardia i18n, las auditorías de navegador (a11y, overflow/RTL, performance), el code splitting del catálogo y las capturas archivadas. La mejora `M-004` separó el catálogo en una página por componente (`/components/<slug>`) y una página por bloque (`/blocks/<categoría>/<slug>`), con instalación, preview/código, props, a11y y requisitos (`D-042`). El cuerpo del catálogo está localizado completo en ES/JA/EN (`D-025`).

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
infra/nginx/    # runtime de la imagen de producción
skills/         # skills para agentes (koten-ui, koten-design-system)
scripts/        # registry, documentación para agentes y QA
Dockerfile
docker-compose.yml
```

## Cómo retomar

1. Leer [docs/PROGRESS.md](./docs/PROGRESS.md) para ver el estado real.
2. Leer [ROADMAP.md](./ROADMAP.md) y continuar la tarea `in_progress` o elegir la primera `todo` cuyas dependencias estén `done`.
3. Seguir [AGENTS.md](./AGENTS.md) para actualizar estado, evidencia y bitácora.

## Licencia

Por definir. Ver `Q-005` en el roadmap.
