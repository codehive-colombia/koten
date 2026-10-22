# Koten UI skills

Agent skills for [Koten UI](https://koten.codehive.com.co). They follow the [Agent Skills](https://agentskills.io/specification) format and are discovered by [`npx skills`](https://github.com/vercel-labs/skills) from this `skills/` directory.

| Skill | Use it when |
| --- | --- |
| [`koten-ui`](./koten-ui/SKILL.md) | You are consuming the components: choosing, installing, composing, theming and verifying a screen. |
| [`koten-design-system`](./koten-design-system/SKILL.md) | You are extending the system inside this repository: new primitive, block, token, theme, density or a new product under the Koten grammar. |
| [`koten-design-language`](./koten-design-language/SKILL.md) | A project that already uses Koten needs a piece the catalog does not ship: author it locally with the tokens, frames, shadows, contrast and accessibility rules. |

## Install

From the root of the project that will use Koten:

```bash
# list what the repository offers
npx skills add codehive-colombia/koten --list

# consume components
npx skills add codehive-colombia/koten --skill koten-ui

# extend the system
npx skills add codehive-colombia/koten --skill koten-design-system

# create a piece the catalog does not ship
npx skills add codehive-colombia/koten --skill koten-design-language
```

The CLI asks for the target agent and installs into its project skills directory (for example `.opencode/skills/` or `.claude/skills/`). Add `-g` for a global install, or `-a opencode -a claude-code` to skip the agent prompt.

## How they stay current

- `koten-ui/references/inventory.md` and `references/guides.md` are generated from `apps/catalog/src/data/docs` by `bun run ai:docs`.
- `bun run ai:check` fails when the tracked references are stale or when a `SKILL.md` breaks the spec (name, description, relative references) or references a `--koten-*` token that `tokens.css` does not declare.
- The machine-readable docs live at `/llms.txt`, `/llms-full.txt` and `/md/<kind>/<slug>.md` on the deployed catalog.

## Sources

- [Agent Skills specification](https://agentskills.io/specification)
- [Creating skills with `npx skills`](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md)
- [Anthropic: equipping agents with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
