import { Button, buttonVariants } from "@koten/ui";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function ButtonPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Componentes · ボタン"
        title="Button"
        jp="ボタン"
        description="La acción principal del sistema. El color lo decide el tema; el botón solo declara una variante semántica y un tamaño."
        meta="CVA + Base UI · render · loading"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section
          id="variantes"
          title="Variantes"
          jp="種類"
          meta="secondary · primary · outline · ghost · danger · link"
        >
          <Demo title="Todas las variantes">
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
              <Button>Secondary</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
          </Demo>
        </Section>

        <Section
          id="tamanos"
          title="Tamaños y estados"
          jp="大きさ"
          meta="xs–lg · loading · disabled"
        >
          <div className="space-y-[var(--koten-gap)]">
            <Demo title="Tamaños">
              <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
                <Button size="xs" variant="primary">
                  xs
                </Button>
                <Button size="sm" variant="primary">
                  sm
                </Button>
                <Button size="md" variant="primary">
                  md
                </Button>
                <Button size="lg" variant="primary">
                  lg
                </Button>
              </div>
            </Demo>
            <Demo title="Estados y composición">
              <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
                <Button variant="primary" loading>
                  Guardando
                </Button>
                <Button variant="outline" disabled>
                  Deshabilitado
                </Button>
                <a href="#variantes" className={buttonVariants({ variant: "secondary" })}>
                  Enlace con buttonVariants
                </a>
                <Button render={<a href="#variantes" />} nativeButton={false} variant="outline">
                  Composición render
                </Button>
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="API mínima y copiable">
          <PropsTable
            caption="Props de Button"
            rows={[
              {
                prop: "variant",
                type: "primary | secondary | outline | ghost | danger | link",
                default: "secondary",
                note: "El color lo decide el tema, no el componente.",
              },
              {
                prop: "size",
                type: "xs | sm | md | lg",
                default: "md",
                note: "La altura sale de --koten-control-h; el tamaño ajusta texto y padding.",
              },
              {
                prop: "loading",
                type: "boolean",
                default: "false",
                note: "Agrega spinner, aria-busy y disabled.",
              },
              {
                prop: "render",
                type: "ReactElement | función",
                default: "—",
                note: "Composición de Base UI, sin asChild.",
              },
            ]}
          />
          <Code>{`<Button variant="primary" size="md">購入する</Button>
<Button variant="outline" loading>Guardando</Button>
<a className={buttonVariants({ variant: "secondary" })} href="/docs">
  Documentación
</a>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Nombre, foco y estado">
          <List
            label="Notas de accesibilidad de Button"
            items={[
              "El nombre accesible sale del contenido visible; si es icono, exige aria-label.",
              "loading deshabilita el botón y anuncia aria-busy; no cambia el layout.",
              "Para navegar se usa un <a> con buttonVariants, no un <button>.",
              "El foco visible usa el token --koten-focus con offset de 1 px.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
