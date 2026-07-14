---
inclusion: auto
description: Editor tooling — content authoring conventions for this walkthrough site
---

# Editor Tooling — Content Authoring Conventions

Conventions for MDX content in this walkthrough site. Follow these when editing `src/content/docs/`.

## Narrative framing

Lead with **legacy BIND stays authoritative** and **Route 53 is a cloud mirror**. Treat Site-to-Site VPN as lab reachability for AXFR only — never as the hero of titles, taglines, or FAQ lead answers.

## Placeholder IDs

Use only approved Placeholder_IDs in fenced code blocks, command examples, and output samples:

| Kind | Allowed values |
|------|----------------|
| Account IDs | `123456789012` (examples only) — prefer the text token `ACCOUNT_ID` |
| ARNs | Allowed account ID or literal `ACCOUNT_ID`; suffix resource names with `EXAMPLE` where practical |
| Emails | `you@example.com` only |
| Secrets | Never paste real API keys; use `...` |
| DNS | Hostnames must include `EXAMPLE`, or be an allowlisted public service endpoint (`sts.amazonaws.com`, `lambda.amazonaws.com`, `cloudformation.amazonaws.com`, `token.actions.githubusercontent.com`) |
| Regions | Prefer `REGION` or documented defaults like `ap-southeast-2` |
| Demo zone | `corp.internal` and private `10.x` addresses used by the upstream demo are allowed |

The quality gate (`scripts/check-placeholders.mjs`) rejects other 12-digit IDs and non-placeholder AWS DNS inside fenced code blocks. Prose outside code blocks is not scanned for account IDs.

## Aside types

Allowed Starlight asides only:

- `:::tip` — suggestions and recommended practices
- `:::caution` — careful steps / misconfiguration risk
- `:::danger` — cost, data loss, or security exposure

Do not use `:::note`, `:::warning`, or `:::info`. Enforced by `scripts/check-asides.mjs`.

## Mermaid diagrams

- Use `graph TD` (top-down) for pipeline detail
- Prefer the static SVG under `public/diagrams/` for the primary architecture view

## Upstream links

Pin every upstream link to the **`main`** branch of Upstream_Demo_Repo.

Format:

```text
https://github.com/jajera/bind-to-route53-mirror-demo/tree/main/<path>
```

Common path mapping:

| Topic | Upstream path |
|-------|---------------|
| Operator walkthrough | `docs/WALKTHROUGH.md` |
| Architecture | `docs/ARCHITECTURE.md` |
| Deployment | `docs/DEPLOYMENT.md` |
| Runbook | `docs/RUNBOOK.md` |
| Architecture diagram (upstream) | `docs/diagrams/architecture.drawio` |
| Deploy script | `scripts/deploy_stacks.sh` |
| Destroy script | `scripts/destroy_stacks.sh` |
| Sync code | `src/zone_sync/` |
| On-prem Terraform | `infra/terraform/onprem/` |
| Workload Terraform | `infra/terraform/workload/` |

Site-owned diagram copy: `docs/architecture.drawio` → export to `public/diagrams/architecture.svg`.
