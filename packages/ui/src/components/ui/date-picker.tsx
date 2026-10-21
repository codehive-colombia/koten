import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useKoten, useKotenFormatters } from "../../i18n/provider";
import { cn } from "../../lib/cn";

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

type Day = {
  date: Date;
  key: string;
  inMonth: boolean;
  disabled: boolean;
};

function startOfDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function startOfMonth(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), 1);
}

function addDays(value: Date, amount: number): Date {
  const next = new Date(value);
  next.setDate(next.getDate() + amount);

  return next;
}

function addMonths(value: Date, amount: number): Date {
  return new Date(value.getFullYear(), value.getMonth() + amount, 1);
}

function sameDay(first: Date | null | undefined, second: Date | null | undefined): boolean {
  return (
    first !== null &&
    first !== undefined &&
    second !== null &&
    second !== undefined &&
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function dayKey(value: Date): string {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(
    value.getDate(),
  ).padStart(2, "0")}`;
}

function compareDays(first: Date, second: Date): number {
  return startOfDay(first).getTime() - startOfDay(second).getTime();
}

/** Lunes para es, domingo para ja/en; usa Intl.Locale cuando está disponible. */
function weekStartsOn(locale: string): number {
  try {
    const info = (
      new Intl.Locale(locale) as Intl.Locale & {
        weekInfo?: { firstDay?: number };
      }
    ).weekInfo;

    if (info?.firstDay) {
      return info.firstDay % 7;
    }
  } catch {
    // Locale no soportado: cae al valor por idioma.
  }

  return locale.startsWith("es") ? 1 : 0;
}

export type CalendarProps = {
  /** Fecha seleccionada (modo simple). */
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  /** Rango activo (modo rango). */
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  min?: Date;
  max?: Date;
  className?: string;
  /** Enfoca el día seleccionado o hoy al montar. */
  autoFocus?: boolean;
};

export function Calendar({
  selected,
  onSelect,
  rangeStart,
  rangeEnd,
  month,
  defaultMonth,
  onMonthChange,
  min,
  max,
  className,
  autoFocus = false,
}: CalendarProps) {
  const { labels, locale } = useKoten();
  const formatters = useKotenFormatters();
  const gridRef = useRef<HTMLTableElement>(null);
  const [uncontrolledMonth, setUncontrolledMonth] = useState(() =>
    startOfMonth(month ?? defaultMonth ?? selected ?? new Date()),
  );
  const [focused, setFocused] = useState(() => startOfDay(selected ?? defaultMonth ?? new Date()));
  const viewMonth = startOfMonth(month ?? uncontrolledMonth);
  const startsOn = weekStartsOn(locale);
  const today = startOfDay(new Date());
  const monthLabel = formatters.formatDate(viewMonth, { month: "long", year: "numeric" });

  const weeks = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const offset = (first.getDay() - startsOn + 7) % 7;
    const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const cells = Math.ceil((offset + daysInMonth) / 7) * 7;
    const start = addDays(first, -offset);
    const result: Day[][] = [];

    for (let index = 0; index < cells; index += 1) {
      const date = addDays(start, index);
      const disabled =
        (min !== undefined && compareDays(date, min) < 0) ||
        (max !== undefined && compareDays(date, max) > 0);
      const day: Day = {
        date,
        key: dayKey(date),
        inMonth: date.getMonth() === first.getMonth(),
        disabled,
      };

      if (index % 7 === 0) {
        result.push([]);
      }

      result[result.length - 1]?.push(day);
    }

    return result;
  }, [max, min, startsOn, viewMonth]);

  const weekdays = useMemo(() => {
    const start = addDays(
      startOfMonth(viewMonth),
      -((startOfMonth(viewMonth).getDay() - startsOn + 7) % 7),
    );

    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, index);

      return {
        key: dayKey(date),
        narrow: formatters.formatDate(date, { weekday: "narrow" }),
        long: formatters.formatDate(date, { weekday: "long" }),
      };
    });
  }, [formatters, startsOn, viewMonth]);

  function changeMonth(next: Date, focusDay?: Date) {
    const target = startOfMonth(next);

    if (month === undefined) {
      setUncontrolledMonth(target);
    }
    onMonthChange?.(target);

    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();

    setFocused(
      startOfDay(
        focusDay ??
          new Date(target.getFullYear(), target.getMonth(), Math.min(focused.getDate(), lastDay)),
      ),
    );
  }

  function moveFocus(next: Date) {
    const clamped = startOfDay(next);

    if (min && compareDays(clamped, min) < 0) return;
    if (max && compareDays(clamped, max) > 0) return;

    setFocused(clamped);

    if (
      clamped.getMonth() !== viewMonth.getMonth() ||
      clamped.getFullYear() !== viewMonth.getFullYear()
    ) {
      changeMonth(clamped);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };

    if (key in moves) {
      event.preventDefault();
      moveFocus(addDays(focused, moves[key] as number));
      return;
    }

    if (key === "Home" || key === "End") {
      event.preventDefault();
      const offset = (focused.getDay() - startsOn + 7) % 7;
      moveFocus(addDays(focused, key === "Home" ? -offset : 6 - offset));
      return;
    }

    if (key === "PageUp" || key === "PageDown") {
      event.preventDefault();
      const nextMonth = addMonths(viewMonth, key === "PageUp" ? -1 : 1);
      const daysInNext = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
      const next = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        Math.min(focused.getDate(), daysInNext),
      );
      changeMonth(nextMonth, next);
      return;
    }

    if (key === "Enter" || key === " ") {
      event.preventDefault();
      onSelect?.(focused);
    }
  }

  useEffect(() => {
    if (!autoFocus) return;

    const grid = gridRef.current;
    const active = document.activeElement;

    if (grid && (!active || !grid.contains(active))) {
      grid.querySelector<HTMLButtonElement>(`[data-day="${dayKey(focused)}"]`)?.focus();
    }
  }, [autoFocus, focused]);

  useEffect(() => {
    const grid = gridRef.current;

    if (grid?.contains(document.activeElement)) {
      grid.querySelector<HTMLButtonElement>(`[data-day="${dayKey(focused)}"]`)?.focus();
    }
  }, [focused]);

  return (
    <div className={cn("w-[17.5rem] max-w-full border border-rule bg-surface", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-rule bg-tint px-2 py-1">
        <button
          type="button"
          aria-label={labels.previous}
          onClick={() => changeMonth(addMonths(viewMonth, -1))}
          className="grid size-7 place-items-center border border-transparent text-muted transition-colors hover:border-rule-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <p aria-live="polite" className="text-xs font-semibold text-ink">
          {monthLabel}
        </p>
        <button
          type="button"
          aria-label={labels.next}
          onClick={() => changeMonth(addMonths(viewMonth, 1))}
          className="grid size-7 place-items-center border border-transparent text-muted transition-colors hover:border-rule-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <table
        ref={gridRef}
        aria-label={monthLabel}
        onKeyDown={onKeyDown}
        className="w-full table-fixed border-collapse"
      >
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th
                key={weekday.key}
                scope="col"
                abbr={weekday.long}
                aria-label={weekday.long}
                className="h-6 text-center align-middle text-2xs font-medium text-faint"
              >
                {weekday.narrow}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0]?.key}>
              {week.map((day) => {
                const isSelected = sameDay(day.date, selected);
                const isStart = sameDay(day.date, rangeStart);
                const isEnd = sameDay(day.date, rangeEnd);
                const inRange =
                  rangeStart &&
                  rangeEnd &&
                  compareDays(day.date, rangeStart) > 0 &&
                  compareDays(day.date, rangeEnd) < 0;

                return (
                  <td key={day.key} className="p-0.5 text-center">
                    <button
                      type="button"
                      data-day={day.key}
                      aria-pressed={isSelected || isStart || isEnd || undefined}
                      aria-current={sameDay(day.date, today) ? "date" : undefined}
                      aria-label={formatters.formatDate(day.date, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      tabIndex={sameDay(day.date, focused) ? 0 : -1}
                      disabled={day.disabled}
                      onClick={() => {
                        setFocused(startOfDay(day.date));
                        onSelect?.(startOfDay(day.date));
                      }}
                      className={cn(
                        "grid h-[var(--koten-row-h)] w-full min-w-0 place-items-center border text-xs tabular-nums transition-colors",
                        "focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-offset-1",
                        day.inMonth ? "text-ink" : "text-faint",
                        day.disabled
                          ? "cursor-not-allowed border-transparent text-faint opacity-50"
                          : "border-transparent hover:border-rule-strong",
                        inRange && "bg-selection",
                        (isSelected || isStart || isEnd) &&
                          "border-primary-strong bg-primary font-semibold text-primary-foreground",
                      )}
                    >
                      {day.date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type DatePickerSharedProps = {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: Date;
  max?: Date;
  /** Mes con el que abre el panel; por defecto, el valor o hoy. */
  defaultMonth?: Date;
  className?: string;
  /** Etiqueta del panel; por defecto, la del campo. */
  dialogLabel?: string;
};

export type DatePickerProps = DatePickerSharedProps &
  (
    | {
        mode?: "single";
        value?: Date | null;
        defaultValue?: Date | null;
        onValueChange?: (value: Date | null) => void;
      }
    | {
        mode: "range";
        value?: DateRange;
        defaultValue?: DateRange;
        onValueChange?: (value: DateRange) => void;
      }
  );

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    description,
    error,
    required,
    disabled,
    placeholder,
    min,
    max,
    defaultMonth,
    className,
  } = props;
  const formatters = useKotenFormatters();
  const id = useId();
  const panelId = `${id}-panel`;
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [single, setSingle] = useState<Date | null>(() =>
    props.mode === "range" ? null : (props.value ?? props.defaultValue ?? null),
  );
  const [range, setRange] = useState<DateRange>(() =>
    props.mode === "range"
      ? (props.value ?? props.defaultValue ?? { start: null, end: null })
      : { start: null, end: null },
  );

  const currentSingle = props.mode === "range" ? null : (props.value ?? single);
  const currentRange = props.mode === "range" ? (props.value ?? range) : range;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function selectDay(date: Date) {
    if (props.mode === "range") {
      const start = currentRange.start;
      const end = currentRange.end;

      if (!start || (start && end)) {
        const next = { start: date, end: null };
        setRange(next);
        props.onValueChange?.(next);
        return;
      }

      const next =
        compareDays(date, start) < 0 ? { start: date, end: start } : { start, end: date };
      setRange(next);
      props.onValueChange?.(next);
      close();
      return;
    }

    setSingle(date);
    props.onValueChange?.(date);
    close();
  }

  const display = (() => {
    if (props.mode === "range") {
      const { start, end } = currentRange;
      const format = (value: Date) => formatters.formatDate(value, { dateStyle: "medium" });

      if (start && end) return `${format(start)} – ${format(end)}`;
      if (start) return `${format(start)} – …`;
      return placeholder ?? "";
    }

    return currentSingle
      ? formatters.formatDate(currentSingle, { dateStyle: "medium" })
      : (placeholder ?? "");
  })();

  return (
    <div className={cn("grid min-w-0 gap-1.5", className)}>
      <label
        id={labelId}
        htmlFor={id}
        className="block text-xs font-semibold leading-tight text-ink"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ms-0.5 text-danger">
            *
          </span>
        ) : null}
      </label>

      <div ref={rootRef} className="relative">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-describedby={
            [description ? descriptionId : null, error ? errorId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === "Escape" && open) {
              event.preventDefault();
              close();
            }
          }}
          onClick={() => setOpen((value) => !value)}
          className="flex h-[var(--koten-control-h)] w-full min-w-0 items-center justify-between gap-2 rounded-sm border border-rule-strong bg-surface px-[var(--koten-control-px)] text-start text-sm text-ink transition-colors focus-visible:border-primary disabled:cursor-not-allowed disabled:bg-tint disabled:text-muted aria-invalid:border-danger"
        >
          <span id={valueId} className={cn("min-w-0 truncate", !display && "text-faint")}>
            {display}
          </span>
          <CalendarDays className="size-4 shrink-0 text-muted" aria-hidden="true" />
        </button>

        {open ? (
          <div
            id={panelId}
            role="dialog"
            aria-label={props.dialogLabel ?? (typeof label === "string" ? label : undefined)}
            className="absolute start-0 top-full z-40 mt-1 shadow-overlay"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                close();
              }
            }}
          >
            <Calendar
              selected={currentSingle}
              rangeStart={currentRange.start}
              rangeEnd={currentRange.end}
              min={min}
              max={max}
              defaultMonth={defaultMonth ?? currentSingle ?? currentRange.start ?? undefined}
              onSelect={selectDay}
              autoFocus
            />
          </div>
        ) : null}
      </div>

      {description ? (
        <p id={descriptionId} className="text-2xs leading-relaxed text-faint">
          {description}
        </p>
      ) : null}

      <p id={errorId} aria-live="polite" className="text-2xs leading-relaxed text-danger">
        {error}
      </p>
    </div>
  );
}
