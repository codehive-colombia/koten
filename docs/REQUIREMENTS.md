# Requisitos — Koten UI

> Documento de alcance. Define **qué** se construye y **por qué**.
> El estado de ejecución vive en [ROADMAP.md](../ROADMAP.md); las decisiones en [DECISIONS.md](./DECISIONS.md).
> Última actualización: 2026-10-22.

## 1. Encargo original

Crear un set de componentes propio, inspirado en el modelo de **shadcn/ui**, con una estética particular: el **web japonés clásico** y tradicional. No se busca un tema decorativo, sino recrear la gramática visual que aparece en sitios como Yahoo! Japan, Rakuten, Yodobashi Camera, Don Quijote y la web culto de Hiroshi Abe.

El sistema debe:

- Servir para **cualquier idioma**, aunque los caracteres japoneses sean parte de la esencia.
- Respetar una esencia **clásica y simplista**.
- Estar **optimizado para navegadores**, pensado principalmente para **desktop**.
- Validarse con **dos sitios**: una frontpage de producto y un backoffice estilo ERP.
- Construirse con **Bun**, **Biome**, **React**, **TypeScript** y estándares modernos.

La referencia no es un solo estilo: conviven el Japón denso y comercial (Yahoo, Rakuten, Don Quijote) con el Japón austero y de bajo costo (Abe Hiroshi). El sistema debe poder expresar ambos sin convertirse en dos productos separados.

## 2. Objetivo

Entregar un **POC navegable y documentado** de un sistema de componentes que:

1. Se pueda copiar y adaptar como shadcn, sin depender de una caja negra.
2. Tenga una identidad visual reconocible: papel cálido, tinta, azul ai, bermellón shu, marcos de 1 px, reglas, densidad informativa y tipografía del sistema.
3. Demuestre dos registros: **Chirashi** (comercio) y **Daichō** (backoffice).
4. Funcione en JA/ES/EN y no se rompa con textos más largos que el japonés.
5. Sea accesible y rápido: AA, foco visible, sin fuentes CJK completas, sin texto en imágenes.

## 3. Referencias

### Sitios

| Referencia | URL | Qué se toma |
| --- | --- | --- |
| Yahoo! Japan | https://www.yahoo.co.jp/ | Portal denso, columnas, cajas con cabecera, fechas, servicios, 12–14 px. |
| Rakuten Ichiba | https://www.rakuten.co.jp/ | Nav lateral, banners saturados, badges, búsqueda, puntos y confianza comercial. |
| Hiroshi Abe (sitio oficial) | https://abehiroshi.la.coocan.jp/top.htm | Clasicismo de bajo costo: enlaces azules, reglas, serif, cero dependencias, velocidad. |
| Yodobashi Camera | https://www.yodobashi.com/ | E-commerce denso, categorías, ficha de producto, especificaciones, rojo funcional. |
| Don Quijote | https://www.donki.com/ | Chirashi: color saturado, tipografía gruesa, sellos, energía de mercado. |

### Ensayos y análisis

| Referencia | URL | Qué se toma |
| --- | --- | --- |
| *Why Japanese Web Design Is So… Different* — Randomwire (citado en el brief como David Apple; el ensayo original es de David Gilbert). | https://randomwire.com/why-japanese-web-design-is-so-different/ | Razones lingüísticas, culturales y técnicas de la densidad; fuentes CJK; herencia móvil. |
| *Why Japanese Web Design Is So… Different* — Design Made in Japan. | https://designmadeinjapan.com/magazine/web-design/why-japanese-web-design-is-so-different/ | Reproducción del ensayo con contexto. |
| *Why Japanese Websites Look So Different* — Mirijam Missbichler (Medium). | https://medium.com/@mirijam.missbichler/why-japanese-websites-look-so-different-2c7273e8be1e | Fuentes, texto en imágenes, alfabetización digital, cultura. |
| *Japanese Web Design: Style, Aesthetics & Real Examples* — Utsubo. | https://www.utsubo.com/blog/japanese-web-design-style-guide | Los dos polos: densidad vs. *ma*; tipografía; color; convenciones de layout. |
| *The truth about Japanese web design* — MultiLingual. | https://multilingual.com/issues/aug-sep-2018/the-truth-about-japanese-web-design/ | *Chirashi*, *yokubari*, confianza, información por delante. |
| Sabukaru Online | https://sabukaru.online/ | Artículo citado en el brief; URL exacta a verificar en la fase de documentación. |
| Tokyo Dev / *Why Japanese Websites Look So Different* | — | Caso de estudio citado en el brief; URL exacta a verificar. Se usa el artículo de Medium como fuente equivalente. |
| Web Design Clip, S5 Style | — | Galerías citadas en el brief; URL exacta a verificar. |

### Nota de rigor

Las referencias se usan para **extraer principios**, no para copiar píxeles. El sistema no debe caer en el “cargo cult” japonés: cerezos, torii, pinceladas y kanji decorativo pegados sobre un layout occidental. La identidad se construye con tipografía, densidad, marcos, color y ritmo.

## 4. Alcance

### Dentro de la v1

- Monorepo con `apps/catalog`, `apps/storefront`, `apps/erp` y `packages/ui`.
- Tokens, temas y densidades.
- Primitivas y patrones del inventario del roadmap.
- Catálogo documentado en ES/JA/EN.
- Storefront de producto “HIKARI K-1” en JA/ES/EN.
- ERP “KURA” con dashboard y pedidos en ES/JA/EN.
- Tests unitarios, de integración y auditoría de accesibilidad.
- Presupuestos de performance y QA visual.

### Fuera del POC original

La fase 5 completó el registry, Sumi, DatePicker, CommandPalette y la virtualización. Siguen fuera de alcance:

- Publicación de un paquete npm o CLI propio.
- SSR/SSG de producción para el storefront; solo se evaluó (`D-032`).
- Backend real, autenticación, pagos, envíos o persistencia.
- Carousel y otras dependencias pesadas.
- Soporte RTL completo; se usa best-effort con propiedades lógicas.

## 5. Requisitos funcionales

| ID | Prioridad | Requisito | Aceptación |
| --- | --- | --- | --- |
| `R-001` | Must | Componentes copiables con variantes, tamaños y composición, al estilo shadcn. | Archivos por componente, `data-slot`, CVA, `cn()`, `render`; el catálogo muestra el código. |
| `R-002` | Must | Identidad visual del web japonés clásico. | Marcos de 1 px, reglas, papel cálido, densidad, tipografía del sistema, color semántico. |
| `R-003` | Must | Dos registros: Chirashi y Daichō. | El mismo componente se ve coherente en ambos temas; la densidad cambia sin reescribir. |
| `R-004` | Must | Cualquier idioma; japonés como parte de la esencia. | Sin strings hardcodeadas; `KotenProvider`; `Intl`; demos JA/ES/EN. |
| `R-005` | Must | Optimizado para navegadores y desktop-first. | Sin fuentes CJK completas; JS acotado; 1280 principal, 1024 soportado, mobile legible. |
| `R-006` | Must | POC storefront de producto. | Página HIKARI K-1 con header, compra, specs, avisos, ranking y footer. |
| `R-007` | Must | POC ERP. | Dashboard + pedidos con sidebar, KPIs, filtros, tabla y drawer de detalle. |
| `R-008` | Must | Stack Bun + Biome + React + TS. | `bun install`, `bun run check`, `bun run build` funcionan. |
| `R-009` | Must | Base UI + Tailwind v4. | `@base-ui/react` y `@tailwindcss/vite` integrados; paleta bloqueada. |
| `R-010` | Must | Catálogo y documentación viva. | Cada componente usado tiene página con preview, props, código y a11y. |
| `R-011` | Must | Accesibilidad AA. | axe sin serious/critical; teclado; foco visible; contraste; 12 px mínimo. |
| `R-012` | Must | Performance medible. | LCP < 1.5 s local; CLS < 0.02; JS/CSS dentro de presupuesto. |
| `R-013` | Must | Estrategia de fuentes CJK. | 0 bytes de fuentes CJK; stack del sistema; subsets solo si hay display. |
| `R-014` | Must | Texto real. | Ningún texto crítico dentro de imágenes; nada de capturas de texto. |
| `R-015` | Must | Demos multilenguaje. | JA/ES/EN sin clipping ni overflow; fechas y moneda con `Intl`. |
| `R-016` | Should | Referencias y análisis documentados. | `REQUIREMENTS.md` y `DESIGN-SYSTEM.md` explican qué se toma y qué se rechaza. |
| `R-017` | Should | Sin clichés decorativos. | No hay cerezos/torii/pinceladas como decoración por defecto. |
| `R-018` | Could | Registry shadcn. | `registry.json` + instalación por URL en fase 5. |
| `R-019` | Could | Tema oscuro Sumi. | Tema conmutable en fase 5. |
| `R-020` | Must | Trazabilidad entre sesiones. | Roadmap, bitácora, decisiones y protocolo en el FS. |
| `R-021` | Should | Portada editorial del catálogo que muestre el sistema antes de navegarlo. | `/` con placa viva de componentes reales, tres registros con `data-theme`, índice de piezas, principios, demos e instalación; ES/JA/EN; sin capturas ni claims de marketing. |
| `R-022` | Should | Documentación individual por componente y bloque. | Una página por primitiva en `/components/<slug>` y una por bloque en `/blocks/<categoría>/<slug>`, con instalación, preview/código, props, a11y y referencia Base UI. |
| `R-023` | Must | Despliegue de producción en un dominio con rutas para catálogo, storefront y ERP. | Imagen Docker reproducible, compose de tres puertos, reglas de proxy que conservan el prefijo, URLs públicas y registry correctos, y CI que publica la imagen. |
| `R-024` | Should | Capa de documentación y skills para agentes. | `llms.txt` y `llms-full.txt` en el catálogo, Markdown por componente y bloque, skills `koten-ui` y `koten-design-system` compatibles con `npx skills`, generación determinista y `bun run ai:check` dentro de `bun run check`. |
| `R-025` | Should | Empezar separado por audiencia. | Dos caminos explícitos: usar el sistema (registry, `KotenProvider`, sin Bun ni clonar) y desarrollar el sistema (monorepo, `bun run dev`, `check`, auditorías), con requisitos integrados en la introducción y comandos propios. |
| `R-026` | Should | Runner de los comandos de shadcn configurable. | Selector `npx` / `bunx` en Empezar, portada y páginas de componente/bloque; la preferencia persiste en `localStorage` y todos los comandos copiados la respetan. |
| `R-027` | Should | Skill portátil para crear piezas que el catálogo no trae. | `koten-design-language` con la esencia de Koten, roles semánticos, marcos de 1 px, radios, sombras solo en overlays, contraste AA, tipografía, densidad, contrato de autoría, ejemplo completo y verificación; referencias en inglés y tokens validados por `ai:check`. |
| `R-028` | Should | i18n personalizable por el consumidor. | `locale` acepta cualquier BCP 47; el runtime y el inglés base viven en `koten-i18n`; cada idioma adicional es un pack JSON opcional (`koten-i18n-es`, `koten-i18n-ja`) que se registra en `dictionaries.ts`; un locale sin diccionario usa el inglés o los `labels` del provider; ES/JA/EN no son obligatorios. |
| `R-029` | Should | Documentación directa y listas en lugar de tarjetas. | Requisitos y accesibilidad como listas con reglas; índices de Fundamentos, Bloques y Empezar sin tarjetas; sin boilerplate repetido; referencias de 12 px y alcance vigentes; `bun run check` verde. |
| `R-030` | Should | Diseñador de temas con guardrails para usuarios que no editan tokens. | Página `/theme` con registro, pigmento de la paleta, papel, radio y densidad; valores derivados; 11 comprobaciones AA; exportación bloqueada si falla; overlay de tokens sobre `koten-theme`; enlaces desde Temas y la navegación. |
| `R-031` | Should | Japonés opcional en consumo y autoría externa. | En `koten-ui` y `koten-design-language`, el japonés no se impone: sin texto, kanji, etiquetas `jp`, Tategaki, Hanko ni Pattern por defecto; solo si el usuario lo pide. Las docs internas y el catálogo pueden usarlo como lenguaje visual. |
| `R-032` | Must | El catálogo se puede leer sin JavaScript. | Cada ruta devuelve HTML con título, resumen, instalación y enlaces; cada ruta tiene un gemelo Markdown (`/components/button.md`) y responde a `Accept: text/markdown`; `robots.txt` y `sitemap.xml` reales; `Link` y `<link>` anuncian `llms.txt` y el gemelo. |

## 6. Requisitos no funcionales

### Tipografía

- Body/UI: `Hiragino Kaku Gothic ProN`, `Hiragino Sans`, `Yu Gothic`, `YuGothic`, `Meiryo`, `Noto Sans JP`, `system-ui`, `sans-serif`.
- Titulares editoriales: `Hiragino Mincho ProN`, `Yu Mincho`, `Noto Serif JP`, `Georgia`, `serif`.
- Escala: 12/13/14/16/20/24/30/38 px. Body 13–14; meta 12.
- `line-height` 1.6–1.7 en japonés; 1.4–1.6 en latín; 1.2–1.3 en titulares.
- Números tabulares para precios, cantidades, fechas y tablas.
- Sin fuentes CJK completas. Si se usa una display, subset Latin < 30 KB o subset exacto de titulares.
- `palt` solo en titulares; no en body pequeño.
- `line-break: strict` y `overflow-wrap` controlado para CJK.

### Color

- Base: kinari `#F5F0E4`, superficie `#FFFDF7`, tinta `#1C1A17`, muted `#5E574B`, faint `#6F675A`, regla `#D6CDBB`, regla fuerte `#948A75`.
- Acentos: ai `#1E3A5F`, shu `#C23B22`, kin `#845C0E`, matcha `#4F6B3A`.
- Acentos “matsuri” solo en Chirashi; en Daichō se usan con moderación.
- Contraste AA en texto normal; el color nunca es el único indicador de estado.

### Layout

- Container 1200 px; variante classic 990; wide 1440; full.
- Grid de 12 columnas; sidebars 180/240/300.
- Desktop 1280 principal; 1024 soportado; mobile legible, no optimizado al detalle.
- `min-width: 0` en hijos de grid/flex; tablas con scroll horizontal controlado.
- Header estático en storefront; topbar sticky en ERP.
- Footer denso, no minimalista.

### Densidad

- `data-density="compact"` → fila 28 px, control 28 px.
- `data-density="default"` → fila 32 px, control 32 px.
- `data-density="comfortable"` → fila 36 px, control 38 px.
- La densidad se controla por variables CSS, no por props en cada componente.

### Accesibilidad

- WCAG 2.2 AA.
- Foco visible de 2 px, offset 1 px.
- Teclado completo en overlays, menús, tabs, tablas y formularios.
- `aria-current`, `aria-sort`, `aria-live`, `aria-describedby`, `aria-invalid` donde corresponda.
- Texto mínimo 12 px; no se replica el 10 px de las referencias.
- `prefers-reduced-motion` respetado.
- Skip link en `AppShell`.
- Errores de formulario con resumen y vínculo al campo.

### Performance

- LCP < 1.5 s en local; CLS < 0.02.
- JS inicial < 150 KB gzip storefront; < 250 KB ERP.
- CSS < 30 KB.
- 0 bytes de fuentes CJK.
- Code splitting por ruta; TanStack Table solo en ERP.
- Imágenes locales AVIF/WebP con `width`/`height`, lazy bajo el fold.
- Sin librería de charts, carousel ni date picker en la v1.
- Sin CSS-in-JS runtime.

### Navegadores

- Últimas 2 versiones de Chrome, Edge, Firefox y Safari.
- Desktop 1280 principal; 1024 soportado; mobile 390 legible.
- Sin IE, sin polyfills pesados.
- Tailwind v4 requiere navegadores modernos; se asume ese baseline.

### Mantenibilidad

- TypeScript strict.
- Biome para lint/format/organize imports.
- Un componente por archivo; exports nombrados.
- Tests con Vitest + Testing Library.
- E2E/a11y con Playwright + axe.
- Sin dependencias nuevas sin decisión `D-*`.

## 7. POC 1 — Storefront “HIKARI”

**Producto ficticio:** HIKARI K-1, cámara compacta 35 mm.
**Objetivo:** validar Chirashi en una página de producto densa, comercial y multilenguaje.

### Secciones

1. Utility bar: envío, tienda, idioma.
2. Header: hanko/logo, búsqueda con categoría, cuenta, carrito.
3. Nav de categorías.
4. Breadcrumb.
5. Hero de producto: galería, título, variantes, precio, impuestos, puntos, stock, entrega, garantía, CTA.
6. Rail derecho: ranking, campaña, avisos.
7. Detalle: descripción, especificaciones, reviews, relacionados.
8. Footer denso: columnas, empresa, pagos, legal.

### Componentes principales

`StoreHeader`, `SearchBar`, `Breadcrumb`, `ProductGallery`, `PriceBlock`, `Badge`, `Button`, `NumberField`, `NoticeList`, `RankedList`, `CampaignBanner`, `ProductCard`, `SpecTable`, `ReviewSummary`, `Footer`.

### Validaciones

- JA/ES/EN sin overflow.
- Precio/impuestos/puntos claros.
- Stock y entrega visibles.
- Specs en tabla semántica.
- Avisos con fecha real.
- Imágenes locales, no hotlinking.
- Sin texto en imágenes.

## 8. POC 2 — ERP “KURA”

**Empresa ficticia:** KURA, distribución mayorista.
**Objetivo:** validar Daichō en un backoffice denso, operativo y sobrio.

### Rutas

1. Dashboard: KPIs, pedidos recientes, avisos/tareas, bar chart.
2. Pedidos: filtros, tabla, selección, acciones masivas, paginación.
3. Detalle de pedido: drawer con cliente, líneas, timeline y acciones.

### Componentes principales

`AppShell`, `SideNav`, `TopBar`, `PageHeader`, `FilterBar`, `DataTable`, `StatCard`, `Sparkline`/`BarChart`, `DetailDrawer`, `Timeline`, `StatusBadge`, `FormSection`, `Toast`.

### Validaciones

- Tabla legible a 1280 y 1024.
- Números tabulares y alineación derecha.
- Estado siempre con texto + color.
- Foco vuelve a la fila al cerrar el drawer.
- Filtros reflejados en URL.
- ES/JA/EN sin clipping.
- Sin backend; datos deterministas.

## 9. Catálogo

El catálogo es la tercera web y la herramienta de trabajo del sistema.

### Contenido mínimo

- Principios y referencias.
- Paleta, tipografía, espaciado, radios, densidad.
- Rutas por fundamento y por componente (formato wiki con sidebar).
- Componentes: instalación, ejemplos, props, código y a11y.
- Patrones: storefront y ERP.
- Plantillas: enlaces a los dos demos.
- Do/Don’t.
- Panel de configuración de tema, densidad e idioma persistido en URL.
- Copiar código.
- Documentación para agentes: `llms.txt`, `llms-full.txt`, Markdown por componente y bloque, y enlaces a las skills.
- **Diseñador de temas** (`/theme`): registro, pigmento, papel, radio y densidad con valores derivados, validación AA y exportación de un overlay de tokens.
- **Empezar** separa el camino de quien usa los componentes (registry, sin clonar) del de quien desarrolla el sistema (monorepo, demos, auditorías).

### Validaciones

- Usa los mismos componentes que los demos.
- La portada es una landing editorial del sistema: piezas reales y enlaces a la documentación, sin testimonios, precios inventados ni claims de marketing.
- Se puede navegar con teclado.
- Documentación y demos en ES/JA/EN.

## 10. Fuera de alcance

- Backend, base de datos, auth, pagos, envíos.
- Contenido editorial real.
- Analítica, SEO avanzado, internacionalización de rutas.
- Animaciones complejas o scroll-driven.
- 3D/WebGL.
- Publicación npm.
- Soporte IE o navegadores sin Tailwind v4.

## 11. Criterios de aceptación global

- [ ] `bun install` y `bun run dev` funcionan desde cero.
- [ ] `bun run check` verde (Biome + TS + tests).
- [ ] `bun run build` produce las tres apps.
- [ ] Catálogo, storefront y ERP navegables.
- [ ] JA/ES/EN sin clipping.
- [ ] axe sin serious/critical en rutas principales.
- [ ] Presupuestos de performance cumplidos.
- [ ] QA visual 1440/1280/1024.
- [ ] 0 fuentes CJK; 0 texto crítico en imágenes.
- [ ] Roadmap, decisiones y bitácora actualizados.

## 12. Glosario

| Término | Significado |
| --- | --- |
| **Chirashi (チラシ)** | Folleto comercial japonés; metáfora de densidad, color y descubrimiento. |
| **Daichō (台帳)** | Libro mayor/registro; metáfora del backoffice tabular y sobrio. |
| **Kanso (簡素)** | Simplicidad; registro de lectura del catálogo. |
| **Oshirase (お知らせ)** | Avisos fechados; lista de novedades/comunicados. |
| **Hanko (判子)** | Sello personal; motivo de marca y estado. |
| **Tategaki (縦書き)** | Escritura vertical; uso decorativo/editorial. |
| **Ma (間)** | Intervalo/espacio activo; no es “whitespace” vacío. |
| **Yokubari (欲張り)** | “Codicia” de información; impulso de no ocultar detalles. |
| **Ai (藍)** | Índigo tradicional. |
| **Shu (朱)** | Bermellón tradicional. |
| **Kinari (生成り)** | Off-white de papel sin blanquear. |
| **Sumi (墨)** | Tinta negra. |

## 13. Supuestos y notas

- El POC es una SPA de Vite; si el storefront va a producción, se evalúa SSG/SSR en `F5-006`.
- El catálogo es interno; no necesita SEO.
- Los datos son ficticios y deterministas.
- Los assets del POC son SVG locales propios (`D-022`); se reemplazan por fotografía antes de producción.
- Las URLs de referencias marcadas con “—” deben verificarse antes de publicar documentación externa.
- La estética se evalúa por principios, no por motivos decorativos.
