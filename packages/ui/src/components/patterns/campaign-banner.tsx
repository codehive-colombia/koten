import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type CampaignBannerProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  deadline?: ReactNode;
  cta?: {
    label: string;
    href: string;
  };
  tone?: "sale" | "info" | "neutral";
  layout?: "strip" | "card" | "hero";
  className?: string;
};

const tones = {
  sale: "border-s-sale",
  info: "border-s-info",
  neutral: "border-s-rule-strong",
} as const;

const eyebrowTones = {
  sale: "text-sale",
  info: "text-info",
  neutral: "text-muted",
} as const;

export function CampaignBanner({
  eyebrow,
  title,
  description,
  deadline,
  cta,
  tone = "sale",
  layout = "card",
  className,
}: CampaignBannerProps) {
  return (
    <section
      data-slot="campaign-banner"
      data-layout={layout}
      data-tone={tone}
      className={cn(
        "min-w-0 border border-rule border-s-[3px] bg-surface text-ink",
        tones[tone],
        layout === "hero" ? "p-[calc(var(--koten-panel-p)*1.5)]" : "p-[var(--koten-panel-p)]",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("text-2xs font-semibold", eyebrowTones[tone])}>{eyebrow}</p>
      ) : null}
      <h3
        className={cn(
          "font-serif font-semibold leading-tight",
          layout === "hero" ? "mt-1 text-xl" : "mt-1 text-sm",
        )}
      >
        {title}
      </h3>
      {description ? (
        <p className="mt-1 text-2xs leading-relaxed text-muted">{description}</p>
      ) : null}
      {deadline ? <p className="mt-1 text-2xs tabular-nums text-faint">{deadline}</p> : null}
      {cta ? (
        <a
          href={cta.href}
          className="mt-2 inline-flex h-[var(--koten-control-h)] items-center border border-primary-strong bg-primary px-[var(--koten-control-px)] text-2xs font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
        >
          {cta.label}
        </a>
      ) : null}
    </section>
  );
}
