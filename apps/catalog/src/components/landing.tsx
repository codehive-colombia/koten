import {
  Badge,
  cn,
  Link as KotenLink,
  Panel,
  PanelActions,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  PriceBlock,
  Sparkline,
  StatCard,
  StatusBadge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useKotenFormatters,
} from "@koten/ui";
import type { ReactNode } from "react";
import { Link } from "react-router";

export type SystemPlateCopy = {
  label: string;
  badge: string;
  caption: string;
  orderTitle: string;
  status: string;
  customer: string;
  customerName: string;
  item: string;
  amount: string;
  itemOne: string;
  itemOneMeta: string;
  itemTwo: string;
  itemTwoMeta: string;
  shipping: string;
  shippingValue: string;
  total: string;
  patternLink: string;
  productLabel: string;
  tax: string;
  points: string;
  stock: string;
  productNote: string;
  statLabel: string;
  statDelta: string;
  statMeta: string;
};

/**
 * Landing hero plate: a live order composed from documented primitives and
 * patterns. It is data, not a screenshot, so it follows theme and density.
 */
export function SystemPlate({ copy }: { copy: SystemPlateCopy }) {
  const formatters = useKotenFormatters();
  const orderTotal = 128000 + 32400;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-2xs font-semibold text-faint">{copy.label}</p>
        <Badge tone="success" dot>
          {copy.badge}
        </Badge>
      </div>

      <Panel className="mt-2">
        <PanelHeader>
          <PanelTitle as="h3">{copy.orderTitle}</PanelTitle>
          <PanelActions>
            <StatusBadge status="preparing" label={copy.status} />
          </PanelActions>
        </PanelHeader>
        <PanelBody className="space-y-2">
          <div className="flex items-baseline justify-between gap-2 text-2xs">
            <span className="text-faint">{copy.customer}</span>
            <span className="text-end">{copy.customerName}</span>
          </div>

          <Table
            className="min-w-0"
            containerClassName="border-x-0"
            containerProps={{ tabIndex: -1 }}
          >
            <TableCaption>{copy.orderTitle}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.item}</TableHead>
                <TableHead className="text-end">{copy.amount}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="block text-xs font-semibold">{copy.itemOne}</span>
                  <span className="block text-2xs text-faint">{copy.itemOneMeta}</span>
                </TableCell>
                <TableCell className="text-end tabular-nums">
                  {formatters.formatCurrency(128000)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="block text-xs font-semibold">{copy.itemTwo}</span>
                  <span className="block text-2xs text-faint">{copy.itemTwoMeta}</span>
                </TableCell>
                <TableCell className="text-end tabular-nums">
                  {formatters.formatCurrency(32400)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex items-baseline justify-between gap-2 text-2xs">
            <span className="text-faint">{copy.shipping}</span>
            <span>{copy.shippingValue}</span>
          </div>
          <div className="flex items-baseline justify-between gap-2 border-t border-rule pt-2">
            <span className="text-xs font-semibold">{copy.total}</span>
            <span className="font-serif text-xl font-semibold tabular-nums text-primary">
              {formatters.formatCurrency(orderTotal)}
            </span>
          </div>
        </PanelBody>
        <PanelFooter className="justify-start">
          <Link
            to="/patterns/erp"
            className="text-2xs font-semibold text-link underline-offset-2 hover:underline"
          >
            {copy.patternLink} →
          </Link>
        </PanelFooter>
      </Panel>

      <div className="mt-[var(--koten-gap)] grid grid-cols-2 gap-[var(--koten-gap)]">
        <div className="min-w-0 border border-rule bg-surface p-[var(--koten-panel-p)]">
          <p className="text-2xs font-semibold text-faint">{copy.productLabel}</p>
          <PriceBlock
            className="mt-1"
            size="md"
            price={formatters.formatCurrency(128000)}
            taxLabel={copy.tax}
            points={copy.points}
            stock={{ label: copy.stock, tone: "success" }}
            note={copy.productNote}
          />
        </div>
        <StatCard
          label={copy.statLabel}
          value={formatters.formatCurrency(412000, { maximumFractionDigits: 0 })}
          delta={{ value: copy.statDelta, tone: "success" }}
          meta={copy.statMeta}
          sparkline={<Sparkline data={[4, 7, 5, 9, 8, 11, 13]} label={copy.statLabel} />}
        />
      </div>

      <p className="mt-2 text-2xs leading-relaxed text-faint">{copy.caption}</p>
    </div>
  );
}

export function RegisterCard({
  theme,
  label,
  jp,
  description,
  action,
  to,
  children,
}: {
  theme: "chirashi" | "daicho" | "kanso";
  label: string;
  jp: string;
  description: string;
  action: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <article
      data-theme={theme}
      className="flex h-full min-w-0 flex-col border border-rule bg-surface text-ink"
    >
      <header className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
        <h3 className="text-xs font-semibold">
          {label} <span className="font-normal text-faint">{jp}</span>
        </h3>
        <span aria-hidden="true" className="flex items-center gap-1">
          <span className="size-2 border border-rule-strong bg-primary" />
          <span className="size-2 border border-rule-strong bg-sale" />
          <span className="size-2 border border-rule-strong bg-success" />
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-2 p-[var(--koten-panel-p)]">
        <p className="text-2xs leading-relaxed text-faint">{description}</p>
        <div className="flex flex-1 flex-col justify-center">{children}</div>
      </div>
      <footer className="border-t border-rule px-[var(--koten-panel-p)] py-1.5">
        <Link
          to={to}
          className="text-2xs font-semibold text-link underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          {action} →
        </Link>
      </footer>
    </article>
  );
}

export function EntryCard({
  to,
  index,
  title,
  jp,
  description,
  action,
  children,
}: {
  to: string;
  index: string;
  title: string;
  jp: string;
  description: string;
  action: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-rule bg-surface">
      <div className="flex items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1">
        <span className="font-mono text-2xs text-faint">{index}</span>
        <span className="text-2xs text-faint">{jp}</span>
      </div>
      <div className="flex flex-1 flex-col p-[var(--koten-panel-p)]">
        <h3 className="font-serif text-xl font-semibold leading-tight">
          <Link
            to={to}
            className="text-ink no-underline hover:text-link focus-visible:outline-2 focus-visible:outline-offset-1"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
        <div className="mt-3 flex flex-1 items-end">{children}</div>
      </div>
      <div className="border-t border-rule px-[var(--koten-panel-p)] py-1.5">
        <Link
          to={to}
          className="text-2xs font-semibold text-link underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          {action} →
        </Link>
      </div>
    </article>
  );
}

export function DemoCard({
  eyebrow,
  title,
  jp,
  description,
  tags,
  demoHref,
  patternTo,
  openLabel,
  patternLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  jp: string;
  description: string;
  tags: readonly string[];
  demoHref: string;
  patternTo: string;
  openLabel: string;
  patternLabel: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-rule bg-surface">
      <div className="flex flex-1 flex-col p-[var(--koten-panel-p)]">
        <p className="text-2xs font-semibold text-faint">{eyebrow}</p>
        <h3 className="mt-0.5 flex items-baseline gap-2 font-serif text-2xl font-semibold leading-tight">
          {title}
          <span className="text-xs font-normal text-faint">{jp}</span>
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} tone="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="border-t border-rule bg-tint p-[var(--koten-panel-p)]">{children}</div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule px-[var(--koten-panel-p)] py-1.5">
        <KotenLink href={demoHref} className="text-2xs font-semibold">
          {openLabel}
        </KotenLink>
        <span aria-hidden="true" className="text-rule-strong">
          /
        </span>
        <Link
          to={patternTo}
          className="text-2xs font-semibold text-link underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          {patternLabel} →
        </Link>
      </div>
    </article>
  );
}

export function SwatchRow({ labels }: { labels: readonly string[] }) {
  const tones = ["bg-primary", "bg-sale", "bg-success", "bg-warning"] as const;

  return (
    <div className="flex w-full flex-wrap items-end justify-between gap-2">
      <span aria-hidden="true" className="flex gap-1">
        {tones.map((tone) => (
          <span key={tone} className={cn("size-4 border border-rule-strong", tone)} />
        ))}
      </span>
      <span className="font-mono text-2xs text-faint">{labels.join(" · ")}</span>
    </div>
  );
}
