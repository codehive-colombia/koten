# Quality checklist

Run this before declaring a Koten UI screen or component done.

## Accessibility

- [ ] Every control has a visible label or an accessible name.
- [ ] `aria-describedby` links help text and errors; `aria-invalid` reaches the control.
- [ ] Keyboard works end to end: Tab, Enter/Space, arrows in composite widgets, Escape in overlays.
- [ ] Focus is visible on every interactive element.
- [ ] Overlays trap focus and return it to the trigger on close.
- [ ] Status is text + color, never color alone.
- [ ] No text below 12 px; contrast is AA.
- [ ] `prefers-reduced-motion` is respected by animations.
- [ ] Icons that do not add meaning are `aria-hidden`; icon-only buttons have a label.
- [ ] No axe `serious` or `critical` findings.

## Internationalization

- [ ] No UI string is hardcoded inside a reusable component.
- [ ] Labels come from props or `KotenProvider`.
- [ ] Dates, currency and numbers use `formatDate`, `formatCurrency` or `formatNumber`.
- [ ] The layout survives ES/EN at 1024 px and mobile; CJK does not clip.
- [ ] Logical properties are used (`text-start`, `ps-*`, `border-s-*`), not physical ones.
- [ ] The theme and density are inherited through `data-theme` and `data-density`.

## Visual grammar

- [ ] Borders are 1 px; radii stay at 3 px or less.
- [ ] No Japanese text, kanji, `jp` labels, Tategaki, Hanko or Pattern in a consumer UI unless the user requested them.
- [ ] No decorative gradients, pill buttons, rounded cards with shadow or floating-card layouts.
- [ ] Color comes from semantic roles (`primary`, `danger`, `sale`, `success`, `link`), not raw palette names.
- [ ] Numbers use `tabular-nums`; prices and totals align to the end.
- [ ] Dense rows use the density tokens (`--koten-row-h`, `--koten-control-h`, `--koten-gap`).
- [ ] Empty, loading, error and disabled states exist where the screen can reach them.

## Code

- [ ] Named exports and `data-slot` are preserved.
- [ ] CVA variants are used instead of branching class strings.
- [ ] `render` is used for composition; `asChild` is absent.
- [ ] No new dependency was added without a decision.
- [ ] Tests cover states, keyboard and ARIA where the behavior is non-trivial.
- [ ] The component page in the catalog is updated when the API changes.
