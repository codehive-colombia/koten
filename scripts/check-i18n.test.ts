import { describe, expect, it } from "vitest";
import { auditSource } from "./check-i18n";

const demo = "apps/erp/src/pages/example.tsx";
const component = "packages/ui/src/components/ui/example.tsx";
const styles = "apps/erp/src/index.css";

function rules(file: string, source: string): string[] {
  return auditSource(file, source).map((finding) => finding.rule);
}

describe("guardia de i18n", () => {
  it("detecta texto visible escrito en el JSX de una demo", () => {
    expect(rules(demo, "export const A = () => <p>Guardar pedido</p>;")).toEqual(["jsx-text"]);
  });

  it("detecta texto en japonés sin pasar por copy", () => {
    expect(rules(demo, "export const A = () => <span>保存</span>;")).toEqual(["jsx-text"]);
  });

  it("acepta texto que viene de los diccionarios", () => {
    expect(rules(demo, "export const A = () => <p>{copy.save}</p>;")).toEqual([]);
    expect(rules(demo, "export const A = () => <p aria-label={copy.save} />;")).toEqual([]);
  });

  it("no confunde signos, números, entidades ni tipos genéricos con texto", () => {
    expect(rules(demo, "export const A = () => <p>— · 12 &amp;</p>;")).toEqual([]);
    expect(rules(component, "const value = useState<{ a: string }>(null);")).toEqual([]);
  });

  it("detecta labels accesibles literales en demos", () => {
    expect(rules(demo, '<Button aria-label="Cerrar" />')).toEqual(["literal-attribute"]);
    expect(rules(demo, '<img alt="" src="x.svg" />')).toEqual([]);
  });

  it("detecta formateo que ignora el locale del provider", () => {
    expect(rules(demo, "const value = price.toLocaleString();")).toEqual(["intl-format"]);
    expect(rules(demo, "const value = date.toLocaleDateString();")).toEqual(["intl-format"]);
    expect(rules(component, "const value = ratio.toFixed(2);")).toEqual(["intl-format"]);
  });

  it("detecta utilidades físicas en componentes y estilos", () => {
    expect(rules(component, '<div className="text-right" />')).toEqual(["physical-direction"]);
    expect(rules(component, '<div className="border-l-2 pl-2" />')).toEqual([
      "physical-direction",
      "physical-direction",
    ]);
    expect(rules(styles, ".cell { padding-left: 8px; }")).toEqual(["physical-direction"]);
  });

  it("acepta las utilidades lógicas y los tokens con nombre", () => {
    expect(rules(component, '<div className="text-end border-rule ps-2 border-s-2" />')).toEqual(
      [],
    );
  });

  it("respeta la excepción explícita i18n-allow", () => {
    const source = "// i18n-allow: jsx-text nombre de marca\nexport const A = () => <p>KURA</p>;";

    expect(rules(demo, source)).toEqual([]);
  });
});
