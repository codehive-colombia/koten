import { type KotenLocale, useKoten } from "@koten/ui";
import { PageHeader } from "../../components/docs";
import { ColorGrid, RoleTable, Section, SubHeading } from "../../components/specimen";
import { matsuriColors, primitiveColors, semanticRoles } from "../../data/tokens";

const copy = {
  es: {
    eyebrow: "Fundamentos · 色",
    title: "Color",
    description:
      "La paleta parte del papel y la tinta; el color señala acción, estado o precio. Los acentos matsuri existen solo en Chirashi.",
    meta: "17 primitivas · 7 acentos · 21 roles semánticos",
    palette: {
      title: "Paleta",
      meta: "No cambia con el tema",
      primitive: "Color primitivo",
      primitiveMeta: "Generales",
      matsuri: "Acentos matsuri",
      matsuriMeta: "Solo Chirashi · máximo dos por bloque",
      matsuriNote:
        "El amarillo siempre lleva texto oscuro. Un acento no reemplaza un rol: si el color comunica estado, se usa success, warning o danger.",
    },
    roles: {
      title: "Roles semánticos",
      meta: "Los componentes solo usan estos valores",
      note: "El mismo token resuelve distinto por tema. Chirashi lleva el primario a shu; Daichō y Kanso lo llevan a ai. Ningún componente hardcodea hex.",
    },
  },
  ja: {
    eyebrow: "基礎 · 色",
    title: "色",
    description:
      "パレットは紙と墨から始まる。色はアクション、状態、価格を示す。祭の差し色はChirashiにのみ存在する。",
    meta: "17プリミティブ · 7差し色 · 21意味的役割",
    palette: {
      title: "パレット",
      meta: "テーマで変わらない",
      primitive: "プリミティブカラー",
      primitiveMeta: "基本",
      matsuri: "祭の差し色",
      matsuriMeta: "Chirashiのみ · 1ブロック最大2色",
      matsuriNote:
        "黄色は常に濃色テキストと組み合わせる。差し色は役割を置き換えない。色が状態を伝える場合はsuccess、warning、dangerを使う。",
    },
    roles: {
      title: "意味的役割",
      meta: "コンポーネントはこれらの値だけを使う",
      note: "同じトークンでもテーマごとに解決先が異なる。Chirashiは主要色を朱に、DaichōとKansoは藍にする。コンポーネントにhexの直書きはない。",
    },
  },
  en: {
    eyebrow: "Foundations · 色",
    title: "Color",
    description:
      "The palette starts from paper and ink; color signals action, state or price. Matsuri accents exist only in Chirashi.",
    meta: "17 primitives · 7 accents · 21 semantic roles",
    palette: {
      title: "Palette",
      meta: "Does not change with the theme",
      primitive: "Primitive color",
      primitiveMeta: "General",
      matsuri: "Matsuri accents",
      matsuriMeta: "Chirashi only · at most two per block",
      matsuriNote:
        "Yellow always carries dark text. An accent does not replace a role: if color communicates state, use success, warning or danger.",
    },
    roles: {
      title: "Semantic roles",
      meta: "Components use only these values",
      note: "The same token resolves differently per theme. Chirashi maps the primary to shu; Daichō and Kanso map it to ai. No component hardcodes hex.",
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

export function TokensColorPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="色"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="paleta" title={t.palette.title} jp="色" meta={t.palette.meta}>
          <SubHeading meta={t.palette.primitiveMeta}>{t.palette.primitive}</SubHeading>
          <div className="mt-[var(--koten-gap)]">
            <ColorGrid colors={primitiveColors} />
          </div>

          <div className="mt-[calc(var(--koten-gap)*2)]">
            <SubHeading meta={t.palette.matsuriMeta}>{t.palette.matsuri}</SubHeading>
            <div className="mt-[var(--koten-gap)]">
              <ColorGrid colors={matsuriColors} />
            </div>
            <p className="mt-[var(--koten-gap)] text-2xs text-faint">{t.palette.matsuriNote}</p>
          </div>
        </Section>

        <Section id="roles" title={t.roles.title} jp="役割" meta={t.roles.meta}>
          <RoleTable roles={semanticRoles} />
          <p className="mt-[var(--koten-gap)] text-2xs text-faint">{t.roles.note}</p>
        </Section>
      </div>
    </div>
  );
}
