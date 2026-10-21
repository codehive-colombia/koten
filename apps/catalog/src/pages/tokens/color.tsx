import { PageHeader } from "../../components/docs";
import { ColorGrid, RoleTable, Section, SubHeading } from "../../components/specimen";
import { matsuriColors, primitiveColors, semanticRoles } from "../../data/tokens";

export function TokensColorPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fundamentos · 色"
        title="Color"
        jp="色"
        description="La paleta parte del papel y la tinta; el color señala acción, estado o precio. Los acentos matsuri existen solo en Chirashi."
        meta="17 primitivas · 7 acentos · 21 roles semánticos"
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="paleta" title="Paleta" jp="色" meta="No cambia con el tema">
          <SubHeading meta="Generales">Color primitivo</SubHeading>
          <div className="mt-[var(--koten-gap)]">
            <ColorGrid colors={primitiveColors} />
          </div>

          <div className="mt-[calc(var(--koten-gap)*2)]">
            <SubHeading meta="Solo Chirashi · máximo dos por bloque">Acentos matsuri</SubHeading>
            <div className="mt-[var(--koten-gap)]">
              <ColorGrid colors={matsuriColors} />
            </div>
            <p className="mt-[var(--koten-gap)] text-2xs text-faint">
              El amarillo siempre lleva texto oscuro. Un acento no reemplaza un rol: si el color
              comunica estado, se usa success, warning o danger.
            </p>
          </div>
        </Section>

        <Section
          id="roles"
          title="Roles semánticos"
          jp="役割"
          meta="Los componentes solo usan estos valores"
        >
          <RoleTable roles={semanticRoles} />
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">
            El mismo token resuelve distinto por tema. Chirashi lleva el primario a shu; Daichō y
            Kanso lo llevan a ai. Ningún componente hardcodea hex.
          </p>
        </Section>
      </div>
    </div>
  );
}
