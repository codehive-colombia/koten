import { useKoten } from "@koten/ui";
import { Link } from "react-router";
import { shellLabels } from "../data/catalog";

export function NotFoundPage() {
  const { locale } = useKoten();
  const labels = shellLabels[locale];

  return (
    <div className="border border-rule bg-surface p-[calc(var(--koten-gap)*2)]">
      <p className="font-mono text-2xs text-faint">404</p>
      <h1 className="mt-1 font-serif text-2xl font-semibold">{labels.notFound}</h1>
      <p className="mt-2 text-xs text-muted">{labels.notFoundBody}</p>
      <Link
        to="/"
        className="mt-[var(--koten-gap)] inline-block text-xs font-semibold text-link underline-offset-2 hover:underline"
      >
        ← {labels.backHome}
      </Link>
    </div>
  );
}
