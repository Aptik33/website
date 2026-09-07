# Fontlar

Bu klasördeki TTF dosyaları **yalnızca build sırasında OG görseli üretmek**
için okunur; tarayıcıya gönderilmez. Sitenin fontları npm üzerinden
(`@fontsource-variable/*`) gelir.

| dosya | font | lisans |
|---|---|---|
| `Inter-Regular.ttf` | [Inter](https://fonts.google.com/specimen/Inter) | SIL Open Font License 1.1 |
| `SpaceGrotesk-Bold.ttf` | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | SIL Open Font License 1.1 |

Google Fonts'tan indirildi. OFL, gömme ve yeniden dağıtıma izin verir.

Neden buradalar: fontsource paketleri `latin` ve `latin-ext` alt kümelerini
ayrı dosyalara bölüyor ve CanvasKit aynı font ailesi içinde gliften glife
fallback yapmıyor — ş/ğ/ı karakterleri tofu (□) çıkıyordu. Bu TTF'ler her iki
alt kümeyi tek dosyada barındırıyor.
