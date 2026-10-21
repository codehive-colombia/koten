import {
  IconButton,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@koten/ui";
import { Download, Filter, Grid2X2, List, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { Code, Demo, List as DocList, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

export function ControlsPage() {
  const [view, setView] = useState(["grid"]);
  const [density, setDensity] = useState(["compact"]);

  return (
    <div>
      <PageHeader
        eyebrow="Componentes · 操作"
        title="Controles"
        jp="操作"
        description="IconButton, ToggleGroup y Toolbar empaquetan acciones frecuentes sin perder teclado. Los iconos siempre llevan nombre accesible."
        meta="icon-button · toggle-group · toolbar"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="icon-button" title="IconButton" jp="アイコン" meta="Acción compacta">
          <Demo title="Tamaños y variantes">
            <div className="flex flex-wrap items-center gap-[var(--koten-gap)]">
              <IconButton label="Descargar" variant="outline" size="sm">
                <Download className="size-3.5" aria-hidden="true" />
              </IconButton>
              <IconButton label="Descargar" variant="outline">
                <Download className="size-4" aria-hidden="true" />
              </IconButton>
              <IconButton label="Configuración" variant="primary" size="lg">
                <Settings className="size-4" aria-hidden="true" />
              </IconButton>
              <IconButton label="Eliminar" variant="danger">
                <Trash2 className="size-4" aria-hidden="true" />
              </IconButton>
              <IconButton label="Eliminar" variant="ghost" disabled>
                <Trash2 className="size-4" aria-hidden="true" />
              </IconButton>
            </div>
          </Demo>
        </Section>

        <Section id="toggle-group" title="ToggleGroup" jp="切替グループ" meta="Roving focus">
          <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <Demo title="Vista">
              <ToggleGroup
                label="Vista de pedidos"
                value={view}
                onValueChange={setView}
                items={[
                  { value: "grid", label: "Cuadrícula", icon: <Grid2X2 className="size-3.5" /> },
                  { value: "list", label: "Lista", icon: <List className="size-3.5" /> },
                ]}
              />
            </Demo>
            <Demo title="Densidad">
              <ToggleGroup
                label="Densidad de la tabla"
                value={density}
                onValueChange={setDensity}
                items={[
                  { value: "compact", label: "Compacta" },
                  { value: "default", label: "Default" },
                  { value: "comfortable", label: "Amplia" },
                ]}
              />
            </Demo>
          </div>
        </Section>

        <Section id="toolbar" title="Toolbar" jp="ツールバー" meta="Acciones agrupadas">
          <Toolbar label="Acciones de pedidos">
            <ToolbarGroup label="Vista">
              <ToolbarButton label="Cuadrícula">
                <Grid2X2 className="size-4" aria-hidden="true" />
              </ToolbarButton>
              <ToolbarButton label="Lista">
                <List className="size-4" aria-hidden="true" />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup label="Datos">
              <ToolbarButton label="Filtrar">
                <Filter className="size-4" aria-hidden="true" />
              </ToolbarButton>
              <ToolbarButton label="Descargar">
                <Download className="size-4" aria-hidden="true" />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarButton label="Eliminar selección" className="text-danger">
              <Trash2 className="size-4" aria-hidden="true" />
            </ToolbarButton>
          </Toolbar>
        </Section>

        <Section id="props" title="Props y código" jp="使い方" meta="Tres piezas">
          <PropsTable
            caption="Props de controles"
            rows={[
              {
                prop: "IconButton label",
                type: "string",
                default: "—",
                note: "Obligatorio; es el nombre accesible del icono.",
              },
              {
                prop: "IconButton size",
                type: "sm | md | lg",
                default: "md",
                note: "Cuadrado; la altura sale de la densidad.",
              },
              {
                prop: "ToggleGroup value",
                type: "readonly string[]",
                default: "—",
                note: "Controlado; pressed se refleja con aria-pressed.",
              },
              {
                prop: "ToggleGroup multiple",
                type: "boolean",
                default: "false",
                note: "Permite más de un valor presionado.",
              },
              {
                prop: "Toolbar orientation",
                type: "horizontal | vertical",
                default: "horizontal",
                note: "Roving tabindex y flechas de Base UI.",
              },
            ]}
          />
          <Code>{`<IconButton label="Descargar" variant="outline">
  <Download aria-hidden="true" />
</IconButton>

<ToggleGroup
  label="Vista"
  value={view}
  onValueChange={setView}
  items={viewItems}
/>

<Toolbar label="Acciones de pedidos">
  <ToolbarGroup label="Vista">
    <ToolbarButton label="Cuadrícula"><Grid2X2 /></ToolbarButton>
    <ToolbarButton label="Lista"><List /></ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
</Toolbar>`}</Code>
        </Section>

        <Section id="a11y" title="Accesibilidad" jp="配慮" meta="Nombre, estado y foco">
          <DocList
            label="Notas de accesibilidad de controles"
            items={[
              "IconButton exige aria-label; el icono es decorativo.",
              "ToggleGroup expone aria-pressed y navegación con flechas.",
              "Toolbar usa roving tabindex; solo un control está en el orden de tabulación.",
              "Los separadores de toolbar no son focos.",
              "El estado pressed no depende solo del color: cambia fondo y texto.",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}
