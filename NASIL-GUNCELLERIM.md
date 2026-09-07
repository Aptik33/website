# Siteyi nasıl güncellerim?

Bilgisayara program kurmana, terminal açmana gerek yok. **Her şeyi
tarayıcıdan yapacaksın.** Telefondan bile olur.

Tek kural: dosyayı kaydettiğin an site kendi kendini yeniden yayınlar.
**Yaklaşık 90 saniye sonra** değişiklik canlıda olur.

---

## ⚠️ Önce şunu bil: hiçbir şeyi bozamazsın

Bir yeri yanlış yazarsan site **yayınlanmaz** ve **eski hali çalışmaya
devam eder**. Ziyaretçiler bozuk bir şey görmez.

Cloudflare sana kırmızı bir "build failed" gösterir, sen de gidip
düzeltirsin. O kadar. Rahat ol, dene.

---

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
https://website.abdullaheryetkin033.workers.dev/blog

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

# 8. İleride: görsel editör

Şu an her şey metin dosyası. Sık yazmaya başlarsan **Keystatic** diye bir
şey eklenebilir: sitede `/keystatic` adresinde form gibi bir panel açılır,
başlık/özet/içerik kutulara yazılır, dosyaları arkada kendisi hazırlar.

Şimdilik gerek yok — ayda bir yazı için GitHub arayüzü fazlasıyla yeterli
ve daha az şey bozulur. İhtiyaç olursa söyle.

---

## Özet

| ne yapmak istiyorsun | nereye git |
|---|---|
| Yeni yazı | `src/content/yazilar` → Add file |
| Yeni proje | `src/content/projeler` → Add file |
| Düzenle | Dosyaya tıkla → ✏️ kalem |
| Sil | Dosyaya tıkla → 🗑️ çöp kutusu |
| Gizle (silmeden) | `taslak: true` yap |
| Sorun mu var | Cloudflare → Deployments |

**Site adresi:** https://website.abdullaheryetkin033.workers.dev
**Depo:** https://github.com/Aptik33/website
