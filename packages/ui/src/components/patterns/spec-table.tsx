import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SpecRow = {
  id: string;
  label: ReactNode;
  value: ReactNode;
};

export type SpecGroup = {
  id: string;
  title: ReactNode;
  rows: readonly SpecRow[];
};

export type SpecTableProps = {
  groups: readonly SpecGroup[];
  caption: string;
  className?: string;
};

export function SpecTable({ groups, caption, className }: SpecTableProps) {
  return (
    <div data-slot="spec-table" className={cn("grid min-w-0 gap-[var(--koten-gap)]", className)}>
      {groups.map((group) => (
        <section key={group.id} className="min-w-0">
          <h3 className="border-b border-rule-strong pb-1 text-xs font-semibold text-ink">
            {group.title}
          </h3>
          <div className="overflow-x-auto border border-t-0 border-rule">
            <table className="w-full min-w-[24rem] border-collapse text-left">
              <caption className="sr-only">{`${caption}: ${String(group.title)}`}</caption>
              <tbody className="divide-y divide-rule">
                {group.rows.map((row) => (
                  <tr key={row.id} className="min-h-[var(--koten-row-h)]">
                    <th
                      scope="row"
                      className="w-[38%] bg-tint px-[var(--koten-control-px)] py-1 text-left text-2xs font-medium text-muted"
                    >
                      {row.label}
                    </th>
                    <td className="px-[var(--koten-control-px)] py-1 text-xs text-ink">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
