// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/consts.mjs';

export default defineConfig({
  site: SITE.url,

  /**
   * STATİK. Adaptör YOK ve eklenmemeli.
   *
   * Cloudflare, Astro projesini otomatik algılayıp `@astrojs/cloudflare`
   * adaptörünü ekleyip build'i `mode: "server"` yapıyordu; o modda
   * astro-og-canvas'ın canvaskit'i Workers çalışma zamanında Node
   * API'lerini (__dirname, fs) bulamayıp build'i kırıyor.
   *
   * Bu sitenin hiçbir sunucu ihtiyacı yok: form Web3Forms'a, yorumlar
   * giscus'a, arama Pagefind'a gidiyor. Dağıtım `wrangler.jsonc`
   * üzerinden statik varlık olarak yapılır.
   */
  output: 'static',
  adapter: undefined,

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
