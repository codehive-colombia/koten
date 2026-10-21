import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { KotenProvider } from "../../i18n/provider";
import { Calendar, DatePicker } from "./date-picker";

const october = new Date(2026, 9, 21);

function renderIn(ui: React.ReactElement, locale: "es" | "ja" | "en" = "es") {
  return render(<KotenProvider locale={locale}>{ui}</KotenProvider>);
}

function day(name: RegExp) {
  return screen.getByRole("button", { name });
}

describe("Calendar", () => {
  it("shows the month and weeks per locale", () => {
    renderIn(<Calendar defaultMonth={october} selected={october} />);

    expect(screen.getByRole("table", { name: /octubre de 2026/i })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")[0]).toHaveAccessibleName("lunes");
  });

  it("starts the week on Sunday for English", () => {
    renderIn(<Calendar defaultMonth={october} />, "en");

    expect(screen.getAllByRole("columnheader")[0]).toHaveAccessibleName("Sunday");
    expect(screen.getByRole("table", { name: /October 2026/i })).toBeInTheDocument();
  });

  it("navigates with arrows, Home/End and PageDown", () => {
    renderIn(<Calendar defaultMonth={october} selected={october} autoFocus />);

    const grid = screen.getByRole("table");
    day(/miércoles, 21 de octubre de 2026/i).focus();

    fireEvent.keyDown(grid, { key: "ArrowRight" });
    expect(document.activeElement).toHaveAccessibleName(/jueves, 22 de octubre de 2026/i);

    fireEvent.keyDown(grid, { key: "ArrowDown" });
    expect(document.activeElement).toHaveAccessibleName(/jueves, 29 de octubre de 2026/i);

    fireEvent.keyDown(grid, { key: "Home" });
    expect(document.activeElement).toHaveAccessibleName(/lunes, 26 de octubre de 2026/i);

    fireEvent.keyDown(grid, { key: "PageDown" });
    expect(screen.getByRole("table", { name: /noviembre de 2026/i })).toBeInTheDocument();
    expect(document.activeElement).toHaveAccessibleName(/jueves, 26 de noviembre de 2026/i);
  });

  it("selects with Enter and respects min/max", () => {
    const onSelect = vi.fn();

    renderIn(
      <Calendar
        defaultMonth={october}
        selected={october}
        min={new Date(2026, 9, 20)}
        max={new Date(2026, 9, 24)}
        onSelect={onSelect}
        autoFocus
      />,
    );

    expect(day(/martes, 20 de octubre de 2026/i)).toBeEnabled();
    expect(day(/sábado, 24 de octubre de 2026/i)).toBeEnabled();
    expect(screen.getByRole("button", { name: /domingo, 25 de octubre de 2026/i })).toBeDisabled();

    day(/miércoles, 21 de octubre de 2026/i).focus();
    fireEvent.keyDown(screen.getByRole("table"), { key: "Enter" });

    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 9, 21));
  });
});

describe("DatePicker", () => {
  it("associates the label and shows the formatted date", () => {
    renderIn(<DatePicker label="Fecha de entrega" defaultValue={october} />);

    expect(screen.getByRole("button", { name: /Fecha de entrega/ })).toHaveTextContent(
      "21 oct 2026",
    );
  });

  it("opens the panel, selects a day and returns focus", () => {
    const onChange = vi.fn();

    renderIn(
      <DatePicker
        label="Fecha de entrega"
        defaultValue={october}
        defaultMonth={october}
        onValueChange={onChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: /Fecha de entrega/ });
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Fecha de entrega" })).toBeInTheDocument();

    fireEvent.click(day(/jueves, 22 de octubre de 2026/i));

    expect(onChange).toHaveBeenCalledWith(new Date(2026, 9, 22));
    expect(trigger).toHaveTextContent("22 oct 2026");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes with Escape and with the field button", () => {
    renderIn(<DatePicker label="Entrega" defaultValue={october} defaultMonth={october} />);

    const trigger = screen.getByRole("button", { name: /Entrega/ });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("table"), { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("selects a full range and shows it", () => {
    const onChange = vi.fn();

    renderIn(
      <DatePicker mode="range" label="Periodo" defaultMonth={october} onValueChange={onChange} />,
    );

    const trigger = screen.getByRole("button", { name: /Periodo/ });
    fireEvent.click(trigger);

    fireEvent.click(day(/sábado, 10 de octubre de 2026/i));
    expect(onChange).toHaveBeenLastCalledWith({ start: new Date(2026, 9, 10), end: null });

    fireEvent.click(day(/miércoles, 14 de octubre de 2026/i));
    expect(onChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 9, 10),
      end: new Date(2026, 9, 14),
    });
    expect(trigger).toHaveTextContent("10 oct 2026 – 14 oct 2026");
  });

  it("reverses the range when the second day comes earlier", () => {
    const onChange = vi.fn();

    renderIn(
      <DatePicker mode="range" label="Periodo" defaultMonth={october} onValueChange={onChange} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Periodo/ }));
    fireEvent.click(day(/miércoles, 14 de octubre de 2026/i));
    fireEvent.click(day(/sábado, 10 de octubre de 2026/i));

    expect(onChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 9, 10),
      end: new Date(2026, 9, 14),
    });
  });
});
