import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const EXPECTED_PAGES = [
  'src/content/docs/index.mdx',
  'src/content/docs/architecture/topology.mdx',
  'src/content/docs/architecture/pipeline.mdx',
  'src/content/docs/walkthrough/overview.mdx',
  'src/content/docs/walkthrough/prerequisites.mdx',
  'src/content/docs/walkthrough/deploy.mdx',
  'src/content/docs/walkthrough/vpn.mdx',
  'src/content/docs/walkthrough/bind.mdx',
  'src/content/docs/walkthrough/sync.mdx',
  'src/content/docs/walkthrough/resolve.mdx',
  'src/content/docs/walkthrough/teardown.mdx',
  'src/content/docs/walkthrough/troubleshooting.mdx',
  'src/content/docs/reference/faq.mdx',
  'src/content/docs/reference/links.mdx',
];

describe('Integration: build and structure', () => {
  it('all content pages exist', () => {
    expect(EXPECTED_PAGES).toHaveLength(14);
    for (const p of EXPECTED_PAGES) {
      expect(fs.existsSync(path.join(ROOT, p)), p).toBe(true);
    }
  });

  it('base path is configured correctly', () => {
    const cfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
    expect(cfg).toContain('base: "/"');
  });

  it('sidebar follows progressive walkthrough sections', () => {
    const cfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
    expect(cfg).toContain("label: 'Home'");
    const intro = cfg.indexOf("label: 'Introduction'");
    const arch = cfg.indexOf("label: 'Architecture'");
    const walk = cfg.indexOf("label: 'Walkthrough'");
    const ops = cfg.indexOf("label: 'Operations'");
    const ref = cfg.indexOf("label: 'Reference'");
    expect(intro).toBeGreaterThan(-1);
    expect(arch).toBeGreaterThan(intro);
    expect(walk).toBeGreaterThan(arch);
    expect(ops).toBeGreaterThan(walk);
    expect(ref).toBeGreaterThan(ops);
    expect(cfg).toContain("slug: 'walkthrough/deploy'");
    expect(cfg).toContain("slug: 'walkthrough/sync'");
    expect(cfg).toContain('starlight-theme-vintage');
    expect(cfg).toContain('starlight-base-path');
  });

  it('capture screenshots are present', () => {
    const shots = [
      'public/screenshots/workload-virtual-private-gateway.png',
      'public/screenshots/lambda-sync-cloudwatch-logs.png',
      'public/screenshots/route53-corp-internal-records.png',
    ];
    for (const p of shots) {
      expect(fs.existsSync(path.join(ROOT, p)), p).toBe(true);
    }
  });

  it('overview links to the upstream demo repo', () => {
    const page = fs.readFileSync(
      path.join(ROOT, 'src/content/docs/walkthrough/overview.mdx'),
      'utf8',
    );
    expect(page).toContain('github.com/jajera/bind-to-route53-mirror-demo');
  });

  it('npm run build exits 0', () => {
    execSync('npm run build', {
      cwd: ROOT,
      stdio: 'pipe',
      env: { ...process.env, SKIP_LINK_CHECK: '1' },
    });
  }, 180_000);
});
