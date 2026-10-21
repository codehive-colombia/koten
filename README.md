# Koten UI · 古典

Sistema de componentes React inspirado en el web japonés clásico: densidad informativa, marcos de 1px, papel cálido, tipografía del sistema y jerarquía por reglas. La misma gramática visual se adapta a dos registros: **Chirashi** para comercio y **Daichō** para backoffice.

> **Estado:** fase 1 en curso. `F1-001` formularios, `F1-002` inputs avanzados, `F1-003` superficies, `F1-004` feedback y `F1-005` navegación. Catálogo wiki con sidebar, ES/JA/EN y tema/densidad aplicados a la documentación.
> **Tarea en curso:** ninguna — próxima `F1-006` (overlays).
> **Fuente de verdad:** [ROADMAP.md](./ROADMAP.md).

## Documentación

| Documento | Para qué |
| --- | --- |
| [ROADMAP.md](./ROADMAP.md) | Fases, tareas con ID, estado, dependencias, criterios de aceptación y trazabilidad. |
| [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) | Encargo, referencias, alcance, requisitos y criterios de éxito. |
| [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Gramática visual, tokens, componentes, i18n, accesibilidad y performance. |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Registro de decisiones (ADR ligero), con IDs estables. |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | Bitácora append-only de sesiones y handoff. |
| [AGENTS.md](./AGENTS.md) | Protocolo para retomar el proyecto en otra sesión o con otro agente. |

## Principios en una línea

- **Sencillez de medios, densidad de información.**
- El marco es la unidad: panel, cabecera, regla, borde.
- El color señala; no decora.
- Tipografía del sistema y texto real, nunca texto en imágenes.
- Lo clásico no es retro: es continuidad.
- Desktop primero, accesible por defecto, rápido por diseño.

## Stack objetivo

Bun workspaces · React 19 · TypeScript 7 strict · Vite 8 · Tailwind CSS v4 · Base UI · CVA · TanStack Table (solo ERP) · Lucide · React Router 7.18 · Vitest + Testing Library + Playwright + axe · Biome.

Sin CSS-in-JS runtime, sin fuentes CJK completas, sin librería de charts, sin carousel ni date-picker pesado.

Versiones resueltas en el scaffold: Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5.

## Comandos

```bash
bun install
bun run dev      # 5173 catálogo · 5174 storefront · 5175 ERP
bun run check    # Biome + TypeScript + Vitest
bun run ci       # check + build, equivalente local del workflow
bun run build    # build de las tres apps
```

## Estructura

La fase 0 dejó tokens, un catálogo wiki multipágina, el selector ES/JA/EN y la primera validación (`Button`, `Panel`, `Badge`). La fase 1 suma formularios base; `components/patterns` se agrega en las fases 2 y 3.

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
```

## Cómo retomar

1. Leer [docs/PROGRESS.md](./docs/PROGRESS.md) para ver el estado real.
2. Leer [ROADMAP.md](./ROADMAP.md) y continuar la tarea `in_progress` o elegir la primera `todo` cuyas dependencias estén `done`.
3. Seguir [AGENTS.md](./AGENTS.md) para actualizar estado, evidencia y bitácora.

## Licencia

Por definir. Ver `Q-005` en el roadmap.
