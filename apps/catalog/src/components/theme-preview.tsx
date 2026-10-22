import {
  Alert,
  Badge,
  Button,
  Field,
  Input,
  Panel,
  PanelBody,
  PanelHeader,
  PanelTitle,
  Pattern,
} from "@koten/ui";
import type { CSSProperties } from "react";
import type { DesignerTheme } from "../lib/theme-designer";

type PreviewTone = "neutral" | "info" | "success" | "warning" | "danger";

export type PreviewLabels = {
  preview: string;
  product: string;
  new: string;
  productMeta: string;
  productName: string;
  productCopy: string;
  price: string;
  lowStock: string;
  add: string;
  details: string;
  specs: string;
  orders: string;
  today: string;
  order: string;
  client: string;
  status: string;
  orderRows: readonly { id: string; client: string; status: string; tone: PreviewTone }[];
  contact: string;
  email: string;
  emailHint: string;
  save: string;
  saved: string;
  savedBody: string;
};

export function ThemePreview({
  theme,
  name,
  labels,
}: {
  theme: DesignerTheme;
  name: string;
  labels: PreviewLabels;
}) {
  return (
    <div
      data-slot="theme-preview"
      data-density={theme.config.density}
      style={
        {
          ...theme.vars,
          colorScheme: theme.dark ? "dark" : "light",
        } as CSSProperties
      }
      className="min-w-0 border border-rule bg-paper text-ink"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5">
        <span className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
          {labels.preview}
        </span>
        <span className="font-mono text-2xs text-muted">{name}</span>
      </div>

      <div className="grid grid-cols-1 gap-[var(--koten-gap)] p-[var(--koten-panel-p)]">
        <Panel>
          <PanelHeader>
            <PanelTitle as="h3">{labels.product}</PanelTitle>
            <Badge tone="new" appearance="soft">
              {labels.new}
            </Badge>
          </PanelHeader>
          <PanelBody className="space-y-3">
            <Pattern
              variant="seigaiha"
              className="h-14 overflow-hidden border border-rule bg-tint"
            />
            <div>
              <p className="text-2xs uppercase tracking-[0.12em] text-faint">
                {labels.productMeta}
              </p>
              <p className="mt-0.5 font-serif text-xl leading-tight">{labels.productName}</p>
              <p className="mt-1 text-2xs leading-relaxed text-muted">{labels.productCopy}</p>
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg font-semibold tabular-nums">{labels.price}</span>
              <Badge tone="warning" appearance="outline">
                {labels.lowStock}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button variant="primary" size="sm">
                {labels.add}
              </Button>
              <Button variant="secondary" size="sm">
                {labels.details}
              </Button>
            </div>
            <p className="text-2xs">
              <a href="#theme-vista" className="text-link underline underline-offset-2">
                {labels.specs}
              </a>
            </p>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader>
            <PanelTitle as="h3">{labels.orders}</PanelTitle>
            <span className="text-2xs text-faint">{labels.today}</span>
          </PanelHeader>
          <PanelBody flush className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">{labels.orders}</caption>
              <thead>
                <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                  <th scope="col" className="px-[var(--koten-control-px)] text-start font-semibold">
                    {labels.order}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-start font-semibold">
                    {labels.client}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-start font-semibold">
                    {labels.status}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {labels.orderRows.map((row) => (
                  <tr key={row.id} className="h-[var(--koten-row-h)]">
                    <th
                      scope="row"
                      className="px-[var(--koten-control-px)] font-mono text-2xs font-normal text-muted"
                    >
                      {row.id}
                    </th>
                    <td className="px-[var(--koten-control-px)] text-xs">{row.client}</td>
                    <td className="px-[var(--koten-control-px)]">
                      <Badge tone={row.tone} appearance="soft" dot>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelBody>
        </Panel>
      </div>

      <div className="border-t border-rule bg-surface p-[var(--koten-panel-p)]">
        <div className="grid gap-[var(--koten-gap)] md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
              {labels.contact}
            </p>
            <Field label={labels.email} description={labels.emailHint}>
              <Input type="email" defaultValue="kura@example.com" />
            </Field>
          </div>
          <Button variant="primary">{labels.save}</Button>
        </div>
        <Alert tone="success" title={labels.saved} className="mt-[var(--koten-gap)]">
          {labels.savedBody}
        </Alert>
      </div>
    </div>
  );
}
