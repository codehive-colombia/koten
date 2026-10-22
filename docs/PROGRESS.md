# Bitácora de sesiones — Koten UI

> **Append-only.** La entrada más reciente va arriba.
> Este archivo responde: ¿dónde estamos, qué se hizo y qué sigue?
> El estado detallado por tarea vive en [ROADMAP.md](../ROADMAP.md).

## Estado actual

| Campo | Valor |
| --- | --- |
| Fecha | 2026-10-22 |
| Fase | 5 — Opcional (`done`) · v1 en tag `v0.1.0-poc` |
| Última tarea completada | `M-012` · documentación directa y listas |
| Tarea en curso | ninguna — roadmap completo y producción desplegable |
| Bloqueos | ninguno |
| Decisiones abiertas | `Q-005` (licencia) y `Q-006` (matriz de navegadores); el resto cerradas por `D-*` |

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

## 2026-10-22 · Sesión 041 — Documentación directa y listas (`M-012`)

- **Objetivo:** revisar los textos del catálogo y las guías para quitar repeticiones y explicaciones que no aportan, y sustituir las tarjetas de lectura por listas.
- **Hecho:**
  - **Listas:** requisitos de uso y accesibilidad de cada componente/bloque son listas con reglas; los índices de Fundamentos, Bloques y Empezar usan filas en lugar de tarjetas.
  - **Menos repetición:** se retiró el boilerplate de instalación, archivos y metas genéricas de sección, y el párrafo de uso en formularios. La explicación completa de aliases y `koten-theme` queda en Empezar.
  - **Copy directo:** se ajustaron Empezar, IA y agentes, Fundamentos, Componentes, Bloques, portada y README; se eliminaron frases de relleno y datos históricos que ya no describían el sistema.
  - **Vigencia:** se corrigieron referencias a 11 px (`D-027` fija 12 px) y el alcance de la v1 en `DESIGN-SYSTEM.md` y `REQUIREMENTS.md`.
  - **Agentes:** `bun run ai:docs` regenerado desde la fuente.
- **Tareas tocadas:** `M-012` → `done`; `R-029` → `done`; `R-019` corregida a `done`.
- **Decisiones:** `D-050`.
- **Evidencia:**
  - `apps/catalog/src/components/{doc-page,catalog-layout}.tsx`; `apps/catalog/src/pages/{start,ai,overview}.tsx`; `apps/catalog/src/pages/{tokens/index,blocks/index,components/index,tokens/typography}.tsx`; `README.md`; `docs/{DESIGN-SYSTEM,REQUIREMENTS,DECISIONS,PROGRESS}.md`; `ROADMAP.md`.
  - `bun run check` verde: **35 archivos / 235 tests**, Biome, TypeScript, i18n y `ai:check`; `bun run build` y `bun run budget` OK.
  - Navegador a 1440: Button (accesibilidad como lista), DataTable (requisitos como lista), Fundamentos, Storefront y Empezar. A 390 y EN/JA: Fundamentos y Empezar sin overflow.
  - `qa:a11y` inició con portada ES 1440: axe 0 serious, 0 textos < 12 px, foco 15/15; la ejecución completa excedió el tiempo de la sesión.
- **Sin validar:** lector de pantalla y el resto de la matriz `qa:a11y`/`qa:overflow`.
- **Próximo:** ninguna tarea abierta.
- **Bloqueos:** ninguno.

---

## 2026-10-22 · Sesión 040 — i18n personalizable (`M-011`)

- **Objetivo:** que el i18n no dependa de los tres idiomas de la documentación: cualquier BCP 47, diccionarios editables por idioma y un único punto de edición instalado por el registry.
- **Hecho:**
  - **Tres capas explícitas**: labels internos del kit (21 strings), copy de la app (fuera del kit) y formato `Intl` (`useKotenFormatters`). El provider ya no es el dueño del contenido.
  - **API**: `KotenLocaleCode = KotenLocale | (string & {})` en `locale`; `KotenLocale` sigue siendo el conjunto de diccionarios instalados, así que las apps conservan exhaustividad. `useKoten()` acepta un genérico (`useKoten<string>()`, `useKoten<"fr-FR">()`) para leer un locale sin diccionario. `labels` acepta un diccionario completo o un override parcial; la base es el diccionario del locale o el inglés, y los overrides se aplican al final. Sin `locale`, el provider usa inglés.
  - **Diccionarios JSON**: `packages/ui/src/i18n/messages/{es,ja,en}.json`, registrados en `dictionaries.ts` con `satisfies Record<string, KotenLabels>`; `format.ts` e `intl.ts` se movieron a `packages/ui/src/i18n/`.
  - **Registry**: nuevo item `koten-i18n` (`registry:lib`) que instala el runtime y el inglés base en `lib/koten/i18n`; `koten-i18n-es`, `koten-i18n-ja` y `koten-i18n-en` son items `registry:file` con un solo JSON. Los componentes dependen de `koten-i18n` y dejaron de incrustar `labels`/`provider`/`format`/`intl`; 69 items generados.
  - **Catálogo**: `/tokens/format` pasa a explicar las tres capas, la instalación por packs, el registro en `dictionaries.ts`, un locale `fr-FR` en vivo con `KotenProvider` anidado y los límites; Empezar y los textos de Fundamentos se alinean.
  - **Agentes**: `llms.txt`, el inventario y las skills `koten-ui` usan la nueva ruta `@/lib/koten/i18n/provider` y explican que ES/JA/EN son opcionales.
  - **Docs**: `DESIGN-SYSTEM.md` §7, `RECIPES.md` §6, `REQUIREMENTS.md` (`R-028`), `DECISIONS.md` (`D-049`), `ROADMAP.md` (`M-011`), README y AGENTS.
- **Tareas tocadas:** `M-011` → `done`; `R-028` → `done`.
- **Decisiones:** `D-049`.
- **Evidencia:**
  - `packages/ui/src/i18n/{labels,provider,dictionaries,format,intl}.ts(x)` + `messages/{es,ja,en}.json`; tests de locale desconocido, merge parcial, fallback y formatters (`labels.test.ts`, `provider.test.tsx`, `format.test.ts`).
  - `scripts/build-registry.ts` + `build-registry.test.ts`: 69 items, `koten-i18n` con `dictionaries.ts` solo inglés y `messages/en.json`, packs `koten-i18n-{en,es,ja}` con `registry:file`, componentes dependientes de tema e i18n.
  - `apps/catalog/src/pages/tokens/format.tsx`; `apps/catalog/src/pages/start.tsx`; `pages/tokens/index.tsx`; `pages/a11y.test.tsx` incluye la página de formato; `bun run check` verde (**35 archivos / 234 tests**, Biome, TypeScript, i18n 151 archivos y `ai:check`).
  - `bun run build` OK; `bun run budget` → catálogo **263,6/444,9 KB**, storefront 122,3 KB, ERP 199,4 KB; `bun run registry` → **69 items** en `apps/catalog/public/r`.
  - **Instalación real** con `shadcn@4.22.1` en un proyecto temporal con aliases `~/`: `koten-i18n` creó los 6 archivos en `lib/koten/i18n` y reescribió `@/` → `~/`; `koten-i18n-es` instaló el core + `messages/es.json` y mostró el snippet de registro; `button` instaló tema + i18n + `cn` y reescribió imports. El proyecto de prueba no tenía Tailwind configurado, así que la actualización de `app.css` del tema falló con `proxyOf`; el i18n no depende de ese paso.
- **Sin validar:** `qa:a11y`/`qa:overflow` de navegador no se repitieron, aunque axe cubre la página de formato en tests.
- **Próximo:** ninguna tarea abierta.
- **Bloqueos:** ninguno.

---

## 2026-10-22 · Sesión 039 — Skill `koten-design-language` (`M-010`)

- **Objetivo:** dar a los agentes un manual portátil de la esencia de Koten y del criterio para crear una pieza que el catálogo no trae, sin mezclarlo con el trabajo dentro del repositorio.
- **Hecho:**
  - **Tercera skill**: `skills/koten-design-language/` con `SKILL.md` y tres referencias. La descripción separa los tres trabajos: consumir (`koten-ui`), extender el repositorio (`koten-design-system`) y crear una pieza local (`koten-design-language`).
  - **Esencia y reglas**: tesis de sencillez de medios y densidad de información; el marco como unidad; roles semánticos; marcos de 1 px; radios de 2–3 px; sombras solo en overlays; tipografía con piso de 12 px; densidad por tokens; movimiento mínimo; teclado, foco y contraste AA.
  - **`references/tokens.md`**: dos capas (primitivas vs. roles), tabla completa de roles y utilidades, cómo elegir un rol, contrato de contraste (4.5:1 texto, 3:1 bordes de control y foco), tipografía, forma, densidad, los cuatro temas, extensión local de tokens y anti-patrones.
  - **`references/authoring.md`**: cuándo crear y cuándo componer, contrato previo, plantilla con CVA/`data-slot`, composición con Base UI (`render`, nunca `asChild`), matriz de estados, contrato de accesibilidad por familia, i18n, ejemplo completo `DefinitionList` con tests y checklist de revisión.
  - **`references/verification.md`**: procedimiento de contraste con calculadora, matriz de temas/densidades/anchos, guiones de teclado, chequeos automáticos, revisión visual, cuándo escalar y definición de terminado.
  - **Anti-drift**: `validateSkills` ahora rechaza cualquier `--koten-*` citado por una skill que no esté declarado en `tokens.css` o `globals.css`; hay test de regresión. El inventario y las guías siguen generándose con `ai:docs`.
  - **Catálogo**: `/ai` mantiene los tres niveles y el nivel 3 presenta las dos skills de extensión/creación; `/start` menciona las tres skills; `llms.txt`, README, `skills/README.md` y `DESIGN-SYSTEM.md` §14 quedan alineados.
- **Tareas tocadas:** `M-010` → `done`; `R-027` → `done`.
- **Decisiones:** `D-048`.
- **Evidencia:**
  - `skills/koten-design-language/{SKILL.md,references/{tokens,authoring,verification}.md}`.
  - `scripts/build-ai-docs.ts` + `scripts/build-ai-docs.test.ts`; `llms.txt` regenerado.
  - `apps/catalog/src/pages/{ai,start}.tsx`; `apps/catalog/src/pages/pages.test.tsx`; `README.md`; `skills/README.md`; `docs/{DESIGN-SYSTEM,REQUIREMENTS,DECISIONS}.md`; `ROADMAP.md`.
  - `bun run ai:docs` → 46 componentes, 20 bloques, 70 archivos de sitio y 3 archivos rastreados; `bun run ai:check` verde.
  - `bun run check` verde: **35 archivos / 226 tests**, Biome, TypeScript en 4 workspaces, i18n y `ai:check`.
  - `bun run build` verde; `bun run budget` → catálogo **263,6/441,0 KB**, storefront 122,3 KB, ERP 199,3 KB, 0 fuentes.
- **Sin validar:** axe real sobre `/ai` tras el cambio de copy; lectura con lector de pantalla de la página. La skill se probó con `npx skills add` solo de forma indirecta (estructura validada por `ai:check`), no en un proyecto consumidor nuevo.
- **Próximo:** ninguna tarea abierta.
- **Bloqueos:** ninguno.


---

## 2026-10-21 · Sesión 038 — Runner npx/bunx persistente (`M-009`)

- **Objetivo:** que los comandos de shadcn se copien con `npx` o `bunx` según el runner del proyecto, con una elección recordada entre páginas.
- **Hecho:**
  - **Estado compartido**: `lib/package-manager.ts` guarda la preferencia en `localStorage` (`koten.package-manager`) y la comparte con `useSyncExternalStore`; no toca la URL ni necesita provider.
  - **Tabs**: `PackageManagerTabs` reutiliza el patrón de toggles del catálogo (`fieldset` + `aria-pressed`) con `npx` / `bunx` y el label `Ejecutar con` / `実行` / `Run with`.
  - **Superficies**: el selector aparece en la guía de uso de `/start`, en la portada y en la sección **Instalación** de cada componente y bloque. `registryCommand(item, packageManager)` genera el comando correcto; el `shadcn init` de los requisitos de Empezar también cambia.
  - **Agentes**: la documentación generada muestra `# Node` y `# Bun`; `llms.txt` explica que la elección se recuerda en `localStorage`. El frontmatter conserva `npx` como forma canónica.
  - **Docs**: README, `DESIGN-SYSTEM.md` §12, `REQUIREMENTS.md` (`R-026`), `ROADMAP.md` (`M-009`, `R-026`), `DECISIONS.md` (`D-047`) y `AGENTS.md`.
- **Tareas tocadas:** `M-009` → `done`; `R-026` → `done`.
- **Decisiones:** `D-047`.
- **Evidencia:**
  - `apps/catalog/src/lib/package-manager.ts`; `apps/catalog/src/lib/site.ts`; `apps/catalog/src/components/view-toggles.tsx`; `apps/catalog/src/components/doc-page.tsx`; `apps/catalog/src/pages/{start,overview}.tsx`; `apps/catalog/src/data/catalog.ts`; `scripts/build-ai-docs.ts`.
  - Tests: `site.test.ts` cubre `npx` y `bunx`; `pages.test.tsx` comprueba el cambio, el valor en `localStorage` y la persistencia entre la página de Button y la de ProductCard. `bun run check` verde: **35 archivos / 235 tests**, Biome, TypeScript, i18n y `ai:check`; `bun run build` y `bun run budget` OK.
  - `bun run build` OK; `bun run budget` → catálogo **263,6/440,1 KB**, storefront 122,3 KB, ERP 199,3 KB.
  - Navegador: en `/start` se elige `bunx` y los comandos pasan a `bunx shadcn@latest add …`; al navegar a `/components/button`, la sección Instalación sigue mostrando `bunx`. El selector también aparece en la portada.
- **Sin validar:** lectura con lector de pantalla del selector en las tres páginas.
- **Próximo:** ninguna tarea abierta.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 037 — Empezar por audiencia (`M-008`)

- **Objetivo:** dejar de mezclar en **Empezar** el camino de quien usa los componentes con el de quien desarrolla el repositorio, eliminar el flujo obsoleto de copiar `packages/ui` a mano y hacer la página más fácil de recorrer.
- **Hecho:**
  - `/start` abre con **dos tarjetas de camino**: “Quiero usar Koten UI” (`#usar`) y “Quiero desarrollar Koten UI” (`#desarrollar`). La descripción y el bloque “Elige tu camino” explican que son recorridos distintos.
  - **Usar**: React 19 + Tailwind 4 + `components.json`, sin Bun ni clonar. Pasos numerados para `koten-theme`, componente o bloque, CSS de Tailwind, `KotenProvider`, uso, tema/densidad/idioma y skill `koten-ui`. Se elimina `cp packages/ui/...`.
  - **Desarrollar**: Bun + Git, clonar, `bun install`, `bun run dev` con los tres puertos, `check`/`build`/`budget`, protocolo y design system, auditorías opcionales, registry/agentes y mapa del repositorio.
  - **Legibilidad**: párrafos y listas interpretan código inline (`components.json`, `koten-theme`, rutas) con un renderer local; ya no se muestran backticks literales. Las tarjetas usan tokens, borde de 1 px y foco visible.
  - **README**: “Uso rápido” se reemplaza por **Usar Koten UI en tu proyecto** y **Desarrollar Koten UI**, con los comandos de cada audiencia.
  - **Docs**: `DESIGN-SYSTEM.md` §12, `REQUIREMENTS.md` (`R-025`), `ROADMAP.md` (`M-008`, `R-025`), `DECISIONS.md` (`D-046`) y `AGENTS.md`.
- **Tareas tocadas:** `M-008` → `done`; `R-025` → `done`.
- **Decisiones:** `D-046`.
- **Evidencia:**
  - `apps/catalog/src/pages/start.tsx`; `apps/catalog/src/pages/pages.test.tsx`; `apps/catalog/src/pages/a11y.test.tsx`; `README.md`; `docs/DESIGN-SYSTEM.md`; `docs/REQUIREMENTS.md`; `ROADMAP.md`; `DECISIONS.md`; `AGENTS.md`.
  - `bun run check` verde (**35 archivos / 223 tests**, Biome, TypeScript, i18n y `ai:check`); `bun run build` OK; `bun run budget` → catálogo **263,3/439,4 KB**, storefront 122,3 KB, ERP 199,3 KB.
  - Navegador: `/start` en Kanso/ES a 1440 y 390; las dos tarjetas enlazan a `#usar` y `#desarrollar`; `main` mide 343 px a 390 y el contenido se apila; axe de la página sin `serious`/`critical` en jsdom.
- **Sin validar:** lectura con lector de pantalla de la página completa y QA de overflow en navegador real (el script requiere el dev server en 5173, ocupado por otro proceso en esta sesión).
- **Próximo:** ninguna tarea abierta.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 036 — Documentación para agentes y skills (`M-007`)

- **Objetivo:** dar a un agente tres niveles de acceso —leer, consumir y extender— sin crear una segunda documentación que se desincronice del catálogo, y publicar skills instalables con `npx skills` (Vercel).
- **Hecho:**
  - **Lectura**: `scripts/build-ai-docs.ts` genera desde `apps/catalog/src/data/docs` el `llms.txt` del sitio y del repositorio, `llms-full.txt`, una página Markdown por componente (`/md/components/<slug>.md`) y por bloque (`/md/blocks/<categoría>/<slug>.md`), más copias de `DESIGN-SYSTEM.md` y `RECIPES.md` en `/md/guides/`. El Markdown va en inglés para agentes; el catálogo humano sigue en ES/JA/EN y los documentos internos en español.
  - **Consumo**: `skills/koten-ui` con inventario generado (registry y URL de cada pieza), reglas de instalación, composición, tema/densidad, i18n, calidad y troubleshooting.
  - **Extensión**: `skills/koten-design-system` con gramática visual, blueprint de componentes (CVA, `data-slot`, Base UI `render`, tests), reglas de tokens/temas/densidades y checklist para sistemas nuevos.
  - **Superficie**: página `/ai` en ES/JA/EN con los tres niveles y comandos; enlace **Markdown para agentes** en cada página de componente y bloque; el `README`, `AGENTS.md`, `DESIGN-SYSTEM.md`, `REQUIREMENTS.md` y el roadmap documentan la capa.
  - **Sincronía**: `bun run ai:docs`, `bun run ai:check` (frontmatter, nombre de skill, referencias relativas y archivos rastreados) dentro de `bun run check`; `predev`/`prebuild` del catálogo regeneran la capa junto con el registry. nginx sirve `/llms.txt`, `/llms-full.txt` y `/md/` con `Cache-Control` y declara `text/markdown` para gzip.
- **Tareas tocadas:** `M-007` → `done`; `R-024` → `done`.
- **Decisiones:** `D-045`; `RISK-017`.
- **Evidencia:**
  - Generación: `scripts/build-ai-docs.ts` + `build-ai-docs.test.ts` (8 tests); `skills/**`; `apps/catalog/src/pages/ai.tsx`; `App.tsx`; `data/catalog.ts`; `components/doc-page.tsx`; `apps/catalog/package.json`; `package.json`; `biome.json`; `.gitignore`; `infra/nginx/default.conf`.
  - `bun run check` verde: Biome 218 archivos, TypeScript, i18n 149 archivos, `ai:check` y **35 archivos / 222 tests**. `bun run build` OK. `bun run budget`: storefront 122,3 KB, ERP 199,3 KB, catálogo 263,3/435,9 KB.
  - `npx skills add ./skills --list` detecta las dos skills: `koten-ui` y `koten-design-system`. En el preview de producción, `/llms.txt` (16 983 B), `/md/components/button.md` (3 139 B), `/md/blocks/erp/app-shell.md` (3 551 B), `/md/guides/design-system.md` (26 755 B) y `/llms-full.txt` (252 684 B) responden 200 con `text/plain`/`text/markdown`; `/ai` renderiza en Kanso/ES sin errores de consola.
- **Sin validar:** instalación remota `npx skills add codehive-colombia/koten` (solo se comprobó el descubrimiento por ruta local) y lectura con lector de pantalla de la nueva página.
- **Próximo:** ninguna tarea abierta; si se agrega una primitiva o un bloque, `bun run ai:docs` actualiza la capa de agentes.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 035 — Registry alineado con `components.json` (`M-006`)

- **Objetivo:** dejar de instalar componentes con rutas e imports relativos y de crear `styles/koten.css`; usar los aliases del `components.json` del consumidor y dejar el tema de Koten en el CSS que shadcn ya conoce.
- **Hecho:**
  - **Targets con placeholders**: los archivos se declaran como `@ui/<archivo>`, `@components/patterns/<archivo>` y `@lib/koten/<archivo>`, que shadcn resuelve contra `aliases.ui`, `aliases.components` y `aliases.lib`. Funciona con prefijos `@/`, `~/`, `#` o los que declare el proyecto.
  - **Imports canónicos**: el contenido del registry usa `@/components/ui/...`, `@/components/patterns/...` y `@/lib/koten/...`; el CLI los reescribe al alias real. Ya no quedan `../../lib/koten/...` ni `../ui/...` en los items.
  - **Tema como item**: `koten-theme` (`registry:theme`) reúne `cssVars.theme` con los roles de `@theme inline` y `css` con `:root`, `[data-theme]`, `[data-density]`, `@layer base` y `@utility`. Cada componente lo declara como `registryDependencies` con URL absoluta.
  - **Sin carpeta custom**: el tema se escribe en el archivo `tailwind.css` de `components.json`; no se crea `styles/`. La documentación pide importar ese CSS una vez y, si el proyecto ya usaba shadcn, instalar `koten-theme` primero para reemplazar sus tokens.
  - **Compatibilidad**: se agregan alias `--color-background`, `--color-border`, `--color-ring`, `--color-primary`, etc. mapeados a roles de Koten para que `@layer base` de shadcn siga compilando. No se envían los resets `--color-*: initial` ni equivalentes, porque en un proyecto con tokens previos borrarían mappings que el CLI no vuelve a escribir.
  - **Tooling**: `postcss` entra como devDependency de la raíz para convertir `tokens.css` y `globals.css` al objeto `css`. `predev` genera el registry con `KOTEN_SITE_URL=http://localhost:5173`; `prebuild` usa producción; Docker recibe `KOTEN_SITE_URL` además de `VITE_SITE_URL`.
  - **Catálogo**: las listas de archivos usan rutas con alias (`@/components/ui/...`, `@/lib/koten/...`); la instalación y Empezar explican los placeholders, el tema y la importación del CSS en ES/JA/EN.
- **Tareas tocadas:** `M-006` → `done`; `R-018` actualizado.
- **Decisiones:** `D-044` (supersede parcialmente `D-039`).
- **Evidencia:**
  - `scripts/build-registry.ts` y `scripts/build-registry.test.ts`; `apps/catalog/src/{components/doc-page.tsx,pages/start.tsx,data/docs/types.ts}`; `README.md`; `Dockerfile`; `docker-compose.yml`; `apps/catalog/package.json`; `package.json` + `bun.lock` (`postcss`).
  - `bun run check` verde (**34 archivos / 212 tests**), `bun run build` OK y `bun run budget` → storefront 122,3 KB, ERP 199,3 KB, catálogo 263,2/430,0 KB.
  - Instalación real en un proyecto de prueba con `components.json` de aliases `~/...` y `tailwind.css: app/app.css`: `npx shadcn@latest add http://localhost:5173/r/button.json` creó `components/ui/button.tsx` y `lib/koten/*`, reescribió los imports a `~/lib/koten/*` y actualizó solo `app/app.css`; no apareció `styles/`. `detail-drawer` y `product-card` instalaron `components/patterns/*` con imports `~/components/ui/drawer`; `@tailwindcss/cli` compiló el CSS sin errores.
- **Sin validar:** instalación en un proyecto Next.js con `rsc: true` y `src/`; actualización de tokens sin reinstalar `koten-theme`.
- **Próximo:** ninguna tarea abierta; el registry queda alineado con `components.json`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 034 — Producción en `koten.codehive.com.co` (`M-005`)

- **Objetivo:** publicar el producto con una imagen Docker y un compose de tres puertos, sirviendo catálogo, storefront y ERP bajo el mismo dominio y rutas distintas, con CI que construya la imagen.
- **Hecho:**
  - **Imagen multi-stage** (`Dockerfile`): Bun 1.4.3 instala con el lockfile y construye las tres apps; nginx unprivileged sirve los `dist` en `3000` (docs), `3001` (storefront) y `3002` (ERP), con healthcheck en `/healthz`, gzip y caché inmutable para assets.
  - **Compose y Traefik**: `docker-compose.yml` declara los tres puertos con `expose` (sin publicarlos en el host) y tres routers para `koten.codehive.com.co`: `/` (prioridad 1), `/demos/store` y `/demos/erp` (prioridad 10). Traefik los alcanza por la red de Docker con `loadbalancer.server.port`, así no choca con otros servicios del servidor; `docker-compose.local.yml` publica `3000/3001/3002` solo para pruebas locales. No se usa `StripPrefix`: nginx conserva el prefijo y hace fallback de SPA por app. `.env.example` documenta imagen, host, puertos del override y certresolver.
  - **Prefijos de producción**: `base` de Vite pasa a `/demos/store/` y `/demos/erp/` en build/preview y sigue en `/` en desarrollo; el ERP usa `basename` de React Router, conserva el prefijo en `history.replaceState` y en los enlaces del `SideNav`.
  - **URLs y registry**: `apps/catalog/src/lib/site.ts` centraliza catálogo, demos y registry con defaults de desarrollo y producción, sobreescribibles con `VITE_*`. El catálogo muestra el comando `npx shadcn@latest add https://koten.codehive.com.co/r/<item>.json` en el build de producción; `scripts/build-registry.ts` publica `homepage` con `KOTEN_SITE_URL`.
  - **CI**: `.github/workflows/ci.yml` mantiene `check` y agrega `docker`, que construye con Buildx y publica `ghcr.io/<owner>/<repo>` en `main` y tags `v*`; en pull requests solo construye. Caché GHA.
  - **QA**: `check-budgets` acepta assets con cualquier `base`; `qa:perf` y `qa:visual` apuntan a los prefijos de producción.
- **Tareas tocadas:** `M-005` → `done`; `R-023` → `done`; `RISK-016` registrado.
- **Decisiones:** `D-043` (una imagen, tres puertos, Traefik conserva el prefijo); `D-031` queda como historia del POC.
- **Evidencia:** `Dockerfile`, `docker-compose.yml`, `docker-compose.local.yml`, `infra/nginx/default.conf`, `.dockerignore`, `.env.example`, `apps/catalog/src/lib/site.ts` (+ `site.test.ts`), `apps/{catalog,erp,storefront}/src/**`, `apps/{storefront,erp}/vite.config.ts`, `scripts/{build-registry,check-budgets,qa-perf,qa-visual}.ts`, `.github/workflows/ci.yml`; `bun run check` (34 archivos / 209 tests), `bun run build`, `bun run budget` (storefront 122,3 / ERP 199,3 / catálogo 263,2–429,6 KB). `docker build --network=host -t koten:local .` y contenedor de prueba con `docker-compose.local.yml`: `/`, `/components/button`, `/r/button.json`, `/demos/store/`, `/demos/erp/`, `/demos/erp/orders` → 200; assets con `Cache-Control` inmutable; navegador sin errores de runtime; enlaces y comando de instalación con el dominio de producción.
- **Próximo:** desplegar la imagen en el PaaS con el compose y las etiquetas de Traefik; si el host o el prefijo cambian, ajustar `KOTEN_SITE_URL`/`KOTEN_HOST`, `base` de Vite y nginx a la vez.
- **Bloqueos:** ninguno.

## 2026-10-21 · Sesión 033 — Páginas individuales de componentes y bloques (`M-004`)

- **Objetivo:** separar el catálogo en una página por componente y una página por bloque, con el copy necesario para instalarlo y usarlo sin leer el código.
- **Hecho:**
  - **46 páginas de componentes** (`/components/<slug>`): cada una con instalación por registry (`npx shadcn@latest add …/r/<item>.json`), archivos que copia, ejemplos con conmutador **Vista previa / Código**, props, accesibilidad y referencia a Base UI cuando envuelve una primitiva. `BarChart` recibe `C-066`; `Sparkline` conserva `C-040`.
  - **Sección de formulario:** `Field`, `Label`, `Input`, `Textarea`, `FormRow`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch` y `NumberField` incluyen **Uso en un formulario** con un formulario mínimo completo (label, ayuda, error y envío).
  - **Requisitos de uso:** `Toast` declara `ToastProvider` y `useToast`; `ProductCard`/`ReviewSummary`/`BarChart`/`DatePicker`/`Calendar` declaran `KotenProvider`; `DataTable` declara `@tanstack/react-table` y estado de cliente; overlays y `DetailDrawer` declaran portal; `CommandPalette` y `DatePicker` declaran estado controlado.
  - **20 páginas de bloques** (`/blocks/<categoría>/<slug>`) con índice por categoría (`/blocks`, `/blocks/storefront`, `/blocks/erp`). La sección se llama **Bloques** y queda preparada para nuevas categorías.
  - **Navegación y rutas:** la sidebar lista las 46 primitivas; las rutas antiguas (`/components/forms`, `/components/inputs`, `/patterns/*`, etc.) redirigen. La portada y Empezar hablan de componentes y bloques.
  - **Rendimiento:** los metadatos se separan del contenido y cada página carga su módulo con `import()`; el entry no incluye más de 12 000 líneas de demos. Presupuesto del catálogo a **290/470 KB** (`D-042`); medido **263,1/429,6 KB**.
  - **Tests:** `pages.test.tsx` verifica 46 documentos con IDs únicos, copy completo ES/JA/EN, los 11 formularios y los 20 bloques; `a11y.test.tsx` audita páginas representativas; los tests de ruta comprueban el enlace activo y el cambio de título.
- **Tareas tocadas:** `M-004` → `done`; `R-022` → `done`.
- **Decisiones:** `D-042`.
- **Evidencia:**
  - Datos: `apps/catalog/src/data/docs/{button,forms,inputs,surfaces,navigation,feedback,overlays,data}.tsx` (46 documentos), `data/blocks/{storefront,erp}.tsx` (20), `data/docs/{types,meta,index,all}.ts`, `data/blocks/meta.ts`.
  - UI: `components/doc-page.tsx`, `pages/components/{index,primitive}.tsx`, `pages/blocks/{index,block}.tsx`, `App.tsx`, `data/catalog.ts`, `data/inventory.ts`.
  - Comprobaciones: `bun run check` verde (**33 archivos / 207 tests**); `bun run build` OK; `bun run budget` → catálogo **263,1/429,6 KB**, CSS 10,3 KB, 0 fuentes.
  - QA: `qa:a11y --only=catalog` → 60 páginas, 0 serious/critical, 0 textos < 12 px, 0 focos sin indicador; `qa:overflow --only=catalog` → 84 combinaciones sin overflow ni recorte; `qa:perf` → LCP 136–456 ms y CLS 0 en las rutas medidas.
  - Navegador: `/components/field` (formulario y conmutador código), `/blocks/storefront/product-card` (requisitos, instalación y props) en Kanso/ES.
- **Sin validar:** lectura con lector de pantalla de las 66 páginas; los datos de algunas demos de bloques conservan unidades en inglés.
- **Próximo:** ninguna tarea abierta; `M-004` cierra el trabajo solicitado.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 032 — Portada editorial del catálogo (`M-003`)

- **Objetivo:** dar al catálogo una portada que muestre el sistema antes de navegarlo, usando los mismos componentes y un layout de landing editorial.
- **Hecho:**
  - **`/` es una landing:** masthead con hanko, declaración y cifras; placa viva con pedido KURA, tabla, precio, estado y estadística; los tres registros con `data-theme` local; índice rápido; sistema en piezas; índice completo de 45 primitivas y 20 patrones; principios y calidad; demos HIKARI/KURA; cierre con instalación por URL.
  - **Layout ancho:** en `/` se oculta la sidebar de escritorio y el pager; se conservan header, toggles, menú móvil, skip link y footer. El contenido usa el ancho del contenedor (1200 px), con dos columnas en el hero y grids de 3/4 columnas según sección.
  - **Composición:** `Panel`, `Table`, `PriceBlock`, `StatCard`, `Sparkline`, `StatusBadge`, `Badge`, `Meter`, `SectionHeader`, `Pattern`, `Hanko`, `Tategaki`, `Code` y `buttonVariants`. Las estructuras editoriales nuevas viven en `components/landing.tsx` (`SystemPlate`, `RegisterCard`, `EntryCard`, `DemoCard`) y usan solo tokens y roles; no hay dependencias nuevas.
  - **Fuente única de inventarios:** `data/inventory.ts` reúne rutas, IDs y nombres de primitivas y patrones; lo consumen la portada, `/components` y `/patterns`, y se elimina la duplicación anterior.
  - **Copy trilingüe:** todo el texto de la portada está en ES/JA/EN, incluida la placa viva y los ejemplos de tema. El copy no menciona fases ni IDs internos.
- **Tareas tocadas:** `M-003` → `done`; `R-021` → `done`.
- **Decisiones:** `D-041` (precisa la regla “no es una landing de marketing” de `DESIGN-SYSTEM.md` §12 y `REQUIREMENTS.md` §9).
- **Evidencia:** `apps/catalog/src/pages/overview.tsx`; `components/landing.tsx`; `components/catalog-layout.tsx`; `data/inventory.ts`; `pages/{pages,i18n}.test.tsx`; `app.test.tsx`; `bun run check` verde (**33 archivos / 203 tests**); `qa:a11y --only=catalog` → 60 páginas, 0 serious/critical, 0 textos < 12 px; `qa:overflow --only=catalog` → 84 combinaciones sin overflow ni clipping; `bun run budget` → catálogo 256,3/354,9 KB; capturas 1440/1024/390 en Kanso, Sumi/JA y Chirashi/EN.
- **Sin validar:** lectura con lector de pantalla de la placa compuesta; comportamiento en Safari/Firefox; medición de LCP específica de la nueva portada (el presupuesto global sigue verde).
- **Próximo:** ninguna tarea abierta; roadmap completo (fases 0–5) más `M-001`, `M-002` y `M-003`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 031 — Source en inglés y Fundamentos para el usuario (`M-002`)

- **Objetivo:** dejar el source 100% en inglés sin tocar la documentación trilingüe, y convertir Fundamentos en una sección atractiva para quien consume la UI.
- **Hecho:**
  - **Source en inglés:** comentarios, JSDoc, mensajes de consola/error y títulos de test de `packages/ui/src`, `apps/**/src` y `scripts/**`. Los diccionarios de copy ES/JA/EN (catálogo, `labelsByLocale` y datos de las demos) quedan intactos por `D-025`.
  - **Fundamentos (`/tokens`):** nueva portada con `FoundationsSpecimen` (hoja de muestras: tipografía, precio, estados y los cuatro temas) y tarjetas con previews en vivo (`FoundationPreview`) para color, tipografía, espaciado, forma, densidad, temas y formato. Título y navegación pasan de “Tokens” a “Fundamentos/Foundations”.
  - **Copy sin ruido interno:** se eliminan fases, IDs `F*`/`C-*` y referencias a `AGENTS.md` del copy visible de Fundamentos, del shell y del inicio; el shell muestra la escala del sistema (45 primitivas · 20 patrones · 4 temas · 3 densidades) en vez de la fase. `Empezar` cambia “Verificar” por “Calidad incorporada” y “Recetas” por “Siguientes pasos”.
  - **Tooling:** `biome.json` excluye `apps/catalog/public/r` para que `bun run check` no dependa del registry generado.
  - **Tests:** se actualizan `pages.test.tsx` (título de Fundamentos y caption del inventario) e `i18n.test.tsx` (`tagline` en lugar de `phase`).
- **Tareas tocadas:** `M-002` → `done`.
- **Decisiones:** `D-040`.
- **Evidencia:** `apps/catalog/src/pages/tokens/index.tsx`, `components/specimen.tsx`, `pages/{overview,start}.tsx`, `data/catalog.ts`, `components/catalog-layout.tsx`, `biome.json`, `scripts/**`, `packages/ui/src/**`; `bun run check` verde (**33 archivos / 202 tests**); `bun run build` OK; `bun run budget` → catálogo 247,5/347,5 KB.
- **Sin validar:** lectura con lector de pantalla del espécimen compuesto; revisión visual en Safari/Firefox.
- **Próximo:** ninguna tarea abierta; roadmap completo (fases 0–5) más `M-001` y `M-002`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 030 — Registry shadcn y cierre de la fase 5

- **Objetivo:** cerrar `F5-001` y con él la fase 5, con instalación real por URL.
- **Hecho:**
  - **`scripts/build-registry.ts`**: genera 64 items (primitivas y patrones) en `apps/catalog/public/r`, más `registry.json`. Cada item es autocontenido: archivos del closure de imports, núcleo `lib/koten` (cn, formato, intl, labels, provider) y `styles/koten.css` con tokens, `@theme`, base y utilidades (sin `@source`).
  - Los imports se reescriben al layout instalado (`../../lib/koten/...`, `../ui/...`) sin depender del alias `@/`; los targets son `components/ui`, `components/patterns`, `lib/koten` y `styles/koten.css`.
  - `predev`/`prebuild` del catálogo regeneran el registry; `apps/catalog/public/r/` queda en `.gitignore` y el build copia los 65 archivos a `dist/r`.
  - **Validación real:** `bunx shadcn@latest add http://localhost:4180/r/button.json` instaló 7 archivos en un proyecto de prueba y `tsc --noEmit` pasó; también `date-picker` y `detail-drawer` (con `drawer`). 4 tests cubren el layout, las dependencias y la reescritura de imports.
  - Documentación: sección de registry en `/start` (ES/JA/EN) y en el README; `D-039`.
- **Tareas tocadas:** `F5-001` → `done`; `R-018` → `done`; **fase 5 → `done`**.
- **Decisiones:** `D-039`.
- **Evidencia:** `scripts/build-registry.ts` + `build-registry.test.ts`, `apps/catalog/{package.json,public/r/**}`, `apps/catalog/src/pages/start.tsx`, `README.md`; `bun run check` verde (**33 archivos / 201 tests**); `bun run build` copia `dist/r`; instalación shadcn 4.x + `tsc` limpio.
- **Sin validar:** instalación en un proyecto Next.js con `src/` y Tailwind 4 real; el registry no se publica en un hosting (usa el dev server o cualquier estático).
- **Próximo:** ninguna tarea abierta; el roadmap queda completo (fases 0–5).
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 029 — Virtualización de DataTable

- **Objetivo:** cerrar `F5-005` para recorrer 10 000 filas sin degradación perceptible.
- **Hecho:**
  - `DataTable` gana `virtualized`, `height`, `rowHeight` y `overscan`: desactiva paginación, calcula la ventana desde `scrollTop` y renderiza solo filas visibles más overscan, sin dependencias.
  - Header sticky dentro del contenedor con scroll; `aria-rowcount` en la tabla y `aria-rowindex` por fila; espaciadores `aria-hidden`; contenedor enfocable.
  - Demo en `/components/data` con 10 000 pedidos y nota sobre `rowHeight`/densidad; props y código en ES/JA/EN.
  - Test: 10 000 filas → menos de 40 filas en el DOM, sin paginación, `aria-rowcount=10001` y salto a la fila 5 000.
  - Performance: LCP 416 ms y CLS 0 en la página del catálogo con la tabla de 10k; el DOM se mantiene en ~29 filas.
- **Tareas tocadas:** `F5-005` → `done`.
- **Decisiones:** `D-038`.
- **Evidencia:** `packages/ui/src/components/ui/{data-table,table}.tsx`, `data-displays.test.tsx`, `apps/catalog/src/pages/components/data.tsx`, `scripts/qa-perf.ts`; `bun run check` verde (**32 archivos / 197 tests**); `qa:a11y` catálogo 60 páginas OK; `qa:perf` 7 rutas OK; presupuesto OK.
- **Sin validar:** filas de altura variable y celdas que envuelven (fuera del modo virtual); medición de frames con throttling de CPU.
- **Próximo:** `F5-001` — registry shadcn (última tarea de la fase 5).
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 028 — CommandPalette

- **Objetivo:** cerrar `F5-004` con búsqueda global, teclado completo y foco atrapado.
- **Hecho:**
  - **`CommandPalette`** sobre el Dialog de Base UI: campo combobox con `aria-controls`/`aria-activedescendant`, lista `role="listbox"` con opciones `tabIndex={-1}`, filtro que ignora acentos y mayúsculas y busca también en descripción, grupo y keywords.
  - Teclado: flechas, Home/End, PageUp/PageDown, Enter; Escape cierra y el foco vuelve al disparador. `initialFocus` en el campo, foco atrapado por el diálogo.
  - Props sin strings internos: `label`, `placeholder`, `emptyLabel`, `hint`; items con icono, grupo y atajo opcionales.
  - Página `/components/command` en ES/JA/EN con demo interactiva, props, código y notas; inventario `C-065`; el índice pasa a 45 primitivas y 13 páginas.
  - `qa:a11y` abre el diálogo y audita el estado abierto. El input recupera el outline visible (se quita `outline-hidden`) para foco de teclado.
  - Presupuesto del catálogo a 260/360 KB por las páginas de fase 5 (medido 247,3/344,4).
- **Tareas tocadas:** `F5-004` → `done`.
- **Decisiones:** `D-037`.
- **Evidencia:** `packages/ui/src/components/ui/command-palette.tsx` + test (5), `apps/catalog/src/pages/components/command.tsx`, `App.tsx`, `data/catalog.ts`, `pages/components/index.tsx`, `scripts/qa-a11y.ts`; `bun run check` verde (**32 archivos / 196 tests**); `qa:a11y` catálogo 60 páginas sin serious/critical; `bun run budget` OK.
- **Sin validar:** atajos globales (⌘K) en el ERP: el componente queda listo, la integración no se cableó en esta sesión.
- **Próximo:** `F5-005` — virtualización de `DataTable`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 027 — DatePicker y Calendar

- **Objetivo:** cerrar `F5-003` con fecha simple, rango, teclado completo y locale, sin dependencias nuevas.
- **Hecho:**
  - **`Calendar`**: tabla con encabezados de día, roving focus y un solo `tabindex=0`; flechas, Home/End, PageUp/PageDown, Enter/Space; `aria-pressed` para selección, `aria-current="date"` para hoy; min/max y semana según `Intl.Locale.weekInfo` (lunes en ES, domingo en JA/EN).
  - **`DatePicker`**: campo con label/descripción/error propios, panel anclado (sin portal), `aria-expanded`/`aria-controls`, Escape, cierre por clic fuera y modos `single`/`range` (invierte el rango si el segundo día es anterior). El nombre accesible incluye el texto visible.
  - **ERP**: el formulario reemplaza `<input type="date">` por `DatePicker` con `min`/`max`, manteniendo el estado ISO.
  - **Catálogo**: página `/components/date` en ES/JA/EN con demos, props, código y notas; inventario `C-063`/`C-064`; el índice pasa a 44 primitivas y 12 páginas.
  - 9 tests nuevos del calendario y del picker (locale, teclado, rango, foco, min/max); axe sin serious/critical en la página y en el formulario.
- **Tareas tocadas:** `F5-003` → `done`.
- **Decisiones:** `D-036` (DatePicker propio, sin dependencias, panel anclado).
- **Evidencia:** `packages/ui/src/components/ui/date-picker.tsx` + `date-picker.test.tsx`, `apps/erp/src/pages/order-form.tsx`, `apps/catalog/src/pages/components/date.tsx`, `App.tsx`, `data/catalog.ts`, `pages/components/index.tsx`; `bun run check` verde (**31 archivos / 190 tests**); `qa:a11y` catálogo 54 páginas y ERP 36 sin serious/critical; 39 capturas.
- **Sin validar:** recorte del panel dentro de ancestros con `overflow: hidden`; soporte de `Intl.Locale.weekInfo` en navegadores antiguos (hay fallback).
- **Próximo:** `F5-004` — CommandPalette.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 026 — Tema Sumi

- **Objetivo:** cerrar `F5-002` con un tema oscuro real, conmutable, sin flash y con AA.
- **Hecho:**
  - **Tokens:** bloque `[data-theme="sumi"]` con papel #171512, tinta cálida, primario ai claro y `color-scheme: dark`. Se separan roles `*-solid` (fondo) de los de texto y se agregan `inverse-bg`/`inverse-fg` para las superficies invertidas (utility bar, footer), que en oscuro quedaban tinta sobre tinta.
  - **Componentes:** `Badge solid` y `Button danger` usan `bg-*-solid`/`text-solid-fg`; el resto no cambia su API.
  - **Conmutación:** selector de tema del catálogo con Sumi; demos aceptan `?theme=sumi`. Un script inline en los tres `index.html` aplica tema, densidad e idioma antes del primer paint (sin flash).
  - **Contraste:** el test de tokens cubre los 4 temas, incluidos `solid-fg` sobre cada `*-solid`, `inverse-fg`/`inverse-bg` y bordes a 3:1.
  - **QA:** axe en Sumi para catálogo, storefront y ERP a 1440/390 y tres idiomas → 0 serious/critical, 0 textos < 12 px. Capturas nuevas `*-sumi` en `docs/qa/2026-10-21` (36 capturas totales).
- **Tareas tocadas:** `F5-002` → `done`.
- **Decisiones:** `D-035` (Sumi post-v1 con roles sólidos/inversos).
- **Evidencia:** `packages/ui/src/styles/{tokens,globals}.css`, `packages/ui/src/components/{ui/badge,ui/button,patterns/store-header,patterns/footer}.tsx`, `packages/ui/src/styles/tokens.contrast.test.ts`, `apps/catalog/src/{data/tokens,lib/use-catalog-view,pages/tokens/themes}.ts*`, `apps/{catalog,storefront,erp}/index.html`, hooks de locale; `bun run check` verde (**30 archivos / 180 tests**); `qa:a11y` → 96 páginas sin serious/critical.
- **Sin validar:** flash en una carga con red lenta (el script es síncrono, pero no se midió con throttling); preferencias del sistema (`prefers-color-scheme`) no se usan: el tema es explícito.
- **Próximo:** `F5-003` — DatePicker/Calendar.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 025 — Fase 5: evaluaciones de SSG y publicación

- **Objetivo:** arrancar la fase 5 por las dos tareas de evaluación, que no tocan código de producto.
- **Hecho:**
  - **`D-032` (F5-006):** para producción, el storefront va a Astro con islas React; la página de producto se renderiza a HTML y solo los controles hidratan. El POC sigue SPA; el ERP y el catálogo no necesitan SSG.
  - **`D-033` (F5-007):** `@koten/ui` no se publica en npm; la distribución es por copia y, si se habilita `F5-001`, por registry. Cierra `Q-008`.
  - **`D-034`:** la v1 cierra sin Sumi ni registry; ambas quedan como tareas opcionales (`F5-001`, `F5-002`). Cierra `Q-001` y `Q-002`.
  - Roadmap: fase 5 → `in_progress`; `F5-006` y `F5-007` → `done`; tabla de decisiones pendientes saneada (solo `Q-005` y `Q-006`).
- **Tareas tocadas:** `F5-006`, `F5-007` → `done`.
- **Decisiones:** `D-032`, `D-033`, `D-034`.
- **Evidencia:** `docs/DECISIONS.md`, `ROADMAP.md`; sin cambios de código ni de presupuestos.
- **Sin validar:** ninguna de las dos evaluaciones se probó con una implementación real (Astro o publicación); son decisiones de rumbo con tradeoffs documentados.
- **Próximo:** `F5-001` registry shadcn o `F5-002` tema Sumi, a elección; después `F5-003` DatePicker, `F5-004` CommandPalette y `F5-005` virtualización.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 024 — Definition of Done y tag v0.1.0-poc

- **Objetivo:** cerrar `F4-006`: revisar la Definition of Done, resolver lo que faltaba y etiquetar el hito.
- **Hecho:**
  - **DoD revisada** contra `AGENTS.md` §6 y los criterios de la sección 4 del roadmap: criterios por tarea con evidencia, tests, catálogo documentado, tokens/densidad/tema, teclado y foco, axe sin serious/critical, 0 fuentes CJK, sin texto crítico en imágenes, sin dependencias pesadas sin decisión.
  - **Verificación final:** `bun run ci` verde (Biome + TypeScript + i18n + 178 tests + build + presupuestos); `qa:a11y` → 78 páginas × 1440/390 sin violaciones serious/critical, sin textos < 12 px y con foco visible; `qa:overflow` → 108 combinaciones LTR/RTL sin desbordamiento ni recorte; `qa:perf` → LCP 84–396 ms y CLS 0; 24 capturas en `docs/qa/2026-10-21`.
  - **Presupuestos ajustados:** el catálogo sube su tope total de 330 a 340 KB tras la página Empezar trilingüe (medido 333,0 KB); inicial 243,5 KB. Storefront 122,3 KB, ERP 196,5 KB, CSS 9,2 KB, 0 fuentes.
  - **`D-031`:** el POC se entrega como repositorio + CI, sin deploy alojado; `Q-004` queda cerrada. `Q-005` (licencia) sigue abierta como decisión del dueño del repo, no bloquea el tag.
  - **Tag `v0.1.0-poc`** sobre el commit de cierre, con la fase 4 marcada `done`.
- **Tareas tocadas:** `F4-006` → `done`; **fase 4 → `done`**.
- **Decisiones:** `D-031`.
- **Evidencia:** `bun run ci`, `bun run qa:a11y`, `bun run qa:overflow`, `bun run qa:perf`, `docs/qa/2026-10-21/`, `scripts/check-budgets.ts`; tag `v0.1.0-poc`.
- **Sin validar:** lector de pantalla real, Firefox/Safari (`Q-006`), deploy y licencia (`Q-004` cerrada por `D-031`; `Q-005` abierta).
- **Próximo:** fase 5 opcional — registry shadcn (`F5-001`), tema Sumi (`F5-002`), DatePicker (`F5-003`), CommandPalette (`F5-004`), virtualización (`F5-005`), evaluación SSG/SSR (`F5-006`) y publicación (`F5-007`).
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 023 — Documentación final y recetas

- **Objetivo:** cerrar `F4-005` para que alguien externo pueda copiar y usar el sistema sin leer el código.
- **Hecho:**
  - **Página Empezar** (`/start`, en las tres lenguas): requisitos, comandos del repo, instalación en un proyecto propio (dependencias, copia de `tokens.css`/`globals.css`, `@source`, provider), receta para copiar una primitiva, reglas que no se negocian, comandos de verificación y enlaces a componentes/patrones. Entra en la navegación de Fundamentos y en el pager.
  - **`docs/RECIPES.md`**: ocho recetas copiables con la API real —base mínima, formulario con errores vinculados, tabla densa, `DataTable`, `DetailDrawer`, `ProductCard`/`PriceBlock`, i18n/formato y checklist de cierre— más anti-patrones.
  - **README**: estado de fase 4, uso rápido, tabla de documentación con recetas y capturas, stack real (axe + Chromium/CDP en vez de Playwright) y comandos `qa:*` al día.
  - **`D-030`**: la v1 no incluye estilos de impresión; una factura imprimible requiere decisiones legales y de producto que no están en el alcance. `Q-009` queda cerrada.
- **Tareas tocadas:** `F4-005` → `done`; `Q-009` → `decided`.
- **Decisiones:** `D-030`.
- **Evidencia:** `apps/catalog/src/pages/start.tsx` (+ ruta y nav), `apps/catalog/src/pages/pages.test.tsx`, `docs/RECIPES.md`, `README.md`, `docs/DECISIONS.md`; `bun run check` verde (**30 archivos / 178 tests**); página verificada en navegador ES/JA/EN.
- **Sin validar:** revisión por un tercero real; los ejemplos asumen React 19 + Tailwind 4 y no cubren otros bundlers.
- **Próximo:** `F4-006` — revisión de Definition of Done y tag `v0.1.0-poc`.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 022 — QA visual y capturas

- **Objetivo:** cerrar `F4-004` con evidencia visual en 1440, 1280 y 1024, y corregir diferencias de layout.
- **Hecho:**
  - **Script nuevo** (`scripts/qa-visual.ts`): sirve el build con `vite preview`, captura 7 páginas (catálogo portada/formularios/patrones, storefront producto, ERP dashboard/pedidos/formulario) en 3 anchos y escribe `docs/qa/2026-10-21/index.md` con la matriz. Total: **21 capturas**.
  - **Revisión:** se revisaron storefront 1440/1024, ERP pedidos 1280/1024 y formulario 1024, catálogo portada 1440 y patrones 1280. Jerarquía, densidad, marcos y rails se mantienen; sin clipping.
  - **Corrección:** los IDs de pedido se partían en dos líneas a 1024; ahora la celda usa `whitespace-nowrap` en pedidos y dashboard.
  - `qa-overflow` suma 1280 a su matriz: **96 combinaciones** (8 rutas × 3 idiomas × 4 anchos) sin desbordamiento ni recorte, LTR y RTL.
- **Tareas tocadas:** `F4-004` → `done`.
- **Decisiones:** ninguna.
- **Evidencia:** `scripts/qa-visual.ts`, `docs/qa/2026-10-21/**`, `apps/erp/src/pages/{orders,dashboard}.tsx`; `bun run qa:visual` → 21 capturas; `bun run qa:overflow` → 96 combinaciones OK.
- **Sin validar:** revisión pixel-perfect entre sistemas operativos (`RISK-008`); la fecha nativa del formulario la renderiza el navegador (`mm/dd/yyyy` en Chromium es-ES).
- **Próximo:** `F4-005` — documentación final (README, catálogo, principios, tokens y recetas).
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 021 — Performance, presupuestos y code splitting

- **Objetivo:** cerrar `F4-003` midiendo el build real y ajustando lo que haga falta para cumplir los presupuestos de la sección 4.
- **Hecho:**
  - **Medición nueva** (`scripts/qa-perf.ts`): levanta `vite preview` de las tres apps y mide con Chromium headless LCP, CLS, FCP, peticiones JS y bytes transferidos; 3 muestras por ruta (6 rutas), caché desactivada. Resultado: **LCP 84–396 ms, CLS 0, FCP 40–136 ms**.
  - **Presupuestos con inicial/total** (`scripts/check-budgets.ts`): ahora distingue el JS que pide `index.html` (entry + modulepreload) del total de chunks. Storefront **122,3/122,3 KB**, ERP **196,4/196,4 KB**, catálogo **243,4/327,7 KB**, CSS 9,2 KB, 0 fuentes.
  - **Code splitting** (`D-029`): el catálogo carga la portada en el entry y cada página con `React.lazy` + `Suspense`; el fallback reserva altura para no mover el pager (CLS 0). El JS inicial baja de 304,5 a 243,4 KB (−20 %). En el ERP se probó el mismo split: ahorraba 3,5 KB porque `@koten/ui`/TanStack viven en el entry, así que se revirtió y la navegación sigue instantánea.
  - Tests del catálogo y del ERP ajustados donde la ruta pasa a ser asíncrona; `asyncUtilTimeout` de Testing Library a 3 s para el primer chunk en CI.
- **Tareas tocadas:** `F4-003` → `done`; `R-012` → `done`.
- **Decisiones:** `D-029` (code splitting solo en el catálogo).
- **Evidencia:**
  - `scripts/qa-perf.ts`, `scripts/check-budgets.ts`, `scripts/lib/cdp.ts`, `apps/catalog/src/App.tsx`, `apps/catalog/src/app.test.tsx`, `vitest.setup.ts`, `package.json`.
  - `bun run qa:perf` → `perf: 6 rutas · presupuesto LCP < 1500ms y CLS < 0.02`.
  - `bun run budget` → `Presupuestos OK` con los valores de arriba.
  - `bun run check` verde (**30 archivos / 177 tests**).
- **Sin validar:** throttling de red/CPU real, Lighthouse y deploy CDN; las métricas son locales (criterio del POC) y sin compresión del preview.
- **Próximo:** `F4-004` — QA visual en 1440/1280/1024 con capturas archivadas.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 020 — Auditoría a11y en navegador

- **Objetivo:** cerrar `F4-002` midiendo accesibilidad real en Chromium, no solo en jsdom: contraste calculado, foco con teclado y tamaño mínimo de texto.
- **Hecho:**
  - **Auditoría nueva** (`scripts/qa-a11y.ts`): inyecta `axe-core` en la página, ejecuta WCAG 2.0/2.1 A y AA (incluye `color-contrast`), recorre con `Tab` los primeros 15 interactivos y verifica `outline`/`box-shadow` en `:focus-visible`, y detecta nodos de texto visible por debajo de 12 px. Matriz: 12 rutas × 3 idiomas × 1440/390, con estados abiertos de `DetailDrawer` y `Select` (72 combinaciones). Resultado: **0 serious/critical, 0 textos < 12 px, 0 focos sin indicador**.
  - **Hallazgos corregidos:**
    - Texto a 11 px en la capa `2xs` (utility bar, fechas, metadatos): `--koten-text-2xs` sube a 12 px (`D-027`).
    - Contraste de enlaces activos `text-primary` sobre `bg-tint`/`bg-selection`: pasan a `text-primary-strong` en `StoreHeader`, `SideNav`, rail del storefront y layout del catálogo; `Menu` resaltado también.
    - `label-content-name-mismatch`: la marca del storefront y del ERP ahora incluye el sello y el texto visible en el nombre accesible; `viewOrder` empieza por la etiqueta visible ("Ver pedido…", "表示: …", "View order…").
    - `scrollable-region-focusable` en el catálogo a 390 px: las tablas y bloques de código con scroll horizontal ahora reciben foco (`tabIndex={0}` en `Table`, `SpecTable`, `PropsTable`, tablas del espécimen y páginas de tokens); la regla de Biome `noNoninteractiveTabindex` se excluye por archivo con motivo.
    - `aria-hidden-focus` de los focus guards internos de Base UI: se acota la exclusión de axe a `[data-base-ui-focus-guard]` sin desactivar la regla (`D-028`).
  - `bun run check` incorpora la guardia i18n de la sesión anterior; los scripts de QA quedan disponibles como `bun run qa:a11y` y `bun run qa:overflow`.
- **Tareas tocadas:** `F4-002` → `done`; `R-011` → `done`.
- **Decisiones:** `D-027` (piso de 12 px), `D-028` (alcance de axe sobre Base UI).
- **Evidencia:**
  - `scripts/qa-a11y.ts`, `scripts/lib/cdp.ts`, `packages/ui/src/styles/tokens.css`, `packages/ui/src/components/patterns/{store-header,side-nav}.tsx`, `packages/ui/src/components/ui/menu.tsx`, `apps/storefront/src/pages/product.tsx`, `apps/catalog/src/components/catalog-layout.tsx`, `apps/erp/src/{App.tsx,data/copy.ts}`, `apps/erp/src/App.test.tsx`.
  - `bun run qa:a11y` → `a11y: 72 páginas · 0 violaciones serious/critical · 0 textos < 12px · 0 focos sin indicador`.
  - `bun run qa:overflow` → 72 combinaciones sin desbordamiento ni recorte (LTR y RTL).
  - `bun run check` verde (**30 archivos / 177 tests**).
- **Sin validar:** lector de pantalla real (NVDA/VoiceOver); la auditoría cubre nombres accesibles, landmarks y orden de foco, no la experiencia narrada. Los focus guards de Base UI quedan excluidos por diseño (`D-028`).
- **Próximo:** `F4-003` — auditoría de performance (bundles, code splitting, LCP/CLS).
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 019 — Auditoría i18n y RTL best-effort

- **Objetivo:** cerrar `F4-001` con una guardia automática de i18n, la auditoría de las demos y del catálogo, y una prueba objetiva de expansión de texto y RTL.
- **Hecho:**
  - **Guardia `bun run check:i18n`** (`scripts/check-i18n.ts`): detecta texto visible hardcodeado en el JSX de las demos, labels accesibles literales (`aria-label`, `placeholder`, `title`, `alt`), formateo fuera de `Intl` del provider (`toLocaleString`, `toLocaleDateString`, `toLocaleTimeString`, `toFixed`) y utilidades/propiedades físicas. Tiene excepción explícita `// i18n-allow: <regla> <motivo>` y 9 tests propios. Integrada en `bun run check`.
  - **Hallazgos corregidos:** el badge `NEW` del buy box estaba hardcodeado (ahora `copy.buy.newBadge` en JA/ES/EN); los ratings y puntos de `apps/storefront/src/content/copy.ts` usaban `toLocaleString("es-ES"|"ja-JP"|"en-US")` y pasaron a `formatNumber` con el locale del diccionario; el demo de datos del catálogo usaba `¥${value.toLocaleString(...)}` y pasó a `formatCurrency`; los ratings del demo de patrones usan `formatNumber`.
  - **RTL best-effort (`D-026`, cierra `Q-010`):** 25 archivos migrados de utilidades físicas a lógicas (`text-start`/`text-end`, `ps`/`pe`, `border-s`, `start`); no quedan propiedades CSS físicas. La guardia evita regresiones.
  - **QA de expansión y RTL** (`scripts/qa-overflow.ts`): Chromium headless vía CDP mide `scrollWidth`, elementos recortados (`overflow: hidden|clip`) y elipsis, y repite la medición con `dir="rtl"`. Resultado: **72 combinaciones** (catálogo 4 rutas, storefront 1, ERP 3 × 3 idiomas × 1440/1024/390) sin desbordamiento ni recorte, LTR y RTL.
- **Tareas tocadas:** `F4-001` → `done`; **fase 4 → `in_progress`**.
- **Decisiones:** `D-026` (RTL best-effort con propiedades lógicas); `Q-010` cerrada.
- **Evidencia:**
  - Guardia: `scripts/check-i18n.ts`, `scripts/check-i18n.test.ts`, `package.json` (`check:i18n` dentro de `check`), `vitest.config.ts`.
  - QA: `scripts/qa-overflow.ts`; salida `qa: 72 combinaciones sin desbordamiento ni recorte`.
  - Código: `apps/storefront/src/content/copy.ts`, `apps/storefront/src/pages/product.tsx`, `apps/catalog/src/pages/components/data.tsx`, `apps/catalog/src/pages/patterns/storefront.tsx`, `packages/ui/src/components/**`.
  - `bun run check` verde (**30 archivos / 177 tests**); `bun scripts/check-i18n.ts` → `137 archivos revisados, sin hallazgos`.
- **Sin validar:** hablante nativo JA/EN; RTL visual completo (iconos direccionales, gráficos, `Tategaki`) queda fuera de la v1.
- **Próximo:** `F4-002` — auditoría a11y (axe en navegador, contraste calculado, teclado y lector de pantalla).
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 018 — i18n completo del catálogo y auditoría de demos

- **Objetivo:** cerrar la deuda de i18n antes de la fase 4: el catálogo traducía la interfaz pero el cuerpo de las páginas seguía en español, y las demos tenían restos de strings y de formato por locale.
- **Hecho:**
  - **Cuerpo del catálogo en ES/JA/EN.** Las 25 páginas de documentación (fundamentos, componentes, patrones, portada y 404) usan diccionarios tipados por página (`Record<KotenLocale, Copy>`); el español se conserva literal y JA/EN son traducciones completas. Se localizaron cabeceras, descripciones, secciones, demos, captions, props, listas de a11y y ejemplos.
  - **Infraestructura:** `apps/catalog/src/lib/i18n.ts` (`Localized<T>`, `pickLocalized`); `data/tokens.ts` localiza `note`, `use`, `context` y `description`; `docs.tsx` traduce Copiar/Copiado y las columnas de props; `specimen.tsx` traduce roles, familias, escalas, densidad y las muestras de tema; `data/catalog.ts` agrega labels de catálogo, 404 y estado de fase 4.
  - **Idioma del documento:** `syncViewToUrl` fija `document.documentElement.lang` y `CatalogLayout` actualiza `document.title` por página. Las demos ya lo hacían; ERP ahora también actualiza `title` y `meta[description]` al cambiar de idioma.
  - **Auditoría de demos:** se eliminó el último label hardcodeado (`Email` en el drawer de pedidos) y se corrigió pluralización ES/EN (`artículo(s)`, `item(s)`, `pedido(s)`, `valoración/valoraciones`, `punto(s)`, `review(s)`).
  - **Números y fechas:** `ProductCard` y `ReviewSummary` formatean rating con `Intl` (antes `toFixed`), y la tabla sr-only de `BarChart` traduce sus encabezados con el locale del provider (`Etiqueta/項目/Label`).
  - **QA de navegador:** se corrigió un warning real de React (`Encountered two children with the same key`) en `ProductGallery`: las miniaturas aceptan un `id` opcional y el demo del catálogo pasa ids únicos cuando reutiliza el mismo SVG.
  - **Presupuesto:** el catálogo pasa de 253,6 a 304,5 KB gzip por el contenido trilingüe; el presupuesto interno sube de 300 a 330 KB (`D-025`). Storefront y ERP no cambian.
  - **Pruebas nuevas:** `apps/catalog/src/pages/i18n.test.tsx` (6 casos: cuerpo JA/EN, tokens, labels de docs, patrones, `lang` del documento y labels de shell); tests de pluralización en ERP/storefront y de la tabla accesible de `BarChart`.
- **Tareas tocadas:** `M-001` → `done` (mejora puntual, fuera de fases). `F4-001` sigue `todo`: esta sesión resuelve el cuerpo del catálogo, pero la auditoría formal de expansión de texto y RTL corresponde a esa tarea.
- **Decisiones:** `D-025` (cuerpo del catálogo en ES/JA/EN; los `.md` internos siguen en español).
- **Evidencia:**
  - Catálogo: `apps/catalog/src/lib/i18n.ts`, `pages/**` (25 páginas), `components/{docs,specimen,catalog-layout}.tsx`, `data/{catalog,tokens}.ts`, `lib/use-catalog-view.ts`.
  - Demos/UI: `apps/erp/src/{App.tsx,pages/orders.tsx,data/copy.ts}`, `apps/storefront/src/{pages/product.tsx,content/copy.ts}`, `packages/ui/src/components/{ui/bar-chart.tsx,patterns/product-card.tsx,patterns/review-summary.tsx,patterns/product-gallery.tsx}`.
  - `bun run check` verde (**29 archivos / 168 tests**); `bun run build` OK; `bun run budget` → storefront 122,3 KB JS · ERP 196,4 KB JS · catálogo 304,5 KB JS · CSS 9,2 KB · 0 fuentes.
  - Navegador: catálogo ES/JA/EN en `/`, `/tokens/format`, `/patterns/storefront`, `/components/data`, `/components/inputs`; sin clipping a 1440, 768 y 390. Storefront y ERP en JA/EN con `lang`, `title` y drawer localizados.
- **Sin validar:** lector de pantalla real, RTL y contraste calculado en navegador (quedan en `F4-002`); la traducción JA/EN es funcional y revisable, pero no pasó por hablante nativo.
- **Próximo:** `F4-001` — auditoría i18n formal (expansión de texto, RTL best-effort); después `F4-002` — a11y.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 017 — Select modal y paginación

- **Objetivo:** investigar el bloqueo de la página al abrir un `Select` o usar la paginación, y el aviso de `flushSync` en consola.
- **Hecho:**
  - **Causa 1 — `Select` modal por defecto.** Base UI 1.9 marca `Select` como modal: bloquea el scroll del documento y las interacciones fuera del popup. El modo `alignItemWithTrigger` añade mediciones de viewport y era el camino que producía el aviso de `flushSync`. Ahora `Select` usa `modal={false}` por defecto y `alignItemWithTrigger={false}`; el popup queda debajo del trigger y la página sigue interactiva. `Menu` también usa `modal={false}`. El modo modal se puede activar con `modal`.
  - **Causa 2 — identidad de `data` en `DataTable`.** `data-table.tsx` pasaba `[...data]` a TanStack en cada render; el nuevo array se interpretaba como un cambio de datos y reiniciaba la página, así que “Siguiente” no avanzaba. Ahora se pasa la misma referencia. En navegador se validaron 5 páginas consecutivas y 5 ciclos de apertura/cierre de selects sin bloqueo ni avisos.
  - Tests de regresión: scroll no bloqueado al abrir `Select`; página conservada tras un re-render del padre en `DataTable`.
- **Tareas tocadas:** `F3-009` → `done`.
- **Decisiones:** `D-024` (Select no modal y paginación con identidad estable); `RISK-015`.
- **Evidencia:** `packages/ui/src/components/ui/{select,menu,data-table}.tsx`, `advanced-inputs.test.tsx`, `data-displays.test.tsx`, `overlays.test.tsx`; `bun run check` verde (**28 archivos / 157 tests**); prueba CDP: paginación 1→6 y 5 selects consecutivos sin `overflow: hidden` ni warnings; captura `select-nonmodal.png`.
- **Sin validar:** interacción real en Firefox y Safari; el stress se hizo en Chromium. Si el aviso reaparece, revisar el camino de focus guards de Base UI en esos navegadores.
- **Próximo:** fase 4 — `F4-001` auditoría i18n.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 016 — ERP KURA y cierre de fase 3

- **Objetivo:** completar la fase 3 con datos deterministas, shell, dashboard, pedidos, drawer y formulario.
- **Hecho:**
  - Datos KURA deterministas: **132 pedidos**, 12 clientes y 16 productos con semillas fijas, fechas ancladas a 2026-10-21, líneas, totales, tracking y timelines.
  - Shell `AppShell` + `SideNav` (232 px, activo, conteo, menú móvil) + `TopBar` (búsqueda global, notificaciones, idioma, cuenta) + `PageHeader`.
  - Dashboard con 4 KPIs y sparklines, `BarChart` de 14 días con tabla de respaldo, pedidos recientes de 8 columnas y panel de tareas.
  - Pedidos con `FilterBar` (`q`, `status`, `warehouse`, `range` en URL), `DataTable` con sort/selección/paginación, acciones masivas y exportación CSV; el conteo se anuncia con `aria-live`.
  - `DetailDrawer` por fila con cliente, entrega, líneas, nota e historial; Escape cierra y el foco vuelve al trigger (probado).
  - Formulario `/orders/new` con `FormSection`, `Field`, `Select` con error/description, resumen de errores enfocable y toast al registrar.
  - Rutas `/`, `/orders`, `/orders/new` y placeholders para módulos fuera del POC; interfaz ES/JA/EN y `?lang=`.
- **Tareas tocadas:** `F3-001`–`F3-008` → `done`; `C-053`–`C-061` → `done`.
- **Decisiones:** `D-023` (rutas y estado en URL de las demos).
- **Evidencia:** `apps/erp/src/{App.tsx,data/**,pages/**,lib/use-erp-locale.ts}`, `packages/ui/src/components/patterns/{app-shell,side-nav,top-bar,page-header,filter-bar,detail-drawer,status-badge,form-section,timeline}.tsx`; `bun run check` verde (**28 archivos / 154 tests**); `bun run budget` → ERP 196,2 KB JS / 9,2 KB CSS / 0 fuentes; LCP 124–208 ms local y CLS 0; axe en dashboard, pedidos y formulario; capturas 1440/1280/1024 de dashboard, pedidos, drawer y formulario.
- **Sin validar:** lector de pantalla real y contraste calculado en navegador (quedan en `F4-002`).
- **Próximo:** fase 4 — `F4-001` auditoría i18n.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 015 — Storefront HIKARI y cierre de fase 2

- **Objetivo:** completar la fase 2 con contenido real JA/ES/EN, once patrones y la página de producto HIKARI K-1.
- **Hecho:**
  - Contenido tipado y localizado: producto, variantes, kits, specs, avisos, ranking, campaña, reseñas, relacionados, footer y diccionarios de UI completos en JA/ES/EN.
  - Patrones `C-042`–`C-052`: `SearchBar`, `StoreHeader`, `ProductGallery`, `PriceBlock`, `ProductCard`, `NoticeList`, `RankedList`, `CampaignBanner`, `SpecTable`, `ReviewSummary` y `Footer`.
  - Página HIKARI con layout 180 + main + 300 en desktop, 2 columnas en 1024, una columna en mobile; utility bar, búsqueda con categoría, breadcrumb, buy box, variantes, cantidad, CTA con toast, avisos, ranking, campaña, descripción, specs, reviews y relacionados.
  - Selector JA/ES/EN persistido en `?lang=`; fechas y moneda con `Intl`; assets SVG locales con `width`/`height`, `alt` localizado y sin texto en imágenes.
  - Documentación de los patrones en el catálogo: `/patterns`, `/patterns/storefront` y `/patterns/erp`; inventario y notas de a11y.
- **Tareas tocadas:** `F2-001`–`F2-008` → `done`; `C-042`–`C-052` → `done`; `Q-003` cerrada.
- **Decisiones:** `D-021` (contenido y datos mock deterministas) y `D-022` (assets SVG locales).
- **Evidencia:** `apps/storefront/src/{App.tsx,content/**,pages/product.tsx,lib/use-storefront-locale.ts,assets/**}`, `packages/ui/src/components/patterns/**`, `apps/catalog/src/pages/patterns/**`; `bun run check` verde (**28 archivos / 154 tests**); `bun run budget` → storefront 122,0 KB JS / 9,2 KB CSS / 0 fuentes; LCP 232–508 ms local y CLS 0; axe sin serious/critical; capturas 1440/1280/1024 y 390.
- **Sin validar:** lector de pantalla real y contraste calculado en navegador (quedan en `F4-002`).
- **Próximo:** `F3-001` — datos mock KURA.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 014 — A11y, performance y cierre de fase 1

- **Objetivo:** cerrar `F1-010` y la fase 1 con auditoría de accesibilidad y presupuestos.
- **Hecho:**
  - Auditoría **axe-core 4.14** sobre 11 páginas de componentes: sin violaciones `serious`/`critical`. El contraste se mantiene cubierto por el test de tokens; axe en jsdom no calcula color.
  - Script `bun run budget` que mide gzip de JS/CSS y verifica 0 fuentes locales; integrado en `bun run ci` y en GitHub Actions.
  - Presupuestos: storefront 69,3 KB JS, ERP 68,9 KB JS, catálogo 253,6 KB JS interno; CSS 8,6 KB; fuentes 0.
  - Foco visible revisado en formularios, overlays y controles; sin fuentes CJK.
- **Tareas tocadas:** `F1-010` → `done`; **fase 1 → `done`**.
- **Decisiones:** Ninguna nueva. `axe-core` entra como dev dependency dentro de `D-005`.
- **Evidencia:** `apps/catalog/src/pages/a11y.test.tsx`, `scripts/check-budgets.ts`, `.github/workflows/ci.yml`, `package.json`; `bun run check` verde (**21 archivos / 111 tests**); `bun run ci` verde con presupuestos.
- **Sin validar:** lector de pantalla real y auditoría axe con contraste calculado en navegador (se hará en `F4-002`).
- **Próximo:** fase 2 — `F2-001` contenido, datos mock y diccionarios JA/ES/EN del storefront.
- **Bloqueos:** ninguno.

---

## 2026-10-21 · Sesión 013 — Catálogo completo de primitivas

- **Objetivo:** cerrar `F1-009` con inventario, trazabilidad y copia de código.
- **Hecho:**
  - Inventario de 42 primitivas en `/components` con ID `C-*`, nombre y página de referencia.
  - Enlaces desde el inventario a cada grupo documentado.
  - Botón **Copiar** en los bloques de código del catálogo, con feedback accesible.
  - Verificación de que las 11 páginas de grupo cubren preview, props, código y a11y.
- **Tareas tocadas:** `F1-009` → `done`.
- **Decisiones:** Ninguna nueva.
- **Evidencia:** `apps/catalog/src/pages/components/index.tsx`, `components/docs.tsx`; `bun run check` verde (**20 archivos / 100 tests**).
- **Sin validar:** axe real (siguiente tarea) y lector de pantalla.
- **Próximo:** `F1-010` — pasada de a11y y performance de primitivas.
- **Bloqueos:** ninguno.

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
