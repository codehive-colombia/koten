import {
  formatCurrency,
  formatDate,
  formatNumber,
  type KotenLocale,
  labelsByLocale,
  useKoten,
  useKotenFormatters,
} from "@koten/ui";
import { PageHeader } from "../../components/docs";
import { Section, SubHeading } from "../../components/specimen";

const locales: readonly { id: KotenLocale; label: string }[] = [
  { id: "es", label: "Español" },
  { id: "ja", label: "日本語" },
  { id: "en", label: "English" },
];

const snapshotDate = Date.UTC(2026, 9, 21, 12);

export function TokensFormatPage() {
  const { locale, labels } = useKoten();
  const formatters = useKotenFormatters();
  const current = locales.find((item) => item.id === locale);

  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 言語と書式"
        title="Idioma y formato"
        jp="言葉"
        description="Los componentes no contienen strings: reciben labels por prop o desde KotenProvider. Fechas, moneda y números se formatean con Intl. La documentación se mantiene en español; la interfaz y esta vista previa cambian con el selector de idioma."
        meta="ES · JA · EN · locale en URL"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="vista-previa"
          title="Vista previa"
          jp="現在"
          meta="Responde al selector de idioma"
        >
          <div lang={locale} className="border border-rule bg-surface">
            <div className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
              <p className="text-xs font-semibold">{current?.label ?? locale}</p>
              <code className="text-2xs text-faint">{locale}</code>
            </div>
            <dl className="grid gap-[var(--koten-gap)] p-[var(--koten-panel-p)] sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-2xs text-faint">Label close</dt>
                <dd className="mt-0.5 text-sm font-semibold">{labels.close}</dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">Fecha</dt>
                <dd className="mt-0.5 text-sm tabular-nums">
                  {formatters.formatDate(snapshotDate, { timeZone: "UTC" })}
                </dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">Moneda</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-primary">
                  {formatters.formatCurrency(128000)}
                </dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">Número</dt>
                <dd className="mt-0.5 text-sm tabular-nums">{formatters.formatNumber(1234567)}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section
          id="comparacion"
          title="Comparación"
          jp="比較"
          meta="Los tres idiomas de los demos"
        >
          <div className="overflow-x-auto border border-rule">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">
                Ejemplos de fecha, moneda, número y label en español, japonés e inglés
              </caption>
              <thead>
                <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    Idioma
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    Fecha
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-right font-semibold">
                    Moneda
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-right font-semibold">
                    Número
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    Label: close
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {locales.map((item) => (
                  <tr key={item.id} lang={item.id} className="h-[var(--koten-row-h)]">
                    <th scope="row" className="px-[var(--koten-control-px)] text-xs font-medium">
                      {item.label} <code className="font-mono text-2xs text-faint">{item.id}</code>
                    </th>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-xs">
                      {formatDate(snapshotDate, { locale: item.id, timeZone: "UTC" })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-right text-xs tabular-nums">
                      {formatCurrency(128000, { locale: item.id })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-right text-xs tabular-nums">
                      {formatNumber(1234567, { locale: item.id })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-xs">
                      {labelsByLocale[item.id].close}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="reglas" title="Reglas" jp="規則" meta="Contrato de i18n">
          <SubHeading>Lo que garantiza el sistema</SubHeading>
          <ul className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2">
            {[
              "Los componentes no incluyen strings: reciben labels por prop o de KotenProvider.",
              "JPY se formatea sin decimales; EUR y USD con dos.",
              "El idioma se declara con lang en el documento y en cada fragmento.",
              "Los helpers aceptan códigos cortos o un BCP 47 completo.",
              "La documentación permanece en español; los demos se traducen a JA/ES/EN.",
              "Las fechas y monedas usan Intl, nunca strings concatenadas.",
            ].map((rule) => (
              <li key={rule} className="border-l-2 border-primary pl-2">
                {rule}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
