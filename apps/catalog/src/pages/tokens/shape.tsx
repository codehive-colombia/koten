import { PageHeader } from "../../components/docs";
import { Section, ShapeSpecimen, SubHeading, ValueTable } from "../../components/specimen";
import { layoutWidths, motionTokens, radii } from "../../data/tokens";

export function TokensShapePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 形"
        title="Forma y movimiento"
        jp="形"
        description="Marcos de 1 px, radios mínimos y una sola sombra reservada para overlays. El movimiento se limita a color y presencia; nada rebota."
        meta="Radios ≤ 3 px · única sombra · motion 120–200 ms"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="forma" title="Forma" jp="形" meta="Radios, bordes y sombra">
          <ShapeSpecimen radii={radii} />
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">
            Bordes de 1 px; 3 px double solo para separar secciones mayores. La única sombra es la
            de overlays: los paneles no flotan.
          </p>
        </Section>

        <Section id="movimiento" title="Movimiento y layout" jp="動き" meta="Duración y anchos">
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-2">
            <div>
              <SubHeading>Movimiento</SubHeading>
              <div className="mt-[var(--koten-gap)]">
                <ValueTable
                  caption="Duración de movimiento"
                  headers={["Token", "Valor", "Uso"]}
                  rows={motionTokens}
                />
              </div>
            </div>
            <div>
              <SubHeading>Layout</SubHeading>
              <div className="mt-[var(--koten-gap)]">
                <ValueTable
                  caption="Anchos de layout"
                  headers={["Token", "Valor", "Uso"]}
                  rows={layoutWidths.map((item) => ({
                    token: item.token,
                    value: `${item.px} px`,
                    use: item.use,
                  }))}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
