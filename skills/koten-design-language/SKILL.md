---
name: koten-design-language
description: Author a new UI piece in the Koten visual language when the catalog does not ship it. Use when a project already uses Koten tokens or primitives and needs a missing component, region or state, and you must build it locally with semantic color roles, 1px frames, 2–3px radii, overlay-only shadows, AA contrast, density tokens, logical properties and a real accessibility contract. Portable across projects; it does not add the piece to the Koten repository (use koten-design-system for that) and does not replace installed primitives (use koten-ui).
metadata:
  author: codehive-colombia
  version: "1.0"
---

# The Koten design language

Koten is a grammar, not a skin. Its identity comes from frames, rules, density, semantic color and typographic rhythm — not from Japanese ornaments. When the catalog has no piece for a job, the new piece must extend that grammar. A one-off card with a shadow and a pill button breaks the system even when it is built with Koten tokens.

This skill is portable: it works in any project that has Koten installed. It is about **creating a local piece that does not exist**, not about adding components to the Koten repository and not about installing the ones that already exist.

## The essence

1. **Simplicity of means, density of information.** Few materials, used well; real data instead of filler.
2. **The frame is the unit.** Panels, headers, rules and borders build the page. Hierarchy comes from structure, not from floating cards.
3. **Color signals; it does not decorate.** Primary for action, `link` for navigation, `sale` for price and urgency, state roles for state. No decorative palettes.
4. **Three registers and a dark theme.** Chirashi for commerce and campaigns, Daichō for back office and tables, Kanso for reading; Sumi is any of them in dark. A theme changes values, never structure.
5. **System fonts are a decision.** Speed and CJK coverage without megabyte downloads.
6. **Classic is not retro.** Keep the clarity of the frame and the information; do not imitate 1998.
7. **Hierarchy without capitals.** Japanese has no capitalization; use size, weight, color, border and position.
8. **Minimal motion.** Color and opacity transitions; no bounce, parallax or scroll-driven animation.
9. **Desktop first, mobile legible.** 1280 is the main stage, 1024 the serious minimum, mobile must not break.
10. **Accessible by default.** 12 px floor, AA contrast, visible focus, full keyboard, real text, `prefers-reduced-motion`.

A piece that follows every token but ignores these principles still looks foreign. The principles decide the anatomy; the tokens only decide the values.

## Before you write code

1. **Search what is already installed.** Read the component inventory (the `koten-ui` skill ships one) or the local `components/ui` and `components/patterns` folders. A missing *name* is not a missing *piece*: a `Notice` may already be `Alert`, a `Tag` may be `Badge`, a `Sidebar` may be a composition of `Panel` and `Link`.
2. **Prefer composition to creation.** If the need is a variation, compose existing primitives with props and `className`. Only create a file when the anatomy, behavior or semantics are genuinely new.
3. **Decide where the piece lives.** A single reusable control with its own API is a primitive (`components/ui/<name>.tsx`). A screen region that composes primitives is a block (`components/patterns/<name>.tsx`). Markup used once in a page stays in the page.
4. **Name the meaning, not the look.** `Notice`, `SpecList`, `InlineActions` — not `BlueBox`, `RoundedCard` or `KotenThing`.

If the piece would be useful to every Koten project, say so and propose it upstream instead of forking a private variant.

## The order that prevents rework

### 1. Write the contract

Before markup, write one sentence of purpose and a small table:

- **Semantics** — what it is: `dl` for specs, `table` for records, `nav` for navigation, `section` + heading for a region.
- **States** — default, hover, focus, active, selected, disabled, loading, invalid, empty. Only the ones that exist.
- **Variants** — express meaning (`primary`, `danger`, `sale`), never colors (`blue`, `red`).
- **Content** — every string arrives by prop or provider. The component contains no UI copy.
- **Accessible name and role** — how a screen reader announces it, and which keyboard keys operate it.
- **Non-configurable** — what must stay fixed because changing it would break the grammar: 1 px frames, radii, the 12 px floor, state colors.

Read [references/authoring.md](references/authoring.md) for the full contract worksheet and file template.

### 2. Build the anatomy from frames

The frame is the unit. Start with a `Panel` (border, header, body, footer) or a plain bordered surface, not with a floating card. Rules — not shadows — create hierarchy.

- Borders: **1 px** `border-rule` for decorative frames; **1 px** `border-rule-strong` for controls; a **3 px** `border-s-*` accent only for status; `3px double` (`.rule-double`) to separate major sections.
- Radii: **2 px** (`rounded-sm`) or **3 px** (`rounded-md`). Circles only for avatars and status dots.
- Shadows: only overlays, with `shadow-overlay`. Panels, cards, tables and inputs never cast shadows.
- Density: heights and padding come from `--koten-control-h`, `--koten-row-h`, `--koten-control-px`, `--koten-panel-p` and `--koten-gap`.

### 3. Use roles, never palette names

Components read semantic roles only. The theme maps roles to values; that is what lets the same file work in Chirashi, Daichō, Kanso and Sumi.

| Need | Use |
| --- | --- |
| Page and panel surfaces | `bg-paper`, `bg-surface`, `bg-tint` |
| Primary, secondary and metadata text | `text-ink`, `text-muted`, `text-faint` |
| Frames and control borders | `border-rule`, `border-rule-strong` |
| Action | `bg-primary` + `text-primary-foreground`; `hover:bg-primary-hover` |
| Links and navigation | `text-link` |
| Error text versus destructive fill | `text-danger` versus `bg-danger-solid` + `text-solid-fg` |
| Status text | `text-success`, `text-warning`, `text-info`, `text-sale`, `text-new` |
| Focus and selection | `outline-focus` for a custom ring; `bg-selection` for a selected row |

Never write `bg-shu`, `text-red-600`, `#c23b22`, `text-[13px]`, `rounded-lg`, `shadow-md` or inline styles to “fix” a theme. Read [references/tokens.md](references/tokens.md) for every role, its utility, the contrast contract and the type and density scales.

### 4. Respect contrast as a rule, not a taste

- **4.5:1** for normal text; **3:1** for control borders, focus indicators and large text.
- Text roles (`danger`, `success`, `warning`, `info`, `sale`, `new`) are for text. Solid roles (`*-solid`) are for fills that carry `text-solid-fg`. In Sumi, a text role is light and the matching solid role stays dark; swapping them fails.
- Status is **text + color**, never color alone. A dot is reinforcement, not the message.
- The installed tokens already pass in all four themes. If a combination is not in the contract, verify it before shipping — do not assume.
- Yellow and other matsuri accents are Chirashi-only, at most two per block, and always with dark text.

### 5. Make it operable

- Global focus is `outline: 2px solid var(--koten-focus); outline-offset: 1px`. Do not remove it; if you customize it, keep an equally visible replacement.
- Interactive pieces work with Tab and Shift+Tab, activate with Enter or Space, and expose `aria-expanded`, `aria-controls`, `aria-pressed`, `aria-current` or `aria-selected` as appropriate.
- Overlays need a portal, a title and description, Escape, a focus trap, focus return to the single trigger and no nesting of two modals.
- Composite widgets (menu, tabs, grid, toolbar) use arrow keys and roving tabindex.
- Errors are announced (`aria-live="polite"`), linked with `aria-describedby` and marked with `aria-invalid`.
- `prefers-reduced-motion` is already handled globally; do not add bounce, parallax or scroll-driven animation.

### 6. Keep it translatable and dense

- No UI strings inside the piece. Labels, empty text, counters and actions come from props or the project's Koten provider.
- Dates, currency and numbers use `Intl` formatters, never concatenation or `toFixed`.
- Use logical properties: `text-start`, `ms-*`, `me-*`, `ps-*`, `pe-*`, `border-s-*`, `start-*`, `end-*`.
- Never put a fixed height on text containers; use `min-h-*`, wrapping and `min-w-0`.
- Test ES and EN: both are usually longer than Japanese and will expose clipping.
- 12 px is the floor for visible text. `text-2xs` is 12 px, not 10.

### 7. Verify and stop

Run the checklist in [references/verification.md](references/verification.md): all four themes, three densities, keyboard path, focus, contrast pairs, ES/EN expansion at 1024 px, axe with no `serious` or `critical` findings, and the visual rules (no shadow outside overlays, no radius above 3 px, no text under 12 px).

## Composition with Base UI

When the project already uses Base UI (Koten does), wrap the primitive instead of recreating its behavior. Use its `render` prop for composition — **never `asChild`** — and pass `nativeButton={false}` when a button renders a link. If Base UI has no primitive for the job, use native HTML and document that choice in the component's own comment or README.

```tsx
<Button render={<a href="/orders" />} nativeButton={false}>
  Pedidos
</Button>
```

Do not clone children or inject props implicitly: the consumer passes what the component needs.

## Anti-patterns

- A second button, field, badge or table with the same job and a different name.
- Variants named after colors; variants that combine theme and density (`chirashi-compact-primary`).
- A card with a drop shadow, an 8 px radius or a decorative gradient.
- A pill button; a status communicated only by color; an icon without a label or `aria-label`.
- `outline: none`; `user-select: none` on readable text; a fixed height on a translated label.
- `@apply` in the component; a local `style={{ color: … }}`; an arbitrary value where a token exists.
- Text inside images, a full CJK font download, a 10 px caption.
- Adding a token per component instead of choosing the right role.

## References

- [references/tokens.md](references/tokens.md) — token layers, every role and utility, contrast floors, shape, type, density and themes.
- [references/authoring.md](references/authoring.md) — contract, anatomy, file template, state matrix, accessibility, i18n and a complete worked example.
- [references/verification.md](references/verification.md) — contrast procedure, theme/density/responsive matrix, keyboard scripts and the definition of done.
