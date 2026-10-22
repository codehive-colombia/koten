import { describe, expect, it } from "vitest";
import { type KotenLabels, type KotenLocale, labelsByLocale, resolveLabels } from "./labels";

const locales = Object.keys(labelsByLocale) as KotenLocale[];
const keys = Object.keys(labelsByLocale.es) as (keyof KotenLabels)[];

const french: KotenLabels = {
  close: "Fermer",
  previous: "Précédent",
  next: "Suivant",
  empty: "Aucun résultat",
  loading: "Chargement…",
  select: "Sélectionner",
  remove: "Retirer",
  search: "Rechercher",
  clear: "Effacer",
  apply: "Appliquer",
  cancel: "Annuler",
  confirm: "Confirmer",
  more: "Plus d’options",
  expand: "Développer",
  collapse: "Réduire",
  sortAscending: "Tri croissant",
  sortDescending: "Tri décroissant",
  selectAll: "Tout sélectionner",
  selected: "sélectionnés",
  noResults: "Aucun résultat trouvé",
  required: "Obligatoire",
  optional: "Facultatif",
};

describe("labelsByLocale", () => {
  it("covers the three demo languages", () => {
    expect(locales).toEqual(["es", "ja", "en"]);
  });

  it("keeps the same keys in every locale", () => {
    for (const locale of locales) {
      expect(Object.keys(labelsByLocale[locale]).sort()).toEqual([...keys].sort());
    }
  });

  it("does not leave empty labels", () => {
    for (const locale of locales) {
      for (const key of keys) {
        expect(labelsByLocale[locale][key].trim(), `${locale}.${key}`).not.toBe("");
      }
    }
  });
});

describe("resolveLabels", () => {
  it("uses a full dictionary for a locale without a built-in one", () => {
    expect(resolveLabels("fr-FR", french).close).toBe("Fermer");
    expect(resolveLabels("fr", french).required).toBe("Obligatoire");
  });

  it("merges partial overrides over the English base", () => {
    const labels = resolveLabels("fr-FR", { close: "Fermer" });

    expect(labels.close).toBe("Fermer");
    expect(labels.next).toBe("Next");
  });

  it("falls back to English when the locale has no dictionary", () => {
    expect(resolveLabels("de-DE").close).toBe("Close");
  });

  it("keeps the built-in dictionary when there are no overrides", () => {
    expect(resolveLabels("ja").close).toBe("閉じる");
  });
});
