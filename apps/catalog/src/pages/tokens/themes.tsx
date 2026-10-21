import { PageHeader } from "../../components/docs";
import { Section, SubHeading, ThemeCard } from "../../components/specimen";
import { themes } from "../../data/tokens";

export function TokensThemesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · テーマ"
        title="Temas"
        jp="三つの面"
        description="Chirashi, Daichō y Kanso comparten estructura y componentes. Cambian los valores semánticos: el primario, el foco y la selección. El tema se declara una vez en el root."
        meta="data-theme · misma estructura, distintos valores"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="comparacion" title="Comparación" jp="比較" meta="Una pieza, tres registros">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">
            Las tarjetas mantienen su tema para poder compararlas. El resto del catálogo cambia con
            el selector del encabezado.
          </p>
        </Section>

        <Section id="reglas" title="Reglas" jp="規則" meta="Lo que cambia y lo que no">
          <SubHeading>Contrato del tema</SubHeading>
          <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule text-xs">
            {[
              "El tema cambia --koten-primary, --koten-focus y --koten-selection.",
              "El papel, la tinta y las reglas se mantienen estables.",
              "Los componentes usan roles (bg-primary), nunca nombres de color.",
              "Chirashi lleva shu al primario; Daichō y Kanso llevan ai.",
              "El tema no se pasa por prop: se hereda de [data-theme].",
            ].map((rule) => (
              <li key={rule} className="flex min-h-[var(--koten-row-h)] items-center text-muted">
                {rule}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
