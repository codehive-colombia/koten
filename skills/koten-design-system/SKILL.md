---
name: koten-design-system
description: Design and extend systems with the Koten UI approach. Use when adding a primitive or block, creating a new theme, density or token, documenting a component, preparing a registry item, or applying Koten's visual grammar (Chirashi, Daichō, Kanso) to a new product or design system. Covers tokens, CVA variants, Base UI composition, accessibility contracts, tests, catalog pages and quality gates.
metadata:
  author: codehive-colombia
  version: "1.0"
---

# Design with Koten

Koten UI is a grammar, not a skin. The identity comes from frames, rules, density, semantic color and typographic rhythm; the Japanese references supply the posture, not decorative stickers. A new component or a new product must extend that grammar instead of adding a parallel one.

## Language and decoration

The catalog and these references use Japanese labels as part of their internal visual language. That is documentation styling. When you apply the grammar to a new product, use the product's language and do not add Japanese text, kanji, `jp` labels, Tategaki, Hanko or Pattern unless the user explicitly asks for that treatment.

## When to use this skill

- You are adding a primitive to `packages/ui/src/components/ui`.
- You are composing a block in `packages/ui/src/components/patterns`.
- You are adding or changing tokens, themes or densities.
- You are documenting a component page or a registry item.
- You are starting a new design system and want the Koten approach as the base.

For installing and using existing components, use `koten-ui`.

## Workflow

### 1. Classify the piece

| Piece | Definition | Lives in |
| --- | --- | --- |
| Token | A primitive or semantic value shared by the system. | `packages/ui/src/styles/tokens.css` |
| Primitive | One reusable control with a public API and its own states. | `packages/ui/src/components/ui/<name>.tsx` |
| Block | A composition of primitives for a concrete screen or region. | `packages/ui/src/components/patterns/<name>.tsx` |
| Theme | A set of semantic role values over the same structure. | tokens + `[data-theme]` rules |
| Density | Row height, control height, padding and gap values. | `[data-density]` rules |

If the piece is only used once inside a page, it is page markup, not a primitive.

### 2. Read the grammar and the neighbours

Read [references/visual-grammar.md](references/visual-grammar.md). Then open two existing components with a similar job. Copy their structure, not their visual details: imports, CVA shape, `data-slot`, prop naming and tests.

### 3. Define the contract before the markup

Write down:

- Purpose in one sentence.
- Variants that express **meaning** (`primary`, `danger`, `sale`) — not colors.
- Sizes and density behavior.
- States: default, hover, focus, active, disabled, loading, empty, error.
- Accessible name, role, keyboard and announcements.
- What comes from props and what comes from `KotenProvider`.
- What must not be configurable because it would break the grammar.

If a new token is needed, it must be a role used by more than one component or needed by a theme. Add it to [references/system-extension.md](references/system-extension.md)'s rules, not as a one-off class.

### 4. Implement

Follow [references/component-blueprint.md](references/component-blueprint.md). In short:

- Named export, explicit props type, `data-slot`.
- CVA for variants; `cn()` to merge classes.
- Semantic roles only: `bg-primary`, `text-ink`, `border-rule`, `text-danger`.
- Logical properties: `text-start`, `ps-*`, `pe-*`, `border-s-*`.
- Base UI primitive when one exists; native HTML when it does not, and say so.
- Composition with the Base UI `render` prop. **Never `asChild`.**
- No strings inside reusable components.
- No hardcoded hex, px font sizes, radii or shadows.
- 12 px is the floor.

### 5. Test the behavior

At minimum:

- Default and variant rendering.
- Keyboard path and focus.
- ARIA attributes and accessible name.
- Disabled/loading/error states when they exist.
- Controlled and uncontrolled behavior when both are supported.
- A DOM query that would fail if `data-slot` or the public API disappears.

Run `bun run check` in this repository. In a consumer project, run the project's typecheck plus the tests that cover the screen.

### 6. Document and register

A component is not done when it renders. It is done when a stranger can install it:

1. Add the doc data in `apps/catalog/src/data/docs/<group>.tsx` (or blocks data).
2. Add the route metadata if it is a new page.
3. Add the registry build coverage if the file is new.
4. Include examples, props, requirements and accessibility notes in ES/JA/EN.
5. Regenerate the agent layer with `bun run ai:docs` and check it with `bun run ai:check`.

### 7. Run the quality gate

Use [references/component-blueprint.md](references/component-blueprint.md#quality-gate). Do not declare done with `serious` or `critical` axe findings, invisible focus, text below 12 px or a broken ES/EN layout.

## Extending a system

When the task is a **new system** rather than a new component:

1. Keep the three registers: `Chirashi` (commerce, saturated, dense), `Daichō` (back office, tabular, sober) and `Kanso` (reading). Do not create a fourth register for a single screen.
2. Define tokens before components. Start from primitive values, then semantic roles. A component may only read roles.
3. Lock the type scale and the 12 px floor before writing layout.
4. Define density as values, not as separate components.
5. Build a specimen page that shows colors, type, spacing, shape, density and themes with real content.
6. Only then build primitives, then blocks, then screens.
7. Keep the same component in all themes. If a theme needs a different structure, the component is wrong.

Read [references/system-extension.md](references/system-extension.md) for the token, theme and density rules.

## Anti-patterns

- A new component that duplicates an existing one with a different name.
- Variants named after colors (`red`, `blue`) instead of meaning (`danger`, `info`).
- A local `style={{ color: "#..." }}` to “fix” a theme.
- A block that reimplements button, field or table styles.
- Decorative gradients, pill buttons, rounded cards with shadows, carousels or “zen” stickers.
- Text inside images, full CJK fonts or 10 px labels.
- `asChild`, cloned children or implicit prop injection.
- Shipping without a catalog page and accessibility notes.
- Changing a public prop without updating the docs and the registry.

## References

- [references/visual-grammar.md](references/visual-grammar.md) — registers, principles, color roles, typography, spacing, shape and motion.
- [references/component-blueprint.md](references/component-blueprint.md) — file template, CVA, Base UI composition, tests, docs and quality gate.
- [references/system-extension.md](references/system-extension.md) — tokens, themes, densities and new-system checklist.
