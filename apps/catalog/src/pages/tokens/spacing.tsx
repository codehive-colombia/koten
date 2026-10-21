import { PageHeader } from "../../components/docs";
import { Section, SpacingScale, SubHeading } from "../../components/specimen";
import { spacingScale } from "../../data/tokens";

export function TokensSpacingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 余白"
        title="Espaciado"
        jp="余白"
        description="La densidad se construye con una escala corta y consistente. El espacio separa jerarquías; no rellena huecos."
        meta="Escala 2–64 px · padding, gap y separación de secciones"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="escala"
          title="Escala"
          jp="寸法"
          meta="2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64"
        >
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <SpacingScale values={spacingScale} />
            <div>
              <SubHeading>Uso</SubHeading>
              <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule text-xs">
                {[
                  ["Padding de página", "16 px · 12 compacto · 24 amplio"],
                  ["Padding de panel", "10 / 12 / 16 según densidad"],
                  ["Gap de grid", "8 / 12 / 16"],
                  ["Separación de secciones", "24 / 32"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex min-h-[var(--koten-row-h)] flex-wrap items-center justify-between gap-x-3"
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-muted">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
