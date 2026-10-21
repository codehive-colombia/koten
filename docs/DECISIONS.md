# Registro de decisiones — Koten UI

> ADR ligero. Cada decisión tiene ID estable y no se renumera.
> Si una decisión se reemplaza, se agrega una nueva con `supersede a D-00x`.
> Última actualización: 2026-10-20.

## Índice

- [D-001 · Nombre Koten](#d-001)
- [D-002 · Una gramática, dos densidades](#d-002)
- [D-003 · Base UI como base de primitivas](#d-003)
- [D-004 · Tailwind v4 con tokens CSS-first](#d-004)
- [D-005 · Stack base](#d-005)
- [D-006 · Fuentes del sistema y CJK](#d-006)
- [D-007 · Alcance de la v1](#d-007)
- [D-008 · Idiomas](#d-008)
- [D-009 · Soporte de navegadores y desktop-first](#d-009)
- [D-010 · Texto real, no texto en imágenes](#d-010)
- [D-011 · Arquitectura de variantes](#d-011)
- [D-012 · Demos de la v1](#d-012)
- [D-013 · Tabla de datos](#d-013)
- [D-014 · Accesibilidad y legibilidad](#d-014)
- [D-015 · Modo oscuro fuera de la v1](#d-015)
- [D-016 · Registry shadcn en fase 5](#d-016)
- [D-017 · SPA para el POC](#d-017)
- [D-018 · CI en GitHub Actions](#d-018)
- [D-019 · Catálogo wiki multipágina](#d-019)
- [D-020 · Idioma de interfaz y documentación](#d-020)

---

<a id="d-001"></a>
## D-001 · Nombre Koten

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El sistema necesita un nombre corto, pronunciable y neutral, que no lo encierre en un solo vertical (comercio o backoffice).
- **Decisión:** Usar **Koten (古典)** como nombre y `@koten/ui` como paquete de trabajo. Los registros se llaman **Chirashi**, **Daichō** y **Kanso**.
- **Consecuencias:** Los docs, IDs y ejemplos usan Koten. El nombre no condiciona el contenido de los componentes.
- **Alternativas:** Machi (街), Chirashi (チラシ), Sumi (墨). Se descartaron por ser más específicas de un registro.

---

<a id="d-002"></a>
## D-002 · Una gramática, dos densidades

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Las referencias mezclan el Japón denso y comercial (Yahoo, Rakuten, Don Quijote) con el austero y de bajo costo (Abe Hiroshi, MUJI). Un solo registro no cubre los dos POC.
- **Decisión:** Un solo sistema de tokens y componentes con tres temas:
  - **Chirashi** para storefront: densidad alta, primario shu, acentos matsuri.
  - **Daichō** para ERP: densidad compacta, primario ai, shu solo para danger.
  - **Kanso** para catálogo: lectura, primario ai, acentos mínimos.
- **Consecuencias:** Los componentes usan roles semánticos (`bg-primary`), no colores. El tema cambia valores; la densidad cambia variables. No hay dos sistemas separados.
- **Alternativas:** Chirashi puro (habría hecho ilegible el ERP), Kanso minimalista (habría perdido la densidad de las referencias), retro 90s puro (habría sacrificado accesibilidad y desktop moderno).

---

<a id="d-003"></a>
## D-003 · Base UI como base de primitivas

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** shadcn usa Base UI por defecto desde julio de 2026. Base UI está en 1.9.0, es estable, tree-shakeable y cubre formularios, overlays, navegación y datos.
- **Decisión:** Usar `@base-ui/react` como base headless. Composición con `render` + `useRender` + `mergeProps`, no `asChild`.
- **Consecuencias:**
  - La documentación y los ejemplos de shadcn basados en Radix no se copian literalmente.
  - Los portales requieren `isolation: isolate` en el root.
  - Los estados se estilan con `data-*` (`data-open`, `data-starting-style`, `data-side`, etc.).
  - Los wrappers aíslan Base UI; si falta una primitiva, se usa HTML nativo.
- **Alternativas:** Radix (maduro, pero el ecosistema se mueve a Base UI), HTML nativo only (más trabajo en overlays y formularios).

---

<a id="d-004"></a>
## D-004 · Tailwind v4 con tokens CSS-first

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Se busca la ergonomía de shadcn, sin runtime de CSS-in-JS y con control total de tokens.
- **Decisión:** Tailwind CSS v4 con `@theme`, tokens CSS y la paleta/radios/tamaños por defecto **bloqueados**. Variantes con CVA y `cn()`.
- **Consecuencias:**
  - No se pueden usar colores de Tailwind fuera del sistema (`bg-blue-500` no existe).
  - Los componentes usan roles semánticos.
  - El baseline de navegadores es moderno (Tailwind v4).
  - El CSS de los componentes es transparente y copiable.
- **Alternativas:** CSS Modules + tokens (más control, menos paridad shadcn), Vanilla Extract/Panda (más infraestructura).

---

<a id="d-005"></a>
## D-005 · Stack base

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El brief pide Bun, Biome, React, TypeScript y estándares modernos.
- **Decisión:**
  - **Bun** 1.4+ para workspaces, instalación y scripts.
  - **Biome** para lint, format y organize imports.
  - **React 19** + **TypeScript strict**.
  - **Vite 8** para las tres apps.
  - **React Router 7** en modo declarativo.
  - **Vitest + Testing Library** para unit/integration; **Playwright + axe** para E2E/a11y.
  - **TanStack Table** solo en ERP; **Lucide** para iconos.
- **Consecuencias:** No hay ESLint/Prettier. No hay Next.js en la v1. El POC es SPA.
- **Versiones resueltas en el scaffold (2026-10-20):** Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5. La decisión de fondo no cambia.
- **Alternativas:** Next.js (SSR/SEO, más complejidad), TanStack Router (type-safe, más ceremonia), Jest (más lento en este contexto).

---

<a id="d-006"></a>
## D-006 · Fuentes del sistema y CJK

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Una fuente CJK completa pesa varios megabytes por peso; el texto en imágenes resuelve el peso pero destruye accesibilidad e i18n.
- **Decisión:** Usar el stack del sistema (Hiragino, Yu Gothic, Meiryo, Noto Sans JP) para UI y body. Mincho del sistema para titulares editoriales. Si se agrega una display, subset Latin < 30 KB o subset exacto de titulares. **0 bytes de fuentes CJK.**
- **Consecuencias:** La apariencia varía por SO; se prueba en Linux/Windows/macOS. No se usa texto en imágenes. La velocidad es un rasgo del sistema.
- **Alternativas:** Noto Sans JP completa (inviable), Google Fonts con slices (posible, pero añade red y dependencia), texto en imágenes (rechazado por accesibilidad).

---

<a id="d-007"></a>
## D-007 · Alcance de la v1

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Hay que validar el lenguaje visual y el uso real sin construir infraestructura de distribución.
- **Decisión:** v1 = catálogo + storefront + ERP. El registry/CLI y la publicación npm quedan para fase 5.
- **Consecuencias:** Los componentes se copian desde `packages/ui`. No hay comando de instalación propio en la v1. Los archivos quedan preparados para un registry futuro.
- **Alternativas:** Registry desde el día uno (más tiempo antes de ver pantallas), solo storefront (menos validación).

---

<a id="d-008"></a>
## D-008 · Idiomas

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El sistema debe funcionar en cualquier idioma, con el japonés como parte de la identidad.
- **Decisión:** Documentación en **español**. Demos con toggle **JA/ES/EN**. Componentes sin strings; labels por props y `KotenProvider`; `Intl` para fechas/moneda.
- **Consecuencias:** Hay que mantener tres diccionarios y probar expansión de texto. El layout no puede depender de alturas fijas.
- **Alternativas:** Todo ES (menos validación), todo EN (menos cercano al usuario), docs bilingües (más mantenimiento).

---

<a id="d-009"></a>
## D-009 · Soporte de navegadores y desktop-first

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El brief pide optimización para navegadores y foco desktop.
- **Decisión:** Últimas 2 versiones de Chrome, Edge, Firefox y Safari. 1280 px como escenario principal; 1024 soportado; mobile 390 legible. Sin IE ni polyfills pesados.
- **Consecuencias:** Se puede usar Tailwind v4, CSS moderno y Base UI sin capas de compatibilidad. Mobile no es el objetivo de optimización, pero no debe romperse.
- **Alternativas:** Soporte amplio con polyfills (más peso), mobile-first (contradice el brief).

---

<a id="d-010"></a>
## D-010 · Texto real, no texto en imágenes

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Muchos sitios japoneses usan imágenes para titulares por las limitaciones de fuentes CJK.
- **Decisión:** Todo el texto es texto real. Las imágenes solo contienen fotografía/ilustración.
- **Consecuencias:** Se depende del stack del sistema, pero se gana accesibilidad, traducción, búsqueda y nitidez. No se replica la práctica de Starbucks Japan.
- **Alternativas:** Texto en imágenes (rechazado).

---

<a id="d-011"></a>
## D-011 · Arquitectura de variantes

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** shadcn usa variantes con CVA; el sistema necesita temas y densidades sin explotar combinaciones.
- **Decisión:**
  - Tema: `data-theme` (`chirashi`, `daicho`, `kanso`).
  - Densidad: `data-density` (`compact`, `default`, `comfortable`).
  - Componente: `variant`, `size`, `tone`, `appearance`.
  - Composición: `render` de Base UI.
  - Marcado: `data-slot`.
  - Estilos: CVA + `cn()`, sin `@apply` en componentes.
- **Consecuencias:** Menos combinaciones, API más clara, componentes copiables. Requiere disciplina para no hardcodear colores.
- **Alternativas:** Un solo `variant` con todo (explosión combinatoria), props de densidad por componente (verboso).

---

<a id="d-012"></a>
## D-012 · Demos de la v1

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Se necesitan dos escenarios realistas que ejerciten componentes distintos.
- **Decisión:**
  - **Storefront HIKARI K-1:** cámara compacta ficticia; página de producto con header, compra, specs, avisos, ranking y footer.
  - **ERP KURA:** distribución mayorista; dashboard, pedidos, filtros, tabla y drawer.
- **Consecuencias:** Datos ficticios deterministas, sin backend. Assets locales. El contenido se traduce a JA/ES/EN.
- **Alternativas:** Producto genérico sin narrativa (menos realista), ERP sin dashboard (menos cobertura).

---

<a id="d-013"></a>
## D-013 · Tabla de datos

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El ERP necesita orden, selección, paginación y densidad; el storefront no.
- **Decisión:** `Table` semántica propia + `DataTable` con TanStack Table solo en ERP. Charts con SVG propio y fallback accesible. Sin librería de charts, carousel ni date picker en v1.
- **Consecuencias:** Más control de bundle y estilos; más trabajo manual en charts y date picker. El storefront no carga TanStack Table.
- **Alternativas:** AG Grid (pesado), Recharts (más peso), tabla propia sin TanStack (más código de sort/selección).

---

<a id="d-014"></a>
## D-014 · Accesibilidad y legibilidad

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** Las referencias usan 10 px, bajo contraste y foco invisible. Copiar eso haría el sistema inutilizable para muchas personas.
- **Decisión:** WCAG 2.2 AA, 12 px mínimo, foco visible, teclado completo, estado con texto + color, `prefers-reduced-motion`, skip link.
- **Consecuencias:** El resultado no es una copia pixel-perfect de Yahoo/Rakuten; es una interpretación legible. Más trabajo de auditoría.
- **Alternativas:** Copiar la densidad sin límites (rechazado).

---

<a id="d-015"></a>
## D-015 · Modo oscuro fuera de la v1

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El foco es la gramática clara; el modo oscuro añade una matriz de tokens y QA.
- **Decisión:** La v1 es light. El tema **Sumi** queda en fase 5. Los tokens se organizan para soportarlo sin reescribir componentes.
- **Consecuencias:** Sin toggle dark en la v1. No hay script anti-flash. La paleta semántica ya está preparada.
- **Alternativas:** Dark desde el inicio (más alcance), dark automático por SO (más QA).

---

<a id="d-016"></a>
## D-016 · Registry shadcn en fase 5

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** shadcn distribuye componentes por registry/CLI; la v1 prioriza validar el diseño.
- **Decisión:** Diferir `registry.json`, build de registry e instalación por URL a fase 5. Mantener los archivos copiables y con imports mínimos.
- **Consecuencias:** No hay `npx shadcn add` en la v1. La estructura no tendrá que reescribirse para agregarlo.
- **Alternativas:** Registry desde el inicio (más infraestructura).

---

<a id="d-017"></a>
## D-017 · SPA para el POC

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El POC valida diseño y componentes, no SEO de producción. Vite + React Router reduce complejidad.
- **Decisión:** Las tres apps son SPA con Vite. La evaluación de SSG/SSR para el storefront queda en `F5-006`.
- **Consecuencias:** No hay SSR ni SEO avanzado en la v1. El catálogo y el ERP no lo necesitan. El storefront podría migrar a Astro/Next sin cambiar los componentes.
- **Alternativas:** Next.js/Astro desde el inicio (más configuración y superficie), HTML estático (menos interactividad).

---

<a id="d-018"></a>
## D-018 · CI en GitHub Actions

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** `F0-008` necesita una verificación repetible de Biome, TypeScript, Vitest y builds; `Q-007` dejó abierto el proveedor y la propuesta era GitHub Actions.
- **Decisión:** Usar GitHub Actions con Bun 1.4.3, `bun install --frozen-lockfile`, `bun run check` y `bun run build` en cada push a `main` y en cada pull request. Mantener además `bun run ci` como equivalente local.
- **Consecuencias:** El repo depende de un workflow versionado en `.github/workflows/ci.yml`. No se agregan servicios externos ni secretos. Si el proveedor cambia, el comando local sigue siendo la referencia.
- **Alternativas:** Solo script local (no bloquea merges), otro proveedor (más configuración sin beneficio para el POC).

---

<a id="d-019"></a>
## D-019 · Catálogo wiki multipágina

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** El catálogo en una sola página funcionó para validar tokens, pero con tres componentes y siete fundamentos se volvió incómodo de recorrer; los componentes quedaban al final de un scroll muy largo.
- **Decisión:** Usar **React Router 7 en modo declarativo** (ya previsto en `D-005`) y organizar el catálogo como wiki:
  - Rutas por fundamento (`/tokens/color`, `/tokens/typography`, etc.) y por componente (`/components/button`, etc.).
  - Sidebar de 220 px con grupos, estado activo y navegación móvil plegable.
  - Pager anterior/siguiente y enlaces profundos compartibles.
  - Layout con contenido máximo de 900 px y sidebar sticky.
- **Consecuencias:** El catálogo gana navegación y deep links; el build necesita fallback SPA en hosting. Se agrega `react-router@7.18.4` al workspace del catálogo, dentro de la decisión de stack existente. La página única se abandona como formato principal.
- **Alternativas:** Hash routing propio (menos dependencia, peor integración), una sola página con anchors (el problema original), Astro/Next (fuera de la v1).

---

<a id="d-020"></a>
## D-020 · Idioma de interfaz y documentación

- **Fecha:** 2026-10-20
- **Estado:** `accepted`
- **Contexto:** `D-008` fija documentación en español y demos en JA/ES/EN. Faltaba una forma visible de probar labels y `Intl` en el catálogo; un toggle que tradujera solo una sección habría parecido incompleto.
- **Decisión:** El catálogo tiene un selector **ES/JA/EN** que cambia la interfaz (navegación, labels, estados, vista previa de formato) y se persiste en `?lang=`. La documentación de fondo permanece en español. El documento conserva `lang="es"`; los fragmentos de interfaz localizados llevan su propio `lang`.
- **Consecuencias:** La UI demuestra labels y formatos reales sin duplicar toda la documentación. El idioma de la interfaz no altera el significado de la documentación; el aviso de idioma es explícito. Los demos de las fases 2 y 3 sí se traducen completos.
- **Alternativas:** Traducir toda la documentación (coste alto y fuera de `D-008`), no ofrecer toggle (i18n invisible), traducir solo la página de formato (demasiado parcial).
