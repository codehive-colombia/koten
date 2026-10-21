# Registro de decisiones — Koten UI

> ADR ligero. Cada decisión tiene ID estable y no se renumera.
> Si una decisión se reemplaza, se agrega una nueva con `supersede a D-00x`.
> Última actualización: 2026-10-21.

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
- [D-021 · Contenido y datos mock deterministas](#d-021)
- [D-022 · Assets SVG locales del POC](#d-022)
- [D-023 · Rutas y estado en URL de las demos](#d-023)
- [D-024 · Select no modal y paginación con identidad estable](#d-024)
- [D-025 · Cuerpo del catálogo en ES/JA/EN](#d-025)
- [D-042 · Una página por componente y una sección de bloques](#d-042)

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

---

<a id="d-021"></a>
## D-021 · Contenido y datos mock deterministas

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** `F2-001` y `F3-001` necesitan contenido realista en JA/ES/EN, sin backend ni CMS. Un generador aleatorio haría imposibles las capturas, los tests y la comparación entre sesiones.
- **Decisión:**
  - El contenido de cada demo vive en su app: `apps/storefront/src/content/` y `apps/erp/src/data/`.
  - Los textos localizados son diccionarios tipados por locale (`Localized<T>`), no un runtime de i18n.
  - Los pedidos KURA se generan con una función determinista a partir de una semilla fija: **132 pedidos**, 12 clientes y 16 productos.
  - La fecha ancla del POC es **2026-10-21**; fechas, KPIs, series y timelines se derivan de ella.
  - Los componentes siguen sin strings: reciben labels y datos por props.
- **Consecuencias:**
  - Las capturas y los tests son reproducibles; no hay `Math.random` en los datos.
  - Cambiar el contenido no requiere tocar componentes.
  - Cuando exista backend, los módulos de datos se reemplazan por adaptadores sin cambiar la UI.
- **Alternativas:** i18n runtime (peso y ceremonia para tres locales), datos aleatorios (no reproducibles), JSON remoto (fuera de alcance y con red).

---

<a id="d-022"></a>
## D-022 · Assets SVG locales del POC

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** `Q-003` dejó abierta la definición de assets. El POC necesita imágenes locales, ligeras y sin riesgo de licencia; además no puede usar texto dentro de imágenes (`D-010`).
- **Decisión:** Usar ilustraciones **SVG locales** para la HIKARI K-1, el objetivo y la bolsa: `apps/storefront/src/assets/`. Cada asset lleva `title` interno, y la UI aporta `alt` localizado, `width`/`height` y `loading` según posición. No hay hotlinking ni imágenes con texto.
- **Consecuencias:**
  - 0 KB de fuentes e imágenes de pocos KB; ninguna dependencia ni CDN.
  - Las ilustraciones no son fotografía de producto: se reemplazan antes de producción sin cambiar la API de los patrones.
  - La licencia queda dentro del repo y documentada por origen propio.
- **Alternativas:** Fotos de stock (licencia y peso), hotlinking (frágil y con privacidad), texto en imágenes (rechazado por `D-010`).

---

<a id="d-023"></a>
## D-023 · Rutas y estado en URL de las demos

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** El storefront necesita un selector de idioma compartible y el ERP necesita filtros que sobrevivan a la recarga y al deep link. `D-019` ya había introducido React Router en el catálogo.
- **Decisión:**
  - El storefront persiste el idioma en `?lang=`.
  - El ERP usa React Router 7 (ya en `D-005`) con `/`, `/orders` y `/orders/new`; los filtros viven en `?q=`, `?status=`, `?warehouse=` y `?range=`.
  - Las rutas de módulos fuera del POC (`/products`, `/inventory`, etc.) existen como placeholder para no dejar enlaces muertos.
- **Consecuencias:** Los estados son compartibles y testeables; el hosting necesita fallback SPA (`D-017`). La navegación interna usa `Link`/`useNavigate`; los breadcrumbs de patrón siguen siendo anchors copiables.
- **Alternativas:** Estado solo en memoria (se pierde al recargar), hash routing (peor integración), rutas por idioma (fuera de alcance).

---

<a id="d-024"></a>
## D-024 · Select no modal y paginación con identidad estable

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** En pruebas manuales, abrir un `Select` podía dejar la página bloqueada: Base UI 1.9 usa `modal: true` por defecto, bloquea el scroll y las interacciones fuera del popup, y su modo `alignItemWithTrigger` añade mediciones de viewport. Además, `DataTable` pasaba `[...data]` a TanStack en cada render; el nuevo array hacía que la tabla interpretara un cambio de datos y reiniciara la página, por lo que la paginación no avanzaba en el navegador. En consola aparecía el aviso de `flushSync` desde un lifecycle de Base UI.
- **Decisión:**
  - `Select` usa `modal={false}` por defecto. El consumidor puede activar el modo modal con `modal`.
  - El popup usa `alignItemWithTrigger={false}`: se posiciona debajo del trigger como un dropdown normal, sin el modo de alineación especial.
  - `Menu` también usa `modal={false}` por defecto (Base UI lo abre modal por defecto).
  - `DataTable` pasa la misma referencia de `data` a TanStack; no la copia en cada render.
  - Se agregan tests de regresión para el scroll bloqueado y para conservar la página tras un re-render del padre.
- **Consecuencias:** Abrir un select o un menú ya no secuestra la página ni el scroll; se puede seguir interactuando con filtros, paginación y navegación. La paginación avanza y conserva el estado. El modo modal sigue disponible para casos que lo necesiten.
- **Alternativas:** Mantener el modal por defecto (bloquea la página), deshabilitar `Select`/`Menu` (pierde primitivas), copiar `data` pero memoizarla (más asignaciones y todavía frágil), parchear Base UI (dependencia externa).

---

<a id="d-025"></a>
## D-025 · Cuerpo del catálogo en ES/JA/EN

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** `D-008` fija documentación en español y demos en JA/ES/EN; `D-020` agrega un selector de idioma al catálogo, pero solo traduce la interfaz. Al usar el selector, el cuerpo de las páginas seguía en español: la experiencia quedaba a medias y la propia documentación no probaba la expansión de texto ni los `Intl` en los tres idiomas.
- **Decisión:** El cuerpo de las páginas del catálogo se localiza completo en **ES/JA/EN** con diccionarios tipados por página (`Localized<T>`); el español es la fuente y las traducciones mantienen la misma forma que el tipo de la versión española. Alcance:
  - cabeceras, descripciones, metadatos, secciones y prosa;
  - demos, captions, labels de tablas, listas de a11y y notas de props;
  - datos de espécimen (`note`, `use`, `context`, `description`) y labels internos de `docs.tsx`/`specimen.tsx`;
  - `document.documentElement.lang` sigue al locale del catálogo.
  - Los documentos de trabajo (`README.md`, `ROADMAP.md`, `AGENTS.md`, `docs/*.md`) **siguen en español**: son documentación de mantenimiento, no producto.
- **Consecuencias:** El catálogo pasa a tener ~3× contenido textual y hay que mantener tres versiones por página; `Record<KotenLocale, Copy>` obliga a que ninguna traducción quede incompleta. Los tests existentes en español siguen siendo la referencia funcional. El presupuesto interno del catálogo sube de 300 a 330 KB gzip (medido: 304,5 KB) por el contenido trilingüe; storefront (122,3 KB) y ERP (196,4 KB) no cambian. No cambia la API de componentes, patrones ni demos.
- **Alternativas:** Traducir solo títulos y descripciones (insuficiente: el selector sigue pareciendo roto en el cuerpo); traducir también los `.md` internos (mantenimiento doble sin valor para el POC); i18n en runtime (peso y ceremonia innecesarios para tres locales).

---

---

<a id="d-026"></a>
## D-026 · RTL best-effort con propiedades lógicas

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (cierra `Q-010`)
- **Contexto:** El POC nace en JA/ES/EN, todos LTR, pero `R-004` promete que el sistema funciona en cualquier idioma. Un soporte RTL completo exige espejar iconos, orden de columnas, scrollbars y mapas, y no hay un locale RTL en las demos para validarlo. Al mismo tiempo, mezclar utilidades físicas (`text-left`, `pl-2`, `border-l-2`) con lógicas (`ms-auto`, `border-s-2`) hace que un futuro RTL se rompa en puntos imprevisibles.
- **Decisión:** El soporte RTL es **best-effort**:
  - Todo el código de `packages/ui`, storefront, ERP y catálogo usa **propiedades y utilidades lógicas** (`text-start`/`text-end`, `ps`/`pe`, `ms`/`me`, `border-s`/`border-e`, `start`/`end`) para espaciado, alineación, bordes y posicionamiento.
  - No se espejan iconos ni se agrega un locale RTL a las demos en la v1 (`D-009`).
  - La guardia `bun run check:i18n` falla si reaparece una utilidad física o una propiedad CSS física.
  - `bun scripts/qa-overflow.ts` fuerza `dir="rtl"` en cada página medida y verifica que no aparezca scroll horizontal ni recorte; hoy pasa en las 72 combinaciones (3 apps, 3 idiomas, 1440/1024/390).
- **Consecuencias:** El layout no se rompe al espejarse y el costo es cero en LTR (`text-start` equivale a `left`). Queda pendiente para una v2 la revisión visual RTL (iconos direccionales, `Tategaki`, gráficos y tablas congeladas). `Q-010` se cierra con esta decisión.
- **Alternativas:** RTL completo en la v1 (sin presupuesto ni locale de prueba; se descarta); ignorar RTL y usar utilidades físicas (barato hoy, deuda cara después); mezclar ambos sin guardia (deriva silenciosa, descartado).

---

<a id="d-027"></a>
## D-027 · Piso tipográfico de 12 px

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** `D-014` fija 12 px como mínimo, pero la escala de tokens conservaba `--koten-text-2xs: 11px` para notas y contadores. La auditoría de navegador de `F4-002` encontró 36 nodos de texto a 11 px solo en la página de producto (utility bar, fechas, micro-metadatos); jsdom nunca lo detectó porque no calcula estilos.
- **Decisión:** El token `--koten-text-2xs` pasa a **12 px**. La escala mantiene el nombre `2xs` por compatibilidad de utilidades, pero ningún texto visible queda por debajo de 12 px. La jerarquía entre `2xs` y `xs` se resuelve con peso, color y espaciado, no con tamaño.
- **Consecuencias:** Cambio de 1 px en la capa más pequeña; el layout se revalidó con `qa-overflow` (72 combinaciones) y `qa-a11y` (sin textos < 12 px en 30 páginas × 2 anchos). El catálogo muestra el token actualizado y `DESIGN-SYSTEM.md` documenta el piso. Si en el futuro hace falta micro-tipografía, requiere una decisión nueva que reabra `D-014`.
- **Alternativas:** Mantener 11 px como excepción documentada (contradice el criterio de `F4-002`); eliminar `2xs` y migrar todas las utilidades a `xs` (cambio masivo sin beneficio visual); bajar el mínimo a 11 px (peor accesibilidad, descartado).

---

<a id="d-028"></a>
## D-028 · Alcance de axe sobre los focus guards de Base UI

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** Con `Select` no modal (`D-024`), Base UI renderiza dos `span` internos con `aria-hidden="true"` y `tabindex="0"` (`data-base-ui-focus-guard`) para detectar cuándo el foco sale del popup. axe los marca como `aria-hidden-focus` (serious). Son plumbing del componente, visualmente ocultos y sin contenido; no los controla el consumidor.
- **Decisión:** La auditoría `scripts/qa-a11y.ts` ejecuta axe con `exclude: [["[data-base-ui-focus-guard]"]]`. La regla `aria-hidden-focus` sigue activa para el resto del documento: no se desactiva ni se silencia. El alcance excluido se limita a ese atributo interno y se imprime en el resumen de la auditoría.
- **Consecuencias:** El POC queda sin violaciones serious/critical reales en el contenido y los componentes propios. Si Base UI deja de usar focus guards o cambia el atributo, la exclusión deja de aplicar sin romper la auditoría. Cualquier otro elemento `aria-hidden` con foco sigue fallando. La decisión se revisa al actualizar Base UI (`RISK-001`).
- **Alternativas:** Desactivar `aria-hidden-focus` (oculta problemas propios, descartado); parchear el DOM con un `MutationObserver` (frágil y ajeno a React); usar `modal` en todos los popups (reintroduce el bloqueo de página de `D-024`).

---

<a id="d-029"></a>
## D-029 · Code splitting por ruta solo en el catálogo

- **Fecha:** 2026-10-21
- **Estado:** `accepted`
- **Contexto:** `F4-003` pidió auditar code splitting. El catálogo servía las 25 páginas de documentación en un único bundle de 304,5 KB gzip. El ERP, en cambio, comparte `@koten/ui` (incluido TanStack Table) en el entry: al dividir `/orders` y `/orders/new` el ahorro medido fue de **3,5 KB** y se pagaba con un skeleton de navegación en cada cambio de ruta.
- **Decisión:**
  - El catálogo carga la portada en el entry y cada página de documentación con `React.lazy` + `Suspense`. El fallback reserva la altura de una página (`min-h-[1400px]`) para no mover el pager: CLS medido 0.
  - El ERP y el storefront mantienen imports estáticos: un solo bundle, navegación instantánea, sin estados de carga artificiales.
  - `scripts/check-budgets.ts` distingue **JS inicial** (entry + assets referenciados por `index.html`) de **JS total** (todos los chunks). Presupuestos: storefront 150/150, ERP 250/250, catálogo 260/360 KB gzip; CSS 30 KB; 0 fuentes.
- **Consecuencias:** El catálogo baja su JS inicial de 304,5 a **243,5 KB** (−20 %) y conserva LCP < 400 ms local y CLS 0 en rutas lazy. El ERP no gana con splitting mientras `@koten/ui` sea un barrel compartido; dividir el paquete queda para la fase 5 si el POC crece. `bun run qa:perf` mide LCP/CLS y `bun run budget` verifica inicial/total. El presupuesto del catálogo sube con las páginas Empezar (`F4-005`) y DatePicker/CommandPalette (`F5-003`/`F5-004`).
- **Alternativas:** Dividir todas las rutas (regresión de UX sin ahorro real en ERP); dividir el barrel de `@koten/ui` en subpaths (cambio de API grande, fuera de la v1); dejar todo en un bundle (catálogo 304,5 KB inicial, más lento en la primera visita).

---

<a id="d-030"></a>
## D-030 · Sin estilos de impresión en la v1

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (cierra `Q-009`)
- **Contexto:** `Q-009` preguntaba si hacían falta estilos de impresión para specs y facturas. El POC es una prueba de pantalla: no hay numeración fiscal, datos legales del emisor, formato de papel ni requisitos de archivo, y las demos usan datos ficticios. Un `@media print` genérico ocultaría la navegación, pero una factura imprimible exige decisiones de producto y legales que no están en `R-*`.
- **Decisión:** La v1 **no** incluye estilos de impresión dedicados. `SpecTable` y el detalle de pedido se imprimen con el layout de pantalla; no se promete un formato de factura. Cuando el ERP pase a producción se define el documento (papel A4, cabecera legal, numeración, totales y pie) y se implementa como tarea nueva con su propia decisión.
- **Consecuencias:** Se evita deuda de un formato que habría que rehacer; `Q-009` se cierra. La accesibilidad y la densidad en pantalla siguen cubiertas por `F4-002`.
- **Alternativas:** `@media print` mínimo solo para specs (barato pero incompleto y sin uso real); factura imprimible completa (fuera del alcance del POC).

---

<a id="d-031"></a>
## D-031 · Entrega del POC sin deploy alojado

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (cierra `Q-004`)
- **Contexto:** `Q-004` preguntaba por el destino de deploy del POC. El objetivo de la v1 es validar la gramática visual y la calidad de implementación, no operar un sitio: no hay dominio, presupuesto, CDN, secretos ni requisitos de disponibilidad. Las tres apps son SPAs (`D-017`) y el CI ya construye los tres bundles.
- **Decisión:** El POC se entrega como **repositorio reproducible + CI**: `bun install`, `bun run dev`, `bun run ci` y los `qa:*` locales. No se publica en un hosting en la v1. El destino (estático con fallback SPA, CDN o plataforma con previews) se decide cuando exista un producto que lo necesite, junto con dominio, analítica y política de datos.
- **Consecuencias:** El tag `v0.1.0-poc` marca un hito auditable, no un servicio. Cualquier deploy futuro reutiliza los builds de `apps/*/dist` y necesita fallback SPA para las rutas del ERP y el catálogo. `Q-004` se cierra.
- **Alternativas:** Deploy estático inmediato (sin producto ni dominio, coste de mantenimiento sin valor); Vercel/Netlify con previews (útil más adelante, fuera del alcance del POC).

---

<a id="d-032"></a>
## D-032 · SSG/SSR del storefront: Astro con islas, fuera del POC

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-006`, evalúa `RISK-009`)
- **Contexto:** El storefront es una SPA (`D-017`) y el POC prioriza validar la gramática visual, no el SEO. `RISK-009` deja abierto que una página de producto real necesita HTML renderizado, metadatos por producto y Core Web Vitals medibles en campo.
- **Decisión:** Si el storefront pasa a producción, la opción recomendada es **Astro con islas React**: la página de producto se renderiza a HTML (specs, precio, breadcrumb, metas, JSON-LD) y solo los controles interactivos (galería, variantes, carrito, búsqueda) hidratan con `client:visible` o `client:idle`. Los componentes de `packages/ui` se reutilizan como islas; los patrones reciben los datos por props y no dependen del router. El ERP y el catálogo siguen siendo SPAs: son aplicaciones autenticadas o internas sin requisito de SEO.
- **Consecuencias:** No se toca el POC ni su build; el tag `v0.1.0-poc` queda como referencia SPA. La migración futura exige separar los datos del storefront en un módulo serializable (ya tipado en `apps/storefront/src/content`), decidir hosting/ISR y medir LCP en campo. Next.js queda como alternativa si el equipo necesita RSC, pero pesa más para una página de producto.
- **Alternativas:** Mantener SPA en producción (SEO y LCP en campo quedan en riesgo); Next.js App Router (más superficie de la necesaria); SSG casero con Vite (reimplementa lo que Astro ya resuelve).

---

<a id="d-033"></a>
## D-033 · No publicar `@koten/ui` como paquete

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-007`, cierra `Q-008`)
- **Contexto:** La propuesta original era copiar la fuente, no consumir un paquete (`D-007`). Publicar exigiría API estable, semver, build de librería, peer deps, matriz de versiones de React/Tailwind, changelog y docs versionadas; nada de eso aporta al objetivo del POC y contradice el modelo “la fuente vive en el proyecto”.
- **Decisión:** `@koten/ui` **no se publica** en npm. La distribución es por copia (hoy) y, si se habilita `F5-001`, por registry shadcn con URL. El paquete del workspace sigue siendo privado (`private: true`).
- **Consecuencias:** Cada consumidor adapta los archivos y asume sus upgrades; no hay garantía semver. `Q-008` se cierra. Si en el futuro se publica, requiere una decisión nueva con build (`tsup`/`tsdown`), exports por subpath y política de breaking changes.
- **Alternativas:** Publicar un paquete completo (compromiso de mantenimiento sin demanda); publicar solo tokens/utilidades (posible, pero el valor está en los componentes copiables).

---

<a id="d-034"></a>
## D-034 · La v1 cierra sin Sumi ni registry

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (cierra `Q-001` y `Q-002`)
- **Contexto:** `Q-001` y `Q-002` preguntaban si el tema oscuro Sumi y el registry/CLI entraban en la v1. La v1 quedó etiquetada como `v0.1.0-poc` sin ambas cosas, y el roadmap ya las ubica en la fase 5 opcional (`F5-002`, `F5-001`).
- **Decisión:** La v1 no incluye Sumi ni registry. Ambas siguen disponibles como tareas post-v1 y, si se implementan, no reabren el alcance del tag: se documentan con su propia decisión y se validan con contraste AA y con una instalación real, respectivamente.
- **Consecuencias:** `Q-001` y `Q-002` se cierran como “fuera de la v1”; el registro de decisiones deja de tener preguntas de alcance v1 abiertas. Quedan abiertas `Q-004` (cerrada por `D-031`), `Q-005` (licencia) y `Q-006` (matriz de navegadores), que no bloquean el POC.
- **Alternativas:** Meterlas en la v1 (retrasa el tag sin demanda); borrar las preguntas (el registro es append-only; se cierran, no se borran).

---

<a id="d-035"></a>
## D-035 · Sumi: tema oscuro post-v1 con roles sólidos separados

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-002`; amplía `D-015`, que lo dejaba fuera de la v1)
- **Contexto:** `D-015` excluyó Sumi de la v1 para no duplicar la matriz visual antes de cerrar el POC. Con la v1 etiquetada, `F5-002` lo habilita. Un tema oscuro no puede reutilizar los colores de estado para texto y para fondos sólidos a la vez: un verde legible sobre papel oscuro no admite texto blanco encima, y viceversa. Tampoco alcanza con invertir `bg`/`fg`: las barras invertidas usaban `bg-sumi text-paper` y en oscuro quedaban tinta sobre tinta (contraste 1,13 detectado por axe).
- **Decisión:**
  - `[data-theme="sumi"]` invierte papel/tinta, aclara el primario y declara `color-scheme: dark`; el resto de los temas no cambia.
  - Se separan los roles **`*-solid`** (fondo con texto claro) de los roles de texto (`danger`, `success`…). Badge `solid` y `Button` danger usan `bg-*-solid` + `text-solid-fg`.
  - Se agregan roles **`inverse-bg`/`inverse-fg`** para las superficies invertidas (utility bar, footer): antes eran `bg-sumi text-paper` y en oscuro colapsaban.
  - El tema se aplica **antes del primer paint** con un script inline en `index.html`; el catálogo lo conmuta con su selector y las demos aceptan `?theme=sumi`.
  - El test de contraste cubre los cuatro temas, incluidos los pares `solid-fg`/`*-solid` y `inverse-fg`/`inverse-bg`.
- **Consecuencias:** Sumi es un tema completo y auditable (axe 0 serious/critical en catálogo, storefront y ERP; capturas en `docs/qa`). Los componentes existentes no cambian su API; solo los dos que pintaban fondos de estado con `text-white`. Cualquier tema futuro debe declarar sus `*-solid` si invierte la base.
- **Alternativas:** Un único rol de color con opacidad para fondos (rompe AA); mantener `bg-sumi`/`text-paper` (ilegible en oscuro); tema oscuro solo en el catálogo (no prueba el sistema completo).

---

<a id="d-036"></a>
## D-036 · DatePicker propio, sin dependencias y con panel anclado

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-003`)
- **Contexto:** El ERP usaba `<input type="date">`: el navegador decide el formato, no hay rango y la experiencia cambia por motor. Un date-picker completo suele traer una librería de fechas (peso, zona horaria, locale) o un paquete de calendario que duplica lo que ya resuelven `Intl` y los tokens. El POC necesita fecha simple, rango, teclado completo y ES/JA/EN.
- **Decisión:**
  - `Calendar` es una **tabla** con encabezados de día, un único `tabindex=0` (roving focus) y navegación con flechas, Home/End y PageUp/PageDown; Enter/Space selecciona. Los nombres accesibles usan `Intl` del `KotenProvider`.
  - `DatePicker` envuelve el calendario en un panel **anclado al campo** (sin portal), con `aria-expanded`, `aria-controls`, `aria-labelledby` que incluye el texto visible, Escape y cierre por clic fuera. Modos `single` y `range`; el rango se invierte si el segundo día es anterior.
  - Sin dependencias nuevas: aritmética de fechas local en el componente y `Intl.DateTimeFormat` para meses, días y valores.
  - El ERP reemplaza el input nativo por `DatePicker` con `min`/`max` y mantiene el estado como ISO (`YYYY-MM-DD`).
- **Consecuencias:** El formato deja de depender del navegador y el rango es testeable. El panel inline puede quedar recortado por un ancestro con `overflow: hidden`; si aparece ese caso, se migra a portal en una tarea nueva. La semana empieza en lunes para `es` y en domingo para `ja`/`en` (`Intl.Locale.weekInfo` con fallback).
- **Alternativas:** Librería de calendario (peso y API extra para 2 modos); `<input type="date">` (sin rango, formato del navegador); date-picker con portal (más piezas y foco más frágil en este tamaño).

---

<a id="d-037"></a>
## D-037 · CommandPalette: combobox + listbox sobre el diálogo existente

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-004`)
- **Contexto:** Un ERP denso necesita saltar a cualquier módulo o acción sin recorrer menús. Un palette requiere tres cosas a la vez: filtrado inmediato, teclado completo (flechas, Enter, Escape, PageUp/PageDown) y foco atrapado con retorno al disparador. Base UI ya resuelve el diálogo y el foco; la lista y el combobox son nuestros.
- **Decisión:**
  - `CommandPalette` compone el **Dialog** de Base UI (controlado por `open`/`onOpenChange`, con `initialFocus` en el campo) y mantiene el foco dentro del diálogo.
  - El campo es un **combobox** con `aria-controls` y `aria-activedescendant`; la lista es un **listbox** de `role="option"` con `tabIndex={-1}`. La selección se anuncia por el campo, no por foco real en las opciones.
  - El filtro normaliza acentos y mayúsculas y busca en `label`, `description`, `group` y `keywords`.
  - Los textos (`label`, `placeholder`, `emptyLabel`, `hint`) entran por props: el componente no hardcodea strings. Los items llevan icono y atajo opcionales.
- **Consecuencias:** El patrón es reutilizable en cualquier app y no agrega dependencias. La página `/components/command` lo documenta con demo, props y notas; axe lo audita con el diálogo abierto (`qa:a11y` lo abre desde `article button`). El catálogo sube a 344,4 KB totales, dentro del nuevo presupuesto 260/360 KB.
- **Alternativas:** `role="menu"` (semántica de acciones, no de búsqueda); opciones realmente enfocables (más saltos de tabulación y pierde el patrón combobox); una librería de command palette (peso y estilos ajenos).

---

<a id="d-038"></a>
## D-038 · Virtualización manual de DataTable

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-005`)
- **Contexto:** El ERP pagina de a 12 filas, pero un backoffice real a veces necesita recorrer miles de pedidos de una vez (auditoría, exportación visual, búsqueda amplia). Montar 10 000 filas bloquea el hilo principal y dispara el DOM. `@tanstack/react-virtual` resolvería el cálculo, pero agrega una dependencia y su integración con `<table>` requeriría reescribir el markup.
- **Decisión:**
  - `DataTable` acepta `virtualized`, `height`, `rowHeight` y `overscan`. En ese modo desactiva la paginación, calcula la ventana visible desde `scrollTop` y renderiza solo esas filas más `overscan` arriba y abajo.
  - El header queda sticky dentro del contenedor con scroll; el contenedor ya es enfocable y mantiene el scroll horizontal de `Table`.
  - La tabla expone `aria-rowcount` y cada fila `aria-rowindex`; las filas espaciadoras son `aria-hidden` y no contienen foco.
  - `rowHeight` es fijo (32 px por defecto, igual a la densidad default). Si la densidad cambia, el consumidor pasa 28/32/36; las celdas virtualizadas no envuelven texto.
  - Sin dependencias nuevas: aritmética de ventana y `onScroll`.
- **Consecuencias:** Con 10 000 filas el DOM mantiene ~29 filas y el LCP del catálogo con esa página es 416 ms local; el scroll solo reemplaza la ventana. Limitación documentada: filas de altura variable y celdas que envuelven no son compatibles con este modo; usar paginación o columnas cortas. El test cubre el conteo de filas, `aria-rowcount` y el salto a la fila 5 000.
- **Alternativas:** `@tanstack/react-virtual` (dependencia y API extra); paginación solamente (no cubre el caso de 10k); renderizar todo (DOM y memoria inviables).

---

<a id="d-039"></a>
## D-039 · Registry shadcn autocontenido, servido por el catálogo

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`F5-001`; complementa `D-033` y `D-007`)
- **Contexto:** `D-007` dejó el registry para después y `D-033` descartó publicar `@koten/ui` en npm. El modelo sigue siendo copiar la fuente, pero copiar a mano un patrón con sus dependencias (cn, i18n, tokens) es propenso a errores. shadcn permite instalar por URL si existe un registry con el esquema correcto.
- **Decisión:**
  - `scripts/build-registry.ts` genera `apps/catalog/public/r/<item>.json` (uno por primitiva y patrón, 64 items) más `registry.json`. `predev` y `prebuild` del catálogo lo regeneran; el directorio está en `.gitignore`.
  - **Cada item es autocontenido**: incluye los archivos de su closure de imports internos, el núcleo (`lib/koten/cn.ts`, `format.ts`, `intl.ts`, `labels.ts`, `provider.tsx`) y `styles/koten.css` (tokens + `@theme` + base + utilidades, sin `@source`). Los imports se reescriben al layout instalado (`../../lib/koten/...`, `../ui/...`), sin asumir `@/`.
  - Los targets son `components/ui/*`, `components/patterns/*`, `lib/koten/*` y `styles/koten.css`; el consumidor importa `@import "tailwindcss"; @import "./styles/koten.css";`.
  - Sin `registryDependencies` por nombre: al instalar por URL, las dependencias por nombre podrían resolverse contra el registry por defecto. La autocontención evita ese riesgo a costa de repetir el núcleo.
- **Consecuencias:** `npx shadcn@latest add http://localhost:5173/r/button.json` instala 7 archivos y `tsc --noEmit` pasa; lo mismo con `date-picker` y `detail-drawer`. Un cambio en un componente o en los tokens requiere regenerar (lo hacen `predev`/`prebuild`) y republicar. El JSON del registry no entra al presupuesto de JS: son assets estáticos. Sigue sin haber paquete npm (`D-033`).
- **Alternativas:** Publicar en npm (descartado en `D-033`); registry con `registryDependencies` por nombre (frágil fuera del namespace); un único item con todo el sistema (instalaciones enormes y sin granularidad).

---

<a id="d-040"></a>
## D-040 · Source en inglés y Fundamentos orientado al usuario

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-002`; complementa `D-008` y `D-025`)
- **Contexto:** `D-008` fija la documentación de trabajo en español y `D-025` mantiene el cuerpo del catálogo en ES/JA/EN. El código había acumulado comentarios, JSDoc, mensajes de script y títulos de test en español, lo que mezcla el idioma de la documentación con el del fuente y dificulta reutilizar el paquete. Además, la portada de Fundamentos explicaba fases, IDs de tarea y decisiones internas, que no aportan a quien solo consume la UI.
- **Decisión:**
  - El **source se escribe en inglés**: comentarios, JSDoc, mensajes de consola y de error, y descripciones de tests. Los diccionarios de copy ES/JA/EN (catálogo, labels de `@koten/ui` y datos de las demos) se mantienen intactos porque son la documentación de muestra (`D-025`).
  - Los `.md` internos (`AGENTS.md`, `ROADMAP.md`, `docs/**`) siguen en español (`D-008`); no se traducen.
  - La portada de Fundamentos (`/tokens`) pasa a ser una **página de contrato visual**: un espécimen compuesto (`FoundationsSpecimen`) y tarjetas con previews en vivo (`FoundationPreview`) para color, tipografía, espaciado, forma, densidad, temas y formato.
  - El copy visible de Fundamentos **no menciona fases, IDs `F*`/`C-*`/`D-*`, tareas ni decisiones**. El estado del shell deja de mostrar la fase y muestra la escala del sistema (primitivas, patrones, temas, densidades) y los idiomas.
  - `apps/catalog/public/r` (registry generado e ignorado por git) se excluye también de Biome para que `bun run check` no dependa de si el registry fue regenerado.
- **Consecuencias:** El fuente queda reutilizable en inglés sin perder la documentación trilingüe. Fundamentos se lee como un manual visual y no como un informe de proyecto. `bun run check` (201 tests) y `bun run budget` (catálogo 247,5/347,5 KB) pasan. Los tests de páginas y de shell se ajustan al nuevo copy.
- **Alternativas:** Traducir también los diccionarios ES/JA/EN (rompe `D-025` y las demos trilingües); dejar el copy de Fundamentos con fases (mantiene ruido interno para el consumidor); documentar el source en español (rompe la reutilización del paquete fuera del equipo).

---

<a id="d-041"></a>
## D-041 · Portada editorial del catálogo, no landing de marketing

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-003`; precisa `D-019`, `D-020`, `D-025` y `D-040`)
- **Contexto:** La portada del catálogo (`/`) era un índice wiki: cabecera, cuatro tarjetas, principios y accesos. Servía para navegar, pero no mostraba el sistema: quien llegaba no veía las piezas, los temas ni la escala real antes de entrar en una página. `DESIGN-SYSTEM.md` §12 y `REQUIREMENTS.md` §9 decían “no es una landing de marketing”, una regla pensada para evitar testimonios, precios y claims, no para prohibir una portada que presente el sistema.
- **Decisión:**
  - `/` pasa a ser una **portada editorial del catálogo**: masthead con hanko, declaración y cifras; una **placa viva** con pedido, tabla, precio, estado y estadística; la comparación de los tres registros; el índice de piezas; los principios y la calidad; las dos demos; el cierre con la instalación por URL. Todo con piezas documentadas, datos reales del catálogo y copy ES/JA/EN.
  - La portada usa el **layout ancho** del catálogo: sin sidebar de escritorio y con el ancho del contenedor (1200 px). Conserva header, toggles de tema/densidad/idioma, menú móvil, skip link y footer. El pager anterior/siguiente se oculta solo en `/`.
  - Se componen primitivas y patrones existentes: `Panel`, `Table`, `PriceBlock`, `StatCard`, `Sparkline`, `StatusBadge`, `Badge`, `Meter`, `SectionHeader`, `Pattern`, `Hanko`, `Tategaki`, `Code` y `buttonVariants`. Las estructuras puramente editoriales (`SystemPlate`, `RegisterCard`, `EntryCard`, `DemoCard`) son custom, pero usan tokens, roles, densidad y reglas del sistema; no agregan dependencias ni primitivas nuevas.
  - Los tres registros mantienen su `data-theme` local para poder compararse, igual que las tarjetas de `/tokens/themes`. El resto de la portada responde al selector del encabezado.
  - Los conteos de la portada salen de `apps/catalog/src/data/inventory.ts`, la misma fuente que usan los inventarios de Componentes y Patrones.
  - La regla “no es una landing de marketing” se **precisa**: la portada puede ser editorial y ambiciosa, pero no puede usar testimonios, precios inventados, carruseles infinitos, gradientes decorativos ni capturas con texto. No se duplica el catálogo: enlaza a sus páginas.
- **Consecuencias:** La primera pantalla demuestra el sistema completo (tipografía, marcos, color, densidad, datos y temas) antes de leer una sola página. La portada no tiene sidebar en escritorio; los accesos principales viven en el índice rápido, las tarjetas y el cierre. `bun run check`, `qa:a11y` (catálogo sin serious/critical, 0 textos < 12 px), `qa:overflow` (84 combinaciones) y `bun run budget` pasan. Se actualizan `DESIGN-SYSTEM.md` §12 y `REQUIREMENTS.md` §9, y se agrega `R-021`.
- **Alternativas:** Mantener el índice wiki (correcto pero opaco: no muestra el sistema); una landing de marketing con hero, testimonios y “features” (fuera de la tesis y de los guardrails); una app aparte solo para la portada (duplica shell, toggles y tokens); capturas estáticas (prohibidas por `D-010` y no responden a tema/densidad/idioma).

---

<a id="d-042"></a>
## D-042 · Una página por componente y una sección de bloques

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-004`; precisa `D-019`, `D-029` y `D-039`)
- **Contexto:** El catálogo agrupaba 46 primitivas en 13 páginas y 20 patrones en 3 páginas. Funcionaba para recorrer el sistema, pero no para instalarlo: la instalación, el código, las props y la accesibilidad de cada pieza quedaban mezclados con las de sus vecinas. Además, los patrones se llamaban “patrones” aunque en la práctica son bloques pre-armados que pueden crecer en nuevas categorías.
- **Decisión:**
  - Cada primitiva vive en `/components/<slug>` con su propia página: instalación por registry, ejemplos con **vista previa / código**, props, accesibilidad y referencia a Base UI cuando envuelve una primitiva.
  - Los controles de formulario (`Field`, `Label`, `Input`, `Textarea`, `FormRow`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `NumberField`) agregan una sección **Uso en un formulario** con un formulario mínimo completo.
  - Los componentes que necesitan `KotenProvider`, un hook (`useToast`), estado controlado, portal o una dependencia (`@tanstack/react-table`) lo declaran en **Requisitos de uso**.
  - Los 20 bloques de storefront y ERP viven en `/blocks/<categoría>/<slug>`, con índice por categoría. La sección se llama **Bloques** y admite categorías nuevas sin mezclarse con las primitivas.
  - Las rutas antiguas (`/components/forms`, `/patterns/storefront`, etc.) redirigen para no romper enlaces.
  - Los metadatos de navegación se separan del contenido: el entry importa solo nombres, rutas y descripciones cortas; cada página carga su módulo con `import()` bajo demanda.
  - `BarChart` recibe `C-066` para tener ID propio; `Sparkline` conserva `C-040`.
- **Consecuencias:** El catálogo pasa de 13 + 3 páginas a **46 páginas de componentes + 20 páginas de bloques**. El JS inicial queda en **263,1 KB gzip** y el total en **429,6 KB**; el presupuesto del catálogo sube de 260/360 a **290/470 KB** por el contenido trilingüe individual. La navegación lateral lista las 46 primitivas y las tres entradas de bloques. `bun run check` cubre 207 tests y la integridad de las 66 páginas.
- **Alternativas:** Mantener las páginas por grupo (menos rutas, peor instalación); un único módulo de datos con todo el contenido (infla el entry o impide el code splitting); MDX o un generador de docs (dependencia y ceremonia nuevas); llamar “patrones” a los bloques (mezcla piezas pre-armadas con primitivas).
