import { cn, type KotenLocale, useKoten } from "@koten/ui";
import type { ReactNode } from "react";
import type { ColorToken, DensityId, SemanticRole, ThemeId } from "../data/tokens";
import { type Localized, pickLocalized } from "../lib/i18n";

const specimenLabels: Record<
  KotenLocale,
  {
    roleCaption: string;
    role: string;
    token: string;
    utility: string;
    sans: string;
    serif: string;
    mono: string;
    straight: string;
    avatarOnly: string;
    overlayOnly: string;
    focus: string;
    price: string;
    tax: string;
    taxIncluded: string;
    stock: string;
    inStock: string;
    densitySample: string;
    buy: string;
    details: string;
    stockAvailable: string;
    stockLow: string;
    stockOut: string;
    order: string;
    filter: string;
    apply: string;
  }
> = {
  es: {
    roleCaption: "Roles semánticos resueltos en los temas Chirashi, Daichō y Kanso",
    role: "Rol",
    token: "Token",
    utility: "Utilidad",
    sans: "Sans · UI y body",
    serif: "Serif · titulares",
    mono: "Mono · código y datos",
    straight: "recto",
    avatarOnly: "solo avatar",
    overlayOnly: "única sombra",
    focus: "Foco",
    price: "Precio",
    tax: "Impuestos",
    taxIncluded: "incluidos",
    stock: "Stock",
    inStock: "En stock",
    densitySample: "Densidad",
    buy: "Comprar",
    details: "Ver detalles",
    stockAvailable: "En stock",
    stockLow: "Quedan pocas",
    stockOut: "Agotado",
    order: "Pedido",
    filter: "Filtrar",
    apply: "Aplicar",
  },
  ja: {
    roleCaption: "チラシ・台帳・簡素の各テーマで解決される意味的役割",
    role: "役割",
    token: "トークン",
    utility: "ユーティリティ",
    sans: "Sans · UIと本文",
    serif: "Serif · 見出し",
    mono: "Mono · コードと数値",
    straight: "直角",
    avatarOnly: "アバターのみ",
    overlayOnly: "唯一の影",
    focus: "フォーカス",
    price: "価格",
    tax: "税",
    taxIncluded: "込み",
    stock: "在庫",
    inStock: "在庫あり",
    densitySample: "密度",
    buy: "購入する",
    details: "詳細を見る",
    stockAvailable: "在庫あり",
    stockLow: "残りわずか",
    stockOut: "売り切れ",
    order: "注文",
    filter: "フィルタ",
    apply: "適用",
  },
  en: {
    roleCaption: "Semantic roles resolved across the Chirashi, Daichō and Kanso themes",
    role: "Role",
    token: "Token",
    utility: "Utility",
    sans: "Sans · UI and body",
    serif: "Serif · headlines",
    mono: "Mono · code and data",
    straight: "square",
    avatarOnly: "avatar only",
    overlayOnly: "only shadow",
    focus: "Focus",
    price: "Price",
    tax: "Tax",
    taxIncluded: "included",
    stock: "Stock",
    inStock: "In stock",
    densitySample: "Density",
    buy: "Buy",
    details: "View details",
    stockAvailable: "In stock",
    stockLow: "Low stock",
    stockOut: "Sold out",
    order: "Order",
    filter: "Filter",
    apply: "Apply",
  },
};

export function Section({
  id,
  title,
  jp,
  meta,
  children,
}: {
  id: string;
  title: string;
  jp?: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-rule pt-[calc(var(--koten-gap)*1.5)] first:border-t-0 first:pt-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={id} className="flex items-baseline gap-2 text-lg font-semibold">
          <span aria-hidden="true" className="mb-0.5 inline-block h-4 w-1 shrink-0 bg-primary" />
          {title}
          {jp ? <span className="text-xs font-normal text-faint">{jp}</span> : null}
        </h2>
        {meta ? <p className="text-2xs text-faint">{meta}</p> : null}
      </div>
      <div className="mt-[var(--koten-panel-p)]">{children}</div>
    </section>
  );
}

export function SubHeading({ children, meta }: { children: ReactNode; meta?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h3 className="text-xs font-semibold">{children}</h3>
      {meta ? <p className="text-2xs text-faint">{meta}</p> : null}
    </div>
  );
}

export function ColorGrid({ colors }: { colors: readonly ColorToken[] }) {
  const { locale } = useKoten();

  return (
    <ul className="grid grid-cols-1 gap-[var(--koten-gap)] sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((color) => (
        <li key={color.token} className="border border-rule bg-surface">
          <div
            aria-hidden="true"
            className="h-10 border-b border-rule"
            style={{ background: `var(${color.token})` }}
          />
          <div className="p-[var(--koten-panel-p)]">
            <p className="text-xs font-semibold">
              {color.name} <span className="font-normal text-muted">· {color.romanized}</span>
            </p>
            <p className="mt-0.5 break-all font-mono text-2xs text-muted">{color.token}</p>
            <p className="text-2xs text-faint">
              {color.hex} · {pickLocalized(color.note, locale)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function RoleChip({ theme, token }: { theme: ThemeId; token: string }) {
  return (
    <span
      data-theme={theme}
      aria-hidden="true"
      className="block h-5 w-full min-w-10 border border-rule"
      style={{ background: `var(${token})` }}
    />
  );
}

export function RoleTable({ roles }: { roles: readonly SemanticRole[] }) {
  const { locale } = useKoten();
  const labels = specimenLabels[locale];

  return (
    <div className="overflow-x-auto border border-rule">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{labels.roleCaption}</caption>
        <thead>
          <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {labels.role}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {labels.token}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {labels.utility}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] text-center font-semibold">
              Chirashi
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] text-center font-semibold">
              Daichō
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] text-center font-semibold">
              Kanso
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {roles.map((role) => (
            <tr key={role.token} className="h-[var(--koten-row-h)]">
              <th scope="row" className="px-[var(--koten-control-px)] text-xs font-medium">
                {pickLocalized(role.note, locale)}
              </th>
              <td className="px-[var(--koten-control-px)] font-mono text-2xs text-muted">
                {role.token}
              </td>
              <td className="px-[var(--koten-control-px)] font-mono text-2xs text-faint">
                {role.utility}
              </td>
              <td className="px-[var(--koten-control-px)]">
                <RoleChip theme="chirashi" token={role.token} />
              </td>
              <td className="px-[var(--koten-control-px)]">
                <RoleChip theme="daicho" token={role.token} />
              </td>
              <td className="px-[var(--koten-control-px)]">
                <RoleChip theme="kanso" token={role.token} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypeFamilies() {
  const { locale } = useKoten();
  const labels = specimenLabels[locale];
  const families = [
    { label: labels.sans, token: "--koten-font-sans", className: "font-sans" },
    { label: labels.serif, token: "--koten-font-serif", className: "font-serif" },
    { label: labels.mono, token: "--koten-font-mono", className: "font-mono" },
  ] as const;

  return (
    <dl className="grid gap-[var(--koten-gap)] md:grid-cols-3">
      {families.map((family) => (
        <div key={family.token} className="border border-rule bg-surface p-[var(--koten-panel-p)]">
          <dt className="text-2xs font-semibold text-faint">{family.label}</dt>
          <dd className={cn("mt-1 text-xl leading-tight", family.className)}>情報の密度 Aa 0123</dd>
          <dd className="mt-1 font-mono text-2xs text-muted">{family.token}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TypeScale({
  items,
}: {
  items: readonly { token: string; utility: string; px: number; use: Localized }[];
}) {
  const { locale } = useKoten();
  const labels = specimenLabels[locale];

  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {items.map((item) => (
        <li
          key={item.token}
          className="flex min-h-[var(--koten-row-h)] flex-wrap items-baseline gap-x-4 gap-y-1 py-1"
        >
          <span className="w-24 shrink-0 font-mono text-2xs text-faint">{item.utility}</span>
          <span className="min-w-0 flex-1 leading-tight" style={{ fontSize: `var(${item.token})` }}>
            情報の密度 · {labels.densitySample}
          </span>
          <span className="w-full shrink-0 text-right text-2xs text-muted sm:w-48">
            {item.px} px · {pickLocalized(item.use, locale)}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ValueTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: readonly [string, string, string];
  rows: readonly { token: string; value: string; use: string }[];
}) {
  return (
    <div className="overflow-x-auto border border-rule">
      <table className="w-full min-w-[28rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers[0]}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers[1]}
            </th>
            <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
              {headers[2]}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map((row) => (
            <tr key={row.token} className="h-[var(--koten-row-h)]">
              <th
                scope="row"
                className="px-[var(--koten-control-px)] font-mono text-2xs font-normal text-muted"
              >
                {row.token}
              </th>
              <td className="px-[var(--koten-control-px)] font-mono text-xs tabular-nums">
                {row.value}
              </td>
              <td className="px-[var(--koten-control-px)] text-xs text-muted">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpacingScale({ values }: { values: readonly number[] }) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {values.map((value) => (
        <li key={value} className="flex min-h-[var(--koten-row-h)] items-center gap-3 py-1">
          <span className="w-10 shrink-0 text-right font-mono text-2xs text-muted">{value}</span>
          <span
            aria-hidden="true"
            className="h-2 shrink-0 bg-primary"
            style={{ width: `${value}px` }}
          />
          <span className="text-2xs text-faint">px</span>
        </li>
      ))}
    </ul>
  );
}

export function ShapeSpecimen({
  radii,
}: {
  radii: readonly { token: string; utility: string; px: number }[];
}) {
  const { locale } = useKoten();
  const labels = specimenLabels[locale];

  return (
    <div className="flex flex-wrap items-end gap-[var(--koten-gap)]">
      <figure className="w-24">
        <div aria-hidden="true" className="size-12 border border-rule-strong bg-tint" />
        <figcaption className="mt-1 text-2xs text-muted">
          0 px <span className="block text-faint">{labels.straight}</span>
        </figcaption>
      </figure>
      {radii.map((radius) => (
        <figure key={radius.token} className="w-24">
          <div
            aria-hidden="true"
            className="size-12 border border-rule-strong bg-tint"
            style={{ borderRadius: `var(${radius.token})` }}
          />
          <figcaption className="mt-1 text-2xs text-muted">
            {radius.px} px <span className="block font-mono text-faint">{radius.utility}</span>
          </figcaption>
        </figure>
      ))}
      <figure className="w-24">
        <div
          aria-hidden="true"
          className="size-12 rounded-full border border-rule-strong bg-tint"
        />
        <figcaption className="mt-1 text-2xs text-muted">
          50% <span className="block text-faint">{labels.avatarOnly}</span>
        </figcaption>
      </figure>
      <figure className="w-32">
        <div aria-hidden="true" className="h-12 border border-rule bg-surface shadow-overlay" />
        <figcaption className="mt-1 text-2xs text-muted">
          Overlay <span className="block text-faint">{labels.overlayOnly}</span>
        </figcaption>
      </figure>
    </div>
  );
}

function DensityDemo({ density, label }: { density: DensityId; label: string }) {
  const { locale } = useKoten();
  const labels = specimenLabels[locale];

  return (
    <div data-density={density} className="border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5">
        <p className="text-xs font-semibold">{label}</p>
        <code className="text-2xs text-faint">{density}</code>
      </div>
      <div className="p-[var(--koten-panel-p)]">
        <ul className="divide-y divide-rule border-y border-rule">
          {[1024, 1025, 1026].map((order, index) => (
            <li
              key={order}
              className="flex items-center justify-between gap-2 text-2xs"
              style={{ height: "var(--koten-row-h)" }}
            >
              <span className="truncate">
                {labels.order} #{order}
              </span>
              <span className="shrink-0 tabular-nums text-muted">¥{(index + 1) * 4800}</span>
            </li>
          ))}
        </ul>
        <div className="mt-[var(--koten-gap)] flex items-center gap-[var(--koten-gap)]">
          <span
            className="inline-flex items-center border border-rule-strong bg-surface px-[var(--koten-control-px)] text-2xs"
            style={{ height: "var(--koten-control-h)" }}
          >
            {labels.filter}
          </span>
          <span
            className="inline-flex items-center border border-primary-strong bg-primary px-[var(--koten-control-px)] text-2xs text-primary-foreground"
            style={{ height: "var(--koten-control-h)" }}
          >
            {labels.apply}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DensityGrid({
  densities,
}: {
  densities: readonly { id: DensityId; label: Localized; context: Localized }[];
}) {
  const { locale } = useKoten();

  return (
    <div className="grid gap-[var(--koten-gap)] lg:grid-cols-3">
      {densities.map((density) => (
        <div key={density.id}>
          <DensityDemo density={density.id} label={pickLocalized(density.label, locale)} />
          <p className="mt-1 text-2xs text-faint">
            {pickLocalized(density.label, locale)} · {pickLocalized(density.context, locale)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ThemeCard({
  theme,
}: {
  theme: { id: ThemeId; label: string; jp: string; description: Localized };
}) {
  const { locale } = useKoten();
  const labels = specimenLabels[locale];

  return (
    <article
      data-theme={theme.id}
      className="flex h-full flex-col border border-rule bg-surface text-ink"
    >
      <header className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
        <h3 className="text-xs font-semibold">
          {theme.label} <span className="font-normal text-faint">{theme.jp}</span>
        </h3>
        <code className="text-2xs text-faint">{theme.id}</code>
      </header>
      <div className="flex-1 p-[var(--koten-panel-p)]">
        <p className="font-serif text-xl leading-tight">情報の密度</p>
        <p className="mt-1 text-xs text-muted">{pickLocalized(theme.description, locale)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center border border-primary-strong bg-primary px-[var(--koten-control-px)] text-xs font-semibold text-primary-foreground"
            style={{ height: "var(--koten-control-h)" }}
          >
            {labels.buy}
          </span>
          <span className="text-xs font-semibold text-link underline underline-offset-2">
            {labels.details}
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-rule pt-2 text-2xs">
          <dt className="text-faint">{labels.price}</dt>
          <dd className="text-right font-semibold tabular-nums text-primary">¥128,000</dd>
          <dt className="text-faint">{labels.tax}</dt>
          <dd className="text-right tabular-nums text-muted">{labels.taxIncluded}</dd>
          <dt className="text-faint">{labels.stock}</dt>
          <dd className="text-right text-success">{labels.inStock}</dd>
        </dl>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="border border-success bg-surface px-1.5 py-0.5 text-2xs text-success">
            {labels.stockAvailable}
          </span>
          <span className="border border-warning bg-surface px-1.5 py-0.5 text-2xs text-warning">
            {labels.stockLow}
          </span>
          <span className="border border-danger bg-surface px-1.5 py-0.5 text-2xs text-danger">
            {labels.stockOut}
          </span>
          <span className="inline-flex items-center border border-rule-strong bg-surface px-1.5 py-0.5 text-2xs outline-2 outline-offset-1 outline-focus">
            {labels.focus}
          </span>
        </div>
      </div>
    </article>
  );
}
