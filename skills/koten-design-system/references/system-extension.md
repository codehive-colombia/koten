# Extending tokens, themes and densities

Tokens are the contract between the theme and the components. Change them in one place; never patch a component to fix a theme.

## Two layers

1. **Primitive values** (`--koten-kinari`, `--koten-ai`, `--koten-shu`, …). Raw palette. Components must not use them directly.
2. **Semantic roles** (`--koten-bg`, `--koten-fg`, `--koten-primary`, `--koten-danger`, …). Components read only these.

Tailwind exposes the roles as utilities in `@theme inline` (`bg-paper`, `text-ink`, `border-rule`, `bg-primary`, `text-danger`). The default palette is reset with `--color-*: initial`; a new role must be added to both places.

## Adding a role

1. Prove the need: it is used by more than one component, or a theme cannot express a state with the current roles.
2. Add the primitive value if it does not exist.
3. Add the semantic role in `:root` with a value that works in Chirashi, Daichō and Kanso.
4. Override it in `[data-theme="sumi"]` when dark needs a different value. If it carries text on a solid fill, add a matching `*-solid` or `*-fg` role.
5. Add the Tailwind mapping in `@theme inline`.
6. Check contrast for every theme; run the token contrast test.
7. Document the role in the catalog (`/tokens/color`).

Never add a “temporary” role that only exists for one component. If only one component needs it, the component is probably over-specified.

## Adding a theme

A theme is a set of role overrides over the same structure. It is not a new component set.

```css
[data-theme="my-theme"] {
  --koten-primary: var(--koten-ai);
  --koten-primary-hover: var(--koten-ai-hover);
  --koten-primary-strong: #142a44;
  --koten-primary-fg: #ffffff;
  --koten-danger: var(--koten-shu);
  --koten-danger-strong: #8f2815;
  --koten-focus: var(--koten-ai);
  --koten-selection: var(--koten-ai-tint);
}
```

Rules:

- The same component must render in every theme without structural changes.
- Text and state roles must pass AA on their backgrounds.
- Do not put layout or spacing in a theme; that is density.
- Dark themes separate readable text (`danger`, `success`) from solid fills (`danger-solid`, `success-solid`).
- Add the theme to the theme toggle, the catalog specimens and the token contrast tests.

## Adding a density

Density is a set of values, not a variant per component.

```css
[data-density="compact"] {
  --koten-row-h: 28px;
  --koten-control-h: 28px;
  --koten-control-px: 8px;
  --koten-panel-p: 10px;
  --koten-gap: 8px;
}

[data-density="comfortable"] {
  --koten-row-h: 36px;
  --koten-control-h: 38px;
  --koten-control-px: 14px;
  --koten-panel-p: 16px;
  --koten-gap: 16px;
}
```

- Components consume `--koten-row-h`, `--koten-control-h`, `--koten-control-px`, `--koten-panel-p` and `--koten-gap`. They do not read a density name.
- New density values must keep the 12 px text floor and usable touch targets.
- Test the three densities at 1440, 1024 and 390 px.

## Starting a new system with the Koten approach

1. **Write the thesis.** One sentence about what the system optimizes (for Koten: simplicity of means, density of information).
2. **Choose the registers.** Do not create a register per screen. Koten uses three plus dark mode.
3. **Set the token layers.** Primitive palette → semantic roles → Tailwind mapping. Lock the default palette.
4. **Fix the type scale and the floor.** 12 px minimum. System fonts unless a subset is justified.
5. **Define density.** Row height, control height, padding and gap as tokens.
6. **Set the frame rules.** 1 px borders, 2–3 px radii, shadows only for overlays, rules for hierarchy.
7. **Build a specimen** with real content: color, type, spacing, shape, density, themes and format. If the specimen does not convince, the tokens are not ready.
8. **Build primitives**, then blocks, then screens. Never the reverse.
9. **Add the a11y contract** to every component: name, role, keyboard, focus, announcements, reduced motion.
10. **Document the grammar** and the anti-patterns in the repository; generate the agent layer from the catalog.

If a decision is not written down, it will be re-litigated in the next component. Record the rule and the alternative that was rejected.

## Anti-patterns

- A component reading a primitive value (`var(--koten-shu)`) instead of a role.
- A theme that changes structure, border widths or layout.
- A density implemented with component variants.
- A one-off `style` attribute to fix contrast.
- Adding `--color-*: initial` in a consumer project that already has mappings; Koten sends compatibility aliases instead.
- Copying the Koten palette into a new system without copying the grammar: the result is a skin, not a system.
