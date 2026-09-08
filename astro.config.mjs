// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import fs from 'node:fs';
import path from 'node:path';

import { SITE } from './src/consts.mjs';

/**
 * İçerik dosyalarındaki tarihleri okuyup route → tarih haritası çıkarır.
 * Sitemap'e `lastmod` koyabilmek için gerekiyor; Google bu alanı gerçekten
 * kullanıyor (priority ve changefreq'i büyük ölçüde yok sayıyor).
 */
function icerikTarihleri() {
  const harita = new Map();
  const koleksiyonlar = [
    ['src/content/yazilar', '/blog/'],
    ['src/content/projeler', '/projeler/'],
    ['src/content/kaynaklar', '/kaynaklar/'],
  ];

  for (const [klasor, onEk] of koleksiyonlar) {
    if (!fs.existsSync(klasor)) continue;
    for (const dosya of fs.readdirSync(klasor)) {
      if (!dosya.endsWith('.mdx')) continue;
      const metin = fs.readFileSync(path.join(klasor, dosya), 'utf-8');
      // guncellemeTarihi varsa onu, yoksa yayın/oluşturma tarihini al.
      const e =
        /^guncellemeTarihi:\s*([\d-]+)/m.exec(metin) ??
        /^(?:yayinTarihi|tarih):\s*([\d-]+)/m.exec(metin);
      if (e) harita.set(onEk + dosya.replace(/\.mdx$/, ''), e[1]);
    }
  }
  return harita;
}

const TARIHLER = icerikTarihleri();

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
    sitemap({
      /**
       * Etiket sayfaları sitemap'e girmiyor: gezinme amaçlı sayfalar,
       * içerikleri zaten yazı sayfalarında var. Google onları iç
       * bağlantılardan zaten buluyor.
       */
      filter: (sayfa) => !sayfa.includes('/404') && !sayfa.includes('/blog/etiket/'),

      serialize(oge) {
        const yol = new URL(oge.url).pathname.replace(/\/$/, '') || '/';
        const tarih = TARIHLER.get(yol);
        if (tarih) oge.lastmod = new Date(tarih + 'T00:00:00Z').toISOString();
        return oge;
      },
    }),
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
