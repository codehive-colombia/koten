import { Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../ui/button";

export type SearchCategoryOption = {
  value: string;
  label: string;
};

export type SearchBarProps = {
  label: string;
  placeholder: string;
  categoriesLabel: string;
  categories: readonly SearchCategoryOption[];
  submitLabel: string;
  value?: string;
  defaultValue?: string;
  category?: string;
  defaultCategory?: string;
  onValueChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onSubmit?: (value: string, category: string) => void;
  className?: string;
};

export function SearchBar({
  label,
  placeholder,
  categoriesLabel,
  categories,
  submitLabel,
  value,
  defaultValue = "",
  category,
  defaultCategory,
  onValueChange,
  onCategoryChange,
  onSubmit,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalCategory, setInternalCategory] = useState(
    defaultCategory ?? categories[0]?.value ?? "",
  );
  const currentValue = value ?? internalValue;
  const currentCategory = category ?? internalCategory;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(currentValue, currentCategory);
  };

  return (
    <search
      aria-label={label}
      data-slot="search-bar"
      className={cn("block min-w-0 border border-rule-strong bg-surface", className)}
    >
      <form onSubmit={handleSubmit} className="flex min-w-0 items-stretch">
        <label className="sr-only" htmlFor="koten-search-category">
          {categoriesLabel}
        </label>
        <select
          id="koten-search-category"
          aria-label={categoriesLabel}
          value={currentCategory}
          onChange={(event) => {
            if (category === undefined) {
              setInternalCategory(event.target.value);
            }
            onCategoryChange?.(event.target.value);
          }}
          className="h-[var(--koten-control-h)] max-w-32 shrink-0 border-e border-rule bg-tint px-2 text-2xs text-muted focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="koten-search-input">
          {label}
        </label>
        <input
          id="koten-search-input"
          type="search"
          aria-label={label}
          value={currentValue}
          placeholder={placeholder}
          onChange={(event) => {
            if (value === undefined) {
              setInternalValue(event.target.value);
            }
            onValueChange?.(event.target.value);
          }}
          className="h-[var(--koten-control-h)] w-full min-w-0 border-0 bg-transparent px-2 text-xs text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-1"
        />

        <Button type="submit" size="sm" variant="primary" className="m-0.5 h-auto">
          <Search className="size-3.5" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">{submitLabel}</span>
        </Button>
      </form>
    </search>
  );
}
