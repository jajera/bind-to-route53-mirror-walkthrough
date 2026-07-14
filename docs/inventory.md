# Content inventory

Narrative: legacy BIND must stay on-prem; mirror into Route 53 for cloud DNS. Site-to-Site VPN is lab reachability only.

| Page | Role |
| --- | --- |
| `walkthrough/overview` | Story + scope |
| `walkthrough/prerequisites` | Two accounts / tools |
| `walkthrough/deploy` | Lab stacks |
| `walkthrough/vpn` | Confirm connectivity to BIND |
| `walkthrough/bind` | Edit authority first |
| `walkthrough/sync` | Mirror into Route 53 |
| `walkthrough/resolve` | Cloud dig via PHZ |
| `walkthrough/teardown` | Destroy |
| `walkthrough/troubleshooting` | Reachability / AXFR / R53 |
| `architecture/topology` | BIND authority + Route 53 mirror |
| `architecture/pipeline` | Sync steps |
| `reference/faq` | Why mirror / why not point at BIND |
| `reference/links` | Upstream + AWS docs |

Upstream: https://github.com/jajera/bind-to-route53-mirror-demo
