import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  type Updater,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Pagination } from "./pagination";
import { Skeleton } from "./skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  sortable?: boolean;
  align?: "left" | "right";
};

export type DataTableProps<T> = {
  data: readonly T[];
  columns: readonly DataTableColumn<T>[];
  getRowId: (row: T) => string;
  caption?: string;
  emptyLabel: string;
  previousLabel: string;
  nextLabel: string;
  paginationLabel: string;
  selectAllLabel: string;
  selectRowLabel: (id: string) => string;
  selectedLabel: (count: number) => string;
  loading?: boolean;
  selectable?: boolean;
  pageSize?: number;
  onSelectionChange?: (ids: string[]) => void;
  className?: string;
};

function SelectionCheckbox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className="size-3.5 accent-[var(--koten-primary)]"
    />
  );
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  caption,
  emptyLabel,
  previousLabel,
  nextLabel,
  paginationLabel,
  selectAllLabel,
  selectRowLabel,
  selectedLabel,
  loading = false,
  selectable = false,
  pageSize = 8,
  onSelectionChange,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columnDefs = useMemo<ColumnDef<T>[]>(() => {
    const selectionColumn: ColumnDef<T>[] = selectable
      ? [
          {
            id: "__select",
            size: 32,
            enableSorting: false,
            header: ({ table }) => (
              <SelectionCheckbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                  table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
                }
                onChange={() => table.toggleAllPageRowsSelected()}
                label={selectAllLabel}
              />
            ),
            cell: ({ row }) => (
              <SelectionCheckbox
                checked={row.getIsSelected()}
                onChange={() => row.toggleSelected()}
                label={selectRowLabel(row.id)}
              />
            ),
          },
        ]
      : [];

    return [
      ...selectionColumn,
      ...columns.map((column) => ({
        id: column.id,
        accessorFn: (row: T) => (column.sortValue ? column.sortValue(row) : column.id),
        header: column.header,
        enableSorting: column.sortable ?? false,
        cell: ({ row }: { row: { original: T } }) => column.cell(row.original),
      })),
    ];
  }, [columns, selectable, selectAllLabel, selectRowLabel]);

  const table = useReactTable({
    // Keep the caller's array identity. Spreading here creates a new array on
    // every render, which makes TanStack treat the data as changed and
    // auto-reset the page index, so pagination can never advance.
    data: data as T[],
    columns: columnDefs,
    getRowId,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
      setRowSelection((current) => {
        const next = typeof updater === "function" ? updater(current) : updater;
        onSelectionChange?.(Object.keys(next).filter((id) => next[id]));
        return next;
      });
    },
    enableRowSelection: selectable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const selectedCount = Object.keys(rowSelection).length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div data-slot="data-table" className={cn("grid min-w-0 gap-2", className)}>
      <div aria-live="polite" className="text-2xs text-muted">
        {selectedCount > 0 ? selectedLabel(selectedCount) : null}
      </div>

      <Table>
        {caption ? <TableCaption>{caption}</TableCaption> : null}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const column = columns.find((item) => item.id === header.id);
                const sort = header.column.getIsSorted();
                const ariaSort =
                  header.column.getCanSort() && sort
                    ? sort === "asc"
                      ? "ascending"
                      : "descending"
                    : header.column.getCanSort()
                      ? "none"
                      : undefined;

                return (
                  <TableHead
                    key={header.id}
                    aria-sort={ariaSort}
                    className={column?.align === "right" ? "text-end" : undefined}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1 text-start hover:text-ink"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sort === "asc" ? (
                          <ChevronUp className="size-3" aria-hidden="true" />
                        ) : sort === "desc" ? (
                          <ChevronDown className="size-3" aria-hidden="true" />
                        ) : (
                          <ChevronsUpDown className="size-3 text-faint" aria-hidden="true" />
                        )}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                );
              })}
            </tr>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            [0, 1, 2].map((row) => (
              <TableRow key={`skeleton-${row}`}>
                <TableCell colSpan={columnDefs.length}>
                  <Skeleton className="h-3 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnDefs.length} className="py-4 text-center text-muted">
                {emptyLabel}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => {
                  const column = columns.find((item) => item.id === cell.column.id);

                  return (
                    <TableCell
                      key={cell.id}
                      className={column?.align === "right" ? "text-end tabular-nums" : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        page={pageIndex + 1}
        pageCount={Math.max(pageCount, 1)}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        navLabel={paginationLabel}
        pageLabel={(page) => String(page)}
      />
    </div>
  );
}
