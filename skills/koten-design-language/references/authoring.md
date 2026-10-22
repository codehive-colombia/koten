# Authoring a new piece

A Koten component is a small, editable file with a stable API. The goal is not to look Japanese; it is to keep the frame, the density, the semantics and the accessibility contract while solving a job the catalog does not cover.

## 1. Choose the smallest piece

| Situation | Build |
| --- | --- |
| A prop, a tone or a composition of an installed component solves it | Nothing new: compose. |
| One reusable control with its own states and API | Primitive in `components/ui/<name>.tsx`. |
| A region that arranges several primitives for a screen | Block in `components/patterns/<name>.tsx`. |
| Markup that appears once in one page | Keep it in the page. |

A new primitive is justified when it has a name, a contract and more than one likely use. A new block is justified when the arrangement repeats across screens. Everything else is page code.

## 2. Write the contract

Fill this before opening the editor. If a row is empty, the piece is not ready.

| Field | Answer |
| --- | --- |
| **Purpose** | One sentence: “Shows the technical specifications of a product as term/value rows.” |
| **Semantics** | Which HTML element and implicit role: `dl`, `table`, `nav`, `section`, `button`, `dialog`. |
| **Content** | What arrives by prop; what is composed as children; what the provider supplies. |
| **Variants** | Meaning only: `tone`, `appearance`, `size`, `layout`. Never a color name. |
| **States** | Which of these exist: default, hover, focus, active, selected, disabled, loading, invalid, empty. |
| **Keyboard** | Tab order, activation keys, arrows, Escape, focus return. |
| **Announcements** | Accessible name, `aria-live`, error text, count changes. |
| **Density** | Which tokens drive height and padding; what happens in the three densities. |
| **Themes** | Any combination that might fail contrast in Sumi. |
| **Non-configurable** | What a prop must not change: border width, radius, type floor, state colors. |

## 3. File template

Use named exports, an exported props type, `data-slot`, the project's `cn()` helper (the same one the installed Koten files import) and CVA only when there are real variants.

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/koten/cn";

export const noticeVariants = cva(
  "flex min-w-0 items-start gap-2 border border-rule bg-surface p-[var(--koten-panel-p)] text-xs",
  {
    variants: {
      tone: {
        neutral: "border-s-[3px] border-s-rule-strong",
        info: "border-s-[3px] border-s-info",
        warning: "border-s-[3px] border-s-warning",
        danger: "border-s-[3px] border-s-danger",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type NoticeProps = ComponentProps<"div"> &
  VariantProps<typeof noticeVariants> & {
    title?: string;
  };

export function Notice({ className, tone, title, children, ...props }: NoticeProps) {
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      data-slot="notice"
      data-tone={tone ?? "neutral"}
      className={cn(noticeVariants({ tone }), className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title ? <p className="font-semibold text-ink">{title}</p> : null}
        {children ? <div className={cn("text-muted", title && "mt-0.5")}>{children}</div> : null}
      </div>
    </div>
  );
}
```

Rules visible in the template:

- `className` is merged last, so a consumer can adjust layout without forking the file.
- `data-slot` marks the root and any internal slot that a test or a consumer may need.
- Variants express meaning; the actual colors live in the theme.
- `role` follows meaning: `alert` for warning and danger, `status` for informational.
- No strings are baked in: `title` and `children` arrive by prop.
- No height, font size, radius or color is hardcoded.

This `Notice` is a shape example, not a recommendation to duplicate an installed `Alert`.

## 4. Anatomy from installed primitives

When the piece is mostly a surface, compose `Panel`. When it is a form control, start from `Field` and keep its label/error wiring. When it is a status, use `Badge` or `Alert` before writing a new tone system. When it is a table, start from `Table`.

```tsx
import { Panel, PanelBody, PanelHeader, PanelTitle } from "@/components/ui/panel";
import {
  DefinitionList,
  DefinitionRow,
  DefinitionTerm,
  DefinitionValue,
} from "@/components/ui/definition-list";

export function SpecPanel({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>{title}</PanelTitle>
      </PanelHeader>
      <PanelBody flush>
        <DefinitionList>
          {items.map((item) => (
            <DefinitionRow key={item.label}>
              <DefinitionTerm>{item.label}</DefinitionTerm>
              <DefinitionValue>{item.value}</DefinitionValue>
            </DefinitionRow>
          ))}
        </DefinitionList>
      </PanelBody>
    </Panel>
  );
}
```

If the composition needs a new visual idea instead of a new arrangement, it is probably a primitive, not a block.

## 5. Worked example: `DefinitionList`

A specification list is a real gap in the shipped set and a good test of the grammar: frames, rules, density, typography and semantics with almost no behavior.

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/koten/cn";

export function DefinitionList({ className, ...props }: ComponentProps<"dl">) {
  return (
    <dl
      data-slot="definition-list"
      className={cn("min-w-0 border-y border-rule bg-surface text-xs text-ink", className)}
      {...props}
    />
  );
}

export function DefinitionRow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="definition-row"
      className={cn(
        "grid min-h-[var(--koten-row-h)] content-center gap-1 border-b border-rule px-[var(--koten-panel-p)] py-1.5 last:border-b-0",
        "sm:grid-cols-[160px_minmax(0,1fr)] sm:items-baseline sm:gap-x-[var(--koten-gap)]",
        className,
      )}
      {...props}
    />
  );
}

export function DefinitionTerm({ className, ...props }: ComponentProps<"dt">) {
  return (
    <dt
      data-slot="definition-term"
      className={cn("min-w-0 text-faint", className)}
      {...props}
    />
  );
}

export function DefinitionValue({ className, ...props }: ComponentProps<"dd">) {
  return (
    <dd
      data-slot="definition-value"
      className={cn("m-0 min-w-0 text-ink tabular-nums", className)}
      {...props}
    />
  );
}
```

Why this is Koten and not a generic list:

- `dl` / `dt` / `dd` carry the meaning; a `div` grid would need extra ARIA.
- Frames are 1 px `rule`, with `border-y` closing the group; no shadow and no radius.
- The row height comes from `--koten-row-h`, and padding from `--koten-panel-p`; compact and comfortable change it without a prop.
- The label column is fixed at 160 px only on `sm` and up, following the same strategy as the horizontal form with a slightly wider column for specs; mobile stacks.
- `text-faint` for terms and `text-ink` for values; both pass AA in every theme.
- `tabular-nums` keeps prices, weights and dates aligned.
- `data-slot` on every part and `className` merged last.

`dl` accepts `div` wrappers around each `dt`/`dd` group in HTML; the semantics stay valid.

Tests, when the project has a test runner:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DefinitionList, DefinitionRow, DefinitionTerm, DefinitionValue } from "./definition-list";

describe("DefinitionList", () => {
  it("exposes terms and definitions", () => {
    render(
      <DefinitionList>
        <DefinitionRow>
          <DefinitionTerm>Weight</DefinitionTerm>
          <DefinitionValue>1.2 kg</DefinitionValue>
        </DefinitionRow>
      </DefinitionList>,
    );

    expect(screen.getByRole("term")).toHaveTextContent("Weight");
    expect(screen.getByRole("definition")).toHaveTextContent("1.2 kg");
  });

  it("keeps the slots and merges className", () => {
    const { container } = render(<DefinitionList className="mt-4" />);
    const root = container.querySelector("[data-slot='definition-list']");

    expect(root).toHaveClass("mt-4");
  });
});
```

## 6. State matrix

Implement only the states the piece has, but decide each one explicitly.

| State | What it means | Implementation |
| --- | --- | --- |
| Default | Resting | Role classes only. |
| Hover | Pointer over an interactive piece | `hover:bg-tint` or `hover:bg-primary-hover`; no movement. |
| Focus | Keyboard focus | Global 2 px ring; do not remove. Add `focus-visible:` only to refine, never to hide. |
| Active / pressed | Pointer down or toggled on | `aria-pressed` or `data-state`; a tint or a stronger border, not a scale animation. |
| Selected | Chosen among many | `bg-selection` plus a check, a border or `aria-selected`. |
| Disabled | Not available | `disabled` + `disabled:opacity-50 disabled:pointer-events-none`; keep the label readable. |
| Loading | Work in progress | `aria-busy`, a spinner with `aria-hidden`, and a label that does not shift the layout. |
| Invalid | Failed validation | `aria-invalid`, `aria-describedby`, error text in `text-danger`; never color alone. |
| Empty | No data | A bordered state with a heading, one sentence and one action. |

Transitions are color and opacity only. No transform on hover, no bounce, no skeleton shimmer invented outside the installed `Skeleton`.

## 7. Accessibility contract

| Family | Minimum |
| --- | --- |
| Control (button, link, input) | Accessible name, visible focus, Enter/Space, disabled state, 32 px target at default density. |
| Form field | Visible label, hint and error linked with `aria-describedby`, `aria-invalid`, error announced politely. |
| Overlay | Portal, title and description, Escape, focus trap, focus return to a single trigger, no nested modals. |
| Menu, tabs, combobox, toolbar | Arrow keys, roving tabindex, `aria-expanded` / `aria-selected` / `aria-controls`, typeahead where expected. |
| Table | Real `table` semantics, `scope` on headers, `caption` when useful, `aria-sort` on sortable columns. |
| Status | Text plus color; `role="status"` for informational, `role="alert"` for error or warning. |
| Icon-only action | `aria-label`; the icon is `aria-hidden`. |

If a behavior already exists in Base UI, wrap it. Reimplementing focus management is how bugs enter a design system.

## 8. Internationalization

- No visible UI string inside the file. Labels, empty messages, counters and action names come from props or the Koten provider.
- Use the provider's `Intl` formatters for dates, currency and numbers. JPY has no decimals by default; EUR and USD have two.
- Logical properties only: `text-start`, `ms-*`, `me-*`, `ps-*`, `pe-*`, `border-s-*`, `start-*`, `end-*`.
- No fixed heights on text. `min-h-*`, wrapping and `min-w-0` on flex/grid children.
- Test with Spanish and English: they are longer than Japanese and expose clipping and orphaned labels.
- Japanese body text needs the taller line height; it is already applied through `:lang(ja)`.

## 9. Review before calling it done

- [ ] The piece does not duplicate an installed primitive or block.
- [ ] Every color, border, radius, shadow, font size, gap and height is a role or a density token.
- [ ] It works in Chirashi, Daichō, Kanso and Sumi; it works in compact, default and comfortable.
- [ ] Text is at least 12 px; numbers are tabular; nothing important is inside an image.
- [ ] Focus is visible; the keyboard path is complete; overlays return focus.
- [ ] Status is text + color; errors are announced and linked.
- [ ] ES and EN fit at 1024 px; mobile stacks without clipping.
- [ ] `data-slot`, named exports and the props type are stable.
- [ ] The file contains no UI strings, no `@apply`, no `asChild`, no inline style.
- [ ] If the piece is generic, it is proposed upstream instead of living as a private fork.
