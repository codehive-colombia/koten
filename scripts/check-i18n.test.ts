import { describe, expect, it } from "vitest";
import { auditSource } from "./check-i18n";

const demo = "apps/erp/src/pages/example.tsx";
const component = "packages/ui/src/components/ui/example.tsx";
const styles = "apps/erp/src/index.css";

function rules(file: string, source: string): string[] {
  return auditSource(file, source).map((finding) => finding.rule);
}

describe("i18n guard", () => {
  it("detects visible text written in a demo's JSX", () => {
    expect(rules(demo, "export const A = () => <p>Guardar pedido</p>;")).toEqual(["jsx-text"]);
  });

  it("detects Japanese text that bypasses copy", () => {
    expect(rules(demo, "export const A = () => <span>保存</span>;")).toEqual(["jsx-text"]);
  });

  it("accepts text that comes from the dictionaries", () => {
    expect(rules(demo, "export const A = () => <p>{copy.save}</p>;")).toEqual([]);
    expect(rules(demo, "export const A = () => <p aria-label={copy.save} />;")).toEqual([]);
  });

  it("does not mistake signs, numbers, entities or generic types for text", () => {
    expect(rules(demo, "export const A = () => <p>— · 12 &amp;</p>;")).toEqual([]);
    expect(rules(component, "const value = useState<{ a: string }>(null);")).toEqual([]);
  });

  it("detects literal accessible labels in demos", () => {
    expect(rules(demo, '<Button aria-label="Cerrar" />')).toEqual(["literal-attribute"]);
    expect(rules(demo, '<img alt="" src="x.svg" />')).toEqual([]);
  });

  it("detects formatting that ignores the provider locale", () => {
    expect(rules(demo, "const value = price.toLocaleString();")).toEqual(["intl-format"]);
    expect(rules(demo, "const value = date.toLocaleDateString();")).toEqual(["intl-format"]);
    expect(rules(component, "const value = ratio.toFixed(2);")).toEqual(["intl-format"]);
  });

  it("detects physical utilities in components and styles", () => {
    expect(rules(component, '<div className="text-right" />')).toEqual(["physical-direction"]);
    expect(rules(component, '<div className="border-l-2 pl-2" />')).toEqual([
      "physical-direction",
      "physical-direction",
    ]);
    expect(rules(styles, ".cell { padding-left: 8px; }")).toEqual(["physical-direction"]);
  });

  it("accepts logical utilities and named tokens", () => {
    expect(rules(component, '<div className="text-end border-rule ps-2 border-s-2" />')).toEqual(
      [],
    );
  });

  it("respects the explicit i18n-allow exception", () => {
    const source = "// i18n-allow: jsx-text brand name\nexport const A = () => <p>KURA</p>;";

    expect(rules(demo, source)).toEqual([]);
  });
});
