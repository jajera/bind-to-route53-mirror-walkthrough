import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { buildUpstreamPathLink } from '../../scripts/check-links.mjs';

const PATHS = [
  'docs/WALKTHROUGH.md',
  'docs/ARCHITECTURE.md',
  'docs/DEPLOYMENT.md',
  'docs/RUNBOOK.md',
  'src/zone_sync/',
  'infra/terraform/workload/',
];

describe('Property 3: Upstream Link Format Pinning', () => {
  it('builds pinned upstream path URLs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PATHS),
        fc.stringMatching(/^[0-9a-f]{7,40}$/),
        (filePath, ref) => {
          const url = buildUpstreamPathLink(ref, filePath);
          expect(url).toBe(
            `https://github.com/jajera/bind-to-route53-mirror-demo/tree/${ref}/${filePath}`,
          );
        },
      ),
      { numRuns: 100 },
    );
  });
});
