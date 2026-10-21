# Koten UI — Hoja de ruta

> **Documento vivo y fuente de verdad del estado del proyecto.**
> Última actualización: **2026-10-21**
> Fase actual: **4 — Cierre del POC** (`in_progress`)
> Próxima tarea: **`F4-003`** — auditoría de performance
> Tarea en curso: **ninguna**
> Última tarea completada: **`F4-002`**
> Mejora puntual completada: **`M-001`** — i18n del catálogo
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

**No objetivos de la v1:** publicar un paquete npm, tener un CLI propio, modo oscuro completo, SSR/SSG de producción, virtualización de tablas y componentes de terceros que no estén en el inventario.

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
| `F0-001` | Inicializar git y workspace de Bun (`apps/*`, `packages/*`). | `F0-000` | `done` | `bun install` funciona; scripts raíz `dev`, `build`, `check`, `test`; `.gitignore` creado; licencia definida o `Q-005` registrada como pendiente. | `package.json`, `bun.lock`, `.gitignore`, `.git/` (`git init -b main`, sin commit inicial); `bun install` OK. Licencia: `Q-005` sigue abierta. |
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

**Estado:** `in_progress` · **Objetivo:** dejar el POC auditable, medible y retomable.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F4-001` | Auditoría i18n: strings, labels, `Intl`, expansión de texto y RTL best-effort. | `F2-007`, `F3-008` | `done` | Sin strings hardcodeadas; ES/EN sin clipping; fechas/moneda correctas. | `scripts/check-i18n.ts` + test (30 archivos / 177 tests); badge `NEW` y ratings a `formatNumber`/`formatCurrency`; utilidades físicas → lógicas en 25 archivos; `scripts/qa-overflow.ts` → 72 combinaciones sin desbordamiento/recorte, RTL incluido; `D-026`; `Q-010` cerrada. |
| `F4-002` | Auditoría a11y: axe, teclado, contraste y lector de pantalla. | `F4-001` | `done` | AA; foco visible; 12 px mínimo; sin serious/critical. | `scripts/qa-a11y.ts`: axe-core en Chromium con contraste real, 12 rutas × 3 idiomas × 1440/390 (72 páginas, drawer y select incluidos) → 0 serious/critical, 0 textos < 12 px, 0 focos sin indicador. Correcciones: piso tipográfico `2xs` 11→12 px (`D-027`), activos nav a `text-primary-strong`, labels de marca y `viewOrder` alineados con el texto visible, regiones desplazables de tabla/código con `tabIndex={0}`, focus guards de Base UI acotados en axe (`D-028`). |
| `F4-003` | Auditoría performance: bundles, fuentes, LCP/CLS y code splitting. | `F4-001` | `todo` | Presupuestos de la sección 4 cumplidos. | — |
| `F4-004` | QA visual en 1440/1280/1024 para catálogo, storefront y ERP. | `F4-001` | `todo` | Capturas archivadas; diferencias corregidas. | — |
| `F4-005` | Documentación final: README, catálogo, principios, tokens y recetas. | `F4-001` | `todo` | Un tercero puede usar el sistema sin leer el código. | — |
| `F4-006` | Revisión de Definition of Done y tag `v0.1.0-poc`. | `F4-002`–`F4-005` | `todo` | Checklist completo; tag creado; bitácora actualizada. | — |

---

### Fase 5 — Opcional / posterior

**Estado:** `todo` · **Objetivo:** ampliar sin comprometer la v1.

| ID | Tarea | Depende de | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- |
| `F5-001` | Registry shadcn: `registry.json`, build y instalación por URL. | `F4-006` | `todo` | `npx shadcn add <url>` instala un componente con sus tokens. | — |
| `F5-002` | Tema Sumi (dark) con contraste AA. | `F4-006` | `todo` | Tema conmutable; sin flash; componentes existentes sin cambios. | — |
| `F5-003` | DatePicker / Calendar. | `F4-006` | `todo` | Teclado, rango y locale. | — |
| `F5-004` | CommandPalette. | `F4-006` | `todo` | Búsqueda, teclado y focus trap. | — |
| `F5-005` | Virtualización de DataTable. | `F4-006` | `todo` | 10k filas sin degradación perceptible. | — |
| `F5-006` | Evaluar SSG/SSR para el storefront (Astro/Next). | `F4-006` | `todo` | Decisión documentada con tradeoffs. | — |
| `F5-007` | Evaluar publicación de `@koten/ui`. | `F4-006` | `todo` | Decisión documentada; build de librería si aplica. | — |

---

### Mejoras puntuales

> Trabajo fuera de la secuencia de fases. No reemplaza tareas del roadmap; se registra con `M-*` y una decisión si cambia alcance.

| ID | Mejora | Estado | Criterio de aceptación | Evidencia |
| --- | --- | --- | --- | --- |
| `M-001` | i18n completo del catálogo y auditoría de las demos. | `done` | Cuerpo de las 25 páginas en ES/JA/EN; labels de `docs.tsx` y `specimen.tsx` localizados; `lang` del documento sigue al locale; demos sin strings hardcodeadas; `bun run check` verde. | Diccionarios por página en `apps/catalog/src/pages/**`; `lib/i18n.ts`; `data/{catalog,tokens}.ts`; `components/{docs,specimen,catalog-layout}.tsx`; `D-025`; test `pages/i18n.test.tsx`; `apps/erp/src/pages/orders.tsx` (label de email); `bun run budget` → catálogo 304,5 KB JS. |

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
| `C-038` | DataTable | 1 | `done` | TanStack; sort/selección/paginación; vacío/loading. |
| `C-039` | StatCard | 1 | `done` | Label/valor/delta/sparkline. |
| `C-040` | Sparkline / BarChart | 1 | `done` | SVG; fallback accesible. |
| `C-041` | ToggleGroup | 1 | `done` | Base UI ToggleGroup; vistas/densidad. |
| `C-062` | Label | 1 | `done` | Base UI Label dentro de Field; `htmlFor` independiente; required visual. |

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
| `R-012` | Presupuestos de performance. | `F4-003` | `todo` |
| `R-013` | Estrategia de fuentes CJK sin archivos completos. | `D-006`, `F0-004`, `F4-003` | `done` |
| `R-014` | Texto real, nunca texto en imágenes. | `D-010`, `F2-003`, `F2-004`, `F4-002` | `done` |
| `R-015` | Demos en JA/ES/EN. | `F2-001`, `F2-006`, `F3-001`, `F3-007`, `F4-001` | `done` |
| `R-016` | Referencias y análisis documentados. | `F0-000`, `docs/REQUIREMENTS.md`, `docs/DESIGN-SYSTEM.md` | `done` |
| `R-017` | Sin clichés decorativos ni “cargo cult” japonés. | `D-002`, `docs/DESIGN-SYSTEM.md` | `done` |
| `R-018` | Registry shadcn opcional. | `F5-001` | `todo` |
| `R-019` | Tema oscuro Sumi opcional. | `F5-002` | `todo` |
| `R-020` | Trazabilidad entre sesiones. | `F0-000`, `AGENTS.md`, `docs/PROGRESS.md` | `done` |

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

---

## 9. Decisiones pendientes

| ID | Pregunta | Estado | Se decide en |
| --- | --- | --- | --- |
| `Q-001` | ¿Modo oscuro Sumi dentro de la v1? | `open` (propuesta: no) | `F5-002` |
| `Q-002` | ¿Registry/CLI dentro de la v1? | `open` (propuesta: no) | `F5-001` |
| `Q-003` | ¿Producto y assets finales del storefront? | `decided` — `D-021`, `D-022` | `F2-001` |
| `Q-004` | ¿Destino de deploy del POC? | `open` | `F4-006` |
| `Q-005` | ¿Licencia del repo? | `open` (propuesta: MIT) | `F0-001` |
| `Q-006` | ¿Matriz exacta de navegadores? | `open` (propuesta: últimas 2 versiones) | `F0-002` |
| `Q-007` | ¿Proveedor de CI? | `decided` — `D-018` | `F0-008` |
| `Q-008` | ¿Publicar `@koten/ui`? | `open` (propuesta: no en v1) | `F5-007` |
| `Q-009` | ¿Estilos de impresión para specs/facturas? | `open` | `F4-005` |
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
| 2026-10-21 | Fase 2: contenido JA/ES/EN, 11 patrones de storefront, página HIKARI con galería, precio, specs, reviews, avisos, ranking, campaña y footer; `?lang=`. `F2-001`–`F2-008` → `done`; `D-021` y `D-022`; `Q-003` cerrada; **fase 2 → `done`**. | Sesión 015 |
| 2026-10-21 | Fase 3: datos deterministas (132 pedidos), shell, dashboard, pedidos con filtros en URL, drawer con timeline, formulario validado y placeholders; ES/JA/EN. `F3-001`–`F3-008` → `done`; `D-023`; **fase 3 → `done`**. Próxima: `F4-001`. | Sesión 016 |
| 2026-10-21 | Corrección de interacción: `Select` no modal y dropdown estándar; `DataTable` conserva la identidad de `data`, por lo que la paginación avanza; tests de regresión y stress en navegador. `F3-009` → `done`; `D-024`; `RISK-015`. | Sesión 017 |
| 2026-10-21 | Mejora puntual `M-001`: cuerpo del catálogo localizado ES/JA/EN, labels de docs/espécimen, `lang` del documento y auditoría i18n de demos. `D-025`; `bun run check` verde. | Sesión 018 |
