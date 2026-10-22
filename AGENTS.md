# AGENTS.md — Protocolo de trabajo

> Instrucciones para cualquier persona o agente que retome Koten UI en otra sesión.
> El objetivo es que el estado del proyecto sea **legible, verificable y acumulativo**.

## 1. Orden de lectura

1. [docs/PROGRESS.md](./docs/PROGRESS.md) — estado real y última sesión.
2. [ROADMAP.md](./ROADMAP.md) — fase, tareas, dependencias y próxima tarea.
3. [docs/DECISIONS.md](./docs/DECISIONS.md) — decisiones vigentes y alternativas descartadas.
4. [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) — alcance y criterios.
5. [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) — gramática visual y técnica.

No empieces a escribir código sin leer al menos 1, 2 y 3.

## 2. Inicio de sesión

- [ ] Leer `PROGRESS.md` y confirmar fase, próxima tarea y bloqueos.
- [ ] Abrir `ROADMAP.md` y elegir la primera tarea `todo` cuyas dependencias estén `done`.
- [ ] Marcar la tarea `in_progress` en el roadmap.
- [ ] Agregar una entrada nueva en `PROGRESS.md` con el objetivo.
- [ ] Verificar que el repo esté limpio (`git status`) o entender los cambios previos.
- [ ] Ejecutar `bun install` y `bun run check` si el proyecto ya está scaffoldeado.

## 3. Durante el trabajo

- Una tarea `in_progress` por sesión. Si aparece otra, se registra como `todo` y se sigue.
- No cambiar el alcance en silencio: si hace falta, crear una decisión `D-*` y actualizar el roadmap.
- No agregar dependencias nuevas sin una decisión `D-*`. Preferir HTML nativo, CSS y Base UI.
- No hardcodear colores, tamaños de fuente ni radios: usar tokens.
- No usar `asChild`; la composición es `render` + `useRender` + `mergeProps`.
- No usar `@apply` en componentes; CVA + utilidades.
- No usar texto en imágenes.
- No cargar fuentes CJK completas.
- No bajar de 12 px en texto normal.
- No usar `outline: none` sin reemplazo visible.
- Mantener el diseñador de temas (`/theme`) dentro de sus parámetros curados: no agregar colores libres, fuentes, espaciado ni sombras, y no exportar CSS si falla una comprobación AA.
- Mantener los componentes copiables: imports mínimos, sin dependencias internas ocultas.
- Si un componente necesita un patrón nuevo, crearlo en `packages/ui/src/components/patterns/` y documentarlo.
- Si una primitiva de Base UI no cubre el caso, usar HTML nativo y dejarlo anotado.

## 4. Fin de sesión

- [ ] Ejecutar `bun run check` (Biome + TypeScript + tests + `ai:check`).
- [ ] Ejecutar `bun run build` si se tocó configuración o rutas.
- [ ] Actualizar el estado de la tarea en `ROADMAP.md`.
- [ ] Registrar evidencia: rutas, comandos, commits, capturas o reportes.
- [ ] Agregar/actualizar la entrada de `PROGRESS.md` con:
  - qué se hizo,
  - qué quedó a medias,
  - qué sigue,
  - bloqueos.
- [ ] Si se tomó una decisión, agregarla a `DECISIONS.md` con ID nuevo.
- [ ] Si se descubrió un riesgo, agregarlo a `ROADMAP.md`.
- [ ] Si se abrió una pregunta, agregarla como `Q-*`.
- [ ] Dejar el repo en un estado comprensible: sin secretos, sin artefactos temporales, sin cambios ajenos revertidos.

## 5. Convenciones de estado e IDs

### Estados

| Estado | Uso |
| --- | --- |
| `todo` | No empezada. |
| `in_progress` | En curso; una por sesión. |
| `blocked` | Espera decisión, dependencia o acceso. |
| `done` | Criterio cumplido y evidencia registrada. |
| `dropped` | Descartada con decisión `D-*`. |

### IDs

- Tareas: `F<fase>-<nnn>` (`F0-001`).
- Componentes: `C-<nnn>` (`C-001`).
- Requisitos: `R-<nnn>` (`R-001`).
- Decisiones: `D-<nnn>` (`D-001`).
- Riesgos: `RISK-<nnn>` (`RISK-001`).
- Preguntas: `Q-<nnn>` (`Q-001`).

**Nunca renumerar.** Si una tarea se divide, usar `F0-001a`, `F0-001b`. Si una decisión se reemplaza, crear `D-0xx` con “supersede a D-00y”.

## 6. Definition of Done

Una tarea está `done` solo si:

- [ ] Cumple su criterio de aceptación.
- [ ] Tiene tests cuando aplica (lógica, estados, accesibilidad).
- [ ] Está documentada en el catálogo si es un componente o patrón.
- [ ] Respeta tokens, densidad, tema y tipografía.
- [ ] Es navegable con teclado y tiene foco visible.
- [ ] No introduce violaciones `serious`/`critical` de axe.
- [ ] No agrega fuentes CJK, texto en imágenes ni dependencias pesadas sin decisión.
- [ ] `bun run check` pasa.
- [ ] El roadmap y la bitácora están actualizados.

## 7. Commits y ramas

### Formato

Conventional Commits:

```txt
feat(ui): add button variants
fix(erp): keep focus on row after drawer close
docs(roadmap): mark F0-004 done
chore(repo): configure biome
test(ui): cover field error wiring
```

### Ramas

```txt
feat/f0-001-workspace
feat/f1-001-forms
fix/f2-003-price-overflow
docs/f0-000-roadmap
```

### Regla

Un commit debe poder explicarse con una tarea o decisión. Si no, probablemente es scope creep.

## 8. Mapa del repo

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
docs/
  REQUIREMENTS.md
  DESIGN-SYSTEM.md
  DECISIONS.md
  PROGRESS.md
skills/
  koten-ui/             # skill para consumir componentes
  koten-design-system/  # skill para extender el sistema
scripts/
  build-ai-docs.ts      # llms.txt, Markdown por pieza e inventario de skills
ROADMAP.md
README.md
README.es.md
AGENTS.md
```

## 9. Cómo agregar un componente

1. Verificar que esté en el inventario (`C-*`). Si no, agregarlo con una decisión.
2. Crear `packages/ui/src/components/ui/<name>.tsx`.
3. Exportar named exports; agregar `data-slot`.
4. Definir variantes con CVA y roles semánticos.
5. Usar `render`/`useRender` si necesita composición.
6. Agregar tests de estados, teclado y ARIA.
7. Agregar página al catálogo con preview, props, código y notas de a11y.
8. Actualizar inventario, trazabilidad y capa de agentes (`bun run ai:docs`).
9. Ejecutar `bun run check`.

## 10. Cómo agregar un patrón

1. Verificar que esté en el inventario (`C-*`, fase 2 o 3).
2. Componerlo con primitivas existentes; no duplicar estilos base.
3. Documentar anatomía, estados y contenido mínimo.
4. Usarlo en el demo correspondiente.
5. Agregar página de patrón en el catálogo.
6. Regenerar la documentación de agentes (`bun run ai:docs`).
7. Registrar en el roadmap.

## 11. Reglas de documentación

- Documentación en **español**; identificadores de código en **inglés**.
- `README.md` está en **inglés** y es la entrada del repositorio; `README.es.md` es su espejo en español (`D-052`). Si cambia uno, cambiar el otro en el mismo commit.
- Los artefactos para agentes (`llms.txt`, `/md/**`, `skills/**`) están en inglés por `D-045`; no traducirlos sin una decisión nueva.
- Fechas ISO (`YYYY-MM-DD`).
- No borrar decisiones ni entradas de bitácora.
- No reescribir documentos completos si se puede hacer una edición puntual.
- No repetir en cada página lo que ya se explica en **Empezar**; cada sección conserva solo lo específico de la pieza.
- Usar listas con reglas para requisitos, accesibilidad e índices; reservar las tarjetas para la portada. La navegación de la documentación también se lee como lista.
- Las referencias externas deben llevar URL; si no se verificó, marcarla como pendiente.
- Los ejemplos de código deben ser copiables y coherentes con la API real.

## 12. Guardrails

- **No** secretos, tokens ni credenciales en el repo.
- **No** assets con licencia dudosa; documentar la fuente.
- **No** hotlinking de imágenes.
- **No** fuentes CJK completas.
- **No** texto crítico en imágenes.
- **No** dependencias nuevas sin `D-*`.
- **No** cambios de alcance sin actualizar el roadmap.
- **No** renumerar IDs.
- **No** revertir cambios ajenos sin entenderlos.
- **No** declarar `done` sin evidencia.

## 13. Primer paso según el estado

Las fases 0 a 5 están cerradas: workspace, catálogo wiki, tokens/temas/densidad, 46 componentes, 20 bloques, los dos demos, las auditorías de fase 4 y los extras de fase 5 (Sumi, DatePicker, CommandPalette, virtualización y registry shadcn), más el despliegue de producción en una imagen Docker con tres puertos internos servidos detrás de Traefik (`M-005`, `D-043`), la capa de documentación y skills para agentes (`M-007`, `D-045`), la separación de **Empezar** en usar el sistema y desarrollar el sistema (`M-008`, `D-046`), el selector persistente **npx / bunx** (`M-009`, `D-047`), la skill de autoría `koten-design-language` (`M-010`, `D-048`), el i18n personalizable con locale BCP 47 y diccionarios JSON por idioma (`M-011`, `D-049`), la revisión editorial con listas en lugar de tarjetas (`M-012`, `D-050`) y el diseñador de temas con guardrails y export de tokens (`M-013`, `D-051`). **No repitas `git init`, el workspace ni `bun install`.** El repo tiene historial de commits; revisa `git status` antes de empezar.

1. Leer `PROGRESS.md`, `ROADMAP.md` y `DECISIONS.md`.
2. No hay tareas abiertas: cualquier trabajo nuevo entra como `M-*` o una fase 6 con decisión `D-*`.
3. Seguir el patrón de `Button`/`Panel`/`Badge`, de los formularios y de `packages/ui/src/components/patterns`: CVA, roles semánticos, `data-slot`, tests y página propia en el catálogo.
4. Mantener los documentos de trabajo en español (`D-008`), el cuerpo del catálogo completo en ES/JA/EN (`D-025`) y el `README.md` en inglés con su espejo `README.es.md` (`D-052`); no traducir los `.md` internos sin una decisión nueva.
5. No saltar a fase 5 sin cerrar la fase 4; registrar cualquier cambio de alcance con `D-*`.

Versiones resueltas en el scaffold: Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5.

Si el repo se reconstruye desde cero, los pasos históricos de `F0-001` están en el roadmap.
