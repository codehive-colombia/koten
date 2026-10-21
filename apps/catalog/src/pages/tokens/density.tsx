import { PageHeader } from "../../components/docs";
import { DensityGrid, Section, SubHeading } from "../../components/specimen";
import { densities } from "../../data/tokens";

export function TokensDensityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 密度"
        title="Densidad"
        jp="密度"
        description="Una misma pieza en tres ritmos. La densidad se declara con data-density en el root y se lee desde variables CSS; no se pasa como prop a cada componente."
        meta="compact · default · comfortable"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="valores" title="Valores" jp="値" meta="Variables por densidad">
          <div className="overflow-x-auto border border-rule">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">Valores de densidad por token</caption>
              <thead>
                <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    Token
                  </th>
                  {densities.map((density) => (
                    <th
                      key={density.id}
                      scope="col"
                      className="px-[var(--koten-control-px)] font-semibold"
                    >
                      {density.label}
                      <span className="block font-normal text-faint">{density.id}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {densities[0]?.values.map((value, index) => (
                  <tr key={value.token} className="h-[var(--koten-row-h)]">
                    <th
                      scope="row"
                      className="px-[var(--koten-control-px)] font-mono text-2xs font-normal text-muted"
                    >
                      {value.token}
                    </th>
                    {densities.map((density) => (
                      <td
                        key={density.id}
                        className="px-[var(--koten-control-px)] font-mono text-xs tabular-nums"
                      >
                        {density.values[index]?.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="demostracion"
          title="Demostración"
          jp="比較"
          meta="La misma pieza en las tres densidades"
        >
          <SubHeading>Tabla y controles</SubHeading>
          <div className="mt-[var(--koten-gap)]">
            <DensityGrid densities={densities} />
          </div>
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">
            Cada muestra lleva su propio <code>data-density</code> para comparar. El resto del
            catálogo responde al selector del encabezado.
          </p>
        </Section>
      </div>
    </div>
  );
}
