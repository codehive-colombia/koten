# Tokens, frames and contrast

Tokens are the contract between the theme and the components. A component that reads a primitive value instead of a role is a component that only works in one theme.

## Two layers

1. **Primitive values** — raw palette: `--koten-kinari`, `--koten-ai`, `--koten-shu`, `--koten-kin`, `--koten-matcha`, `--koten-sumi`, the matsuri accents. They exist to feed roles. Components must not use them.
2. **Semantic roles** — what a component reads: `--koten-bg`, `--koten-fg`, `--koten-primary`, `--koten-danger`, `--koten-border`, the density and type tokens. The installed theme maps these roles to Tailwind utilities.

```tsx
// Correct: the role survives a theme change.
<div className="border border-rule bg-surface text-ink" />

// Wrong: the palette name locks the piece to one look.
<div className="border border-[#d6cdbb] bg-[#fffdf7] text-[#1c1a17]" />
```

The default Tailwind palette, radius scale, shadow scale, type scale and font family are locked by the theme. If `bg-blue-500`, `rounded-xl` or `text-5xl` appear, the theme was not installed correctly or the class is not valid Koten.

## Color roles

The palette translates paper, ink, seals and commerce ink. These are the characters behind the roles; the hex values belong to the theme, not to a component.

| Name | Character | Where it leads |
| --- | --- | --- |
| `kinari` | Warm paper | Page background. |
| `ai` | Indigo | Navigation, links and the primary of Daichō and Kanso. |
| `shu` | Vermilion | Price, urgency and the primary of Chirashi. |
| `kin` | Deep ochre | Warning and seals. |
| `matcha` | Muted green | Success and stock. |
| `sumi` | Ink black | Inverse bands and dark mode. |

| Role | Utility | Use |
| --- | --- | --- |
| `--koten-bg` | `paper` | Page background. |
| `--koten-bg-raised` | `surface` | Panels, cards, table bodies. |
| `--koten-bg-tint` | `tint` | Panel headers, zebra rows, soft fills, hover on neutral controls. |
| `--koten-fg` | `ink` | Primary text. |
| `--koten-fg-muted` | `muted` | Secondary text, descriptions. |
| `--koten-fg-faint` | `faint` | Metadata that still passes AA (captions, hints). |
| `--koten-border` | `rule` | Decorative borders and rules. |
| `--koten-border-strong` | `rule-strong` | Control borders (≥ 3:1) and strong rules. |
| `--koten-primary` | `primary` | Main action, selected state. |
| `--koten-primary-hover` | `primary-hover` | Hover of a primary fill. |
| `--koten-primary-strong` | `primary-strong` | Primary text on tinted backgrounds, strong borders. |
| `--koten-primary-fg` | `primary-foreground` | Text on `bg-primary`. |
| `--koten-link` | `link` | Links and navigation text. |
| `--koten-danger` | `danger` | Error and destructive **text**. |
| `--koten-danger-strong` | `danger-strong` | Stronger danger text/border on tint. |
| `--koten-danger-solid` | `danger-solid` | Destructive **fill**. |
| `--koten-danger-solid-hover` | `danger-solid-hover` | Hover of a destructive fill. |
| `--koten-success` | `success` | Success and stock **text**. |
| `--koten-warning` | `warning` | Warning and pending **text**. |
| `--koten-info` | `info` | Informational **text**. |
| `--koten-sale` | `sale` | Price, discount, urgency **text**. |
| `--koten-new` | `new` | New badge and novelty **text**. |
| `--koten-neutral-solid` | `neutral-solid` | Solid neutral fill. |
| `--koten-success-solid` | `success-solid` | Solid success fill. |
| `--koten-warning-solid` | `warning-solid` | Solid warning fill. |
| `--koten-info-solid` | `info-solid` | Solid informational fill. |
| `--koten-sale-solid` | `sale-solid` | Solid sale fill. |
| `--koten-new-solid` | `new-solid` | Solid novelty fill. |
| `--koten-solid-fg` | `solid-fg` | Text on any `*-solid` fill. |
| `--koten-focus` | `focus` | Focus ring (`outline-focus`). |
| `--koten-selection` | `selection` | Selected row or text selection background. |
| `--koten-inverse-bg` | `inverse` | Inverted band (footer, strong callout). |
| `--koten-inverse-fg` | `inverse-fg` | Text on the inverse band. |

The palette utilities (`ai`, `shu`, `kin`, `matcha`, `sumi`, `accent-*`) are mapped for the theme and documentation only. A component that uses them stops responding to the theme.

### Choosing a role

| The piece needs to… | Use |
| --- | --- |
| Fill the page / a panel / a header | `bg-paper` / `bg-surface` / `bg-tint` |
| Separate content | `border-rule`; `border-rule-strong` for controls and major rules |
| Show the main action | `bg-primary text-primary-foreground border-primary-strong` |
| Show a secondary action | `bg-surface text-ink border-rule-strong` |
| Look quiet or inline | `border-transparent bg-transparent text-ink` + hover `bg-tint` |
| Navigate | `text-link` + underline |
| Destroy or block | Fill `bg-danger-solid text-solid-fg`; text and icon `text-danger` |
| Signal stock, error, pending, price, novelty | `text-success` / `text-danger` / `text-warning` / `text-sale` / `text-new` |
| Mark a selected row | `bg-selection` (plus a visible check or `aria-selected`) |
| Sit on a dark band | `bg-inverse text-inverse-fg` |

Rules of thumb:

- **One primary action per region.** Two `bg-primary` buttons compete.
- **State is text + color.** A dot, a bar or an icon reinforces; it never carries the meaning alone.
- **Do not fill with a text role.** `bg-danger` with white text fails in Sumi. The solid roles exist for that.
- **Do not use a solid role for text.** `text-danger-solid` is unreadable in dark themes.
- Matsuri accents are Chirashi-only, at most two per block, and yellow always pairs with dark text.

## Contrast contract

The shipped roles are tested in all four themes. Keep these floors when you combine them:

| Pair | Minimum |
| --- | --- |
| `fg` on `bg`, `bg-raised` | 4.5:1 |
| `fg-muted` on `bg`, `bg-raised` | 4.5:1 |
| `fg-faint` on `bg`, `bg-raised`, `bg-tint` | 4.5:1 |
| `link`, `success`, `warning`, `danger`, `sale`, `new` on surfaces | 4.5:1 |
| `primary-fg` on `primary` | 4.5:1 |
| `solid-fg` on every `*-solid` | 4.5:1 |
| `inverse-fg` on `inverse-bg` | 4.5:1 |
| `border-strong` on `bg`, `bg-raised` | 3:1 |
| Focus ring against its surroundings | 3:1 |

Large text still needs 3:1, but Koten has almost no large text; assume 4.5:1. A border that is decorative may be lighter than 3:1; a border that defines a control may not. Disabled controls are exempt from contrast but must still be recognizable as disabled and must not be the only path to information.

When a combination is not in this table, measure it. Do not infer contrast from how it looks on your monitor, and do not add `style={{ color: … }}` to make one instance pass.

## Typography

| Token | Utility | Size | Use |
| --- | --- | --- | --- |
| `--koten-text-2xs` | `text-2xs` | 12 px | Micro-metadata, counters, notes. The floor. |
| `--koten-text-xs` | `text-xs` | 12 px | Table headers, captions, labels. |
| `--koten-text-sm` | `text-sm` | 13 px | Body, cells, buttons. |
| `--koten-text-base` | `text-base` | 14 px | ERP body and reading. |
| `--koten-text-lg` | `text-lg` | 16 px | Section title. |
| `--koten-text-xl` | `text-xl` | 20 px | Page title. |
| `--koten-text-2xl` | `text-2xl` | 24 px | Product title. |
| `--koten-text-3xl` | `text-3xl` | 30 px | Editorial headline. |
| `--koten-text-4xl` | `text-4xl` | 38 px | Masthead. |

- Families: `font-sans`, `font-serif` (mincho, editorial headlines only), `font-mono` (IDs, codes).
- Line height: 1.7–1.75 for Japanese, 1.5–1.6 for Latin body, 1.2–1.3 for headlines.
- `tabular-nums` for prices, quantities, dates and every numeric table column.
- Hierarchy comes from size, weight, color, rules and position — not from uppercase. Japanese has no capitalization.
- No text below 12 px. `text-2xs` is 12 px; never add `text-[10px]`.
- No full CJK font download. Use the system stack; subset a display face only with a documented reason.

## Shape, depth and motion

- **Borders:** 1 px is the default. `border-rule` for frames, `border-rule-strong` for controls, `border-s-[3px] border-s-*` for a status accent, `.rule-double` (3 px double) to separate major sections, 1 px dashed for secondary lists.
- **Radii:** `rounded-sm` = 2 px, `rounded-md` = 3 px. Nothing larger except a circular avatar or status dot. No pill buttons.
- **Shadows:** only `shadow-overlay` on overlays (menu, popover, dialog, drawer, tooltip). Panels, cards, tables, inputs and buttons never have a shadow. No gradients, no blur, no glass.
- **Images:** 1 px border, 2 px radius, no masks or blobs.
- **Motion:** color and opacity transitions around 120 ms; overlay 160 ms; drawer 200 ms. No bounce, parallax or scroll-driven animation. The base layer already honors `prefers-reduced-motion`.

## Density

Components never receive a `density` prop. They read variables set by `data-density` on the root:

| Token | Compact | Default | Comfortable | Use |
| --- | --- | --- | --- | --- |
| `--koten-row-h` | 28 px | 32 px | 36 px | Table and list rows. |
| `--koten-control-h` | 28 px | 32 px | 38 px | Buttons, inputs, selects. |
| `--koten-control-px` | 8 px | 10 px | 14 px | Horizontal control padding. |
| `--koten-panel-p` | 10 px | 12 px | 16 px | Panel and section padding. |
| `--koten-gap` | 8 px | 12 px | 16 px | Gaps inside a region. |

Use `h-[var(--koten-control-h)]`, `px-[var(--koten-control-px)]`, `p-[var(--koten-panel-p)]`, `gap-[var(--koten-gap)]` and `min-h-[var(--koten-row-h)]`. Do not hardcode 32 px because it happens to look right in the default density.

The spacing scale is 2/4/6/8/10/12/16/20/24/32/40/48/64. Section separation is 24–32 px; page padding comes from `--koten-page-px`.

## Themes

Themes change values, never structure. A component must render in all four without a conditional class:

| Theme | Attribute | Character |
| --- | --- | --- |
| Chirashi | `data-theme="chirashi"` | Commerce; primary `shu`; matsuri accents allowed in bounded surfaces. |
| Daichō | `data-theme="daicho"` | Back office and tables; primary `ai`; `shu` reserved for danger. |
| Kanso | `data-theme="kanso"` | Reading and documentation; primary `ai`; minimal accents. |
| Sumi | `data-theme="sumi"` | Dark mode of any register; lighter text roles, dark solid fills. |

- Never read the theme name in a component. If a piece needs a different structure per theme, the piece is wrong.
- In Sumi, `danger`, `success`, `warning`, `info`, `sale` and `new` are light text colors; `danger-solid` and friends remain dark fills with `solid-fg`. Do not mix the two families.
- The same file must work at `data-density="compact|default|comfortable"`. Test the extremes.

## Extending tokens locally

In a consumer project, the token contract is copied, not imported. Extend it carefully:

1. **Prove the need.** A new role must serve more than one component or express a state no current role can. If only one component needs it, the component is over-specified.
2. **Add it next to the Koten tokens**, with the `--koten-` prefix, in the same file the theme installed. Add the primitive value only if it does not exist.
3. **Map the utility** in the same `@theme inline` block the theme uses, so the class exists.
4. **Override it for Sumi** when dark needs a different value. If it carries text on a solid fill, add a matching `*-solid` or `*-fg` role.
5. **Verify the same pairs** (4.5:1 text, 3:1 control borders) in every theme.
6. **Never rename or repurpose an existing role.** Other components depend on it.

A local `style` attribute, a component-specific `--my-widget-color`, or a one-off class that bypasses the theme is not a token extension.

## Anti-patterns

- `bg-shu`, `text-red-600`, `#c23b22`, `rgb(...)` inside a component.
- `bg-danger` with white text, or `text-danger-solid` on paper.
- `rounded-xl`, `shadow-lg`, a gradient on a button, a backdrop blur.
- A fixed 32 px height, a fixed 10 px font size, a physical `pl-*`/`mr-*` where a logical property applies.
- `outline: none`; a focus style that is only a color change.
- A new token per component; changing an existing role to make one screen look right.
- A theme class such as `chirashi:bg-shu` inside a component.
