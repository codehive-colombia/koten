import { type KotenLocale, useKoten } from "@koten/ui";
import { type ReactNode, useState } from "react";
import { Link } from "react-router";

const docsLabels: Record<
  KotenLocale,
  { copy: string; copied: string; prop: string; type: string; fallback: string; note: string }
> = {
  es: {
    copy: "Copiar",
    copied: "Copiado",
    prop: "Prop",
    type: "Tipo",
    fallback: "Default",
    note: "Nota",
  },
  ja: {
    copy: "コピー",
    copied: "コピー済み",
    prop: "プロパティ",
    type: "型",
    fallback: "既定値",
    note: "説明",
  },
  en: {
    copy: "Copy",
    copied: "Copied",
    prop: "Prop",
    type: "Type",
    fallback: "Default",
    note: "Note",
  },
};

export function PageHeader({
  eyebrow,
  title,
  jp,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  jp?: string;
  description?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="border-b border-rule-strong pb-[var(--koten-panel-p)]">
      <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-faint">{eyebrow}</p>
      <h1 className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-3xl font-semibold leading-tight">
        <span aria-hidden="true" className="mb-1 inline-block size-2 shrink-0 bg-primary" />
        {title}
        {jp ? <span className="text-xs font-normal text-faint">{jp}</span> : null}
      </h1>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
      {meta ? <div className="mt-3 text-2xs text-faint">{meta}</div> : null}
    </header>
  );
}

export function Demo({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="border border-rule">
      <div className="flex min-h-[var(--koten-row-h)] items-center border-b border-rule bg-tint px-[var(--koten-panel-p)] text-2xs font-semibold text-muted">
        {title}
      </div>
      <div className={className ?? "p-[var(--koten-panel-p)]"}>{children}</div>
    </div>
  );
}

export function Code({
  children,
  copyLabel,
  copiedLabel,
}: {
  children: string;
  copyLabel?: string;
  copiedLabel?: string;
}) {
  const { locale } = useKoten();
  const labels = docsLabels[locale];
  const [copied, setCopied] = useState(false);
  const copyText = copyLabel ?? labels.copy;
  const copiedText = copiedLabel ?? labels.copied;

  const copy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative mt-[var(--koten-gap)]">
      <button
        type="button"
        onClick={copy}
        className="absolute end-2 top-2 border border-rule-strong bg-surface px-1.5 py-0.5 text-2xs font-semibold text-muted transition-colors hover:bg-tint hover:text-ink"
      >
        {copied ? copiedText : copyText}
      </button>
      <pre className="overflow-x-auto border border-rule bg-tint p-[var(--koten-panel-p)] pe-20 font-mono text-2xs leading-relaxed">
        <code>{children}</code>
      </pre>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedText : ""}
      </span>
    </div>
  );
}

export function PropsTable({
  caption,
  rows,
}: {
  caption: string;
  rows: readonly { prop: string; type: string; default: string; note: string }[];
}) {
  const { locale } = useKoten();
  const headers = docsLabels[locale];

  return (
    <div className="mt-[var(--koten-gap)] overflow-x-auto border border-rule">
      <table className="w-full min-w-[32rem] border-collapse text-start">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers.prop}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers.type}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers.fallback}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers.note}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map((row) => (
            <tr key={row.prop} className="h-[var(--koten-row-h)]">
              <th
                scope="row"
                className="px-[var(--koten-control-px)] font-mono text-2xs font-normal text-muted"
              >
                {row.prop}
              </th>
              <td className="px-[var(--koten-control-px)] font-mono text-2xs">{row.type}</td>
              <td className="px-[var(--koten-control-px)] font-mono text-2xs text-faint">
                {row.default}
              </td>
              <td className="px-[var(--koten-control-px)] text-xs text-muted">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function List({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2"
    >
      {items.map((item) => (
        <li key={item} className="border-s-2 border-primary ps-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function IndexCard({
  to,
  title,
  jp,
  description,
}: {
  to: string;
  title: string;
  jp?: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col border border-rule bg-surface text-ink no-underline transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-1"
    >
      <span className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
        <span className="text-xs font-semibold">
          {title}
          {jp ? <span className="ms-2 font-normal text-faint">{jp}</span> : null}
        </span>
        <span aria-hidden="true" className="text-primary">
          →
        </span>
      </span>
      <span className="flex-1 p-[var(--koten-panel-p)] text-xs leading-relaxed text-muted">
        {description}
      </span>
    </Link>
  );
}
