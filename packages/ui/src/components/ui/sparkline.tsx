import { cn } from "../../lib/cn";

export type SparklineProps = {
  data: readonly number[];
  label: string;
  className?: string;
};

export function Sparkline({ data, label, className }: SparklineProps) {
  const values = data.length > 0 ? data : [0];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
      const y = 100 - ((value - min) / span) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      role="img"
      aria-label={label}
      data-slot="sparkline"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("h-8 w-24 text-primary", className)}
    >
      <title>{label}</title>
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
