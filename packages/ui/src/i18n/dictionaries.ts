import type { KotenLabels } from "./labels";
import en from "./messages/en.json";
import es from "./messages/es.json";
import ja from "./messages/ja.json";

/**
 * Built-in label dictionaries. The registry core installs only `en`; the
 * `koten-i18n-es` and `koten-i18n-ja` items add their JSON file. Register a new
 * locale here after installing its pack.
 */
export const labelsByLocale = { es, ja, en } satisfies Record<string, KotenLabels>;
