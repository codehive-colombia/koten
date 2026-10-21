# Bitácora de sesiones — Koten UI

> **Append-only.** La entrada más reciente va arriba.
> Este archivo responde: ¿dónde estamos, qué se hizo y qué sigue?
> El estado detallado por tarea vive en [ROADMAP.md](../ROADMAP.md).

## Estado actual

| Campo | Valor |
| --- | --- |
| Fecha | 2026-10-20 |
| Fase | 1 — Primitivas (`in_progress`) |
| Última tarea completada | `F1-008` — controles |
| Tarea en curso | ninguna — próxima `F1-009` |
| Bloqueos | ninguno |
| Decisiones abiertas | `Q-001` a `Q-010`; `Q-007` cerrada por `D-018` |

## Cómo registrar una sesión

Copiar la plantilla, insertarla **debajo de “Estado actual”** y completar:

```md
## YYYY-MM-DD · Sesión NNN — Título

- **Objetivo:**
- **Hecho:**
- **Tareas tocadas:** `F0-001` → `done`; `F0-002` → `in_progress`
- **Decisiones:** `D-0xx` (si aplica)
- **Evidencia:** rutas, comandos, commits
- **Próximo:**
- **Bloqueos:**
```

Reglas:

- No borrar entradas anteriores.
- No renumerar tareas ni decisiones.
- Si una tarea queda a medias, dejarla `in_progress` y explicar el estado exacto.
- Si aparece un bloqueo, marcarlo `blocked` en el roadmap y describirlo acá.
- La evidencia debe ser verificable: ruta de archivo, comando ejecutado o hash de commit.

---

## 2026-10-21 · Sesión 012 — Controles

- **Objetivo:** completar `F1-008` con `IconButton`, `ToggleGroup` y `Toolbar`.
- **Hecho:**
  - `IconButton` con label accesible obligatorio, tamaños y variantes.
  - `ToggleGroup` sobre Base UI con `aria-pressed`, múltiple/único y orientación.
  - `Toolbar` con `ToolbarButton`, grupos y separadores; roving tabindex de Base UI.
  - Página `/components/controls` con demos de vistas, densidad y acciones; props, código y a11y.
- **Tareas tocadas:** `F1-008` → `done`; `C-004`, `C-036` y `C-041` → `done`.
- **Decisiones:** Ninguna nueva. Se agregó `lucide-react` al workspace del catálogo (ya era dependencia de UI).
- **Evidencia:** `packages/ui/src/components/ui/{icon-button,toggle-group,toolbar}.tsx` + `controls.test.tsx`; `apps/catalog/src/pages/components/controls.tsx`; `bun run check` verde (**20 archivos / 100 tests**).
- **Sin validar:** axe real (`F1-010`) y lector de pantalla.
- **Próximo:** `F1-009` — completar el catálogo de primitivas y la trazabilidad.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 011 — Datos

- **Objetivo:** completar `F1-007` con `Table`, `DataTable`, `StatCard`, `Sparkline` y `BarChart`.
- **Hecho:**
  - `Table` semántica con caption, headers, celdas y densidad por variables.
  - `DataTable` con **TanStack Table 8.21.3**: sorting, selección, paginación, `aria-live`, vacío y loading.
  - `StatCard` con valor, delta y sparkline; `Sparkline` SVG con `aria-label`.
  - `BarChart` con barras decorativas y tabla `sr-only` de respaldo.
  - Página `/components/data` con tabla, DataTable real, KPIs y chart; sidebar e índice.
- **Tareas tocadas:** `F1-007` → `done`; `C-037`–`C-040` → `done`.
- **Decisiones:** Se usa TanStack Table, ya previsto en `D-013`; se fijó en `8.21.3`.
- **Evidencia:** `packages/ui/src/components/ui/{table,data-table,stat-card,sparkline,bar-chart}.tsx` + `data-displays.test.tsx`; `apps/catalog/src/pages/components/data.tsx`; `bun run check` verde (**19 archivos / 97 tests**).
- **Sin validar:** axe real (`F1-010`), lector de pantalla y virtualización (fase 5).
- **Próximo:** `F1-008` — `Toolbar`, `ToggleGroup` e `IconButton`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 010 — Overlays

- **Objetivo:** completar `F1-006` con `Dialog`, `Drawer`, `Menu`, `Popover` y `Tooltip`.
- **Hecho:**
  - `Dialog` y `Drawer` con título/descripción, cierre, foco gestionado y lado configurable.
  - `Menu` con acciones/enlaces, separadores y teclado de Base UI.
  - `Popover` con cabecera, cierre y contenido breve.
  - `Tooltip` con delay y lado configurable, sin duplicar acciones críticas.
  - Página `/components/overlays` con demos, props, código y a11y; sidebar e índice.
- **Tareas tocadas:** `F1-006` → `done`; `C-031`–`C-035` → `done`.
- **Decisiones:** Ninguna nueva.
- **Evidencia:** `packages/ui/src/components/ui/{dialog,drawer,menu,popover,tooltip}.tsx` + `overlays.test.tsx`; `apps/catalog/src/pages/components/overlays.tsx`; `bun run check` verde (**18 archivos / 92 tests**).
- **Sin validar:** axe real (`F1-010`), lector de pantalla y gestos de swipe del Drawer.
- **Próximo:** `F1-007` — `Table`, `DataTable`, `StatCard`, `Sparkline` y `BarChart`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 009 — Navegación

- **Objetivo:** completar `F1-005` con `Link`, `Breadcrumb`, `Pagination`, `Tabs` y `Accordion`.
- **Hecho:**
  - `Link` con subrayado, foco y detección de externos (`target`, `rel`, icono decorativo).
  - `Breadcrumb` con `nav` + `ol`, separador y `aria-current="page"`.
  - `Pagination` compacta, con elipsis, labels configurables y extremos deshabilitados.
  - `Tabs` y `Accordion` sobre Base UI, con teclado y paneles accesibles.
  - Página `/components/navigation` con demos, props, código y a11y; scrollbar de la sidebar suavizado.
- **Tareas tocadas:** `F1-005` → `done`; `C-005` y `C-027`–`C-030` → `done`.
- **Decisiones:** Ninguna nueva.
- **Evidencia:** `packages/ui/src/components/ui/{link,breadcrumb,pagination,tabs,accordion}.tsx` + `navigation.test.tsx`; `apps/catalog/src/pages/components/navigation.tsx`; `bun run check` verde (**17 archivos / 87 tests**).
- **Sin validar:** axe real (`F1-010`) y lector de pantalla.
- **Próximo:** `F1-006` — `Dialog`, `Drawer`, `Menu`, `Popover` y `Tooltip`.
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 008 — Feedback

- **Objetivo:** completar `F1-004` con `Alert`, `Toast`, `Progress`, `Meter`, `Skeleton` y `EmptyState`.
- **Hecho:**
  - `Alert` con tonos info/success/warning/danger, icono, acción y roles status/alert.
  - `ToastProvider` + `useToast` sobre Base UI, con región accesible, cierre y tonos.
  - `Progress` determinado/indeterminado y `Meter` con tonos de stock.
  - `Skeleton` decorativo con `aria-hidden` y `EmptyState` con heading y acción.
  - Página `/components/feedback` con demos, props, código y a11y; sidebar e índice.
- **Tareas tocadas:** `F1-004` → `done`; `C-018`–`C-023` → `done`.
- **Decisiones:** Ninguna nueva; Base UI Toast/Progress/Meter ya estaban en el stack.
- **Evidencia:** `packages/ui/src/components/ui/{alert,toast,progress,meter,skeleton,empty-state}.tsx` + `feedback.test.tsx`; `apps/catalog/src/pages/components/feedback.tsx`; `bun run check` verde (**16 archivos / 81 tests**).
- **Sin validar:** axe real (`F1-010`), lector de pantalla y swipe del toast.
- **Próximo:** `F1-005` — `Link`, `Breadcrumb`, `Pagination`, `Tabs` y `Accordion`.
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 007 — Superficies y decorativos

- **Objetivo:** completar `F1-003` con `SectionHeader`, `Rule`, `Hanko`, `Tategaki` y `Pattern`.
- **Hecho:**
  - `SectionHeader` con título, jp, meta, acciones y regla configurable.
  - `Rule` hairline/strong/double/dashed, con o sin label; sin label usa `<hr>`.
  - `Hanko` de 1–4 caracteres, tamaños, rotación y modo decorativo/etiquetado.
  - `Tategaki` vertical, oculto en mobile y por defecto `aria-hidden`.
  - `Pattern` seigaiha/asanoha en SVG con `currentColor` al 8%, siempre decorativo.
  - Página `/components/surfaces` con demos, props, código y a11y; sidebar e índice actualizados.
- **Tareas tocadas:** `F1-003` → `done`; `C-016`, `C-017`, `C-024`, `C-025` y `C-026` → `done`.
- **Decisiones:** Ninguna nueva.
- **Evidencia:** `packages/ui/src/components/ui/{section-header,rule,hanko,tategaki,pattern}.tsx` + `surfaces.test.tsx`; `apps/catalog/src/pages/components/surfaces.tsx`; `bun run check` verde (**15 archivos / 75 tests**).
- **Sin validar:** axe real (`F1-010`) y lector de pantalla.
- **Próximo:** `F1-004` — `Alert`, `Toast`, `Progress`, `Meter`, `Skeleton` y `EmptyState`.
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 006 — Inputs avanzados

- **Objetivo:** completar `F1-002` con `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch` y `NumberField` sobre Base UI.
- **Hecho:**
  - `Select` con label, placeholder, lista, estados disabled y teclado de Base UI.
  - `Combobox` con filtro local, empty state, trigger accesible y labels i18n obligatorios.
  - `Checkbox` con estados checked/indeterminate, label y descripción; `Switch` con label y descripción.
  - `RadioGroup` vertical/horizontal con label de grupo y opciones descriptas.
  - `NumberField` con steppers accesibles, límites, step y estado disabled.
  - Página `/components/inputs` con demos, props, código y a11y; entrada en sidebar e índice.
- **Tareas tocadas:** `F1-002` → `done`; `C-009`–`C-014` → `done`.
- **Decisiones:** Ninguna nueva; Base UI ya estaba aceptado en `D-003`.
- **Evidencia:** `packages/ui/src/components/ui/{select,combobox,checkbox,radio-group,switch,number-field}.tsx` + `advanced-inputs.test.tsx`; `apps/catalog/src/pages/components/inputs.tsx`; exports en `index.ts`; `bun run check` verde (**14 archivos / 67 tests**).
- **Sin validar:** axe real (`F1-010`), lector de pantalla y combinaciones async de Combobox.
- **Próximo:** `F1-003` — `SectionHeader`, `Rule`, `Hanko`, `Tategaki` y `Pattern`.
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 005 — Formularios base

- **Objetivo:** iniciar la fase 1 con `F1-001`: `Field`, `Label`, `Input`, `Textarea` y `FormRow`, con estados accesibles y página de catálogo.
- **Hecho:**
  - `Field` sobre Base UI Field: label automático, descripción, error externo, `required`, `disabled` y orientación vertical/horizontal.
  - `Label` funciona dentro de `Field` y también de forma independiente con `htmlFor`; el asterisco de requerido es decorativo.
  - `Input` y `Textarea` heredan el estado del Field: `aria-invalid`, `required` y `disabled`; el error se enlaza con `aria-describedby` y se anuncia con `aria-live="polite"`.
  - `Textarea` usa `Field.Control` con `render={<textarea />}` para conservar la asociación de Base UI.
  - `FormRow` reutiliza `Field` en orientación horizontal: label de 140 px desde `sm`, vertical en mobile.
  - Página `/components/forms` con demos default, required, error, disabled, textarea, FormRow y Label independiente; props, código y notas de a11y. Entrada agregada a la sidebar y al índice de componentes.
- **Tareas tocadas:** `F1-001` → `done`; `C-006`, `C-007`, `C-008`, `C-015` y `C-062` → `done`.
- **Decisiones:** Ninguna nueva. Se usa Base UI Field, ya cubierto por `D-003`; no se agregaron dependencias.
- **Evidencia:**
  - `packages/ui/src/components/ui/{field,field-context,label,input,textarea}.tsx`, `form.test.tsx`; exports en `index.ts`.
  - `apps/catalog/src/pages/components/forms.tsx`, ruta `/components/forms`, navegación y card de índice.
  - `bun run check` verde: **13 archivos de test / 60 tests**.
  - QA visual 1440 y 390: formularios con label, descripción, required, error, disabled y FormRow horizontal/vertical; foco visible en Chirashi compacta.
- **Sin validar:** axe real (sigue en `F1-010`), lector de pantalla, iconos de Input (previstos para después), auto-resize de Textarea (opcional).
- **Próximo:** `F1-002` — `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch` y `NumberField`.
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 004 — Wiki, idioma y densidad real

- **Objetivo:** atender el feedback antes de la fase 1: hacer visible el idioma, lograr que tema/densidad afecten la documentación y convertir el catálogo en una wiki navegable con sidebar.
- **Hecho:**
  - **Selector de idioma ES/JA/EN** en el encabezado, persistido en `?lang=`. Cambia navegación, labels de shell, estados, pager y la vista previa de `Intl`; el documento conserva `lang="es"` y cada fragmento localizado declara su idioma.
  - **Documentación sensible a densidad y tema:** sidebar, layout, tablas, paneles y secciones usan `--koten-panel-p`, `--koten-gap`, `--koten-control-h` y `--koten-row-h`; los acentos primarios (hanko, marcas de sección, navegación activa, flechas) cambian con el tema.
  - **Catálogo wiki multipágina:** `react-router@7.18.4` en modo declarativo, 14 rutas, sidebar de 220 px con grupos y estado activo, menú móvil plegable, pager anterior/siguiente y deep links.
  - Páginas separadas: inicio, índice de tokens, color, tipografía, espaciado, forma, densidad, temas, formato, índice de componentes, Button, Panel y Badge.
  - Tests de páginas, layout, navegación, locale y estado en URL; ajuste del setup de Vitest para `scrollTo`/`scrollIntoView`.
- **Tareas tocadas:** `F0-010` → `done`; `F0-011` → `done`; `F0-012` → `done`; **fase 0 reconfirmada `done`**.
- **Decisiones:** `D-019` (wiki multipágina) y `D-020` (idioma de interfaz vs. documentación). `react-router@7.18.4` queda cubierto por `D-005`.
- **Evidencia:**
  - `apps/catalog/src/App.tsx`, `components/{catalog-layout,scroll-manager,docs,view-toggles}.tsx`, `data/catalog.ts`, `lib/use-catalog-view.ts`, `pages/**`.
  - `bun run check` verde: **12 archivos de test / 53 tests**; `bun run ci` verde (check + build de las tres apps).
  - QA visual 1440 y 390; probados ES/JA/EN, Chirashi/Kanso, compacta/default/comfortable y deep link `/tokens/color?theme=…&density=…&lang=…`.
- **Sin validar:** axe real (sigue en `F1-010`/`F4-002`), lector de pantalla y ejecución remota del workflow. La documentación no se traduce por decisión (`D-020`); solo la interfaz y los ejemplos.
- **Próximo:** `F1-001` — `Field`, `Label`, `Input`, `Textarea` y `FormRow`.
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 003 — Espécimen, provider y shell

- **Objetivo:** cerrar `F0-004` (espécimen de tokens) y avanzar con `F0-005` (provider/labels/formato) y `F0-006` (shell del catálogo con toggles).
- **Hecho:**
  - Página **Tokens y fundamentos** en el catálogo: paleta primitiva y acentos matsuri, roles semánticos por tema, familias y escala tipográfica, interlineado y reglas CJK, espaciado, radios/sombras/movimiento/layout, densidad con tabla y demostración en vivo, temas Chirashi/Daichō/Kanso con la misma pieza, idioma/formato y reglas de uso.
  - Toggles de **tema** y **densidad** en el header; el estado vive en la URL (`?theme=…&density=…`), se aplica a `<html data-theme data-density>` y sobrevive a recargas. Skip link, tablas con `caption`, `fieldset`/`legend` y `aria-pressed` en los toggles.
  - `KotenProvider` con labels ES/JA/EN, overrides y `useKotenFormatters()`; helpers `formatDate`, `formatCurrency`, `formatNumber` con `Intl` y locales cortos/BCP 47.
  - Auditoría de contraste de tokens: `faint` pasó de 3.33:1 a 4.91:1 sobre papel, `rule-strong` de 2.39:1 a ≥3:1 en bordes de control y `kin` de 3.56:1 a 5.34:1 sobre superficie. Se agregó un test automático de contraste que recorre los tres temas.
  - Primera validación de componentes: `Button` (6 variantes, 4 tamaños, loading/disabled, composición `render`), `Panel` (header/body/footer, tonos plain/tinted/accent, `flush`), `Badge` (7 tonos × 3 apariencias, punto decorativo) y roles `sale`/`new`. Página de catálogo con previews, props, código y notas de a11y.
  - CI base con GitHub Actions (Bun 1.4.3, `--frozen-lockfile`, `check` y `build`) y script local `bun run ci`; `Q-007` cerrada con `D-018`.
  - Handoff: README, AGENTS, ROADMAP y esta bitácora actualizados; fase 0 cerrada.
- **Tareas tocadas:** `F0-004` → `done`; `F0-005` → `done`; `F0-006` → `done`; `F0-007` → `done`; `F0-008` → `done`; `F0-009` → `done`. **Fase 0 → `done`.**
- **Decisiones:** `D-018` (CI en GitHub Actions). `Q-007` cerrada. Se aplica `D-014` (AA) a los tokens; no se agregaron dependencias fuera de las del scaffold.
- **Evidencia:**
  - Catálogo: `apps/catalog/src/pages/{tokens.tsx,components.tsx}`, `components/{specimen.tsx,view-toggles.tsx}`, `data/tokens.ts`, `lib/use-catalog-view.ts`, `App.tsx`, `main.tsx`.
  - UI: `packages/ui/src/components/ui/{button.tsx,panel.tsx,badge.tsx}`, `i18n/{labels.ts,provider.tsx}`, `lib/{format.ts,intl.ts}`, `styles/{tokens.css,tokens.contrast.test.ts}`, `index.ts`.
  - CI: `.github/workflows/ci.yml`, script `ci` en `package.json`.
  - `bun run check` verde: Biome + `tsc` en 4 workspaces + **12 archivos de test / 49 tests**; `bun run ci` verde (check + build de las tres apps).
  - QA visual con capturas en 1440, 1280, 1024, 768 y 390; URL verificada tras cambiar a Daichō + compacta: `?theme=daicho&density=compact`.
- **Sin validar:** axe real (se hará en `F1-010`/`F4-002`), lector de pantalla y contraste de todos los componentes futuros. La página no tiene navegación por sidebar todavía; el catálogo usa nav de header. El workflow no se ejecutó en GitHub en esta sesión; se validó el comando local equivalente.
- **Próximo:** fase 1 — `F1-001` formularios base (`Field`, `Label`, `Input`, `Textarea`, `FormRow`).
- **Bloqueos:** ninguno.

---

## 2026-10-20 · Sesión 002 — Scaffold

- **Objetivo:** Crear la base ejecutable del monorepo sin entrar todavía en componentes ni en las páginas de los POC.
- **Hecho:**
  - `git init -b main` (sin commit inicial; el scaffold queda sin versionar).
  - Workspace raíz de Bun con `apps/*` y `packages/*`; scripts `dev`, `build`, `typecheck`, `test`, `check`, `format`, `lint`.
  - Tres apps Vite + React 19 + TypeScript strict: `catalog` (5173), `storefront` (5174), `erp` (5175).
  - `packages/ui` con `cn()`, dependencias de Base UI/CVA/Lucide/tailwind-merge y estilos compartidos.
  - `tokens.css` con primitivas, roles semánticos, temas `chirashi`/`daicho`/`kanso` y densidades `compact`/`default`/`comfortable`.
  - `globals.css` con Tailwind v4, paleta por defecto bloqueada, tipografía del sistema, base layer y utilidades `koten-container`, `rule-double`, `tategaki`.
  - `biome.json`, `tsconfig.base.json`, `vitest.config.ts` y un test de `cn()`.
  - Páginas placeholder en las tres apps para verificar tokens y temas. **No son** el catálogo, el storefront ni el ERP definitivos.
- **Tareas tocadas:** `F0-001` → `done`; `F0-002` → `done`; `F0-003` → `done`; `F0-004` → `in_progress`.
- **Decisiones:** Ninguna nueva. `D-005` se mantiene; el scaffold resolvió Vite 8.3.4, TypeScript 7.0.2, React 19.3.1, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15 y Vitest 5.0.5.
- **Evidencia:** `package.json`, `bun.lock`, `biome.json`, `tsconfig.base.json`, `vitest.config.ts`, `apps/*`, `packages/ui/src/styles/tokens.css`, `packages/ui/src/styles/globals.css`, `packages/ui/src/lib/cn.ts`.
- **Validación realizada:** `bun install`; `bun run check` (Biome + `tsc` en las cuatro workspaces + 2 tests); `bun run build` en las tres apps; `bun run dev` respondió HTTP 200 en 5173, 5174 y 5175.
- **Sin validar:** QA visual, auditoría de accesibilidad, presupuestos de performance y comportamiento en navegadores reales. No se abrió una revisión visual completa.
- **Próximo:** `F0-004` — página de espécimen de tokens (paleta, tipografía, espaciado, radios, densidad). Después `F0-005` — provider de labels y helpers de formato.
- **Bloqueos:** ninguno. `Q-005` (licencia) sigue abierta; no bloquea el scaffold.

---

## 2026-10-20 · Sesión 001 — Planificación y trazabilidad

- **Objetivo:** Cerrar el alcance del sistema, registrar las decisiones y dejar una hoja de ruta retomable entre sesiones.
- **Hecho:**
  - Análisis de referencias: Yahoo! Japan, Rakuten, Abe Hiroshi, Yodobashi, Don Quijote; ensayos de Randomwire, Medium, Utsubo y MultiLingual.
  - Definición de la tesis “sencillez de medios, densidad de información” y de los tres registros: Chirashi, Daichō, Kanso.
  - Elección de stack: Bun, Biome, React 19, TypeScript strict, Vite 7, Tailwind v4, Base UI, CVA, TanStack Table, Vitest/Playwright/axe.
  - Definición de la arquitectura de variantes: tema y densidad por `data-*`; variantes semánticas con CVA; composición con `render`.
  - Definición de los dos POC: HIKARI K-1 (storefront) y KURA (ERP), más catálogo.
  - Creación de `README.md`, `ROADMAP.md`, `AGENTS.md`, `docs/REQUIREMENTS.md`, `docs/DESIGN-SYSTEM.md`, `docs/DECISIONS.md` y esta bitácora.
  - Registro de decisiones `D-001`–`D-017`, requisitos `R-001`–`R-020`, riesgos `RISK-001`–`RISK-011` y preguntas `Q-001`–`Q-010`.
- **Tareas tocadas:** `F0-000` → `done`. `F0-001` queda como próxima.
- **Decisiones:** `D-001` a `D-017`.
- **Evidencia:** `README.md`, `ROADMAP.md`, `AGENTS.md`, `docs/REQUIREMENTS.md`, `docs/DESIGN-SYSTEM.md`, `docs/DECISIONS.md`, `docs/PROGRESS.md`.
- **Próximo:** `F0-001` — inicializar git, workspace de Bun, `.gitignore`, licencia y scripts raíz.
- **Bloqueos:** ninguno.

---

## Plantilla de cierre de fase

```md
## YYYY-MM-DD · Cierre de fase N — Nombre

- **Criterios de fase:** todos cumplidos / pendientes
- **Tareas:** F<N>-001 … F<N>-00X → done
- **Evidencia:** builds, capturas, reportes axe, presupuestos
- **Riesgos actualizados:**
- **Decisiones nuevas:**
- **Próxima fase:**
```
