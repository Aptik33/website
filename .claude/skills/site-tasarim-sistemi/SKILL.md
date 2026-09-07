---
name: site-tasarim-sistemi
description: Bu sitenin tasarım sistemine göre UI/UX denetimi yapar ve yeni arayüz parçaları üretir. Kullanıcı "tasarımı iyileştir", "UI incele", "arayüzü denetle", "bu bölüm çirkin", "daha modern yap", "yeni bileşen ekle" dediğinde veya 21st.dev / shadcn / Aceternity / Magic UI gibi React bileşen kayıtlarından bir kalıp uyarlanacağında kullan.
---

# UI/UX Pro Max — Abdullah'ın sitesi

Bu skill, `C:\Users\abdul\Desktop\website` projesinin tasarım sistemini uygular.
Genel UI tavsiyesi verme; buradaki tokenlara ve kurallara göre çalış.

## Önce oku

Herhangi bir arayüz değişikliğinden önce:

1. `CLAUDE.md` — animasyon (Motion) kuralları
2. `src/styles/global.css` — token tanımları
3. `references/tasarim-sistemi.md` — bu skill'in içindeki token tablosu ve bileşen envanteri
4. `references/denetim-listesi.md` — denetim yaparken madde madde bu listeyi kullan

## Karar sırası

Yeni bir görsel parça isteniyorsa şu sırayla düşün:

1. **Mevcut bileşen yeter mi?** `src/components/` altına bak. `.kutu`, `.kart-spot`,
   `.etiket`, `.buton`, `BolumBasligi` çoğu ihtiyacı karşılar.
2. **CSS ile olur mu?** Gradyan, maske, `@property`, `conic-gradient`, blend mode —
   bunlar bedava. Önce burayı zorla.
3. **Hareket gerekiyorsa Motion.** `import { animate, hover, inView, scroll, stagger } from 'motion'`.
   Asla yeni bir animasyon kütüphanesi ekleme.
4. **React gerekiyorsa: gerekmiyordur.** Site React'siz. 21st.dev / shadcn / Aceternity
   bileşenleri React'tir; kodu kopyalama, **kalıbı** Astro'ya port et.

## 21st.dev veya benzeri bir kayıttan bileşen uyarlarken

- Kodu değil **fikri** al: hangi katman, hangi zamanlama, hangi geçiş.
- Renkleri asla kopyalama — bu sitenin tokenlarına çevir (`--accent`, `--kat-*`).
- `framer-motion` importlarını `motion` (vanilla) API'sine çevir:
  `<motion.div animate={...}>` → `animate(el, {...}, YAY)`
  `whileHover` → `hover(el, ...)`
  `useScroll` → `scroll(animate(...))`
  `viewport={{ once: true }}` → `inView(el, ...)`
- Lisansı kontrol et; kaynağı kod yorumunda belirt.

## Değişmez üç kural

**1. Ölçüyü boz, sistemi bozma.** Yeni bir renk, yeni bir yarıçap, yeni bir font
ekleme. Var olan tokenlarla çöz. Gerçekten yeni bir token gerekiyorsa hem koyu
hem açık tema için tanımla.

**2. Her efektin bir işlevi olsun.** Dikkat çekmeyen, bilgi taşımayan, sadece
"havalı dursun" diye eklenen hareket eklenmez. Bir efekti savunamıyorsan silinir.

**3. İçerik hiçbir koşulda kaybolmaz.** `opacity: 0` ile başlayan her şey,
JavaScript hiç çalışmasa da görünür hale gelmek zorunda (`.no-js`, `.hareket-yok`).

## Bitirmeden önce

```bash
npx astro check      # 0 hata olmalı
npm run build        # geçmeli
```

Ve tarayıcıda **hem koyu hem açık temada**, **hem 375px hem masaüstü** genişlikte
gör. Ekran görüntüsü almadan "yaptım" deme.
