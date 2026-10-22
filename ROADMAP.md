# Koten UI — Hoja de ruta

> **Documento vivo y fuente de verdad del estado del proyecto.**
> Última actualización: **2026-10-22**
> Fase actual: **5 — Opcional / posterior** (`done`)
> Tarea en curso: **ninguna**
> Última tarea completada: **`M-018`** · listas en Límites y Reglas de formato
> Mejoras puntuales completadas: **`M-001`** (i18n del catálogo), **`M-002`** (source en inglés y Fundamentos para el usuario), **`M-003`** (portada editorial), **`M-004`** (componentes y bloques individuales), **`M-005`** (despliegue de producción), **`M-006`** (aliases y tema del registry), **`M-007`** (documentación para agentes y skills), **`M-008`** (Empezar por audiencia), **`M-009`** (runner npx/bunx), **`M-010`** (skill de lenguaje de diseño), **`M-011`** (i18n personalizable), **`M-012`** (documentación directa y listas), **`M-013`** (diseñador de temas), **`M-014`** (README en inglés con versión en español), **`M-015`** (panel flotante de configuración), **`M-016`** (flujo de lectura de Empezar), **`M-017`** (límites del diseñador de temas) y **`M-018`** (listas en Límites y Reglas de formato)
> Bloqueos: **ninguno**

## Índice

1. [Resumen](#1-resumen)
2. [Convenciones](#2-convenciones)
3. [Decisiones clave](#3-decisiones-clave)
4. [Criterios de éxito](#4-criterios-de-éxito)
5. [Fases y tareas](#5-fases-y-tareas)
6. [Inventario de componentes](#6-inventario-de-componentes)
7. [Trazabilidad de requisitos](#7-trazabilidad-de-requisitos)
8. [Riesgos](#8-riesgos)
9. [Decisiones pendientes](#9-decisiones-pendientes)
10. [Protocolo de sesión](#10-protocolo-de-sesión)
11. [Registro de cambios](#11-registro-de-cambios)

---

## 1. Resumen

Koten UI es un set de componentes React **estilo shadcn**: la fuente vive en el repositorio, se copia al proyecto y se adapta. No es una caja negra ni un paquete cerrado. La estética parte del web japonés clásico —densidad informativa, marcos de 1px, papel cálido, tipografía del sistema, jerarquía por reglas— y se organiza en dos registros:

- **Chirashi (チラシ)** → storefront, comercio, información densa y color funcional.
- **Daichō (台帳)** → ERP, backoffice, densidad tabular y color solo para estado.
- **Kanso (簡素)** → catálogo y documentación, la versión de lectura.

La prueba de concepto son **dos sitios** —una página de producto y un backoffice— más un **catálogo** que documenta y valida el sistema.

**No objetivos del POC:** publicar un paquete npm, tener un CLI propio y SSR/SSG de producción. El resto del alcance opcional se completó en la fase 5.

---

## 2. Convenciones

### Estados

| Estado | Significado |
| --- | --- |
| `todo` | No empezada. |
| `in_progress` | En curso; una sola tarea por sesión. |
| `blocked` | Espera una decisión, dependencia o acceso. |
| `done` | Cumple criterio de aceptación y evidencia registrada. |
| `dropped` | Descartada; requiere una decisión `D-*` que lo justifique. |

### IDs estables

| Prefijo | Uso | Ejemplo |
| --- | --- | --- |
| `F<fase>-<nnn>` | Tarea de fase. | `F0-001` |
| `C-<nnn>` | Componente. | `C-001` |
| `R-<nnn>` | Requisito. | `R-001` |
| `D-<nnn>` | Decisión. | `D-003` |
| `RISK-<nnn>` | Riesgo. | `RISK-001` |
| `Q-<nnn>` | Decisión pendiente. | `Q-001` |
| `M-<nnn>` | Mejora puntual fuera de la secuencia de fases. | `M-001` |

**No se renumeran IDs.** Si una tarea se divide, se agregan `F0-001a`, `F0-001b`. Si una decisión se reemplaza, se agrega una nueva con `supersede a D-00x`.

### Fechas

ISO 8601: `YYYY-MM-DD`.

### Documentos relacionados

- [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) — el qué y el porqué.
- [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) — el cómo visual y técnico.
- [docs/DECISIONS.md](./docs/DECISIONS.md) — decisiones y alternativas.
- [docs/PROGRESS.md](./docs/PROGRESS.md) — bitácora de sesiones.
- [AGENTS.md](./AGENTS.md) — protocolo operativo.

---

## 3. Decisiones clave

| ID | Decisión | Estado | Documento |
| --- | --- | --- | --- |
| `D-001` | Nombre **Koten** y paquete `@koten/ui`. | accepted | [D-001](./docs/DECISIONS.md#d-001) |
| `D-002` | Una gramática, dos densidades: Chirashi / Daichō / Kanso. | accepted | [D-002](./docs/DECISIONS.md#d-002) |
| `D-003` | **Base UI** (`@base-ui/react`) como base de primitivas. | accepted | [D-003](./docs/DECISIONS.md#d-003) |
| `D-004` | **Tailwind v4** con tokens CSS-first y paleta bloqueada. | accepted | [D-004](./docs/DECISIONS.md#d-004) |
| `D-005` | Bun + Biome + React 19 + TS strict + Vite 8. | accepted | [D-005](./docs/DECISIONS.md#d-005) |
| `D-006` | Fuentes del sistema; sin fuentes CJK completas. | accepted | [D-006](./docs/DECISIONS.md#d-006) |
| `D-007` | v1 = catálogo + 2 demos; registry/CLI después. | accepted | [D-007](./docs/DECISIONS.md#d-007) |
| `D-008` | Docs en español; demos en JA/ES/EN. | accepted | [D-008](./docs/DECISIONS.md#d-008) |
| `D-009` | Desktop-first; navegadores modernos. | accepted | [D-009](./docs/DECISIONS.md#d-009) |
| `D-010` | Texto real; nunca texto en imágenes. | accepted | [D-010](./docs/DECISIONS.md#d-010) |
| `D-011` | Variantes CVA; tema y densidad por `data-*`. | accepted | [D-011](./docs/DECISIONS.md#d-011) |
| `D-012` | Demos: HIKARI K-1 (storefront) y KURA (ERP). | accepted | [D-012](./docs/DECISIONS.md#d-012) |
| `D-013` | DataTable con TanStack Table solo en ERP. | accepted | [D-013](./docs/DECISIONS.md#d-013) |
| `D-014` | Accesibilidad AA y 12px mínimo. | accepted | [D-014](./docs/DECISIONS.md#d-014) |
| `D-015` | Modo oscuro **Sumi** fuera de la v1. | accepted | [D-015](./docs/DECISIONS.md#d-015) |
| `D-016` | Registry shadcn en fase 5. | accepted | [D-016](./docs/DECISIONS.md#d-016) |
| `D-017` | SPA para el POC; SSG/SSR se evalúa después. | accepted | [D-017](./docs/DECISIONS.md#d-017) |
| `D-018` | CI en GitHub Actions + `bun run ci` local. | accepted | [D-018](./docs/DECISIONS.md#d-018) |
| `D-019` | Catálogo wiki multipágina con React Router 7 y sidebar. | accepted | [D-019](./docs/DECISIONS.md#d-019) |
| `D-020` | UI del catálogo en ES/JA/EN; documentación en español. | accepted | [D-020](./docs/DECISIONS.md#d-020) |
| `D-026` | RTL best-effort con propiedades lógicas y guardia de i18n. | accepted | [D-026](./docs/DECISIONS.md#d-026) |
| `D-027` | Piso tipográfico de 12 px (`2xs` = 12 px). | accepted | [D-027](./docs/DECISIONS.md#d-027) |
| `D-028` | axe excluye solo los focus guards internos de Base UI. | accepted | [D-028](./docs/DECISIONS.md#d-028) |
| `D-029` | Code splitting por ruta solo en el catálogo. | accepted | [D-029](./docs/DECISIONS.md#d-029) |
| `D-030` | Sin estilos de impresión en la v1. | accepted | [D-030](./docs/DECISIONS.md#d-030) |
| `D-031` | Entrega del POC sin deploy alojado. | accepted | [D-031](./docs/DECISIONS.md#d-031) |
| `D-032` | SSG del storefront con Astro, fuera del POC. | accepted | [D-032](./docs/DECISIONS.md#d-032) |
| `D-033` | No publicar `@koten/ui`. | accepted | [D-033](./docs/DECISIONS.md#d-033) |
| `D-034` | La v1 cierra sin Sumi ni registry. | accepted | [D-034](./docs/DECISIONS.md#d-034) |
| `D-035` | Sumi post-v1 con roles sólidos e inversos. | accepted | [D-035](./docs/DECISIONS.md#d-035) |
| `D-036` | DatePicker propio, sin dependencias y panel anclado. | accepted | [D-036](./docs/DECISIONS.md#d-036) |
| `D-037` | CommandPalette con combobox, listbox y foco atrapado. | accepted | [D-037](./docs/DECISIONS.md#d-037) |
| `D-038` | Virtualización manual de DataTable. | accepted | [D-038](./docs/DECISIONS.md#d-038) |
| `D-039` | Registry shadcn autocontenido servido por el catálogo. | accepted | [D-039](./docs/DECISIONS.md#d-039) |
| `D-041` | Portada editorial del catálogo, no landing de marketing. | accepted | [D-041](./docs/DECISIONS.md#d-041) |
| `D-042` | Una página por componente y una sección de bloques. | accepted | [D-042](./docs/DECISIONS.md#d-042) |
| `D-043` | Producción en un dominio, una imagen y tres puertos. | accepted | [D-043](./docs/DECISIONS.md#d-043) |
| `D-044` | El registry respeta los aliases de shadcn y entrega el tema en el CSS del proyecto. | accepted | [D-044](./docs/DECISIONS.md#d-044) |
| `D-045` | Documentación para agentes en tres niveles y skills de consumo y diseño. | accepted | [D-045](./docs/DECISIONS.md#d-045) |
| `D-046` | Empezar se separa en usar el sistema y desarrollar el sistema. | accepted | [D-046](./docs/DECISIONS.md#d-046) |
| `D-047` | Runner de shadcn configurable y persistente: npx o bunx. | accepted | [D-047](./docs/DECISIONS.md#d-047) |
| `D-048` | Tercera skill `koten-design-language` para crear piezas nuevas. | accepted | [D-048](./docs/DECISIONS.md#d-048) |
| `D-049` | i18n del consumidor: diccionarios JSON por idioma y locale BCP 47. | accepted | [D-049](./docs/DECISIONS.md#d-049) |
| `D-050` | Documentación directa y listas en lugar de tarjetas. | accepted | [D-050](./docs/DECISIONS.md#d-050) |
| `D-051` | Diseñador de temas con parámetros curados, contraste AA y export superpuesto. | accepted | [D-051](./docs/DECISIONS.md#d-051) |
| `D-052` | README en inglés como entrada y versión en español opcional. | accepted | [D-052](./docs/DECISIONS.md#d-052) |
| `D-053` | Licencia MIT para el repositorio, los componentes y la documentación. | accepted | [D-053](./docs/DECISIONS.md#d-053) |
| `D-054` | Configuración del catálogo en un panel flotante anclado al header. | accepted | [D-054](./docs/DECISIONS.md#d-054) |
| `D-055` | Empezar: requisitos en prosa y solo pasos necesarios numerados. | accepted | [D-055](./docs/DECISIONS.md#d-055) |
| `D-056` | Quitar la sección de límites del diseñador de temas. | accepted | [D-056](./docs/DECISIONS.md#d-056) |

---

## 4. Criterios de éxito

### Del POC

- [x] `bun install` y `bun run dev` levantan catálogo, storefront y ERP.
- [x] `bun run check` pasa: Biome + TypeScript + tests unitarios.
- [x] Storefront y ERP funcionan en **JA/ES/EN** sin clipping ni overflow horizontal.
- [x] Catálogo documenta todos los componentes usados, con variantes, código y notas de accesibilidad.
- [x] Sin violaciones `serious`/`critical` de axe en las rutas principales.
- [x] Presupuestos: LCP < 1.5 s local, CLS < 0.02, JS inicial < 150 KB gzip (storefront) y < 250 KB (ERP), CSS < 30 KB, **0 bytes de fuentes CJK**.
- [x] QA visual en 1440, 1280 y 1024 px.
- [x] Ningún texto crítico vive dentro de una imagen.

### De la entrega

- [x] Una sesión nueva puede retomar leyendo `PROGRESS.md` + `ROADMAP.md` en menos de 5 minutos.
- [x] Cada tarea completada tiene evidencia (ruta, comando o commit).
- [x] Cada cambio de alcance tiene una decisión `D-*` o una pregunta `Q-*`.

---

## 5. Fases y tareas

### Fase 0 — Fundación

**Estado:** `done` · **Objetivo:** workspace reproducible, tokens, temas/densidades y catálogo mínimo para validar la gramática.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F0-000` | Crear hoja de ruta, requisitos, diseño, decisiones, bitácora y protocolo. | — | `done` | Documentos creados y enlazados desde el README. | `README.md`, `ROADMAP.md`, `docs/*`, `AGENTS.md` |
| `F0-001` | Inicializar git y workspace de Bun (`apps/*`, `packages/*`). | `F0-000` | `done` | `bun install` funciona; scripts raíz `dev`, `build`, `check`, `test`; `.gitignore` creado; licencia definida o `Q-005` registrada como pendiente. | `package.json`, `bun.lock`, `.gitignore`, `.git/` (`git init -b main`, sin commit inicial); `bun install` OK. Licencia: MIT (`D-053`, cierra `Q-005`); `LICENSE` y campos `license` en las workspaces. |
| `F0-002` | Configurar Biome, TS strict y Vite + React en las tres apps. | `F0-001` | `done` | `bun run check` pasa en apps vacías; alias `@/*` y `@koten/ui/*` resuelven. | `biome.json`, `tsconfig.base.json`, `apps/*/{package.json,tsconfig.json,vite.config.ts}`; `bun run check` OK (Biome + tsc + 2 tests). |
| `F0-003` | Instalar Tailwind v4, Base UI, CVA, `clsx` y `tailwind-merge`. | `F0-002` | `done` | `@tailwindcss/vite` configurado; `@base-ui/react` instalado; `cn()` funciona; paleta por defecto bloqueada. | `packages/ui/package.json`, `packages/ui/src/lib/cn.ts`, `packages/ui/src/styles/globals.css`; `bun run build` OK en las tres apps. |
| `F0-004` | Crear `tokens.css`, `globals.css`, temas y densidades. | `F0-003` | `done` | Tokens de color, tipo, espaciado, radios y densidad; `[data-theme]` y `[data-density]`; página de espécimen. | `packages/ui/src/styles/tokens.css`, `globals.css`; espécimen en `apps/catalog/src/pages/tokens.tsx` + `components/specimen.tsx` + `data/tokens.ts`; contraste AA cubierto por `tokens.contrast.test.ts`; 6 tests de página. |
| `F0-005` | Crear `KotenProvider`, labels y helpers de formato. | `F0-004` | `done` | Labels ES/JA/EN; `formatDate`, `formatCurrency`, `formatNumber` con `Intl`; tests. | `packages/ui/src/i18n/{labels.ts,provider.tsx}`, `lib/{format.ts,intl.ts}`; exports en `index.ts`; tests de labels, provider y formato; sección “Idioma y formato” del espécimen. |
| `F0-006` | Montar el shell del catálogo con navegación y toggles. | `F0-004` | `done` | Catálogo corre en 1440/1280/1024; toggles de tema y densidad persistentes en URL. | `apps/catalog/src/App.tsx`, `components/view-toggles.tsx`, `lib/use-catalog-view.ts`; URL `?theme=…&density=…`; tests; QA visual 1440/1280/1024 y 390. |
| `F0-007` | Implementar `Button`, `Panel` y `Badge` como primera validación. | `F0-004` | `done` | Variantes, tamaños, estados, foco visible, tests y páginas de catálogo. | `packages/ui/src/components/ui/{button,panel,badge}.tsx`; exports en `index.ts`; tests de los tres; página `apps/catalog/src/pages/components.tsx` con previews, props, código y a11y; roles `sale`/`new` agregados. |
| `F0-008` | Configurar CI base (Biome, tsc, Vitest). | `F0-002` | `done` | Workflow en GitHub Actions o script local equivalente; falla si `check` falla. | `.github/workflows/ci.yml` (Bun 1.4.3, `--frozen-lockfile`, `check`, `build`); script local `bun run ci`; `D-018`; `Q-007` cerrada. |
| `F0-009` | Cerrar la fase: documentar comandos y validar handoff. | `F0-005`–`F0-008` | `done` | README actualizado; una sesión nueva puede levantar el catálogo siguiendo los docs. | README, AGENTS, PROGRESS y ROADMAP actualizados; `bun run ci` validado; check visual 1440/1280/1024/390. |
| `F0-010` | Agregar selector de idioma de interfaz y persistirlo en URL. | `F0-005` | `done` | Toggle ES/JA/EN; labels de shell y vista previa de formato reaccionan; `?lang=` persistente. | `LocaleToggle`, `useCatalogView.locale`, `shellLabels`, `syncViewToUrl`; `lang` en fragmentos; tests de hook, toggles y App; `D-020`. |
| `F0-011` | Hacer que tema y densidad afecten la documentación, no solo los demos fijos. | `F0-004`, `F0-006` | `done` | Layout, tablas, paneles y sidebar leen `--koten-*`; acentos primarios visibles en el tema. | `catalog-layout.tsx`, `docs.tsx`, `specimen.tsx`; paddings `var(--koten-panel-p)`, gaps `var(--koten-gap)`, filas `var(--koten-row-h)`; QA visual con Chirashi + compacta. |
| `F0-012` | Convertir el catálogo en wiki multipágina con sidebar y navegación. | `F0-006` | `done` | Rutas por fundamento y componente; sidebar con estado activo; menú móvil; pager; deep links. | `react-router@7.18.4`, `App.tsx`, `catalog-layout.tsx`, `data/catalog.ts`, `pages/**`; 14 rutas; tests de páginas y navegación; `D-019`. |

**Criterios de aceptación de la fase**

- El catálogo muestra paleta, tipografía, espaciado, radios, temas y densidades.
- `Button`, `Panel` y `Badge` se ven coherentes en Chirashi, Daichō y Kanso.
- No hay colores fuera de tokens; no hay `border-radius` mayor a 3 px; no hay sombras fuera de overlays.
- `bun run check` verde.

---

### Fase 1 — Primitivas

**Estado:** `done` · **Objetivo:** cubrir formularios, superficies, feedback, navegación, overlays y datos con componentes copiables y documentados.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F1-001` | Formularios base: `Field`, `Label`, `Input`, `Textarea`, `FormRow`. | `F0-009` | `done` | Estados default/focus/error/disabled; labels y `aria-describedby`; catálogo. | `packages/ui/src/components/ui/{field,label,input,textarea,field-context}.tsx`; tests de asociación, error, required, disabled, textarea y FormRow; página `/components/forms` con previews, props, código y a11y. |
| `F1-002` | Inputs avanzados: `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `NumberField`. | `F1-001` | `done` | Base UI; teclado completo; integración con formularios; catálogo. | `packages/ui/src/components/ui/{select,combobox,checkbox,radio-group,switch,number-field}.tsx`; tests de selección, filtro, toggles, radios y steppers; página `/components/inputs`; exports en `index.ts`. |
| `F1-003` | Superficies y decorativos: `SectionHeader`, `Rule`, `Hanko`, `Tategaki`, `Pattern`. | `F0-007` | `done` | Variantes; uso decorativo con `aria-hidden`; responsive. | `packages/ui/src/components/ui/{section-header,rule,hanko,tategaki,pattern}.tsx`; tests; página `/components/surfaces`; exports. |
| `F1-004` | Feedback: `Alert`, `Toast`, `Progress`, `Meter`, `Skeleton`, `EmptyState`. | `F0-007` | `done` | Tonos; `aria-live`; reduced motion; catálogo. | `packages/ui/src/components/ui/{alert,toast,progress,meter,skeleton,empty-state}.tsx`; tests; página `/components/feedback`; exports. |
| `F1-005` | Navegación: `Link`, `Breadcrumb`, `Pagination`, `Tabs`, `Accordion`. | `F0-007` | `done` | Foco y teclado; `aria-current`; labels configurables. | `packages/ui/src/components/ui/{link,breadcrumb,pagination,tabs,accordion}.tsx`; tests; página `/components/navigation`; exports. |
| `F1-006` | Overlays: `Dialog`, `Drawer`, `Menu`, `Popover`, `Tooltip`. | `F1-005` | `done` | Foco atrapado y devuelto; Escape; scroll lock; portales con `isolation: isolate`. | `packages/ui/src/components/ui/{dialog,drawer,menu,popover,tooltip}.tsx`; tests; página `/components/overlays`; exports. |
| `F1-007` | Datos: `Table`, `DataTable`, `StatCard`, `Sparkline`, `BarChart`. | `F1-005` | `done` | Tabla semántica; sort/selección/paginación; estados vacío/loading; fallback accesible de charts. | `packages/ui/src/components/ui/{table,data-table,stat-card,sparkline,bar-chart}.tsx`; TanStack Table 8.21.3; tests; página `/components/data`; exports. |
| `F1-008` | Controles: `Toolbar`, `ToggleGroup`, `IconButton`. | `F1-002`, `F1-005` | `done` | Roving tabindex; `aria-pressed`; grupos de vista/densidad. | `packages/ui/src/components/ui/{icon-button,toggle-group,toolbar}.tsx`; tests; página `/components/controls`; exports. |
| `F1-009` | Catálogo completo de primitivas. | `F1-001`–`F1-008` | `done` | Cada componente tiene preview, variantes, props, código y notas de a11y. | Inventario de 42 primitivas en `/components`; 11 páginas de grupo; botón de copiar código; trazabilidad por `C-*`; tests del índice. |
| `F1-010` | Pasada de a11y y performance de primitivas. | `F1-009` | `done` | axe sin serious/critical; foco visible; sin fuentes extra; bundle revisado. | `apps/catalog/src/pages/a11y.test.tsx` (axe-core 4.14, 11 páginas); `scripts/check-budgets.ts` + `bun run budget`; QA de foco; presupuestos verdes. |

**Criterios de aceptación de la fase**

- Todas las primitivas del inventario están implementadas o explícitamente diferidas con `Q-*`.
- Los componentes son copiables: imports mínimos, sin dependencias internas ocultas.
- No hay `asChild`: la composición usa `render` + `useRender` donde corresponde.
- Los estados de Base UI se estilan con `data-*`, no con JavaScript de presentación.

---

### Fase 2 — Storefront “HIKARI”

**Estado:** `done` · **Objetivo:** validar Chirashi en una página de producto realista, densa y multilenguaje.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F2-001` | Definir contenido, datos mock y diccionarios JA/ES/EN. | `F1-010` | `done` | Producto HIKARI K-1, precios, specs, reviews y avisos; ninguna string de UI hardcodeada. | `apps/storefront/src/content/{types,copy,product,merchandising,index}.ts`; 3 locales tipados; `content.test.ts`; `D-021`. |
| `F2-002` | Header: utility bar, logo, búsqueda, cuenta/carrito y nav de categorías. | `F1-010` | `done` | Teclado; responsive; búsqueda con selector de categoría. | `patterns/{store-header,search-bar}.tsx`; `SearchBar` con select nativo + input search; demo en `/patterns/storefront`; tests de patrón. |
| `F2-003` | Hero de producto: galería, título, variantes, `PriceBlock`, stock, entrega y CTA. | `F2-001` | `done` | Imágenes locales optimizadas; estados de compra; i18n. | `patterns/{product-gallery,price-block}.tsx`; `pages/product.tsx`; SVG locales con `width`/`height`; variantes, cantidad y toast de carrito. |
| `F2-004` | Patrones de descubrimiento: `NoticeList`, `RankedList`, `CampaignBanner`, `ProductCard`. | `F2-001` | `done` | Fechas reales; badges; densidad Chirashi; sin texto en imágenes. | `patterns/{notice-list,ranked-list,campaign-banner,product-card}.tsx`; rail de la página HIKARI; fechas ISO formateadas con `Intl`. |
| `F2-005` | Detalle: `SpecTable`, reviews, relacionados y footer denso. | `F2-001` | `done` | Tablas semánticas; jerarquía; links legales. | `patterns/{spec-table,review-summary,footer}.tsx`; tres tablas de specs, distribución de 128 reviews, 4 relacionados y footer de 4 columnas. |
| `F2-006` | Ensamblar la página, rutas y toggle de idioma. | `F2-002`–`F2-005` | `done` | JA/ES/EN sin overflow; 1440/1280/1024; estados vacío/error. | `apps/storefront/src/App.tsx`, `pages/product.tsx`, `lib/use-storefront-locale.ts`; `?lang=`; layout 3 columnas en 1280 y 2 en 1024; QA 1440/1280/1024 y 390. |
| `F2-007` | QA storefront: axe, teclado, visual y performance. | `F2-006` | `done` | Sin serious/critical; LCP y CLS dentro de presupuesto; capturas. | `App.test.tsx` (5 pruebas) + `content.test.ts` (4) + `a11y.test.tsx`; axe sin serious/critical; `bun run budget` → storefront 122,0 KB JS / 9,2 KB CSS / 0 fuentes; LCP 232–508 ms local y CLS 0; capturas 1440/1280/1024 y 390. |
| `F2-008` | Documentar patrones del storefront en el catálogo. | `F2-006` | `done` | Páginas de patrón con código y notas de uso. | `apps/catalog/src/pages/patterns/{index,storefront}.tsx`; 11 patrones con demo, props, código y a11y; inventario `C-042`–`C-052`. |

**Criterios de aceptación de la fase**

- La página se siente densa pero legible: 12 px mínimo, contraste AA, foco visible.
- El toggle JA/ES/EN no rompe el layout; el español puede ser más largo que el japonés.
- El color se usa para precio, stock, puntos, avisos y campañas; no como decoración arbitraria.
- La página se puede recorrer con teclado y con lector de pantalla.

---

### Fase 3 — ERP “KURA”

**Estado:** `done` · **Objetivo:** validar Daichō en un backoffice de distribución con tablas densas, filtros y detalle.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F3-001` | Datos mock KURA, tipos y formateadores. | `F1-010` | `done` | 100+ pedidos deterministas; clientes, productos, estados y fechas. | `apps/erp/src/data/{types,customers,products,orders,metrics,index}.ts`; 132 pedidos, 12 clientes, 16 productos; generador con semilla fija; `data.test.ts`; `D-021`. |
| `F3-002` | Shell: `AppShell`, `SideNav`, `TopBar`, `PageHeader`, breadcrumb y skip link. | `F1-010` | `done` | Navegación por teclado; colapso responsive; estado activo. | `patterns/{app-shell,side-nav,top-bar,page-header}.tsx`; `apps/erp/src/App.tsx`; sidebar 232 px, menú móvil, `aria-current` y skip link. |
| `F3-003` | Dashboard: KPIs, pedidos recientes, avisos/tareas y bar chart. | `F3-001`, `F3-002` | `done` | Charts con fallback accesible; densidad compacta; sin ruido visual. | `apps/erp/src/pages/dashboard.tsx`; 4 `StatCard` con sparkline, `BarChart` de 14 días con tabla sr-only, tabla de 8 columnas y panel de tareas. |
| `F3-004` | Pedidos: `FilterBar`, `DataTable` con selección, sort y paginación, acciones masivas. | `F1-007`, `F3-001`, `F3-002` | `done` | Estado en URL; `aria-live` para selección; vacío/loading. | `apps/erp/src/pages/orders.tsx`; filtros `q/status/warehouse/range` en URL; sort, selección, 12/página, bulk preparar/enviar/exportar; `D-023`. |
| `F3-005` | `DetailDrawer` de pedido: cabecera, cliente, líneas, timeline y acciones. | `F1-006`, `F3-004` | `done` | Foco gestionado; cierre con Escape; toast al actuar. | `patterns/{detail-drawer,timeline,status-badge}.tsx`; drawer por fila con cliente, entrega, líneas, nota e historial; foco devuelto al trigger; test de Escape. |
| `F3-006` | Formularios: `FormRow`, `FormSection`, validación y errores. | `F1-001`, `F1-002` | `done` | Validación nativa/Base UI; errores vinculados; labels visibles. | `apps/erp/src/pages/order-form.tsx`; `FormSection` + `Field` + `Select` con `error`/`description`; resumen de errores con foco y toast al registrar. |
| `F3-007` | Ensamblar dashboard + pedidos + toggle ES/JA. | `F3-003`–`F3-006` | `done` | Sin overflow; 1440/1280/1024; estados de carga y vacío. | `apps/erp/src/App.tsx`; rutas `/`, `/orders`, `/orders/new` y placeholders; ES/JA/EN (R-015); QA 1440/1280/1024. |
| `F3-008` | QA ERP: axe, teclado, visual y performance. | `F3-007` | `done` | Sin serious/critical; presupuestos; capturas. | `App.test.tsx` (7 pruebas) + `a11y.test.tsx` (3 rutas); axe sin serious/critical; `bun run budget` → ERP 196,2 KB JS / 9,2 KB CSS / 0 fuentes; LCP 124–208 ms local y CLS 0; capturas dashboard, pedidos, drawer y formulario a 1440/1280/1024. |
| `F3-009` | Corregir bloqueo de `Select` y paginación en las demos. | `F3-008` | `done` | Abrir un select no bloquea la página; la paginación avanza y conserva el estado; sin avisos de interacción. | `select.tsx` y `menu.tsx` (`modal={false}`), `Select` con `alignItemWithTrigger={false}`; `data-table.tsx` conserva la identidad de `data`; tests de scroll y re-render; `D-024`; stress en navegador 5 páginas + 5 selects. |

**Criterios de aceptación de la fase**

- La tabla es el centro: filas compactas, números tabulares, headers sticky, selección clara.
- El color de estado siempre va acompañado de texto/icono; nunca solo color.
- El drawer no pierde el contexto de la tabla; al cerrar, el foco vuelve a la fila.
- El modo Daichō se siente más sobrio que Chirashi sin perder la identidad.

---

### Fase 4 — Cierre del POC

**Estado:** `done` · **Objetivo:** dejar el POC auditable, medible y retomable.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F4-001` | Auditoría i18n: strings, labels, `Intl`, expansión de texto y RTL best-effort. | `F2-007`, `F3-008` | `done` | Sin strings hardcodeadas; ES/EN sin clipping; fechas/moneda correctas. | `scripts/check-i18n.ts` + test (30 archivos / 177 tests); badge `NEW` y ratings a `formatNumber`/`formatCurrency`; utilidades físicas → lógicas en 25 archivos; `scripts/qa-overflow.ts` → 72 combinaciones sin desbordamiento/recorte, RTL incluido; `D-026`; `Q-010` cerrada. |
| `F4-002` | Auditoría a11y: axe, teclado, contraste y lector de pantalla. | `F4-001` | `done` | AA; foco visible; 12 px mínimo; sin serious/critical. | `scripts/qa-a11y.ts`: axe-core en Chromium con contraste real, 12 rutas × 3 idiomas × 1440/390 (72 páginas, drawer y select incluidos) → 0 serious/critical, 0 textos < 12 px, 0 focos sin indicador. Correcciones: piso tipográfico `2xs` 11→12 px (`D-027`), activos nav a `text-primary-strong`, labels de marca y `viewOrder` alineados con el texto visible, regiones desplazables de tabla/código con `tabIndex={0}`, focus guards de Base UI acotados en axe (`D-028`). |
| `F4-003` | Auditoría performance: bundles, fuentes, LCP/CLS y code splitting. | `F4-001` | `done` | Presupuestos de la sección 4 cumplidos. | `scripts/qa-perf.ts` (LCP/CLS/FCP en 6 rutas × 3 muestras): LCP 84–396 ms, CLS 0. `scripts/check-budgets.ts` separa inicial/total → storefront 122,3/122,3 KB · ERP 196,4/196,4 KB · catálogo 243,4/327,7 KB · CSS 9,2 KB · 0 fuentes. Code splitting del catálogo con `React.lazy` y fallback de altura reservada (`D-029`); ERP/storefront sin split por falta de ahorro. |
| `F4-004` | QA visual en 1440/1280/1024 para catálogo, storefront y ERP. | `F4-001` | `done` | Capturas archivadas; diferencias corregidas. | `scripts/qa-visual.ts` → **21 capturas** en `docs/qa/2026-10-21/` (7 páginas × 1440/1280/1024, JPEG + `index.md`). `qa-overflow` ampliado a 1280 → **96 combinaciones** LTR/RTL sin desbordamiento ni recorte. Corrección: IDs de pedido con `whitespace-nowrap` para no partir identificadores a 1024. |
| `F4-005` | Documentación final: README, catálogo, principios, tokens y recetas. | `F4-001` | `done` | Un tercero puede usar el sistema sin leer el código. | Página **Empezar** (`/start`, ES/JA/EN) con requisitos, instalación, copia de una primitiva, reglas y verificación; `docs/RECIPES.md` con 8 recetas copiables; README con uso rápido y enlaces; `D-030` cierra `Q-009` (sin impresión en v1). Test de la página nueva (178 tests). |
| `F4-006` | Revisión de Definition of Done y tag `v0.1.0-poc`. | `F4-002`–`F4-005` | `done` | Checklist completo; tag creado; bitácora actualizada. | DoD revisado: 178 tests, `bun run ci` verde, `qa:a11y` 78 páginas sin serious/critical, `qa:overflow` 108 combinaciones, `qa:perf` LCP 84–396 ms/CLS 0, 24 capturas archivadas, 0 fuentes. `D-031` cierra `Q-004`. Tag `v0.1.0-poc`. |

---

### Fase 5 — Opcional / posterior

**Estado:** `done` · **Objetivo:** ampliar sin comprometer la v1.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F5-001` | Registry shadcn: `registry.json`, build y instalación por URL. | `F4-006` | `done` | `npx shadcn add <url>` instala un componente con sus tokens. | `scripts/build-registry.ts` (+4 tests): 64 items autocontenidos en `apps/catalog/public/r` con `lib/koten` y `styles/koten.css` (`D-039`); `predev`/`prebuild` lo regeneran. Validado con `bunx shadcn@latest add http://localhost:4180/r/button.json` → 7 archivos y `tsc --noEmit` limpio; también `date-picker` y `detail-drawer`. |
| `F5-002` | Tema Sumi (dark) con contraste AA. | `F4-006` | `done` | Tema conmutable; sin flash; componentes existentes sin cambios. | `[data-theme="sumi"]` + roles `*-solid`/`solid-fg` e `inverse-bg`/`inverse-fg` (`D-035`); selector del catálogo y `?theme=sumi` en demos; script inline pre-paint; contraste AA en 4 temas; axe Sumi en catálogo/storefront/ERP → 0 serious/critical; capturas `*-sumi` a 1440/1280/1024. |
| `F5-003` | DatePicker / Calendar. | `F4-006` | `done` | Teclado, rango y locale. | `Calendar` + `DatePicker` (`D-036`): tabla con roving focus, flechas/Home/End/PageUp/PageDown, Enter, single/range, min/max, panel anclado y `Intl`; 9 tests; ERP usa el componente; página `/components/date` en ES/JA/EN; axe 0 serious/critical. |
| `F5-004` | CommandPalette. | `F4-006` | `done` | Búsqueda, teclado y focus trap. | `CommandPalette` sobre Dialog de Base UI (`D-037`): combobox + listbox, `aria-activedescendant`, filtro sin acentos, flechas/Home/End/PageUp/PageDown/Enter, Escape y foco devuelto; 5 tests; página `/components/command`; `C-065`; axe con el diálogo abierto → 0 serious/critical. |
| `F5-005` | Virtualización de DataTable. | `F4-006` | `done` | 10k filas sin degradación perceptible. | `DataTable virtualized/height/rowHeight/overscan` (`D-038`): ventana manual sin dependencias, header sticky, `aria-rowcount`/`aria-rowindex`, contenedor enfocable; demo de 10 000 filas en `/components/data-table`; test (≈29 filas en DOM, salto a la 5 000); LCP 416 ms/CLS 0 con 10k. |
| `F5-006` | Evaluar SSG/SSR para el storefront (Astro/Next). | `F4-006` | `done` | Decisión documentada con tradeoffs. | `D-032`: Astro con islas React para producción; el POC sigue SPA. |
| `F5-007` | Evaluar publicación de `@koten/ui`. | `F4-006` | `done` | Decisión documentada; build de librería si aplica. | `D-033`: no se publica; distribución por copia/registry. `Q-008` cerrada. |

---

### Mejoras puntuales

> Trabajo fuera de la secuencia de fases. No reemplaza tareas del roadmap; se registra con `M-*` y una decisión si cambia alcance.

| ID | Mejora | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- |
| `M-001` | i18n completo del catálogo y auditoría de las demos. | `done` | Cuerpo de las 25 páginas en ES/JA/EN; labels de `docs.tsx` y `specimen.tsx` localizados; `lang` del documento sigue al locale; demos sin strings hardcodeadas; `bun run check` verde. | Diccionarios por página en `apps/catalog/src/pages/**`; `lib/i18n.ts`; `data/{catalog,tokens}.ts`; `components/{docs,specimen,catalog-layout}.tsx`; `D-025`; test `pages/i18n.test.tsx`; `apps/erp/src/pages/orders.tsx` (label de email); `bun run budget` → catálogo 304,5 KB JS. |
| `M-002` | Source en inglés y sección Fundamentos orientada al usuario. | `done` | Comentarios, JSDoc, mensajes y títulos de test de todo el source en inglés; diccionarios ES/JA/EN intactos; `/tokens` es una portada de Fundamentos con espécimen y previews; sin fases, IDs de tarea ni decisiones en el copy visible de Fundamentos; `bun run check` y `bun run budget` verdes. | `packages/ui/src/**`, `apps/**/src/**`, `scripts/**`; `apps/catalog/src/pages/tokens/index.tsx`; `components/specimen.tsx` (`FoundationsSpecimen`, `FoundationPreview`); `pages/{overview,start}.tsx`; `data/catalog.ts`; `D-040`; `biome.json` ignora `public/r`. |
| `M-004` | Páginas individuales de componentes y bloques (`R-022`). | `done` | Cada primitiva en `/components/<slug>` con instalación, preview/código, props, a11y y referencia Base UI; sección de formulario en controles; requisitos de hooks/providers; 20 bloques en `/blocks/<categoría>/<slug>` con índice por categoría; rutas antiguas redirigidas y presupuesto actualizado (`D-042`). | `apps/catalog/src/data/docs/**` (46 documentos), `data/blocks/**` (20 documentos), `data/docs/{meta,index,all}.ts`, `components/doc-page.tsx`, `pages/components/{index,primitive}.tsx`, `pages/blocks/{index,block}.tsx`, `App.tsx`, `data/catalog.ts`, `scripts/check-budgets.ts`; `bun run check` (207 tests), `bun run build`, `bun run budget` (263,1/429,6 KB); `D-042`; `R-022`. |
| `M-003` | Portada editorial del catálogo (`R-021`). | `done` | `/` como landing del sistema con masthead, placa viva, tres registros, índice de piezas, principios, demos e instalación; layout ancho sin sidebar; ES/JA/EN; mismos componentes y tokens; axe sin serious/critical; sin overflow a 1440/1280/1024/390; presupuesto dentro del límite. | `apps/catalog/src/pages/overview.tsx`; `components/landing.tsx` (`SystemPlate`, `RegisterCard`, `EntryCard`, `DemoCard`); `data/inventory.ts` (fuente única de los inventarios); `components/catalog-layout.tsx` (layout ancho y sin pager en `/`); `pages/{pages,i18n}.test.tsx`; `D-041`; `R-021`. |
| `M-005` | Producción en `koten.codehive.com.co` con una imagen Docker, compose de tres puertos y CI (`R-023`). | `done` | Una imagen Bun + nginx sirve catálogo en `/` (3000), storefront en `/demos/store` (3001) y ERP en `/demos/erp` (3002); los tres routers de Traefik comparten dominio y conservan el prefijo; assets y deep links funcionan; el registry y los comandos shadcn usan el dominio de producción; GitHub Actions publica la imagen en GHCR. | `Dockerfile`; `docker-compose.yml`; `infra/nginx/default.conf`; `.dockerignore`; `.env.example`; `apps/catalog/src/lib/site.ts`; `apps/{storefront,erp}/vite.config.ts`; `apps/erp/src/App.tsx`; `scripts/{build-registry,check-budgets,qa-perf,qa-visual}.ts`; `.github/workflows/ci.yml`; `D-043`. Verificado con `docker build` y `docker compose`: `/`, `/demos/store/`, `/demos/erp/`, `/r/button.json` y deep links responden 200; navegador sin errores; `bun run check` (34 archivos / 209 tests) y `bun run budget` verdes. |
| `M-006` | Registry alineado con `components.json`: aliases de shadcn y tema en el CSS del proyecto (`R-018`). | `done` | Los targets usan `@ui`, `@components` y `@lib`; los imports se reescriben a los aliases del proyecto; `koten-theme` entrega tokens, temas y densidad en `tailwind.css` sin crear `styles/`; una instalación real con aliases `~/...` compila con Tailwind 4 y `bun run check` pasa. | `scripts/build-registry.ts` + `build-registry.test.ts`; `apps/catalog/src/{components/doc-page.tsx,pages/start.tsx,data/docs/types.ts}`; `README.md`; `Dockerfile` y `docker-compose.yml` (`KOTEN_SITE_URL`); `apps/catalog/package.json`; `postcss` en la raíz; `D-044`. Verificado con `npx shadcn add` en un proyecto con `tailwind.css: app/app.css` y aliases `~/...`: archivos en `components/ui`, `components/patterns` y `lib/koten`, imports `~/...`, sin `styles/`; `@tailwindcss/cli` compila; `bun run check` (212 tests), `bun run build` y `bun run budget` verdes. |
| `M-007` | Documentación para agentes y skills de consumo y diseño (`R-024`). | `done` | `llms.txt`, `llms-full.txt` y una página Markdown por componente y bloque; guías internas copiadas; skills `koten-ui` y `koten-design-system` en `skills/` compatibles con `npx skills`; página `/ai`; generación determinista y `bun run ai:check` dentro de `bun run check`. | `scripts/build-ai-docs.ts` + `build-ai-docs.test.ts`; `skills/{koten-ui,koten-design-system}/**`; `apps/catalog/src/pages/ai.tsx`; `App.tsx`; `data/catalog.ts`; `components/doc-page.tsx`; `apps/catalog/package.json`; `package.json`; `D-045`; `R-024`. |
| `M-008` | Empezar separado por audiencia: usar el sistema vs desarrollar el sistema (`R-025`). | `done` | `/start` abre con dos caminos; el camino de uso instala `koten-theme` y componentes por registry, sin Bun ni clonar; el de desarrollo clona el monorepo, ejecuta las tres apps, verifica y audita; se elimina el flujo obsoleto de copiar `packages/ui`; README replica la separación; tests y a11y verdes. | `apps/catalog/src/pages/start.tsx`; `apps/catalog/src/pages/pages.test.tsx`; `apps/catalog/src/pages/a11y.test.tsx`; `README.md`; `docs/DESIGN-SYSTEM.md` §12; `docs/REQUIREMENTS.md` (`R-025`); `D-046`. |
| `M-009` | Selector `npx` / `bunx` persistente para los comandos de shadcn (`R-026`). | `done` | Empezar, portada e instalación de cada componente/bloque muestran tabs npx/bunx; la elección se guarda en `localStorage` y se comparte entre páginas; `registryCommand` y el `shadcn init` de Empezar respetan el runner; la documentación generada incluye ambos comandos. | `apps/catalog/src/lib/package-manager.ts`; `apps/catalog/src/lib/site.ts`; `apps/catalog/src/components/view-toggles.tsx`; `apps/catalog/src/components/doc-page.tsx`; `apps/catalog/src/pages/{start,overview}.tsx`; `apps/catalog/src/data/catalog.ts`; `scripts/build-ai-docs.ts`; tests de `site` y páginas; `D-047`. |
| `M-010` | Tercera skill `koten-design-language`: autoría portátil bajo la gramática de Koten (`R-027`). | `done` | Skill instalable por sí sola en cualquier proyecto con Koten; explica la esencia, los roles semánticos, marcos de 1 px, radios de 2–3 px, sombras solo en overlays, contraste 4.5:1/3:1, tipografía, densidad y temas; incluye contrato previo, plantilla, matriz de estados, ejemplo completo, tests y verificación; `/ai` conserva tres niveles y presenta las dos skills de extensión; `ai:check` rechaza tokens `--koten-*` inventados; README, skills/README, DESIGN-SYSTEM, REQUIREMENTS y DECISIONS actualizados. | `skills/koten-design-language/{SKILL.md,references/{tokens,authoring,verification}.md}`; `scripts/build-ai-docs.ts` + `build-ai-docs.test.ts`; `llms.txt`; `apps/catalog/src/pages/{ai,start}.tsx` + `pages.test.tsx`; `skills/README.md`; `README.md`; `docs/DESIGN-SYSTEM.md` §14; `docs/REQUIREMENTS.md` (`R-027`); `D-048`; `R-027`. |
| `M-011` | i18n personalizable: locale BCP 47, diccionarios JSON por idioma y un único punto de edición (`R-028`). | `done` | El provider acepta cualquier BCP 47; `koten-i18n` instala el runtime y el inglés base en `lib/koten/i18n`; `koten-i18n-es` y `koten-i18n-ja` instalan solo su JSON; `dictionaries.ts` registra los packs; un locale sin diccionario cae al inglés o a `labels`; `/tokens/format`, Empezar, DESIGN-SYSTEM, RECIPES y skills explican las tres capas; `bun run check` verde. | `packages/ui/src/i18n/**`; `scripts/build-registry.ts` + test; `apps/catalog/src/pages/tokens/format.tsx`; `apps/catalog/src/pages/start.tsx`; `docs/{DESIGN-SYSTEM,RECIPES,REQUIREMENTS}.md`; `skills/koten-ui/**`; `D-049`. |
| `M-012` | Revisión editorial de la documentación y sustitución de tarjetas por listas (`R-029`). | `done` | Requisitos y accesibilidad de componentes/bloques usan listas con reglas; índices de Fundamentos, Bloques y Empezar dejan de ser tarjetas; se retira el boilerplate repetido de instalación, archivos y metas de sección; se corrigen referencias obsoletas a 11 px y al alcance de la v1; README y guías internas quedan en tono directo; `bun run check` verde. | `apps/catalog/src/components/{doc-page,catalog-layout}.tsx`; `apps/catalog/src/pages/{start,ai,overview}.tsx`; `apps/catalog/src/pages/{tokens/index,blocks/index,components/index,tokens/typography}.tsx`; `README.md`; `docs/{DESIGN-SYSTEM,REQUIREMENTS}.md`; `D-050`; `R-029`. |
| `M-013` | Diseñador de temas con guardrails, validación AA y export de tokens (`R-030`). | `done` | Página `/theme` con registro, pigmento, papel, radio y densidad; el resto de valores se deriva; 11 comprobaciones AA con exportación bloqueada y papel seguro; overlay `:root` para pegar tras `koten-theme`; estado en `?ks=`; enlace desde Temas y la navegación; tests de lógica, interacción, i18n y axe; `qa:a11y` y `qa:overflow` cubren la ruta. | `apps/catalog/src/lib/theme-designer.ts` + `theme-designer.test.ts`; `apps/catalog/src/components/theme-preview.tsx`; `apps/catalog/src/pages/theme.tsx` + `theme.test.tsx`; `apps/catalog/src/pages/tokens/themes.tsx`; `apps/catalog/src/App.tsx`; `apps/catalog/src/data/catalog.ts`; `apps/catalog/src/pages/a11y.test.tsx`; `scripts/qa-a11y.ts`; `scripts/qa-overflow.ts`; `D-051`; `R-030`. |
| `M-014` | README en inglés como entrada, con versión en español opcional (`README.es.md`) y enlaces mutuos (`D-052`). | `done` | `README.md` en inglés con el mismo contenido, estructura y enlaces que la versión anterior; `README.es.md` conserva el texto español; ambas versiones se enlazan desde la primera línea; el resto de documentos de trabajo sigue en español; `bun run check` verde. | `README.md`; `README.es.md`; `docs/DECISIONS.md` (`D-052`); `AGENTS.md`; `ROADMAP.md`; `docs/PROGRESS.md`; `RISK-019`. |
| `M-015` | Panel flotante de configuración en el header del catálogo (`D-054`). | `done` | Los toggles inline se sustituyen por un botón **Configuración** que abre un popover con tema, densidad e idioma en rejillas apiladas; las opciones se generan desde los datos; el panel tiene ancho y alto acotados, scroll y cabecera sticky; el estado sigue en la URL; trigger con etiqueta en desktop e icono con `aria-label` en mobile; tests de apertura, selección e i18n. | `apps/catalog/src/components/settings-panel.tsx` + `settings-panel.test.tsx`; `apps/catalog/src/components/view-toggles.tsx`; `apps/catalog/src/components/catalog-layout.tsx`; `apps/catalog/src/data/catalog.ts`; `apps/catalog/src/pages/i18n.test.tsx`; `docs/DESIGN-SYSTEM.md` §12; `docs/REQUIREMENTS.md`; `D-054`. |
| `M-016` | Flujo de lectura de Empezar: requisitos en prosa, pasos obligatorios numerados y opcionales sin numerar (`D-055`). | `done` | Se elimina **Antes de empezar** en los dos caminos; `components.json` y `shadcn init` se explican en la introducción; solo se numeran los pasos necesarios; skills, auditorías y registry quedan como opcionales; las listas de trabajo y mapa pasan a una columna con reglas; el selector de runner deja de ser una tarjeta; tests y a11y verdes. | `apps/catalog/src/pages/start.tsx`; `apps/catalog/src/pages/pages.test.tsx`; `docs/DESIGN-SYSTEM.md` §12; `docs/REQUIREMENTS.md` (`R-025`); `D-055`. |
| `M-017` | Quitar la sección **Lo que no se toca** del diseñador de temas (`D-056`). | `done` | La página `/theme` termina en la exportación; los límites siguen explicados en la introducción, el cuerpo de exportación y las comprobaciones AA; sin cambios de parámetros, cálculos ni comportamiento; tests verdes. | `apps/catalog/src/pages/theme.tsx`; `apps/catalog/src/pages/theme.test.tsx`; `D-056`. |
| `M-018` | Sustituir las tarjetas de **Límites** y **Reglas** en `/tokens/format` por listas con reglas (`D-050`). | `done` | Las dos últimas secciones usan una lista de una columna con `divide-y` y borde superior/inferior; sin rejilla de dos columnas ni barra lateral; el contenido y los encabezados se conservan; `bun run check` verde. | `apps/catalog/src/pages/tokens/format.tsx`; `D-050`. |

---

## 6. Inventario de componentes

> Estado inicial: todo `todo`. La fase indica cuándo se implementa, no cuándo se documenta.

### Primitivas

| ID | Componente | Fase | Estado | Notas |
| --- | --- | --- | --- | --- |
| `C-001` | Button | 0 | `done` | primary/secondary/outline/ghost/danger/link; xs–lg; loading; `render`. |
| `C-002` | Panel | 0 | `done` | header/body/footer; tone; flush para tablas. |
| `C-003` | Badge | 0 | `done` | tone + appearance; status dot; sale/new. |
| `C-004` | IconButton | 1 | `done` | `aria-label` obligatorio; ghost/outline; tamaños. |
| `C-005` | Link | 1 | `done` | Subrayado; externo; foco. |
| `C-006` | Field | 1 | `done` | Wrapper de Base UI Field; label/description/error. |
| `C-007` | Input | 1 | `done` | Tamaños; inválido; iconos pendientes. |
| `C-008` | Textarea | 1 | `done` | Altura mínima; resize vertical; inválido. |
| `C-009` | Select | 1 | `done` | Base UI Select; lista simple; disabled. |
| `C-010` | Combobox | 1 | `done` | Base UI Combobox; filtro local; labels i18n. |
| `C-011` | Checkbox | 1 | `done` | Indeterminate; label y descripción. |
| `C-012` | RadioGroup | 1 | `done` | Base UI RadioGroup; vertical/horizontal. |
| `C-013` | Switch | 1 | `done` | Base UI Switch; label y descripción. |
| `C-014` | NumberField | 1 | `done` | Cantidad; steppers; teclado; límites. |
| `C-015` | FormRow | 1 | `done` | Horizontal/vertical; hint/error. |
| `C-016` | SectionHeader | 1 | `done` | Título/meta/acciones; regla. |
| `C-017` | Rule / Separator | 1 | `done` | Hairline/doble/dashed; con label. |
| `C-018` | Alert | 1 | `done` | Tonos; icono; acción. |
| `C-019` | Toast | 1 | `done` | Base UI Toast; labels; reduced motion. |
| `C-020` | Progress | 1 | `done` | Determinado/indeterminado; label. |
| `C-021` | Meter | 1 | `done` | Niveles de stock; tonos. |
| `C-022` | Skeleton | 1 | `done` | Filas/texto; reduced motion. |
| `C-023` | EmptyState | 1 | `done` | Caja reglada; acción. |
| `C-024` | Hanko | 1 | `done` | Sello; 1–4 caracteres; tamaños; decorativo. |
| `C-025` | Tategaki | 1 | `done` | Texto vertical; oculto en mobile; decorativo. |
| `C-026` | Pattern | 1 | `done` | Seigaiha/asanoha; SVG; `aria-hidden`. |
| `C-027` | Breadcrumb | 1 | `done` | `aria-current`; separadores. |
| `C-028` | Pagination | 1 | `done` | Labels; page size; compacta. |
| `C-029` | Tabs | 1 | `done` | Base UI Tabs; underline. |
| `C-030` | Accordion | 1 | `done` | Base UI Accordion; multiple. |
| `C-031` | Dialog | 1 | `done` | Base UI Dialog; tamaños; foco. |
| `C-032` | Drawer | 1 | `done` | Dialog lateral; izquierda/derecha. |
| `C-033` | Menu | 1 | `done` | Base UI Menu; items/separadores. |
| `C-034` | Popover | 1 | `done` | Base UI Popover; título y cierre. |
| `C-035` | Tooltip | 1 | `done` | Base UI Tooltip; delay; side. |
| `C-036` | Toolbar | 1 | `done` | Base UI Toolbar; roving focus. |
| `C-037` | Table | 1 | `done` | Semántica; densidad; sticky header pendiente para el ERP. |
| `C-038` | DataTable | 1 | `done` | TanStack; sort/selección/paginación; vacío/loading; modo virtualizado (10k). |
| `C-039` | StatCard | 1 | `done` | Label/valor/delta/sparkline. |
| `C-040` | Sparkline / BarChart | 1 | `done` | SVG; fallback accesible. |
| `C-041` | ToggleGroup | 1 | `done` | Base UI ToggleGroup; vistas/densidad. |
| `C-062` | Label | 1 | `done` | Base UI Label dentro de Field; `htmlFor` independiente; required visual. |
| `C-063` | Calendar | 5 | `done` | Tabla con roving focus; flechas/Home/End/PageUp/PageDown; min/max; locale. |
| `C-064` | DatePicker | 5 | `done` | Field con panel anclado; single/range; Escape y clic fuera; formato `Intl`. |
| `C-065` | CommandPalette | 5 | `done` | Combobox + listbox; filtro; teclado; foco atrapado y devuelto. |

### Patrones de storefront

| ID | Componente | Fase | Estado | Notas |
| --- | --- | --- | --- | --- |
| `C-042` | SearchBar | 2 | `done` | Select de categoría + input search + botón; `role=search` en `<search>`. |
| `C-043` | NoticeList | 2 | `done` | Fechas con `dateTime`; tags; “ver más”. |
| `C-044` | RankedList | 2 | `done` | Ranking; precio; imagen 40 px. |
| `C-045` | ProductCard | 2 | `done` | Imagen/precio/badges; enlace con nombre accesible. |
| `C-046` | PriceBlock | 2 | `done` | Impuestos/puntos/stock/precio anterior. |
| `C-047` | SpecTable | 2 | `done` | Tabla semántica agrupada con `scope=row`. |
| `C-048` | CampaignBanner | 2 | `done` | Strip/card/hero; texto real. |
| `C-049` | StoreHeader | 2 | `done` | Utility/head/nav; Hanko y slots. |
| `C-050` | Footer | 2 | `done` | Columnas densas sobre sumi; legal. |
| `C-051` | ProductGallery | 2 | `done` | Miniaturas con `aria-pressed`; imagen principal con alt. |
| `C-052` | ReviewSummary | 2 | `done` | Rating; distribución; reseñas verificadas. |

### Patrones de ERP

| ID | Componente | Fase | Estado | Notas |
| --- | --- | --- | --- | --- |
| `C-053` | AppShell | 3 | `done` | Sidebar/topbar/content; skip link; 232 px. |
| `C-054` | SideNav | 3 | `done` | Grupos; activo; conteo; colapso móvil. |
| `C-055` | TopBar | 3 | `done` | Búsqueda/acciones/usuario; sticky. |
| `C-056` | PageHeader | 3 | `done` | Breadcrumb/título/descripción/acciones. |
| `C-057` | FilterBar | 3 | `done` | Campos; aplicar/limpiar; resultado. |
| `C-058` | DetailDrawer | 3 | `done` | Secciones/timeline/acciones; foco devuelto. |
| `C-059` | StatusBadge | 3 | `done` | Mapa de estados; punto + texto. |
| `C-060` | FormSection | 3 | `done` | Fieldset/legend; grid 1/2 columnas. |
| `C-061` | Timeline | 3 | `done` | Eventos de pedido con tono y fecha. |

---

## 7. Trazabilidad de requisitos

| ID | Requisito | Tareas | Estado |
| --- | --- | --- | --- |
| `R-001` | Set de componentes estilo shadcn, copiable, con variantes y buen uso de Tailwind. | `F0-003`, `F0-004`, `F0-007`, `F1-001`–`F1-010` | `done` |
| `R-002` | Estética del web japonés clásico: densidad, marcos, reglas, color semántico. | `D-002`, `F0-004`, `F1-003`, `F2-*`, `F3-*` | `done` |
| `R-003` | Dos modos: Chirashi (storefront) y Daichō (ERP). | `F0-004`, `F0-006`, `F0-011`, `F2-*`, `F3-*` | `done` |
| `R-004` | Funciona en cualquier idioma; el japonés es parte de la esencia. | `F0-005`, `F0-010`, `F2-001`, `F3-001`, `F4-001` | `done` |
| `R-005` | Desktop-first y optimizado para navegadores. | `F0-002`, `F0-003`, `F4-003`, `F4-004` | `done` |
| `R-006` | POC 1: frontpage de producto. | `F2-001`–`F2-008` | `done` |
| `R-007` | POC 2: backoffice estilo ERP. | `F3-001`–`F3-008` | `done` |
| `R-008` | Bun, Biome, React, TypeScript y estándares modernos. | `F0-001`, `F0-002` | `done` |
| `R-009` | Base UI + Tailwind v4. | `D-003`, `D-004`, `F0-003` | `done` |
| `R-010` | Catálogo y documentación viva. | `F0-006`, `F0-012`, `F1-009`, `F4-005` | `done` |
| `R-011` | Accesibilidad AA. | `F1-010`, `F4-002` | `done` |
| `R-012` | Presupuestos de performance. | `F4-003` | `done` |
| `R-013` | Estrategia de fuentes CJK sin archivos completos. | `D-006`, `F0-004`, `F4-003` | `done` |
| `R-014` | Texto real, nunca texto en imágenes. | `D-010`, `F2-003`, `F2-004`, `F4-002` | `done` |
| `R-015` | Demos en JA/ES/EN. | `F2-001`, `F2-006`, `F3-001`, `F3-007`, `F4-001` | `done` |
| `R-016` | Referencias y análisis documentados. | `F0-000`, `docs/REQUIREMENTS.md`, `docs/DESIGN-SYSTEM.md` | `done` |
| `R-017` | Sin clichés decorativos ni “cargo cult” japonés. | `D-002`, `docs/DESIGN-SYSTEM.md` | `done` |
| `R-018` | Registry shadcn opcional. | `F5-001`, `M-006` | `done` |
| `R-019` | Tema oscuro Sumi opcional. | `F5-002`, `D-035` | `done` |
| `R-020` | Trazabilidad entre sesiones. | `F0-000`, `AGENTS.md`, `docs/PROGRESS.md` | `done` |
| `R-021` | Portada editorial del catálogo. | `M-003`, `D-041` | `done` |
| `R-022` | Documentación individual por componente y bloque, con instalación, preview/código, props, a11y y referencia Base UI. | `M-004`, `D-042` | `done` |
| `R-023` | Despliegue de producción en un dominio con catálogo, storefront y ERP bajo rutas distintas, imagen Docker y CI. | `M-005`, `D-043` | `done` |
| `R-024` | Documentación para agentes (`llms.txt`, Markdown por pieza) y skills `koten-ui`/`koten-design-system` compatibles con `npx skills`. | `M-007`, `D-045` | `done` |
| `R-025` | Empezar separado en usar el sistema y desarrollar el sistema, con requisitos y comandos propios. | `M-008`, `D-046` | `done` |
| `R-026` | Selector npx/bunx persistente para los comandos de shadcn. | `M-009`, `D-047` | `done` |
| `R-027` | Skill portátil para crear piezas que el catálogo no trae, con la gramática, tokens, forma y contraste de Koten. | `M-010`, `D-048` | `done` |
| `R-028` | i18n personalizable: cualquier BCP 47, diccionarios JSON por idioma y un único punto de edición. | `M-011`, `D-049` | `done` |
| `R-029` | Documentación directa: sin repeticiones ni explicaciones fuera de lugar, y listas en lugar de tarjetas en las secciones de lectura. | `M-012`, `D-050` | `done` |
| `R-030` | Diseñador de temas con parámetros curados, validación AA y export de un overlay de tokens. | `M-013`, `D-051` | `done` |

---

## 8. Riesgos

| ID | Riesgo | Impacto | Mitigación |
| --- | --- | --- | --- |
| `RISK-001` | Base UI cambia API o falta una primitiva. | Medio | Wrappers propios; fallback a HTML nativo; versión fijada; tests de integración. |
| `RISK-002` | Fuentes CJK destruyen el rendimiento. | Alto | Stack del sistema; subsets solo para titulares; presupuesto de 0 KB CJK. |
| `RISK-003` | La densidad vuelve ilegible la UI. | Alto | 12 px mínimo; AA; pruebas con ES/EN; revisión visual. |
| `RISK-004` | El texto en ES/EN rompe columnas y botones. | Medio | Toggles de idioma; alturas flexibles; `min-width: 0`; QA a 1024. |
| `RISK-005` | Scope creep por cantidad de componentes. | Alto | Inventario cerrado; fases; decisiones `D-*` para agregar. |
| `RISK-006` | Catálogo y demos divergen. | Medio | Los demos consumen `@koten/ui`; el catálogo usa los mismos componentes. |
| `RISK-007` | React 19 + Base UI + Vite tienen fricción inicial. | Bajo/Medio | Instalación temprana en `F0-003`; pin de versiones; CI. |
| `RISK-008` | Diferencias de render de fuentes entre SO. | Medio | Capturas en Linux/CI; tolerancias; no comparar pixel-perfect entre plataformas. |
| `RISK-009` | El storefront SPA no es ideal para SEO. | Medio | POC asume SPA; evaluar SSG/SSR en `F5-006`. |
| `RISK-010` | Assets sin licencia clara. | Bajo | Assets locales, licencias documentadas, sin hotlinking. |
| `RISK-011` | Copiar el clutter de las referencias sin criterio. | Alto | Principios y Do/Don’t; texto real; jerarquía; 12 px mínimo. |
| `RISK-012` | Tokens de texto o de borde por debajo del contraste AA. | Medio | Test automático de contraste en `tokens.css`; faint/rule-strong/kin ajustados; revisión en `F1-010` y `F4-002`. |
| `RISK-013` | Los datos mock de las demos divergen del futuro backend. | Medio | Tipos compartidos por app, generador determinista y adaptadores únicos; reemplazar módulos de datos sin tocar componentes. |
| `RISK-014` | Las ilustraciones SVG no representan el producto final. | Bajo | Assets locales propios y reemplazables; `D-022`; sustituir por fotografía antes de producción sin cambiar la API de los patrones. |
| `RISK-015` | Un overlay modal o una lista de datos inestable bloquea la interacción de la página. | Alto | `Select` no modal por defecto, dropdown estándar y `DataTable` con identidad estable; tests de regresión y `D-024`; stress en navegador antes de cerrar. |
| `RISK-016` | El prefijo del proxy y el `base` de Vite se desincronizan y los assets de las demos caen en el catálogo. | Alto | nginx conserva el prefijo y hace fallback por app; `base` de producción probado con `vite preview`, `docker build`, curls a `/demos/{store,erp}/` y navegador; presupuesto acepta cualquier `base`; variables `VITE_*` para cambiar dominio sin tocar código. |
| `RISK-017` | La capa de agentes se desactualiza o `npx skills` no puede acceder al repositorio si cambia de visibilidad. | Medio | Generación desde una sola fuente en `predev`/`prebuild`; `bun run ai:check` dentro de `bun run check`; el catálogo sigue funcionando sin skills; documentar el acceso requerido al instalar. |
| `RISK-018` | Un tema exportado se edita a mano después del diseñador y rompe el contraste o la gramática. | Medio | El diseñador solo acepta parámetros curados y bloquea la exportación si falla AA; el CSS declara que es un overlay y la documentación pide verificar con contenido real; las combinaciones por defecto están cubiertas por tests. |
| `RISK-019` | `README.md` y `README.es.md` divergen en comandos, cifras o enlaces. | Bajo | Las cifras viven en el roadmap y no se repiten como fuente; ambos README se actualizan en el mismo commit y se revisan en cada cambio de alcance; los enlaces mutuos están en la primera línea. |

---

## 9. Decisiones pendientes

| ID | Pregunta | Estado | Se decide en |
| --- | --- | --- | --- |
| `Q-001` | ¿Modo oscuro Sumi dentro de la v1? | `decided` — `D-034` (no en v1) | `F5-002` |
| `Q-002` | ¿Registry/CLI dentro de la v1? | `decided` — `D-034` (no en v1) | `F5-001` |
| `Q-003` | ¿Producto y assets finales del storefront? | `decided` — `D-021`, `D-022` | `F2-001` |
| `Q-004` | ¿Destino de deploy del POC? | `decided` — `D-031` | `F4-006` |
| `Q-005` | ¿Licencia del repo? | `decided` — `D-053` (MIT) | `F0-001` |
| `Q-006` | ¿Matriz exacta de navegadores? | `open` (propuesta: últimas 2 versiones) | `F0-002` |
| `Q-007` | ¿Proveedor de CI? | `decided` — `D-018` | `F0-008` |
| `Q-008` | ¿Publicar `@koten/ui`? | `decided` — `D-033` (no) | `F5-007` |
| `Q-009` | ¿Estilos de impresión para specs/facturas? | `decided` — `D-030` (no en v1) | `F4-005` |
| `Q-010` | ¿Nivel de soporte RTL? | `decided` — `D-026` | `F4-001` |

---

## 10. Protocolo de sesión

1. Leer `docs/PROGRESS.md`, este roadmap y `docs/DECISIONS.md`.
2. Elegir la primera tarea `todo` cuyas dependencias estén `done`. No saltar fases sin una decisión.
3. Marcar la tarea `in_progress` y agregar una entrada en `PROGRESS.md`.
4. Implementar, probar y documentar.
5. Registrar evidencia (ruta, comando, commit) en la tabla.
6. Marcar `done` o `blocked`; si aparece una decisión, agregar `D-*` en `DECISIONS.md`.
7. Ejecutar `bun run check` antes de cerrar.
8. No renumerar IDs; no borrar entradas de la bitácora; no cambiar alcance en silencio.

El detalle operativo está en [AGENTS.md](./AGENTS.md).

---

## 11. Registro de cambios

| Fecha | Cambio | Autor |
| --- | --- | --- |
| 2026-10-20 | Creación inicial: decisiones `D-001`–`D-017`, fases 0–5, inventario, trazabilidad, riesgos y protocolo. | Sesión 001 |
| 2026-10-20 | Scaffold: git + workspace Bun, tres apps Vite/React/TS, `packages/ui`, Tailwind v4 + Base UI + CVA, tokens/temas/densidad y páginas placeholder. `F0-001`–`F0-003` → `done`; `F0-004` → `in_progress` (espécimen pendiente). Versiones resueltas: Vite 8.3.4, TS 7.0.2, React 19.3.1, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5. | Sesión 002 |
| 2026-10-20 | Espécimen de tokens, `KotenProvider`/labels/formato, shell con toggles en URL y primera validación `Button`/`Panel`/`Badge`. `F0-004`–`F0-007` → `done`. Tokens `faint`, `rule-strong` y `kin` ajustados para AA; roles `sale`/`new`; test de contraste agregado (`RISK-012`). | Sesión 003 |
| 2026-10-20 | Cierre de fase 0: CI en GitHub Actions + `bun run ci`, `D-018`, `Q-007` cerrada, README y handoff validados. `F0-008`–`F0-009` → `done`; **fase 0 → `done`**. Próxima: `F1-001`. | Sesión 003 |
| 2026-10-20 | Pulido pre-fase 1: selector de idioma ES/JA/EN, documentación sensible a tema/densidad y catálogo wiki con sidebar, menú móvil y pager. `F0-010`–`F0-012` → `done`; `D-019` y `D-020`; **fase 0 reconfirmada `done`**. | Sesión 004 |
| 2026-10-20 | Fase 1 iniciada: `Field`, `Label`, `Input`, `Textarea` y `FormRow` con Base UI, estados, error accesible y página de catálogo. `F1-001` → `done`; `C-006`–`C-008`, `C-015` y `C-062` → `done`. | Sesión 005 |
| 2026-10-20 | Inputs avanzados: `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch` y `NumberField` con Base UI, tests y página `/components/inputs`. `F1-002` → `done`; `C-009`–`C-014` → `done`. | Sesión 006 |
| 2026-10-20 | Superficies y decorativos: `SectionHeader`, `Rule`, `Hanko`, `Tategaki` y `Pattern` con página `/components/surfaces`. `F1-003` → `done`; `C-016`, `C-017`, `C-024`–`C-026` → `done`. | Sesión 007 |
| 2026-10-20 | Feedback: `Alert`, `Toast`, `Progress`, `Meter`, `Skeleton` y `EmptyState` con página `/components/feedback`. `F1-004` → `done`; `C-018`–`C-023` → `done`. | Sesión 008 |
| 2026-10-21 | Navegación: `Link`, `Breadcrumb`, `Pagination`, `Tabs` y `Accordion` con página `/components/navigation`. `F1-005` → `done`; `C-005`, `C-027`–`C-030` → `done`. | Sesión 009 |
| 2026-10-21 | Overlays: `Dialog`, `Drawer`, `Menu`, `Popover` y `Tooltip` con página `/components/overlays`. `F1-006` → `done`; `C-031`–`C-035` → `done`. | Sesión 010 |
| 2026-10-21 | Datos: `Table`, `DataTable` con TanStack, `StatCard`, `Sparkline` y `BarChart` con página `/components/data`. `F1-007` → `done`; `C-037`–`C-040` → `done`. | Sesión 011 |
| 2026-10-21 | Controles: `IconButton`, `ToggleGroup` y `Toolbar` con página `/components/controls`. `F1-008` → `done`; `C-004`, `C-036` y `C-041` → `done`. | Sesión 012 |
| 2026-10-21 | Catálogo completo de primitivas: inventario C-001–C-041 + C-062, enlaces, copiar código y trazabilidad. `F1-009` → `done`. | Sesión 013 |
| 2026-10-21 | A11y/performance: axe en 11 páginas, `bun run budget` con presupuestos de JS/CSS/fuentes, foco visible y QA visual. `F1-010` → `done`; **fase 1 → `done`**. Próxima: `F2-001`. | Sesión 014 |
| 2026-10-21 | Auditoría i18n: guardia automática (`check:i18n`) de strings, labels, `Intl` y utilidades físicas; ratings y badge localizados; migración a propiedades lógicas; QA de expansión y RTL en 72 combinaciones. `F4-001` → `done`; `D-026`; **fase 4 → `in_progress`**. Próxima: `F4-002`. | Sesión 019 |
| 2026-10-21 | Auditoría a11y en navegador: axe con contraste real, foco por teclado y piso de 12 px en 30 páginas (1440/390, 3 idiomas, drawer y select). `F4-002` → `done`; `D-027`, `D-028`; `R-011` → `done`. Próxima: `F4-003`. | Sesión 020 |
| 2026-10-21 | Auditoría de performance: LCP/CLS medidos sobre el build, presupuesto inicial/total y code splitting del catálogo (304,5 → 243,4 KB inicial). `F4-003` → `done`; `D-029`; `R-012` → `done`. Próxima: `F4-004`. | Sesión 021 |
| 2026-10-21 | QA visual con capturas archivadas (21 en 1440/1280/1024), overflow/RTL en 96 combinaciones y corrección de IDs en la tabla. `F4-004` → `done`. Próxima: `F4-005`. | Sesión 022 |
| 2026-10-21 | Documentación final: página Empezar trilingüe, `docs/RECIPES.md`, README actualizado y decisión de impresión. `F4-005` → `done`; `D-030`; `Q-009` cerrada. Próxima: `F4-006`. | Sesión 023 |
| 2026-10-21 | Definition of Done revisado y cierre de fase 4: `D-031` (sin deploy en v1), presupuesto del catálogo a 340 KB total, tag `v0.1.0-poc`. `F4-006` → `done`; **fase 4 → `done`**. | Sesión 024 |
| 2026-10-21 | Fase 5 iniciada con las dos evaluaciones: `D-032` (Astro con islas para el storefront productivo) y `D-033` (no publicar el paquete); `D-034` cierra `Q-001`/`Q-002`. `F5-006`, `F5-007` → `done`. | Sesión 025 |
| 2026-10-21 | Tema Sumi: tokens oscuros, roles sólidos e inversos, selector y pre-paint, contraste AA en 4 temas y axe en oscuro. `F5-002` → `done`; `D-035`. | Sesión 026 |
| 2026-10-21 | DatePicker y Calendar sin dependencias: teclado, rango, locale y panel anclado; ERP migra el campo de fecha. `F5-003` → `done`; `D-036`; `C-063`/`C-064`. | Sesión 027 |
| 2026-10-21 | CommandPalette con combobox/listbox, filtro y foco atrapado; página de catálogo y auditoría con el diálogo abierto. `F5-004` → `done`; `D-037`; `C-065`; presupuesto del catálogo 260/360 KB. | Sesión 028 |
| 2026-10-21 | Virtualización de DataTable sin dependencias: ventana, sticky header, ARIA de filas y demo de 10 000 filas. `F5-005` → `done`; `D-038`. | Sesión 029 |
| 2026-10-21 | Registry shadcn autocontenido: 64 items con tokens, generados en `predev`/`prebuild` e instalados con `npx shadcn add <url>` (validado con `tsc`). `F5-001` → `done`; `D-039`; **fase 5 → `done`**. | Sesión 030 |
| 2026-10-21 | Fase 2: contenido JA/ES/EN, 11 patrones de storefront, página HIKARI con galería, precio, specs, reviews, avisos, ranking, campaña y footer; `?lang=`. `F2-001`–`F2-008` → `done`; `D-021` y `D-022`; `Q-003` cerrada; **fase 2 → `done`**. | Sesión 015 |
| 2026-10-21 | Fase 3: datos deterministas (132 pedidos), shell, dashboard, pedidos con filtros en URL, drawer con timeline, formulario validado y placeholders; ES/JA/EN. `F3-001`–`F3-008` → `done`; `D-023`; **fase 3 → `done`**. Próxima: `F4-001`. | Sesión 016 |
| 2026-10-21 | Corrección de interacción: `Select` no modal y dropdown estándar; `DataTable` conserva la identidad de `data`, por lo que la paginación avanza; tests de regresión y stress en navegador. `F3-009` → `done`; `D-024`; `RISK-015`. | Sesión 017 |
| 2026-10-21 | Mejora puntual `M-001`: cuerpo del catálogo localizado ES/JA/EN, labels de docs/espécimen, `lang` del documento y auditoría i18n de demos. `D-025`; `bun run check` verde. | Sesión 018 |
| 2026-10-21 | Mejora puntual `M-002`: source 100% en inglés (comentarios, JSDoc, mensajes y tests) con la documentación intacta en ES/JA/EN; Fundamentos rediseñado como portada con espécimen y previews, sin fases ni IDs internos en el copy visible; `D-040`; `biome.json` ignora `public/r`; `bun run check` (202 tests) y `bun run budget` verdes. | Sesión 031 |
| 2026-10-21 | Mejora puntual `M-003`: `/` pasa a landing editorial del sistema con placa viva, tres registros, índice de 45+20 piezas, principios, demos e instalación; layout ancho sin sidebar; inventarios compartidos; `D-041` y `R-021`; `bun run check`, `qa:a11y`, `qa:overflow` y `bun run budget` verdes. | Sesión 032 |
| 2026-10-21 | Mejora puntual `M-005`: producción en `koten.codehive.com.co` con una imagen Bun + nginx, compose de tres puertos y routers de Traefik para `/`, `/demos/store` y `/demos/erp`; `base` de Vite por app, `basename` del ERP, URLs centralizadas, registry y comandos shadcn con el dominio de producción, CI que publica en GHCR. `D-043`, `R-023`, `RISK-016`. | Sesión 034 |
| 2026-10-21 | Mejora puntual `M-006`: el registry usa los placeholders `@ui`/`@components`/`@lib` y los aliases de `components.json`, los imports se reescriben a `~/...`, y `koten-theme` escribe tokens, temas y densidad en el `tailwind.css` del proyecto sin crear `styles/`. Instalación real con aliases `~/...`, compilación Tailwind 4 y `bun run check` (212 tests) verdes. `D-044`, `R-018`. | Sesión 035 |
| 2026-10-21 | Mejora puntual `M-007`: capa de documentación para agentes en tres niveles (`llms.txt`, Markdown por componente/bloque y guías), skills `koten-ui` y `koten-design-system` compatibles con `npx skills`, página `/ai`, generación desde una sola fuente y `bun run ai:check` en `bun run check`. `D-045`, `R-024`, `RISK-017`. | Sesión 036 |
| 2026-10-21 | Mejora puntual `M-008`: **Empezar** se separa en dos caminos, usar Koten UI (registry, `KotenProvider`, sin Bun ni clonar) y desarrollar Koten UI (monorepo, `bun run dev`, `check`, auditorías); se elimina el flujo obsoleto de copiar `packages/ui`; README replica la separación. `D-046`, `R-025`. | Sesión 037 |
| 2026-10-21 | Mejora puntual `M-009`: selector **npx / bunx** en Empezar, portada e instalación de cada componente/bloque, persistido en `localStorage` y compartido entre páginas; `registryCommand` respeta el runner y la documentación generada incluye ambos comandos. `D-047`, `R-026`. | Sesión 038 |
| 2026-10-22 | Mejora puntual `M-010`: tercera skill `koten-design-language`, portátil y enfocada en crear una pieza que el catálogo no trae con la esencia de Koten (roles semánticos, marcos de 1 px, radios de 2–3 px, sombras solo en overlays, contraste AA, tipografía y densidad); `/ai` conserva tres niveles y presenta las dos skills de extensión; `ai:check` valida que cada `--koten-*` citado exista en el tema. `D-048`, `R-027`. | Sesión 039 |
| 2026-10-22 | Mejora puntual `M-011`: i18n personalizable con cualquier BCP 47, runtime e inglés base en `koten-i18n`, packs JSON por idioma (`koten-i18n-es`, `koten-i18n-ja`), registro en `dictionaries.ts` y documentación de las tres capas en `/tokens/format`, Empezar, RECIPES y skills. `D-049`, `R-028`. | Sesión 040 |
| 2026-10-22 | Mejora puntual `M-012`: revisión editorial del catálogo y las guías; requisitos y accesibilidad como listas, índices sin tarjetas, menos boilerplate repetido, README y documentos internos más directos, y corrección de referencias obsoletas a 11 px. `D-050`, `R-029`. | Sesión 041 |
| 2026-10-22 | Mejora puntual `M-013`: página `/theme` para diseñar un tema con cinco parámetros curados (registro, pigmento, papel, radio, densidad), 11 comprobaciones AA, bloqueo de exportación y papel seguro; overlay de tokens para pegar tras `koten-theme`, estado compartible en `?ks=` y enlace desde Temas. `D-051`, `R-030`, `RISK-018`. | Sesión 042 |
| 2026-10-22 | Mejora puntual `M-014`: `README.md` pasa a inglés como entrada del repositorio y `README.es.md` conserva la versión española como espejo opcional; enlaces mutuos en la primera línea, documentos de trabajo en español y artefactos de agentes en inglés. `D-052`, `RISK-019`. | Sesión 043 |
| 2026-10-22 | Licencia MIT: `LICENSE`, campo `license` en la raíz y las cuatro workspaces, sección de licencia en ambos README y cierre de `Q-005` con `D-053`. `F0-001` queda con la licencia definida. | Sesión 044 |
| 2026-10-22 | Mejora puntual `M-015`: el header del catálogo cambia los toggles inline por un botón **Configuración** que abre un panel flotante con tema, densidad e idioma en rejillas apiladas; el panel se adapta al viewport, tiene scroll y cabecera sticky, y las opciones se generan desde los datos. `D-054`. | Sesión 045 |
| 2026-10-22 | Mejora puntual `M-016`: **Empezar** elimina las secciones **Antes de empezar**, integra los requisitos en la introducción, numera solo los pasos obligatorios y deja skills, auditorías y registry como opcionales; las listas de trabajo y mapa pasan a una columna con reglas y el selector de runner deja de ser una tarjeta. `D-055`, `R-025`. | Sesión 046 |
| 2026-10-22 | Mejora puntual `M-017`: `/theme` elimina la sección **Lo que no se toca**; los límites siguen en la introducción, la exportación y las comprobaciones AA. `D-056`. | Sesión 047 |
| 2026-10-22 | Mejora puntual `M-018`: **Límites** y **Reglas** de `/tokens/format` pasan de una rejilla de dos columnas con barra lateral a una lista de una columna con reglas. `D-050`. | Sesión 048 |
