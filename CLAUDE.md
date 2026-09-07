# Proje kuralları — Abdullah'ın kişisel sitesi

Astro 5 · MDX içerik koleksiyonları · Tailwind 4 · **Motion (Framer Motion)** · Pagefind · statik çıktı

## Kurulu skill'ler

**`ui-ux-pro-max`** (kullanıcı seviyesinde, `~/.claude/skills/`) — MIT lisanslı,
Python tabanlı aranabilir tasarım veritabanı. Arayüz kararı verirken sorgula:

```bash
python "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "<sorgu>" --stack astro
python "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "<sorgu>" --domain ux
```

Çıktısını **körlemesine uygulama**. Bu site için ölçüsü tutmayan önerileri
reddet ve nedenini söyle (ör. `--design-system` "Testimonials carousel" önerir;
Abdullah'ın müşteri referansı yok, o bölüm eklenmez).

**`site-tasarim-sistemi`** (proje seviyesinde, `.claude/skills/`) — bu sitenin
kendi token ve bileşen kuralları. Genel skill ile çakışırsa **bu kazanır**.

## Animasyon: Motion (Framer Motion) kullan

Bu projede animasyon kütüphanesi olarak **Motion** kurulu ve kalıcıdır.
Yeni bir hareket/geçiş eklerken CSS `transition`/`@keyframes` yazma — Motion kullan.

```ts
import { animate, hover, inView, scroll, stagger, press } from 'motion';
```

**Neden `motion`, `framer-motion` değil:** `framer-motion` npm paketi yalnızca
React içindir; bu sitede React yok. `motion` paketi aynı ekibin aynı kod
tabanıdır — `motion/react` zaten framer-motion'ın kendisidir, `motion` ise
React'siz vanilla giriş noktasıdır. İkame değil, aynı kütüphane.

`motion/mini` KULLANMA: içinde sadece `animate` var; `scroll`, `inView`,
`hover`, `stagger` ve `spring` yok, yani bu sitenin hareket dilini taşımıyor.

### Hareket dili — yeni animasyonlarda bunları kullan

`src/components/Efektler.astro` içinde tanımlı, aynı değerleri tekrar kullan:

```ts
const YAY         = { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 };
const YAY_YUMUSAK = { type: 'spring', stiffness: 120, damping: 22 };
const GIRIS_EASE  = [0.16, 1, 0.3, 1];   // giriş/çıkış eğrisi
```

- Giriş animasyonları: `stagger(0.08)`, süre 0.7 sn
- Scroll reveal: `inView(..., { amount: 0.15, margin: '0px 0px -10% 0px' })`
- Hover: `hover()` + `YAY` içeri, `YAY_YUMUSAK` dışarı
- Scroll'a bağlı: `scroll(animate(el, {...}, { ease: 'linear' }))`

### Uyulması zorunlu üç kural

**1. Aynı özelliği hem CSS hem Motion sürmesin.** Motion `transform`
sürüyorsa CSS'te o eleman için `transition: transform` veya `:hover { transform }`
tanımlama — iki sistem birbirini çekiştirir ve titreme olur.

**2. Her animasyonun `prefers-reduced-motion` yolu olsun.** Kullanıcı azaltılmış
hareket istiyorsa animasyon çalıştırma, son durumu doğrudan uygula.

**3. İçerik animasyona bağımlı olmasın.** `opacity: 0` ile başlayan her eleman,
Motion hiç yüklenmese bile görünür hale gelmek zorunda. Bunun için iki
güvenlik ağı var, ikisini de bozma:
- `.no-js` sınıfı (JS hiç yok)
- `.hareket-yok` sınıfı — `BaseLayout.astro` içindeki 2,5 sn'lik zamanlayıcı,
  `motion-hazir` sınıfı gelmezse içeriği koşulsuz açar.

## 21st.dev ve benzeri React kayıtlarından uyarlama

Bu sitede kullanılan portlar (kodu değil, kalıbı alındı):

| bileşen | kaynak kalıp | port |
|---|---|---|
| `Terminal.astro` | Magic UI "Terminal" | Astro + Motion, gerçek `kontrol.py` çıktısı |
| `.buton-birincil::after` | Magic UI "Shimmer Button" | saf CSS, yalnızca hover |
| `[data-coz]` | "Decrypt Text" / "HyperText" | 25 karakterlik alfabe, `setInterval` |
| `[data-reveal]` stagger | GSAP "Stagger List" (skill önerisi) | Motion spring, overshoot |

Yeni bir kalıp uyarlarken: `framer-motion` importlarını `motion` vanilla
API'sine çevir, renkleri bu sitenin tokenlarına çevir, kaynağı kod yorumunda belirt.

## Diğer proje kuralları

- **React kurma.** Arama modalı dahil her şey vanilla; React runtime'ı ~186 KB.
- **Veritabanı yok.** İçerik `src/content/` altında MDX + Zod şeması.
- **Tek dil (Türkçe).** i18n routing bilerek açılmadı.
- **Her kaynak bir yazıya bağlı** (`ilgiliYazi` zorunlu).
- **Her projede `sinirlar` alanı zorunlu** — "neyi çözemedim" yazılmadan yayınlanmaz.
- Değişiklikten sonra `npx astro check` **0 hata** vermeli.

## Yazım ve ton

Abdullah'ın sesiyle yaz: gerçekçi, ölçüme dayalı, abartısız. "AI uzmanı",
"vizyoner", "devrim niteliğinde" gibi ifadeler kullanma. Bir iddia varsa
ölçümü de olsun; ölçüm yoksa izlenim olduğu açıkça yazılsın.
