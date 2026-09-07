import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts.mjs';

export async function GET(context: APIContext) {
  const yazilar = (await getCollection('yazilar', ({ data }) => !data.taslak)).sort(
    (a, b) => b.data.yayinTarihi.valueOf() - a.data.yayinTarihi.valueOf()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: false,
    customData: '<language>tr-tr</language>',
    items: yazilar.map((y) => ({
      title: y.data.baslik,
      description: y.data.ozet,
      pubDate: y.data.yayinTarihi,
      link: `/blog/${y.id}`,
      categories: y.data.etiketler,
    })),
  });
}
