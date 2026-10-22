# Registro de decisiones — Koten UI

> ADR ligero. Cada decisión tiene ID estable y no se renumera.
> Si una decisión se reemplaza, se agrega una nueva con `supersede a D-00x`.
> Última actualización: 2026-10-22.

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
- [D-043 · Producción en un dominio, una imagen y tres puertos](#d-043)
- [D-044 · El registry respeta los aliases de shadcn](#d-044)
- [D-045 · Documentación para agentes y skills de consumo y diseño](#d-045)
- [D-046 · Empezar se separa en usar y desarrollar el sistema](#d-046)
- [D-047 · Runner de shadcn configurable: npx o bunx](#d-047)
- [D-048 · Tercera skill: lenguaje de diseño para crear piezas nuevas](#d-048)
- [D-049 · i18n del consumidor: diccionarios JSON por idioma y locale BCP 47](#d-049)
- [D-050 · Documentación directa y listas en lugar de tarjetas](#d-050)
- [D-051 · Diseñador de temas con parámetros curados, contraste AA y export superpuesto](#d-051)
- [D-052 · README en inglés como entrada y versión en español opcional](#d-052)
- [D-053 · Licencia MIT y cierre de Q-005](#d-053)
- [D-054 · Configuración del catálogo en un panel flotante](#d-054)
- [D-055 · Empezar: requisitos en prosa y solo pasos necesarios numerados](#d-055)
- [D-056 · Quitar la sección de límites del diseñador de temas](#d-056)
- [D-057 · Japonés opcional en consumo y autoría externa](#d-057)

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

---

<a id="d-043"></a>
## D-043 · Producción en un dominio, una imagen y tres puertos

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-005`; precisa `D-031` y `D-039`)
- **Contexto:** El POC se cerró sin despliegue alojado (`D-031`) y el registry se servía desde el catálogo local (`D-039`). El producto pasa a producción en `koten.codehive.com.co` y necesita un artefacto único, repetible y publicable desde CI, con el catálogo en `/`, el storefront en `/demos/store` y el ERP en `/demos/erp` bajo el mismo dominio. Las tres apps son SPAs de Vite con assets absolutos, así que el prefijo público no puede resolverse solo con reglas de proxy.
- **Decisión:**
  - **Una imagen multi-stage**: `oven/bun:1.4.3` instala con el lockfile y ejecuta `bun run build`; `nginxinc/nginx-unprivileged:1.27-alpine` sirve los tres `dist` sin Node ni Bun en runtime.
  - **Tres puertos de contenedor**: `3000` catálogo/docs, `3001` storefront, `3002` ERP. `docker-compose.yml` los declara con `expose` —sin publicarlos en el host— y tres routers de Traefik sobre el mismo host los alcanzan por la red de Docker con `loadbalancer.server.port`; publicar `3000/3001/3002` solo arriesga choques con otros servicios. `docker-compose.local.yml` es un override que publica los tres únicamente para pruebas locales.
  - **Traefik conserva el prefijo** (`PathPrefix(/demos/store)` y `/demos/erp) sin `StripPrefix`; el router del catálogo usa prioridad 1 y los de las demos prioridad 10. nginx recibe las rutas completas y hace fallback de SPA dentro de cada prefijo.
  - **Vite compila las demos con su prefijo de producción**: `base` es `/demos/store/` y `/demos/erp/` cuando `mode === "production"` (`vite build` y `vite preview`), y `/` en desarrollo. Así los assets absolutos nunca caen en el catálogo. El ERP además usa `basename` de React Router y conserva el prefijo en `history.replaceState`, enlaces del `SideNav` y navegación programática.
  - **URLs públicas centralizadas** en `apps/catalog/src/lib/site.ts`: en desarrollo apuntan a `localhost:5173/5174/5175`; en producción a `https://koten.codehive.com.co`, `/demos/store`, `/demos/erp` y `/r`. Se pueden sobreescribir con `VITE_SITE_URL`, `VITE_STOREFRONT_URL`, `VITE_ERP_URL` y `VITE_REGISTRY_URL` en el build.
  - **Registry y shadcn**: `scripts/build-registry.ts` publica `homepage` con `KOTEN_SITE_URL` y el catálogo muestra el comando de instalación con el registry del entorno; en producción: `npx shadcn@latest add https://koten.codehive.com.co/r/<item>.json`.
  - **CI**: GitHub Actions construye y publica `ghcr.io/<owner>/<repo>` en `main` y tags `v*`; en pull requests solo construye. El job de Docker depende del job de `check`.
  - Los scripts de QA que usan `vite preview` (`qa:perf`, `qa:visual`) conocen el prefijo de cada app, y el presupuesto de bundles acepta assets bajo cualquier `base`.
- **Consecuencias:** `docker compose up -d` levanta el sitio completo detrás de Traefik sin publicar puertos; `/`, `/demos/store/` y `/demos/erp/` responden con sus assets y deep links. La imagen es inmutable y el despliegue no depende de Node. `D-031` queda como historia del POC: el “sin deploy alojado” ya no aplica a esta etapa. El cambio de dominio o de prefijo se hace con variables de entorno y `KOTEN_SITE_URL`; si cambia el prefijo, hay que ajustar a la vez `base` de Vite, nginx y Traefik.
- **Alternativas:** Tres imágenes o tres servicios separados (más piezas y más capas que mantener para tres estáticos); un único puerto con nginx resolviendo los tres paths (contradice los tres puertos pedidos y oculta el fallo de una demo detrás del catálogo); `StripPrefix` en Traefik con `base: "/"` (los assets absolutos de las demos se resolverían contra el catálogo); reescribir cada enlace de cada app a mano (se desincroniza en la siguiente ruta).

---

<a id="d-044"></a>
## D-044 · El registry respeta los aliases de shadcn y entrega el tema en el CSS del proyecto

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-006`; supersede parcialmente a `D-039` y precisa `D-043`)
- **Contexto:** El registry de `D-039` funcionaba con la maquinaria de shadcn, pero instalaba los archivos con rutas relativas (`components/ui`, `lib/koten`) y reescribía los imports a `../../lib/koten/...` sin leer `components.json`. Eso ignora `aliases.components`, `aliases.ui`, `aliases.lib` y `aliases.hooks`, y obliga a crear una carpeta `styles/` en el proyecto consumidor. Como Koten es una alternativa completa y no un tema de shadcn, el CSS de `tailwind.css` debe quedar con los tokens de Koten, sin mezclar el archivo base de shadcn con una carpeta propia.
- **Decisión:**
  - Los **targets** usan los placeholders de shadcn: `@ui/<archivo>`, `@components/patterns/<archivo>` y `@lib/koten/<archivo>`. El CLI los resuelve contra `aliases.ui`, `aliases.components` y `aliases.lib`, así que funciona con `@/`, `~/`, `#` o el prefijo que declare el proyecto.
  - El contenido usa **imports canónicos** `@/components/ui/...`, `@/components/patterns/...` y `@/lib/koten/...`. shadcn los reescribe al alias real del proyecto; no quedan imports relativos.
  - El CSS deja de viajar como `styles/koten.css`. Se agrega el item `koten-theme` de tipo `registry:theme`, con `cssVars.theme` para los roles de `@theme inline` y `css` para `:root`, `[data-theme]`, `[data-density]`, `@layer base` y `@utility`. Cada componente declara `koten-theme` como `registryDependencies` con URL absoluta.
  - `koten-theme` escribe en el archivo `tailwind.css` declarado en `components.json`; no crea carpetas nuevas. La documentación indica importar ese CSS una vez en la app y, si el proyecto ya usaba tokens de shadcn, instalar `koten-theme` antes de los componentes para que reemplace los valores existentes.
  - Se agregan alias de compatibilidad (`--color-background`, `--color-border`, `--color-ring`, `--color-primary`, etc.) mapeados a roles de Koten para que `@layer base` de un proyecto inicializado con shadcn siga compilando. No se envían los resets `--color-*: initial`, `--font-*: initial`, etc.: en un proyecto con tokens previos borrarían mappings que el CLI no vuelve a escribir.
  - `postcss` entra como devDependency de la raíz para convertir `tokens.css` y `globals.css` en el objeto `css` del registry durante el build.
  - `predev` del catálogo genera el registry con `KOTEN_SITE_URL=http://localhost:5173`; `prebuild` usa el origen de producción. Docker recibe `KOTEN_SITE_URL` además de `VITE_SITE_URL`.
- **Consecuencias:** Una instalación real con `components.json` de aliases `~/...` y `tailwind.css: app/app.css` crea `components/ui/*` y `lib/koten/*`, reescribe imports a `~/lib/koten/*` y modifica solo `app/app.css`; no aparece `styles/`. El CSS compila con Tailwind 4 tanto si se instala `koten-theme` primero como si llega como dependencia. Actualizar tokens requiere volver a instalar `koten-theme`. Los items del registry siguen autocontenidos en código (componente + núcleo `lib/koten`), pero el CSS se comparte en un solo item. `D-039` queda vigente en la autocontención de archivos y superseded en targets relativos, imports relativos y `styles/koten.css`.
- **Alternativas:** Mantener rutas e imports relativos (ignora `components.json` y sigue creando una carpeta custom); emitir `koten.css` con un target fijo junto a `app.css` (asume una ruta que el registry no puede conocer); sobrescribir `app/app.css` como `registry:file` (peligroso en proyectos ajenos); inyectar `@theme` con resets (rompe `@apply` de un proyecto inicializado con shadcn).

---

<a id="d-045"></a>
## D-045 · Documentación para agentes y skills de consumo y diseño

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-007`; precisa `D-020`, `D-025` y `D-044`)
- **Contexto:** Koten UI ya tenía catálogo trilingüe, páginas individuales y registry, pero un agente que llegaba al repositorio o al sitio no tenía un punto de entrada estable: debía leer TSX, inferir la API y reconstruir la instalación. Al mismo tiempo, el conocimiento para **usar** el sistema y el conocimiento para **extenderlo** son distintos y no debían mezclarse en un único documento. El ecosistema Agent Skills ([agentskills.io](https://agentskills.io/specification)) y el CLI de Vercel ([vercel-labs/skills](https://github.com/vercel-labs/skills)) ya ofrecen un formato y una ruta de instalación que conviene adoptar en lugar de inventar otro.
- **Decisión:**
  - Se agregan **tres niveles** de acceso para IA:
    1. **Lectura**: `llms.txt` (índice, formato [llmstxt.org](https://llmstxt.org/)), `llms-full.txt` (corpus completo), una página Markdown por componente (`/md/components/<slug>.md`) y por bloque (`/md/blocks/<categoría>/<slug>.md`), más las guías internas en `/md/guides/`. Cada página del catálogo enlaza su Markdown.
    2. **Consumo**: skill `koten-ui`, con el inventario generado, reglas de instalación, composición, temas, i18n y calidad.
    3. **Extensión**: skill `koten-design-system`, con la gramática visual, el blueprint de componentes, tokens/temas/densidades y el checklist para sistemas nuevos.
  - Las skills viven en `skills/<name>/SKILL.md` para que `npx skills add codehive-colombia/koten` las descubra. Siguen el estándar: `name` y `description` en el frontmatter, cuerpo corto, detalle en `references/`, referencias relativas y sin secretos.
  - **Una sola fuente**: la capa de agentes se genera desde `apps/catalog/src/data/docs` y `docs/*.md` con `scripts/build-ai-docs.ts`. `bun run ai:docs` escribe el sitio y los archivos rastreados (raíz `llms.txt` y las referencias de `koten-ui`); `bun run ai:check` falla si están desactualizados o si una skill rompe el formato. `predev`/`prebuild` del catálogo la regeneran junto con el registry.
  - Los artefactos para agentes se escriben en **inglés** (es el idioma de consumo de los agentes y de los ejemplos de código); el catálogo humano sigue en ES/JA/EN (`D-025`) y los documentos internos en español (`D-008`). No se traducen los `.md` internos.
  - El sitio suma `/ai` con los tres niveles, comandos y enlaces; el README y `AGENTS.md` documentan la ruta.
- **Consecuencias:** Un agente puede entrar por `/llms.txt`, leer una página concreta, instalar el registry y activar la skill correcta sin leer el catálogo entero. El inventario y las guías no pueden desincronizarse del código: la comprobación corre en `bun run check`. El build del catálogo produce 70 archivos de sitio adicionales (~250 KB para `llms-full.txt`) y tres archivos rastreados. La instalación por `npx skills` depende de que el repositorio sea accesible para el consumidor.
- **Alternativas:** Publicar solo el catálogo humano (obliga al agente a inferir la API desde TSX); un MCP server (más infraestructura y estado que un repositorio de documentos estáticos); un único `SKILL.md` para consumo y diseño (mezcla dos tareas y dispara la skill equivocada); escribir los Markdown a mano (se desactualizan en la siguiente pieza); usar un generador de docs externo (dependencia y ceremonia nuevas, contra `D-042`).

---

<a id="d-046"></a>
## D-046 · Empezar se separa en usar el sistema y desarrollar el sistema

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-008`; precisa `D-042`, `D-044` y `D-045`)
- **Contexto:** La página **Empezar** (`/start`) había crecido mezclando dos audiencias: quien llega a instalar Koten UI en un proyecto React y quien llega a trabajar dentro del repositorio. La primera mitad explicaba `bun install` y las tres demos; la segunda pedía copiar `packages/ui` a mano, un flujo anterior al registry (`D-044`). El resultado era largo, desactualizado y poco amable: un consumidor leía requisitos de Bun que no necesita y un colaborador saltaba pasos de instalación que sí necesita.
- **Decisión:**
  - **Empezar** abre con dos tarjetas de camino: **Quiero usar Koten UI** (`#usar`) y **Quiero desarrollar Koten UI** (`#desarrollar`). La descripción de la página dice explícitamente que no son el mismo recorrido.
  - **Usar** asume React 19 + Tailwind 4 + `components.json`; no requiere Bun ni clonar el repositorio. Pasos: instalar `koten-theme`, instalar el item, importar el CSS de Tailwind, envolver con `KotenProvider`, usar la pieza, elegir tema/densidad/idioma y, opcionalmente, instalar la skill `koten-ui`. Se elimina el flujo de `cp packages/ui/...`.
  - **Desarrollar** asume Bun y Git; pasos: clonar, `bun install`, `bun run dev` con los tres puertos, `bun run check`/`build`/`budget`, leer `AGENTS.md` y el design system, auditorías opcionales y regeneración de registry/agentes. No repite la instalación por registry.
  - El contenido sigue en ES/JA/EN; las listas y párrafos admiten código inline (`components.json`, `koten-theme`, rutas) con un renderer local, sin backticks literales.
  - El README replica la separación en **Usar Koten UI en tu proyecto** y **Desarrollar Koten UI**. Los tests de la página comprueban los dos caminos y que el flujo obsoleto de copia manual ya no aparece.
- **Consecuencias:** Un consumidor llega al comando que necesita sin leer requisitos del monorepo; un colaborador encuentra el arranque real, las verificaciones y el mapa del repositorio. La página queda más larga en total pero cada camino es lineal y autosuficiente. El README deja de mezclar `bun install` con la instalación por registry. Se actualizan `DESIGN-SYSTEM.md` §12, `REQUIREMENTS.md` (`R-025`) y el roadmap (`M-008`).
- **Alternativas:** Mantener una sola guía lineal (obliga a cada audiencia a filtrar comandos); separar en dos rutas del catálogo (duplica navegación y rompe enlaces profundos existentes); dejar solo el camino de consumo y mover el desarrollo a `AGENTS.md` (el catálogo deja de explicar cómo se ejecuta); usar tabs sin URL (peor para compartir y para agentes).

---

<a id="d-047"></a>
## D-047 · Runner de shadcn configurable y persistente: npx o bunx

- **Fecha:** 2026-10-21
- **Estado:** `accepted` (`M-009`; precisa `D-044` y `D-046`)
- **Contexto:** El catálogo mostraba siempre `npx shadcn@latest add ...`, aunque Koten se desarrolla con Bun y muchos consumidores usan `bunx`. Cambiar el comando a mano en cada página es ruido, y el copy queda incorrecto para la mitad de los proyectos. La elección de runner no pertenece a la URL del catálogo (tema, densidad e idioma sí): es una preferencia de trabajo del usuario.
- **Decisión:**
  - Se agrega un selector segmentado **npx / bunx** (`PackageManagerTabs`) en la guía de uso de `/start`, en la portada y en la sección **Instalación** de cada componente y bloque.
  - La preferencia vive en `localStorage` bajo `koten.package-manager`, con `npm` como valor inicial. Se comparte entre páginas mediante `useSyncExternalStore`; no viaja en la URL ni requiere provider.
  - `registryCommand(item, packageManager)` devuelve `npx` o `bunx`; `packageRunner()` centraliza la etiqueta. El requisito de `shadcn init` en Empezar también se adapta.
  - Los controles usan el patrón existente de toggles del catálogo (`fieldset` + `aria-pressed`), con el label localizado `Ejecutar con` / `実行` / `Run with`.
  - La documentación generada para agentes incluye ambos comandos (`# Node` y `# Bun`), aunque el frontmatter conserva `npx` como forma canónica.
- **Consecuencias:** Un proyecto Bun copia `bunx` en todas las páginas sin repetir la elección; un proyecto Node sigue viendo `npx`. La preferencia sobrevive a la navegación y a recargar la página. `site.test.ts` cubre ambos runners y `pages.test.tsx` comprueba el cambio, el `localStorage` y la persistencia entre páginas. No se escribe la preferencia en la URL, así que un enlace compartido no impone un runner.
- **Alternativas:** Duplicar cada comando con dos líneas fijas (más ruido y copy desactualizado); usar la URL (contamina enlaces y `replaceState` con una preferencia personal); un provider nuevo (más ceremonia para un valor global simple); detectar Bun por heurística (frágil: el navegador no sabe qué runner usa el proyecto).

---

<a id="d-048"></a>
## D-048 · Tercera skill: lenguaje de diseño para crear piezas nuevas

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-010`; precisa `D-045`, `D-020` y `D-044`)
- **Contexto:** Las dos skills existentes cubren **consumir** las piezas instaladas (`koten-ui`) y **extender el repositorio** de Koten (`koten-design-system`), pero ninguna resuelve el caso más común en un proyecto que ya usa Koten: hace falta una pieza que el catálogo no trae. Sin una guía portátil, un agente improvisa una tarjeta con sombra, un botón pill o un color hardcodeado, o copia una primitiva y la renombra. `koten-design-system` no sirve para ese caso porque está escrita para el monorepo: rutas de `packages/ui`, páginas del catálogo, registry y puerta de calidad del repositorio.
- **Decisión:**
  - Se agrega una tercera skill, **`koten-design-language`**, portátil y enfocada en la **esencia** de Koten y en la autoría local de una pieza que no existe en la base. Se instala sola en cualquier proyecto que ya tenga los tokens de Koten.
  - Las tres skills tienen un trabajo distinto y descripciones que no se solapan: `koten-ui` instala y compone; `koten-design-system` agrega primitivas, bloques, tokens, temas o densidades **dentro del repositorio**; `koten-design-language` crea una pieza **en el proyecto del consumidor** sin forkear ni inventar valores.
  - Contenido de `koten-design-language`: `SKILL.md` con la tesis, el orden de trabajo y las reglas no negociables; `references/tokens.md` con las dos capas, todos los roles y utilidades, el contrato de contraste (4.5:1 / 3:1), forma, tipografía, densidad y temas; `references/authoring.md` con el contrato previo, plantilla, CVA, composición con Base UI, matriz de estados, i18n, un ejemplo completo (`DefinitionList`) y tests; `references/verification.md` con el procedimiento de contraste, la matriz de temas/densidades/anchos, guiones de teclado y la definición de terminado.
  - Los artefactos siguen en **inglés** (`D-045`). La skill es documentación escrita a mano, no generada, porque el significado de un rol y el juicio de autoría no se derivan del CSS; lo que sí se valida automáticamente es que **cada `--koten-*` citado exista** en `tokens.css` o `globals.css`. `bun run ai:check` falla ante un token inventado, una referencia rota o un frontmatter inválido.
  - El catálogo mantiene **tres niveles** de acceso (lectura, consumo, extensión); el nivel de extensión ahora presenta las dos skills, `koten-design-system` y `koten-design-language`. Se actualizan `/ai`, `/start`, `llms.txt`, el README, `skills/README.md` y `DESIGN-SYSTEM.md` §14.
- **Consecuencias:** Un agente elige la skill por contexto: instalar piezas, cambiarlas en el sistema o crear una pieza nueva. La skill nueva no depende de rutas del monorepo, así que viaja con el consumidor. La gramática se explica dos veces desde ángulos distintos (sistema vs. autoría), con riesgo de divergencia contenido por la validación de tokens y por la regla de que los tokens son la fuente de verdad. La descripción de `koten-design-language` debe seguir siendo explícita sobre lo que **no** hace para no activarse en tareas de repositorio.
- **Alternativas:** Fusionarla con `koten-design-system` (la descripción se vuelve ambigua, la mitad del contenido son rutas y trámites del monorepo que el consumidor no tiene); publicarla en un repositorio aparte (deja de viajar con el registry y con `npx skills add`); confiar solo en `llms.txt` y los Markdown generados (describen piezas existentes, no el juicio para crear una nueva); generar `tokens.md` desde el CSS (perdería el significado de cada rol, el contraste y las reglas de composición, que son la parte que el agente necesita).

---

<a id="d-049"></a>
## D-049 · i18n del consumidor: diccionarios JSON por idioma y locale BCP 47

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-011`; precisa `D-020`, `D-025` y `D-044`; cierra parte de `R-004`)
- **Contexto:** `KotenLocale` era `"es" | "ja" | "en"` y el provider resolvía labels solo para esos tres. Un proyecto con `fr-FR` no podía usar el provider sin castear, y el registry incrustaba `labels.ts`, `provider.tsx`, `format.ts` e `intl.ts` en cada componente: no había un único punto de edición y cada instalación podía pisar traducciones. La documentación contaba que había ES/JA/EN, pero no de quién era cada capa ni cómo se agregaba un idioma, así que parecía que los tres eran obligatorios.
- **Decisión:**
  - **Tres capas:** labels internos del kit (21 strings), copy de la app (nunca en Koten) y formato (`Intl` vía `useKotenFormatters`). Koten no impone un runtime de contenido; i18next, FormatJS o Lingui se componen.
  - **Locale:** el provider acepta cualquier BCP 47 (`KotenLocaleCode = KotenLocale | (string & {})`); `KotenLocale` sigue siendo el conjunto de diccionarios instalados, así que los diccionarios de las apps conservan exhaustividad. `useKoten()` tipa el locale con los diccionarios instalados; para leer otro se usa `useKoten<string>()` o la unión de la app.
  - **Diccionarios JSON:** `packages/ui/src/i18n/messages/{es,ja,en}.json`; `dictionaries.ts` los registra con `satisfies Record<string, KotenLabels>`. El inglés es la base y el fallback; `fallbackLocale = "en"`.
  - **Registry:** `koten-i18n` instala el runtime (`provider.tsx`, `labels.ts`, `format.ts`, `intl.ts`), un `dictionaries.ts` que solo importa inglés y `messages/en.json` en `lib/koten/i18n/`. Cada idioma adicional es un item `registry:file` independiente (`koten-i18n-es`, `koten-i18n-ja`, `koten-i18n-en`) que instala solo su JSON; el consumidor lo registra en `dictionaries.ts`. Los componentes dependen de `koten-i18n` y ya no incrustan la copia.
  - **Fallback:** diccionario del locale, o inglés si no existe; luego `labels` del provider (completo o parcial).
  - **Documentación:** `/tokens/format` explica las capas, la instalación por packs, un locale `fr-FR` en vivo, los límites y el fallback; `DESIGN-SYSTEM.md` §7, `RECIPES.md` §6, las skills y `llms.txt` siguen el mismo modelo.
  - **ES/JA/EN** siguen siendo los idiomas del catálogo y de los demos (`D-025`), y los diccionarios que Koten incluye; no son un requisito para el consumidor.
- **Consecuencias:** Un consumidor instala `koten-i18n` como dependencia y elige qué packs agregar; el inglés funciona sin configuración. `KotenProvider` sin `locale` ahora usa inglés (antes español), y los componentes fuera de un provider también. Cambia la ruta instalada de `lib/koten/{labels,provider,format,intl}` a `lib/koten/i18n/`; es una ruptura de import para instalaciones previas, aceptable antes de la v1. El JSON agrega ~1 KB por idioma y no requiere runtime, pero el `tsconfig` del consumidor necesita `resolveJsonModule` (Vite y Next lo traen). `labels.ts`, `provider.tsx` y el registry tienen tests de locale desconocido, merge parcial, fallback y packs.
- **Alternativas:** Mantener `KotenLocale` cerrado y exigir `labels` completos (no resuelve la ergonomía ni el tipado); `KotenLocale = string` puro (obliga a reescribir ~30 archivos de demos y pierde exhaustividad); un runtime propio con interpolación y plurales (peso y alcance fuera del kit); un solo `dictionaries.ts` con los tres idiomas (hace obligatorio lo que se quiere opcional); cargar JSON por fetch (parpadeo, asincronía y sin tipos).

---

<a id="d-050"></a>
## D-050 · Documentación directa y listas en lugar de tarjetas

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-012`; precisa `D-008`, `D-025` y `D-042`)
- **Contexto:** El catálogo había acumulado texto repetido en cada página: la instalación explicaba los aliases y `koten-theme` en todos los componentes, las secciones mostraban metas genéricas (“API pública, valores por defecto y notas”) y los requisitos de uso se presentaban como tarjetas. En los índices, las tarjetas con borde y cabecera competían con la lectura y repetían información que ya estaba en el título. El resultado era más largo de lo necesario y ocultaba lo específico de cada pieza.
- **Decisión:**
  - **Listas para leer.** Requisitos de uso y accesibilidad se muestran como listas con reglas; los índices de Fundamentos, Bloques y Empezar usan filas de lista, no tarjetas. Las tarjetas se reservan para la portada editorial; en el resto de la documentación, la navegación también se lee como lista.
  - **Una explicación por tema.** La instalación por registry, los aliases y `koten-theme` se explican en **Empezar**; cada componente solo muestra el comando y los archivos. Se retiran las metas de sección que repetían el título y el párrafo genérico de uso en formularios.
  - **Tono directo.** Se eliminan frases de relleno, repeticiones entre descripción y ejemplo y explicaciones que no cambian una decisión. Se conserva la amplitud cuando aporta: API, estados, accesibilidad y límites.
  - **Vigencia.** Se corrigen referencias obsoletas a 11 px (`D-027` fija 12 px) y al alcance de la v1; las guías describen el sistema actual.
  - La documentación sigue en ES/JA/EN (`D-025`) y los artefactos para agentes se regeneran desde la misma fuente (`D-045`).
- **Consecuencias:** Las páginas de componente son más cortas y fáciles de recorrer; la información repetida vive una sola vez y los índices se leen como documentos. Las tarjetas de la portada conservan su función editorial. El cambio es de presentación y copy, no de API ni de tokens.
- **Alternativas:** Mantener tarjetas en todas las secciones (más peso visual y menos densidad); mover la explicación de instalación a un modal o tooltip (oculta información que el lector necesita al copiar); dejar las metas genéricas (ruido en cada página); recortar también la portada (pierde su función de muestra del sistema).

---

<a id="d-051"></a>
## D-051 · Diseñador de temas con parámetros curados, contraste AA y export superpuesto

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-013`; precisa `D-004`, `D-011`, `D-035` y `D-044`)
- **Contexto:** Koten ya tiene cuatro temas funcionales, pero un consumidor que llega al catálogo se enfrenta a más de doscientos tokens. Para adaptar el sistema a su marca tendría que editar `tokens.css`, entender qué valores son semánticos y comprobar contrastes a mano. Esa libertad es la vía más rápida para salirse de la gramática: un radio de 12 px, una fuente distinta o un primario con 3:1 rompen la identidad aunque los componentes sigan iguales. Hacía falta una herramienta que permita **personalizar sin diseñar un sistema nuevo**.
- **Decisión:**
  - Se agrega la página **`/theme` · Diseñar un tema**, enlazada desde la navegación de Fundamentos y desde `/tokens/themes`. Trabaja sobre un espécimen propio; no cambia el tema del catálogo.
  - Solo hay **cinco entradas**: registro (`kanso`, `chirashi`, `daicho`, `sumi`), pigmento de la paleta (`ai`, `shu`, `kin`, `matcha`), papel (5 pasos), radio (0–3 px) y densidad (3). No hay selector de color, campo de hex, fuente, espaciado ni sombra.
  - Todos los demás valores se **derivan** de esas entradas: hover, strong, `primary-fg`, tintes, neutros (`fg`, `muted`, `faint`, reglas), selección, estados, fondos sólidos, overlays y sombras. Los estados conservan su significado; Sumi mantiene sus sólidos y su `color-scheme`.
  - Antes de exportar se validan **11 pares WCAG 2.2 AA**: texto, secundario, metadatos, primario como texto, texto sobre primario, foco, bordes de control y texto sobre los cuatro estados sólidos. Si alguno falla, **la copia y la descarga se bloquean**; se ofrece **usar el papel seguro**, que mueve el papel al paso más cercano que cumple sin cambiar el pigmento. El único caso curado que falla es Shu con los papeles 4 y 5.
  - La salida es un **overlay de tokens** (`:root` con valores semánticos) para pegar al final del `tailwind.css`, después de `koten-theme`. No duplica el tema completo ni reescribe componentes; la densidad exportada puede volver a cambiar si el proyecto usa `data-density`.
  - El estado vive en la URL con `?ks=registro.pigmento.papel.radio.densidad`, validado y acotado al leerlo; un enlace compartido reproduce el tema. No se guarda en `localStorage` ni se aplica globalmente.
  - La lógica pura vive en `apps/catalog/src/lib/theme-designer.ts` (paleta, mezclas, luminancia, contraste, serialización y CSS), con tests de todas las combinaciones de registro, pigmento y papel. La página se cubre con tests de interacción, i18n y axe.
- **Consecuencias:** Un usuario común puede producir un tema coherente en cinco decisiones y once comprobaciones, sin leer el archivo de tokens. La herramienta no permite crear un Koten “alternativo”: la tipografía, la escala, el espaciado, los bordes, las sombras, el movimiento y los estados quedan fuera de su alcance. El resultado sigue siendo un proyecto que depende de `koten-theme`; actualizar tokens de Koten sigue siendo una reinstalación del item. El CSS exportado es editable a mano, así que el contraste puede romperse después de la herramienta (`RISK-018`); la página lo advierte y la documentación pide verificar el resultado con contenido real.
- **Alternativas:** Un editor libre de todos los tokens (convierte el catálogo en un generador de sistemas y rompe `D-004`); un color picker con validación de contraste (sigue permitiendo cualquier pigmento y diluye la paleta); exportar un `tokens.css` completo (se desincroniza en la siguiente versión y duplica valores); aplicar el tema al catálogo entero (impide comparar y puede volver ilegible la documentación); guardar el tema en `localStorage` (una preferencia personal no debería alterar enlaces compartidos); un paquete o CLI de temas (más superficie que una página estática).

---

<a id="d-052"></a>
## D-052 · README en inglés como entrada y versión en español opcional

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-014`; precisa `D-008`, `D-025` y `D-045` solo para el README)
- **Contexto:** El README es la primera superficie que ve alguien que llega desde GitHub, el registry o un buscador, y la mayoría de ese tráfico no lee español. Al mismo tiempo, el equipo mantiene el roadmap, las decisiones y la bitácora en español, y `D-008`/`D-025` extendían esa regla a todos los documentos de trabajo, incluido el README. Traducir solo el README dejaba dos versiones sin jerarquía ni enlace mutuo; traducir todo el mantenimiento duplicaba el costo sin mejorar el producto.
- **Decisión:**
  - **`README.md` queda en inglés** y es la única entrada por defecto. No cambia su contenido, estructura ni enlaces: es la traducción de la versión que ya existía.
  - **`README.es.md` conserva la versión en español** como espejo opcional. Ambas versiones llevan un selector al inicio (`English` / `Español`) y enlazan a la otra.
  - **Los demás documentos de trabajo siguen en español** (`ROADMAP.md`, `AGENTS.md`, `docs/*.md`): `D-008` y `D-025` se mantienen vigentes para ellos. El README en inglés avisa de esa separación con una línea y enlaces.
  - **Los artefactos para agentes siguen en inglés** (`D-045`). `llms.txt` enlaza a `README.md`, que ahora coincide con el idioma de la capa de agentes.
  - **Sin duplicación de comandos ni datos:** las dos versiones describen el mismo sistema y se actualizan en el mismo cambio; las diferencias son solo de idioma.
- **Consecuencias:** Quien llega al repositorio entiende el proyecto sin traducir; quien trabaja en él conserva la documentación de mantenimiento en español. Hay dos README que mantener sincronizados, con riesgo de divergencia (`RISK-019`); se mitiga manteniéndolos en el mismo commit y revisando ambos en cada cambio de alcance. Las cifras de componentes, bloques y fases siguen viviendo en el roadmap, no en el README.
- **Alternativas:** Dejar el README en español y añadir un `README.en.md` (el idioma por defecto seguiría sin ser el del público mayoritario); traducir también roadmap, decisiones y bitácora (duplica el costo de mantenimiento sin valor para el consumidor); un README bilingüe en un solo archivo (duplica la longitud y rompe la lectura lineal); generar el README desde el catálogo (el README explica arranque e infraestructura, que no viven en las páginas de componentes); dejar solo el inglés y borrar el español (pierde la versión que el equipo usa a diario).
- **Evidencia:** `README.md`, `README.es.md`; enlaces mutuos en la primera línea de ambos; `AGENTS.md` §11 y §13 actualizados.

---

<a id="d-053"></a>
## D-053 · Licencia MIT y cierre de Q-005

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (cierra `Q-005`)
- **Contexto:** `Q-005` quedó abierta desde `F0-001` con MIT como propuesta, porque el POC no tenía licencia ni campo `license`. El proyecto se distribuye copiando la fuente y el ecosistema de referencia —shadcn/ui, Radix UI y Base UI— usa MIT. La alternativa de Apache-2.0 daba una atribución más explícita en versiones modificadas, pero añadía la obligación de señalar cambios en cada archivo y un `NOTICE`, fricción que no compensa para un kit que se copia y se adapta.
- **Decisión:**
  - El repositorio, los componentes y la documentación se distribuyen bajo **MIT**.
  - Se agrega `LICENSE` con el texto estándar de MIT y el aviso `Copyright (c) 2026 Koten UI contributors`. Si el proyecto pasa a una entidad legal concreta, solo se actualiza esa línea.
  - `package.json` de la raíz y de las cuatro workspaces declara `"license": "MIT"`.
  - El README en inglés y su espejo en español explican el permiso, la obligación de conservar el aviso y la ausencia de garantía.
  - No se agregan cláusulas de atribución adicionales, `Commons Clause` ni restricciones de uso comercial: el permiso es el de MIT.
- **Consecuencias:** Cualquiera puede usar Koten en proyectos gratuitos o de pago, modificarlo, sublicenciarlo y venderlo, siempre que conserve el aviso de copyright y permiso en copias o porciones sustanciales. MIT no exige declarar cambios, no concede patentes y no impide que un derivado se ofrezca como producto; la atribución es la mínima del aviso. `Q-005` deja de estar abierta y `F0-001` queda con la licencia definida.
- **Alternativas:** Apache-2.0 (atribución y aviso de cambios más fuertes, con concesión de patentes, pero más fricción para un kit copiable); MPL-2.0 (obliga a publicar las modificaciones de los archivos de Koten); GPL/AGPL (copyleft incompatible con la promesa de uso libre en productos propietarios); una licencia custom o `Commons Clause` (deja de ser open source y complica la compatibilidad); dejar `Q-005` abierta (bloquea la distribución clara del repositorio y del registry).
- **Evidencia:** `LICENSE`; `package.json`, `apps/*/package.json`, `packages/ui/package.json`; `README.md` y `README.es.md`; `ROADMAP.md` (`Q-005` cerrada); `docs/PROGRESS.md` (sesión 044).

---

<a id="d-054"></a>
## D-054 · Configuración del catálogo en un panel flotante

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-015`)
- **Contexto:** El header del catálogo mostraba tres grupos de toggles inline —tema, densidad e idioma— y una línea de resumen. Con cuatro temas y tres valores por grupo todavía cabía, pero cualquier tema, idioma de ejemplo o densidad nueva empujaba el header, partía la fila en mobile y competía con el logo y la navegación. La configuración es una tarea secundaria y no necesita ocupar espacio permanente.
- **Decisión:**
  - **Un solo disparador:** el header muestra un botón **Configuración** con icono de sliders. En desktop conserva la etiqueta; en mobile queda solo el icono con `aria-label`. El botón abre un **Popover** anclado y portaleado, con título, descripción, cierre propio y una nota de que el estado vive en la URL.
  - **Tres grupos en el panel:** tema, densidad e idioma se presentan como rejillas de opciones apiladas (`layout="stacked"`), con leyenda visible, `aria-pressed` y columnas 2/3/3. Los temas usan dos columnas; densidad e idioma, tres. Las opciones se generan desde `themes`, `densities` y el conjunto de locales, así que agregar valores no cambia la estructura.
  - **Reutilización:** se usa el `Popover` y el `Button` del sistema; `ToggleGroup` gana `layout` y `columns` para el modo apilado. No se crea una primitiva nueva ni se duplican estilos.
  - **Crecimiento:** el popup tiene ancho máximo `22rem`, se limita al viewport, desplaza su contenido y mantiene la cabecera sticky. La selección no cierra el panel, para poder cambiar tema, densidad e idioma en una sola visita.
  - **Persistencia:** no cambia. Tema, densidad e idioma siguen en `?theme=`, `?density=` y `?lang=`; el resumen del subheader y el `lang` del documento se mantienen.
  - **Mobile:** el menú plegable de navegación sigue debajo del header; el panel flota sobre el contenido y se cierra con Escape, con el botón de cierre o al hacer clic fuera.
- **Consecuencias:** El header queda con una sola acción de configuración y el panel puede crecer verticalmente sin romper la fila. La configuración deja de ser visible de un vistazo: hay que abrir el panel, pero el resumen del subheader conserva tema y densidad actuales. Más opciones implican scroll dentro del panel, no más ruido en el header. No cambia la API de los componentes ni la URL.
- **Alternativas:** Mantener los toggles inline (el problema original); usar selects (ocultan las opciones y agregan clics); un drawer lateral (demasiado peso para tres grupos); una página de ajustes (saca al lector del contexto); un popover propio (duplica el primitivo y sus reglas de foco).
- **Evidencia:** `apps/catalog/src/components/settings-panel.tsx` + `settings-panel.test.tsx`; `apps/catalog/src/components/view-toggles.tsx`; `apps/catalog/src/components/catalog-layout.tsx`; `apps/catalog/src/data/catalog.ts`; `apps/catalog/src/pages/i18n.test.tsx`; `docs/DESIGN-SYSTEM.md` §12; `docs/REQUIREMENTS.md`.

---

<a id="d-055"></a>
## D-055 · Empezar: requisitos en prosa y solo pasos necesarios numerados

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-016`; precisa `D-046` y `D-050`)
- **Contexto:** La página **Empezar** abría cada camino con una sección **Antes de empezar** que mezclaba cosas distintas: requisitos reales (React 19, Tailwind 4), una instrucción de arranque (`components.json` y `shadcn init`), una condición técnica del i18n (`resolveJsonModule`), el runtime de `npx` y una recomendación opcional de skills. Esa lista en dos columnas parecía una tarjeta, interrumpía el flujo antes del primer paso y ponía el detalle de `components.json` fuera del orden en que se necesita. En desarrollo pasaba lo mismo con Bun, Git, el navegador y Chromium.
- **Decisión:**
  - **Sin sección de requisitos.** Se elimina **Antes de empezar** en los dos caminos. Los requisitos se explican en la introducción, en el orden en que el lector los encuentra: qué es Koten, qué necesita el proyecto, cómo se crea el `components.json` si falta y qué condiciones tiene el runner o el i18n.
  - **Solo pasos numerados.** En el camino de uso se numeran los cinco pasos necesarios: tema, componente, provider, uso y tema/densidad/idioma. En desarrollo se numeran clonar/instalar, ejecutar, verificar y trabajar en el sistema. Las skills de agente, las auditorías y el registry quedan como secciones **Opcional** o **Herramientas**, sin número, para que no parezcan parte del recorrido obligatorio.
  - **Listas, no tarjetas.** Las referencias de **Trabaja en el sistema** y el **Mapa del repositorio** pasan de una rejilla de dos columnas con barra lateral a una lista de una columna con reglas. El selector `npx` / `bunx` deja de ser un panel con borde y fondo y se convierte en una fila entre reglas.
  - **El flujo manda.** El detalle puntual que no cambia una decisión del lector se queda en la prosa; solo se enumera lo que hay que hacer en secuencia. La sección **Elige tu camino** se mantiene como dos filas de lista, no como tarjetas.
- **Consecuencias:** La página se lee de arriba abajo sin una parada artificial: qué es, qué necesito, cómo lo instalo y qué es opcional. El `components.json` y el `shadcn init` aparecen donde se usan, no en una tarjeta lateral. La página sigue siendo larga por los bloques de código, pero la jerarquía ahora distingue recorrido obligatorio de material de referencia. No cambia la API ni los comandos.
- **Alternativas:** Mantener **Antes de empezar** y convertirla en una lista de una columna (sigue interrumpiendo el flujo); mover los requisitos a un `details` plegable (los esconde antes de que el lector sepa que los necesita); crear una página aparte de requisitos (agrega un salto innecesario); dejar las tarjetas y solo cambiar el copy (el problema es la estructura, no el texto); numerar también las auditorías y las skills (las presenta como obligatorias).
- **Evidencia:** `apps/catalog/src/pages/start.tsx`; `apps/catalog/src/pages/pages.test.tsx`; `docs/DESIGN-SYSTEM.md` §12; `docs/REQUIREMENTS.md` (`R-025`); revisión visual de la página en ES a 1440 y 390 px.

---

<a id="d-056"></a>
## D-056 · Quitar la sección de límites del diseñador de temas

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-017`)
- **Contexto:** La página `/theme` cerraba con una sección **Lo que no se toca** que enumeraba siete límites del diseñador: pigmentos, fuentes, piso tipográfico, radios, sombras, estados y espaciado. La información ya estaba repartida en la descripción (“no hay selector de color libre”), en el cuerpo de exportación (“componentes, tipografía, espaciado, sombras y movimiento siguen viniendo de Koten”) y en las comprobaciones AA. Al final de la página, después de exportar, la lista repetía restricciones y alargaba una tarea que ya estaba terminada.
- **Decisión:** Se elimina la sección **Lo que no se toca** y su copy `locked` en ES/JA/EN. Los guardrails siguen vigentes y se comunican en la introducción, en el texto de exportación y en la validación de contraste; no cambia ningún parámetro, cálculo ni comportamiento del diseñador.
- **Consecuencias:** La página termina en la exportación, sin una segunda lista de restricciones. El lector sigue sabiendo que no hay color libre y que tipografía, espaciado, sombras y movimiento no se editan, pero esa información aparece donde decide, no después. La documentación de `D-051` conserva la especificación completa.
- **Alternativas:** Mantener la sección (repite lo ya dicho); moverla a un `details` (sigue siendo una lista de restricciones al final); integrarla en el cuerpo de exportación (alarga el bloque que el usuario necesita copiar); dejar solo el título (no aporta); eliminar también la explicación de los guardrails en la introducción y la exportación (el usuario perdería el contexto de por qué solo hay cinco parámetros).
- **Evidencia:** `apps/catalog/src/pages/theme.tsx`; `apps/catalog/src/pages/theme.test.tsx`; `docs/PROGRESS.md` (sesión 047).

---

<a id="d-057"></a>
## D-057 · Japonés opcional en consumo y autoría externa

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-019`; precisa `D-025`, `D-045` y `D-049`; implementa `R-031`)
- **Contexto:** La identidad de Koten usa el japonés como lenguaje visual: etiquetas `jp` en las páginas, `Tategaki`, `Hanko`, `Pattern` y títulos con kanji en la documentación. Esa decisión es correcta para el catálogo, pero la capa de agentes no distinguía entre **consumo** y **documentación interna**. `koten-ui` y `koten-design-language` podían arrastrar etiquetas japonesas a la UI de un producto aunque el usuario no las hubiera pedido; el ejemplo de autoría incluso horneaba `仕様` y `重量` en un componente, y el snippet de tema usaba `lang="ja"` como valor por defecto. Un agente que lee `llms.txt` o una página Markdown podía interpretar el japonés como parte del contrato del componente.
- **Decisión:**
  - **Dos contextos explícitos.** En **consumo** (usar las piezas en un producto) y **autoría externa** (`koten-design-language` en otro proyecto), el japonés es **opt-in**: no se agregan textos japoneses, kanji, etiquetas `jp`, `Tategaki`, `Hanko` ni `Pattern` salvo que el usuario lo pida. El idioma por defecto es el del producto.
  - **Documentación interna.** `koten-design-system`, el catálogo, las demos y estas guías pueden seguir usando el japonés como lenguaje visual. Ese uso es estilístico y no debe filtrarse a componentes consumidos.
  - **Artefactos alineados.** `skills/koten-ui`, `skills/koten-design-language`, `skills/koten-design-system`, `skills/README.md`, `llms.txt`, las páginas Markdown generadas, `docs/RECIPES.md`, `README.md`/`README.es.md`, `/ai` y `DESIGN-SYSTEM.md` §7 y §14 explican la distinción.
  - **Ejemplos neutrales.** El ejemplo de `SpecPanel` recibe el título por prop y el test usa `Weight`; el snippet de tema de `koten-ui` usa `lang="en"`; el ejemplo de apariencia en Empezar usa `lang="es"` en la copia española. No se elimina el japonés del catálogo ni de las etiquetas internas.
  - **Trazabilidad.** `R-031` fija el criterio; `M-019` registra el cambio.
- **Consecuencias:** Un agente que consume Koten o crea una pieza externa no impone japonés por defecto y puede usar el idioma real del producto. El catálogo conserva su identidad visual japonesa y las docs internas siguen siendo coherentes. La regla es explícita en los artefactos que un agente carga primero (`llms.txt`, `SKILL.md`, páginas Markdown) y en los que lee una persona (README, `/ai`, Empezar). No cambia la API ni los componentes; `Hanko`, `Tategaki` y `Pattern` siguen disponibles como acentos opt-in.
- **Alternativas:** Quitar el japonés de toda la documentación (pierde la identidad del catálogo y el contexto de los registros); dejarlo implícito (el agente no puede distinguir consumo de docs internas); cambiarlo solo en `koten-design-language` (la skill de consumo y `llms.txt` seguirían ambiguos); agregar un flag por proyecto (complejidad innecesaria para una regla editorial); prohibir `Hanko`/`Tategaki`/`Pattern` (siguen siendo piezas válidas cuando el usuario las pide).
- **Evidencia:** `skills/koten-ui/SKILL.md` y `references/{composition,quality}.md`; `skills/koten-design-language/SKILL.md` y `references/{authoring,verification}.md`; `skills/koten-design-system/SKILL.md`; `skills/README.md`; `scripts/build-ai-docs.ts` y `build-ai-docs.test.ts`; `llms.txt`; `apps/catalog/src/pages/{ai,start}.tsx`; `docs/{DESIGN-SYSTEM,RECIPES,REQUIREMENTS}.md`; `README.md`; `README.es.md`; `D-057`; `R-031`.

---

<a id="d-058"></a>
## D-058 · HTML con contenido y gemelo Markdown en cada ruta

- **Fecha:** 2026-10-22
- **Estado:** `accepted` (`M-020`; precisa `D-045`; implementa `R-032`)
- **Contexto:** Koten UI publicaba una capa de agentes completa —`llms.txt`, `llms-full.txt`, una página Markdown por pieza— pero el catálogo es una SPA de Vite y el servidor devolvía **el mismo shell de 1 290 bytes en todas las rutas**. Un agente al que se le pasaba `https://koten.codehive.com.co` leía `<div id="root"></div>` y concluía que la página estaba vacía, abría un navegador sin interfaz o se rendía; `llms.txt` solo servía si el agente lo adivinaba. Además `/components/button.md` devolvía el shell con `200 text/html` (una trampa), `/md/**` se servía como `application/octet-stream`, y `/robots.txt` y `/sitemap.xml` devolvían también el shell.
- **Decisión:**
  - **HTML con contenido por ruta.** `scripts/build-agent-pages.ts` corre después de `vite build` y escribe `dist/<ruta>.html` con `<title>`, `meta description`, `canonical`, `rel="llms-txt"`, `rel="alternate" type="text/markdown"` y un `<main data-agent-fallback lang="en">` dentro de `#root` con resumen, comando de instalación, requisitos, accesibilidad y enlaces. No hay SSR ni hidratación: React reemplaza el contenido al montar, así que personas y agentes reciben los mismos bytes (sin cloaking) y no existe riesgo de mismatch.
  - **Gemelo Markdown en cada ruta.** Las páginas de pieza reutilizan el Markdown de `build-ai-docs`; las rutas de entrada (`/`, `/start`, `/ai`, `/components`, `/blocks`, `/tokens/**`, `/theme`) generan su gemelo desde el mismo modelo (`md/index.md`, `md/start.md`, …). `nginx` acepta `.md` pegado a cualquier URL y `Accept: text/markdown` sobre la ruta original, sirve `text/markdown; charset=utf-8` y responde con `Vary: Accept`.
  - **Descubrimiento.** `robots.txt` y `sitemap.xml` reales; cabecera `Link` con `rel="llms-txt"` y el gemelo de la página; `<link>` equivalentes en el HTML; `llms.txt` explica que cada dirección tiene gemelo y que es el punto de entrada si alguien recibe la web entera.
  - **Copy.** `/ai` y Empezar dicen explícitamente que a un agente se le pega la URL de `llms.txt` y no la portada, y muestran las tres formas de la misma página (HTML, `.md`, `Accept`).
  - **Guardia.** `bun run ai:check` ejecuta `build-agent-pages.ts --check` y falla si una ruta estática de `App.tsx` no tiene página o si dos rutas comparten gemelo; el generador falla el build si el shell pierde `<title>` o el `#root` vacío.
  - **Alcance.** Solo catálogo (puerto 3000); las demos HIKARI y KURA no cambian.
- **Consecuencias:** Un agente que abre cualquier URL del catálogo lee título, resumen, instalación y enlaces sin ejecutar JavaScript, y puede pedir la página completa en Markdown pegando `.md` o negociando el `Accept`. Las personas no ven el fallback (React lo sustituye en el primer render) y el HTML gana contenido para buscadores. El coste es un paso de build sobre 96 archivos estáticos que nginx sirve sin runtime; añadir una ruta exige registrarla en `scripts/build-agent-pages.ts` o el check falla.
- **Alternativas:** Prerenderizar la app completa con `react-dom/server` e hidratar (más fiel, pero obliga a un registro de rutas sin `lazy`, a proteger `window` en `useCatalogView` y a vigilar los mismatch de portales, fechas y `Intl`; demasiado riesgo para el problema real); envolver el contenido en `<noscript>` (los extractores de los agentes lo descartan y el texto desaparece justo en el caso que queremos cubrir); detectar el `User-Agent` y servir otra página (cloaking y mantenimiento de una lista de bots); dejar solo `llms.txt` y confiar en que el agente lo adivine (es el fallo actual); usar un servicio de render headless (infraestructura y latencia para un sitio estático).
- **Evidencia:** `scripts/build-agent-pages.ts` y `build-agent-pages.test.ts`; `scripts/build-ai-docs.ts`; `apps/catalog/package.json`; `package.json`; `infra/nginx/default.conf`; `apps/catalog/src/pages/{ai,start}.tsx`; `llms.txt`; `docs/{REQUIREMENTS,PROGRESS}.md`; `ROADMAP.md` (`M-020`, `R-032`, `RISK-020`). Verificado con la imagen `nginxinc/nginx-unprivileged:1.27-alpine` y `apps/catalog/dist`: `/`, `/start`, `/components/button`, `/blocks/erp/app-shell`, `/tokens/color` y `/theme` responden HTML con contenido; `.md` y `Accept: text/markdown` responden `text/markdown; charset=utf-8`; `/robots.txt` y `/sitemap.xml` responden sus archivos.
