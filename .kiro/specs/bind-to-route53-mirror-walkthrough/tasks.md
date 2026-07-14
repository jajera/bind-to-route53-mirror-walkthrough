# Implementation Plan

Walkthrough companion site for `jajera/bind-to-route53-mirror-demo`. Specs describe **this docs site**, not the upstream demo's Terraform/Lambda work.

- [x] 1. Inventory upstream content into `docs/inventory.md` (links pin to `main`)
- [x] 2. Scaffold package.json, Astro/Starlight config, validators, CI, vscode
- [x] 3. Add architecture draw.io / SVG, screenshots, Tooltip + glossary
- [x] 4. Write Overview + Prerequisites (narrative: legacy BIND → Route 53 mirror)
- [x] 5. Write Architecture pages (topology + sync pipeline)
- [x] 6. Write Walkthrough MDX (deploy clone/cd, connectivity, BIND, sync, resolve)
- [x] 7. Write Operations + Reference (teardown, troubleshooting, FAQ, links)
- [x] 8. Splash landing + README companion framing; Site-owned favicon / OG assets
- [x] 9. Author `.kiro` requirements, design, tasks, and steering for **this** site
- [x] 10. Add property + integration tests; verify `npm run validate` / build

## Deferred / maintain

- [ ] Keep MDX narrative aligned if upstream demo docs change on `main`
- [ ] Re-export SVG when `docs/architecture.drawio` topology or dark-mode styles change
- [ ] Refresh screenshots when console UX or label text drifts
