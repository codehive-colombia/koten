import { PageHeader } from "../../components/docs";
import {
  Section,
  SubHeading,
  TypeFamilies,
  TypeScale,
  ValueTable,
} from "../../components/specimen";
import { lineHeights, typeScale } from "../../data/tokens";

export function TokensTypographyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 文字"
        title="Tipografía"
        jp="文字"
        description="La fuente del sistema es una decisión de rendimiento y cobertura CJK: no se cargan archivos de varios megabytes. La jerarquía se construye con tamaño, peso, color y posición."
        meta="Stack del sistema · 0 bytes de fuentes CJK"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="familias" title="Familias" jp="書体" meta="Sans, serif y mono">
          <TypeFamilies />
        </Section>

        <Section
          id="escala"
          title="Escala"
          jp="大きさ"
          meta="11 px solo para metadatos no críticos"
        >
          <TypeScale items={typeScale} />
        </Section>

        <Section id="interlineado" title="Interlineado y reglas CJK" jp="行" meta="Latin y japonés">
          <div className="grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <SubHeading>Interlineado</SubHeading>
              <div className="mt-[var(--koten-gap)]">
                <ValueTable
                  caption="Tokens de interlineado"
                  headers={["Token", "Valor", "Uso"]}
                  rows={lineHeights.map((item) => ({
                    token: item.token,
                    value: item.value,
                    use: item.use,
                  }))}
                />
              </div>
            </div>
            <div>
              <SubHeading>Reglas CJK</SubHeading>
              <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule text-xs">
                {[
                  "line-break: strict en bloques de texto.",
                  "font-feature-settings: palt solo en titulares.",
                  "Sin text-transform como jerarquía: el japonés no tiene mayúsculas.",
                  "Números tabulares en precios, cantidades y fechas.",
                  'lang="ja" para interlineado y familia correctos.',
                ].map((rule) => (
                  <li
                    key={rule}
                    className="flex min-h-[var(--koten-row-h)] items-center text-muted"
                  >
                    {rule}
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
