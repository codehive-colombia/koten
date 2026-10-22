# Verification

A new piece is done when it survives the themes, the densities, the keyboard and a real translation. Rendering is the first ten percent.

## 1. Contrast

Check the actual pairs, not the palette. Text needs **4.5:1**; control borders, focus rings and large text need **3:1**.

Minimum pairs for a new piece:

| Foreground | Background |
| --- | --- |
| `ink` | `paper`, `surface`, `tint` |
| `muted` | `paper`, `surface`, `tint` |
| `faint` | `paper`, `surface`, `tint` |
| `link` | `paper`, `surface` |
| `danger`, `success`, `warning`, `info`, `sale`, `new` | The surface they sit on |
| `primary-foreground` | `primary`, `primary-hover` |
| `solid-fg` | Every `*-solid` fill used |
| `border-strong` (as a control border) | `paper`, `surface` |
| Focus ring | The surface around the control |

Procedure:

1. For each theme, inspect the computed `color` and `background-color` of the real element.
2. If a background is translucent, composite it over its parent before measuring.
3. Compare the pair. Record the ratio when it is close to the floor.
4. If the piece is only readable in Kanso, it is not done.

A small calculator for opaque hex colors, runnable in the browser console or in a script:

```js
const rgb = (hex) => hex.replace("#", "").match(/../g).map((p) => parseInt(p, 16));
const channel = (v) => {
  const n = v / 255;
  return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
};
const lum = (hex) => {
  const [r, g, b] = rgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

contrast("#f5f0e4", "#1c1a17"); // 15.27:1 — paper vs ink
```

Never “fix” a ratio with an inline color, an opacity or a filter. Use the correct role, or add a role through the process in [tokens.md](tokens.md#extending-tokens-locally).

## 2. Themes and densities

| Sweep | Minimum |
| --- | --- |
| Themes | Chirashi, Daichō, Kanso, Sumi at default density. |
| Densities | Compact and comfortable at 1024 px, default as the reference. |
| Widths | 1440, 1024 and 390 px; 1280 is the main desktop stage. |
| Language | The default locale plus ES and EN; JA for line height and wrapping. |

- The structure must not change between themes. If a border disappears, a fill becomes unreadable or a component needs a conditional class, the component is wrong.
- Compact must still leave a usable target; comfortable must not break the grid.
- Check Sumi with a real dark background, not a forced `filter: invert`.
- A fixed-width label column is fine on desktop only if it stacks before it clips.

## 3. Keyboard

Test with the keyboard alone, from the page start, without touching the pointer.

| Widget | Script |
| --- | --- |
| Button or link | Tab reaches it; Enter activates; focus ring is visible. |
| Input, select, textarea | Tab enters and leaves; label is announced; error is linked. |
| Checkbox, radio, switch | Space toggles; arrows move inside a radio group; state is announced. |
| Menu, popover, combobox | Enter/ArrowDown opens; arrows move; Escape closes and returns focus. |
| Tabs | Arrows move between tabs; Home/End reach the ends; the panel is reachable. |
| Dialog, drawer | Focus moves inside; Tab cycles; Escape closes; focus returns to the trigger. |
| Table with selection | Checkbox reachable; header actions reachable; count is announced. |
| Toolbar | Arrows move; separators are skipped; one tab stop for the group. |

Also check:

- The focus ring is not clipped by `overflow: hidden`.
- There is no focusable element with `aria-hidden="true"` around it.
- Nothing depends on hover to be discoverable.
- `prefers-reduced-motion: reduce` leaves no essential animation.

## 4. Automated checks

- Run the project's typecheck, linter and tests. A component without a test is acceptable only when the project has no test setup; the manual checks above are not optional.
- Run axe (browser extension, Playwright or Testing Library) on the page that uses the piece. No `serious` or `critical` findings.
- Axe does not prove keyboard behavior, focus order, focus return, translation fit or visual hierarchy. Check those by hand.

## 5. Visual review

- [ ] The hierarchy is readable in three seconds: title, body, action.
- [ ] Frames are 1 px and visible; major sections use a double rule, not a shadow.
- [ ] Radii are 2–3 px; there are no pills except a status dot or avatar.
- [ ] No shadow outside an overlay; no gradient, blur or decorative texture.
- [ ] The primary color appears once per region; state colors carry text.
- [ ] Text is at least 12 px; metadata uses `faint`, not a smaller size.
- [ ] Numbers are tabular and aligned to the end.
- [ ] Icons have a function and a label; no colored icon without meaning.
- [ ] Dense content breathes through rules and spacing, not through empty cards.
- [ ] It looks like the same system as the installed components, not a collage.

## 6. When to stop and escalate

Stop and change the approach when:

- **A role is missing.** Do not hardcode. Add a semantic role through the token process and verify all four themes.
- **A behavior exists in Base UI.** Wrap it instead of reimplementing focus, positioning or typeahead.
- **The piece needs a structure that changes per theme.** The piece is over-specified; split it or compose existing primitives.
- **The piece would serve every project.** Propose it upstream; do not fork a private `KotenCard`.
- **The fix is a new dependency.** A date picker, chart, table or icon set is a decision, not a detail. Prefer native HTML and the installed set.

## 7. Definition of done

- [ ] Purpose, semantics and states are written and match the implementation.
- [ ] The public API is named exports plus an exported props type; `data-slot` is present.
- [ ] Every visual value comes from a role or a density token.
- [ ] All four themes and three densities render without structural changes.
- [ ] Contrast: 4.5:1 text, 3:1 control borders and focus, in every theme.
- [ ] Full keyboard path, visible focus, correct ARIA, focus return where relevant.
- [ ] ES and EN fit at 1024 px; mobile stacks at 390 px; JA line height is correct.
- [ ] No UI strings, no inline colors, no `@apply`, no `asChild`, no text in images.
- [ ] axe has no `serious` or `critical` findings on the page that uses it.
- [ ] A test covers the semantics and the slots when the project has tests.
