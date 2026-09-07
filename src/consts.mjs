export const SITE = {
  /**
   * Sitenin canlı adresi. Canonical, og:image, sitemap ve RSS buradan üretilir.
   *
   * Ortam değişkeni ile ezilebilir; böylece domain değiştiğinde kod değişmez:
   *   Cloudflare → Settings → Variables → PUBLIC_SITE_URL
   *
   * Sondaki eğik çizgi OLMAMALI.
   */
  url:
    (typeof process !== 'undefined' && process.env?.PUBLIC_SITE_URL) ||
    'https://website.abdullaheryetkin033.workers.dev',
  name: 'Abdullah',
  title: 'Abdullah — Şantiye muhasebesi, otomasyon ve yerel yapay zekâ',
  description:
    'Şantiye muhasebesinde çalışıyorum; Python, React ve yerel yapay zekâ modelleriyle gerçek iş problemlerini çözen araçlar yazıyorum. Projeler, notlar ve indirilebilir dosyalar.',
  author: 'Abdullah Eryetkin',
  // Üst bardaki marka kısa kalıyor, kimlik geçen yerlerde tam ad kullanılıyor.
  tamAd: 'Abdullah Eryetkin',
  unvan: 'Şantiye Muhasebesi · Otomasyon & Yerel Yapay Zekâ',
  konum: 'Türkiye',
  locale: 'tr-TR',
  email: 'abdullaheryetkin033@gmail.com',
  github: 'https://github.com/Aptik33',
  linkedin: 'https://www.linkedin.com/in/abdullah-eryetkin-279039280',
  instagram: 'https://www.instagram.com/eryetkin.33/',
  avatar: '/gorsel/abdullah.jpg',
};

/**
 * Profil kartında ve alt menüde kullanılan bağlantılar.
 * `rel="me"` kimlik doğrulaması için önemli — bu adreslerin sahibinin
 * aynı kişi olduğunu makinelere söyler.
 */
export const SOSYAL = [
  { ad: 'GitHub', href: SITE.github, kullanici: 'Aptik33' },
  { ad: 'LinkedIn', href: SITE.linkedin, kullanici: 'abdullah-eryetkin' },
  { ad: 'Instagram', href: SITE.instagram, kullanici: 'eryetkin.33' },
  { ad: 'E-posta', href: `mailto:${SITE.email}`, kullanici: SITE.email },
];

export const KATEGORILER = {
  ai: { ad: 'Yapay Zekâ', renk: '#A78BFA' },
  otomasyon: { ad: 'Otomasyon', renk: '#F5A524' },
  muhasebe: { ad: 'Muhasebe & Excel', renk: '#34D399' },
  donanim: { ad: 'Donanım & Oyun', renk: '#60A5FA' },
};

export const NAV = [
  { ad: 'Projeler', href: '/projeler' },
  { ad: 'Blog', href: '/blog' },
  { ad: 'Kaynaklar', href: '/kaynaklar' },
  { ad: 'Hakkımda', href: '/hakkimda' },
  { ad: 'Kullandıklarım', href: '/kullandiklarim' },
  { ad: 'İletişim', href: '/iletisim' },
];

/**
 * Yorumlar (Giscus — GitHub Discussions).
 * Repoyu GitHub'a atıp https://giscus.app adresinden değerleri aldıktan sonra
 * `aktif` değerini true yap. false olduğu sürece yorum bloğu hiç render edilmez.
 */
export const YORUMLAR = {
  aktif: false,
  repo: 'KULLANICI/REPO',
  repoId: '',
  kategori: 'Announcements',
  kategoriId: '',
};
