import { Breadcrumb, EmptyState, PageHeader } from "@koten/ui";
import { Link, useNavigate } from "react-router";
import type { ErpCopy } from "../data/copy";

export function ModulePage({ copy, title }: { copy: ErpCopy; title: string }) {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            label={copy.shell.breadcrumbLabel}
            onNavigate={navigate}
            items={[{ label: copy.shell.breadcrumbHome, href: "/" }, { label: title }]}
          />
        }
        eyebrow={copy.brand.product}
        title={title}
      />
      <div className="mt-[calc(var(--koten-gap)*2)]">
        <EmptyState
          title={copy.placeholder.title}
          description={copy.placeholder.description}
          action={
            <Link
              to="/"
              className="inline-flex h-[var(--koten-control-h)] items-center border border-primary-strong bg-primary px-[var(--koten-control-px)] text-xs font-semibold text-primary-foreground no-underline hover:bg-primary-hover"
            >
              {copy.notFound.back}
            </Link>
          }
        />
      </div>
    </div>
  );
}
