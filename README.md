# BIND to Route 53 Mirror Walkthrough

Documentation companion for keeping **legacy BIND** on-prem and mirroring it into a **Route 53 private hosted zone** so cloud workloads can resolve the same private names.

**Site:** https://bind-to-route53-mirror-walkthrough.johna.kiwi/

Companion lab: [jajera/bind-to-route53-mirror-demo](https://github.com/jajera/bind-to-route53-mirror-demo).

## Quick start

```bash
npm install
npm run dev
```

Open the local preview URL (usually http://localhost:4321/).

## Structure

```text
src/content/docs/     Walkthrough (Astro Starlight)
public/               Favicon, CNAME, OG image, diagrams, screenshots
```

## Walkthrough path

1. Prerequisites (two profiles, Terraform, SSM plugin)
2. Deploy stacks
3. Confirm connectivity to BIND (lab VPN)
4. Edit BIND → `rndc reload`
5. Invoke Sync_Lambda (mirror)
6. Dig from cloud test instance via Route 53
7. Teardown when idle
