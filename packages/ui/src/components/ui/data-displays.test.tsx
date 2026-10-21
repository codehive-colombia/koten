import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BarChart } from "./bar-chart";
import { DataTable, type DataTableColumn } from "./data-table";
import { Sparkline } from "./sparkline";
import { StatCard } from "./stat-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

type Order = {
  id: string;
  customer: string;
  total: number;
};

const orders: Order[] = [
  { id: "A-001", customer: "KURA", total: 128000 },
  { id: "B-002", customer: "HIKARI", total: 84000 },
  { id: "C-003", customer: "Matsuri", total: 56000 },
  { id: "D-004", customer: "Aoyama", total: 32000 },
  { id: "E-005", customer: "KURA", total: 99000 },
  { id: "F-006", customer: "HIKARI", total: 15000 },
];

const columns: DataTableColumn<Order>[] = [
  {
    id: "id",
    header: "Pedido",
    cell: (row) => row.id,
    sortValue: (row) => row.id,
    sortable: true,
  },
  {
    id: "customer",
    header: "Cliente",
    cell: (row) => row.customer,
  },
  {
    id: "total",
    header: "Total",
    cell: (row) => `¥${row.total.toLocaleString("es-ES")}`,
    sortValue: (row) => row.total,
    sortable: true,
    align: "right",
  },
];

describe("Table", () => {
  it("renders semantic table content", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A-001</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("columnheader", { name: "Pedido" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "A-001" })).toBeInTheDocument();
  });
});

describe("DataTable", () => {
  it("paginates, selects and sorts rows", () => {
    const onSelectionChange = vi.fn();

    render(
      <DataTable
        data={orders}
        columns={columns}
        getRowId={(row) => row.id}
        caption="Pedidos de prueba"
        emptyLabel="Sin pedidos"
        previousLabel="Anterior"
        nextLabel="Siguiente"
        paginationLabel="Paginación"
        selectAllLabel="Seleccionar todo"
        selectRowLabel={(id) => `Seleccionar ${id}`}
        selectedLabel={(count) => `${count} seleccionados`}
        selectable
        pageSize={3}
        onSelectionChange={onSelectionChange}
      />,
    );

    expect(screen.getByRole("table", { name: "Pedidos de prueba" })).toBeInTheDocument();
    expect(screen.getByText("A-001")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "Seleccionar A-001" }));
    expect(screen.getByText("1 seleccionados")).toBeInTheDocument();
    expect(onSelectionChange).toHaveBeenCalledWith(["A-001"]);

    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(screen.getByText("D-004")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Pedido" }));
    expect(screen.getByRole("columnheader", { name: /Pedido/ })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("renders empty and loading states", () => {
    const { container, rerender } = render(
      <DataTable
        data={[]}
        columns={columns}
        getRowId={(row) => row.id}
        emptyLabel="Sin pedidos"
        previousLabel="Anterior"
        nextLabel="Siguiente"
        paginationLabel="Paginación"
        selectAllLabel="Todo"
        selectRowLabel={(id) => id}
        selectedLabel={(count) => String(count)}
      />,
    );

    expect(screen.getByText("Sin pedidos")).toBeInTheDocument();

    rerender(
      <DataTable
        data={orders}
        columns={columns}
        getRowId={(row) => row.id}
        emptyLabel="Sin pedidos"
        previousLabel="Anterior"
        nextLabel="Siguiente"
        paginationLabel="Paginación"
        selectAllLabel="Todo"
        selectRowLabel={(id) => id}
        selectedLabel={(count) => String(count)}
        loading
      />,
    );

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3);
  });
});

describe("StatCard", () => {
  it("renders label, value, delta and sparkline", () => {
    render(
      <StatCard
        label="Ingresos"
        value="¥128.000"
        delta={{ value: "+12 %", tone: "success" }}
        meta="Últimos 7 días"
        sparkline={<Sparkline data={[1, 4, 2, 8]} label="Tendencia de ingresos" />}
      />,
    );

    expect(screen.getByText("Ingresos")).toBeInTheDocument();
    expect(screen.getByText("¥128.000")).toBeInTheDocument();
    expect(screen.getByText("+12 %")).toHaveClass("text-success");
    expect(screen.getByRole("img", { name: "Tendencia de ingresos" })).toBeInTheDocument();
  });
});

describe("BarChart", () => {
  it("provides an accessible table fallback", () => {
    render(
      <BarChart
        label="Pedidos por día"
        data={[
          { label: "Lun", value: 12 },
          { label: "Mar", value: 18 },
        ]}
      />,
    );

    expect(screen.getByRole("table", { name: "Pedidos por día" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Lun" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "18" })).toBeInTheDocument();
  });
});
