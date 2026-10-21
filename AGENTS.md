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
- Mantener los componentes copiables: imports mínimos, sin dependencias internas ocultas.
- Si un componente necesita un patrón nuevo, crearlo en `packages/ui/src/components/patterns/` y documentarlo.
- Si una primitiva de Base UI no cubre el caso, usar HTML nativo y dejarlo anotado.

## 4. Fin de sesión

- [ ] Ejecutar `bun run check` (Biome + TypeScript + tests).
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
ROADMAP.md
README.md
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
8. Actualizar inventario y trazabilidad.
9. Ejecutar `bun run check`.

## 10. Cómo agregar un patrón

1. Verificar que esté en el inventario (`C-*`, fase 2 o 3).
2. Componerlo con primitivas existentes; no duplicar estilos base.
3. Documentar anatomía, estados y contenido mínimo.
4. Usarlo en el demo correspondiente.
5. Agregar página de patrón en el catálogo.
6. Registrar en el roadmap.

## 11. Reglas de documentación

- Documentación en **español**; identificadores de código en **inglés**.
- Fechas ISO (`YYYY-MM-DD`).
- No borrar decisiones ni entradas de bitácora.
- No reescribir documentos completos si se puede hacer una edición puntual.
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

La fase 0 está cerrada (`F0-001`–`F0-012`) y la fase 1 está en curso: `F1-001` dejó `Field`, `Label`, `Input`, `Textarea` y `FormRow`. El catálogo es wiki con React Router, selector ES/JA/EN y documentación sensible a tema/densidad. **No repitas `git init`, el workspace ni `bun install`.** El repo sigue sin commit inicial; que `git status` muestre archivos sin versionar es esperado.

1. Leer `PROGRESS.md`, `ROADMAP.md` y `DECISIONS.md`.
2. Continuar la fase 1 con `F1-002`: `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch` y `NumberField`.
3. Seguir el patrón de `Button`/`Panel`/`Badge` y de los formularios base: CVA, roles semánticos, `data-slot`, tests y página propia en el catálogo.
4. Mantener la documentación en español (`D-020`) y la UI del catálogo en ES/JA/EN; no traducir el cuerpo de los docs sin una decisión nueva.
5. No saltar a fases 2/3 sin cerrar la fase 1; registrar cualquier cambio de alcance con `D-*`.

Versiones resueltas en el scaffold: Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5.

Si el repo se reconstruye desde cero, los pasos históricos de `F0-001` están en el roadmap.
