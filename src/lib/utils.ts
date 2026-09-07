const TR_MAP: Record<string, string> = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i',
  ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u', â: 'a', î: 'i', û: 'u',
};

/** Türkçe karakterleri düzleştirerek URL güvenli slug üretir. */
export function slugify(input: string): string {
  return input
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const AYLAR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

export function tarihTR(d: Date): string {
  return `${d.getUTCDate()} ${AYLAR[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function isoTarih(d: Date): string {
  return d.toISOString().split('T')[0];
}

/** Türkçe için ~180 kelime/dk üzerinden okuma süresi. */
export function okumaSuresi(body: string): number {
  const kelime = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(kelime / 180));
}

export function boyutFormat(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/**
 * Proje durum etiketleri.
 * Hem ProjeKart hem projeler/[slug] içinde tekrarlanıyordu; tek yere alındı.
 */
export const DURUM_ETIKET: Record<string, string> = {
  aktif: 'Geliştiriliyor',
  tamamlandi: 'Tamamlandı',
  arsiv: 'Arşiv',
};

/**
 * Bir metrik değerini sayaç animasyonuna uygun mu diye ayrıştırır.
 *
 * Yalnızca TEK bir sayıyla başlayan değerler sayılır:
 *   "9 kural" → { sayi: 9, sonek: " kural" }
 *   "80+"     → { sayi: 80, sonek: "+" }
 *   "0 bayt"  → { sayi: 0, sonek: " bayt" }
 *
 * Aralık içerenler (ör. "2–3 sa → ~10 dk", "8–14 sn") sayılmaz; ortada
 * ikinci bir sayı olduğu için animasyon anlamsız olurdu.
 */
export function sayacBilgisi(deger: string): { sayi: number; sonek: string } | null {
  const e = /^(\d+)(\D*)$/.exec(deger.trim());
  if (!e) return null;
  return { sayi: Number(e[1]), sonek: e[2] };
}
