import { Badge } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const tones = ["neutral", "info", "success", "warning", "danger", "sale", "new"] as const;

export function BadgePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 印"
        title="Badge"
        jp="印"
        description="Un metadato breve con tono y apariencia. El color refuerza el estado, pero el texto siempre comunica la información."
        meta="7 tonos × 3 apariencias · punto decorativo"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="apariencias" title="Apariencias" jp="見た目" meta="soft · solid · outline">
          <div className="space-y-[var(--koten-gap)]">
            <Demo title="Soft">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge>Neutral</Badge>
                <Badge tone="info">Info</Badge>
                <Badge tone="success" dot>
                  En stock
                </Badge>
                <Badge tone="warning" dot>
                  Últimas unidades
                </Badge>
                <Badge tone="danger">Cancelado</Badge>
                <Badge tone="sale">Rebaja</Badge>
                <Badge tone="new">Nuevo</Badge>
              </div>
            </Demo>
            <Demo title="Solid">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge appearance="solid">Neutral</Badge>
                <Badge tone="info" appearance="solid">
                  Info
                </Badge>
                <Badge tone="success" appearance="solid" dot>
                  En stock
                </Badge>
                <Badge tone="warning" appearance="solid" dot>
                  Últimas unidades
                </Badge>
                <Badge tone="danger" appearance="solid">
                  Cancelado
                </Badge>
                <Badge tone="sale" appearance="solid">
                  Rebaja
                </Badge>
                <Badge tone="new" appearance="solid">
                  Nuevo
                </Badge>
              </div>
            </Demo>
            <Demo title="Outline">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge appearance="outline">Neutral</Badge>
                <Badge tone="info" appearance="outline">
                  Info
                </Badge>
                <Badge tone="success" appearance="outline" dot>
                  En stock
                </Badge>
                <Badge tone="warning" appearance="outline" dot>
                  Últimas unidades
                </Badge>
                <Badge tone="danger" appearance="outline">
                  Cancelado
                </Badge>
                <Badge tone="sale" appearance="outline">
                  Rebaja
                </Badge>
                <Badge tone="new" appearance="outline">
                  Nuevo
                </Badge>
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="tonos" title="Tonos" jp="色調" meta={tones.join(" · ")}>
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2 lg:grid-cols-4">
            {tones.map((tone) => (
              <div key={tone} className="border border-rule bg-surface p-[var(--koten-panel-p)]">
                <p className="text-2xs font-semibold text-faint">{tone}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone={tone}>Soft</Badge>
                  <Badge tone={tone} appearance="solid">
                    Solid
                  </Badge>
                  <Badge tone={tone} appearance="outline">
                    Outline
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="API mínima">
          <PropsTable
            caption="Props de Badge"
            rows={[
              {
                prop: "tone",
                type: "neutral | info | success | warning | danger | sale | new",
                default: "neutral",
                note: "sale siempre shu y new siempre ai, sin importar el tema.",
              },
              {
                prop: "appearance",
                type: "soft | solid | outline",
                default: "soft",
                note: "solid usa texto blanco sobre el tono.",
              },
              {
                prop: "dot",
                type: "boolean",
                default: "false",
                note: "Punto decorativo con aria-hidden; el texto sigue siendo la señal.",
              },
            ]}
          />
          <Code>{`<Badge tone="success" dot>En stock</Badge>
<Badge tone="sale" appearance="solid">Rebaja</Badge>
<Badge tone="warning" appearance="outline">Últimas unidades</Badge>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Estado y color">
          <List
            label="Notas de accesibilidad de Badge"
            items={[
              "El estado nunca se comunica solo con color: siempre hay texto.",
              "El punto es decorativo y lleva aria-hidden; no duplica información.",
              "El texto usa 11 px solo como metadato; el mínimo de 12 px se reserva para body.",
              "Los tonos de texto cumplen AA sobre papel y superficie; el test de tokens lo verifica.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
