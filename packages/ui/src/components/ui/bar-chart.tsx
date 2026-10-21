import { cn } from "../../lib/cn";

export type BarChartDatum = {
  label: string;
  value: number;
};

export type BarChartProps = {
  data: readonly BarChartDatum[];
  label: string;
  height?: number;
  formatValue?: (value: number) => string;
  className?: string;
};

export function BarChart({
  data,
  label,
  height = 160,
  formatValue = (value) => String(value),
  className,
}: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <figure data-slot="bar-chart" className={cn("min-w-0", className)}>
      <figcaption className="text-xs font-semibold text-ink">{label}</figcaption>
      <div
        aria-hidden="true"
        className="mt-2 flex items-end gap-1 border-b border-rule"
        style={{ height }}
      >
        {data.map((item) => (
          <div
            key={item.label}
            className="min-w-0 flex-1 bg-primary transition-[height]"
            style={{ height: `${Math.max((item.value / max) * 100, 1)}%` }}
            title={`${item.label}: ${formatValue(item.value)}`}
          />
        ))}
      </div>
      <div aria-hidden="true" className="mt-1 flex gap-1">
        {data.map((item) => (
          <span
            key={item.label}
            className="min-w-0 flex-1 truncate text-center text-2xs text-faint"
          >
            {item.label}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Etiqueta</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td>{formatValue(item.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
