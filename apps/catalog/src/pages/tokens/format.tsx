// biome-ignore-all lint/a11y/noNoninteractiveTabindex: regiones desplazables accesibles con teclado (F4-002).
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

const localeNames: readonly { id: KotenLocale; label: string }[] = [
  { id: "es", label: "Español" },
  { id: "ja", label: "日本語" },
  { id: "en", label: "English" },
];

const snapshotDate = Date.UTC(2026, 9, 21, 12);

const copy = {
  es: {
    eyebrow: "Fundamentos · 言語と書式",
    title: "Idioma y formato",
    description:
      "Los componentes no contienen strings: reciben labels por prop o desde KotenProvider. Fechas, moneda y números se formatean con Intl. El cuerpo de la documentación también cambia con el selector de idioma.",
    meta: "ES · JA · EN · locale en URL",
    preview: {
      title: "Vista previa",
      meta: "Responde al selector de idioma",
      closeLabel: "Label close",
      date: "Fecha",
      currency: "Moneda",
      number: "Número",
    },
    comparison: {
      title: "Comparación",
      meta: "Los tres idiomas de los demos",
      caption: "Ejemplos de fecha, moneda, número y label en español, japonés e inglés",
      language: "Idioma",
      date: "Fecha",
      currency: "Moneda",
      number: "Número",
      close: "Label: close",
    },
    rules: {
      title: "Reglas",
      meta: "Contrato de i18n",
      heading: "Lo que garantiza el sistema",
      items: [
        "Los componentes no incluyen strings: reciben labels por prop o de KotenProvider.",
        "JPY se formatea sin decimales; EUR y USD con dos.",
        "El idioma se declara con lang en el documento y en cada fragmento.",
        "Los helpers aceptan códigos cortos o un BCP 47 completo.",
        "La documentación y los demos se mantienen completos en ES/JA/EN.",
        "Las fechas y monedas usan Intl, nunca strings concatenadas.",
      ],
    },
  },
  ja: {
    eyebrow: "基礎 · 言語と書式",
    title: "言語と書式",
    description:
      "コンポーネントは文字列を持たない。ラベルはpropまたはKotenProviderから受け取る。日付、通貨、数値はIntlで整形する。ドキュメント本文も言語セレクタで切り替わる。",
    meta: "ES · JA · EN · URLにlocale",
    preview: {
      title: "プレビュー",
      meta: "言語セレクタに反応する",
      closeLabel: "ラベル: close",
      date: "日付",
      currency: "通貨",
      number: "数値",
    },
    comparison: {
      title: "比較",
      meta: "デモの3言語",
      caption: "スペイン語・日本語・英語での日付、通貨、数値、ラベルの例",
      language: "言語",
      date: "日付",
      currency: "通貨",
      number: "数値",
      close: "ラベル: close",
    },
    rules: {
      title: "規則",
      meta: "i18nの契約",
      heading: "システムが保証すること",
      items: [
        "コンポーネントは文字列を含まない。ラベルはpropまたはKotenProviderから受け取る。",
        "JPYは小数なし、EURとUSDは小数2桁で整形する。",
        "言語は文書と各断片の lang で宣言する。",
        "ヘルパーは短いコードも完全なBCP 47も受け付ける。",
        "ドキュメントとデモはES/JA/ENで完全に保たれる。",
        "日付と通貨はIntlを使い、文字列連結はしない。",
      ],
    },
  },
  en: {
    eyebrow: "Foundations · 言語と書式",
    title: "Language & format",
    description:
      "Components contain no strings: they receive labels by prop or from KotenProvider. Dates, currency and numbers are formatted with Intl. The documentation body also follows the language selector.",
    meta: "ES · JA · EN · locale in URL",
    preview: {
      title: "Preview",
      meta: "Follows the language selector",
      closeLabel: "Label close",
      date: "Date",
      currency: "Currency",
      number: "Number",
    },
    comparison: {
      title: "Comparison",
      meta: "The three demo languages",
      caption: "Examples of date, currency, number and label in Spanish, Japanese and English",
      language: "Language",
      date: "Date",
      currency: "Currency",
      number: "Number",
      close: "Label: close",
    },
    rules: {
      title: "Rules",
      meta: "i18n contract",
      heading: "What the system guarantees",
      items: [
        "Components include no strings: labels come from props or KotenProvider.",
        "JPY is formatted without decimals; EUR and USD with two.",
        "Language is declared with lang on the document and on each fragment.",
        "Helpers accept short codes or a full BCP 47 tag.",
        "Documentation and demos stay complete in ES/JA/EN.",
        "Dates and currencies use Intl, never concatenated strings.",
      ],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensFormatPage() {
  const { locale, labels } = useKoten();
  const formatters = useKotenFormatters();
  const t = copyByLocale[locale];
  const current = localeNames.find((item) => item.id === locale);

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="言葉"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="vista-previa" title={t.preview.title} jp="現在" meta={t.preview.meta}>
          <div lang={locale} className="border border-rule bg-surface">
            <div className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
              <p className="text-xs font-semibold">{current?.label ?? locale}</p>
              <code className="text-2xs text-faint">{locale}</code>
            </div>
            <dl className="grid gap-[var(--koten-gap)] p-[var(--koten-panel-p)] sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-2xs text-faint">{t.preview.closeLabel}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{labels.close}</dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">{t.preview.date}</dt>
                <dd className="mt-0.5 text-sm tabular-nums">
                  {formatters.formatDate(snapshotDate, { timeZone: "UTC" })}
                </dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">{t.preview.currency}</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-primary">
                  {formatters.formatCurrency(128000)}
                </dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">{t.preview.number}</dt>
                <dd className="mt-0.5 text-sm tabular-nums">{formatters.formatNumber(1234567)}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section id="comparacion" title={t.comparison.title} jp="比較" meta={t.comparison.meta}>
          <div tabIndex={0} className="overflow-x-auto border border-rule">
            <table className="w-full min-w-[40rem] border-collapse text-start">
              <caption className="sr-only">{t.comparison.caption}</caption>
              <thead>
                <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    {t.comparison.language}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    {t.comparison.date}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-end font-semibold">
                    {t.comparison.currency}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-end font-semibold">
                    {t.comparison.number}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    {t.comparison.close}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {localeNames.map((item) => (
                  <tr key={item.id} lang={item.id} className="h-[var(--koten-row-h)]">
                    <th scope="row" className="px-[var(--koten-control-px)] text-xs font-medium">
                      {item.label} <code className="font-mono text-2xs text-faint">{item.id}</code>
                    </th>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-xs">
                      {formatDate(snapshotDate, { locale: item.id, timeZone: "UTC" })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-end text-xs tabular-nums">
                      {formatCurrency(128000, { locale: item.id })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-end text-xs tabular-nums">
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

        <Section id="reglas" title={t.rules.title} jp="規則" meta={t.rules.meta}>
          <SubHeading>{t.rules.heading}</SubHeading>
          <ul className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2">
            {t.rules.items.map((rule) => (
              <li key={rule} className="border-s-2 border-primary ps-2">
                {rule}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
