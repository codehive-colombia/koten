# Koten UI · 古典

**English** · [Español](./README.es.md)

A React component system built on the grammar of the classical Japanese web: information density, 1 px frames, warm paper, system typography and hierarchy through rules. **Chirashi** covers commerce, **Daichō** back office, **Kanso** reading and **Sumi** dark mode.

> **Status:** phases 0–5 are closed, tag `v0.1.0-poc`, deployed at <https://koten.codehive.com.co>. 46 components and 20 blocks documented, HIKARI and KURA demos in ES/JA/EN, accessibility and performance audits, shadcn registry, customizable i18n, three agent skills and a theme designer with guardrails (`M-013`, `D-051`).
> **Source of truth:** [ROADMAP.md](./ROADMAP.md).

Working documents — roadmap, decisions, log and protocol — are kept in Spanish: [ROADMAP.md](./ROADMAP.md), [docs/](./docs/) and [AGENTS.md](./AGENTS.md).

## Documentation

| Document | What it is for |
| --- | --- |
| [ROADMAP.md](./ROADMAP.md) | Phases, tasks, status, dependencies and traceability. |
| [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) | Scope, references and success criteria. |
| [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Visual grammar, tokens, components, i18n and accessibility. |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Decisions with stable IDs. |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | Append-only session log and handoff. |
| [docs/RECIPES.md](./docs/RECIPES.md) | Copyable form, table, drawer, card and i18n recipes. |
| [llms.txt](./llms.txt) | Documentation index for agents. |
| [skills/](./skills) | `koten-ui`, `koten-design-system` and `koten-design-language` skills. |
| [docs/qa/](./docs/qa/) | Visual QA screenshots by date. |
| [AGENTS.md](./AGENTS.md) | Protocol for picking the project back up. |

## Principles

- Simplicity of means, density of information.
- The frame is the unit: panel, header, rule, border.
- Color signals; it does not decorate.
- System typography and real text, never text in images.
- Japanese is a visual reference, not a content requirement: use your product's language. Japanese labels, kanji, vertical writing, hanko and patterns are opt-in.
- Desktop first, accessible by default, fast by design.

## Stack

Bun workspaces · React 19 · TypeScript 7 strict · Vite 8 · Tailwind CSS v4 · Base UI · CVA · TanStack Table (ERP only) · Lucide · React Router 7.18 · Vitest + Testing Library + axe-core · Chromium/CDP for audits · Biome.

No runtime CSS-in-JS, no full CJK fonts, no charting library, no carousel or heavy date picker.

Resolved versions: Bun 1.4.3, React 19.3.1, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Base UI 1.9.0, Biome 2.5.15, Vitest 5.0.5.

## Commands

```bash
bun install
bun run dev        # 5173 catalog · 5174 storefront · 5175 ERP
bun run check      # Biome + TypeScript + i18n + ai:check + tests
bun run ci         # check + build + budgets
bun run build      # build all three apps
bun run budget     # gzipped JS/CSS and fonts
bun run qa:a11y    # axe, 12 px minimum and visible focus (needs dev server + Chromium)
bun run qa:overflow # overflow and RTL at 1440/1280/1024/390 (needs dev server + Chromium)
bun run qa:perf    # LCP/CLS on the build (needs Chromium)
bun run qa:visual  # screenshots into docs/qa/<date>
bun run registry   # shadcn registry in apps/catalog/public/r
bun run ai:docs    # llms.txt, Markdown per piece and skills inventory
bun run ai:check   # fails when the agent layer is stale
```

## Production

Site: **<https://koten.codehive.com.co>**

| Route | App | Internal port |
| --- | --- | --- |
| `/` | catalog and documentation | 3000 |
| `/demos/store` | HIKARI storefront | 3001 |
| `/demos/erp` | KURA ERP | 3002 |

A multi-stage image builds the three apps with Bun and serves them through unprivileged nginx. Traefik keeps each demo's prefix, so its assets do not collide with the catalog's. Ports are not published on the host.

```bash
# server or PaaS
KOTEN_IMAGE=ghcr.io/<owner>/<repo>:latest docker compose up -d

# local: publishes 3000/3001/3002
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build -d
```

Variables live in `.env` (see `.env.example`): `KOTEN_IMAGE`, `KOTEN_SITE_URL`, `KOTEN_HOST`, the Traefik entrypoint/certresolver and the local override ports. `KOTEN_SITE_URL` feeds public links and the registry.

The workflow publishes the image to GHCR on `main` and `v*` tags, and only builds it on pull requests. The registry and the agent documentation are regenerated inside the image, so `/r/*.json`, `/llms.txt` and `/md/**` ship in the container.

## shadcn registry

```bash
npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json
npx shadcn@latest add https://koten.codehive.com.co/r/button.json
```

Locally, `bun run dev` serves the registry at `http://localhost:5173/r/`. Items use the aliases from `components.json` (`@ui`, `@components`, `@lib`) and rewrite imports to the project prefix. `koten-theme` writes tokens, themes and density into the declared `tailwind.css`; it does not create a `styles/` folder. `koten-i18n` installs the runtime and English; `koten-i18n-es` and `koten-i18n-ja` add only their dictionary.

## Theme designer

The **`/theme`** page lets you adapt Koten without editing two hundred tokens. You only choose five things: register, palette pigment, paper, radius and density. Derived values (hover, tints, neutrals, states, shadows) are calculated; typography, spacing, borders, motion and the meaning of states are off-limits. Before export, 11 WCAG 2.2 AA pairs are validated; if any fails, copy and download are blocked and the nearest safe paper is offered.

The output is a `koten-custom.css` file with a `:root` overlay of semantic values. Paste it at the end of `tailwind.css`, **after `koten-theme`**, and share the theme with `?ks=register.pigment.paper.radius.density`. The full specification is in [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) §6.

## AI and agents

Three levels, generated from the same source as the catalog:

| Level | Artifact | Use |
| --- | --- | --- |
| Reading | `/llms.txt`, `/llms-full.txt`, `/md/components/<slug>.md`, `/md/blocks/<category>/<slug>.md` | Index, corpus and one page per piece. |
| Consumption | `skills/koten-ui` | Choose, install, compose, theme and verify. |
| Extension | `skills/koten-design-system` | Add primitives, blocks, themes and densities inside the repository. |
| Authoring | `skills/koten-design-language` | Create a new piece in a project that already uses Koten. |

```bash
npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui
npx skills add codehive-colombia/koten --skill koten-design-system
npx skills add codehive-colombia/koten --skill koten-design-language
```

The `/ai` page explains the three levels. `predev` and `prebuild` regenerate the agent layer together with the registry; `bun run ai:check` runs inside `bun run check`. Skills follow the [Agent Skills](https://agentskills.io/specification) standard.

## Using Koten UI in your project

You need React 19, Tailwind CSS 4 and a shadcn `components.json`. You do not clone the repository or install Bun. The full guide is in **Getting started** (`/start#usar`).

```bash
# 1. theme, once
npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json

# 2. component or block
npx shadcn@latest add https://koten.codehive.com.co/r/button.json
npx shadcn@latest add https://koten.codehive.com.co/r/product-card.json
```

With Bun, replace `npx` with `bunx`. The catalog remembers your choice in `localStorage`.

Then:

1. Import the Tailwind CSS declared in your `components.json`; the theme is written there.
2. Wrap the app with `KotenProvider` (`@/lib/koten/i18n/provider` or your alias); `locale` accepts any BCP 47 tag.
3. Pick theme and density on the root element (`data-theme`, `data-density`).
4. Browse **Components** (`/components`) and **Blocks** (`/blocks`) for installation, props, code and accessibility.

## Developing Koten UI

This path is for working inside the repository: catalog, primitives, blocks, demos, audits and registry.

```bash
git clone https://github.com/codehive-colombia/koten.git
cd koten
bun install
bun run dev
bun run check
bun run build
bun run budget
```

Before touching a piece, read [AGENTS.md](./AGENTS.md), [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) and [docs/RECIPES.md](./docs/RECIPES.md). The `bun run qa:*` audits are optional and require Chromium. The full guide is in **Getting started** (`/start#desarrollar`).

## Structure

```txt
apps/
  catalog/      # living documentation and lab
  storefront/   # HIKARI POC
  erp/          # KURA POC
packages/
  ui/
    src/components/ui/       # copyable primitives
    src/components/patterns/ # compositions
    src/styles/tokens.css
    src/styles/globals.css
    src/lib/
infra/nginx/    # production runtime
skills/         # koten-ui, koten-design-system and koten-design-language
scripts/        # registry, agent documentation and QA
docs/           # requirements, design, decisions and log
Dockerfile
docker-compose.yml
```

## Picking it back up

1. Read [docs/PROGRESS.md](./docs/PROGRESS.md) for the real status.
2. Read [ROADMAP.md](./ROADMAP.md) and continue the `in_progress` task or pick the first `todo` whose dependencies are `done`.
3. Follow [AGENTS.md](./AGENTS.md) to update status, evidence and the log.

## License

MIT. See [LICENSE](./LICENSE). You can use Koten UI in free or commercial projects, modify it and redistribute it, provided the copyright and permission notice are kept. The software is provided without warranty.
