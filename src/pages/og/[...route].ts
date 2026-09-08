import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

/**
 * Build sırasında her yazı, proje ve kaynak için 1200x630 PNG üretir.
 * Çıktı: /og/blog/<slug>.png · /og/projeler/<slug>.png · /og/kaynaklar/<slug>.png
 *
 * PNG tercih edildi çünkü sosyal platformların çoğu og:image olarak SVG
 * render etmiyor. Görseller node_modules/.astro-og-canvas altında
 * önbelleklenir; ikinci build'de yeniden üretilmezler.
 */

/** Build zamanında üretilir; asla istek anında çalıştırılmaz. */
export const prerender = true;

const yazilar = await getCollection('yazilar', ({ data }) => !data.taslak);
const projeler = await getCollection('projeler', ({ data }) => !data.taslak);
const kaynaklar = await getCollection('kaynaklar');

type Sayfa = { title: string; description: string };

const sayfalar: Record<string, Sayfa> = {
  // Liste ve statik sayfaların paylaştığı varsayılan kapak.
  varsayilan: {
    title: 'Şantiyede muhasebe tutuyorum, işin tekrar eden kısmını yazılıma devrediyorum.',
    description: 'Projeler, ölçüme dayalı notlar ve indirilebilir kaynaklar.',
  },
};

for (const y of yazilar) {
  sayfalar[`blog/${y.id}`] = { title: y.data.baslik, description: y.data.ozet };
}
for (const p of projeler) {
  sayfalar[`projeler/${p.id}`] = { title: p.data.baslik, description: p.data.ozet };
}
for (const k of kaynaklar) {
  sayfalar[`kaynaklar/${k.id}`] = { title: k.data.baslik, description: k.data.aciklama };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: sayfalar,
  getImageOptions: (_path, sayfa: Sayfa) => ({
    title: sayfa.title,
    description: sayfa.description,
    bgGradient: [
      [14, 17, 22],
      [22, 26, 33],
    ],
    border: { color: [245, 165, 36], width: 10, side: 'block-start' },
    padding: 70,
    font: {
      title: {
        color: [231, 235, 240],
        size: 58,
        weight: 'Bold',
        lineHeight: 1.2,
        families: ['Space Grotesk', 'Inter'],
      },
      description: {
        color: [150, 160, 174],
        size: 26,
        lineHeight: 1.45,
        families: ['Inter'],
      },
    },
    /**
     * Türkçe için TAM kapsamlı font dosyaları kullanılıyor.
     *
     * fontsource'un alt kümeleri (latin / latin-ext) ayrık dosyalar ve
     * CanvasKit aynı font ailesi içinde gliften glife fallback yapmıyor:
     * yalnızca latin yüklersen ş/ğ tofu (□) çıkar, yalnızca latin-ext
     * yüklersen temel harfler tofu çıkar. Bu yüzden her iki alt kümeyi de
     * tek dosyada barındıran TTF'ler repoya gömüldü.
     *
     * Bu dosyalar yalnızca build sırasında OG görseli üretmek için okunur,
     * tarayıcıya gönderilmez; sitenin fontları npm üzerinden gelmeye devam eder.
     */
    fonts: ['./src/fonts/SpaceGrotesk-Bold.ttf', './src/fonts/Inter-Regular.ttf'],
  }),
});
