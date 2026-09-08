# Siteyi nasıl güncellerim?

**İki yol var. Kolay olanı ilki.**

| yol | ne zaman kullan |
|---|---|
| **1. Görsel panel** (Pages CMS) | Yazı/proje/kaynak ekle, düzenle, sil |
| 2. GitHub arayüzü | Sayfa metinleri, "Şu an" sayfası, teknik dosyalar |

---

# YOL 1 — Görsel panel (önerilen)

Form doldurup kaydediyorsun. Ne dosya adı, ne tırnak işareti, ne tarih biçimi
düşünüyorsun. Telefondan da çalışır.

## İlk kurulum — bir kere, 2 dakika

1. **https://app.pagescms.org** aç
2. **Sign in with GitHub** → giriş yap
3. Yetki isteyecek → sadece `Aptik33/website` deposunu seç → **Authorize**
4. Listeden `website` deposuna tıkla

Bitti. Bundan sonra hep bu adresten gireceksin.

## Yazı eklemek

1. Sol menü → **Blog yazıları** → **Add an entry**
2. Formu doldur:
   - **Başlık** — en fazla 80 karakter
   - **Özet** — 40–220 karakter (panel sayıyor, aşarsan uyarır)
   - **Yayın tarihi** — takvimden seç
   - **Kategori** — açılır listeden seç
   - **Etiketler** — 1–6 adet
   - **Taslak** — açık bırakırsan sitede görünmez
   - **Yazı** — normal metin editörü, kalın/başlık/liste butonları var
3. **Save**

~90 saniye sonra sitede.

## Düzenlemek / silmek

Listeden yazıya tıkla → değiştir → **Save**.
Silmek için sağ üstteki üç nokta → **Delete**.

> **Silmek yerine "Taslak" anahtarını aç.** Yazı siteden kalkar ama durur.

## Proje eklemek

Aynı şekilde, **Projeler** bölümünden.

İki alan zorunlu ve panel seni zorlar:
- **Sınırlar ve çözemediklerim** — en az 40 karakter, yazmadan kaydedilmez
- **Metrikler** — sadece **ölçtüğün** sayıları yaz, tahmin yazma

## Kaynak (indirilebilir dosya) eklemek

Önce dosyayı GitHub'da `public/indir/` klasörüne yükle, sonra panelden kaydını
oluştur. SHA-256 özetini almak için PowerShell'de:

```powershell
Get-FileHash dosya.zip -Algorithm SHA256
```

Çıkan uzun kodu küçük harfe çevirip yapıştır.

## Panel bir şeyi kabul etmezse

İyi haber: **hata siteye ulaşmadan yakalanıyor.** Panel, sitenin kurallarını
biliyor — kategori listeden seçiliyor, özet uzunluğu sayılıyor, sürüm biçimi
kontrol ediliyor. Kırmızı uyarı görürsen düzelt, kaydet.

---

# YOL 2 — GitHub arayüzü

Panelde olmayan şeyler için: sayfa metinleri, tasarım, teknik dosyalar.

# 1. Yeni blog yazısı eklemek

### Adım 1 — Klasöre git

https://github.com/Aptik33/website/tree/main/src/content/yazilar

### Adım 2 — Yeni dosya oluştur

Sağ üstte **Add file** → **Create new file**

### Adım 3 — Dosya adını yaz

Üstteki kutuya yazının adresini yaz, sonuna `.mdx` ekle:

```
santiyede-excel-otomasyonu.mdx
```

> Küçük harf, Türkçe karakter yok, boşluk yerine tire.
> Bu dosya adı sitede `/blog/santiyede-excel-otomasyonu` adresi olur.

### Adım 4 — İçeriği yapıştır

`sablonlar/YAZI-SABLONU.mdx` dosyasını aç, içindekini kopyala, buraya
yapıştır ve kendi yazınla değiştir.

Üstteki `---` çizgileri arasındaki bölüm **ayarlar**, altı **yazının kendisi**.

Hangi alana ne yazabileceğin `sablonlar/DEGERLER.md` dosyasında yazılı.

### Adım 5 — Kaydet

Sayfanın altındaki yeşil **Commit changes** butonu.

Açıklama kutusuna ne yaptığını yaz (ör. "Excel otomasyonu yazısı eklendi").
**Commit directly to the main branch** seçili kalsın. → **Commit changes**

### Adım 6 — Bekle

~90 saniye sonra yazın sitede. Kontrol:
https://abdullaheryetkin.com.tr/blog

---

# 2. Var olan bir yazıyı düzenlemek

1. https://github.com/Aptik33/website/tree/main/src/content/yazilar
2. Düzenlemek istediğin dosyaya tıkla
3. Sağ üstteki **kalem** ikonuna bas ✏️
4. Değiştir
5. Altta **Commit changes**

Yazıda düzeltme yaptıysan üst bölüme şunu eklemek iyi olur:

```
guncellemeTarihi: 2026-10-01
```

Sitede "Güncellendi: 1 Ekim 2026" diye görünür. Dürüstlük açısından önemli.

---

# 3. Yazı silmek

1. Dosyaya tıkla
2. Sağ üstteki **çöp kutusu** ikonu 🗑️ (veya `...` menüsünde **Delete file**)
3. Altta **Commit changes**

> **Silmek yerine gizlemeyi düşün.** Üstteki ayarlarda `taslak: false`
> satırını `taslak: true` yaparsan yazı siteden kalkar ama dosya durur.
> Fikrin değişirse geri açarsın.

---

# 4. Proje eklemek

Aynı yöntem, farklı klasör:

https://github.com/Aptik33/website/tree/main/src/content/projeler

Şablon: `sablonlar/PROJE-SABLONU.mdx`

> **Dikkat:** projelerde `sinirlar` alanı **zorunlu** ve en az 40 karakter
> olmalı. Yani "bu araç neyi çözemiyor" yazmadan proje yayınlanmaz.
> Bu bilinçli bir kural — sınırlarını yazan bir portföy, her şeyi
> başardığını iddia edenden daha güvenilir okunur.

---

# 5. Küçük düzeltmeler (yazım hatası vb.)

Sitede hatayı gördüğün sayfanın dosyasını bul, kalem ikonuna bas, düzelt,
kaydet. 90 saniye.

| sitede gördüğün | dosyası |
|---|---|
| Anasayfa yazıları | `src/pages/index.astro` |
| Hakkımda | `src/pages/hakkimda.astro` |
| Kullandıklarım | `src/pages/kullandiklarim.astro` |
| Şu an | `src/pages/simdi.astro` |
| İletişim | `src/pages/iletisim.astro` |

> Bu dosyalarda kod da var. `<` ve `>` işaretlerinin arasına dokunma,
> sadece Türkçe cümleleri değiştir.

---

# 6. "Şu an" sayfasını güncellemek

`src/pages/simdi.astro` — ayda bir güncellemen iyi olur. İçindeki üç liste
(üzerinde çalıştığım / öğrendiğim / ertelediğim) ve en üstteki tarih.

Terk edilmiş bir "şu an" sayfası, hiç olmayandan kötü görünür.

---

# 7. Bir şey ters giderse

### Site güncellenmedi

1. https://dash.cloudflare.com → **Workers & Pages** → **website** → **Deployments**
2. En üstteki satıra bak:
   - **Yeşil ✅** → yayınlandı, tarayıcıda `Ctrl+F5` yap (önbellek)
   - **Kırmızı ❌** → aşağı bak

### Kırmızı "build failed"

**Panik yok, site hâlâ eski haliyle çalışıyor.**

En sık üç sebep:

| hata | çözüm |
|---|---|
| `kategori` yanlış yazılmış | `ai`, `otomasyon`, `muhasebe`, `donanim` dışında bir şey yazma |
| `ozet` çok kısa/uzun | 40–220 karakter arası olmalı |
| Tarih biçimi bozuk | `2026-09-15` gibi, tırnaksız |

Düzeltip tekrar kaydet. Çözemezsen build log'unu bana at.

### Yanlışlıkla bir şeyi sildim

Hiçbir şey kaybolmaz, her değişiklik kayıtlı:

https://github.com/Aptik33/website/commits/main

İstediğin ana geri dönülebilir. Bana söyle, geri alırım.

---

## Özet

| ne yapmak istiyorsun | nereye git |
|---|---|
| **Yeni yazı / proje / kaynak** | **app.pagescms.org → Add an entry** |
| **Düzenle** | **Panelde listeden tıkla → Save** |
| **Gizle** | **Panelde "Taslak" anahtarını aç** |
| Sayfa metni düzelt | GitHub → dosyaya tıkla → ✏️ |
| "Şu an" sayfası | GitHub → `src/pages/simdi.astro` |
| Sorun mu var | Cloudflare → Deployments |

| | adres |
|---|---|
| **Site** | https://abdullaheryetkin.com.tr |
| **Panel** | https://app.pagescms.org |
| Depo | https://github.com/Aptik33/website |
| Yayın durumu | Cloudflare → Workers & Pages → website |
