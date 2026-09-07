# Kişisel site — portföy + blog + kaynaklar

Astro 5 · MDX içerik koleksiyonları · Tailwind 4 · **Motion (Framer Motion)** · Pagefind · statik çıktı

> Animasyon kuralları ve hareket dili için `CLAUDE.md` dosyasına bak.

## Komutlar

```bash
npm run dev       # geliştirme sunucusu → http://localhost:4321
npm run build     # üretim build'i + Pagefind arama indeksi → dist/
npm run preview   # dist/ klasörünü yerelde sun (aramayı test etmenin tek yolu)
```

Arama indeksi yalnızca `build` sırasında oluşur. `dev` ortamında arama kutusu
açılır ama sonuç vermez; bu beklenen davranış.

## Klasör yapısı

```
src/
  consts.mjs              Site adı, URL, sosyal linkler, kategoriler, yorum ayarı
  content.config.ts       İçerik şemaları (Zod) — "veritabanı" burası
  content/
    projeler/*.mdx        Vaka çalışmaları
    yazilar/*.mdx         Blog yazıları
    kaynaklar/*.mdx       İndirilebilir dosyaların sayfaları
  components/             Kart, rozet, arama, header, footer
    Efektler.astro        Arka plan katmanları + spotlight + scroll reveal
    BolumBasligi.astro    Numaralı bölüm başlığı (01 — Projeler)
  fonts/                  OG görseli üretimi için TTF'ler (tarayıcıya gitmez)
  layouts/BaseLayout      Head, meta, JSON-LD, tema scripti
  lib/utils.ts            Türkçe slug, tarih, okuma süresi, dosya boyutu
  pages/                  Route'lar
  styles/global.css       Renk değişkenleri ve tipografi
public/
  indir/                  İndirilebilir dosyaların kendisi
  _headers                Cloudflare Pages cache ve güvenlik başlıkları
```

## Yeni blog yazısı eklemek

`src/content/yazilar/` altına `.mdx` dosyası aç. Dosya adı URL olur.

```yaml
---
baslik: "Yazı başlığı"
ozet: "40–220 karakter arası özet. Arama sonucunda ve kartta görünür."
yayinTarihi: 2026-09-15
kategori: "otomasyon"        # ai | otomasyon | muhasebe | donanim
etiketler: ["Python", "Excel"]
taslak: false                # true ise yayınlanmaz
kaynakDosya: "dosya-slug"    # opsiyonel, kaynaklar/ altındaki dosya adı
---
```

Şema `content.config.ts` içinde tanımlı. Zorunlu bir alanı atlarsan veya yanlış
tip yazarsan `npm run build` hata verip durur — bu bilinçli.

## Yeni proje eklemek

`src/content/projeler/` altına `.mdx` aç. `sinirlar` alanı **zorunlu** ve en az
40 karakter olmalı; projede neyi çözemediğini yazmadan yayınlayamazsın.

## Yeni indirilebilir kaynak eklemek

1. Dosyayı `public/indir/` içine koy.
2. Boyutunu ve SHA-256 özetini hesapla:

```bash
stat -c%s public/indir/dosya.zip
sha256sum public/indir/dosya.zip
```

3. `src/content/kaynaklar/` altına `.mdx` aç ve değerleri yaz.
4. `ilgiliYazi` alanı **zorunlu** — her kaynak bir yazıya bağlı olmak zorunda.
   Bağımsız indirme deposu olmasın diye böyle kuruldu.

## Yayına almadan önce yapılacaklar

| ne | nerede |
|---|---|
| Gerçek domaini yaz | `src/consts.mjs` → `SITE.url` |
| ~~GitHub / LinkedIn linkleri~~ | ✅ gerçek adreslerle dolduruldu (`src/consts.mjs` → `SOSYAL`) |
| Sitemap adresi | `public/robots.txt` |
| İletişim formu anahtarı | `.env` → `PUBLIC_WEB3FORMS_KEY` ([web3forms.com](https://web3forms.com), ücretsiz). Anahtar yoksa form gizlenir, yerine e-posta bağlantısı gösterilir. |
| Yorumları açmak | `src/consts.mjs` → `YORUMLAR` ([giscus.app](https://giscus.app)) |
| Tip kontrolü | `npx astro check` — 0 hata bekleniyor |
| `/simdi` sayfasını güncellemek | `src/pages/simdi.astro` (ayda bir) |

`YORUMLAR.aktif` false olduğu sürece yorum bölümü hiç render edilmez.

## Cloudflare Pages'e kurulum

1. Projeyi bir GitHub reposuna at.
2. Cloudflare Pages → Create project → repoyu bağla.
3. Ayarlar:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 20 veya üzeri
4. Domaini Pages projesine bağla.

`public/_headers` dosyası cache ve güvenlik başlıklarını otomatik uygular.

## Tasarım sistemi

Konsept: **"Terminal / Blueprint"**. Görsel katman CSS'te, hareket katmanı
**Motion (Framer Motion)** ile — hepsi `src/components/Efektler.astro` içinde.

### Motion ile yapılanlar

| ne | nasıl |
|---|---|
| Okuma ilerleme çubuğu | `scroll(animate(el, { scaleX: [0, 1] }))` — sayfanın üstünde amber→camgöbeği çizgi |
| Arka plan paralaksı | Işık küreleri scroll ile ters yönde ve farklı hızda kayar |
| Hero girişi | `stagger(0.08)` ile sırayla, blur→net geçişiyle |
| Scroll reveal | `inView()` + spring; aynı kaptaki kardeşler kademeli |
| Metrik sayaçları | `animate(0, hedef, { onUpdate })` — yalnızca tam sayısal değerler |
| Kart hover | `hover()` + spring; yükselme ve hafif büyüme |
| Buton hover | `hover()` + spring |

### CSS'te kalanlar

| katman | ne yapar |
|---|---|
| `.zemin-izgara` | Blueprint ızgarası, aşağı doğru sönen maskeyle |
| `.zemin-isik` | İki ışık küresi (amber + camgöbeği) |
| `.zemin-parazit` | %3,5 opaklıkta film graini |
| `.kart-spot::before` | İmleci takip eden spotlight (konum JS'ten, boyama CSS'te) |
| `.kenar-isin` | Öne çıkan kartta dönen konik gradyan kenarlık (`@property`) |
| `.gradyan-metin` | Başlıkta amber→camgöbeği geçişi |
| `.serit` | Kayan teknoloji şeridi, hover'da durur |

**Renk anahtarları** `:root` ve `:root[data-theme='light']` içinde tanımlı.
Efekt yoğunlukları da token: açık temada `--glow-opaklik` ve `--parazit-opaklik`
otomatik olarak kısılır, ayrı kod yazmaya gerek yok.

**Erişilebilirlik:** `prefers-reduced-motion` bütün animasyonları kapatır ve
`[data-reveal]` elemanlarını doğrudan görünür yapar. JavaScript hiç çalışmazsa
`.no-js` kuralı aynı işi görür — içerik hiçbir koşulda gizli kalmaz.

**Motion'ın bedeli:** sayfa başına JS 7 KB → **80 KB (gzip 26 KB)**. Karşılığında
gerçek yay fiziği, scroll'a bağlı animasyon ve `inView`/`stagger`/`hover`
yardımcıları geliyor. `motion/mini` (~2,5 KB) denendi ama içinde yalnızca
`animate` var; bu sitenin hareket dilini taşımıyor.

**Güvenlik ağı:** Motion 74 KB'lık bir modül. Yavaş bağlantıda gelemezse
`[data-reveal]` elemanları `opacity: 0`'da takılı kalır ve sayfa boş görünürdü.
`BaseLayout.astro` içindeki 2,5 saniyelik zamanlayıcı, `motion-hazir` sınıfı
gelmezse `hareket-yok` sınıfını ekleyip içeriği koşulsuz açar. Animasyonu
kaybetmek kabul edilebilir; içeriği kaybetmek değil.

## Mimari kararlar ve gerekçeleri

**Veritabanı yok.** İçerik repoda dosya olarak duruyor, build sırasında Zod ile
doğrulanıyor. Tek yazarlı bir sitede DB'nin getirdiği tek şey maliyet ve bakım.

**React kurulu değil.** Tek interaktif parça arama modalıydı; React runtime'ı her
sayfaya ~186 KB ekliyordu, aynı iş saf DOM ile ~2 KB'ta çözüldü. Gerçekten durum
yönetimi gerektiren bir widget lazım olursa geri ekle:

```bash
npx astro add react
```

**Tek dil.** İki dilli site tek kişi tarafından sürdürülemiyor. i18n routing
bilerek açılmadı.

**OG görselleri build'de PNG olarak üretiliyor.** `src/pages/og/[...route].ts`
her yazı, proje ve kaynak için 1200x630 PNG çiziyor. Fontlar `src/fonts/`
altındaki TTF'lerden okunuyor; npm'deki fontsource paketleri latin ve latin-ext
alt kümelerini ayrı dosyalara böldüğü ve CanvasKit aynı aile içinde glif
fallback yapmadığı için ş/ğ karakterleri tofu çıkıyordu. Görseller
`node_modules/.astro-og-canvas` altında önbelleklenir.

**`build.format: 'file'`.** Cloudflare Pages uzantısız URL sunar; kanonik URL'ler
`BaseLayout.astro` içinde `.html` kırpılarak üretiliyor.

## Ölçülen değerler (son build)

| | |
|---|---|
| Sayfa sayısı | 25 HTML + 7 OG görseli |
| Sayfa başına JS | **79,8 KB** → gzip **~27 KB** (Motion dahil) |
| CSS (tümü) | 40,2 KB → gzip **11,1 KB** |
| HTML (anasayfa) | 39,5 KB → gzip **8,7 KB** |
| `astro check` | 0 hata, 0 uyarı |
