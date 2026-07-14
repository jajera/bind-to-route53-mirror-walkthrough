# Design Document

## Overview

Companion documentation site for `jajera/bind-to-route53-mirror-demo`. Astro + Starlight walkthrough following other jajera docs companions: progressive sidebar, required MDX `description`, validators before build, upstream links pinned to `main`, Tooltip glossary.

**Narrative:** Legacy BIND stays authoritative on-prem; Route 53 PHZ is a read-only mirror for cloud workloads. Site-to-Site VPN is lab AXFR reachability only.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-1 | Astro 6 + Starlight + vintage theme | Matches sister walkthrough sites; GitHub Pages friendly |
| AD-2 | `base: /bind-to-route53-mirror-walkthrough/` | GitHub project Pages path |
| AD-3 | Content adapted from upstream WALKTHROUGH / ARCHITECTURE / DEPLOYMENT / RUNBOOK | Operator path without copying product code into this repo |
| AD-4 | Pin upstream links to `main` | Link checker enforces the branch ref |
| AD-5 | Tooltip + `glossary.ts` | Inline definitions; no `/reference/glossary` slug |
| AD-6 | Narrative: BIND authority + Route 53 mirror | VPN must not own titles, taglines, or FAQ leads |
| AD-7 | Validate placeholders / asides / links before build | Prevent secret leakage and broken upstream refs |
| AD-8 | Reuse actionsforge Astro workflows | Consistent CI with other docs companions |
| AD-9 | Draw.io + static SVG for primary topology | Steering: Mermaid only for pipeline detail |
| AD-10 | Site-owned favicon / OG assets | Brand the mirror story, not sibling products |

## Component Map

```text
src/content/docs/          MDX pages (Starlight)
src/components/Tooltip.astro
src/data/glossary.ts
scripts/check-*.mjs        Quality gates
public/diagrams/           Architecture SVG
public/screenshots/        Console captures from demo runs
docs/architecture.drawio   Editable topology (dark-mode aware)
docs/inventory.md          Page map + narrative note
.kiro/                     Requirements / design / tasks + steering
```

## Content Information Architecture

1. Introduction — overview, prerequisites  
2. Architecture — topology SVG, sync pipeline Mermaid  
3. Walkthrough — deploy → connectivity → BIND → sync → resolve  
4. Operations — teardown, troubleshooting  
5. Reference — FAQ, links  

## Upstream Relationship

| Concern | Owner |
|---------|--------|
| Terraform / Lambda / pytest | Upstream_Demo_Repo |
| Operator prose in Markdown | Upstream_Demo_Repo (`docs/`) |
| Progressive Starlight walkthrough | This Site |
| Diagram source of truth for the Site | `docs/architecture.drawio` (+ export to `public/diagrams/`) |
