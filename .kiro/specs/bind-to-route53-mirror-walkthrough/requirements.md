# Requirements Document

## Introduction

This document defines the requirements for a **static documentation site** (Astro + Starlight) that teaches operators how to keep **legacy BIND** as DNS authority on-prem and **mirror** it into a Route 53 private hosted zone so cloud workloads can resolve the same private names.

The Site contains **no Terraform or Lambda source**. All lab code lives in Upstream_Demo_Repo. Site-to-Site VPN appears only as **lab reachability** for AXFR — it is not the product focus.

## Glossary

- **Site**: Astro + Starlight docs site at base path `/bind-to-route53-mirror-walkthrough/`
- **Upstream_Demo_Repo**: `jajera/bind-to-route53-mirror-demo` — Terraform, Sync_Lambda, operator docs
- **Upstream_Branch**: `main` — all tree/blob links pin to this branch
- **Narrative**: Legacy BIND stays authoritative; Route 53 is a read-only cloud mirror; VPN is lab plumbing only
- **Starlight**: Documentation theme used to build the Site
- **Aside**: Starlight callout — only `tip`, `caution`, `danger`
- **Placeholder_ID**: Synthetic IDs (`ACCOUNT_ID`, `123456789012`) instead of real secrets
- **Quality_Gate**: `npm run build` (validate + Astro build) must pass before merge/deploy

## Requirements

### Requirement 1: Landing and Narrative

**User Story:** As a platform engineer, I want the landing page to state why BIND must stay and how Route 53 helps cloud workloads, so I know this is not a VPN or BIND-migration guide.

#### Acceptance Criteria

1. THE Site SHALL use a splash landing page with a tagline about legacy BIND staying on-prem and mirroring into Route 53
2. THE Site SHALL NOT lead titles, taglines, or FAQ primary answers with Site-to-Site VPN as the main story
3. THE Site SHALL present CTAs to the walkthrough overview and Upstream_Demo_Repo
4. THE README SHALL frame the Site as a docs companion and link Upstream_Demo_Repo plus the GitHub Pages URL

### Requirement 2: Overview and Scope

**User Story:** As an operator, I want overview pages that clarify purpose, proofs, audience, and non-goals, so I can decide whether to run the lab.

#### Acceptance Criteria

1. THE Site SHALL include an Overview page stating BIND authority, Route 53 mirror, and VPN-as-reachability
2. THE Site SHALL list success proofs: connectivity to BIND, BIND authority after edit, successful sync, cloud dig via AmazonProvidedDNS
3. THE Site SHALL include non-goals that exclude BIND migration, bi-directional sync, and teaching VPN as a product pattern
4. THE Site SHALL include a Prerequisites page for the two CLI profiles, tools, clone, and identity checks

### Requirement 3: Architecture Content

**User Story:** As an operator, I want topology and sync-pipeline pages so I understand authority vs mirror before running commands.

#### Acceptance Criteria

1. THE Site SHALL include a Topology page with the architecture SVG under `public/diagrams/` and alt text describing BIND authority plus Route 53 mirror
2. THE Topology page SHALL describe Site-to-Site VPN as lab reachability, not the primary lesson
3. THE Site SHALL include a Sync Pipeline page describing EventBridge → AXFR from BIND → diff → Route 53 apply → CloudWatch
4. THE Sync Pipeline page SHALL use Mermaid `graph TD` for the pipeline detail

### Requirement 4: Operator Walkthrough

**User Story:** As an operator, I want a progressive path from deploy through resolve and teardown, so I can reproduce the mirror demo.

#### Acceptance Criteria

1. THE Site SHALL document Deploy with explicit `git clone`, `cd`, and `./scripts/deploy_stacks.sh`
2. THE Site SHALL document Confirm connectivity (lab VPN check) before BIND edits
3. THE Site SHALL document Edit BIND (authority first), Sync Lambda (mirror), and Resolve in VPC (cloud dig via PHZ)
4. THE Site SHALL document Teardown and recommend destroying lab resources when idle because of VPN cost

### Requirement 5: Operations and Reference

**User Story:** As an operator, I want troubleshooting and FAQ that reinforce the narrative, so failures and questions stay framed around the mirror.

#### Acceptance Criteria

1. THE Site SHALL include Troubleshooting for reachability to BIND, AXFR refused, Route 53 API errors, and stale mirror data
2. THE Site SHALL include an FAQ covering why keep BIND, why not point VPC clients at BIND, why two accounts, and why the lab has a VPN
3. THE Site SHALL include a Links page pointing at Upstream_Demo_Repo docs and relevant AWS documentation
4. Site-to-Site VPN AWS docs links SHALL be labeled as lab reachability where listed

### Requirement 6: Quality Gates and Tooling

**User Story:** As a maintainer, I want validators and CI so the Site stays accurate and free of leaked identifiers.

#### Acceptance Criteria

1. THE Quality_Gate SHALL run placeholder, aside, and upstream-link checks before Astro build
2. Upstream links to Upstream_Demo_Repo SHALL pin to Upstream_Branch (`main`)
3. THE Site SHALL use Tooltip + `src/data/glossary.ts` for inline definitions (no dedicated glossary page)
4. THE Site SHALL deploy via GitHub Pages workflows reusable from actionsforge Astro docs patterns
5. Favicon and OG assets SHALL depict the BIND → Route 53 mirror narrative (not unrelated products)
