import { IndexCard, PageHeader } from "../../components/docs";

const sections = [
  {
    to: "/tokens/color",
    title: "Color",
    jp: "色",
    description: "Papel, tinta, ai, shu y acentos matsuri; roles semánticos por tema.",
  },
  {
    to: "/tokens/typography",
    title: "Tipografía",
    jp: "文字",
    description: "Familias del sistema, escala, interlineado y reglas CJK.",
  },
  {
    to: "/tokens/spacing",
    title: "Espaciado",
    jp: "余白",
    description: "Escala de 2 a 64 px y su relación con la densidad.",
  },
  {
    to: "/tokens/shape",
    title: "Forma y movimiento",
    jp: "形",
    description: "Radios, bordes, la única sombra permitida, motion y layout.",
  },
  {
    to: "/tokens/density",
    title: "Densidad",
    jp: "密度",
    description: "Compacta, default y amplia; la misma pieza con tres ritmos.",
  },
  {
    to: "/tokens/themes",
    title: "Temas",
    jp: "テーマ",
    description: "Chirashi, Daichō y Kanso sobre la misma estructura.",
  },
  {
    to: "/tokens/format",
    title: "Idioma y formato",
    jp: "言語と書式",
    description: "Fechas, moneda, números y labels con Intl en ES/JA/EN.",
  },
] as const;

export function TokensIndexPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 基礎"
        title="Tokens"
        jp="基礎"
        description="La gramática del sistema vive en variables CSS. Los componentes usan roles semánticos, nunca nombres de color; el tema y la densidad cambian valores, no estructura."
        meta="7 páginas · contrato visual de los tres registros"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        {sections.map((section) => (
          <IndexCard key={section.to} {...section} />
        ))}
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border-l-2 border-primary bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        El selector de tema y densidad del encabezado afecta este catálogo completo. Las muestras
        fijas de comparación (tarjetas de tema y demos de densidad) mantienen su valor para poder
        contrastarlas.
      </div>
    </div>
  );
}
