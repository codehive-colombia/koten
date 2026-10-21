import { Button, Hanko, Pattern, Rule, SectionHeader, Tategaki } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function SurfacesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 装飾"
        title="Superficies y decorativos"
        jp="装飾"
        description="La jerarquía se construye con reglas, cabeceras y marcos. Hanko, tategaki y pattern son acentos editoriales; no son decoración obligatoria."
        meta="SectionHeader · Rule · Hanko · Tategaki · Pattern"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="section-header"
          title="SectionHeader"
          jp="見出し"
          meta="Título, meta y acciones"
        >
          <div className="space-y-[var(--koten-gap)]">
            <Demo title="Con acciones">
              <SectionHeader
                title="Pedidos recientes"
                jp="最近の注文"
                meta="Últimos 7 días"
                actions={
                  <Button size="sm" variant="outline">
                    Filtrar
                  </Button>
                }
              />
            </Demo>
            <Demo title="Regla doble">
              <SectionHeader
                as="h3"
                title="Especificaciones"
                jp="仕様"
                meta="Producto HIKARI K-1"
                rule="double"
              />
            </Demo>
          </div>
        </Section>

        <Section id="rule" title="Rule" jp="罫" meta="Hairline, strong, double y dashed">
          <div className="grid gap-[calc(var(--koten-gap)*2)]">
            <Rule />
            <Rule variant="strong" />
            <Rule variant="double" />
            <Rule variant="dashed" />
            <Rule label="商品情報" />
          </div>
        </Section>

        <Section id="hanko" title="Hanko" jp="判子" meta="1–4 caracteres · decorativo">
          <div className="flex flex-wrap items-center gap-[calc(var(--koten-gap)*2)]">
            <Hanko size="sm">典</Hanko>
            <Hanko size="md">古典</Hanko>
            <Hanko size="lg">古典紋</Hanko>
            <Hanko label="Sello Koten" size="md">
              典
            </Hanko>
          </div>
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">
            El último sello expone un <code>aria-label</code>; los demás son decorativos.
          </p>
        </Section>

        <Section id="tategaki" title="Tategaki" jp="縦書き" meta="Oculto en mobile · decorativo">
          <div className="flex min-h-56 items-start justify-between border border-rule bg-surface p-[var(--koten-panel-p)]">
            <p className="max-w-sm text-xs text-muted">
              El texto vertical funciona como etiqueta editorial. No reemplaza el contenido
              horizontal y se oculta en mobile para no robar ancho.
            </p>
            <Tategaki className="text-base">古典のデザイン</Tategaki>
          </div>
        </Section>

        <Section id="pattern" title="Pattern" jp="文様" meta="Seigaiha y asanoha · currentColor 8%">
          <div className="grid gap-[var(--koten-gap)] sm:grid-cols-2">
            <div className="relative h-32 overflow-hidden border border-rule bg-surface">
              <Pattern variant="seigaiha" className="absolute inset-0" />
              <span className="absolute bottom-2 start-2 text-2xs font-semibold text-muted">
                Seigaiha · 青海波
              </span>
            </div>
            <div className="relative h-32 overflow-hidden border border-rule bg-surface">
              <Pattern variant="asanoha" className="absolute inset-0" />
              <span className="absolute bottom-2 start-2 text-2xs font-semibold text-muted">
                Asanoha · 麻の葉
              </span>
            </div>
          </div>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Cinco piezas">
          <PropsTable
            caption="Props de superficies y decorativos"
            rows={[
              {
                prop: "SectionHeader rule",
                type: "hairline | strong | double | none",
                default: "strong",
                note: "La regla separa secciones; double es para cambios mayores.",
              },
              {
                prop: "Rule variant",
                type: "hairline | strong | double | dashed",
                default: "hairline",
                note: "Con label, la regla se parte en dos y centra el texto.",
              },
              {
                prop: "Hanko size",
                type: "sm | md | lg",
                default: "md",
                note: "Máximo cuatro caracteres; rotación de −2°.",
              },
              {
                prop: "Tategaki decorative",
                type: "boolean",
                default: "true",
                note: "Por defecto se oculta a lectores de pantalla y en mobile.",
              },
              {
                prop: "Pattern variant",
                type: "seigaiha | asanoha",
                default: "seigaiha",
                note: "Siempre aria-hidden; nunca detrás de texto denso.",
              },
            ]}
          />
          <Code>{`<SectionHeader title="Pedidos recientes" meta="Últimos 7 días" actions={<Button>Filtrar</Button>} />

<Rule variant="double" />
<Rule label="商品情報" />

<Hanko size="md">古典</Hanko>
<Tategaki>古典のデザイン</Tategaki>
<Pattern variant="asanoha" className="absolute inset-0" />`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Decorar sin estorbar">
          <List
            label="Notas de accesibilidad de superficies"
            items={[
              "Rule sin label es un <hr>; el navegador lo expone como separador.",
              "Hanko es decorativo por defecto; si comunica marca, recibe aria-label y role img.",
              "Tategaki se oculta en mobile y a lectores de pantalla salvo que sea contenido real.",
              "Pattern siempre es aria-hidden y vive detrás de texto no crítico.",
              "SectionHeader mantiene el nivel de heading correcto con la prop as.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
