import {
  Badge,
  buttonVariants,
  cn,
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTitle,
} from "@koten/ui";
import { Link } from "react-router";
import { IndexCard, PageHeader } from "../components/docs";

const principles = [
  "El marco es la unidad: panel, cabecera, regla, borde.",
  "El color señala; no decora.",
  "Tipografía del sistema y texto real, nunca texto en imágenes.",
  "Densidad con ritmo: 4/8/12/16, no todo es una tarjeta.",
  "Accesible por defecto: 12 px mínimo, AA, foco visible, teclado completo.",
] as const;

export function OverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catálogo · 古典"
        title="Koten UI"
        jp="古典"
        description="Sencillez de medios, densidad de información. Un sistema de componentes para el web japonés clásico, validado en un catálogo, un storefront y un ERP."
        meta="Fase 0 cerrada · 3 componentes · 3 temas · 3 densidades"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] sm:grid-cols-2">
        <IndexCard
          to="/tokens"
          title="Fundamentos"
          jp="基礎"
          description="Color, tipografía, espaciado, forma, densidad y temas. El contrato visual del sistema."
        />
        <IndexCard
          to="/components"
          title="Componentes"
          jp="部品"
          description="Button, Panel y Badge con previews, props, código y notas de accesibilidad."
        />
        <IndexCard
          to="/tokens/format"
          title="Idioma y formato"
          jp="言語"
          description="ES/JA/EN, Intl, labels y la vista previa que responde al selector de idioma."
        />
        <div className="flex h-full flex-col border border-rule bg-surface">
          <div className="flex min-h-[var(--koten-row-h)] items-center justify-between border-b border-rule bg-tint px-[var(--koten-panel-p)] text-xs font-semibold">
            Demos <span className="font-normal text-faint">デモ</span>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-[var(--koten-panel-p)] text-xs">
            <a
              href="http://localhost:5174"
              className="flex min-h-[var(--koten-control-h)] items-center justify-between text-link underline-offset-2 hover:underline"
            >
              Storefront HIKARI <span aria-hidden="true">↗</span>
            </a>
            <a
              href="http://localhost:5175"
              className="flex min-h-[var(--koten-control-h)] items-center justify-between text-link underline-offset-2 hover:underline"
            >
              ERP KURA <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[var(--koten-gap)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel>
          <PanelHeader>
            <PanelTitle as="h2">Principios</PanelTitle>
            <PanelActions>
              <Badge tone="new" dot>
                v0.1 POC
              </Badge>
            </PanelActions>
          </PanelHeader>
          <PanelBody>
            <ul className="divide-y divide-rule border-y border-rule text-xs">
              {principles.map((principle, index) => (
                <li key={principle} className="flex min-h-[var(--koten-row-h)] items-center gap-3">
                  <span className="w-5 shrink-0 text-right font-mono text-2xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted">{principle}</span>
                </li>
              ))}
            </ul>
          </PanelBody>
        </Panel>

        <Panel tone="accent">
          <PanelHeader>
            <PanelTitle as="h2">Estado</PanelTitle>
            <PanelActions>
              <Badge tone="success" dot>
                Fase 0 cerrada
              </Badge>
            </PanelActions>
          </PanelHeader>
          <PanelBody>
            <p className="text-xs text-muted">
              El catálogo es la herramienta de trabajo. Los selectores de tema, densidad e idioma
              modifican la interfaz; las muestras fijas comparan valores.
            </p>
            <dl className="mt-[var(--koten-gap)] grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-2xs">
              <dt className="text-faint">Temas</dt>
              <dd className="text-right">Chirashi · Daichō · Kanso</dd>
              <dt className="text-faint">Densidades</dt>
              <dd className="text-right">Compacta · Default · Amplia</dd>
              <dt className="text-faint">Idiomas de UI</dt>
              <dd className="text-right">ES · JA · EN</dd>
            </dl>
            <Link
              to="/tokens"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "mt-[var(--koten-gap)]",
              )}
            >
              Explorar tokens
            </Link>
          </PanelBody>
        </Panel>
      </div>

      <div className="mt-[calc(var(--koten-gap)*2)] border-l-2 border-primary bg-surface p-[var(--koten-panel-p)] text-xs text-muted">
        <strong className="text-ink">Cómo leer este catálogo.</strong> La documentación está en
        español; la interfaz y los ejemplos de formato cambian con el selector de idioma. El tema y
        la densidad afectan toda la página, incluidas las tablas y el espaciado.
      </div>
    </div>
  );
}
