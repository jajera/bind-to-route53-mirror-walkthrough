import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeVintage from 'starlight-theme-vintage';
import { starlightBasePath } from 'starlight-base-path';
import starlightImageZoom from 'starlight-image-zoom';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://jajera.github.io',
  base: '/bind-to-route53-mirror-walkthrough/',
  integrations: [
    mermaid(),
    starlight({
      title: 'BIND to Route 53 Mirror Walkthrough',
      favicon: '/favicon.svg',
      description:
        'Walkthrough companion for keeping legacy BIND on-prem and mirroring it into Route 53 for cloud workloads.',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content:
              'https://jajera.github.io/bind-to-route53-mirror-walkthrough/og-image.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content:
              'https://jajera.github.io/bind-to-route53-mirror-walkthrough/og-image.png',
          },
        },
      ],
      plugins: [starlightThemeVintage(), starlightBasePath(), starlightImageZoom()],
      social: [
        {
          icon: 'github',
          label: 'Source Repository',
          href: 'https://github.com/jajera/bind-to-route53-mirror-walkthrough',
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/jajera/bind-to-route53-mirror-walkthrough/edit/main/',
      },
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Introduction',
          items: [
            { label: 'Overview', slug: 'walkthrough/overview' },
            { label: 'Prerequisites', slug: 'walkthrough/prerequisites' },
          ],
        },
        {
          label: 'Architecture',
          items: [
            { label: 'Topology', slug: 'architecture/topology' },
            { label: 'Sync Pipeline', slug: 'architecture/pipeline' },
          ],
        },
        {
          label: 'Walkthrough',
          items: [
            { label: 'Deploy', slug: 'walkthrough/deploy' },
            { label: 'Confirm connectivity', slug: 'walkthrough/vpn' },
            { label: 'Edit BIND', slug: 'walkthrough/bind' },
            { label: 'Sync Lambda', slug: 'walkthrough/sync' },
            { label: 'Resolve in VPC', slug: 'walkthrough/resolve' },
          ],
        },
        {
          label: 'Operations',
          items: [
            { label: 'Teardown', slug: 'walkthrough/teardown' },
            { label: 'Troubleshooting', slug: 'walkthrough/troubleshooting' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'FAQ', slug: 'reference/faq' },
            { label: 'Links', slug: 'reference/links' },
          ],
        },
      ],
    }),
  ],
});
