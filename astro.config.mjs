// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/consts.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({ i18n: undefined, filter: (page) => !page.includes('/404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-default' },
      wrap: true,
    },
  },
  build: { format: 'file' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
