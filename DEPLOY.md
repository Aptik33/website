# Yayına alma — adım adım

Yerel taraf hazır: git deposu kuruldu, ilk commit atıldı, domain
`abdullaheryetkin.com` olarak ayarlandı.

Aşağıdakiler **senin hesabınla** yapılman gerekenler. Her adım 5–10 dakika.

---

## 1. GitHub reposu (5 dk)

1. https://github.com/new adresine git (Aptik33 hesabınla giriş yapmış olarak)
2. **Repository name:** `website`
3. **Public** seç (Cloudflare Pages ücretsiz katmanı private repoyu da destekler,
   ama public olması giscus yorumları için gerekli)
4. **README, .gitignore, license ekleme** — hepsi zaten var, çakışır
5. "Create repository" de

Sonra bu klasörde şunu çalıştır:

```bash
git remote add origin https://github.com/Aptik33/website.git
git push -u origin main
```

Kullanıcı adı/parola sorarsa: parola yerine **Personal Access Token** gerekir.
https://github.com/settings/tokens → "Generate new token (classic)" →
`repo` yetkisi → oluştur → parola alanına o token'ı yapıştır.

---

## 2. Domain (10 dk, ~200-400 TL/yıl)

`abdullaheryetkin.com` şu an **müsait** (7 Eylül 2026 itibarıyla kontrol edildi).

Öneri: domaini doğrudan **Cloudflare Registrar**'dan al — maliyet fiyatına satar,
ilk yıl indirim/sonraki yıl zam oyunu yoktur ve DNS zaten orada olur.

1. https://dash.cloudflare.com → hesap aç
2. Sol menü → **Domain Registration → Register Domain**
3. `abdullaheryetkin.com` ara, satın al

Cloudflare Registrar Türkiye'den kart kabul etmezse alternatif: Namecheap veya
Porkbun. O durumda domaini aldıktan sonra nameserver'ları Cloudflare'e yönlendir.

---

## 3. Cloudflare Pages (5 dk)

1. https://dash.cloudflare.com → **Workers & Pages → Create → Pages →
   Connect to Git**
2. GitHub'ı bağla, `Aptik33/website` reposunu seç
3. Ayarlar:

   | alan | değer |
   |---|---|
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | (boş bırak) |

4. **Environment variables** → Add variable:

   | isim | değer |
   |---|---|
   | `NODE_VERSION` | `22` |
   | `PUBLIC_WEB3FORMS_KEY` | (4. adımdan gelecek) |

5. Save and Deploy

İlk build ~2 dakika sürer. Sonunda `website-xxx.pages.dev` adresi verir.

### Domaini bağla

Pages projesi → **Custom domains → Set up a custom domain** →
`abdullaheryetkin.com` ve `www.abdullaheryetkin.com` ekle. Domain de
Cloudflare'deyse DNS kaydı otomatik açılır.

---

## 4. İletişim formu (3 dk, ücretsiz)

1. https://web3forms.com → e-postanı gir (`abdullaheryetkin033@gmail.com`)
2. Gelen access key'i kopyala
3. **Cloudflare Pages → Settings → Environment variables** →
   `PUBLIC_WEB3FORMS_KEY` = anahtar
4. Deployments → son deploy → **Retry deployment**

Yerelde denemek için kök dizine `.env` dosyası aç:

```
PUBLIC_WEB3FORMS_KEY=buraya_anahtar
```

`.env` git'e girmez (`.gitignore`'da).

Anahtar tanımlı değilken form gizlenir, yerine e-posta bağlantısı gösterilir —
sessizce çalışmayan bir form canlıya çıkmaz.

---

## 5. Yorumlar (5 dk)

1. https://github.com/apps/giscus → **Install** → `Aptik33/website` reposunu seç
2. Repo → **Settings → Features → Discussions** kutusunu işaretle
3. https://giscus.app adresine git, `Aptik33/website` yaz
4. Sayfa sana `data-repo-id` ve `data-category-id` verir
5. `src/consts.mjs` içindeki `YORUMLAR` bloğunu doldur:

```js
export const YORUMLAR = {
  aktif: true,                 // ← false'tan true'ya
  repo: 'Aptik33/website',
  repoId: 'giscus.app verecek',
  kategori: 'Announcements',
  kategoriId: 'giscus.app verecek',
};
```

6. `git add -A && git commit -m "Yorumları aç" && git push`

---

## 6. Arama motoru (5 dk)

1. https://search.google.com/search-console → **Add property → URL prefix** →
   `https://abdullaheryetkin.com`
2. Doğrulama: Cloudflare DNS ile tek tıkla ya da HTML etiketi
3. **Sitemaps** → `sitemap-index.xml` gönder
4. Aynısını https://www.bing.com/webmasters için de yap

---

## 7. Analitik (3 dk, çerezsiz)

Cloudflare Pages projesi → **Analytics → Web Analytics → Enable**.
Çerez kullanmaz, KVKK banner'ı gerektirmez, sayfa hızını etkilemez.

---

## 8. Gerçek performans ölçümü

Yayına aldıktan sonra:

https://pagespeed.web.dev/ → `https://abdullaheryetkin.com`

Bundle boyutlarını ölçtük ama **Lighthouse'u hiç çalıştırmadık**. Motion'ın
~80 KB'ı sonrası Performance skoru 100 çıkmayabilir. Gerçek sayıyı gör, 90'ın
altındaysa haber ver.

---

## Yayın sonrası ilk iş

**Uydurma metrikleri değiştir.** Şu anda sitede duran ve benim tahmin olarak
yazdığım sayılar:

| dosya | ne uydurma |
|---|---|
| `src/content/projeler/puantaj-bordro-capraz-kontrol.mdx` | "2–3 sa → ~10 dk", "80+ personel" |
| `src/content/projeler/offline-gorsel-analiz-uygulamasi.mdx` | "~%90 geçerli JSON", "8–14 sn", "0 bayt" |
| `src/content/yazilar/yerel-llm-vram-hiz-kalite-takasi.mdx` | token/sn tablosunun tamamı |
| `src/components/Terminal.astro` | "elle 2-3 saat / burada 0,4 sn" satırı |

`9 kural` ve `0 harici bağımlılık` gerçek — scriptten sayılabiliyor.

Ölç ya da sil. Sitenin tek iddiası ölçüm dürüstlüğü; ilk okuyan kontrol ederse
bütün konum çöker.

---

## Günlük akış (bundan sonra)

```bash
npm run dev                    # yaz, gör
npx astro check                # 0 hata olmalı
npm run build                  # geçmeli
git add -A
git commit -m "Yeni yazı: ..."
git push                       # Cloudflare otomatik yayınlar
```

Push'tan ~90 saniye sonra site canlıda.
