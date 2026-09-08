import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kategori = z.enum(['ai', 'otomasyon', 'muhasebe', 'donanim']);

/* ---------------- Projeler ---------------- */
const projeler = defineCollection({
  loader: glob({ base: './src/content/projeler', pattern: '**/*.mdx' }),
  schema: z.object({
    baslik: z.string().max(70),
    ozet: z.string().min(40).max(200),
    tarih: z.coerce.date(),
    durum: z.enum(['aktif', 'tamamlandi', 'arsiv']),
    kategori,
    stack: z.array(z.string()).min(1),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    oneCikan: z.boolean().default(false),
    // Yazılardaki gibi: true ise proje sitede görünmez. Hazırlanan ama
    // onaylanmamış proje sayfaları için.
    taslak: z.boolean().default(false),
    metrikler: z
      .array(z.object({ etiket: z.string(), deger: z.string() }))
      .max(4)
      .default([]),
    // Zorunlu: her projede neyin çözülemediği yazılmak zorunda.
    sinirlar: z.string().min(40),
    ilgiliKaynaklar: z.array(reference('kaynaklar')).default([]),
    ilgiliYazilar: z.array(reference('yazilar')).default([]),
  }),
});

/* ---------------- Yazılar ---------------- */
const yazilar = defineCollection({
  loader: glob({ base: './src/content/yazilar', pattern: '**/*.mdx' }),
  schema: z.object({
    baslik: z.string().max(80),
    ozet: z.string().min(40).max(220),
    yayinTarihi: z.coerce.date(),
    guncellemeTarihi: z.coerce.date().optional(),
    kategori,
    etiketler: z.array(z.string()).min(1).max(6),
    taslak: z.boolean().default(false),
    kaynakDosya: reference('kaynaklar').optional(),
  }),
});

/* ---------------- Kaynaklar ---------------- */
const kaynaklar = defineCollection({
  loader: glob({ base: './src/content/kaynaklar', pattern: '**/*.mdx' }),
  schema: z.object({
    baslik: z.string().max(70),
    aciklama: z.string().min(40).max(220),
    kategori,
    dosyaAdi: z.string(),
    dosyaBoyutu: z.number().int().positive(), // bayt
    formatlar: z.array(z.enum(['xlsx', 'py', 'json', 'zip', 'md', 'csv'])).min(1),
    surum: z.string().regex(/^\d+\.\d+\.\d+$/),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    lisans: z.string().default('MIT'),
    gereksinimler: z.array(z.string()).default([]),
    yayinTarihi: z.coerce.date(),
    // Zorunlu: bağımsız indirme deposu değil, yazıya bağlı kaynak.
    ilgiliYazi: reference('yazilar'),
    degisiklikGunlugu: z
      .array(z.object({ surum: z.string(), tarih: z.coerce.date(), not: z.string() }))
      .min(1),
  }),
});

export const collections = { projeler, yazilar, kaynaklar };
