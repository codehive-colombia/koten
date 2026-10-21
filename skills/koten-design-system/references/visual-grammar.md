# Koten visual grammar

The reference is the classical Japanese web: dense information, visible structure, low-cost classicism. It is not a decoration pack.

## Registers

| Register | Use | Density | Color | Type |
| --- | --- | --- | --- | --- |
| **Chirashi** (チラシ) | Commerce, campaigns, storefront. | High; rows 28–32 px. | Primary `shu`; matsuri accents in bounded surfaces. | Gothic + mincho for headlines. |
| **Daichō** (台帳) | ERP, back office, tables. | Compact; rows 28 px. | Primary `ai`; `shu` only for danger. | Gothic; mincho exceptional. |
| **Kanso** (簡素) | Catalog, docs, reading. | Medium; rows 32–36 px. | Primary `ai`; minimal accents. | Gothic + editorial mincho. |
| **Sumi** (墨) | Dark mode of any register. | Same as the register. | Inverted paper/ink; lighter primary; `*-solid` for state. | Same. |

Themes change values, never structure. A component must work in all four.

## Principles

1. **The frame is the unit.** Panel, header, border, rule. Pages read like a newspaper or a chirashi, not a stack of floating cards.
2. **Density with rhythm.** Use 4/8/12/16 spacing; not everything is a card. Space is intentional, not empty.
3. **Color signals, it does not decorate.** Primary for action; `ai` for links and navigation; `shu` for price and urgency; `matcha`/`kin` for state.
4. **System fonts are a decision.** They give speed and CJK coverage without megabyte downloads.
5. **Classic is not retro.** Keep the clarity of the frame and the information; do not imitate 1998.
6. **Real text, always.** No critical text in images. Accessibility and translation are non-negotiable.
7. **Hierarchy without capitals.** Japanese has no capitalization; use size, weight, color, border and position.
8. **Minimal motion.** Color transitions and overlays; no bounce, no scroll-driven animation.
9. **Desktop first, mobile legible.** 1280 is the main stage; 1024 is the serious minimum; mobile must not break.
10. **Accessible by default.** 12 px floor, AA contrast, visible focus, full keyboard, `prefers-reduced-motion`.

## Color

### Roles, not palette names

Components use semantic roles. The theme maps roles to primitive values.

| Role | Meaning |
| --- | --- |
| `--koten-bg` | Page paper. |
| `--koten-bg-raised` | Panel/card surface. |
| `--koten-bg-tint` | Panel headers, zebra rows, soft fills. |
| `--koten-fg` | Primary text. |
| `--koten-fg-muted` | Secondary text. |
| `--koten-fg-faint` | Metadata that still passes AA. |
| `--koten-border` | Decorative rules and borders. |
| `--koten-border-strong` | Control borders (≥ 3:1) and strong rules. |
| `--koten-primary` | Main action and selected state. |
| `--koten-primary-strong` | Primary text on tinted backgrounds. |
| `--koten-link` | Links and navigational text. |
| `--koten-danger` | Error and destructive text. |
| `--koten-danger-solid` | Destructive solid fill. |
| `--koten-success` | Success and stock. |
| `--koten-warning` | Warning and pending. |
| `--koten-info` | Informational state. |
| `--koten-sale` | Price, discount, urgency. |
| `--koten-new` | New badge and novelty. |
| `--koten-focus` | Focus ring. |
| `--koten-selection` | Selected row/background. |
| `--koten-solid-fg` | Text on solid state fills. |

### Rules

- `bg-primary`, not `bg-shu`. `text-danger`, not `text-red-600`.
- Maximum two matsuri accents per block. Yellow always with dark text.
- Status is text + color, never color alone.
- Every new role must work in Chirashi, Daichō, Kanso and Sumi, and pass AA where it carries text.
- Dark mode separates solid state fills (`*-solid`) from readable text (`danger`, `success`).

## Typography

Families:

```css
--koten-font-sans:
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic",
  "YuGothic", Meiryo, "Noto Sans JP", system-ui, sans-serif;
--koten-font-serif: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", Georgia, serif;
--koten-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
```

Scale:

| Token | Size | Use |
| --- | --- | --- |
| `--koten-text-2xs` | 12 px | Notes, counters, micro-metadata. The floor. |
| `--koten-text-xs` | 12 px | Metadata, table headers, captions. |
| `--koten-text-sm` | 13 px | Body, cells, buttons. |
| `--koten-text-base` | 14 px | ERP body and reading. |
| `--koten-text-lg` | 16 px | Section title. |
| `--koten-text-xl` | 20 px | Page title. |
| `--koten-text-2xl` | 24 px | Product title. |
| `--koten-text-3xl` | 30 px | Editorial headline. |
| `--koten-text-4xl` | 38 px | Masthead. |

Rules:

- Never below 12 px for visible text.
- Use `tabular-nums` for prices, quantities, dates and tables.
- Line height 1.6–1.7 for Japanese; 1.4–1.6 for Latin; 1.2–1.3 for headlines.
- Mincho is for editorial headlines, not body UI.
- No full CJK font files. If a display face is unavoidable, subset it and document the source.

## Spacing, shape and motion

- Scale: 4/8/12/16; layout tokens `--koten-gap`, `--koten-panel-p`, `--koten-control-px`.
- Row height comes from `--koten-row-h`; control height from `--koten-control-h`.
- Borders are 1 px. Radii are 2–3 px. No pill buttons.
- Shadows only for overlays (`--koten-shadow-overlay`), never for cards.
- Layout widths: classic 990 px, default 1200 px, wide 1440 px.
- Transitions change color and opacity; no bounce or long easing.
- Respect `prefers-reduced-motion`.

## Do / Don't

### Do

- Panels with a 1 px border and a header.
- Double rules to separate major sections.
- Real dates, prices, tax, stock and warranty.
- Tabular numbers aligned to the end.
- Mincho for editorial headlines.
- `shu` for price/urgency, `ai` for links/navigation.
- Badges with text, not color alone.
- Test ES/EN and the keyboard path.
- Let dense content breathe through rules and hierarchy.

### Don't

- Rounded cards with drop shadows.
- Pill buttons.
- Decorative gradients.
- 10 px text.
- Text inside images.
- Infinite carousels.
- Colored icons without function.
- Cherry blossoms, torii, brush strokes or “zen” as stickers.
- Hiding information behind “Learn more” by default.
- Copying clutter without hierarchy.
