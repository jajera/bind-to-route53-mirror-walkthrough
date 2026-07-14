---
inclusion: auto
description: Architecture diagrams — draw.io with official AWS icons, dark-mode aware
---

# Architecture diagrams

When creating or updating architecture diagrams for **this walkthrough site**:

## Format

- Prefer **draw.io** (`.drawio`) at `docs/architecture.drawio`.
- Export the static asset used in MDX to `public/diagrams/architecture.svg` (base-path prefix in MDX image URLs).
- Do **not** use Mermaid for the primary topology diagram (Mermaid is for sync-pipeline detail only).
- Icon browser: [jajera AWS Icons](https://jajera.github.io/aws-icons) (official AWS Architecture Icons).
- Upstream may also keep `docs/diagrams/architecture.drawio` in `jajera/bind-to-route53-mirror-demo` — keep story aligned when either changes.

## Dark mode

Use `light-dark()` with `adaptiveColors="auto"` on the `mxGraphModel`:

- Title / subtitle: `fontColor=light-dark(#16191F,#F2F3F3)` and `light-dark(#545B64,#D5DBDB)`
- Account / outer containers: `fillColor=light-dark(#f5f5f5,#232F3E);strokeColor=light-dark(#666666,#D4D4D4);fontColor=light-dark(#333333,#F2F3F3)`
- VPC: `fillColor=light-dark(#8C4FFF0D,#8C4FFF0D);strokeColor=#8C4FFF;fillStyle=auto`
- Edge labels: `labelBackgroundColor=light-dark(#FFFFFF,#232F3E)` and adaptive `fontColor=light-dark(...)`
- Never rely on white-only label backgrounds without a dark counterpart

## Layout and icons

- Title (28px bold) + subtitle (14px) + orange separator (`strokeColor=#FF9900`)
- `fontFamily=Helvetica` everywhere
- Service icons: 48×48 `shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.<service>` inside category tint containers (120–140px), icon at ~(36–46, 30–36)
- Category tints: Compute `#FFF2E8`/`#ED7100`, Networking `#EDE7F6`/`#8C4FFF`, App Integration `#FCE4EC`/`#E7157B`, Security `#FFEBEE`/`#DD344C`
- Account boxes label: `profile · region · CIDR`
- Edge style: `edgeStyle=orthogonalEdgeStyle;rounded=1`

## Story to draw (this walkthrough)

| Side | Role |
| --- | --- |
| On-prem | BIND remains DNS **authority** for `corp.internal` (optional dig client); VPN appliance is lab reachability only |
| Cloud | Sync_Lambda mirrors into Route 53 PHZ; Test_Instance resolves via AmazonProvidedDNS |

- Primary story: BIND authority → mirror → Route 53 for cloud DNS  
- Supporting detail: AXFR needs private reachability (lab: Site-to-Site VPN); Route 53 **API via NAT** (not over VPN)
