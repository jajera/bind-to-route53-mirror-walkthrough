# bind-to-route53-mirror-walkthrough

Documentation companion for keeping **legacy BIND** on-prem and mirroring it into a **Route 53 private hosted zone** so cloud workloads can resolve the same private names.

| What this is | What this is not |
| --- | --- |
| A static walkthrough and architecture reference | The Terraform / Lambda source |
| Guidance for edit BIND → sync → resolve in cloud | A BIND migration or cutover guide |
| Companion docs with upstream links pinned to `main` | A live AWS lab environment |

**Upstream demo:** [jajera/bind-to-route53-mirror-demo](https://github.com/jajera/bind-to-route53-mirror-demo)

**Deployed site:** <https://bind-to-route53-mirror-walkthrough.johna.kiwi/>

## Quick start

```bash
npm install
npm run dev
npm run build
```

## Walkthrough path

1. Prerequisites (two profiles, Terraform, SSM plugin)
2. Deploy stacks
3. Confirm connectivity to BIND (lab VPN)
4. Edit BIND → `rndc reload`
5. Invoke Sync_Lambda (mirror)
6. Dig from cloud test instance via Route 53
7. Teardown when idle
